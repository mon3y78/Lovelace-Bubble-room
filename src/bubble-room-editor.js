// src/components/bubble-room-editor.js
import { LitElement, html, css } from 'lit';

// Import dei pannelli modulari
import './panels/RoomPanel.js';
import './panels/SensorsPanel.js';
import './panels/MushroomsPanel.js';
import './panels/SubButtonsPanel.js';
import './panels/ColorsPanel.js';

export class BubbleRoomEditor extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
  };
  
  constructor() {
    super();
    this.hass = null;
    this.config = {};
  }
  
  /**
   * Inizializza la configurazione dell'editor, garantendo array e oggetti di default.
   */
  setConfig(config) {
    this.config = {
      ...config,
      sensors: Array.isArray(config.sensors) ? config.sensors : [],
      mushrooms: Array.isArray(config.mushrooms) ? config.mushrooms : [],
      subbuttons: Array.isArray(config.subbuttons) ? config.subbuttons : [],
      colors: config.colors ? config.colors : { room: {}, subbutton: {} },
    };
  }
  
  /**
   * Restituisce la configurazione corrente.
   */
  getConfig() {
    return { ...this.config };
  }
  
  static styles = css`
    :host {
      display: block;
      padding: 0;
      margin: 0;
    }
    .editor-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      box-sizing: border-box;
    }
  `;
  
  render() {
    return html`
      <div class="editor-container">
        <room-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @config-changed="${this._onConfigChanged}"
        ></room-panel>

        <sensors-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @config-changed="${this._onConfigChanged}"
        ></sensors-panel>

        <mushrooms-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @config-changed="${this._onConfigChanged}"
        ></mushrooms-panel>

        <subbuttons-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @config-changed="${this._onConfigChanged}"
        ></subbuttons-panel>

        <colors-panel
          .config="${this.config}"
          @config-changed="${this._onConfigChanged}"
        ></colors-panel>
      </div>
    `;
  }
  
  /**
   * Propaga l'evento di cambio configurazione ai listener esterni.
   */
  _onConfigChanged(e) {
    this.config = e.detail.config;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.getConfig() },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);