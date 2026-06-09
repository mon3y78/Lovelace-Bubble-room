// src/components/BubbleMushroom.js
import { LitElement, html, css } from 'lit';
import { resolveEntityIcon, getIconAnimClass } from '../helpers/icon-mapping.js';
import { createGestureHandler } from '../helpers/gesture-handler.js';


export class BubbleMushroom extends LitElement {
  static properties = {
    // Array: { entity_id, icon, color, active, dx?, dy?, tap_action?, hold_action?, double_tap_action? }
    entities: { type: Array },
    preset:   { type: String, reflect: true },
  };

  constructor() {
    super();
    this.entities = [];
    this.preset   = 'standard';
    this._containerSize = { width: 0, height: 0 };
    this._rafSize = null;
    this._ripplingKeys = new Set();
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
    this._lastTapTs = 0; // per double tap (logica entity-specifica)
    this._gesture = createGestureHandler({
      onTap:  (entity) => this._handleTap(entity),
      onHold: (entity) => this._dispatchAction(entity, 'hold'),
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._ro.observe(this);
    requestAnimationFrame(() => this.reflowLayout(true));
  }
  disconnectedCallback() {
    if (this._rafSize) cancelAnimationFrame(this._rafSize);
    this._ro.disconnect();
    super.disconnectedCallback();
  }

  _getAnimClass(entity) {
    const anim = entity?.animation;
    // Se esplicitamente disabilitata → nessuna animazione
    if (anim?.enabled === false) return '';
    // Se tipo esplicito (non 'auto') → usa quello
    if (anim?.type && anim.type !== 'auto') return anim.type;
    // Altrimenti auto-detect dall'icona
    return getIconAnimClass(entity?.icon, entity?.kind);
  }

  reflowLayout(force = false) {
    this._updateSize(force);
  }

  _updateSize(force = false) {
    const r = this.getBoundingClientRect();
    const width = Math.round(r.width);
    const height = Math.round(r.height);
    if (force || width !== this._containerSize.width || height !== this._containerSize.height) {
      this._containerSize = { width, height };
      this.requestUpdate();
    }
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
    const key = entity.entity_id || entity.kind || 'unknown';
    this._ripplingKeys.add(key);
    this.requestUpdate();
    setTimeout(() => {
      this._ripplingKeys.delete(key);
      this.requestUpdate();
    }, 500);
    this._gesture.onDown(entity);
  }

  _onPointerUp(ev, entity) {
    ev.preventDefault();
    this._gesture.onUp(entity);
  }

  _onPointerCancel() {
    this._gesture.onCancel();
  }

  // Tap handler con supporto double_tap entity-specifico
  _handleTap(entity) {
    const now = Date.now();
    if (entity?.double_tap_action && (now - this._lastTapTs) < 300) {
      this._lastTapTs = 0;
      this._dispatchAction(entity, 'double_tap');
      return;
    }
    this._lastTapTs = now;
    setTimeout(() => {
      if (Date.now() - this._lastTapTs >= 280) {
        this._dispatchAction(entity, 'tap');
      }
    }, 280);
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
      border-radius: 50%;
      overflow: hidden;
      transition: color 0.3s ease, filter 0.3s ease, opacity 0.3s ease;
    }

    :host([preset='liquid-glass']) .mushroom-entity.is-active {
      filter: saturate(1.15) brightness(1.1);
      opacity: 1.0;
      background: transparent;
      box-shadow: none;
    }

    :host([preset='liquid-glass']) .mushroom-entity.is-inactive {
      filter: saturate(0.55) brightness(1.10);
      opacity: 0.88;
      background: transparent;
      box-shadow: none;
    }

    :host([preset='soft-glass']) .mushroom-entity.is-active {
      filter: saturate(1.05) brightness(1.04) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.16));
      opacity: 1.0;
      background: transparent;
      box-shadow: none;
    }

    :host([preset='soft-glass']) .mushroom-entity.is-inactive {
      filter: saturate(0.72) brightness(0.96);
      opacity: 0.82;
      background: transparent;
      box-shadow: none;
    }

    :host([preset='minimal']) .mushroom-entity.is-active {
      filter: none;
      opacity: 1;
      background: transparent;
      box-shadow: none;
    }

    :host([preset='minimal']) .mushroom-entity.is-inactive {
      filter: none;
      opacity: 0.62;
      background: transparent;
      box-shadow: none;
    }

    .mushroom-entity ha-icon { display: block; }

    /* ── animazioni ── */

    /* ventilatori, eliche, rotori */
    @keyframes mushroom-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* lampadine, lampade — flash del riflesso */
    @keyframes mushroom-illuminate {
      0%, 79%  { clip-path: inset(0 0 0 0); }
      80%, 100%{ clip-path: polygon(0% 99%, 20% 55%, 22% 37%, 39% 20%, 61% 21%, 77% 35%, 79% 57%, 99% 100%); }
    }

