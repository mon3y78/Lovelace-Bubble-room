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
    this._ro = new ResizeObserver(() => this._updateSize());
  }

  connectedCallback() {
    super.connectedCallback();
    this._ro.observe(this);
  }
  disconnectedCallback() {
    this._ro.disconnect();
    super.disconnectedCallback();
  }

  _updateSize() {
    const r = this.getBoundingClientRect();
    this._containerSize = { width: r.width, height: r.height };
    this.requestUpdate();
  }

  _handleClick(ent) {
    this.dispatchEvent(new CustomEvent('hass-action', {
      detail: {
        config: {
          entity:      ent.entity_id,
          tap_action:  ent.tap_action  || { action: 'toggle' },
          hold_action: ent.hold_action || { action: 'more-info' },
        },
        action: 'tap',
      },
      bubbles: true,
      composed: true,
    }));
  }

  /* —————————————————— CSS —————————————————— */
  static styles = css`
    :host {
      display: block;
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
      background: rgba(0,0,0,0.25);
      z-index: 1;
    }
    .mushroom-entity ha-icon {
      display: block;
    }
  `;

  /* —————————————————— Render —————————————————— */
  render() {
    const { width, height } = this._containerSize;
    if (!width || !height) return html``;

    /* coefficiente k in funzione del viewport */
    const vp        = window.innerWidth;
    const kMobile   = 0.5;
    const kDesktop  = 0.2;
    const wMobile   = 100;
    const wDesktop  = 200;

    let k;
    if (vp <= wMobile) k = kMobile;
    else if (vp >= wDesktop) k = kDesktop;
    else {
      const t = (vp - wMobile) / (wDesktop - wMobile);
      k = kMobile + (kDesktop - kMobile) * t;
    }

    /* lato “effettivo” per mantenere proporzioni quando allarghi */
    const Rmax  = 1.6;
    const sideH = height;
    const sideW = Math.min(width, height * Rmax);
    const side  = 0.5 * (sideH + sideW);

    const size = side * k;

    /* semicerchio destro */
    const rX  = width  * 0.60;
    const rY  = height * 0.60;
    const cX  = width  - rX;
    const cY  = height * 0.5;
    const rXi = rX - size * 0.5;
    const rYi = rY - size * 0.5;

    const flatX = width * 0.33;
    const a45   = Math.PI / 4;   // 45°

    const positions = [
      { x: size * 0.5, y: size * 0.5 },
      { x: flatX,      y: size * 0.5 },
      { x: cX + rXi * Math.cos(-a45), y: cY + rYi * Math.sin(-a45) },
      { x: cX + rXi * Math.cos( a45), y: cY + rYi * Math.sin( a45) },
      { x: flatX,      y: height - size * 0.5 },
    ];

    return html`
      ${this.entities.map((e, i) => {
        const p = positions[i] ?? { x: cX, y: cY };
        return html`
          <div
            class="mushroom-entity"
            style="
              left:${p.x}px;
              top:${p.y}px;
              width:${size}px;
              height:${size}px;
              color:${e.color};
            "
            @click=${() => this._handleClick(e)}
          >
            <ha-icon
              icon="${e.icon}"
              style="--mdc-icon-size:${size * 1}px;"
            ></ha-icon>
          </div>
        `;
      })}
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);
