/**
 * BubbleMushroom.js
 * Componente per la visualizzazione delle entità "mushroom" (icone secondarie) nella Bubble Room card.
 * - Visualizza un'icona dinamica in posizione e dimensione corretta, usando i mapping icone.
 * - Esegue azioni tap/hold come da configurazione.
 * - Il ridimensionamento dell'icona usa getScaledIconSize da utils.js.
 * - Compatibile con entità di qualsiasi dominio supportato.
 * Autore: mon3y78 - https://github.com/mon3y78
 */

import { LitElement, html, css } from 'lit';
import { getBestIcon } from '../helpers/icon-mapping.js';
import { getScaledIconSize } from '../helpers/utils.js';

export class BubbleMushroom extends LitElement {
  static properties = {
    entityConf: { type: Object },
    hass: { type: Object },
    containerWidth: { type: Number },  // Larghezza dell'area icona genitore
    containerHeight: { type: Number }, // Altezza dell'area icona genitore
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
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointerleave=${this._onPointerLeave}
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

  // Gestione azioni tap/hold
  _onPointerDown(e) {
    e.stopPropagation();
    this._holdTriggered = false;
    this._holdTimeout = setTimeout(() => {
      this._holdTriggered = true;
      this._handleHoldAction();
    }, 500);
  }
  _onPointerUp(e) {
    e.stopPropagation();
    clearTimeout(this._holdTimeout);
    if (!this._holdTriggered) this._handleTapAction();
    this._holdTriggered = false;
  }
  _onPointerLeave(e) {
    clearTimeout(this._holdTimeout);
    this._holdTriggered = false;
  }

  _handleTapAction() {
    const action = this.entityConf.tap_action?.action;
    if (action === 'toggle') this._toggleEntity();
    else if (action === 'more-info')
      this.dispatchEvent(new CustomEvent('hass-more-info', {
        detail: { entityId: this.entityConf.entity }, bubbles: true, composed: true,
      }));
    else if (action === 'navigate' && this.entityConf.tap_action?.navigation_path) {
      window.history.pushState({}, '', this.entityConf.tap_action.navigation_path);
      window.dispatchEvent(new Event('location-changed'));
    }
  }
  _handleHoldAction() {
    const action = this.entityConf.hold_action?.action;
    if (!action || action === 'more-info') {
      this.dispatchEvent(new CustomEvent('hass-more-info', {
        detail: { entityId: this.entityConf.entity }, bubbles: true, composed: true,
      }));
      return;
    }
    if (action === 'toggle') this._toggleEntity();
    else if (action === 'navigate' && this.entityConf.hold_action?.navigation_path) {
      window.history.pushState({}, '', this.entityConf.hold_action.navigation_path);
      window.dispatchEvent(new Event('location-changed'));
    }
    else if (action === 'call-service' && this.entityConf.hold_action?.service) {
      const [domain, serviceName] = this.entityConf.hold_action.service.split('.');
      const serviceData = this.entityConf.hold_action.service_data || {};
      if (!serviceData.entity_id) serviceData.entity_id = this.entityConf.entity;
      this.hass.callService(domain, serviceName, serviceData);
    }
  }
  _toggleEntity() {
    if (!this.hass) return;
    this.hass.callService('homeassistant', 'toggle', { entity_id: this.entityConf.entity });
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);