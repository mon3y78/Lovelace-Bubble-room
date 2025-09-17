import { LitElement, html, css } from 'lit';

export class BubbleSubButton extends LitElement {
  static properties = {
    subbuttons: { type: Array },
  };
  
  constructor() {
    super();
    this.subbuttons = [];
    this._holdThreshold = 500;
    this._holdTimer = null;
    this._holdFired = false;
    this._currentIndex = -1;
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
      position: relative;
      overflow: hidden;
      margin: 2px 0;
      border-radius: 18px;
      cursor: pointer;
      min-height: 0;
      color: var(--bubble-subbutton-color, #fff);
      background:
        radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0) 60%),
        linear-gradient(140deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 55%),
        linear-gradient(200deg, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.25) 75%),
        var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.16));
      background-blend-mode: screen, lighten, overlay, normal;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.45),
        inset 0 -1px 0 rgba(255, 255, 255, 0.12),
        0 12px 22px rgba(13, 22, 41, 0.28);
      border: 1px solid rgba(255, 255, 255, 0.38);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.18s ease;
      isolation: isolate;
    }

    .sub-button:first-child {
      margin-top: 0;
    }
    
    .sub-button:last-child {
      margin-bottom: 0;
    }
    
    .sub-button:active {
      transform: scale(0.96);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.35),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1),
        0 6px 14px rgba(13, 22, 41, 0.28);
    }

    .sub-button:hover {
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.55),
        inset 0 -1px 0 rgba(255, 255, 255, 0.18),
        0 16px 28px rgba(13, 22, 41, 0.32);
    }

    .sub-button::before,
    .sub-button::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }

    .sub-button::before {
      background: radial-gradient(circle at 20% -10%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
      opacity: 0.7;
      transform: translateY(-6%);
    }

    .sub-button::after {
      background: linear-gradient(200deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 55%);
      opacity: 0.45;
      mix-blend-mode: soft-light;
    }

    .sub-button:hover::before {
      opacity: 0.85;
    }

    /* 👇 Icona scalabile al contenitore */
    .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter:
        drop-shadow(0 6px 12px rgba(13, 22, 41, 0.35))
        drop-shadow(0 1px 0 rgba(255, 255, 255, 0.45));
    }
    
    /* 👇 (Opzionale) Rende l'icona SVG responsiva */
    ha-icon {
      --mdc-icon-size: 100%;
    }
    
    ha-icon svg {
      width: 100%;
      height: 100%;
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
              style="--bubble-subbutton-bg:${bg};--bubble-subbutton-color:${color};"
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
    this._holdFired = false;
    this._currentIndex = idx;
    this._holdTimer = window.setTimeout(() => {
      this._holdFired = true;
      this._fireHassAction(idx, 'hold');
    }, this._holdThreshold);
  }
  
  _onUp(idx) {
    this._clearHoldTimer();
    if (!this._holdFired && this._currentIndex === idx) {
      this._fireHassAction(idx, 'tap');
    }
  }
  
  _clearHoldTimer() {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }
  
  _fireHassAction(idx, actionType) {
    const cfg = this.subbuttons?.[idx];
    if (!cfg || !cfg.entity_id) return;
    
    const actionConfig = {
      entity: cfg.entity_id,
      tap_action: cfg.tap_action || { action: 'toggle' },
      hold_action: cfg.hold_action || { action: 'more-info' },
    };
    
    const evt = new Event('hass-action', { bubbles: true, composed: true });
    evt.detail = {
      config: actionConfig,
      action: actionType,
    };
    this.dispatchEvent(evt);
  }
}

customElements.define('bubble-subbutton', BubbleSubButton);