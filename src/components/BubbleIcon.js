/**
 * BubbleIcon.js
 * Componente per la visualizzazione dell’icona principale della stanza nella Bubble Room card.
 * -----------------------------------------------------------
 * - Visualizza un’icona principale ridimensionabile dinamicamente in base allo spazio disponibile.
 * - Usa la funzione centralizzata getScaledIconSize da utils.js per il calcolo della dimensione.
 * - Supporta colore di sfondo e colore icona configurabili.
 * - Gestisce azioni tap/hold centralizzate usando helpers/utils.js.
 * - Layout responsive e pulito.
 * 
 * PROPRIETÀ:
 *  - icon: String          (Icona mdi da visualizzare)
 *  - color: String         (Colore di sfondo e icona)
 *  - containerWidth: Number (Larghezza disponibile per il componente)
 *  - containerHeight: Number (Altezza disponibile per il componente)
 *  - config: Object        (Configurazione con tap_action e hold_action)
 *  - hass: Object          (Home Assistant, necessario per azioni)
 * 
 * AUTORE:
 *  - mon3y78 - https://github.com/mon3y78/Lovelace-Bubble-room
 * 
 * LICENZA: MIT
 */

import { LitElement, html, css } from 'lit';
import { getScaledIconSize, onPointerDown, onPointerUp, onPointerLeave, doTapAction, doHoldAction } from '../helpers/utils.js';

export class BubbleIcon extends LitElement {
  static properties = {
    icon: { type: String },
    color: { type: String },
    containerWidth: { type: Number },
    containerHeight: { type: Number },
    config: { type: Object },
    hass: { type: Object },
  };
  
  static styles = css`
    :host {
      display: block;
    }
    .bubble-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--icon-bg, transparent);
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .icon-inner {
      color: var(--icon-color, inherit);
      width: 100%;
      height: 100%;
      text-align: center;
      display: block;
      user-select: none;
      pointer-events: none;
    }
  `;
  
  constructor() {
    super();
    this.icon = '';
    this.color = '';
    this.containerWidth = 80;
    this.containerHeight = 80;
    this.config = {};
    this.hass = null;
  }
  
  render() {
    const iconSize = getScaledIconSize(this.containerWidth, this.containerHeight, 0.8);
    return html`
      <div
        class="bubble-icon"
        style="background:${this.color || 'transparent'};"
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointerleave=${this._onPointerLeave}
      >
        <ha-icon
          class="icon-inner"
          .icon=${this.icon}
          style="font-size:${iconSize}px; color:${this.color || 'inherit'};"
        ></ha-icon>
      </div>
    `;
  }
  
  _onPointerDown(e) {
    onPointerDown(e, this.config, this.hass, this._onTap.bind(this), this._onHold.bind(this));
  }
  _onPointerUp(e) {
    onPointerUp(e, this.config, this.hass, this._onTap.bind(this), this._onHold.bind(this));
  }
  _onPointerLeave(e) {
    onPointerLeave();
  }
  
  _onTap(conf, hass) {
    doTapAction(conf, hass);
  }
  _onHold(conf, hass) {
    doHoldAction(conf, hass);
  }
}

customElements.define('bubble-icon', BubbleIcon);