import { html, css, LitElement } from 'lit';

export class BubbleIcon extends LitElement {
  static properties = {
    icon: { type: String },
    active: { type: Boolean },
    colorActive: { type: String },
    colorInactive: { type: String },
    backgroundActive: { type: String },
    backgroundInactive: { type: String }
  };
  
  constructor() {
    super();
    this.icon = '';
    this.active = false;
    this.colorActive = '#21df73'; // verde acceso
    this.colorInactive = '#173c16'; // verde scuro
    this.backgroundActive = 'rgba(33,223,115,0.12)';
    this.backgroundInactive = 'rgba(23,60,22,0.08)';
  }
  
  static styles = css`
    :host {
      position: absolute;   /* prende come riferimento .icon-mushroom-area */
      inset: 0;
      box-sizing: border-box;
    .main-icon-container {
      opacity: 0.30;
      box-sizing: border-box;
      background: var(--main-icon-bg, rgba(33,223,115,0.12));
      border-radius: 0 70% 70% 0;
      display: flex;
      width:100%;
      height:100%;
      justify-content: center;
      align-items:   center;
    }
    .main-icon {
      --mdc-icon-size: var(--main-icon-size, 160px);
      width: var(--mdc-icon-size);
      height: var(--mdc-icon-size);
      transform: translateX(var(--icon-shift-x, -20%));
    }
  `;
  
  render() {
    const iconColor = this.active ? this.colorActive : this.colorInactive;
    const iconColorBg = this.active ? this.backgroundActive : this.backgroundInactive;
    
    return html`
      <div class="main-icon-container" style="background:${iconColorBg}">
        <ha-icon
          class="main-icon"
          .icon="${this.icon}"
          style="color:${iconColor}"
          @click="${() => this.dispatchEvent(new CustomEvent('main-icon-click'))}"
        ></ha-icon>
      </div>
    `;
  }
}

customElements.define('bubble-icon', BubbleIcon);