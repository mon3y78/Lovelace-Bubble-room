// src/components/BubbleSensor.js

import { LitElement, html, css } from 'lit';

/**
 * BubbleSensor
 * - Mostra una griglia di "pill" per sensori
 * - Al click su una pill apre il more-info di Home Assistant per l'entità
 *   -> nel more-info è presente il grafico dello storico (se recorder attivo)
 *
 * Atteso che ogni elemento di `sensors` contenga:
 * {
 *   entity: 'sensor.temperature_soggiorno' // oppure entity_id
 *   icon: 'mdi:thermometer',
 *   value: '22.4',
 *   unit: '°C',
 *   label: '🌡️' // opzionale (se non lo passi, mostriamo l'icona)
 *   color: '#e3f6ff', // opzionale
 *   device_class: 'temperature' // opzionale
 * }
 */

export class BubbleSensor extends LitElement {
  static properties = {
    sensors: { type: Array },
    rows: { type: Number, reflect: true },
    columns: { type: Number, reflect: true },
  };
  
  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    .sensor-grid {
      display: grid;
      gap: 8px;
      width: 100%;
      height: 100%;
      grid-auto-rows: 1fr;
      grid-auto-columns: 1fr;
    }

    .sensor-pill {
      display: grid;
      grid-template-columns: auto 1fr auto auto;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.10);
      user-select: none;
      transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
      cursor: pointer;
    }

    .sensor-pill:hover {
      transform: translateY(-1px);
      background: rgba(255,255,255,0.09);
      border-color: rgba(255,255,255,0.18);
    }

    .sensor-icon {
      width: 22px;
      height: 22px;
      opacity: 0.95;
    }

    .sensor-label {
      font-size: 0.92rem;
      opacity: 0.9;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sensor-value {
      font-weight: 600;
      font-size: 1rem;
      justify-self: end;
      opacity: 0.98;
    }

    .sensor-unit {
      font-size: 0.85rem;
      opacity: 0.8;
      margin-left: 2px;
    }
  `;
  
  constructor() {
    super();
    this.sensors = [];
    this.rows = 1;
    this.columns = 1;
  }
  
  /**
   * Facoltativo: se vuoi calcolare dinamicamente la griglia in base al numero di sensori,
   * puoi chiamare questo metodo quando aggiorni `sensors`.
   */
  updated(changed) {
    if (changed.has('sensors')) {
      const count = Array.isArray(this.sensors) ? this.sensors.length : 0;
      // semplice euristica: 1 riga fino a 4, poi 2 righe
      this.rows = count > 4 ? 2 : 1;
      this.columns = Math.max(1, Math.min(4, count)); // fino a 4 colonne
    }
  }
  
  render() {
    const sensors = Array.isArray(this.sensors) ? this.sensors : [];
    
    return html`
      <div
        class="sensor-grid"
        style="
          grid-template-columns: repeat(${this.columns}, 1fr);
          grid-template-rows: repeat(${this.rows}, 1fr);
        "
      >
        ${sensors.map((sensor) => {
          const color = sensor?.color || '#e3f6ff';
          const label = sensor?.label ?? '';
          const icon = sensor?.icon ?? '';
          const value = sensor?.value ?? '--';
          const unit = sensor?.unit ?? '';
          const entityId = sensor?.entity || sensor?.entity_id || '';

          return html`
            <div
              class="sensor-pill"
              style="color: ${color}"
              title="Mostra grafico storico"
              @click=${() => this._openMoreInfo(entityId)}
            >
              ${icon
                ? html`<ha-icon class="sensor-icon" .icon=${icon}></ha-icon>`
                : html`<span class="sensor-label">${label}</span>`}
              <span class="sensor-label">${label}</span>
              <span class="sensor-value">${value}</span>
              <span class="sensor-unit">${unit}</span>
            </div>
          `;
        })}
      </div>
    `;
  }
  
  /**
   * Apre il more-info nativo di Home Assistant per l'entità (grafico incluso).
   */
  _openMoreInfo(entityId) {
    if (!entityId || typeof entityId !== 'string') return;
    const ev = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    // Dispatch verso il root di HA se presente, altrimenti sul componente stesso
    const ha = document.querySelector('home-assistant');
    (ha || this).dispatchEvent(ev);
  }
}

customElements.define('bubble-sensor', BubbleSensor);