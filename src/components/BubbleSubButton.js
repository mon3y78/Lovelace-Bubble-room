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
      --bubble-subbutton-glass-tint: color-mix(in srgb, var(--bubble-subbutton-base) 30%, transparent);
      --bubble-subbutton-glass-highlight: color-mix(in srgb, var(--bubble-subbutton-base) 22%, rgba(255, 255, 255, 0.72));
      --bubble-subbutton-glass-caustic: color-mix(in srgb, var(--bubble-subbutton-base) 18%, rgba(255, 255, 255, 0.92));
      --bubble-subbutton-glass-ambient: color-mix(in srgb, var(--bubble-subbutton-glass-tint) 55%, rgba(15, 23, 42, 0.08));
      color: var(--bubble-subbutton-color, #fff);
      background:
        radial-gradient(130% 140% at 15% 12%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.18) 58%, rgba(255, 255, 255, 0) 78%),
        radial-gradient(165% 150% at 74% 115%, color-mix(in srgb, var(--bubble-subbutton-glass-tint) 68%, rgba(15, 23, 42, 0.35)), rgba(15, 23, 42, 0) 60%),
        linear-gradient(155deg,
          color-mix(in srgb, var(--bubble-subbutton-glass-highlight) 68%, rgba(255, 255, 255, 0.15)),
          color-mix(in srgb, var(--bubble-subbutton-glass-tint) 50%, rgba(15, 23, 42, 0.18))),
        linear-gradient(12deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0) 38%),
        var(--bubble-subbutton-glass-ambient);
      background-blend-mode: screen, lighten, soft-light, screen, normal;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.5),
        inset 0 -1px 0 rgba(255, 255, 255, 0.08),
        0 18px 32px -18px rgba(15, 23, 42, 0.38),
        0 8px 20px rgba(15, 23, 42, 0.24);
      border: 1px solid color-mix(in srgb, var(--bubble-subbutton-glass-highlight) 45%, rgba(255, 255, 255, 0.45));
      backdrop-filter: blur(24px) saturate(150%);
      -webkit-backdrop-filter: blur(24px) saturate(150%);
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
        inset 0 1px 0 rgba(255, 255, 255, 0.68),
        inset 0 -1px 0 rgba(255, 255, 255, 0.15),
        0 22px 36px -18px rgba(15, 23, 42, 0.42),
        0 12px 24px rgba(15, 23, 42, 0.28);
      border-color: color-mix(in srgb, var(--bubble-subbutton-glass-highlight) 52%, rgba(255, 255, 255, 0.6));
    }

    .sub-button:active {
      transform: scale(0.97);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.36),
        inset 0 -1px 0 rgba(255, 255, 255, 0.05),
        0 12px 22px -14px rgba(15, 23, 42, 0.46),
        0 7px 18px rgba(15, 23, 42, 0.26);
      border-color: rgba(255, 255, 255, 0.4);
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
        radial-gradient(120% 120% at 20% 6%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.22) 46%, rgba(255, 255, 255, 0) 72%),
        conic-gradient(from 220deg at 18% 12%,
          rgba(255, 255, 255, 0.28) 0deg,
          rgba(255, 255, 255, 0.08) 120deg,
          rgba(255, 255, 255, 0) 190deg,
          rgba(255, 255, 255, 0.18) 320deg,
          rgba(255, 255, 255, 0.28) 360deg);
      opacity: 0.75;
      transform: translateY(-6%);
      filter: blur(0.4px);
    }

    .sub-button::after {
      inset: 1px;
      border-radius: 16px;
      background:
        linear-gradient(182deg, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0.08) 45%, rgba(255, 255, 255, 0) 78%),
        linear-gradient(128deg,
          color-mix(in srgb, var(--bubble-subbutton-glass-tint) 65%, rgba(13, 22, 41, 0.22)),
          rgba(13, 22, 41, 0) 74%),
        radial-gradient(120% 120% at 75% 80%, color-mix(in srgb, var(--bubble-subbutton-glass-caustic) 35%, transparent), transparent 65%);
      opacity: 0.58;
      mix-blend-mode: soft-light;
    }

    .sub-button::after,
    .sub-button::before {
      will-change: opacity, transform;
    }

    .sub-button:hover::before {
      opacity: 0.96;
    }

    .sub-button:hover::after {
      opacity: 0.68;
    }

    /* 👇 Icona scalabile al contenitore */
    .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter:
        drop-shadow(0 9px 18px rgba(13, 22, 41, 0.4))
        drop-shadow(0 1px 0 rgba(255, 255, 255, 0.52));
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