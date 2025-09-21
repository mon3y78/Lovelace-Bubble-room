// src/elements/BubbleIcon.js
import { LitElement, html, css } from 'lit';

export class BubbleIcon extends LitElement {
  static properties = {
    // presentazione/stato
    icon: { type: String },
    active: { type: Boolean },
    colorActive: { type: String },
    colorInactive: { type: String },
    backgroundActive: { type: String },
    backgroundInactive: { type: String },
    preset: { type: String, reflect: true },
    
    // azioni/contesto (stessa logica di BubbleSubButton)
    entity_id: { type: String },
    tap_action: { type: Object },
    hold_action: { type: Object },
  };
  
  constructor() {
    super();
    // UI
    this.icon = '';
    this.active = false;
    this.colorActive = '#21df73';
    this.colorInactive = '#173c16';
    this.backgroundActive = 'rgba(33,223,115,0.1)';
    this.backgroundInactive = 'rgba(23,60,22,0.1)';
    this.preset = 'standard';
    
    // Azioni (default coerenti con SubButton)
    this.entity_id = '';
    this.tap_action = { action: 'more-info' };
    this.hold_action = { action: 'none' };
    
    // Gestione hold come SubButton
    this._holdThreshold = 500; // ms
    this._holdTimer = null;
    this._holdFired = false;
  }
  
  static styles = css`
    :host {
      position: absolute;
      display: block;
      inset: 0;
      box-sizing: border-box;
      z-index: 1;
    }
    .container {
      box-sizing: border-box;
      border-radius: var(--bubble-main-icon-border-radius, 0 70% 70% 0);
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      transition: background 0.2s, transform 0.1s;
      position: relative;
      overflow: hidden;
      background: var(--bubble-main-icon-bg, transparent);
    }
    .container:active .icon {
      transform: scale(0.98);
    }
    .icon {
      --mdc-icon-size: var(--main-icon-size, 160px);
      width: var(--mdc-icon-size);
      height: var(--mdc-icon-size);
      transform: translateX(var(--icon-shift-x, -20%));
      transition: transform .18s ease, opacity .18s ease;
    }

    :host([preset='liquid-glass']) .container {
      color: var(--bubble-main-icon-color, currentColor);
      border: none;
      background:
        radial-gradient(
          140% 120% at 50% -20%,
          var(--bubble-main-icon-glass-glow, rgba(255, 255, 255, 0.18)),
          rgba(255, 255, 255, 0) 72%
        ),
        linear-gradient(
          180deg,
          var(--bubble-main-icon-glass-highlight, rgba(255, 255, 255, 0.08)) 0%,
          rgba(var(--bubble-main-icon-tint, 255, 255, 255), 0.015) 52%,
          rgba(var(--bubble-main-icon-tint, 255, 255, 255), 0.08) 100%
        ),
        linear-gradient(
          150deg,
          var(--bubble-main-icon-glass-soft, rgba(var(--bubble-main-icon-tint, 255, 255, 255), 0.028)) 0%,
          rgba(var(--bubble-main-icon-tint, 255, 255, 255), 0) 58%
        ),
        var(--bubble-main-icon-bg, rgba(255, 255, 255, 0.02));
      background-blend-mode: screen, normal, screen, normal;
      box-shadow:
        inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.38),
        inset -0.5px -0.5px 1.1px rgba(255, 255, 255, 0.1),
        0 28px 54px var(--bubble-main-icon-glass-shadow, rgba(13, 22, 41, 0.18));
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      transition: background 0.35s ease, box-shadow 0.35s ease, filter 0.35s ease;
      filter:
        saturate(var(--bubble-main-icon-saturation, 1))
        brightness(var(--bubble-main-icon-luminance, 1));
      isolation: isolate;
    }

    :host([preset='liquid-glass']) .container::before,
    :host([preset='liquid-glass']) .container::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }

    :host([preset='liquid-glass']) .container::before {
      background:
        linear-gradient(
          140deg,
          rgba(255, 255, 255, 0.34) 0%,
          rgba(255, 255, 255, 0.16) 42%,
          rgba(255, 255, 255, 0) 70%
        ),
        radial-gradient(
          130% 120% at 50% -20%,
          var(--bubble-main-icon-glass-sheen, rgba(255, 255, 255, 0.18)),
          rgba(255, 255, 255, 0) 68%
        );
      opacity: 0.26;
      mix-blend-mode: screen;
      transform: translateY(-8%);
    }

    :host([preset='liquid-glass']) .container::after {
      border-radius: inherit;
      border: 1px solid var(--bubble-main-icon-glass-rim, rgba(255, 255, 255, 0.32));
      box-shadow:
        inset 0 0 0 1px var(--bubble-main-icon-glass-rim-soft, rgba(255, 255, 255, 0.12)),
        inset 0 -18px 32px -24px var(--bubble-main-icon-glass-rim-shadow, rgba(13, 22, 41, 0.24));
      opacity: 0.4;
      mix-blend-mode: screen;
    }

    :host([preset='liquid-glass']) .container:hover::before {
      opacity: 0.6;
    }

    :host([preset='liquid-glass']) .container:hover::after {
      opacity: 0.68;
    }

    :host([preset='liquid-glass']) .container:active {
      box-shadow:
        inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.44),
        inset -0.5px -0.5px 1.2px rgba(255, 255, 255, 0.16),
        0 24px 46px var(--bubble-main-icon-glass-shadow-active, rgba(13, 22, 41, 0.22));
      border: none;
    }

    :host([preset='liquid-glass']) .container:hover {
      border: none;
    }

    :host([preset='liquid-glass']) .icon {
      filter:
        drop-shadow(0 16px 32px rgba(var(--bubble-main-icon-shadow-rgb, 13, 22, 41), 0.2))
        brightness(var(--bubble-main-icon-icon-brightness, 1))
        saturate(var(--bubble-main-icon-icon-saturation, 1));
      transition: filter 0.35s ease, opacity 0.18s ease, transform 0.18s ease;
    }
  `;
  
