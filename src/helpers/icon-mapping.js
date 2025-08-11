// src/helpers/icon-mapping.js

/** Icone dipendenti dalla device_class e dallo stato on/off */
export const DEVICE_CLASS_ICON_MAP = {
  door:         { on: 'mdi:door-open',              off: 'mdi:door-closed' },
  window:       { on: 'mdi:window-open',            off: 'mdi:window-closed' },
  motion:       { on: 'mdi:motion-sensor',          off: 'mdi:motion-sensor-off' },
  moisture:     { on: 'mdi:water-alert',            off: 'mdi:water-off' },
  smoke:        { on: 'mdi:smoke',                  off: 'mdi:smoke-detector-off' },
  gas:          { on: 'mdi:gas-cylinder',           off: 'mdi:gas-off' },
  lock:         { on: 'mdi:lock-open-variant',      off: 'mdi:lock' },
  garage:       { on: 'mdi:garage-open',            off: 'mdi:garage' },
  light:        { on: 'mdi:lightbulb-on',           off: 'mdi:lightbulb-off' },
  plug:         { on: 'mdi:power-plug',             off: 'mdi:power-plug-off' },
  presence:     { on: 'mdi:account',                off: 'mdi:account-off' },
  vibration:    { on: 'mdi:vibrate',                off: 'mdi:vibrate-off' },
  opening:      { on: 'mdi:door-open',              off: 'mdi:door-closed' },
  battery:      { on: 'mdi:battery',                off: 'mdi:battery-outline' },
  connectivity: { on: 'mdi:wifi',                   off: 'mdi:wifi-off' },
  safety:       { on: 'mdi:shield-check',           off: 'mdi:shield-off' },
  cold:         { on: 'mdi:snowflake',              off: 'mdi:snowflake-off' }
};

/** Sensor “tipologici”: icona + unità suggerita */
export const SENSOR_TYPE_ICON_MAP = {
  temperature: { icon: 'mdi:thermometer',       unit: '°C' },
  humidity:    { icon: 'mdi:water-percent',     unit: '%' },
  co2:         { icon: 'mdi:molecule-co2',      unit: 'ppm' },
  lux:         { icon: 'mdi:brightness-5',      unit: 'lx' },
  uv:          { icon: 'mdi:weather-sunny-alert', unit: 'UV' },
  pressure:    { icon: 'mdi:gauge',             unit: 'hPa' },
  noise:       { icon: 'mdi:volume-high',       unit: 'dB' },
  pm25:        { icon: 'mdi:blur',              unit: 'µg/m³' },
  pm10:        { icon: 'mdi:blur-linear',       unit: 'µg/m³' }
};

export const DEFAULT_ICON = 'mdi:bookmark';

/** Fallback per dominio (se non c’è icona specifica o device_class) */
export const DOMAIN_ICON_MAP = {
  light:               'mdi:lightbulb',
  switch:              'mdi:toggle-switch',
  fan:                 'mdi:fan',
  climate:             'mdi:thermostat',
  cover:               'mdi:window-shutter',
  media_player:        'mdi:play-circle',
  script:              'mdi:script-text',
  scene:               'mdi:palette',
  lock:                'mdi:lock',
  camera:              'mdi:video',
  binary_sensor:       'mdi:checkbox-marked-circle-outline',
  sensor:              'mdi:eye',
  alarm_control_panel: 'mdi:shield-home',
  vacuum:              'mdi:robot-vacuum',
  siren:               'mdi:bullhorn'
};

/* ======================================================================================
 * CACHING ICON: evita ricalcoli ad ogni render quando lo stato non è cambiato davvero
 * --------------------------------------------------------------------------------------
 * Strategia:
 *  - chiave cache per entityId
 *  - firma basata su: icona custom, device_class, domain, stato
 *  - se la firma non cambia → ritorna subito l’icona cache
 *  - invalidate automatica quando cambia una delle parti (stato, icon, device_class)
 * ====================================================================================== */

const _iconCache = new Map(); // entityId -> { sig, icon }

/** Costruisce una firma “stabile” per l’entità, sufficiente per invalidare la cache */
function _iconSignature(entityId, hass) {
  const st   = hass?.states?.[entityId];
  const attr = st?.attributes || {};
  const customIcon = attr.icon || '';                // icona forzata dall’utente/integr.
  const devClass   = attr.device_class || '';        // es. door, motion, battery…
  const domain     = (entityId?.split?.('.')?.[0]) || '';
  const state      = st?.state ?? '';
  // includiamo tutto ciò che può cambiare l’icona
  return `${customIcon}||${devClass}||${domain}||${state}`;
}

