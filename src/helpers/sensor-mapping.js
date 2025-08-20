// src/helpers/sensor-mapping.js
// ------------------------------------------------------------
// Mappa dei tipi di sensori usati in UI (etichette + emoji).
// Include un fallback “_fallback” e regole di inferenza per
// sensori senza device_class (es. UV Index Ecowitt).
// I commenti restano in italiano.
// ------------------------------------------------------------

/**
 * Mappa principale: chiave = "tipo" (di norma device_class HA)
 * Valori mostrati in UI (label + emoji) e, quando utile, alias.
 */
export const SENSOR_TYPE_MAP = {
  // --- Meteo / ambientali ---
  temperature: { label: 'Temperature', emoji: '🌡️', units: ['°C', '°F'] },
  humidity: { label: 'Humidity', emoji: '💧', units: ['%'] },
  pressure: { label: 'Pressure', emoji: '🧭', units: ['hPa', 'mbar', 'bar', 'kPa'] },
  illuminance: { label: 'Illuminance', emoji: '☀️', units: ['lx'] },
  uv_index: { label: 'UV Index', emoji: '🌞', units: ['UV', 'UV index', 'index'] }, // fallback per UV senza device_class
  irradiance: { label: 'Irradiance', emoji: '🌞', units: ['W/m²'] },
  dew_point: { label: 'Dew Point', emoji: '💠', units: ['°C', '°F'] },
  visibility: { label: 'Visibility', emoji: '👁️', units: ['km', 'mi', 'm'] },
  cloud_coverage: { label: 'Cloud Coverage', emoji: '☁️', units: ['%'] },
  precipitation: { label: 'Precipitation', emoji: '🌧️', units: ['mm', 'in'] },
  precipitation_intensity: { label: 'Precipitation Intensity', emoji: '🌧️', units: ['mm/h', 'in/h'] },
  rain_probability: { label: 'Rain Probability', emoji: '🌂', units: ['%'] },
  wind_speed: { label: 'Wind Speed', emoji: '💨', units: ['m/s', 'km/h', 'mph', 'kn'] },
  wind_gust: { label: 'Wind Gust', emoji: '🌬️', units: ['m/s', 'km/h', 'mph', 'kn'] },
  wind_direction: { label: 'Wind Direction', emoji: '🧭', units: ['°', 'deg'] },
  feels_like: { label: 'Feels Like', emoji: '🥵', units: ['°C', '°F'] },
  
  // --- Qualità aria / particolato ---
  co2: { label: 'CO₂', emoji: '🫁', units: ['ppm'] },
  pm1: { label: 'PM1', emoji: '🟤', units: ['µg/m³'] },
  pm25: { label: 'PM2.5', emoji: '⚫️', units: ['µg/m³'] },
  pm10: { label: 'PM10', emoji: '⚪️', units: ['µg/m³'] },
  volatile_organic_compounds: { label: 'VOCs', emoji: '🧪', units: ['ppb', 'ppm', 'mg/m³'] },
  air_quality: { label: 'Air Quality', emoji: '🌫️' },
  
  // --- Acustica ---
  sound_pressure: { label: 'Sound Pressure', emoji: '🔊', units: ['dB', 'dBA'] },
  noise: { label: 'Noise', emoji: '🔊', units: ['dB', 'dBA'] },
  
  // --- Elettrico / energia ---
  power: { label: 'Power', emoji: '⚡️', units: ['W', 'kW'] },
  apparent_power: { label: 'Apparent Power', emoji: '🧲', units: ['VA', 'kVA'] },
  reactive_power: { label: 'Reactive Power', emoji: '🌀', units: ['var', 'kvar'] },
  energy: { label: 'Energy', emoji: '🔋', units: ['Wh', 'kWh', 'MWh'] },
  voltage: { label: 'Voltage', emoji: '🔌', units: ['V'] },
  current: { label: 'Current', emoji: '🧲', units: ['A', 'mA'] },
  frequency: { label: 'Frequency', emoji: '📶', units: ['Hz'] },
  power_factor: { label: 'Power Factor', emoji: '📐' },
  
  // --- Varie ---
  battery: { label: 'Battery', emoji: '🔋', units: ['%', 'V'] },
  signal_strength: { label: 'Signal Strength', emoji: '📡', units: ['dBm', '%'] },
  speed: { label: 'Speed', emoji: '🌀', units: ['m/s', 'km/h', 'mph'] },
  
  // --- Fallback generale (non mostrato nei chip dell’editor) ---
  _fallback: { label: 'Other', emoji: '❓' },
};

/* ────────────────────────────────
 * Heuristics: inferenza tipo quando manca device_class
 * (usato per casi come Ecowitt UV Index, ecc.)
 * Puoi usare detectSensorType(entityId, stateObj) dove serve.
 * SensorPanel già usa SENSOR_TYPE_MAP per i chip.
 * ──────────────────────────────── */

