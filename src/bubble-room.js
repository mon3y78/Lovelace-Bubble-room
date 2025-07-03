import { LitElement, html, css } from 'https://unpkg.com/lit@2.6.1/index.js?module';

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
      /* Contenitori principali full-height */
      :host,
      ha-card,
      .card,
      .grid-container {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 0;
        box-sizing: border-box;
      }
  
      /* Card wrapper */
      .card {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        background: transparent;
      }
  
      /* Layout a due colonne: sinistra = 2fr, destra = 1fr */
      .grid-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr;
        align-items: stretch;
      }
  
      /* Colonna sinistra con 3 righe: sensori, nome, icona */
      .left-content {
        display: grid;
        grid-template-rows: 1fr 2fr 7fr;
        height: 100%;
      }
  
      /* Riga sensori */
      .sensor-row {
        display: flex;
        align-items: center;
        padding: 0 6%;
        font-size: 0.85em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
  
      /* Riga nome stanza */
      .name-area {
        display: flex;
        align-items: center;
        padding: 0 6%;
        font-weight: bold;
        font-size: 1.2em;
      }
  
      /* Riga icona principale */
      .icon-area {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 0%
      }
  
      /* Cerchio principale */
      .bubble - icon - container {
        width: 100 % ;
        height: 100 % ;
        display: flex;
        justify - content: center;
        align - items: center;
        background - color: var (--bubble - bg, rgba(0, 128, 0, 0.3));
        border - radius: 0; /* o 50% se vuoi un cerchio */
      }
  
      .bubble-icon {
        width: 70%;
        height: 70%;
        max-height: 70%;
      }
  
      /* Mushroom entities */
      .mushroom-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
  
      .mushroom-item {
        position: absolute;
        transform: translate(-50%, -50%);
        pointer-events: auto;
        cursor: pointer;
      }
  
      /* Colonna sub-button */
      .subbutton-column {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        gap: 2%;
        height: 100%;
        padding: 2%;
      }
  
      .bubble-sub-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        cursor: pointer;
        background-color: var(--sub-button-color, rgba(0,0,255,0.3));
      }
  
      @media (max-width: 480px) {
        .bubble-icon-container { width: 70%; }
        .bubble-icon { width: 80%; }
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
    // Raggruppa sensori in righe da massimo 3
    const sensorLines = [];
    for (let i = 0; i < sensorStrings.length; i += 3) {
      sensorLines.push(sensorStrings.slice(i, i + 3).join(' '));
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
      <div class="card">
        <div class="grid-container">
          <!-- Colonna sinistra -->
          <div class="left-content">
            <!-- Riga sensori -->
            <div class="sensor-row">
              ${sensorStrings.length > 0 ? html`${sensorStrings.join(' ')}` : ''}
            </div>
          
            <!-- Riga nome stanza -->
            <div class="name-area" style="color:${nameColor}; font-size:${layout.nameFont};">
              ${name}
            </div>
          
            <!-- Riga icona principale + mushroom entities -->
            <div class="icon-area">
              <!-- Bubble principale -->
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
                        ">
                </ha-icon>
              </div>
          
              <!-- Mushroom entities -->
              <div class="mushroom-container">
                ${mushroomTemplates.map((item, index) => {
                  if (!item) return html``;
                  const positions = [
                    "top: -20%; left: 40%;",
                    "top: 0%; left: 85%;",
                    "top: 50%; left: 90%;",
                    "bottom: 0%; left: 60%;",
                    "bottom: -20%; left: 30%;",
                    "top: 80%; left: 10%;",
                    "top: -30%; left: 70%;"
                  ];
                  const style = positions[index] || "";                  
                  const mushroomSize = layout.mushroomSize;
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
              </div>
            </div>
          </div>

          <!-- Colonna Sub-buttons -->
          <div class="subbutton-column">
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
                    style="--sub-button-color:${btnColor}; --sub-button-height:${layout.subButtonHeight};"
                    @pointerdown="${(e) => this._startHold(e, btn)}"
                    @pointerup="${(e) => this._endHold(e, btn, () => this._handleSubButtonTap(btn))}"
                    @pointerleave="${(e) => this._cancelHold(e)}">
                  <ha-icon icon="${this._getBestIcon(btn.entity, btn)}"
                          style="color: ${iconColor}; --mdc-icon-size:${layout.mushroomSize}; width:${layout.mushroomSize}; height:${layout.mushroomSize};">
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
  _handleHoldAction(item) { if (!item.hold_action) { this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: item.entity }, bubbles: true, composed: true, })); return; } const action = item.hold_action.action; switch (action) { case 'more-info': this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: item.entity }, bubbles: true, composed: true, })); break; case 'toggle': this._toggleEntity(item.entity); break; case 'call-service': if (item.hold_action.service) { const [domain, serviceName] = item.hold_action.service.split('.'); const serviceData = item.hold_action.service_data || {}; if (!serviceData.entity_id) { serviceData.entity_id = item.entity; } this.hass.callService(domain, serviceName, serviceData); } break; case 'navigate': if (item.hold_action.navigation_path) { window.history.pushState({}, '', item.hold_action.navigation_path); window.dispatchEvent(new Event('location-changed')); } break; default: }}
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
        gridColumns: '25% 25% 5% minmax(32px, 2fr)',
        gridRows: '25% 25% 25% 25%',
        subButtonPadding: '10px',
        subButtonHeight: '48px',
        subButtonIconSize: '26px',
      },
      '12x4': {
        iconSize: '130px',
        iconTop: '0%',
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
        gridColumns: '25% 25% 5% minmax(64px, 2fr)',
          // ELASTICO solo in 12x4!
        gridRows: '25% 25% 25% 25%',
      }
    };
    return layoutMap[mode] || layoutMap['6x3'];
  }

  _getIconShapeStyle(mode) {
    return `
      width: 130px;
      height: 140px;
      border-radius: 0% 70% 70% 0%;
      top: 0;
      left: 0;
    `;
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