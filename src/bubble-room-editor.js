// src/bubble-room-editor.js
import { LitElement, html, css } from 'lit';

// Pannelli
import './panels/RoomPanel.js';
import './panels/SensorPanel.js';
import './panels/MushroomPanel.js';
import './panels/SubButtonPanel.js';
import './panels/ColorPanel.js';
import './panels/CameraPanel.js';
import './panels/ClimatePanel.js';

// Auto-discovery & reset helpers
import {
  maybeAutoDiscover,
  resetRoom, resetSensors, resetMushrooms, resetSubButtons,
  resetClimate, resetCamera
} from './helpers/auto-discovery.js';

export class BubbleRoomEditor extends LitElement {
  static properties = {
    hass:      { type: Object },
    config:    { type: Object },
    openPanel: { type: String, state: true },
  };

  constructor() {
    super();
    this.hass = undefined;
    this.config = {};
    this.openPanel = ''; // nessun pannello aperto di default

    // bind espliciti
    this._onPanelChanged  = this._onPanelChanged.bind(this);
    this._onPanelCmd      = this._onPanelCmd.bind(this);
    this._togglePanel     = this._togglePanel.bind(this);
    this._onConfigChanged = this._onConfigChanged.bind(this);
  }

  // Lovelace chiama setConfig sull’editor: qui garantiamo sempre il type
  setConfig(cfg) {
    this.config = { type: cfg?.type || 'custom:bubble-room', ...(cfg || {}) };
    this.requestUpdate();
  }

  set value(v) { this.config = v || {}; }
  get value()  { return this.config; }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('panel-changed', this._onPanelChanged);
    this.addEventListener('__panel_cmd__', this._onPanelCmd);
  }
  disconnectedCallback() {
    this.removeEventListener('panel-changed', this._onPanelChanged);
    this.removeEventListener('__panel_cmd__', this._onPanelCmd);
    super.disconnectedCallback();
  }

  /* ============ utils config & dispatch ============ */

  _emitConfig(next) {
    // preserva/forza sempre il type della card (fix “Nessun tipo fornito”)
    const withType = { type: this.config?.type || 'custom:bubble-room', ...(next || {}) };
    this.config = withType;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true, composed: true,
    }));
    this.requestUpdate();
  }

  /** Imposta un path puntato (es: "entities.climate.icon") e emette config-changed */
  _setConfigValue(path, value) {
    const keys = String(path).split('.');
    const next = structuredClone(this.config || {});
    let cur = next;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {};
      cur = cur[k];
    }
    cur[keys[keys.length - 1]] = value;
    this._emitConfig(next);
  }

  /* ============ handlers eventi dai pannelli ============ */

  /**
   * Formato “nuovo” dei pannelli: detail { prop, val }
   * Esempi:
   *   prop: 'area', val: 'Soggiorno'
   *   prop: 'auto_discovery_sections.climate', val: true
   *   prop: 'entities.camera.icon', val: 'mdi:cctv'
   */
  _onPanelChanged(e) {
    e.stopPropagation();
    const { prop, val } = e.detail || {};
    if (!prop) return;

    // 1) applica il cambiamento
    const prev = this.config;
    const next = structuredClone(prev || {});
    const parts = String(prop).split('.');
    let cur = next;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {};
      cur = cur[k];
    }
    cur[parts[parts.length - 1]] = val;

    // 2) autodiscovery se l'evento riguarda area o sezioni auto
    const isArea = prop === 'area';
    const isAD   = prop.startsWith('auto_discovery_sections.');
    const applied = (isArea || isAD)
      ? maybeAutoDiscover(this.hass, next, prop, false)
      : next;

    this._emitConfig(applied);
  }

  /**
   * Alcuni pannelli legacy emettono detail { path, value }.
   * Li normalizziamo a (prop,val).
   */
  _onConfigChanged(e) {
    e.stopPropagation();
    const { path, value } = e.detail || {};
    if (!path) return;

    // 1) applica
    const prev = this.config;
    const next = structuredClone(prev || {});
    const parts = String(path).split('.');
    let cur = next;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {};
      cur = cur[k];
    }
    cur[parts[parts.length - 1]] = value;

    // 2) autodiscovery se area / sezioni
    const isArea = path === 'area';
    const isAD   = path.startsWith('auto_discovery_sections.');
    const applied = (isArea || isAD)
      ? maybeAutoDiscover(this.hass, next, path, false)
      : next;

    this._emitConfig(applied);
  }

  /**
   * Reset centralizzati.
   * I pannelli inviano: detail { cmd:'reset', section: 'room'|'sensors'|'mushrooms'|'subbuttons'|'climate'|'camera' }
   */
