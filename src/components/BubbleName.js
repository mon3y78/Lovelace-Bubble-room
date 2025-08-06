import { LitElement, html, css } from 'lit';

export class BubbleName extends LitElement {
  static properties = {
    hass: { type: Object },
    name: { type: String },
    area: { type: String },
    config: { type: Object },
    container: { type: Object }, // container esterno passato da bubble-room
  };

  /**  Debounce handle id  */
   _raf = null;
   _resizeObs = null;
  
   constructor() {
    super();
    this._resizeObserver = null;
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const box = this.container || this.parentElement;
      if (box) {
        this._resizeObserver = new ResizeObserver(() => this._autoScaleFont());
        this._resizeObserver.observe(box);
      }
    });
  }
  
  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    super.disconnectedCallback();
  }
  
  updated() {
    this._autoScaleFont();
  }
  
  render() {
    return html`
      <!-- il colore ora lo prende dal CSS var impostata dal genitore -->
      <div class="bubble-name">${this.name}</div>
    `;
  }
  
  /* ─────  sostituisci la vecchia _isRoomActive()  ───── */
  _isRoomActive() {
    const entityId = this.config?.entities?.presence?.entity;
    if (!entityId) return false;
    
    const state = this.hass?.states?.[entityId]?.state;
    return [
      'on', // binary_sensor, switch, ecc.
      'home', // person, device_tracker
      'occupied', // sensori occupancy
      'motion', // motion detected
      'detected' // altri sensori custom
    ].includes(state);
  }
/* ─────────────────────────────────────────────────── */
 /** Primo render: calcoliamo subito il font e iniziamo ad ascoltare resize */
firstUpdated() {
  this._scheduleScale();           // 1) appena montata

  /* ResizeObserver sul bounding box del componente */
  this._resizeObs = new ResizeObserver(() => this._scheduleScale());
  this._resizeObs.observe(this);   // il nodo host

  /* listener sul resize finestra (cambia breakpoint / orientation) */
  window.addEventListener('resize', this._scheduleScale, { passive: true });
}

/** Quando cambia label ricalcoliamo una sola volta */
updated(changed) {
  if (changed.has('label')) this._scheduleScale();
}

disconnectedCallback() {
  super.disconnectedCallback();
  if (this._resizeObs) this._resizeObs.disconnect();
  window.removeEventListener('resize', this._scheduleScale);
}

/** --- utility debounce via requestAnimationFrame --------------- */
_scheduleScale = () => {
  if (this._raf) return;                 // già in coda
  this._raf = requestAnimationFrame(() => {
    this._raf = null;
    this._autoScaleFont();
  });
}

  _autoScaleFont() {
    const el = this.renderRoot.querySelector('.bubble-name');
    const box = this.container || this.parentElement;
    if (!el || !box) return;
    
    let fontSize = 100;
    el.style.fontSize = `${fontSize}px`;
    
    requestAnimationFrame(() => {
      const maxWidth = box.clientWidth;
      const maxHeight = box.clientHeight;
      
      while (
        (el.scrollWidth > maxWidth || el.scrollHeight > maxHeight) &&
        fontSize > 10
      ) {
        fontSize -= 1;
        el.style.fontSize = `${fontSize}px`;
        console.log("Resizing font to:", fontSize); // DEBUG
      }
    });
  }
  
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
      text-transform: uppercase;
      letter-spacing: 0.02em;
      font-stretch: condensed;
      color: var(--bubble-room-name-color, white);
    }
  `;
}

customElements.define('bubble-name', BubbleName);