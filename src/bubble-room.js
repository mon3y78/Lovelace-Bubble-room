/**
 * Bubble Room Card - Lovelace Custom Card for Home Assistant
 * 
 * Refactored version (luglio 2024)
 * Autore: mon3y78 & contributors
 * 
 * - Usa solo componenti modulari (BubbleIcon, BubbleMushroom, BubbleSensor, BubbleSubButton, BubbleName)
 * - Centralizza tap/hold e resize tramite helpers/utils.js
 * - Tutta la presentazione delegata ai componenti
 * - Niente più markup legacy (<ha-icon>, <span>, funzioni sizing legacy)
 * 
 * Repo: https://github.com/mon3y78/Lovelace-Bubble-room
 * Docs: https://www.home-assistant.io/docs/
 */

import { LitElement, html, css } from 'lit';

// Import componenti modulari
import './components/BubbleIcon.js';
import './components/BubbleMushroom.js';
import './components/BubbleSensor.js';
import './components/BubbleSubButton.js';
import './components/BubbleName.js';

// Helpers centralizzati
import { handleTapHold, observeResize } from './helpers/utils.js';
import { mapIcon } from './helpers/icon-mapping.js';

export class BubbleRoom extends LitElement {
  /**
   * Proprietà reattive del componente
   */
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    containerWidth: { type: Number },
    containerHeight: { type: Number },
  };

  /**
   * Stili base per il layout della card (puoi personalizzare a piacere)
   */
  static styles = css`
    :host {
      display: block;
    }
    .bubble-room-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      gap: 12px;
      /* Personalizza qui il gap/margine tra bolle */
    }
    .bubble-wrapper {
      position: relative;
      user-select: none;
      touch-action: manipulation;
      /* Opzionale: ombra, bordo, animazioni */
    }
  `;

  /**
   * Costruttore: inizializza i dati base
   */
  constructor() {
    super();
    this.hass = null;
    this.config = {};
    this.containerWidth = 0;
    this.containerHeight = 0;
    this._resizeObserver = null;
  }

  /**
   * Gestione della configurazione (Home Assistant style)
   */
  setConfig(config) {
    if (!config.bubbles || !Array.isArray(config.bubbles)) {
      throw new Error('Bubble Room: manca la proprietà "bubbles" in config!');
    }
    this.config = config;
  }

  /**
   * Avvia il ResizeObserver per adattare la card al ridimensionamento
   */
  firstUpdated() {
    this._resizeObserver = observeResize(this, ({ width, height }) => {
      this.containerWidth = width;
      this.containerHeight = height;
    });
  }

  /**
   * Pulisce il ResizeObserver se la card viene rimossa dal DOM
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  /**
   * Rendering della card: tutto delegato ai componenti modulari
   */
  render() {
    // Se manca Home Assistant o la config, non mostra nulla
    if (!this.hass || !this.config.bubbles) return html``;

    return html`
      <div class="bubble-room-container">
        ${this.config.bubbles.map(bub => html`
          <div
            class="bubble-wrapper"
            @click=${e => handleTapHold(e, bub, this.hass)}
            @contextmenu=${e => handleTapHold(e, bub, this.hass)}
          >
            <!-- Componente icona principale (modulare) -->
            <bubble-icon
              .iconConf=${bub}
              .icon=${getIcon(bub, this.hass, this.config)}
              .hass=${this.hass}
              .width=${this.containerWidth}
              .height=${this.containerHeight}
            ></bubble-icon>

            <!-- Render dinamico per ogni tipo di “bolla” -->
            ${renderBubbleByType(
              bub,
              this.hass,
              this.containerWidth,
              this.containerHeight,
              this.config.colors
            )}
          </div>
        `)}
      </div>
    `;
  }
}

/**
 * Funzione helper: restituisce l’icona giusta per la bolla (usa helpers/icon-mapping)
 */
function getIcon(bub, hass, config) {
  return bub.icon
    ? bub.icon
    : bub.entity
      ? mapIcon(bub.entity, hass, config)
      : '';
}

/**
 * Funzione helper: restituisce il componente giusto in base al tipo
 */
function renderBubbleByType(bub, hass, w, h, colors) {
  // Props comuni
  const props = {
    entityConf: bub,
    hass,
    containerWidth: w,
    containerHeight: h,
    colors,
  };

  switch (bub.type) {
    case 'sensor':
      // Sensore stanza (es: temp, umidità, ecc.)
      return html`<bubble-sensor .entityConf=${bub} .hass=${hass} .containerWidth=${w} .containerHeight=${h} .colors=${colors}></bubble-sensor>`;
    case 'mushroom':
      // Mushroom entità (lampada, climate, ecc.)
      return html`<bubble-mushroom .entityConf=${bub} .hass=${hass} .containerWidth=${w} .containerHeight=${h} .colors=${colors}></bubble-mushroom>`;
    case 'subbutton':
      // Subbutton azione rapida
      return html`<bubble-subbutton .entityConf=${bub} .hass=${hass} .containerWidth=${w} .containerHeight=${h} .colors=${colors}></bubble-subbutton>`;
    default:
      // Nome stanza o fallback (bubble-name)
      return html`<bubble-name .entityConf=${bub} .hass=${hass} .containerWidth=${w} .containerHeight=${h} .colors=${colors}></bubble-name>`;
  }
}

// Registra il custom element su Home Assistant
customElements.define('bubble-room', BubbleRoom);
