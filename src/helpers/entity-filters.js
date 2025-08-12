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
  switch: 'Pulsante',
};

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
      if (!cats.length) return id.split('.')[0] === 'binary_sensor';
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
    entityFilter: (id) => {
      if (!cats.length) return COMMON_CATS.includes(id.split('.')[0]);
      const [domain] = id.split('.');
      return COMMON_CATS.includes(domain);
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
  climate: () => ({
    includeDomains: ['climate'],
    entityFilter: () => true,
  }),
};

/* ───────────── helpers area ───────────── */
function _toEntityMap(entities) {
  if (!entities) return {};
  if (!Array.isArray(entities)) return entities;
  return entities.reduce((map, e) => {
    const id = e?.entity_id || e?.id;
    if (id) map[id] = e;
    return map;
  }, {});
}

function _toDeviceMap(devices) {
  if (!devices) return {};
  if (!Array.isArray(devices)) return devices;
  return devices.reduce((map, d) => {
    const id = d?.id || d?.device_id;
    if (id) map[id] = d;
    return map;
  }, {});
}

function _isValidAreaId(areaId) {
  return typeof areaId === 'string' && areaId.startsWith('area_');
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

/* ───────────── keep-selected uniforme ───────────── */
function _keepSelectedFirst(list, selected) {
  const out = Array.from(new Set(list));
  const sel = Array.isArray(selected) ? selected : selected ? [selected] : [];
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
    } else if (Array.isArray(v)) {
      v.forEach(walk);
    } else if (typeof v === 'object') {
      Object.values(v).forEach(walk);
    }
  };
  walk(sectionConfig);
  return Array.from(acc);
}

/* ───────────── entitiesInArea ───────────── */
export function entitiesInArea(hass, areaId) {
  if (!hass?.states || !_isValidAreaId(areaId)) return [];
  return Object.keys(hass.states).filter((eid) => _matchAreaId(hass, eid, areaId));
}

/* ───────────── candidatesFor ───────────── */
export function candidatesFor(hass, config, section, cats = []) {
  if (!hass?.states) return [];

  let desc = FILTERS[section]?.(cats);
  if (!desc) return [];

  const byDomain = Object.keys(hass.states).filter((id) =>
    desc.includeDomains.includes(id.split('.')[0])
  );

  const byDesc = byDomain.filter((id) => desc.entityFilter(id, hass));

  let scoped = byDesc;
  if (_isValidAreaId(config?.area)) {
    const inArea = entitiesInArea(hass, config.area);
    const filtered = byDesc.filter((id) => inArea.includes(id));
    if (filtered.length) scoped = filtered;
  }

  const sectionCfg = config?.entities?.[section];
  const selectedAll = _extractSelectedEntities(sectionCfg);
  return _keepSelectedFirst(scoped, selectedAll);
}
