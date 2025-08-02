// src/helpers/entity-filters.js

/* ───────────── label da mostrare sui chip ───────────── */
export const FILTER_LABELS = {
  presence: 'Presenza',
  motion: 'Movimento',
  occupancy: 'Occupazione',
  light: 'Luce',
  switch: 'Switch',
  fan: 'Ventola',
  // aggiungi qui le etichette per i sensori, se ti servono in qualche UI centralizzata
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
   * Presence (ID) – filtra per device_class o dominio
   * @param {string[]} cats  categorie selezionate nei chip
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
   * Sensor – filtra i sensor.<…> in base al loro device_class
   * @param {string[]} cats  es. ['temperature','humidity',…]
   */
  sensor: (cats = []) => ({
    includeDomains: ['sensor'],
    entityFilter: (id, hass) => {
      // se non ci sono categorie selezionate, includi tutti i sensor.*
      if (!cats.length) return true;
      const dc = hass.states[id]?.attributes?.device_class ?? '';
      return cats.includes(dc);
    },
  }),
};

/* ───────────── funzione che trova entità in una certa area ───────────── */
export function entitiesInArea(hass, areaId) {
  if (!hass?.states || !areaId) return [];

  // 1) registry delle entità (area_id diretto)
  const entReg = hass.entities ?? {};
  // 2) registry dei device (area_id ereditato dal device)
  const devReg = hass.devices ?? {};

  return Object.keys(hass.states).filter((eid) => {
    // controllo entity-registry
    const ent = entReg[eid];
    if (ent?.area_id === areaId) return true;
    // controllo device-registry
    const devId = ent?.device_id;
    if (devId && devReg[devId]?.area_id === areaId) return true;
    // fallback sugli attributi legacy
    const attr = hass.states[eid]?.attributes ?? {};
    return attr.area_id === areaId || attr.area === areaId;
  });
}

/**
 * Restituisce la lista di entity_id “candidati” per una sezione,
 * applicando:
 *   • filtro per dominio + device_class (da FILTERS)
 *   • filtro per area (se auto-discovery attivo per quella sezione)
 *   • filtro per categorie (cats)
 *
 * Usage: candidatesFor(hass, config, 'sensor', ['temperature','humidity'])
 */
export function candidatesFor(hass, config, section, cats = []) {
  if (!hass?.states) return [];

  // 1) scegli il descrittore giusto
  let desc;
  if (section === 'presence') {
    desc = FILTERS.presence(cats);
  } else if (section === 'sensor') {
    desc = FILTERS.sensor(cats);
  }
  // aggiungi qui eventuali altri section …

  if (!desc) return [];

  // 2) filtro per dominio
  const byDomain = Object.keys(hass.states).filter((id) =>
    desc.includeDomains.includes(id.split('.')[0])
  );

  // 3) filtro custom (device_class o dominio)
  const byDesc = byDomain.filter((id) =>
    desc.entityFilter(id, hass)
  );

  // 4) filtro per area (solo se auto-discovery è attivo per questa section)
  const autoDisc = config?.auto_discovery_sections?.[section] ?? false;
  if (autoDisc && config?.area) {
    const inArea = entitiesInArea(hass, config.area);
    return byDesc.filter((id) => inArea.includes(id));
  }

  return byDesc;
}
