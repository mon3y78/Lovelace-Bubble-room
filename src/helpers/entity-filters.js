// src/helpers/entity-filters.js

/* ───────────── etichette da mostrare sui chip ───────────── */
export const FILTER_LABELS = {
  // domini
  alarm_control_panel: 'Allarmi',
  binary_sensor:       'Sensori Binari',
  camera:              'Telecamere',
  climate:             'Clima',
  cover:               'Tapparelle',
  fan:                 'Ventola',
  light:               'Luce',
  lock:                'Serratura',
  media_player:        'Media Player',
  scene:               'Scene',
  script:              'Script',
  siren:               'Sirena',
  vacuum:              'Aspirapolvere',
  // device_class di binary_sensor
  motion:    'Movimento',
  occupancy: 'Occupazione',
  presence:  'Presenza',
  switch: 'Pulsante',
};

/* ───────────── domini comuni (senza “sensor”) ───────────── */
export const COMMON_CATS = [
  'alarm_control_panel',
  'binary_sensor',
  'camera',
  'climate',
  'cover',
  'fan',
  'light',
  'lock',
  'media_player',
  'scene',
  'script',
  'siren',
  'switch',
  'vacuum',
];

/* ───────────── filtri di sezione ───────────── */
export const FILTERS = {
  /**
   * Presence – filtra per dominio o device_class (binary_sensor)
   * @param {string[]} cats
   */
  presence: (cats = []) => ({
    includeDomains: COMMON_CATS,
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
   * Mushroom – filtra per dominio o device_class, come per “presence”
   * @param {string[]} cats
   */
  mushroom: (cats = []) => ({
    includeDomains: COMMON_CATS,
    entityFilter: (id, hass) => {
      if (!cats.length) {
        // default: mostra solo i binary_sensor
        return id.split('.')[0] === 'binary_sensor';
      }
      const [domain] = id.split('.');
      if (domain === 'binary_sensor') {
        const dc = hass.states[id]?.attributes?.device_class ?? '';
        return cats.includes(dc);
      }
      return cats.includes(domain);
    },
  }),

  /**
   * Sub-button – filtra per dominio o device_class, come per “presence”
   * @param {string[]} cats
   */
  subbutton: (cats = []) => ({
    includeDomains: COMMON_CATS,
    entityFilter: (id, hass) => {
      if (!cats.length) {
        // default: mostra tutti i domini validi
        return COMMON_CATS.includes(id.split('.')[0]);
      }
      const [domain] = id.split('.');
      if (domain === 'binary_sensor') {
        const dc = hass.states[id]?.attributes?.device_class ?? '';
        return cats.includes(dc);
      }
      return cats.includes(domain);
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
 * @param {object} hass        – lo stato di Home Assistant
 * @param {object} config      – la config del tuo editor
 * @param {string} section     – 'presence' | 'sensor' | 'mushroom' | 'subbutton'
 * @param {string[]} cats      – array di categorie (domini o device_class)
 * @returns {string[]} lista di entity_id candidate
 */
export function candidatesFor(hass, config, section, cats = []) {
  if (!hass?.states) return [];

  let desc;
  if (section === 'presence') {
    desc = FILTERS.presence(cats);
  } else if (section === 'sensor') {
    desc = FILTERS.sensor(cats);
  } else if (section === 'mushroom') {
    desc = FILTERS.mushroom(cats);
  } else if (section === 'subbutton') {
    desc = FILTERS.subbutton(cats);
  }

  if (!desc) return [];

  // 1) filtro per dominio
  const byDomain = Object.keys(hass.states).filter(id =>
    desc.includeDomains.includes(id.split('.')[0])
  );

  // 2) filtro device_class/domino
  const byDesc = byDomain.filter(id =>
    desc.entityFilter(id, hass)
  );

  // 3) filtro area se auto-discovery attivo
  const autoDisc = config?.auto_discovery_sections?.[section] ?? false;
  if (autoDisc && config?.area) {
    const inArea = entitiesInArea(hass, config.area);
    return byDesc.filter(id => inArea.includes(id));
  }

  return byDesc;
}
