// src/components/BubbleMushroom.js
import { LitElement, html, css } from 'lit';

export class BubbleMushroom extends LitElement {
  static properties = {
    // Array: { entity_id, icon, color, dx?, dy?, tap_action?, hold_action? }
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

    // gesture state for actions
    this._holdThreshold = 500;   // ms
    this._holdTimer = null;
    this._holdFired = false;
    this._lastTapTs = 0;         // for double tap
  }


  connectedCallback() {
    super.connectedCallback();
    this._ro.observe(this);
  }
  disconnectedCallback() {
    this._ro.disconnect();
    super.disconnectedCallback();
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      contain: content;
      pointer-events: none;
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

    // Calcolo dimensioni “funghetti”
    const d = Math.max(Math.round(Math.min(width, height) * 0.14), 36); // diametro base
    const iconSize = Math.round(d * 0.62);

    // Centro del contenitore
    const cX = Math.round(width / 2);
    const cY = Math.round(height / 2);

    return html`
      ${this.entities?.map((e) => {
        if (!e) return html``;

        // Supporta entity come stringa o oggetto {entity_id: '...', ...}
        const entityId = typeof e === 'string' ? e : e.entity_id;
        if (!entityId) return html``;

        // Coordinate di base (derivate da posizione polare o altro, qui semplifico)
        const base = { x: cX, y: cY };
        // micro-shift da YAML
        const left = base.x + (e.dx ?? 0);
        const top  = base.y + (e.dy ?? 0);

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
            <ha-icon icon="${e.icon}" style="--mdc-icon-size:${iconSize}px;"></ha-icon>
          </div>
        `;
      })}
    `;
  }

  _handleClick(entity) {
    // (rimasto per retrocompatibilità; non più usato perché ora gestiamo pointer)
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

  _dispatchAction(entity, which) {
    // which: 'tap' | 'hold' | 'double_tap'
    const cfg = {
      entity: entity.entity_id,
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
    if (this._holdFired) {
      this._holdFired = false;
      return;
    }
    const now = Date.now();
    if (entity?.double_tap_action && now - this._lastTapTs < 300) {
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

  _onPointerCancel() {
    clearTimeout(this._holdTimer);
    this._holdFired = false;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);
