// src/components/BubbleName.js

import { LitElement, html, css } from 'lit';

export class BubbleName extends LitElement {
  static properties = {
    name: { type: String },
    color: { type: String },
  };
  
  static styles = css`
    .name-area {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      text-transform: uppercase;
      overflow: hidden;
    }
    .name-text {
      display: inline-block;
      white-space: nowrap;
      text-align: center;
      line-height: 1;
      vertical-align: middle;
      width: 100%;
      height: 100%;
    }
  `;
  
  updated() {
    this._resizeNameFont();
  }
  
  _resizeNameFont() {
    // Qui puoi copiare/portare la funzione di resize che già usi
    const container = this.shadowRoot?.querySelector('.name-area');
    const text = this.shadowRoot?.querySelector('.name-text');
    if (!container || !text) return;
    // ... logica di resize esistente ...
  }
  
  render() {
    return html`
      <div class="name-area" style="color: ${this.color || 'inherit'};">
        <span class="name-text">${this.name}</span>
      </div>
    `;
  }
}

customElements.define('bubble-name', BubbleName);