// src/bubble-room-editor.js
import { LitElement, html, css } from 'lit';

// Pannelli modulari
import './panels/RoomPanel.js';
import './panels/SensorsPanel.js';
import './panels/MushroomsPanel.js';
import './panels/SubButtonsPanel.js';
import './panels/ColorsPanel.js';

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
    this._setByPath(this.config, mapped, val);
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
      if (m) return `sensors[${parseInt(m[1],10)-1}]`;
      // sub-buttons: entities.sub-button2 -> subbuttons[1]
      m = key.match(/^sub-button(\d+)$/);
      if (m) return `subbuttons[${parseInt(m[1],10)-1}]`;
      // mushrooms: entities1..entities6 -> mushrooms[0..5]
      m = key.match(/^entities(\d+)$/);
      if (m) return `mushrooms[${parseInt(m[1],10)-1}]`;
      // altri casi: ritorna il resto com'è
      return key;
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
  
    _getPresenceCandidates() {
    const hass = this.hass;
    if (!hass || !hass.states) return [];

    const allowed = new Set([
      'person','device_tracker','binary_sensor','light','switch',
      'media_player','fan','humidifier','lock','input_boolean','scene'
    ]);

    const ids = Object.keys(hass.states).filter(
      (id) => allowed.has(id.split('.')[0])
    );

    // binary_sensor: solo motion/occupancy/presence
    const byClass = ids.filter((id) => {
      const domain = id.split('.')[0];
      if (domain !== 'binary_sensor') return true;
      const dc = hass.states[id]?.attributes?.device_class;
      return ['motion','occupancy','presence'].includes(dc || '');
    });

    // filtro per Area se disponibile
    const area = this.config?.area;
    let res = byClass;
    if (area) {
      const inArea = byClass.filter((id) => {
        const st = hass.states[id];
        const a1 = st?.attributes?.area_id;
        const a2 = st?.attributes?.area;
        return a1 === area || a2 === area;
      });
      if (inArea.length) res = inArea;
    }

    // mantieni l'eventuale selezionata
    const selected = this.config?.entities?.presence?.entity || this.config?.presence_entity;
    if (selected && !res.includes(selected)) res.push(selected);

    // DEBUG (tienilo o rimuovilo a piacere)
    console.info('[BubbleRoomEditor][Presence]', {
      area,
      total: ids.length,
      byClass: byClass.length,
      result: res.length,
    });

    return res;
  }


customElements.define('bubble-room-editor', BubbleRoomEditor);