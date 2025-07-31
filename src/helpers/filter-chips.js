import { LitElement, html, css } from 'lit';

import { FILTER_LABELS } from './entity-filters.js';

/**
 * <filter-chips>
 *
 *  • value   = array categorie attive  (['motion','light'…])
 *  • allowed = array categorie valide  (tutte)
 *
 *  Emette "value-changed" con { value: [...] }.
 */
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
    mwc-chip {
      margin: 4px;
      --mdc-theme-primary: var(--primary-color);   /* rispetta tema HA */
    }
  `;
  
  _toggle(cat) {
    const set = new Set(this.value);
    set.has(cat) ? set.delete(cat) : set.add(cat);
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: [...set] },
      bubbles: true,
      composed: true,
    }));
  }
  
  render() {
    if (!this.allowed?.length) return html``; /* niente chip → niente UI */
    
    return html`
      <mwc-chip-set filter>
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