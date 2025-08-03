// src/bubble-room.js
import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';

export class BubbleRoom extends LitElement {
  static properties = {
    config: { type: Object },
    hass: { type: Object }
  };
  
  constructor() {
    super();
    this.config = {};
    this.hass = {};
  }
  
  setConfig(config) {
    this.config = config;
    // fallback se non valido
    if (!['stretto', 'largo'].includes(this.config.layout)) {
      this.config.layout = 'stretto';
    }
  }
  
  static getStubConfig() {
    return {
      type: 'custom:bubble-room',
      layout: 'stretto',
      name: 'Stanza di prova',
      area: 'Zona Giorno',
      sensors: [],
      mushrooms: [],
      subbuttons: []
    };
  }
  
  static async getConfigElement() {
    await import('./bubble-room-editor.js');
    return document.createElement('bubble-room-editor');
  }
  
  static styles = css`
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
    }

    /* Griglia principale: 2fr / 1fr in larghezza, unica riga 100% altezza */
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 2px dashed yellow;  /* 🟨 debug */
    }

    /* MAIN AREA: verrà ridefinita per stretto/largo */
    .main-area {
      display: grid;
      height: 100%;
      min-height: 0;
      box-sizing: border-box;
      border: 2px dashed green;   /* 🟩 debug */
    }

    /* ROW1: due righe interne (sensori sopra, nome sotto) */
    .row1 {
      display: grid;
      gap: 4px;
      box-sizing: border-box;
      border: 2px dashed blue;    /* 🟦 debug */
    }
    .sensors-placeholder {
      border: 2px dashed lime;    /* 🟢 debug sensori */
      width: 100%; height: 100%;
      box-sizing: border-box;
    }
    .name-placeholder {
      border: 2px dashed orange;  /* 🟠 debug nome */
      width: 100%; height: 100%;
      box-sizing: border-box;
    }

    /* ROW2: due colonne (icon-mushroom + k-space) */
    .row2 {
      display: grid;
      gap: 4px;
      height: 100%;
      min-height: 0;
      box-sizing: border-box;
      border: 2px dashed purple;  /* 🟪 debug */
    }
    .icon-mushroom-area {
      border: 2px dashed violet;  /* 🟣 debug */
      width: 100%; height: 100%;
      box-sizing: border-box;
    }
    .k-space {
      border: 2px dashed black;   /* ⚫ debug */
      width: 100%; height: 100%;
      box-sizing: border-box;
    }

    /* SIDEBAR */
    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      box-sizing: border-box;
      border: 2px dashed red;     /* 🟥 debug */
    }

    /* ─── LAYOUT “STRETTO” ─── */
    .bubble-room-grid.stretto .main-area {
      grid-template-rows: 1fr 2fr;
    }
    .bubble-room-grid.stretto .row1 {
      grid-template-rows: 1fr 2fr;
    }
    .bubble-room-grid.stretto .row2 {
      grid-template-columns: 1fr 0fr;
    }

    /* ─── LAYOUT “LARGO” ─── */
    .bubble-room-grid.largo .main-area {
      grid-template-rows: 2fr 1fr;
    }
    .bubble-room-grid.largo .row1 {
      grid-template-rows: 2fr 1fr;
    }
    .bubble-room-grid.largo .row2 {
      grid-template-columns: 1fr 1fr;
    }
  `;
  
  render() {
    const layout = this.config.layout || 'stretto';
    return html`
      <div class="bubble-room-grid ${layout}">
        <!-- Colonna sinistra -->
        <div class="main-area">
          <!-- Row1: sensori + nome -->
          <div class="row1">
            <div class="sensors-placeholder"></div>
            <div class="name-placeholder"></div>
          </div>
          <!-- Row2: icon-mushroom + k-space -->
          <div class="row2">
            <div class="icon-mushroom-area"></div>
            <div class="k-space"></div>
          </div>
        </div>
        <!-- Colonna destra -->
        <div class="sidebar"></div>
      </div>
    `;
  }
}

customElements.define('bubble-room', BubbleRoom);