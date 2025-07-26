/**
 * bubble-room-editor.js
 *
 * Entrypoint dell'editor visuale Bubble Room.
 * File completo, pronto per la configurazione.
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

export class BubbleRoomEditor extends LitElement {
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
    return html`
      <div class="bubble-room-container">
        <h3>Room Name</h3>
        <input type="text" .value="${this.config.name || ''}" @input="${e => this._updateConfig('name', e.target.value)}" />

        <h3>Icon</h3>
        <bubble-icon
          .icon="${this.config.icon || DEFAULT_ICON}"
          .active="${this.config.active || false}"
          .colorActive="${this.config.icon_active || '#21df73'}"
          .colorInactive="${this.config.icon_inactive || '#555'}"
        ></bubble-icon>

        <h3>Sensors</h3>
        <bubble-sensor .sensors="${this._getEditorSensors()}"></bubble-sensor>

        <h3>Mushroom Entities</h3>
        <bubble-mushroom .entities="${this._getEditorMushrooms()}"></bubble-mushroom>

        <h3>SubButtons</h3>
        <bubble-subbutton .subbuttons="${this._getEditorSubButtons()}"></bubble-subbutton>
      </div>
    `;
  }

  _getEditorSensors() {
    return (this.config.sensors || []).map(s => ({
      icon: SENSOR_TYPE_ICON_MAP[s.type]?.icon || 'mdi:help-circle',
      value: '••',
      unit: SENSOR_TYPE_ICON_MAP[s.type]?.unit || '',
      color: s.color || '#fff'
    }));
  }

  _getEditorMushrooms() {
    return (this.config.mushrooms || []).map(e => ({
      icon: e.icon || 'mdi:flash',
      state: 'off',
      color: e.color || '#999'
    }));
  }

  _getEditorSubButtons() {
    return (this.config.subbuttons || []).map((sub, idx) => ({
      icon: sub.icon || 'mdi:light-switch',
      active: false,
      colorOn: sub.colorOn || '#00d46d',
      colorOff: sub.colorOff || '#999',
      label: sub.label || '',
    }));
  }

  _updateConfig(key, value) {
    this.config = { ...this.config, [key]: value };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this.config } }));
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);
