// src/components/BubbleSensors.js

import { LitElement, html, css } from 'lit';

export class BubbleSensors extends LitElement {
  static properties = {
    sensors: { type: Array }, // [{icon, label, value, unit, color}]
  };
  
  static styles = css`
    .sensor-row {
      display: flex;
      flex-wrap: wrap;         /* importante per ridimensionare */
      gap: 18px;               /* mantiene lo spazio fra pillole */
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      margin: 0 0 2px;         /* solo margin-bottom 2px */
      padding: 0;
      border: 2px solid #00e676 !important;
    }
    .sensor-pill {
      flex: 1 1 30%;           /* occupano circa 30% l’una, riducendosi */
      min-width: 0;            /* lasciale “schiacciare” se serve */
      box-sizing: border-box;
      margin: 0;               /* togli eventuali margin-left duplicati */
      padding: 0.27em 1em; 
      background: rgba(32,38,55,0.12);
      border-radius: 18px;
      display: flex;
      align-items: center;
      gap: 0.5em;
      font-size: 1.09em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      max-width: 132px;
      letter-spacing: 0.01em;
    }
    .sensor-icon {
      font-size: 1.14em;
      opacity: 0.81;
    }
    .sensor-label {
      opacity: 0.78;
      font-size: 0.98em;
      margin-right: 0.28em;
      font-weight: 600;
    }
    .sensor-value {
      font-weight: 700;
      font-size: 1.07em;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
    }
    .sensor-unit {
      opacity: 0.75;
      font-size: 0.89em;
      margin-left: 0.12em;
      font-weight: 600;
    }
  `;
  
  render() {
    // Divide in due righe (3+3 sensori)
    const row1 = this.sensors?.slice(0, 3) || [];
    const row2 = this.sensors?.slice(3, 6) || [];
    return html`
      <div class="sensor-row">
        ${row1.map(sensor => html`
          <div class="sensor-pill" style="margin: 0; padding: 0; width: 100%; box-sizing: border-box; color: ${sensor.color || '#e3f6ff'}">
            <ha-icon class="sensor-icon" .icon="${sensor.icon}"></ha-icon>
            <span class="sensor-label">${sensor.label || ''}</span>
            <span class="sensor-value">${sensor.value ?? '--'}</span>
            <span class="sensor-unit">${sensor.unit || ''}</span>
          </div>
        `)}
      </div>
      ${row2.length ? html`
        <div class="sensor-row">
          ${row2.map(sensor => html`
            <div class="sensor-pill" style="margin: 0; padding: 0; width: 100%; box-sizing: border-box; color: ${sensor.color || '#e3f6ff'}">
              <ha-icon class="sensor-icon" .icon="${sensor.icon}"></ha-icon>
              <span class="sensor-label">${sensor.label || ''}</span>
              <span class="sensor-value">${sensor.value ?? '--'}</span>
              <span class="sensor-unit">${sensor.unit || ''}</span>
            </div>
          `)}
        </div>
      ` : ''}
    `;
  }
}

customElements.define('bubble-sensors', BubbleSensors);