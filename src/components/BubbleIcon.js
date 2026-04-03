// src/elements/BubbleIcon.js
import { LitElement, html, css } from 'lit';
import { createGestureHandler } from '../helpers/gesture-handler.js';
import { colorWithOpacity } from '../helpers/color-utils.js';

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
    
    // Gestione hold — logica centralizzata in gesture-handler.js
    this._gesture = createGestureHandler({
      onTap:  () => this._fireHassAction('tap'),
      onHold: () => this._fireHassAction('hold'),
    });
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
      /* transizione colore/sfondo al cambio stato presenza */
      transition: background 0.3s ease, color 0.3s ease, transform 0.1s;
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

      /* colore entità puro come base — no background-blend che sbiadisce */
      background: var(--bubble-main-icon-bg, rgba(255, 255, 255, 0.06));

      /* catch-light sull'edge superiore */
      box-shadow:
        inset 0 1.5px 0 rgba(255, 255, 255, 0.35),
        inset 0 -1px 0 rgba(0, 0, 0, 0.12),
        0 10px 40px rgba(0, 0, 0, 0.28),
        0 2px 10px rgba(0, 0, 0, 0.18);

      /* saturate più alto: estrae i colori reali dal backdrop */
      backdrop-filter: blur(32px) saturate(2.4) brightness(1.05);
      -webkit-backdrop-filter: blur(32px) saturate(2.4) brightness(1.05);
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
      border-radius: inherit;
      transition: opacity 0.35s ease;
    }

    /* striscia riflessiva: overlay esalta il colore sottostante invece di sbiadirlo */
    :host([preset='liquid-glass']) .container::before {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.55) 0%,
        rgba(255, 255, 255, 0.15) 35%,
        transparent 55%
      );
      opacity: 0.85;
      mix-blend-mode: overlay;
    }

    /* glow ambientale addittivo dal colore dell'entità */
    :host([preset='liquid-glass']) .container::after {
      background: radial-gradient(
        ellipse 120% 70% at 50% 118%,
        var(--bubble-main-icon-bg, rgba(255, 255, 255, 0.10)),
        transparent 65%
      );
      mix-blend-mode: screen;
      opacity: 1.0;
    }

    :host([preset='liquid-glass']) .container:hover::before {
      opacity: 1.0;
    }

    :host([preset='liquid-glass']) .container:hover::after {
      opacity: 1.0;
    }

    :host([preset='liquid-glass']) .container:active {
      box-shadow:
        0 6px 24px rgba(0, 0, 0, 0.32),
        0 1px 6px rgba(0, 0, 0, 0.22);
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

    // alpha attivo ridotto per evitare che il fondo "bruci" i mushroom sovrapposti
    const bgAlpha = isLiquid ? (this.active ? 0.30 : 0.22) : 0.1;
    const bg = this._withOpacity(rawBg, bgAlpha) ?? rawBg;
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
    if (isLiquid && this.active) {
      styleChunks.push(`--bubble-main-icon-saturation:1.12`);
      styleChunks.push(`--bubble-main-icon-luminance:1.04`);
      styleChunks.push(`--bubble-main-icon-icon-brightness:1.25`);
      styleChunks.push(`--bubble-main-icon-icon-saturation:1.12`);
    } else if (isLiquid && !this.active) {
      styleChunks.push(`--bubble-main-icon-saturation:0.75`);
      styleChunks.push(`--bubble-main-icon-luminance:0.88`);
      styleChunks.push(`--bubble-main-icon-icon-brightness:1.18`);
      styleChunks.push(`--bubble-main-icon-icon-saturation:0.82`);
      styleChunks.push(`opacity:0.72`);
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
    return colorWithOpacity(color, alpha);
  }

  /* ───────────── GESTURE (via gesture-handler.js) ───────────── */

  _onDown = () => this._gesture.onDown();
  _onUp   = () => this._gesture.onUp();
  _clearHoldTimer = () => this._gesture.clearTimer();
  
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

customElements.define('bubble-icon', BubbleIcon);
