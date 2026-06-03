// src/components/BubbleSensor.js
import { LitElement, html, css } from 'lit';
import { SENSOR_TYPE_MAP, emojiForSensor } from '../helpers/sensor-mapping.js';

export class BubbleSensor extends LitElement {
  static properties = {
    sensors: { type: Array },
    preset:  { type: String, reflect: true },
    showIcons: { type: Boolean, attribute: 'show-icons', reflect: true },
  };

  constructor() {
    super();
    this.sensors = [];
    this.preset  = 'standard';
    this.showIcons = false;
    this.rows = 1;
    this.columns = 1;
    this._resizeObserver = null;
    this._autoscaleScheduled = false;
    this._lastBox = { w: 0, h: 0 };
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateLayout();
    // NON schedulare autoscale qui: Lit non ha ancora renderizzato le colonne della grid.
    // L'autoscale parte da updated() dopo il primo render.
    this._resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      let w = 0, h = 0;
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
    if (changedProperties.has('sensors') || changedProperties.has('showIcons')) {
      this._updateLayout();
      this._scheduleAutoscale();
    }
  }

  _updateLayout() {
    const count = this.sensors?.length || 0;
    this.rows = count > 5 ? 2 : 1;
    this.columns = count > 5 ? 5 : count || 1;
  }

  _scheduleAutoscale() {
    if (this._autoscaleScheduled) return;
    this._autoscaleScheduled = true;
    requestAnimationFrame(() => {
      this._autoscaleScheduled = false;
      this._autoScaleValues();
    });
  }

  // Calcola una sola dimensione per tutti i valori della card, usando come
  // vincolo il sensore più largo. Mantiene allineamento visivo tra sensori.
  _autoScaleValues() {
    const pills = Array.from(this.renderRoot?.querySelectorAll('.sensor-pill') || []);
    if (!pills.length) return;

    const maxValuePx = this.showIcons ? 18 : 24;
    let bestPx = 64;
    for (const pill of pills) {
      bestPx = Math.min(bestPx, this._fitByWidth(pill));
    }
    bestPx = Math.min(bestPx, maxValuePx);

    const unitPx  = Math.max(5, Math.round(bestPx * (this.showIcons ? 0.50 : 0.62)));
    const labelPx = Math.max(5, Math.round(bestPx * 0.72));
    const iconPx  = Math.max(5, Math.round(bestPx * 0.82));

    for (const pill of pills) {
      const valueEl = pill.querySelector('.sensor-value');
      const unitEl  = pill.querySelector('.sensor-unit');
      const labelEl = pill.querySelector('.sensor-label');
      const iconEl  = pill.querySelector('.sensor-icon');
      if (!valueEl) continue;
      valueEl.style.fontSize = `${bestPx}px`;
      if (unitEl)  unitEl.style.fontSize  = `${unitPx}px`;
      if (labelEl) labelEl.style.fontSize = `${labelPx}px`;
      if (iconEl) {
        iconEl.style.fontSize = `${iconPx}px`;
        iconEl.style.setProperty('--mdc-icon-size', `${iconPx}px`);
      }
    }
  }

  // Bisezione sul worst-case pill: vincoli di larghezza e altezza reale della riga.
  _fitByWidth(pill) {
    const valueEl = pill.querySelector('.sensor-value');
    const unitEl  = pill.querySelector('.sensor-unit');
    const labelEl = this.showIcons ? pill.querySelector('.sensor-label') : null;
    const iconEl  = null;
    const stackedIcons = false;
    if (!valueEl) return 10;

    // Usa la larghezza dell'host divisa per le colonne: immune al timing della grid CSS.
    // pill.clientWidth può essere 0 o errato se la grid non ha ancora applicato grid-template-columns.
    const hostW = Math.round(this.clientWidth);
    const cols  = Math.max(1, this.columns);
    const boxW  = hostW > 0 ? Math.floor(hostW / cols) : Math.round(pill.clientWidth);
    if (boxW <= 0) return 10;

    const PADDING_X = 4;
    const UNIT_ML   = this.showIcons ? 0 : 1;
    const maxWidth  = Math.max(0, boxW - PADDING_X);
    if (maxWidth <= 0) return 5;

    const hostH = Math.round(this.clientHeight);
    const rows = Math.max(1, this.rows);
    const boxH = hostH > 0 ? Math.floor(hostH / rows) : Math.round(pill.clientHeight);
    const maxHeight = Math.max(16, boxH - 2);

    const unitRatio  = this.showIcons ? 0.50 : 0.62;
    const labelRatio = this.showIcons ? 0.72 : 0.62;
    const iconRatio  = this.showIcons ? 0.82 : 0.78;

    let lo = 5, hi = Math.min(64, Math.max(40, maxHeight + 8)), best = lo;

    for (let i = 0; i < 10 && lo <= hi; i++) {
      const mid = (lo + hi) >> 1;
      valueEl.style.fontSize = `${mid}px`;
      if (unitEl)  unitEl.style.fontSize  = `${Math.max(5, Math.round(mid * unitRatio))}px`;
      if (labelEl) labelEl.style.fontSize = `${Math.max(5, Math.round(mid * labelRatio))}px`;
      if (iconEl) {
        const ipx = Math.max(5, Math.round(mid * iconRatio));
        iconEl.style.fontSize = `${ipx}px`;
        iconEl.style.setProperty('--mdc-icon-size', `${ipx}px`);
      }

      const vW = valueEl.offsetWidth;
      const uW = unitEl  ? unitEl.offsetWidth  : 0;
      const lW = labelEl ? labelEl.offsetWidth : 0;
      const iW = iconEl  ? iconEl.offsetWidth  : 0;
      const totalWidth = stackedIcons
        ? Math.max(iW + lW, vW + (uW > 0 ? UNIT_ML + uW : 0))
        : iW + lW + vW + (uW > 0 ? UNIT_ML + uW : 0);

      const tallest = Math.max(
        mid,
        unitEl ? Math.max(5, Math.round(mid * unitRatio)) : 0,
        labelEl ? Math.max(5, Math.round(mid * labelRatio)) : 0,
        iconEl ? Math.max(5, Math.round(mid * iconRatio)) : 0,
      );

      const totalHeight = stackedIcons
        ? Math.max(5, Math.round(mid * iconRatio)) + Math.max(5, Math.round(mid * 0.08)) + mid
        : tallest;

      if (totalWidth <= maxWidth && totalHeight <= maxHeight) { best = mid; lo = mid + 1; }
      else                                                { hi = mid - 1; }
    }
    return best;
  }

