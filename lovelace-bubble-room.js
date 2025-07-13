import { LitElement, css, html } from 'https://unpkg.com/lit@2.6.1/index.js?module';

// Bubble Room v4.0

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

const DOMAIN_ICON_MAP$1 = {
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

const SENSOR_TYPE_MAP$1 = {
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
  constructor() {
    super();
    this._iconAreaSize = { w: 130, h: 140 };   // area icona principale/mushroom
    this._subButtonSize = { w: 48, h: 48 };    // area di una cella subbutton
    this._resizeObserver = null;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!document.getElementById('bubble-room-bebas-font')) {
      const link = document.createElement('link');
      link.id = 'bubble-room-bebas-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
      document.head.appendChild(link);
    }
  }
  updated() {
    const iconArea = this.renderRoot?.querySelector('.icon-area');
    if (iconArea) {
      const rect = iconArea.getBoundingClientRect();
      this._iconAreaSize = { w: rect.width, h: rect.height };
    }
    
    // AGGIUNGI QUESTO
    const bubbleContainer = this.renderRoot?.querySelector('.bubble-icon-container');
    if (bubbleContainer) {
      const rect = bubbleContainer.getBoundingClientRect();
      this._bubbleContainerSize = { w: rect.width, h: rect.height };
    }
  
    const subbuttonCol = this.renderRoot?.querySelector('.subbutton-column');
    if (subbuttonCol) {
      const rect = subbuttonCol.getBoundingClientRect();
      this._subButtonSize = { w: rect.width, h: rect.height / 4 };
    }
    this._resizeNameFont();
  }
  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    super.disconnectedCallback();

  //
  }
  firstUpdated() {
    const container = this.renderRoot?.querySelector('#nameArea');
    if (container) {
      this._resizeObserver = new ResizeObserver(() => this._resizeNameFont());
      this._resizeObserver.observe(container);
    }
  }
  
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
    };
  }

  setConfig(config) {
    config = JSON.parse(JSON.stringify(config));
    if (!config || typeof config !== 'object' || Array.isArray(config)) throw new Error("The configuration must be a valid object.");
    if (!config.entities || typeof config.entities !== 'object') throw new Error("You must define at least the 'entities' property in the configuration.");

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
          if (key === 'presence') entities[key] = { ...value };
          else entities[key] = { ...defaultAction, ...value };
        } else entities[key] = value;
      }
    }
    this.config = {
      entities,
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


  
  static get styles() {
    return css`
      :host,
      ha-card,
      .card,
      .grid-container {
        height: 100%;
        width: 100%;
        min-height: 0;
        min-width: 0;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box;
        /* flex: 1 1 auto;  // SOLO se il parent è flex, qui puoi toglierlo */
      }
  
      .card {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        background: transparent;
        margin: 0 !important;
        padding: 0 !important;
      }
  
      .grid-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr;
        align-items: stretch;
        height: 100%;
        min-height: 0;
        min-width: 0;
      }
  
      .left-content {
        display: grid;
        grid-template-rows: 0.5fr 2.5fr 7fr;
        height: 100%;
        min-height: 0;
        min-width: 0;
        box-sizing: border-box;
      }
  
      .name-area {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        font-family: "Bebas Neue", "Arial Narrow", sans-serif;
        text-transform: uppercase;
        overflow: hidden;
      }
      #nameText {
        display: inline-block;
        white-space: nowrap;
        /* width: 100%;   <-- TOGLI questa riga! */
        text-align: center;
        line-height: 1;
        vertical-align: middle;
      }

  
      .icon-area {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 0%;
        min-height: 0;
        min-width: 0;
        height: 100%;

      }
  
      .bubble-icon-container {
        width: 100%;
        height: 100%;
        min-height: 0;
        min-width: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        flex-basis: 0;
        background-color: var(--bubble-bg, rgba(0, 128, 0, 0.3));
        border-radius: 0; /* o 50% se vuoi un cerchio */
      }
  
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
  
      .subbutton-column {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        gap: 2%;
        height: 100%;
        min-height: 0;
        min-width: 0;
        padding: 2%;
        box-sizing: border-box;
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
        min-height: 0;
        min-width: 0;
      }
  
      .bubble-icon {
        transform: scale(1.0);
        transform-origin: center center;
      }
  
      .mushroom-icon {
        transform: scale(0.7);
        transform-origin: center center;
      }
  
      .subbutton-icon {
        transform: scale(1.4);
        transform-origin: center center;
      }
      .sensor-rows {
        display: flex;
        flex-direction: column;
        width: 100%;
        box-sizing: border-box;
        /* padding: 0;  // metti 0 se vuoi aderente */
        /* margin: 0;   // idem */
      }
      .sensor-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        min-height: 8px;
        /* padding: 0; */
        /* margin: 0; */
      }
      .sensor {
        flex: 1 1 0;
        text-align: center;
        padding: 0 2px;
        min-width: 0;
        box-sizing: border-box;
}

      @media (max-width: 480px) {
        .bubble-icon-container { width: 70%; }
      }
    `;
  }
  
  render() {
    const mainSize = this._getMainIconSize();
    const mushroomSize = this._getMushroomIconSize();
    const subBtnSize = this._getSubButtonIconSize();

    if (!this.config || !this.hass) {
      return html`<div>Loading...</div>`;
    }
    const { entities } = this.config;

    for (let i = 1; i <= 6; i++) {
      const sensorKey = `sensor${i}`;
      const sensor = this.config.entities[sensorKey];
      if (!sensor || !sensor.type) continue;
      const entityId = sensor.entity;
      let state = entityId ? (this.hass.states[entityId]?.state || 'N/A') : '?';
      if (!isNaN(parseFloat(state))) state = Math.floor(parseFloat(state)).toString();
      this._getSensorEmojiAndUnit(sensor.type, sensor.unit);
    }

    const { colors, name, icon } = this.config;
    const roomColors = colors?.room || {};
    const subColors = colors?.subbutton || {};
    const hass = this.hass;
    const presenceState = hass.states[entities.presence.entity]?.state || 'off';
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
      entities.entities5,
      entities.climate,
      entities.camera
    ].filter(Boolean);

    return html`
      <div class="card">
        <div class="grid-container">
          <!-- Colonna sinistra -->
          <div class="left-content">
            <!-- Riga sensori -->
            <div class="sensor-rows">
              <div class="sensor-row">
                ${this._renderSensor(1)}
                ${this._renderSensor(2)}
                ${this._renderSensor(3)}
              </div>
              <div class="sensor-row">
                ${this._renderSensor(4)}
                ${this._renderSensor(5)}
                ${this._renderSensor(6)}
              </div>
            </div>


          
            <!-- Riga nome stanza -->
            <div class="name-area" id="nameArea" style="color:${nameColor};">
              <span id="nameText">${name}</span>
            </div>

          
            <!-- Riga icona principale + mushroom entities -->
            <div class="icon-area">
              <!-- Bubble principale -->
              <div class="bubble-icon-container"
                  style="
                    background-color: ${bubbleBg};
                    ${this._getIconShapeStyle()}
                  "
                  @pointerdown="${(e) => this._startHold(e, this.config)}"
                  @pointerup="${(e) => this._endHold(e, this.config, () => this._handleMainIconTap())}"
                  @pointerleave="${(e) => this._cancelHold(e)}">
                <ha-icon class="bubble-icon"
                        icon="${this._getBestIcon(this.config.entities.presence?.entity, { icon: icon })}"
                        style="
                          color: ${bubbleIconColor};
                          --mdc-icon-size: ${mainSize}px;
                          width: ${mainSize}px;
                          height: ${mainSize}px;
                          transform: translateX(-20%);
                        ">
                </ha-icon>



              </div>
          
              <!-- Mushroom entities -->
              <div class="mushroom-container">
                ${mushroomTemplates.map((item, i) => {
                  if (!item) return html``;
                  if (!this._bubbleContainerSize) return html``;

                  const ratios = [
                    { x: 0.15, y: 0.13 },
                    { x: 0.55, y: 0.13 },
                    { x: 0.81, y: 0.33 },
                    { x: 0.82, y: 0.65 },
                    { x: 0.55, y: 0.87 },
                    { x: 0.15, y: 0.87 }, // CLIMATE
                    { x: 0.9, y: 0.05 }, // CAMERA
                  ];

                  const sizes = [
                    mushroomSize, // 1
                    mushroomSize, // 2
                    mushroomSize, // 3
                    mushroomSize, // 4
                    mushroomSize, // 5
                    Math.round(this._bubbleContainerSize.w * 0.20), // CLIMATE
                    Math.round(this._bubbleContainerSize.w * 0.20), // CAMERA
                  ];

                  const ratio = ratios[i] || { x: 0.5, y: 0.5 };
                  const size = sizes[i] || mushroomSize;

                  const x = this._bubbleContainerSize.w * ratio.x;
                  const y = this._bubbleContainerSize.h * ratio.y;

                  const state = hass.states[item.entity]?.state || 'off';
                  const iconColor = state === 'on'
                    ? (roomColors.mushroom_active || 'orange')
                    : (roomColors.mushroom_inactive || '#80808055');

                  return html`
                    <div class="mushroom-item"
                        style="
                          position: absolute;
                          left: ${x}px;
                          top: ${y}px;
                          transform: translate(-50%, -50%);
                        "
                        @pointerdown="${(e) => this._startHold(e, item)}"
                        @pointerup="${(e) => this._endHold(e, item, () => this._handleMushroomTap(item))}"
                        @pointerleave="${(e) => this._cancelHold(e)}">
                      <ha-icon
                        class="mushroom-icon"
                        icon="${this._getBestIcon(item.entity, item)}"
                        style="
                          color: ${iconColor};
                          --mdc-icon-size: ${size}px;
                          width: ${size}px;
                          height: ${size}px;
                        ">
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
                      style="--sub-button-color:${btnColor};"
                      @pointerdown="${(e) => this._startHold(e, btn)}"
                      @pointerup="${(e) => this._endHold(e, btn, () => this._handleSubButtonTap(btn))}"
                      @pointerleave="${(e) => this._cancelHold(e)}" >
                  <ha-icon class="subbutton-icon"
                          icon="${this._getBestIcon(btn.entity, btn)}"
                          style="
                            color: ${iconColor};
                            --mdc-icon-size: ${subBtnSize}px;
                            width: ${subBtnSize}px;
                            height: ${subBtnSize}px;
                          ">
                  </ha-icon>

                </div>
              `;
            })}
          </div>
        </div>


      </div>
    `;
  }

  _renderSensor(n) {
    const sensorKey = `sensor${n}`;
    const sensor = this.config.entities?.[sensorKey];
    if (!sensor || !sensor.type) return html`<div class="sensor"></div>`;
    const entityId = sensor.entity;
    let state = entityId ? (this.hass.states[entityId]?.state ?? 'N/A') : '?';
    if (!isNaN(parseFloat(state))) state = Math.floor(parseFloat(state)).toString();
    const { emoji, unit } = this._getSensorEmojiAndUnit(sensor.type, sensor.unit);
    return html`
      <div class="sensor">
        ${emoji} ${state}${unit}
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
  _getDeviceClassIcon(deviceClass, state) { const icons = DEVICE_CLASS_ICON_MAP[deviceClass]; 
    if (!icons) return ''; 
    if (icons.on && icons.off) { return state === 'on' ? icons.on : icons.off; } return icons.on || ''; }
  _getDomainDefaultIcon(domain, state) { 
    if (domain === 'cover') return state === 'open' ? 'mdi:blinds-open' : 'mdi:blinds-closed'; 
    if (domain === 'lock') return state === 'locked' ? 'mdi:lock' : 'mdi:lock-open'; 
    if (domain === 'door') return state === 'open' ? 'mdi:door-open' : 'mdi:door-closed'; 
    if (domain === 'window') return state === 'open' ? 'mdi:window-open' : 'mdi:window-closed'; 
    if (domain === 'binary_sensor') return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off'; return DOMAIN_ICON_MAP$1[domain] || ''; }
  _getSensorEmojiAndUnit(sensorType, unit = 'C') { const data = SENSOR_TYPE_MAP$1[sensorType]; 
    if (!data) return { emoji: '❓', unit: '' }; const unitFinal = sensorType === 'temperature' ? (unit === 'F' ? data.unitF : data.unitC) : data.unit; return { emoji: data.emoji, unit: unitFinal }; }

  _resizeNameFont() {
    const container = this.renderRoot?.querySelector('#nameArea');
    const text = this.renderRoot?.querySelector('#nameText');
    if (!container || !text) return;

  
    // STEP 1: prova con letter-spacing ampio e font massimo
    let maxFont = 300, minFont = 5, fontSize = maxFont;
    let spacing = 0.01 * maxFont; // 2% della font size (modificabile)
    text.style.letterSpacing = `${spacing}px`;
    text.style.fontSize = `${fontSize}px`;
  
    // Se sta dentro, ok. Se no, azzera letter-spacing e riprova
    if (text.offsetWidth > container.offsetWidth || text.offsetHeight > container.offsetHeight) {
      spacing = 0;
      text.style.letterSpacing = `${spacing}px`;
      text.style.fontSize = `${fontSize}px`;
    }
  
    // Ora scala giù la font-size finché tutto il testo entra (senza mai andare sotto minFont)
    while ((text.offsetWidth > container.offsetWidth || text.offsetHeight > container.offsetHeight) && fontSize > minFont) {
      fontSize -= 1;
      text.style.fontSize = `${fontSize}px`;
    }
  }
  

  _getIconShapeStyle() {
    return `
      width: 100%;
      height: 100%;
      border-radius: 0% 70% 70% 0%;
      top: 0;
      left: 0;
    `;
  }

  _getMainIconSize() {
    return Math.round(Math.min(this._iconAreaSize.w, this._iconAreaSize.h) * 0.65); // 65% dell'area icona
  }
  _getMushroomIconSize() {
    return Math.round(Math.min(this._iconAreaSize.w, this._iconAreaSize.h) * 0.25); // 34%
  }
  _getSubButtonIconSize() {
    return Math.round(Math.min(this._subButtonSize.w, this._subButtonSize.h) * 0.6); // 60% della cella subbutton
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
  temperature: { emoji: '🌡️', units: ['°C', '°F'], label: 'Temperature' },
  humidity:    { emoji: '💦', units: ['%'], label: 'Humidity' },
  co2:         { emoji: '🟢', units: ['ppm'], label: 'CO₂' },
  illuminance: { emoji: '☀️', units: ['lx'], label: 'Illuminance' },
  pm1:         { emoji: '🟤', units: ['µg/m³'], label: 'PM1' },
  pm25:        { emoji: '⚫️', units: ['µg/m³'], label: 'PM2.5' },
  pm10:        { emoji: '⚪️', units: ['µg/m³'], label: 'PM10' },
  uv:          { emoji: '🌞', units: ['UV'], label: 'UV Index' },
  noise:       { emoji: '🔊', units: ['dB'], label: 'Noise' },
  pressure:    { emoji: '📈', units: ['hPa'], label: 'Pressure' },
  voc:         { emoji: '🧪', units: ['ppb'], label: 'VOC' },
  consumption: { emoji: '⚡️', units: ['W', 'kWh', 'Wh'], label: 'Consumption' },
  production: { emoji: '🔆', units: ['W', 'kWh', 'Wh'], label: 'Production' }
};



class BubbleRoomEditor extends r {
  static get properties() {
    return {
      _config: { type: Object },
      _iconList: { type: Array },
      _jsonError: { type: Boolean }
    };
  }

  static async getConfigElement() {
    await Promise.resolve().then(function () { return bubbleRoomEditor; });
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
      import('custom-card-helpers').then(module => {
        if (module && module.loadHaComponents) {
          module.loadHaComponents();
        }
      }).catch(() => {});
    }
    this._expandedPanel = null;
    this._expandedSubButtons = [false, false, false, false];
    this._expandedMushroomEntities = [false, false, false, false, false];
    this._expandedSensors = [false, false, false, false];
    this._expandedColors = [false, false];
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

    if (!config.tap_action) config.tap_action = { action: 'toggle', navigation_path: '' };
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
    return i$3`
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
        z-index: 0;
        --glass-bg: rgba(73, 164, 255, 0.38);
        --glass-shadow: 0 2px 24px 0 rgba(50,180,255,0.25);
        --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.26),rgba(255,255,255,0.11) 70%,transparent 100%);
      }
      .glass-panel::after {
        content: '';
        position: absolute;
        left: 0; top: 0;
        width: 100%; height: 100%;
        border-radius: inherit;
        background: var(--glass-sheen);
        pointer-events: none;
        z-index: 0 !important;
      }
      .glass-panel {
        background: var(--glass-bg);
        box-shadow: var(--glass-shadow);
      }
  
      /* Sezione varianti */
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
  
      /* Header e contenuti sopra glass */
      .glass-header,
      .glass-content,
      .input-group,
      label,
      input,
      select,
      textarea {
        position: relative;
        z-index: 1;
      }
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
        z-index: 1 !important;
      }
      /* Override dimensione font */
      .room-panel .glass-header   { font-size: 1.2rem; }
      .subbutton-panel .glass-header { font-size: 1.15rem; }
      .mushroom-panel .glass-header { font-size: 1.12rem; }
      .camera-panel .glass-header   { font-size: 1.13rem; }
      .climate-panel .glass-header  { font-size: 1.12rem; }
      .sensor-panel .glass-header   { font-size: 1.11rem; }
      .colors-panel .glass-header   { font-size: 1.11rem; }
  
      /* === MINI-PILL (tutte le pillole) === */
      .mini-pill,
      .glass-pill {
        background: rgba(44,70,100,0.23);
        border: 1.5px solid rgba(255,255,255,0.12);
        box-shadow: 0 3px 22px 0 rgba(70,120,220,0.13);
        backdrop-filter: blur(10px) saturate(1.2);
        -webkit-backdrop-filter: blur(10px) saturate(1.2);
        border-radius: 24px;
        margin: 0 0 18px 0;
        transition: background 0.18s, box-shadow 0.18s, border 0.18s;
        overflow: hidden;
        position: relative;
      }
      .mini-pill-header {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 15px 22px 15px 26px;
        font-size: 1.22rem;     /* più grande! */
        font-family: 'Inter', 'Segoe UI', 'Roboto', Arial, sans-serif;
        font-weight: 800;
        color: var(--section-accent, #b28fff);
        letter-spacing: 0.03em;
        cursor: pointer;
        user-select: none;
        position: relative;
        z-index: 1;
        text-shadow: 0 2px 7px #0004;
      }
      .mini-pill-header .chevron {
        margin-left: auto;
        font-size: 1.22em;
        opacity: 0.64;
        transition: transform 0.18s;
      }
      .mini-pill.expanded .mini-pill-header .chevron {
        transform: rotate(90deg);
      }
      .mini-pill-content {
        padding: 15px 22px 16px 22px;
        background: transparent;
        position: relative;
        z-index: 1;
        animation: pill-expand 0.22s cubic-bezier(.5,1.2,.6,1) both;
      }
      @keyframes pill-expand {
        from { opacity: 0; transform: translateY(-12px);}
        to   { opacity: 1; transform: translateY(0);}
      }
      .room-panel .mini-pill-header   { --section-accent: #55afff; }
      .subbutton-panel .mini-pill-header { --section-accent: #b28fff; }
      .mushroom-panel .mini-pill-header { --section-accent: #36e6a0; }
      .camera-panel .mini-pill-header   { --section-accent: #50d2ff; }
      .climate-panel .mini-pill-header  { --section-accent: #f1be62; }
      .sensor-panel .mini-pill-header   { --section-accent: #8cff8a; }
      .colors-panel .mini-pill-header   { --section-accent: #73f6e5; }
  
      /* ==== TUTTI I BOX INTERNI: effetto glass trasparente ==== */
      .input-group,
      .color-row {
        background: rgba(44,70,100,0.23);
        border: 1.5px solid rgba(255,255,255,0.13);
        box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
        border-radius: 18px;
        backdrop-filter: blur(7px) saturate(1.2);
        -webkit-backdrop-filter: blur(7px) saturate(1.2);
        margin-bottom: 13px;
        padding: 14px 18px 10px;
      }
  
      /* LABEL header interne: moderne, grandi, colore sezione */
      label,
      .input-group label {
        font-size: 1.13rem;
        font-family: 'Inter', 'Segoe UI', 'Roboto', Arial, sans-serif;
        font-weight: 700;
        color: var(--section-accent, #b28fff);
        letter-spacing: 0.03em;
        margin-bottom: 6px;
        display: block;
      }
      .room-panel label { --section-accent: #55afff; }
      .subbutton-panel label { --section-accent: #b28fff; }
      .mushroom-panel label { --section-accent: #36e6a0; }
      .camera-panel label { --section-accent: #50d2ff; }
      .climate-panel label { --section-accent: #f1be62; }
      .sensor-panel label { --section-accent: #8cff8a; }
      .colors-panel label { --section-accent: #73f6e5; }
  
      /* RESET e AUTODISCOVER: glass pill trasparente */
      .reset-button,
      .autodiscover-box {
        border: 2.5px solid #FFD600 !important;
        box-shadow: 0 2px 24px 0 #FFD60033 !important;
        background: rgba(255, 214, 0, 0.08) !important;
        border-radius: 24px !important;
        backdrop-filter: blur(7px) saturate(1.2) !important;
        -webkit-backdrop-filter: blur(7px) saturate(1.2) !important;
      }
  
      .reset-button {
        border: 3.5px solid #ff4c6a !important;
        color: #ff4c6a !important;
        font-size: 1.15rem;
        font-weight: 700;
        box-shadow: 0 2px 24px 0 #ff4c6a44;
        padding: 12px 38px !important;
        margin: 20px auto 0 auto !important;
        z-index: 3 !important;
        position: relative;
        transition: background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s;
      }
      .reset-button:hover {
        background: rgba(255,76,106,0.18) !important;
        color: #fff !important;
        border-color: #ff1744 !important;
        box-shadow: 0 6px 32px 0 #ff4c6abf;
      }
  
      .autodiscover-box {
        z-index: 2 !important;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 18px auto;
        padding: 18px 0 18px 0;
        font-size: 1.17rem;
        color: #fff;
        font-weight: 700;
        letter-spacing: 0.02em;
        text-align: center;
        transition: box-shadow 0.18s, border 0.18s;
        cursor: pointer;
        max-width: 88%;
      }
      .autodiscover-box:hover {
        box-shadow: 0 4px 24px 0 rgba(73,164,255,0.26) !important;
        border: 1.5px solid #66baff !important;
      }
  
      /* INPUT BASE */
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
  
      /* Migliora focus */
      input:focus, select:focus, textarea:focus {
        outline: 2px solid #55afff;
        background: rgba(55,100,155,0.10);
      }
  
      /* TAB/BOTTONI pill liquidi */
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
  
      /* RESPONSIVE */
      @media (max-width: 650px) {
        .glass-header { padding: 14px 10px 9px 10px; font-size:1.13em;}
        .glass-content { padding: 12px 10px; }
        .mini-pill-content { padding: 10px 8px 9px 10px; }
      }
    `;
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
    if (!this._config) {
      return x`<div>Caricamento configurazione...</div>`;
    }
    return x`
      <div class="editor-header">
        <h3>Visual Editor Bubble Room <span class="version">4.0</span></h3>
      </div>
      ${this._renderRoomPanel()}
      ${this._renderSubButtonPanelGroup()}
      ${this._renderMushroomEntitiesPanel()}
      ${this._renderCameraPanel()}
      ${this._renderClimatePanel()}
      ${this._renderSensorPanel()}
      ${this._renderColorPanel()}
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
  
    return x`
      <label>${labelText}:</label>
      ${hasEntityPicker ? x`
        <ha-entity-picker
          .hass="${this._hass}"
          .value="${value}"
          .includeEntities="${sectionName ? this._getFilteredEntities(sectionName) : Object.keys(this._hass?.states || {})}"
          allow-custom-entity
          @value-changed="${e => this._updateEntity(entityKey, field)({ target: { value: e.detail.value } })}">
        </ha-entity-picker>
      ` : x`
        <input
          type="text"
          .value="${value}"
          placeholder="Enter entity_id"
          @input="${this._updateEntity(entityKey, field)}" />
      `}
    `;
  }

  _renderIconInput(labelText, entityKey, field = 'icon') {
    const value = this._config.entities?.[entityKey]?.[field] || '';
    return x`
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
  
    return x`
      <div class="input-group">
        <label>Tap:</label>
        <div class="pill-group">
          ${actions.map(action => x`
            <button
              class="pill-button ${tapAction.action === action ? 'active' : ''}"
              @click="${() => this._updateTapActionField('action')({ target: { value: action } })}"
            >${action}</button>
          `)}
        </div>
        ${tapAction.action === 'navigate' ? x`
          <label>Navigation Path:</label>
          <input type="text" .value="${tapAction.navigation_path || ''}"
            @input="${this._updateTapActionField('navigation_path')}" />
        ` : ''}
        ${tapAction.action === 'call-service' ? x`
          <label>Service:</label>
          <input type="text" .value="${tapAction.service || ''}"
            @input="${this._updateTapActionField('service')}" />
          <label>Service Data (JSON):</label>
          <textarea
            class="${this._jsonError ? 'error' : ''}"
            .value="${tapAction.service_data ? JSON.stringify(tapAction.service_data) : ''}"
            @input="${this._updateTapActionField('service_data')}"></textarea>
          ${this._jsonError ? x`<div style="color: red; font-size: 0.9em;">⚠️ Invalid JSON</div>` : ''}
        ` : ''}
      </div>
  
      <div class="input-group">
        <label>Hold:</label>
        <div class="pill-group">
          ${actions.map(action => x`
            <button
              class="pill-button ${holdAction.action === action ? 'active' : ''}"
              @click="${() => this._updateHoldActionField('action')({ target: { value: action } })}"
            >${action}</button>
          `)}
        </div>
        ${holdAction.action === 'navigate' ? x`
          <label>Navigation Path:</label>
          <input type="text" .value="${holdAction.navigation_path || ''}"
            @input="${this._updateHoldActionField('navigation_path')}" />
        ` : ''}
        ${holdAction.action === 'call-service' ? x`
          <label>Service:</label>
          <input type="text" .value="${holdAction.service || ''}"
            @input="${this._updateHoldActionField('service')}" />
          <label>Service Data (JSON):</label>
          <textarea
            class="${this._jsonError ? 'error' : ''}"
            .value="${holdAction.service_data ? JSON.stringify(holdAction.service_data) : ''}"
            @input="${this._updateHoldActionField('service_data')}"></textarea>
          ${this._jsonError ? x`<div style="color: red; font-size: 0.9em;">⚠️ JSON non valido</div>` : ''}
        ` : ''}
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
    return x`
      <div class="input-group">
        <label>${label}:</label>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 7px;">
          <!-- Rettangolo colore grande sopra -->
          <input
            type="color"
            style="width: 56px; height: 32px; border-radius: 9px; border: 2px solid #fff4; cursor: pointer; margin-bottom: 7px; box-shadow: 0 2px 8px #0001;"
            .value="${hex}"
            @input="${e => this._updateColorField(section, key, e.target.value, a)}"
          />
          <!-- Barra trasparenza -->
          <div style="display: flex; align-items: center; gap: 8px; width: 100%; justify-content: center;">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              .value="${a}"
              style="width: 90px; max-width: 100%; vertical-align: middle;"
              @input="${e => this._updateColorField(section, key, hex, e.target.value)}"
            />
            <span style="width:42px;">${Math.round(a * 100)}%</span>
          </div>
          <!-- Input RGBA compatto -->
          <input
            type="text"
            style="width: 110px; max-width: 100%; margin-top: 2px; font-size: 1em;"
            .value="${rgba}"
            @input="${e => this._updateNestedColorDirect(section, key, e.target.value)}"
          />
        </div>
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
  
    return x`
      <div class="input-group">
        <label>Tap:</label>
        <div class="pill-group">
          ${actions.map(action => x`
            <button
              class="pill-button ${tapAction.action === action ? 'active' : ''}"
              @click="${() => this._updateEntityTapAction(key, 'action')({ target: { value: action } })}"
            >${action}</button>
          `)}
        </div>
        ${tapAction.action === 'navigate' ? x`
          <label>Navigation Path:</label>
          <input type="text" .value="${tapAction.navigation_path || ''}"
            @input="${this._updateEntityTapAction(key, 'navigation_path')}" />
        ` : ''}
        ${tapAction.action === 'call-service' ? x`
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
          ${actions.map(action => x`
            <button
              class="pill-button ${holdAction.action === action ? 'active' : ''}"
              @click="${() => this._updateEntityHoldAction(key, 'action')({ target: { value: action } })}"
            >${action}</button>
          `)}
        </div>
        ${holdAction.action === 'navigate' ? x`
          <label>Navigation Path:</label>
          <input type="text" .value="${holdAction.navigation_path || ''}"
            @input="${this._updateEntityHoldAction(key, 'navigation_path')}" />
        ` : ''}
        ${holdAction.action === 'call-service' ? x`
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
          iconValue = this.getIconForEntity(value, {});
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
  
    const entities = { ...(this._config.entities || {}), [entityKey]: entityConf };
    this._config = { ...this._config, entities };
    this._fireConfigChanged();
  }

  
  _renderTapHoldAction(actionType = "tap", configObj = null, updater = null) {
    // configObj: oggetto dove c’è tap_action/hold_action, 
    // updater: funzione per salvare i cambiamenti
    const config = configObj
      ? (configObj[`${actionType}_action`] || {})
      : (actionType === "tap" ? (this._config.tap_action || {}) : (this._config.hold_action || {}));
    const actions = [
      { value: "toggle", label: "🟢 Toggle" },
      { value: "more-info", label: "🔎 More Info" },
      { value: "navigate", label: "↗️ Navigate" },
      { value: "call-service", label: "⚙️ Call Service" },
      { value: "none", label: "🚫 None" }
    ];
  
    return x`
      <div class="input-group">
        <label style="min-width:50px;">${actionType === "tap" ? "Tap" : "Hold"}:</label>
        <select style="margin-right:16px;" .value="${config.action || 'none'}"
          @change="${e => 
            updater
              ? updater(actionType, 'action', e.target.value)
              : (actionType === "tap"
                  ? this._updateTapActionField('action')({ target: { value: e.target.value } })
                  : this._updateHoldActionField('action')({ target: { value: e.target.value } })
                )
          }">
          ${actions.map(a => x`<option value="${a.value}">${a.label}</option>`)}
        </select>
        ${config.action === 'navigate' ? x`
          <label style="margin-left:12px;">Path:</label>
          <input type="text" .value="${config.navigation_path || ''}" style="width:130px;"
            @input="${e => 
              updater
                ? updater(actionType, 'navigation_path', e.target.value)
                : (actionType === "tap"
                    ? this._updateTapActionField('navigation_path')(e)
                    : this._updateHoldActionField('navigation_path')(e)
                  )
            }" />
        ` : ''}
        ${config.action === 'call-service' ? x`
          <label style="margin-left:12px;">Service:</label>
          <input type="text" .value="${config.service || ''}" style="width:130px;"
            @input="${e => 
              updater
                ? updater(actionType, 'service', e.target.value)
                : (actionType === "tap"
                    ? this._updateTapActionField('service')(e)
                    : this._updateHoldActionField('service')(e)
                  )
            }" />
          <label style="margin-left:12px;">Data (JSON):</label>
          <input type="text" .value="${config.service_data ? JSON.stringify(config.service_data) : ''}" style="width:120px;"
            @input="${e =>
              updater
                ? updater(actionType, 'service_data', e.target.value)
                : (actionType === "tap"
                    ? this._updateTapActionField('service_data')(e)
                    : this._updateHoldActionField('service_data')(e)
                  )
            }" />
        ` : ''}
      </div>
    `;
  }
  _updateActionFieldGeneric(entityKey) {
    return (actionType, field, value) => {
      let v = value;
      if (field === 'service_data') {
        try {
          v = JSON.parse(value);
          this._jsonError = false;
        } catch (e) {
          this._jsonError = true;
          this.requestUpdate();
          return;
        }
      }
      const entConf = this._config.entities?.[entityKey] || {};
      const actConf = { ...(entConf[`${actionType}_action`] || {}) };
      if (actConf[field] === v) return;
      actConf[field] = v;
      const entities = {
        ...this._config.entities,
        [entityKey]: {
          ...entConf,
          [`${actionType}_action`]: actConf
        }
      };
      this._config = { ...this._config, entities };
      this._jsonError = false;
      this.requestUpdate();
      this._fireConfigChanged();
    };
  }
    

  _renderExpandablePill({ label, expanded, onToggle, content, accent }) {
    return x`
      <div class="mini-pill glass-pill ${expanded ? 'expanded' : ''}">
        <div
          class="mini-pill-header"
          style="${accent ? `--section-accent: ${accent}` : ''}"
          @click="${onToggle}"
        >
          ${label}
          <span class="chevron">${expanded ? '▼' : '▶'}</span>
        </div>
        ${expanded ? x`
          <div class="mini-pill-content">
            ${content}
          </div>
        ` : ''}
      </div>
    `;
  }
  
  _toggleMainPanel(panelName) {
    // Se il pannello è già aperto, lo chiudo, altrimenti lo apro e chiudo gli altri
    this._expandedPanel = this._expandedPanel === panelName ? null : panelName;
    this.requestUpdate();
  }
  
  _onPanelExpanded(panelName, e) {
    // Solo se è espanso
    if (e.detail.expanded) {
      this._expandedPanel = panelName;
    } else {
      // Se lo richiudi, nessuno aperto
      this._expandedPanel = null;
    }
    this.requestUpdate();
  }

  _renderRoomPanel() {
    return x`
      <ha-expansion-panel
        class="glass-panel room-panel"
        .expanded="${this._expandedPanel === 'room'}"
        @expanded-changed="${e => this._onPanelExpanded('room', e)}">
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
              <span>🪄 Auto-discovery</span>
            </label>
          </div>
  
          <!-- MINI-PILL "Room": contiene Room name e Area su una riga -->
          <div class="mini-pill glass-pill expanded" style="margin-bottom:18px;">
            <div class="mini-pill-header" style="font-size:1.09em; color:#55afff;">Room</div>
            <div class="mini-pill-content">
              <div style="display:flex; flex-direction:column; gap:5px;">
                <div style="flex:1;">
                  <label>Room name:</label>
                  <input type="text" .value="${this._config.name || ''}" @input="${this._updateName}" />
                </div>
                <div style="flex:1;">
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
              </div>
            </div>
          </div>
  
          <!-- MINI-PILL "Icon": Room Icon + Presence su una riga, sotto Tap + Hold -->
          <div class="mini-pill glass-pill expanded" style="margin-bottom:12px;">
            <div class="mini-pill-header" style="font-size:1.09em; color:#55afff;">Icon</div>
            <div class="mini-pill-content">
              <div style="display:flex; flex-direction:column; gap:5px;">
                <div style="flex:1; min-width:170px;">
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
                <div style="flex:2; min-width:170px;">
                  ${this._renderEntityInput("Presence (ID)", "presence", "entity", "room_presence")}
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:1px;">
                <div style="flex:1; min-width:160px;">
                  ${this._renderTapHoldAction("tap")}
                </div>
                <div style="flex:1; min-width:160px;">
                  ${this._renderTapHoldAction("hold")}
                </div>
              </div>
            </div>
          </div>
  
          <!-- RESET -->
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
    // Assicurati che lo stato sia sempre lungo 4
    if (!this._expandedSubButtons || this._expandedSubButtons.length !== 4) {
      this._expandedSubButtons = [false, false, false, false];
    }
  
    return x`
      <ha-expansion-panel
        class="glass-panel subbutton-panel"
        .expanded="${this._expandedPanel === 'subbutton'}"
        @expanded-changed="${e => this._onPanelExpanded('subbutton', e)}">
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
              <span>🪄 Auto-discovery</span>
            </label>
          </div>
  
          <!-- Subbutton pills -->
          ${["sub-button1", "sub-button2", "sub-button3", "sub-button4"].map((key, i) => {
            const label = `Sub-button ${i+1}`;
            const expanded = this._expandedSubButtons[i];
            const accent = "#b28fff";
            return this._renderExpandablePill({
              label,
              expanded,
              accent,
              onToggle: () => this._toggleSubButtonExpand(i),
              content: x`
                <div style="display:flex; flex-direction:column; gap:5px;">
                  <div class="input-group" style="flex:1; margin-bottom:0;">
                    ${this._renderEntityInput(key, "entity", "subbutton")}
                  </div>
                  <div class="input-group" style="flex:1; margin-bottom:0;">
                    ${this._renderIconInput("Icon", key)}
                  </div>
                </div>
                <!-- Function label -->
                <div style="margin-bottom:6px;">
                  <span style="display:block; font-size:1.13em; font-weight:700; color:#b28fff;">Function:</span>
                </div>
                <!-- Tap/Hold -->
                <div style="display:flex; flex-direction:column; gap:1px;">
                  <div style="flex:1; min-width:160px;">
                    ${this._renderTapHoldAction("tap", this._config.entities?.[key], this._updateActionFieldGeneric(key))}
                  </div>
                  <div style="flex:1; min-width:160px;">
                    ${this._renderTapHoldAction("hold", this._config.entities?.[key], this._updateActionFieldGeneric(key))}
                  </div>
                </div>
              `

            });
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
    const entities = { ...(this._config.entities || {}) };

    ["sub-button1", "sub-button2", "sub-button3", "sub-button4"].forEach(key => {
      delete entities[key];
    });
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  _toggleSubButtonExpand(i) {
    this._expandedSubButtons = this._expandedSubButtons.map((_, idx) => idx === i ? !this._expandedSubButtons[idx] : false);
    this.requestUpdate();
  }
  
  _renderMushroomEntitiesPanel() {
    const entityKeys = [
      { key: "entities1", label: "Entity 1" },
      { key: "entities2", label: "Entity 2" },
      { key: "entities3", label: "Entity 3" },
      { key: "entities4", label: "Entity 4" },
      { key: "entities5", label: "Entity 5" },
    ];
    if (!this._expandedMushroomEntities || this._expandedMushroomEntities.length !== 5) {
      this._expandedMushroomEntities = [false, false, false, false, false];
    }
    return x`
      <ha-expansion-panel
        class="glass-panel mushroom-panel"
        .expanded="${this._expandedPanel === 'mushroom'}"
        @expanded-changed="${e => this._onPanelExpanded('mushroom', e)}" >
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
              <span>🪄 Auto-discovery</span>
            </label>
          </div>
          <!-- Entities pills -->
          ${entityKeys.map((entity, i) => {
            const expanded = this._expandedMushroomEntities[i];
            const accent = "#36e6a0";
            return this._renderExpandablePill({
              label: entity.label,
              expanded,
              accent,
              onToggle: () => this._toggleMushroomEntityExpand(i),
              content: x`
                <div style="display:flex; flex-direction:column; gap:5px;">
                  <div class="input-group" style="flex:1; margin-bottom:0;">
                    ${this._renderEntityInput(entity.key, "entity", "mushroom")}
                  </div>
                  <div class="input-group" style="flex:1; margin-bottom:0;">
                    ${this._renderIconInput("Icon", entity.key)}
                  </div>
                </div>
                <div style="margin-bottom:6px;">
                  <span style="display:block; font-size:1.13em; font-weight:700; color:#36e6a0;">Function:</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:1px;">
                  <div style="flex:1; min-width:160px;">
                    ${this._renderTapHoldAction("tap", this._config.entities?.[entity.key], this._updateActionFieldGeneric(entity.key))}
                  </div>
                  <div style="flex:1; min-width:160px;">
                    ${this._renderTapHoldAction("hold", this._config.entities?.[entity.key], this._updateActionFieldGeneric(entity.key))}
                  </div>
                </div>
              `
            });
          })}
          <!-- Reset -->
          <div style="margin-top:1.2em; text-align:center;">
            <button class="reset-button" @click="${this._resetMushroomEntitiesConfig}">🧹 Reset Mushroom Entities</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }
  

  _toggleMushroomEntityExpand(i) {
    this._expandedMushroomEntities = this._expandedMushroomEntities.map(
      (_, idx) => idx === i ? !this._expandedMushroomEntities[idx] : false
    );
    this.requestUpdate();
  }
  
  

                
  _resetMushroomEntitiesConfig() {
    const entities = { ...(this._config.entities || {}) };

    ["entities1", "entities2", "entities3", "entities4", "entities5"].forEach(key => {
      delete entities[key];
    });
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }


  _renderCameraPanel() {
    return x`
      <ha-expansion-panel
        class="glass-panel camera-panel"
        .expanded="${this._expandedPanel === 'camera'}"
        @expanded-changed="${e => this._onPanelExpanded('camera', e)}">
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
              <span>🪄 Auto-discovery</span>
            </label>
          </div>
          <!-- Glass-pill con tutti i campi -->
          <div class="mini-pill glass-pill expanded">
            <div class="mini-pill-header">
              Entity & Icon
            </div>
            <div class="mini-pill-content">
              <div style="display:flex; flex-direction:column; gap:5px;">
                <div class="input-group" style="flex:1; margin-bottom:0;">
                  ${this._renderEntityInput("Camera (ID)", "camera", 'entity', 'camera')}
                </div>
                <div class="input-group" style="flex:1; margin-bottom:0;">
                  ${this._renderIconInput("Camera Icon", "camera")}
                </div>
              </div>
            </div>
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
    const entities = { ...(this._config.entities || {}) };

    delete entities["camera"];
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }


  _renderClimatePanel() {
    return x`
      <ha-expansion-panel
        class="glass-panel climate-panel"
        .expanded="${this._expandedPanel === 'climate'}"
        @expanded-changed="${e => this._onPanelExpanded('climate', e)}" >
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
              <span>🪄 Auto-discovery</span>
            </label>
          </div>
  
          <!-- Unica glass-pill per il gruppo di campi -->
          <div class="mini-pill glass-pill expanded">
            <div class="mini-pill-header">
              Entity & Icon
            </div>
            <div class="mini-pill-content">
              <div style="display:flex; flex-direction:column; gap:5px;">
                <div class="input-group" style="flex:1; margin-bottom:0;">
                  ${this._renderEntityInput("Climate (ID)", "climate", 'entity', 'climate')}
                </div>
                <div class="input-group" style="flex:1; margin-bottom:0;">
                  ${this._renderIconInput("Climate Icon", "climate")}
                </div>
              </div>
            </div>
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
    const entities = { ...(this._config.entities || {}) };

    delete entities["climate"];
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  _renderSingleSensorPill(key, label, index) {
    const sensor = this._config.entities?.[key] || {};
    const expanded = this._expandedSensors[index];
    const accent = "#8cff8a";
    return this._renderExpandablePill({
      label,
      expanded,
      accent,
      onToggle: () => this._toggleSensorExpand(index),
      content: x`
        <div style="display:flex; flex-direction:column; gap:5px;">
          <div class="input-group" style="flex:2; margin-bottom:0;">
            <label>Sensor Type</label>
            <select
              style="width:100%;"
              .value="${sensor.type || ''}"
              @change="${e => this._updateSensor(index, 'type', e.target.value)}"
            >
              <option value="">-- none --</option>
              ${Object.entries(SENSOR_TYPE_MAP).map(
                ([type, { emoji, label }]) =>
                  x`<option value="${type}">${emoji} ${label}</option>`
              )}
            </select>
          </div>
          <div class="input-group" style="flex:2; margin-bottom:0;">
            ${this._renderEntityInput(key, "entity", "sensor")}
          </div>
          <div style="display:flex; flex-direction:column; gap:5px;">
            <label>Unit</label>
            <select
              style="width:100%;"
              .value="${sensor.unit || (SENSOR_TYPE_MAP[sensor.type]?.units[0] || '')}"
              @change="${e => this._updateSensor(index, 'unit', e.target.value)}"
            >
              ${(SENSOR_TYPE_MAP[sensor.type]?.units || []).map(u =>
                x`<option value="${u}">${u}</option>`
              )}
            </select>
          </div>
        </div>
      `
    });
  }
  
  
  _renderSensorPanel() {
    // Defensive: always length 6 for 6 sensors
    if (!this._expandedSensors || this._expandedSensors.length !== 6) {
      this._expandedSensors = [false, false, false, false, false, false];
    }
    const sensorKeys = ['sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5', 'sensor6'];
  
    return x`
      <ha-expansion-panel
        class="glass-panel sensor-panel"
        .expanded="${this._expandedPanel === 'sensor'}"
        @expanded-changed="${e => this._onPanelExpanded('sensor', e)}" >
        <div slot="header" class="glass-header sensor-header">🧭 Sensors</div>
        <div class="glass-content sensor-content">
          <!-- Auto-discovery -->
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
              <span>🪄 Auto-discovery enabled</span>
            </label>
          </div>
  
          <!-- 2 rows, 3 sensors per row -->
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${sensorKeys.map((key, i) => this._renderSingleSensorPill(key, `SENSOR ${i+1}`, i))}
            </div>
          </div>
  
          <!-- Reset -->
          <div style="margin-top:1.2em; text-align:center;">
            <button class="reset-button" @click="${this._resetSensorConfig}">🧹 Reset Sensors</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }
  
  
  _toggleSensorExpand(i) {
    this._expandedSensors = this._expandedSensors.map((_, idx) => idx === i);
    this.requestUpdate();
  }
  
  
  _resetSensorConfig() {
    const entities = { ...(this._config.entities || {}) };
    ["sensor1", "sensor2", "sensor3", "sensor4", "sensor5", "sensor6"].forEach(key => {
      delete entities[key];
    });
    this._config = { ...this._config, entities };
    this.requestUpdate();
    this._fireConfigChanged();
  }
  
  _renderColorPanel() {
    // Difensivo: sempre 2 elementi (Room, Subbutton)
    if (!this._expandedColors || this._expandedColors.length !== 2) {
      this._expandedColors = [false, false];
    }
  
    // Valore larghezza massima per ogni box (puoi regolarlo)
    const colorBoxStyle = "flex:1 1 0; max-width: 250px; min-width: 0;";
  
    return x`
      <ha-expansion-panel
        class="glass-panel colors-panel"
        .expanded="${this._expandedPanel === 'colors'}"
        @expanded-changed="${e => this._onPanelExpanded('colors', e)}" >
        <div slot="header" class="glass-header colors-header">🎨 Colors</div>
        <div class="glass-content colors-content">
          <!-- Pillola: Room -->
          ${this._renderExpandablePill({
            label: "Room",
            expanded: this._expandedColors[0],
            accent: "#55afff",
            onToggle: () => this._toggleColorExpand(0),
            content: x`
              <div class="input-group color-row">
                <div style="display: flex; gap:12px; margin-bottom:4px;">
                  <div style="flex:1;"><span style="font-weight:700; color:#55afff;">Background Active</span></div>
                  <div style="flex:1;"><span style="font-weight:700; color:#55afff;">Background Inactive</span></div>
                </div>
                <div style="display: flex; gap:12px;">
                  <div style="${colorBoxStyle}">
                    ${this._renderColorField('room', 'background_active')}
                  </div>
                  <div style="${colorBoxStyle}">
                    ${this._renderColorField('room', 'background_inactive')}
                  </div>
                </div>
              </div>
              <div class="input-group color-row">
                <div style="display: flex; gap:12px; margin-bottom:4px;">
                  <div style="flex:1;"><span style="font-weight:700; color:#55afff;">Icon Active</span></div>
                  <div style="flex:1;"><span style="font-weight:700; color:#55afff;">Icon Inactive</span></div>
                </div>
                <div style="display: flex; gap:12px;">
                  <div style="${colorBoxStyle}">
                    ${this._renderColorField('room', 'icon_active')}
                  </div>
                  <div style="${colorBoxStyle}">
                    ${this._renderColorField('room', 'icon_inactive')}
                  </div>
                </div>
              </div>
            `
          })}
  
          <!-- Pillola: Subbutton -->
          ${this._renderExpandablePill({
            label: "Subbutton",
            expanded: this._expandedColors[1],
            accent: "#b28fff",
            onToggle: () => this._toggleColorExpand(1),
            content: x`
              <div class="input-group color-row">
                <div style="display: flex; gap:12px; margin-bottom:4px;">
                  <div style="flex:1;"><span style="font-weight:700; color:#b28fff;">Background Active</span></div>
                  <div style="flex:1;"><span style="font-weight:700; color:#b28fff;">Background Inactive</span></div>
                </div>
                <div style="display: flex; gap:12px;">
                  <div style="${colorBoxStyle}">
                    ${this._renderColorField('subbutton', 'background_active')}
                  </div>
                  <div style="${colorBoxStyle}">
                    ${this._renderColorField('subbutton', 'background_inactive')}
                  </div>
                </div>
              </div>
              <div class="input-group color-row">
                <div style="display: flex; gap:12px; margin-bottom:4px;">
                  <div style="flex:1;"><span style="font-weight:700; color:#b28fff;">Icon On</span></div>
                  <div style="flex:1;"><span style="font-weight:700; color:#b28fff;">Icon Off</span></div>
                </div>
                <div style="display: flex; gap:12px;">
                  <div style="${colorBoxStyle}">
                    ${this._renderColorField('subbutton', 'icon_on')}
                  </div>
                  <div style="${colorBoxStyle}">
                    ${this._renderColorField('subbutton', 'icon_off')}
                  </div>
                </div>
              </div>
            `
          })}
  
          <!-- Reset -->
          <div style="margin-top:1.5em; text-align:center;">
            <button class="reset-button" @click="${this._resetColorsConfig}">🧹 Reset Colors</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }
  
  
  _toggleColorExpand(i) {
    this._expandedColors = this._expandedColors.map((_, idx) => idx === i ? !this._expandedColors[idx] : false);
    this.requestUpdate();
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

var bubbleRoomEditor = /*#__PURE__*/Object.freeze({
  __proto__: null
});
