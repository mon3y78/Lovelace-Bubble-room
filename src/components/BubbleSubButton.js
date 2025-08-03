// src/components/BubbleSubButton.js
import { LitElement, html, css } from 'lit';

export class BubbleSubButton extends LitElement {
  static properties = {
    // Array of subbutton configs:
    // [{ entity, icon, active, colorOn, colorOff, label }, …]
    subbuttons: { type: Array },
  };

  constructor() {
    super();
    this.subbuttons = [];
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      min-height: 0; 
      min-width: 0; 
      box-sizing: border-box;
    }
    .sub-button {
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 4px 0;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
      min-height: 0;  
    }
    .sub-button:last-child {
      margin-bottom: 0;
    }
    .sub-button:first-child {
      margin-top: 0;
    }
    .sub-button:active {
      transform: scale(0.97);
    }
    .sub-button ha-icon {
      --mdc-icon-size: 2em;
    }
    .sub-button .label {
      font-size: 0.95rem;
      font-weight: 600;
      text-align: center;
      color: var(--primary-text-color);
      word-break: break-word;
    }
  `;

  render() {
    const count = this.subbuttons.length;
    if (!count) {
      return html`<div class="container"></div>`;
    }
    return html`
      <div class="container">
        ${this.subbuttons.map((btn, idx) => {
          const bg = btn.active ? btn.colorOn : btn.colorOff;
          return html`
            <div
              class="sub-button"
              style="background: ${bg};"
              @click=${() => this._onClick(idx)}
            >
              <ha-icon icon="${btn.icon}"></ha-icon>
            </div>
          `;
        })}
      </div>
    `;
  }

  _onClick(index) {
    const btn = this.subbuttons[index];
    this.dispatchEvent(new CustomEvent('subbutton-click', {
      detail: { entity: btn.entity, index },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('bubble-subbutton', BubbleSubButton);
