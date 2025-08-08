// src/components/BubbleMushroom.js
import { LitElement, html, css } from 'lit';

export class BubbleMushroom extends LitElement {
  static properties = {
    // Array di entità “mushroom” posizionate radialmente/XY:
    //   { entity_id, icon, color, dx?, dy?, tap_action?, hold_action?, double_tap_action? }
    entities: { type: Array },
  };

  constructor() {
    super();
    this.entities = [];
    this._containerSize = { width: 0, height: 0 };

    // Resize observer per adattare la disposizione
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

    // 👇 Stato gesture per azioni, coerente coi SubButton
    this._holdThreshold = 500;   // ms per hold
    this._holdTimer = null;
    this._holdFired = false;
    this._lastTapTs = 0;         // per double tap
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
      width: 100%;
      height: 100%;
      position: relative;
      contain: strict;
      pointer-events: none; /* solo gli elementi interni rispondono */
    }
    .mushroom-entity {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      pointer-events: auto; /* riabilita click sui bottoni */
    }
    .mushroom-entity ha-icon {
      display: block;
    }
  `;

  render() {
    const { width, height } = this._containerSize;
    if (!width || !height) return html``;

    // Calcolo dimensioni “funghi”
    const d = Math.max(Math.round(Math.min(width, height) * 0.14), 36); // diametro
    const iconSize = Math.round(d * 0.62);

    // Centro (se poi li sposti con dx/dy li prenderemo in considerazione sotto)
    const cX = Math.round(width / 2);
    const cY = Math.round(height / 2);

    return html`
      ${this.entities?.map((e) => {
        if (!e) return html``;

        // Supporta string o oggetto
        const entityId = typeof e === 'string' ? e : (e.entity_id || e.entity);
        if (!entityId) return html``;

        // Coordinate base + micro shift (dx/dy) dal config
        const base = { x: cX, y: cY };
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

  // (retrocompat) handler click legacy – non usato più dopo l’introduzione dei pointer
  _handleClick(entity) {
    const actionConfig = {
      entity: entity.entity_id,
      tap_action:  entity.tap_action  || { action: 'toggle' },
      hold_action: entity.hold_action || { action: 'more-info' },
    };
    const evt = new Event('hass-action', { bubbles: true, composed: true });
    evt.detail = { config: actionConfig, action: 'tap' };
    this.dispatchEvent(evt);
  }

  // 👇 Dispatch identico ai SubButton: evento 'hass-action' + detail {config, action}
  _dispatchAction(entity, actionType) {
    const actionConfig = {
      entity: entity.entity_id || entity.entity || entity,
      tap_action: entity.tap_action || { action: 'toggle' },
      hold_action: entity.hold_action || { action: 'more-info' },
      double_tap_action: entity.double_tap_action,
    };
    const evt = new Event('hass-action', { bubbles: true, composed: true });
    evt.detail = {
      config: actionConfig,
      action: actionType,
    };
    this.dispatchEvent(evt);
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
      return; // già gestito hold
    }

    // double tap opzionale
    const now = Date.now();
    if (entity?.double_tap_action && (now - this._lastTapTs) < 300) {
      this._lastTapTs = 0;
      this._dispatchAction(entity, 'double_tap');
      return;
    }

    // tap (con piccolo delay per dare priorità al double)
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
