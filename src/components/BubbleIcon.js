/**
 * BubbleIcon.js
 * Componente per la visualizzazione dell’icona principale della stanza nella Bubble Room card.
 * Autore: mon3y78 (https://github.com/mon3y78)
 */

import { LitElement, html, css } from 'lit';

export class BubbleIcon extends LitElement {
  static properties = {
    icon: { type: String },
    color: { type: String },
    size: { type: Number }
  };
  
  static styles = css`
    :host {
      display: block;
    }
    .bubble-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: var(--icon-size, 80px);
      height: var(--icon-size, 80px);
      background: var(--icon-bg, transparent);
    }
    .icon-inner {
      font-size: var(--icon-inner-size, 64px);
      color: var(--icon-color, inherit);
      width: 100%;
      height: 100%;
      text-align: center;
    }
  `;
  
  constructor() {
    super();
    this.icon = '';
    this.color = '';
    this.size = 80;
  }
  
  render() {
    return html`
      <div class="bubble-icon" style="width:${this.size}px; height:${this.size}px; background:${this.color || 'transparent'};">
        <ha-icon class="icon-inner" .icon=${this.icon} style="font-size:${Math.round(this.size * 0.8)}px;"></ha-icon>
      </div>
    `;
  }
}

customElements.define('bubble-icon', BubbleIcon);