// src/helpers/filter-chips.js
import { LitElement, html, css } from 'lit';

/* usa i chip “ufficiali” di HA, già presenti nel bundle */
import { FILTER_LABELS } from './entity-filters.js';

export class FilterChips extends LitElement {
  static properties = {
    value: { type: Array },
    allowed: { type: Array },
  };
  
  constructor() {
    super();
    this.value = [];
    this.allowed = [];
  }
  
  static styles = css`
    ha-chip {
      margin: 4px;
    }
  `;
  
  _toggle(cat) {
    const s = new Set(this.value);
    s.has(cat) ? s.delete(cat) : s.add(cat);
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: Array.from(s) },
      bubbles: true,
      composed: true,
    }));
  }
  
  render() {
    if (!this.allowed?.length) {
      return html``;
    }
    return html`
      <ha-chip-set choice>
        ${this.allowed.map(cat => html`
          <ha-chip
            .label=${FILTER_LABELS[cat] ?? cat}
            ?selected=${this.value.includes(cat)}
            @click=${() => this._toggle(cat)}
          ></ha-chip>
        `)}
      </ha-chip-set>
    `;
  }
}

customElements.define('filter-chips', FilterChips);