// src/components/BubbleSensor.js
import { LitElement, html, css } from 'lit';
import { SENSOR_TYPE_MAP } from '../helpers/sensor-mapping.js';

export class BubbleSensor extends LitElement {
  static properties = {
    sensors: { type: Array },
    preset:  { type: String, reflect: true },
  };

  constructor() {
    super();
    this.sensors = [];
    this.preset  = 'standard';
    this.rows = 1;
    this.columns = 1;
    this._resizeObserver = null;
    this._autoscaleScheduled = false;
    this._lastBox = { w: 0, h: 0 };
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateLayout();
    this._scheduleAutoscale();
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
    if (changedProperties.has('sensors')) {
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

  // Calcola una sola dimensione font per TUTTE le pill della card.
  // Strategia: trova la pill con contenuto più largo (worst-case),
  // cerca per bisezione il font-size massimo che entra nella sua larghezza,
  // poi applica quella stessa dimensione a tutte le altre pill.
  _autoScaleValues() {
    const pills = Array.from(this.renderRoot?.querySelectorAll('.sensor-pill') || []);
    if (!pills.length) return;

    // Seleziona la pill più "pesante" in termini di testo
    let worst = pills[0];
    let worstScore = 0;
    for (const pill of pills) {
      const v = pill.querySelector('.sensor-value')?.textContent ?? '';
      const u = pill.querySelector('.sensor-unit')?.textContent  ?? '';
      const l = pill.querySelector('.sensor-label')?.textContent ?? '';
      const score = v.length + u.length * 0.8 + l.length * 1.1;
      if (score > worstScore) { worstScore = score; worst = pill; }
    }

    const bestPx = this._fitByWidth(worst);
    const unitPx  = Math.max(5, Math.round(bestPx * 0.68));
    const labelPx = Math.max(5, Math.round(bestPx * 0.68));
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

  // Bisezione sul worst-case pill: vincolo solo larghezza (altezza è auto).
  _fitByWidth(pill) {
    const valueEl = pill.querySelector('.sensor-value');
    const unitEl  = pill.querySelector('.sensor-unit');
    const labelEl = pill.querySelector('.sensor-label');
    const iconEl  = pill.querySelector('.sensor-icon');
    if (!valueEl) return 10;

    const boxW = Math.round(pill.clientWidth);
    if (boxW <= 0) return 10;

    const PADDING_X = 6;
    const UNIT_ML   = 1;
    const maxWidth  = Math.max(0, boxW - PADDING_X);
    if (maxWidth <= 0) return 5;

    const unitRatio  = 0.68;
    const labelRatio = 0.68;
    const iconRatio  = 0.82;

    let lo = 5, hi = 40, best = lo;

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
      const totalWidth = iW + lW + vW + (uW > 0 ? UNIT_ML + uW : 0);

      if (totalWidth <= maxWidth) { best = mid; lo = mid + 1; }
      else                        { hi = mid - 1; }
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
      display: block;
      height: auto;
      width: 100%;
      box-sizing: border-box;
    }
    .sensor-grid {
      display: grid;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      gap: 0;
    }

    :host([preset='liquid-glass']) .sensor-grid {
      border-radius: 18px;
      overflow: hidden;
      position: relative;
      isolation: isolate;
      /* padding verticale: crea lo spazio visivo della bolla attorno al testo */
      padding: 4px 0;

      backdrop-filter: blur(20px) saturate(2.2) brightness(1.05);
      -webkit-backdrop-filter: blur(20px) saturate(2.2) brightness(1.05);

      /* colore puro della stanza come base */
      background: color-mix(in srgb, var(--bubble-sensor-active-color, white) 22%, rgba(255, 255, 255, 0.04));

      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.30),
        inset 0 -1px 0 rgba(0, 0, 0, 0.08),
        0 6px 24px rgba(0, 0, 0, 0.18);
      border: 1.5px solid color-mix(in srgb, var(--bubble-sensor-active-color, white) 40%, transparent);

      transition: background 0.3s ease, border-color 0.3s ease;
    }

    :host([preset='liquid-glass']) .sensor-grid::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      /* highlight overlay in alto + glow colorato in basso */
      background:
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.45) 0%,
          rgba(255, 255, 255, 0.10) 35%,
          transparent 55%
        ),
        radial-gradient(
          ellipse 120% 70% at 50% 118%,
          color-mix(in srgb, var(--bubble-sensor-active-color, white) 40%, transparent),
          transparent 65%
        );
      mix-blend-mode: overlay;
      opacity: 0.85;
      z-index: 0;
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
      height: 100%;
      contain: strict;
      cursor: pointer;
      padding: 0 3px;
      justify-content: center;
      text-align: center;
      border-right: none;
      gap: 2px;
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
      opacity: 0.85;
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
      margin-left: 1px;
      flex: 0 0 auto;
      opacity: 0.75;
    }
  `;

  render() {
    const sensors = (this.sensors || []).map(sensor => {
      const devClass = sensor.device_class;
      const map = SENSOR_TYPE_MAP[devClass] || {};
      const emoji = map.emoji || '❓';
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