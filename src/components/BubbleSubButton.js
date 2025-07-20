/**
 * BubbleSubButton.js
 * Componente per la visualizzazione e gestione di un sub-button (azione rapida) nella Bubble Room card.
 * Autore: mon3y78 (https://github.com/mon3y78)
 */

import { LitElement, html, css } from 'lit';

export class BubbleSubButton extends LitElement {
  static properties = {
    entity: { type: String },
    icon: { type: String },
    state: { type: String },
    color: { type: String }
  };
  
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .subbutton {
      border-radius: 8px;
      padding: 6px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: background 0.2s;
      background: var(--subbutton-bg, #ededed);
    }
    .subbutton-icon {
      margin-right: 4px;
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
      <div class="subbutton" style="background: ${this.color || 'var(--subbutton-bg, #ededed)'}">
        <span class="subbutton-icon">
          <ha-icon .icon=${this.icon}></ha-icon>
        </span>
        <span class="subbutton-label">
          ${this.entity}
        </span>
      </div>
    `;
  }
}

customElements.define('bubble-subbutton', BubbleSubButton);