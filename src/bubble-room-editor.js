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
      padding: 0;
      margin: 0;
      background: transparent;
    }
  `;
  
  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.openPanel = ''; // nessun pannello aperto inizialmente
  }
  
  setConfig(config) {
    // inizializza config e auto_discovery_sections con chiavi al singolare
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
    if (!config.colors) {
      config.colors = {};
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
    this._updateConfig(prop, val);
    // Notifica al frontend HA editor
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    }));
  }
  
  _updateConfig(path, value) {
    // Supporta path puntati: 'entities.sensor.sensor1.entity', 'colors.room.background_active', ecc.
    const keys = path.split('.');
    let obj = this.config;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (obj[k] === undefined || obj[k] === null) {
        obj[k] = {};
      }
      obj = obj[k];
    }
    obj[keys[keys.length - 1]] = value;
    // Forza LitElement a riconoscere il cambiamento
    this.config = { ...this.config };
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);