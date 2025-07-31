// src/helpers/filter-chips.js
import { LitElement, html, css } from 'lit';

// import dei componenti ufficiali da @material/web
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
    /* un piccolo margin tra chip */
    md-filter-chip {
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
      <md-chip-set choice>
        ${this.allowed.map(cat => html`
          <md-filter-chip
            .label=${FILTER_LABELS[cat] ?? cat}
            .selected=${this.value.includes(cat)}
            @click=${() => this._toggle(cat)}
          ></md-filter-chip>
        `)}
      </md-chip-set>
    `;
  }
}

customElements.define('filter-chips', FilterChips);
