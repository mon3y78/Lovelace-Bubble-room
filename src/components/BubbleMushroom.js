// src/components/BubbleMushroom.js

import { LitElement, html, css } from 'lit';

export class BubbleMushroom extends LitElement {
  static properties = {
    entities: { type: Array },
  };

  constructor() {
    super();
    this.entities = [];
    this._containerSize = { width: 0, height: 0 };
    this._resizeObserver = new ResizeObserver(() => this._updateContainerSize());
  }

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver.disconnect();
  }

  _updateContainerSize() {
    const rect = this.getBoundingClientRect();
    this._containerSize = { width: rect.width, height: rect.height };
    this.requestUpdate();
  }

  _handleClick(entity) {
    const event = new CustomEvent('hass-action', {
      detail: {
        config: {
          entity: entity.entity_id,
          tap_action: entity.tap_action || { action: 'toggle' },
          hold_action: entity.hold_action || { action: 'more-info' },
        },
        action: 'tap',
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      contain: strict;
    }

    .mushroom-container {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .mushroom-entity {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(0,0,0,0.2);
    }

    .mushroom-entity ha-icon {
      display: block;
    }
  `;

  render() {
    const { width, height } = this._containerSize;
    const ratio = 0.2;
    const positions = [
      { x: 0.5, y: 0.0 },
      { x: 1.0, y: 0.5 },
      { x: 0.5, y: 1.0 },
      { x: 0.0, y: 0.5 },
      { x: 0.15, y: 0.15 },
      { x: 0.85, y: 0.15 },
    ];

    return html`
      <div class="mushroom-container">
        ${this.entities.map((entity, index) => {
          const pos = positions[index] || { x: 0.5, y: 0.5 };
          const size = width * ratio;
          const left = width * pos.x;
          const top = height * pos.y;
          return html`
            <div
              class="mushroom-entity"
              style="left:${left}px; top:${top}px; width:${size}px; height:${size}px; color: ${entity.color};"
              @click=${() => this._handleClick(entity)}
            >
              <ha-icon icon="${entity.icon}" style="--mdc-icon-size: ${size * 0.6}px;"></ha-icon>
            </div>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);
