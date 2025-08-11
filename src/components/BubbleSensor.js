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
  }
  
  connectedCallback() {
    super.connectedCallback();
    this._updateLayout();
    this._resizeObserver = new ResizeObserver(() => {
      if (!this._resizeScheduled) {
        this._resizeScheduled = true;
        requestAnimationFrame(() => {
          this._autoScaleValues();
          this._resizeScheduled = false;
        });
      }
    });
    this._resizeObserver.observe(this);
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
  }
  
  updated(changedProperties) {
    if (changedProperties.has('sensors')) {
      this._updateLayout();
      this._autoScaleValues();
    }
  }
  
  _updateLayout() {
    const count = this.sensors?.length || 0;
    this.rows = count > 4 ? 2 : 1;
    this.columns = count > 4 ? 4 : count || 1;
  }

  /** Esegue lo scaling per ogni pill (valore + unità in coppia) */
  _autoScaleValues() {
    const pills = this.renderRoot?.querySelectorAll('.sensor-pill');
    if (!pills?.length) return;
    pills.forEach(pill => this._fitValueAndUnit(pill));
  }

  /**
   * Calcola la dimensione del font del valore (con unità in proporzione)
   * in modo che (valore + unità) stiano entro i limiti di spazio della pill.
   */
  _fitValueAndUnit(pill) {
    const valueEl = pill.querySelector('.sensor-value');
    const unitEl  = pill.querySelector('.sensor-unit');
    if (!valueEl) return;

    // Limiti di spazio disponibili (approssimati per non misurare ogni micro-gap)
    const maxWidth  = pill.clientWidth * 0.52;  // porzione destinata a value+unit
    const maxHeight = pill.clientHeight * 0.78; // altezza massima ammissibile
    if (maxWidth <= 0 || maxHeight <= 0) return;

    // Riparti da dimensioni "neutre" per misurazioni coerenti
    valueEl.style.fontSize = '';
    if (unitEl) unitEl.style.fontSize = '';

    // Ricerca binaria sulla size del valore
    let lo = 10;   // px min
    let hi = 44;   // px max
    let best = lo;

    for (let i = 0; i < 16; i++) { // 16 iterazioni sono più che sufficienti
      const mid = Math.floor((lo + hi) / 2);

      // Applica dimensione di prova
      valueEl.style.fontSize = `${mid}px`;
      if (unitEl) {
        const unitSize = Math.max(10, Math.round(mid * 0.75));
        unitEl.style.fontSize = `${unitSize}px`;
      }

      // Forza reflow per misure aggiornate
      const vRect = valueEl.getBoundingClientRect();
      const uRect = unitEl ? unitEl.getBoundingClientRect() : { width: 0, height: 0 };

      const totalWidth  = vRect.width + uRect.width + 6; // piccolo gap
      const totalHeight = Math.max(vRect.height, uRect.height);

      const fits = totalWidth <= maxWidth && totalHeight <= maxHeight;

      if (fits) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    // Applica la dimensione "migliore"
    valueEl.style.fontSize = `${best}px`;
    if (unitEl) {
      unitEl.style.fontSize = `${Math.max(10, Math.round(best * 0.75))}px`;
    }
  }

  /** Apre il more-info nativo (grafico history incluso) */
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
      /* layout determinato da rows/columns impostati in _updateLayout */
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
      font-size: 1.4em; /* leggermente più grande dell'originale */
      flex: 0 0 auto;
    }

    .sensor-label {
      font-weight: 600;
      font-size: clamp(14px, 1.5vw, 20px); /* emoji più grande */
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
      /* la size viene impostata dinamicamente via JS */
    }

    .sensor-unit {
      font-weight: 600;
      /* la size viene impostata dinamicamente via JS */
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
      return {
        ...sensor,
        label: emoji,
        unit,
      };
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
              style="color: ${sensor.color || '#e3f6ff'}"
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
