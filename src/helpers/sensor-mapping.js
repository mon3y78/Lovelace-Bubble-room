// src/helpers/sensor-mapping.js

export const SENSOR_TYPE_MAP = {
  // —— ENVIRONMENT / AIR QUALITY ——
  temperature:           { label: 'Temperature',       emoji: '🌡️', units: ['°C', '°F'] },
  apparent_temperature:  { label: 'Feels Like',        emoji: '🥵', units: ['°C', '°F'] },
  humidity:              { label: 'Humidity',          emoji: '💧', units: ['%'] },
  pressure:              { label: 'Pressure',          emoji: '🧭', units: ['hPa', 'mbar', 'kPa'] },
  illuminance:           { label: 'Illuminance',       emoji: '🔆', units: ['lx'] },
  sound_pressure:        { label: 'Sound Pressure',    emoji: '🔊', units: ['dB'] },
  pm1:                   { label: 'PM1',               emoji: '🌫️', units: ['µg/m³'] },
  pm2_5:                 { label: 'PM2.5',             emoji: '🌫️', units: ['µg/m³'] },
  pm10:                  { label: 'PM10',              emoji: '🌫️', units: ['µg/m³'] },
  co2:                   { label: 'CO₂',               emoji: '🫁', units: ['ppm'] },

  // —— WEATHER ——
  uv_index:              { label: 'UV Index',          emoji: '☀️', units: ['UV index'] },
  irradiance:            { label: 'Irradiance',        emoji: '🌞', units: ['W/m²'] },

  wind_speed: {
    label: 'Wind Speed',
    emoji: '🌀',
    units: ['km/h', 'm/s', 'mph', 'kn'],
    formatter: (value, unit) => {
      const v = Number(value);
      if (isNaN(v)) return { value, unit };
      if (unit === 'm/s') return { value: (v * 3.6).toFixed(0), unit: 'km/h' };
      if (unit === 'mph') return { value: (v * 1.60934).toFixed(0), unit: 'km/h' };
      if (unit === 'kn')  return { value: (v * 1.852).toFixed(0),  unit: 'km/h' };
      return { value: v.toFixed(0), unit: unit || 'km/h' };
    }
  },
  speed:                 { label: 'Speed',             emoji: '🌀', units: ['km/h', 'm/s', 'mph', 'kn'] },
  wind_gust:             { label: 'Wind Gust',         emoji: '🌬️', units: ['km/h', 'm/s', 'mph', 'kn'] },
  wind_bearing:          { label: 'Wind Direction',    emoji: '🧭', units: ['°', 'cardinal'] },

  precipitation:             { label: 'Precipitation',            emoji: '🌧️', units: ['mm', 'cm', 'in'] },
  precipitation_intensity:   { label: 'Precipitation Intensity',  emoji: '🌦️', units: ['mm/h', 'in/h'] },
  precipitation_probability: { label: 'Rain Probability',         emoji: '☔',  units: ['%'] },

  cloud_coverage:        { label: 'Cloud Coverage',    emoji: '☁️', units: ['%'] },
  visibility:            { label: 'Visibility',        emoji: '👁️', units: ['km', 'm', 'mi'] },
  dew_point:             { label: 'Dew Point',         emoji: '💧', units: ['°C', '°F'] },

  // —— ELECTRICITY ——
  power: {
    label: 'Power',
    emoji: '⚡',
    units: ['kW', 'W', 'MW'],
    formatter: (value, unit) => {
      const v = Number(value);
      if (isNaN(v)) return { value, unit };
      if (unit === 'W')  return { value: (v / 1000).toFixed(v >= 100 ? 0 : 1), unit: 'kW' };
      if (unit === 'MW') return { value: (v * 1000).toFixed(0),                      unit: 'kW' };
      return { value: v, unit: unit || 'kW' };
    },
  },
  energy: {
    label: 'Energy',
    emoji: '🔌',
    units: ['kWh', 'Wh', 'MWh'],
    formatter: (value, unit) => {
      const v = Number(value);
      if (isNaN(v)) return { value, unit };
      if (unit === 'Wh')  return { value: (v / 1000).toFixed(v >= 1000 ? 0 : 1), unit: 'kWh' };
      if (unit === 'MWh') return { value: (v * 1000).toFixed(0),                  unit: 'kWh' };
      return { value: v, unit: unit || 'kWh' };
    },
  },
  power_factor:          { label: 'Power Factor',      emoji: '📐', units: ['%', 'ratio'] },
  voltage:               { label: 'Voltage',           emoji: '⚙️', units: ['V'] },
  current:               { label: 'Current',           emoji: '🧲', units: ['A', 'mA'] },
  frequency:             { label: 'Frequency',         emoji: '〰️', units: ['Hz'] },
  apparent_power:        { label: 'Apparent Power',    emoji: '🧮', units: ['VA', 'kVA'] },
  reactive_power:        { label: 'Reactive Power',    emoji: '🧮', units: ['var', 'kvar'] },

  // —— COST / UTILITIES ——
  monetary:              { label: 'Cost',              emoji: '💶', units: ['€', 'EUR', '$'] },
  gas:                   { label: 'Gas',               emoji: '🔥', units: ['m³', 'Nm³', 'kWh'] },
  water:                 { label: 'Water',             emoji: '🚿', units: ['m³', 'L'] },

  // —— STATUS / OTHER ——
  battery:               { label: 'Battery',           emoji: '🔋', units: ['%'] },
  signal_strength:       { label: 'Signal Strength',   emoji: '📶', units: ['dBm'] },

  // Fallback generic
  _fallback:             { label: 'Other',             emoji: '❓', units: [''] },
};

