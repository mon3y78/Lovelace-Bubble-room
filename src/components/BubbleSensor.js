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

    // profilo di font-size condiviso per gruppi di pill con stessa geometria
    this._sharedSize = new Map(); // key -> { best, unit, label, icon }
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateLayout();
    this._sharedSize.clear();
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
        this._sharedSize.clear();
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
      this._sharedSize.clear();

      const changedIdx = this._diffChangedSensorIndices(prev, this.sensors);
      if (changedIdx.size === 0) return;

      this._scheduleAutoscale(changedIdx);
    }
  }

  _updateLayout() {
    const count = this.sensors?.length || 0;
    this.rows = count > 5 ? 2 : 1;
    this.columns = count > 5 ? 5 : count || 1;
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

  // ---------- Nuove utility per la taglia condivisa ----------
  _keyForPill(pill) {
    const w = Math.round(pill.clientWidth) || 0;
    const h = Math.round(pill.clientHeight) || 0;
    const hasUnit  = !!pill.querySelector('.sensor-unit')?.textContent?.trim();
    const hasLabel = !!pill.querySelector('.sensor-label')?.textContent?.trim();
    const hasIcon  = !!pill.querySelector('.sensor-icon');
    return `${w}x${h}|u:${hasUnit?'1':'0'}|l:${hasLabel?'1':'0'}|i:${hasIcon?'1':'0'}`;
  }

  _textWeight(pill) {
    const get = sel => pill.querySelector(sel)?.textContent ?? '';
    const v = get('.sensor-value');
    const u = get('.sensor-unit');
    const l = get('.sensor-label');
    return v.length + u.length * 0.8 + l.length * 1.1;
  }

  _measureAndApply(pill) {
    this._fitValueAndUnit(pill);

    const valueEl = pill.querySelector('.sensor-value');
    const unitEl  = pill.querySelector('.sensor-unit');
    const labelEl = pill.querySelector('.sensor-label');
    const iconEl  = pill.querySelector('.sensor-icon');

    const bestPx   = parseFloat(getComputedStyle(valueEl).fontSize) || 10;
    const unitPx   = unitEl  ? parseFloat(getComputedStyle(unitEl).fontSize)   || Math.round(bestPx * 0.5) : 0;
    const labelPx  = labelEl ? parseFloat(getComputedStyle(labelEl).fontSize) || Math.round(bestPx * 0.5) : 0;
    const iconPx   = iconEl  ? parseFloat(getComputedStyle(iconEl).fontSize)  || Math.round(bestPx * 0.5) : 0;

    return { best: bestPx, unit: unitPx, label: labelPx, icon: iconPx };
  }

  _applySharedSize(pill, shared) {
    const valueEl = pill.querySelector('.sensor-value');
    const unitEl  = pill.querySelector('.sensor-unit');
    const labelEl = pill.querySelector('.sensor-label');
    const iconEl  = pill.querySelector('.sensor-icon');
    if (!valueEl) return;

    valueEl.style.fontSize = `${shared.best}px`;
    if (unitEl)  unitEl.style.fontSize  = `${shared.unit}px`;
    if (labelEl) labelEl.style.fontSize = `${shared.label}px`;
    if (iconEl)  iconEl.style.fontSize  = `${shared.icon}px`;

    this._pillCache.set(pill, {
      text: valueEl.textContent ?? '',
      unitText: unitEl ? (unitEl.textContent ?? '') : '',
      labelTxt: labelEl ? (labelEl.textContent ?? '') : '',
      iconName: iconEl?.getAttribute('icon') || iconEl?.icon || '',
      boxW: Math.round(pill.clientWidth),
      boxH: Math.round(pill.clientHeight),
      best: shared.best
    });
  }
  // -----------------------------------------------------------

  _autoScaleValues(changedIndices = null) {
    const pills = this.renderRoot?.querySelectorAll('.sensor-pill');
    if (!pills?.length) return;

    const targetPills = changedIndices
      ? Array.from(changedIndices).map(i => pills[i]).filter(Boolean)
      : Array.from(pills);

    if (!targetPills.length) return;

    // Raggruppa per geometria e struttura
    const groups = new Map();
    for (const pill of targetPills) {
      const key = this._keyForPill(pill);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(pill);
    }

    // Per ogni gruppo: usa la taglia condivisa se esiste, altrimenti misura sul worst-case
    for (const [key, group] of groups.entries()) {
      const shared = this._sharedSize.get(key);
      if (shared) {
        for (const pill of group) this._applySharedSize(pill, shared);
        continue;
      }

      // Scegli la pill con testo più "pesante"
      let worst = group[0];
      let worstScore = this._textWeight(worst);
      for (let i = 1; i < group.length; i++) {
        const s = this._textWeight(group[i]);
        if (s > worstScore) {
          worstScore = s;
          worst = group[i];
        }
      }

      const sharedComputed = this._measureAndApply(worst);
      this._sharedSize.set(key, sharedComputed);
      for (const pill of group) {
        if (pill !== worst) this._applySharedSize(pill, sharedComputed);
      }
    }
  }

  _fitValueAndUnit(pill) {
    const valueEl = pill.querySelector('.sensor-value');
    const unitEl  = pill.querySelector('.sensor-unit');
    const labelEl = pill.querySelector('.sensor-label');
    const iconEl  = pill.querySelector('.sensor-icon');
    if (!valueEl) return;

    const text     = valueEl.textContent ?? '';
    const unitText = unitEl ? (unitEl.textContent ?? '') : '';
    const labelTxt = labelEl ? (labelEl.textContent ?? '') : '';
    const iconName = iconEl?.getAttribute('icon') || iconEl?.icon || '';

    const boxW = Math.round(pill.clientWidth);
    const boxH = Math.round(pill.clientHeight);
    if (boxW <= 0 || boxH <= 0) return;

    const cacheKey = this._pillCache.get(pill);
    if (cacheKey &&
        cacheKey.text === text &&
        cacheKey.unitText === unitText &&
        cacheKey.labelTxt === labelTxt &&
        cacheKey.iconName === iconName &&
        cacheKey.boxW === boxW &&
        cacheKey.boxH === boxH) {
      return;
    }

    // niente padding né bordo: massimizziamo lo spazio interno
    const PADDING_X = 0;
    const PADDING_Y = 0;
    const UNIT_ML   = 1; // lieve spazio tra valore e unità

    valueEl.style.fontSize = '';
    if (unitEl) unitEl.style.fontSize = '';
    if (labelEl) labelEl.style.fontSize = '';
    if (iconEl)  iconEl.style.fontSize  = '';

    const maxWidth  = Math.max(0, boxW - PADDING_X);
    const maxHeight = Math.max(0, boxH - PADDING_Y);
    if (maxWidth === 0 || maxHeight === 0) return;

    // abbassiamo i minimi e la taglia iniziale: emoji/icon più piccole
    let lo = 5; // prima era 10
    let hi = Math.min(40, maxHeight); // leggermente più compatto del 44
    let best = lo;

    // rapporti rivisti per avere emoji/unità un po' più piccole
    const unitRatio  = 0.70;
    const labelRatio = 0.70;
    const iconRatio  = 0.70;

    for (let i = 0; i < 8 && lo <= hi; i++) {
      const mid = (lo + hi) >> 1;

      valueEl.style.fontSize = `${mid}px`;
      if (unitEl)  unitEl.style.fontSize  = `${Math.max(5, Math.round(mid * unitRatio))}px`;
      if (labelEl) labelEl.style.fontSize = `${Math.max(5, Math.round(mid * labelRatio))}px`;
      if (iconEl)  iconEl.style.fontSize  = `${Math.max(5, Math.round(mid * iconRatio))}px`;

      const vW = valueEl.offsetWidth;
      const vH = valueEl.offsetHeight;

      const uW = unitEl ? unitEl.offsetWidth : 0;
      const uH = unitEl ? unitEl.offsetHeight : 0;

      const lW = labelEl ? labelEl.offsetWidth : 0;
      const lH = labelEl ? labelEl.offsetHeight : 0;

      const iW = iconEl ? iconEl.offsetWidth : 0;
      const iH = iconEl ? iconEl.offsetHeight : 0;

      const totalWidth  = (iW > 0 ? iW : 0) + lW + vW + (uW > 0 ? (UNIT_ML + uW) : 0);
      const totalHeight = Math.max(iH, lH, vH, uH);

      if (totalWidth <= maxWidth && totalHeight <= maxHeight) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    valueEl.style.fontSize = `${best}px`;
    if (unitEl)  unitEl.style.fontSize  = `${Math.max(5, Math.round(best * unitRatio))}px`;
    if (labelEl) labelEl.style.fontSize = `${Math.max(5, Math.round(best * labelRatio))}px`;
    if (iconEl)  iconEl.style.fontSize  = `${Math.max(5, Math.round(best * iconRatio))}px`;

    this._pillCache.set(pill, {
      text, unitText, labelTxt, iconName, boxW, boxH, best
    });
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
      gap: 0;                /* nessuno spazio tra le celle */
    }
    .sensor-pill {
      display: flex;
      align-items: center;
      background: transparent;  /* niente sfondo */
      border: 0;                /* niente bordo */
      border-radius: 0;         /* niente raggio, si toccano */
      font-size: 1em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      contain: strict;
      cursor: pointer;
      padding: 0;     
      justify-content: space-between;  
      text-align: center;         
    }
    .sensor-label {
      font-weight: 600;
      font-size: 0.5em;           /* sarà scalata via JS */
      line-height: 1;
      display: inline-block;
      flex: 0 0 auto;
    }
    .sensor-value {
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
      line-height: 1;
      flex: 0 0 auto;
    }
    .sensor-unit {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
      margin-left: 1px;         /* separa valore e unità */
      flex: 0 0 auto;
      opacity: 1;               /* assicurati sia visibile */
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