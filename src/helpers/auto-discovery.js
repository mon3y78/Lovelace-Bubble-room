// src/helpers/auto-discovery.js
import { candidatesFor } from './entity-filters.js';

const DEBUG = !!window.__BUBBLE_DEBUG__;

/* ===============================
 *  Helper generici riutilizzabili
 * =============================== */

/** Ricava { areaId, areaName } dalla config, con risoluzione da nome → area_id se possibile. */
function resolveAreaRef(hass, config) {
  const raw = Array.isArray(config?.area) ? config.area[0] : config?.area;
  const areaName = (typeof raw === 'string' && !raw.startsWith('area_')) ? raw : '';
  let areaId = (typeof raw === 'string' && raw.startsWith('area_')) ? raw : '';
  const areas = Array.isArray(hass?.areas) ? hass.areas : [];
  if (!areaId && areas.length && areaName) {
    const hit = areas.find((a) => (a.name || '').toLowerCase() === String(areaName).toLowerCase());
    if (hit?.area_id) areaId = hit.area_id;
  }
  return { areaId, areaName };
}

/** Confronta l’entity id con l’area: prima registry (hass.entities), poi attributes su state (area_id/area), poi nome. */
function matchArea(hass, id, areaId, areaName) {
  const reg = hass?.entities;
  if (areaId && reg?.[id]?.area_id) return reg[id].area_id === areaId;

  const st = hass?.states?.[id];
  if (!st) return !(areaId || areaName); // se non so nulla, non escludere

  const attrAreaId   = st.attributes?.area_id;
  const attrAreaName = st.attributes?.area;

  if (areaId && attrAreaId)   return attrAreaId === areaId;
  if (areaName && attrAreaName) {
    return String(attrAreaName).toLowerCase() === String(areaName).toLowerCase();
  }
  return !(areaId || areaName);
}

/** Filtra la lista per area e garantisce che l’eventuale entità già selezionata resti in lista. */
function filterByAreaKeepSelected(hass, list, areaRef, selected) {
  const { areaId, areaName } = areaRef;
  const filtered = (list || []).filter((id) => matchArea(hass, id, areaId, areaName));
  if (selected && !filtered.includes(selected)) filtered.unshift(selected);
  return Array.from(new Set(filtered));
}

/** Raccoglie candidati dal pipeline “candidatesFor”, con fallback a hass.states se vuoto. */
function gatherCandidates(hass, config, sectionOrDomain) {
  let list = candidatesFor(hass, config, sectionOrDomain) || [];
  if (!list.length && hass?.states) {
    list = Object.keys(hass.states);
  }
  return list;
}

/** Generico “autofill” per dominio (es.: climate, camera) */
function autoFillByDomain(hass, config, domain, key) {
  const entities = { ...(config.entities || {}) };
  const slot = entities[key] || (entities[key] = {});
  if (slot.entity) return { ...config, entities }; // già valorizzato

  let pool = gatherCandidates(hass, config, 'mushroom');
  pool = pool.filter((id) => id.startsWith(domain + '.'));

  const areaRef = resolveAreaRef(hass, config);
  const filtered = filterByAreaKeepSelected(hass, pool, areaRef, slot.entity);

  const pick = (filtered[0] || pool[0] || '');
  if (pick) slot.entity = pick;

  if (DEBUG) console.info(`[AutoDiscovery][${key}]`, {
    domain, chosen: slot.entity, areaRef, pool: pool.length, filtered: filtered.length,
  });

  return { ...config, entities };
}

/** Trova il primo elemento non usato in “list”. */
const pickFirstFree = (list, used) => list.find((id) => !used.has(id)) || null;

/* =========================
 *   AUTO-FILL (per sezione)
 * ========================= */

export function autoFillSensors(hass, config) {
  const keys = [
    'sensor1','sensor2','sensor3','sensor4',
    'sensor5','sensor6','sensor7','sensor8'
  ];
  const entities = { ...(config.entities || {}) };
  const used = new Set(keys.map((k) => entities[k]?.entity_id).filter(Boolean));

  for (const k of keys) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity_id) continue;

    const type = ent.type || '';
    const list = candidatesFor(hass, config, { section: 'sensor', type }) || [];
    const pick = pickFirstFree(list, used);
    if (pick) { ent.entity_id = pick; used.add(pick); }
  }
  return { ...config, entities };
}

export function autoFillMushrooms(hass, config) {
  const order = ['climate','camera','entities1','entities2','entities3','entities4','entities5'];
  const entities = { ...(config.entities || {}) };
  const used = new Set(order.map((k) => entities[k]?.entity).filter(Boolean));

  // base candidati generici
  let all = gatherCandidates(hass, config, 'mushroom');

  // climate
  const climate = entities.climate || (entities.climate = {});
  if (!climate.entity) {
    const pick = all.find((id) => id.startsWith('climate.') && !used.has(id));
    if (pick) { climate.entity = pick; used.add(pick); }
  }

  // camera
  const camera = entities.camera || (entities.camera = {});
  if (!camera.entity) {
    const pick = all.find((id) => id.startsWith('camera.') && !used.has(id));
    if (pick) { camera.entity = pick; used.add(pick); }
  }

  // altri 1..5
  for (const k of ['entities1','entities2','entities3','entities4','entities5']) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity) continue;
    const pick = pickFirstFree(all, used);
    if (pick) { ent.entity = pick; used.add(pick); }
  }
  return { ...config, entities };
}

