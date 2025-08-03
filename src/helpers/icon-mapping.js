/**
 * icon-mapping.js
 * 
 * Mappa centralizzata delle icone predefinite per device_class, sensori e fallback vari.
 * Usare così com'è.
 */

export const DEVICE_CLASS_ICON_MAP = {
  door:        { on: 'mdi:door-open', off: 'mdi:door-closed' },
  window:      { on: 'mdi:window-open', off: 'mdi:window-closed' },
  motion:      { on: 'mdi:motion-sensor', off: 'mdi:motion-sensor-off' },
  moisture:    { on: 'mdi:water-alert', off: 'mdi:water-off' },
  smoke:       { on: 'mdi:smoke', off: 'mdi:smoke-detector-off' },
  gas:         { on: 'mdi:gas-cylinder', off: 'mdi:gas-off' },
  lock:        { on: 'mdi:lock-open-variant', off: 'mdi:lock' },
  garage:      { on: 'mdi:garage-open', off: 'mdi:garage' },
  light:       { on: 'mdi:lightbulb-on', off: 'mdi:lightbulb-off' },
  plug:        { on: 'mdi:power-plug', off: 'mdi:power-plug-off' },
  presence:    { on: 'mdi:account', off: 'mdi:account-off' },
  vibration:   { on: 'mdi:vibrate', off: 'mdi:vibrate-off' },
  opening:     { on: 'mdi:door-open', off: 'mdi:door-closed' },
  battery:     { on: 'mdi:battery', off: 'mdi:battery-outline' },
  connectivity:{ on: 'mdi:wifi', off: 'mdi:wifi-off' },
  safety:      { on: 'mdi:shield-check', off: 'mdi:shield-off' },
  cold:        { on: 'mdi:snowflake', off: 'mdi:snowflake-off' }
};

export const SENSOR_TYPE_ICON_MAP = {
  temperature: { icon: 'mdi:thermometer', unit: '°C' },
  humidity:    { icon: 'mdi:water-percent', unit: '%' },
  co2:         { icon: 'mdi:molecule-co2', unit: 'ppm' },
  lux:         { icon: 'mdi:brightness-5', unit: 'lx' },
  uv:          { icon: 'mdi:weather-sunny-alert', unit: 'UV' },
  pressure:    { icon: 'mdi:gauge', unit: 'hPa' },
  noise:       { icon: 'mdi:volume-high', unit: 'dB' },
  pm25:        { icon: 'mdi:blur', unit: 'µg/m³' },
  pm10:        { icon: 'mdi:blur-linear', unit: 'µg/m³' }
};

export const DOMAIN_ICON_MAP = {
  light: 'mdi:lightbulb',
  switch: 'mdi:toggle-switch',
  fan: 'mdi:fan',
  climate: 'mdi:thermostat',
  cover: 'mdi:window-shutter',
  media_player: 'mdi:play-circle',
  script: 'mdi:script-text',
  scene: 'mdi:palette',
  lock: 'mdi:lock',
  camera: 'mdi:video',
  binary_sensor: 'mdi:checkbox-marked-circle-outline',
  sensor: 'mdi:eye',
  alarm_control_panel: 'mdi:shield-home',
  vacuum: 'mdi:robot-vacuum',
  siren: 'mdi:bullhorn'
};

export const DEFAULT_ICON = 'mdi:bookmark';
