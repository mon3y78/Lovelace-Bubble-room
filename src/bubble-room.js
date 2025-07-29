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
  
  /**
   * Home Assistant chiamerà questo per montare l'editor visuale
   */
  static async getConfigElement() {
    // Carica dinamicamente il file
    await import('./bubble-room-editor.js');
    // Ritorna un'istanza del custom element
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
      position: relative;
      background: transparent;
      border-radius: 38px;
      overflow: visible;
      border: 2px dashed yellow;
    }
    .main-area {
      position: relative;
      padding: 30px 0 18px 34px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 300px;
      z-index: 1;
    }
    .icon-mushroom-area {
      position: relative;
      width: 240px;
      height: 190px;
      margin-top: 12px;
      margin-left: -10px;
      margin-bottom: 12px;
    }
    .sidebar {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      padding: 28px 8px 8px 0;
      min-width: 120px;
      position: relative;
      z-index: 3;
    }
    @media (max-width: 600px) {
      .bubble-room-grid {
        min-width: 100vw;
        grid-template-columns: 1fr 90px;
        border-radius: 19px;
      }
    }  
  `;
  
  
  render() {
    console.log('BubbleRoom config:', this.config);
    const mainIcon = this.config.icon || DEFAULT_ICON;
    const iconActive =
      this.config.colors?.room?.icon_active ??
      this.config.icon_active ?? '#21df73';
    const iconInactive =
      this.config.colors?.room?.icon_inactive ??
      this.config.icon_inactive ?? '#173c16';
    const name = this.config.name || 'Room';
    const area = this.config.area || '';
    const sensors = this._getSensors();
    const mushroomEntities = this._getMushroomEntities();
    const subbuttons = this._getSubButtons();
    
    // Per BubbleMushroom: la size dell'area
    const mushroomContainerSize = { width: 240, height: 190 };
    
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
              .containerSize="${mushroomContainerSize}"
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
    // Mappa sensori con label visibile!
    return (this.config.sensors || []).map(s => ({
      icon: SENSOR_TYPE_ICON_MAP[s.type]?.icon || 'mdi:help-circle',
      label: s.label || capitalize(s.type || ''),
      value: this.hass.states?.[s.entity_id]?.state ?? '--',
      unit: SENSOR_TYPE_ICON_MAP[s.type]?.unit || '',
      color: s.color || '#e3f6ff'
    }));
  }
  
  _getMushroomEntities() {
    return (this.config.mushrooms || []).map(e => ({
      icon: e.icon || 'mdi:flash',
      state: this.hass.states?.[e.entity_id]?.state,
      color: e.color || '#999'
    }));
  }
  
  _getSubButtons() {
    return (this.config.subbuttons || []).map((sub, idx) => ({
      icon: sub.icon || 'mdi:light-switch',
      active: this.hass.states?.[sub.entity_id]?.state === 'on',
      colorOn: sub.colorOn || '#00d46d',
      colorOff: sub.colorOff || '#999',
      label: sub.label || '',
    }));
  }
  
  _isMainIconActive() {
    return !!this.config.active;
  }
  
  _onMainIconClick() {
    // Gestione click icona principale
  }
  
  _onMushroomEntityClick(e) {
    const idx = e.detail;
    // Gestione click su mushroom entity
  }
  
  _onSubButtonClick(e) {
    const idx = e.detail;
    // Gestione click su subbutton
  }
}

customElements.define('bubble-room', BubbleRoom);