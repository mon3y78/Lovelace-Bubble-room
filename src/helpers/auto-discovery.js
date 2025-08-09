// src/helpers/auto-discovery.js
import { candidatesFor } from './entity-filters.js';

const DEBUG = !!window.__BUBBLE_DEBUG__;
const pickFirstFree = (list, used) => list.find((id) => !used.has(id)) || null;

/* =========================
 *   AUTO-FILL (per sezione)
 * ========================= */

// Sensors: sensor1..sensor8 – riempi solo slot vuoti, rispetta type & area, evita duplicati
export function autoFillSensors(hass, config) {
  const keys = [
    'sensor1','sensor2','sensor3','sensor4',
    'sensor5','sensor6','sensor7','sensor8'
  ];
  const entities = { ...(config.entities || {}) };
  const used = new Set(keys.map((k) => entities[k]?.entity_id).filter(Boolean));

  for (const k of keys) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity_id) continue; // non sovrascrivere scelte utente
    const type = ent.type || '';
    const list = candidatesFor(hass, config, { section: 'sensor', type });
    const pick = pickFirstFree(list, used);
    if (pick) { ent.entity_id = pick; used.add(pick); }
  }
  return { ...config, entities };
}

// Mushrooms: entities1..5 + climate + camera – priorità al dominio degli slot dedicati
export function autoFillMushrooms(hass, config) {
  const order = ['climate','camera','entities1','entities2','entities3','entities4','entities5'];
  const entities = { ...(config.entities || {}) };
  const used = new Set(order.map((k) => entities[k]?.entity).filter(Boolean));
  const all = candidatesFor(hass, config, 'mushroom');

  // slot dedicati
  const climate = entities.climate || (entities.climate = {});
  if (!climate.entity) {
    const pick = all.find((id) => id.startsWith('climate.') && !used.has(id));
    if (pick) { climate.entity = pick; used.add(pick); }
  }
  const camera = entities.camera || (entities.camera = {});
  if (!camera.entity) {
    const pick = all.find((id) => id.startsWith('camera.') && !used.has(id));
    if (pick) { camera.entity = pick; used.add(pick); }
  }
  // slot generici
  for (const k of ['entities1','entities2','entities3','entities4','entities5']) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity) continue;
    const pick = pickFirstFree(all, used);
    if (pick) { ent.entity = pick; used.add(pick); }
  }
  return { ...config, entities };
}

// SubButtons: sub-button1..6 – domini controllabili, filtro area, evita duplicati
export function autoFillSubButtons(hass, config) {
  const keys = ['sub-button1','sub-button2','sub-button3','sub-button4','sub-button5','sub-button6'];
  const entities = { ...(config.entities || {}) };
  const used = new Set(keys.map((k) => entities[k]?.entity).filter(Boolean));
  const list = candidatesFor(hass, config, 'subbutton');

  for (const k of keys) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity) continue;
    const pick = pickFirstFree(list, used);
    if (pick) { ent.entity = pick; used.add(pick); }
  }
  return { ...config, entities };
}

// Presence (Room): presence entity – scegli se vuoto, filtra per domini ammessi + device_class + area
function presenceCandidatesLocal(hass, config) {
  if (!hass || !hass.states) return [];
  const allowed = new Set([
    'person','device_tracker','binary_sensor','light','switch',
    'media_player','fan','humidifier','lock','input_boolean','scene'
  ]);

  let ids = Object.keys(hass.states).filter((id) => allowed.has(id.split('.')[0]));
  // binary_sensor: solo motion/occupancy/presence
  ids = ids.filter((id) => {
    const domain = id.split('.')[0];
    if (domain !== 'binary_sensor') return true;
    const dc = hass.states[id]?.attributes?.device_class;
    return ['motion','occupancy','presence'].includes(dc || '');
  });

  // filtro Area
  const area = config?.area;
  if (area) {
    const inArea = ids.filter((id) => {
      const st = hass.states[id];
      const a1 = st?.attributes?.area_id;
      const a2 = st?.attributes?.area;
      return a1 === area || a2 === area;
    });
    if (inArea.length) ids = inArea;
  }

  // mantieni selezionata anche se fuori filtro
  const selected = config?.entities?.presence?.entity || config?.presence_entity;
  if (selected && !ids.includes(selected)) ids.push(selected);

  if (DEBUG) console.info('[AutoDiscovery][presence candidates]', { area, count: ids.length, sample: ids.slice(0,8) });
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

// Camera: usa candidatesFor per dominio camera con filtro area
export function autoFillCamera(hass, config) {
  const entities = { ...(config.entities || {}) };
  const camera = entities.camera || (entities.camera = {});
  if (camera.entity) return { ...config, entities };

  const candidates = candidatesFor(hass, config, 'camera') || [];
  const pick = candidates[0];
  if (pick) camera.entity = pick;

  return { ...config, entities };
}

/* =========================
 *           RESET
 * ========================= */
export function resetSensors(config) {
  const entities = { ...(config.entities || {}) };
  [
    'sensor1','sensor2','sensor3','sensor4',
    'sensor5','sensor6','sensor7','sensor8'
  ].forEach((k) => delete entities[k]);
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
  if (ad.camera)    next = autoFillCamera(hass, next);

  if (debug && typeof window !== 'undefined' && window.__BUBBLE_DEBUG__) {
    console.info('[AutoDiscovery] applied after', changedProp, { sections: ad });
  }
  return next;
}