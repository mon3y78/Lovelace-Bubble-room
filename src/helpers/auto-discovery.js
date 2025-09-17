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

/** Prova a determinare l'area di un entity id usando registry (entity→area_id o device→area_id) o gli attributi di stato. */
function matchArea(hass, id, areaId, areaName) {
  if (!(areaId || areaName)) return true;

  const reg = hass?.entities;
  const devices = hass?.devices;

  // 1) entity registry → area_id diretto
  const regEnt = reg?.[id];
  if (regEnt?.area_id && areaId) return regEnt.area_id === areaId;

  // 2) entity registry → device_id → device.area_id
  if (regEnt?.device_id && Array.isArray(devices)) {
    const dev = devices.find((d) => d.id === regEnt.device_id || d.device_id === regEnt.device_id);
    if (dev?.area_id && areaId) return dev.area_id === areaId;
  }

  // 3) stato → attributes.area_id / attributes.area (nome)
  const st = hass?.states?.[id];
  if (st) {
    const attrAreaId   = st.attributes?.area_id;
    const attrAreaName = st.attributes?.area;
    if (areaId && attrAreaId)   return attrAreaId === areaId;
    if (areaName && attrAreaName) {
      return String(attrAreaName).toLowerCase() === String(areaName).toLowerCase();
    }
  }

  // se non trovo nulla di determinante, non escludo
  return true;
}

/** Filtra la lista per area e garantisce che l’eventuale entità già selezionata resti in lista (prima posizione). */
function filterByAreaKeepSelected(hass, list, areaRef, selected) {
  const { areaId, areaName } = areaRef;
  let filtered = (list || []).filter((id) => matchArea(hass, id, areaId, areaName)); // se non ci sono entità per l’area selezionata → nessuna entità
  if ((areaId || areaName) && filtered.length === 0) {
    filtered = [];
  }

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

/** Generico “autofill” per dominio (es.: climate, camera) con filtro per area. */
function autoFillByDomain(hass, config, domain, key) {
  const entities = { ...(config.entities || {}) };
  const slot = entities[key] || (entities[key] = {});
  if (slot.entity) return { ...config, entities }; // già valorizzato

  // 1) prova col canale specifico del dominio (se esiste nel filtro custom)
  let pool = gatherCandidates(hass, config, domain);
  if (!pool.length) {
    // 2) fallback: usa i candidati "mushroom" e poi filtra per dominio
    pool = gatherCandidates(hass, config, 'mushroom');
  }
  pool = (pool || []).filter((id) => id.startsWith(`${domain}.`));

  // 3) filtro per area robusto
  const areaRef = resolveAreaRef(hass, config);
  const filtered = filterByAreaKeepSelected(hass, pool, areaRef, slot.entity);

  // 4) prendo il primo utile
  const pick = (filtered[0] || '');
  if (pick) slot.entity = pick;

  if (DEBUG) {
    console.info(`[AutoDiscovery][${key}]`, {
      domain, chosen: slot.entity, areaRef, pool: pool.length, filtered: filtered.length,
    });
  }

  return { ...config, entities };
}

/** Trova il primo elemento non usato in “list”. */
const pickFirstFree = (list, used) => list.find((id) => !used.has(id)) || null;

/* =========================
 *   AUTO-FILL (per sezione)
 * ========================= */

/** Sensori: riempi sensor1..sensor8 (chiave .entity_id in alcune versioni, restiamo compatibili) */
export function autoFillSensors(hass, config) {
  const keys = [
    'sensor1','sensor2','sensor3','sensor4',
    'sensor5','sensor6','sensor7','sensor8'
  ];
  const entities = { ...(config.entities || {}) };

  // supporta sia .entity che .entity_id (compat retro)
  const used = new Set(
    keys.map((k) => entities[k]?.entity || entities[k]?.entity_id).filter(Boolean)
  );

  for (const k of keys) {
    const ent = entities[k] || (entities[k] = {});
    const already = ent.entity || ent.entity_id;
    if (already) continue;

    const type = ent.type || '';
    const list = candidatesFor(hass, config, { section: 'sensor', type }) || [];
    const pick = pickFirstFree(list, used);
    if (pick) {
      // preferisci .entity se nel resto del progetto usi quello
      ent.entity = pick;
      delete ent.entity_id;
      used.add(pick);
    }
  }
  return { ...config, entities };
}

/** Mushroom (5 slot + climate + camera) */
export function autoFillMushrooms(hass, config) {
  const order = ['climate','camera','mushroom1','mushroom2','mushroom3','mushroom4','mushroom5'];
  const entities = { ...(config.entities || {}) };
  const used = new Set(order.map((k) => entities[k]?.entity).filter(Boolean));

  // base candidati generici (poi filtriamo)
  let all = gatherCandidates(hass, config, 'mushroom');

  // climate
  const cli = entities.climate || (entities.climate = {});
  if (!cli.entity) {
    const pick = all.find((id) => id.startsWith('climate.') && !used.has(id));
    if (pick) { cli.entity = pick; used.add(pick); }
  }

  // camera
  const cam = entities.camera || (entities.camera = {});
  if (!cam.entity) {
    const pick = all.find((id) => id.startsWith('camera.') && !used.has(id));
    if (pick) { cam.entity = pick; used.add(pick); }
  }

  // altri 1..5
  for (let i = 1; i <= 5; i++) {
    const key = `mushroom${i}`;
    const rec = entities[key] || (entities[key] = {});
    if (rec.entity) continue;
    const pick = pickFirstFree(all, used);
    if (pick) { rec.entity = pick; used.add(pick); }
  }

  return { ...config, entities };
}

/** SubButtons (6 slot) */
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

/* ===== Presenza (locale, con filtro area) ===== */
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

  // Applica il filtro per area SOLO se l'autodiscovery "presence" è attivo
  const adPresence = config?.auto_discovery_sections?.presence ?? false;
  const { areaId, areaName } = resolveAreaRef(hass, config);
  if (adPresence && (areaId || areaName)) {
    const inArea = ids.filter((id) => matchArea(hass, id, areaId, areaName));
    if (inArea.length) ids = inArea;
  }

  const selected = config?.entities?.presence?.entity || config?.presence_entity;
  if (selected && !ids.includes(selected)) ids.unshift(selected);

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

/* ===== Climate & Camera — allineate e con filtro area ===== */
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
  ['mushroom1','mushroom2','mushroom3','mushroom4','mushroom5','climate','camera']
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
  // Se non ho hass o config coerenti, non fare nulla
  if (!hass || !config) return config;

  const ad = config.auto_discovery_sections || {};
  const isAreaChange = changedProp === 'area';
  const isADChange   = changedProp && String(changedProp).startsWith('auto_discovery_sections.');
  // ⚠️ Non mutiamo più la config: l’autodiscovery resta solo “suggeritore” lato UI.
  if ((debug || DEBUG) && typeof window !== 'undefined') {
    console.info('[AutoDiscovery] (no-op) after', changedProp, { sections: ad, isAreaChange, isADChange });
  }
  return config;
}

// Manteniamo export legacy per compatibilità con script esterni.
export const __deprecated = {
  resolveAreaRef,
  matchArea,
  filterByAreaKeepSelected,
  gatherCandidates,
  pickFirstFree,
};
