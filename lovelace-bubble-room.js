import { LitElement, css, html } from 'https://unpkg.com/lit@2.6.1/index.js?module';

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
  temperature: { emoji: '🌡️', unitC: '°C', unitF: '°F' },
  humidity:    { emoji: '💦', unit: '%' },
  co2:         { emoji: '🟢', unit: 'ppm' },
  illuminance: { emoji: '☀️', unit: 'lx' },
  pm1:         { emoji: '🟤', unit: 'µg/m³' },
  pm25:        { emoji: '⚫️', unit: 'µg/m³' },
  pm10:        { emoji: '⚪️', unit: 'µg/m³' },
  uv:          { emoji: '🌞', unit: 'UV' },
  noise:       { emoji: '🔊', unit: 'dB' },
  pressure:    { emoji: '📈', unit: 'hPa' },
  voc:         { emoji: '🧪', unit: 'ppb' }
};

class BubbleRoom extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object },
    };
  }
  // Supporto all'editor visivo
  static async getConfigElement() {
    await Promise.resolve().then(function () { return bubbleRoomEditor; });
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
      },
      colors: {
        room: {
          color_active: 'rgba(var(--color-green), 1)',
          color_inactive: 'rgba(var(--color-green), 0.3)',
          icon_active: 'orange',
          icon_inactive: '#80808055',
        },
        subbutton: {
          color_on: 'rgba(var(--color-blue), 1)',
          color_off: 'rgba(var(--color-blue), 0.3)',
          icon_on: 'yellow',
          icon_off: '#666'
        }
      },
      name: 'Salotto',
      icon: 'mdi:sofa',
      tap_action: { action: 'navigate', navigation_path: '/lovelace/sala' }
    };
  }

  setConfig(config) {
    config = JSON.parse(JSON.stringify(config));
    if (!config || typeof config !== 'object' || Array.isArray(config)) throw new Error("La configurazione deve essere un oggetto valido.");
    if (!config.entities || typeof config.entities !== 'object') throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");

    const keysWithIcon = [
      'presence', 'sub-button1', 'sub-button2', 'sub-button3', 'sub-button4',
      'entities1', 'entities2', 'entities3', 'entities4', 'entities5', 'climate'
    ];
    const defaultAction = { tap_action: { action: 'toggle' }, hold_action: { action: 'more-info' } };
    const defaultIcons = {
      'sub-button1': 'mdi:lightbulb',
      'sub-button2': 'mdi:fan',
      'sub-button3': 'mdi:play-circle',
      'sub-button4': 'mdi:robot-vacuum',
      'entities1': 'mdi:information-outline',
      'entities2': 'mdi:information-outline',
      'entities3': 'mdi:information-outline',
      'entities4': 'mdi:information-outline',
      'entities5': 'mdi:information-outline',
      'presence': 'mdi:account',
      'climate': 'mdi:thermostat',
      'camera': 'mdi:cctv',
    };

    const entities = {};
    for (const key in config.entities) {
      let value = config.entities[key];
      if (['entities1','entities2','entities3','entities4','entities5'].includes(key)) {
        if (value && typeof value === 'object' && Object.keys(value).some(k => /^\d+$/.test(k))) {
          let newValue = {};
          for (const prop in value) if (!/^\d+$/.test(prop)) newValue[prop] = value[prop];
          const numericKeys = Object.keys(value).filter(k => /^\d+$/.test(k));
          if (numericKeys.length > 0) {
            newValue.entity = numericKeys.sort((a, b) => Number(a) - Number(b)).map(k => value[k]).join("");
          }
          value = newValue;
        }
      }
      if (key === 'climate' && typeof value === 'string') value = { entity: value, icon: defaultIcons['climate'], ...defaultAction };
      if (typeof value === 'string') {
        if (keysWithIcon.includes(key)) {
          if (key === 'presence') entities[key] = { entity: value, icon: defaultIcons[key] };
          else entities[key] = { entity: value, icon: defaultIcons[key], ...defaultAction };
        } else entities[key] = value;
      } else if (typeof value === 'object') {
        if (keysWithIcon.includes(key)) {
          if (!value.icon) value.icon = defaultIcons[key];
          if (['entities1','entities2','entities3','entities4','entities5','camera'].includes(key) && !value.style) {
            let index = key === 'camera' ? 6 : parseInt(key.replace('entities','')) - 1;
            value.style = this._defaultMushroomStyle(index);
          }
          if (key === 'presence') entities[key] = { ...value };
          else entities[key] = { ...defaultAction, ...value };
        } else entities[key] = value;
      }
    }
    this.config = {
      entities,
      layout_mode: config.layout_mode || '6x3',
      colors: {
        room: {
          color_active: 'rgba(var(--color-green), 1)',
          color_inactive: 'rgba(var(--color-green), 0.3)',
          icon_on: 'orange',
          icon_off: '#80808055',
          ...(config.colors?.room || {})
        },
        subbutton: {
          color_on: 'rgba(var(--color-blue), 1)',
          color_off: 'rgba(var(--color-blue), 0.3)',
          icon_on: 'yellow',
          icon_off: '#666',
          ...(config.colors?.subbutton || {})
        }
      },
      name: config.name || "Salotto",
      icon: config.icon || "mdi:sofa",
      tap_action: config.tap_action || { action: 'navigate', navigation_path: '' }
    };
  }

  getConfig() { return JSON.parse(JSON.stringify(this.config)); }

  _defaultMushroomStyle(index) {
    switch (index) {
      case 0: return "top: -82px; left: 0px;";
      case 1: return "top: -87px; left: 43px;";
      case 2: return "top: -67px; left: 80px;";
      case 3: return "bottom: 42px; left: 98px;";
      case 4: return "bottom: 0px; left: 90px;";
      case 5: return "bottom: -2px; left: -2px;";
      case 6: return "top: -140px; left: 15px;";
      default: return "";
    }
  }

  static get styles() {
    return css`
      *, *::before, *::after { box-sizing: border-box; }
      :host {
        display: block;
        --card-height: 190px;
        --card-background: black;
        --bubble-bg: gray;
        font-family: sans-serif;
      }
      ha-card {
        display: block;
        margin: 0;
        padding: 0 !important;
        background: transparent !important;
        height: var(--card-height);
      }
      .card {
        position: relative;
        width: 100%;
        height: 190px;
        border-radius: 8px;
        overflow: hidden;
      }
      .grid-container {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-areas:
          ". . . b"
          "n n n b"
          "i i . b"
          "i i . b";
      }
      .name-area {
        position: absolute;
        font-weight: bold;
      }
      .icon-area {
        grid-area: i;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .bubble-icon-container {
        position: absolute;
        cursor: pointer;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -39px;
        left: -40px;
      }
      .bubble-icon {
        position: absolute;
        top: 15%;
        left: 25%;
        width: 50% 
        --mdc-icon-size: 90px 
        opacity: 0.5
      }
      .bubble-sub-button-container {
        grid-area: b;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-self: stretch;
        align-self: stretch;
        width: 100%;
      }
      .bubble-sub-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-width: 38px;
        max-width: 100%;
        height: var(--sub-button-height, 48px);
        border-radius: 10px;
        margin: 5px 0 0 0;
        cursor: pointer;
        background-color: var(--sub-button-color);
        transition: width 0.2s;
      }
      @media (max-width: 480px) {
        .bubble-sub-button {
          min-width: 32px;
          max-width: 44px;
          border-radius: 12px;
          padding: 0;
        }
      }
      .mushroom-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        pointer-events: none;
        z-index: 2;
      }
      .mushroom-item {
        position: absolute;
        pointer-events: auto;
        cursor: pointer;
      }
      .mushroom-primary {
        pointer-events: auto;
        white-space: nowrap;

      }
    `;
  }

  render() {
    const layout = this._getLayoutStyle(this.config.layout_mode || "6x3");
    if (!this.config || !this.hass) {
      return html`<div>Loading...</div>`;
    }
    const { entities } = this.config;
    const sensorStrings = [];

    for (let i = 1; i <= 4; i++) {
      const sensorKey = `sensor${i}`;
      const sensor = this.config.entities[sensorKey];
      if (!sensor || !sensor.type) continue;
      const entityId = sensor.entity;
      let state = entityId ? (this.hass.states[entityId]?.state || 'N/A') : '?';
      if (!isNaN(parseFloat(state))) state = Math.floor(parseFloat(state)).toString();
      const { emoji, unit } = this._getSensorEmojiAndUnit(sensor.type, sensor.unit);
      sensorStrings.push(`${emoji} ${state}${unit}`);
    }
    const { colors, name, icon } = this.config;
    const roomColors = colors?.room || {};
    const subColors = colors?.subbutton || {};
    const hass = this.hass;
    const presenceState = hass.states[entities.presence.entity]?.state || 'off';
    const extractAlpha = (rgba) => {
      const match = rgba?.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([^)]+)\)/);
      return match ? parseFloat(match[1]) : 1;
    };
    const sensorOpacity = presenceState === 'on'
      ? extractAlpha(roomColors.background_active || 'rgba(0,128,0,1)')
      : extractAlpha(roomColors.background_inactive || 'rgba(0,128,0,0.3)');
    const bubbleBg = presenceState === 'on'
      ? roomColors.background_active || 'rgba(0,128,0,0.5)'
      : roomColors.background_inactive || 'rgba(0,128,0,0.3)';
    const nameColor = bubbleBg;
    const bubbleIconColor = presenceState === 'on'
      ? roomColors.icon_active || 'orange'
      : roomColors.icon_inactive || '#80808055';

    const subButtons = [
      entities["sub-button1"],
      entities["sub-button2"],
      entities["sub-button3"],
      entities["sub-button4"],
    ];

    let mushroomTemplates = [
      entities.entities1,
      entities.entities2,
      entities.entities3,
      entities.entities4,
      entities.entities5
    ];
    if (entities.climate) mushroomTemplates.push(entities.climate);
    if (entities.camera) mushroomTemplates.push(entities.camera);

    return html`
      <div class="card" style="height: ${layout.cardHeight};">
        <div class="grid-container"
            style="
              grid-template-areas: ${layout.gridTemplate};
              grid-template-columns: ${layout.gridColumns};
              grid-template-rows: ${layout.gridRows};
            ">
          <!-- Nome stanza -->
          <div class="name-area"
              style="
                color: ${nameColor};
                font-size: ${layout.nameFont};
                position: absolute;
                top: ${layout.nameTop};
                left: ${layout.nameLeft};
              ">
            ${name}
          </div>
  
          <!-- Icona principale -->
          <div class="icon-area">
            <div class="bubble-icon-container"
                style="
                  background-color: ${bubbleBg};
                  ${this._getIconShapeStyle(this.config.layout_mode)}
                "
                 @pointerdown="${(e) => this._startHold(e, this.config)}"
                 @pointerup="${(e) => this._endHold(e, this.config, () => this._handleMainIconTap())}"
                 @pointerleave="${(e) => this._cancelHold(e)}">
              <ha-icon class="bubble-icon"
                      icon="${this._getBestIcon(this.config.entities.presence?.entity, { icon: icon })}"
                      style="
                        color: ${bubbleIconColor};
                        --mdc-icon-size: ${layout.iconSize};
                        width: ${layout.iconSize};
                        height: ${layout.iconSize};
                        position: absolute;
                        top: ${layout.iconTop || '15%'};
                        left: ${layout.iconLeft || '25%'};
                      ">
              </ha-icon>
            </div>
  
            <!-- Mushroom templates -->
            <div class="mushroom-container">
            ${mushroomTemplates.map((item, index) => {
              if (!item) return html``;
              const style = layout.mushroomPositions[index] || this._defaultMushroomStyle(index);
            
              let mushroomSize = layout.mushroomSize;
            
              // Penultimo = climate, ultimo = camera (se presenti)
              if (entities.climate && index === mushroomTemplates.length - (entities.camera ? 2 : 1)) {
                mushroomSize = layout.mushroomSizeSmall;
              }
              if (entities.camera && index === mushroomTemplates.length - 1) {
                mushroomSize = layout.mushroomSizeSmall;
              }
      
            
              const state = hass.states[item.entity]?.state || 'off';
              const iconColor = state === 'on'
                ? (roomColors.mushroom_active || 'orange')
                : (roomColors.mushroom_inactive || '#80808055');
            
              return html`
                <div class="mushroom-item"
                    style="${style}"
                    @pointerdown="${(e) => this._startHold(e, item)}"
                    @pointerup="${(e) => this._endHold(e, item, () => this._handleMushroomTap(item))}"
                    @pointerleave="${(e) => this._cancelHold(e)}">
                  <ha-icon icon="${this._getBestIcon(item.entity, item)}"
                          style="color: ${iconColor}; --mdc-icon-size: ${mushroomSize}; width: ${mushroomSize}; height: ${mushroomSize};">
                  </ha-icon>
                </div>
              `;
            })}
            
            
            
            ${sensorStrings.length > 0 ? html`
              <div class="mushroom-item"
                  style="${layout.mushroomPositions[7]}; font-size: ${layout.sensorFontSize};"
                  title="Environmental Sensors">
                <div class="mushroom-primary"
                    style="
                      font-size: ${layout.sensorFontSize};
                      color: white;
                      font-weight: bold;
                      text-align: center;
                      line-height: 1.2;
                      text-shadow: 0 0 3px black;
                      padding: 4px 6px;
                      border-radius: 6px;
                      opacity: ${sensorOpacity};
                    ">
                  ${sensorStrings.join(' ')}
                </div>
              </div>
            ` : ''}
            </div>
          </div>
  
          <!-- Sub-button -->
          <div class="bubble-sub-button-container">
            ${subButtons.map(btn => {
              if (!btn) return html``;
              const state = hass.states[btn.entity]?.state || 'off';
              const btnColor = state === 'on'
                ? subColors.background_on || 'rgba(0,0,255,1)'
                : subColors.background_off || 'rgba(0,0,255,0.3)';
              const iconColor = state === 'on'
                ? subColors.icon_on || 'yellow'
                : subColors.icon_off || '#666';
              return html`
                <div class="bubble-sub-button"
                    style="
                      --sub-button-color: ${btnColor};
                      --sub-button-height: ${layout.subButtonHeight};
                    "
                     @pointerdown="${(e) => this._startHold(e, btn)}"
                     @pointerup="${(e) => this._endHold(e, btn, () => this._handleSubButtonTap(btn))}"
                     @pointerleave="${(e) => this._cancelHold(e)}">
                  <ha-icon icon="${this._getBestIcon(btn.entity, btn)}"
                          style="color: ${iconColor}; --mdc-icon-size: ${layout.mushroomSize}; width: ${layout.mushroomSize}; height: ${layout.mushroomSize};">
                  </ha-icon>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  // ... (resta invariato: funzioni hold/tap, getIcon, _getDeviceClassIcon, ecc.)

  _startHold(e, item) { e.stopPropagation(); this._holdTriggered = false; this._holdTimeout = setTimeout(() => { this._holdTriggered = true; this._handleHoldAction(item); }, 500);}
  _endHold(e, item, clickCallback) { e.stopPropagation(); clearTimeout(this._holdTimeout); if (!this._holdTriggered) clickCallback(); this._holdTriggered = false; }
  _cancelHold(e) { clearTimeout(this._holdTimeout); this._holdTriggered = false; }
  _handleMainIconTap() { if (!this.config.tap_action) return; const action = this.config.tap_action.action; if (action === 'toggle') this._toggleEntity(this.config.entity); else if (action === 'more-info') this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: this.config.entity }, bubbles: true, composed: true, })); else if (action === 'navigate') { if (this.config.tap_action.navigation_path) { window.history.pushState({}, '', this.config.tap_action.navigation_path); window.dispatchEvent(new Event('location-changed')); } } }
  _toggleEntity(entity) { if (!this.hass) return; this.hass.callService('homeassistant', 'toggle', { entity_id: entity }); }
  _handleHoldAction(item) { if (!item.hold_action) { this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: item.entity }, bubbles: true, composed: true, })); return; } const action = item.hold_action.action; switch (action) { case 'more-info': this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: item.entity }, bubbles: true, composed: true, })); break; case 'toggle': this._toggleEntity(item.entity); break; case 'call-service': if (item.hold_action.service) { const [domain, serviceName] = item.hold_action.service.split('.'); const serviceData = item.hold_action.service_data || {}; if (!serviceData.entity_id) { serviceData.entity_id = item.entity; } this.hass.callService(domain, serviceName, serviceData); } break; case 'navigate': if (item.hold_action.navigation_path) { window.history.pushState({}, '', item.hold_action.navigation_path); window.dispatchEvent(new Event('location-changed')); } break; }}
  _handleSubButtonTap(item) { if (!item.tap_action || item.tap_action.action === 'none') return; const action = item.tap_action.action; if (action === 'toggle') this._toggleEntity(item.entity); else if (action === 'more-info') this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: item.entity }, bubbles: true, composed: true, })); else if (action === 'navigate') { if (item.tap_action.navigation_path) { window.history.pushState({}, '', item.tap_action.navigation_path); window.dispatchEvent(new Event('location-changed')); } } }
  _handleMushroomTap(item) { if (!item.tap_action || item.tap_action.action === 'none') return; const action = item.tap_action.action; if (action === 'toggle') this._toggleEntity(item.entity); else if (action === 'more-info') this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: item.entity }, bubbles: true, composed: true, })); else if (action === 'navigate') { if (item.tap_action.navigation_path) { window.history.pushState({}, '', item.tap_action.navigation_path); window.dispatchEvent(new Event('location-changed')); } } }
  _getBestIcon(entityId, entityConf) {
    // 1. Se la config ha una icona, usala!
    if (entityConf.icon) return entityConf.icon;
  
    // 2. Se lo stato dell’entità esiste e ha una icona, usala!
    const stateObj = this.hass?.states?.[entityId];
    if (stateObj && stateObj.attributes && stateObj.attributes.icon) {
      return stateObj.attributes.icon;
    }
  
    // 3. Prova con device_class (tipo sensore specifico)
    const deviceClass = stateObj?.attributes?.device_class;
    const domain = entityId ? entityId.split('.')[0] : '';
    const state = stateObj?.state;
  
    if (deviceClass) {
      const dcIcon = this._getDeviceClassIcon(deviceClass, state);
      if (dcIcon) return dcIcon;
    }
  
    // 4. Fallback per dominio
    return this._getDomainDefaultIcon(domain, state) || 'mdi:information-outline';
  }  
  _getDeviceClassIcon(deviceClass, state) { const icons = DEVICE_CLASS_ICON_MAP[deviceClass]; if (!icons) return ''; if (icons.on && icons.off) { return state === 'on' ? icons.on : icons.off; } return icons.on || ''; }
  _getDomainDefaultIcon(domain, state) { if (domain === 'cover') return state === 'open' ? 'mdi:blinds-open' : 'mdi:blinds-closed'; if (domain === 'lock') return state === 'locked' ? 'mdi:lock' : 'mdi:lock-open'; if (domain === 'door') return state === 'open' ? 'mdi:door-open' : 'mdi:door-closed'; if (domain === 'window') return state === 'open' ? 'mdi:window-open' : 'mdi:window-closed'; if (domain === 'binary_sensor') return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off'; return DOMAIN_ICON_MAP[domain] || ''; }
  _getSensorEmojiAndUnit(sensorType, unit = 'C') { const data = SENSOR_TYPE_MAP[sensorType]; if (!data) return { emoji: '❓', unit: '' }; const unitFinal = sensorType === 'temperature' ? (unit === 'F' ? data.unitF : data.unitC) : data.unit; return { emoji: data.emoji, unit: unitFinal }; }

  _getLayoutStyle(mode) {
    const layoutMap = {
      '6x3': {
        cardHeight: '190px',
        iconSize: '75px',
        iconTop: '25%',
        iconLeft: '5%',
        nameFont: '28px',
        nameTop: '10px',
        nameLeft: '5px',
        mushroomSize: '35px',
        mushroomSizeSmall: '27px', 
        subButtonPadding: '10px',
        mushroomPositions: [
          'top: -70px; left: 0px;',//entities1
          'top: -70px; left: 50px;',//entities2
          'top: -40px; left: 85px;',//entities3
          'bottom: 30px; left: 85px;',//entities4
          'bottom: 0px; left: 50px;',//entities5
          'bottom: 0px; left: 0px;',//climate
          'top: -80px; left: 102px;',//camera
          'top: -120px; left: 0px;',//sensor
        ],
        sensorFontSize: '10px',
        gridTemplate: `
          "n n n b"
          "i i . b"
          "i i . b"
          "i i . b"`,
        gridColumns: '25% 25% 10% minmax(64px, 2fr)',
        gridRows: '25% 25% 25% 25%',
        subButtonPadding: '10px',
        subButtonHeight: '48px',
        subButtonIconSize: '26px',
      },
      '12x4': {
        cardHeight: '250px',
        iconSize: '130px',
        iconTop: '10%',
        iconLeft: '2%',
        nameFont: '32px',
        nameTop: '12px',
        nameLeft: '8px',
        mushroomSize: '50px',
        sensorFontSize: '16px',
        subButtonPadding: '14px',
        subButtonHeight: '60px',
        subButtonIconSize: '50px',
        mushroomSizeSmall: '30px', 
        mushroomPositions: [
          'top: -90px; left: 0px;',     // entities1
          'top: -90px; left: 100px;',    // entities2
          'top: -50px; left: 170px;',   // entities3
          'bottom: 50px; left: 170px;', // entities4
          'bottom: 5px; left: 100px;',  // entities5
          'bottom: 3px; left: 0px;',    // climate
          'top: -85px; right: 5px;',    // camera
          'top: -135px; left: 0px;',    // sensori ambientali
        ],
        gridTemplate: `
          "n n n b"
          "i i . b"
          "i i . b"
          "i i . b"`,
        gridColumns: '25% 25% 10% minmax(64px, 2fr)',
          // ELASTICO solo in 12x4!
        gridRows: '25% 25% 25% 25%',
      }
    };
    return layoutMap[mode] || layoutMap['6x3'];
  }

  _getIconShapeStyle(mode) {
    if (mode === '12x4') {
      return `
        width: 240px;
        height: 190px;
        border-radius: 0% 70% 70% 0%;
        top: 0px;
        left: 0px;
      `;
    } else {
      return `
        width: 130px;
        height: 140px;
        border-radius: 0% 70% 70% 0%;
        top: 0px;
        left: 0px;
      `;
    }
  }
}

