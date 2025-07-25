// Bubble Room v4.0
// https://github.com/mon3y78/Lovelace-Bubble-room
// Autore: mon3y78 (https://github.com/mon3y78)

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
  // Memoization cache per le icone
  _getBestIconCache = {};

  constructor() {
    super();
    this._iconAreaSize = { w: 130, h: 140 };   // area icona principale/mushroom
    this._subButtonSize = { w: 48, h: 48 };    // area di una cella subbutton
    this._resizeObserver = null;
    this._getBestIconCache = {};
  }
  connectedCallback() {
    super.connectedCallback();
    this._resizeNameFontDebounced = this._debounce(this._resizeNameFont.bind(this), 150);
    window.addEventListener('resize', this._resizeNameFontDebounced);
    if (!document.getElementById('bubble-room-bebas-font')) {
      const link = document.createElement('link');
      link.id = 'bubble-room-bebas-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
      document.head.appendChild(link);
    }
  }
  updated(changedProperties) {
    const iconArea = this.renderRoot?.querySelector('.icon-area');
    if (iconArea) {
      const rect = iconArea.getBoundingClientRect();
      this._iconAreaSize = { w: rect.width, h: rect.height };
    }
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
    if (changedProperties.has('config')) {
      this._resizeNameFont();
    }
  }

  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._resizeNameFontDebounced) {
      window.removeEventListener('resize', this._resizeNameFontDebounced);
    }
    super.disconnectedCallback();
  }
  firstUpdated() {
    super.firstUpdated && super.firstUpdated();
    this._resizeObserver = new ResizeObserver(() => this._resizeNameFont());
    const container = this.shadowRoot.querySelector('.room-name')?.parentElement;
    if (container) this._resizeObserver.observe(container);
  }

  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object },
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
    // Precalcolo subButtons (accetta solo oggetti con .entity)
    this._subButtons = [];
    ["sub-button1", "sub-button2", "sub-button3", "sub-button4"].forEach(key => {
      const btn = this.config.entities[key];
      if (btn && typeof btn === "object" && btn.entity) this._subButtons.push(btn);
    });

    // Precalcolo mushroomTemplates
    this._mushroomTemplates = [];
    ["entities1", "entities2", "entities3", "entities4", "entities5", "climate", "camera"].forEach(key => {
      const ent = this.config.entities[key];
      if (ent && typeof ent === "object" && ent.entity) this._mushroomTemplates.push(ent);
    });

    // Precalcolo sensori stanza
    this._sensorEntities = [];
    for (let i = 1; i <= 6; i++) {
      const key = `sensor${i}`;
      const s = this.config.entities[key];
      if (s && typeof s === "object" && s.entity) this._sensorEntities.push(s);
    }

    // Precalcolo array subButtons, mushroomTemplates e sensorEntities
    const subButtons = this._subButtons;
    const mushroomTemplates = this._mushroomTemplates;
    const sensorEntities = this._sensorEntities;

  }

  getConfig() { return JSON.parse(JSON.stringify(this.config)); }
  _getSubButtonStates() {
    // Restituisce i subbutton con già lo stato corrente calcolato (più efficiente)
    return (this._subButtons || []).map(btn => ({
      ...btn,
      state: this.hass.states[btn.entity]?.state || 'off'
    }));
  }
  _getMushroomTemplatesStates() {
    // Restituisce mushroom templates con stato corrente già calcolato
    return (this._mushroomTemplates || []).map(item => ({
      ...item,
      state: this.hass.states[item.entity]?.state || 'off'
    }));
  }
  _getSensorEntitiesStates() {
    // Restituisce i sensori con stato e valore già calcolato
    return (this._sensorEntities || []).map(s => {
      const entityId = s.entity;
      let state = entityId ? (this.hass.states[entityId]?.state ?? 'N/A') : '?';
      if (!isNaN(parseFloat(state))) state = Math.floor(parseFloat(state)).toString();
      const { emoji, unit } = this._getSensorEmojiAndUnit(s.type, s.unit);
      return { ...s, value: `${emoji} ${state}${unit}` };
    });
  }
  
  _getMushroomEntitiesStates() {
    // Restituisce le bubble interne con stato attuale e colore icona già calcolato
    const roomColors = this.config?.colors?.room || {};
    return (this._mushroomTemplates || []).map((item, i) => {
      const entityId = item.entity;
      const state = entityId ? (this.hass.states[entityId]?.state ?? 'off') : 'off';
      const iconColor = state === 'on'
        ? (roomColors.mushroom_active || 'orange')
        : (roomColors.mushroom_inactive || '#80808055');
      return { ...item, state, iconColor, index: i };
    });
  }
  
  _getSubButtonsStates() {
    // Restituisce i sub-buttons già arricchiti con stato e colori
    const { subbutton = {} } = this.config.colors || {};
    return (this._subButtons || []).map((btn) => {
      const entityId = btn.entity;
      const state = entityId ? (this.hass.states[entityId]?.state ?? 'off') : 'off';
      const btnColor = state === 'on'
        ? (subbutton.background_on || subbutton.color_on || 'rgba(0,0,255,1)')
        : (subbutton.background_off || subbutton.color_off || 'rgba(0,0,255,0.3)');
      const iconColor = state === 'on'
        ? (subbutton.icon_on || 'yellow')
        : (subbutton.icon_off || '#666');
      return { ...btn, state, btnColor, iconColor };
    });
  }

  _getSensorEntitiesStates() {
    // Restituisce fino a 6 sensori stanza arricchiti con stato, emoji, unità
    return (this._sensorEntities || []).map((sensor) => {
      const entityId = sensor.entity;
      let state = entityId ? (this.hass.states[entityId]?.state ?? 'N/A') : '?';
      if (!isNaN(parseFloat(state))) state = Math.floor(parseFloat(state)).toString();
      const { emoji, unit } = this._getSensorEmojiAndUnit(sensor.type, sensor.unit);
      return { ...sensor, state, emoji, unit };
    });
  }
  
  
  static get styles() {
    // ... CSS INVARIATO ...
    return css`
      :host, ha-card, .card, .grid-container { height: 100%; width: 100%; min-height: 0; min-width: 0; margin: 0 !important; padding: 0 !important; box-sizing: border-box; }
      .card { position: relative; overflow: hidden; border-radius: 8px; background: transparent; margin: 0 !important; padding: 0 !important; }
      .grid-container { display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: 1fr; align-items: stretch; height: 100%; min-height: 0; min-width: 0; }
      .left-content { display: grid; grid-template-rows: 0.5fr 2.5fr 7fr; height: 100%; min-height: 0; min-width: 0; box-sizing: border-box; }
      .name-area { display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; font-family: "Bebas Neue", "Arial Narrow", sans-serif; text-transform: uppercase; overflow: hidden; }
      #nameText { display: block; white-space: nowrap; text-align: center; line-height: 1; vertical-align: middle; width: 100 %; height: 100 %; }
      .icon-area { position: relative; display: flex; justify-content: flex-start; align-items: center; padding-left: 0%; min-height: 0; min-width: 0; height: 100%; }
      .bubble-icon-container { width: 100%; height: 100%; min-height: 0; min-width: 0; display: flex; justify-content: center; align-items: center; flex-grow: 1; flex-basis: 0; background-color: var(--bubble-bg, rgba(0, 128, 0, 0.3)); border-radius: 0; }
      .mushroom-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
      .mushroom-item { position: absolute; transform: translate(-50%, -50%); pointer-events: auto; cursor: pointer; }
      .subbutton-column { display: grid; grid-template-rows: repeat(4, 1fr); gap: 2%; height: 100%; min-height: 0; min-width: 0; padding: 2%; box-sizing: border-box; }
      .bubble-sub-button { display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; border-radius: 10px; cursor: pointer; background-color: var(--sub-button-color, rgba(0,0,255,0.3)); min-height: 0; min-width: 0; }
      .bubble-icon { transform: scale(1.0); transform-origin: center center; }
      .mushroom-icon { transform: scale(0.7); transform-origin: center center; }
      .subbutton-icon { transform: scale(1.4); transform-origin: center center; }
      .sensor-rows { display: flex; flex-direction: column; width: 100%; box-sizing: border-box; }
      .sensor-row { display: flex; flex-direction: row; align-items: center; width: 100%; box-sizing: border-box; min-height: 8px; }
      .sensor { flex: 1 1 0; text-align: center; padding: 0 2px; min-width: 0; box-sizing: border-box; }
      @media (max-width: 480px) { .bubble-icon-container { width: 70%; } }
    `;
  }