// dentro src/bubble-room-editor.js
  _onPanelCmd(e) {
    e.stopPropagation();
    const { cmd, section } = e.detail || {};
    if (cmd !== 'reset') return;
    
    let next = this.config || {};
    switch (section) {
      case 'room':
        next = resetRoom(next);
        break;
      case 'sensors':
        next = resetSensors(next);
        break;
      case 'mushrooms':
        next = resetMushrooms(next);
        break;
      case 'subbuttons':
        next = resetSubButtons(next);
        break;
      case 'climate':
        next = resetClimate(next);
        // 🔁 se l'autodiscovery è attivo, rilancia l'autofill ORA
        if (next?.auto_discovery_sections?.climate) {
          next = maybeAutoDiscover(this.hass, next, 'auto_discovery_sections.climate', false);
        }
        break;
      case 'camera':
        next = resetCamera(next);
        // 🔁 se l'autodiscovery è attivo, rilancia l'autofill ORA
        if (next?.auto_discovery_sections?.camera) {
          next = maybeAutoDiscover(this.hass, next, 'auto_discovery_sections.camera', false);
        }
        break;
      default:
        return; // sezione ignota, esci
    }
    
    this._emitConfig(next);
  }

  /**
   * UI: apertura/chiusura dei pannelli (expansion)
   * Usato da @expanded-changed dei pannelli figlio
   */
  _togglePanel(e, key) {
    const opened = e?.detail?.expanded;
    this.openPanel = opened ? key : '';
  }

  /* ============ UI ============ */

  static styles = css`
    :host { display:block; }
    .editor-grid {
      display:grid; gap: 16px;
      grid-template-columns: 1fr;
      align-items: start;
    }
    @media (min-width: 1100px) {
      .editor-grid { grid-template-columns: 1fr 1fr; }
    }
  `;

  render() {
    const cfg = this.config || {};

    return html`
      <div class="editor-grid">
        <!-- ROOM -->
        <room-panel
          .hass=${this.hass}
          .config=${cfg}
          .expanded=${this.openPanel === 'room'}
          @expanded-changed=${e => this._togglePanel(e, 'room')}
          @panel-changed=${this._onPanelChanged}
        ></room-panel>

        <!-- CLIMATE -->
        <climate-panel
          .hass=${this.hass}
          .config=${cfg}
          .expanded=${this.openPanel === 'climate'}
          @expanded-changed=${e => this._togglePanel(e, 'climate')}
          @panel-changed=${this._onPanelChanged}
        ></climate-panel>

        <!-- CAMERA -->
        <camera-panel
          .hass=${this.hass}
          .config=${cfg}
          .expanded=${this.openPanel === 'camera'}
          @expanded-changed=${e => this._togglePanel(e, 'camera')}
          @panel-changed=${this._onPanelChanged}
        ></camera-panel>

        <!-- SENSOR -->
        <sensor-panel
          .hass=${this.hass}
          .config=${cfg}
          .expanded=${this.openPanel === 'sensor'}
          @expanded-changed=${e => this._togglePanel(e, 'sensor')}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></sensor-panel>

        <!-- MUSHROOM -->
        <mushroom-panel
          .hass=${this.hass}
          .config=${cfg}
          .expanded=${this.openPanel === 'mushroom'}
          @expanded-changed=${e => this._togglePanel(e, 'mushroom')}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></mushroom-panel>

        <!-- SUBBUTTON -->
        <sub-button-panel
          .hass=${this.hass}
          .config=${cfg}
          .expanded=${this.openPanel === 'subbuttons'}
          @expanded-changed=${e => this._togglePanel(e, 'subbuttons')}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></sub-button-panel>

        <!-- COLORS -->
        <color-panel
          .hass=${this.hass}
          .config=${cfg}
          .expanded=${this.openPanel === 'colors'}
          @expanded-changed=${e => this._togglePanel(e, 'colors')}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></color-panel>
      </div>
    `;
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);