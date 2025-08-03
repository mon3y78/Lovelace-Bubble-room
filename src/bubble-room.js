
/* ==== src/bubble-room.js  (responsive version) ==== */

import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';
import './components/BubbleIcon.js';
import './components/BubbleMushroom.js';
import './components/BubbleName.js';
import './components/BubbleSensor.js';
import './components/BubbleSubButton.js';
import { DEVICE_CLASS_ICON_MAP, SENSOR_TYPE_ICON_MAP, DEFAULT_ICON } from './helpers/icon-mapping.js';
import { SENSOR_TYPES } from './helpers/sensor-mapping.js';
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
        { entity_id: 'sensor.some_sensor1', type: 'temperature', label: 'Temperatura', color: '#e3f6ff' }
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
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      border: 2px dashed yellow;
    }

    .main-area {
      position: relative;
      padding: 2vw 0 2vw 2vw;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 200px;
      z-index: 1;
    }

    .icon-mushroom-area {
      position: relative;
      width: 100%;
      max-width: 100%;
      height: auto;
      margin: 1vw 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .sidebar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 1vw;
      align-items: center;
      justify-content: center;
      padding: 1vw;
      width: 100%;
      box-sizing: border-box;
    }

    @media (max-width: 600px) {
      .bubble-room-grid {
        grid-template-columns: 1fr;
        border-radius: 12px;
      }

      .sidebar {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
  `;

  render() {
    const mainIcon = this.config.icon || DEFAULT_ICON;
    const iconActive = this.config.colors?.room?.icon_active ?? this.config.icon_active ?? '#21df73';
    const iconInactive = this.config.colors?.room?.icon_inactive ?? this.config.icon_inactive ?? '#173c16';
    const name = this.config.name || 'Room';
    const area = this.config.area || '';
    const sensors = this._getSensors();
    const mushroomEntities = this._getMushroomEntities();
    const subbuttons = this._getSubButtons();
    const mushroomSize = { width: 240, height: 190 };

    return html`
      <div class="bubble-room-grid">
        <div class="main-area">
          <bubble-sensors .sensors="${sensors}"></bubble-sensors>
          <bubble-name .name="${name}" .area="${area}"></bubble-name>
          <div class="icon-mushroom-area">
            <bubble-icon
              .icon="${mainIcon}"
              .active="${this._isMainIconActive()}"
              .colorActive="${iconActive}"
              .colorInactive="${iconInactive}"
              @main-icon-click="${this._onMainIconClick}"
            ></bubble-icon>
            <bubble-mushroom
              .entities="${mushroomEntities}"
              .containerSize="${mushroomSize}"
              @mushroom-entity-click="${this._onMushroomEntityClick}"
            ></bubble-mushroom>
          </div>
        </div>
        <div class="sidebar">
          <bubble-subbutton
            .subbuttons="${subbuttons}"
            @subbutton-click="${this._onSubButtonClick}"
          ></bubble-subbutton>
        </div>
      </div>
    `;
  }

  _getSensors() {
    return (this.config.sensors || []).map(s => ({
      icon: SENSOR_TYPE_ICON_MAP[s.type]?.icon || 'mdi:help-circle',
      label: s.label || capitalize(s.type || ''),
      value: this.hass.states?.[s.entity_id]?.state ?? '--',
      unit: SENSOR_TYPE_ICON_MAP[s.type]?.unit || '',
      color: s.color || '#e3f6ff'
    }));
  }

  _getMushroomEntities() {
    const def = this.config.colors?.room?.mushroom_inactive ?? '#999';
    return (this.config.mushrooms || []).map(e => ({
      icon: e.icon || 'mdi:flash',
      state: this.hass.states?.[e.entity_id]?.state,
      color: e.color ?? def,
    }));
  }

  _getSubButtons() {
    const defOn = this.config.colors?.subbutton?.background_on ?? '#00d46d';
    const defOff = this.config.colors?.subbutton?.background_off ?? '#999';
    return (this.config.subbuttons || []).map(sub => ({
      icon: sub.icon || 'mdi:light-switch',
      active: this.hass.states?.[sub.entity_id]?.state === 'on',
      colorOn: sub.colorOn ?? defOn,
      colorOff: sub.colorOff ?? defOff,
      label: sub.label || '',
    }));
  }

  _isMainIconActive() {
    return !!this.config.active;
  }

  _onMainIconClick() { /* stub */ }
  _onMushroomEntityClick(e) { /* stub */ }
  _onSubButtonClick(e) { /* stub */ }
}

customElements.define('bubble-room', BubbleRoom);
/* ==== fine bubble-room.js ==== */
