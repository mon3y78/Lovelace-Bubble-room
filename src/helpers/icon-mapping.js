/**
 * icon-mapping.js
 * Mappatura centralizzata delle icone per Bubble Room
 * Usare solo come import nei componenti!
 * Autore: mon3y78 (https://github.com/mon3y78)
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