// src/panels/SensorsPanel.js
import { LitElement, html, css } from 'lit';
import { candidatesFor }     from '../helpers/entity-filters.js';

const SUBPANELS = [
  {
    key: 'temperature',
    title: '🌡️ Temperatura',
    deviceClass: 'temperature',
    defaultUnit: '°C',
    unitPlaceholder: '°C, °F…',
  },
  {
    key: 'humidity',
    title: '💧 Umidità',
    deviceClass: 'humidity',
    defaultUnit: '%',
    unitPlaceholder: '%RH…',
  },
  {
    key: 'illuminance',
    title: '💡 Illuminazione',
    deviceClass: 'illuminance',
    defaultUnit: 'lux',
    unitPlaceholder: 'lux…',
  },
  {
    key: 'pressure',
    title: '🔵 Pressione',
    deviceClass: 'pressure',
    defaultUnit: 'hPa',
    unitPlaceholder: 'hPa, bar…',
  },
  {
    key: 'battery',
    title: '🔋 Batteria',
    deviceClass: 'battery',
    defaultUnit: '%',
    unitPlaceholder: '%…',
  },
  {
    key: 'voltage',
    title: '⚡ Voltaggio',
    deviceClass: 'voltage',
    defaultUnit: 'V',
    unitPlaceholder: 'V…',
  },
];

export class SensorsPanel extends LitElement {
  static properties = {
    hass:       { type: Object },
    config:     { type: Object },
    expanded:   { type: Boolean },
    activeFilters: { type: Object, state: true },
    openSub:    { type: String, state: true },
  };

  static styles = css`
    :host { display: block; }

    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      border: none;
      background: var(--glass-bg, rgba(80,235,175,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px 0 rgba(40,220,145,0.18));
    }
    .glass-panel::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen, linear-gradient(
        120deg,
        rgba(255,255,255,0.26),
        rgba(255,255,255,0.11) 70%,
        transparent 100%
      ));
      pointer-events: none;
    }
    .glass-header {
      position: relative;
      padding: 22px 0 18px;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }

    .subpanel {
      margin: 12px 0;
    }
    .input-group {
      margin: 8px 16px;
    }
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 4px;
      color: var(--primary-text-color);
    }
    ha-selector {
      width: 100%;
      box-sizing: border-box;
    }
    .reset-button {
      border: 2px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 12px;
      padding: 8px 16px;
      background: transparent;
      cursor: pointer;
      margin: 16px auto;
      display: block;
    }
  `;

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.expanded = false;
    // inizializza activeFilters per ciascun subpanel con la propria chiave
    this.activeFilters = SUBPANELS.reduce((acc, sp) => {
      acc[sp.key] = [sp.deviceClass];
      return acc;
    }, {});
    this.openSub = '';  // nessun sotto-pannello aperto
  }

  render() {
    const autoDisc = this.config.auto_discovery_sections?.sensors ?? false;

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => this._onExpandedChanged(e)}
      >
        <div slot="header" class="glass-header">🌡️ Sensori</div>

        ${SUBPANELS.map(sp => this._renderSubPanel(sp, autoDisc))}

        <button class="reset-button"
          @click=${() => this._fire('__panel_cmd__', { cmd: 'reset', section: 'sensors' })}
        >🧹 Reset Sensori</button>
      </ha-expansion-panel>
    `;
  }

  _renderSubPanel(sp, autoDisc) {
    // filtri e candidates per questo sotto-pannello
    const filters = this.activeFilters[sp.key];
    const options = [{ value: sp.deviceClass, label: sp.title }];
    const candidates = autoDisc
      ? candidatesFor(this.hass, this.config, 'sensors', filters)
      : candidatesFor(this.hass, this.config, 'sensors', [sp.deviceClass]);

    const selectedEntity = this.config.entities?.[sp.key]?.entity || '';
    const selectedUnit   = this.config.entities?.[sp.key]?.unit   || sp.defaultUnit;

    return html`
      <div class="subpanel">
        <ha-expansion-panel
          .expanded=${this.openSub === sp.key}
          @expanded-changed=${e => this._onToggleSub(e, sp.key)}
        >
          <div slot="header">${sp.title}</div>

          <!-- Chips filtro (un solo chip = quella categoria) -->
          <div class="input-group">
            <label>Filtro ${sp.title.toLowerCase()}:</label>
            <ha-selector
              .hass=${this.hass}
              .value=${filters}
              .selector=${{
                select: { multiple: true, mode: 'box', options }
              }}
              @value-changed=${e => this._onFilterChanged(sp.key, e.detail.value)}
            ></ha-selector>
          </div>

          <!-- Entity selector -->
          <div class="input-group">
            <label>Entità:</label>
            <ha-selector
              .hass=${this.hass}
              .value=${selectedEntity}
              .selector=${{
                entity: {
                  multiple: false,
                  include_entities: candidates
                }
              }}
              allow-custom-entity
              @value-changed=${e => this._fire(`entities.${sp.key}.entity`, e.detail.value)}
            ></ha-selector>
          </div>

          <!-- Unit selector -->
          <div class="input-group">
            <label>Unità di misura:</label>
            <input
              type="text"
              .value=${selectedUnit}
              placeholder=${sp.unitPlaceholder}
              @input=${e => this._fire(`entities.${sp.key}.unit`, e.target.value)}
            />
          </div>
        </ha-expansion-panel>
      </div>
    `;
  }

  _onFilterChanged(key, value) {
    this.activeFilters = { ...this.activeFilters, [key]: value };
    this._fire(`sensor_filters.${key}`, value);
  }

  _onExpandedChanged(e) {
    this.expanded = e.detail.expanded;
    this.dispatchEvent(new CustomEvent('expanded-changed', {
      detail: { expanded: e.detail.expanded },
      bubbles: true,
      composed: true,
    }));
  }

  _onToggleSub(e, key) {
    if (e.detail.expanded) {
      this.openSub = key;
    } else if (this.openSub === key) {
      this.openSub = '';
    }
  }

  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('sensors-panel', SensorsPanel);