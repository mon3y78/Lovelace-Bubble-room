// src/panels/SensorsPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor }     from '../helpers/entity-filters.js';

const SENSOR_CATS = [
  'temperature',   // sensor.device_class = temperature
  'humidity',      // sensor.device_class = humidity
  'illuminance',   // sensor.device_class = illuminance
  'pressure',      // sensor.device_class = pressure
  'battery',       // sensor.device_class = battery
  'voltage',       // sensor.device_class = voltage
];

export class SensorsPanel extends LitElement {
  static properties = {
    hass:          { type: Object },
    config:        { type: Object },
    expanded:      { type: Boolean },
    activeFilters: { type: Array, state: true },
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

    .chip-container {
      margin: 16px;
    }

    /* Input group for selector */
    .input-group {
      margin-bottom: 12px;
      padding: 0 16px;
    }
    label {
      display: block;
      font-size: 1rem;
      font-weight: 600;
      color: var(--primary-text-color);
      margin-bottom: 4px;
    }
    ha-selector {
      width: 100%;
    }
  `;

  constructor() {
    super();
    this.hass          = {};
    this.config        = {};
    this.expanded      = false;
    this.activeFilters = [];
  }

  updated(changed) {
    // auto-discover sensori quando cambia la config
    if (changed.has('config') || changed.has('hass')) {
      maybeAutoDiscover(this.hass, this.config, 'entities.sensors');
      // inizializza i filtri se presenti in config
      if (changed.has('config') && Array.isArray(this.config.sensor_filters)) {
        this.activeFilters = [...this.config.sensor_filters];
      }
    }
  }

  render() {
    const cfg     = this.config;
    const sensors = cfg.entities?.sensors ?? [];
    // se ho filtri interni uso quelli, altrimenti quelli da config o default
    const filters = this.activeFilters.length
      ? this.activeFilters
      : (cfg.sensor_filters ?? [...SENSOR_CATS]);

    // opzioni per i chip selector
    const options = SENSOR_CATS.map(cat => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));

    // calcolo le entità candidate per il selector finale
    const candidates = candidatesFor(
      this.hass, this.config, 'sensors', filters
    );

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${this._onExpandedChanged}
      >
        <div slot="header" class="glass-header">🌡️ Sensors</div>

        <div class="chip-container">
          <div class="input-group">
            <label>Filter sensor types:</label>
            <ha-selector
              .hass=${this.hass}
              .value=${filters}
              .selector=${{
                select: {
                  multiple: true,
                  mode: 'box',
                  options,
                }
              }}
              @value-changed=${e => this._onFilterChanged(e.detail.value)}
            ></ha-selector>
          </div>

          <div class="input-group">
            <label>Choose sensor entity:</label>
            <ha-selector
              .hass=${this.hass}
              .value=${cfg.entities?.sensors?.entity || ''}
              .selector=${{
                entity: {
                  multiple: false,
                  include_entities: candidates,
                }
              }}
              allow-custom-entity
              @value-changed=${e => this._fire('entities.sensors.entity', e.detail.value)}
            ></ha-selector>
          </div>
        </div>

        <!-- Qui potresti aggiungere altri controlli specifici del sensore -->

      </ha-expansion-panel>
    `;
  }

  _onFilterChanged(selected) {
    this.activeFilters = selected;
    this._fire('sensor_filters', selected);
  }

  _onExpandedChanged(e) {
    this.expanded = e.detail.expanded;
    this.dispatchEvent(new CustomEvent('expanded-changed', {
      detail: { expanded: e.detail.expanded },
      bubbles: true,
      composed: true,
    }));
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
