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
      --bubble-subbutton-base: var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.1));
      --bubble-subbutton-glass-tint: color-mix(in srgb, transparent 85%, var(--bubble-subbutton-base) 15%);
      --bubble-subbutton-glass-highlight: color-mix(in srgb, rgba(255, 255, 255, 0.95) 65%, var(--bubble-subbutton-base) 35%);
      --bubble-subbutton-glass-caustic: color-mix(in srgb, rgba(255, 255, 255, 0.82) 50%, var(--bubble-subbutton-base) 50%);
      --bubble-subbutton-glass-sheen: color-mix(in srgb, rgba(255, 255, 255, 0.6) 55%, var(--bubble-subbutton-base) 45%);
      color: var(--bubble-subbutton-color, #fff);
      background:
        linear-gradient(148deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 48%, rgba(255, 255, 255, 0) 100%),
        radial-gradient(120% 140% at 18% 12%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.3) 46%, rgba(255, 255, 255, 0) 72%),
        radial-gradient(115% 150% at 78% 120%, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 68%, transparent) 0%, transparent 74%),
        color-mix(in srgb, rgba(255, 255, 255, 0.05) 45%, var(--bubble-subbutton-glass-tint) 55%);
      background-repeat: no-repeat;
      background-origin: border-box;
      background-blend-mode: screen, lighten, soft-light, normal;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(255, 255, 255, 0.06),
        0 16px 28px -18px rgba(13, 22, 41, 0.28),
        0 8px 20px rgba(13, 22, 41, 0.16);
      border: 1px solid color-mix(in srgb, rgba(255, 255, 255, 0.76) 68%, var(--bubble-subbutton-glass-sheen) 32%);
      backdrop-filter: blur(22px) saturate(150%);
      -webkit-backdrop-filter: blur(22px) saturate(150%);
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
      background:
        linear-gradient(150deg, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.12) 46%, rgba(255, 255, 255, 0.02) 100%),
        radial-gradient(125% 145% at 18% 10%, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.36) 54%, rgba(255, 255, 255, 0) 78%),
        radial-gradient(120% 150% at 78% 120%, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 78%, transparent) 0%, transparent 74%),
        color-mix(in srgb, rgba(255, 255, 255, 0.08) 55%, var(--bubble-subbutton-glass-tint) 45%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.64),
        inset 0 -1px 0 rgba(255, 255, 255, 0.12),
        0 20px 32px -18px rgba(13, 22, 41, 0.32),
        0 12px 24px rgba(13, 22, 41, 0.2);
      border-color: color-mix(in srgb, rgba(255, 255, 255, 0.88) 72%, var(--bubble-subbutton-glass-sheen) 28%);
    }

    .sub-button:active {
      transform: scale(0.97);
      background:
        linear-gradient(160deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.1) 48%, rgba(255, 255, 255, 0.02) 100%),
        radial-gradient(128% 142% at 20% 14%, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.28) 58%, rgba(255, 255, 255, 0) 80%),
        radial-gradient(118% 146% at 78% 120%, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 66%, transparent) 0%, transparent 74%),
        color-mix(in srgb, rgba(255, 255, 255, 0.04) 45%, var(--bubble-subbutton-glass-tint) 55%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.38),
        inset 0 -1px 0 rgba(255, 255, 255, 0.04),
        0 14px 24px -16px rgba(13, 22, 41, 0.3),
        0 8px 18px rgba(13, 22, 41, 0.2);
      border-color: color-mix(in srgb, rgba(255, 255, 255, 0.72) 68%, var(--bubble-subbutton-glass-sheen) 32%);
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
        radial-gradient(112% 132% at 22% 8%, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.42) 46%, rgba(255, 255, 255, 0) 74%),
        conic-gradient(from 225deg at 18% 14%,
          rgba(255, 255, 255, 0.28) 0deg,
          rgba(255, 255, 255, 0.16) 110deg,
          rgba(255, 255, 255, 0) 200deg,
          rgba(255, 255, 255, 0.12) 320deg,
          rgba(255, 255, 255, 0.28) 360deg);
      opacity: 0.64;
      transform: translateY(-3%);
      filter: blur(0.35px);
    }

    .sub-button::after {
      inset: 1px;
      border-radius: 16px;
      background:
        linear-gradient(184deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.06) 52%, rgba(255, 255, 255, 0) 86%),
        linear-gradient(126deg,
          color-mix(in srgb, var(--bubble-subbutton-glass-tint) 68%, rgba(13, 22, 41, 0.16)),
          rgba(13, 22, 41, 0) 78%),
        radial-gradient(120% 128% at 74% 82%, color-mix(in srgb, var(--bubble-subbutton-glass-caustic) 38%, transparent), transparent 70%);
      opacity: 0.48;
      mix-blend-mode: soft-light;
    }

    .sub-button::after,
    .sub-button::before {
      will-change: opacity, transform;
    }

    .sub-button:hover::before {
      opacity: 0.85;
    }

    .sub-button:hover::after {
      opacity: 0.56;
    }

    /* 👇 Icona scalabile al contenitore */
    .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter:
        drop-shadow(0 6px 14px rgba(13, 22, 41, 0.26))
        drop-shadow(0 1px 0 rgba(255, 255, 255, 0.38));
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
