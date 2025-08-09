// src/bubble-room-editor.js
import { LitElement, html, css } from 'lit';

// Pannelli già esistenti
import './panels/RoomPanel.js';
import './panels/SensorPanel.js';
import './panels/MushroomPanel.js';
import './panels/SubButtonPanel.js';
import './panels/ColorPanel.js';

// 🔸 NUOVI pannelli
import './panels/CameraPanel.js';
import './panels/ClimatePanel.js';

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
    this.openPanel = '';
  }
  
  setConfig(rawConfig) {
    // Clona rawConfig e imposta default layout “wide”
    const config = {
      layout: 'wide',
      ...rawConfig,
    };
    
    // Mantieni/integra le sezioni di auto-discovery
    config.auto_discovery_sections = {
      // 🔧 aggiungo 'presence' perché RoomPanel si aspetta proprio questa chiave
      presence: !!config.area,
      room: !!config.area,
      sensor: !!config.area,
      mushroom: !!config.area,
      camera: !!config.area, // 🔸 nuovo
      climate: !!config.area, // 🔸 nuovo
      subbutton: !!config.area,
      color: true,
      ...(config.auto_discovery_sections || {}),
    };
    
    // Struttura base
    if (!Array.isArray(config.sensor_filters)) config.sensor_filters = [];
    if (!config.entities) config.entities = {};
    
    // 🔸 Default per i nuovi gruppi
    if (!config.entities.camera) {
      config.entities.camera = {
        entity: '',
        icon: '',
        presence: { entity: '' },
      };
    }
    if (!config.entities.climate) {
      config.entities.climate = {
        entity: '',
        icon: '', // popolata automaticamente dal ClimatePanel se vuota
      };
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
        @panel-changed=${this._onConfigChanged}
      ></room-panel>

      <mushroom-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'mushroom'}
        @expanded-changed=${e => this._togglePanel(e, 'mushroom')}
        @panel-changed=${this._onConfigChanged}
      ></mushroom-panel>

      <!-- 🔸 Nuovo: CAMERA -->
      <camera-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'camera'}
        @expanded-changed=${e => this._togglePanel(e, 'camera')}
        @panel-changed=${this._onConfigChanged}
      ></camera-panel>

      <!-- 🔸 Nuovo: CLIMATE -->
      <climate-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'climate'}
        @expanded-changed=${e => this._togglePanel(e, 'climate')}
        @panel-changed=${this._onConfigChanged}
      ></climate-panel>

      <sensor-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'sensor'}
        @expanded-changed=${e => this._togglePanel(e, 'sensor')}
        @panel-changed=${this._onConfigChanged}
      ></sensor-panel>

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
  
  _onConfigChanged = (e) => {
    const { prop, val } = e.detail;
    
    // Intercetta comandi speciali dai pannelli (es. reset)
    if (prop === '__panel_cmd__' && val?.cmd === 'reset') {
      this._handlePanelCmd(val);
      this._emitConfigChanged();
      return;
    }
    
    this._setConfigValue(prop, val);
    this._emitConfigChanged();
  };
  
  _emitConfigChanged() {
    // bump di revisione per forzare rinfresco profondo nei pannelli figli
    const next = { ...this.config, __rev: (this.config.__rev || 0) + 1 };
    this.config = next;
    
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    }));
  }
  
  _handlePanelCmd({ section }) {
    switch (section) {
      case 'room':
        this._resetRoom();
        break;
      case 'camera':
        this._resetCamera();
        break;
        // altri reset in futuro...
      default:
        break;
    }
  }
  
  _resetRoom() {
    // ripristina solo i campi gestiti dal RoomPanel
    this.config = {
      ...this.config,
      area: '',
      name: '',
      icon: '',
      layout: 'wide',
      presence_filters: undefined, // lascia i default interni del pannello
      entities: {
        ...this.config.entities,
        presence: { entity: '' },
      },
      auto_discovery_sections: {
        ...this.config.auto_discovery_sections,
        presence: false,
        room: false,
      },
    };
  }
  
  _resetCamera() {
    // HARD RESET in due fasi per forzare il vuoto nel selettore:
    // 1) rimuovo proprio la chiave camera (nessun valore precedente da riusare)
    // 2) nel microtask successivo creo un oggetto pulito
    
    // Fase 1: rimuovi completamente il ramo camera
    const entities1 = { ...(this.config.entities || {}) };
    if ('camera' in entities1) {
      // clona prima per sicurezza e poi elimina chiavi sensibili
      const cam = { ...entities1.camera };
      delete cam.entity;
      delete cam.icon;
      if (cam.presence && typeof cam.presence === 'object') {
        delete cam.presence.entity;
      }
      // rimuovi l'intero ramo per segnalare "assenza"
      delete entities1.camera;
    }
    
    this.config = {
      ...this.config,
      entities: entities1,
      auto_discovery_sections: {
        ...this.config.auto_discovery_sections,
        camera: false,
      },
    };
    
    // Fase 2: reimposta un oggetto vuoto nel prossimo microtask
    queueMicrotask(() => {
      const entities2 = { ...(this.config.entities || {}) };
      entities2.camera = {
        entity: undefined, // undefined => selettore vuoto
        icon: '', // svuotato esplicitamente
        presence: { entity: undefined },
      };
      
      this.config = {
        ...this.config,
        entities: entities2,
      };
      
      // emetti un altro change per riflettere la seconda fase
      this._emitConfigChanged();
    });
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
    // ricrea l'oggetto radice per trigger re-render
    this.config = { ...this.config };
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);