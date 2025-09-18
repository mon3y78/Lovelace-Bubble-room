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
    const format = (value) => (typeof value === 'number' && !Number.isInteger(value) ? Number(value.toFixed(3)) : value);
    const formatAlpha = (value) => (typeof value === 'number' ? Number(value.toFixed(3)) : value);
    return `rgba(${format(r)}, ${format(g)}, ${format(b)}, ${formatAlpha(alpha)})`;
  }

  static _parseColor(color) {
    if (!color || typeof color !== 'string' || color.startsWith('var(')) {
      return null;
    }

    if (typeof document === 'undefined') {
      return null;
    }

    const cache = BubbleIcon._colorCache ?? (BubbleIcon._colorCache = new Map());
    if (cache.has(color)) {
      return cache.get(color);
    }

    if (!BubbleIcon._colorCanvas) {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      BubbleIcon._colorCanvas = canvas;
      BubbleIcon._colorCtx = canvas.getContext('2d', { willReadFrequently: true }) || canvas.getContext('2d');
    }

    const ctx = BubbleIcon._colorCtx;
    if (!ctx) {
      cache.set(color, null);
      return null;
    }

    try {
      ctx.fillStyle = '#000';
      ctx.fillStyle = color;
    } catch (_err) {
      cache.set(color, null);
      return null;
    }

    const normalized = ctx.fillStyle;
    if (cache.has(normalized)) {
      const cached = cache.get(normalized);
      cache.set(color, cached);
      return cached;
    }

    const hexMatch = normalized.match(/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
    if (hexMatch) {
      let value = hexMatch[1];
      if (value.length === 3 || value.length === 4) {
        value = value.split('').map((ch) => ch + ch).join('');
      }

      const hasAlpha = value.length === 8;
      const r = parseInt(value.slice(0, 2), 16);
      const g = parseInt(value.slice(2, 4), 16);
      const b = parseInt(value.slice(4, 6), 16);
      const a = hasAlpha ? parseInt(value.slice(6, 8), 16) / 255 : 1;

      const parsed = { r, g, b, a };
      cache.set(color, parsed);
      cache.set(normalized, parsed);
      return parsed;
    }

    const rgbaMatch = normalized.match(/^rgba?\((.*)\)$/i);
    if (rgbaMatch) {
      const body = rgbaMatch[1].trim();

      const splitComponents = (input) => {
        if (input.includes(',')) {
          return input.split(',').map((part) => part.trim()).filter(Boolean);
        }

        const slashIndex = input.indexOf('/');
        if (slashIndex !== -1) {
          const rgbPart = input.slice(0, slashIndex).trim();
          const alphaPart = input.slice(slashIndex + 1).trim();
          return [...rgbPart.split(/\s+/).filter(Boolean), alphaPart];
        }

        return input.split(/\s+/).filter(Boolean);
      };

      const components = splitComponents(body);
      if (components.length < 3) {
        cache.set(color, null);
        cache.set(normalized, null);
        return null;
      }

      const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
      const parseRgbComponent = (value) => {
        const trimmed = value.trim();
        const number = Number.parseFloat(trimmed);
        if (Number.isNaN(number)) {
          return null;
        }
        const scaled = trimmed.endsWith('%') ? (number / 100) * 255 : number;
        return clamp(scaled, 0, 255);
      };

      const parseAlphaComponent = (value) => {
        const trimmed = value.trim();
        if (trimmed === '') {
          return 1;
        }
        const number = Number.parseFloat(trimmed);
        if (Number.isNaN(number)) {
          return 1;
        }
        const normalizedAlpha = trimmed.endsWith('%') ? number / 100 : number;
        return clamp(normalizedAlpha, 0, 1);
      };

      const r = parseRgbComponent(components[0]);
      const g = parseRgbComponent(components[1]);
      const b = parseRgbComponent(components[2]);

      if (r === null || g === null || b === null) {
        cache.set(color, null);
        cache.set(normalized, null);
        return null;
      }

      let a = 1;
      if (components.length >= 4) {
        a = parseAlphaComponent(components[3]);
      }

      const parsed = { r, g, b, a };
      cache.set(color, parsed);
      cache.set(normalized, parsed);
      return parsed;
    }

    cache.set(color, null);
    cache.set(normalized, null);
    return null;
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
BubbleIcon._colorCache = null;

customElements.define('bubble-icon', BubbleIcon);
