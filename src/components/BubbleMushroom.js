/**
 * BubbleMushroom.js
 * 
 * Componente per la visualizzazione delle entità "mushroom" (icone secondarie) nella Bubble Room card.
 * - Visualizza un'icona dinamica in posizione e dimensione corretta, usando i mapping icone.
 * - Esegue azioni tap/hold come da configurazione.
 * - Il ridimensionamento dell'icona usa getScaledIconSize da utils.js.
 * - Compatibile con entità di qualsiasi dominio supportato.
 * - Usa funzioni centralizzate tap/hold da helpers/utils.js.
 * 
 * AUTORE: mon3y78 - https://github.com/mon3y78
 */

import { LitElement, html, css } from 'lit';
import { getBestIcon } from '../helpers/icon-mapping.js';
import { getScaledIconSize, onPointerDown, onPointerUp, onPointerLeave, doTapAction, doHoldAction } from '../helpers/utils.js';

export class BubbleMushroom extends LitElement {
  static properties = {
    entityConf: { type: Object },
    hass: { type: Object },
    containerWidth: { type: Number },
    containerHeight: { type: Number },
    colorOn: { type: String },
    colorOff: { type: String },
    state: { type: String },
  };
  
  static styles = css`
    .mushroom-item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      cursor: pointer;
      transition: filter 0.15s;
    }
    .mushroom-item:active {
      filter: brightness(1.1);
    }
  `;
  
  constructor() {
    super();
    this.entityConf = {};
    this.hass = {};
    this.containerWidth = 48;
    this.containerHeight = 48;
    this.colorOn = 'orange';
    this.colorOff = '#80808055';
    this.state = 'off';
  }
  
  updated(changedProps) {
    if (changedProps.has('hass') || changedProps.has('entityConf')) {
      this._updateState();
    }
  }
  
  _updateState() {
    if (!this.entityConf?.entity || !this.hass?.states) {
      this.state = 'off';
      return;
    }
    const stateObj = this.hass.states[this.entityConf.entity];
    this.state = stateObj?.state ?? 'off';
  }
  
  render() {
    const icon = getBestIcon(this.entityConf.entity, this.entityConf, this.hass);
    const iconSize = getScaledIconSize(this.containerWidth, this.containerHeight, 0.25);
    const color = this.state === 'on' ? (this.colorOn || 'orange') : (this.colorOff || '#80808055');
    
    return html`
      <div
        class="mushroom-item"
        style="width:${iconSize}px; height:${iconSize}px;"
        @pointerdown=${e => onPointerDown(e, this.entityConf, this.hass, this._tapAction.bind(this), this._holdAction.bind(this))}
        @pointerup=${e => onPointerUp(e, this.entityConf, this.hass, this._tapAction.bind(this), this._holdAction.bind(this))}
        @pointerleave=${e => onPointerLeave(e)}
      >
        <ha-icon
          icon="${icon}"
          style="
            width: ${iconSize}px;
            height: ${iconSize}px;
            color: ${color};
            display: block;
          "
        ></ha-icon>
      </div>
    `;
  }
  
  _tapAction(conf, hass) {
    doTapAction(conf, hass);
  }
  
  _holdAction(conf, hass) {
    doHoldAction(conf, hass);
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);