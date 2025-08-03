import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';

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
    // Clona rawConfig e imposta default layout “wide”
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

    /* ── GRID PRINCIPALE ── */
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr;
      width: 100%; height: 100%;
      box-sizing: border-box;
      border: 2px dashed yellow;  /* 🟨 debug */
    }

    /* ── MAIN AREA ── */
    .main-area {
      display: grid;
      height: 100%; min-height: 0;
      box-sizing: border-box;
      border: 2px dashed green;   /* 🟩 debug */
    }

    /* ROW1 (sensori + nome) */
    .row1 {
      display: grid;
      gap: 4px;
      box-sizing: border-box;
      border: 2px dashed blue;    /* 🟦 debug */
    }
    .sensors-placeholder {
      border: 2px dashed lime;    /* 🟢 debug */
      width: 100%; height: 100%;
      box-sizing: border-box;
    }
    .name-placeholder {
      border: 2px dashed orange;  /* 🟠 debug */
      width: 100%; height: 100%;
      box-sizing: border-box;
    }

    /* ROW2 (icon-mushroom + k-space) */
    .row2 {
      display: grid;
      gap: 4px;
      height: 100%; min-height: 0;
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

    /* ── SIDEBAR ── */
    .sidebar {
      display: flex; flex-direction: column;
      height: 100%; min-height: 0;
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

  render() {
    const layout = this.config.layout || 'wide';
    return html`
      <div class="bubble-room-grid ${layout}">
        <!-- Column 1: Main Area -->
        <div class="main-area">
          <!-- Row 1 -->
          <div class="row1">
            <div class="sensors-placeholder"></div>
            <div class="name-placeholder"></div>
          </div>
          <!-- Row 2 -->
          <div class="row2">
            <div class="icon-mushroom-area"></div>
            <div class="k-space"></div>
          </div>
        </div>
        <!-- Column 2: Sidebar -->
        <div class="sidebar"></div>
      </div>
    `;
  }
}

customElements.define('bubble-room', BubbleRoom);
