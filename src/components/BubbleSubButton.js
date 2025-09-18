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
      --bubble-subbutton-base: var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.04));
      --bubble-subbutton-glass-tint: color-mix(in srgb, transparent 96%, var(--bubble-subbutton-base) 4%);
      --bubble-subbutton-glass-highlight: color-mix(in srgb, rgba(255, 255, 255, 0.98) 78%, transparent 22%);
      --bubble-subbutton-glass-caustic: color-mix(in srgb, rgba(255, 255, 255, 0.86) 60%, var(--bubble-subbutton-glass-tint) 40%);
      --bubble-subbutton-glass-sheen: color-mix(in srgb, rgba(255, 255, 255, 0.68) 70%, transparent 30%);
      color: var(--bubble-subbutton-color, #fff);
      background:
        linear-gradient(152deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.04) 46%, rgba(255, 255, 255, 0) 82%),
        radial-gradient(118% 140% at 18% 12%, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.14) 46%, rgba(255, 255, 255, 0) 74%),
        radial-gradient(110% 148% at 78% 120%, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 36%, transparent) 0%, transparent 74%),
        color-mix(in srgb, rgba(255, 255, 255, 0.02) 82%, var(--bubble-subbutton-glass-tint) 18%);
      background-repeat: no-repeat;
      background-origin: border-box;
      background-blend-mode: screen, lighten, soft-light, normal;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(255, 255, 255, 0.04),
        0 12px 26px -24px rgba(13, 22, 41, 0.22),
        0 6px 16px rgba(13, 22, 41, 0.1);
      border: 1px solid color-mix(in srgb, rgba(255, 255, 255, 0.82) 70%, var(--bubble-subbutton-glass-sheen) 30%);
      backdrop-filter: blur(22px) saturate(130%);
      -webkit-backdrop-filter: blur(22px) saturate(130%);
      transition:
        background 0.3s ease,
        box-shadow 0.3s ease,
        transform 0.18s ease,
        border-color 0.3s ease;
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
        linear-gradient(154deg, rgba(255, 255, 255, 0.26) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.02) 100%),
        radial-gradient(124% 144% at 18% 10%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.24) 54%, rgba(255, 255, 255, 0) 80%),
        radial-gradient(116% 148% at 78% 120%, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 48%, transparent) 0%, transparent 74%),
        color-mix(in srgb, rgba(255, 255, 255, 0.04) 72%, var(--bubble-subbutton-glass-tint) 28%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.58),
        inset 0 -1px 0 rgba(255, 255, 255, 0.08),
        0 18px 30px -20px rgba(13, 22, 41, 0.24),
        0 11px 18px rgba(13, 22, 41, 0.14);
      border-color: color-mix(in srgb, rgba(255, 255, 255, 0.9) 70%, var(--bubble-subbutton-glass-sheen) 30%);
    }

    .sub-button:active {
      transform: scale(0.97);
      background:
        linear-gradient(160deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 100%),
        radial-gradient(126% 140% at 20% 14%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.18) 58%, rgba(255, 255, 255, 0) 80%),
        radial-gradient(114% 146% at 78% 120%, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 44%, transparent) 0%, transparent 74%),
        color-mix(in srgb, rgba(255, 255, 255, 0.03) 76%, var(--bubble-subbutton-glass-tint) 24%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.32),
        inset 0 -1px 0 rgba(255, 255, 255, 0.03),
        0 13px 22px -20px rgba(13, 22, 41, 0.22),
        0 8px 16px rgba(13, 22, 41, 0.14);
      border-color: color-mix(in srgb, rgba(255, 255, 255, 0.76) 68%, var(--bubble-subbutton-glass-sheen) 32%);
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
        radial-gradient(114% 132% at 22% 8%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.32) 44%, rgba(255, 255, 255, 0) 72%),
        conic-gradient(from 225deg at 18% 14%,
          rgba(255, 255, 255, 0.24) 0deg,
          rgba(255, 255, 255, 0.14) 110deg,
          rgba(255, 255, 255, 0) 200deg,
          rgba(255, 255, 255, 0.1) 320deg,
          rgba(255, 255, 255, 0.24) 360deg);
      opacity: 0.44;
      transform: translateY(-2%);
      filter: blur(0.35px);
    }

    .sub-button::after {
      inset: 1px;
      border-radius: 16px;
      background:
        linear-gradient(184deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.04) 58%, rgba(255, 255, 255, 0) 88%),
        linear-gradient(128deg,
          color-mix(in srgb, var(--bubble-subbutton-glass-tint) 46%, rgba(13, 22, 41, 0.12)),
          rgba(13, 22, 41, 0) 78%),
        radial-gradient(120% 128% at 74% 82%, color-mix(in srgb, var(--bubble-subbutton-glass-caustic) 30%, transparent), transparent 72%);
      opacity: 0.36;
      mix-blend-mode: soft-light;
    }

    .sub-button::after,
    .sub-button::before {
      will-change: opacity, transform;
    }

    .sub-button:hover::before {
      opacity: 0.6;
    }

    .sub-button:hover::after {
      opacity: 0.42;
    }

    /* 👇 Icona scalabile al contenitore */
    .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter:
        drop-shadow(0 5px 14px rgba(13, 22, 41, 0.15))
        drop-shadow(0 1px 0 rgba(255, 255, 255, 0.24));
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
