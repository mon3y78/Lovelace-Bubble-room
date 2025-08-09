// src/helpers/sensor-mapping.js

export const SENSOR_TYPE_MAP = {
  // —— AMBIENTE / QUALITÀ ARIA ——
  temperature:   { emoji: '🌡️', units: ['°C', '°F'] },
  apparent_temperature: { emoji: '🥵', units: ['°C', '°F'] }, // "feels like"
  humidity:      { emoji: '💧',  units: ['%'] },
  pressure:      { emoji: '🧭',  units: ['hPa', 'mbar', 'kPa'] },
  illuminance:   { emoji: '🔆',  units: ['lx'] },
  sound_pressure:{ emoji: '🔊',  units: ['dB'] },
  pm1:           { emoji: '🌫️', units: ['µg/m³'] },
  pm2_5:         { emoji: '🌫️', units: ['µg/m³'] },
  pm10:          { emoji: '🌫️', units: ['µg/m³'] },
  co2:           { emoji: '🫁',  units: ['ppm'] },

  // —— METEO ——
  // UV & sole
  uv_index:      { emoji: '☀️', units: ['UV index'] },
  irradiance:    { emoji: '🌞', units: ['W/m²'] },

  // Vento
  wind_speed: {
    emoji: '🌀',
    units: ['km/h', 'm/s', 'mph', 'kn'],
    formatter: (value, unit) => {
      const v = Number(value);
      if (isNaN(v)) return { value, unit };
      if (unit === 'm/s') return { value: (v * 3.6).toFixed(0), unit: 'km/h' };
      if (unit === 'mph') return { value: (v * 1.60934).toFixed(0), unit: 'km/h' };
      if (unit === 'kn')  return { value: (v * 1.852).toFixed(0), unit: 'km/h' };
      return { value: v.toFixed(0), unit: unit || 'km/h' };
    }
  },
  speed:         { emoji: '🌀', units: ['km/h', 'm/s', 'mph', 'kn'] },   // fallback generico
  wind_gust:     { emoji: '🌬️', units: ['km/h', 'm/s', 'mph', 'kn'] },
  wind_bearing:  { emoji: '🧭',  units: ['°', 'cardinal'] },

  // Pioggia / precipitazioni
  precipitation: {
    emoji: '🌧️',
    units: ['mm', 'cm', 'in'],
  },
  precipitation_intensity: {
    emoji: '🌦️',
    units: ['mm/h', 'in/h'],
  },
  precipitation_probability: { emoji: '☔', units: ['%'] },

  // Nuvole / visibilità / dew point
  cloud_coverage: { emoji: '☁️', units: ['%'] },
  visibility:     { emoji: '👁️', units: ['km', 'm', 'mi'] },
  dew_point:      { emoji: '💧', units: ['°C', '°F'] },

  // —— ELETTRICITÀ ——
  power: {
    emoji: '⚡',
    units: ['kW', 'W', 'MW'],
    formatter: (value, unit) => {
      const v = Number(value);
      if (isNaN(v)) return { value, unit };
      if (unit === 'W')   return { value: (v / 1000).toFixed(v >= 100 ? 0 : 1), unit: 'kW' };
      if (unit === 'MW')  return { value: (v * 1000).toFixed(0), unit: 'kW' };
      return { value: v, unit: unit || 'kW' };
    },
  },
  energy: {
    emoji: '🔌',
    units: ['kWh', 'Wh', 'MWh'],
    formatter: (value, unit) => {
      const v = Number(value);
      if (isNaN(v)) return { value, unit };
      if (unit === 'Wh')  return { value: (v / 1000).toFixed(v >= 1000 ? 0 : 1), unit: 'kWh' };
      if (unit === 'MWh') return { value: (v * 1000).toFixed(0), unit: 'kWh' };
      return { value: v, unit: unit || 'kWh' };
    },
  },
  power_factor:   { emoji: '📐', units: ['%', 'ratio'] },
  voltage:        { emoji: '⚙️', units: ['V'] },
  current:        { emoji: '🧲', units: ['A', 'mA'] },
  frequency:      { emoji: '〰️', units: ['Hz'] },
  apparent_power: { emoji: '🧮', units: ['VA', 'kVA'] },
  reactive_power: { emoji: '🧮', units: ['var', 'kvar'] },

  // —— COSTI / UTILITY ——
  monetary:       { emoji: '💶', units: ['€', 'EUR', '$'] },
  gas:            { emoji: '🔥', units: ['m³', 'Nm³', 'kWh'] },
  water:          { emoji: '🚿', units: ['m³', 'L'] },

  // —— STATO / ALTRO ——
  battery:        { emoji: '🔋', units: ['%'] },
  signal_strength:{ emoji: '📶', units: ['dBm'] },

  // Fallback generico
  _fallback:      { emoji: '❓', units: [''] },
};

// —— Utility opzionali ——
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
