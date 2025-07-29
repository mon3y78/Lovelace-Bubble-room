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
