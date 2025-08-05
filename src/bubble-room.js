import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';
import './components/BubbleSubButton.js';
import './components/BubbleName.js';
import './components/BubbleSensor.js'; // nuovo
import './components/BubbleMushroom.js';
import './components/BubbleIcon.js';
import { resolveEntityIcon } from './helpers/icon-mapping.js';

export class BubbleRoom extends LitElement {
  static properties = {
    config: { type: Object },
    hass: { type: Object },
  };
  
  constructor() {
    super();
    this.config = {};
    this.hass = {};
  }
  
  setConfig(rawConfig) {
    this.config = {
      layout: 'wide',
      ...rawConfig,
    };
  }
  
  static getStubConfig() {
    return {
      type: 'custom:bubble-room',
      layout: 'wide',
      name: [],
      area: [],
      sensors: [],
      mushrooms: [],
      subbuttons: [],
      colors: {
        subbutton: {
          background_on: 'rgba(var(--color-blue),1)',
          background_off: 'rgba(var(--color-blue),0.3)',
          icon_on: 'yellow',
          icon_off: '#666'
        }
      }
    };
  }
  
  static async getConfigElement() {
    await import('./bubble-room-editor.js');
    return document.createElement('bubble-room-editor');
  }
  
  _getSubButtons() {
    const bgOn = this.config.colors?.subbutton?.background_on ?? '#00d46d';
    const bgOff = this.config.colors?.subbutton?.background_off ?? '#999';
    const iconOn = this.config.colors?.subbutton?.icon_on ?? 'yellow';
    const iconOff = this.config.colors?.subbutton?.icon_off ?? '#666';
    
    return (this.config.subbuttons || []).map(sb => {
      const stateObj = this.hass.states?.[sb.entity_id];
      const entityState = stateObj?.state;
      
      const resolvedIcon = resolveEntityIcon(sb.entity_id, this.hass);
      
      return {
        icon: resolvedIcon,
        active: entityState === 'on',
        colorOn: bgOn,
        colorOff: bgOff,
        iconOn,
        iconOff,
        entity_id: sb.entity_id,
        tap_action: sb.tap_action,
        hold_action: sb.hold_action,
      };
    });
  }
  
  /* ───────────────  sostituisci tutta la vecchia funzione  ─────────────── */
  _isRoomActive() {
    const entityId = this.config?.entities?.presence?.entity;
    if (!entityId) return false;
    
    const state = this.hass?.states?.[entityId]?.state;
    return [
      'on', // binary_sensor, switch, light, fan…
      'home', // device_tracker, person
      'occupied', // sensor occupancy
      'motion', // motion detection
      'detected' // some custom sensors
    ].includes(state);
  }
  /* ──────────────────────────────────────────────────────────────────────── */
    
