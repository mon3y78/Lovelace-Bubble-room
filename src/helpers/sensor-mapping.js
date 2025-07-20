// src/helpers/sensor-mapping.js

/**
 * Bubble Room Card – Sensor Mapping
 * ---------------------------------
 * Definisce la mappatura centralizzata di tutti i tipi di sensori utilizzabili nella card Bubble Room.
 * Ogni tipo di sensore comprende:
 *  - Emoji identificativa
 *  - Unità di misura (°C/°F o altro)
 *  - Icona MDI predefinita
 *  - device_class Home Assistant
 *  - Entity di default suggerita
 * 
 * Fornisce anche la funzione di utilità getSensorEmojiAndUnit() per ottenere dinamicamente emoji e unità.
 * 
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78
 

export const SENSOR_TYPE_MAP = {
  temperature: {
    emoji: '🌡️',
    unitC: '°C',
    unitF: '°F',
    icon: 'mdi:thermometer'
  },
  humidity: {
    emoji: '💦',
    unit: '%',
    icon: 'mdi:water-percent'
  },
  co2: {
    emoji: '🟢',
    unit: 'ppm',
    icon: 'mdi:molecule-co2'
  },
  illuminance: {
    emoji: '☀️',
    unit: 'lx',
    icon: 'mdi:white-balance-sunny'
  },
  pm1: {
    emoji: '🟤',
    unit: 'µg/m³',
    icon: 'mdi:blur'
  },
  pm25: {
    emoji: '⚫️',
    unit: 'µg/m³',
    icon: 'mdi:blur'
  },
  pm10: {
    emoji: '⚪️',
    unit: 'µg/m³',
    icon: 'mdi:blur'
  },
  uv: {
    emoji: '🌞',
    unit: 'UV',
    icon: 'mdi:weather-sunny-alert'
  },
  noise: {
    emoji: '🔊',
    unit: 'dB',
    icon: 'mdi:volume-high'
  },
  pressure: {
    emoji: '📈',
    unit: 'hPa',
    icon: 'mdi:gauge'
  },
  voc: {
    emoji: '🧪',
    unit: 'ppb',
    icon: 'mdi:chemical-weapon'
  }
};

// Funzione helper per ottenere emoji/unit/icona corretti
export function getSensorEmojiAndUnit(type, unit = 'C') {
  const map = SENSOR_TYPE_MAP[type];
  if (!map) return { emoji: '❓', unit: '', icon: '' };
  
  // Temperature può avere unità °C o °F
  if (type === 'temperature') {
    return {
      emoji: map.emoji,
      unit: unit === 'F' ? map.unitF : map.unitC,
      icon: map.icon
    };
  }
  return {
    emoji: map.emoji,
    unit: map.unit || '',
    icon: map.icon
  };
}