    /* campanelli, allarmi — scuotimento con smorzamento */
    @keyframes mushroom-alarm {
      0%, 80%, 100% { transform: translateY(0); }
      10% { transform: translateY(-2px) rotate(-27deg); }
      20% { transform: translateY(-2px) rotate(21deg); }
      30% { transform: translateY(-2px) rotate(-15deg); }
      40% { transform: translateY(-2px) rotate(9deg); }
      50% { transform: translateY(0); }
      60% { transform: translateY(-1.2px); }
    }

    /* sensori di movimento — blink a passo */
    @keyframes mushroom-blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.08; }
    }

    /* speaker, musica — pulsazione heartbeat */
    @keyframes mushroom-beat {
      0%  { transform: scale(1); }
      10% { transform: scale(1.1); }
      17% { transform: scale(1.05); }
      33% { transform: scale(1.25); }
      60% { transform: scale(1); }
    }

    /* telecamera — pan/scan laterale */
    @keyframes mushroom-scan {
      0%, 100% { transform: rotate(20deg); }
      50%       { transform: rotate(-15deg); }
    }

    /* elettrodomestici — vibrazione */
    @keyframes mushroom-shake {
      0%, 100% { transform: translate(0, 0) rotate(0); }
      20%       { transform: translate(0.4px, -0.4px) rotate(-4deg); }
      40%       { transform: translate(-0.4px,  0.4px) rotate(4deg); }
      60%       { transform: translate(0.4px,  0.4px) rotate(-4deg); }
      80%       { transform: translate(-0.4px, -0.4px) rotate(4deg); }
    }

    /* animali domestici — rimbalzo elastico */
    @keyframes mushroom-bounce {
      0%, 100% { transform: translateY(0) scaleY(0.9); }
      80%       { transform: translateY(-20%) scaleY(1); }
    }

    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-spin ha-icon {
      animation: mushroom-spin 1.4s linear infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-illuminate ha-icon {
      animation: mushroom-illuminate 2.5s ease-in-out infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-alarm ha-icon {
      animation: mushroom-alarm 0.9s ease infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-blink ha-icon {
      animation: mushroom-blink 1.1s step-end infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-beat ha-icon {
      animation: mushroom-beat 1.3s ease-out infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-scan ha-icon {
      animation: mushroom-scan 5s ease-in-out infinite;
      transform-origin: 90% 80%;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-shake ha-icon {
      animation: mushroom-shake 400ms ease-in-out infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-bounce ha-icon {
      animation: mushroom-bounce 0.7s cubic-bezier(0.30, 2.40, 0.85, 2.50) infinite;
      transform-origin: 50% 100%;
    }

    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-spin ha-icon {
      animation: mushroom-spin 1.4s linear infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-illuminate ha-icon {
      animation: mushroom-illuminate 2.5s ease-in-out infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-alarm ha-icon {
      animation: mushroom-alarm 0.9s ease infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-blink ha-icon {
      animation: mushroom-blink 1.1s step-end infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-beat ha-icon {
      animation: mushroom-beat 1.3s ease-out infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-scan ha-icon {
      animation: mushroom-scan 5s ease-in-out infinite;
      transform-origin: 90% 80%;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-shake ha-icon {
      animation: mushroom-shake 400ms ease-in-out infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-bounce ha-icon {
      animation: mushroom-bounce 0.7s cubic-bezier(0.30, 2.40, 0.85, 2.50) infinite;
      transform-origin: 50% 100%;
    }

    @keyframes mushroom-ripple {
      from { transform: scale(0); opacity: 0.55; }
      to   { transform: scale(2.8); opacity: 0; }
    }
    .ripple {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: currentColor;
      animation: mushroom-ripple 0.45s ease-out forwards;
      pointer-events: none;
    }
  `;

  render() {
    const { width, height } = this._containerSize;
    if (!width || !height) return html``;

    // Dimensione fluida dal container reale: mantiene la geometria storica senza soglie viewport.
    const Rmax  = 1.6;
    const sideW = Math.min(width, height * Rmax);
    const side  = 0.5 * (height + sideW);
    const size  = side * 0.25; // diametro standard bolla

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
          base = { x: (width - (d / 2)), y: (d / 2) }; // alto-destra, incollata al bordo
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

        const rippleKey = e.entity_id || e.kind || 'unknown';
        const isRippling = this._ripplingKeys.has(rippleKey);
        const animClass = e.active ? this._getAnimClass(e) : '';
        const activeClass = (this.preset === 'liquid-glass' || this.preset === 'soft-glass' || this.preset === 'minimal')
          ? (e.active ? `is-active ${animClass}` : 'is-inactive')
          : '';

        return html`
          <div
            class="mushroom-entity ${activeClass}"
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
            ${isRippling ? html`<span class="ripple"></span>` : ''}
            <ha-icon icon="${e.icon || resolveEntityIcon(e.entity_id, this.hass)}" style="--mdc-icon-size:${iconSize}px;"></ha-icon>
          </div>
        `;
      })}
    `;
  }
}

if (!customElements.get('bubble-mushroom')) {
  customElements.define('bubble-mushroom', BubbleMushroom);
}
