// src/components/BubbleSensor.js

import { LitElement, html, css } from 'lit';
import { SENSOR_TYPE_MAP } from '../helpers/sensor-mapping.js';

export class BubbleSensor extends LitElement {
  static properties = {
    sensors: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      /* Consente al componente di crescere in layout flessibili */
      min-height: 0;
      min-width: 0;
    }

    /* Contenitore griglia che si adatta allo spazio e distribuisce i figli */
    .sensor-grid {
      display: grid;
      width: 100%;
      height: 100%;
      gap: 10px;

      /* Ogni colonna è almeno 180px e poi si espande, si aggiungono colonne finché c'è spazio */
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));

      /* Ogni riga ha la stessa altezza e si stira per occupare lo spazio verticale */
      grid-auto-rows: 1fr;
      align-items: stretch;
      align-content: stretch;

      /* Evita overflow nei layout annidati */
      min-height: 0;
      min-width: 0;
    }

    /* La “pill” del sensore riempie completamente la cella della griglia */
    .sensor-pill {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      height: 100%;
      width: 100%;

      padding: 12px 14px;
      border-radius: 12px;

      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);

      user-select: none;
      cursor: pointer;

      transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
      min-width: 0; /* importante per il truncation del testo */
    }

    .sensor-pill:hover {
      transform: translateY(-1px);
      background: rgba(255, 255, 255, 0.09);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .sensor-icon {
      flex: 0 0 auto;
      width: 22px;
      height: 22px;
      opacity: 0.95;
    }

    /* Wrapper centrale che si stira, con il label ellissato */
    .sensor-center {
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
      align-items: center;
      gap: 8px;
    }

    .sensor-label {
      font-size: 0.95rem;
      opacity: 0.9;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      min-width: 0;
    }

    /* Wrapper destra per valore+unità che resta appiccicato al bordo */
    .sensor-right {
      display: inline-flex;
      gap: 4px;
      align-items: baseline;
      margin-left: auto;
      flex: 0 0 auto;
    }

    .sensor-value {
      font-weight: 600;
      font-size: 1rem;
      opacity: 0.98;
    }

    .sensor-unit {
      font-size: 0.85rem;
      opacity: 0.8;
    }
  `;

  constructor() {
    super();
    this.sensors = [];
  }

  render() {
    const sensors = Array.isArray(this.sensors) ? this.sensors : [];

    return html`
      <div class="sensor-grid">
        ${sensors.map((sensor) => {
          const color = sensor?.color || '#e3f6ff';
          const label = sensor?.label ?? '';
          const icon = sensor?.icon ?? '';
          const value = sensor?.value ?? '--';
          const unit = sensor?.unit ?? '';
          const entityId = sensor?.entity || sensor?.entity_id || '';
          const title = entityId ? `Mostra grafico storico: ${entityId}` : 'Mostra grafico storico';

          return html`
            <div
              class="sensor-pill"
              style="color: ${color}"
              title=${title}
              @click=${() => this._openMoreInfo(entityId)}
            >
              ${icon
                ? html`<ha-icon class="sensor-icon" .icon=${icon}></ha-icon>`
                : html``}

              <div class="sensor-center">
                ${label ? html`<span class="sensor-label">${label}</span>` : html``}
              </div>

              <div class="sensor-right">
                <span class="sensor-value">${value}</span>
                ${unit ? html`<span class="sensor-unit">${unit}</span>` : html``}
              </div>
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
    const ha = document.querySelector('home-assistant');
    (ha || this).dispatchEvent(ev);
  }
}

customElements.define('bubble-sensor', BubbleSensor);
