/**
 * BubbleName.js
 * Componente per la visualizzazione del nome della stanza nella Bubble Room card.
 * -----------------------------------------------------------
 * - Visualizza il nome della stanza ridimensionando dinamicamente il font per adattarsi al contenitore.
 * - Gestisce azioni tap/hold centralizzate usando helpers/utils.js.
 * - Supporta configurazione per azioni e hass per interazioni.
 * - Layout responsive e pulito.
 * 
 * PROPRIETÀ:
 *  - name: String          (Testo del nome della stanza)
 *  - config: Object        (Configurazione con tap_action e hold_action)
 *  - hass: Object          (Home Assistant, necessario per azioni)
 *  - containerWidth: Number (Larghezza disponibile per il componente)
 *  - containerHeight: Number (Altezza disponibile per il componente)
 * 
 * AUTORE:
 *  - mon3y78 - https://github.com/mon3y78/Lovelace-Bubble-room
 * 
 * LICENZA: MIT
 */

import { LitElement, html, css } from 'lit';
import { autoResizeFont, onPointerDown, onPointerUp, onPointerLeave, doTapAction, doHoldAction } from '../helpers/utils.js';

export class BubbleName extends LitElement {
  static properties = {
    name: { type: String },
    config: { type: Object },
    hass: { type: Object },
    containerWidth: { type: Number },
    containerHeight: { type: Number },
  };
  
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .name-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
      cursor: pointer;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      text-transform: uppercase;
      line-height: 1;
      display: inline-block;
    }
  `;
  
  constructor() {
    super();
    this.name = '';
    this.config = {};
    this.hass = null;
    this.containerWidth = 200;
    this.containerHeight = 40;
  }
  
  firstUpdated() {
    this._resizeFont();
  }
  
  updated(changedProps) {
    if (changedProps.has('name') || changedProps.has('containerWidth') || changedProps.has('containerHeight')) {
      this._resizeFont();
    }
  }
  
  render() {
    return html`
      <div
        class="name-text"
        id="nameText"
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointerleave=${this._onPointerLeave}
      >
        ${this.name}
      </div>
    `;
  }
  
  _resizeFont() {
    const container = this.renderRoot.host; // o altro wrapper se serve
    const textElem = this.renderRoot.getElementById('nameText');
    if (container && textElem) {
      autoResizeFont(container, textElem, { minFont: 8, maxFont: 120, letterSpacing: 1 });
    }
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

customElements.define('bubble-name', BubbleName);