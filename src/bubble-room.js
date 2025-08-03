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

  // stub per gestire il click sui sub‐button
  _onSubButtonClick(e) {
    console.log('Subbutton clicked:', e.detail.button);
    // qui potresti fare una service call in HA…
  }

  static styles = css`
    :host {
      display: block; height: 100%; box-sizing: border-box;
    }
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr;
      width:100%; height:100%; box-sizing: border-box;
      border: 2px dashed yellow;
    }
    .main-area {
      display: grid; height:100%; min-height:0; box-sizing:border-box;
      border:2px dashed green;
    }
    .row1 {
      display:grid; gap:4px; box-sizing:border-box; border:2px dashed blue;
    }
    .sensors-placeholder { border:2px dashed lime; width:100%; height:100%; box-sizing:border-box; }
    .name-placeholder    { border:2px dashed orange; width:100%; height:100%; box-sizing:border-box; }
    .row2 {
      display:grid; gap:4px; height:100%; min-height:0; box-sizing:border-box;
      border:2px dashed purple;
    }
    .icon-mushroom-area { border:2px dashed violet; width:100%; height:100%; box-sizing:border-box; }
    .k-space            { border:2px dashed black;  width:100%; height:100%; box-sizing:border-box; }
    .sidebar {
      display:flex; flex-direction:column;
      height:100%; min-height:0; box-sizing:border-box;
      border:2px dashed red;
    }

    /* ── LAYOUT “TALL” (stretto) ── */
    .bubble-room-grid.tall .main-area    { grid-template-rows: 1fr 2fr; }
    .bubble-room-grid.tall .row1         { grid-template-rows: 1fr 2fr; }
    .bubble-room-grid.tall .row2         { grid-template-columns: 1fr 0fr; }

    /* ── LAYOUT “WIDE” (largo) ── */
    .bubble-room-grid.wide .main-area    { grid-template-rows: 2fr 1fr; }
    .bubble-room-grid.wide .row1         { grid-template-rows: 2fr 1fr; }
    .bubble-room-grid.wide .row2         { grid-template-columns: 1fr 1fr; }
  `;

  render() {
    const layout = this.config.layout || 'wide';
    const subbuttons = this.config.subbuttons || [];
    return html`
      <div class="bubble-room-grid ${layout}">
        <!-- COLONNA SINISTRA -->
        <div class="main-area">
          <div class="row1">
            <div class="sensors-placeholder">[bubble-sensors]</div>
            <div class="name-placeholder">[bubble-name]</div>
          </div>
          <div class="row2">
            <div class="icon-mushroom-area"></div>
            <div class="k-space"></div>
          </div>
        </div>
        <!-- COLONNA DESTRA: mettiamo qui il tuo BubbleSubButton -->
        <div class="sidebar">
          <bubble-subbutton
            .subbuttons="${subbuttons}"
            @subbutton-click="${this._onSubButtonClick}"
          ></bubble-subbutton>
        </div>
      </div>
    `;
  }
}

customElements.define('bubble-room', BubbleRoom);
