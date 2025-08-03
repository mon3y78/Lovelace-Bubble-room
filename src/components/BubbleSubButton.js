// src/components/BubbleSubButton.js
import { LitElement, html, css } from 'lit';

export class BubbleSubButton extends LitElement {
  static properties = {
    // riceve array di oggetti { icon, active, colorOn, colorOff, iconOn, iconOff }
    subbuttons: { type: Array },
  };

  constructor() {
    super();
    this.subbuttons     = [];
    this._holdThreshold = 500;  // ms per considerare “hold”
    this._holdTimer     = null;
    this._holdFired     = false;
    this._currentIndex  = -1;
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
      margin: 2px 0;
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
      --mdc-icon-size: 3em;
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
    return html`
      <div class="container">
        ${this.subbuttons.map((btn, idx) => {
          const bg    = btn.active ? btn.colorOn  : btn.colorOff;
          const color = btn.active ? btn.iconOn   : btn.iconOff;
          return html`
            <div
              class="sub-button"
              style="background:${bg};color:${color};"
              @pointerdown=${() => this._onDown(idx)}
              @pointerup=${() => this._onUp(idx)}
              @pointerleave=${() => this._clearHoldTimer()}
              @pointercancel=${() => this._clearHoldTimer()}
            >
              <ha-icon icon="${btn.icon}"></ha-icon>
            </div>
          `;
        })}
      </div>
    `;
  }

  _onDown(idx) {
    // Inizio a contare per il hold
    this._holdFired    = false;
    this._currentIndex = idx;
    this._holdTimer    = window.setTimeout(() => {
      this._holdFired = true;
      const btn = this.subbuttons[this._currentIndex];
      this.dispatchEvent(new CustomEvent('subbutton-hold', {
        detail: { ...btn, index: this._currentIndex },
        bubbles: true,
        composed: true,
      }));
    }, this._holdThreshold);
  }

  _onUp(idx) {
    // Rilascio: se il hold non è ancora scattato, è un tap
    this._clearHoldTimer();
    if (!this._holdFired && this._currentIndex === idx) {
      const btn = this.subbuttons[idx];
      this.dispatchEvent(new CustomEvent('subbutton-click', {
        detail: { ...btn, index: idx },
        bubbles: true,
        composed: true,
      }));
    }
  }

  _clearHoldTimer() {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }
}

customElements.define('bubble-subbutton', BubbleSubButton);