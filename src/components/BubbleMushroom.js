// src/components/BubbleMushroom.js
import { LitElement, html, css } from 'lit';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';


export class BubbleMushroom extends LitElement {
  static properties = {
    // Array: { entity_id, icon, color, dx?, dy?, tap_action?, hold_action?, double_tap_action? }
    entities: { type: Array },
  };

  // BubbleMushroom.js
  constructor() {
    super();
    this.entities = [];
    this._containerSize = { width: 0, height: 0 };
    this._rafSize = null;
    this._ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      // throttle ad un frame
      if (this._rafSize) cancelAnimationFrame(this._rafSize);
      this._rafSize = requestAnimationFrame(() => {
        const w = Math.round(cr.width);
        const h = Math.round(cr.height);
        if (w !== this._containerSize.width || h !== this._containerSize.height) {
          this._containerSize = { width: w, height: h };
          this.requestUpdate();
        }
      });
    });

    // === GESTURE STATE (tap/hold/double_tap) ===
    this._holdThreshold = 500; // ms
    this._holdTimer = null;
    this._holdFired = false;
    this._lastTapTs = 0; // per double tap
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

  // LEGACY: rimane per retrocompatibilità (ora usiamo pointer events)
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

  // === NUOVO: invio unificato dell'azione come fanno i SubButton ===
  _dispatchAction(entity, which) {
    const id = entity.entity_id || entity.entity || entity;
    const cfg = {
      entity: id,
      tap_action: entity.tap_action || { action: 'toggle' },
      hold_action: entity.hold_action || { action: 'more-info' },
      double_tap_action: entity.double_tap_action,
    };
    this.dispatchEvent(new CustomEvent('hass-action', {
      detail: { config: cfg, action: which },
      bubbles: true,
      composed: true,
    }));
  }

  _onPointerDown(ev, entity) {
    ev.preventDefault();
    this._holdFired = false;
    clearTimeout(this._holdTimer);
    this._holdTimer = setTimeout(() => {
      this._holdFired = true;
      this._dispatchAction(entity, 'hold');
    }, this._holdThreshold);
  }

  _onPointerUp(ev, entity) {
    ev.preventDefault();
    clearTimeout(this._holdTimer);

    // se è già partito l'hold, non fare altro
    if (this._holdFired) {
      this._holdFired = false;
      return;
    }

    // double tap opzionale
    const now = Date.now();
    if (entity?.double_tap_action && (now - this._lastTapTs) < 300) {
      this._lastTapTs = 0;
      this._dispatchAction(entity, 'double_tap');
      return;
    }

    // tap (piccolo delay per dare priorità al double tap)
    this._lastTapTs = now;
    setTimeout(() => {
      if (Date.now() - this._lastTapTs >= 280) {
        this._dispatchAction(entity, 'tap');
      }
    }, 280);
  }

  _onPointerCancel() {
    clearTimeout(this._holdTimer);
    this._holdFired = false;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
      contain: strict;
      z-index: 3;
      pointer-events: none;
    }
    .mushroom-entity {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
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

    // scale per elementi speciali
    const cameraScale  = 0.75;            // camera
    const climateScale = 0.75;            // climate
    const dCam = size * cameraScale;      // diametro camera
    const dCli = size * climateScale;     // diametro climate

    // POSIZIONI 1..5 per i mushroom “normali” (come nel codice originale)
    const positionsGeneric = [
      // 1 — alto-sinistra, dentro lo sfondo
      { x: contactX, y: contactY },

      // 2 — arco alto, vicino all'inizio curvatura (sposta con aFlat)
      { x: cX + rArcX * Math.cos(-aFlat), y: cY + rArcY * Math.sin(-aFlat) },

      // 3 — arco alto-destra
      { x: cX + rArcX * Math.cos(-a30),   y: cY + rArcY * Math.sin(-a30)   },

      // 4 — arco basso-destra
      { x: cX + rArcX * Math.cos(+a30),   y: cY + rArcY * Math.sin(+a30)   },

      // 5 — arco basso, vicino all'inizio curvatura
      { x: cX + rArcX * Math.cos(+aFlat), y: cY + rArcY * Math.sin(+aFlat) },
    ];

    // indice locale per assegnare slot ai “generici”
    let genIdx = 0;

    return html`
      ${this.entities.map((e) => {
        const isCam = e?.kind === 'camera';
        const isCli = e?.kind === 'climate';

        // diametro per-ENTITÀ: camera/climate più piccoli (come prima)
        const d = isCam ? dCam : (isCli ? dCli : size);
        const iconSize = d * 0.95;

        // === POSIZIONI: camera/climate esattamente come nel codice che hai incollato ===
        // camera: { x: width - (dCam / 2), y: (dCam / 2) }
        // climate: { x: (dCli / 2) + touchPad, y: height - (dCli / 2) - touchPad }
        let base;
        if (isCam) {
          base = { x: (width - (d / 2)), y: (d / 2) }; // alto-destra, come prima (nessun margine extra)
        } else if (isCli) {
          base = { x: ((d / 2) + touchPad), y: (height - (d / 2) - touchPad) }; // basso-sinistra, come prima
        } else {
          base = positionsGeneric[Math.min(genIdx, positionsGeneric.length - 1)] ?? { x: cX, y: cY };
          genIdx++;
        }

        // micro-shift solo per entità generiche; camera/climate ignorano dx/dy
        const useDx = (isCam || isCli) ? 0 : (e.dx ?? 0);
        const useDy = (isCam || isCli) ? 0 : (e.dy ?? 0);
        const left = base.x + useDx;
        const top  = base.y + useDy;

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
            @pointerdown=${(ev) => this._onPointerDown(ev, e)}
            @pointerup=${(ev) => this._onPointerUp(ev, e)}
            @pointercancel=${this._onPointerCancel}
            @pointerleave=${this._onPointerCancel}
            @contextmenu=${(ev) => ev.preventDefault()}
          >
            <ha-icon icon="${e.icon || resolveEntityIcon(e.entity_id, this.hass)}" style="--mdc-icon-size:${iconSize}px;"></ha-icon>
          </div>
        `;
      })}
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);