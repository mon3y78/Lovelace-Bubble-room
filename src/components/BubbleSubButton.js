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
 * 
 * PROPRIETÀ:
 *  - entity: Object        (Configurazione del subbutton, con chiavi: entity, icon, tap_action, hold_action, ecc.)
 *  - hass: Object          (Istanza Home Assistant, per stato entità e chiamate servizi)
 *  - colors: Object        (Config colori subbutton: background_on, background_off, icon_on, icon_off)
 *  - size: Number          (Dimensione icona in px; default 32, ereditabile dal genitore)
 * 
 * DIPENDENZE:
 *  - helpers/icon-mapping.js   (Funzione getBestIcon(entityId, entityConf, hass))
 * 
 * FUNZIONALITÀ PRINCIPALI:
 *  - Mostra l’icona scelta dinamicamente per l’entità selezionata.
 *  - Gestisce colori e background secondo lo stato dell’entità.
 *  - Gestisce azioni personalizzate su tap e hold, compatibili con Home Assistant.
 *  - Design full responsive, nessun testo sotto l’icona.
 * 
 * AUTORE:
 *  - mon3y78 - https://github.com/mon3y78/Lovelace-Bubble-room
 * 
 * LICENZA: MIT
 */

import { LitElement, html, css } from 'lit';
import { getBestIcon } from '../helpers/icon-mapping.js';

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
    this._holdTimeout = null;
    this._holdTriggered = false;
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
      /* il font-size verrà sovrascritto via style inline */
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

    // Dimensione icona dinamica (proporzione della cella)
    const iconSize = this.size || 32;

    return html`
      <div
        class="bubble-sub-button"
        style="--sub-button-color: ${backgroundColor};"
        @pointerdown=${e => this._startHold(e)}
        @pointerup=${e => this._endHold(e)}
        @pointerleave=${e => this._cancelHold(e)}
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

  // Azioni tap/hold come Home Assistant
  _startHold(e) {
    e.stopPropagation();
    this._holdTriggered = false;
    this._holdTimeout = setTimeout(() => {
      this._holdTriggered = true;
      this._handleHoldAction();
    }, 500);
  }

  _endHold(e) {
    e.stopPropagation();
    clearTimeout(this._holdTimeout);
    if (!this._holdTriggered) {
      this._handleTapAction();
    }
    this._holdTriggered = false;
  }

  _cancelHold() {
    clearTimeout(this._holdTimeout);
    this._holdTriggered = false;
  }

  _handleTapAction() {
    const tap = this.entity.tap_action || { action: 'toggle' };
    this._handleAction(tap);
  }

  _handleHoldAction() {
    const hold = this.entity.hold_action || { action: 'more-info' };
    this._handleAction(hold);
  }

  _handleAction(action) {
    if (!action || action.action === 'none') return;
    switch (action.action) {
      case 'toggle':
        this.hass.callService('homeassistant', 'toggle', { entity_id: this.entity.entity });
        break;
      case 'more-info':
        this.dispatchEvent(new CustomEvent('hass-more-info', {
          detail: { entityId: this.entity.entity },
          bubbles: true, composed: true
        }));
        break;
      case 'call-service':
        if (action.service) {
          const [domain, serviceName] = action.service.split('.');
          const serviceData = action.service_data || {};
          if (!serviceData.entity_id) serviceData.entity_id = this.entity.entity;
          this.hass.callService(domain, serviceName, serviceData);
        }
        break;
      case 'navigate':
        if (action.navigation_path) {
          window.history.pushState({}, '', action.navigation_path);
          window.dispatchEvent(new Event('location-changed'));
        }
        break;
      default:
        // fallback: nothing
        break;
    }
  }
}

customElements.define('bubble-sub-button', BubbleSubButton);