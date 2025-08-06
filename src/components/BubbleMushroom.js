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
    this.dispatchEvent(new CustomEvent('hass-action', {
      detail: {
        config: {
          entity:      entity.entity_id,
          tap_action:  entity.tap_action  || { action: 'toggle'     },
          hold_action: entity.hold_action || { action: 'more-info' },
        },
        action: 'tap',
      },
      bubbles: true,
      composed: true,
    }));
  }

  /* ─────────────── CSS ─────────────── */
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      contain: strict;
    }
    .mushroom-entity {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(0,0,0,0.25);
      z-index: 1;
    }
    .mushroom-entity ha-icon {
      display: block;
    }
  `;

  /* ─────────────── Render ─────────────── */
  render() {
    const { width, height } = this._containerSize;
    if (!width || !height) return html``;               // prima misura

    /* dimensione bolla = 18 % del lato minore */
    const side = Math.min(width, height);
    const size = side * 0.18;

    /* ellisse del bordo destro (border-radius: 0 60% 60% 0) */
    const rX = width  * 0.60;
    const rY = height * 0.60;
    const cX = width  - rX;        // centro ellisse
    const cY = height * 0.5;

    /* raggi interni (centro bolla resta dentro il rettangolo) */
    const rXi = rX - size * 0.5;
    const rYi = rY - size * 0.5;

    /* coordinate piatte per i lati orizzontali */
    const flatX = (width - rX) - size * 0.5;

    /* 5 posizioni fisse */
    const positions = [
      { x: size * 0.5, y: size * 0.5 },                        // alto-sx
      { x: flatX,      y: size * 0.5 },                        // lato alto
      { x: cX + rXi * Math.cos(-Math.PI/3),
        y: cY + rYi * Math.sin(-Math.PI/3) },                  // arco alto
      { x: cX + rXi * Math.cos( Math.PI/3),
        y: cY + rYi * Math.sin( Math.PI/3) },                  // arco basso
      { x: flatX,      y: height - size * 0.5 },               // lato basso
    ];

    return html`
      ${this.entities.map((ent, idx) => {
        const pos = positions[idx] ?? { x: cX, y: cY };
        return html`
          <div  class="mushroom-entity"
                style="left:${pos.x}px; top:${pos.y}px;
                       width:${size}px; height:${size}px; color:${ent.color};"
                @click=${() => this._handleClick(ent)}>
            <ha-icon icon="${ent.icon}"
                     style="--mdc-icon-size:${size * 0.6}px;"></ha-icon>
          </div>`;
      })}
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);
