import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';
import './components/BubbleSubButton.js';
import './components/BubbleName.js';
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
      name: 'Stanza di prova',
      area: 'Zona Giorno',
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
      const attrs = stateObj?.attributes || {};
      const devClass = attrs.device_class;
      const domain = sb.entity_id?.split('.')?.[0] ?? '';
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
  
  render() {
    const layout = this.config.layout || 'wide';
    const subbuttons = this._getSubButtons();
    const isActive = this._isRoomActive();
    this.style.setProperty('--bubble-room-name-color', isActive ?
      this.config.colors?.room?.text_active || 'white' :
      this.config.colors?.room?.text_inactive || 'rgba(255,255,255,0.5)');
    
    return html`
      <div class="bubble-room-grid ${layout}">
        <div class="main-area">
          <div class="row1">
            <div class="sensors-placeholder">[bubble-sensors]</div>
            <div class="bubble-name" style="color: ${color}">
              ${this.name}
            </div>
          </div>
          <div class="row2">
            <div class="icon-mushroom-area">[bubble-mushroom]</div>
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
    }
    .row2 {
      display: grid; gap: 4px; height: 100%; min-height: 0; box-sizing: border-box;
      border: 2px dashed purple;
    }
    .sensors-placeholder { border: 2px dashed lime; box-sizing: border-box; }
    .name-placeholder    { border: 2px dashed orange; box-sizing: border-box; }
    .icon-mushroom-area  { border: 2px dashed violet; box-sizing: border-box; }
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
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'bubble-room',
  name: 'Bubble Room',
  description: 'A stylish room control card with environmental sensors',
  preview: true,
  documentationURL: 'https://github.com/mon3y78/Lovelace-Bubble-room'
});