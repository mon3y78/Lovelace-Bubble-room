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
    super.connectedCallback();
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

  render() {
    const { width, height } = this._containerSize;
    if (!width || !height) return html``;                // prima misura utile

    /* dimensione di ogni bolla = 18 % del lato minore */
    /* ── diametro con coefficiente che “slimma” al crescere della larghezza ── */
    const side = Math.min(width, height);

    /*  k varia da 0.22 (fino a 400 px) a 0.16 (≥ 1400 px)  */
    const k = 0.30 - 0.06 * Math.min(width, 1000) / 1000;

    const size = side * k;          // diametro finale della bolla


    /* ellisse della curva destra (border-radius: 0 60% 60% 0) */
    const rX = width  * 0.60;
    const rY = height * 0.60;
    const cX = width  - rX;          // centro ellisse (x)
    const cY = height * 0.5;         // centro ellisse (y)

    /* raggi interni (centro bolla deve restare dentro) */
    const rXi = rX - size * 0.5;
    const rYi = rY - size * 0.5;

    /* lato piatto: usiamo ~33 % larghezza per #1 e #4 */
    const flatX = width * 0.33;

    /* angolo per punti su ellisse */
    const a45 = Math.PI / 4; // 45°

    /* posizioni finali */
    const positions = [
      { x: size * 0.5, y: size * 0.5 },                             // 0  angolo alto-sx
      { x: flatX,      y: size * 0.5 },                             // 1  lato alto, prima curva
      { x: cX + rXi * Math.cos(-a45), y: cY + rYi * Math.sin(-a45) }, // 2  arco alto (−45°)
      { x: cX + rXi * Math.cos( a45), y: cY + rYi * Math.sin( a45) }, // 3  arco basso (+45°)
      { x: flatX,      y: height - size * 0.5 },                    // 4  lato basso allineato a #1
    ];

    return html`
      ${this.entities.map((ent, idx) => {
        const pos = positions[idx] ?? { x: cX, y: cY };  // fallback centrale
        return html`
          <div
            class="mushroom-entity"
            style="
              left:${pos.x}px;
              top:${pos.y}px;
              width:${size}px;
              height:${size}px;
              color:${ent.color};
            "
            @click=${() => this._handleClick(ent)}
          >
            <ha-icon
              icon="${ent.icon}"
              style="--mdc-icon-size:${size * 0.6}px;"
            ></ha-icon>
          </div>
        `;
      })}
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);
