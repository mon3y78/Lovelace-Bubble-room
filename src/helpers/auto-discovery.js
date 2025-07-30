// helpers/auto-discovery.js
import { candidatesFor } from './entity-filters.js';

const pickFirstFree = (list, used) => list.find((id) => !used.has(id)) || null;

/** Sensors: sensor1..sensor6 – fill only empty slots, respect type & area, avoid duplicates */
export function autoFillSensors(hass, config) {
  const keys = ['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6'];
  const entities = { ...(config.entities || {}) };
  const used = new Set(keys.map((k) => entities[k]?.entity_id).filter(Boolean));

  for (const k of keys) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity_id) continue; // keep user choice
    const type = ent.type || '';
    const list = candidatesFor(hass, config, { section: 'sensor', type });
    const pick = pickFirstFree(list, used);
    if (pick) { ent.entity_id = pick; used.add(pick); }
  }
  return { ...config, entities };
}

/** Mushrooms: entities1..5 + climate + camera – prioritize domain for dedicated slots */
export function autoFillMushrooms(hass, config) {
  const order = ['climate','camera','entities1','entities2','entities3','entities4','entities5'];
  const entities = { ...(config.entities || {}) };
  const used = new Set(order.map((k) => entities[k]?.entity).filter(Boolean));
  const all = candidatesFor(hass, config, 'mushroom');

  // dedicated slots
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

  // generic slots
  for (const k of ['entities1','entities2','entities3','entities4','entities5']) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity) continue;
    const pick = pickFirstFree(all, used);
    if (pick) { ent.entity = pick; used.add(pick); }
  }
  return { ...config, entities };
}

/** SubButtons: sub-button1..6 – controllable domains, area filter, avoid duplicates */
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

/** Section resets (Archivio2 behavior) */
export function resetSensors(config) {
  const entities = { ...(config.entities || {}) };
  ['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6'].forEach((k) => delete entities[k]);
  return { ...config, entities };
}
export function resetMushrooms(config) {
  const entities = { ...(config.entities || {}) };
  ['entities1','entities2','entities3','entities4','entities5','climate','camera'].forEach((k) => delete entities[k]);
  return { ...config, entities };
}
export function resetSubButtons(config) {
  const entities = { ...(config.entities || {}) };
  ['sub-button1','sub-button2','sub-button3','sub-button4','sub-button5','sub-button6'].forEach((k) => delete entities[k]);
  return { ...config, entities };
}

/** Central trigger – call on area or toggle change */
export function maybeAutoDiscover(hass, config, changedProp, debug = false) {
  const ad = config.auto_discovery_sections || {};
  const isAreaChange = changedProp === 'area';
  const isADChange   = changedProp && changedProp.startsWith('auto_discovery_sections.');
  if (!isAreaChange && !isADChange) return config;

  let next = config;
  if (ad.sensor)    next = autoFillSensors(hass, next);
  if (ad.mushroom)  next = autoFillMushrooms(hass, next);
  if (ad.subbutton) next = autoFillSubButtons(hass, next);

  if (debug && typeof window !== 'undefined' && window.__BUBBLE_DEBUG__) {
    console.info('[AutoDiscovery] applied after', changedProp, { sections: ad });
  }
  return next;
}
