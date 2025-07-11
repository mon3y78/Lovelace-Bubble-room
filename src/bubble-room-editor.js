import { LitElement, html, css } from 'lit';


// --- MAPPE DI MAPPING CENTRALIZZATE ---
const DEVICE_CLASS_ICON_MAP = {
  door:        { on: 'mdi:door-open', off: 'mdi:door-closed' },
  window:      { on: 'mdi:window-open', off: 'mdi:window-closed' },
  motion:      { on: 'mdi:motion-sensor', off: 'mdi:motion-sensor-off' },
  moisture:    { on: 'mdi:water-alert', off: 'mdi:water-off' },
  smoke:       { on: 'mdi:smoke', off: 'mdi:smoke-detector-off' },
  gas:         { on: 'mdi:gas-cylinder', off: 'mdi:gas-off' },
  problem:     { on: 'mdi:alert', off: 'mdi:alert' },
  connectivity:{ on: 'mdi:connection', off: 'mdi:connection' },
  occupancy:   { on: 'mdi:account-voice', off: 'mdi:account-voice-off' },
  presence:    { on: 'mdi:account-voice', off: 'mdi:account-voice-off' },
  tamper:      { on: 'mdi:lock-open-alert', off: 'mdi:lock-open-alert' },
  vibration:   { on: 'mdi:vibrate', off: 'mdi:vibrate-off' },
  running:     { on: 'mdi:server-network', off: 'mdi:server-network-off' },
  shutter:     { on: 'mdi:window-shutter-open', off: 'mdi:window-shutter' },
  blind:       { on: 'mdi:blinds-horizontal', off: 'mdi:blinds-horizontal-closed' }
};

const DOMAIN_ICON_MAP = {
  light:           'mdi:lightbulb',
  switch:          'mdi:toggle-switch',
  input_boolean:   'mdi:toggle-switch',
  fan:             'mdi:fan',
  climate:         'mdi:thermostat',
  media_player:    'mdi:speaker',
  vacuum:          'mdi:robot-vacuum',
  binary_sensor:   'mdi:motion-sensor',
  sensor:          'mdi:information-outline',
  cover:           'mdi:window-shutter',
  lock:            'mdi:lock',
  door:            'mdi:door-closed',
  window:          'mdi:window-closed',
  alarm_control_panel: 'mdi:shield-home',
  scene:           'mdi:palette',
  script:          'mdi:script-text',
  input_number:    'mdi:ray-vertex',
  input_select:    'mdi:format-list-bulleted',
  camera:          'mdi:cctv',
  humidifier:      'mdi:air-humidifier',
  weather:         'mdi:weather-partly-cloudy',
  device_tracker:  'mdi:map-marker',
  person:          'mdi:account',
  input_text:      'mdi:text-box-outline'
};

const SENSOR_TYPE_MAP = {
  temperature: { emoji: '🌡️', units: ['°C', '°F'] },
  humidity:    { emoji: '💦', units: ['%'] },
  co2:         { emoji: '🟢', units: ['ppm'] },
  illuminance: { emoji: '☀️', units: ['lx'] },
  pm1:         { emoji: '🟤', units: ['µg/m³'] },
  pm25:        { emoji: '⚫️', units: ['µg/m³'] },
  pm10:        { emoji: '⚪️', units: ['µg/m³'] },
  uv:          { emoji: '🌞', units: ['UV'] },
  noise:       { emoji: '🔊', units: ['dB'] },
  pressure:    { emoji: '📈', units: ['hPa'] },
  voc:         { emoji: '🧪', units: ['ppb'] }
};


class BubbleRoomEditor extends LitElement {
  static get properties() {
    return {
      _config: { type: Object },
      _iconList: { type: Array },
      _jsonError: { type: Boolean }
    };
  }

  static async getConfigElement() {
    await import('./bubble-room-editor.js');
    return document.createElement('bubble-room-editor');
  }

  constructor() {
    super();
    this._iconList = [
      "mdi:sofa", "mdi:bed", "mdi:home", "mdi:table-furniture", "mdi:television", "mdi:lightbulb",
      "mdi:fan", "mdi:air-conditioner", "mdi:robot-vacuum", "mdi:led-strip-variant", "mdi:lamp",
      "mdi:window-closed", "mdi:window-open", "mdi:door", "mdi:door-closed", "mdi:speaker",
      "mdi:volume-high", "mdi:volume-off", "mdi:thermostat", "mdi:fire", "mdi:water", "mdi:shower",
      "mdi:toilet", "mdi:fridge", "mdi:oven", "mdi:coffee-maker", "mdi:washing-machine",
      "mdi:vacuum", "mdi:garage", "mdi:garage-open", "mdi:cctv"
    ];
    if (!customElements.get("ha-entity-picker")) {
      import("custom-card-helpers").then(module => {
        if (module && module.loadHaComponents) {
          module.loadHaComponents();
        }
      }).catch(() => {});
    }
  }

  async _loadAreaEntities() {
    if (!this._hass) return;
  
    // Recupera devices e entities registrate
    const devices = await this._hass.callWS({ type: "config/device_registry/list" });
    const entities = await this._hass.callWS({ type: "config/entity_registry/list" });
  
    // Prepara mappa area_id -> lista entità
    const areaEntities = {};
  
    for (const entity of entities) {
      let areaId = entity.area_id;
      if (!areaId) {
        const device = devices.find(d => d.id === entity.device_id);
        areaId = device?.area_id;
      }
      if (areaId) {
        if (!areaEntities[areaId]) areaEntities[areaId] = [];
        areaEntities[areaId].push(entity.entity_id);
      }
    }
  
    console.log("[Bubble Room] Area Entities Loaded:", areaEntities);
    this._areaEntities = areaEntities;
  }


  set hass(hass) {
    this._hass = hass;
    this.requestUpdate();
  
    if (!this._areaEntities) {
      this._loadAreaEntities();
    }
  }

  _getFilteredEntities(sectionName) {
    const allEntityIds = this._hass ? Object.keys(this._hass.states) : [];
    const areaId = this._config.area;
    const autoDiscovery = this._config.auto_discovery_sections?.[sectionName];
  
    let baseEntities = allEntityIds;
  
    if (areaId && autoDiscovery && this._areaEntities?.[areaId]) {
      baseEntities = this._areaEntities[areaId];
    }
  
    return baseEntities.filter(eid =>
      this._filterEntityForSection(eid, sectionName)
      || this._config.entities?.[sectionName]?.entity === eid // <-- questo è fondamentale
    );
  }



  _filterEntityForSection(entityId, sectionName) {
    const domain = entityId.split(".")[0];
    const stateObj = this._hass?.states?.[entityId];
  
    switch (sectionName) {
      case "room_presence":
        if (domain === "binary_sensor") {
          const dc = stateObj?.attributes?.device_class;
          return ["motion", "occupancy", "presence"].includes(dc);
        }
        return ["light", "switch", "media_player", "fan", "humidifier", "lock", "input_boolean", "scene"].includes(domain);
  
      case "subbutton":
        return ["light", "switch", "media_player", "fan", "cover", "humidifier", "lock", "input_boolean", "scene"].includes(domain);
  
      case "mushroom":
        return !["sensor", "binary_sensor"].includes(domain);
  
      case "climate":
        return domain === "climate";
  
      case "camera":
        return domain === "camera";
  
      case "sensor":
        return domain === "sensor";
  
      default:
        return true;
    }
  }



