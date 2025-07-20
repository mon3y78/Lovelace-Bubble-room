/**
 * sensor-mapping.js
 * Mappatura centralizzata tipi sensore (emoji, unità) per Bubble Room
 * Usare solo come import nei componenti!
 * Autore: mon3y78 (https://github.com/mon3y78)
 */

export const SENSOR_TYPE_MAP = {
  temperature: { emoji: '🌡️', unitC: '°C', unitF: '°F' },
  humidity: { emoji: '💦', unit: '%' },
  co2: { emoji: '🟢', unit: 'ppm' },
  illuminance: { emoji: '☀️', unit: 'lx' },
  pm1: { emoji: '🟤', unit: 'µg/m³' },
  pm25: { emoji: '⚫️', unit: 'µg/m³' },
  pm10: { emoji: '⚪️', unit: 'µg/m³' },
  uv: { emoji: '🌞', unit: 'UV' },
  noise: { emoji: '🔊', unit: 'dB' },
  pressure: { emoji: '📈', unit: 'hPa' },
  voc: { emoji: '🧪', unit: 'ppb' }
};