  render() {
    const fg = this.active ? this.colorActive : this.colorInactive;
    const rawBg = this.active ? this.backgroundActive : this.backgroundInactive;
    const isLiquid = this.preset === 'liquid-glass';
    const bg = this._withOpacity(rawBg, isLiquid ? 0.22 : 0.1) ?? rawBg;
    const iconOpacity = this.active ? 0.9 : 0.8;

    const styleChunks = [];
    if (bg) {
      styleChunks.push(`--bubble-main-icon-bg:${bg}`);
    }
    if (fg) {
      styleChunks.push(`color:${fg}`);
      if (!isLiquid) {
        styleChunks.push(`--bubble-main-icon-border:${fg}`);
      }
      styleChunks.push(`--bubble-main-icon-color:${fg}`);
    }

    const containerStyle = styleChunks.map(chunk => `${chunk};`).join(' ');

    return html`
      <div
        class="container"
        style="${containerStyle}"
        @pointerdown=${this._onDown}
        @pointerup=${this._onUp}
        @pointerleave=${this._clearHoldTimer}
        @pointercancel=${this._clearHoldTimer}
      >
        <ha-icon
          class="icon"
          icon="${this.icon || 'mdi:checkbox-blank-circle-outline'}"
          style="color:${fg};opacity:${iconOpacity}"
        ></ha-icon>
      </div>
    `;
  }

  _withOpacity(color, alpha) {
    const parsed = BubbleIcon._parseColor(color);
    if (!parsed) return null;
    const { r, g, b } = parsed;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  static _parseColor(color) {
    if (!color || typeof color !== 'string' || color.startsWith('var(')) {
      return null;
    }

    if (typeof document === 'undefined') {
      return null;
    }

    if (!BubbleIcon._colorCanvas) {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      BubbleIcon._colorCanvas = canvas;
      BubbleIcon._colorCtx = canvas.getContext('2d', { willReadFrequently: true }) || canvas.getContext('2d');
    }

    const ctx = BubbleIcon._colorCtx;
    if (!ctx) {
      return null;
    }

    try {
      ctx.fillStyle = '#000';
      ctx.fillStyle = color;
    } catch (_err) {
      return null;
    }

    const normalized = ctx.fillStyle;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = normalized;
    ctx.fillRect(0, 0, 1, 1);

    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  }

  /* ───────────── GESTURE: identiche a BubbleSubButton ───────────── */
  
  _onDown = () => {
    this._holdFired = false;
    this._holdTimer = window.setTimeout(() => {
      this._holdFired = true;
      this._fireHassAction('hold');
    }, this._holdThreshold);
  };
  
  _onUp = () => {
    this._clearHoldTimer();
    if (!this._holdFired) this._fireHassAction('tap');
  };
  
  _clearHoldTimer = () => {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  };
  
  /* ───────────── Evento emesso: stesso payload di BubbleSubButton ───────────── */
  
  /* ───────────── Evento emesso: stesso payload di BubbleSubButton ───────────── */
  _fireHassAction(actionType /* 'tap' | 'hold' */ ) {
    // Prendi la config dell'azione corrente (tap/hold)
    const cfg = (actionType === 'hold' ? this.hold_action : this.tap_action) || { action: 'more-info' };
    const action = cfg.action || 'more-info';
    
    // Alcune azioni richiedono l'entità; altre no.
    const needsEntity = action === 'toggle' || action === 'call-service' || action === 'more-info';
    
    // Se l'azione richiede entity ma non c'è, non fare nulla;
    // MA se è 'navigate' (o qualunque azione che non richiede entity), procedi comunque.
    if (needsEntity && !this.entity_id) {
      return;
    }
    
    // Emetti l'evento come fa BubbleSubButton (anche se entity_id è vuota per "navigate").
    const evt = new Event('hass-action', { bubbles: true, composed: true });
    evt.detail = {
      config: {
        entity: this.entity_id, // può essere undefined/'' per 'navigate'
        tap_action: this.tap_action || { action: 'more-info' },
        hold_action: this.hold_action || { action: 'none' },
      },
      action: actionType,
    };
    this.dispatchEvent(evt);
  }
}

BubbleIcon._colorCanvas = null;
BubbleIcon._colorCtx = null;

customElements.define('bubble-icon', BubbleIcon);
