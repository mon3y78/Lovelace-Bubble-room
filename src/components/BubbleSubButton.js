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
      --bubble-subbutton-base: var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.16));
      --bubble-subbutton-glass-tint: color-mix(in srgb, var(--bubble-subbutton-base) 28%, transparent);
      --bubble-subbutton-glass-highlight: color-mix(in srgb, var(--bubble-subbutton-base) 18%, rgba(255, 255, 255, 0.65));
      color: var(--bubble-subbutton-color, #fff);
      background:
        linear-gradient(150deg,
          color-mix(in srgb, var(--bubble-subbutton-glass-highlight) 72%, rgba(255, 255, 255, 0.08)),
          color-mix(in srgb, var(--bubble-subbutton-glass-tint) 40%, rgba(15, 23, 42, 0.18))),
        radial-gradient(circle at 22% 18%, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.22) 38%, rgba(255, 255, 255, 0) 70%),
        linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02)),
        color-mix(in srgb, var(--bubble-subbutton-glass-tint) 46%, rgba(15, 23, 42, 0.08));
      background-blend-mode: screen, lighten, soft-light, normal;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(255, 255, 255, 0.12),
        0 16px 26px -18px rgba(15, 23, 42, 0.34),
        0 6px 16px rgba(15, 23, 42, 0.24);
      border: 1px solid color-mix(in srgb, var(--bubble-subbutton-glass-highlight) 36%, rgba(255, 255, 255, 0.38));
      backdrop-filter: blur(22px) saturate(145%);
      -webkit-backdrop-filter: blur(22px) saturate(145%);
      transition:
        background 0.35s ease,
        box-shadow 0.35s ease,
        transform 0.2s ease,
        border-color 0.35s ease;
      isolation: isolate;
    }

    .sub-button:first-child {
      margin-top: 0;
    }
    
    .sub-button:last-child {
      margin-bottom: 0;
    }
    
    .sub-button:hover {
      transform: translateY(-1px);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.62),
        inset 0 -1px 0 rgba(255, 255, 255, 0.18),
        0 20px 32px -16px rgba(15, 23, 42, 0.4),
        0 10px 20px rgba(15, 23, 42, 0.26);
      border-color: color-mix(in srgb, var(--bubble-subbutton-glass-highlight) 42%, rgba(255, 255, 255, 0.52));
    }

    .sub-button:active {
      transform: scale(0.97);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.38),
        inset 0 -1px 0 rgba(255, 255, 255, 0.08),
        0 10px 18px -12px rgba(15, 23, 42, 0.45),
        0 6px 14px rgba(15, 23, 42, 0.28);
      border-color: rgba(255, 255, 255, 0.38);
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
      background:
        radial-gradient(circle at 26% 6%, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.22) 42%, rgba(255, 255, 255, 0) 72%),
        linear-gradient(140deg, color-mix(in srgb, var(--bubble-subbutton-glass-highlight) 55%, rgba(255, 255, 255, 0.24)), rgba(255, 255, 255, 0) 58%);
      opacity: 0.7;
      transform: translateY(-8%);
      filter: blur(0.5px);
    }

    .sub-button::after {
      inset: 1px;
      border-radius: 16px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.08) 45%, rgba(255, 255, 255, 0) 82%),
        linear-gradient(125deg, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 50%, rgba(13, 22, 41, 0.18)), rgba(13, 22, 41, 0) 72%);
      opacity: 0.52;
      mix-blend-mode: soft-light;
    }

    .sub-button:hover::before {
      opacity: 0.92;
    }

    /* 👇 Icona scalabile al contenitore */
    .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter:
        drop-shadow(0 9px 16px rgba(13, 22, 41, 0.36))
        drop-shadow(0 1px 0 rgba(255, 255, 255, 0.5));
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