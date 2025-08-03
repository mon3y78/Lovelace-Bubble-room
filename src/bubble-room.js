// src/bubble-room.js
import { LitElement, html, css } from 'lit';

export class BubbleRoom extends LitElement {
  // 1) Dichiariamo la proprietà config
  static properties = {
    config: { type: Object },
  };
  
  // 2) Home Assistant chiama setConfig per passarti la config della card
  setConfig(config) {
    this.config = config;
  }
  
  // 3) Stili minimi col debug delle aree
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
  
  // 4) Renderizziamo solo i box
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

// 5) Registriamo il tag <bubble-room>
customElements.define('bubble-room', BubbleRoom);