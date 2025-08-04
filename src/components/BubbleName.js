import { LitElement, html, css } from 'lit';

class BubbleName extends LitElement {
  static properties = {
    name: { type: String },
    area: { type: String },
  };
  
  static styles = css`
    .bubble-name-wrapper {
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      padding-inline: 6px;
    }

    .room-name {
      font-size: clamp(1.2rem, 2vw, 1.8rem);
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: bold;
      color: var(--primary-text-color, white);
      max-width: 100%;
    }

    .area-name {
      font-size: clamp(1rem, 1.5vw, 1.2rem);
      margin-left: 0.5em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--secondary-text-color, #ccc);
    }
  `;
  
  render() {
    return html`
      <div class="bubble-name-wrapper">
        <div class="room-name">${this.name?.toUpperCase()}</div>
        <div class="area-name">(${this.area})</div>
      </div>
    `;
  }
}

customElements.define('bubble-name', BubbleName);