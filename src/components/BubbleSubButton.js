/**
 * BubbleSubButton.js
 * 
 * Componente che visualizza i subbutton della stanza nella card Bubble Room.
 * File completo.
 */

import { html, css, LitElement } from 'lit';

export class BubbleSubButton extends LitElement {
  static properties = {
    subbuttons: { type: Array }
  };

  constructor() {
    super();
    this.subbuttons = [];
  }

  static styles = css`
    .subbutton-row {
      display: flex;
      gap: 13px;
      justify-content: center;
      margin-top: 0.3em;
    }
    .subbutton {
      background: rgba(50,50,50,0.12);
      border-radius: 50%;
      width: 2.6em;
      height: 2.6em;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: box-shadow 0.16s, background 0.13s;
      box-shadow: 0 1px 6px 0 rgba(0,0,0,0.08);
    }
    .subbutton.active {
      background: rgba(120, 240, 120, 0.19);
      box-shadow: 0 1px 8px 0 rgba(30,230,60,0.15);
    }
    .subbutton-icon {
      font-size: 1.46em;
      opacity: 0.91;
    }
  `;

  render() {
    return html`
      <div class="subbutton-row">
        ${this.subbuttons.map(
          (sub, idx) => html`
            <div
              class="subbutton ${sub.active ? 'active' : ''}"
              style="color: ${sub.active ? sub.colorOn : sub.colorOff};"
              @click="${() => this.dispatchEvent(new CustomEvent('subbutton-click', { detail: idx }))}"
              title="${sub.label || ''}"
            >
              <ha-icon class="subbutton-icon" .icon="${sub.icon}"></ha-icon>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('bubble-subbutton', BubbleSubButton);
