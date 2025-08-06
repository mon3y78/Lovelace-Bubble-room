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
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      position: absolute;
      left: 0;
    }

    .main-icon-container {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: var(--main-icon-size, 90px);
      height: var(--main-icon-size, 90px);
      border-radius: 0 70% 70% 0;
      opacity: 0.30;
      transform: translateX(0%);
      box-sizing: border-box;
      background: var(--main-icon-bg, rgba(33,223,115,0.12));
    }
    ha - icon.main - icon {
      --mdc-icon-size: calc(var(--main-icon-size, 90 px) * 0.65);
      width: var(--mdc-icon-size);
      height: var(--mdc-icon-size);
      display: block;
    }
    ha-icon {
      --mdc-icon-size: var(--main-icon-size, 90px);
      font-size: var(--main-icon-size, 90px);
      width: var(--main-icon-size, 90px);
      height: var(--main-icon-size, 90px);
      display: block;
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