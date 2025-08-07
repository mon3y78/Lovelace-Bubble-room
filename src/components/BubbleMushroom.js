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
    const vpWidth   = window.innerWidth || width;
    const kMobile   = 0.55;  // ← mobile: più grande
    const kDesktop  = 0.25;  // ← desktop: più piccolo
    const wMobile   = 100;
    const wDesktop  = 200;


    let k;
    if (vpWidth <= wMobile) k = kMobile;
    else if (vpWidth >= wDesktop) k = kDesktop;
    else {
      const t = (vpWidth - wMobile) / (wDesktop - wMobile);
      k = kMobile + (kDesktop - kMobile) * t;
    }

    
    return html`
      ${this.entities.map((e, i) => {
        const pos = positions[i] ?? { x: cX, y: cY };
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
            <ha-icon
              icon="${e.icon}"
              style="--mdc-icon-size:${size * 0.6}px;"
            ></ha-icon>
          </div>
        `;
      })}
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);