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

  // --- helpers grid ----------------------------------------------------------
  _gridFor(layout) {
    // "stretto" è rappresentato dal layout 'tall' (o 'narrow'), "largo" da 'wide'
    if (layout === 'tall' || layout === 'narrow') return { columns: 6, rows: 4 };
    return { columns: 12, rows: 4 };
  }
  _gridsEqual(a, b) {
    if (!a || !b) return false;
    return Number(a.columns) === Number(b.columns) && Number(a.rows) === Number(b.rows);
  }
  // ---------------------------------------------------------------------------
  
  setConfig(rawConfig) {
    // Clona rawConfig e imposta default layout “wide”
    const config = {
      layout: 'wide',
      ...rawConfig,
    };
    
    // Default grid_options in base al layout se mancante
    if (!config.grid_options) {
      config.grid_options = this._gridFor(config.layout);
    }

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

    // Cambio layout: aggiorna grid_options solo se erano i default del layout precedente
    if (prop === 'layout') {
      const prevLayout = this.config.layout || 'wide';
      const prevDefault = this._gridFor(prevLayout);
      const hadGrid = !!this.config.grid_options;
      const wasPrevDefault = hadGrid && this._gridsEqual(this.config.grid_options, prevDefault);

      this._setConfigValue('layout', val);

      if (!hadGrid || wasPrevDefault) {
        this._setConfigValue('grid_options', this._gridFor(val));
      }
      this._emitConfigChanged();
      return;
    }
    
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
    // 1) clona i rami principali per nuovi riferimenti (trigger update Lit)
    const entities = { ...(this.config.entities || {}) };
    
    // 2) crea un oggetto camera "pulito" usando null (svuota davvero nei config)
    const clearedCamera = {
      entity: null, // <— usa null per cancellare davvero
      icon: null,   // <— idem per icona
      presence: { entity: null }, // se la camera ha "presence" associata
    };
    
    // 3) assegna camera pulita e spegni l’auto-discovery della camera
    entities.camera = clearedCamera;
    
    this.config = {
      ...this.config,
      entities,
      auto_discovery_sections: {
        ...this.config.auto_discovery_sections,
        camera: false,
      },
      // bump di revisione per forzare l’aggiornamento anche nei figli
      __rev: (this.config.__rev || 0) + 1,
    };
    
    // 4) emetti subito l’evento di cambio config
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    }));
    
    // 5) microtask per compatibilità con selector che preferiscono stringhe vuote
    queueMicrotask(() => {
      const ents2 = { ...(this.config.entities || {}) };
      ents2.camera = {
        entity: '',
        icon: '',
        presence: { entity: '' },
      };
      this.config = {
        ...this.config,
        entities: ents2,
        __rev: (this.config.__rev || 0) + 1,
      };
      this.dispatchEvent(new CustomEvent('config-changed', {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }));
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