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
        radial-gradient(
          140% 120% at 50% -20%,
          var(--bubble-subbutton-glass-glow, rgba(255, 255, 255, 0.25)),
          rgba(255, 255, 255, 0) 68%
        ),
        linear-gradient(
          180deg,
          var(--bubble-subbutton-glass-highlight, rgba(255, 255, 255, 0.12)) 0%,
          rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.02) 52%,
          rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.12) 100%
        ),
        linear-gradient(
          150deg,
          var(--bubble-subbutton-glass-soft, rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0.045)) 0%,
          rgba(var(--bubble-subbutton-tint, 255, 255, 255), 0) 58%
        ),
        var(--bubble-subbutton-glass-base, var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.04)));
      background-blend-mode: screen, normal, screen, normal;
      box-shadow:
        inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.42),
        inset -0.5px -0.5px 1px rgba(255, 255, 255, 0.08),
        0 18px 32px var(--bubble-subbutton-glass-shadow, rgba(13, 22, 41, 0.14));
      border: 1.4px solid var(--bubble-subbutton-border, rgba(255, 255, 255, 0.16));
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
      transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.18s ease,
        border-color 0.3s ease, filter 0.35s ease;
      isolation: isolate;
    }

    .sub-button:first-child {
      margin-top: 0;
    }
    
    .sub-button:last-child {
      margin-bottom: 0;
    }
    
    .sub-button:active {
      transform: scale(0.97);
      box-shadow:
        inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.48),
        inset -0.5px -0.5px 1.1px rgba(255, 255, 255, 0.12),
        0 14px 26px var(--bubble-subbutton-glass-shadow-active, rgba(13, 22, 41, 0.17));
      border-color: var(
        --bubble-subbutton-border-active,
        var(--bubble-subbutton-border-hover, var(--bubble-subbutton-border, rgba(255, 255, 255, 0.22)))
      );
    }

    .sub-button:hover {
      box-shadow:
        inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.48),
        inset -0.5px -0.5px 1px rgba(255, 255, 255, 0.12),
        0 22px 38px var(--bubble-subbutton-glass-shadow-hover, rgba(13, 22, 41, 0.16));
      border-color: var(
        --bubble-subbutton-border-hover,
        var(--bubble-subbutton-border, rgba(255, 255, 255, 0.18))
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
      background:
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.6) 0%,
          rgba(255, 255, 255, 0.22) 38%,
          rgba(255, 255, 255, 0) 64%
        ),
        radial-gradient(
          140% 120% at 50% -20%,
          var(--bubble-subbutton-glass-sheen, rgba(255, 255, 255, 0.22)),
          rgba(255, 255, 255, 0) 70%
        );
      opacity: 0.32;
      mix-blend-mode: screen;
      transform: translateY(-8%);
    }

    .sub-button::after {
      border-radius: inherit;
      border: 1px solid var(--bubble-subbutton-glass-rim, rgba(255, 255, 255, 0.42));
      box-shadow:
        inset 0 0 0 1px var(--bubble-subbutton-glass-rim-soft, rgba(255, 255, 255, 0.16)),
        inset 0 -18px 32px -24px var(--bubble-subbutton-glass-rim-shadow, rgba(13, 22, 41, 0.28));
      opacity: 0.42;
      mix-blend-mode: screen;
    }

    .sub-button:hover::before {
      opacity: 0.62;
    }

    .sub-button:hover::after {
      opacity: 0.66;
    }

    .sub-button:active::after {
      opacity: 0.78;
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
          let rimPalette = null;

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
            rimPalette = {
              glow: glass.glow,
              rim: glass.rim,
              rimSoft: glass.rimSoft,
              rimShadow: glass.rimShadow,
            };
          } else {
            styleVars.push(`--bubble-subbutton-bg:${bg}`);
            borderPalette = this._computeBorderColors(bg);
            rimPalette = this._computeGlowPalette(bg);
          }

          if (borderPalette) {
            styleVars.push(`--bubble-subbutton-border:${borderPalette.base}`);
            styleVars.push(`--bubble-subbutton-border-hover:${borderPalette.hover}`);
            styleVars.push(`--bubble-subbutton-border-active:${borderPalette.active}`);
          }

          if (rimPalette) {
            styleVars.push(`--bubble-subbutton-glass-glow:${rimPalette.glow}`);
            styleVars.push(`--bubble-subbutton-glass-rim:${rimPalette.rim}`);
            styleVars.push(`--bubble-subbutton-glass-rim-soft:${rimPalette.rimSoft}`);
            styleVars.push(`--bubble-subbutton-glass-rim-shadow:${rimPalette.rimShadow}`);
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

    const surface = `rgba(${softenedString}, 0.05)`;
    const base = `rgba(${softenedString}, 0.035)`;
    const highlight = `rgba(${softenedString}, 0.09)`;
    const soft = `rgba(${softenedString}, 0.045)`;
    const sheen = `rgba(${softenedString}, 0.18)`;
    const accent = `rgba(${softenedString}, 0.035)`;
    const border = `rgba(${softenedString}, 0.24)`;
    const borderHover = `rgba(${softenedString}, 0.34)`;
    const borderActive = `rgba(${softenedString}, 0.28)`;

    const shadowFactor = 0.2;
    const shadowR = Math.max(0, Math.round(r * shadowFactor));
    const shadowG = Math.max(0, Math.round(g * shadowFactor));
    const shadowB = Math.max(0, Math.round(b * shadowFactor));
    const shadowRgb = `${shadowR}, ${shadowG}, ${shadowB}`;

    const shadow = `rgba(${shadowRgb}, 0.1)`;
    const shadowHover = `rgba(${shadowRgb}, 0.14)`;
    const shadowActive = `rgba(${shadowRgb}, 0.12)`;

    const glow = `rgba(${softenedString}, 0.26)`;
    const rim = `rgba(${softenedString}, 0.48)`;
    const rimSoft = `rgba(${softenedString}, 0.18)`;
    const rimShadow = `rgba(${shadowRgb}, 0.32)`;

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

  _computeBorderColors(color) {
    const rgb = this._colorToRgb(color);
    if (!rgb) return null;

    const softened = this._mixWithWhite(rgb, 0.65);
    const softenedString = `${softened.r}, ${softened.g}, ${softened.b}`;

    return {
      base: `rgba(${softenedString}, 0.24)`,
      hover: `rgba(${softenedString}, 0.34)`,
      active: `rgba(${softenedString}, 0.28)`,
    };
  }

  _computeGlowPalette(color) {
    const rgb = this._colorToRgb(color);
    if (!rgb) return null;

    const softened = this._mixWithWhite(rgb, 0.62);
    const softenedString = `${softened.r}, ${softened.g}, ${softened.b}`;

    const shadowFactor = 0.22;
    const shadowR = Math.max(0, Math.round(rgb.r * shadowFactor));
    const shadowG = Math.max(0, Math.round(rgb.g * shadowFactor));
    const shadowB = Math.max(0, Math.round(rgb.b * shadowFactor));
    const shadowRgb = `${shadowR}, ${shadowG}, ${shadowB}`;

    return {
      glow: `rgba(${softenedString}, 0.24)`,
      rim: `rgba(${softenedString}, 0.42)`,
      rimSoft: `rgba(${softenedString}, 0.16)`,
      rimShadow: `rgba(${shadowRgb}, 0.28)`,
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
