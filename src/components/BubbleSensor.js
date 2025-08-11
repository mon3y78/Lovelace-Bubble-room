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
      this._updateLayout();
      this._scheduleAutoscale();
    }
  }

  _updateLayout() {
    const count = this.sensors?.length || 0;
    this.rows = count > 4 ? 2 : 1;
    this.columns = count > 4 ? 4 : count || 1;
  }

  _scheduleAutoscale() {
    if (this._autoscaleScheduled) return;
    this._autoscaleScheduled = true;
    requestAnimationFrame(() => {
      this._autoscaleScheduled = false;
      this._autoScaleValues();
    });
  }

  _autoScaleValues() {
    const pills = this.renderRoot?.querySelectorAll('.sensor-pill');
    if (!pills?.length) return;
    pills.forEach((pill) => this._fitValueAndUnit(pill));
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

      const fits = totalWidth <= maxWidth && totalHeight <= maxHeight;
      if (fits) {
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
      border-radius: 18px;
      font-size: 1em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      contain: strict;
      cursor: pointer;
      padding: 10px 12px;
    }
    .sensor-icon {
      font-size: 1.4em;
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
