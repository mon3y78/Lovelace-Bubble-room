// src/components/BubbleSensors.js

import { LitElement, html, css } from 'lit';
import { SENSOR_TYPE_MAP } from '../helpers/sensor-mapping.js';

export class BubbleSensors extends LitElement {
  static properties = {
    sensors: { type: Array }, // [{icon, label, value, unit, color, device_class}]
  };
  
  static styles = css`
    .sensor-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: auto;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      border: 2px solid #00e676 !important;
    }

    .sensor-pill {
      display: flex;
      align-items: center;
      gap: 0.5em;
      background: rgba(32,38,55,0.12);
      border-radius: 18px;
      padding: 0.6em 1em;
      font-size: 1em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
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
    const sensors = (this.sensors || []).map(sensor => {
      const devClass = sensor.device_class;
      const map = SENSOR_TYPE_MAP[devClass] || {};
      const emoji = map.emoji || '❓';
      const unit = sensor.unit || map.units?.[0] || '';
      return {
        ...sensor,
        label: emoji,
        unit,
      };
    });
    
    return html`
      <div class="sensor-grid">
        ${sensors.map(sensor => html`
          <div class="sensor-pill" style="color: ${sensor.color || '#e3f6ff'}">
            <ha-icon class="sensor-icon" .icon="${sensor.icon || ''}"></ha-icon>
            <span class="sensor-label">${sensor.label || ''}</span>
            <span class="sensor-value">${sensor.value ?? '--'}</span>
            <span class="sensor-unit">${sensor.unit || ''}</span>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('bubble-sensors', BubbleSensors);