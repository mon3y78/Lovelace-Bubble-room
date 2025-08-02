// src/panels/SensorPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor } from '../helpers/entity-filters.js';
// Import della mappa centralizzata
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
    .glass-header {
      padding: 12px;
      font-weight: bold;
      color: var(--primary-text-color);
    }
    .input-group { padding: 0 16px 12px; }
    .input-group label {
      display: block; font-weight: 600; margin-bottom: 4px;
      color: var(--secondary-text-color);
    }
    ha-selector { width: 100%; box-sizing: border-box; }

    .autodiscover-box, .reset-button {
      border: 2.5px solid #FFD600 !important;
      box-shadow: 0 2px 24px 0 #FFD60033 !important;
      background: rgba(255,214,0,0.08) !important;
      border-radius: 24px !important;
      backdrop-filter: blur(7px) saturate(1.2) !important;
      display: flex; align-items: center; justify-content: center;
      margin: 0 16px 12px; padding: 14px 0;
      cursor: pointer; color: #fff; font-weight: 700; gap: 8px;
    }
    .autodiscover-box input {
      margin-right: 8px;
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
  }
  
  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.sensor');
      // Inizializza da config, se presente
      const f = this.config.sensor_filter;
      if (f && f !== this.filterType) this.filterType = f;
      const e = this.config.entities?.sensor?.entity;
      if (e && e !== this.selectedEntity) this.selectedEntity = e;
    }
  }
  
  render() {
    const autoDisc = this.config.auto_discovery_sections?.sensor ?? false;
    // Opzioni chip: tutte le device_class da SENSOR_TYPE_MAP
    const options = Object.entries(SENSOR_TYPE_MAP).map(([type, { label }]) => ({
      value: type,
      label,
    }));
    // Candidate entities: dominio sensor + area + filtro type
    const cats = this.filterType ? [this.filterType] : [];
    const candidates = candidatesFor(this.hass, this.config, 'sensor', cats);
    
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => this.expanded = e.detail.expanded}
      >
        <div slot="header" class="glass-header">🔢 Sensor</div>

        <!-- Autodiscover -->
        <div class="autodiscover-box" @click=${() => this._toggleAuto(!autoDisc)}>
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
            @click=${e => e.stopPropagation()}
          />🪄 Auto-discover Sensor
        </div>

        <!-- Filter Type as chips -->
        <div class="input-group">
          <label>Filter categories:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this.filterType ? [this.filterType] : []}
            .selector=${{
              select: { multiple: false, mode: 'box', options }
            }}
            @value-changed=${e => this._onFilterChanged(e.detail.value[0] || '')}
          ></ha-selector>
        </div>

        <!-- Entity selector -->
        <div class="input-group">
          <label>Entity:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this.selectedEntity}
            .selector=${{
              entity: { include_entities: candidates, multiple: false }
            }}
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
    auto.sensor = enabled;
    this.config = { ...this.config, auto_discovery_sections: auto };
    this._fire('auto_discovery_sections.sensor', enabled);
  }
  
  _onFilterChanged(type) {
    this.filterType = type;
    this._fire('sensor_filter', type);
  }
  
  _onEntityChanged(entity) {
    this.selectedEntity = entity;
    this._fire('entities.sensor.entity', entity);
  }
  
  _stateFor(entityId) {
    return this.hass.states[entityId]?.state ?? '';
  }
  
  _unitFor(entityId) {
    return this.hass.states[entityId]?.attributes?.unit_of_measurement ||
      SENSOR_TYPE_MAP[this.filterType]?.units[0] || '';
  }
  
  _iconFor(entityId) {
    return this.hass.states[entityId]?.attributes?.icon || 'mdi:thermometer';
  }
  
  _reset() {
    this.filterType = '';
    this.selectedEntity = '';
    this._fire('sensor_filter', '');
    this._fire('entities.sensor.entity', '');
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