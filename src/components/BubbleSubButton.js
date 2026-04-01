import { LitElement, html, css } from 'lit';
import { createGestureHandler } from '../helpers/gesture-handler.js';
import { parseColor } from '../helpers/color-utils.js';
import { getIconAnimClass } from '../helpers/icon-mapping.js';

export class BubbleSubButton extends LitElement {
  static properties = {
    subbuttons: { type: Array },
    preset: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.subbuttons = [];
    this.preset = 'liquid-glass';
    // Gesture logic centralizzata in gesture-handler.js
    this._gesture = createGestureHandler({
      onTap:  (idx) => this._fireHassAction(idx, 'tap'),
      onHold: (idx) => this._fireHassAction(idx, 'hold'),
    });
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

      /* colore entità puro come base — no white blend che sbiadisce */
      background: var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.08));

      /* catch-light sull'edge superiore + ombra esterna + bordo colorato */
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.32),
        inset 0 -1px 0 rgba(0, 0, 0, 0.10),
        0 8px 28px var(--bubble-subbutton-glass-shadow, rgba(0, 0, 0, 0.20));
      border: 1.5px solid var(--bubble-subbutton-border, currentColor);

      /* saturate più aggressivo per estrarre i colori reali del backdrop */
      backdrop-filter: blur(20px) saturate(2.2) brightness(1.05);
      -webkit-backdrop-filter: blur(20px) saturate(2.2) brightness(1.05);
      transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.18s ease,
        border-color 0.3s ease, filter 0.35s ease;
      isolation: isolate;
      filter:
        saturate(var(--bubble-subbutton-saturation, 1))
        brightness(var(--bubble-subbutton-luminance, 1.05));
    }

    :host([preset='liquid-glass']) .sub-button:first-child {
      margin-top: 0;
    }

    :host([preset='liquid-glass']) .sub-button:last-child {
      margin-bottom: 0;
    }

    :host([preset='liquid-glass']) .sub-button:active {
      transform: scale(0.97);
      box-shadow: 0 4px 16px var(--bubble-subbutton-glass-shadow-active, rgba(13, 22, 41, 0.20));
      border-color: var(
        --bubble-subbutton-border-active,
        var(--bubble-subbutton-border, currentColor)
      );
    }

    :host([preset='liquid-glass']) .sub-button:hover {
      box-shadow: 0 12px 36px var(--bubble-subbutton-glass-shadow-hover, rgba(13, 22, 41, 0.18));
      border-color: var(
        --bubble-subbutton-border-hover,
        var(--bubble-subbutton-border, currentColor)
      );
    }

    :host([preset='liquid-glass']) .sub-button::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      /* overlay crea il riflesso glossy che interagisce con il colore sottostante
         (screen lo sbiadisce, overlay lo esalta) */
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.50) 0%,
        rgba(255, 255, 255, 0.14) 35%,
        transparent 55%
      );
      opacity: 0.75;
      mix-blend-mode: overlay;
      transition: opacity 0.35s ease;
    }

    :host([preset='liquid-glass']) .sub-button:hover::before {
      opacity: 1.0;
    }

    :host([preset='liquid-glass']) .sub-button::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: radial-gradient(
        ellipse 120% 75% at 50% 118%,
        var(--bubble-subbutton-glow, rgba(255, 255, 255, 0.12)),
        transparent 65%
      );
      mix-blend-mode: screen;
      opacity: 0.90;
      transition: opacity 0.35s ease;
    }

    :host([preset='liquid-glass']) .sub-button.is-active::after {
      opacity: 1.0;
    }

    :host([preset='liquid-glass']) .sub-button:hover::after {
      opacity: 0.90;
    }

    :host([preset='liquid-glass']) .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter:
        drop-shadow(0 6px 12px rgba(var(--bubble-subbutton-glass-shadow-rgb, 13, 22, 41), 0.14))
        brightness(var(--bubble-subbutton-icon-brightness, 1.1))
        saturate(var(--bubble-subbutton-icon-saturation, 1));
      transition: filter 0.35s ease, color 0.35s ease;
    }

    /* 👇 (Opzionale) Rende l'icona SVG responsiva */
    ha-icon {
      --mdc-icon-size: 100%;
    }

    ha-icon svg {
      width: 100%;
      height: 100%;
    }

    /* --- Keyframe animations (same as mushrooms) --- */
    @keyframes subbutton-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes subbutton-illuminate {
      0%, 100% { clip-path: inset(0 0 0 0); opacity: 1; }
      45%       { clip-path: inset(0 0 55% 0); opacity: 0.6; }
      55%       { clip-path: inset(0 0 0 0); opacity: 1; }
    }
    @keyframes subbutton-alarm {
      0%   { transform: rotate(0deg) translateY(0); }
      15%  { transform: rotate(18deg) translateY(-2px); }
      30%  { transform: rotate(-14deg) translateY(-1px); }
      45%  { transform: rotate(10deg) translateY(-1px); }
      60%  { transform: rotate(-6deg) translateY(0); }
      75%  { transform: rotate(3deg) translateY(0); }
      100% { transform: rotate(0deg) translateY(0); }
    }
    @keyframes subbutton-blink {
      0%, 49%  { opacity: 1; }
      50%, 100% { opacity: 0.15; }
    }
    @keyframes subbutton-beat {
      0%, 100% { transform: scale(1); }
      14%      { transform: scale(1.18); }
      28%      { transform: scale(1); }
      42%      { transform: scale(1.12); }
      70%      { transform: scale(1); }
    }
    @keyframes subbutton-scan {
      0%, 100% { transform: rotate(-18deg); }
      50%      { transform: rotate(18deg); }
    }
    @keyframes subbutton-shake {
      0%, 100% { transform: translateX(0); }
      20%      { transform: translateX(-3px) rotate(-1deg); }
      40%      { transform: translateX(3px) rotate(1deg); }
      60%      { transform: translateX(-2px); }
      80%      { transform: translateX(2px); }
    }
    @keyframes subbutton-bounce {
      0%, 100% { transform: translateY(0); }
      40%      { transform: translateY(-5px); }
      60%      { transform: translateY(-3px); }
    }

    :host([preset='liquid-glass']) .sub-button.is-active.anim-spin ha-icon {
      animation: subbutton-spin 1.4s linear infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-illuminate ha-icon {
      animation: subbutton-illuminate 2.5s ease-in-out infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-alarm ha-icon {
      animation: subbutton-alarm 0.9s ease infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-blink ha-icon {
      animation: subbutton-blink 1.1s step-end infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-beat ha-icon {
      animation: subbutton-beat 1.3s ease-out infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-scan ha-icon {
      transform-origin: 90% 80%;
      animation: subbutton-scan 5s ease-in-out infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-shake ha-icon {
      animation: subbutton-shake 400ms ease-in-out infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-bounce ha-icon {
      animation: subbutton-bounce 0.7s cubic-bezier(0.30, 2.40, 0.85, 2.50) infinite;
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

          const iconTone = this._computeIconTone(color, btn.active);
          if (iconTone) {
            styleVars.push(`--bubble-subbutton-color:${iconTone}`);
          }

          if (glass) {
            styleVars.push(`--bubble-subbutton-bg:${glass.surface}`);
            styleVars.push(`--bubble-subbutton-glow:${glass.glow}`);
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

          if (btn.active) {
            styleVars.push(`--bubble-subbutton-saturation:1.15`);
            styleVars.push(`--bubble-subbutton-luminance:1.04`);
            styleVars.push(`--bubble-subbutton-icon-brightness:1.25`);
            styleVars.push(`--bubble-subbutton-icon-saturation:1.15`);
          }

          const styleAttr = styleVars.join(';');
          const classes = ['sub-button'];
          if (btn.active) classes.push('is-active');
          const animClass = btn.active ? this._getAnimClass(btn.icon) : '';
          if (animClass) classes.push(animClass);

          return html`
            <div
              class="${classes.join(' ')}"
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
  
  _getAnimClass(icon) {
    return getIconAnimClass(icon);
  }

  _onDown(idx) { this._gesture.onDown(idx); }
  _onUp(idx)   { this._gesture.onUp(idx); }
  _clearHoldTimer() { this._gesture.clearTimer(); }

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

    const intensified = isActive ? this._boostColorIntensity(rgb, 0.42) : rgb;
    const { r, g, b } = intensified;
    const rgbString = `${r}, ${g}, ${b}`;
    const softened = this._mixWithWhite(intensified, isActive ? 0.14 : 0.28);
    const softenedString = `${softened.r}, ${softened.g}, ${softened.b}`;

    const alphas = isActive
      ? {
          surface: 0.42,
          base: 0.30,
          highlight: 0.38,
          soft: 0.26,
          sheen: 0.48,
          accent: 0.20,
          glow: 0.55,
          border: 0.42,
          borderHover: 0.52,
          borderActive: 0.48,
          shadow: 0.2,
          shadowHover: 0.28,
          shadowActive: 0.24,
          rim: 0.72,
          rimSoft: 0.34,
          rimShadow: 0.4,
        }
      : {
          surface: 0.22,
          base: 0.16,
          highlight: 0.24,
          soft: 0.14,
          sheen: 0.30,
          accent: 0.10,
          glow: 0.38,
          border: 0.18,
          borderHover: 0.26,
          borderActive: 0.22,
          shadow: 0.08,
          shadowHover: 0.12,
          shadowActive: 0.1,
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

    const intensified = isActive ? this._boostColorIntensity(rgb, 0.4) : rgb;
    const softened = this._mixWithWhite(intensified, isActive ? 0.34 : 0.58);
    const softenedString = `${softened.r}, ${softened.g}, ${softened.b}`;

    const shadowFactor = 0.2;
    const shadowR = Math.max(0, Math.round(intensified.r * shadowFactor));
    const shadowG = Math.max(0, Math.round(intensified.g * shadowFactor));
    const shadowB = Math.max(0, Math.round(intensified.b * shadowFactor));
    const shadowRgb = `${shadowR}, ${shadowG}, ${shadowB}`;

    return {
      glow: `rgba(${softenedString}, ${isActive ? 0.55 : 0.3})`,
      rim: `rgba(${softenedString}, ${isActive ? 0.74 : 0.48})`,
      rimSoft: `rgba(${softenedString}, ${isActive ? 0.34 : 0.2})`,
      rimShadow: `rgba(${shadowRgb}, ${isActive ? 0.42 : 0.26})`,
    };
  }

  _computeIconTone(color, isActive = false) {
    if (!color) return color;

    const rgb = this._colorToRgb(color);
    if (!rgb) return color;

    if (!isActive) {
      return this._rgbToCss({ r: rgb.r, g: rgb.g, b: rgb.b }, rgb.a);
    }

    const intensified = this._boostColorIntensity(rgb, 0.35);
    const luminous = this._mixWithWhite(intensified, 0.2);
    return this._rgbToCss(luminous, rgb.a);
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

  _rgbToCss({ r, g, b }, alpha = 1) {
    const clampedAlpha = typeof alpha === 'number'
      ? Math.min(Math.max(Number(alpha.toFixed(3)), 0), 1)
      : 1;

    if (clampedAlpha < 1) {
      return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  _colorToRgb(color) {
    return parseColor(color);
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
