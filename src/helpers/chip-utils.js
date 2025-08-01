// src/helpers/chip-utils.js
import { html } from 'lit';

/** Carica solo una volta i componenti Material Chips */
export async function loadMaterialChips() {
  const hasSet = !!customElements.get('md-chip-set');
  const hasFilter = !!customElements.get('md-filter-chip');
  if (!hasSet) await import('@material/web/chips/chip-set.js');
  if (!hasFilter) await import('@material/web/chips/filter-chip.js');
}

/** Toggles an item in an array immutably */
export function toggleItemInArray(arr, item) {
  return arr.includes(item) ?
    arr.filter(i => i !== item) :
    [...arr, item];
}

/** Ritorna il template dei chip basandosi su tutti gli elementi e quelli selezionati */
export function renderFilterChips(allItems, selectedItems, onToggle) {
  return html`
    <md-chip-set aria-label="Filter categories" selectable>
      ${allItems.map(item => html`
        <md-filter-chip
          .label=${item}
          ?selected=${selectedItems.includes(item)}
          ?removable=${selectedItems.includes(item)}
          @click=${() => onToggle(item)}
        >
          ${item}
        </md-filter-chip>
      `)}
    </md-chip-set>
  `;
}