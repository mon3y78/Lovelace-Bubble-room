export const FILTERS = {
  presence: {
    includeDomains: ['person','device_tracker','binary_sensor','light','switch','media_player','fan','humidifier','lock','input_boolean','scene'],
    includeDeviceClasses: ['motion','occupancy','presence'],
    entityFilter: (state, hass) => {
      const id = typeof state === 'string' ? state : state?.entity_id;
      if (!id) return false;
      const [domain] = id.split('.');
      if (domain === 'binary_sensor') {
        const dc = hass?.states?.[id]?.attributes?.device_class;
        return ['motion','occupancy','presence'].includes(dc);
      }
      return true;
    },
  },

  sensorByType: (type) => ({
    includeDomains: ['sensor'],
    includeDeviceClasses: undefined,
    entityFilter: (state, hass) => {
      const id = typeof state === 'string' ? state : state?.entity_id;
      if (!id) return false;
      // In futuro si può filtrare per device_class a seconda del type
      return true;
    },
  }),

  subbutton: {
    includeDomains: ['light','switch','media_player','fan','cover','humidifier','lock','scene','input_boolean','script','button'],
    entityFilter: () => true,
  },

  mushroom: {
    includeDomains: ['light','switch','media_player','fan','cover','humidifier','lock','scene','input_boolean','script','button','sensor','binary_sensor','climate'],
    entityFilter: () => true,
  },
};


/**
 * Build a concrete list of entity_ids for a given section,
 * applying domain / device_class filters from FILTERS and
 * the Area filter from the current card config.
 *
 * Usage examples:
 *   candidatesFor(hass, config, 'presence')
 *   candidatesFor(hass, config, { section: 'sensor', type })
 */
export function candidatesFor(hass, config, sectionOrOpts) {
  const opts = typeof sectionOrOpts === 'string'
    ? { section: sectionOrOpts }
    : (sectionOrOpts || {});
  const section = opts.section;
  if (!hass || !hass.states || !section) return [];

  // Select filter descriptor
  let desc;
  if (section === 'sensor') {
    const t = opts.type;
    desc = FILTERS.sensorByType ? FILTERS.sensorByType(t) : FILTERS.sensor;
  } else {
    desc = FILTERS[section];
  }
  if (!desc) return [];

  const includeDomains = desc.includeDomains || [];
  const includeDeviceClasses = desc.includeDeviceClasses || [];
  const entityFilter = desc.entityFilter || (() => true);

  const allIds = Object.keys(hass.states);
  const byDomain = includeDomains.length
    ? allIds.filter((id) => includeDomains.includes(id.split('.')[0]))
    : allIds.slice();

  const byDesc = byDomain.filter((id) => entityFilter(id, hass));

  const area = config?.area;
  let res = byDesc;
  if (area) {
    const inArea = byDesc.filter((id) => {
      const st = hass.states[id];
      const a1 = st?.attributes?.area_id;
      const a2 = st?.attributes?.area;
      return a1 === area || a2 === area;
    });
    if (inArea.length) res = inArea;
  }

  return res;
}