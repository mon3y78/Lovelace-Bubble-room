// src/components/BubbleMushroom.js
import { LitElement, html, css } from 'lit';

export class BubbleMushroom extends LitElement {
  static properties = {
    // Array: { entity_id, icon, color, dx?, dy?, tap_action?, hold_action? }
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

  _handleClick(entity) {
    this.dispatchEvent(new CustomEvent('hass-action', {
      detail: {
        config: {
          entity: entity.entity_id,
          tap_action:  entity.tap_action  || { action: 'toggle' },
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
      pointer-events: auto;
    }
    .mushroom-entity ha-icon { display: block; }
  `;

  render() {
    const { width, height } = this._containerSize;
    if (!width || !height) return html``;

    // --- dimensione dinamica entità (mobile -> desktop, interpolata)
    const vpWidth  = window.innerWidth || width;
    const kMobile  = 0.55;    // diametro = 30% lato effettivo
    const kDesktop = 0.25;    // diametro = 10% lato effettivo
    const wMobile  = 100;
    const wDesktop = 200;

    let k;
    if (vpWidth <= wMobile)      k = kMobile;
    else if (vpWidth >= wDesktop) k = kDesktop;
    else {
      const t = (vpWidth - wMobile) / (wDesktop - wMobile);
      k = kMobile + (kDesktop - kMobile) * t;
    }

    // lato effettivo per non esplodere in orizzontale
    const Rmax  = 1.6;
    const sideW = Math.min(width, height * Rmax);
    const side  = 0.5 * (height + sideW);
    const size  = side * k; // diametro della bolla

    // --- ellisse reale come da CSS (border-radius: 0 60% 60% 0) con clamping
    const rxRaw  = width  * 0.60;
    const ryRaw  = height * 0.60;
    const scaleH = Math.min(1, width  / (rxRaw * 2));
    const scaleV = Math.min(1, height / (ryRaw * 2));
    const rX     = rxRaw * scaleH;
    const rY     = ryRaw * scaleV;
    const cX     = width - rX;
    const cY     = height * 0.5;

    // padding base per non “sanguinare” fuori
    const padBase = Math.max(4, Math.min(width, height) * 0.015);

    // helper per gradi → radianti
    const deg = (d) => (Math.PI * d) / 180;

    // gap interno tra cerchio entità e bordo dello sfondo (contatto)
    const touchPad = 1; // px (0 = a filo)

    // raggi “di contatto” (centro della bolla che tocca il bordo)
    const rArcX = Math.max(0, rX - (size / 2) - touchPad);
    const rArcY = Math.max(0, rY - (size / 2) - touchPad);

    // inizio reale della curva sul lato piatto (se dovesse servire altrove)
    const flatX = cX - rX + padBase + (size / 2);

    // angoli:
    // 0° = punta a destra; -90° = in alto; +90° = in basso
    const a30  = deg(30);    // arco alto/basso “classico”
    const aFlat = deg(64);   // più grande => più a destra (dove la curva “prende”)

    // #1 appoggiata ai bordi top+left del rettangolo piatto
    const contactX = (size / 2) + touchPad;
    const contactY = (size / 2) + touchPad;

    // POSIZIONI DEFINITIVE (1..5)
    // 1: alto-sx appoggiata; 2: arco alto più a destra; 3: arco alto-destra;
    // 4: arco basso-destra;   5: arco basso più a destra.
    const positions = [
      { x: contactX, y: contactY },                                           // #1
      { x: cX + rArcX * Math.cos(-aFlat), y: cY + rArcY * Math.sin(-aFlat) }, // #2
      { x: cX + rArcX * Math.cos(-a30),   y: cY + rArcY * Math.sin(-a30)   }, // #3
      { x: cX + rArcX * Math.cos(+a30),   y: cY + rArcY * Math.sin(+a30)   }, // #4
      { x: cX + rArcX * Math.cos(+aFlat), y: cY + rArcY * Math.sin(+aFlat) }, // #5
    ];

    // RENDER
    return html`
      ${this.entities.map((e, i) => {
        const pos  = positions[i] ?? { x: cX, y: cY };
        const left = pos.x + (e.dx ?? 0);
        const top  = pos.y + (e.dy ?? 0);
        return html`
          <div
            class="mushroom-entity"
            style="
              left:${left}px;
              top:${top}px;
              width:${size}px;
              height:${size}px;
              color:${e.color};
            "
            @click=${() => this._handleClick(e)}
          >
            <ha-icon icon="${e.icon}" style="--mdc-icon-size:${size * 0.6}px;"></ha-icon>
          </div>
        `;
      })}
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);