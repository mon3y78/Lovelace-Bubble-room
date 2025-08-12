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

/* ───────────── helpers area (robusti: nome o area_id, registry/device/state) ───────────── */
function _asArrayMaybe(objOrArr) {
  if (!objOrArr) return [];
  return Array.isArray(objOrArr) ? objOrArr : Object.values(objOrArr);
}

function _areasArray(hass) {
  // hass.areas può essere array o mappa; normalizza a array
  return _asArrayMaybe(hass?.areas);
}

function _devicesArray(hass) {
  return _asArrayMaybe(hass?.devices);
}

function _entitiesMap(hass) {
  // entity registry: spesso è mappa {entity_id: {...}}
  // se arrivasse come array, mappa per entity_id
  const raw = hass?.entities;
  if (!raw) return {};
  if (!Array.isArray(raw)) return raw;
  const map = {};
  for (const e of raw) {
    const id = e?.entity_id || e?.id;
    if (id) map[id] = e;
  }
  return map;
}

function _resolveAreaRef(hass, config) {
  // accetta stringa (nome o area_id) o array (primo elemento)
  const raw = Array.isArray(config?.area) ? config.area[0] : config?.area;
  if (!raw || typeof raw !== 'string') return { areaId: '', areaName: '' };

  // se sembra un area_id
  if (raw.startsWith('area_')) return { areaId: raw, areaName: '' };

  // altrimenti trattalo come nome; prova a trovarne l'area_id
  const name = String(raw).trim();
  const hit = _areasArray(hass).find(
    (a) => String(a?.name || '').toLowerCase() === name.toLowerCase()
  );
  return { areaId: hit?.area_id || '', areaName: name };
}

function _matchArea(hass, entityId, areaId, areaName) {
  if (!(areaId || areaName)) return true;

  const entReg = _entitiesMap(hass);
  const devs = _devicesArray(hass);

  // 1) entity registry → area_id
  const regEnt = entReg[entityId];
  if (regEnt?.area_id && areaId) return regEnt.area_id === areaId;

  // 2) entity registry → device_id → device.area_id
  const devId = regEnt?.device_id || regEnt?.deviceId;
  if (devId && devs.length) {
    const dev = devs.find((d) => d.id === devId || d.device_id === devId);
    if (dev?.area_id && areaId) return dev.area_id === areaId;
  }

  // 3) stato → attributes.area_id / attributes.area (nome)
  const st = hass?.states?.[entityId];
  if (st) {
    const attrAreaId = st.attributes?.area_id;
    const attrAreaName = st.attributes?.area;
    if (areaId && attrAreaId) return attrAreaId === areaId;
    if (areaName && attrAreaName) {
      return String(attrAreaName).toLowerCase() === String(areaName).toLowerCase();
    }
  }

  // fallback: se non sappiamo dire, non escludere
  return true;
}

function _keepSelectedFirst(list, selected) {
  const out = Array.from(new Set(list));
  if (selected && !out.includes(selected)) out.unshift(selected);
  return out;
}

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

  // 📷 Camera
  camera: (cats = []) => ({
    includeDomains: ['camera'],
    entityFilter: (id, hass) => {
      if (!cats.length) return true;
      const dc = hass.states[id]?.attributes?.device_class ?? '';
      return cats.includes(dc);
    },
  }),

  // 🌡️ Climate
  climate: (cats = []) => ({
    includeDomains: ['climate'],
    entityFilter: (_id, _hass) => true,
  }),
};

/* ───────────── funzione che trova entità in una certa area ─────────────
   (usa registry entità, device area, o attributi di stato; accetta nome o area_id) */
export function entitiesInArea(hass, areaRef) {
  if (!hass?.states) return [];
  const configMock = { area: areaRef };
  const { areaId, areaName } = _resolveAreaRef(hass, configMock);
  if (!(areaId || areaName)) return Object.keys(hass.states);

  const all = Object.keys(hass.states);
  return all.filter((eid) => _matchArea(hass, eid, areaId, areaName));
}

/* ───────────── candidatesFor: genera la lista area‑aware per i selector ───────────── */
export function candidatesFor(hass, config, section, cats = []) {
  if (!hass?.states) return [];

  // 1) descrittore filtri per sezione
  const desc =
    section === 'presence' ? FILTERS.presence(cats)
    : section === 'sensor' ? FILTERS.sensor(cats)
    : section === 'mushroom' ? FILTERS.mushroom(cats)
    : section === 'subbutton' ? FILTERS.subbutton(cats)
    : section === 'camera' ? FILTERS.camera(cats)
    : section === 'climate' ? FILTERS.climate(cats)
    : null;

  if (!desc) return [];

  // 2) filtro per dominio
  const byDomain = Object.keys(hass.states).filter((id) =>
    desc.includeDomains.includes(id.split('.')[0])
  );

  // 3) filtro device_class/domains specifico
  const byDesc = byDomain.filter((id) => desc.entityFilter(id, hass));

  // 4) area scoping (solo se autodiscovery attivo e area presente)
  const autoDisc = config?.auto_discovery_sections?.[section] ?? false;

  // Sezione “single‑slot” che vogliamo sempre area‑aware quando AD è on
  const isSingleSlot = section === 'camera' || section === 'climate' || section === 'presence';

  let scoped = byDesc;
  if (autoDisc && config?.area) {
    const { areaId, areaName } = _resolveAreaRef(hass, config);
    if (areaId || areaName) {
      scoped = byDesc.filter((eid) => _matchArea(hass, eid, areaId, areaName));
      // keep‑selected per camera/climate (evita che sparisca l’entità già scelta)
      if (isSingleSlot) {
        const selected =
          section === 'camera'
            ? (config?.entities?.camera?.entity || '')
            : section === 'climate'
              ? (config?.entities?.climate?.entity || '')
              : '';
        scoped = _keepSelectedFirst(scoped, selected);
      }
    }
  }

  return scoped;
}
