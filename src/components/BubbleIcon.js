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
    this.backgroundActive = 'rgba(33,223,115,0.12)';
    this.backgroundInactive = 'rgba(23,60,22,0.08)';
    
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
      z-index: 3;
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
    const bg = this.active ? this.backgroundActive : this.backgroundInactive;
    
    return html`
      <div
        class="container"
        style="background:${bg}"
        @pointerdown=${this._onDown}
        @pointerup=${this._onUp}
        @pointerleave=${this._clearHoldTimer}
        @pointercancel=${this._clearHoldTimer}
      >
        <ha-icon class="icon" icon="${this.icon || 'mdi:checkbox-blank-circle-outline'}" style="color:${fg}"></ha-icon>
      </div>
    `;
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
  
  _fireHassAction(actionType /* 'tap' | 'hold' */ ) {
    if (!this.entity_id) return;
    
    const actionConfig = {
      entity: this.entity_id,
      tap_action: this.tap_action || { action: 'more-info' },
      hold_action: this.hold_action || { action: 'none' },
    };
    
    const evt = new Event('hass-action', { bubbles: true, composed: true });
    evt.detail = {
      config: actionConfig,
      action: actionType,
    };
    this.dispatchEvent(evt);
  }
}

customElements.define('bubble-icon', BubbleIcon);