
// src/helpers/icon-mapping.js

// Cache locale entità → icona (Map semplice, nessun top-level await necessario)
const _iconCache = new Map();

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

  const cached = _iconCache.get(entityId);
  if (cached) return cached;

  const st = hass?.states?.[entityId];
  const attrs = st?.attributes || {};
  const domain = _domain(entityId);
  const state = st?.state;

  if (attrs.icon) {
    _iconCache.set(entityId, attrs.icon);
    return attrs.icon;
  }

  const devClass = attrs.device_class;
  if (devClass && DEVICE_CLASS_ICON_MAP[devClass]) {
    const icon = _stateIsOnLike(state)
      ? DEVICE_CLASS_ICON_MAP[devClass].on
      : DEVICE_CLASS_ICON_MAP[devClass].off;
    _iconCache.set(entityId, icon);
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
    _iconCache.set(entityId, icon);
    return icon;
  }

  const fallback = DOMAIN_ICON_MAP[domain] || DEFAULT_ICON;
  _iconCache.set(entityId, fallback);
  return fallback;
}

export default resolveEntityIcon;

/**
 * Ritorna la classe di animazione da applicare all'icona attiva.
 * Funziona con qualsiasi prefisso di icon set: mdi:, hue:, fas:, fab:, m3o:, phu:, ecc.
 * Il match avviene solo sul nome dell'icona (dopo il ':').
 *
 * @param {string} icon  - stringa icona (es. "mdi:fan", "hue:bloom", "fas:lightbulb")
 * @param {string} kind  - tipo entità opzionale (es. "camera")
 * @returns {string} classe CSS animazione o stringa vuota
 */
export function getIconAnimClass(icon, kind = '') {
  // Strip prefix (mdi:, hue:, fas:, fab:, m3o:, phu: …)
  const raw = (icon || '').toLowerCase();
  const name = raw.includes(':') ? raw.split(':').pop() : raw;

  // --- scan: telecamere & video ---
  if (kind === 'camera' || name.includes('cctv') || name.includes('camera') ||
      name.includes('webcam') || name.includes('doorbell') || name.includes('video') ||
      name.includes('telescope') || name.includes('binoculars'))
    return 'anim-scan';

  // --- spin: rotazione continua ---
  if (name.includes('fan') || name.includes('propeller') || name.includes('turbine') ||
      name.includes('wind-turbine') || name.includes('rotate') || name.includes('reload') ||
      name.includes('refresh') || name.includes('sync') || name.includes('loading') ||
      name.includes('disc') || name.includes('record') || name.includes('vinyl') ||
      name.includes('wheel') || name.includes('circular') || name.includes('spinner'))
    return 'anim-spin';

  // --- illuminate: luci e fiamme ---
  // MDI
  if (name.includes('lightbulb') || name.includes('lamp') || name.includes('bulb') ||
      name.includes('chandelier') || name.includes('ceiling-light') || name.includes('floor-lamp') ||
      name.includes('desk-lamp') || name.includes('string-lights') || name.includes('wall-sconce') ||
      name.includes('spotlight') || name.includes('spot') || name.includes('torch') ||
      name.includes('flashlight') || name.includes('candle') || name.includes('fire') ||
      name.includes('flame') || name.includes('lantern') || name.includes('lava-lamp') ||
      name.includes('neon') || name.includes('strip-lights') || name.includes('led') ||
      // Hue icon set (nomi propri lampade Philips Hue)
      name === 'bloom' || name === 'iris' || name === 'go' || name === 'play' ||
      name === 'beyond' || name === 'phoenix' || name === 'signe' || name === 'ensis' ||
      name === 'arc' || name === 'infuse' || name === 'still' || name === 'appear' ||
      name === 'struana' || name === 'buratto' || name === 'cher' || name === 'econic' ||
      name === 'fugato' || name === 'amaze' || name === 'aurelle' || name === 'devote' ||
      name === 'centurion' || name === 'being' || name === 'adore' || name === 'explore' ||
      name.startsWith('ceiling-') || name.startsWith('floor-') || name.startsWith('table-') ||
      name.startsWith('wall-') || name.includes('gradient') || name.includes('lightstrip') ||
      name.includes('filament') || name.includes('ambiance') || name.includes('colour'))
    return 'anim-illuminate';

  // --- alarm: campanelli, avvisi, aperture ---
  if (name.includes('bell') || name.includes('alarm') || name.includes('siren') ||
      name.includes('alert') || name.includes('smoke') || name.includes('fire-alert') ||
      name.includes('water-alert') || name.includes('leak') || name.includes('vibrate') ||
      name.includes('shield-alert') || name.includes('hazard') || name.includes('warning') ||
      name.includes('flood') || name.includes('door-open') || name.includes('window-open') ||
      name.includes('bullhorn'))
    return 'anim-alarm';

  // --- blink: presenza, movimento, segnali ---
  if (name.includes('motion') || name.includes('walk') || name.includes('run') ||
      name.includes('human') || name.includes('account') || name.includes('presence') ||
      name.includes('wifi') || name.includes('bluetooth') || name.includes('signal') ||
      name.includes('broadcast') || name.includes('antenna') || name.includes('eye') ||
      name.includes('network') || name.includes('access-point') || name.includes('blink') ||
      name.includes('sensor') || name.includes('radar') || name.includes('sonar') ||
      // Font Awesome specifici
      name === 'satellite-dish' || name === 'tower-broadcast' || name === 'satellite')
    return 'anim-blink';

  // --- beat: audio, cuore, pompe ---
  if (name.includes('speaker') || name.includes('music') || name.includes('audio') ||
      name.includes('subwoofer') || name.includes('headphone') || name.includes('headset') ||
      name.includes('microphone') || name.includes('heart') || name.includes('waveform') ||
      name.includes('equalizer') || name.includes('radio') || name.includes('podcast') ||
      name.includes('piano') || name.includes('guitar') || name.includes('drum') ||
      name.includes('pump') || name.includes('pacemaker') || name.includes('volume') ||
      // Font Awesome / altri
      name === 'compact-disc' || name === 'drum' || name === 'guitar' ||
      name === 'music' || name === 'volume-up' || name === 'volume-high')
    return 'anim-beat';

  // --- shake: elettrodomestici vibranti ---
  if (name.includes('washing') || name.includes('dishwasher') || name.includes('dryer') ||
      name.includes('tumble') || name.includes('blender') || name.includes('mixer') ||
      name.includes('vacuum') || name.includes('robot') || name.includes('drill') ||
      name.includes('wrench') || name.includes('hammer') || name.includes('saw') ||
      name.includes('gamepad') || name.includes('joystick') || name.includes('controller') ||
      name.includes('vibration'))
    return 'anim-shake';

  // --- bounce: animali & giochi ---
  if (name.includes('dog') || name.includes('cat') || name.includes('bird') ||
      name.includes('pet') || name.includes('paw') || name.includes('rabbit') ||
      name.includes('fish') || name.includes('turtle') || name.includes('horse') ||
      name.includes('cow') || name.includes('pig') || name.includes('bee') ||
      name.includes('butterfly') || name.includes('bug') || name.includes('spider') ||
      name.includes('emoticon') || name.includes('balloon') || name.includes('ball') ||
      name.includes('basketball') || name.includes('soccer') || name.includes('football') ||
      name.includes('tennis') || name.includes('volleyball'))
    return 'anim-bounce';

  return '';
}