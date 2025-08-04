import { LitElement, html, css } from 'lit';

export class BubbleName extends LitElement {
  static properties = {
    hass: { type: Object },
    name: { type: String },
    area: { type: String },
    config: { type: Object },
  };
  
  updated() {
    this._autoScaleFont();
  }
  
  render() {
    const isActive = this._isRoomActive();
    const color = isActive ?
      this.config?.colors?.room?.text_active || 'white' :
      this.config?.colors?.room?.text_inactive || 'rgba(255,255,255,0.5)';
    
    return html`
      <div
        class="bubble-name"
        style="color: ${color}"
      >
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
    if (!el) return;
    
    let fontSize = 40; // valore iniziale massimo
    el.style.fontSize = `${fontSize}px`;
    
    const maxWidth = el.parentElement.clientWidth;
    const maxHeight = el.parentElement.clientHeight;
    
    // Riduci finché non entra sia in larghezza che in altezza
    while (
      (el.scrollWidth > maxWidth || el.scrollHeight > maxHeight) &&
      fontSize > 8
    ) {
      fontSize -= 1;
      el.style.fontSize = `${fontSize}px`;
    }
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
      overflow: hidden;
    }
  `;
}

customElements.define('bubble-name', BubbleName);