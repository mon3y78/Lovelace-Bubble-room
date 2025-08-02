// src/helpers/entity-filters.js

/* ───────────── label da mostrare sui chip ───────────── */
export const FILTER_LABELS = {
  presence: 'Presenza',
  motion: 'Movimento',
  occupancy: 'Occupazione',
  light: 'Luce',
  switch: 'Switch',
  fan: 'Ventola',
  // sensori
  temperature: 'Temperature',
  humidity: 'Humidity',
  illuminance: 'Illuminance',
  pressure: 'Pressure',
  co2: 'CO₂',
  pm25: 'PM2.5',
  pm10: 'PM10',
  uv: 'UV Index',
  noise: 'Noise',
};

/* ───────────── filtri di sezione ───────────── */
export const FILTERS = {
  /**
   * Presence – filtra per device_class (binary_sensor) o dominio
   * @param {string[]} cats
   */
  presence: (cats = []) => ({
    includeDomains: ['binary_sensor', 'light', 'switch', 'fan'],
    entityFilter: (id, hass) => {
      if (!cats.length) return false;
      const [domain] = id.split('.');
      if (domain === 'binary_sensor') {
        const dc = hass.states[id]?.attributes?.device_class ?? '';
        return cats.includes(dc);
      }
      return cats.includes(domain);
    },
  }),

  /**
   * Sensor – filtra i sensor.* in base al loro device_class
   * @param {string[]} cats
   */
  sensor: (cats = []) => ({
    includeDomains: ['sensor'],
    entityFilter: (id, hass) => {
      if (!cats.length) return true;
      const dc = hass.states[id]?.attributes?.device_class ?? '';
      return cats.includes(dc);
    },
  }),

  /**
   * Mushroom – filtra i binary_sensor.* in base al loro device_class
   * @param {string[]} cats
   */
  mushroom: (cats = []) => ({
    includeDomains: ['binary_sensor'],
    entityFilter: (id, hass) => {
      // se non ci sono categorie selezionate, includi tutti i binary_sensor
      if (!cats.length) return id.startsWith('binary_sensor.');
      const dc = hass.states[id]?.attributes?.device_class ?? '';
      return cats.includes(dc);
    },
  }),
};

/* ───────────── funzione che trova entità in una certa area ───────────── */
export function entitiesInArea(hass, areaId) {
  if (!hass?.states || !areaId) return [];

  const entReg = hass.entities ?? {};
  const devReg = hass.devices  ?? {};

  return Object.keys(hass.states).filter((eid) => {
    const ent = entReg[eid];
    if (ent?.area_id === areaId) return true;
    const devId = ent?.device_id;
    if (devId && devReg[devId]?.area_id === areaId) return true;
    const attr = hass.states[eid]?.attributes ?? {};
    return attr.area_id === areaId || attr.area === areaId;
  });
}

/**
 * Restituisce la lista di entity_id “candidati” per una sezione,
 * applicando:
 *   • filtro per dominio + device_class (da FILTERS)
 *   • filtro per area (se auto-discovery attivo)
 *   • filtro per categorie (cats)
 *
 * @param {HassEntities} hass
 * @param {object} config
 * @param {'presence'|'sensor'|'mushroom'} section
 * @param {string[]} cats
 */
export function candidatesFor(hass, config, section, cats = []) {
  if (!hass?.states) return [];

  // 1) scegli il filtro giusto
  let desc;
  if (section === 'presence') {
    desc = FILTERS.presence(cats);
  } else if (section === 'sensor') {
    desc = FILTERS.sensor(cats);
  } else if (section === 'mushroom') {
    desc = FILTERS.mushroom(cats);
  }

  if (!desc) return [];

  // 2) filtro per dominio
  const byDomain = Object.keys(hass.states).filter(id =>
    desc.includeDomains.includes(id.split('.')[0])
  );

  // 3) filtro device_class/domino
  const byDesc = byDomain.filter(id =>
    desc.entityFilter(id, hass)
  );

  // 4) filtro area se auto-discover attivo
  const autoDisc = config?.auto_discovery_sections?.[section] ?? false;
  if (autoDisc && config?.area) {
    const inArea = entitiesInArea(hass, config.area);
    return byDesc.filter(id => inArea.includes(id));
  }

  return byDesc;
}
