/**
 * utils.js
 * Funzioni di utilità generiche per Bubble Room.
 * Da importare dove serve (es: BubbleSensor, BubbleMushroom, BubbleIcon).
 * Include:
 *  - Parsing di entity_id (getDomain)
 *  - Verifica numeri (isNumeric)
 *  - Fallback icone (getDefaultIcon)
 *  - Clamp di valori numerici
 *  - Funzioni di auto-ridimensionamento testo e icone per adattarsi ai contenitori
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

/**
 * Limita un valore tra min e max
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Ridimensiona dinamicamente la font-size di un elemento testo per adattarsi a un contenitore.
 * container: HTMLElement contenitore
 * text: HTMLElement testo interno (es: span)
 * options: { minFont?: number, maxFont?: number, letterSpacing?: number }
 * Restituisce la font-size usata.
 */
export function autoResizeFont(container, text, options = {}) {
  if (!container || !text) return;
  const maxFont = options.maxFont ?? 300;
  const minFont = options.minFont ?? 5;
  let fontSize = maxFont;
  let spacing = options.letterSpacing ?? 0;
  
  text.style.letterSpacing = `${spacing}px`;
  text.style.fontSize = `${fontSize}px`;
  
  // Prova a scalare giù la font-size finché tutto il testo entra (senza mai andare sotto minFont)
  while (
    (text.offsetWidth > container.offsetWidth ||
      text.offsetHeight > container.offsetHeight) &&
    fontSize > minFont
  ) {
    fontSize -= 1;
    text.style.fontSize = `${fontSize}px`;
  }
  return fontSize;
}

/**
 * Calcola una dimensione icona scalata rispetto a un contenitore rettangolare
 * Esempio: getScaledIconSize(width, height, 0.7) // 70% del lato più piccolo
 */
export function getScaledIconSize(width, height, scale = 0.7) {
  return Math.round(Math.min(width, height) * scale);
}