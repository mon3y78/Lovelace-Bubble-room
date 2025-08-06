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
      background: rgba(0, 0, 0, 0.25);
      z-index: 1; /* sopra lo sfondo giallo */
      color: var(--mushroom-icon-color, white);
    }

    .mushroom-entity ha-icon {
      display: block;
    }
  `;

  render() {
    const { width, height } = this._containerSize;
    if (!width || !height) return html``;            // prima misurazione

    /* ── dimensione singola bolla ───────────────────────────── */
    const side = Math.min(width, height);            // lato minore
    const size = side * 0.18;                        // Ø bolla = 18 %

    /* ── ellisse del bordo destro (border-radius: 0 60% 60% 0) */
    const rX = width * 0.60;
    const rY = height * 0.60;
    const cX = width - rX;           // centro ellisse (x)
    const cY = height * 0.5;         // centro ellisse (y)

    /* ── raggi “interni” per il CENTRO della bolla ──────────── */
    const rXi = rX - size * 0.5;
    const rYi = rY - size * 0.5;

    /* ── coordinate piatte (lati orizzontali) ───────────────── */
    const flatXcenter = (width - rX) - size * 0.5;   // dove inizia l’arco

    /* ── 5 posizioni finali ─────────────────────────────────── */
    const positions = [
      { x: size * 0.5, y: size * 0.5 },                       // #0 angolo alto-sx
      { x: flatXcenter, y: size * 0.5 },                      // #1 lato alto
      { x: cX + rXi * Math.cos(-Math.PI / 3),                 // #2 ellisse –60 °
        y: cY + rYi * Math.sin(-Math.PI / 3) },
      { x: cX + rXi * Math.cos( Math.PI / 3),                 // #3 ellisse +60 °
        y: cY + rYi * Math.sin( Math.PI / 3) },
      { x: flatXcenter, y: height - size * 0.5 },             // #4 lato basso
    ];

    return html`
      <div class="mushroom-container">
        ${this.entities.map((entity, idx) => {
          const pos = positions[idx] ?? { x: cX, y: cY };      // fallback al centro
          return html`
            <div
              class="mushroom-entity"
              style="
                left:${pos.x}px;
                top:${pos.y}px;
                width:${size}px;
                height:${size}px;
                color:${entity.color};
              "
              @click=${() => this._handleClick(entity)}
            >
              <ha-icon
                icon="${entity.icon}"
                style="--mdc-icon-size:${size * 0.6}px;"
              ></ha-icon>
            </div>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);
