// src/helpers/filter-chips.js
import { LitElement, html, css } from 'lit';
import '@material/web/chips/chip-set.js';
import '@material/web/chips/filter-chip.js';


import { FILTER_LABELS } from './entity-filters.js';

/**
 * <filter-chips>
 *  • value   = array di categorie attive
 *  • allowed = array di tutte le categorie possibili
 *  Emesso: "value-changed" con detail.value = nuovo array.
 */
export class FilterChips extends LitElement {
  static properties = {
    value:   { type: Array },
    allowed: { type: Array },
  };

  constructor() {
    super();
    this.value   = [];
    this.allowed = [];
  }

  static styles = css`
    mwc-chip {
      margin: 4px;
    }
  `;

  _toggle(cat) {
    const set = new Set(this.value);
    set.has(cat) ? set.delete(cat) : set.add(cat);
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: Array.from(set) },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    if (!this.allowed?.length) {
      return html``;
    }
    return html`
      <mwc-chip-set choice>
        ${this.allowed.map(cat => html`
          <mwc-chip
            .label=${FILTER_LABELS[cat] ?? cat}
            ?selected=${this.value.includes(cat)}
            @click=${() => this._toggle(cat)}
          ></mwc-chip>
        `)}
      </mwc-chip-set>
    `;
  }
}

customElements.define('filter-chips', FilterChips);
