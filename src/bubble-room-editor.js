// src/bubble-room-editor.js
import { LitElement, html, css } from 'lit';
import './panels/RoomPanel.js';
import './panels/SensorPanel.js';
import './panels/MushroomPanel.js';
import './panels/SubButtonPanel.js';
import './panels/ColorPanel.js';

export class BubbleRoomEditor extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    openPanel: { type: String, state: true },
  };
  
  static styles = css`
    :host {
      display: block;
      padding: 0 !important;
      margin: 0 !important;
      background: transparent;
    }
  `;
  
  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.openPanel = ''; // nessun pannello aperto
  }
  
  setConfig(config) {
    config = { ...config };
    config.auto_discovery_sections = {
      room: !!config.area,
      sensor: !!config.area,
      mushroom: !!config.area,
      subbutton: !!config.area,
      color: true,
      ...(config.auto_discovery_sections || {}),
    };
    if (!Array.isArray(config.sensor_filters)) {
      config.sensor_filters = [];
    }
    if (!config.entities) {
      config.entities = {};
    }
    this.config = config;
  }
  
  render() {
    return html`
      <room-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'room'}
        @expanded-changed=${e => this._togglePanel(e, 'room')}
        @panel-changed=${this._onPanelChanged}
      ></room-panel>

      <sensor-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'sensor'}
        @expanded-changed=${e => this._togglePanel(e, 'sensor')}
        @panel-changed=${this._onPanelChanged}
      ></sensor-panel>

      <mushroom-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'mushroom'}
        @expanded-changed=${e => this._togglePanel(e, 'mushroom')}
        @panel-changed=${this._onPanelChanged}
      ></mushroom-panel>

      <sub-button-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'subbutton'}
        @expanded-changed=${e => this._togglePanel(e, 'subbutton')}
        @panel-changed=${this._onPanelChanged}
      ></sub-button-panel>

      <color-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'color'}
        @expanded-changed=${e => this._togglePanel(e, 'color')}
        @panel-changed=${this._onPanelChanged}
      ></color-panel>
    `;
  }
  
  _togglePanel(e, key) {
    if (e.detail.expanded) {
      this.openPanel = key;
    } else if (this.openPanel === key) {
      this.openPanel = '';
    }
  }
  
  _onPanelChanged(e) {
    const { prop, val } = e.detail;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this.config, [prop]: val } },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);