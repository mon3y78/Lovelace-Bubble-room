// src/bubble-room.js
import { LitElement, html, css } from 'lit';
// Import “static” del file editor, ma verrà caricato in getConfigElement() via import()
import './bubble-room-editor.js';

export class BubbleRoom extends LitElement {
  // 1) Proprietà per la config e per hass (se ti serve)
  static properties = {
    config: { type: Object },
    hass: { type: Object },
  };
  
  constructor() {
    super();
    this.config = {};
    this.hass = {};
  }
  
  // 2) Home Assistant chiama questo per validare e conservare la config
  setConfig(config) {
    this.config = config;
  }
  
  // 3) Stub config usata per popolare il form del Visual Editor
  static getStubConfig() {
    return {
      type: 'custom:bubble-room',
      name: 'Stanza di prova',
      area: 'Zona Giorno',
      sensors: [],
      mushrooms: [],
      subbuttons: [],
    };
  }
  
  // 4) Hook del Visual Editor: importa ed istanzia il tuo editor
  static async getConfigElement() {
    // carica lazy l’editor
    await import('./bubble-room-editor.js');
    // crea <bubble-room-editor>
    return document.createElement('bubble-room-editor');
  }
  
  // --- STILI E RENDER INVARIATI (solo box vuoti con debug) ---
  static styles = css`
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
    }
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 2px dashed yellow;
    }
    .main-area {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      box-sizing: border-box;
      border: 2px dashed green;
    }
    .icon-mushroom-area {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 2px dashed violet;
    }
    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      box-sizing: border-box;
      border: 2px dashed red;
    }
  `;
  
  render() {
    return html`
      <div class="bubble-room-grid">
        <div class="main-area">
          <div class="icon-mushroom-area"></div>
        </div>
        <div class="sidebar"></div>
      </div>
    `;
  }
}

customElements.define('bubble-room', BubbleRoom);