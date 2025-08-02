// src/panels/SensorPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor } from '../helpers/entity-filters.js';
import { SENSOR_TYPE_MAP } from '../helpers/sensor-mapping.js';

export class SensorPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    expanded: { type: Boolean },
    filterType: { type: String, state: true },
    selectedEntity: { type: String, state: true },
  };
  
  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 8px;
      border-radius: 24px;
      background: var(--glass-bg, rgba(200,200,200,0.1));
      box-shadow: var(--glass-shadow, 0 2px 8px rgba(0,0,0,0.1));
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen, rgba(255,255,255,0.03));
      pointer-events: none;
    }
    .glass-header {
      padding: 12px;
      font-weight: bold;
      color: var(--primary-text-color);
    }
    .autodiscover-box,
    .reset-button {
      border: 2.5px solid #FFD600 !important;
      box-shadow: 0 2px 24px 0 #FFD60033 !important;
      background: rgba(255,214,0,0.08) !important;
      border-radius: 24px !important;
      backdrop-filter: blur(7px) saturate(1.2) !important;
      display: flex; align-items: center; justify-content: center;
      margin: 0 16px 12px; padding: 14px 0;
      cursor: pointer; color: #fff; font-weight: 700; gap: 8px;
      position: relative;
    }
    .autodiscover-box input {
      margin-right: 8px;
    }
    .input-group {
      padding: 0 16px 12px;
    }
    .input-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 4px;
      color: var(--secondary-text-color);
    }
    ha-selector {
      width: 100%;
      box-sizing: border-box;
    }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      backdrop-filter: blur(7px) saturate(1.2);
      border-radius: 24px; margin: 8px 16px; overflow: hidden;
    }
    .mini-pill-header {
      display: flex; align-items: center; padding: 12px 16px;
      cursor: pointer; user-select: none; font-weight: 700;
    }
    .mini-pill-header .chevron {
      margin-left: auto; transition: transform 0.2s;
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
    .preview {
      display: flex; align-items: center; gap: 12px;
      padding: 0 16px 16px;
    }
    .preview ha-icon { --mdc-icon-size: 32px; }
    .preview .state { font-size: 1.2rem; }
  `;
  
  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.expanded = false;
    this.filterType = '';
    this.selectedEntity = '';
    this._expandedPills = false;
  }
  
  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      // 1) Autodiscover per sezione "sensors"
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.sensors');
      // 2) Sincronizza filterType da config.sensor_filters (primo elemento)
      const cfgFilters = this.config.sensor_filters;
      if (Array.isArray(cfgFilters) && cfgFilters[0] !== this.filterType) {
        this.filterType = cfgFilters[0] || '';
      }
      // 3) Sincronizza selectedEntity da config.entities.sensors.entity
      const e = this.config.entities?.sensors?.entity;
      if (e && e !== this.selectedEntity) this.selectedEntity = e;
    }
  }
  
  render() {
    const autoDisc = this.config.auto_discovery_sections?.sensors ?? false;
    
    // Opzioni chip dai tipi definiti in SENSOR_TYPE_MAP
    const options = Object.entries(SENSOR_TYPE_MAP).map(([type, info]) => ({
      value: type,
      label: info.label,
    }));
    
    // Entità candidate: dominio "sensor", filtro device_class e area
    const cats = this.filterType ? [this.filterType] : [];
    const candidates = candidatesFor(this.hass, this.config, 'sensors', cats);
    
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => this.expanded = e.detail.expanded}
      >
        <div slot="header" class="glass-header">🔢 Sensor</div>

        <!-- Autodiscover -->
        <div class="autodiscover-box"
             @click=${() => this._toggleAuto(!autoDisc)}>
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
            @click=${e => e.stopPropagation()}
          />🪄 Auto-discover Sensors
        </div>

        <!-- Filter device_class -->
        <div class="input-group">
          <label>Filter category:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this.filterType ? [this.filterType] : []}
            .selector=${{ select: { multiple: false, mode: 'box', options } }}
            @value-changed=${e => this._onFilterChanged(e.detail.value[0] || '')}
          ></ha-selector>
        </div>

        <!-- Entity selector -->
        <div class="input-group">
          <label>Entity:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this.selectedEntity}
            .selector=${{ entity: { include_entities: candidates, multiple: false } }}
            allow-custom-entity
            @value-changed=${e => this._onEntityChanged(e.detail.value)}
          ></ha-selector>
        </div>

        <!-- Preview -->
        ${this.selectedEntity ? html`
          <div class="preview">
            <ha-icon .icon=${this._iconFor(this.selectedEntity)}></ha-icon>
            <div class="state">
              ${this._stateFor(this.selectedEntity)}
              ${this._unitFor(this.selectedEntity)}
            </div>
          </div>
        ` : ''}

        <!-- Reset -->
        <div class="reset-button" @click=${() => this._reset()}>
          🧹 Reset Sensor
        </div>
      </ha-expansion-panel>
    `;
  }
  
  _toggleAuto(enabled) {
    const auto = { ...(this.config.auto_discovery_sections || {}) };
    auto.sensors = enabled;
    this.config = { ...this.config, auto_discovery_sections: auto };
    this._fire('auto_discovery_sections.sensors', enabled);
  }
  
  _onFilterChanged(type) {
    this.filterType = type;
    this._fire('sensor_filters', [type]);
  }
  
  _onEntityChanged(entity) {
    this.selectedEntity = entity;
    this._fire('entities.sensors.entity', entity);
  }
  
  _stateFor(id) {
    return this.hass.states[id]?.state ?? '';
  }
  
  _unitFor(id) {
    return this.hass.states[id]?.attributes?.unit_of_measurement ||
      SENSOR_TYPE_MAP[this.filterType]?.units[0] ||
      '';
  }
  
  _iconFor(id) {
    return this.hass.states[id]?.attributes?.icon ||
      SENSOR_TYPE_MAP[this.filterType]?.icon ||
      'mdi:thermometer';
  }
  
  _reset() {
    this.filterType = '';
    this.selectedEntity = '';
    this._fire('sensor_filters', []);
    this._fire('entities.sensors.entity', '');
  }
  
  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('sensor-panel', SensorPanel);