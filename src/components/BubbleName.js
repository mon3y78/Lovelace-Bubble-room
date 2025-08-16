// src/components/BubbleName.js
import { LitElement, html, css } from 'lit';

export class BubbleName extends LitElement {
  static properties = {
    hass:      { type: Object },
    name:      { type: String },
    area:      { type: String },
    config:    { type: Object },
    container: { type: Object },

    // Opzioni di fit
    fitMode:   { type: String },   // 'height' | 'both'
    stretchY:  { type: Number },   // es. 1.05 per allungare un 5%
  };

  constructor() {
    super();
    this.name = '';
    this.fitMode = 'height'; // priorità all'altezza
    this.stretchY = 1.12;       // nessuno stretch di default
    this._raf = null;
    this._resizeObs = null;
    this._lastScale = null;
    this._lastBox = null;
  }

  // === Font loader: link Google Fonts nello shadow root ===
  _ensureFonts() {
    const root = this.renderRoot || this.shadowRoot;
    if (!root) return;

    // Evita di iniettare due volte
    if (root.querySelector('link[data-bubble-fonts="1"]')) return;

    // Preconnect (opzionale, migliora tempo di caricamento)
    const pre = document.createElement('link');
    pre.rel = 'preconnect';
    pre.href = 'https://fonts.gstatic.com';
    pre.crossOrigin = 'anonymous';
    pre.setAttribute('data-bubble-fonts', '1');
    root.appendChild(pre);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap';
    link.setAttribute('data-bubble-fonts', '1');

    // Quando i font sono pronti, rifaccio lo scale
    link.addEventListener('load', () => {
      // Alcuni browser applicano i font con un frame di ritardo
      requestAnimationFrame(() => this._scheduleScale());
    });

    root.appendChild(link);
  }

  firstUpdated() {
    this._ensureFonts();
    this._scheduleScale();

    this._resizeObs = new ResizeObserver((entries) => {
      const entry = entries[0];
      let w = 0, h = 0;
      if (entry?.contentBoxSize) {
        const box = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize;
        w = Math.round(box.inlineSize);
        h = Math.round(box.blockSize);
      } else {
        const rect = this.getBoundingClientRect();
        w = Math.round(rect.width);
        h = Math.round(rect.height);
      }
      if (!this._lastBox || Math.abs(w - this._lastBox.w) > 2 || Math.abs(h - this._lastBox.h) > 2) {
        this._lastBox = { w, h };
        this._scheduleScale();
      }
    });
    this._resizeObs.observe(this);

    window.addEventListener('resize', this._scheduleScale, { passive: true });
  }

  updated(changed) {
    if (
      changed.has('name') ||
      changed.has('config') ||
      changed.has('container') ||
      changed.has('fitMode') ||
      changed.has('stretchY')
    ) {
      this._scheduleScale();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObs?.disconnect();
    window.removeEventListener('resize', this._scheduleScale);
  }

  _scheduleScale = () => {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = null;
      this._autoScaleFont();
    });
  };

  _autoScaleFont() {
    const el  = this.renderRoot.querySelector('.bubble-name');
    const box = this.container || this.parentElement || this;
    if (!el || !box) return;

    const currentText = this.name ?? '';
    const boxW = Math.max(0, Math.round(box.clientWidth));
    const boxH = Math.max(0, Math.round(box.clientHeight));

    if (
      this._lastScale &&
      this._lastScale.text === currentText &&
      this._lastScale.w === boxW &&
      this._lastScale.h === boxH &&
      this._lastScale.fitMode === this.fitMode &&
      this._lastScale.stretchY === this.stretchY
    ) return;

    // Evita callback del RO durante le misure
    this._resizeObs.disconnect();

    // Reset per misurazioni corrette
    el.style.fontSize = '10px';
    el.style.transform = 'none';

    const MIN = 8;
    const MAX = 240;
    let targetPx;

    if (this.fitMode === 'height') {
      // 1) Fit per ALTEZZA (binary search)
      let lo = MIN, hi = MAX;
      for (let i = 0; i < 9 && lo <= hi; i++) {
        const mid = (lo + hi) >> 1;
        el.style.fontSize = `${mid}px`;
        const okH = el.scrollHeight <= boxH;
        if (okH) lo = mid + 1;
        else     hi = mid - 1;
      }
      targetPx = Math.max(MIN, Math.min(MAX, hi));

      // 2) Se la larghezza sfora, riduci proporzionalmente
      el.style.fontSize = `${targetPx}px`;
      const sw = el.scrollWidth;
      if (sw > boxW && sw > 0) {
        const factor = boxW / sw;
        targetPx = Math.floor(targetPx * factor);
      }
    } else {
      // Fit congiunto (altezza + larghezza)
      let lo = MIN, hi = MAX;
      for (let i = 0; i < 8 && lo <= hi; i++) {
        const mid = (lo + hi) >> 1;
        el.style.fontSize = `${mid}px`;
        if (el.scrollWidth <= boxW && el.scrollHeight <= boxH) lo = mid + 1;
        else hi = mid - 1;
      }
      targetPx = Math.max(MIN, Math.min(MAX, hi));
    }

    // Applica font-size finale
    el.style.fontSize = `${targetPx}px`;

    // Stretch verticale opzionale (riempie l’ultimo gap visivo)
    if (this.stretchY && this.stretchY !== 1) {
      el.style.transform = `scaleY(${this.stretchY})`;
      el.style.transformOrigin = 'center';
    } else {
      el.style.transform = 'none';
    }

    this._lastScale = {
      text: currentText, w: boxW, h: boxH,
      fitMode: this.fitMode, stretchY: this.stretchY
    };

    // Riattiva observer
    this._resizeObs.observe(this);
  }

  render() {
    return html`
      <div class="bubble-name" title="${this.name || ''}">
        ${this.name}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }

    .bubble-name {
      /* centratura e layout */
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      /* leading serrato: riduce lo spazio sopra/sotto */
      line-height: 0.95;

      /* font stack “alto”: caricato automaticamente */
      font-family:
        "Bebas Neue",
        "Oswald",
        "Roboto Condensed",
        "Arial Narrow",
        Arial, sans-serif;

      font-weight: 700;
      letter-spacing: 0.01em;
      font-stretch: condensed;

      text-align: center;
      white-space: nowrap;
      text-transform: uppercase;
      color: var(--bubble-room-name-color, white);

      margin: 0;
      padding: 0;

      user-select: none;
    }
  `;
}

customElements.define('bubble-name', BubbleName);