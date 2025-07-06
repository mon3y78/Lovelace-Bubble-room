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

  static getStubConfig() {
    return {
      entities: {
        presence: { entity: 'binary_sensor.aqara_fp1_presence' },
        "sub-button1": {
          entity: 'light.luce_ventola',
          icon: 'mdi:lightbulb',
          tap_action: { action: 'toggle' },
          hold_action: { action: 'more-info' }
        },
        "sub-button2": {
          entity: 'fan.sonoff_1000f6e5c7',
          icon: 'mdi:fan',
          tap_action: { action: 'toggle' },
          hold_action: { action: 'more-info' }
        },
        "sub-button3": {
          entity: 'media_player.google_nest_1',
          icon: 'mdi:speaker',
          tap_action: { action: 'toggle' },
          hold_action: { action: 'more-info' }
        },
        "sub-button4": {
          entity: 'vacuum.slider',
          icon: 'mdi:robot-vacuum',
          tap_action: { action: 'toggle' },
          hold_action: { action: 'more-info' }
        },
        climate: { entity: 'climate.termostato_salotto', icon: 'mdi:thermostat', tap_action: { action: 'more-info' } },
        entities1: { entity: 'sensor.some_sensor1', icon: 'mdi:information-outline' },
        entities2: { entity: 'sensor.some_sensor2', icon: 'mdi:information-outline' },
        entities3: { entity: 'sensor.some_sensor3', icon: 'mdi:information-outline' },
        entities4: { entity: 'sensor.some_sensor4', icon: 'mdi:information-outline' },
        entities5: { entity: 'sensor.some_sensor5', icon: 'mdi:information-outline' },
      },
      colors: {
        room: {
          icon_active: 'rgba(255, 255, 0, 1)',
          icon_inactive: 'rgba(102, 102, 102, 1)',
          background_active: 'rgba(0, 128, 0, 1)',
          background_inactive: 'rgba(0, 128, 0, 0.3)',
          mushroom_active: 'rgba(255, 255, 0, 1)',
          mushroom_inactive: 'rgba(102, 102, 102, 1)'
        },
        subbutton: {
          background_on: 'rgba(0, 128, 0, 1)',
          background_off: 'rgba(0, 128, 0, 0.3)',
          icon_on: 'rgba(255, 255, 0, 1)',
          icon_off: 'rgba(102, 102, 102, 1)'
        }
      },
      name: 'Salotto2',
      icon: 'mdi:sofa',
      tap_action: { action: 'navigate', navigation_path: '/lovelace/sala' },
      hold_action: { action: 'more-info', navigation_path: '' }
    };
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
      import("custom-card-helpers").then(module => module.loadHaComponents()).catch(() => {});
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // Forza il preload di ha-entity-picker
    if (!customElements.get("ha-entity-picker")) {
      const preload = document.createElement("ha-entity-picker");
      preload.hass = this.hass;
      preload.style.display = "none";
      document.body.appendChild(preload);
      setTimeout(() => document.body.removeChild(preload), 1000);
    }
  }

  setConfig(config) {
    if (!config) config = {};
    if (!config.entities) config.entities = {};
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
        if (entityId && this.hass?.states?.[entityId]?.attributes?.icon) {
          updatedConfig.icon = this.hass.states[entityId].attributes.icon;
        } else if (entityId) {
          const stateObj = this.hass?.states?.[entityId];
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
      :host { display: block; margin: 0; padding: 0; }
      .editor-header { text-align: center; margin: 1rem 0; }
      .version { font-size: 0.8rem; font-weight: normal; margin-left: 8px; color: var(--secondary-text-color); }
      ha-expansion-panel div[slot="header"] {
        background-color: var(--primary-background-color, #222);
        color: var(--primary-text-color, #eee);
        font-size: 1.1em;
        font-weight: 600;
        padding: 12px;
      }

      .section-content {
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.02);
        border: 1px solid var(--divider-color, #444);
        border-radius: 8px;
        box-shadow: 0 0 6px rgba(0,0,0,0.4);
      }

      .section-content h4 {
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        font-size: 1.1em;
        font-weight: 600;
      }

      .section-content button {
        background: #cc0000;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 6px 12px;
        font-weight: bold;
        cursor: pointer;
      }
      .section-content button:hover {
        background: #ff0000;
      }

      .input-group {
        margin-bottom: 20px;
      }
      label {
        display: inline-block;
        margin-bottom: 4px;
        font-weight: 600;
      }
      input, textarea, select {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--divider-color, #ccc);
        border-radius: 4px;
        padding: 6px;
      }
      .note { margin-top: 1rem; font-size: 0.9rem; color: var(--secondary-text-color); }
      .error {
        border: 1px solid red;
      }
    `;
  }
  

  _togglePanel(panelId) {
    const panel = this.shadowRoot.getElementById(panelId);
    if (panel) panel.open = !panel.open;
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
    if (!this._config) return html`<div>Caricamento configurazione...</div>`;
    return html`
      <div class="editor-header">
        <h3>Visual Editor Bubble Room V3.1<span class="version">v3.0</span></h3>
      </div>
      ${this._renderRoomPanel()}
      ${this._renderSubButtonPanelGroup()}
      ${this._renderMushroomEntitiesPanel()}
      ${this._renderCameraPanel()}
      ${this._renderClimatePanel()}
      ${this._renderSensorPanel()}
      ${this._renderColorsPanel()}
      <p class="note">
        For advanced configurations, modify the YAML directly.
      </p>
    `;
  }
  

  _renderEntityInput(labelText, entityKey, field = 'entity') {
    const value = (this._config.entities && this._config.entities[entityKey] && this._config.entities[entityKey][field]) || '';
    const hasEntityPicker = customElements.get("ha-entity-picker");
    return html`
      <label>${labelText}:</label>
      ${hasEntityPicker ? html`
        <ha-entity-picker .hass="${this.hass}" .value="${value}" allow-custom-entity
          @value-changed="${e => this._updateEntity(entityKey, field)({ target: { value: e.detail.value } })}">
        </ha-entity-picker>
      ` : html`
        <input type="text" .value="${value}" list="entity-list" placeholder="Inserisci entity_id"
          @input="${this._updateEntity(entityKey, field)}" />
      `}
    `;
  }

  _renderIconInput(labelText, entityKey, field = 'icon') {
    let value = this._config.entities?.[entityKey]?.[field] ?? '';
    if (!value && this.hass && this._config.entities?.[entityKey]?.entity) {
      const entityId = this._config.entities[entityKey].entity;
      value = this.hass.states[entityId]?.attributes?.icon || this._getDefaultIconForEntity(entityId);
    }
    return html`
      <label>${labelText}:</label>
      <ha-icon-picker .hass="${this.hass}" .value="${value}" allow-custom-icon
        @value-changed="${e => {
          const newValue = e.detail.value;
          let entityConf = this._config.entities[entityKey] || {};
          entityConf = { ...entityConf, [field]: newValue };
          const entities = { ...this._config.entities, [entityKey]: entityConf };
          this._config = { ...this._config, entities };
          this.requestUpdate();
          this._fireConfigChanged();
        }}">
      </ha-icon-picker>
    `;
  }

  _renderRoomAction() {
    const tapAction = this._config.tap_action || { action: 'navigate', navigation_path: '' };
    const holdAction = this._config.hold_action || { action: 'more-info', navigation_path: '' };
    return html`
      <div class="input-group">
        <label>Tap:</label>
        <select @change="${this._updateTapActionField('action')}" .value="${tapAction.action}">
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${tapAction.action === 'navigate'
          ? html`
              <label>Navigation Path:</label>
              <input type="text" .value="${tapAction.navigation_path || ''}" @input="${this._updateTapActionField('navigation_path')}" />
            `
          : ''}
        ${tapAction.action === 'call-service'
          ? html`
              <label>Service:</label>
              <input type="text" .value="${tapAction.service || ''}" @input="${this._updateTapActionField('service')}" />
              <label>Service Data (JSON):</label>
              <textarea
                class="${this._jsonError ? 'error' : ''}"
                .value="${tapAction.service_data ? JSON.stringify(tapAction.service_data) : ''}"
                @input="${this._updateTapActionField('service_data')}"></textarea>
              ${this._jsonError ? html`<div style="color: red; font-size: 0.9em;">⚠️ JSON non valido</div>` : ''}
            `
          : ''}
      </div>
      <div class="input-group">
        <label>Hold:</label>
        <select @change="${this._updateHoldActionField('action')}" .value="${holdAction.action}">
          <option value="more-info">More Info</option>
          <option value="toggle">Toggle</option>
          <option value="call-service">Call Service</option>
          <option value="navigate">Navigate</option>
          <option value="none">None</option>
        </select>
        ${holdAction.action === 'navigate'
          ? html`
              <label>Navigation Path:</label>
              <input type="text" .value="${holdAction.navigation_path || ''}" @input="${this._updateHoldActionField('navigation_path')}" />
            `
          : ''}
        ${holdAction.action === 'call-service'
          ? html`
              <label>Service:</label>
              <input type="text" .value="${holdAction.service || ''}" @input="${this._updateHoldActionField('service')}" />
              <label>Service Data (JSON):</label>
              <textarea
                class="${this._jsonError ? 'error' : ''}"
                .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}"
                @input="${this._updateHoldActionField('service_data')}"></textarea>
              ${this._jsonError ? html`<div style="color: red; font-size: 0.9em;">⚠️ JSON non valido</div>` : ''}
            `
          : ''}
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

  _renderSensorPanel(key, label) {
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
    if (field === 'type') updated.unit = (SENSOR_TYPE_MAP[value]?.units || [])[0] || '';
    const entities = { ...this._config.entities, [key]: updated };
    this._config = { ...this._config, entities };
    this.requestUpdate();
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
  _getIconForEntity(entityId, entityConfig) {
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
    const stateObj = this.hass?.states?.[entityId];
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

  _renderSubButtonAction(key) {
    const tapAction = this._config.entities[key]?.tap_action || { action: 'toggle', navigation_path: '' };
    const holdAction = this._config.entities[key]?.hold_action || { action: 'more-info', navigation_path: '' };
    return html`
      <div class="input-group">
        <label>Tap:</label>
        <select @change="${this._updateEntityTapAction(key, 'action')}" .value="${tapAction.action}">
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${tapAction.action === 'navigate'
          ? html`
              <label>Navigation Path:</label>
              <input type="text" .value="${tapAction.navigation_path || ''}" @input="${this._updateEntityTapAction(key, 'navigation_path')}" />
            `
          : ''}
        ${tapAction.action === 'call-service'
          ? html`
              <label>Service:</label>
              <input type="text" .value="${tapAction.service || ''}" @input="${this._updateEntityTapAction(key, 'service')}" />
              <label>Service Data (JSON):</label>
              <textarea .value="${tapAction.service_data ? JSON.stringify(tapAction.service_data) : ''}" @input="${this._updateEntityTapAction(key, 'service_data')}"></textarea>
            `
          : ''}
      </div>
      <div class="input-group">
        <label>Hold:</label>
        <select @change="${this._updateEntityHoldAction(key, 'action')}" .value="${holdAction.action}">
          <option value="more-info">More Info</option>
          <option value="toggle">Toggle</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${holdAction.action === 'navigate'
          ? html`
              <label>Navigation Path:</label>
              <input type="text" .value="${holdAction.navigation_path || ''}" @input="${this._updateEntityHoldAction(key, 'navigation_path')}" />
            `
          : ''}
        ${holdAction.action === 'call-service'
          ? html`
              <label>Service:</label>
              <input type="text" .value="${holdAction.service || ''}" @input="${this._updateEntityHoldAction(key, 'service')}" />
              <label>Service Data (JSON):</label>
              <textarea .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}" @input="${this._updateEntityHoldAction(key, 'service_data')}"></textarea>
            `
          : ''}
      </div>
    `;
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
  
      // Non aggiornare se il valore non cambia
      if (this._config.entities?.[entityKey]?.[field] === value) return;
  
      if (field === 'entity') {
        this._updateEntityConfig(entityKey, ["entity"], value);
        const iconValue = this._getIconForEntity(value, this._config.entities?.[entityKey]);
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
  _renderRoomPanel() {
    return html`
      <ha-expansion-panel id="roomPanel">
        <div slot="header" @click="${() => this._togglePanel('roomPanel')}">Room Settings</div>
        <div class="section-content">
          <div class="input-group">
            <label>Room name:</label>
            <input
              type="text"
              .value="${this._config.name || ''}"
              @input="${this._updateName}" />
          </div>
          <div class="input-group">
            <label>Room Icon:</label>
            <ha-icon-picker
              .hass="${this.hass}"
              .value="${this._config.icon || ''}"
              allow-custom-icon
              @value-changed="${e => {
                this._config = { ...this._config, icon: e.detail.value };
                this.requestUpdate();
                this._fireConfigChanged();
              }}">
            </ha-icon-picker>
          </div>
          ${this._renderRoomAction()}
          <div class="input-group">
            ${this._renderEntityInput("Presence (ID)", "presence")}
          </div>
          <div style="margin-top:1em;">
            <button @click="${this._resetRoomConfig}">🔄 Reset Room Settings</button>
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
      <ha-expansion-panel id="subButtonMainPanel">
        <div slot="header" @click="${() => this._togglePanel('subButtonMainPanel')}">SUB-BUTTON</div>
        <div class="section-content">
          ${this._renderSubButtonPanel("sub-button1")}
          ${this._renderSubButtonPanel("sub-button2")}
          ${this._renderSubButtonPanel("sub-button3")}
          ${this._renderSubButtonPanel("sub-button4")}
          <div style="margin-top:1em;">
            <button @click="${this._resetSubButtonConfig}">🔄 Reset Sub-buttons</button>
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
    return html`
      <ha-expansion-panel id="mushroomEntitiesPanel">
        <div slot="header" @click="${() => this._togglePanel('mushroomEntitiesPanel')}">Mushroom Entities</div>
        <div class="section-content">
          ${this._renderMushroomEntityPanel("entities1", "Entity 1")}
          ${this._renderMushroomEntityPanel("entities2", "Entity 2")}
          ${this._renderMushroomEntityPanel("entities3", "Entity 3")}
          ${this._renderMushroomEntityPanel("entities4", "Entity 4")}
          ${this._renderMushroomEntityPanel("entities5", "Entity 5")}
          <div style="margin-top:1em;">
            <button @click="${this._resetMushroomEntitiesConfig}">🔄 Reset Mushroom Entities</button>
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
      <ha-expansion-panel id="cameraPanel">
        <div slot="header" @click="${() => this._togglePanel('cameraPanel')}">Camera</div>
        <div class="section-content">
          <div class="input-group">
            ${this._renderEntityInput("Camera (ID)", "camera")}
          </div>
          <div class="input-group">
            ${this._renderIconInput("Camera Icon", "camera")}
          </div>
          <div style="margin-top:1em;">
            <button @click="${this._resetCameraConfig}">🔄 Reset Camera</button>
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
      <ha-expansion-panel id="climatePanel">
        <div slot="header" @click="${() => this._togglePanel('climatePanel')}">Climate</div>
        <div class="section-content">
          <div class="input-group">
            ${this._renderEntityInput("Climate (ID)", "climate")}
          </div>
          <div class="input-group">
            ${this._renderIconInput("Climate Icon", "climate")}
          </div>
          <div style="margin-top:1em;">
            <button @click="${this._resetClimateConfig}">🔄 Reset Climate</button>
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
      <ha-expansion-panel id="sensorPanel">
        <div slot="header" @click="${() => this._togglePanel('sensorPanel')}">Sensor</div>
        <div class="section-content">
          ${['sensor1', 'sensor2', 'sensor3', 'sensor4'].map((key, i) =>
            this._renderSensorPanel(key, `Sensor ${i + 1}`)
          )}
          <div style="margin-top:1em;">
            <button @click="${this._resetSensorConfig}">🔄 Reset Sensors</button>
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
  _renderColorsPanel() {
    return html`
      <ha-expansion-panel id="colorsPanel">
        <div slot="header" @click="${() => this._togglePanel('colorsPanel')}">Colors</div>
        <div class="section-content">
          <h4>Room</h4>
          ${this._renderColorField("room", "icon_active", "Icon Active")}
          ${this._renderColorField("room", "icon_inactive", "Icon Inactive")}
          ${this._renderColorField("room", "background_active", "Background Active")}
          ${this._renderColorField("room", "background_inactive", "Background Inactive")}
          ${this._renderColorField("room", "mushroom_active", "Mushroom Icon Active")}
          ${this._renderColorField("room", "mushroom_inactive", "Mushroom Icon Inactive")}
          <h4>Subbutton</h4>
          ${this._renderColorField("subbutton", "background_on", "Background On")}
          ${this._renderColorField("subbutton", "background_off", "Background Off")}
          ${this._renderColorField("subbutton", "icon_on", "Icon On")}
          ${this._renderColorField("subbutton", "icon_off", "Icon Off")}
          <div style="margin-top:1em;">
            <button @click="${this._resetColorsConfig}">🔄 Reset Colors</button>
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
