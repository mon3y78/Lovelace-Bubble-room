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

/* ───────────── filtri di sezione (no area qui!) ───────────── */
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

/* ───────────── helpers area (robusti: nome o area_id; registry/device/state) ───────────── */
function _asArrayMaybe(objOrArr) {
  if (!objOrArr) return [];
  return Array.isArray(objOrArr) ? objOrArr : Object.values(objOrArr);
}

function _areasArray(hass) {
  return _asArrayMaybe(hass?.areas);
}

function _devicesArray(hass) {
  return _asArrayMaybe(hass?.devices);
}

function _entitiesMap(hass) {
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

/** Ricava { areaId, areaName } dalla config (accetta nome o area_id). */
function _resolveAreaRef(hass, config) {
  const raw = Array.isArray(config?.area) ? config.area[0] : config?.area;
  if (!raw || typeof raw !== 'string') return { areaId: '', areaName: '' };

  if (raw.startsWith('area_')) return { areaId: raw, areaName: '' };

  const name = String(raw).trim();
  const hit = _areasArray(hass).find(
    (a) => String(a?.name || '').toLowerCase() === name.toLowerCase()
  );
  return { areaId: hit?.area_id || '', areaName: name };
}

/** Verifica se un entity è in area (entity.area_id → device.area_id → state.attributes). */
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

  // fallback: non escludere se non determinabile
  return true;
}

function _keepSelectedFirst(list, selected) {
  const out = Array.from(new Set(list));
  if (selected && !out.includes(selected)) out.unshift(selected);
  return out;
}

/* ───────────── funzione che trova entità in una certa area (utility) ───────────── */
export function entitiesInArea(hass, areaRef) {
  if (!hass?.states) return [];
  const { areaId, areaName } = _resolveAreaRef(hass, { area: areaRef });
  if (!(areaId || areaName)) return Object.keys(hass.states);

  const all = Object.keys(hass.states);
  return all.filter((eid) => _matchArea(hass, eid, areaId, areaName));
}

/* ───────────── candidatesFor: genera la lista per i selector ─────────────
   NOTE: area‑scoping applicato SOLO a camera/climate (gli altri restano invariati). */
export function candidatesFor(hass, config, section, cats = []) {
  if (!hass?.states) return [];

  // 1) selettore filtri base per sezione
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

  // 3) filtro device_class/domains specifico
  const byDesc = byDomain.filter((id) => desc.entityFilter(id, hass));

  // 4) (solo camera/climate) scoping area quando AD è attivo e area presente
  const wantsArea = section === 'camera' || section === 'climate';
  const autoDisc = config?.auto_discovery_sections?.[section] ?? false;

  if (wantsArea && autoDisc && config?.area) {
    const { areaId, areaName } = _resolveAreaRef(hass, config);
    if (areaId || areaName) {
      const filtered = byDesc.filter((eid) => _matchArea(hass, eid, areaId, areaName));
      const selected =
        section === 'camera'
          ? (config?.entities?.camera?.entity || '')
          : (config?.entities?.climate?.entity || '');
      const base = filtered.length ? filtered : byDesc; // fallback se il match area è vuoto
      return _keepSelectedFirst(base, selected);
    }
  }

  // 5) per tutte le altre sezioni (o se area non definita), nessun filtraggio extra
  return byDesc;
}
