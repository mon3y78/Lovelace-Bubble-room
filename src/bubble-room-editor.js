import { LitElement, html, css } from 'lit';

class BubbleRoomEditor extends LitElement {
  static get properties() {
    return {
      _config: { type: Object },
      hass: { type: Object },
      _iconList: { type: Array },
    };
  }

  // Supporto all'editor visivo
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
        temperature: {
          temperature_sensor: 'sensor.vindstyrka_salotto_temperature',
          humidity_sensor: 'sensor.vindstyrka_salotto_humidity',
          unit:               'C',              
          tap_action: { action: 'more-info' }
        }
      },
      colors: {
        room: {
          text_active: '',
          text_inactive: '',
          background_active: '',
          background_inactive: '',
          icon_on: '',
          icon_off: ''
        },
        subbutton: {
          background_on: '',
          background_off: '',
          icon_on: '',
          icon_off: ''
        }
      },
      name: 'Salotto',
      icon: 'mdi:sofa',
      tap_action: { action: 'navigate', navigation_path: '/lovelace/sala' },
      hold_action: { action: 'more-info', navigation_path: '' }
    };
  }

  constructor() {
    super();
    this._iconList = [
      "mdi:lightbulb",
      "mdi:fan",
      "mdi:play-circle",
      "mdi:robot-vacuum",
      "mdi:information-outline",
      "mdi:sofa",
      "mdi:account",
      "mdi:bed",
      "mdi:home",
      "mdi:weather-sunny",
      "mdi:weather-cloudy",
      "mdi:weather-rainy"
    ];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  setConfig(config) {
    if (!config) {
      config = {};
    }
    if (!config.entities) {
      config.entities = {}; 
    }
    for (let i = 1; i <= 4; i++) {
      const key = `sensor${i}`;
      if (!config.entities[key]) {
        config.entities[key] = {};
      }
    }    
    if (!config.colors) {
      config.colors = {};
    }
    
    config.colors.room = config.colors.room || {};
    config.colors.subbutton = config.colors.subbutton || {};
    
    // ROOM colors
    config.colors.room.color_active = config.colors.room.color_active || 'rgba(var(--color-green), 1)';
    config.colors.room.color_inactive = config.colors.room.color_inactive || 'rgba(var(--color-green), 0.3)';
    config.colors.room.icon_on = config.colors.room.icon_on || 'orange';
    config.colors.room.icon_off = config.colors.room.icon_off || '#80808055';
    
    // SUBBUTTON colors
    config.colors.subbutton.color_on = config.colors.subbutton.color_on || 'rgba(var(--color-blue), 1)';
    config.colors.subbutton.color_off = config.colors.subbutton.color_off || 'rgba(var(--color-blue), 0.3)';
    config.colors.subbutton.icon_on = config.colors.subbutton.icon_on || 'yellow';
    config.colors.subbutton.icon_off = config.colors.subbutton.icon_off || '#666';
    if (!config.entities.temperature) {
      config.entities.temperature = {};
    }
    config.entities.temperature.unit = config.entities.temperature.unit || 'C';
    if (!config.hold_action) {
      config.hold_action = { action: 'more-info', navigation_path: '' };
    }
    this._config = config;
  }
  _updateTemperatureUnit(ev) {
    const unit = ev.target.value;                          // 'C' o 'F'
    const tempCfg = { ...this._config.entities.temperature, unit };
    const entities = { ...this._config.entities, temperature: tempCfg };
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  _updateLayoutMode(ev) {
    const layout_mode = ev.target.value;
    this._config = { ...this._config, layout_mode };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  
  getConfig() {
    const configCopy = JSON.parse(JSON.stringify(this._config));
    
    // Mantieni layout_mode
    if (!configCopy.layout_mode) {
      configCopy.layout_mode = this._config.layout_mode || '6x3';
    }
  
    const filteredEntities = {};
    Object.keys(configCopy.entities).forEach((key) => {
      const entityConfig = configCopy.entities[key];
      if (entityConfig.entity && entityConfig.entity.trim() !== "") {
        filteredEntities[key] = entityConfig;
      }
    });
    configCopy.entities = filteredEntities;
  
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
    
  
    console.log("Editor - Config finale restituita:", configCopy);
    return configCopy;
  }
  

  _defaultIconList() {
    return this._iconList;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 0;
        padding: 0;
      }
      .editor-header {
        text-align: center;
        margin: 1rem 0;
      }
      /* Stile comune per tutti gli header dei pannelli */
      ha-expansion-panel div[slot="header"] {
        background-color: var(--slider-bar-color);
        color: var(--text-primary-color);
        padding: 8px;
        font-weight: bold;
      }
      .section-content {
        padding: 16px;
      }
      .input-group {
        margin-bottom: 16px;
      }
      label {
        display: inline-block;
        margin-bottom: 4px;
        font-weight: 600;
      }
      input, textarea, select {
        width: 100%;
        box-sizing: border-box;
      }
      .note {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: var(--secondary-text-color);
      }
    `;
  }

  _togglePanel(panelId) {
    const panel = this.shadowRoot.getElementById(panelId);
    if (panel) {
      panel.open = !panel.open;
    }
  }

  _renderSubButtonPanel(key) {
    // Se non c'è ancora una configurazione, assegno un oggetto di default
    const entityConfig = this._config.entities?.[key] || {
      entity: "",
      icon: "",
      tap_action: { action: "toggle", navigation_path: "" },
      hold_action: { action: "more-info", navigation_path: "" }
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
        <div slot="header" @click="${() => this._togglePanel(panelId)}">
          ${label}
        </div>
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
    const hasEntity = (key) => {
      const e = this._config.entities?.[key]?.entity;
      return e && e.trim() !== "";
    };
    return html`
      <div class="editor-header">
        <h3>Visual Editor Bubble Room</h3>
      </div>

      <ha-expansion-panel id="roomPanel">
        <div slot="header" @click="${() => this._togglePanel('roomPanel')}">
          Room Settings
        </div>
        <div class="section-content">
          <div class="input-group">
            <label>Room name:</label>
            <input
              type="text"
              .value="${this._config.name || ''}"
              @input="${this._updateName}"
            />
          </div>
          <div class="input-group">
            <label>Layout:</label>
            <select
              .value="${this._config.layout_mode || '6x3'}"
              @change="${this._updateLayoutMode}"
            >
              <option value="6x3">6x3</option>
              <option value="12x4">12x4</option>
            </select>
          </div>
          ${this._renderRoomAction()}
          <div class="input-group">
            ${this._renderEntityInput("Presence (ID)", "presence")}
          </div>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="subButtonMainPanel">
        <div slot="header" @click="${() => this._togglePanel('subButtonMainPanel')}">
          SUB-BUTTON
        </div>
        <div class="section-content">
          ${this._renderSubButtonPanel("sub-button1")}
          ${this._renderSubButtonPanel("sub-button2")}
          ${this._renderSubButtonPanel("sub-button3")}
          ${this._renderSubButtonPanel("sub-button4")}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="mushroomEntitiesPanel">
        <div slot="header" @click="${() => this._togglePanel('mushroomEntitiesPanel')}">
          Mushroom Entities
        </div>
        <div class="section-content">
          ${this._renderMushroomEntityPanel("entities1", "Entity 1")}
          ${this._renderMushroomEntityPanel("entities2", "Entity 2")}
          ${this._renderMushroomEntityPanel("entities3", "Entity 3")}
          ${this._renderMushroomEntityPanel("entities4", "Entity 4")}
          ${this._renderMushroomEntityPanel("entities5", "Entity 5")}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="cameraPanel">
        <div slot="header" @click="${() => this._togglePanel('cameraPanel')}">
          Camera
        </div>
        <div class="section-content">
          <div class="input-group">
            ${this._renderEntityInput("Camera (ID)", "camera")}
          </div>
          <div class="input-group">
            ${this._renderIconInput("Camera Icon", "camera")}
          </div>
        </div>
      </ha-expansion-panel>



      <ha-expansion-panel id="climatePanel">
        <div slot="header" @click="${() => this._togglePanel('climatePanel')}">
          Climate
        </div>
        <div class="section-content">
          <div class="input-group">
            ${this._renderEntityInput("Climate (ID)", "climate")}
          </div>
          <div class="input-group">
            ${this._renderIconInput("Climate Icon", "climate")}
          </div>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="sensorPanel">
        <div slot="header" @click="${() => this._togglePanel('sensorPanel')}">
          Sensor
        </div>
        <div class="section-content">
          ${[0, 1, 2, 3].map(i => this._renderSensorConfig(i))}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="colorsPanel">
        <div slot="header" @click="${() => this._togglePanel('colorsPanel')}">
          Colors
        </div>
        <div class="section-content">
          <h4>Room</h4>
          ${this._renderColorField('room', 'color_active', 'Color Active')}
          ${this._renderColorField('room', 'color_inactive', 'Color Inactive')}
          ${this._renderColorField('room', 'icon_on', 'Icon On')}
          ${this._renderColorField('room', 'icon_off', 'Icon Off')}

          <h4>Subbutton</h4>
          ${this._renderColorField('subbutton', 'color_on', 'Color On')}
          ${this._renderColorField('subbutton', 'color_off', 'Color Off')}
          ${this._renderColorField('subbutton', 'icon_on', 'Icon On')}
          ${this._renderColorField('subbutton', 'icon_off', 'Icon Off')}
        </div>
      </ha-expansion-panel>


      <datalist id="entity-list">
        ${this.hass
          ? Object.keys(this.hass.entities).map(
              entityId => html`<option value="${entityId}"></option>`
            )
          : ''}
      </datalist>
      <datalist id="icon-list">
        ${this._defaultIconList().map(icon => html`<option value="${icon}"></option>`)}
      </datalist>

      <p class="note">
        For advanced configurations, modify the YAML directly.
      </p>
    `;
  }

  _renderMushroomEntityPanel(key, label) {
    const panelId = `${key}Panel`;
    return html`
      <ha-expansion-panel id="${panelId}">
        <div slot="header" @click="${() => this._togglePanel(panelId)}">
          ${label}
        </div>
        <div class="section-content">
          ${this._renderEntityInput(`${label} (ID)`, key)}
          ${this._renderIconInput(`${label} Icon`, key)}
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderEntityInput(labelText, entityKey, field = 'entity') {
    const value = (this._config.entities &&
                   this._config.entities[entityKey] &&
                   this._config.entities[entityKey][field]) || '';
    return html`
      <label>${labelText}:</label>
      <input
        type="text"
        .value="${value}"
        list="entity-list"
        @input="${this._updateEntity(entityKey, field)}"
      />
    `;
  }

  _renderIconInput(labelText, entityKey, field = 'icon') {
    let value = (this._config.entities &&
                 this._config.entities[entityKey] &&
                 this._config.entities[entityKey][field]) || '';
    if (!value && this.hass && this._config.entities && this._config.entities[entityKey]?.entity) {
      const entityId = this._config.entities[entityKey].entity;
      value = this.hass.states[entityId]?.attributes?.icon || '';
    }
    return html`
      <label>${labelText}:</label>
      <input
        type="text"
        .value="${value}"
        list="icon-list"
        @input="${this._updateEntity(entityKey, field)}"
      />
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
              <input
                type="text"
                .value="${tapAction.navigation_path || ''}"
                @input="${this._updateTapActionField('navigation_path')}"
              />
            `
          : ''}
        ${tapAction.action === 'call-service'
          ? html`
              <label>Service:</label>
              <input
                type="text"
                .value="${tapAction.service || ''}"
                @input="${this._updateTapActionField('service')}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${tapAction.service_data ? JSON.stringify(tapAction.service_data) : ''}"
                @input="${this._updateTapActionField('service_data')}"
              ></textarea>
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
              <input
                type="text"
                .value="${holdAction.navigation_path || ''}"
                @input="${this._updateHoldActionField('navigation_path')}"
              />
            `
          : ''}
        ${holdAction.action === 'call-service'
          ? html`
              <label>Service:</label>
              <input
                type="text"
                .value="${holdAction.service || ''}"
                @input="${this._updateHoldActionField('service')}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}"
                @input="${this._updateHoldActionField('service_data')}"
              ></textarea>
            `
          : ''}
      </div>
    `;
  }


  _renderSensorConfig(index) {
    const sensor = this._config.entities?.[`sensor${index+1}`] || {};
    const types = [
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
    ];
    return html`
      <div class="input-group">
        <label>Sensor ${index + 1} Type:</label>
        <select
          .value="${sensor.type || ''}"
          @change="${e => this._updateSensor(index, 'type', e.target.value)}"
        >
          <option value="">-- none --</option>
          ${types.map(t => html`<option value="${t.type}">${t.label}</option>`)}
        </select>
      </div>
      ${sensor.type ? html`
        <div class="input-group">
          <label>Entity ID:</label>
          <input
            type="text"
            .value="${sensor.entity || ''}"
            list="entity-list"
            @input="${e => this._updateSensor(index, 'entity', e.target.value)}"
          />
        </div>
        ${sensor.type === 'temperature' ? html`
          <div class="input-group">
            <label>Unità:</label>
            <select
              .value="${sensor.unit || 'C'}"
              @change="${e => this._updateSensor(index, 'unit', e.target.value)}"
            >
              <option value="C">°C</option>
              <option value="F">°F</option>
            </select>
          </div>
        ` : ''}
      ` : ''}
      <hr/>
    `;
  }
  
  _renderColorField(section, key, label) {
    const val = this._config.colors?.[section]?.[key] || '';
    return html`
      <div class="input-group">
        <label>${label}:</label>
        <input
          type="text"
          .value="${val}"
          @input="${this._updateNestedColor(section, key)}"
        />
        <input
          type="color"
          .value="${this._toHex(val)}"
          @input="${(e) => this._updateNestedColorDirect(section, key, e.target.value)}"
        />
      </div>
    `;
  }
  
  _toHex(color) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = color || '#000000';
    return ctx.fillStyle;
  }
  
  _updateNestedColorDirect(section, key, value) {
    const colors = { ...this._config.colors };
    colors[section] = { ...colors[section], [key]: value };
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
              <input
                type="text"
                .value="${tapAction.navigation_path || ''}"
                @input="${this._updateEntityTapAction(key, 'navigation_path')}"
              />
            `
          : ''}
        ${tapAction.action === 'call-service'
          ? html`
              <label>Service:</label>
              <input
                type="text"
                .value="${tapAction.service || ''}"
                @input="${this._updateEntityTapAction(key, 'service')}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${tapAction.service_data ? JSON.stringify(tapAction.service_data) : ''}"
                @input="${this._updateEntityTapAction(key, 'service_data')}"
              ></textarea>
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
              <input
                type="text"
                .value="${holdAction.navigation_path || ''}"
                @input="${this._updateEntityHoldAction(key, 'navigation_path')}"
              />
            `
          : ''}
        ${holdAction.action === 'call-service'
          ? html`
              <label>Service:</label>
              <input
                type="text"
                .value="${holdAction.service || ''}"
                @input="${this._updateEntityHoldAction(key, 'service')}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}"
                @input="${this._updateEntityHoldAction(key, 'service_data')}"
              ></textarea>
            `
          : ''}
      </div>
    `;
  }

  set hass(hass) {
    this._hass = hass;
    this.requestUpdate();
  }

  get hass() {
    return this._hass;
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
    this._config = { ...this._config, name: newName };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  _updateLayoutMode(ev) {
    const layout_mode = ev.target.value;
    this._config = { ...this._config, layout_mode };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  _updateIcon(ev) {
    const newIcon = ev.target.value;
    this._config = { ...this._config, icon: newIcon };
    this.requestUpdate();
    this._fireConfigChanged();
  }

  _updateEntity(entityKey, field = 'entity') {
    return (ev) => {
      const value = ev.target.value;
      let curEntity = this._config.entities[entityKey] || {};
      curEntity = { ...curEntity, [field]: value };
      const entities = { ...this._config.entities, [entityKey]: curEntity };
      this._config = { ...this._config, entities };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }


  _updateTemperature(field) {
    return (e) => {
      const value = e.target.value;
      const tempConfig = { ...this._config.entities?.temperature, [field]: value };
      if (tempConfig.temperature_sensor && tempConfig.humidity_sensor) {
        tempConfig.primary = `🌡️{{ states("${tempConfig.temperature_sensor}") }}°C 💦{{ states("${tempConfig.humidity_sensor}") }}%`;
      }
      const entities = { ...this._config.entities, temperature: tempConfig };
      this._config = { ...this._config, entities };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }

  _updateTapActionField(field) {
    return (ev) => {
      let newValue = ev.target.value;
      if (field === 'service_data') {
        try {
          newValue = JSON.parse(newValue);
        } catch (e) {}
      }
      const tap_action = {
        ...(this._config.tap_action || { action: 'navigate', navigation_path: '' }),
        [field]: newValue
      };
      this._config = { ...this._config, tap_action };
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
        } catch (e) {}
      }
      const hold_action = {
        ...(this._config.hold_action || { action: 'more-info', navigation_path: '' }),
        [field]: newValue
      };
      this._config = { ...this._config, hold_action };
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
        } catch (e) {}
      }
      let entityConf = this._config.entities[entityKey] || {};
      let tapAction = entityConf.tap_action || { action: 'toggle', navigation_path: '' };
      tapAction = { ...tapAction, [field]: value };
      entityConf = { ...entityConf, tap_action: tapAction };
      const entities = { ...this._config.entities, [entityKey]: entityConf };
      this._config = { ...this._config, entities };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }

  _updateSensor(index, field, value) {
    const key = `sensor${index+1}`;
    const current = this._config.entities?.[key] || {};
    const updated = { ...current, [field]: value };
    const entities = { ...this._config.entities, [key]: updated };
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  _updateNestedColor(section, key) {
    return (ev) => {
      const value = ev.target.value;
      const colors = { ...this._config.colors };
      colors[section] = { ...colors[section], [key]: value };
      this._config = { ...this._config, colors };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }
  
  _updateEntityHoldAction(entityKey, field) {
    return (ev) => {
      let value = ev.target.value;
      if (field === 'service_data') {
        try {
          value = JSON.parse(value);
        } catch (e) {}
      }
      let entityConf = this._config.entities[entityKey] || {};
      let holdAction = entityConf.hold_action || { action: 'more-info', navigation_path: '' };
      holdAction = { ...holdAction, [field]: value };
      entityConf = { ...entityConf, hold_action: holdAction };
      const entities = { ...this._config.entities, [entityKey]: entityConf };
      this._config = { ...this._config, entities };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);