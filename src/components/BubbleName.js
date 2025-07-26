/**
 * BubbleName.js
 * 
 * Componente che visualizza il nome della stanza nella card Bubble Room.
 * File completo e chiuso.
 */

import { html, css, LitElement } from 'lit';

export class BubbleName extends LitElement {
  static properties = {
    name: { type: String },
    area: { type: String }
  };

  constructor() {
    super();
    this.name = '';
    this.area = '';
  }

  static styles = css`
    .bubble-name {
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      font-size: 2.1em;
      width: 100%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 0.3em;
    }
    .bubble-area {
      font-size: 0.89em;
      color: #66bbff;
      opacity: 0.6;
    }
  `;

  render() {
    return html`
      <div class="bubble-name">
        ${this.name}
        ${this.area
          ? html`<span class="bubble-area">&nbsp;(${this.area})</span>`
          : ''}
      </div>
    `;
  }
}

customElements.define('bubble-name', BubbleName);
