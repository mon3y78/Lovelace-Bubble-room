// src/helpers/auto-discovery.js

const DEBUG = !!window.__BUBBLE_DEBUG__;

/* =========================
 *   TRIGGER CENTRALE
 * ========================= */
export function maybeAutoDiscover(hass, config, changedProp, debug = false) {
  if (!hass || !config) return config;

  const sections = config.auto_discovery_sections || {};
  if ((debug || DEBUG) && typeof window !== 'undefined') {
    console.info('[AutoDiscovery] (no-op) after', changedProp, { sections });
  }
  return config;
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
