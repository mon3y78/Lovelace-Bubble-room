/**
 * BubbleSubButton.js
 * 
 * Componente LitElement per Bubble Room Card (Home Assistant)
 * -----------------------------------------------------------
 * - Visualizza un pulsante secondario (subbutton) con icona dinamica e stato.
 * - Supporta azioni tap/hold configurabili (toggle, more-info, navigate, call-service).
 * - Colori e dimensioni dinamici in base a stato entità e configurazione.
 * - Usa il mapping icone centralizzato (icon-mapping.js) per scegliere la migliore icona.
 * - Nessuna label/nome testuale, solo icona.
 * - Gestisce tap e hold tramite funzioni centralizzate da utils.js
 * 
 * PROPRIETÀ:
 *  - entity: Object        (Configurazione del subbutton, con chiavi: entity, icon, tap_action, hold_action, ecc.)
 *  - hass: Object          (Istanza Home Assistant, per stato entità e chiamate servizi)
 *  - colors: Object        (Config colori subbutton: background_on, background_off, icon_on, icon_off)
 *  - size: Number          (Dimensione icona in px; default 32, ereditabile dal genitore)
 * 
 * DIPENDENZE:
 *  - helpers/icon-mapping.js   (Funzione getBestIcon(entityId, entityConf, hass))
 *  - helpers/utils.js          (Funzioni onPointerDown, onPointerUp, onPointerLeave, doTapAction, doHoldAction)
 * 
 * AUTORE:
 *  - mon3y78 - https://github.com/mon3y78/Lovelace-Bubble-room
 * 
 * LICENZA: MIT
 */

import { LitElement, html, css } from 'lit';
import { getBestIcon } from '../helpers/icon-mapping.js';
import { onPointerDown, onPointerUp, onPointerLeave, doTapAction, doHoldAction } from '../helpers/utils.js';

export class BubbleSubButton extends LitElement {
  static properties = {
    entity: { type: Object },
    hass: { type: Object },
    colors: { type: Object },
    size: { type: Number }
  };

