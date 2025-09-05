
// src/helpers/icon-mapping.js

// Cache opzionale (se non esiste il modulo, usiamo una Map interna)
let _cache;
try {
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
  input_boolean: 'mdi:toggle-switch',
  humidifier: 'mdi:air-humidifier',
};

export const DEVICE_CLASS_ICON_MAP = {
  door: { on: 'mdi:door-open', off: 'mdi:door-closed' },
  window: { on: 'mdi:window-open', off: 'mdi:window-closed' },
  motion: { on: 'mdi:motion-sensor', off: 'mdi:motion-sensor-off' },
  moisture: { on: 'mdi:water-alert', off: 'mdi:water-off' },
  smoke: { on: 'mdi:smoke', off: 'mdi:smoke-detector-off' },
  gas: { on: 'mdi:gas-cylinder', off: 'mdi:gas-off' },
  lock: { on: 'mdi:lock-open-variant', off: 'mdi:lock' },
  garage: { on: 'mdi:garage-open', off: 'mdi:garage' },
  light: { on: 'mdi:lightbulb-on', off: 'mdi:lightbulb-off' },
  plug: { on: 'mdi:power-plug', off: 'mdi:power-plug-off' },
  presence: { on: 'mdi:account', off: 'mdi:account-off' },
  vibration: { on: 'mdi:vibrate', off: 'mdi:vibrate-off' },
  opening: { on: 'mdi:door-open', off: 'mdi:door-closed' },
  battery: { on: 'mdi:battery', off: 'mdi:battery-outline' },
  connectivity: { on: 'mdi:wifi', off: 'mdi:wifi-off' },
  safety: { on: 'mdi:shield-check', off: 'mdi:shield-off' },
  cold: { on: 'mdi:snowflake', off: 'mdi:snowflake-off' },
  blind: { on: 'mdi:blinds-open', off: 'mdi:blinds' },
  curtain: { on: 'mdi:curtains-open', off: 'mdi:curtains-closed' },
  shutter: { on: 'mdi:window-shutter-open', off: 'mdi:window-shutter' },
  awning: { on: 'mdi:awning-open', off: 'mdi:awning' },
  shade: { on: 'mdi:blinds-open', off: 'mdi:blinds' },
  gate: { on: 'mdi:gate-open', off: 'mdi:gate' },
  damper: { on: 'mdi:air-filter', off: 'mdi:air-filter-alert' },
  garage_door: { on: 'mdi:garage-open', off: 'mdi:garage' },
  occupancy: { on: 'mdi:account-group', off: 'mdi:account-off' },
  running: { on: 'mdi:play', off: 'mdi:stop' },
  problem: { on: 'mdi:alert', off: 'mdi:check-circle' },
  sound: { on: 'mdi:volume-high', off: 'mdi:volume-off' },
  tamper: { on: 'mdi:cellphone-alert', off: 'mdi:cellphone-check' },
  update: { on: 'mdi:update-alert', off: 'mdi:update' },
  carbon_monoxide: { on: 'mdi:cloud-alert', off: 'mdi:cloud-check' },
  heat: { on: 'mdi:thermometer-high', off: 'mdi:thermometer-low' },
  moving: { on: 'mdi:arrow-up-down-bold', off: 'mdi:ray-vertex' },
  power: { on: 'mdi:flash', off: 'mdi:flash-off' },
};

function _normalizeArgs(a, b) {
  const looksLikeHassFirst = a && typeof a === 'object' && a.states && typeof b === 'string';
  return looksLikeHassFirst ? { entityId: b, hass: a } : { entityId: a, hass: b };
}

function _domain(entityId) {
  return (entityId || '').split('.')[0] || '';
}

function _stateIsOnLike(s) {
  return ['on', 'open', 'unlocked', 'playing', 'active'].includes(s);
}

export function resolveEntityIcon(a, b) {
  const { entityId, hass } = _normalizeArgs(a, b);
  if (!entityId) return DEFAULT_ICON;

  const cached = _cache?.get?.(entityId);
  if (cached) return cached;

  const st = hass?.states?.[entityId];
  const attrs = st?.attributes || {};
  const domain = _domain(entityId);
  const state = st?.state;

  if (attrs.icon) {
    _cache?.set?.(entityId, attrs.icon);
    return attrs.icon;
  }

  const devClass = attrs.device_class;
  if (devClass && DEVICE_CLASS_ICON_MAP[devClass]) {
    const icon = _stateIsOnLike(state)
      ? DEVICE_CLASS_ICON_MAP[devClass].on
      : DEVICE_CLASS_ICON_MAP[devClass].off;
    _cache?.set?.(entityId, icon);
    return icon;
  }

  const domainIconMap = {
    light: ['mdi:lightbulb-on', 'mdi:lightbulb-off'],
    switch: ['mdi:toggle-switch', 'mdi:toggle-switch-off'],
    fan: ['mdi:fan', 'mdi:fan-off'],
    lock: ['mdi:lock-open-variant', 'mdi:lock'],
    media_player: ['mdi:play-circle', 'mdi:stop-circle'],
    humidifier: ['mdi:air-humidifier', 'mdi:air-humidifier-off'],
    siren: ['mdi:bullhorn-variant', 'mdi:bullhorn-outline'],
    vacuum: ['mdi:robot-vacuum', 'mdi:robot-vacuum-off'],
    input_boolean: ['mdi:toggle-switch', 'mdi:toggle-switch-off'],
    scene: ['mdi:palette', 'mdi:palette-outline'],
    script: ['mdi:script-text-play-outline', 'mdi:script-text-outline'],
    alarm_control_panel: ['mdi:shield-lock', 'mdi:shield-outline'],
    camera: ['mdi:cctv', 'mdi:cctv-off'],
  };

  if (domainIconMap[domain]) {
    const [iconOn, iconOff] = domainIconMap[domain];
    const icon = _stateIsOnLike(state) ? iconOn : iconOff;
    _cache?.set?.(entityId, icon);
    return icon;
  }

  const fallback = DOMAIN_ICON_MAP[domain] || DEFAULT_ICON;
  _cache?.set?.(entityId, fallback);
  return fallback;
}

export default resolveEntityIcon;