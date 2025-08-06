// src/components/BubbleName.js
import { LitElement, html, css } from 'lit';

export class BubbleName extends LitElement {
  static properties = {
    hass:   { type: Object },
    name:   { type: String },
    area:   { type: String },
    config: { type: Object },
    container: { type: Object },
  };

  /* debounce */
  _raf = null;
  _resizeObs = null;

  constructor() {
    super();
    this.name = '';
  }

  /* ───── ciclo vita ───── */
  firstUpdated() {
    this._scheduleScale();                 // 1) al mount
    this._resizeObs = new ResizeObserver(() => this._scheduleScale());
    this._resizeObs.observe(this);         // host
    window.addEventListener('resize', this._scheduleScale, { passive:true });
  }

  updated(changed) {
    if (
      changed.has('name')   ||
      changed.has('config') ||
      changed.has('container')
    ) {
      this._scheduleScale();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObs?.disconnect();
    window.removeEventListener('resize', this._scheduleScale);
  }

  /* ───── debounce helper ───── */
  _scheduleScale = () => {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = null;
      this._autoScaleFont();
    });
  };

  /* ───── autoscale binario ───── */
  _autoScaleFont() {
    const el  = this.renderRoot.querySelector('.bubble-name');
    const box = this.container || this.parentElement || this;
    if (!el || !box) return;

    this._resizeObs.disconnect();          // evita trigger ricorsivo

    const min = 8, max = 160;
    let lo = min, hi = max;

    for (let i = 0; i < 8; i++) {
      const mid = (lo + hi) >> 1;
      el.style.fontSize = `${mid}px`;
      if (el.scrollWidth <= box.clientWidth &&
          el.scrollHeight <= box.clientHeight) {
        lo = mid;
      } else {
        hi = mid - 1;
      }
    }
    el.style.fontSize = `${lo}px`;
    this._resizeObs.observe(this);
  }

  /* ───── utilità (non modificata) ───── */
  _isRoomActive() {
    const entityId = this.config?.entities?.presence?.entity;
    if (!entityId) return false;
    const state = this.hass?.states?.[entityId]?.state;
    return ['on','home','occupied','motion','detected'].includes(state);
  }

  /* ───── render ───── */
  render() {
    return html`<div class="bubble-name">${this.name}</div>`;
  }

  /* ───── stile originale ───── */
  static styles = css`
    .bubble-name {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 1.1;
      font-family: "Arial Narrow", sans-serif;
      font-weight: 600;
      letter-spacing: 0.02em;
      font-stretch: condensed;
      text-align: center;
      white-space: nowrap;
      text-transform: uppercase;
      color: var(--bubble-room-name-color, white);
    }
  `;
}

customElements.define('bubble-name', BubbleName);