export function autoFillSubButtons(hass, config) {
  const keys = ['sub-button1','sub-button2','sub-button3','sub-button4','sub-button5','sub-button6'];
  const entities = { ...(config.entities || {}) };
  const used = new Set(keys.map((k) => entities[k]?.entity).filter(Boolean));
  const list = candidatesFor(hass, config, 'subbutton') || [];

  for (const k of keys) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity) continue;
    const pick = pickFirstFree(list, used);
    if (pick) { ent.entity = pick; used.add(pick); }
  }
  return { ...config, entities };
}

/* ===== presenza (locale) ===== */
function presenceCandidatesLocal(hass, config) {
  if (!hass || !hass.states) return [];
  const allowed = new Set([
    'person','device_tracker','binary_sensor','light','switch',
    'media_player','fan','humidifier','lock','input_boolean','scene'
  ]);

  let ids = Object.keys(hass.states).filter((id) => allowed.has(id.split('.')[0]));
  ids = ids.filter((id) => {
    const domain = id.split('.')[0];
    if (domain !== 'binary_sensor') return true;
    const dc = hass.states[id]?.attributes?.device_class;
    return ['motion','occupancy','presence'].includes(dc || '');
  });

  // filtro per area semplice usando attributi/registry, con fallback
  const { areaId, areaName } = resolveAreaRef(hass, config);
  if (areaId || areaName) {
    const inArea = ids.filter((id) => matchArea(hass, id, areaId, areaName));
    if (inArea.length) ids = inArea;
  }

  const selected = config?.entities?.presence?.entity || config?.presence_entity;
  if (selected && !ids.includes(selected)) ids.push(selected);

  if (DEBUG) console.info('[AutoDiscovery][presence candidates]', {
    areaId, areaName, count: ids.length, sample: ids.slice(0, 8)
  });
  return ids;
}

export function autoFillPresence(hass, config) {
  const entities = { ...(config.entities || {}) };
  const ent = entities.presence || (entities.presence = {});
  if (!ent.entity) {
    const list = presenceCandidatesLocal(hass, config);
    if (list.length) ent.entity = list[0];
  }
  return { ...config, entities };
}

/* ===== Climate & Camera — allineate alla pipeline generica ===== */
export function autoFillClimate(hass, config) {
  return autoFillByDomain(hass, config, 'climate', 'climate');
}

export function autoFillCamera(hass, config) {
  return autoFillByDomain(hass, config, 'camera', 'camera');
}

/* =========================
 *           RESET
 * ========================= */
export function resetSensors(config) {
  const entities = { ...(config.entities || {}) };
  ['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6','sensor7','sensor8']
    .forEach((k) => delete entities[k]);
  return { ...config, entities };
}
export function resetMushrooms(config) {
  const entities = { ...(config.entities || {}) };
  ['entities1','entities2','entities3','entities4','entities5','climate','camera']
    .forEach((k) => delete entities[k]);
  return { ...config, entities };
}
export function resetSubButtons(config) {
  const entities = { ...(config.entities || {}) };
  ['sub-button1','sub-button2','sub-button3','sub-button4','sub-button5','sub-button6']
    .forEach((k) => delete entities[k]);
  return { ...config, entities };
}
export function resetRoom(config) {
  const entities = { ...(config.entities || {}) };
  delete entities.presence;
  const next = { ...config, entities };
  delete next.name;
  delete next.icon;
  delete next.area;
  delete next.presence_entity;
  return next;
}
// --- RESET DEDICATI ---
export function resetClimate(config) {
  const entities = { ...(config.entities || {}) };
  delete entities.climate;
  return { ...config, entities };
}
export function resetCamera(config) {
  const entities = { ...(config.entities || {}) };
  delete entities.camera;
  return { ...config, entities };
}

/* =========================
 *   TRIGGER CENTRALE
 * ========================= */
export function maybeAutoDiscover(hass, config, changedProp, debug = false) {
  const ad = config.auto_discovery_sections || {};
  const isAreaChange = changedProp === 'area';
  const isADChange   = changedProp && changedProp.startsWith('auto_discovery_sections.');
  if (!isAreaChange && !isADChange) return config;

  let next = config;
  if (ad.sensor)    next = autoFillSensors(hass, next);
  if (ad.mushroom)  next = autoFillMushrooms(hass, next);
  if (ad.subbutton) next = autoFillSubButtons(hass, next);
  if (ad.presence)  next = autoFillPresence(hass, next);
  if (ad.climate)   next = autoFillClimate(hass, next); // stessa logica degli altri
  if (ad.camera)    next = autoFillCamera(hass, next);  // stessa logica degli altri

  if (debug && typeof window !== 'undefined' && window.__BUBBLE_DEBUG__) {
    console.info('[AutoDiscovery] applied after', changedProp, { sections: ad });
  }
  return next;
}