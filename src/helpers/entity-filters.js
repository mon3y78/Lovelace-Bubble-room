// src/helpers/entity-filters.js

/* ───────────── etichette da mostrare sui chip ───────────── */
export const FILTER_LABELS = {
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
  motion: 'Movimento',
  occupancy: 'Occupazione',
  presence: 'Presenza',
  motion: 'Movimento',
  occupancy: 'Occupazione',
  presence: 'Presenza',
  moving: 'In movimento',
  door: 'Porta',
  window: 'Finestra',
  opening: 'Apertura',
  garage_door: 'Basculante',
  vibration: 'Vibrazione',
  sound: 'Suono',
  moisture: 'Umidità/Perdita',
  water: 'Acqua/Perdita',
  smoke: 'Fumo',
  gas: 'Gas',
  carbon_monoxide: 'Monossido',
  cold: 'Freddo',
  heat: 'Caldo',
  light_level: 'Luce (livello)',
  connectivity: 'Connettività',
  lock_dc: 'Serratura (stato)', // opzionale se lo usi come DC
  plug: 'Presa',
  power: 'Alimentazione',
  problem: 'Problema',
  running: 'In esecuzione',
  safety: 'Sicurezza',
  tamper: 'Manomissione',
  update: 'Aggiornamento',
  switch: 'Pulsante',
  input_boolean: 'Interruttore',
};

/* ───────────── domini comuni (senza “sensor”) ───────────── */
export const COMMON_CATS = [
  'alarm_control_panel',
  'binary_sensor',
  'camera',
  'climate',
  'cover',
  'fan',
  'input_boolean',
  'light',
  'lock',
  'media_player',
  'scene',
  'script',
  'siren',
  'switch',
  'vacuum',
];

/* —— device_class comuni dei binary_sensor rese selezionabili in UI —— */
export const BINARY_SENSOR_CATS = [
  'motion','occupancy','presence','moving',
  'door','window','opening','garage_door',
  'vibration','sound','moisture','water','smoke','gas','carbon_monoxide',
  'cold','heat','light_level','connectivity',
  'plug','power','problem','running','safety','tamper','update'
];

/* ───────────── filtri di sezione (criteri dominio/device_class; niente area qui) ───────────── */
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
        // default: propone i binary_sensor
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
      const [domain] = id.split('.');
      
      // Se nessun chip selezionato → mostra tutti i domini consentiti
      if (!cats.length) {
        return COMMON_CATS.includes(domain);
      }
      
      // Se è un binary_sensor → filtra per device_class (chip come: motion, occupancy, ecc.)
      if (domain === 'binary_sensor') {
        const dc = hass.states[id]?.attributes?.device_class ?? '';
        return cats.includes(dc);
      }
      
      // Altrimenti → filtra per dominio in base ai chip selezionati (fan, light, scene, ecc.)
      return cats.includes(domain);
    },
  }),

  camera: (cats = []) => ({
    includeDomains: ['camera'],
    entityFilter: (id, hass) => {
      if (!cats.length) return true;
      const dc = hass.states[id]?.attributes?.device_class ?? '';
      return cats.includes(dc);
    },
  }),

  climate: (_cats = []) => ({
    includeDomains: ['climate'],
    entityFilter: (_id, _hass) => true,
  }),
};

/* ───────────── helpers: normalizza registri che possono essere array o mappe ───────────── */
function _toEntityMap(entities) {
  if (!entities) return {};
  if (!Array.isArray(entities)) return entities; // già mappa {entity_id: {...}}
  const map = {};
  for (const e of entities) {
    const id = e?.entity_id || e?.id;
    if (id) map[id] = e;
  }
  return map;
}

function _toDeviceMap(devices) {
  if (!devices) return {};
  if (!Array.isArray(devices)) return devices; // già mappa {device_id: {...}} o {id: {...}}
  const map = {};
  for (const d of devices) {
    const id = d?.id || d?.device_id;
    if (id) map[id] = d;
  }
  return map;
}

