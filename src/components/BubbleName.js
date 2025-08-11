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

  _raf = null;
  _resizeObs = null;
  _lastScale = null;
  _lastBox = null;

  constructor() {
    super();
    this.name = '';
  }

  firstUpdated() {
    this._scheduleScale();
    this._resizeObs = new ResizeObserver((entries) => {
      const entry = entries[0];
      let w = 0;
      let h = 0;
      if (entry && entry.contentBoxSize) {
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
      if (!this._lastBox ||
          Math.abs(w - this._lastBox.w) > 2 ||
          Math.abs(h - this._lastBox.h) > 2) {
        this._lastBox = { w, h };
        this._scheduleScale();
      }
    });
    this._resizeObs.observe(this);
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

    const currentText = this.name;
    const boxW = Math.round(box.clientWidth);
    const boxH = Math.round(box.clientHeight);

    if (this._lastScale &&
        this._lastScale.text === currentText &&
        this._lastScale.w === boxW &&
        this._lastScale.h === boxH) {
      return;
    }

    this._resizeObs.disconnect();

    const min = 8;
    const max = 160;
    let lo = min;
    let hi = max;

    for (let i = 0; i < 8 && lo <= hi; i++) {
      const mid = (lo + hi) >> 1;
      el.style.fontSize = `${mid}px`;
      if (el.scrollWidth <= boxW && el.scrollHeight <= boxH) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    el.style.fontSize = `${hi}px`;

    this._lastScale = { text: currentText, w: boxW, h: boxH };

    this._resizeObs.observe(this);
  }

  _isRoomActive() {
    const entityId = this.config?.entities?.presence?.entity;
    if (!entityId) return false;
    const state = this.hass?.states?.[entityId]?.state;
    return ['on','home','occupied','motion','detected'].includes(state);
  }

  render() {
    return html`<div class="bubble-name">${this.name}</div>`;
  }

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
