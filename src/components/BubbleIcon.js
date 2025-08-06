/**
 * BubbleIcon.js
 * 
 * Icona principale stanza, gigante e posizionata assoluta in basso a sinistra.
 * Replica stile pixel-perfect dell’originale Bubble Room.
 */

import { html, css, LitElement } from 'lit';

export class BubbleIcon extends LitElement {
  static properties = {
    icon: { type: String },
    active: { type: Boolean },
    colorActive: { type: String },
    colorInactive: { type: String }
  };
  
  constructor() {
    super();
    this.icon = '';
    this.active = false;
    this.colorActive = '#21df73'; // verde acceso (default originale)
    this.colorInactive = '#173c16'; // verde scuro sbiadito (default originale)
  }
  
  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      position: absolute;
      left:0;
    }
    .main-icon {
      transition: color 0.2s;
      user-select: none;   
      --mdc-icon-size: var(--main-icon-size,90px);
      font-size: var(--main-icon-size,90px);
      width: var(--main-icon-size,90px);
      height: var(--main-icon-size,90px);
      border-radius: 0 70% 70% 0;
      transform-origin:center center;
      transform:translateX(0%);
      opacity:0.30;
      background: var(--main-icon-bg, rgba(33,223,115,0.12));
    }
  `;
  
  render() {
    const iconColor = this.active ? this.colorActive : this.colorInactive;
    return html`
      <ha-icon
        class="main-icon ${this.active ? 'active' : ''}"
        .icon="${this.icon}"
        style="color:${iconColor}"
        @click="${() => this.dispatchEvent(new CustomEvent('main-icon-click'))}"
      ></ha-icon>
    `;
  }
}

customElements.define('bubble-icon', BubbleIcon);