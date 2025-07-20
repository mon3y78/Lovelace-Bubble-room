/**
 * icon-mapping.js
 * 
 * Helper centralizzato per la gestione delle icone dinamiche nella card Bubble Room.
 * Gestisce il mapping delle icone MDI in base a:
 *   - device_class (porta, finestra, presenza, fumo, ecc.)
 *   - dominio dell’entità (light, switch, climate, cover, ecc.)
 *   - stato attuale dell’entità (on/off, open/closed, locked/unlocked, ecc.)
 * 
 * Ordine di priorità (fallback):
 *   1. Icona personalizzata da config
 *   2. Icona definita nello stato dell’entità (attributo .icon di Home Assistant)
 *   3. Icona specifica per device_class
 *   4. Icona di default per dominio e stato
 *   5. Fallback universale: mdi:information-outline
 * 
 * Questo modulo esporta:
 *   - DEVICE_CLASS_ICON_MAP: mapping icone per device_class principali
 *   - DOMAIN_ICON_MAP: mapping icone per dominio
 *   - getDomainDefaultIcon(domain, state): funzione fallback per alcuni domini chiave
 *   - getBestIcon(hass, entityId, entityConf): funzione universale che restituisce l’icona migliore
 * 
 * Da importare nei componenti che visualizzano icone dinamiche, come BubbleSensor, SubButton, ecc.
 * 
 * https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78
 */

export const DEVICE_CLASS_ICON_MAP = {
  door: { on: 'mdi:door-open', off: 'mdi:door-closed' },
  window: { on: 'mdi:window-open', off: 'mdi:window-closed' },
  motion: { on: 'mdi:motion-sensor', off: 'mdi:motion-sensor-off' },
  moisture: { on: 'mdi:water-alert', off: 'mdi:water-off' },
  smoke: { on: 'mdi:smoke', off: 'mdi:smoke-detector-off' },
  gas: { on: 'mdi:gas-cylinder', off: 'mdi:gas-off' },
  problem: { on: 'mdi:alert', off: 'mdi:alert' },
  connectivity: { on: 'mdi:connection', off: 'mdi:connection' },
  occupancy: { on: 'mdi:account-voice', off: 'mdi:account-voice-off' },
  presence: { on: 'mdi:account-voice', off: 'mdi:account-voice-off' },
  tamper: { on: 'mdi:lock-open-alert', off: 'mdi:lock-open-alert' },
  vibration: { on: 'mdi:vibrate', off: 'mdi:vibrate-off' },
  running: { on: 'mdi:server-network', off: 'mdi:server-network-off' },
  shutter: { on: 'mdi:window-shutter-open', off: 'mdi:window-shutter' },
  blind: { on: 'mdi:blinds-horizontal', off: 'mdi:blinds-horizontal-closed' }
};

export const DOMAIN_ICON_MAP = {
  light: 'mdi:lightbulb',
  switch: 'mdi:toggle-switch',
  input_boolean: 'mdi:toggle-switch',
  fan: 'mdi:fan',
  climate: 'mdi:thermostat',
  media_player: 'mdi:speaker',
  vacuum: 'mdi:robot-vacuum',
  binary_sensor: 'mdi:motion-sensor',
  sensor: 'mdi:information-outline',
  cover: 'mdi:window-shutter',
  lock: 'mdi:lock',
  door: 'mdi:door-closed',
  window: 'mdi:window-closed',
  alarm_control_panel: 'mdi:shield-home',
  scene: 'mdi:palette',
  script: 'mdi:script-text',
  input_number: 'mdi:ray-vertex',
  input_select: 'mdi:format-list-bulleted',
  camera: 'mdi:cctv',
  humidifier: 'mdi:air-humidifier',
  weather: 'mdi:weather-partly-cloudy',
  device_tracker: 'mdi:map-marker',
  person: 'mdi:account',
  input_text: 'mdi:text-box-outline'
};

export function getDomainDefaultIcon(domain, state) {
  if (domain === 'cover') return state === 'open' ? 'mdi:blinds-open' : 'mdi:blinds-closed';
  if (domain === 'lock') return state === 'locked' ? 'mdi:lock' : 'mdi:lock-open';
  if (domain === 'door') return state === 'open' ? 'mdi:door-open' : 'mdi:door-closed';
  if (domain === 'window') return state === 'open' ? 'mdi:window-open' : 'mdi:window-closed';
  if (domain === 'binary_sensor')
    return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off';
  return DOMAIN_ICON_MAP[domain] || '';
}

export function getBestIcon(hass, entityId, entityConf = {}) {
  if (entityConf.icon) return entityConf.icon;
  const stateObj = hass?.states?.[entityId];
  if (stateObj?.attributes?.icon) return stateObj.attributes.icon;
  const deviceClass = stateObj?.attributes?.device_class;
  const domain = entityId ? entityId.split('.')[0] : '';
  const state = stateObj?.state;
  if (deviceClass) {
    const dcIcons = DEVICE_CLASS_ICON_MAP[deviceClass];
    if (dcIcons) {
      if (typeof dcIcons === 'string') return dcIcons;
      if (dcIcons.on && dcIcons.off) return state === 'on' ? dcIcons.on : dcIcons.off;
      return dcIcons.on || '';
    }
  }
  const fallback = getDomainDefaultIcon(domain, state);
  if (fallback) return fallback;
  return 'mdi:information-outline';
}