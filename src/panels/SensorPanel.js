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
    this.hass            = {};
    this.config          = {};
    this.expanded        = false;
    // track which of the 6 mini‐pills is open (only one at a time)
    this._expandedIndex  = -1;
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      // keep autodiscovery in sync
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.sensors');
      // ensure sensor_filters is at least an array
      if (!Array.isArray(this.config.sensor_filters)) {
        this.config.sensor_filters = [];
      }
      // ensure entities.sensorN exist
      if (!this.config.entities) this.config.entities = {};
    }
  }

  render() {
    const autoDisc = this.config.auto_discovery_sections?.sensors ?? false;
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => {
          this.expanded = e.detail.expanded;
          if (this.expanded) this._expandedIndex = -1;
          this._fire('panel-changed', { prop: 'expanded', val: this.expanded });
        }}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <!-- 1️⃣ Auto-discover -->
        <div class="autodiscover-box"
             @click=${() => this._toggleAuto(!autoDisc)}>
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
            @click=${e => e.stopPropagation()}
          />
          🪄 Auto-discover Sensors
        </div>

        <!-- 2️⃣ Six sub‐panels -->
        ${[...Array(6)].map((_, i) => this._renderSensorMiniPill(i))}

        <!-- 3️⃣ Reset -->
        <button class="reset-button"
                @click=${() => this._resetAllSensors()}>
          🧹 Reset Sensors
        </button>
      </ha-expansion-panel>
    `;
  }

  _renderSensorMiniPill(idx) {
    const key     = `sensor${idx + 1}`;
    const cfg     = this.config.entities[key] || {};
    const type    = cfg.type || '';
    const entity  = cfg.entity || '';
    const unit    = cfg.unit  || (SENSOR_TYPE_MAP[type]?.units[0] || '');
    const options = Object.entries(SENSOR_TYPE_MAP)
                          .map(([t, info]) => html`<option value=${t}>${info.emoji} ${info.label}</option>`);
    const candidates = candidatesFor(this.hass, this.config, 'sensors', type ? [type] : []);

    return html`
      <div class="mini-pill ${this._expandedIndex === idx ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${() => this._toggleMini(idx)}>
          Sensor ${idx + 1}
          <span class="chevron">▶</span>
        </div>
        ${this._expandedIndex === idx ? html`
          <div class="mini-pill-content">
            <!-- Type -->
            <div class="input-group">
              <label>Type</label>
              <select
                .value=${type}
                @change=${e => this._updateSensor(idx, 'type', e.target.value)}
              >
                <option value=''>— none —</option>
                ${options}
              </select>
            </div>

            <!-- Entity -->
            <div class="input-group">
              <label>Entity</label>
              <ha-selector
                .hass=${this.hass}
                .value=${entity}
                .selector=${{ entity: { include_entities: candidates, multiple: false } }}
                allow-custom-entity
                @value-changed=${e => this._updateSensor(idx, 'entity', e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Unit -->
            <div class="input-group">
              <label>Unit</label>
              <select
                .value=${unit}
                @change=${e => this._updateSensor(idx, 'unit', e.target.value)}
              >
                ${(SENSOR_TYPE_MAP[type]?.units || []).map(u => html`<option value=${u}>${u}</option>`)}
              </select>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  _toggleAuto(enabled) {
    this.config = {
      ...this.config,
      auto_discovery_sections: {
        ...this.config.auto_discovery_sections,
        sensors: enabled,
      },
    };
    this._fire('config-changed', this.config);
  }

  _toggleMini(idx) {
    this._expandedIndex = this._expandedIndex === idx ? -1 : idx;
    this.requestUpdate();
  }

  _updateSensor(idx, field, value) {
    const key = `sensor${idx + 1}`;
    const ent = { ...(this.config.entities[key] || {}) };
    ent[field] = value;
    // auto‐populate unit on type change
    if (field === 'type') {
      ent.unit = SENSOR_TYPE_MAP[value]?.units[0] || '';
    }
    this.config = {
      ...this.config,
      entities: {
        ...this.config.entities,
        [key]: ent,
      },
    };
    this._fire('config-changed', this.config);
  }

  _resetAllSensors() {
    const ents = { ...this.config.entities };
    for (let i = 1; i <= 6; i++) {
      delete ents[`sensor${i}`];
    }
    this.config = { ...this.config, entities: ents };
    this._fire('config-changed', this.config);
  }

  _stateFor(id) {
    return this.hass.states[id]?.state ?? '';
  }

  _fire(evt, detail) {
    this.dispatchEvent(new CustomEvent(evt, {
      detail,
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('sensor-panel', SensorPanel);
