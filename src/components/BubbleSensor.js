// src/components/BubbleSensor.js

import { LitElement, html, css } from 'lit';
import { SENSOR_TYPE_MAP } from '../helpers/sensor-mapping.js';

export class BubbleSensor extends LitElement {
  static properties = {
    type: { type: String },
    value: { type: String },
    unit: { type: String },
    icon: { type: String }
  };

  static styles = css`
    .sensor-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .sensor-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .sensor-icon,
    .sensor-emoji {
      display: inline-block;
      vertical-align: middle;
      margin-right: 4px;
      /* font-size and icon-size are set dynamically */
      transition: font-size 0.1s;
    }
    .sensor-text {
      display: inline-block;
      white-space: nowrap;
      vertical-align: middle;
      /* font-size is set dynamically */
      transition: font-size 0.1s;
    }
  `;

  constructor() {
    super();
    this.type = '';
    this.value = '';
    this.unit = '';
    this.icon = '';
    this._resizeObserver = null;
  }

  firstUpdated() {
    this._resizeObserver = new ResizeObserver(() => this._resizeFont());
    this._resizeObserver.observe(this.shadowRoot.querySelector('.sensor-container'));
    this._resizeFont();
  }

  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    super.disconnectedCallback();
  }

  _resizeFont() {
    const container = this.shadowRoot.querySelector('.sensor-container');
    const content = this.shadowRoot.querySelector('.sensor-content');
    if (!container || !content) return;

    // Imposta dimensioni massime/minime
    let maxFont = 60, minFont = 10, fontSize = maxFont;
    content.style.fontSize = `${fontSize}px`;

    // Riduci font finché non entra tutto
    while (
      (content.scrollWidth > container.clientWidth || content.scrollHeight > container.clientHeight)
      && fontSize > minFont
    ) {
      fontSize -= 1;
      content.style.fontSize = `${fontSize}px`;
    }

    // Ridimensiona anche l’icona, emoji o ha-icon
    const icon = this.shadowRoot.querySelector('.sensor-icon') || this.shadowRoot.querySelector('.sensor-emoji');
    if (icon) {
      icon.style.fontSize = `${fontSize}px`;
      icon.style.width = `${fontSize}px`;
      icon.style.height = `${fontSize}px`;
    }
    const text = this.shadowRoot.querySelector('.sensor-text');
    if (text) {
      text.style.fontSize = `${fontSize}px`;
    }
  }

  render() {
    // Supporta sia emoji che icona (mdi)
    let emoji = '';
    let unit = this.unit || '';
    if (SENSOR_TYPE_MAP[this.type]) {
      emoji = SENSOR_TYPE_MAP[this.type].emoji;
      if (!unit) unit = SENSOR_TYPE_MAP[this.type].unit || '';
    }
    return html`
      <div class="sensor-container">
        <div class="sensor-content">
          ${this.icon
            ? html`<ha-icon class="sensor-icon" .icon="${this.icon}"></ha-icon>`
            : html`<span class="sensor-emoji">${emoji}</span>`
          }
          <span class="sensor-text">${this.value}${unit}</span>
        </div>
      </div>
    `;
  }
}

customElements.define('bubble-sensor', BubbleSensor);