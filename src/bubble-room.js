// src/bubble-room.js
import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';

export class BubbleRoom extends LitElement {
  static properties = {
    config: { type: Object },
    hass: { type: Object },
  };
  
  setConfig(config) {
    this.config = config;
  }
  
  static getStubConfig() {
    return { type: 'custom:bubble-room' };
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
    /* GRID PRINCIPALE: 2fr + 1fr in col, 1fr in row */
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 2px dashed yellow;       /* 🟨 grid wrapper */
    }
    /* MAIN AREA: due righe */
    .main-area {
      display: grid;
      grid-template-rows: auto 1fr;
      height: 100%;
      min-height: 0;
      box-sizing: border-box;
      border: 2px dashed green;        /* 🟩 main-area */
    }
    /* RIGA 1: bubble-name + sensors */
    .row1 {
      display: flex;
      gap: 8px;
      box-sizing: border-box;
      border: 2px dashed blue;         /* 🟦 row1 */
    }
    /* RIGA 2: due colonne */
    .row2 {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px;
      height: 100%;
      min-height: 0;
      box-sizing: border-box;
      border: 2px dashed purple;       /* 🟪 row2 */
    }
    /* Colonna 1 di row2 */
    .icon-mushroom-area {
      box-sizing: border-box;
      border: 2px dashed violet;       /* 🟣 icon-mushroom-area */
      width: 100%;
      height: 100%;
    }
    /* Colonna 2 di row2 */
    .k-space {
      box-sizing: border-box;
      border: 2px dashed black;        /* ⚫ k-space placeholder */
      width: 100%;
      height: 100%;
    }
    /* SIDEBAR */
    .sidebar {
      height: 100%;
      min-height: 0;
      box-sizing: border-box;
      border: 2px dashed red;          /* 🟥 sidebar */
    }
  `;
  
  render() {
    return html`
      <div class="bubble-room-grid">
        <!-- colonna sinistra -->
        <div class="main-area">
          <!-- row 1 -->
          <div class="row1">
            <div class="bubble-name-placeholder">[bubble-name]</div>
            <div class="sensors-placeholder">[bubble-sensors]</div>
          </div>
          <!-- row 2 -->
          <div class="row2">
            <div class="icon-mushroom-area"></div>
            <div class="k-space"></div>
          </div>
        </div>
        <!-- colonna destra -->
        <div class="sidebar"></div>
      </div>
    `;
  }
}

customElements.define('bubble-room', BubbleRoom);