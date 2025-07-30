// src/bubble-room-editor.js
import { LitElement, html, css } from 'lit';

const DEBUG = !!window.__BUBBLE_DEBUG__;

// Pannelli modulari
import './panels/RoomPanel.js';
import './panels/SensorsPanel.js';
import './panels/MushroomsPanel.js';
import './panels/SubButtonsPanel.js';
import './panels/ColorsPanel.js';
import { maybeAutoDiscover, resetSensors, resetMushrooms, resetSubButtons, resetRoom } from './helpers/auto-discovery.js';

export class BubbleRoomEditor extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
  };
  
  constructor() {
    super();
    this.hass = {};
    this.config = {};
  }
  
  setConfig(config) {
    this.config = {
      ...config,
      sensors: Array.isArray(config.sensors) ? config.sensors : [],
      mushrooms: Array.isArray(config.mushrooms) ? config.mushrooms : [],
      subbuttons: Array.isArray(config.subbuttons) ? config.subbuttons : [],
      colors: config.colors ? config.colors : { room: {}, subbutton: {} },
    };
  }
  
  getConfig() {
    return { ...this.config };
  }
  
  render() {
    return html`
      <div class="editor-container">
        <room-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @panel-changed="${this._onPanelChanged}"
        ></room-panel>

        <sensors-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @panel-changed="${this._onPanelChanged}"
        ></sensors-panel>

        <mushrooms-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @panel-changed="${this._onPanelChanged}"
        ></mushrooms-panel>

        <subbuttons-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @panel-changed="${this._onPanelChanged}"
        ></subbuttons-panel>

        <colors-panel
          .config="${this.config}"
          @panel-changed="${this._onPanelChanged}"
        ></colors-panel>
      </div>
    `;
  }
  
  _onPanelChanged(e) {
    const { prop, val } = e.detail || {};
    if (!prop) return;
    const mapped = this._mapLegacyPath(prop);
    if (DEBUG) console.info('[Editor][panel-changed]', { prop, mapped, val });
    this._setByPath(this.config, mapped, val);

    // Auto-discovery per-sezione (incl. presence)
    this.config = maybeAutoDiscover(this.hass, this.config, prop, DEBUG);
// Reset per-sezione delegato dai pannelli
if (prop === '__panel_cmd__' && val && val.cmd === 'reset') {
  const section = val.section;
  if (section === 'sensor')    this.config = resetSensors(this.config);
  if (section === 'mushroom')  this.config = resetMushrooms(this.config);
  if (section === 'subbutton') this.config = resetSubButtons(this.config);
  if (section === 'room')      this.config = resetRoom(this.config);
  if (DEBUG) console.info('[Reset]', section);
}


    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.getConfig() },
      bubbles: true,
      composed: true,
    }));
  }
  
  // Converte path legacy dei pannelli in path sugli array usati dalla card
  _mapLegacyPath(p) {
    if (p && p.startsWith('entities.')) {
      const key = p.slice('entities.'.length);
      
      // sensors: entities.sensor1 -> sensors[0]
      let m = key.match(/^sensor(\d+)$/);
      if (m) return 'sensors[' + (parseInt(m[1], 10) - 1) + ']';
      
      // sub-buttons: entities.sub-button2 -> subbuttons[1]
      m = key.match(/^sub-button(\d+)$/);
      if (m) return 'subbuttons[' + (parseInt(m[1], 10) - 1) + ']';
      
      // mushrooms: entities1..entities6 -> mushrooms[0..5]
      m = key.match(/^entities(\d+)$/);
      if (m) return 'mushrooms[' + (parseInt(m[1], 10) - 1) + ']';
      
      // tutti gli altri (es. presence.entity) restano sotto "entities"
      return 'entities.' + key;
    }
    return p;
  }
  _setByPath(obj, path, value) {
    const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      const nextIsIndex = /^\d+$/.test(parts[i + 1]);
      if (cur[k] == null) cur[k] = nextIsIndex ? [] : {};
      cur = cur[k];
    }
    cur[parts[parts.length - 1]] = value;
  }
  
  static styles = css`
    :host {
      display: block;
      padding: 0;
      margin: 0;
    }
    .editor-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      box-sizing: border-box;
    }
  `;
}

customElements.define('bubble-room-editor', BubbleRoomEditor);