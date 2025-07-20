/**
 * utils.js
 * Funzioni di utilità generiche per Bubble Room
 * Usare solo come import nei componenti!
 * Autore: mon3y78 (https://github.com/mon3y78)
 */

/**
 * Estrae la parte "domain" di una entity_id Home Assistant (es: "light.salotto" => "light")
 */
export function getDomain(entityId) {
  return entityId?.split('.')?.[0] ?? '';
}

/**
 * Controlla se una stringa rappresenta un numero valido
 */
export function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

/**
 * Fallback per icone: se non c’è, ritorna una di default
 */
export function getDefaultIcon() {
  return 'mdi:information-outline';
}