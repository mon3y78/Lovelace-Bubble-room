/**
 * BubbleSensor.js
 * 
 * Componente che visualizza i sensori della stanza nella card Bubble Room.
 * File completo.
 */

import { html, css, LitElement } from 'lit';

export class BubbleSensor extends LitElement {
  static properties = {
    sensors: { type: Array }
  };

  constructor() {
    super();
    this.sensors = [];
  }

  static styles = css`
    .sensor-row {
      display: flex;
      gap: 14px;
      justify-content: center;
      align-items: baseline;
      margin-bottom: 0.2em;
    }
    .sensor-pill {
      background: rgba(40,40,40,0.10);
      border-radius: 18px;
      padding: 0.2em 0.8em 0.2em 0.55em;
      display: flex;
      align-items: center;
      gap: 0.45em;
      font-size: 1.11em;
      min-width: 45px;
    }
    .sensor-icon {
      font-size: 1.2em;
      opacity: 0.78;
    }
    .sensor-value {
      font-weight: bold;
      font-variant-numeric: tabular-nums;
    }
    .sensor-unit {
      opacity: 0.6;
      font-size: 0.92em;
      margin-left: 0.13em;
    }
  `;

  render() {
    return html`
      <div class="sensor-row">
        ${this.sensors.map(
          (sensor) => html`
            <div class="sensor-pill" style="color: ${sensor.color || '#fff'}">
              <ha-icon class="sensor-icon" .icon="${sensor.icon}"></ha-icon>
              <span class="sensor-value">${sensor.value ?? '--'}</span>
              <span class="sensor-unit">${sensor.unit || ''}</span>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('bubble-sensor', BubbleSensor);
