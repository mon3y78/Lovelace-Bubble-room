// src/components/BubbleSensors.js

import { LitElement, html, css } from 'lit';

export class BubbleSensors extends LitElement {
  static properties = {
    sensors: { type: Array }, // [{icon, label, value, unit, color}]
  };
  
  static styles = css`
    .sensor-row {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      flex-wrap: wrap;
      border: 2px solid limegreen;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      margin-left: 0 !important;
      margin-right: 0 !important;
      display: flex;
      gap: 18px;
      justify-content: flex-start;
      margin-bottom: 2px;
      margin-left: 2px;
      border: 2px solid #00e676 !important;
    }
    .sensor-pill {
      background: rgba(32,38,55,0.12);
      border-radius: 18px;
      padding: 0.27em 1.01em 0.27em 0.73em;
      display: flex;
      align-items: center;
      gap: 0.5em;
      font-size: 1.09em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      min-width: 52px;
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