  _getSensors() {
    const entities = this.config.entities || {};
    const isActive = this._isRoomActive();
    

    const color = isActive ?
      (this.config.colors?.room?.icon_active ?? '#21df73') :
      (this.config.colors?.room?.icon_inactive ?? '#173c16');
    
    const result = [];
    for (let i = 1; i <= 6; i++) {
      const key = `sensor${i}`;
      const entId = entities[key]?.entity;
      const stateObj = this.hass?.states?.[entId];
      if (!entId || !stateObj) continue;
      
      const devClass = stateObj.attributes.device_class;
      const value = stateObj.state;
      const unit = stateObj.attributes.unit_of_measurement;
      const icon = stateObj.attributes.icon || '';
      
      result.push({ icon, value, unit, color, device_class: devClass });
    }
    return result;
  }
  _getMushrooms() {
    const entities = this.config.entities || {};
    const result = [];
    for (let i = 1; i <= 6; i++) {
      const key = `mushroom${i}`;
      const entId = entities[key]?.entity;
      const stateObj = this.hass?.states?.[entId];
      if (!entId || !stateObj) continue;
  
      const icon = stateObj.attributes.icon || 'mdi:flash';
      const state = stateObj.state;
      const color = state === 'on'
        ? (this.config.colors?.mushroom?.active || '#00e676')
        : (this.config.colors?.mushroom?.inactive || '#888');
  
      result.push({ icon, state, color });
    }
    return result;
  }
  
  
  render() {
    const layout = this.config.layout || 'wide';
    const subbuttons = this._getSubButtons();
    const isActive = this._isRoomActive();
    /* --- COLORI --------------------------------------- */
    // per l’icona
    const iconColorActive = this.config.colors?.room?.icon_active ?? '#21df73';
    const iconColorInactive = this.config.colors?.room?.icon_inactive ?? '#173c16';
    
    // per il nome stanza
    const textColorActive = this.config.colors?.room?.text_active ?? '#ffffff';
    const textColorInactive = this.config.colors?.room?.text_inactive ?? 'rgba(255,255,255,0.5)';
    /* --------------------------------------------------- */
    this.style.setProperty(
      '--bubble-room-name-color',
      isActive ? textColorActive : textColorInactive
    );
    
    return html`
      <div class="bubble-room-grid ${layout}">
        <div class="main-area">
          <div class="row1">
            <bubble-sensor .sensors="${this._getSensors()}"></bubble-sensor>
            <div class="name-placeholder" id="nameContainer">
              <bubble-name
                .name="${this.config.name}"
                .area="${this.config.area}"
                .hass=${this.hass}
                .config=${this.config}
                .container=${this.shadowRoot?.getElementById('nameContainer')}
              ></bubble-name>
            </div>
          </div>
          <div class="row2">
            <div class="icon-mushroom-area">
              <bubble-icon
                .icon="${this.config.icon}"
                .active=${isActive}
                .colorActive="${iconColorActive}"
                .colorInactive="${iconColorInactive}"
              ></bubble-icon>
              <bubble-mushroom
                .entities="${this._getMushrooms()}"
                .containerSize="${{ width: 180, height: 180 }}"
                @mushroom-entity-click="${this._onMushroomClick}"
              ></bubble-mushroom>
            </div>
            <div class="k-space"></div>
          </div>
        </div>
        <div class="sidebar">
          <bubble-subbutton .subbuttons="${subbuttons}"></bubble-subbutton>
        </div>
      </div>
    `;
  }
  
  static styles = css`
    :host {
      display: block; height: 100%; box-sizing: border-box;
    }
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      width: 100%; height: 100%; box-sizing: border-box;
      border: 2px dashed yellow;
    }
    .main-area {
      display: grid; height: 100%; min-height: 0; box-sizing: border-box;
      border: 2px dashed green;
    }
    .row1 {
      display: grid; gap: 4px; min-height: 0; box-sizing: border-box;
      border: 2px dashed blue;
      grid-template-columns: 1fr;
    }
    .row2 {
      display: grid; gap: 4px; height: 100%; min-height: 0; box-sizing: border-box;
      border: 2px dashed purple;
    }
    .name-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 100%;
      height: 100%;
      box-sizing: border-box;
      contain: strict;
      flex-shrink: 1;
    }
    .sensor-placeholder {
      border: 2px dashed lime;
      box-sizing: border-box;
    }
    .icon-mushroom-area  { border: 2px dashed violet; box-sizing: border-box; position: relative; }
    .k-space             { border: 2px dashed black; box-sizing: border-box; }
    .sidebar {
      display: flex; flex-direction: column;
      height: 100%; min-height: 0; box-sizing: border-box;
      border: 2px dashed red;
    } 
    .bubble-room-grid.tall .main-area    { grid-template-rows: 1fr 2fr; }
    .bubble-room-grid.tall .row1         { grid-template-rows: 1fr 2fr; }
    .bubble-room-grid.tall .row2         { grid-template-columns: 1fr 0fr; }

    .bubble-room-grid.wide .main-area    { grid-template-rows: 2fr 1fr; }
    .bubble-room-grid.wide .row1         { grid-template-rows: 2fr 1fr; }
    .bubble-room-grid.wide .row2         { grid-template-columns: 1fr 1fr; }
  `;
}

customElements.define('bubble-room', BubbleRoom);

window.customCards.push({
  type: 'bubble-room',
  name: 'Bubble Room',
  description: 'A stylish room control card with environmental sensors',
  preview: true,
  documentationURL: 'https://github.com/mon3y78/Lovelace-Bubble-room'
});