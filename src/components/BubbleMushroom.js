// src/components/BubbleMushroom.js
import { LitElement, html, css } from 'lit';

/**
 * Dispone fino a 7 entità:
 * 1..5  → layout radiale sullo sfondo (rettangolo + bordo destro arrotondato)
 * 6     → camera: angolo alto-destro DENTRO l’area (più piccola delle altre)
 * 7     → climate: angolo basso-sinistra DENTRO l’area
 *
 * Ogni entità può avere offset opzionali:
 *   dx: spostamento orizzontale in px (positivo = destra)
 *   dy: spostamento verticale   in px (positivo = giù)
 *
 * Riconoscimento camera/climate:
 *  - e.slot === 'camera' / 'climate'   (oppure e.role)
 *  - dominio entity_id: camera.* / climate.*
 *  - fallback: indice 5 (camera), indice 6 (climate)
 */
export class BubbleMushroom extends LitElement {
  static properties = {
    entities: { type: Array },
  };

  constructor() {
    super();
    this.entities = [];
    this._size = { width: 0, height: 0 };
    this._ro = new ResizeObserver(() => this._measure());
  }

  connectedCallback() {
    super.connectedCallback();
    this._ro.observe(this);
  }
  disconnectedCallback() {
    this._ro.disconnect();
    super.disconnectedCallback();
  }

  _measure() {
    const r = this.getBoundingClientRect();
    this._size = { width: r.width, height: r.height };
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

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      contain: layout paint size;
    }
    .mushroom-entity {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      /* nessun background fisso qui; il parent/sfondo gestisce l’estetica */
    }
    .mushroom-entity ha-icon {
      display: block;
    }
  `;

  render() {
    const { width, height } = this._size;
    if (!width || !height) return html``; // attende la prima misura

    // ---------- dimensione dinamica delle bolle (diametro) ----------
    // Interpola tra mobile e desktop + “media” che tiene stabile la scala
    const vp = window.innerWidth || width;
    const kMobile  = 0.32; // diametro = 32% del lato effettivo (mobile)
    const kDesktop = 0.18; // diametro = 18% (desktop)
    const wMobile  = 480;
    const wDesk    = 1024;

    let k;
    if (vp <= wMobile) k = kMobile;
    else if (vp >= wDesk) k = kDesktop;
    else {
      const t = (vp - wMobile) / (wDesk - wMobile);
      k = kMobile + (kDesktop - kMobile) * t;
    }

    // limita l’effetto “allargo solo in orizzontale”
    const Rmax  = 1.6; // rapporto massimo W/H considerato
    const effW  = Math.min(width, height * Rmax);
    const eff   = (effW + height) / 2; // media per stabilizzare
    const size  = eff * k;             // diametro standard delle bolle
    const pad   = Math.max(6, size * 0.08); // padding interno minimo

    // Piccolo riduttore per la camera
    const cameraScale = 0.75;

    // ---------- geometria dello sfondo (rett + bordo arrotondato dx) ----------
    // border-radius: 0 60% 60% 0  ⇒ ellisse a destra con rX/rY
    const rX = width  * 0.60;
    const rY = height * 0.60;
    const cX = width  - rX;        // centro ellisse (x)
    const cY = height * 0.5;       // centro ellisse (y)

    // Raggio "interno" all’ellisse che tiene la bolla interamente dentro
    const rXi = Math.max(0, rX - (size * 0.5 + pad));
    const rYi = Math.max(0, rY - (size * 0.5 + pad));

    // Punto "piatto" (prima della curva): colonna dove inizia l’arco
    // Per un bordo destro arrotondato, l’inizio della curva è a x = width - rX.
    // Per appoggiare una bolla su quel bordo, tolgo metà diametro + pad.
    const flatX = Math.max(size * 0.5 + pad, (width - rX) - (size * 0.5 + pad));

    // Angoli per le due bolle sull’arco (leggermente più chiuse per stare dentro)
    const aTop  = -35 * Math.PI / 180; // -35° (arco alto)
    const aBot  =  35 * Math.PI / 180; // +35° (arco basso)

    // ---------- posizioni base (5) ----------
    const positions = [
      // 1) alto-sinistra (appoggiata al bordo interno)
      { x: size * 0.5 + pad,               y: size * 0.5 + pad },
      // 2) in alto, subito prima della curva destra
      { x: flatX,                          y: size * 0.5 + pad },
      // 3) sull’arco alto a destra (nell’ellisse, dentro il bordo)
      { x: cX + rXi * Math.cos(aTop),      y: cY + rYi * Math.sin(aTop) },
      // 4) sull’arco basso a destra
      { x: cX + rXi * Math.cos(aBot),      y: cY + rYi * Math.sin(aBot) },
      // 5) in basso, subito prima della curva destra
      { x: flatX,                          y: height - (size * 0.5 + pad) },
    ];

    // helper dominio
    const domainOf = (id) => (id && id.includes('.')) ? id.split('.')[0] : '';

    return html`
      ${this.entities.map((e, i) => {
        // base
        let d = size;
        let pos = positions[i] ?? { x: cX, y: cY }; // default al centro ellisse

        // riconoscimenti speciali
        const domain    = domainOf(e.entity_id);
        const isCamera  = e?.slot === 'camera'  || e?.role === 'camera'  || domain === 'camera'  || (i === 5 && this.entities.length >= 6);
        const isClimate = e?.slot === 'climate' || e?.role === 'climate' || domain === 'climate' || (i === 6 && this.entities.length >= 7);

        if (isCamera) {
          d = size * cameraScale;
          const p = Math.max(6, d * 0.08);
          // angolo alto-destro DENTRO l’area
          pos = {
            x: width  - (d * 0.5 + p),
            y:        (d * 0.5 + p),
          };
        } else if (isClimate) {
          // angolo basso-sinistra DENTRO l’area
          const p = pad;
          pos = {
            x: (d * 0.5 + p),
            y: height - (d * 0.5 + p),
          };
        }

        // micro-aggiustamenti opzionali
        if (typeof e.dx === 'number') pos.x += e.dx;
        if (typeof e.dy === 'number') pos.y += e.dy;

        return html`
          <div
            class="mushroom-entity"
            style="
              left:${pos.x}px;
              top:${pos.y}px;
              width:${d}px;
              height:${d}px;
              color:${e.color ?? 'inherit'};
            "
            @click=${() => this._handleClick(e)}
          >
            <ha-icon
              icon="${e.icon}"
              style="--mdc-icon-size:${d * 0.6}px;"
            ></ha-icon>
          </div>
        `;
      })}
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);