/* ───────────── helpers area (SOLO area_id, qualsiasi stringa non vuota) ───────────── */
function _isValidAreaId(areaId) {
  return typeof areaId === 'string' && areaId.trim().length > 0;
}

/** Verifica se una entity è nell'area indicata (solo confronti su area_id). */
function _matchAreaId(hass, entityId, areaId) {
  if (!_isValidAreaId(areaId)) return true;

  const entReg = _toEntityMap(hass?.entities);
  const devReg = _toDeviceMap(hass?.devices);

  // 1) entity registry → area_id
  const regEnt = entReg[entityId];
  if (regEnt?.area_id === areaId) return true;

  // 2) entity registry → device_id → device.area_id
  const devId = regEnt?.device_id || regEnt?.deviceId;
  if (devId && devReg[devId]?.area_id === areaId) return true;

  // 3) stato → attributes.area_id
  const attrAreaId = hass?.states?.[entityId]?.attributes?.area_id;
  return attrAreaId === areaId;
}

/* ───────────── keep‑selected uniforme ───────────── */
function _keepSelectedFirst(list, selected) {
  const out = Array.from(new Set(list));
  const sel = Array.isArray(selected) ? selected : (selected ? [selected] : []);
  for (let i = sel.length - 1; i >= 0; i--) {
    const s = sel[i];
    if (s && !out.includes(s)) out.unshift(s);
  }
  return out;
}

/** estrae TUTTE le entity già selezionate in una sezione (ricorsivo) */
function _extractSelectedEntities(sectionConfig) {
  const acc = new Set();
  const walk = (v) => {
    if (!v) return;
    if (typeof v === 'string' && v.includes('.')) {
      acc.add(v);
      return;
    }
    if (Array.isArray(v)) {
      v.forEach(walk);
      return;
    }
    if (typeof v === 'object') {
      Object.values(v).forEach(walk);
    }
  };
  walk(sectionConfig);
  return Array.from(acc);
}

/* ───────────── utility: tutte le entity in una certa area (SOLO area_id) ───────────── */
export function entitiesInArea(hass, areaId) {
  if (!hass?.states || !_isValidAreaId(areaId)) return [];
  return Object.keys(hass.states).filter((eid) => _matchAreaId(hass, eid, areaId));
}

/* ───────────── candidatesFor: lista per i selector (area‑aware + keep‑selected) ─────────────
   Regole:
   - Se c’è area_id (in config.area_id o config.area) → prova a filtrare per area (fallback se vuoto).
   - Metti SEMPRE in testa le entità già selezionate in quella sezione (qualsiasi struttura).
*/
export function candidatesFor(hass, config, section, cats = []) {
  if (!hass?.states) return [];

  // 1) filtri base per sezione
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
  } else if (section === 'climate') {
    desc = FILTERS.climate(cats);
  }

  if (!desc) return [];

  // 2) filtro per dominio
  const byDomain = Object.keys(hass.states).filter((id) =>
    desc.includeDomains.includes(id.split('.')[0])
  );

  // 3) filtro specifico (device_class/domains)
  const byDesc = byDomain.filter((id) => desc.entityFilter(id, hass));

  // 4) scoping per area (SOLO area_id) con fallback
  let scoped = byDesc;
  const areaId = typeof config?.area_id === 'string' ? config.area_id : config?.area;
  if (_isValidAreaId(areaId)) {
    const inArea = entitiesInArea(hass, areaId);
    const filtered = byDesc.filter((id) => inArea.includes(id));
    if (filtered.length) scoped = filtered; // fallback automatico se vuoto
  }

  // 5) keep‑selected per TUTTE le sezioni
  const sectionCfg = section === 'subbutton'
    ? config?.subbuttons
    : config?.entities?.[section];
  const selectedAll = _extractSelectedEntities(sectionCfg);
  return _keepSelectedFirst(scoped, selectedAll);
}
