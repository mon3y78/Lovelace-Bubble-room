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
      name: 'Salotto2',
      icon: 'mdi:sofa',
      tap_action: { action: 'navigate', navigation_path: '/lovelace/sala' },
      hold_action: { action: 'more-info', navigation_path: '' }
    };
  }

  constructor() {
    super();
    this._iconList = [
      "mdi:sofa",
      "mdi:bed",
      "mdi:home",
      "mdi:table-furniture",
      "mdi:television",
      "mdi:lightbulb",
      "mdi:fan",
      "mdi:air-conditioner",
      "mdi:robot-vacuum",
      "mdi:led-strip-variant",
      "mdi:lamp",
      "mdi:window-closed",
      "mdi:window-open",
      "mdi:door",
      "mdi:door-closed",
      "mdi:speaker",
      "mdi:volume-high",
      "mdi:volume-off",
      "mdi:thermostat",
      "mdi:fire",
      "mdi:water",
      "mdi:shower",
      "mdi:toilet",
      "mdi:fridge",
      "mdi:oven",
      "mdi:coffee-maker",
      "mdi:washing-machine",
      "mdi:vacuum",
      "mdi:garage",
      "mdi:garage-open",
      "mdi:cctv"
    ];    
  }

  connectedCallback() {
    super.connectedCallback();
  
    // Forza il preload di ha-entity-picker
    if (!customElements.get("ha-entity-picker")) {
      const preload = document.createElement("ha-entity-picker");
      preload.hass = this.hass;
      preload.style.display = "none";
      document.body.appendChild(preload);
      setTimeout(() => {
        document.body.removeChild(preload);
        console.log("ENTITY PICKER LOADED:", customElements.get("ha-entity-picker"));
        this.requestUpdate();
      }, 1000);
    } else {
      console.log("ENTITY PICKER ALREADY REGISTERED");
    }
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
// Nuovi campi per ROOM
    config.colors.room.icon_active = config.colors.room.icon_active || 'rgba(255, 255, 255, 1)';
    config.colors.room.icon_inactive = config.colors.room.icon_inactive || 'rgba(128, 128, 128, 0.3)';
    config.colors.room.background_active = config.colors.room.background_active || 'rgba(0, 128, 0, 1)';
    config.colors.room.background_inactive = config.colors.room.background_inactive || 'rgba(0, 128, 0, 0.3)';
    config.colors.room.mushroom_active = config.colors.room.mushroom_active || 'rgba(255, 255, 255, 1)';
    config.colors.room.mushroom_inactive = config.colors.room.mushroom_inactive || 'rgba(128, 128, 128, 0.3)';

    // Nuovi campi per SUBBUTTON
    config.colors.subbutton.background_on = config.colors.subbutton.background_on || 'rgba(0, 0, 255, 1)';
    config.colors.subbutton.background_off = config.colors.subbutton.background_off || 'rgba(0, 0, 255, 0.3)';
    config.colors.subbutton.icon_on = config.colors.subbutton.icon_on || 'rgba(255, 255, 0, 1)';
    config.colors.subbutton.icon_off = config.colors.subbutton.icon_off || 'rgba(102, 102, 102, 1)';


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
    for (const [key, entityConfig] of Object.entries(configCopy.entities)) {
      if (entityConfig.entity && entityConfig.entity.trim() !== "") {
        const updatedConfig = { ...entityConfig };
        if (!updatedConfig.icon && this.hass?.states?.[updatedConfig.entity]?.attributes?.icon) {
          updatedConfig.icon = this.hass.states[updatedConfig.entity].attributes.icon;
        }
        filteredEntities[key] = updatedConfig;
      }
    }
    configCopy.entities = filteredEntities;
    console.log("[CONFIG EXPORT DEBUG]", configCopy.entities);



  
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
      :host {
        display: block;
        margin: 0;
        padding: 0;
      }
      .editor-header {
        text-align: center;
        margin: 1rem 0;
      }
      .version {
        font-size: 0.8rem;
        font-weight: normal;
        margin-left: 8px;
        color: var(--secondary-text-color);
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
    if (!customElements.get("ha-entity-picker")) {
      const preload = document.createElement("ha-entity-picker");
      preload.hass = this.hass;
      document.body.appendChild(preload);
      setTimeout(() => document.body.removeChild(preload), 1500);
    }
    

    console.log("ENTITY PICKER DEBUG", customElements.get("ha-entity-picker")); // <== QUI VA BENE

    const hasEntity = (key) => {
      const e = this._config.entities?.[key]?.entity;
      return e && e.trim() !== "";
    };
    return html`
      <div class="editor-header">
        <h3>Visual Editor Bubble Room <span class="version">v3.3</span></h3>
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
           <label>Room Icon:</label>
            <ha-icon-picker
              .hass="${this.hass}"
              .value="${this._config.icon || ''}"
              allow-custom-icon
              @value-changed="${e => {
                this._config = { ...this._config, icon: e.detail.value };
                this.requestUpdate();
                this._fireConfigChanged();
              }}"
            ></ha-icon-picker>


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
        </div>

      </ha-expansion-panel>

      <datalist id="entity-list">
        ${this.hass
          ? Object.keys(this.hass.states).map(
              entityId => html`<option value="${entityId}"></option>`
            )
          : ''}
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
  
    const hasEntityPicker = customElements.get("ha-entity-picker");
  
    return html`
      <label>${labelText}:</label>
      ${hasEntityPicker ? html`
        <ha-entity-picker
          .hass="${this.hass}"
          .value="${value}"
          allow-custom-entity
          @value-changed="${e => this._updateEntity(entityKey, field)({ target: { value: e.detail.value } })}"
        ></ha-entity-picker>
      ` : html`
        <input
          type="text"
          .value="${value}"
          list="entity-list"
          placeholder="Seleziona o scrivi un'entità"
          @focus="${(e) => { if (e.target.value === value) e.target.value = ''; }}"
          @blur="${(e) => {
            if (!e.target.value && value) e.target.value = value;
          }}"
          @change="${this._updateEntity(entityKey, field)}"
        />
      `}
    `;
  }
  
  
  
  
  
  
  
  

  _renderIconInput(labelText, entityKey, field = 'icon') {
    let value = this._config.entities?.[entityKey]?.[field] ?? '';

    if (!value && this.hass && this._config.entities?.[entityKey]?.entity) {
      const entityId = this._config.entities[entityKey].entity;
      value =
        this.hass.states[entityId]?.attributes?.icon ||
        this._getDefaultIconForEntity(entityId);
    }

  
    return html`
      <label>${labelText}:</label>
      <ha-icon-picker
        .hass="${this.hass}"
        .value="${value}"
        allow-custom-icon
        @value-changed="${e => {
          const newValue = e.detail.value;
          let entityConf = this._config.entities[entityKey] || {};
          entityConf = { ...entityConf, [field]: newValue };
          const entities = { ...this._config.entities, [entityKey]: entityConf };
          this._config = { ...this._config, entities };
          this.requestUpdate();
          this._fireConfigChanged();
        }}"
      ></ha-icon-picker>
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
          <ha-entity-picker
            .hass="${this.hass}"
            .value="${sensor.entity || ''}"
            allow-custom-entity
            @value-changed="${e => this._updateSensor(index, 'entity', e.detail.value)}"
          ></ha-entity-picker>
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
  
  _parseRGBA(str) {
    const fallback = [0, 128, 0, 1]; // default verde pieno
  
    if (!str || typeof str !== 'string') return fallback;
  
    // Se contiene var(), restituiamo il fallback
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
          <input type="color"
                 .value="${hex}"
                 @input="${e => this._updateColorField(section, key, e.target.value, a)}" />
          <input type="range"
                 min="0" max="1" step="0.01"
                 .value="${a}"
                 @input="${e => this._updateColorField(section, key, hex, e.target.value)}" />
          <span>${Math.round(a * 100)}%</span>
        </div>
        <input
          type="text"
          .value="${rgba}"
          @input="${e => this._updateNestedColorDirect(section, key, e.target.value)}"
        />
      </div>
    `;
  }
  
  
  
  _toHex(color) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = color || '#000000';
    return ctx.fillStyle;
  }
  _getDefaultIconForEntity(entityId) {
    if (!entityId || typeof entityId !== 'string') return 'mdi:help-circle';
  
    const domain = entityId.split('.')[0];
    const domainIconMap = {
      light: 'mdi:lightbulb',
      fan: 'mdi:fan',
      climate: 'mdi:thermostat',
      media_player: 'mdi:speaker',
      vacuum: 'mdi:robot-vacuum',
      binary_sensor: 'mdi:motion-sensor',
      sensor: 'mdi:information-outline',
      switch: 'mdi:toggle-switch',
      cover: 'mdi:window-shutter',
      lock: 'mdi:lock',
      camera: 'mdi:cctv',
      humidifier: 'mdi:air-humidifier',
      weather: 'mdi:weather-partly-cloudy',
      device_tracker: 'mdi:map-marker',
      person: 'mdi:account',
      input_boolean: 'mdi:toggle-switch',
      input_number: 'mdi:ray-vertex',
      input_select: 'mdi:format-list-bulleted',
      input_text: 'mdi:text-box-outline'
    };
  
    return domainIconMap[domain] || 'mdi:bookmark-outline';
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
  
      // Se l'icona non è stata impostata manualmente, ma è presente nello stato dell'entità, copiala
      if (field === 'entity' && this.hass?.states?.[value]?.attributes?.icon && !curEntity.icon) {
        curEntity.icon = this.hass.states[value].attributes.icon;
      }
  
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
  
  _getDomainDefaultIcon(domain, state) {
    switch (domain) {
      case 'light':         return 'mdi:lightbulb';
      case 'switch':        return 'mdi:toggle-switch';
      case 'fan':           return 'mdi:fan';
      case 'climate':       return 'mdi:thermostat';
      case 'media_player':  return 'mdi:speaker';
      case 'vacuum':        return 'mdi:robot-vacuum';
      case 'binary_sensor': return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off';
      case 'sensor':        return 'mdi:information-outline';
      case 'input_boolean': return 'mdi:toggle-switch';
      case 'cover':         return state === 'open' ? 'mdi:blinds-open'   : 'mdi:blinds-closed';
      case 'lock':          return state === 'locked' ? 'mdi:lock'         : 'mdi:lock-open';
      case 'door':          return state === 'open'   ? 'mdi:door-open'    : 'mdi:door-closed';
      case 'window':        return state === 'open'   ? 'mdi:window-open'  : 'mdi:window-closed';
      default:              return '';
    }
  }
  
}

customElements.define('bubble-room-editor', BubbleRoomEditor);