  _formatValueForDisplay(value, decimals = 1, trimIntegers = true) {
    if (value === null || value === undefined) return '--';
  
    if (typeof value === 'number' && Number.isFinite(value)) {
      return (trimIntegers && Number.isInteger(value))
        ? String(value)
        : value.toFixed(decimals);
    }
  
    if (typeof value === 'string') {
      const m = value.replace(',', '.').match(/-?\d+(?:\.\d+)?/);
      if (m) {
        const n = Number(m[0]);
        if (Number.isFinite(n)) {
          return (trimIntegers && Number.isInteger(n))
            ? String(n)
            : n.toFixed(decimals);
        }
      }
      return value.trim();
    }
  
    return String(value);
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
      display: flex;
      align-items: flex-start;
      height: auto;
      min-height: 22px;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }
    .sensor-grid {
      display: grid;
      width: 100%;
      height: 22px;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      gap: 0;
    }

    :host([show-icons]) .sensor-grid {
      height: 22px;
    }

    :host([preset='liquid-glass']) .sensor-grid {
      border-radius: 14px;
      overflow: hidden;
      position: relative;
      isolation: isolate;
      /* padding verticale: crea lo spazio visivo della bolla attorno al testo */
      padding: 0;

      backdrop-filter: blur(8px) saturate(1.25);
      -webkit-backdrop-filter: blur(8px) saturate(1.25);

      /* colore puro della stanza come base */
      background: color-mix(in srgb, var(--bubble-sensor-active-color, white) 18%, rgba(0, 0, 0, 0.42));

      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.18),
        inset 0 -1px 0 rgba(0, 0, 0, 0.08),
        0 6px 24px rgba(0, 0, 0, 0.18);
      border: 1px solid color-mix(in srgb, var(--bubble-sensor-active-color, white) 40%, transparent);

      transition: background 0.3s ease, border-color 0.3s ease;
    }

    :host([preset='liquid-glass']) .sensor-pill {
      position: relative;
      z-index: 1;
      background: transparent;
      border-right: none;
    }

    .sensor-pill {
      display: flex;
      align-items: center;
      background: transparent;
      border: 0;
      border-radius: 0;
      font-size: 1em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
      min-height: 0;
      height: 100%;
      cursor: pointer;
      padding: 0 2px;
      justify-content: center;
      text-align: center;
      border-right: none;
      gap: 1px;
      text-shadow: none;
    }
    :host([show-icons]) .sensor-pill {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1px;
      padding: 0 2px;
    }
    .sensor-icon-row,
    .sensor-value-row {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
      max-width: 100%;
      line-height: 1;
    }
    .sensor-icon-row {
      align-self: end;
      gap: 1px;
      opacity: 0.98;
    }
    .sensor-value-row {
      align-self: start;
      gap: 1px;
    }
    .sensor-pill:last-child {
      border-right: none;
    }
    .sensor-label {
      font-weight: 600;
      font-size: 0.5em;           /* sarà scalata via JS */
      line-height: 1;
      display: inline-block;
      flex: 0 0 auto;
      opacity: 1;
      filter: none;
    }
    .sensor-value {
      font-weight: 800;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0;
      line-height: 1;
      flex: 0 0 auto;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      filter: none;
    }
    .sensor-unit {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
      margin-left: 1px;
      flex: 0 0 auto;
      opacity: 1;
      filter: none;
    }
  `;

  render() {
    const sensors = (this.sensors || []).map(sensor => {
      const devClass = sensor.device_class;
      const map = SENSOR_TYPE_MAP[devClass] || {};
      const emoji = emojiForSensor(devClass, sensor.value);
      const unit  = sensor.unit || map.units?.[0] || '';
    
      // Mostra 1 decimale SOLO se non è intero
      const value = this._formatValueForDisplay(sensor.value, 1, true);
    
      return { ...sensor, value, label: emoji, unit };
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
            ? `Show history graph: ${entityId}`
            : 'Show history graph';
          const stackedIcons = false;

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
              ${this.showIcons && stackedIcons ? html`
                <span class="sensor-icon-row">
                  <ha-icon class="sensor-icon" .icon="${sensor.icon || ''}"></ha-icon>
                  <span class="sensor-label">${sensor.label || ''}</span>
                </span>
                <span class="sensor-value-row">
                  <span class="sensor-value">${sensor.value ?? '--'}</span>
                  <span class="sensor-unit">${sensor.unit || ''}</span>
                </span>
              ` : this.showIcons ? html`
                <span class="sensor-label">${sensor.label || ''}</span>
                <span class="sensor-value">${sensor.value ?? '--'}</span>
                <span class="sensor-unit">${sensor.unit || ''}</span>
              ` : html`
                <span class="sensor-value">${sensor.value ?? '--'}</span>
                <span class="sensor-unit">${sensor.unit || ''}</span>
              `}
            </div>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('bubble-sensor', BubbleSensor);
