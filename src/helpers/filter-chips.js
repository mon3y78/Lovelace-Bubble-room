// src/helpers/filter-chips.js
import { LitElement, html, css } from 'lit';

/* importa i web-component Material (obbligatorio se non li carica il core) */

import { FILTER_LABELS } from './entity-filters.js';

/**
 * <filter-chips>
 *
 *  · value   – array di categorie attive (es. ['motion','light'])
 *  · allowed – array di tutte le categorie possibili
 *
 *  Emesso:  "value-changed" → detail.value = nuovo array selezionato
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
  
  /* Stili minimi: margine e colore primario ereditato dal tema */
  static styles = css`
    mwc-chip {
      margin: 4px;
      --mdc-theme-primary: var(--primary-color);
    }
  `;
  
  /** Aggiunge/rimuove la categoria e notifica il nuovo set */
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
    /* se allowed è vuoto non mostriamo nulla */
    if (!this.allowed?.length) return html``;
    
    return html`
      <mwc-chip-set choice>
        ${this.allowed.map((cat) => html`
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