/** Ritorna l’icona per dominio (fallback) */
function _domainIcon(domain) {
  return DOMAIN_ICON_MAP[domain] || DEFAULT_ICON;
}

/** Ritorna l’icona per device_class+stato, se presente */
function _deviceClassIcon(devClass, state) {
  const map = DEVICE_CLASS_ICON_MAP[devClass];
  if (!map) return null;
  return state === 'on' ? (map.on || null) : (map.off || null);
}

/**
 * Risolve l’icona migliore per una entity:
 *  1) icona custom (attributes.icon)
 *  2) icona da device_class + stato on/off
 *  3) icona per dominio
 *  4) DEFAULT_ICON
 * Con caching per evitare lavoro ripetuto.
 */
export function resolveEntityIcon(entityId, hass) {
  if (!entityId) return DEFAULT_ICON;

  const sig = _iconSignature(entityId, hass);
  const cached = _iconCache.get(entityId);
  if (cached && cached.sig === sig) {
    return cached.icon;
  }

  const st     = hass?.states?.[entityId];
  const attrs  = st?.attributes || {};
  const custom = attrs.icon;
  const domain = (entityId.split?.('.')?.[0]) || '';
  const dev    = attrs.device_class;
  const iconDC = dev ? _deviceClassIcon(dev, st?.state) : null;

  const result = custom || iconDC || _domainIcon(domain) || DEFAULT_ICON;

  _iconCache.set(entityId, { sig, icon: result });
  return result;
}

/** Permette di invalidare la cache per una singola entity (opzionale) */
export function clearEntityIconCache(entityId) {
  if (entityId) _iconCache.delete(entityId);
}

/** Svuota completamente la cache (opzionale) */
export function clearAllIconCache() {
  _iconCache.clear();
}

/* ======================================================================================
 * Utility opzionali per sensori “tipologici” (coerenti con SENSOR_TYPE_ICON_MAP)
 * ====================================================================================== */

/** Ritorna { icon, unit } per un tipo sensore noto; altrimenti fallback */
export function resolveSensorTypeVisual(type, fallbackUnit = '') {
  const t = String(type || '').toLowerCase();
  const hit = SENSOR_TYPE_ICON_MAP[t];
  if (hit) return { icon: hit.icon, unit: hit.unit };
  return { icon: DOMAIN_ICON_MAP.sensor || DEFAULT_ICON, unit: fallbackUnit };
}
// src/helpers/icon-mapping.js

/** Icone dipendenti dalla device_class e dallo stato on/off */
export const DEVICE_CLASS_ICON_MAP = {
  door:         { on: 'mdi:door-open',              off: 'mdi:door-closed' },
  window:       { on: 'mdi:window-open',            off: 'mdi:window-closed' },
  motion:       { on: 'mdi:motion-sensor',          off: 'mdi:motion-sensor-off' },
  moisture:     { on: 'mdi:water-alert',            off: 'mdi:water-off' },
  smoke:        { on: 'mdi:smoke',                  off: 'mdi:smoke-detector-off' },
  gas:          { on: 'mdi:gas-cylinder',           off: 'mdi:gas-off' },
  lock:         { on: 'mdi:lock-open-variant',      off: 'mdi:lock' },
  garage:       { on: 'mdi:garage-open',            off: 'mdi:garage' },
  light:        { on: 'mdi:lightbulb-on',           off: 'mdi:lightbulb-off' },
  plug:         { on: 'mdi:power-plug',             off: 'mdi:power-plug-off' },
  presence:     { on: 'mdi:account',                off: 'mdi:account-off' },
  vibration:    { on: 'mdi:vibrate',                off: 'mdi:vibrate-off' },
  opening:      { on: 'mdi:door-open',              off: 'mdi:door-closed' },
  battery:      { on: 'mdi:battery',                off: 'mdi:battery-outline' },
  connectivity: { on: 'mdi:wifi',                   off: 'mdi:wifi-off' },
  safety:       { on: 'mdi:shield-check',           off: 'mdi:shield-off' },
  cold:         { on: 'mdi:snowflake',              off: 'mdi:snowflake-off' }
};

/** Sensor “tipologici”: icona + unità suggerita */
export const SENSOR_TYPE_ICON_MAP = {
  temperature: { icon: 'mdi:thermometer',       unit: '°C' },
  humidity:    { icon: 'mdi:water-percent',     unit: '%' },
  co2:         { icon: 'mdi:molecule-co2',      unit: 'ppm' },
  lux:         { icon: 'mdi:brightness-5',      unit: 'lx' },
  uv:          { icon: 'mdi:weather-sunny-alert', unit: 'UV' },
  pressure:    { icon: 'mdi:gauge',             unit: 'hPa' },
  noise:       { icon: 'mdi:volume-high',       unit: 'dB' },
  pm25:        { icon: 'mdi:blur',              unit: 'µg/m³' },
  pm10:        { icon: 'mdi:blur-linear',       unit: 'µg/m³' }
};

