import { LitElement, html, css } from 'lit';

export class BubbleSubButton extends LitElement {
  static properties = {
    subbuttons: { type: Array }
  };

  constructor() {
    super();
    this.subbuttons = [];
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      gap: 8px;
      width: 100%;
      box-sizing: border-box;
    }

    .sub-button {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      padding: 8px;
      border-radius: 12px;
      text-align: center;
    }

    ha-icon {
      display: block;
      margin: 0 auto 4px auto;
    }
  `;

  render() {
    return html`
      <div class="container">
        ${this.subbuttons.map(
          btn => html`
            <div
              class="sub-button"
              style="background: ${btn.active ? btn.colorOn : btn.colorOff}"
              @click=${() => this._handleClick(btn)}
            >
              <ha-icon icon="${btn.icon}"></ha-icon>
              <div>${btn.label}</div>
            </div>
          `
        )}
      </div>
    `;
  }

  _handleClick(btn) {
    this.dispatchEvent(
      new CustomEvent('subbutton-click', {
        detail: { button: btn },
        bubbles: true,
        composed: true
      })
    );
  }
}

customElements.define('bubble-subbutton', BubbleSubButton);
