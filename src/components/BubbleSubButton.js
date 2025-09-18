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
        radial-gradient(130% 160% at 18% 12%, var(--bubble-subbutton-glass-sheen, rgba(255, 255, 255, 0.45)), rgba(255, 255, 255, 0) 72%),
        radial-gradient(120% 160% at 84% -10%, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 74%),
        linear-gradient(152deg, var(--bubble-subbutton-glass-highlight, rgba(255, 255, 255, 0.32)), rgba(255, 255, 255, 0.1) 44%, rgba(255, 255, 255, 0) 78%),
        linear-gradient(205deg, var(--bubble-subbutton-glass-soft, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.18)), rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.08) 52%, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.28) 100%),
        var(--bubble-subbutton-glass-base, var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.08)));
      background-blend-mode: screen, screen, soft-light, overlay, normal;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.42),
        inset 0 -1px 0 rgba(255, 255, 255, 0.08),
        0 0 0 1px var(--bubble-subbutton-glass-halo, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.16)),
        0 12px 24px var(--bubble-subbutton-glass-shadow, rgba(13, 22, 41, 0.22));
      border: 1px solid rgba(255, 255, 255, 0.22);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.18s ease, filter 0.35s ease;
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
        inset 0 1px 0 rgba(255, 255, 255, 0.32),
        inset 0 -1px 0 rgba(255, 255, 255, 0.06),
        0 0 0 1px var(--bubble-subbutton-glass-halo-active, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.16)),
        0 10px 20px var(--bubble-subbutton-glass-shadow-active, rgba(13, 22, 41, 0.22));
    }

    .sub-button:hover {
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.55),
        inset 0 -1px 0 rgba(255, 255, 255, 0.12),
        0 0 0 1px var(--bubble-subbutton-glass-halo-hover, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.2)),
        0 16px 30px var(--bubble-subbutton-glass-shadow-hover, rgba(13, 22, 41, 0.28));
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
      background: radial-gradient(160% 200% at 18% 8%, var(--bubble-subbutton-glass-sheen, rgba(255, 255, 255, 0.52)) 0%, rgba(255, 255, 255, 0.12) 42%, rgba(255, 255, 255, 0) 70%);
      opacity: 0.58;
      transform: translateY(-6%);
      filter: blur(0.3px);
    }

    .sub-button::after {
      background:
        radial-gradient(140% 160% at 88% 92%, var(--bubble-subbutton-glass-glow, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.18)) 0%, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0) 78%),
        linear-gradient(210deg, var(--bubble-subbutton-glass-accent, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.18)), rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0) 64%);
      opacity: 0.42;
      mix-blend-mode: screen;
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
        drop-shadow(0 6px 12px rgba(var(--bubble-subbutton-glass-shadow-rgb, 13, 22, 41), 0.32))
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
          const bg = btn.active ? btn.colorOn : btn.colorOff;
          const color = btn.active ? btn.iconOn : btn.iconOff;
          const glass = this._computeGlassColors(bg);

          const styleVars = [
            `--bubble-subbutton-bg:${bg}`,
            `--bubble-subbutton-color:${color}`,
          ];

          if (glass) {
            styleVars.push(`--bubble-subbutton-glass-base:${glass.base}`);
            styleVars.push(`--bubble-subbutton-glass-highlight:${glass.highlight}`);
            styleVars.push(`--bubble-subbutton-glass-soft:${glass.soft}`);
            styleVars.push(`--bubble-subbutton-glass-sheen:${glass.sheen}`);
            styleVars.push(`--bubble-subbutton-glass-accent:${glass.accent}`);
            styleVars.push(`--bubble-subbutton-tint:${glass.rgb}`);
            styleVars.push(`--bubble-subbutton-glass-shadow:${glass.shadow}`);
            styleVars.push(`--bubble-subbutton-glass-shadow-hover:${glass.shadowHover}`);
            styleVars.push(`--bubble-subbutton-glass-shadow-active:${glass.shadowActive}`);
            styleVars.push(`--bubble-subbutton-glass-shadow-rgb:${glass.shadowRgb}`);
            styleVars.push(`--bubble-subbutton-glass-glow:${glass.glow}`);
            styleVars.push(`--bubble-subbutton-glass-halo:${glass.halo}`);
            styleVars.push(`--bubble-subbutton-glass-halo-hover:${glass.haloHover}`);
            styleVars.push(`--bubble-subbutton-glass-halo-active:${glass.haloActive}`);
          }

          const styleAttr = styleVars.join(';');

          return html`
            <div
              class="sub-button"
              style="${styleAttr}"
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

  _computeGlassColors(color) {
    const rgb = this._colorToRgb(color);
    if (!rgb) return null;

    const rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    const alpha = typeof rgb.a === 'number' ? rgb.a : 1;
    const white = { r: 255, g: 255, b: 255 };
    const depth = { r: 18, g: 26, b: 44 };

    const base = this._formatRgba(this._mixRgb(rgb, white, 0.35), 0.08 + alpha * 0.08);
    const highlight = this._formatRgba(this._mixRgb(rgb, white, 0.9), 0.42);
    const soft = this._formatRgba(this._mixRgb(rgb, white, 0.68), 0.22);
    const sheen = this._formatRgba(this._mixRgb(rgb, white, 0.94), 0.52);
    const accent = this._formatRgba(this._mixRgb(rgb, white, 0.52), 0.2);
    const glow = this._formatRgba(this._mixRgb(rgb, white, 0.42), 0.18);
    const halo = this._formatRgba(this._mixRgb(rgb, white, 0.32), 0.16 + alpha * 0.08);
    const haloHover = this._formatRgba(this._mixRgb(rgb, white, 0.32), 0.22 + alpha * 0.1);
    const haloActive = this._formatRgba(this._mixRgb(rgb, white, 0.32), 0.14 + alpha * 0.06);

    const shadowMix = this._mixRgb(rgb, depth, 0.64);
    const shadowRgb = `${shadowMix.r}, ${shadowMix.g}, ${shadowMix.b}`;

    const shadow = this._formatRgba(shadowMix, 0.26);
    const shadowHover = this._formatRgba(shadowMix, 0.32);
    const shadowActive = this._formatRgba(shadowMix, 0.22);

    return {
      rgb: rgbString,
      base,
      highlight,
      soft,
      sheen,
      accent,
      glow,
      halo,
      haloHover,
      haloActive,
      shadow,
      shadowHover,
      shadowActive,
      shadowRgb,
    };
  }

  _mixRgb(from, to, amount) {
    const t = Math.max(0, Math.min(1, amount));
    const clamp = (value) => Math.max(0, Math.min(255, value));
    return {
      r: Math.round(clamp(from.r + (to.r - from.r) * t)),
      g: Math.round(clamp(from.g + (to.g - from.g) * t)),
      b: Math.round(clamp(from.b + (to.b - from.b) * t)),
    };
  }

  _formatRgba(rgb, alpha) {
    const a = Math.max(0, Math.min(1, alpha));
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
  }

  _colorToRgb(color) {
    if (!color || typeof color !== 'string' || color.startsWith('var(')) {
      return null;
    }

    if (typeof document === 'undefined') {
      return null;
    }

    if (!BubbleSubButton._colorCanvas) {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      BubbleSubButton._colorCanvas = canvas;
      BubbleSubButton._colorCtx = canvas.getContext('2d', { willReadFrequently: true }) || canvas.getContext('2d');
    }

    const ctx = BubbleSubButton._colorCtx;
    if (!ctx) {
      return null;
    }

    try {
      ctx.fillStyle = '#000';
      ctx.fillStyle = color;
    } catch (err) {
      return null;
    }

    const normalized = ctx.fillStyle;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = normalized;
    ctx.fillRect(0, 0, 1, 1);

    const data = ctx.getImageData(0, 0, 1, 1).data;
    return {
      r: data[0],
      g: data[1],
      b: data[2],
      a: data[3] / 255,
    };
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

BubbleSubButton._colorCanvas = null;
BubbleSubButton._colorCtx = null;

customElements.define('bubble-subbutton', BubbleSubButton);
