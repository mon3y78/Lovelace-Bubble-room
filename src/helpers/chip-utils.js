// src/helpers/chip-utils.js

/**
 * Carica i componenti di @material/web/chips solo se non sono già stati definiti,
 * evitando il doppio customElements.define(...) e le eccezioni in console.
 */

export async function loadMaterialChips() {
  // md-focus-ring viene definito in chip-set.js
  if (!customElements.get('md-focus-ring')) {
    // registra <md-focus-ring> e <md-chip-set>
    await import('@material/web/chips/chip-set.js');
  }
  // md-filter-chip viene definito in filter-chip.js
  if (!customElements.get('md-filter-chip')) {
    // registra <md-filter-chip>
    await import('@material/web/chips/filter-chip.js');
  }
}