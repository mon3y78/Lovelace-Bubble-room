// src/components/BubbleMushroom.js
import { LitElement, html, css } from 'lit';

/**
 * BubbleMushroom
 * ------------------------------------------------------------------
 * Dispone 5 "bolle" (entità) attorno all'icona principale della stanza.
 *
 * COME MODIFICARE LA POSIZIONE (senza toccare il codice JS)
 * - Per micro-aggiustamenti su una singola entità: usa nel YAML i campi
 *   dx / dy (in pixel). Esempio:
 *
 *     mushroom3:
 *       entity: switch.fan
 *       dx: 8     # → 8 px a destra  (negativo: sinistra)
 *       dy: -6    # → 6 px più in alto (positivo: in basso)
 *
 * - Per spostare una bolla lungo la curva destra (ricalcolo polare):
 *   usa angle_deg (in gradi) e, facoltativo, radius_factor.
 *   0° = punta a destra, -90° = in alto, +90° = in basso.
 *
 *     mushroom3:
 *       entity: switch.fan
 *       angle_deg: -72        # sposta lungo la curva
 *       radius_factor: 1.04   # >1 più esterna, <1 più interna (default 1)
 *
 * COME MODIFICARE LA GEOMETRIA GLOBALE (tocchi nel codice, vedi sotto)
 * - flatX: sposta i punti piatti (bolle 1 e 5) a destra/sinistra
 * - a45:   alza/abbassa le bolle sull’arco (bolle 3 e 4); es. 30°, 45°, 60°
 * - rX/rY: gonfia/sgonfia l’ellisse del bordo arrotondato
 * - kMobile/kDesktop: dimensione delle bolle su mobile/desktop
 * ------------------------------------------------------------------
 */

export class BubbleMushroom extends LitElement {
  static properties = {
    /** Array di entità, ciascuna con:
     *  - entity_id, icon, color
     *  - (opz.) dx, dy                → micro shift in px
     *  - (opz.) angle_deg, radius_factor → ricalcolo polare
     */
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
    this._ro.observe(this); // osserva il nodo host per aggiornare width/height
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
    // Propaga un'azione HA standard (toggle / more-info, ecc.)
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
      transform: translate(-50%, -50%); /* centra il cerchio rispetto a left/top */
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
    if (!width || !height) return html``; // prima misura → niente render

    /* Dimensione dinamica (diametro) delle bolle in base al viewport
     * - kMobile: dimensione su schermi stretti
     * - kDesktop: dimensione su schermi larghi
     * - wMobile / wDesktop: soglie per interpolare tra i due
     *
     * ↑ Per ingrandire su ambo i casi alza kMobile e kDesktop
     */
    const vp        = window.innerWidth;
    const kMobile   = 0.50;  // ← mobile: più grande
    const kDesktop  = 0.20;  // ← desktop: più piccolo
    const wMobile   = 100;
    const wDesktop  = 200;

    let k;
    if (vp <= wMobile) k = kMobile;
    else if (vp >= wDesktop) k = kDesktop;
    else {
      const t = (vp - wMobile) / (wDesktop - wMobile);
      k = kMobile + (kDesktop - kMobile) * t;
    }

    /* Mantieni proporzioni quando la card si allarga:
     * - Rmax limita quanto conti la larghezza rispetto all’altezza
     * - side è una media che evita bolle troppo grandi su card larghissime
     */
    const Rmax  = 1.6;                           // ↓ aumenta se vuoi crescere di più in orizzontale
    const sideH = height;
    const sideW = Math.min(width, height * Rmax);
    const side  = 0.5 * (sideH + sideW);

    const size = side * k;                        // diametro bolla

    /* Geometria del semicerchio destro (bordo arrotondato)
     * rX, rY: raggi dell’ellisse. ↑ Aumenta per un arco più “gonfio”
     * cX, cY: centro ellisse
     * rXi, rYi: raggi interni (centro delle bolle) = r - size/2
     */
    const rX  = width  * 0.60;                    // ← gonfiaggio orizzontale
    const rY  = height * 0.60;                    // ← gonfiaggio verticale
    const cX  = width  - rX;
    const cY  = height * 0.5;
    const rXi = rX - size * 0.5;                  // ← riduci qualche px per “tirare dentro” 3 e 4
    const rYi = rY - size * 0.5;

    /* Punti piatti (in alto e in basso) prima che inizi la curva:
     * flatX sposta entrambe le bolle 1 (alta) e 5 (bassa) a dx/sx
     */
    const flatX = width * 0.33;                   // ↑ porta a destra, ↓ a sinistra

    /* Angolo per le bolle sull’arco: 45° (π/4) di default
     * - usa 30° (Math.PI/6) per alzarle
     * - usa 60° (Math.PI/3) per abbassarle
     */
    const a45   = Math.PI / 4;

    /* Preset delle 5 posizioni (senza override per-entity) */
    const positions = [
      { x: size * 0.5, y: size * 0.5 },                                       // #0 alto-sx (angolo)
      { x: width * 0.35,      y: size * 0.5 },                                       // #1 alto lato piatto
      { x: cX + rXi * Math.cos(-a45), y: cY + rYi * Math.sin(-a45) },         // #2 arco alto
      { x: cX + rXi * Math.cos( a45), y: cY + rYi * Math.sin( a45) },         // #3 arco basso
      { x: flatX,      y: height - size * 0.5 },                              // #4 basso lato piatto
    ];

    return html`
      ${this.entities.map((e, i) => {
        // 1) base: preset
        let { x, y } = positions[i] ?? { x: cX, y: cY };

        // 2) opzionale: ricalcolo polare se è stato passato angle_deg
        //    (0° = destra, -90° = su, +90° = giù). radius_factor default 1.
        if (e.angle_deg !== undefined) {
          const ang = (Number(e.angle_deg) || 0) * Math.PI / 180;
          const rf  = (e.radius_factor !== undefined) ? Number(e.radius_factor) : 1;
          x = cX + (rXi * rf) * Math.cos(ang);
          y = cY + (rYi * rf) * Math.sin(ang);
        }

        // 3) micro-aggiustamenti in pixel (dx/dy) applicati dopo il calcolo
        x += Number(e.dx || 0);
        y += Number(e.dy || 0);

        return html`
          <div
            class="mushroom-entity"
            style="
              left:${x}px;
              top:${y}px;
              width:${size}px;
              height:${size}px;
              color:${e.color};
            "
            @click=${() => this._handleClick(e)}
          >
            <ha-icon
              icon="${e.icon}"
              style="--mdc-icon-size:${size * 1}px;"  /* ↑ 1 = piena; 0.7 = più margin */
            ></ha-icon>
          </div>
        `;
      })}
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);
