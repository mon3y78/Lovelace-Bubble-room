/**
 * BubbleName.js
 * 
 * Visualizza il nome della stanza, uppercased, grande e bold, allineato a sinistra.
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
      letter-spacing: -0.03em;
      font-size: 3.9em;
      font-weight: 900;
      color: #173c16;
      line-height: 0.92em;
      width: 100%;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 0.13em;
      text-shadow: 1px 1.2px 0 rgba(34,54,15,0.08);
      /* Responsive: riduce su schermi piccoli */
    }
    .bubble-area {
      font-size: 0.47em;
      color: #66bbff;
      opacity: 0.6;
      margin-left: 0.45em;
      font-weight: 400;
    }
    @media (max-width: 480px) {
      .bubble-name {
        font-size: 2.2em;
      }
    }
  `;
  
  render() {
    return html`
      <div class="bubble-name">
        ${this.name}
        ${this.area
          ? html`<span class="bubble-area">(${this.area})</span>`
          : ''}
      </div>
    `;
  }
}

customElements.define('bubble-name', BubbleName);