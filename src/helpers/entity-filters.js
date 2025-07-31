/**
 * Raccolta di filtri “di sezione” usati da tutti i pannelli della card.
 * Ogni descrittore può contenere:
 *   • includeDomains        array di domini ammessi
 *   • includeDeviceClasses  array di device_class ammessi (solo per binary_sensor)
 *   • entityFilter(state)   funzione extra, deve restituire true / false
 */
export const FILTERS = {
  presence: {
    includeDomains: [
      'person', 'device_tracker', 'binary_sensor',
      'light', 'switch', 'media_player', 'fan',
      'humidifier', 'lock', 'input_boolean', 'scene'
    ],
    includeDeviceClasses: ['motion', 'occupancy', 'presence'],
    entityFilter: (state, hass) => {
      const id = typeof state === 'string' ? state : state?.entity_id;
      if (!id) return false;
      const [domain] = id.split('.');
      if (domain === 'binary_sensor') {
        const dc = hass?.states?.[id]?.attributes?.device_class;
        return ['motion', 'occupancy', 'presence'].includes(dc);
      }
      return true;
    },
  },
  
  sensorByType: (type) => ({
    includeDomains: ['sensor'],
    includeDeviceClasses: undefined,
    entityFilter: (state) => {
      // in futuro potrai filtrare per type/device_class
      return !!state;
    },
  }),
  
  subbutton: {
    includeDomains: [
      'light', 'switch', 'media_player', 'fan', 'cover',
      'humidifier', 'lock', 'scene', 'input_boolean',
      'script', 'button'
    ],
    entityFilter: () => true,
  },
  
  mushroom: {
    includeDomains: [
      'light', 'switch', 'media_player', 'fan', 'cover',
      'humidifier', 'lock', 'scene', 'input_boolean',
      'script', 'button', 'sensor', 'binary_sensor', 'climate'
    ],
    entityFilter: () => true,
  },
};

/* ────────────────────────────────────────────────────────────────── */
/*  NOVITÀ  ➜  utility riusabile per sapere quali entità sono in area */
/* ────────────────────────────────────────────────────────────────── */
export function entitiesInArea(hass, areaId) {
  if (!hass?.states || !areaId) return [];
  return Object.keys(hass.states).filter((eid) => {
    const attr = hass.states[eid]?.attributes ?? {};
    // area_id = entity-registry / area = attributo legacy di alcune integrazioni
    return attr.area_id === areaId || attr.area === areaId;
  });
}

/**
 * Restituisce la lista finale di entity_id “candidati” per una sezione.
 *
 * Esempi:
 *   candidatesFor(hass, config, 'presence')
 *   candidatesFor(hass, config, { section: 'sensor', type })
 */
export function candidatesFor(hass, config, sectionOrOpts) {
  const opts = typeof sectionOrOpts === 'string' ?
    { section: sectionOrOpts } :
    (sectionOrOpts || {});
  const section = opts.section;
  if (!hass || !hass.states || !section) return [];
  
  /* scegli il descrittore di filtro */
  let desc;
  if (section === 'sensor') {
    desc = FILTERS.sensorByType(opts.type);
  } else {
    desc = FILTERS[section];
  }
  if (!desc) return [];
  
  const {
    includeDomains = [],
      includeDeviceClasses = [],
      entityFilter = () => true,
  } = desc;
  
  /* 1. filtro per domini ---------------------------------------------------- */
  const allIds = Object.keys(hass.states);
  const byDomain = includeDomains.length ?
    allIds.filter((id) => includeDomains.includes(id.split('.')[0])) :
    allIds.slice();
  
  /* 2. filtro custom (device_class, ecc.) ----------------------------------- */
  const byDesc = byDomain.filter((id) => entityFilter(id, hass));
  
  /* 3. filtro per area (NOVITÀ) --------------------------------------------- */
  const area = config?.area;
  let res = byDesc;
  if (area) {
    const fromArea = entitiesInArea(hass, area);
    res = byDesc.filter((id) => fromArea.includes(id));
  }
  
  return res;
}