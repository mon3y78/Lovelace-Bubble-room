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
      z-index: 1;  
    }

    .mushroom-entity ha-icon {
      display: block;
    }
  `;

  render() {
    const { width, height } = this._containerSize;
    const ratio = 0.2;
    // centro del rettangolo con la main-icon
    const cx = width  * 0.5;
    const cy = height * 0.5;

    // raggio proporzionale: 45 % del lato minore
    const r = side * 0.5 - size * 0.5 - 2;

    // cinque angoli equidistanti (in gradi) lungo la curva interna
    const deg = [-135, -112.5, -90, -67.5, -45];
    const rad = deg.map(d => d * Math.PI / 180);

    // coordinate finali delle bolle
    const positions = rad.map(a => ({
      x: cx + r * Math.cos(a),
      y: cy + r * Math.sin(a),
    }));


    return html`
      <div class="mushroom-container">
        ${this.entities.map((entity, index) => {
          const pos = positions[index] ?? { x: cx, y: cy };
          const size = Math.min(width, height) * ratio;
          const left = pos.x;
          const top  = pos.y;
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
