/**
 * BubbleIcon.js
 * 
 * Componente che gestisce l'icona principale della stanza nella card Bubble Room.
 * File completo, pronto per essere usato.
 */

import { html, css, LitElement } from 'lit';

export class BubbleIcon extends LitElement {
  static properties = {
    icon: { type: String },
    active: { type: Boolean },
    colorActive: { type: String },
    colorInactive: { type: String }
  };

  constructor() {
    super();
    this.icon = '';
    this.active = false;
    this.colorActive = '#00FF00';
    this.colorInactive = '#555';
  }

  static styles = css`
    .main-icon {
      font-size: 3.2em;
      transition: color 0.2s;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  render() {
    return html`
      <ha-icon
        class="main-icon"
        .icon="${this.icon}"
        style="color: ${this.active ? this.colorActive : this.colorInactive}"
        @click="${() => this.dispatchEvent(new CustomEvent('main-icon-click'))}"
      ></ha-icon>
    `;
  }
}

customElements.define('bubble-icon', BubbleIcon);
