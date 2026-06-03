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
    return this.preset === 'liquid-glass' ? 1.78 : 1.62;
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
  }

  _ensureFonts() {
    const root = this.renderRoot || this.shadowRoot;
    if (!root) return;
    if (root.querySelector('link[data-bubble-fonts="1"]')) return;

    const pre = document.createElement('link');
    pre.rel = 'preconnect';
    pre.href = 'https://fonts.gstatic.com';
    pre.crossOrigin = 'anonymous';
    pre.setAttribute('data-bubble-fonts', '1');
    root.appendChild(pre);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Teko:wght@700&family=Big+Shoulders+Display:wght@900&family=Bebas+Neue&family=Barlow+Condensed:wght@900&family=Oswald:wght@700&display=swap';
    link.setAttribute('data-bubble-fonts', '1');
    link.addEventListener('load', () => {
      requestAnimationFrame(() => this._scheduleScale());
    });
    root.appendChild(link);
  }

  firstUpdated() {
    this._ensureFonts();
    this._scheduleScale();

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
  }

  _scheduleScale = () => {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = null;
      this._autoScaleFont();
    });
  };

  _autoScaleFont() {
    const el  = this.renderRoot.querySelector('.name-text');
    const glowEl = this.renderRoot.querySelector('.name-glow');
    const shell = this.renderRoot.querySelector('.bubble-name');
    const box = this.container || this.parentElement || this;
    if (!el || !box) return;

    const currentText = this.name ?? '';
    const shellStyle = shell ? getComputedStyle(shell) : null;
    const shellPadX = shellStyle
      ? parseFloat(shellStyle.paddingLeft || '0') + parseFloat(shellStyle.paddingRight || '0')
      : 0;
    const shellPadY = shellStyle
      ? parseFloat(shellStyle.paddingTop || '0') + parseFloat(shellStyle.paddingBottom || '0')
      : 0;
    const boxW = Math.max(0, Math.round((shell?.clientWidth || box.clientWidth) - shellPadX));
    const boxH = Math.max(0, Math.round((shell?.clientHeight || box.clientHeight) - shellPadY));
    const stretchY = this.stretchY;

    if (
      this._lastScale &&
      this._lastScale.text === currentText &&
      this._lastScale.w === boxW &&
      this._lastScale.h === boxH &&
      this._lastScale.fitMode === this.fitMode &&
      this._lastScale.preset === this.preset
    ) return;

    this._scaling = true;

    el.style.fontSize = '10px';
    el.style.transform = 'none';
    if (glowEl) {
      glowEl.style.fontSize = '10px';
      glowEl.style.transform = 'none';
    }

    const MIN = 8;
    const MAX = 300;

    // Lascia sfruttare un filo di altezza in più: i font condensati hanno
    // metriche interne generose che altrimenti sembrano margini verticali.
    const verticalFill = 1.06;
    const effectiveBoxH = stretchY > 1
      ? Math.round((boxH * verticalFill) / stretchY)
      : Math.round(boxH * verticalFill);

    let targetPx;

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
      // 'both': riempie larghezza E altezza (con compensazione stretchY)
      let lo = MIN, hi = MAX;
      for (let i = 0; i < 10 && lo <= hi; i++) {
        const mid = (lo + hi) >> 1;
        el.style.fontSize = `${mid}px`;
        if (el.scrollWidth <= boxW && el.scrollHeight <= effectiveBoxH) lo = mid + 1;
        else hi = mid - 1;
      }
      targetPx = Math.max(MIN, Math.min(MAX, hi));
    }

    el.style.fontSize = `${targetPx}px`;
    if (glowEl) glowEl.style.fontSize = `${targetPx}px`;

    if (stretchY !== 1) {
      el.style.transform = `scaleY(${stretchY})`;
      el.style.transformOrigin = 'left center';
      if (glowEl) {
        glowEl.style.transform = `translateY(-50%) scaleY(${stretchY})`;
        glowEl.style.transformOrigin = 'left center';
      }
    } else {
      el.style.transform = 'none';
      if (glowEl) glowEl.style.transform = 'translateY(-50%)';
    }

    this._lastScale = {
      text: currentText, w: boxW, h: boxH,
      fitMode: this.fitMode, preset: this.preset,
    };

    this._scaling = false;
  }

  render() {
    return html`
      <div class="bubble-name" title="${this.name || ''}">
        <span class="name-glow" aria-hidden="true">${this.name}</span>
        <span class="name-text">${this.name}</span>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .bubble-name {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
      line-height: 0.78;
      margin: 0;
      padding: 8px 0 0 6px;
      box-sizing: border-box;
      user-select: none;
      position: relative;
      overflow: visible;
    }

    .name-text,
    .name-glow {
      display: inline-block;
      max-width: 100%;
      line-height: 0.76;

      font-family:
        "Teko",
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
      margin: 0;
      padding: 0;
    }

    .name-glow {
      position: absolute;
      left: 6px;
      top: calc(50% + 4px);
      color: var(--bubble-room-name-color, white);
      opacity: 0.54;
      filter: blur(9px) saturate(1.25);
      transform: translateY(-50%);
      pointer-events: none;
      z-index: 0;
    }

    .name-text {
      position: relative;
      z-index: 1;
      color: var(--bubble-room-name-color, white);

      /* transizione fluida cambio presenza */
      transition: color 0.3s ease;

      text-shadow:
        0 1px 1px rgba(0, 0, 0, 0.34);
    }

    :host([preset='liquid-glass']) .name-text,
    :host([preset='liquid-glass']) .name-glow {
      font-family:
        "Teko",
        "Big Shoulders Display",
        "Bebas Neue",
        "Arial Narrow",
        Arial, sans-serif;
      font-weight: 900;
      letter-spacing: 0em;
      line-height: 0.78;
    }

    :host([preset='liquid-glass']) .name-glow {
      opacity: 0.62;
      filter: blur(11px) saturate(1.35);
    }

    :host([preset='liquid-glass']) .name-text {
      text-shadow:
        0 1px 1px rgba(0, 0, 0, 0.34),
        0 -1px 1px rgba(255, 255, 255, 0.06);
      /* luminosità/saturazione uniforme con sub-button: gestita dal colore passato via CSS var */
      filter: saturate(var(--bubble-room-name-saturation, 1)) brightness(var(--bubble-room-name-brightness, 1));
      transition: color 0.3s ease, filter 0.3s ease;
    }
  `;
}

customElements.define('bubble-name', BubbleName);
