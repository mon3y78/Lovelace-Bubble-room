// src/components/BubbleName.js
import { LitElement, html, css } from 'lit';

export class BubbleName extends LitElement {
  static properties = {
    hass:   { type: Object },
    name:   { type: String },
    area:   { type: String },
    config: { type: Object },
    container: { type: Object },   // nodo esterno passato da bubble-room
  };

  /** debounce via requestAnimationFrame */
  _raf = null;
  _resizeObs = null;

  constructor() {
    super();
    this.name = '';
  }

  /* ========== ciclo vita ========== */
  firstUpdated() {
    this._scheduleScale();                               // 1) subito

    /* osserviamo il nodo host: cambiano width / height → riscalcola */
    this._resizeObs = new ResizeObserver(() => this._scheduleScale());
    this._resizeObs.observe(this);

    /* resize finestra / orientation change */
    window.addEventListener('resize', this._scheduleScale, { passive: true });
  }

  updated(changed) {
    if (changed.has('name')) this._scheduleScale();      // 2) se cambia testo
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObs?.disconnect();
    window.removeEventListener('resize', this._scheduleScale);
  }

  /* ========== debounce helper ========== */
  _scheduleScale = () => {
    if (this._raf) return;                    // già in coda
    this._raf = requestAnimationFrame(() => {
      this._raf = null;
      this._autoScaleFont();
    });
  };

  /* ========== algoritmo: ricerca binaria ========== */
  _autoScaleFont() {
    const el  = this.renderRoot.querySelector('.bubble-name');
    const box = this.container || this.parentElement || this;
    if (!el || !box) return;

    /* sospendiamo il RO per evitare trigger ricorsivi */
    this._resizeObs.disconnect();

    const min = 8;     // px
    const max = 160;   // px
    let lo = min, hi = max;

    for (let i = 0; i < 8; i++) {             // 8 iterazioni bastano 8–160 px
      const mid = Math.round((lo + hi) / 2);
      el.style.fontSize = `${mid}px`;
      if (el.scrollWidth <= box.clientWidth &&
          el.scrollHeight <= box.clientHeight) {
        lo = mid;          // sta dentro → prova più grande
      } else {
        hi = mid - 1;      // esce → riduci
      }
    }
    el.style.fontSize = `${lo}px`;            // taglia finale

    /* riattacchiamo il RO */
    this._resizeObs.observe(this);
  }

  /* ========== render ========== */
  render() {
    return html`<div class="bubble-name">${this.name}</div>`;
  }

  /* ========== stile originale ========== */
  static styles = css`
    .bubble-name {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 1.1;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
      text-transform: uppercase;
      font-family: "Arial Narrow", sans-serif;
      font-weight: 600;
      letter-spacing: 0.02em;
      font-stretch: condensed;
      color: var(--bubble-room-name-color, white);
    }
  `;
}

customElements.define('bubble-name', BubbleName);
