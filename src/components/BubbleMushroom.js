/**
 * BubbleMushroom.js
 * 
 * Componente per la sezione "mushroom entities" della card Bubble Room.
 * File completo, senza placeholder.
 */

import { html, css, LitElement } from 'lit';

export class BubbleMushroom extends LitElement {
  static properties = {
    entities: { type: Array },
    containerSize: { type: Object }
  };

  constructor() {
    super();
    this.entities = [];
    this.containerSize = { width: 200, height: 200 };
  }

  static styles = css`
    .mushroom-entity {
      font-size: 2.1em;
      margin: 0 4px;
      transition: color 0.18s, background 0.18s;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mushroom-entity.active {
      filter: brightness(1.2);
    }
  `;

  render() {
    return html`
      <div class="mushroom-entities" style="display: flex; gap: 0.8em;">
        ${this.entities.map(
          (entity, idx) => html`
            <ha-icon
              class="mushroom-entity ${entity.state === 'on' ? 'active' : ''}"
              .icon="${entity.icon}"
              style="color: ${entity.color || '#888'}"
              @click="${() => this.dispatchEvent(new CustomEvent('mushroom-entity-click', { detail: idx }))}"
            ></ha-icon>
          `
        )}
      </div>
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);