  setConfig(config) {
    if (!config.auto_discovery_sections) {
      config.auto_discovery_sections = {
        room_presence: !!config.area,
        subbutton: !!config.area,
        mushroom: !!config.area,
        climate: !!config.area,
        camera: !!config.area,
        sensor: !!config.area
      };
    }
    if (!config) config = {};
    if (!config.auto_discovery_sections) {
      config.auto_discovery_sections = {
        room_presence: !!config.area,
        subbutton: !!config.area,
        mushroom: !!config.area,
        climate: !!config.area,
        camera: !!config.area,
        sensor: !!config.area,
      };
    }


    if (!config.colors) config.colors = {};
    config.colors.room = config.colors.room || {};
    config.colors.subbutton = config.colors.subbutton || {};

    // ROOM colors
    config.colors.room.icon_active = config.colors.room.icon_active || 'rgba(255, 255, 0, 1)';
    config.colors.room.icon_inactive = config.colors.room.icon_inactive || 'rgba(102, 102, 102, 1)';
    config.colors.room.background_active = config.colors.room.background_active || 'rgba(0, 128, 0, 1)';
    config.colors.room.background_inactive = config.colors.room.background_inactive || 'rgba(0, 128, 0, 0.3)';
    config.colors.room.mushroom_active = config.colors.room.mushroom_active || 'rgba(255, 255, 0, 1)';
    config.colors.room.mushroom_inactive = config.colors.room.mushroom_inactive || 'rgba(102, 102, 102, 1)';

    // SUBBUTTON
    config.colors.subbutton.background_on = config.colors.subbutton.background_on || 'rgba(0, 128, 0, 1)';
    config.colors.subbutton.background_off = config.colors.subbutton.background_off || 'rgba(0, 128, 0, 0.3)';
    config.colors.subbutton.icon_on = config.colors.subbutton.icon_on || 'rgba(255, 255, 0, 1)';
    config.colors.subbutton.icon_off = config.colors.subbutton.icon_off || 'rgba(102, 102, 102, 1)';

    if (!config.hold_action) config.hold_action = { action: 'more-info', navigation_path: '' };
    this._config = config;
  }

  getConfig() {
    const configCopy = JSON.parse(JSON.stringify(this._config));
    const filteredEntities = {};
    for (const [key, entityConfig] of Object.entries(configCopy.entities)) {
      const updatedConfig = { ...entityConfig };
      const entityId = updatedConfig.entity;
  
      // Se non c’è icon, la forziamo comunque qui come fallback
      if (!updatedConfig.icon || updatedConfig.icon === "") {
        if (entityId && this._hass?.states?.[entityId]?.attributes?.icon) {
          updatedConfig.icon = this._hass.states[entityId].attributes.icon;
        } else if (entityId) {
          const stateObj = this._hass?.states?.[entityId];
          const deviceClass = stateObj?.attributes?.device_class;
          if (deviceClass) {
            updatedConfig.icon = this._getDeviceClassIcon(deviceClass, stateObj.state)
              || this._getDefaultIconForEntity(entityId);
          } else {
            updatedConfig.icon = this._getDefaultIconForEntity(entityId);
          }
        }
      }
      filteredEntities[key] = updatedConfig;
    }
    configCopy.entities = filteredEntities;


    // Pulizia colori vuoti
    if (configCopy.colors) {
      ['room', 'subbutton'].forEach(section => {
        if (!configCopy.colors[section]) return;
        Object.keys(configCopy.colors[section]).forEach(k => {
          if (typeof configCopy.colors[section][k] === 'string' && configCopy.colors[section][k].trim() === '') {
            delete configCopy.colors[section][k];
          }
        });
      });
    }
    return configCopy;
  }

  static get styles() {
    return css`
      /* === PATCH: nessun gap esterno === */
      :host {
        background: transparent !important;
        padding: 0 !important;
        margin: 0 !important;
        display: block;
      }
      .glass-panel {
        margin: 0 !important;
        width: 100%;
        box-sizing: border-box;
        border-radius: 40px;
        position: relative;
        border: none;
        /* Variabili CSS per colore e ombra (default: room) */
        --glass-bg: rgba(73, 164, 255, 0.38);
        --glass-shadow: 0 2px 24px 0 rgba(50,180,255,0.25);
        --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.26),rgba(255,255,255,0.11) 70%,transparent 100%);
      }
      .glass-panel::after {
        content: '';
        position: absolute;
        left: 8%;
        top: 0;
        width: 84%;
        height: 52%;
        border-radius: 40px 40px 90px 90px / 30px 30px 60px 60px;
        background: var(--glass-sheen);
        pointer-events: none;
        z-index: 1;
      }
      .glass-panel {
        background: var(--glass-bg);
        box-shadow: var(--glass-shadow);
      }
  
      /* === VARIANTI SEZIONE (solo override variabili) === */
      .subbutton-panel.glass-panel {
        --glass-bg: rgba(180, 120, 255, 0.34);
        --glass-shadow: 0 2px 24px 0 rgba(160,100,255,0.19);
        --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.22),rgba(255,255,255,0.10) 70%,transparent 100%);
      }
      .mushroom-panel.glass-panel {
        --glass-bg: rgba(80, 235, 175, 0.28);
        --glass-shadow: 0 2px 24px 0 rgba(40,220,145,0.18);
        --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.18),rgba(255,255,255,0.10) 70%,transparent 100%);
      }
      .camera-panel.glass-panel {
        --glass-bg: rgba(100, 225, 255, 0.23);
        --glass-shadow: 0 2px 24px 0 rgba(100,225,255,0.17);
        --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.13),rgba(255,255,255,0.08) 70%,transparent 100%);
      }
      .climate-panel.glass-panel {
        --glass-bg: rgba(255, 208, 110, 0.24);
        --glass-shadow: 0 2px 24px 0 rgba(255,208,110,0.13);
        --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.15),rgba(255,255,255,0.09) 70%,transparent 100%);
      }
      .sensor-panel.glass-panel {
        --glass-bg: rgba(167, 255, 175, 0.22);
        --glass-shadow: 0 2px 24px 0 rgba(167,255,175,0.13);
        --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.11),rgba(255,255,255,0.07) 70%,transparent 100%);
      }
      .colors-panel.glass-panel {
        --glass-bg: rgba(95, 255, 235, 0.26);
        --glass-shadow: 0 2px 24px 0 rgba(95,255,235,0.13);
        --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.14),rgba(255,255,255,0.08) 70%,transparent 100%);
      }
  
      /* === Header unificato per tutte le sezioni === */
      .glass-header {
        background: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        padding: 22px 0 18px 0;
        margin: 0;
        text-align: center;
        font-size: 1.15rem;
        font-weight: 700;
        color: #fff;
        position: relative;
        z-index: 2;
      }
      /* Piccoli adattamenti taglia */
      .room-panel .glass-header   { font-size: 1.2rem; }
      .subbutton-panel .glass-header { font-size: 1.15rem; }
      .mushroom-panel .glass-header { font-size: 1.12rem; }
      .camera-panel .glass-header   { font-size: 1.13rem; }
      .climate-panel .glass-header  { font-size: 1.12rem; }
      .sensor-panel .glass-header   { font-size: 1.11rem; }
      .colors-panel .glass-header   { font-size: 1.11rem; }
  
      /* === Responsive === */
      @media (max-width: 650px) {
        .glass-header { padding: 14px 10px 9px 10px; font-size:1.13em;}
        .glass-content { padding: 12px 10px; }
      }
  
      /* === Tutto il resto: input, tab, button, autodiscovery, ecc === */
      .input-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 14px;
        padding: 14px 18px 10px;
        margin-bottom: 13px;
        border-radius: 13px;
        background: rgba(30,44,58,0.73);
        border: 1px solid #61b5e1aa;
        box-shadow: 0 2px 8px rgba(55,71,79,0.13);
        color: #a5c7ed;
        font-size: 1.02rem;
        font-weight: 500;
      }
      label {
        font-weight: 600;
        font-size: 0.97rem;
        color: #90caf9;
        margin-bottom: 4px;
      }
      input, textarea, select {
        border: 1px solid #444;
        border-radius: 6px;
        padding: 8px;
        background-color: #202020;
        color: #f1f1f1;
        font-size: 0.97rem;
      }
      input[type="color"] { padding: 0; border: none; background: transparent; }
      input[type="range"] { width: 100px; }
      input[type="checkbox"] { width: auto; margin-right: 8px; }
  
      .tab-group {
        display: flex;
        gap: 10px;
        margin: 0.5em 0 0.7em 0;
      }
      .tab-btn {
        padding: 7px 22px;
        border-radius: 22px;
        border: 2px solid #4dabf799;
        background: #161927;
        color: #90caf9;
        font-size: 1rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: background 0.18s, color 0.18s, border 0.16s, box-shadow 0.18s;
        box-shadow: 0 1px 7px #4dabf71a;
      }
      .tab-btn.active,
      .tab-btn:active,
      .tab-btn:focus {
        background: linear-gradient(90deg,#4dabf7 50%,#1976d2 100%);
        color: #101130;
        border: 2px solid #4dabf7;
        box-shadow: 0 3px 13px #4dabf759;
      }
      .tab-btn:hover:not(.active) {
        background: #23264a;
        color: #fff;
        border: 2px solid #1976d2;
      }
      .reset-button {
        display: block;
        margin: 14px auto 0 auto;
        background: rgba(255,255,255,0.09);
        color: #fd6464;
        border: 2.5px solid #ffbebe;
        border-radius: 22px;
        padding: 9px 32px;
        font-weight: bold;
        font-size: 1.06rem;
        cursor: pointer;
        box-shadow: 0 2px 12px #ffbebe36;
        text-align: center;
        transition: background 0.18s, color 0.15s, box-shadow 0.15s, border 0.16s;
      }
      .reset-button:hover {
        background: rgba(255,100,100,0.16);
        color: #fff;
        border: 2.5px solid #ff6464;
        box-shadow: 0 4px 22px #ff6464a9;
      }
      .autodiscover-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 18px auto;
        padding: 18px 0 18px 0;
        background: rgba(73,164,255,0.35);
        border-radius: 35px;
        font-size: 1.17rem;
        color: #fff;
        font-weight: 700;
        letter-spacing: 0.02em;
        box-shadow: 0 2px 18px 0 rgba(73,164,255,0.11);
        border: 1.5px solid #d5f3ff99;
        text-align: center;
        transition: box-shadow 0.18s, border 0.18s;
        cursor: pointer;
        max-width: 88%;
      }
      .autodiscover-box:hover {
        box-shadow: 0 4px 24px 0 rgba(73,164,255,0.26);
        border: 1.5px solid #66baff;
      }
    `;
  }



