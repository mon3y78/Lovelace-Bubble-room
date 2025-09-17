// src/helpers/sensor-mapping.js

export const SENSOR_TYPE_MAP = {
  // —— ENVIRONMENT / AIR QUALITY ——
  temperature: { label: 'Temperature', emoji: '🌡️', units: ['°C', '°F'] },
  apparent_temperature: { label: 'Feels Like', emoji: '🥵', units: ['°C', '°F'] },
  humidity: { label: 'Humidity', emoji: '💧', units: ['%'] },
  pressure: { label: 'Pressure', emoji: '🧭', units: ['hPa', 'mbar', 'kPa'] },
  illuminance: { label: 'Illuminance', emoji: '🔆', units: ['lx'] },
  sound_pressure: { label: 'Sound Pressure', emoji: '🔊', units: ['dB'] },
  pm1: { label: 'PM1', emoji: '🌫️', units: ['µg/m³'] },
  pm2_5: { label: 'PM2.5', emoji: '🌫️', units: ['µg/m³'] },
  pm10: { label: 'PM10', emoji: '🌫️', units: ['µg/m³'] },
  co2: { label: 'CO₂', emoji: '🫁', units: ['ppm'] },
  
  // —— WEATHER ——
  uv_index: { label: 'UV Index', emoji: '☀️', units: ['UV index'] },
  irradiance: { label: 'Irradiance', emoji: '🌞', units: ['W/m²'] },
  
  wind_speed: {
    label: 'Wind Speed',
    emoji: '🌀',
    units: ['km/h', 'm/s', 'mph', 'kn'],
    formatter: (value, unit) => {
      const v = Number(value);
      if (isNaN(v)) return { value, unit };
      if (unit === 'm/s') return { value: (v * 3.6).toFixed(0), unit: 'km/h' };
      if (unit === 'mph') return { value: (v * 1.60934).toFixed(0), unit: 'km/h' };
      if (unit === 'kn') return { value: (v * 1.852).toFixed(0), unit: 'km/h' };
      return { value: v.toFixed(0), unit: unit || 'km/h' };
    }
  },
  speed: { label: 'Speed', emoji: '🌀', units: ['km/h', 'm/s', 'mph', 'kn'] },
  wind_gust: { label: 'Wind Gust', emoji: '🌬️', units: ['km/h', 'm/s', 'mph', 'kn'] },
  wind_bearing: { label: 'Wind Direction', emoji: '🧭', units: ['°', 'cardinal'] },
  
  precipitation: { label: 'Precipitation', emoji: '🌧️', units: ['mm', 'cm', 'in'] },
  precipitation_intensity: { label: 'Precipitation Intensity', emoji: '🌦️', units: ['mm/h', 'in/h'] },
  precipitation_probability: { label: 'Rain Probability', emoji: '☔', units: ['%'] },
  
  cloud_coverage: { label: 'Cloud Coverage', emoji: '☁️', units: ['%'] },
  visibility: { label: 'Visibility', emoji: '👁️', units: ['km', 'm', 'mi'] },
  dew_point: { label: 'Dew Point', emoji: '💧', units: ['°C', '°F'] },
  
  // —— ELECTRICITY ——
  power: {
    label: 'Power',
    emoji: '⚡',
    units: ['kW', 'W', 'MW'],
    formatter: (value, unit) => {
      const v = Number(value);
      if (isNaN(v)) return { value, unit };
      if (unit === 'W') return { value: (v / 1000).toFixed(v >= 100 ? 0 : 1), unit: 'kW' };
      if (unit === 'MW') return { value: (v * 1000).toFixed(0), unit: 'kW' };
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
      if (unit === 'Wh') return { value: (v / 1000).toFixed(v >= 1000 ? 0 : 1), unit: 'kWh' };
      if (unit === 'MWh') return { value: (v * 1000).toFixed(0), unit: 'kWh' };
      return { value: v, unit: unit || 'kWh' };
    },
  },
  power_factor: { label: 'Power Factor', emoji: '📐', units: ['%', 'ratio'] },
  voltage: { label: 'Voltage', emoji: '⚙️', units: ['V'] },
  current: { label: 'Current', emoji: '🧲', units: ['A', 'mA'] },
  frequency: { label: 'Frequency', emoji: '〰️', units: ['Hz'] },
  apparent_power: { label: 'Apparent Power', emoji: '🧮', units: ['VA', 'kVA'] },
  reactive_power: { label: 'Reactive Power', emoji: '🧮', units: ['var', 'kvar'] },
  
  // —— COST / UTILITIES ——
  monetary: { label: 'Cost', emoji: '💶', units: ['€', 'EUR', '$'] },
  gas: { label: 'Gas', emoji: '🔥', units: ['m³', 'Nm³', 'kWh'] },
  water: { label: 'Water', emoji: '🚿', units: ['m³', 'L'] },
  
  // —— STATUS / OTHER ——
  battery: { label: 'Battery', emoji: '🔋', units: ['%'] },
  signal_strength: { label: 'Signal Strength', emoji: '📶', units: ['dBm'] },
  
  // Fallback generic
  _fallback: { label: 'Other', emoji: '❓', units: [''] },
};

// —— Utility functions mantenute per compat legacy ——
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
