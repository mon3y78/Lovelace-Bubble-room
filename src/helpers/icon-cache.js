// src/helpers/icon-cache.js
export const IconCache = {
  _list: null,
  get(hass) {
    if (this._list) return this._list;
    // Fonte: mappa icone caricata da HA in sessione
    const map = hass?.mdiIcons || null;
    this._list = map ? Object.keys(map).sort() : [];
    return this._list;
  },
  warm(hass) {
    // alias esplicito per “precaricare”
    return this.get(hass);
  }
};
