/**
 * BubbleName.js
 * Componente per la visualizzazione del nome della stanza nella Bubble Room card.
 * -----------------------------------------------------------
 * - Mostra il nome della stanza con testo dinamicamente ridimensionato
 *   per occupare tutto lo spazio disponibile nel contenitore.
 * - Usa la funzione centralizzata autoResizeFont da utils.js per
 *   adattare la dimensione del font in base a larghezza e altezza.
 * - Supporta la configurazione del testo (es. testo, colore).
 * - Non gestisce azioni tap o hold.
 * - Layout responsive, senza overflow o scroll.
 * 
 * PROPRIETÀ:
 *  - name: String          (Testo da visualizzare, nome stanza)
 *  - color: String         (Colore del testo)
 *  - containerWidth: Number (Larghezza disponibile)
 *  - containerHeight: Number (Altezza disponibile)
 * 
 * DIPENDENZE:
 *  - helpers/utils.js      (Funzione autoResizeFont(container, text, options))
 * 
 * AUTORE:
 *  - mon3y78 - https://github.com/mon3y78/Lovelace-Bubble-room
 * 
 * LICENZA: MIT
 */

import { LitElement, html, css } from 'lit';
import { autoResizeFont } from '../helpers/utils.js';

export class BubbleName extends LitElement {
  static properties = {
    name: { type: String },
    color: { type: String },
    containerWidth: { type: Number },
    containerHeight: { type: Number },
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .name-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      white-space: nowrap;
      overflow: hidden;
    }
    .name-text {
      display: inline-block;
      white-space: nowrap;
      line-height: 1;
      vertical-align: middle;
      user-select: none;
      color: var(--name-text-color, inherit);
    }
  `;

  constructor() {
    super();
    this.name = '';
    this.color = 'inherit';
    this.containerWidth = 100;
    this.containerHeight = 40;
  }

  updated(changedProps) {
    if (
      changedProps.has('name') ||
      changedProps.has('containerWidth') ||
      changedProps.has('containerHeight')
    ) {
      this.updateComplete.then(() => this._resizeText());
    }
  }

  render() {
    return html`
      <div
        class="name-container"
        style="color: ${this.color}; width:${this.containerWidth}px; height:${this.containerHeight}px;"
      >
        <span class="name-text" id="nameText">${this.name}</span>
      </div>
    `;
  }

  _resizeText() {
    const container = this.renderRoot.querySelector('.name-container');
    const text = this.renderRoot.querySelector('#nameText');
    if (container && text) {
      autoResizeFont(container, text, { minFont: 8, maxFont: 200 });
    }
  }
}

customElements.define('bubble-name', BubbleName);
