// src/helpers/color-utils.js
// Canvas condiviso per il parsing dei colori CSS — un'istanza per tutta la card.
let _canvas = null;
let _ctx = null;

function _getCtx() {
  if (_ctx) return _ctx;
  if (typeof document === 'undefined') return null;
  _canvas = document.createElement('canvas');
  _canvas.width = _canvas.height = 1;
  _ctx = _canvas.getContext('2d', { willReadFrequently: true }) || _canvas.getContext('2d');
  return _ctx;
}

/**
 * Converte qualsiasi stringa colore CSS in { r, g, b, a }.
 * Restituisce null per CSS custom properties (var(...)) o valori non validi.
 */
export function parseColor(color) {
  if (!color || typeof color !== 'string' || color.startsWith('var(')) return null;

  const ctx = _getCtx();
  if (!ctx) return null;

  try {
    ctx.fillStyle = '#000';
    ctx.fillStyle = color;
  } catch {
    return null;
  }

  const normalized = ctx.fillStyle;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = normalized;
  ctx.fillRect(0, 0, 1, 1);

  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return { r, g, b, a: a / 255 };
}

/**
 * Restituisce rgba(...) con l'alpha specificato, o null se il colore non è risolvibile.
 */
export function colorWithOpacity(color, alpha) {
  const parsed = parseColor(color);
  if (!parsed) return null;
  return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${alpha})`;
}