  _togglePanel(panelId) {
    const panel = this.shadowRoot.getElementById(panelId);
    if (panel) panel.open = !panel.open;
  }
  _toggleAutoDiscoverySection(section, enabled) {
    this._config = {
      ...this._config,
      auto_discovery_sections: {
        ...this._config.auto_discovery_sections,
        [section]: enabled
      }
    };
    this.requestUpdate();
    this._fireConfigChanged();
  }

  _renderSubButtonPanel(key) {
    const entityConfig = this._config.entities?.[key] || {
      entity: "", icon: "", tap_action: { action: "toggle", navigation_path: "" }, hold_action: { action: "more-info", navigation_path: "" }
    };
    let label;
    switch(key) {
      case "sub-button1": label = "Sub-button1"; break;
      case "sub-button2": label = "Sub-button2"; break;
      case "sub-button3": label = "Sub-button3"; break;
      case "sub-button4": label = "Sub-button4"; break;
      default: label = key;
    }
    const panelId = `${key}Panel`;
    return html`
      <ha-expansion-panel id="${panelId}">
        <div slot="header" @click="${() => this._togglePanel(panelId)}">${label}</div>
        <div class="section-content">
          ${this._renderEntityInput("Entities (ID)", key)}
          ${this._renderIconInput("Icon", key)}
          ${this._renderSubButtonAction(key)}
        </div>
      </ha-expansion-panel>
    `;
  }

  render() {
    if (!this._config) {
      return html`<div>Caricamento configurazione...</div>`;
    }
    return html`
      <div class="editor-header">
        <h3>Visual Editor Bubble Room V3.2<span class="version">v3.0</span></h3>
      </div>
      ${this._renderRoomPanel()}
      ${this._renderSubButtonPanelGroup()}
      ${this._renderMushroomEntitiesPanel()}
      ${this._renderCameraPanel()}
      ${this._renderClimatePanel()}
      ${this._renderSensorPanel()}
      <p class="note">
        For advanced configurations, modify the YAML directly.
      </p>
    `;
  }
  _areaIsValid(area_id) {
    if (!area_id) return false;
    if (!this._hass) return false;
    let areas = [];
    if (this._hass.areas) {
      areas = Object.values(this._hass.areas);
    } else if (this._hass.areasRegistry && Array.isArray(this._hass.areasRegistry.areas)) {
      areas = this._hass.areasRegistry.areas;
    }
    // Fallback: se le aree non sono disponibili (es. dopo reload), considera l'area come valida
    if (!areas.length) return true;
    return areas.some(a => a.area_id === area_id);
  }

  _renderEntityInput(labelText, entityKey, field = 'entity', sectionName = undefined) {
    const value = (
      this._config.entities &&
      this._config.entities[entityKey] &&
      this._config.entities[entityKey][field]
    ) || '';
  
    const hasEntityPicker = customElements.get("ha-entity-picker");
  
    return html`
      <label>${labelText}:</label>
      ${hasEntityPicker ? html`
        <ha-entity-picker
          .hass="${this._hass}"
          .value="${value}"
          .includeEntities="${sectionName ? this._getFilteredEntities(sectionName) : Object.keys(this._hass?.states || {})}"
          allow-custom-entity
          @value-changed="${e => this._updateEntity(entityKey, field)({ target: { value: e.detail.value } })}">
        </ha-entity-picker>
      ` : html`
        <input
          type="text"
          .value="${value}"
          placeholder="Inserisci entity_id"
          @input="${this._updateEntity(entityKey, field)}" />
      `}
    `;
  }

  _renderIconInput(labelText, entityKey, field = 'icon') {
    const value = this._config.entities?.[entityKey]?.[field] || '';
    return html`
      <label>${labelText}:</label>
      <ha-icon-picker
        .hass="${this._hass}"
        .value="${value}"
        allow-custom-icon
        @value-changed="${e => {
          const newValue = e.detail.value;
          const entityConf = {
            ...(this._config.entities?.[entityKey] || {}),
            [field]: newValue
          };
          const entities = {
            ...this._config.entities,
            [entityKey]: entityConf
          };
          this._config = { ...this._config, entities };
          this._fireConfigChanged();
        }}">
      </ha-icon-picker>
    `;
  }
  
  
  

