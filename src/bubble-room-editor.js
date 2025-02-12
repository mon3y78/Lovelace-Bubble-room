import { html, css, LitElement } from 'lit';

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
          icon: 'mdi:play-circle',
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
        temperatura: {
          sensore_temperatura: 'sensor.vindstyrka_salotto_temperature',
          sensore_umitidà: 'sensor.vindstyrka_salotto_humidity',
          tap_action: { action: 'more-info' }
        }
      },
      colors: {
        active: 'rgba(var(--color-green), 1)',
        inactive: 'rgba(var(--color-green), 0.3)',
        backgroundActive: 'rgba(var(--color-green), 0.4)',
        backgroundInactive: 'rgba(var(--color-green), 0.1)'
      },
      name: 'Salotto',
      icon: 'mdi:sofa',
      tap_action: { action: 'navigate', navigation_path: '/lovelace/sala' },
      hold_action: { action: 'more-info', navigation_path: '' }
    };
  }

  constructor() {
    super();
    this._iconList = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadIconList();
  }

  async _loadIconList() {
    try {
      const response = await fetch('/local/mdi-icons.json');
      if (response.ok) {
        const icons = await response.json();
        this._iconList = icons;
      }
    } catch (err) {
      // Log rimosso
    }
    this.requestUpdate();
  }

  _defaultIconList() {
    return this._iconList.length > 0 ? this._iconList : [
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

  setConfig(config) {
    if (!config) {
      config = {};
    }
    if (!config.entities) {
      config.entities = {};
    }
    if (!config.colors) {
      config.colors = {
        active: "rgba(var(--color-green), 1)",
        inactive: "rgba(var(--color-green), 0.3)",
        backgroundActive: "rgba(var(--color-green), 0.4)",
        backgroundInactive: "rgba(var(--color-green), 0.1)"
      };
    }
    if (!config.hold_action) {
      config.hold_action = { action: 'more-info', navigation_path: '' };
    }
    this._config = config;
  }

  getConfig() {
    return this._config;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 20px;
        background-color: #1e1e1e;
        color: #e0e0e0;
        font-family: 'Roboto', sans-serif;
      }
      h3 {
        margin: 0 0 20px 0;
        font-size: 24px;
        text-align: center;
        color: #ffffff;
      }
      /* Intestazioni principali in blu */
      legend {
        font-weight: bold;
        padding: 0 5px;
        color: #2196F3;
        font-size: 20px;
      }
      h4 {
        margin: 5px 0;
        font-size: 16px;
        font-weight: bold;
        color: #2196F3;
      }
      label {
        display: block;
        margin: 12px 0;
        font-size: 16px;
        color: #cccccc;
      }
      input, textarea, select {
        width: 100%;
        padding: 8px;
        margin-top: 4px;
        font-size: 14px;
        border: 1px solid #444;
        border-radius: 4px;
        background-color: #2a2a2a;
        color: #e0e0e0;
        box-sizing: border-box;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }
      input:focus, textarea:focus, select:focus {
        border-color: #666;
        outline: none;
        box-shadow: 0 0 5px rgba(102, 102, 102, 0.6);
      }
      fieldset {
        border: 1px solid #444;
        border-radius: 4px;
        padding: 5px;
        margin-bottom: 15px;
        background-color: #2a2a2a;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }
      .sub-button-config fieldset {
        padding: 3px;       /* riduce lo spazio interno */
        margin-bottom: 3px;  /* riduce lo spazio tra i fieldset */
      }
      datalist {
        font-size: 14px;
      }
      .sub-button-config {
        padding: 5px;
        border: 1px solid #666;
        margin-bottom: 5px;
        border-radius: 4px;
      }
      .sub-button-action {
        margin-top: 5px;
      }
      .sub-button-action > div {
        margin-bottom: 5px;
      }
      hr {
        border: 0;
        height: 1px;
        background: #444;
        margin: 10px 0;
      }
      /* Per le aree Action, non coloriamo il legend di blu */
      .room-action legend,
      .sub-button-action legend {
        color: #e0e0e0;
      }
      /* Stili specifici per la ROOM Action */
      .room-action {
        margin-top: 10px;
      }
      .room-action > div {
        margin-bottom: 5px;
      }
    `;
  }

  _renderEntityInput(labelText, entityKey, field = 'entity') {
    const value = (this._config.entities &&
                   this._config.entities[entityKey] &&
                   this._config.entities[entityKey][field]) || '';
    return html`
      <label>
        ${labelText}:
        <input type="text" .value="${value}" list="entity-list" @input="${this._updateEntity(entityKey, field)}" />
      </label>
    `;
  }

  _renderIconInput(labelText, entityKey, field = 'icon') {
    const value = (this._config.entities &&
                   this._config.entities[entityKey] &&
                   this._config.entities[entityKey][field]) || '';
    return html`
      <label>
        ${labelText}:
        <input type="text" .value="${value}" list="icon-list" @input="${this._updateEntity(entityKey, field)}" />
      </label>
    `;
  }

  // Nuovo helper per rendere l'area Action della ROOM (Tap e Hold)
  _renderRoomAction() {
    const tapAction = this._config.tap_action || { action: 'navigate', navigation_path: '' };
    const holdAction = this._config.hold_action || { action: 'more-info', navigation_path: '' };
    return html`
      <fieldset class="room-action">
        <legend>Action</legend>
        <div class="room-tap">
          <label>Tap:</label>
          <select @change="${this._updateTapActionField('action')}" .value="${tapAction.action}">
            <option value="toggle">Toggle</option>
            <option value="more-info">More Info</option>
            <option value="navigate">Navigate</option>
            <option value="call-service">Call Service</option>
            <option value="none">None</option>
          </select>
          ${tapAction.action === 'navigate' ? html`
            <label>Navigation Path:
              <input type="text" .value="${tapAction.navigation_path || ''}" @input="${this._updateTapActionField('navigation_path')}" />
            </label>
          ` : ''}
          ${tapAction.action === 'call-service' ? html`
            <label>Service:
              <input type="text" .value="${tapAction.service || ''}" @input="${this._updateTapActionField('service')}" />
            </label>
            <label>Service Data (JSON):
              <textarea .value="${tapAction.service_data ? JSON.stringify(tapAction.service_data) : ''}" @input="${this._updateTapActionField('service_data')}"></textarea>
            </label>
          ` : ''}
        </div>
        <div class="room-hold">
          <label>Hold:</label>
          <select @change="${this._updateHoldActionField('action')}" .value="${holdAction.action}">
            <option value="more-info">More Info</option>
            <option value="toggle">Toggle</option>
            <option value="call-service">Call Service</option>
            <option value="navigate">Navigate</option>
            <option value="none">None</option>
          </select>
          ${holdAction.action === 'navigate' ? html`
            <label>Navigation Path:
              <input type="text" .value="${holdAction.navigation_path || ''}" @input="${this._updateHoldActionField('navigation_path')}" ?disabled="${holdAction.action !== 'navigate'}" />
            </label>
          ` : ''}
          ${holdAction.action === 'call-service' ? html`
            <label>Service:
              <input type="text" .value="${holdAction.service || ''}" @input="${this._updateHoldActionField('service')}" />
            </label>
            <label>Service Data (JSON):
              <textarea .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}" @input="${this._updateHoldActionField('service_data')}"></textarea>
            </label>
          ` : ''}
        </div>
      </fieldset>
    `;
  }

  // Entity Tap Action (per sub-button)
  _updateTapActionField(field) {
    return (ev) => {
      let newValue = ev.target.value;
      if (field === 'service_data') {
        try {
          newValue = JSON.parse(newValue);
        } catch (e) {}
      }
      const tap_action = { ...(this._config.tap_action || { action: 'navigate', navigation_path: '' }), [field]: newValue };
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
      const hold_action = { ...(this._config.hold_action || { action: 'more-info', navigation_path: '' }), [field]: newValue };
      this._config = { ...this._config, hold_action };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }

  // Entity Tap Action (per sub-button)
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

  // Entity Hold Action (per sub-button)
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

  _updateColor(colorKey) {
    return (ev) => {
      const newValue = ev.target.value;
      const colors = { ...((this._config.colors) || {}), [colorKey]: newValue };
      this._config = { ...this._config, colors };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }

  _updateTemperature(field) {
    return (e) => {
      const value = e.target.value;
      const tempConfig = { ...this._config.entities?.temperatura, [field]: value };
      if (tempConfig.sensore_temperatura && tempConfig.sensore_umitidà) {
        tempConfig.primary = `🌡️{{ states("${tempConfig.sensore_temperatura}") }}°C 💦{{ states("${tempConfig.sensore_umitidà}") }}%`;
      }
      const entities = { ...this._config.entities, temperatura: tempConfig };
      this._config = { ...this._config, entities };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }

  // Nuovo helper per renderizzare le azioni dei SUB-BUTTON in un unico blocco (Tap e Hold)
  _renderSubButtonAction(key) {
    const tapAction = this._config.entities[key]?.tap_action || { action: 'toggle', navigation_path: '' };
    const holdAction = this._config.entities[key]?.hold_action || { action: 'more-info', navigation_path: '' };
    return html`
      <fieldset class="sub-button-action">
        <legend>Action</legend>
        <div class="sub-button-tap">
          <label>Tap:</label>
          <select @change="${this._updateEntityTapAction(key, 'action')}" .value="${tapAction.action}">
            <option value="toggle">Toggle</option>
            <option value="more-info">More Info</option>
            <option value="navigate">Navigate</option>
            <option value="call-service">Call Service</option>
            <option value="none">None</option>
          </select>
          ${tapAction.action === 'navigate' ? html`
            <label>Navigation Path:
              <input type="text" .value="${tapAction.navigation_path || ''}" @input="${this._updateEntityTapAction(key, 'navigation_path')}" />
            </label>
          ` : ''}
          ${tapAction.action === 'call-service' ? html`
            <label>Service:
              <input type="text" .value="${tapAction.service || ''}" @input="${this._updateEntityTapAction(key, 'service')}" />
            </label>
            <label>Service Data (JSON):
              <textarea .value="${tapAction.service_data ? JSON.stringify(tapAction.service_data) : ''}" @input="${this._updateEntityTapAction(key, 'service_data')}"></textarea>
            </label>
          ` : ''}
        </div>
        <div class="sub-button-hold">
          <label>Hold:</label>
          <select @change="${this._updateEntityHoldAction(key, 'action')}" .value="${holdAction.action}">
            <option value="more-info">More Info</option>
            <option value="toggle">Toggle</option>
            <option value="navigate">Navigate</option>
            <option value="call-service">Call Service</option>
            <option value="none">None</option>
          </select>
          ${holdAction.action === 'navigate' ? html`
            <label>Navigation Path:
              <input type="text" .value="${holdAction.navigation_path || ''}" @input="${this._updateEntityHoldAction(key, 'navigation_path')}" />
            </label>
          ` : ''}
          ${holdAction.action === 'call-service' ? html`
            <label>Service:
              <input type="text" .value="${holdAction.service || ''}" @input="${this._updateEntityHoldAction(key, 'service')}" />
            </label>
            <label>Service Data (JSON):
              <textarea .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}" @input="${this._updateEntityHoldAction(key, 'service_data')}"></textarea>
            </label>
          ` : ''}
        </div>
      </fieldset>
    `;
  }

  // Helper per renderizzare la configurazione di un SUB-BUTTON
  _renderSubButton(key) {
    let label;
    switch(key) {
      case "sub-button1": label = "Sub-button1"; break;
      case "sub-button2": label = "Sub-button2"; break;
      case "sub-button3": label = "Sub-button3"; break;
      case "sub-button4": label = "Sub-button4"; break;
      default: label = key;
    }
    return html`
      <div class="sub-button-config">
        <h4>${label}</h4>
        ${this._renderEntityInput("Entità (ID)", key)}
        ${this._renderIconInput("Icona", key)}
        ${this._renderSubButtonAction(key)}
      </div>
      <hr />
    `;
  }

  render() {
    if (!this._config) {
      return html`<div>Caricamento configurazione...</div>`;
    }
    
    return html`
      <div>
        <h3>Editor Visuale Bubble Room</h3>
        
        <!-- Fieldset ROOM -->
        <fieldset>
          <legend>ROOM</legend>
          <label>
            Nome della Room:
            <input type="text" .value="${this._config.name || ''}" @input="${this._updateName}" />
          </label>
          <label>
            Icona principale:
            <input type="text" .value="${this._config.icon || ''}" list="icon-list" @input="${this._updateIcon}" />
          </label>
          ${this._renderRoomAction()}
          ${this._renderEntityInput("Presence (ID)", "presence")}
        </fieldset>
        
        <!-- Fieldset SUB-BUTTON -->
        <fieldset>
          <legend>SUB-BUTTON</legend>
          ${this._renderSubButton("sub-button1")}
          ${this._renderSubButton("sub-button2")}
          ${this._renderSubButton("sub-button3")}
          ${this._renderSubButton("sub-button4")}
        </fieldset>
        
        <!-- Fieldset Mushroom Templates -->
        <fieldset>
          <legend>Mushroom Templates</legend>
          ${this._renderEntityInput("Entities1 (ID)", "entities1")}
          ${this._renderIconInput("Entities1 Icona", "entities1")}
          ${this._renderEntityInput("Entities2 (ID)", "entities2")}
          ${this._renderIconInput("Entities2 Icona", "entities2")}
          ${this._renderEntityInput("Entities3 (ID)", "entities3")}
          ${this._renderIconInput("Entities3 Icona", "entities3")}
          ${this._renderEntityInput("Entities4 (ID)", "entities4")}
          ${this._renderIconInput("Entities4 Icona", "entities4")}
          ${this._renderEntityInput("Entities5 (ID)", "entities5")}
          ${this._renderIconInput("Entities5 Icona", "entities5")}
        </fieldset>
        
        <!-- Fieldset Clima -->
        <fieldset>
          <legend>Clima</legend>
          ${this._renderEntityInput("Climate (ID)", "climate")}
          <label>
            Sensore Temperatura:
            <input type="text"
                   .value="${this._config.entities?.temperatura?.sensore_temperatura || ''}"
                   list="entity-list"
                   @input="${this._updateTemperature('sensore_temperatura')}" />
          </label>
          <label>
            Sensore Umidità:
            <input type="text"
                   .value="${this._config.entities?.temperatura?.sensore_umitidà || ''}"
                   list="entity-list"
                   @input="${this._updateTemperature('sensore_umitidà')}" />
          </label>
        </fieldset>
        
        <!-- Fieldset Colori -->
        <fieldset>
          <legend>Colori</legend>
          <label>
            Active:
            <input type="text" .value="${(this._config.colors && this._config.colors.active) || ''}" @input="${this._updateColor('active')}" />
          </label>
          <label>
            Inactive:
            <input type="text" .value="${(this._config.colors && this._config.colors.inactive) || ''}" @input="${this._updateColor('inactive')}" />
          </label>
          <label>
            Background Active:
            <input type="text" .value="${(this._config.colors && this._config.colors.backgroundActive) || ''}" @input="${this._updateColor('backgroundActive')}" />
          </label>
          <label>
            Background Inactive:
            <input type="text" .value="${(this._config.colors && this._config.colors.backgroundInactive) || ''}" @input="${this._updateColor('backgroundInactive')}" />
          </label>
        </fieldset>
        
        <datalist id="entity-list">
          ${this.hass ? Object.keys(this.hass.entities).map(entityId => html`<option value="${entityId}"></option>`) : ''}
        </datalist>
        <datalist id="icon-list">
          ${this._defaultIconList().map(icon => html`<option value="${icon}"></option>`)}
        </datalist>
        <p>
          Nota: I mushroom templates hanno posizioni fisse e le azioni di default per le entità (eccetto per Presence) sono: tap: toggle, hold: more-info.
          Per configurazioni avanzate, modifica direttamente il YAML.
        </p>
      </div>
    `;
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);