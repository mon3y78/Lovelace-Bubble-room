/**
 * BubbleSensor.js
 * 
 * Componente per la visualizzazione dei sensori nella Bubble Room card.
 * -----------------------------------------------------------
 * - Mostra un sensore con icona e valore testuale.
 * - Ridimensiona dinamicamente icona e testo in base allo spazio disponibile.
 * - Usa mapping icone centralizzato (icon-mapping.js).
 * - Al click apre finestra "more-info" per la storia del sensore.
 * - Supporta colori personalizzati in base allo stato.
 * 
 * PROPRIETÀ:
 *  - entityConf: Object      (Configurazione del sensore, con chiavi: entity, icon, unit, ecc.)
 *  - hass: Object            (Home Assistant, stato entità)
 *  - containerWidth: Number  (Larghezza disponibile)
 *  - containerHeight: Number (Altezza disponibile)
 *  - colors: Object          (color_active, color_inactive, text_color, etc.)
 * 
 * DIPENDENZE:
 *  - helpers/icon-mapping.js
 *  - helpers/utils.js
 * 
 * AUTORE:
 *  - mon3y78 - https://github.com/mon3y78/Lovelace-Bubble-room
 * 
 * LICENZA: MIT
 */

import { LitElement, html, css } from 'lit';
import { getBestIcon } from '../helpers/icon-mapping.js';
import { getScaledIconSize, autoResizeFont } from '../helpers/utils.js';

export class BubbleSensor extends LitElement {
  static properties = {
    entityConf: { type: Object },
    hass: { type: Object },
    containerWidth: { type: Number },
    containerHeight: { type: Number },
    colors: { type: Object },
  };

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      user-select: none;
      height: 100%;
      width: 100%;
    }
    .sensor-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
      user-select: none;
    }
    .sensor-icon {
      flex-shrink: 0;
      margin-right: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sensor-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      line-height: 1;
      vertical-align: middle;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      text-transform: uppercase;
      color: var(--text-color, #000);
    }
  `;

  constructor() {
    super();
    this.entityConf = {};
    this.hass = null;
    this.containerWidth = 80;
    this.containerHeight = 40;
    this.colors = {};
  }

  firstUpdated() {
    this._resizeText();
  }

  updated(changedProps) {
    if (changedProps.has('containerWidth') || changedProps.has('containerHeight') || changedProps.has('entityConf') || changedProps.has('hass')) {
      this._resizeText();
    }
  }

  _resizeText() {
    const container = this.renderRoot.querySelector('.sensor-text-container');
    const textEl = this.renderRoot.querySelector('.sensor-text');
    if (container && textEl) {
      autoResizeFont(container, textEl, { maxFont: 32, minFont: 8 });
    }
  }

  render() {
    if (!this.entityConf?.entity || !this.hass?.states) {
      return html``;
    }
    const stateObj = this.hass.states[this.entityConf.entity];
    const state = stateObj?.state ?? 'unavailable';
    const isActive = state !== 'off' && state !== 'unavailable';

    const icon = getBestIcon(this.entityConf.entity, this.entityConf, this.hass);
    const iconSize = getScaledIconSize(this.containerHeight, this.containerHeight, 0.8);
    const color = isActive ? (this.colors.color_active || '#ff9900') : (this.colors.color_inactive || '#888');

    const value = stateObj?.state ?? '';
    const unit = this.entityConf.unit || (stateObj?.attributes?.unit_of_measurement ?? '');

    return html`
      <div
        class="sensor-container"
        style="color: ${color};"
        @click=${this._openMoreInfo}
      >
        <div class="sensor-icon" style="width:${iconSize}px; height:${iconSize}px;">
          <ha-icon icon="${icon}" style="width:${iconSize}px; height:${iconSize}px; color:${color};"></ha-icon>
        </div>
        <div class="sensor-text-container" style="height:${this.containerHeight}px; flex-grow:1; overflow:hidden;">
          <span class="sensor-text">${value}${unit ? ' ' + unit : ''}</span>
        </div>
      </div>
    `;
  }

  _openMoreInfo() {
    if (!this.entityConf?.entity) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      detail: { entityId: this.entityConf.entity },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('bubble-sensor', BubbleSensor);
