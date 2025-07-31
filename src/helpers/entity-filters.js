/* ───────────── label da mostrare sui chip ───────────── */
export const FILTER_LABELS = {
  presence: 'Presenza',
  motion: 'Movimento',
  occupancy: 'Occupazione',
  light: 'Luce',
  switch: 'Switch',
  fan: 'Ventola',
};

/* ───────────── filtri di sezione ───────────── */
export const FILTERS = {
  /**
   * Presence (ID) – filtra per device_class o dominio
   * @param {string[]} cats  categorie selezionate nei chip
   */
  presence: (cats = []) => ({
    includeDomains: ['binary_sensor', 'light', 'switch', 'fan'],
    entityFilter: (id, hass) => {
      if (!cats.length) return false; // nessun chip selezionato
      const [domain] = id.split('.');
      
      if (domain === 'binary_sensor') {
        const dc = hass.states[id]?.attributes?.device_class ?? '';
        return cats.includes(dc); // presenza/motion/occupancy
      }
      // domini light/switch/fan
      return cats.includes(domain);
    },
  }),
  
  /* altri filtri (sensor, alert…) restano invariati */
};

/* ───────────── funzione area-aware + chip-aware ───────────── */
export function entitiesInArea(hass, areaId) { /* invariata */ }

export function candidatesFor(hass, config, section, cats = []) {
  if (!hass?.states) return [];
  
  /* scegli il descrittore giusto */
  const desc = section === 'presence' ?
    FILTERS.presence(cats) :
    null;
  if (!desc) return [];
  
  /* 1. domini consentiti */
  const byDomain = Object.keys(hass.states).filter((id) =>
    desc.includeDomains.includes(id.split('.')[0]),
  );
  
  /* 2. filtro custom (device_class o dominio) */
  const byDesc = byDomain.filter((id) => desc.entityFilter(id, hass));
  
  /* 3. filtro per area (solo se auto-discover attivo) */
  const ad = config?.auto_discovery_sections?.presence ?? false;
  if (ad && config?.area) {
    const inArea = entitiesInArea(hass, config.area);
    return byDesc.filter((id) => inArea.includes(id));
  }
  return byDesc;
}