// src/helpers/chip-utils.js
import { html } from 'lit';

/**
 * Carica dinamicamente i Material Web Chips (chip-set + filter-chip)
 * solo la prima volta.
 */
export async function loadMaterialChips() {
  if (!customElements.get('md-focus-ring')) {
    await import('@material/web/chips/chip-set.js');
  }
  if (!customElements.get('md-filter-chip')) {
    await import('@material/web/chips/filter-chip.js');
  }
}

/**
 * Toggles an item in an array: se non c'è lo aggiunge, altrimenti lo rimuove.
 * Restituisce un nuovo array.
 */
export function toggleItemInArray(arr, item) {
  const idx = arr.indexOf(item);
  return idx === -1 ?
    [...arr, item] :
    arr.filter((_, i) => i !== idx);
}

/**
 * Ritorna un template Lit di <md-chip-set> con i filter-chip.
 * @param {string[]} categories   // lista di chiavi
 * @param {string[]} selected     // lista di chiavi attive
 * @param {function(string):void} onToggle  // callback al click su un chip
 */
export function renderFilterChips(categories, selected, onToggle) {
  return html`
    <md-chip-set aria-label="Filter categories" selectable>
      ${categories.map(cat => html`
        <md-filter-chip
          .label=${cat}
          ?selected=${selected.includes(cat)}
          @click=${() => onToggle(cat)}
        ></md-filter-chip>
      `)}
    </md-chip-set>
  `;
}

/**
 * Costruisce le options per <ha-selector select mode="box">
 * a partire da un array di chiavi stringa.
 */
export function makeBoxOptions(keys) {
  return keys.map(k => ({
    value: k,
    label: k.charAt(0).toUpperCase() + k.slice(1),
  }));
}