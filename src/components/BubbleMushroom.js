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
      z-index: 1;
      pointer-events: auto;
    }
    .mushroom-entity ha-icon { display: block; }
  `;

  render() {
    const { width, height } = this._containerSize;
    if (!width || !height) return html``;

    // dimensione dinamica (mobile -> desktop)
    const vpWidth  = window.innerWidth || width;
    const kMobile  = 0.55;
    const kDesktop = 0.25;
    const wMobile  = 100;
    const wDesktop = 200;

    let k;
    if (vpWidth <= wMobile)        k = kMobile;
    else if (vpWidth >= wDesktop)  k = kDesktop;
    else {
      const t = (vpWidth - wMobile) / (wDesktop - wMobile);
      k = kMobile + (kDesktop - kMobile) * t;
    }

    // lato effettivo per non “allargare” troppo
    const Rmax  = 1.6;
    const sideW = Math.min(width, height * Rmax);
    const side  = 0.5 * (height + sideW);
    const size  = side * k; // diametro standard bolla

    // ellisse (border-radius: 0 60% 60% 0) con clamping
    const rxRaw  = width  * 0.60;
    const ryRaw  = height * 0.60;
    const scaleH = Math.min(1, width  / (rxRaw * 2));
    const scaleV = Math.min(1, height / (ryRaw * 2));
    const rX     = rxRaw * scaleH;
    const rY     = ryRaw * scaleV;
    const cX     = width - rX;
    const cY     = height * 0.5;

    const padBase  = Math.max(4, Math.min(width, height) * 0.015);
    const touchPad = 1; // 0 = a filo

    // raggi per il contatto (centro bolla che “tocca” il bordo)
    const rArcX = Math.max(0, rX - (size / 2) - touchPad);
    const rArcY = Math.max(0, rY - (size / 2) - touchPad);

    const deg = (d) => (Math.PI * d) / 180;

    // angoli
    const a30   = deg(30);
    const aFlat = deg(85); // più grande = più a destra lungo la curva

    // #1: appoggiata in alto-sinistra (dentro lo sfondo)
    const contactX = (size / 2) + touchPad;
    const contactY = (size / 2) + touchPad;

    // POSIZIONI 1..7 (geometria invariata)
    const positions = [
      // 1
      { x: contactX, y: contactY },
      // 2 (arco alto, vicino all'inizio curvatura)
      { x: cX + rArcX * Math.cos(-aFlat), y: cY + rArcY * Math.sin(-aFlat) },
      // 3 (arco alto-destra)
      { x: cX + rArcX * Math.cos(-a30),   y: cY + rArcY * Math.sin(-a30)   },
      // 4 (arco basso-destra)
      { x: cX + rArcX * Math.cos(+a30),   y: cY + rArcY * Math.sin(+a30)   },
      // 5 (arco basso, vicino all'inizio curvatura)
      { x: cX + rArcX * Math.cos(+aFlat), y: cY + rArcY * Math.sin(+aFlat) },

      // 6 = CAMERA → angolo alto-destra, **dentro** l’area
      { x: width - (size / 2) - padBase, y: (size / 2) + padBase },

      // 7 = CLIMATE → angolo basso-sinistra, dentro lo sfondo
      { x: (size / 2) + touchPad, y: height - (size / 2) - touchPad },
    ];

    // fattore solo per la camera (6ª entità)
    const cameraScale = 0.75;

    return html`
      ${this.entities.map((e, i) => {
        const pos  = positions[i] ?? { x: cX, y: cY };

        // diametro per-ENTITÀ (camera più piccola)
        const d = (i === 5) ? size * cameraScale : size;
        const iconSize = d * 0.95;

        const left = pos.x + (e.dx ?? 0);
        const top  = pos.y + (e.dy ?? 0);

        return html`
          <div
            class="mushroom-entity"
            style="
              left:${left}px;
              top:${top}px;
              width:${d}px;
              height:${d}px;
              color:${e.color};
            "
            @click=${() => this._handleClick(e)}
          >
            <ha-icon icon="${e.icon}" style="--mdc-icon-size:${iconSize}px;"></ha-icon>
          </div>
        `;
      })}
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);
