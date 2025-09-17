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
      --bubble-subbutton-base: var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.14));
      --bubble-subbutton-glass-tint: color-mix(in srgb, transparent 78%, var(--bubble-subbutton-base) 22%);
      --bubble-subbutton-glass-highlight: color-mix(in srgb, rgba(255, 255, 255, 0.9) 75%, var(--bubble-subbutton-base) 25%);
      --bubble-subbutton-glass-caustic: color-mix(in srgb, rgba(255, 255, 255, 0.8) 55%, var(--bubble-subbutton-base) 45%);
      color: var(--bubble-subbutton-color, #fff);
      background:
        linear-gradient(145deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.18) 42%, rgba(255, 255, 255, 0.05) 100%),
        radial-gradient(135% 145% at 18% 15%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.28) 55%, transparent 75%),
        radial-gradient(120% 130% at 74% 110%, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 70%, transparent) 0%, transparent 70%),
        color-mix(in srgb, rgba(255, 255, 255, 0.06) 65%, var(--bubble-subbutton-glass-tint) 35%);
      background-blend-mode: screen, lighten, soft-light, normal;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.55),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1),
        0 18px 34px -18px rgba(13, 22, 41, 0.32),
        0 8px 22px rgba(13, 22, 41, 0.18);
      border: 1px solid color-mix(in srgb, rgba(255, 255, 255, 0.82) 68%, var(--bubble-subbutton-glass-tint) 32%);
      backdrop-filter: blur(24px) saturate(160%);
      -webkit-backdrop-filter: blur(24px) saturate(160%);
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
        linear-gradient(150deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.22) 44%, rgba(255, 255, 255, 0.08) 100%),
        radial-gradient(135% 145% at 18% 12%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.32) 54%, transparent 74%),
        radial-gradient(120% 130% at 74% 110%, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 78%, transparent) 0%, transparent 70%),
        color-mix(in srgb, rgba(255, 255, 255, 0.08) 65%, var(--bubble-subbutton-glass-tint) 35%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.72),
        inset 0 -1px 0 rgba(255, 255, 255, 0.18),
        0 22px 36px -18px rgba(13, 22, 41, 0.36),
        0 12px 26px rgba(13, 22, 41, 0.22);
      border-color: color-mix(in srgb, rgba(255, 255, 255, 0.9) 75%, var(--bubble-subbutton-glass-tint) 25%);
    }

    .sub-button:active {
      transform: scale(0.97);
      background:
        linear-gradient(160deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.16) 44%, rgba(255, 255, 255, 0.05) 100%),
        radial-gradient(135% 145% at 20% 15%, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.28) 58%, transparent 78%),
        radial-gradient(120% 130% at 74% 110%, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 70%, transparent) 0%, transparent 72%),
        color-mix(in srgb, rgba(255, 255, 255, 0.04) 60%, var(--bubble-subbutton-glass-tint) 40%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(255, 255, 255, 0.06),
        0 14px 24px -16px rgba(13, 22, 41, 0.34),
        0 8px 18px rgba(13, 22, 41, 0.24);
      border-color: color-mix(in srgb, rgba(255, 255, 255, 0.78) 70%, var(--bubble-subbutton-glass-tint) 30%);
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
        radial-gradient(115% 135% at 22% 8%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.5) 46%, rgba(255, 255, 255, 0) 74%),
        conic-gradient(from 225deg at 18% 14%,
          rgba(255, 255, 255, 0.35) 0deg,
          rgba(255, 255, 255, 0.18) 110deg,
          rgba(255, 255, 255, 0) 200deg,
          rgba(255, 255, 255, 0.15) 320deg,
          rgba(255, 255, 255, 0.35) 360deg);
      opacity: 0.72;
      transform: translateY(-4%);
      filter: blur(0.3px);
    }

    .sub-button::after {
      inset: 1px;
      border-radius: 16px;
      background:
        linear-gradient(182deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.08) 48%, rgba(255, 255, 255, 0) 82%),
        linear-gradient(128deg,
          color-mix(in srgb, var(--bubble-subbutton-glass-tint) 75%, rgba(13, 22, 41, 0.18)),
          rgba(13, 22, 41, 0) 76%),
        radial-gradient(118% 125% at 74% 82%, color-mix(in srgb, var(--bubble-subbutton-glass-caustic) 42%, transparent), transparent 68%);
      opacity: 0.52;
      mix-blend-mode: soft-light;
    }

    .sub-button::after,
    .sub-button::before {
      will-change: opacity, transform;
    }

    .sub-button:hover::before {
      opacity: 0.94;
    }

    .sub-button:hover::after {
      opacity: 0.64;
    }

    /* 👇 Icona scalabile al contenitore */
    .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter:
        drop-shadow(0 8px 16px rgba(13, 22, 41, 0.35))
        drop-shadow(0 1px 0 rgba(255, 255, 255, 0.48));
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