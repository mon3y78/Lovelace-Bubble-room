// src/helpers/chip-utils.js
let _chipsPromise;

/**
 * Carica UNA SOLA VOLTA @material/web/chips/filter-chip.js
 * (che porta con sé anche chip-set.js e focus-ring).
 * Blocca le chiamate concorrenti in un'unica Promise.
 */
export function loadMaterialChips() {
  if (!_chipsPromise) {
    _chipsPromise = (async () => {
      try {
        // Se non è già registrato, importalo
        if (!customElements.get('md-filter-chip')) {
          await import('@material/web/chips/filter-chip.js');
        }
      } catch (err) {
        // Se per qualsiasi motivo fallisce (duplicate define, 404, ecc)
        console.warn('loadMaterialChips error:', err);
      }
    })();
  }
  return _chipsPromise;
}