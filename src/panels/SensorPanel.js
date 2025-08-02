// src/panels/SensorPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor }     from '../helpers/entity-filters.js';
import { SENSOR_TYPE_MAP }   from '../helpers/sensor-mapping.js';

export class SensorPanel extends LitElement {
  static properties = {
    hass:          { type: Object },
    config:        { type: Object },
    expanded:      { type: Boolean },
    _expanded:     { type: Array, state: true },
    _filters:      { type: Array, state: true },
    _entities:     { type: Array, state: true },
  };

  constructor() {
    super();
    this.hass      = {};
    this.config    = {};
    this.expanded  = false;
    this._expanded = Array(6).fill(false);
    this._filters  = Array(6).fill('');
    this._entities = Array(6).fill('');
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      // Mantieni l’autodiscovery centralizzato su “sensor”
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.sensor');
      // Inizializza filtri e entità da config.entities.sensor1…sensor6
      for (let i = 0; i < 6; i++) {
        const key = `sensor${i+1}`;
        const ent = this.config.entities?.[key]?.entity;
        const typ = this.config.entities?.[key]?.type;
        if (typ  && typ  !== this._filters[i])  this._filters[i]  = typ;
        if (ent  && ent  !== this._entities[i]) this._entities[i] = ent;
      }
    }
  }

  static styles = css`
    :host { display: block; }

    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(167,255,175,0.22));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13));
      overflow: hidden;
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg,rgba(255,255,255,0.11),
        rgba(255,255,255,0.07) 70%,transparent 100%));
      pointer-events: none;
    }

    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }

    /* ===== Auto-discover identico a RoomPanel ===== */
    .input-group.autodiscover {
      margin: 0 16px 13px;
      padding: 14px 18px 10px;
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 18px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .input-group.autodiscover label {
      margin: 0;
      font-weight: 700;
      color: #fff;
    }
    .input-group.autodiscover input {
      margin-right: 8px;
    }

    /* ===== Mini-pill sensors ===== */
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
      display: block; font-weight: 600; margin-bottom: 6px; color: #8cff8a;
    }
    ha-selector {
      width: 100%; box-sizing: border-box;
    }
    ha-selector::part(combobox) {
      min-height: 40px;
    }

    .preview {
      display: flex; align-items: center; gap: 12px; padding: 0 16px 16px;
    }
    .preview ha-icon { --mdc-icon-size: 32px; color: #fff; }
    .preview .state { font-size: 1.2rem; color: #fff; }

    /* ===== Reset identico a RoomPanel ===== */
    .reset-button {
      border: 3.5px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 24px;
      padding: 12px 38px;
      background: transparent;
      cursor: pointer;
      display: block;
      margin: 20px auto;
      font-size: 1.15rem;
      font-weight: 700;
      box-shadow: 0 2px 24px #ff4c6a44;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18);
      color: #fff;
      box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;

  render() {
    const autoDisc = this.config.auto_discovery_sections?.sensor ?? false;
    const options  = Object.entries(SENSOR_TYPE_MAP)
      .map(([type,info]) => ({ value: type, label: info.label }));

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => {
          this.expanded = e.detail.expanded;
          if (this.expanded) this._expanded = Array(6).fill(false);
        }}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <!-- 1️⃣ Auto-discover -->
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto-discover Sensor</label>
        </div>

        <!-- 2️⃣ Sei mini-pill -->
        ${Array(6).fill(0).map((_, i) => this._renderSensor(i, options))}

        <!-- 3️⃣ Reset -->
        <button class="reset-button" @click=${() => this._reset()}>
          🧹 Reset Sensors
        </button>
      </ha-expansion-panel>
    `;
  }

  _renderSensor(i, options) {
    const open = this._expanded[i];
    const type = this._filters[i];
    const ent  = this._entities[i];
    const key  = `sensor${i+1}`;
    const candidates = candidatesFor(this.hass, this.config, 'sensor', type ? [type] : []);

    return html`
      <div class="mini-pill ${open ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${() => this._togglePill(i)}>
          Sensor ${i+1}
          <span class="chevron">${open ? '▼' : '▶'}</span>
        </div>
        ${open ? html`
          <div class="mini-pill-content">
            <!-- Filter category -->
            <div class="input-group">
              <label>Filter category:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${type ? [type] : []}
                .selector=${{ select: { multiple: false, mode: 'box', options } }}
                @value-changed=${e => this._onFilter(i, e.detail.value[0] || '')}
              ></ha-selector>
            </div>

            <!-- Entity -->
            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${ent}
                .selector=${{ entity: { include_entities: candidates, multiple: false } }}
                allow-custom-entity
                @value-changed=${e => this._onEntity(i, e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Preview -->
            <div class="preview">
              <ha-icon .icon=${SENSOR_TYPE_MAP[type]?.icon || 'mdi:thermometer'}></ha-icon>
              <div class="state">
                ${this.hass.states?.[ent]?.state || '-'}
                ${this.hass.states?.[ent]?.attributes?.unit_of_measurement || ''}
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  _toggleAuto(on) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'auto_discovery_sections.sensor', val: on },
      bubbles: true, composed: true,
    }));
  }

  _togglePill(i) {
    this._expanded = this._expanded.map((v, idx) => idx === i ? !v : false);
    this.requestUpdate();
  }

  _onFilter(i, type) {
    this._filters[i] = type;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: `entities.sensor${i+1}.type`, val: type },
      bubbles: true, composed: true,
    }));
  }

  _onEntity(i, entity) {
    this._entities[i] = entity;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: `entities.sensor${i+1}.entity`, val: entity },
      bubbles: true, composed: true,
    }));
  }

  _reset() {
    // chiudi e resetta interno
    this._expanded = Array(6).fill(false);
    this._filters  = Array(6).fill('');
    this._entities = Array(6).fill('');
    // notifica reset per ciascun sensore
    for (let i = 1; i <= 6; i++) {
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: `sensor${i}` } },
        bubbles: true, composed: true,
      }));
    }
  }
}

customElements.define('sensor-panel', SensorPanel);