  _renderRoomAction() {
    const tapAction = this._config.tap_action || { action: 'navigate', navigation_path: '' };
    const holdAction = this._config.hold_action || { action: 'more-info', navigation_path: '' };
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];
  
    return html`
      <div class="input-group">
        <label>Tap:</label>
        <div class="pill-group">
          ${actions.map(action => html`
            <button
              class="pill-button ${tapAction.action === action ? 'active' : ''}"
              @click="${() => this._updateTapActionField('action')({ target: { value: action } })}"
            >${action}</button>
          `)}
        </div>
        ${tapAction.action === 'navigate' ? html`
          <label>Navigation Path:</label>
          <input type="text" .value="${tapAction.navigation_path || ''}"
            @input="${this._updateTapActionField('navigation_path')}" />
        ` : ''}
        ${tapAction.action === 'call-service' ? html`
          <label>Service:</label>
          <input type="text" .value="${tapAction.service || ''}"
            @input="${this._updateTapActionField('service')}" />
          <label>Service Data (JSON):</label>
          <textarea
            class="${this._jsonError ? 'error' : ''}"
            .value="${tapAction.service_data ? JSON.stringify(tapAction.service_data) : ''}"
            @input="${this._updateTapActionField('service_data')}"></textarea>
          ${this._jsonError ? html`<div style="color: red; font-size: 0.9em;">⚠️ JSON non valido</div>` : ''}
        ` : ''}
      </div>
  
      <div class="input-group">
        <label>Hold:</label>
        <div class="pill-group">
          ${actions.map(action => html`
            <button
              class="pill-button ${holdAction.action === action ? 'active' : ''}"
              @click="${() => this._updateHoldActionField('action')({ target: { value: action } })}"
            >${action}</button>
          `)}
        </div>
        ${holdAction.action === 'navigate' ? html`
          <label>Navigation Path:</label>
          <input type="text" .value="${holdAction.navigation_path || ''}"
            @input="${this._updateHoldActionField('navigation_path')}" />
        ` : ''}
        ${holdAction.action === 'call-service' ? html`
          <label>Service:</label>
          <input type="text" .value="${holdAction.service || ''}"
            @input="${this._updateHoldActionField('service')}" />
          <label>Service Data (JSON):</label>
          <textarea
            class="${this._jsonError ? 'error' : ''}"
            .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}"
            @input="${this._updateHoldActionField('service_data')}"></textarea>
          ${this._jsonError ? html`<div style="color: red; font-size: 0.9em;">⚠️ JSON non valido</div>` : ''}
        ` : ''}
      </div>
    `;
  }

  

  _renderMushroomEntityPanel(key, label) {
    const panelId = `${key}Panel`;
    return html`
      <ha-expansion-panel id="${panelId}">
        <div slot="header" @click="${() => this._togglePanel(panelId)}">${label}</div>
        <div class="section-content">
          ${this._renderEntityInput(`${label} (ID)`, key)}
          ${this._renderIconInput(`${label} Icon`, key)}
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderSingleSensorPanel(key, label) {
    const sensor = this._config.entities?.[key] || {};
    const panelId = `${key}Panel`;
    return html`
      <ha-expansion-panel id="${panelId}">
        <div slot="header" @click="${() => this._togglePanel(panelId)}">${label}</div>
        <div class="section-content">
          <div class="input-group">
            <label>Tipo Sensore:</label>
            <select .value="${sensor.type || ''}" @change="${e => this._updateSensor(parseInt(key.replace('sensor', '')) - 1, 'type', e.target.value)}">
              <option value="">-- nessuno --</option>
              ${[
                { type: 'temperature', label: '🌡️ Temperatura' },
                { type: 'humidity', label: '💦 Umidità' },
                { type: 'co2', label: '🟢 CO₂' },
                { type: 'illuminance', label: '☀️ Luminosità' },
                { type: 'pm1', label: '🟤 PM1' },
                { type: 'pm25', label: '⚫️ PM2.5' },
                { type: 'pm10', label: '⚪️ PM10' },
                { type: 'uv', label: '🌞 UV Index' },
                { type: 'noise', label: '🔊 Rumore' },
                { type: 'pressure', label: '📈 Pressione' },
                { type: 'voc', label: '🧪 VOC' },
              ].map(t => html`<option value="${t.type}">${t.label}</option>`)}
            </select>
          </div>
          <div class="input-group">
            ${this._renderEntityInput("Entity ID", key)}
          </div>
          ${sensor.type && (SENSOR_TYPE_MAP[sensor.type]?.units || []).length > 0 ? html`
            <div class="input-group">
              <label>Unità:</label>
              <select
                .value="${sensor.unit || (SENSOR_TYPE_MAP[sensor.type]?.units[0] || '')}"
                @change="${e => this._updateSensor(parseInt(key.replace('sensor', '')) - 1, 'unit', e.target.value)}">
                ${(SENSOR_TYPE_MAP[sensor.type]?.units || []).map(u => html`<option value="${u}">${u}</option>`)}
              </select>
            </div>
          ` : ''}          
        </div>
      </ha-expansion-panel>
    `;
  }

  _updateSensor(index, field, value) {
    const key = `sensor${index + 1}`;
    const current = this._config.entities?.[key] || {};
    const updated = { ...current, [field]: value };
    if (field === 'type') {
      updated.unit = (SENSOR_TYPE_MAP[value]?.units || [])[0] || '';
    }
    const entities = { ...this._config.entities, [key]: updated };
    this._config = { ...this._config, entities };
    this._fireConfigChanged();
  }

  _parseRGBA(str) {
    const fallback = [0, 128, 0, 1]; // default verde pieno
    if (!str || typeof str !== 'string') return fallback;
    if (str.includes('var(')) return fallback;
    const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(str);
    if (match) {
      return [
        parseInt(match[1]),
        parseInt(match[2]),
        parseInt(match[3]),
        parseFloat(match[4] ?? "1")
      ];
    }
    if (str.startsWith('#') && str.length === 7) {
      return [
        parseInt(str.slice(1, 3), 16),
        parseInt(str.slice(3, 5), 16),
        parseInt(str.slice(5, 7), 16),
        1
      ];
    }
    return fallback;
  }

  _renderColorField(section, key, label) {
    const rgba = this._config.colors?.[section]?.[key] || 'rgba(0,0,0,1)';
    const [r, g, b, a] = this._parseRGBA(rgba);
    const hex = `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    return html`
      <div class="input-group">
        <label>${label}:</label>
        <div style="display: flex; gap: 10px; align-items: center;">
          <input type="color" .value="${hex}" @input="${e => this._updateColorField(section, key, e.target.value, a)}" />
          <input type="range" min="0" max="1" step="0.01" .value="${a}" @input="${e => this._updateColorField(section, key, hex, e.target.value)}" />
          <span>${Math.round(a * 100)}%</span>
        </div>
        <input type="text" .value="${rgba}" @input="${e => this._updateNestedColorDirect(section, key, e.target.value)}" />
      </div>
    `;
  }

  _toHex(color) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = color || '#000000';
    return ctx.fillStyle;
  }

  _renderSubButtonAction(key) {
    const tapAction = this._config.entities[key]?.tap_action || { action: 'toggle', navigation_path: '' };
    const holdAction = this._config.entities[key]?.hold_action || { action: 'more-info', navigation_path: '' };
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];
  
    return html`
      <div class="input-group">
        <label>Tap:</label>
        <div class="pill-group">
          ${actions.map(action => html`
            <button
              class="pill-button ${tapAction.action === action ? 'active' : ''}"
              @click="${() => this._updateEntityTapAction(key, 'action')({ target: { value: action } })}"
            >${action}</button>
          `)}
        </div>
        ${tapAction.action === 'navigate' ? html`
          <label>Navigation Path:</label>
          <input type="text" .value="${tapAction.navigation_path || ''}"
            @input="${this._updateEntityTapAction(key, 'navigation_path')}" />
        ` : ''}
        ${tapAction.action === 'call-service' ? html`
          <label>Service:</label>
          <input type="text" .value="${tapAction.service || ''}"
            @input="${this._updateEntityTapAction(key, 'service')}" />
          <label>Service Data (JSON):</label>
          <textarea
            .value="${tapAction.service_data ? JSON.stringify(tapAction.service_data) : ''}"
            @input="${this._updateEntityTapAction(key, 'service_data')}"></textarea>
        ` : ''}
      </div>
  
      <div class="input-group">
        <label>Hold:</label>
        <div class="pill-group">
          ${actions.map(action => html`
            <button
              class="pill-button ${holdAction.action === action ? 'active' : ''}"
              @click="${() => this._updateEntityHoldAction(key, 'action')({ target: { value: action } })}"
            >${action}</button>
          `)}
        </div>
        ${holdAction.action === 'navigate' ? html`
          <label>Navigation Path:</label>
          <input type="text" .value="${holdAction.navigation_path || ''}"
            @input="${this._updateEntityHoldAction(key, 'navigation_path')}" />
        ` : ''}
        ${holdAction.action === 'call-service' ? html`
          <label>Service:</label>
          <input type="text" .value="${holdAction.service || ''}"
            @input="${this._updateEntityHoldAction(key, 'service')}" />
          <label>Service Data (JSON):</label>
          <textarea
            .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}"
            @input="${this._updateEntityHoldAction(key, 'service_data')}"></textarea>
        ` : ''}
      </div>
    `;
  }


  
  _getDeviceClassIcon(deviceClass, state) {
    switch (deviceClass) {
      case 'door':        return state === 'on' ? 'mdi:door-open'        : 'mdi:door-closed';
      case 'window':      return state === 'on' ? 'mdi:window-open'      : 'mdi:window-closed';
      case 'motion':      return state === 'on' ? 'mdi:motion-sensor'    : 'mdi:motion-sensor-off';
      case 'moisture':    return state === 'on' ? 'mdi:water-alert'      : 'mdi:water-off';
      case 'smoke':       return state === 'on' ? 'mdi:smoke'            : 'mdi:smoke-detector-off';
      case 'gas':         return state === 'on' ? 'mdi:gas-cylinder'     : 'mdi:gas-off';
      case 'problem':     return 'mdi:alert';
      case 'connectivity':return 'mdi:connection';
      case 'occupancy':
      case 'presence':    return state === 'on' ? 'mdi:account-voice'    : 'mdi:account-voice-off';
      case 'tamper':      return 'mdi:lock-open-alert';
      case 'vibration':   return state === 'on' ? 'mdi:vibrate'          : 'mdi:vibrate-off';
      case 'running':     return state === 'on' ? 'mdi:server-network'   : 'mdi:server-network-off';
      case 'shutter':     return state === 'on' ? 'mdi:window-shutter-open' : 'mdi:window-shutter';
      case 'blind':       return state === 'on' ? 'mdi:blinds-horizontal'  : 'mdi:blinds-horizontal-closed';
      default:            return '';
    }
  }
  
  _getDefaultIconForEntity(entityId) {
    if (!entityId || typeof entityId !== 'string') return 'mdi:help-circle';
    const domain = entityId.split('.')[0];
    return DOMAIN_ICON_MAP[domain] || 'mdi:bookmark-outline';
  }
  getIconForEntity(entityId, entityConfig) {
    // 1. Se l'icona è stata impostata manualmente nella configurazione
    if (entityConfig?.icon) {
      return entityConfig.icon;
    }
    
    // 2. Se c'è un'icona di default per il dominio
    const domain = entityId.split('.')[0];
    const defaultDomainIcon = DOMAIN_ICON_MAP[domain];
    if (defaultDomainIcon) {
      return defaultDomainIcon;
    }
    
    // 3. Se l'entità ha un attributo icon
    const stateObj = this._hass?.states?.[entityId];
    if (stateObj?.attributes?.icon) {
      return stateObj.attributes.icon;
    }
    
    // 4. Se ha un device_class
    const deviceClass = stateObj?.attributes?.device_class;
    if (deviceClass) {
      return this._getDeviceClassIcon(deviceClass, stateObj.state) || 'mdi:bookmark-outline';
    }
    
    // 5. Fallback generico
    return 'mdi:bookmark-outline';
  }

  _getEntitiesForArea(areaId) {
    if (!areaId || !this._areaEntities) {
      // fallback: tutte le entità visibili
      return Object.keys(this._hass.states || {});
    }
    return this._areaEntities[areaId] || [];
  }




  _updateNestedColorDirect(section, key, value) {
    const colors = { ...this._config.colors };
    colors[section] = { ...colors[section], [key]: value };
    this._config = { ...this._config, colors };
    this.requestUpdate();
    this._fireConfigChanged();
  }

  _updateColorField(section, key, hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    const colors = { ...this._config.colors };
    colors[section] = { ...colors[section], [key]: rgba };
    this._config = { ...this._config, colors };
    this.requestUpdate();
    this._fireConfigChanged();
  }

 

  _fireConfigChanged() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    }));
  }
  _updateName(ev) {
    const newName = ev.target.value;
    if (this._config.name === newName) return;
    this._config = { ...this._config, name: newName };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  
  _updateIcon(ev) {
    const newIcon = ev.target.value;
    if (this._config.icon === newIcon) return;
    this._config = { ...this._config, icon: newIcon };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  

  _updateEntity(entityKey, field = 'entity') {
    return (ev) => {
      const value = ev.target.value;
  
      if (field === 'entity') {
        this._updateEntityConfig(entityKey, ["entity"], value);
  
        // Calcola e salva icona solo se entityId è valido
        let iconValue = 'mdi:bookmark-outline';
        if (value && typeof value === 'string') {
          iconValue = this._getIconForEntity(value, {});
        }
        this._updateEntityConfig(entityKey, ["icon"], iconValue);
      } else {
        this._updateEntityConfig(entityKey, [field], value);
      }
    };
  }
  
  
  
  
  
  _updateTapActionField(field) {
    return (ev) => {
      let newValue = ev.target.value;
      if (field === 'service_data') {
        try {
          newValue = JSON.parse(newValue);
          this._jsonError = false;
        } catch (e) {
          this._jsonError = true;
          this.requestUpdate();
          return;
        }
      }
  
      // Non aggiornare se il valore non cambia
      if (this._config.tap_action?.[field] === newValue) return;
  
      const tap_action = {
        ...(this._config.tap_action || { action: 'navigate', navigation_path: '' }),
        [field]: newValue
      };
      this._config = { ...this._config, tap_action };
      this._jsonError = false;
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }
  
  
  _updateHoldActionField(field) {
    return (ev) => {
      let newValue = ev.target.value;
      if (field === 'service_data') {
        try {
          newValue = JSON.parse(newValue);
          this._jsonError = false;
        } catch (e) {
          this._jsonError = true;
          this.requestUpdate();
          return;
        }
      }
  
      // Non aggiornare se il valore non cambia
      if (this._config.hold_action?.[field] === newValue) return;
  
      const hold_action = {
        ...(this._config.hold_action || { action: 'more-info', navigation_path: '' }),
        [field]: newValue
      };
      this._config = { ...this._config, hold_action };
      this._jsonError = false;
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }
  _updateEntityTapAction(entityKey, field) {
    return (ev) => {
      let value = ev.target.value;
      if (field === 'service_data') {
        try {
          value = JSON.parse(value);
          this._jsonError = false;
        } catch (e) {
          this._jsonError = true;
          this.requestUpdate();
          return;
        }
      }
  
      // Non aggiornare se il valore non cambia
      if (this._config.entities?.[entityKey]?.tap_action?.[field] === value) return;
  
      this._updateEntityConfig(entityKey, ["tap_action", field], value);
      this._jsonError = false;
    };
  }
  _updateEntityHoldAction(entityKey, field) {
    return (ev) => {
      let value = ev.target.value;
      if (field === 'service_data') {
        try {
          value = JSON.parse(value);
          this._jsonError = false;
        } catch (e) {
          this._jsonError = true;
          this.requestUpdate();
          return;
        }
      }
  
      // Non aggiornare se il valore non cambia
      if (this._config.entities?.[entityKey]?.hold_action?.[field] === value) return;
  
      this._updateEntityConfig(entityKey, ["hold_action", field], value);
      this._jsonError = false;
    };
  }
  
  
  _updateEntityConfig(entityKey, pathArray, value) {
    let entityConf = this._config.entities?.[entityKey] || {};
    entityConf = JSON.parse(JSON.stringify(entityConf)); // deep clone
  
    let ref = entityConf;
    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i];
      if (typeof ref[key] !== "object" || ref[key] === null) {
        ref[key] = {};
      }
      ref = ref[key];
    }
    ref[pathArray[pathArray.length - 1]] = value;
  
    const entities = { ...this._config.entities, [entityKey]: entityConf };
    this._config = { ...this._config, entities };
    this._fireConfigChanged();
  }

  
  _renderTapHoldAction(actionType = "tap") {
    // actionType = "tap" oppure "hold"
    const config = actionType === "tap" ? (this._config.tap_action || {}) : (this._config.hold_action || {});
    const actions = [
      { value: "toggle", label: "🟢 Toggle" },
      { value: "more-info", label: "🔎 More Info" },
      { value: "navigate", label: "↗️ Navigate" },
      { value: "call-service", label: "⚙️ Call Service" },
      { value: "none", label: "🚫 Nessuna" }
    ];
    
    return html`
      <div class="input-group">
        <label style="min-width:50px;">${actionType === "tap" ? "Tap" : "Hold"}:</label>
        <select style="margin-right:16px;" .value="${config.action || 'none'}"
          @change="${e => (actionType === "tap" ? this._updateTapActionField('action') : this._updateHoldActionField('action'))({ target: { value: e.target.value } })}">
          ${actions.map(a => html`<option value="${a.value}">${a.label}</option>`)}
        </select>
        ${config.action === 'navigate' ? html`
          <label style="margin-left:12px;">Path:</label>
          <input type="text" .value="${config.navigation_path || ''}" style="width:130px;"
            @input="${actionType === "tap" ? this._updateTapActionField('navigation_path') : this._updateHoldActionField('navigation_path')}" />
        ` : ''}
        ${config.action === 'call-service' ? html`
          <label style="margin-left:12px;">Service:</label>
          <input type="text" .value="${config.service || ''}" style="width:130px;"
            @input="${actionType === "tap" ? this._updateTapActionField('service') : this._updateHoldActionField('service')}" />
          <label style="margin-left:12px;">Data (JSON):</label>
          <input type="text" .value="${config.service_data ? JSON.stringify(config.service_data) : ''}" style="width:120px;"
            @input="${actionType === "tap" ? this._updateTapActionField('service_data') : this._updateHoldActionField('service_data')}" />
        ` : ''}
      </div>
    `;
  }


  _renderRoomPanel() {
    return html`
      <ha-expansion-panel class="glass-panel room-panel">
        <div slot="header" class="glass-header room-header">🛋️ Room Settings</div>
        <div class="glass-content room-content">
  
          <!-- Auto-scoperta -->
          <div class="autodiscover-box" @click="${() => {
              const curr = this._config.auto_discovery_sections?.room_presence ?? false;
              this._toggleAutoDiscoverySection('room_presence', !curr);
            }}">
            <label>
              <input
                type="checkbox"
                .checked="${this._config.auto_discovery_sections?.room_presence ?? false}"
                @change="${e => this._toggleAutoDiscoverySection('room_presence', e.target.checked)}"
                @click="${e => e.stopPropagation()}"
              />
              <span>🪄 Auto-scoperta attiva per Presence</span>
            </label>
          </div>
  
          <!-- Room name -->
          <div class="input-group">
            <label>Room name:</label>
            <input type="text" .value="${this._config.name || ''}" @input="${this._updateName}" />
          </div>
  
          <!-- Area picker -->
          <div class="input-group">
            <label>Area:</label>
            <ha-area-picker
              .hass="${this._hass}"
              .value="${this._config.area || ''}"
              @value-changed="${e => {
                const newArea = e.detail.value;
                const autoDiscovery = {
                  room_presence: true,
                  subbutton: true,
                  mushroom: true,
                  camera: true,
                  climate: true,
                  sensor: true
                };
                this._config = {
                  ...this._config,
                  area: newArea,
                  auto_discovery_sections: autoDiscovery
                };
                this.requestUpdate();
                this._fireConfigChanged();
              }}">
            </ha-area-picker>
          </div>
  
          <!-- Room Icon + Tap/Hold -->
          <div class="input-group">
            <div style="display: flex; flex-direction: column; gap: 10px; width:100%;">
              <div style="display: flex; align-items: center; gap: 18px;">
                <label>Room Icon:</label>
                <ha-icon-picker
                  .hass="${this._hass}"
                  .value="${this._config.icon || ''}"
                  allow-custom-icon
                  @value-changed="${e => {
                    this._config = { ...this._config, icon: e.detail.value };
                    this.requestUpdate();
                    this._fireConfigChanged();
                  }}">
                </ha-icon-picker>
              </div>
              <div style="display: flex; flex-direction: row; gap: 24px; flex-wrap: wrap; margin-top: 8px;">
                ${this._renderTapHoldAction(
                  'Tap',
                  this._config.tap_action || {},
                  (val) => this._updateTapActionField('action')({ target: { value: val } }),
                  (val) => this._updateTapActionField('navigation_path')({ target: { value: val } }),
                  (val) => this._updateTapActionField('service')({ target: { value: val } }),
                  (val) => this._updateTapActionField('service_data')({ target: { value: val } }),
                  this._jsonError
                )}
                ${this._renderTapHoldAction(
                  'Hold',
                  this._config.hold_action || {},
                  (val) => this._updateHoldActionField('action')({ target: { value: val } }),
                  (val) => this._updateHoldActionField('navigation_path')({ target: { value: val } }),
                  (val) => this._updateHoldActionField('service')({ target: { value: val } }),
                  (val) => this._updateHoldActionField('service_data')({ target: { value: val } }),
                  this._jsonError
                )}
              </div>
            </div>
          </div>
  
          <!-- Presence -->
          <div class="input-group">
            <label>Presence (ID):</label>
            ${this._renderEntityInput("Presence (ID)", "presence", "entity", "room_presence")}
          </div>
  
          <!-- Reset -->
          <div style="margin-top:1.2em; text-align:center;">
            <button class="reset-button" @click="${this._resetRoomConfig}">🧹 Reset Room Settings</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }




  _resetRoomConfig() {
    this._config = {
      ...this._config,
      name: '',
      icon: '',
      area: '',
      tap_action: { action: 'none' },
      hold_action: { action: 'none' },
      entities: {
        ...this._config.entities,
        presence: {}
      }
    };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  
  _renderSubButtonPanelGroup() {
    return html`
      <ha-expansion-panel class="glass-panel subbutton-panel">
        <div slot="header" class="glass-header subbutton-header">🎛️ Subbuttons</div>
        <div class="glass-content subbutton-content">
  
          <!-- Auto-scoperta -->
          <div class="autodiscover-box" @click="${() => {
              const curr = this._config.auto_discovery_sections?.subbutton ?? false;
              this._toggleAutoDiscoverySection('subbutton', !curr);
            }}">
            <label>
              <input
                type="checkbox"
                .checked="${this._config.auto_discovery_sections?.subbutton ?? false}"
                @change="${e => this._toggleAutoDiscoverySection('subbutton', e.target.checked)}"
                @click="${e => e.stopPropagation()}"
              />
              <span>🪄 Auto-scoperta attiva</span>
            </label>
          </div>
  
          <!-- Subbuttons collapsable -->
          ${["sub-button1", "sub-button2", "sub-button3", "sub-button4"].map((key, i) => {
            const label = `Sub-button ${i+1}`;
            const entityConfig = this._config.entities?.[key] || {
              entity: "", icon: "", tap_action: { action: "toggle" }, hold_action: { action: "more-info" }
            };
            return html`
              <div class="subbutton-collapsible glass-subbutton">
                <div class="glass-mini-header">${label}</div>
                <div class="glass-mini-content">
                  <div class="input-group">
                    <label>Entity:</label>
                    ${this._renderEntityInput("Entity ID", key, "entity", "subbutton")}
                  </div>
                  <div class="input-group">
                    <label>Icon:</label>
                    ${this._renderIconInput("Icon", key)}
                  </div>
                  <div class="input-group" style="gap:24px;">
                    ${this._renderTapHoldAction(
                      'Tap',
                      entityConfig.tap_action || {},
                      (val) => this._updateEntityTapAction(key, 'action')({ target: { value: val } }),
                      (val) => this._updateEntityTapAction(key, 'navigation_path')({ target: { value: val } }),
                      (val) => this._updateEntityTapAction(key, 'service')({ target: { value: val } }),
                      (val) => this._updateEntityTapAction(key, 'service_data')({ target: { value: val } }),
                      this._jsonError
                    )}
                    ${this._renderTapHoldAction(
                      'Hold',
                      entityConfig.hold_action || {},
                      (val) => this._updateEntityHoldAction(key, 'action')({ target: { value: val } }),
                      (val) => this._updateEntityHoldAction(key, 'navigation_path')({ target: { value: val } }),
                      (val) => this._updateEntityHoldAction(key, 'service')({ target: { value: val } }),
                      (val) => this._updateEntityHoldAction(key, 'service_data')({ target: { value: val } }),
                      this._jsonError
                    )}
                  </div>
                </div>
              </div>
            `;
          })}
  
          <!-- Reset -->
          <div style="margin-top:1.2em; text-align:center;">
            <button class="reset-button" @click="${this._resetSubButtonConfig}">🧹 Reset Sub-buttons</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }



  _resetSubButtonConfig() {
    const entities = { ...this._config.entities };
    ["sub-button1", "sub-button2", "sub-button3", "sub-button4"].forEach(key => {
      delete entities[key];
    });
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  
  _renderMushroomEntitiesPanel() {
    const entityKeys = [
      { key: "entities1", label: "Entity 1" },
      { key: "entities2", label: "Entity 2" },
      { key: "entities3", label: "Entity 3" },
      { key: "entities4", label: "Entity 4" },
      { key: "entities5", label: "Entity 5" },
    ];
    return html`
      <ha-expansion-panel class="glass-panel mushroom-panel">
        <div slot="header" class="glass-header mushroom-header">🍄 Mushroom Entities</div>
        <div class="glass-content mushroom-content">
  
          <!-- Auto-scoperta -->
          <div class="autodiscover-box" @click="${() => {
              const curr = this._config.auto_discovery_sections?.mushroom ?? false;
              this._toggleAutoDiscoverySection('mushroom', !curr);
            }}">
            <label>
              <input
                type="checkbox"
                .checked="${this._config.auto_discovery_sections?.mushroom ?? false}"
                @change="${e => this._toggleAutoDiscoverySection('mushroom', e.target.checked)}"
                @click="${e => e.stopPropagation()}"
              />
              <span>🪄 Auto-scoperta attiva</span>
            </label>
          </div>
  
          <!-- Entities collapsable -->
          ${entityKeys.map((entity, i) => {
            const entityConfig = this._config.entities?.[entity.key] || { entity: "", icon: "" };
            return html`
              <div class="mushroom-collapsible glass-mushroom">
                <div class="glass-mini-header">${entity.label}</div>
                <div class="glass-mini-content">
                  <div class="input-group">
                    <label>Entity:</label>
                    ${this._renderEntityInput("Entity ID", entity.key, "entity", "mushroom")}
                  </div>
                  <div class="input-group">
                    <label>Icon:</label>
                    ${this._renderIconInput("Icon", entity.key)}
                  </div>
                </div>
              </div>
            `;
          })}
  
          <!-- Reset -->
          <div style="margin-top:1.2em; text-align:center;">
            <button class="reset-button" @click="${this._resetMushroomEntitiesConfig}">🧹 Reset Mushroom Entities</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

                
  _resetMushroomEntitiesConfig() {
    const entities = { ...this._config.entities };
    ["entities1", "entities2", "entities3", "entities4", "entities5"].forEach(key => {
      delete entities[key];
    });
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  _renderCameraPanel() {
    return html`
      <ha-expansion-panel class="glass-panel camera-panel">
        <div slot="header" class="glass-header camera-header">📷 Camera</div>
        <div class="glass-content camera-content">
  
          <!-- Auto-scoperta -->
          <div class="autodiscover-box" @click="${() => {
              const curr = this._config.auto_discovery_sections?.camera ?? false;
              this._toggleAutoDiscoverySection('camera', !curr);
            }}">
            <label>
              <input
                type="checkbox"
                .checked="${this._config.auto_discovery_sections?.camera ?? false}"
                @change="${e => this._toggleAutoDiscoverySection('camera', e.target.checked)}"
                @click="${e => e.stopPropagation()}"
              />
              <span>🪄 Auto-scoperta attiva</span>
            </label>
          </div>
  
          <!-- Entity ID + Icona -->
          <div class="input-group">
            <label>Camera (ID):</label>
            ${this._renderEntityInput("Camera (ID)", "camera", 'entity', 'camera')}
            <label style="margin-left:20px;">Icon:</label>
            ${this._renderIconInput("Camera Icon", "camera")}
          </div>
  
          <!-- Reset -->
          <div style="margin-top:1.2em; text-align:center;">
            <button class="reset-button" @click="${this._resetCameraConfig}">🧹 Reset Camera</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }



  _resetCameraConfig() {
    const entities = { ...this._config.entities };
    delete entities["camera"];
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  _renderClimatePanel() {
    return html`
      <ha-expansion-panel class="glass-panel climate-panel">
        <div slot="header" class="glass-header climate-header">🌡️ Climate</div>
        <div class="glass-content climate-content">
  
          <!-- Auto-scoperta -->
          <div class="autodiscover-box" @click="${() => {
              const curr = this._config.auto_discovery_sections?.climate ?? false;
              this._toggleAutoDiscoverySection('climate', !curr);
            }}">
            <label>
              <input
                type="checkbox"
                .checked="${this._config.auto_discovery_sections?.climate ?? false}"
                @change="${e => this._toggleAutoDiscoverySection('climate', e.target.checked)}"
                @click="${e => e.stopPropagation()}"
              />
              <span>🪄 Auto-scoperta attiva</span>
            </label>
          </div>
  
          <!-- Entity ID + Icona -->
          <div class="input-group">
            <label>Climate (ID):</label>
            ${this._renderEntityInput("Climate (ID)", "climate", 'entity', 'climate')}
            <label style="margin-left:20px;">Icon:</label>
            ${this._renderIconInput("Climate Icon", "climate")}
          </div>
  
          <!-- Reset -->
          <div style="margin-top:1.2em; text-align:center;">
            <button class="reset-button" @click="${this._resetClimateConfig}">🧹 Reset Climate</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }


  _resetClimateConfig() {
    const entities = { ...this._config.entities };
    delete entities["climate"];
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  
  _renderSensorPanel() {
    return html`
      <ha-expansion-panel class="glass-panel sensor-panel">
        <div slot="header" class="glass-header sensor-header">🧭 Sensor</div>
        <div class="glass-content sensor-content">
  
          <!-- Auto-scoperta -->
          <div class="autodiscover-box" @click="${() => {
              const curr = this._config.auto_discovery_sections?.sensor ?? false;
              this._toggleAutoDiscoverySection('sensor', !curr);
            }}">
            <label>
              <input
                type="checkbox"
                .checked="${this._config.auto_discovery_sections?.sensor ?? false}"
                @change="${e => this._toggleAutoDiscoverySection('sensor', e.target.checked)}"
                @click="${e => e.stopPropagation()}"
              />
              <span>🪄 Auto-scoperta attiva</span>
            </label>
          </div>
  
          <!-- Sensors collassabili -->
          ${['sensor1', 'sensor2', 'sensor3', 'sensor4'].map((key, i) => {
            const sensor = this._config.entities?.[key] || {};
            return html`
              <div class="sensor-collapsible glass-sensor">
                <div class="glass-mini-header">${`Sensor ${i + 1}`.toUpperCase()}</div>
                <div class="glass-mini-content">
                  <div class="input-group">
                    <label>Tipo Sensore:</label>
                    <select
                      .value="${sensor.type || ''}"
                      @change="${e => this._updateSensor(i, 'type', e.target.value)}"
                    >
                      <option value="">-- nessuno --</option>
                      ${[
                        { type: 'temperature', label: '🌡️ Temperatura' },
                        { type: 'humidity', label: '💦 Umidità' },
                        { type: 'co2', label: '🟢 CO₂' },
                        { type: 'illuminance', label: '☀️ Luminosità' },
                        { type: 'pm1', label: '🟤 PM1' },
                        { type: 'pm25', label: '⚫️ PM2.5' },
                        { type: 'pm10', label: '⚪️ PM10' },
                        { type: 'uv', label: '🌞 UV Index' },
                        { type: 'noise', label: '🔊 Rumore' },
                        { type: 'pressure', label: '📈 Pressione' },
                        { type: 'voc', label: '🧪 VOC' },
                      ].map(t => html`<option value="${t.type}">${t.label}</option>`)}
                    </select>
                  </div>
                  <div class="input-group">
                    <label>Entity ID:</label>
                    ${this._renderEntityInput("Entity ID", key)}
                    <label style="margin-left:20px;">Icon:</label>
                    ${this._renderIconInput("Icon", key)}
                  </div>
                  ${sensor.type && (SENSOR_TYPE_MAP[sensor.type]?.units || []).length > 0 ? html`
                    <div class="input-group">
                      <label>Unità:</label>
                      <select
                        .value="${sensor.unit || (SENSOR_TYPE_MAP[sensor.type]?.units[0] || '')}"
                        @change="${e => this._updateSensor(i, 'unit', e.target.value)}"
                      >
                        ${(SENSOR_TYPE_MAP[sensor.type]?.units || []).map(u =>
                          html`<option value="${u}">${u}</option>`
                        )}
                      </select>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          })}
  
          <!-- Reset -->
          <div style="margin-top:1.2em; text-align:center;">
            <button class="reset-button" @click="${this._resetSensorConfig}">🧹 Reset Sensors</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }


  _resetSensorConfig() {
    const entities = { ...this._config.entities };
    ["sensor1", "sensor2", "sensor3", "sensor4"].forEach(key => {
      delete entities[key];
    });
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  _renderColorPanel() {
    return html`
      <ha-expansion-panel class="glass-panel colors-panel">
        <div slot="header" class="glass-header colors-header">🎨 Colors</div>
        <div class="glass-content colors-content">
  
          <div class="color-section">
            <div class="color-subtitle">Room</div>
            <div class="input-group color-row">
              <label>Text Active:</label>
              ${this._renderColorInput('room', 'text_active')}
              <label>Text Inactive:</label>
              ${this._renderColorInput('room', 'text_inactive')}
            </div>
            <div class="input-group color-row">
              <label>Background Active:</label>
              ${this._renderColorInput('room', 'background_active')}
              <label>Background Inactive:</label>
              ${this._renderColorInput('room', 'background_inactive')}
            </div>
            <div class="input-group color-row">
              <label>Icon Active:</label>
              ${this._renderColorInput('room', 'icon_active')}
              <label>Icon Inactive:</label>
              ${this._renderColorInput('room', 'icon_inactive')}
            </div>
          </div>
  
          <div class="color-section" style="margin-top: 24px;">
            <div class="color-subtitle">Subbutton</div>
            <div class="input-group color-row">
              <label>Text Active:</label>
              ${this._renderColorInput('subbutton', 'text_active')}
              <label>Text Inactive:</label>
              ${this._renderColorInput('subbutton', 'text_inactive')}
            </div>
            <div class="input-group color-row">
              <label>Background Active:</label>
              ${this._renderColorInput('subbutton', 'background_active')}
              <label>Background Inactive:</label>
              ${this._renderColorInput('subbutton', 'background_inactive')}
            </div>
            <div class="input-group color-row">
              <label>Icon On:</label>
              ${this._renderColorInput('subbutton', 'icon_on')}
              <label>Icon Off:</label>
              ${this._renderColorInput('subbutton', 'icon_off')}
            </div>
          </div>
  
          <div style="margin-top:1.5em; text-align:center;">
            <button class="reset-button" @click="${this._resetColorConfig}">🧹 Reset Colors</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }
  

  _resetColorsConfig() {
    this._config = {
      ...this._config,
      colors: {
        room: {},
        subbutton: {}
      }
    };
    this.requestUpdate();
    this._fireConfigChanged();
  }

}
customElements.define('bubble-room-editor', BubbleRoomEditor);
