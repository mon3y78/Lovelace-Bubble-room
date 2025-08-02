/**
 * sensor-mapping.js
 * 
 * Mappa centralizzata dei tipi di sensori, unità e relative proprietà visuali.
 * File completo e chiuso.
 */

export const SENSOR_TYPE_MAP = [
  { type: 'temperature', label: 'Temperature', emoji: '🌡️', icon: 'mdi:thermometer', unit: '°C' },
  { type: 'humidity',    label: 'Humidity',    emoji: '💧',  icon: 'mdi:water-percent', unit: '%' },
  { type: 'co2',         label: 'CO2',         emoji: '🟩',  icon: 'mdi:molecule-co2',  unit: 'ppm' },
  { type: 'lux',         label: 'Luminosity',  emoji: '🔆',  icon: 'mdi:brightness-5',  unit: 'lx' },
  { type: 'uv',          label: 'UV Index',    emoji: '🌞',  icon: 'mdi:weather-sunny-alert', unit: 'UV' },
  { type: 'pressure',    label: 'Pressure',    emoji: '⏲️',  icon: 'mdi:gauge', unit: 'hPa' },
  { type: 'noise',       label: 'Noise',       emoji: '🔊',  icon: 'mdi:volume-high', unit: 'dB' },
  { type: 'pm25',        label: 'PM2.5',       emoji: '🌫️',  icon: 'mdi:blur', unit: 'µg/m³' },
  { type: 'pm10',        label: 'PM10',        emoji: '🌫️',  icon: 'mdi:blur-linear', unit: 'µg/m³' }
];