customElements.define('bubble-room', BubbleRoom);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'bubble-room',
  name: 'Bubble Room',
  description: 'A stylish room control card with environmental sensors',
  preview: true,
  documentationURL: 'https://github.com/mon3y78/Lovelace-Bubble-room'
});

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$1=Symbol(),o$2=new WeakMap;class n$2{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$2.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$2.set(s,t));}return t}toString(){return this.cssText}}const r$3=t=>new n$2("string"==typeof t?t:t+"",void 0,s$1),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$2(o,t,s$1)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:r$2,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$1,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),y$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$1(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$2(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$1(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t.trustedTypes,s=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o="?"+h,n=`<${o}>`,r$1=document,l=()=>r$1.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$1.createTreeWalker(r$1,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$1.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$1).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$1,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$1.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t.litHtmlPolyfillSupport;j?.(N,R),(t.litHtmlVersions??=[]).push("3.2.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class r extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(s,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}}r._$litElement$=!0,r["finalized"]=!0,globalThis.litElementHydrateSupport?.({LitElement:r});const i=globalThis.litElementPolyfillSupport;i?.({LitElement:r});(globalThis.litElementVersions??=[]).push("4.1.1");

class BubbleRoomEditor extends r {
  static get properties() {
    return {
      _config: { type: Object },
      hass: { type: Object },
      _iconList: { type: Array },
    };
  }

  static async getConfigElement() {
    await Promise.resolve().then(function () { return bubbleRoomEditor; });
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
      import('custom-card-helpers').then(module => module.loadHaComponents()).catch(() => {});
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
    if (!configCopy.layout_mode) {
      configCopy.layout_mode = this._config.layout_mode || '6x3';
    }
  
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
    return i$3`
      :host { display: block; margin: 0; padding: 0; }
      .editor-header { text-align: center; margin: 1rem 0; }
      .version { font-size: 0.8rem; font-weight: normal; margin-left: 8px; color: var(--secondary-text-color); }
      ha-expansion-panel div[slot="header"] {
        background-color: var(--slider-bar-color);
        color: var(--text-primary-color);
        padding: 8px;
        font-weight: bold;
      }
      .section-content { padding: 16px; }
      .input-group { margin-bottom: 16px; }
      label { display: inline-block; margin-bottom: 4px; font-weight: 600; }
      input, textarea, select { width: 100%; box-sizing: border-box; }
      .note { margin-top: 1rem; font-size: 0.9rem; color: var(--secondary-text-color); }
    `;
  }

  _togglePanel(panelId) {
    const panel = this.shadowRoot.getElementById(panelId);
    if (panel) panel.open = !panel.open;
  }

  _renderSubButtonPanel(key) {
    this._config.entities?.[key] || {
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
    return x`
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
    if (!this._config) return x`<div>Caricamento configurazione...</div>`;
    return x`
      <div class="editor-header">
        <h3>Visual Editor Bubble Room V3.1<span class="version">v3.0</span></h3>
      </div>
      <ha-expansion-panel id="roomPanel">
        <div slot="header" @click="${() => this._togglePanel('roomPanel')}">Room Settings</div>
        <div class="section-content">
          <div class="input-group">
            <label>Room name:</label>
            <input type="text" .value="${this._config.name || ''}" @input="${this._updateName}" />
          </div>
          <div class="input-group">
            <label>Room Icon:</label>
            <ha-icon-picker .hass="${this.hass}" .value="${this._config.icon || ''}" allow-custom-icon
              @value-changed="${e => {
                this._config = { ...this._config, icon: e.detail.value };
                this.requestUpdate(); this._fireConfigChanged();
              }}">
            </ha-icon-picker>
          </div>
          <div class="input-group">
            <label>Layout:</label>
            <select .value="${this._config.layout_mode || '6x3'}" @change="${this._updateLayoutMode}">
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
        <div slot="header" @click="${() => this._togglePanel('subButtonMainPanel')}">SUB-BUTTON</div>
        <div class="section-content">
          ${this._renderSubButtonPanel("sub-button1")}
          ${this._renderSubButtonPanel("sub-button2")}
          ${this._renderSubButtonPanel("sub-button3")}
          ${this._renderSubButtonPanel("sub-button4")}
        </div>
      </ha-expansion-panel>
      <ha-expansion-panel id="mushroomEntitiesPanel">
        <div slot="header" @click="${() => this._togglePanel('mushroomEntitiesPanel')}">Mushroom Entities</div>
        <div class="section-content">
          ${this._renderMushroomEntityPanel("entities1", "Entity 1")}
          ${this._renderMushroomEntityPanel("entities2", "Entity 2")}
          ${this._renderMushroomEntityPanel("entities3", "Entity 3")}
          ${this._renderMushroomEntityPanel("entities4", "Entity 4")}
          ${this._renderMushroomEntityPanel("entities5", "Entity 5")}
        </div>
      </ha-expansion-panel>
      <ha-expansion-panel id="cameraPanel">
        <div slot="header" @click="${() => this._togglePanel('cameraPanel')}">Camera</div>
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
        <div slot="header" @click="${() => this._togglePanel('climatePanel')}">Climate</div>
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
        <div slot="header" @click="${() => this._togglePanel('sensorPanel')}">Sensor</div>
        <div class="section-content">
          ${['sensor1', 'sensor2', 'sensor3', 'sensor4'].map((key, i) =>
            this._renderSensorPanel(key, `Sensor ${i + 1}`)
          )}
        </div>
      </ha-expansion-panel>
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
        </div>
      </ha-expansion-panel>
      <datalist id="entity-list">
        ${this.hass
          ? Object.keys(this.hass.states).map(
              entityId => x`<option value="${entityId}"></option>`
            )
          : ''}
      </datalist>
      <p class="note">
        For advanced configurations, modify the YAML directly.
      </p>
    `;
  }

  _renderEntityInput(labelText, entityKey, field = 'entity') {
    const value = (this._config.entities && this._config.entities[entityKey] && this._config.entities[entityKey][field]) || '';
    const hasEntityPicker = customElements.get("ha-entity-picker");
    return x`
      <label>${labelText}:</label>
      ${hasEntityPicker ? x`
        <ha-entity-picker .hass="${this.hass}" .value="${value}" allow-custom-entity
          @value-changed="${e => this._updateEntity(entityKey, field)({ target: { value: e.detail.value } })}">
        </ha-entity-picker>
      ` : x`
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
    return x`
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
    return x`
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
          ? x`
              <label>Navigation Path:</label>
              <input type="text" .value="${tapAction.navigation_path || ''}" @input="${this._updateTapActionField('navigation_path')}" />
            `
          : ''}
        ${tapAction.action === 'call-service'
          ? x`
              <label>Service:</label>
              <input type="text" .value="${tapAction.service || ''}" @input="${this._updateTapActionField('service')}" />
              <label>Service Data (JSON):</label>
              <textarea .value="${tapAction.service_data ? JSON.stringify(tapAction.service_data) : ''}" @input="${this._updateTapActionField('service_data')}"></textarea>
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
          ? x`
              <label>Navigation Path:</label>
              <input type="text" .value="${holdAction.navigation_path || ''}" @input="${this._updateHoldActionField('navigation_path')}" />
            `
          : ''}
        ${holdAction.action === 'call-service'
          ? x`
              <label>Service:</label>
              <input type="text" .value="${holdAction.service || ''}" @input="${this._updateHoldActionField('service')}" />
              <label>Service Data (JSON):</label>
              <textarea .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}" @input="${this._updateHoldActionField('service_data')}"></textarea>
            `
          : ''}
      </div>
    `;
  }

  _renderMushroomEntityPanel(key, label) {
    const panelId = `${key}Panel`;
    return x`
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
    return x`
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
              ].map(t => x`<option value="${t.type}">${t.label}</option>`)}
            </select>
          </div>
          <div class="input-group">
            ${this._renderEntityInput("Entity ID", key)}
          </div>
          ${sensor.type && this._getUnitsForType(sensor.type).length > 0 ? x`
            <div class="input-group">
              <label>Unità:</label>
              <select .value="${sensor.unit || this._getUnitsForType(sensor.type)[0]}"
                @change="${e => this._updateSensor(parseInt(key.replace('sensor', '')) - 1, 'unit', e.target.value)}">
                ${this._getUnitsForType(sensor.type).map(u => x`<option value="${u}">${u}</option>`)}
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
    if (field === 'type') updated.unit = this._getUnitsForType(value)[0] || '';
    const entities = { ...this._config.entities, [key]: updated };
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }

  _getUnitsForType(type) {
    switch (type) {
      case 'temperature': return ['C', 'F'];
      case 'humidity': return ['%'];
      case 'pressure': return ['hPa'];
      case 'co2': return ['ppm'];
      case 'illuminance': return ['lx'];
      case 'pm1':
      case 'pm25':
      case 'pm10': return ['µg/m³'];
      case 'uv': return ['UV'];
      case 'noise': return ['dB'];
      case 'voc': return ['ppb'];
      default: return [];
    }
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
    return x`
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
    return x`
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
          ? x`
              <label>Navigation Path:</label>
              <input type="text" .value="${tapAction.navigation_path || ''}" @input="${this._updateEntityTapAction(key, 'navigation_path')}" />
            `
          : ''}
        ${tapAction.action === 'call-service'
          ? x`
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
          ? x`
              <label>Navigation Path:</label>
              <input type="text" .value="${holdAction.navigation_path || ''}" @input="${this._updateEntityHoldAction(key, 'navigation_path')}" />
            `
          : ''}
        ${holdAction.action === 'call-service'
          ? x`
              <label>Service:</label>
              <input type="text" .value="${holdAction.service || ''}" @input="${this._updateEntityHoldAction(key, 'service')}" />
              <label>Service Data (JSON):</label>
              <textarea .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}" @input="${this._updateEntityHoldAction(key, 'service_data')}"></textarea>
            `
          : ''}
      </div>
    `;
  }

  set hass(hass) { this._hass = hass; this.requestUpdate(); }
  get hass() { return this._hass; }

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
  
      // AGGIUNTA: forza l’icona di dominio/device_class appena cambi entità!
      if (field === 'entity') {
        // Preferisce attributo icon
        if (this.hass?.states?.[value]?.attributes?.icon) {
          curEntity.icon = this.hass.states[value].attributes.icon;
        } else {
          // device_class?
          const stateObj = this.hass?.states?.[value];
          const deviceClass = stateObj?.attributes?.device_class;
          if (deviceClass) {
            curEntity.icon = this._getDeviceClassIcon(deviceClass, stateObj.state)
              || this._getDefaultIconForEntity(value);
          } else {
            curEntity.icon = this._getDefaultIconForEntity(value);
          }
        }
      }
  
      const entities = { ...this._config.entities, [entityKey]: curEntity };
      this._config = { ...this._config, entities };
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }
  
  _updateTapActionField(field) {
    return (ev) => {
      let newValue = ev.target.value;
      if (field === 'service_data') {
        try { newValue = JSON.parse(newValue); } catch (e) {}
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
        try { newValue = JSON.parse(newValue); } catch (e) {}
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
        try { value = JSON.parse(value); } catch (e) {}
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
  _updateEntityHoldAction(entityKey, field) {
    return (ev) => {
      let value = ev.target.value;
      if (field === 'service_data') {
        try { value = JSON.parse(value); } catch (e) {}
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

var bubbleRoomEditor = /*#__PURE__*/Object.freeze({
  __proto__: null
});
