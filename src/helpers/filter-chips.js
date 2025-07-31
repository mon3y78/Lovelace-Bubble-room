import { LitElement, html, css } from 'lit';
import { FILTER_LABELS } from './entity-filters.js';

/**
 * <filter-chips>
 *  • value   = array di categorie attive
 *  • allowed = array di tutte le categorie possibili
 * Emette "value-changed" con la lista aggiornata.
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
    mwc-chip { margin: 4px; --mdc-theme-primary: var(--primary-color); }
  `;

  _toggle(cat) {
    const s = new Set(this.value);
    s.has(cat) ? s.delete(cat) : s.add(cat);
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: [...s] }, bubbles: true, composed: true,
    }));
  }

  render() {
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