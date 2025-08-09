// src/helpers/entity-filters.js

/* ───────────── etichette da mostrare sui chip ───────────── */
export const FILTER_LABELS = {
  // domini
  alarm_control_panel: 'Allarmi',
  binary_sensor: 'Sensori Binari',
  camera: 'Telecamere',
  climate: 'Clima',
  cover: 'Tapparelle',
  fan: 'Ventola',
  light: 'Luce',
  lock: 'Serratura',
  media_player: 'Media Player',
  scene: 'Scene',
  script: 'Script',
  siren: 'Sirena',
  vacuum: 'Aspirapolvere',
  // device_class di binary_sensor
  motion: 'Movimento',
  occupancy: 'Occupazione',
  presence: 'Presenza',
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
  
  sensor: (cats = []) => ({
    includeDomains: ['sensor'],
    entityFilter: (id, hass) => {
      if (!cats.length) return true;
      const dc = hass.states[id]?.attributes?.device_class ?? '';
      return cats.includes(dc);
    },
  }),
  
  mushroom: (cats = []) => ({
    includeDomains: COMMON_CATS,
    entityFilter: (id, hass) => {
      if (!cats.length) {
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
  
  subbutton: (cats = []) => ({
    includeDomains: COMMON_CATS,
    entityFilter: (id, hass) => {
      if (!cats.length) {
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
  
  // 📷 Nuovo filtro Camera
  camera: (cats = []) => ({
    includeDomains: ['camera'],
    entityFilter: (id, hass) => {
      if (!cats.length) return true;
      const dc = hass.states[id]?.attributes?.device_class ?? '';
      return cats.includes(dc);
    },
  }),
};

/* ───────────── funzione che trova entità in una certa area ───────────── */
export function entitiesInArea(hass, areaId) {
  if (!hass?.states || !areaId) return [];
  
  const entReg = hass.entities ?? {};
  const devReg = hass.devices ?? {};
  
  return Object.keys(hass.states).filter((eid) => {
    const ent = entReg[eid];
    if (ent?.area_id === areaId) return true;
    const devId = ent?.device_id;
    if (devId && devReg[devId]?.area_id === areaId) return true;
    const attr = hass.states[eid]?.attributes ?? {};
    return attr.area_id === areaId || attr.area === areaId;
  });
}

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
  } else if (section === 'camera') {
    desc = FILTERS.camera(cats);
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