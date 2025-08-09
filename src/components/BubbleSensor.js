// src/components/BubbleSensor.js
import { LitElement, html, css } from 'lit';

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
      min-width: 0;
      min-height: 0;
    }

    /* Griglia a righe fisse; le colonne si creano da sole.
       Con grid-auto-flow: column, gli item riempiono PRIMA LE RIGHE,
       poi aprono una nuova colonna. Così controlliamo solo il numero di RIGHE. */
    .sensor-grid {
      display: grid;
      width: 100%;
      height: 100%;
      gap: 10px;

      /* Righe di altezza uniforme che si stirano per occupare tutto lo spazio verticale */
      grid-auto-rows: 1fr;
      align-items: stretch;
      align-content: stretch;

      /* Chiave: definisco solo il numero di righe; le colonne si aggiungono automaticamente */
      grid-auto-flow: column;   /* riempi righe, poi vai a nuova colonna */
      grid-auto-columns: 1fr;   /* ogni colonna occupa una frazione dell’area orizzontale */

      /* Evitiamo overflow orizzontale: le colonne 1fr si comprimono correttamente */
      overflow: hidden;
      min-width: 0;
      min-height: 0;
    }

    .sensor-pill {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      width: 100%;
      height: 100%;

      padding: 12px 14px;
      border-radius: 12px;

      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);

      user-select: none;
      cursor: pointer;

      transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
      min-width: 0; /* importante per troncamento testo */
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

  /** 1..4 sensori => 1 riga ; 5..8 => 2 righe */
  _rowsForCount(n) {
    if (!n || n <= 4) return 1;
    if (n <= 8) return 2;
    // Se mai arrivassero >8, restiamo su 2 righe (coerente con la tua regola)
    return 2;
  }

  render() {
    const sensors = Array.isArray(this.sensors) ? this.sensors : [];
    const rows = this._rowsForCount(sensors.length);

    return html`
      <div
        class="sensor-grid"
        style="grid-template-rows: repeat(${rows}, 1fr);"
      >
        ${sensors.map((sensor) => {
          const color = sensor?.color || '#e3f6ff';
          const label = sensor?.label ?? '';
          const icon = sensor?.icon ?? '';
          const value = sensor?.value ?? '--';
          const unit = sensor?.unit ?? '';
          const entityId = sensor?.entity || sensor?.entity_id || '';
          const title = entityId
            ? `Mostra grafico storico: ${entityId}`
            : 'Mostra grafico storico';

          return html`
            <div
              class="sensor-pill"
              style="color: ${color}"
              title=${title}
              @click=${() => this._openMoreInfo(entityId)}
            >
              ${icon ? html`<ha-icon class="sensor-icon" .icon=${icon}></ha-icon>` : html``}

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

  /** Apre il more-info nativo (che mostra anche il grafico storico). */
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
