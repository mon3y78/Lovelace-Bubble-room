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
      border-radius: 0 70% 70% 0;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      transition: background 0.2s, transform 0.1s;
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
  `;
  
  render() {
    const fg = this.active ? this.colorActive : this.colorInactive;
    const rawBg = this.active ? this.backgroundActive : this.backgroundInactive;
    const bg = this._withOpacity(rawBg, 0.1) ?? rawBg;
    const iconOpacity = this.active ? 0.9 : 0.8;

    return html`
      <div
        class="container"
        style="background:${bg}"
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