/** normalizza stringa */
const _norm = (s) => (typeof s === 'string' ? s.toLowerCase() : '');

/** prova a inferire il tipo dal nome dell'entità e dalle unità */
export function inferTypeFromState(entityId, stateObj = {}) {
  const id = _norm(entityId);
  const unit = _norm(stateObj?.attributes?.unit_of_measurement || stateObj?.attributes?.unit);
  const name = _norm(stateObj?.attributes?.friendly_name);
  
  // --- UV Index (nessun device_class in molti integrazioni) ---
  if (id.includes('uv') || name?.includes('uv') || unit.includes('uv')) {
    return 'uv_index';
  }
  
  // --- Illuminance ---
  if (unit === 'lx' || id.includes('lux') || name?.includes('lux')) {
    return 'illuminance';
  }
  
  // --- Pressione ---
  if (['hpa', 'mbar', 'bar', 'kpa'].some(u => unit.includes(u))) {
    return 'pressure';
  }
  
  // --- Temperatura ---
  if (['°c', '°f'].some(u => unit.includes(u)) && (id.includes('temp') || name?.includes('temp'))) {
    return 'temperature';
  }
  
  // --- Umidità ---
  if (unit === '%' && (id.includes('hum') || name?.includes('hum'))) {
    return 'humidity';
  }
  
  // --- CO2 / VOC / aria ---
  if (unit === 'ppm' && (id.includes('co2') || name?.includes('co2'))) {
    return 'co2';
  }
  if ((unit === 'ppb' || unit === 'ppm') && (id.includes('voc') || name?.includes('voc'))) {
    return 'volatile_organic_compounds';
  }
  
  // --- Rumore ---
  if (unit.startsWith('db') || id.includes('noise') || name?.includes('noise')) {
    return 'noise';
  }
  
  // --- Irradianza ---
  if (unit.includes('w/m') || id.includes('irradiance') || name?.includes('irradiance')) {
    return 'irradiance';
  }
  
  // --- Vento ---
  if (['m/s', 'km/h', 'mph', 'kn'].some(u => unit.includes(u)) && (id.includes('wind') || name?.includes('wind'))) {
    if (id.includes('gust') || name?.includes('gust')) return 'wind_gust';
    if (id.includes('dir') || name?.includes('direction')) return 'wind_direction';
    return 'wind_speed';
  }
  
  // --- Elettrico ---
  if (unit === 'w' || unit === 'kw') return 'power';
  if (unit === 'wh' || unit === 'kwh' || unit === 'mwh') return 'energy';
  if (unit === 'v') return 'voltage';
  if (unit === 'a' || unit === 'ma') return 'current';
  if (unit === 'hz') return 'frequency';
  
  // --- Batteria / segnale ---
  if (unit === '%' && (id.includes('batt') || name?.includes('batt'))) return 'battery';
  if ((unit === 'dbm' || unit === '%') && (id.includes('signal') || name?.includes('signal'))) return 'signal_strength';
  
  // --- Precipitazioni ---
  if ((unit === 'mm' || unit === 'in') && (id.includes('precip') || name?.includes('precip'))) {
    return id.includes('intensity') || name?.includes('intensity') ?
      'precipitation_intensity' :
      'precipitation';
  }
  if (unit === '%' && (id.includes('rain') || name?.includes('rain'))) {
    return 'rain_probability';
  }
  
  // --- Visibilità / nuvolosità ---
  if ((unit === 'km' || unit === 'mi' || unit === 'm') && (id.includes('visib') || name?.includes('visib'))) {
    return 'visibility';
  }
  if (unit === '%' && (id.includes('cloud') || name?.includes('cloud'))) {
    return 'cloud_coverage';
  }
  
  // se non riconosciuto
  return '_fallback';
}

/**
 * Ritorna un "tipo" utilizzabile come chiave in SENSOR_TYPE_MAP.
 * Ordine: device_class → inferenza euristica → _fallback.
 */
export function detectSensorType(entityId, stateObj = {}) {
  const dc = _norm(stateObj?.attributes?.device_class);
  if (dc && SENSOR_TYPE_MAP[dc]) return dc;
  const inferred = inferTypeFromState(entityId, stateObj);
  return SENSOR_TYPE_MAP[inferred] ? inferred : '_fallback';
}

/** Utilità piccola: etichetta “bella” di un tipo */
export function labelFor(type) {
  return SENSOR_TYPE_MAP[type]?.label || SENSOR_TYPE_MAP._fallback.label;
}

/** Emoji opzionale per un tipo */
export function emojiFor(type) {
  return SENSOR_TYPE_MAP[type]?.emoji || SENSOR_TYPE_MAP._fallback.emoji;
}