  constructor() {
    super();
    this.entity = {};
    this.hass = null;
    this.colors = {};
    this.size = 32;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .bubble-sub-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      cursor: pointer;
      background-color: var(--sub-button-color, rgba(0,0,255,0.3));
      min-height: 0;
      min-width: 0;
      transition: background 0.18s;
      box-sizing: border-box;
    }
    .subbutton-icon {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `;

  render() {
    if (!this.entity || !this.entity.entity || !this.hass) {
      return html`<div></div>`;
    }
    const stateObj = this.hass.states[this.entity.entity];
    const state = stateObj ? stateObj.state : 'off';

    // Colori dinamici
    const backgroundColor = state === 'on'
      ? this.colors?.background_on || 'rgba(0,0,255,1)'
      : this.colors?.background_off || 'rgba(0,0,255,0.3)';
    const iconColor = state === 'on'
      ? this.colors?.icon_on || 'yellow'
      : this.colors?.icon_off || '#666';

    const iconSize = this.size || 32;

    return html`
      <div
        class="bubble-sub-button"
        style="--sub-button-color: ${backgroundColor};"
        @pointerdown=${e => onPointerDown(e, this.entity, this.hass, this._onTap.bind(this), this._onHold.bind(this))}
        @pointerup=${e => onPointerUp(e, this.entity, this.hass, this._onTap.bind(this), this._onHold.bind(this))}
        @pointerleave=${_ => onPointerLeave()}
      >
        <ha-icon
          class="subbutton-icon"
          icon="${getBestIcon(this.entity.entity, this.entity, this.hass)}"
          style="
            color: ${iconColor};
            --mdc-icon-size: ${iconSize}px;
            width: ${iconSize}px;
            height: ${iconSize}px;
          "
        ></ha-icon>
      </div>
    `;
  }

  _onTap(conf, hass) {
    doTapAction(conf, hass);
  }

  _onHold(conf, hass) {
    doHoldAction(conf, hass);
  }
}

customElements.define('bubble-sub-button', BubbleSubButton);
/**
 * BubbleSubButton.js
 * 
 * Componente LitElement per Bubble Room Card (Home Assistant)
 * -----------------------------------------------------------
 * - Visualizza un pulsante secondario (subbutton) con icona dinamica e stato.
 * - Supporta azioni tap/hold configurabili (toggle, more-info, navigate, call-service).
 * - Colori e dimensioni dinamici in base a stato entità e configurazione.
 * - Usa il mapping icone centralizzato (icon-mapping.js) per scegliere la migliore icona.
 * - Nessuna label/nome testuale, solo icona.
 * - Gestisce tap e hold tramite funzioni centralizzate da utils.js
 * 
 * PROPRIETÀ:
 *  - entity: Object        (Configurazione del subbutton, con chiavi: entity, icon, tap_action, hold_action, ecc.)
 *  - hass: Object          (Istanza Home Assistant, per stato entità e chiamate servizi)
 *  - colors: Object        (Config colori subbutton: background_on, background_off, icon_on, icon_off)
 *  - size: Number          (Dimensione icona in px; default 32, ereditabile dal genitore)
 * 
 * DIPENDENZE:
 *  - helpers/icon-mapping.js   (Funzione getBestIcon(entityId, entityConf, hass))
 *  - helpers/utils.js          (Funzioni onPointerDown, onPointerUp, onPointerLeave, doTapAction, doHoldAction)
 * 
 * AUTORE:
 *  - mon3y78 - https://github.com/mon3y78/Lovelace-Bubble-room
 * 
 * LICENZA: MIT
 */

import { LitElement, html, css } from 'lit';
import { getBestIcon } from '../helpers/icon-mapping.js';
import { onPointerDown, onPointerUp, onPointerLeave, doTapAction, doHoldAction } from '../helpers/utils.js';

export class BubbleSubButton extends LitElement {
  static properties = {
    entity: { type: Object },
    hass: { type: Object },
    colors: { type: Object },
    size: { type: Number }
  };

  constructor() {
    super();
    this.entity = {};
    this.hass = null;
    this.colors = {};
    this.size = 32;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .bubble-sub-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      cursor: pointer;
      background-color: var(--sub-button-color, rgba(0,0,255,0.3));
      min-height: 0;
      min-width: 0;
      transition: background 0.18s;
      box-sizing: border-box;
    }
    .subbutton-icon {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `;

  render() {
    if (!this.entity || !this.entity.entity || !this.hass) {
      return html`<div></div>`;
    }
    const stateObj = this.hass.states[this.entity.entity];
    const state = stateObj ? stateObj.state : 'off';

    // Colori dinamici
    const backgroundColor = state === 'on'
      ? this.colors?.background_on || 'rgba(0,0,255,1)'
      : this.colors?.background_off || 'rgba(0,0,255,0.3)';
    const iconColor = state === 'on'
      ? this.colors?.icon_on || 'yellow'
      : this.colors?.icon_off || '#666';

    const iconSize = this.size || 32;

    return html`
      <div
        class="bubble-sub-button"
        style="--sub-button-color: ${backgroundColor};"
        @pointerdown=${e => onPointerDown(e, this.entity, this.hass, this._onTap.bind(this), this._onHold.bind(this))}
        @pointerup=${e => onPointerUp(e, this.entity, this.hass, this._onTap.bind(this), this._onHold.bind(this))}
        @pointerleave=${_ => onPointerLeave()}
      >
        <ha-icon
          class="subbutton-icon"
          icon="${getBestIcon(this.entity.entity, this.entity, this.hass)}"
          style="
            color: ${iconColor};
            --mdc-icon-size: ${iconSize}px;
            width: ${iconSize}px;
            height: ${iconSize}px;
          "
        ></ha-icon>
      </div>
    `;
  }

  _onTap(conf, hass) {
    doTapAction(conf, hass);
  }

  _onHold(conf, hass) {
    doHoldAction(conf, hass);
  }
}

customElements.define('bubble-sub-button', BubbleSubButton);
