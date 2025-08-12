// src/components/BubbleSensor.js
import { LitElement, html, css } from 'lit';
import { SENSOR_TYPE_MAP } from '../helpers/sensor-mapping.js';

export class BubbleSensor extends LitElement {
  static properties = {
    sensors: { type: Array },
  };

  constructor() {
    super();
    this.sensors = [];
    this.rows = 1;
    this.columns = 1;
    this._resizeObserver = null;
    this._resizeScheduled = false;
    this._autoscaleScheduled = false;
    this._lastBox = { w: 0, h: 0 };
    this._pillCache = new WeakMap();
    this._pendingChanged = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateLayout();
    this._scheduleAutoscale();
    this._resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      let w = 0;
      let h = 0;
      if (entry && entry.contentBoxSize) {
        const box = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize;
        w = Math.round(box.inlineSize);
        h = Math.round(box.blockSize);
      } else {
        const rect = this.getBoundingClientRect();
        w = Math.round(rect.width);
        h = Math.round(rect.height);
      }
      if (Math.abs(w - this._lastBox.w) > 2 || Math.abs(h - this._lastBox.h) > 2) {
        this._lastBox = { w, h };
        this._scheduleAutoscale();
      }
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('sensors')) {
      const prev = changedProperties.get('sensors') || [];
      this._updateLayout();

      const changedIdx = this._diffChangedSensorIndices(prev, this.sensors);
      if (changedIdx.size === 0) return;

      this._scheduleAutoscale(changedIdx);
    }
  }

  _updateLayout() {
    const count = this.sensors?.length || 0;
    this.rows = count > 4 ? 2 : 1;
    this.columns = count > 4 ? 4 : count || 1;
  }

  _scheduleAutoscale(changedIndices = null) {
    if (this._autoscaleScheduled) {
      this._pendingChanged = this._mergeChanged(this._pendingChanged, changedIndices);
      return;
    }
    this._pendingChanged = this._mergeChanged(this._pendingChanged, changedIndices);
    this._autoscaleScheduled = true;
    requestAnimationFrame(() => {
      this._autoscaleScheduled = false;
      const payload = this._pendingChanged;
      this._pendingChanged = null;
      this._autoScaleValues(payload);
    });
  }

  _mergeChanged(a, b) {
    if (!a && !b) return null;
    if (!a) return b instanceof Set ? new Set(b) : null;
    if (!b) return a instanceof Set ? new Set(a) : null;
    const out = new Set(a);
    for (const v of b) out.add(v);
    return out;
  }

  _autoScaleValues(changedIndices = null) {
    const pills = this.renderRoot?.querySelectorAll('.sensor-pill');
    if (!pills?.length) return;

    const targetPills = changedIndices
      ? Array.from(changedIndices).map(i => pills[i]).filter(Boolean)
      : Array.from(pills);

    if (!targetPills.length) return;

    targetPills.forEach((pill) => this._fitValueAndUnit(pill));
  }

  _fitValueAndUnit(pill) {
    const valueEl = pill.querySelector('.sensor-value');
    const unitEl  = pill.querySelector('.sensor-unit');
    if (!valueEl) return;

    const text = valueEl.textContent ?? '';
    const unitText = unitEl ? unitEl.textContent ?? '' : '';
    const boxW = Math.round(pill.clientWidth);
    const boxH = Math.round(pill.clientHeight);
    if (boxW <= 0 || boxH <= 0) return;

    const cacheKey = this._pillCache.get(pill);
    if (cacheKey &&
        cacheKey.text === text &&
        cacheKey.unitText === unitText &&
        cacheKey.boxW === boxW &&
        cacheKey.boxH === boxH) {
      return;
    }

    const maxWidth  = Math.floor(boxW * 0.52);
    const maxHeight = Math.floor(boxH * 0.78);
    if (maxWidth <= 0 || maxHeight <= 0) return;

    valueEl.style.fontSize = '';
    if (unitEl) unitEl.style.fontSize = '';

    let lo = 10;
    let hi = Math.min(44, maxHeight);
    let best = lo;

    for (let i = 0; i < 8 && lo <= hi; i++) {
      const mid = (lo + hi) >> 1;
      valueEl.style.fontSize = `${mid}px`;
      if (unitEl) {
        const unitSize = Math.max(10, Math.round(mid * 0.75));
        unitEl.style.fontSize = `${unitSize}px`;
      }

      const vW = valueEl.offsetWidth;
      const vH = valueEl.offsetHeight;
      const uW = unitEl ? unitEl.offsetWidth : 0;
      const uH = unitEl ? unitEl.offsetHeight : 0;

      const totalWidth  = vW + uW + 6;
      const totalHeight = vH > uH ? vH : uH;

      if (totalWidth <= maxWidth && totalHeight <= maxHeight) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    valueEl.style.fontSize = `${best}px`;
    if (unitEl) {
      unitEl.style.fontSize = `${Math.max(10, Math.round(best * 0.75))}px`;
    }

    this._pillCache.set(pill, { text, unitText, boxW, boxH, best });
  }

  /** Helpers per confronto sensori */
  _formatValueForCompare(value) {
    if (value === null || value === undefined) return '--';
    if (typeof value === 'number') {
      const isInt = Number.isInteger(value);
      return isInt ? String(value) : value.toFixed(1);
    }
    return String(value).trim().replace(/\s+/g, ' ');
  }

  _getSensorKey(sensor, index) {
    return sensor?.entity || sensor?.entity_id || `idx:${index}`;
  }

  _diffChangedSensorIndices(prev = [], next = []) {
    const changed = new Set();

    if ((prev?.length || 0) !== (next?.length || 0)) {
      for (let i = 0; i < (next?.length || 0); i++) changed.add(i);
      return changed;
    }

    const nextIndexByKey = new Map(next.map((s, i) => [this._getSensorKey(s, i), i]));

    prev.forEach((prevSensor, prevIndex) => {
      const key = this._getSensorKey(prevSensor, prevIndex);
      const i = nextIndexByKey.get(key);
      if (i === undefined) {
        if (prevIndex < next.length) changed.add(prevIndex);
        return;
      }

      const cur = next[i];

      const prevText = [
        prevSensor?.label ?? '',
        this._formatValueForCompare(prevSensor?.value),
        prevSensor?.unit ?? ''
      ].join('|');

      const nextText = [
        cur?.label ?? '',
        this._formatValueForCompare(cur?.value),
        cur?.unit ?? ''
      ].join('|');

      const prevIcon  = prevSensor?.icon ?? '';
      const nextIcon  = cur?.icon ?? '';
      const prevDev   = prevSensor?.device_class ?? '';
      const nextDev   = cur?.device_class ?? '';
      const prevColor = prevSensor?.color ?? '';
      const nextColor = cur?.color ?? '';

      const textChanged  = prevText !== nextText;
      const iconChanged  = prevIcon !== nextIcon;
      const devChanged   = prevDev !== nextDev;
      const colorChanged = prevColor !== nextColor;

      if (textChanged || iconChanged || devChanged || colorChanged) {
        changed.add(i);
      }
    });

    return changed;
  }

  _openMoreInfo(entityId) {
    if (!entityId || typeof entityId !== 'string') return;
    const ev = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    const ha = document.querySelector('home-assistant');
    (ha || this).dispatchEvent(ev);
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      contain: strict;
    }
    .sensor-grid {
      display: grid;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    .sensor-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(32,38,55,0.12);
      font-size: 1em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      contain: strict;
      cursor: pointer;
      padding: 1px 1px;
    }
    .sensor-icon {
      font-size: 1.0em;
      flex: 0 0 auto;
    }
    .sensor-label {
      font-weight: 600;
      font-size: clamp(14px, 1.5vw, 20px);
      transform: scale(0.95);
      display: inline-block;
      line-height: 1;
      flex: 0 0 auto;
    }
    .sensor-value {
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
      line-height: 1;
    }
    .sensor-unit {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
      margin-left: 4px;
      flex: 0 0 auto;
    }
  `;

  render() {
    const sensors = (this.sensors || []).map(sensor => {
      const devClass = sensor.device_class;
      const map = SENSOR_TYPE_MAP[devClass] || {};
      const emoji = map.emoji || '❓';
      const unit = sensor.unit || map.units?.[0] || '';
      return { ...sensor, label: emoji, unit };
    });

    return html`
      <div
        class="sensor-grid"
        style="
          grid-template-columns: repeat(${this.columns}, 1fr);
          grid-template-rows: repeat(${this.rows}, 1fr);
        "
      >
        ${sensors.map(sensor => {
          const entityId = sensor.entity || sensor.entity_id || '';
          const title = entityId
            ? `Mostra grafico storico: ${entityId}`
            : 'Mostra grafico storico';
          return html`
            <div
              class="sensor-pill"
              style="color:${sensor.color || '#e3f6ff'}"
              title="${title}"
              role="button"
              tabindex="0"
              @click=${() => this._openMoreInfo(entityId)}
              @keydown=${(e) => { if (e.key === 'Enter' || e.key === ' ') this._openMoreInfo(entityId); }}
            >
              <ha-icon class="sensor-icon" .icon="${sensor.icon || ''}"></ha-icon>
              <span class="sensor-label">${sensor.label || ''}</span>
              <span class="sensor-value">${sensor.value ?? '--'}</span>
              <span class="sensor-unit">${sensor.unit || ''}</span>
            </div>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('bubble-sensor', BubbleSensor);
