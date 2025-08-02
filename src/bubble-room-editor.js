// src/bubble-room-editor.js
import { LitElement, html, css } from 'lit';

// Import dei singolari
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
      padding: 0;
      margin: 0;
      background: transparent;
    }
  `;
  
  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.openPanel = ''; // nessun pannello aperto di default
  }
  
  render() {
    return html`
      <!-- Room Settings -->
      <room-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'room'}
        @expanded-changed=${e => this._togglePanel(e, 'room')}
        @panel-changed=${this._onPanelChanged}
      ></room-panel>

      <!-- Sensor Settings -->
      <sensor-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'sensor'}
        @expanded-changed=${e => this._togglePanel(e, 'sensor')}
        @panel-changed=${this._onPanelChanged}
      ></sensor-panel>

      <!-- Mushroom Entities -->
      <mushroom-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'mushroom'}
        @expanded-changed=${e => this._togglePanel(e, 'mushroom')}
        @panel-changed=${this._onPanelChanged}
      ></mushroom-panel>

      <!-- Sub-Button Settings -->
      <sub-button-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'subbutton'}
        @expanded-changed=${e => this._togglePanel(e, 'subbutton')}
        @panel-changed=${this._onPanelChanged}
      ></sub-button-panel>

      <!-- Color Settings -->
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
    this.dispatchEvent(new CustomEvent('editor-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
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
    this.config = config;
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);