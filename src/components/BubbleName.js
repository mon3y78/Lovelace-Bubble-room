import { LitElement, html, css } from 'lit';

export class BubbleName extends LitElement {
  static properties = {
    hass: { type: Object },
    name: { type: String },
    area: { type: String },
    config: { type: Object },
    container: { type: Object }, // container esterno passato da bubble-room
  };
  
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
    const isActive = this._isRoomActive();
    const color = isActive ?
      this.config?.colors?.room?.text_active || 'white' :
      this.config?.colors?.room?.text_inactive || 'rgba(255,255,255,0.5)';
    
    return html`
      <div class="bubble-name" style="color: ${color}">
        ${this.name}
      </div>
    `;
  }
  
  _isRoomActive() {
    const entity = this.config?.room_presence?.entity;
    return entity && this.hass?.states?.[entity]?.state === 'on';
  }
  
  _autoScaleFont() {
    const el = this.renderRoot.querySelector('.bubble-name');
    const box = this.container || this.parentElement;
    if (!el || !box) return;
    
    let fontSize = 40;
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
    }
  `;
}

customElements.define('bubble-name', BubbleName);