// src/helpers/sensor-mapping.js

export const SENSOR_TYPE_MAP = {
  temperature: {
    label: 'Temperature',
    emoji: '🌡️',
    icon: 'mdi:thermometer',
    units: ['°C', '°F'],
  },
  humidity: {
    label: 'Humidity',
    emoji: '💧',
    icon: 'mdi:water-percent',
    units: ['%'],
  },
  co2: {
    label: 'CO₂',
    emoji: '🟢',
    icon: 'mdi:molecule-co2',
    units: ['ppm'],
  },
  lux: {
    label: 'Luminosity',
    emoji: '🔆',
    icon: 'mdi:brightness-5',
    units: ['lx'],
  },
  uv: {
    label: 'UV Index',
    emoji: '🌞',
    icon: 'mdi:weather-sunny-alert',
    units: ['UV'],
  },
  pressure: {
    label: 'Pressure',
    emoji: '⏲️',
    icon: 'mdi:gauge',
    units: ['hPa'],
  },
  noise: {
    label: 'Noise',
    emoji: '🔊',
    icon: 'mdi:volume-high',
    units: ['dB'],
  },
  pm25: {
    label: 'PM2.5',
    emoji: '🌫️',
    icon: 'mdi:blur',
    units: ['µg/m³'],
  },
  pm10: {
    label: 'PM10',
    emoji: '🌫️',
    icon: 'mdi:blur-linear',
    units: ['µg/m³'],
  },
};