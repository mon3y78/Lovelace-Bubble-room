// src/panels/SensorPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor }     from '../helpers/entity-filters.js';
import { SENSOR_TYPE_MAP }   from '../helpers/sensor-mapping.js';

export class SensorPanel extends LitElement {
  static properties = {
    hass:           { type: Object },
    config:         { type: Object },
    expanded:       { type: Boolean },
    _expandedIdx:   { type: Number, state: true },
    _filterTypes:   { type: Array, state: true },
    _selectedEnts:  { type: Array, state: true },
  };

  static styles = css`
    :host { display: block; }
    .glass-panel {
      position: relative;
      margin: 8px;
      border-radius: 24px;
      background: var(--glass-bg, rgba(167,255,175,0.22));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13));
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
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
      padding: 22px 0;
      text-align: center;
      font-size: 1.11rem;
      font-weight: 700;
      color: #fff;
    }
    .autodiscover-box {
      border: 2.5px solid #FFD600;
      box-shadow: 0 2px 24px #FFD60033;
      background: rgba(255,214,0,0.08);
      border-radius: 24px;
      display: flex; align-items: center; justify-content: center;
      margin: 0 16px 12px; padding: 14px 0;
      cursor: pointer; color: #fff; font-weight: 700; gap: 8px;
    }
    .autodiscover-box input { margin-right: 8px; }
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
      display: flex; align-items: center; padding: 12px 16px;
      cursor: pointer; user-select: none; font-weight: 700; color: #8cff8a;
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
    .input-group {
      margin-bottom: 12px;
    }
    .input-group label {
      display: block; margin-bottom: 4px;
      font-weight: 600; color: #8cff8a;
    }
    select, ha-selector {
      width: 100%; box-sizing: border-box; padding: 6px 8px;
    }
    .reset-button {
      border: 3.5px solid #ff4c6a;
      color: #ff4c6a;
      background: transparent;
      box-shadow: 0 2px 24px #ff4c6a44;
      border-radius: 24px;
      padding: 12px 38px;
      margin: 20px auto;
      display: block;
      font-size: 1.15rem; font-weight: 700;
      cursor: pointer;
      transition: background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18);
      color: #fff;
      border-color: #ff1744;
      box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;


  constructor() {
    super();
    this.hass          = {};
    this.config        = {};
    this.expanded      = false;
    this._expandedIdx  = -1;
    this._filterTypes  = Array(6).fill('');
    this._selectedEnts = Array(6).fill('');
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      // Autodiscovery per area
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.sensor');
      // Inizializza array filterTypes da config.sensor_filters (se esiste)
      const cf = this.config.sensor_filters;
      if (Array.isArray(cf)) {
        for (let i = 0; i < 6; i++) {
          this._filterTypes[i] = cf[i] || '';
        }
      }
      // Inizializza array selectedEnts da config.entities.sensor
      const ents = this.config.entities?.sensor || {};
      for (let i = 0; i < 6; i++) {
        this._selectedEnts[i] = ents[`sensor${i+1}`]?.entity || '';
      }
    }
  }

  render() {
    const autoDisc = this.config.auto_discovery_sections?.sensor ?? false;
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{ this.expanded=e.detail.expanded; this._expandedIdx=-1; }}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <!-- Auto-discover -->
        <div class="autodiscover-box" @click=${()=>this._toggleAuto(!autoDisc)}>
          <input type="checkbox" .checked=${autoDisc}
                 @change=${e=>this._toggleAuto(e.target.checked)}
                 @click=${e=>e.stopPropagation()} />
          🪄 Auto-discover Sensor
        </div>

        <!-- 6 mini-pill -->
        ${[...Array(6)].map((_,i)=>this._renderMini(i))}

        <!-- Reset -->
        <button class="reset-button" @click=${()=>this._resetAll()}>
          🧹 Reset Sensors
        </button>
      </ha-expansion-panel>
    `;
  }

  _renderMini(i) {
    const key      = `sensor${i+1}`;
    const cfg      = this.config.entities?.sensor?.[key] || {};
    const type     = this._filterTypes[i] || '';
    const entityId = this._selectedEnts[i]  || '';
    const stateObj = this.hass.states[entityId];
    const val      = stateObj?.state ?? '-';
    const unit     = stateObj?.attributes.unit_of_measurement
                   || SENSOR_TYPE_MAP[type]?.units[0]
                   || '';
    const icon     = stateObj?.attributes.icon
                   || SENSOR_TYPE_MAP[type]?.icon
                   || 'mdi:thermometer';

    // options chip
    const opts = Object.entries(SENSOR_TYPE_MAP)
      .map(([t,info]) => ({ value: t, label: info.label }));

    // candidates enti
    const candidates = candidatesFor(this.hass, this.config, 'sensor', type?[type]:[]);

    return html`
      <div class="mini-pill ${this._expandedIdx===i?'expanded':''}">
        <div class="mini-pill-header" @click=${()=>this._toggleMini(i)}>
          Sensor ${i+1}
          <span class="chevron">▶</span>
        </div>
        ${this._expandedIdx===i? html`
        <div class="mini-pill-content">
          <!-- Filter category -->
          <div class="input-group">
            <label>Filter category:</label>
            <ha-selector
              .hass=${this.hass}
              .value=${[type]}
              .selector=${{
                select: { multiple: false, mode: 'box', options: opts }
              }}
              @value-changed=${e=>this._onFilterChanged(i,e.detail.value[0]||'')}
            ></ha-selector>
          </div>

          <!-- Entity -->
          <div class="input-group">
            <label>Entity:</label>
            <ha-selector
              .hass=${this.hass}
              .value=${entityId}
              .selector=${{ entity:{ include_entities:candidates, multiple:false } }}
              allow-custom-entity
              @value-changed=${e=>this._onEntityChanged(i,e.detail.value)}
            ></ha-selector>
          </div>

          <!-- Preview -->
          <div class="preview">
            <ha-icon .icon=${icon}></ha-icon>
            <div class="state">${val}${unit?` ${unit}`:''}</div>
          </div>
        </div>` : '' }
      </div>`;
  }

  _toggleAuto(on) {
    const auto = {...(this.config.auto_discovery_sections||{})};
    auto.sensor = on;
    this.config = {...this.config, auto_discovery_sections:auto};
    this._fire('config-changed', this.config);
  }
  _toggleMini(i) {
    this._expandedIdx = this._expandedIdx===i?-1:i;
    this.requestUpdate();
  }

  _onFilterChanged(i, type) {
    this._filterTypes[i] = type;
    const arr = [...this._filterTypes];
    this.config = {...this.config, sensor_filters: arr};
    this._fire('config-changed', this.config);
  }
  _onEntityChanged(i, ent) {
    this._selectedEnts[i] = ent;
    const ents = {...(this.config.entities?.sensor||{})};
    ents[`sensor${i+1}`] = { ...(ents[`sensor${i+1}`]||{}), entity: ent };
    this.config = {...this.config, entities:{ ...this.config.entities, sensor: ents }};
    this._fire('config-changed', this.config);
  }

  _resetAll() {
    this.config = {
      ...this.config,
      sensor_filters: [],
      entities: { ...this.config.entities, sensor: {} }
    };
    this._fire('config-changed', this.config);
  }

  _fire(evt, detail) {
    this.dispatchEvent(new CustomEvent(evt, {
      detail, bubbles:true, composed:true
    }));
  }
}

customElements.define('sensor-panel', SensorPanel);