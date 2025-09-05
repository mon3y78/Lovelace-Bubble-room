// src/helpers/icon-mapping.js

// Cache opzionale (se non esiste il modulo, usiamo una Map interna)
let _cache;
try {
  // eslint-disable-next-line import/no-unresolved
  const { IconCache } = await import('./icon-cache.js');
  _cache = IconCache;
} catch (_e) {
  _cache = {
    _m: new Map(),
    get(k) { return this._m.get(k); },
    set(k, v) { this._m.set(k, v); },
  };
}

export const DEFAULT_ICON = 'mdi:bookmark';

export const DOMAIN_ICON_MAP = {
  light: 'mdi:lightbulb',
  switch: 'mdi:toggle-switch',
  fan: 'mdi:fan',
  climate: 'mdi:thermostat',
  media_player: 'mdi:play-circle',
  script: 'mdi:script-text',
  scene: 'mdi:palette',
  lock: 'mdi:lock',
  camera: 'mdi:video',
  binary_sensor: 'mdi:checkbox-marked-circle-outline',
  sensor: 'mdi:eye',
  alarm_control_panel: 'mdi:shield-home',
  vacuum: 'mdi:robot-vacuum',
  siren: 'mdi:bullhorn',
};

export const DEVICE_CLASS_ICON_MAP = {
  door:        { on: 'mdi:door-open',        off: 'mdi:door-closed' },
  window:      { on: 'mdi:window-open',      off: 'mdi:window-closed' },
  motion:      { on: 'mdi:motion-sensor',    off: 'mdi:motion-sensor-off' },
  moisture:    { on: 'mdi:water-alert',      off: 'mdi:water-off' },
  smoke:       { on: 'mdi:smoke',            off: 'mdi:smoke-detector-off' },
  gas:         { on: 'mdi:gas-cylinder',     off: 'mdi:gas-off' },
  lock:        { on: 'mdi:lock-open-variant',off: 'mdi:lock' },
  garage:      { on: 'mdi:garage-open',      off: 'mdi:garage' },
  light:       { on: 'mdi:lightbulb-on',     off: 'mdi:lightbulb-off' },
  plug:        { on: 'mdi:power-plug',       off: 'mdi:power-plug-off' },
  presence:    { on: 'mdi:account',          off: 'mdi:account-off' },
  vibration:   { on: 'mdi:vibrate',          off: 'mdi:vibrate-off' },
  opening:     { on: 'mdi:door-open',        off: 'mdi:door-closed' },
  battery:     { on: 'mdi:battery',          off: 'mdi:battery-outline' },
  connectivity:{ on: 'mdi:wifi',             off: 'mdi:wifi-off' },
  safety:      { on: 'mdi:shield-check',     off: 'mdi:shield-off' },
  cold:        { on: 'mdi:snowflake',        off: 'mdi:snowflake-off' },
};

function _normalizeArgs(a, b) {
  const looksLikeHassFirst = a && typeof a === 'object' && a.states && typeof b === 'string';
  return looksLikeHassFirst ? { entityId: b, hass: a } : { entityId: a, hass: b };
}

function _domain(entityId) {
  return (entityId || '').split('.')[0] || '';
}

function _stateIsOnLike(s) {
  // stati che indicano "attivo"/"aperto"/"in funzione"
  return s === 'on' || s === 'open' || s === 'unlocked' || s === 'playing' || s === 'active';
}

function _deviceClassIcon(devClass, state) {
  const map = DEVICE_CLASS_ICON_MAP[devClass];
  if (!map) return null;
  return _stateIsOnLike(state) ? map.on : map.off;
}

/**
 * Risolve l'icona di un'entità.
 * Firma accettata:
 *   resolveEntityIcon(entityId, hass)
 *   resolveEntityIcon(hass, entityId)  ← compat
 */
export function resolveEntityIcon(a, b) {
  const { entityId, hass } = _normalizeArgs(a, b);
  if (!entityId) return DEFAULT_ICON;

  const cached = _cache?.get?.(entityId);
  if (cached) return cached;

  const st = hass?.states?.[entityId];
  const attrs = st?.attributes || {};
  const domain = _domain(entityId);

  // 1) Usa l'attributo icon se è stato esplicitamente definito
  if (attrs.icon) {
    _cache?.set?.(entityId, attrs.icon);
    return attrs.icon;
  }

  // 2) Se esiste device_class, usa la logica dinamica come nel core
  if (attrs.device_class) {
    const icon = _deviceClassIcon(attrs.device_class, st?.state);
    if (icon) {
      _cache?.set?.(entityId, icon);
      return icon;
    }
  }


  // 2) device_class on/off
  const devClassIcon = attrs.device_class ? _deviceClassIcon(attrs.device_class, st?.state) : null;
  if (devClassIcon) {
    _cache?.set?.(entityId, devClassIcon);
    return devClassIcon;
  }

  // 3) icona per dominio
  const byDomain = DOMAIN_ICON_MAP[domain] || DEFAULT_ICON;
  _cache?.set?.(entityId, byDomain);
  return byDomain;
}

// Esporta anche come default per compatibilità con import legacy
export default resolveEntityIcon;
