// src/components/BubbleName.js
import { LitElement, html, css } from 'lit';

export class BubbleName extends LitElement {
  static properties = {
    hass:      { type: Object },
    name:      { type: String },
    area:      { type: String },
    config:    { type: Object },
    container: { type: Object },
    fitMode:   { type: String },   // 'height' | 'both'
    preset:    { type: String, reflect: true },
  };

  // stretchY derivato da preset — nessuno stato separato
  get stretchY() {
    return this.preset === 'liquid-glass' ? 1.18 : this.preset === 'soft-glass' ? 1.16 : 1.12;
  }

  constructor() {
    super();
    this.name = '';
    this.fitMode = 'both';
    this.preset = 'standard';
    this._raf = null;
    this._resizeObs = null;
    this._lastScale = null;
    this._lastBox = null;
    this._scaling = false;
    this._fontVersion = 0;
    this._settleTimer = null;
    this._settleUntil = 0;
    this._hideUntil = 0;
    this._forceNextScale = false;
  }

  _ensureFonts() {
    if (typeof document === 'undefined') return;

    const head = document.head;
    if (!head) return;

    if (!head.querySelector('link[rel="preconnect"][data-bubble-fonts="1"]')) {
      const pre = document.createElement('link');
      pre.rel = 'preconnect';
      pre.href = 'https://fonts.gstatic.com';
      pre.crossOrigin = 'anonymous';
      pre.setAttribute('data-bubble-fonts', '1');
      head.appendChild(pre);
    }

    if (!head.querySelector('link[rel="stylesheet"][data-bubble-fonts="1"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=Bebas+Neue&family=Barlow+Condensed:wght@900&family=Oswald:wght@700&display=swap';
      link.setAttribute('data-bubble-fonts', '1');
      link.addEventListener('load', () => {
        this._fontVersion += 1;
        this._lastScale = null;
        this.reflowLayout({ force: true, duration: 500 });
      });
      head.appendChild(link);
    }

    document.fonts?.load?.('900 32px "Big Shoulders Display"');
    document.fonts?.load?.('900 32px "Barlow Condensed"');
    document.fonts?.load?.('900 32px "Bebas Neue"');
    document.fonts?.ready?.then(() => {
      this._fontVersion += 1;
      this._lastScale = null;
      this.reflowLayout({ force: true, duration: 500 });
    }).catch(() => {});
  }

  firstUpdated() {
    this._ensureFonts();
    this.reflowLayout({ force: true, duration: 900, hideFor: 140 });

    this._resizeObs = new ResizeObserver((entries) => {
      if (this._scaling) return;

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
      changed.has('preset')
    ) {
      this._scheduleScale();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObs?.disconnect();
    window.removeEventListener('resize', this._scheduleScale);
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._settleTimer) clearTimeout(this._settleTimer);
    this._raf = null;
    this._settleTimer = null;
  }

  reflowLayout({ force = false, duration = 0, hideFor = 0 } = {}) {
    const now = performance?.now?.() ?? Date.now();
    if (force) {
      this._forceNextScale = true;
      this._lastScale = null;
    }
    if (hideFor > 0) {
      this._hideUntil = Math.max(this._hideUntil || 0, now + hideFor);
    }
    if (duration > 0) {
      this._settleUntil = Math.max(this._settleUntil || 0, now + duration);
      this._scheduleSettleScale();
    }
    this._scheduleScale();
  }

  _scheduleSettleScale() {
    if (this._settleTimer) return;
    const now = performance?.now?.() ?? Date.now();
    if (!this._settleUntil || now >= this._settleUntil) return;

    this._settleTimer = setTimeout(() => {
      this._settleTimer = null;
      this._forceNextScale = true;
      this._lastScale = null;
      this._scheduleScale();
      this._scheduleSettleScale();
    }, 90);
  }

  _scheduleScale = () => {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._autoScaleFont();
      });
    });
  };

  _autoScaleFont() {
    const el  = this.renderRoot.querySelector('.bubble-name');
    const box = this.container || this.parentElement || this;
    if (!el || !box) return;

    const currentText = this.name ?? '';
    const boxW = Math.max(0, Math.round(box.clientWidth));
    const boxH = Math.max(0, Math.round(box.clientHeight));
    const stretchY = this.stretchY;

    if (boxW <= 0 || boxH <= 0) {
      requestAnimationFrame(() => this._scheduleScale());
      return;
    }

    const force = this._forceNextScale;
    this._forceNextScale = false;

    if (
      !force &&
      this._lastScale &&
      this._lastScale.text === currentText &&
      this._lastScale.w === boxW &&
      this._lastScale.h === boxH &&
      this._lastScale.fitMode === this.fitMode &&
      this._lastScale.preset === this.preset &&
      this._lastScale.fontVersion === this._fontVersion
    ) {
      el.style.visibility = this._shouldKeepHidden() ? 'hidden' : 'visible';
      return;
    }

    this._scaling = true;

    el.style.visibility = 'hidden';
    el.style.fontSize = '10px';
    el.style.transform = 'none';

    const MIN = 8;
    const MAX = 300;

    // Il binary search deve trovare la dimensione che, dopo scaleY(stretchY),
    // riempie esattamente il container in altezza.
    const effectiveBoxH = stretchY > 1 ? Math.round((boxH * 0.88) / stretchY) : Math.round(boxH * 0.88);

    let targetPx;
    const MIN_SCALE_X = 0.48;
    const MAX_SCALE_X = 0.96;

    if (this.fitMode === 'height') {
      let lo = MIN, hi = MAX;
      for (let i = 0; i < 10 && lo <= hi; i++) {
        const mid = (lo + hi) >> 1;
        el.style.fontSize = `${mid}px`;
        if (el.scrollHeight <= effectiveBoxH) lo = mid + 1;
        else hi = mid - 1;
      }
      targetPx = Math.max(MIN, Math.min(MAX, hi));

      el.style.fontSize = `${targetPx}px`;
      const sw = el.scrollWidth;
      if (sw > boxW && sw > 0) {
        targetPx = Math.floor(targetPx * (boxW / sw));
      }
    } else {
      // 'both': priorita all'altezza; i nomi lunghi vengono condensati in X.
      let lo = MIN, hi = MAX;
      for (let i = 0; i < 10 && lo <= hi; i++) {
        const mid = (lo + hi) >> 1;
        el.style.fontSize = `${mid}px`;
        if (el.scrollHeight <= effectiveBoxH) lo = mid + 1;
        else hi = mid - 1;
      }
      targetPx = Math.max(MIN, Math.min(MAX, hi));

      el.style.fontSize = `${targetPx}px`;
      let requiredScale = boxW / Math.max(1, Math.round(el.scrollWidth));
      while (targetPx > MIN && requiredScale < MIN_SCALE_X) {
        targetPx -= 1;
        el.style.fontSize = `${targetPx}px`;
        requiredScale = boxW / Math.max(1, Math.round(el.scrollWidth));
      }
    }

    el.style.fontSize = `${targetPx}px`;

    const textW = Math.max(1, Math.round(el.scrollWidth));
    const rawScaleX = boxW / textW;
    const scaleX = Math.min(Math.max(rawScaleX * 0.96, MIN_SCALE_X), MAX_SCALE_X);
    el.style.transform = `scaleX(${scaleX}) scaleY(${stretchY})`;
    el.style.transformOrigin = 'left top';
    el.style.visibility = this._shouldKeepHidden() ? 'hidden' : 'visible';

    this._lastScale = {
      text: currentText, w: boxW, h: boxH,
      fitMode: this.fitMode, preset: this.preset,
      fontVersion: this._fontVersion,
    };

    this._scaling = false;
  }

  _shouldKeepHidden() {
    const now = performance?.now?.() ?? Date.now();
    return this._hideUntil > 0 && now < this._hideUntil;
  }

  render() {
    return html`
      <div class="bubble-name" title="${this.name || ''}">
        ${this.name}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; width: 100%; overflow: visible; }

    .bubble-name {
      display: inline-flex;
      align-items: flex-start;
      justify-content: flex-start;
      width: max-content;
      height: auto;
      line-height: 0.9;

      font-family:
        "Big Shoulders Display",
        "Barlow Condensed",
        "Bebas Neue",
        "Oswald",
        "Arial Narrow",
        Arial, sans-serif;
      font-weight: 900;
      letter-spacing: 0;
      font-stretch: condensed;

      text-align: left;
      white-space: nowrap;
      text-transform: uppercase;
      color: var(--bubble-room-name-color, white);
      visibility: hidden;

      /* transizione fluida cambio presenza */
      transition: color 0.3s ease;

      text-shadow:
        0 0 20px color-mix(in srgb, var(--bubble-room-name-color, white) 50%, transparent),
        0 2px 4px rgba(0, 0, 0, 0.4);

      margin: 0;
      padding: 0;
      user-select: none;
    }

    :host([preset='liquid-glass']) .bubble-name {
      font-family:
        "Big Shoulders Display",
        "Bebas Neue",
        "Arial Narrow",
        Arial, sans-serif;
      font-weight: 900;
      letter-spacing: 0em;
      line-height: 0.88;
      text-shadow:
        0 0 60px color-mix(in srgb, var(--bubble-room-name-color, white) 100%, transparent),
        0 0 28px color-mix(in srgb, var(--bubble-room-name-color, white) 70%, transparent),
        0 0 10px color-mix(in srgb, var(--bubble-room-name-color, white) 40%, transparent),
        0 2px 8px rgba(0, 0, 0, 0.45);
      /* luminosità/saturazione uniforme con sub-button: gestita dal colore passato via CSS var */
      filter: saturate(var(--bubble-room-name-saturation, 1)) brightness(var(--bubble-room-name-brightness, 1));
      transition: color 0.3s ease, filter 0.3s ease;
    }

    :host([preset='soft-glass']) .bubble-name {
      font-family:
        "Big Shoulders Display",
        "Barlow Condensed",
        "Bebas Neue",
        "Arial Narrow",
        Arial, sans-serif;
      font-weight: 900;
      letter-spacing: 0;
      line-height: 0.9;
      text-shadow:
        0 0 18px color-mix(in srgb, var(--bubble-room-name-color, white) 42%, transparent),
        0 2px 5px rgba(0, 0, 0, 0.36);
      filter: saturate(var(--bubble-room-name-saturation, 1)) brightness(var(--bubble-room-name-brightness, 1));
      transition: color 0.25s ease, filter 0.25s ease;
    }

    :host([preset='minimal']) .bubble-name {
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.34);
      filter: none;
      transition: color 0.18s ease;
    }
  `;
}

if (!customElements.get('bubble-name')) {
  customElements.define('bubble-name', BubbleName);
}
