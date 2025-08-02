// src/bubble-room.js
import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';
import './components/BubbleIcon.js';
import './components/BubbleMushroom.js';
import './components/BubbleName.js';
import './components/BubbleSensor.js';
import './components/BubbleSubButton.js';
import { DEVICE_CLASS_ICON_MAP, SENSOR_TYPE_ICON_MAP, DEFAULT_ICON } from './helpers/icon-mapping.js';
import { capitalize } from './helpers/utils.js';

export class BubbleRoom extends LitElement {
  static properties = {
    config: { type: Object },
    hass: { type: Object }
  };
  
  constructor() {
    super();
    this.config = {};
    this.hass = {};
  }
  
  static getStubConfig() {
    return {
      type: 'custom:bubble-room',
      name: 'Salotto',
      area: 'Zona Giorno',
      icon: 'mdi:sofa',
      sensors: [
        { entity_id: 'sensor.temperature_living', type: 'temperature', label: 'Temperatura', color: '#e3f6ff' }
      ],
      mushrooms: [
        { entity_id: 'switch.lampada', icon: 'mdi:lightbulb', color: '#ffeb3b' }
      ],
      subbuttons: [
        { entity_id: 'light.luce_tavolo', icon: 'mdi:lamp', label: 'Tavolo', colorOn: '#00d46d', colorOff: '#999' }
      ],
      colors: {
        room: {
          background_active: 'rgba(var(--color-green),1)',
          background_inactive: 'rgba(var(--color-green),0.3)',
          icon_active: 'orange',
          icon_inactive: '#80808055',
          mushroom_active: 'rgba(var(--color-green),1)',
          mushroom_inactive: '#80808055'
        },
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
  
  setConfig(config) {
    this.config = config;
  }
  
  static styles = css`
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 0;
      width: 100%;
      min-width: 360px;
      max-width: 740px;
      min-height: 312px;
      background: transparent;
      border-radius: 38px;
      overflow: visible;
    }
    .main-area {
      position: relative;
      padding: 30px 0 18px 34px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 300px;
    }
    .sidebar {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      padding: 28px 8px 8px 0;
      min-width: 120px;
    }
    @media (max-width: 600px) {
      .bubble-room-grid {
        grid-template-columns: 1fr 90px;
        border-radius: 19px;
      }
    }
  `;
  
  render() {
    const name = this.config.name || 'Room';
    const area = this.config.area || '';
    const icon = this.config.icon || DEFAULT_ICON;
    const sensors = (this.config.sensors || []).map(s => ({
      icon: SENSOR_TYPE_ICON_MAP[s.type]?.icon || 'mdi:help-circle',
      label: s.label || capitalize(s.type),
      value: this.hass.states[s.entity_id]?.state ?? '--',
      unit: SENSOR_TYPE_ICON_MAP[s.type]?.unit || '',
      color: s.color || '#e3f6ff'
    }));
    const mushrooms = (this.config.mushrooms || []).map(m => ({
      icon: m.icon || 'mdi:flash',
      state: this.hass.states[m.entity_id]?.state,
      color: m.color
    }));
    const subbuttons = (this.config.subbuttons || []).map(b => ({
      icon: b.icon || 'mdi:toggle-switch',
      active: this.hass.states[b.entity_id]?.state === 'on',
      label: b.label || '',
      colorOn: b.colorOn,
      colorOff: b.colorOff
    }));
    
    return html`
      <div class="bubble-room-grid">
        <div class="main-area">
          <bubble-sensor .sensors=${sensors}></bubble-sensor>
          <bubble-name .name=${name} .area=${area}></bubble-name>
          <div style="margin-top:20px;">
            <bubble-icon
              .icon=${icon}
              @main-icon-click=${this._onMainIconClick}
            ></bubble-icon>
          </div>
          <bubble-mushroom
            .entities=${mushrooms}
            @mushroom-entity-click=${this._onMushroomClick}
          ></bubble-mushroom>
        </div>
        <div class="sidebar">
          <bubble-subbutton
            .subbuttons=${subbuttons}
            @subbutton-click=${this._onSubButtonClick}
          ></bubble-subbutton>
        </div>
      </div>
    `;
  }
  
  _onMainIconClick() { /*…*/ }
  _onMushroomClick() { /*…*/ }
  _onSubButtonClick() { /*…*/ }
}

customElements.define('bubble-room', BubbleRoom);