// —— Utility functions (già usate altrove) ——
export function formatByDeviceClass(deviceClass, value, unit) {
  const m = SENSOR_TYPE_MAP[deviceClass];
  if (!m?.formatter) return { value, unit };
  try { return m.formatter(value, unit); } catch { return { value, unit }; }
}

export function defaultEmoji(deviceClass) {
  return (SENSOR_TYPE_MAP[deviceClass]?.emoji) ?? SENSOR_TYPE_MAP._fallback.emoji;
}

export function defaultUnit(deviceClass) {
  const list = SENSOR_TYPE_MAP[deviceClass]?.units || SENSOR_TYPE_MAP._fallback.units;
  return list[0] || '';
}

/* ─────────────────────────── PATCH: fallback per device_class mancante ───────────────────────────
   Se un sensore NON definisce attributes.device_class, possiamo stimarlo da:
   1) unit_of_measurement    → mappa UNIT_HINTS
   2) entity_id / friendly_name → keyword matching
   Queste funzioni sono additive: non cambiano nulla se device_class è già presente.
*/

// Mappa rapida: unità → device_class (evita unit generiche troppo ambigue)
const UNIT_HINTS = {
  '°c': 'temperature', '°f': 'temperature',
  'uv index': 'uv_index', 'uv': 'uv_index',
  'w/m²': 'irradiance', 'wm²': 'irradiance', 'w/m2': 'irradiance',
  'lx': 'illuminance', 'lux': 'illuminance',
  'hpa': 'pressure', 'mbar': 'pressure', 'kpa': 'pressure',
  'db': 'sound_pressure',
  'ppm': 'co2',
  'km/h': 'wind_speed', 'kmh': 'wind_speed', 'm/s': 'wind_speed', 'ms': 'wind_speed',
  'mph': 'wind_speed', 'kn': 'wind_speed',
  'mm/h': 'precipitation_intensity', 'in/h': 'precipitation_intensity',
  'mm': 'precipitation', 'cm': 'precipitation', 'in': 'precipitation',
  'va': 'apparent_power', 'kva': 'apparent_power',
  'var': 'reactive_power', 'kvar': 'reactive_power',
  'kwh': 'energy', 'wh': 'energy', 'mwh': 'energy',
  'kw': 'power', 'w': 'power', 'mw': 'power',
  'hz': 'frequency',
  'a': 'current', 'ma': 'current',
  'v': 'voltage',
  '%': 'humidity', // attenzione: può valere anche per battery/cloud_coverage/power_factor → gestito con keyword
};

