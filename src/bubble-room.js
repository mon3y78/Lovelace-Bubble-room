// src/bubble-room.js
import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';

export class BubbleRoom extends LitElement {
  static properties = { config: {}, hass: {} };
  setConfig(config) { this.config = config; }
  
  static getStubConfig() { return { type: 'custom:bubble-room' }; }
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
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr;
      width: 100%; height: 100%;
      box-sizing: border-box;
      border: 2px dashed yellow;    /* 🟨 */
    }
    /* MAIN AREA: 2 righe (1fr + 2fr) */
    .main-area {
      display: grid;
      grid-template-rows: 1fr 2fr;
      height: 100%; min-height: 0;
      box-sizing: border-box;
      border: 2px dashed green;     /* 🟩 */
    }
    /* ROW1: due righe interne (sensori sopra, nome sotto) */
    .row1 {
      display: grid;
      grid-template-rows: 1fr 2fr;
      box-sizing: border-box;
      border: 2px dashed blue;      /* 🟦 */
    }
    .sensors-placeholder {
      border: 2px dashed lime;      /* 🟢 sensori */
      width: 100%; height: 100%;
      box-sizing: border-box;
    }
    .name-placeholder {
      border: 2px dashed orange;    /* 🟠 nome */
      width: 100%; height: 100%;
      box-sizing: border-box;
    }
    /* ROW2: 2 colonne (1fr + 0fr) */
    .row2 {
      display: grid;
      grid-template-columns: 1fr 0fr;
      height: 100%; min-height: 0;
      box-sizing: border-box;
      border: 2px dashed purple;    /* 🟪 */
    }
    .icon-mushroom-area {
      border: 2px dashed violet;    /* 🟣 */
      width: 100%; height: 100%;
      box-sizing: border-box;
    }
    .k-space {
      border: 2px dashed black;     /* ⚫ */
      width: 100%; height: 100%;
      box-sizing: border-box;
    }
    /* SIDEBAR */
    .sidebar {
      display: flex; flex-direction: column;
      height: 100%; min-height: 0;
      box-sizing: border-box;
      border: 2px dashed red;       /* 🟥 */
    }
  `;
  
  render() {
    return html`
      <div class="bubble-room-grid">
        <!-- COLONNA SINISTRA -->
        <div class="main-area">
          <!-- ROW1 -->
          <div class="row1">
            <div class="sensors-placeholder">[bubble-sensors]</div>
            <div class="name-placeholder">[bubble-name]</div>
          </div>
          <!-- ROW2 -->
          <div class="row2">
            <div class="icon-mushroom-area"></div>
            <div class="k-space"></div>
          </div>
        </div>
        <!-- COLONNA DESTRA -->
        <div class="sidebar"></div>
      </div>
    `;
  }
}

customElements.define('bubble-room', BubbleRoom);