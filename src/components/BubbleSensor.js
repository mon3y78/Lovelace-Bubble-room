// src/components/BubbleSensor.js

import { LitElement, html, css } from 'lit';
import { SENSOR_TYPE_MAP } from '../helpers/sensor-mapping.js';

export class BubbleSensor extends LitElement {
  static properties = {
    sensors: { type: Array },
  };
  
  constructor() {
    super();
    this.sensors = [];
    this._resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => this._autoScaleAll());
    });
  }
  
  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver.observe(this);
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver.disconnect();
  }
  
  updated(changedProperties) {
    if (changedProperties.has('sensors')) {
      requestAnimationFrame(() => this._autoScaleAll());
    }
  }
  
  _autoScaleAll() {
    const values = this.renderRoot?.querySelectorAll('.sensor-value');
    if (!values) return;
    values.forEach(el => this._autoScaleValueFont(el));
  }
  
  _autoScaleValueFont(element) {
    const parent = element?.parentElement;
    if (!parent) return;
    
    const maxWidth = parent.clientWidth * 0.48;
    const maxHeight = parent.clientHeight * 0.75;
    const maxSize = Math.min(maxWidth, maxHeight);
    
    if (maxSize <= 0) return;
    
    element.style.fontSize = '';
    let fontSize = parseInt(getComputedStyle(element).fontSize, 10) || 14;
    
    while (fontSize > 8) {
      element.style.fontSize = `${fontSize}px`;
      const { width, height } = element.getBoundingClientRect();
      if (width <= maxWidth && height <= maxHeight) break;
      fontSize--;
    }
    
    element.style.fontSize = `${fontSize}px`;
  }
  
  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      contain: strict;
    }

    .sensor-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 1fr;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    .sensor-pill {
      display: flex;
      align-items: center;
      background: rgba(32,38,55,0.12);
      border-radius: 18px;
      font-size: 1em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      contain: strict;
    }

    .sensor-icon {
      font-size: 1.14em;
      opacity: 0.81;
    }
    .sensor-label {
      opacity: 0.78;
      font-size: 0.89em;
      font-weight: 600;
    }
    .sensor-value {
      font-weight: 700;
      font-size: 1.07em;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
      line-height: 1;
    }
    .sensor-unit {
      opacity: 0.75;
      font-size: 0.89em;
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

customElements.define('bubble-sensor', BubbleSensor);