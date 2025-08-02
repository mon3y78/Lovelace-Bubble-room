// src/panels/SensorPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover }   from '../helpers/auto-discovery.js';
import { candidatesFor }       from '../helpers/entity-filters.js';
import { SENSOR_TYPE_MAP }     from '../helpers/sensor-mapping.js';

export class SensorPanel extends LitElement {
  static properties = {
    hass:           { type: Object },
    config:         { type: Object },
    expanded:       { type: Boolean },
    _expanded:      { type: Array, state: true },
    sensorFilters:  { type: Array,  state: true }, // array of single type per sensor
    selectedEntity: { type: Object, state: true }, // map index→entity_id
  };

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 8px; border-radius: 24px;
      background: var(--glass-bg, rgba(167,255,175,0.22));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13));
      position: relative;
    }
    .glass-panel::after {
      content: ''; position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg,rgba(255,255,255,0.11),
        rgba(255,255,255,0.07) 70%,transparent 100%));
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0; text-align: center;
      font-size: 1.11rem; font-weight: 700; color: #fff;
    }
    .autodiscover-box {
      border: 2.5px solid #FFD600; box-shadow: 0 2px 24px #FFD60033;
      background: rgba(255,214,0,0.08); border-radius: 24px;
      display: flex; align-items: center; justify-content: center;
      margin: 0 16px 12px; padding: 14px 0; cursor: pointer;
      color: #fff; font-weight: 700; gap: 8px;
    }
    .autodiscover-box input { margin-right: 8px; }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      backdrop-filter: blur(7px) saturate(1.2);
      border-radius: 24px; margin: 8px 16px; overflow: hidden;
    }
    .mini-pill-header {
      display: flex; align-items: center; padding: 12px 16px;
      cursor: pointer; user-select: none; font-weight: 700; color: #8cff8a;
    }
    .mini-pill-header .chevron { margin-left: auto; transition: transform 0.2s; }
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
    .input-group { margin-bottom: 12px; }
    .input-group label {
      display: block; font-weight: 600; margin-bottom: 4px;
      color: #8cff8a;
    }
    ha-selector { width: 100%; box-sizing: border-box; }
    ha-selector::part(combobox) {
      min-height: 40px;
    }
    /* Preview */
    .preview {
      display: flex; align-items: center; gap: 12px;
      padding: 0 16px 16px;
    }
    .preview ha-icon { --mdc-icon-size: 32px; color: #fff; }
    .preview .state { font-size: 1.2rem; color: #fff; }
    .reset-button {
      border: 3.5px solid #ff4c6a; color: #ff4c6a; background: transparent;
      box-shadow: 0 2px 24px #ff4c6a44; border-radius: 24px;
      padding: 12px 38px; margin: 20px auto; display: block;
      font-size: 1.15rem; font-weight: 700; cursor: pointer;
      transition: background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18); color: #fff;
      border-color: #ff1744; box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;

  constructor() {
    super();
    this.hass            = {};
    this.config          = {};
    this.expanded        = false;
    this._expanded       = Array(6).fill(false);
    this.sensorFilters   = Array(6).fill('');
    this.selectedEntity  = Array(6).fill('');
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.sensor');
      // initialize from config.entities.sensorX.type / entity
      for (let i = 0; i < 6; i++) {
        const key = `sensor${i+1}`;
        const ent = this.config.entities?.[key]?.entity;
        const typ = this.config.entities?.[key]?.type;
        if (ent) this.selectedEntity[i] = ent;
        if (typ) this.sensorFilters[i] = typ;
      }
    }
  }

  render() {
    const autoDisc = this.config.auto_discovery_sections?.sensor ?? false;
    // options for filter category
    const options = Object.entries(SENSOR_TYPE_MAP).map(([type, info]) => ({
      value: type,
      label: info.label,
    }));
    // for each sensor panel
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => {
          this.expanded = e.detail.expanded;
          if (this.expanded) {
            this._expanded = Array(6).fill(false);
          }
        }}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <!-- 1️⃣ Auto-discover -->
        <div class="autodiscover-box" @click=${()=> this._toggleAuto(!autoDisc)}>
          <input type="checkbox"
            .checked=${autoDisc}
            @change=${e=>this._toggleAuto(e.target.checked)}
            @click=${e=>e.stopPropagation()} />
          🪄 Auto-discover Sensors
        </div>

        <!-- 2️⃣ Six sensor pills -->
        ${Array(6).fill(0).map((_, i) => this._renderSensorPill(i, options, autoDisc))}

        <!-- 3️⃣ Reset -->
        <button class="reset-button" @click=${()=>this._resetSensors()}>
          🧹 Reset Sensors
        </button>
      </ha-expansion-panel>
    `;
  }

  _renderSensorPill(i, options, autoDisc) {
    const idx = i;
    const key = `sensor${i+1}`;
    const expanded = this._expanded[idx];
    const filter = this.sensorFilters[idx];
    const ent    = this.selectedEntity[idx];
    // compute candidates: domain=sensor, area, and device_class=filter
    const candidates = candidatesFor(this.hass, this.config, 'sensor', filter ? [filter] : []);

    return html`
      <div class="mini-pill ${expanded ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(idx)}>
          Sensor ${i+1}<span class="chevron">▶</span>
        </div>
        ${expanded ? html`
          <div class="mini-pill-content">
            <!-- Filter category -->
            <div class="input-group">
              <label>Filter category:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${filter ? [filter] : []}
                .selector=${{ select:{ multiple:false, mode:'box', options }}}
                @value-changed=${e=>this._onFilterChanged(idx, e.detail.value[0]||'')}
              ></ha-selector>
            </div>

            <!-- Entity selector -->
            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${ent}
                .selector=${{ entity:{ include_entities:candidates, multiple:false }}}
                allow-custom-entity
                @value-changed=${e=>this._onEntityChanged(idx, e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Preview -->
            <div class="preview">
              <ha-icon
                .icon=${SENSOR_TYPE_MAP[filter]?.icon || 'mdi:thermometer'}
              ></ha-icon>
              <div class="state">
                ${this.hass.states?.[ent]?.state ?? '-'}
                ${this.hass.states?.[ent]?.attributes?.unit_of_measurement ?? ''}
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  _toggleAuto(on) {
    const ad = { ...(this.config.auto_discovery_sections||{}) };
    ad.sensor = on;
    this.config = { ...this.config, auto_discovery_sections: ad };
    this._fire('config-changed', this.config);
  }

  _togglePill(idx) {
    this._expanded = this._expanded.map((v,i)=> i===idx ? !v : false);
    this.requestUpdate();
  }

  _onFilterChanged(idx, type) {
    this.sensorFilters[idx] = type;
    const key = `sensor${idx+1}`;
    const ents = { ...(this.config.entities||{}) };
    ents[key] = { ...(ents[key]||{}), type };
    this.config = { ...this.config, entities: ents };
    this._fire('config-changed', this.config);
  }

  _onEntityChanged(idx, ent) {
    this.selectedEntity[idx] = ent;
    const key = `sensor${idx+1}`;
    const ents = { ...(this.config.entities||{}) };
    ents[key] = { ...(ents[key]||{}), entity: ent };
    this.config = { ...this.config, entities: ents };
    this._fire('config-changed', this.config);
  }

  _resetSensors() {
    const ents = { ...(this.config.entities||{}) };
    Array(6).fill(0).forEach((_,i)=> delete ents[`sensor${i+1}`]);
    this.config = { ...this.config, entities: ents };
    this.sensorFilters  = Array(6).fill('');
    this.selectedEntity = Array(6).fill('');
    this._expanded       = Array(6).fill(false);
    this._fire('config-changed', this.config);
  }

  _fire(evt, detail) {
    this.dispatchEvent(new CustomEvent(evt, {
      detail, bubbles:true, composed:true
    }));
  }
}

customElements.define('sensor-panel', SensorPanel);