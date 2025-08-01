/**
 * Centralizza il caricamento dei componenti Material Chips:
 * - md-focus-ring (chip-set.js)  
 * - md-filter-chip (filter-chip.js)
 *
 * Chiama loadMaterialChips() da tutti i pannelli che usano i chips
 * (RoomPanel, SensorPanel, …) per evitare doppie definizioni.
 */

export async function loadMaterialChips() {
  // Verifica se md-focus-ring e md-filter-chip sono già stati definiti
  const hasFocus = !!customElements.get('md-focus-ring');
  const hasFilter = !!customElements.get('md-filter-chip');
  
  // Se non abbiamo mai caricato md-focus-ring, importalo
  if (!hasFocus) {
    await import('@material/web/chips/chip-set.js');
  }
  
  // Se non abbiamo ancora il filter-chip, importalo
  if (!hasFilter) {
    await import('@material/web/chips/filter-chip.js');
  }
}