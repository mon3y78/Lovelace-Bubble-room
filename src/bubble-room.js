// src/bubble-room.js
import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';
// importa il tuo sub‐button custom element
import './components/BubbleSubButton.js';

export class BubbleRoom extends LitElement {
  static properties = {
    config: { type: Object },
    hass:   { type: Object },
  };

  constructor() {
    super();
    this.config = {};
    this.hass   = {};
  }

  setConfig(rawConfig) {
    // clona rawConfig ed imposta default layout “wide”
    this.config = {
      layout: 'wide',
      ...rawConfig,
    };
  }

  static getStubConfig() {
    return {
      type: 'custom:bubble-room',
      layout: 'wide',
      name: 'Stanza di prova',
      area: 'Zona Giorno',
      sensors: [],
      mushrooms: [],
      subbuttons: [
        // esempio di subbutton stub
        { icon: 'mdi:lamp', label: 'Luce', colorOn: '#0f0', colorOff: '#444', active: false }
      ]
    };
  }

  static async getConfigElement() {
    await import('./bubble-room-editor.js');
    return document.createElement('bubble-room-editor');
  }


  render() {
    const layout = this.config.layout || 'stretto';
    return html`
      <div class="bubble-room-grid ${layout}">
        <!-- COLONNA SINISTRA -->
        <div class="main-area">
          <!-- ROW 1: sensori sopra, nome sotto -->
          <div class="row1">
            <div class="sensors-placeholder">[bubble-sensors]</div>
            <div class="name-placeholder">[bubble-name]</div>
          </div>
          <!-- ROW 2: icon-mushroom | k-space -->
          <div class="row2">
            <div class="icon-mushroom-area"></div>
            <div class="k-space"></div>
          </div>
        </div>
        <!-- COLONNA DESTRA -->
        <div class="sidebar">
          <bubble-subbutton
            .subbuttons="${this.config.subbuttons || []}"
            @subbutton-click="${e => console.log('click', e.detail.button)}"
          ></bubble-subbutton>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
    }

    /* ── GRID PRINCIPALE ── */
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      /* rimosso grid-template-rows: 1fr; */
      width: 100%; height: 100%;
      box-sizing: border-box;
      border: 2px dashed yellow;  /* 🟨 debug */
    }

    /* ── MAIN AREA ── */
    .main-area {
      display: grid;
      /* rows impostate solo nei due layout */
      height: 100%;
      min-height: 0;              /* permette di scendere sotto l’altezza minima del contenuto */
      box-sizing: border-box;
      border: 2px dashed green;   /* 🟩 debug */
    }

    /* ROW1 (sensori + nome) */
    .row1 {
      display: grid;
      gap: 4px;
      min-height: 0;              /* <-- qui */
      box-sizing: border-box;
      border: 2px dashed blue;    /* 🟦 debug */
    }
    .sensors-placeholder {
      border: 2px dashed lime;    /* 🟢 debug */
      /* rimosso width/height fissi */
      box-sizing: border-box;
    }
    .name-placeholder {
      border: 2px dashed orange;  /* 🟠 debug */
      /* rimosso width/height fissi */
      box-sizing: border-box;
    }

    /* ROW2 (icon-mushroom + k-space) */
    .row2 {
      display: grid;
      gap: 4px;
      height: 100%;
      min-height: 0;              /* <-- già presente */
      box-sizing: border-box;
      border: 2px dashed purple;  /* 🟪 debug */
    }
    .icon-mushroom-area {
      border: 2px dashed violet;  /* 🟣 debug */
      /* rimosso width/height fissi */
      box-sizing: border-box;
    }
    .k-space {
      border: 2px dashed black;   /* ⚫ debug */
      /* rimosso width/height fissi */
      box-sizing: border-box;
    }

    /* ── SIDEBAR ── */
    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      box-sizing: border-box;
      border: 2px dashed red;     /* 🟥 debug */
    }

    /* ── LAYOUT “TALL” (stretto) ── */
    .bubble-room-grid.tall .main-area {
      grid-template-rows: 1fr 2fr;
    }
    .bubble-room-grid.tall .row1 {
      grid-template-rows: 1fr 2fr;
    }
    .bubble-room-grid.tall .row2 {
      grid-template-columns: 1fr 0fr;
    }

    /* ── LAYOUT “WIDE” (largo) ── */
    .bubble-room-grid.wide .main-area {
      grid-template-rows: 2fr 1fr;
    }
    .bubble-room-grid.wide .row1 {
      grid-template-rows: 2fr 1fr;
    }
    .bubble-room-grid.wide .row2 {
      grid-template-columns: 1fr 1fr;
    }

  `;
}

customElements.define('bubble-room', BubbleRoom);