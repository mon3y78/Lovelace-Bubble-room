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

// --- Azioni tap/hold centralizzate Bubble Room ---
const HOLD_DELAY = 500;
let holdTimeout = null;
let holdTriggered = false;

export function onPointerDown(e, conf, hass, onTap, onHold) {
  e.stopPropagation();
  holdTriggered = false;
  holdTimeout = setTimeout(() => {
    holdTriggered = true;
    if (onHold) onHold(conf, hass);
  }, HOLD_DELAY);
}
export function onPointerUp(e, conf, hass, onTap, onHold) {
  e.stopPropagation();
  clearTimeout(holdTimeout);
  if (!holdTriggered && onTap) onTap(conf, hass);
  holdTriggered = false;
}
export function onPointerLeave() {
  clearTimeout(holdTimeout);
  holdTriggered = false;
}

export function doTapAction(conf, hass) {
  if (!conf?.tap_action || conf.tap_action.action === 'none') return;
  const action = conf.tap_action.action;
  if (action === 'toggle') hass.callService('homeassistant', 'toggle', { entity_id: conf.entity });
  else if (action === 'more-info')
    window.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: conf.entity }, bubbles: true, composed: true }));
  else if (action === 'navigate' && conf.tap_action.navigation_path) {
    window.history.pushState({}, '', conf.tap_action.navigation_path);
    window.dispatchEvent(new Event('location-changed'));
  }
}
export function doHoldAction(conf, hass) {
  if (!conf?.hold_action || conf.hold_action.action === 'none') {
    window.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: conf.entity }, bubbles: true, composed: true }));
    return;
  }
  const action = conf.hold_action.action;
  if (action === 'toggle') hass.callService('homeassistant', 'toggle', { entity_id: conf.entity });
  else if (action === 'more-info')
    window.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: conf.entity }, bubbles: true, composed: true }));
  else if (action === 'navigate' && conf.hold_action.navigation_path) {
    window.history.pushState({}, '', conf.hold_action.navigation_path);
    window.dispatchEvent(new Event('location-changed'));
  }
  else if (action === 'call-service' && conf.hold_action.service) {
    const [domain, serviceName] = conf.hold_action.service.split('.');
    const serviceData = conf.hold_action.service_data || {};
    if (!serviceData.entity_id) serviceData.entity_id = conf.entity;
    hass.callService(domain, serviceName, serviceData);
  }
}