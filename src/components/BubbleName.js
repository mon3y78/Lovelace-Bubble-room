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
    
    // Reset font-size to max
    let fontSize = 40;
    el.style.fontSize = `${fontSize}px`;
    
    // Defer execution to next frame so layout is stable
    requestAnimationFrame(() => {
      const availableWidth = el.clientWidth;
      const availableHeight = el.clientHeight;
      
      while ((el.scrollWidth > availableWidth || el.scrollHeight > availableHeight) && fontSize > 10) {
        fontSize -= 1;
        el.style.fontSize = `${fontSize}px`;
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
      overflow: hidden;
    }
  `;
}

customElements.define('bubble-name', BubbleName);