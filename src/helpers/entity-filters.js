/**
 * Mappa label leggibili → device_class
 * (usata dai <device-class-chips>)
 */
export const DEVICE_CLASS_LABELS = {
  // sensor (se ti serviranno altrove)
  temperature: 'Temperatura',
  humidity: 'Umidità',
  pressure: 'Pressione',
  battery: 'Batteria',
  
  // binary_sensor
  presence: 'Presenza',
  motion: 'Movimento',
  occupancy: 'Occupazione',
  light: 'Luce',
};

/* ───────────────────────────── DESCRITTORI DI FILTRO ───────────────────── */
export const FILTERS = {
  /** Presence ID – SOLO: presenza/movimento/occupazione + luce/switch/ventola */
  presence: {
    includeDomains: ['binary_sensor', 'light', 'switch', 'fan'],
    includeDeviceClasses: ['presence', 'motion', 'occupancy'], // solo per binary_sensor
    entityFilter: (id, hass) => {
      const [domain] = id.split('.');
      if (domain === 'binary_sensor') {
        const dc = hass.states[id]?.attributes?.device_class;
        return ['presence', 'motion', 'occupancy'].includes(dc);
      }
      // light, switch, fan passano sempre
      return true;
    },
  },
  
  /** Sensor dinamico filtrabile per device_class (temperature, humidity…) */
  sensorByType: (allowedDC = []) => ({
    includeDomains: ['sensor'],
    entityFilter: (id, hass) =>
      !allowedDC.length ?
      true :
      allowedDC.includes(hass.states[id]?.attributes?.device_class ?? ''),
  }),
  
  /** Alert: binary_sensor filtrati per device_class (occupancy, motion, …) */
  alert: (allowedDC = []) => ({
    includeDomains: ['binary_sensor'],
    entityFilter: (id, hass) =>
      !allowedDC.length ?
      true :
      allowedDC.includes(hass.states[id]?.attributes?.device_class ?? ''),
  }),
};

/* ─────────── funzioni riuso (entitiesInArea, candidatesFor) ────────────── */
export function entitiesInArea(hass, areaId) {
  if (!hass?.states || !areaId) return [];
  const entReg = hass.entities ?? {};
  const devReg = hass.devices ?? {};
  
  return Object.keys(hass.states).filter((eid) => {
    const ent = entReg[eid];
    if (ent?.area_id === areaId) return true;
    const devId = ent?.device_id;
    if (devId && devReg[devId]?.area_id === areaId) return true;
    
    const attr = hass.states[eid]?.attributes ?? {};
    return attr.area_id === areaId || attr.area === areaId;
  });
}

/**
 * candidatesFor(hass, config, section[, deviceClassArray])
 *  – restituisce gli entity_id ammessi secondo:
 *    · descrittore in FILTERS
 *    · device_class opzionali
 *    · filtro per area (solo se auto-discovery attivo)
 */
export function candidatesFor(hass, config, sectionOrOpts, allowedDC = []) {
  const section = typeof sectionOrOpts === 'string' ?
    sectionOrOpts :
    sectionOrOpts.section;
  
  let desc;
  if (section === 'sensor') {
    desc = FILTERS.sensorByType(allowedDC);
  } else if (section === 'alert') {
    desc = FILTERS.alert(allowedDC);
  } else {
    desc = FILTERS[section];
  }
  if (!desc || !hass?.states) return [];
  
  const byDomain = Object.keys(hass.states).filter((id) =>
    desc.includeDomains.includes(id.split('.')[0]),
  );
  
  const byDesc = byDomain.filter((id) => desc.entityFilter(id, hass));
  
  /* area + auto-discover */
  const adEnabled = config?.auto_discovery_sections?.[section] ?? false;
  if (adEnabled && config?.area) {
    const inArea = entitiesInArea(hass, config.area);
    return byDesc.filter((id) => inArea.includes(id));
  }
  return byDesc;
}