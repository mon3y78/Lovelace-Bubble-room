import { LitElement, html, css } from 'lit';
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

  // *** ECCO IL METODO CHE SERVE ***
  setConfig(config) {
    this.config = config;
  }

  static styles = css`
    :host {
      --bubble-main-bg: rgba(44, 49, 60, 0.88);
      --bubble-main-radius: 38px;
      --bubble-entity-bg: rgba(32, 38, 55, 0.19);
      --bubble-gradient: linear-gradient(110deg, #4e87fa 0%, #51e3a0 100%);
      --bubble-subbutton-active: #b0ffc5;
      --bubble-subbutton-inactive: #555;
    }
    .bubble-room-container {
      background: var(--bubble-main-bg);
      border-radius: var(--bubble-main-radius);
      box-shadow: 0 2px 18px 0 rgba(20,22,30,0.18);
      padding: 28px 20px 18px 20px;
      margin: 0 auto;
      max-width: 520px;
      min-width: 290px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
    @media (max-width: 480px) {
      .bubble-room-container {
        padding: 14px 5px 11px 5px;
        min-width: unset;
        max-width: 100vw;
      }
    }
  `;

  render() {
    const mainIcon = this.config.icon || DEFAULT_ICON;
    const iconActive = this.config.icon_active || '#21df73';
    const iconInactive = this.config.icon_inactive || '#555';
    const name = this.config.name || 'Room';
    const area = this.config.area || '';
    const sensors = this._getSensors();
    const mushroomEntities = this._getMushroomEntities();
    const subbuttons = this._getSubButtons();

    return html`
      <div class="bubble-room-container">
        <bubble-name .name="${name}" .area="${area}"></bubble-name>
        <bubble-icon
          .icon="${mainIcon}"
          .active="${this._isMainIconActive()}"
          .colorActive="${iconActive}"
          .colorInactive="${iconInactive}"
          @main-icon-click="${this._onMainIconClick}"
        ></bubble-icon>
        <bubble-sensor .sensors="${sensors}"></bubble-sensor>
        <bubble-mushroom .entities="${mushroomEntities}"></bubble-mushroom>
        <bubble-subbutton .subbuttons="${subbuttons}" @subbutton-click="${this._onSubButtonClick}"></bubble-subbutton>
      </div>
    `;
  }

  _getSensors() {
    return (this.config.sensors || []).map(s => ({
      icon: SENSOR_TYPE_ICON_MAP[s.type]?.icon || 'mdi:help-circle',
      value: this.hass.states?.[s.entity_id]?.state ?? '--',
      unit: SENSOR_TYPE_ICON_MAP[s.type]?.unit || '',
      color: s.color || '#fff'
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
    // Gestione click sull'icona principale
  }

  _onSubButtonClick(e) {
    const idx = e.detail;
    // Gestione click su subbutton
  }
}

customElements.define('bubble-room', BubbleRoom);
