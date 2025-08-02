// src/panels/SensorsPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor } from '../helpers/entity-filters.js';

// Mappa completa delle classi di sensore e relative emoji/unità
const SENSOR_TYPE_MAP = {
  temperature: { emoji: '🌡️', units: ['°C', '°F'], label: 'Temperature' },
  humidity: { emoji: '💦', units: ['%'], label: 'Humidity' },
  co2: { emoji: '🟢', units: ['ppm'], label: 'CO₂' },
  illuminance: { emoji: '☀️', units: ['lx'], label: 'Illuminance' },
  pm1: { emoji: '🟤', units: ['µg/m³'], label: 'PM1' },
  pm25: { emoji: '⚫️', units: ['µg/m³'], label: 'PM2.5' },
  pm10: { emoji: '⚪️', units: ['µg/m³'], label: 'PM10' },
  uv: { emoji: '🌞', units: ['UV'], label: 'UV Index' },
  noise: { emoji: '🔊', units: ['dB'], label: 'Noise' },
  pressure: { emoji: '📈', units: ['hPa'], label: 'Pressure' },
  voc: { emoji: '🧪', units: ['ppb'], label: 'VOC' },
  consumption: { emoji: '⚡️', units: ['W', 'kWh', 'Wh'], label: 'Consumption' },
  production: { emoji: '🔆', units: ['W', 'kWh', 'Wh'], label: 'Production' },
};

// Configurazione dei sei slot sensore
const SIX_SENSORS = [
  { key: 'sensor1', label: 'Sensor 1' },
  { key: 'sensor2', label: 'Sensor 2' },
  { key: 'sensor3', label: 'Sensor 3' },
  { key: 'sensor4', label: 'Sensor 4' },
  { key: 'sensor5', label: 'Sensor 5' },
  { key: 'sensor6', label: 'Sensor 6' },
];

export class SensorsPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    expanded: { type: Boolean },
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
      background: var(--glass-bg, rgba(167,255,175,0.22));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13));
    }
    .glass-panel::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen, linear-gradient(
        120deg,
        rgba(255,255,255,0.11),
        rgba(255,255,255,0.07) 70%,
        transparent 100%
      ));
      pointer-events: none;
    }
    .glass-header {
      position: relative;
      padding: 22px 0 18px;
      text-align: center;
      font-size: 1.11rem;
      font-weight: 700;
      color: #fff;
    }
    .input-group {
      margin: 12px 16px;
    }
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 4px;
      color: var(--primary-text-color);
    }
    ha-selector, select, input[type="text"] {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 8px;
      font-size: 1rem;
    }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      backdrop-filter: blur(7px) saturate(1.2);
      border-radius: 24px;
      margin: 8px 16px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      cursor: pointer;
      user-select: none;
      font-weight: 700;
    }
    .mini-pill-header .chevron {
      margin-left: auto;
      transition: transform 0.2s;
    }
    .mini-pill.expanded .mini-pill-header .chevron {
      transform: rotate(90deg);
    }
    .mini-pill-content {
      padding: 12px 16px 16px;
      animation: pill-expand 0.2s ease-out both;
    }
    @keyframes pill-expand {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .reset-button {
      border: 3px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 12px;
      padding: 10px 24px;
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
    this._expandedSensors = Array(6).fill(false);
  }
  
  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      // Applica l’autodiscovery quando cambia l’area
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.sensors');
    }
  }
  
  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => this._onExpandedChanged(e)}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>
        ${SIX_SENSORS.map((sp, idx) => this._renderSensorPill(sp, idx))}
        <button class="reset-button"
          @click=${() => this._resetSensorConfig()}
        >🧹 Reset Sensors</button>
      </ha-expansion-panel>
    `;
  }
  
  _renderSensorPill({ key, label }, idx) {
    const entConf = this.config.entities?.[key] || {};
    const type = entConf.type || '';
    const unit = entConf.unit || '';
    const options = Object.entries(SENSOR_TYPE_MAP).map(([t, o]) => ({
      value: t,
      label: `${o.emoji} ${o.label}`
    }));
    // Le entità candidate tengono conto di tipo e area (grazie ad autodiscovery impostato in updated())
    const candidates = candidatesFor(this.hass, this.config, 'sensors', type ? [type] : []);
    
    return html`
      <div class="mini-pill ${this._expandedSensors[idx] ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${() => this._toggleSensorExpand(idx)}>
          ${label}<span class="chevron">▶</span>
        </div>
        ${this._expandedSensors[idx] ? html`
          <div class="mini-pill-content">
            <!-- 1) Type as chips -->
            <div class="input-group">
              <label>Type</label>
              <ha-selector
                .hass=${this.hass}
                .value=${type ? [type] : []}
                .selector=${{
                  select: {
                    multiple: false,
                    mode: 'box',
                    options,
                  }
                }}
                @value-changed=${e => this._updateSensor(idx, 'type', e.detail.value[0] || '')}
              ></ha-selector>
            </div>
            <!-- 2) Entity picker -->
            <div class="input-group">
              <label>Entity</label>
              <ha-selector
                .hass=${this.hass}
                .value=${entConf.entity || ''}
                .selector=${{
                  entity: {
                    include_entities: candidates,
                    multiple: false,
                  }
                }}
                allow-custom-entity
                @value-changed=${e => this._updateSensor(idx, 'entity', e.detail.value)}
              ></ha-selector>
            </div>
            <!-- 3) Unit selector -->
            <div class="input-group">
              <label>Unit</label>
              <ha-selector
                .hass=${this.hass}
                .value=${unit ? [unit] : []}
                .selector=${{
                  select: {
                    multiple: false,
                    mode: 'box',
                    options: (SENSOR_TYPE_MAP[type]?.units || []).map(u => ({ value: u, label: u }))
                  }
                }}
                @value-changed=${e => this._updateSensor(idx, 'unit', e.detail.value[0] || '')}
              ></ha-selector>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
  
  _toggleSensorExpand(idx) {
    this._expandedSensors = this._expandedSensors.map((_, i) => i === idx);
    this.requestUpdate();
  }
  
  _onExpandedChanged(e) {
    this.expanded = e.detail.expanded;
    this.dispatchEvent(new CustomEvent('expanded-changed', {
      detail: { expanded: this.expanded },
      bubbles: true,
      composed: true,
    }));
  }
  
  _updateSensor(idx, field, value) {
    const key = `sensor${idx+1}`;
    const current = this.config.entities?.[key] || {};
    const updated = { ...current, [field]: value };
    // Se cambio il type, imposto unità di default
    if (field === 'type') {
      updated.unit = SENSOR_TYPE_MAP[value]?.units[0] || '';
    }
    const entities = { ...(this.config.entities || {}), [key]: updated };
    this.config = { ...this.config, entities };
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    }));
  }
  
  _resetSensorConfig() {
    const entities = { ...(this.config.entities || {}) };
    SIX_SENSORS.forEach(({ key }) => delete entities[key]);
    this.config = { ...this.config, entities };
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('sensors-panel', SensorsPanel);