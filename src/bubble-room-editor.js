import { LitElement, html, css, nothing } from 'lit';

class BubbleRoomEditor extends LitElement {
  static get properties() {
    return {
      _config: { type: Object },
      hass: { type: Object },
    };
  }

  static get SENSOR_TYPES() {
    return [
      { id: 'temperature', name: 'Temperature', icon: '🌡️', units: ['°C', '°F'] },
      { id: 'humidity', name: 'Humidity', icon: '💦', units: ['%'] },
      { id: 'light', name: 'Light', icon: '💡', units: ['lx'] },
      { id: 'co2', name: 'CO2', icon: '🌫️', units: ['ppm'] },
      { id: 'pressure', name: 'Pressure', icon: '⏲️', units: ['hPa', 'mmHg'] },
      { id: 'uv', name: 'UV Index', icon: '☀️', units: [''] },
      { id: 'noise', name: 'Noise', icon: '🔊', units: ['dB'] },
      { id: 'pm25', name: 'PM2.5', icon: '💨', units: ['µg/m³'] },
      { id: 'pm10', name: 'PM10', icon: '💨', units: ['µg/m³'] },
      { id: 'voc', name: 'VOC', icon: '🌡️', units: ['ppb'] },
      { id: 'custom', name: 'Custom', icon: '🔧', units: [] }
    ];
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
        camera: { entity: 'camera.front_door', icon: 'mdi:camera', tap_action: { action: 'more-info' } },
        sensors: [
          {
            type: 'temperature',
            entity: 'sensor.vindstyrka_salotto_temperature',
            unit: '°C'
          },
          {
            type: 'humidity',
            entity: 'sensor.vindstyrka_salotto_humidity'
          },
          {},
          {}
        ]
      },
      colors: {
        active: 'var(--primary-color)',
        inactive: 'var(--secondary-text-color)',
        backgroundActive: 'color-mix(in srgb, var(--primary-color) 85%, transparent)',
        backgroundInactive: 'var(--card-background-color)'
      },
      name: 'Salotto',
      icon: 'mdi:sofa',
      tap_action: { action: 'navigate', navigation_path: '/lovelace/sala' },
      hold_action: { action: 'more-info' }
    };
  }

  setConfig(config) {
      // Creiamo una copia profonda per evitare problemi con oggetti non estensibili
    const newConfig = config ? JSON.parse(JSON.stringify(config)) : {};
    
    if (!newConfig.entities) newConfig.entities = {};
    if (!newConfig.colors) newConfig.colors = {};
    if (!config) config = {};
    if (!config.entities) config.entities = {};
    if (!config.colors) config.colors = {};

    // Migrate old temperature config to new sensors array
    if (config.entities.temperature && !config.entities.sensors) {
      config.entities.sensors = [];
      
      if (config.entities.temperature.temperature_sensor) {
        config.entities.sensors.push({
          type: 'temperature',
          entity: config.entities.temperature.temperature_sensor,
          unit: config.entities.temperature.unit || '°C'
        });
      }
      
      if (config.entities.temperature.humidity_sensor) {
        config.entities.sensors.push({
          type: 'humidity',
          entity: config.entities.temperature.humidity_sensor
        });
      }
      
      delete config.entities.temperature;
    }
    
    // Ensure sensors array exists and has 4 slots
    if (!config.entities.sensors) {
      config.entities.sensors = Array(4).fill().map(() => ({}));
    } else {
      // Fill up to 4 sensors
      while (config.entities.sensors.length < 4) {
        config.entities.sensors.push({});
      }
      // Trim to 4 sensors if more were configured
      config.entities.sensors = config.entities.sensors.slice(0, 4);
    }

    this._config = {
      ...config,
      colors: {
        active: config.colors.active || 'var(--primary-color)',
        inactive: config.colors.inactive || 'var(--secondary-text-color)',
        backgroundActive: config.colors.backgroundActive || 'color-mix(in srgb, var(--primary-color) 85%, transparent)',
        backgroundInactive: config.colors.backgroundInactive || 'var(--card-background-color)'
      },
      tap_action: config.tap_action || { action: 'navigate', navigation_path: '' },
      hold_action: config.hold_action || { action: 'more-info' }
    };
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
      ha-expansion-panel div[slot="header"] {
        background-color: var(--slider-bar-color);
        color: var(--text-primary-color);
        padding: 8px;
        font-weight: bold;
        border-radius: 4px;
        margin-bottom: 4px;
      }
      .section-content {
        padding: 16px;
        background-color: var(--card-background-color);
        border-radius: 4px;
        margin-bottom: 16px;
      }
      .input-group {
        margin-bottom: 16px;
      }
      label {
        display: block;
        margin-bottom: 4px;
        font-weight: 600;
        color: var(--primary-text-color);
      }
      input, textarea, select {
        width: 100%;
        box-sizing: border-box;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid var(--divider-color);
        background-color: var(--card-background-color);
        color: var(--primary-text-color);
      }
      .note {
        margin-top: 4px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
      .sensor-panel, .subbutton-panel {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--divider-color);
      }
      h4 {
        margin: 0 0 12px 0;
        color: var(--primary-text-color);
      }
    `;
  }

  render() {
    if (!this._config) {
      return html`<div>Loading configuration...</div>`;
    }

    return html`
      <div class="editor-header">
        <h3>Bubble Room Editor</h3>
      </div>

      <ha-expansion-panel>
        <div slot="header">Room Settings</div>
        <div class="section-content">
          <div class="input-group">
            <label>Room name:</label>
            <input
              type="text"
              .value="${this._config.name || ''}"
              @input="${this._updateConfig('name')}"
            />
          </div>
          <div class="input-group">
            <label>Main icon:</label>
            <input
              type="text"
              .value="${this._config.icon || ''}"
              @input="${this._updateConfig('icon')}"
              list="icon-list"
            />
            <datalist id="icon-list">
              ${['mdi:sofa', 'mdi:home', 'mdi:bed', 'mdi:office-building', 'mdi:kitchen', 
                 'mdi:lightbulb', 'mdi:fan', 'mdi:thermostat'].map(icon => 
                html`<option value="${icon}"></option>`
              )}
            </datalist>
          </div>
          ${this._renderActionInput('tap_action', 'Tap Action')}
          ${this._renderActionInput('hold_action', 'Hold Action')}
          ${this._renderEntityInput('presence', 'Presence Sensor')}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel>
        <div slot="header">Sub Buttons</div>
        <div class="section-content">
          ${this._renderSubButtonPanel('sub-button1', 'Sub Button 1')}
          ${this._renderSubButtonPanel('sub-button2', 'Sub Button 2')}
          ${this._renderSubButtonPanel('sub-button3', 'Sub Button 3')}
          ${this._renderSubButtonPanel('sub-button4', 'Sub Button 4')}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel>
        <div slot="header">Environmental Sensors</div>
        <div class="section-content">
          ${this._config.entities.sensors.map((sensor, index) => 
            this._renderSensorPanel(sensor, index)
          )}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel>
        <div slot="header">Other Entities</div>
        <div class="section-content">
          ${this._renderEntityInput('climate', 'Climate Entity')}
          ${this._renderIconInput('climate', 'Climate Icon')}
          ${this._renderActionInput('climate.tap_action', 'Climate Tap Action')}
          
          ${this._renderEntityInput('camera', 'Camera Entity')}
          ${this._renderIconInput('camera', 'Camera Icon')}
          ${this._renderActionInput('camera.tap_action', 'Camera Tap Action')}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel>
        <div slot="header">Colors</div>
        <div class="section-content">
          ${this._renderColorInput('active', 'Active Color')}
          ${this._renderColorInput('inactive', 'Inactive Color')}
          ${this._renderColorInput('backgroundActive', 'Active Background')}
          ${this._renderColorInput('backgroundInactive', 'Inactive Background')}
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderSensorPanel(sensor, index) {
    const type = sensor.type || 'none';
    const sensorType = BubbleRoomEditor.SENSOR_TYPES.find(t => t.id === type);
    
    return html`
      <div class="sensor-panel">
        <h4>Sensor ${index + 1}</h4>
        
        <div class="input-group">
          <label>Type:</label>
          <select
            .value="${type}"
            @change="${this._updateSensor(index, 'type')}"
          >
            <option value="none">Disabled</option>
            ${BubbleRoomEditor.SENSOR_TYPES.map(t => 
              html`<option value="${t.id}">${t.icon} ${t.name}</option>`
            )}
          </select>
        </div>
        
        ${type !== 'none' ? html`
          <div class="input-group">
            <label>Entity:</label>
            <input
              type="text"
              .value="${sensor.entity || ''}"
              @input="${this._updateSensor(index, 'entity')}"
              list="entity-list"
            />
            <datalist id="entity-list">
              ${this.hass ? Object.keys(this.hass.states).map(
                entityId => html`<option value="${entityId}"></option>`
              ) : nothing}
            </datalist>
          </div>
          
          ${this._renderUnitSelector(sensor, index)}
          
          <div class="input-group">
            <label>Custom Icon (optional):</label>
            <input
              type="text"
              .value="${sensor.customIcon || ''}"
              @input="${this._updateSensor(index, 'customIcon')}"
              placeholder="Leave empty for default"
              list="icon-list"
            />
          </div>
        ` : nothing}
      </div>
    `;
  }

  _renderUnitSelector(sensor, index) {
    const sensorType = BubbleRoomEditor.SENSOR_TYPES.find(t => t.id === sensor.type);
    if (!sensorType || sensorType.units.length === 0) return nothing;
    
    if (sensorType.units.length === 1) {
      return html`
        <div class="input-group">
          <label>Unit:</label>
          <input type="text" .value="${sensorType.units[0]}" disabled />
          <input type="hidden"
            .value="${sensorType.units[0]}"
            @change="${this._updateSensor(index, 'unit')}"
          />
        </div>
      `;
    }
    
    return html`
      <div class="input-group">
        <label>Unit:</label>
        <select
          .value="${sensor.unit || sensorType.units[0]}"
          @change="${this._updateSensor(index, 'unit')}"
        >
          ${sensorType.units.map(u => html`<option value="${u}">${u}</option>`)}
        </select>
      </div>
    `;
  }

  _renderSubButtonPanel(key, label) {
    const button = this._config.entities[key] || {};
    return html`
      <div class="subbutton-panel">
        <h4>${label}</h4>
        ${this._renderEntityInput(key, 'Entity')}
        ${this._renderIconInput(key, 'Icon')}
        ${this._renderActionInput(`${key}.tap_action`, 'Tap Action')}
        ${this._renderActionInput(`${key}.hold_action`, 'Hold Action')}
      </div>
    `;
  }

  _renderEntityInput(key, label) {
    const path = key.split('.');
    let value = this._config.entities;
    for (const p of path) {
      value = value?.[p];
      if (value === undefined) break;
    }
    
    return html`
      <div class="input-group">
        <label>${label}:</label>
        <input
          type="text"
          .value="${value || ''}"
          @input="${this._updateEntity(key)}"
          list="entity-list"
        />
      </div>
    `;
  }

  _renderIconInput(key, label) {
    const path = key.split('.');
    let value = this._config.entities;
    for (const p of path) {
      value = value?.[p];
      if (value === undefined) break;
    }
    
    return html`
      <div class="input-group">
        <label>${label}:</label>
        <input
          type="text"
          .value="${value || ''}"
          @input="${this._updateEntity(key)}"
          list="icon-list"
        />
      </div>
    `;
  }

  _renderColorInput(key, label) {
    const value = this._config.colors?.[key] || '';
    return html`
      <div class="input-group">
        <label>${label}:</label>
        <input
          type="text"
          .value="${value}"
          @input="${this._updateColor(key)}"
          placeholder="CSS color value or variable"
        />
      </div>
    `;
  }

  _renderActionInput(key, label) {
    const path = key.split('.');
    let action = this._config.entities;
    for (const p of path) {
      action = action?.[p];
      if (action === undefined) break;
    }
    
    if (!action) {
      action = { action: 'none' };
    }

    return html`
      <div class="input-group">
        <label>${label}:</label>
        <select
          .value="${action.action || 'none'}"
          @change="${this._updateAction(key, 'action')}"
        >
          <option value="none">None</option>
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
        </select>

        ${action.action === 'navigate' ? html`
          <div class="input-group">
            <label>Navigation Path:</label>
            <input
              type="text"
              .value="${action.navigation_path || ''}"
              @input="${this._updateAction(key, 'navigation_path')}"
            />
          </div>
        ` : nothing}

        ${action.action === 'call-service' ? html`
          <div class="input-group">
            <label>Service:</label>
            <input
              type="text"
              .value="${action.service || ''}"
              @input="${this._updateAction(key, 'service')}"
              placeholder="domain.service"
            />
          </div>
          <div class="input-group">
            <label>Service Data (JSON):</label>
            <textarea
              .value="${action.service_data ? JSON.stringify(action.service_data, null, 2) : ''}"
              @input="${this._updateAction(key, 'service_data')}"
              rows="3"
            ></textarea>
          </div>
        ` : nothing}
      </div>
    `;
  }

  _updateConfig(field) {
    return (e) => {
      this._config = { ...this._config, [field]: e.target.value };
      this._fireConfigChanged();
    };
  }

  _updateColor(key) {
    return (e) => {
      const colors = { ...this._config.colors, [key]: e.target.value };
      this._config = { ...this._config, colors };
      this._fireConfigChanged();
    };
  }

  _updateEntity(key) {
    return (e) => {
      const path = key.split('.');
      const value = e.target.value;
      let entities = { ...this._config.entities };
      let current = entities;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      this._config = { ...this._config, entities };
      this._fireConfigChanged();
    };
  }

  _updateSensor(index, field) {
    return (e) => {
      const sensors = [...this._config.entities.sensors];
      sensors[index] = { ...sensors[index], [field]: e.target.value };
      
      // Reset some fields when type changes
      if (field === 'type' && e.target.value !== sensors[index].type) {
        sensors[index] = { type: e.target.value };
      }
      
      const entities = { ...this._config.entities, sensors };
      this._config = { ...this._config, entities };
      this._fireConfigChanged();
    };
  }

  _updateAction(key, field) {
    return (e) => {
      const path = key.split('.');
      let value = e.target.value;
      
      if (field === 'service_data') {
        try {
          value = JSON.parse(e.target.value);
        } catch (e) {
          console.warn('Invalid JSON for service_data');
          return;
        }
      }
      
      let entities = { ...this._config.entities };
      let current = entities;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      
      if (!current[path[path.length - 1]]) {
        current[path[path.length - 1]] = {};
      }
      
      current[path[path.length - 1]] = { 
        ...current[path[path.length - 1]], 
        [field]: value 
      };
      
      this._config = { ...this._config, entities };
      this._fireConfigChanged();
    };
  }

  _fireConfigChanged() {
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);