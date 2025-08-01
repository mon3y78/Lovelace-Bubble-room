// src/helpers/chip-utils.js
import { html } from 'lit';

/**
 * Carica dinamicamente i componenti Material Web Chips
 * (md-focus-ring e md-filter-chip) solo la prima volta.
 */
export async function loadMaterialChips() {
  // md-focus-ring viene definito in chip-set.js
  if (!customElements.get('md-focus-ring')) {
    await import('@material/web/chips/chip-set.js');
  }
  // md-filter-chip viene definito in filter-chip.js
  if (!customElements.get('md-filter-chip')) {
    await import('@material/web/chips/filter-chip.js');
  }
}

/**
 * Rende un set di filter-chip in Lit grazie a @material/web.
 *
 * @param {Object}   options
 * @param {string[]} options.categories  – lista di tutti i nomi dei chip possibili
 * @param {string[]} options.selected    – lista dei chip attualmente selezionati
 * @param {Function} options.onToggle    – callback chiamata con il nome del chip cliccato
 * @param {string}   [options.ariaLabel="Filter chips"] – label ARIA per md-chip-set
 *
 * @returns {TemplateResult}
 */
export function renderFilterChips({
  categories,
  selected,
  onToggle,
  ariaLabel = 'Filter chips',
}) {
  return html`
    <md-chip-set aria-label="${ariaLabel}" selectable>
      ${categories.map(
        (cat) => html`
          <md-filter-chip
            .label=${cat}
            ?selected=${selected.includes(cat)}
            ?removable=${selected.includes(cat)}
            @click=${() => onToggle(cat)}
          ></md-filter-chip>
        `
      )}
    </md-chip-set>
  `;
}