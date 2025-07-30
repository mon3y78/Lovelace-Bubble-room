// src/panels/SensorsPanel.js
import { LitElement, html, css } from 'lit';

const DEBUG = !!window.__BUBBLE_DEBUG__;
import { candidatesFor } from '../helpers/entity-filters.js';
// Se hai un mapping tipi/etichette, puoi importarlo. Qui rendo opzionale.
// import { SENSOR_TYPES } from '../helpers/sensor-mapping.js';

export class SensorsPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedSensors: { type: Array },
  };

  constructor() {
    super();
    
    if (!customElements.get('ha-entity-picker')) {
      customElements.whenDefined('ha-entity-picker').then(() => this.requestUpdate());
    }
this.hass = {};
    this.config = {};
    this._expanded = false;
    this._expandedSensors = Array(6).fill(false);
  }

  static styles = css`
    :host { display:block; }
    .glass-panel{
      margin:0!important; width:100%; box-sizing:border-box; border-radius:40px;
      background: var(--glass-bg, rgba(80,235,175,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px 0 rgba(40,220,145,0.18));
      position:relative; border:none;
    }
    .glass-header{
      position:relative; padding:22px 0 18px; text-align:center;
      font-size:1.12rem; font-weight:700; color:#fff;
    }
    .mini-pill{
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius: 24px; margin-bottom: 13px; overflow:hidden;
    }
    .mini-pill-header{
      display:flex; align-items:center; gap:14px; padding:15px 22px;
      font-size:1.02rem; font-weight:800; color:#36e6a0; cursor:pointer;
    }
    .chevron{ margin-left:auto; opacity:.64; transition:transform .18s; }
    .mini-pill.expanded .chevron{ transform: rotate(90deg); }
    .mini-pill-content{ padding:15px 22px; }
    .input-group{
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      border-radius:18px; margin-bottom: 13px; padding: 14px 18px 10px;
    }
    label{ display:block; margin-bottom:6px; color:#36e6a0; font-weight:700; }
    .reset-button{
      border:2px solid #ff4c6a; color:#ff4c6a; border-radius:12px; padding:8px 16px;
      background:transparent; cursor:pointer;
    }
  
/* Ensure HA pickers are visible and not collapsed */
ha-entity-picker,
ha-icon-picker,
ha-area-picker,
ha-device-picker,
ha-select {
  display: block;
  width: 100%;
  min-height: 56px;
  box-sizing: border-box;
}
/* Best-effort vaadin parts */
ha-entity-picker::part(input),
ha-entity-picker::part(text-field),
ha-entity-picker::part(combobox) {
  min-height: 56px;
}
`;

  render() {
    const ad = this.config?.auto_discovery_sections?.sensor || false;
    const keys = ['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6'];

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${(e) => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🌡️ Sensors</div>

        <div class="input-group" style="margin:0 16px 14px;">
          <label style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox"
              .checked=${ad}
              @change=${(e) => this._fire('auto_discovery_sections.sensor', e.target.checked)}>
            <span>🪄 Auto-discovery</span>
          </label>
        </div>

        ${keys.map((key, i) => this._renderSingle(i, key))}

        <div style="text-align:center; margin-top:1.2em; padding-bottom:16px;">
          <button class="reset-button" @click=${this._resetAll}>🧹 Reset Sensors</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderSingle(index, key) {
    const ent = this.config?.entities?.[key] || {};
    const expanded = !!this._expandedSensors[index];
    const label = ent.type ? `Sensor ${index + 1} – ${ent.type}` : `Sensor ${index + 1}`;

    // path helper (evita backtick annidati nel template!)
    const pathType = `entities.${key}.type`;
    const pathEntity = `entities.${key}.entity_id`;
    const typeValue = ent.type || '';
    const entityValue = ent.entity_id || '';

    const includeList = candidatesFor(this.hass, this.config, { section: 'sensor', type: typeValue });

    return html`
      <div class="mini-pill ${expanded ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${() => this._toggleOne(index)}>
          ${label}
          <span class="chevron">${expanded ? '▼' : '▶'}</span>
        </div>
        ${expanded ? html`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Sensor Type</label>
              <select .value=${typeValue} @change=${(e) => this._fire(pathType, e.target.value)}>
                <option value="">-- none --</option>
                <option value="temperature">🌡️ Temperature</option>
                <option value="humidity">💧 Humidity</option>
                <option value="pressure">🔽 Pressure</option>
                <option value="generic">🔎 Generic</option>
              </select>
            </div>

            <div class="input-group">
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${entityValue}
                .includeEntities=${includeList}
                allow-custom-entity
                @value-changed=${(e) => this._fire(pathEntity, e.detail.value)}
              ></ha-entity-picker>
            </div>

            ${this._renderUnit(index, typeValue, ent.unit)}
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderUnit(index, type, currentUnit) {
    const path = `entities.sensor${index + 1}.unit`;
    let units = [];
    if (type === 'temperature') units = ['°C', '°F', 'K'];
    else if (type === 'humidity') units = ['%'];
    else if (type === 'pressure') units = ['hPa', 'mbar', 'bar', 'psi'];

    return html`
      <div class="input-group">
        <label>Unit</label>
        <select .value=${currentUnit || (units[0] || '')}
                @change=${(e) => this._fire(path, e.target.value)}>
          ${units.map((u) => html`<option value=${u}>${u}</option>`)}
        </select>
      </div>
    `;
  }

  /* ---------- helpers ---------- */
  _toggleOne(i) {
    this._expandedSensors = this._expandedSensors.map((_, j) => j === i);
    this.requestUpdate();
  }

  _resetAll() {
    // reset centralizzato gestito dall'editor
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: 'sensor' } },
      bubbles: true, composed: true,
    }));
  }

  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val }, bubbles: true, composed: true,
    }));
  }
}

customElements.define('sensors-panel', SensorsPanel);