import { LitElement, html, css } from 'lit';
import { DEVICE_CLASS_LABELS } from './entity-filters.js';   // 👈 stesso folder

/**
 * <device-class-chips>
 *  • value   = array di device_class selezionate
 *  • allowed = device_class che si possono scegliere
 * Emette:  { type: 'value-changed', detail: { value: [...] } }
 */
export class DeviceClassChips extends LitElement {
  static properties = {
    value:   { type: Array },   // selezionate
    allowed: { type: Array },   // possibili
  };

  constructor() {
    super();
    this.value   = [];
    this.allowed = [];
  }

  static styles = css`
    mwc-chip { margin: 4px; --mdc-theme-primary: var(--primary-color); }
    mwc-chip[selected] { --mdc-chip-elevated-shadow: 0 1px 4px rgba(0,0,0,.3); }
  `;

  _toggle(dc) {
    const set = new Set(this.value);
    set.has(dc) ? set.delete(dc) : set.add(dc);
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: Array.from(set) },
      bubbles: true, composed: true,
    }));
  }

  render() {
    return html`
      <mwc-chip-set choice>
        ${this.allowed.map(dc => html`
          <mwc-chip
            .label=${DEVICE_CLASS_LABELS[dc] ?? dc}
            ?selected=${this.value.includes(dc)}
            @click=${() => this._toggle(dc)}
          ></mwc-chip>
        `)}
      </mwc-chip-set>
    `;
  }
}
customElements.define('device-class-chips', DeviceClassChips);