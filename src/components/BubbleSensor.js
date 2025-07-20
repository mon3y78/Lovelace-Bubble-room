/**
 * BubbleSensor.js
 * Componente dedicato alla visualizzazione di un singolo sensore ambientale per la Bubble Room card.
 * Autore: mon3y78 (https://github.com/mon3y78)
 */

import { LitElement, html, css } from 'lit';

export class BubbleSensor extends LitElement {
  static properties = {
    entity: { type: String },
    value: { type: String },
    unit: { type: String },
    icon: { type: String },
    emoji: { type: String }
  };
  
  static styles = css`
    /* Aggiungere qui gli stili del sensore */
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      /* padding: 4px; */
    }
    .sensor-content {
      display: flex;
      align-items: center;
      font-size: 1.2em;
    }
    .sensor-icon {
      margin-right: 4px;
    }
  `;
  
  constructor() {
    super();
    this.entity = '';
    this.value = '';
    this.unit = '';
    this.icon = '';
    this.emoji = '';
  }
  
  render() {
    // Componente di base, non ancora collegato a hass
    return html`
      <div class="sensor-content">
        <span class="sensor-icon">${this.emoji || ''}</span>
        <span class="sensor-value">${this.value}</span>
        <span class="sensor-unit">${this.unit}</span>
      </div>
    `;
  }
}

customElements.define('bubble-sensor', BubbleSensor);