// Aggiungi all'interno della classe BubbleRoom
  shouldUpdate(changedProps) {
    // Aggiorna solo se cambiano config o hass (stato Home Assistant)
    return changedProps.has('config') || changedProps.has('hass');
  }

  render() {
    this._getBestIconCache = {};
    const mainSize = this._getMainIconSize();
    const mushroomSize = this._getMushroomIconSize();
    const subBtnSize = this._getSubButtonIconSize();
    const subButtons = this._subButtons || [];
    const mushroomTemplates = this._mushroomTemplates || [];
    const sensorEntities = this._sensorEntities || [];
    if (!this.config || !this.hass) {
      return html`<div>Loading...</div>`;
    }
    const { entities } = this.config;
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

    return html`
      <div class="card">
        <div class="grid-container">
          <!-- Colonna sinistra -->
          <div class="left-content">
            <!-- Riga sensori -->
            <div class="sensor-rows">
              ${[0,1].map(row =>
                html`<div class="sensor-row">
                  ${this._getSensorEntitiesStates().slice(row*3, row*3+3).map(sensor => sensor
                    ? html`<div class="sensor">${sensor.emoji} ${sensor.state}${sensor.unit}</div>`
                    : html`<div class="sensor"></div>`
                  )}
                </div>`
              )}
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
                ${this._getMushroomEntitiesStates().map((item) => {
                  if (!item || !this._bubbleContainerSize) return html``;
                  const ratios = [
                    { x: 0.15, y: 0.13 },
                    { x: 0.55, y: 0.13 },
                    { x: 0.81, y: 0.33 },
                    { x: 0.82, y: 0.65 },
                    { x: 0.55, y: 0.87 },
                    { x: 0.15, y: 0.87 }, // CLIMATE
                    { x: 0.9, y: 0.05 },  // CAMERA
                  ];
                  const sizes = [
                    mushroomSize, mushroomSize, mushroomSize,
                    mushroomSize, mushroomSize,
                    Math.round(this._bubbleContainerSize.w * 0.20), // CLIMATE
                    Math.round(this._bubbleContainerSize.w * 0.20), // CAMERA
                  ];
                  const ratio = ratios[item.index] || { x: 0.5, y: 0.5 };
                  const size = sizes[item.index] || mushroomSize;
                  const x = this._bubbleContainerSize.w * ratio.x;
                  const y = this._bubbleContainerSize.h * ratio.y;
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
                          color: ${item.iconColor};
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
            ${this._getSubButtonsStates().map(btn => html`
              <div class="bubble-sub-button"
                    style="--sub-button-color:${btn.btnColor};"
                    @pointerdown="${(e) => this._startHold(e, btn)}"
                    @pointerup="${(e) => this._endHold(e, btn, () => this._handleSubButtonTap(btn))}"
                    @pointerleave="${(e) => this._cancelHold(e)}" >
                <ha-icon class="subbutton-icon"
                        icon="${this._getBestIcon(btn.entity, btn)}"
                        style="
                          color: ${btn.iconColor};
                          --mdc-icon-size: ${this._getSubButtonIconSize()}px;
                          width: ${this._getSubButtonIconSize()}px;
                          height: ${this._getSubButtonIconSize()}px;
                        ">
                </ha-icon>
              </div>
            `)}
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
  _startHold(e, item) { e.stopPropagation(); this._holdTriggered = false; this._holdTimeout = setTimeout(() => { this._holdTriggered = true; this._handleHoldAction(item); }, 500);}
  _endHold(e, item, clickCallback) { e.stopPropagation(); clearTimeout(this._holdTimeout); if (!this._holdTriggered) clickCallback(); this._holdTriggered = false; }
  _cancelHold(e) { clearTimeout(this._holdTimeout); this._holdTriggered = false; }
  _handleMainIconTap() { if (!this.config.tap_action) return; const action = this.config.tap_action.action; if (action === 'toggle') this._toggleEntity(this.config.entity); else if (action === 'more-info') this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: this.config.entity }, bubbles: true, composed: true, })); else if (action === 'navigate') { if (this.config.tap_action.navigation_path) { window.history.pushState({}, '', this.config.tap_action.navigation_path); window.dispatchEvent(new Event('location-changed')); } } }
  _toggleEntity(entity) { if (!this.hass) return; this.hass.callService('homeassistant', 'toggle', { entity_id: entity }); }
  _handleHoldAction(item) { if (!item.hold_action) { this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: item.entity }, bubbles: true, composed: true, })); return; } const action = item.hold_action.action; switch (action) { case 'more-info': this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: item.entity }, bubbles: true, composed: true, })); break; case 'toggle': this._toggleEntity(item.entity); break; case 'call-service': if (item.hold_action.service) { const [domain, serviceName] = item.hold_action.service.split('.'); const serviceData = item.hold_action.service_data || {}; if (!serviceData.entity_id) { serviceData.entity_id = item.entity; } this.hass.callService(domain, serviceName, serviceData); } break; case 'navigate': if (item.hold_action.navigation_path) { window.history.pushState({}, '', item.hold_action.navigation_path); window.dispatchEvent(new Event('location-changed')); } break; default: }}
  _handleSubButtonTap(item) { if (!item.tap_action || item.tap_action.action === 'none') return; const action = item.tap_action.action; if (action === 'toggle') this._toggleEntity(item.entity); else if (action === 'more-info') this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: item.entity }, bubbles: true, composed: true, })); else if (action === 'navigate') { if (item.tap_action.navigation_path) { window.history.pushState({}, '', item.tap_action.navigation_path); window.dispatchEvent(new Event('location-changed')); } } }
  _handleMushroomTap(item) { if (!item.tap_action || item.tap_action.action === 'none') return; const action = item.tap_action.action; if (action === 'toggle') this._toggleEntity(item.entity); else if (action === 'more-info') this.dispatchEvent(new CustomEvent("hass-more-info", {detail: { entityId: item.entity }, bubbles: true, composed: true, })); else if (action === 'navigate') { if (item.tap_action.navigation_path) { window.history.pushState({}, '', item.tap_action.navigation_path); window.dispatchEvent(new Event('location-changed')); } } }
  _getBestIcon(entityId, entityConf) {
    // Memoization: chiave unica su entityId + eventuale icon di config
    const key = entityId + '|' + (entityConf?.icon || '');
    if (this._getBestIconCache[key]) {
      return this._getBestIconCache[key];
    }
    if (entityConf.icon) {
      this._getBestIconCache[key] = entityConf.icon;
      return entityConf.icon;
    }
    const stateObj = this.hass?.states?.[entityId];
    if (stateObj && stateObj.attributes && stateObj.attributes.icon) {
      this._getBestIconCache[key] = stateObj.attributes.icon;
      return stateObj.attributes.icon;
    }
    const deviceClass = stateObj?.attributes?.device_class;
    const domain = entityId ? entityId.split('.')[0] : '';
    const state = stateObj?.state;
    if (deviceClass) {
      const dcIcon = this._getDeviceClassIcon(deviceClass, state);
      if (dcIcon) {
        this._getBestIconCache[key] = dcIcon;
        return dcIcon;
      }
    }
    const domainIcon = this._getDomainDefaultIcon(domain, state) || 'mdi:information-outline';
    this._getBestIconCache[key] = domainIcon;
    return domainIcon;
  }
  _getDeviceClassIcon(deviceClass, state) { const icons = DEVICE_CLASS_ICON_MAP[deviceClass]; if (!icons) return ''; if (icons.on && icons.off) { return state === 'on' ? icons.on : icons.off; } return icons.on || ''; }
  _getDomainDefaultIcon(domain, state) { if (domain === 'cover') return state === 'open' ? 'mdi:blinds-open' : 'mdi:blinds-closed'; if (domain === 'lock') return state === 'locked' ? 'mdi:lock' : 'mdi:lock-open'; if (domain === 'door') return state === 'open' ? 'mdi:door-open' : 'mdi:door-closed'; if (domain === 'window') return state === 'open' ? 'mdi:window-open' : 'mdi:window-closed'; if (domain === 'binary_sensor') return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off'; return DOMAIN_ICON_MAP[domain] || ''; }
  _getSensorEmojiAndUnit(sensorType, unit = 'C') { const data = SENSOR_TYPE_MAP[sensorType]; if (!data) return { emoji: '❓', unit: '' }; const unitFinal = sensorType === 'temperature' ? (unit === 'F' ? data.unitF : data.unitC) : data.unit; return { emoji: data.emoji, unit: unitFinal }; }
  _resizeNameFont() {
    const container = this.renderRoot?.querySelector('#nameArea');
    const text = this.renderRoot?.querySelector('#nameText');
    if (!container || !text) return;
  
    let maxFont = 300, minFont = 5, fontSize = maxFont;
    let spacing = 0.01 * maxFont; // 2% della font size
    text.style.letterSpacing = `${spacing}px`;
    text.style.fontSize = `${fontSize}px`;
  
    // LOG DEBUG iniziale
    console.log('INIZIO', {
      containerW: container.offsetWidth,
      containerH: container.offsetHeight,
      textW: text.offsetWidth,
      textH: text.offsetHeight,
      fontSize
    });
  
    if (text.offsetWidth > container.offsetWidth || text.offsetHeight > container.offsetHeight) {
      spacing = 0;
      text.style.letterSpacing = `${spacing}px`;
      text.style.fontSize = `${fontSize}px`;
    }
  
    while ((text.offsetWidth > container.offsetWidth || text.offsetHeight > container.offsetHeight) && fontSize > minFont) {
      fontSize -= 1;
      text.style.fontSize = `${fontSize}px`;
      // LOG DEBUG ad ogni step
      console.log('CICLO', {
        containerW: container.offsetWidth,
        containerH: container.offsetHeight,
        textW: text.offsetWidth,
        textH: text.offsetHeight,
        fontSize
      });
    }
  }


  _debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
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
    return Math.round(Math.min(this._iconAreaSize.w, this._iconAreaSize.h) * 0.65);
  }
  _getMushroomIconSize() {
    return Math.round(Math.min(this._iconAreaSize.w, this._iconAreaSize.h) * 0.25);
  }
  _getSubButtonIconSize() {
    return Math.round(Math.min(this._subButtonSize.w, this._subButtonSize.h) * 0.6);
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