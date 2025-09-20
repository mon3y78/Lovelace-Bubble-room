import { LitElement, html, css } from 'lit';

export class BubbleSubButton extends LitElement {
  static properties = {
    subbuttons: { type: Array },
    preset: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.subbuttons = [];
    this.preset = 'liquid-glass';
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

    :host([preset='standard']) .sub-button {
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

    :host([preset='standard']) .sub-button:first-child {
      margin-top: 0;
    }

    :host([preset='standard']) .sub-button:last-child {
      margin-bottom: 0;
    }

    :host([preset='standard']) .sub-button:active {
      transform: scale(0.97);
    }

    :host([preset='standard']) .sub-button ha-icon {
      width: 80%;
      height: 80%;
    }

    :host([preset='liquid-glass']) .sub-button {
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
        radial-gradient(
          140% 120% at 50% -20%,
          var(--bubble-subbutton-glass-glow, rgba(255, 255, 255, 0.18)),
          rgba(255, 255, 255, 0) 68%
        ),
        linear-gradient(
          180deg,
          var(--bubble-subbutton-glass-highlight, rgba(255, 255, 255, 0.08)) 0%,
          rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.015) 52%,
          rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.08) 100%
        ),
        linear-gradient(
          150deg,
          var(--bubble-subbutton-glass-soft, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.028)) 0%,
          rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0) 58%
        ),
        var(--bubble-subbutton-glass-base, var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.02)));
      background-blend-mode: screen, normal, screen, normal;
      box-shadow:
        inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.38),
        inset -0.5px -0.5px 1px rgba(255, 255, 255, 0.06),
        0 18px 32px var(--bubble-subbutton-glass-shadow, rgba(13, 22, 41, 0.12));
      border: 2px solid var(--bubble-subbutton-border, currentColor);
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
      transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.18s ease,
        border-color 0.3s ease, filter 0.35s ease;
      isolation: isolate;
    }

    :host([preset='liquid-glass']) .sub-button:first-child {
      margin-top: 0;
    }

    :host([preset='liquid-glass']) .sub-button:last-child {
      margin-bottom: 0;
    }

    :host([preset='liquid-glass']) .sub-button:active {
      transform: scale(0.97);
      box-shadow:
        inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.48),
        inset -0.5px -0.5px 1.1px rgba(255, 255, 255, 0.12),
        0 14px 26px var(--bubble-subbutton-glass-shadow-active, rgba(13, 22, 41, 0.17));
      border-color: var(
        --bubble-subbutton-border-active,
        var(--bubble-subbutton-border-hover, var(--bubble-subbutton-border, currentColor))
      );
    }

    :host([preset='liquid-glass']) .sub-button:hover {
      box-shadow:
        inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.42),
        inset -0.5px -0.5px 1px rgba(255, 255, 255, 0.1),
        0 22px 38px var(--bubble-subbutton-glass-shadow-hover, rgba(13, 22, 41, 0.14));
      border-color: var(
        --bubble-subbutton-border-hover,
        var(--bubble-subbutton-border, currentColor)
      );
    }

    :host([preset='liquid-glass']) .sub-button::before,
    :host([preset='liquid-glass']) .sub-button::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }

    :host([preset='liquid-glass']) .sub-button::before {
      background:
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.42) 0%,
          rgba(255, 255, 255, 0.18) 38%,
          rgba(255, 255, 255, 0) 64%
        ),
        radial-gradient(
          140% 120% at 50% -20%,
          var(--bubble-subbutton-glass-sheen, rgba(255, 255, 255, 0.16)),
          rgba(255, 255, 255, 0) 70%
        );
      opacity: 0.26;
      mix-blend-mode: screen;
      transform: translateY(-8%);
    }

    :host([preset='liquid-glass']) .sub-button::after {
      border-radius: inherit;
      border: 1px solid var(--bubble-subbutton-glass-rim, rgba(255, 255, 255, 0.32));
      box-shadow:
        inset 0 0 0 1px var(--bubble-subbutton-glass-rim-soft, rgba(255, 255, 255, 0.12)),
        inset 0 -18px 32px -24px var(--bubble-subbutton-glass-rim-shadow, rgba(13, 22, 41, 0.24));
      opacity: 0.38;
      mix-blend-mode: screen;
    }

    :host([preset='liquid-glass']) .sub-button:hover::before {
      opacity: 0.62;
    }

    :host([preset='liquid-glass']) .sub-button:hover::after {
      opacity: 0.66;
    }

    :host([preset='liquid-glass']) .sub-button:active::after {
      opacity: 0.78;
    }

    :host([preset='liquid-glass']) .sub-button ha-icon {
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
    return this.preset === 'standard'
      ? this._renderStandard()
      : this._renderLiquidGlass();
  }

  _renderStandard() {
    return html`
      <div class="container">
        ${this.subbuttons.map((btn, idx) => {
          const bg = btn.active ? btn.colorOn : btn.colorOff;
          const color = btn.active ? btn.iconOn : btn.iconOff;
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

  _renderLiquidGlass() {
    return html`
      <div class="container">
        ${this.subbuttons.map((btn, idx) => {
          const bg = btn.active ? btn.colorOn : btn.colorOff;
          const color = btn.active ? btn.iconOn : btn.iconOff;
          const glass = this._computeGlassColors(bg, btn.active);

          const styleVars = [];

          if (color) {
            styleVars.push(`--bubble-subbutton-color:${color}`);
          }

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
          } else if (bg) {
            const brightened = btn.active ? this._lightenColor(bg, 0.35) : null;
            styleVars.push(`--bubble-subbutton-bg:${brightened || bg}`);
          }

          const borderPalette = this._computeBorderColors(color, btn.active);
          if (borderPalette) {
            styleVars.push(`--bubble-subbutton-border:${borderPalette.base}`);
            styleVars.push(`--bubble-subbutton-border-hover:${borderPalette.hover}`);
            styleVars.push(`--bubble-subbutton-border-active:${borderPalette.active}`);
          } else if (color) {
            styleVars.push(`--bubble-subbutton-border:${color}`);
            styleVars.push(`--bubble-subbutton-border-hover:${color}`);
            styleVars.push(`--bubble-subbutton-border-active:${color}`);
          }

          const rimPalette = this._computeGlowPalette(color, btn.active);
          if (rimPalette) {
            styleVars.push(`--bubble-subbutton-glass-glow:${rimPalette.glow}`);
            styleVars.push(`--bubble-subbutton-glass-rim:${rimPalette.rim}`);
            styleVars.push(`--bubble-subbutton-glass-rim-soft:${rimPalette.rimSoft}`);
            styleVars.push(`--bubble-subbutton-glass-rim-shadow:${rimPalette.rimShadow}`);
          } else if (color) {
            styleVars.push(`--bubble-subbutton-glass-glow:${color}`);
            styleVars.push(`--bubble-subbutton-glass-rim:${color}`);
            styleVars.push(`--bubble-subbutton-glass-rim-soft:${color}`);
            styleVars.push(`--bubble-subbutton-glass-rim-shadow:${color}`);
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

  _lightenColor(color, weight = 0.3) {
    const rgb = this._colorToRgb(color);
    if (!rgb) return null;

    const mixRatio = Math.min(Math.max(weight, 0), 1);
    const mixed = this._mixWithWhite(rgb, mixRatio);
    const alpha = typeof rgb.a === 'number' ? Math.min(Math.max(Number(rgb.a.toFixed(3)), 0), 1) : 1;

    if (alpha < 1) {
      return `rgba(${mixed.r}, ${mixed.g}, ${mixed.b}, ${alpha})`;
    }

    return `rgb(${mixed.r}, ${mixed.g}, ${mixed.b})`;
  }

  _computeGlassColors(color, isActive = false) {
    const rgb = this._colorToRgb(color);
    if (!rgb) return null;

    const intensified = isActive ? this._boostColorIntensity(rgb, 0.28) : rgb;
    const { r, g, b } = intensified;
    const rgbString = `${r}, ${g}, ${b}`;
    const softened = this._mixWithWhite(intensified, isActive ? 0.48 : 0.68);
    const softenedString = `${softened.r}, ${softened.g}, ${softened.b}`;

    const alphas = isActive
      ? {
          surface: 0.065,
          base: 0.042,
          highlight: 0.11,
          soft: 0.055,
          sheen: 0.22,
          accent: 0.05,
          border: 0.26,
          borderHover: 0.36,
          borderActive: 0.32,
          shadow: 0.14,
          shadowHover: 0.2,
          shadowActive: 0.17,
          glow: 0.34,
          rim: 0.56,
          rimSoft: 0.26,
          rimShadow: 0.34,
        }
      : {
          surface: 0.032,
          base: 0.022,
          highlight: 0.06,
          soft: 0.028,
          sheen: 0.12,
          accent: 0.02,
          border: 0.18,
          borderHover: 0.26,
          borderActive: 0.22,
          shadow: 0.08,
          shadowHover: 0.12,
          shadowActive: 0.1,
          glow: 0.2,
          rim: 0.38,
          rimSoft: 0.14,
          rimShadow: 0.26,
        };

    const surface = `rgba(${softenedString}, ${alphas.surface})`;
    const base = `rgba(${softenedString}, ${alphas.base})`;
    const highlight = `rgba(${softenedString}, ${alphas.highlight})`;
    const soft = `rgba(${softenedString}, ${alphas.soft})`;
    const sheen = `rgba(${softenedString}, ${alphas.sheen})`;
    const accent = `rgba(${softenedString}, ${alphas.accent})`;
    const border = `rgba(${softenedString}, ${alphas.border})`;
    const borderHover = `rgba(${softenedString}, ${alphas.borderHover})`;
    const borderActive = `rgba(${softenedString}, ${alphas.borderActive})`;

    const shadowFactor = 0.2;
    const shadowR = Math.max(0, Math.round(r * shadowFactor));
    const shadowG = Math.max(0, Math.round(g * shadowFactor));
    const shadowB = Math.max(0, Math.round(b * shadowFactor));
    const shadowRgb = `${shadowR}, ${shadowG}, ${shadowB}`;

    const shadow = `rgba(${shadowRgb}, ${alphas.shadow})`;
    const shadowHover = `rgba(${shadowRgb}, ${alphas.shadowHover})`;
    const shadowActive = `rgba(${shadowRgb}, ${alphas.shadowActive})`;

    const glow = `rgba(${softenedString}, ${alphas.glow})`;
    const rim = `rgba(${softenedString}, ${alphas.rim})`;
    const rimSoft = `rgba(${softenedString}, ${alphas.rimSoft})`;
    const rimShadow = `rgba(${shadowRgb}, ${alphas.rimShadow})`;

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
      glow,
      rim,
      rimSoft,
      rimShadow,
    };
  }

  _computeBorderColors(color, isActive = false) {
    const rgb = this._colorToRgb(color);
    if (!rgb) return null;

    const baseAlpha = isActive ? 0.78 : 0.62;
    const hoverAlpha = isActive ? 0.88 : 0.78;
    const activeAlpha = isActive ? 0.82 : 0.7;

    const base = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha})`;
    const hover = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${hoverAlpha})`;
    const active = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${activeAlpha})`;

    return { base, hover, active };
  }

  _computeGlowPalette(color, isActive = false) {
    const rgb = this._colorToRgb(color);
    if (!rgb) return null;

    const intensified = isActive ? this._boostColorIntensity(rgb, 0.28) : rgb;
    const softened = this._mixWithWhite(intensified, isActive ? 0.48 : 0.58);
    const softenedString = `${softened.r}, ${softened.g}, ${softened.b}`;

    const shadowFactor = 0.2;
    const shadowR = Math.max(0, Math.round(intensified.r * shadowFactor));
    const shadowG = Math.max(0, Math.round(intensified.g * shadowFactor));
    const shadowB = Math.max(0, Math.round(intensified.b * shadowFactor));
    const shadowRgb = `${shadowR}, ${shadowG}, ${shadowB}`;

    return {
      glow: `rgba(${softenedString}, ${isActive ? 0.4 : 0.3})`,
      rim: `rgba(${softenedString}, ${isActive ? 0.58 : 0.48})`,
      rimSoft: `rgba(${softenedString}, ${isActive ? 0.26 : 0.2})`,
      rimShadow: `rgba(${shadowRgb}, ${isActive ? 0.34 : 0.26})`,
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

  _boostColorIntensity({ r, g, b, a }, amount = 0.18) {
    const factor = 1 + Math.max(amount, 0);
    const boost = value => Math.min(255, Math.round(value * factor));
    const boosted = {
      r: boost(r),
      g: boost(g),
      b: boost(b),
    };

    if (typeof a === 'number') {
      boosted.a = a;
    }

    return boosted;
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
