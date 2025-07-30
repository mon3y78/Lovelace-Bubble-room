// helpers/auto-discovery.js

/** ---- Presence (RoomPanel) ---- */
function presenceCandidatesLocal(hass, config) {
  const out = [];
  if (!hass || !hass.states) return out;
  const allowed = new Set(['person','device_tracker','binary_sensor','light','switch','media_player','fan','humidifier','lock','input_boolean','scene']);
  let ids = Object.keys(hass.states).filter((id) => allowed.has(id.split('.')[0]));
  ids = ids.filter((id) => {
    const domain = id.split('.')[0];
    if (domain !== 'binary_sensor') return true;
    const dc = hass.states[id]?.attributes?.device_class;
    return ['motion','occupancy','presence'].includes(dc || '');
  });
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
  const selected = config?.entities?.presence?.entity || config?.presence_entity;
  if (selected && !ids.includes(selected)) ids.push(selected);
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

export function resetRoom(config) {
  const entities = { ...(config.entities || {}) };
  delete entities.presence;
  const next = { ...config, entities };
  delete next.name;
  delete next.icon;
  delete next.area;
  delete next.presence_entity; // legacy
  return next;
}

export function maybeAutoDiscover(hass, config, changedProp, debug = false) {
  const ad = config.auto_discovery_sections || {};
  const isAreaChange = changedProp === 'area';
  const isADChange   = changedProp && changedProp.startsWith('auto_discovery_sections.');
  if (!isAreaChange && !isADChange) return config;
  let next = config;
  if (ad.sensor && typeof autoFillSensors === 'function')    next = autoFillSensors(hass, next);
  if (ad.mushroom && typeof autoFillMushrooms === 'function')next = autoFillMushrooms(hass, next);
  if (ad.subbutton && typeof autoFillSubButtons === 'function') next = autoFillSubButtons(hass, next);
  if (ad.presence)  next = autoFillPresence(hass, next);
  if (debug && typeof window !== 'undefined' && window.__BUBBLE_DEBUG__) {
    console.info('[AutoDiscovery] applied after', changedProp, { sections: ad });
  }
  return next;
}
