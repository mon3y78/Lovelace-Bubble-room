// src/helpers/device-class-chips.js
import { LitElement, html, css } from 'lit';

/* componenti ufficiali v3 (pacchetto @material/web) */
import '@material/web/chips/chip-set.js';
import '@material/web/chips/filter-chip.js';

import { DEVICE_CLASS_LABELS } from './entity-filters.js'; // stesso folder

/**
 * <device-class-chips>
 *  • value   – array di device_class selezionate
 *  • allowed – array di device_class disponibili
 *
 * Emesso: "value-changed" → detail.value = nuovo array
 */
export class DeviceClassChips extends LitElement {
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
    md-filter-chip { margin: 4px; }
  `;
  
  _toggle(dc) {
    const set = new Set(this.value);
    set.has(dc) ? set.delete(dc) : set.add(dc);
    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { value: Array.from(set) },
        bubbles: true,
        composed: true,
      }),
    );
  }
  
  render() {
    if (!this.allowed?.length) return html``;
    return html`
      <md-chip-set choice>
        ${this.allowed.map(
          (dc) => html`
            <md-filter-chip
              .label=${DEVICE_CLASS_LABELS[dc] ?? dc}
              .selected=${this.value.includes(dc)}
              @click=${() => this._toggle(dc)}
            ></md-filter-chip>
          `,
        )}
      </md-chip-set>
    `;
  }
}

customElements.define('device-class-chips', DeviceClassChips);