// normalizza l’unità (stringa) in modo conservativo
function _normUnit(u) {
  return String(u || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(',', '.');
}

// euristiche dall’entity_id (o friendly_name)
const ID_PATTERNS = [
  { re: /\buv(_?index)?\b/,               type: 'uv_index' },
  { re: /\b(ir|irradiance)\b/,            type: 'irradiance' },
  { re: /\billuminance|lux\b/,            type: 'illuminance' },
  { re: /\bco2\b/,                        type: 'co2' },
  { re: /\bpm2[._]?5\b/,                  type: 'pm2_5' },
  { re: /\bpm10\b/,                       type: 'pm10' },
  { re: /\bpm1\b/,                        type: 'pm1' },
  { re: /\bdew[_-]?point\b/,              type: 'dew_point' },
  { re: /\bvisibility\b/,                 type: 'visibility' },
  { re: /\bcloud[_-]?coverage\b/,         type: 'cloud_coverage' },
  { re: /\b(apparent[_-]?temp|feels[_-]?like)\b/, type: 'apparent_temperature' },
  { re: /\bwind[_-]?(speed|spd)\b/,       type: 'wind_speed' },
  { re: /\bwind[_-]?gust\b/,              type: 'wind_gust' },
  { re: /\bwind[_-]?(bearing|dir|direction)\b/, type: 'wind_bearing' },
  { re: /\bprecip(itation)?[_-]?intensity\b/,    type: 'precipitation_intensity' },
  { re: /\bprecip(itation)?\b/,           type: 'precipitation' },
  { re: /\brain[_-]?prob(ability)?\b/,    type: 'precipitation_probability' },
  { re: /\bpower[_-]?factor\b/,           type: 'power_factor' },
  { re: /\b(apparent|sva|s)power\b/,      type: 'apparent_power' },
  { re: /\breactive[_-]?power\b/,         type: 'reactive_power' },
  { re: /\bvoltage\b/,                    type: 'voltage' },
  { re: /\bcurrent|amper(e|age)?\b/,      type: 'current' },
  { re: /\bfreq(uency)?\b/,               type: 'frequency' },
  { re: /\b(power|watts?)\b/,             type: 'power' },
  { re: /\benergy|kwh|wh|mwh\b/,          type: 'energy' },
  // % ambiguo: se nell’ID troviamo parole specifiche, sovrascriviamo ‘humidity’
  { re: /\bbattery\b/,                    type: 'battery' },
  { re: /\bcloud[_-]?coverage\b/,         type: 'cloud_coverage' },
  { re: /\bpower[_-]?factor\b/,           type: 'power_factor' },
];

/** Prova a mappare una unità in un device_class noto (stringa) */
export function inferTypeFromUnit(unit) {
  const u = _normUnit(unit);
  if (!u) return null;

  // match pieno
  if (UNIT_HINTS[u]) return UNIT_HINTS[u];

  // tentativi "parziali" sensati (evita collisioni)
  if (u.endsWith('w/m²') || u.endsWith('wm²') || u.endsWith('w/m2')) return 'irradiance';
  if (u.includes('uv')) return 'uv_index';
  if (u.includes('lux') || u.includes('lx')) return 'illuminance';
  return null;
}

/** Prova a dedurre dal nome dell’entità (o friendly_name) */
export function inferTypeFromId(entityIdOrName) {
  const s = String(entityIdOrName || '').toLowerCase();
  if (!s) return null;
  for (const { re, type } of ID_PATTERNS) {
    if (re.test(s)) return type;
  }
  return null;
}

/** Heuristics principali: se manca device_class, prova unit → id */
export function guessDeviceClass(stateObj, entityId = '') {
  if (!stateObj) return null;
  const dc = stateObj.attributes?.device_class;
  if (dc) return dc;

  // 1) unit_of_measurement
  const unitHit = inferTypeFromUnit(stateObj.attributes?.unit_of_measurement);
  if (unitHit) return unitHit;

  // 2) entity_id / friendly_name
  const idHit =
    inferTypeFromId(entityId) ||
    inferTypeFromId(stateObj.entity_id) ||
    inferTypeFromId(stateObj.attributes?.friendly_name);
  if (idHit) return idHit;

  return null;
}