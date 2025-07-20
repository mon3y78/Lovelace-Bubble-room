/**
 * BubbleMushroom.js
 * Componente per la visualizzazione degli "entity mushroom" (icone dinamiche attorno all’icona principale) nella Bubble Room card.
 * Autore: mon3y78 (https://github.com/mon3y78)
 */

import { LitElement, html, css } from 'lit';

export class BubbleMushroom extends LitElement {
  static properties = {
    entity: { type: String },
    icon: { type: String },
    state: { type: String },
    color: { type: String }
  };
  
  static styles = css`
    :host {
      display: block;
    }
    .mushroom {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--mushroom-bg, transparent);
      width: 38px;
      height: 38px;
      box-sizing: border-box;
    }
    .mushroom-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
  `;
  
  constructor() {
    super();
    this.entity = '';
    this.icon = '';
    this.state = '';
    this.color = '';
  }
  
  render() {
    return html`
      <div class="mushroom" style="background:${this.color || 'var(--mushroom-bg, transparent)'}">
        <ha-icon .icon=${this.icon} class="mushroom-icon"></ha-icon>
      </div>
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);