export const DEFAULT_ICON = 'mdi:bookmark';

/** Fallback per dominio (se non c’è icona specifica o device_class) */
export const DOMAIN_ICON_MAP = {
  light:               'mdi:lightbulb',
  switch:              'mdi:toggle-switch',
  fan:                 'mdi:fan',
  climate:             'mdi:thermostat',
  cover:               'mdi:window-shutter',
  media_player:        'mdi:play-circle',
  script:              'mdi:script-text',
  scene:               'mdi:palette',
  lock:                'mdi:lock',
  camera:              'mdi:video',
  binary_sensor:       'mdi:checkbox-marked-circle-outline',
  sensor:              'mdi:eye',
  alarm_control_panel: 'mdi:shield-home',
  vacuum:              'mdi:robot-vacuum',
  siren:               'mdi:bullhorn'
};

/* ======================================================================================
 * CACHING ICON: evita ricalcoli ad ogni render quando lo stato non è cambiato davvero
 * --------------------------------------------------------------------------------------
 * Strategia:
 *  - chiave cache per entityId
 *  - firma basata su: icona custom, device_class, domain, stato
 *  - se la firma non cambia → ritorna subito l’icona cache
 *  - invalidate automatica quando cambia una delle parti (stato, icon, device_class)
 * ====================================================================================== */

const _iconCache = new Map(); // entityId -> { sig, icon }

/** Costruisce una firma “stabile” per l’entità, sufficiente per invalidare la cache */
function _iconSignature(entityId, hass) {
  const st   = hass?.states?.[entityId];
  const attr = st?.attributes || {};
  const customIcon = attr.icon || '';                // icona forzata dall’utente/integr.
  const devClass   = attr.device_class || '';        // es. door, motion, battery…
  const domain     = (entityId?.split?.('.')?.[0]) || '';
  const state      = st?.state ?? '';
  // includiamo tutto ciò che può cambiare l’icona
  return `${customIcon}||${devClass}||${domain}||${state}`;
}

/** Ritorna l’icona per dominio (fallback) */
function _domainIcon(domain) {
  return DOMAIN_ICON_MAP[domain] || DEFAULT_ICON;
}

/** Ritorna l’icona per device_class+stato, se presente */
function _deviceClassIcon(devClass, state) {
  const map = DEVICE_CLASS_ICON_MAP[devClass];
  if (!map) return null;
  return state === 'on' ? (map.on || null) : (map.off || null);
}

/**
 * Risolve l’icona migliore per una entity:
 *  1) icona custom (attributes.icon)
 *  2) icona da device_class + stato on/off
 *  3) icona per dominio
 *  4) DEFAULT_ICON
 * Con caching per evitare lavoro ripetuto.
 */
export function resolveEntityIcon(entityId, hass) {
  if (!entityId) return DEFAULT_ICON;

  const sig = _iconSignature(entityId, hass);
  const cached = _iconCache.get(entityId);
  if (cached && cached.sig === sig) {
    return cached.icon;
  }

  const st     = hass?.states?.[entityId];
  const attrs  = st?.attributes || {};
  const custom = attrs.icon;
  const domain = (entityId.split?.('.')?.[0]) || '';
  const dev    = attrs.device_class;
  const iconDC = dev ? _deviceClassIcon(dev, st?.state) : null;

  const result = custom || iconDC || _domainIcon(domain) || DEFAULT_ICON;

  _iconCache.set(entityId, { sig, icon: result });
  return result;
}

/** Permette di invalidare la cache per una singola entity (opzionale) */
export function clearEntityIconCache(entityId) {
  if (entityId) _iconCache.delete(entityId);
}

/** Svuota completamente la cache (opzionale) */
export function clearAllIconCache() {
  _iconCache.clear();
}

/* ======================================================================================
 * Utility opzionali per sensori “tipologici” (coerenti con SENSOR_TYPE_ICON_MAP)
 * ====================================================================================== */

/** Ritorna { icon, unit } per un tipo sensore noto; altrimenti fallback */
export function resolveSensorTypeVisual(type, fallbackUnit = '') {
  const t = String(type || '').toLowerCase();
  const hit = SENSOR_TYPE_ICON_MAP[t];
  if (hit) return { icon: hit.icon, unit: hit.unit };
  return { icon: DOMAIN_ICON_MAP.sensor || DEFAULT_ICON, unit: fallbackUnit };
}
