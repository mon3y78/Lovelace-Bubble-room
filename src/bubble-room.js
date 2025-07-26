/**
 * bubble-room.js
 *
 * Entrypoint della card principale Bubble Room.
 * File completo, import pronto di tutto.
 */

import { LitElement, html, css } from 'lit';
import './components/BubbleIcon.js';
import './components/BubbleMushroom.js';
import './components/BubbleName.js';
import './components/BubbleSensor.js';
import './components/BubbleSubButton.js';
import './styles/bubble-room.css';
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

  static styles = css`
    @import './styles/bubble-room.css';
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
