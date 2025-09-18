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
        radial-gradient(circle at 18% 18%, var(--bubble-subbutton-glass-sheen, rgba(255, 255, 255, 0.18)), rgba(255, 255, 255, 0) 62%),
        linear-gradient(140deg, var(--bubble-subbutton-glass-highlight, rgba(255, 255, 255, 0.09)), rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.016) 58%),
        linear-gradient(200deg, var(--bubble-subbutton-glass-soft, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.04)), rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.07) 82%),
        var(--bubble-subbutton-glass-base, var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.02)));
      background-blend-mode: screen, lighten, overlay, normal;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.14),
        inset 0 -1px 0 rgba(255, 255, 255, 0.032),
        0 10px 18px var(--bubble-subbutton-glass-shadow, rgba(13, 22, 41, 0.1));
      border: 1.5px solid var(--bubble-subbutton-border, rgba(255, 255, 255, 0.1));
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
      transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.18s ease,
        border-color 0.3s ease;
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
        inset 0 1px 0 rgba(255, 255, 255, 0.22),
        inset 0 -1px 0 rgba(255, 255, 255, 0.05),
        0 6px 14px var(--bubble-subbutton-glass-shadow-active, rgba(13, 22, 41, 0.14));
      border-color: var(
        --bubble-subbutton-border-active,
        var(--bubble-subbutton-border-hover, var(--bubble-subbutton-border, rgba(255, 255, 255, 0.18)))
      );
    }

    .sub-button:hover {
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(255, 255, 255, 0.06),
        0 16px 26px var(--bubble-subbutton-glass-shadow-hover, rgba(13, 22, 41, 0.13));
      border-color: var(
        --bubble-subbutton-border-hover,
        var(--bubble-subbutton-border, rgba(255, 255, 255, 0.14))
      );
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
      background: radial-gradient(circle at 20% -10%, var(--bubble-subbutton-glass-sheen, rgba(255, 255, 255, 0.32)), rgba(255, 255, 255, 0));
      opacity: 0.24;
      transform: translateY(-6%);
    }

    .sub-button::after {
      background: linear-gradient(205deg, var(--bubble-subbutton-glass-accent, rgba(255, 255, 255, 0.05)), rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0) 60%);
      opacity: 0.1;
      mix-blend-mode: soft-light;
    }

    .sub-button:hover::before {
      opacity: 0.5;
    }

    /* 👇 Icona scalabile al contenitore */
    .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter:
        drop-shadow(0 6px 12px rgba(var(--bubble-subbutton-glass-shadow-rgb, 13, 22, 41), 0.14));
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

          const styleVars = [`--bubble-subbutton-color:${color}`];

          let borderPalette = null;

          if (glass) {
            styleVars.push(`--bubble-subbutton-bg:${glass.surface}`);
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
            borderPalette = {
              base: glass.border,
              hover: glass.borderHover,
              active: glass.borderActive,
            };
          } else {
            styleVars.push(`--bubble-subbutton-bg:${bg}`);
            borderPalette = this._computeBorderColors(bg);
          }

          if (borderPalette) {
            styleVars.push(`--bubble-subbutton-border:${borderPalette.base}`);
            styleVars.push(`--bubble-subbutton-border-hover:${borderPalette.hover}`);
            styleVars.push(`--bubble-subbutton-border-active:${borderPalette.active}`);
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

    const { r, g, b } = rgb;
    const rgbString = `${r}, ${g}, ${b}`;
    const softened = this._mixWithWhite(rgb, 0.65);
    const softenedString = `${softened.r}, ${softened.g}, ${softened.b}`;

    const surface = `rgba(${softenedString}, 0.08)`;
    const base = `rgba(${softenedString}, 0.06)`;
    const highlight = `rgba(${softenedString}, 0.12)`;
    const soft = `rgba(${softenedString}, 0.07)`;
    const sheen = `rgba(${softenedString}, 0.26)`;
    const accent = `rgba(${softenedString}, 0.05)`;
    const border = `rgba(${softenedString}, 0.32)`;
    const borderHover = `rgba(${softenedString}, 0.44)`;
    const borderActive = `rgba(${softenedString}, 0.38)`;

    const shadowFactor = 0.2;
    const shadowR = Math.max(0, Math.round(r * shadowFactor));
    const shadowG = Math.max(0, Math.round(g * shadowFactor));
    const shadowB = Math.max(0, Math.round(b * shadowFactor));
    const shadowRgb = `${shadowR}, ${shadowG}, ${shadowB}`;

    const shadow = `rgba(${shadowRgb}, 0.1)`;
    const shadowHover = `rgba(${shadowRgb}, 0.14)`;
    const shadowActive = `rgba(${shadowRgb}, 0.12)`;

    return {
      rgb: rgbString,
      surface,
      base,
      highlight,
      soft,
      sheen,
      accent,
      shadow,
      shadowHover,
      shadowActive,
      shadowRgb,
      border,
      borderHover,
      borderActive,
    };
  }

  _computeBorderColors(color) {
    const rgb = this._colorToRgb(color);
    if (!rgb) return null;

    const softened = this._mixWithWhite(rgb, 0.65);
    const softenedString = `${softened.r}, ${softened.g}, ${softened.b}`;

    return {
      base: `rgba(${softenedString}, 0.32)`,
      hover: `rgba(${softenedString}, 0.44)`,
      active: `rgba(${softenedString}, 0.38)`,
    };
  }

  _mixWithWhite({ r, g, b }, weight = 0.5) {
    const ratio = Math.min(Math.max(weight, 0), 1);
    const mix = value => Math.round(value + (255 - value) * ratio);
    return {
      r: mix(r),
      g: mix(g),
      b: mix(b),
    };
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
