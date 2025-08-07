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

    // raggio interno: togli metà bolla + un padding
    const padBase = Math.max(4, Math.min(width, height) * 0.015);
    const rXi     = Math.max(0, rX - (size / 2) - padBase);
    const rYi     = Math.max(0, rY - (size / 2) - padBase);

    // inizio reale della curva sul lato piatto
    const flatX = cX - rX + padBase + (size / 2);

    // angoli utili
    const a30 = Math.PI / 6; // 30°
    const arcShrink = size * 0.04; // micro rientro per i punti sull’arco

    // --- POSIZIONI PREDEFINITE (calcolate PRIMA del map!)
    const positions = [
      // 0: alto-sx interno
      { x: Math.max(size * 0.5 + padBase, size * 0.5), y: size * 0.5 + padBase },
      // 1: lato piatto in alto
      { x: flatX, y: size * 0.5 + padBase },
      // 2: arco alto-destra (-30°)
      { x: cX + (rXi - arcShrink) * Math.cos(-a30),
        y: cY + (rYi - arcShrink) * Math.sin(-a30) },
      // 3: arco basso-destra (+30°)
      { x: cX + (rXi - arcShrink) * Math.cos(+a30),
        y: cY + (rYi - arcShrink) * Math.sin(+a30) },
      // 4: lato piatto in basso
      { x: flatX, y: height - (size * 0.5 + padBase) },
    ];

    // --- RENDER
    return html`
      ${this.entities.map((e, i) => {
        const pos = (positions[i] || { x: cX, y: cY });
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
