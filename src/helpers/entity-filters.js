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
  // device_class binary_sensor
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
  plug: 'Presa',
  power: 'Alimentazione',
  problem: 'Problema',
  running: 'In esecuzione',
  safety: 'Sicurezza',
  tamper: 'Manomissione',
  update: 'Aggiornamento',
  // altri domini
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
  'motion', 'occupancy', 'presence', 'moving',
  'door', 'window', 'opening', 'garage_door',
  'vibration', 'sound', 'moisture', 'water', 'smoke', 'gas', 'carbon_monoxide',
  'cold', 'heat', 'light_level', 'connectivity',
  'plug', 'power', 'problem', 'running', 'safety', 'tamper', 'update'
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
      
      // Nessun chip selezionato → mostra tutti i domini consentiti
      if (!cats.length) {
        return COMMON_CATS.includes(domain);
      }
      
      // binary_sensor → filtra per device_class
      if (domain === 'binary_sensor') {
        const dc = hass.states[id]?.attributes?.device_class ?? '';
        return cats.includes(dc);
      }
      
      // altri domini
      return cats.includes(domain);
    },
  }),
  
  camera: (_cats = []) => ({
    includeDomains: ['camera'],
    entityFilter: (_id, _hass) => true,
  }),
  
  climate: (_cats = []) => ({
    includeDomains: ['climate'],
    entityFilter: (_id, _hass) => true,
  }),
};

/* ───────────── helpers: normalizza registri che possono essere array o mappe ───────────── */
function _toEntityMap(entities) {
  if (!entities) return {};
  if (!Array.isArray(entities)) return entities;
  const map = {};
  for (const e of entities) {
    const id = e?.entity_id || e?.id;
    if (id) map[id] = e;
  }
  return map;
}

function _toDeviceMap(devices) {
  if (!devices) return {};
  if (!Array.isArray(devices)) return devices;
  const map = {};
  for (const d of devices) {
    const id = d?.id || d?.device_id;
    if (id) map[id] = d;
  }
  return map;
}

function _isValidAreaId(areaId) {
  return typeof areaId === 'string' && areaId.trim().length > 0;
}

function _matchAreaId(hass, entityId, areaId) {
  if (!_isValidAreaId(areaId)) return true;
  
  const entReg = _toEntityMap(hass?.entities);
  const devReg = _toDeviceMap(hass?.devices);
  
  const regEnt = entReg[entityId];
  if (regEnt?.area_id === areaId) return true;
  
  const devId = regEnt?.device_id || regEnt?.deviceId;
  if (devId && devReg[devId]?.area_id === areaId) return true;
  
  const attrAreaId = hass?.states?.[entityId]?.attributes?.area_id;
  return attrAreaId === areaId;
}

function _keepSelectedFirst(list, selected) {
  const out = Array.from(new Set(list));
  const sel = Array.isArray(selected) ? selected : (selected ? [selected] : []);
  for (let i = sel.length - 1; i >= 0; i--) {
    const s = sel[i];
    if (s && !out.includes(s)) out.unshift(s);
  }
  return out;
}

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

/* ───────────── candidatesFor: lista per i selector ─────────────
   Regole:
   - Se c’è area_id (in config.area_id o config.area) → prova a filtrare per area.
     - con AD ON: nessun fallback → mostra solo se in area.
     - con AD OFF: fallback → se area vuota, mostra comunque entità globali.
   - Keep-selected: sempre in testa. */
export function candidatesFor(hass, config, section, cats = []) {
  if (!hass?.states) return [];
  
  const desc = FILTERS[section]?.(cats);
  if (!desc) return [];
  
  const byDomain = Object.keys(hass.states).filter((id) =>
    desc.includeDomains.includes(id.split('.')[0])
  );
  
  const byDesc = byDomain.filter((id) => desc.entityFilter(id, hass));
  
  let scoped = byDesc;
  const areaId = typeof config?.area_id === 'string' ? config.area_id : config?.area;
  if (_isValidAreaId(areaId)) {
    const inArea = entitiesInArea(hass, areaId);
    const filtered = byDesc.filter((id) => inArea.includes(id));
    const adOn = !!(config?.auto_discovery_sections?.[section]);
    scoped = adOn ? filtered : (filtered.length ? filtered : byDesc);
  }
  
  const sectionCfg = section === 'subbutton' ?
    config?.subbuttons :
    config?.entities?.[section];
  const selectedAll = _extractSelectedEntities(sectionCfg);
  
  return _keepSelectedFirst(scoped, selectedAll);
}