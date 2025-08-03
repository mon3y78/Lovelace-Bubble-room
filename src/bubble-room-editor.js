import { LitElement, html, css } from 'lit';
import './panels/RoomPanel.js';
import './panels/SensorPanel.js';
import './panels/MushroomPanel.js';
import './panels/SubButtonPanel.js';
import './panels/ColorPanel.js';

export class BubbleRoomEditor extends LitElement {
  static properties = {
    hass:      { type: Object },
    config:    { type: Object },
    openPanel: { type: String, state: true },
  };

  static styles = css`
    :host {
      display: block;
      padding: 0;
      margin: 0;
      background: transparent;
    }
  `;

  constructor() {
    super();
    this.hass      = {};
    this.config    = {};
    this.openPanel = '';
  }

  setConfig(rawConfig) {
    // Clona rawConfig e imposta default layout “wide”
    const config = {
      layout: 'wide',
      ...rawConfig,
    };

    // Mantieni le sezioni di auto-discovery
    config.auto_discovery_sections = {
      room:      !!config.area,
      sensor:    !!config.area,
      mushroom:  !!config.area,
      subbutton: !!config.area,
      color:     true,
      ...(config.auto_discovery_sections || {}),
    };

    if (!Array.isArray(config.sensor_filters)) config.sensor_filters = [];
    if (!config.entities) config.entities = {};

    this.config = config;
  }

  render() {
    return html`
      <room-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'room'}
        @expanded-changed=${e => this._togglePanel(e, 'room')}
        @panel-changed=${this._onConfigChanged}
      ></room-panel>

      <sensor-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'sensor'}
        @expanded-changed=${e => this._togglePanel(e, 'sensor')}
        @panel-changed=${this._onConfigChanged}
      ></sensor-panel>

      <mushroom-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'mushroom'}
        @expanded-changed=${e => this._togglePanel(e, 'mushroom')}
        @panel-changed=${this._onConfigChanged}
      ></mushroom-panel>

      <sub-button-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'subbutton'}
        @expanded-changed=${e => this._togglePanel(e, 'subbutton')}
        @panel-changed=${this._onConfigChanged}
      ></sub-button-panel>

      <color-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'color'}
        @expanded-changed=${e => this._togglePanel(e, 'color')}
        @panel-changed=${this._onConfigChanged}
      ></color-panel>
    `;
  }

  _togglePanel(e, key) {
    this.openPanel = e.detail.expanded ? key : (this.openPanel === key ? '' : this.openPanel);
  }

  _onConfigChanged(e) {
    const { prop, val } = e.detail;
    this._setConfigValue(prop, val);
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    }));
  }

  _setConfigValue(path, value) {
    const keys = path.split('.');
    let obj = this.config;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (obj[k] == null) obj[k] = {};
      obj = obj[k];
    }
    obj[keys[keys.length - 1]] = value;
    this.config = { ...this.config };
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);
