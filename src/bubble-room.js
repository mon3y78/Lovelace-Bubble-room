import { LitElement, html, css } from 'https://unpkg.com/lit@2.6.1/index.js?module';

class BubbleRoom extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object },
    };
  }
  
  // Supporto all'editor visivo (assicurati che il file bubble-room-editor-dev.js esista)
  static async getConfigElement() {
    await import('./bubble-room-editor-dev.js');
    return document.createElement('bubble-room-editor-dev');
  }
  
  // Configurazione stub di base (default)
  static getStubConfig() {
    return {
      entities: {
        // Per "presence" forniamo solamente l'entity (senza tap_action)
        presence: {
          entity: 'binary_sensor.aqara_fp1_presence'
        },
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
        // Gestione del clima come entità oggetto
        climate: { 
          entity: 'climate.termostato_salotto', 
          icon: 'mdi:thermostat', 
          tap_action: { action: 'more-info' } 
        },
        entities1: { entity: 'sensor.some_sensor1', icon: 'mdi:information-outline' },
        entities2: { entity: 'sensor.some_sensor2', icon: 'mdi:information-outline' },
        entities3: { entity: 'sensor.some_sensor3', icon: 'mdi:information-outline' },
        entities4: { entity: 'sensor.some_sensor4', icon: 'mdi:information-outline' },
        entities5: { entity: 'sensor.some_sensor5', icon: 'mdi:information-outline' },
        // Template per temperatura/umidità

      },
      colors: {
        room: {
          color_active: 'rgba(var(--color-green), 1)',
          color_inactive: 'rgba(var(--color-green), 0.3)',
          icon_on: 'orange',
          icon_off: '#80808055'
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
  
  // Funzione di default per il posizionamento dei mushroom template
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
  
  // Normalizzazione delle entità
  setConfig(config) {
    config = JSON.parse(JSON.stringify(config));
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
      throw new Error("La configurazione deve essere un oggetto valido.");
    }
    if (!config.entities || typeof config.entities !== 'object') {
      throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");
    }
    const keysWithIcon = [
      'presence',
      'sub-button1',
      'sub-button2',
      'sub-button3',
      'sub-button4',
      'entities1',
      'entities2',
      'entities3',
      'entities4',
      'entities5',
      'climate'
    ];
    // Impostiamo il default per le azioni per le entità (eccetto per "presence")
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
          for (const prop in value) {
            if (!/^\d+$/.test(prop)) {
              newValue[prop] = value[prop];
            }
          }
          const numericKeys = Object.keys(value).filter(k => /^\d+$/.test(k));
          if (numericKeys.length > 0) {
            newValue.entity = numericKeys.sort((a, b) => Number(a) - Number(b))
              .map(k => value[k])
              .join("");
          }
          value = newValue;
        }
      }
      if (key === 'climate' && typeof value === 'string') {
        value = { entity: value, icon: defaultIcons['climate'], ...defaultAction };
      }
      if (typeof value === 'string') {
        if (keysWithIcon.includes(key)) {
          if (key === 'presence') {
            // Per "presence", se la configurazione è una stringa, usiamo solo l'entity e l'icona
            entities[key] = { entity: value, icon: defaultIcons[key] };
          } else {
            entities[key] = { entity: value, icon: defaultIcons[key], ...defaultAction };
          }
        } else {
          entities[key] = value;
        }
      } else if (typeof value === 'object') {
        if (keysWithIcon.includes(key)) {
          if (!value.icon) { value.icon = defaultIcons[key]; }
          if (['entities1','entities2','entities3','entities4','entities5','camera'].includes(key) && !value.style) {
            let index = key === 'camera' ? 6 : parseInt(key.replace('entities','')) - 1;
            value.style = this._defaultMushroomStyle(index);
          }          
          if (key === 'presence') {
            // Per "presence", non aggiungiamo defaultAction
            entities[key] = { ...value };
          } else {
            entities[key] = { ...defaultAction, ...value };
          }
        } else {
          entities[key] = value;
        }
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
    
  };

  
  getConfig() {
    return JSON.parse(JSON.stringify(this.config));
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
        grid-template-columns: 35% 35% 10% 20%;
        grid-template-rows: 25% 25% 25% 25%;
      }
      .name-area {
        grid-area: n;
        display: flex;
        align-items: center;
        padding-left: 5px;
        margin-top: 5px;
        margin-left: 0;
        font-size: 30px;
        font-weight: bold;
        color: inherit;
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
        height: var(--sub-button-height, 48px);
        border-radius: 10px;
        margin: 5px 0 0 0;
        cursor: pointer;
        background-color: var(--sub-button-color);
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
      }
    `;
  }
  
  // --- Gestione del hold/tap tramite eventi pointer ---
  _startHold(e, item) {
    e.stopPropagation();
    this._holdTriggered = false;
    this._holdTimeout = setTimeout(() => {
      this._holdTriggered = true;
      this._handleHoldAction(item);
    }, 500); // Soglia hold: 500ms
  }
  
  _endHold(e, item, clickCallback) {
    e.stopPropagation();
    clearTimeout(this._holdTimeout);
    if (!this._holdTriggered) {
      clickCallback();
    }
    this._holdTriggered = false;
  }
  
  _cancelHold(e) {
    clearTimeout(this._holdTimeout);
    this._holdTriggered = false;
  }
  // -----------------------------------------------------
  
  _handleMainIconTap() {
    console.log("Main icon tapped", this.config.tap_action);
    if (!this.config.tap_action) return;
    const action = this.config.tap_action.action;
    if (action === 'toggle') {
      this._toggleEntity(this.config.entity);
    } else if (action === 'more-info') {
      this.dispatchEvent(new CustomEvent("hass-more-info", {
        detail: { entityId: this.config.entity },
        bubbles: true,
        composed: true,
      }));
    } else if (action === 'navigate') {
      if (this.config.tap_action.navigation_path) {
        window.history.pushState({}, '', this.config.tap_action.navigation_path);
        window.dispatchEvent(new Event('location-changed'));
      } else {
        console.warn('navigation_path non definito per l\'azione navigate della main icon.');
      }
    }
  }
  
  _toggleEntity(entity) {
    if (!this.hass) return;
    console.log("Toggling entity:", entity);
    this.hass.callService('homeassistant', 'toggle', { entity_id: entity });
  }
  
  // Gestione dell'azione hold in base alla configurazione
  _handleHoldAction(item) {
    if (!item.hold_action) {
      this.dispatchEvent(new CustomEvent("hass-more-info", {
        detail: { entityId: item.entity },
        bubbles: true,
        composed: true,
      }));
      return;
    }
    const action = item.hold_action.action;
    switch (action) {
      case 'more-info':
        this.dispatchEvent(new CustomEvent("hass-more-info", {
          detail: { entityId: item.entity },
          bubbles: true,
          composed: true,
        }));
        break;
      case 'toggle':
        this._toggleEntity(item.entity);
        break;
      case 'call-service':
        if (item.hold_action.service) {
          const [domain, serviceName] = item.hold_action.service.split('.');
          const serviceData = item.hold_action.service_data || {};
          if (!serviceData.entity_id) { serviceData.entity_id = item.entity; }
          this.hass.callService(domain, serviceName, serviceData);
        }
        break;
      case 'navigate':
        if (item.hold_action.navigation_path) {
          window.history.pushState({}, '', item.hold_action.navigation_path);
          window.dispatchEvent(new Event('location-changed'));
        } else {
          console.warn('navigation_path non definito in hold_action.');
        }
        break;
      default:
        console.warn(`Azione hold_action "${action}" non supportata.`);
    }
  }
  
  // Funzione dedicata per gestire il tap dei sub-button
  _handleSubButtonTap(item) {
    console.log("Handling sub-button tap", item);
    if (!item.tap_action || item.tap_action.action === 'none') return;
    const action = item.tap_action.action;
    if (action === 'toggle') {
      this._toggleEntity(item.entity);
    } else if (action === 'more-info') {
      this.dispatchEvent(new CustomEvent("hass-more-info", {
        detail: { entityId: item.entity },
        bubbles: true,
        composed: true,
      }));
    } else if (action === 'navigate') {
      if (item.tap_action.navigation_path) {
        window.history.pushState({}, '', item.tap_action.navigation_path);
        window.dispatchEvent(new Event('location-changed'));
      } else {
        console.warn('navigation_path non definito per l\'azione navigate nel sub-button.');
      }
    }
  }
  
  // Per i mushroom template usiamo la funzione già esistente
  _handleMushroomTap(item) {
    console.log("Handling mushroom tap", item);
    if (!item.tap_action || item.tap_action.action === 'none') return;
    const action = item.tap_action.action;
    if (action === 'toggle') {
      this._toggleEntity(item.entity);
    } else if (action === 'more-info') {
      this.dispatchEvent(new CustomEvent("hass-more-info", {
        detail: { entityId: item.entity },
        bubbles: true,
        composed: true,
      }));
    } else if (action === 'navigate') {
      if (item.tap_action.navigation_path) {
        window.history.pushState({}, '', item.tap_action.navigation_path);
        window.dispatchEvent(new Event('location-changed'));
      } else {
        console.warn('navigation_path non definito per l\'azione navigate nel mushroom tap.');
      }
    }
  }
  
  render() {
    const layout = this._getLayoutStyle(this.config.layout_mode || "6x3");
    if (!this.config || !this.hass) {
      console.log("bubble-room.js: config or hass not defined yet");
      return html`<div>Loading...</div>`;
    }
  
    const { entities, colors, name, icon } = this.config;
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
      ? roomColors.icon_on || 'orange'
      : roomColors.icon_off || '#80808055';
    console.log('bubbleIconColor', bubbleIconColor);

    
    
  
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
    if (entities.climate) { mushroomTemplates.push(entities.climate); }
    // Sensori ambientali
    const sensorStrings = [];
    [1, 2, 3, 4].forEach(i => {
      const sensor = entities[`sensor${i}`];
      if (!sensor || !sensor.entity || !sensor.type) return;
      const value = hass.states[sensor.entity]?.state || 'N/A';
      const { emoji, unit } = this._getSensorEmojiAndUnit(sensor.type, sensor.unit);
      sensorStrings.push(`${emoji} ${value}${unit}`);
    });

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
          <div class="name-area" style="color: ${nameColor}; font-size: ${layout.nameFont};">
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
                       icon="${icon}"
                       style="color: ${bubbleIconColor}; --mdc-icon-size: ${layout.iconSize}; width: ${layout.iconSize}; height: ${layout.iconSize};"
              </ha-icon>
            </div>
  
            <!-- Mushroom templates -->
            <div class="mushroom-container">
              ${mushroomTemplates.map((item, index) => {
                if (!item) return html``;
              
                const style = layout.mushroomPositions[index] || this._defaultMushroomStyle(index);
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
                    <ha-icon icon="${item.icon}"
                            style="color: ${iconColor}; --mdc-icon-size: ${layout.mushroomSize}; width: ${layout.mushroomSize}; height: ${layout.mushroomSize};">
                    </ha-icon>
                  </div>
                `;
              })}
            
              ${sensorStrings.length > 0 ? html`
                <div class="mushroom-item"
                    style="${layout.mushroomPositions[6]}; font-size: ${layout.mushroomSize};"
                    title="Environmental Sensors">
                  <div class="mushroom-primary"
                      style="
                        font-size: calc(${layout.mushroomSize} * 0.55);
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
                  <ha-icon icon="${btn.icon}"
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
  
  
  
  set hass(hass) {
    this._hass = hass;
    this.requestUpdate();
  }
  
  get hass() {
    return this._hass;
  }
  
  // Funzione per gestire il tap della main icon (già esistente)
  // (Rimane invariata)
  
  
  // Funzione per gestire il tap dei mushroom template (già esistente)

  _getSensorEmojiAndUnit(sensorType, unit = 'C') {
    const map = {
      temperature: { emoji: '🌡️', unitC: '°C', unitF: '°F' },
      humidity: { emoji: '💦', unit: '%' },
      co2: { emoji: '🟢', unit: 'ppm' },
      illuminance: { emoji: '☀️', unit: 'lx' },
      pm1: { emoji: '🟤', unit: 'µg/m³' },
      pm25: { emoji: '⚫️', unit: 'µg/m³' },
      pm10: { emoji: '⚪️', unit: 'µg/m³' },
      uv: { emoji: '🌞', unit: 'UV' },
      noise: { emoji: '🔊', unit: 'dB' },
      pressure: { emoji: '📈', unit: 'hPa' },
      voc: { emoji: '🧪', unit: 'ppb' },
    };
    const data = map[sensorType];
    if (!data) return { emoji: '❓', unit: '' };
    const unitFinal = sensorType === 'temperature' ? (unit === 'F' ? data.unitF : data.unitC) : data.unit;
    return { emoji: data.emoji, unit: unitFinal };
  }
  
  _getLayoutStyle(mode) {
    const layoutMap = {
      '6x3': {
        cardHeight: '190px',
        iconSize: '75px',
        nameFont: '28px',
        mushroomSize: '33px',
        subButtonPadding: '10px',
        mushroomPositions: [
          'top: -77px; left: 0px;',
          'top: -85px; left: 38px;',
          'top: -64px; left: 77px;',
          'bottom: 39px; left: 96px;',
          'bottom: -1px; left: 85px;',
          'bottom: -2px; left: -2px;',
          'top: -140px; left: 5px;',
          'top: -95px; right: 5px;',
        ],
        gridTemplate: `
          "n n n b"
          "i i . b"
          "i i . b"
          "i i . b"`,
        gridColumns: '35% 35% 10% 20%',
        gridRows: '25% 25% 25% 25%',
        subButtonPadding: '10px',
        subButtonHeight: '48px',
        subButtonIconSize: '26px',
      },
      '12x4': {
        cardHeight: '250px',
        iconSize: '95px',
        nameFont: '32px',
        mushroomSize: '40px',
        subButtonPadding: '14px',
        mushroomPositions: [
          'top: -100px; left: 0px;',
          'top: -105px; left: 55px;',
          'top: -85px; left: 120px;',
          'bottom: 55px; left: 160px;',
          'bottom: 5px; left: 145px;',
          'bottom: 0px; left: 0px;',
          'top: -180px; left: 10px;',
          'top: -135px; right: 10px;',
        ],
        gridTemplate: `
          "n n n b"
          "i i . b"
          "i i . b"
          "i i . b"`,
        gridColumns: '30% 30% 10% 30%',
        gridRows: '25% 25% 25% 25%',
        subButtonPadding: '14px',
        subButtonHeight: '60px',
        subButtonIconSize: '55px',
      }
    };
    return layoutMap[mode] || layoutMap['6x3'];
  }
  
  _getIconShapeStyle(mode) {
    if (mode === '12x4') {
      return `
        width: 240px;
        height: 190px;
        border-radius: 80% 80% 50% 0% / 80% 80% 50% 0%;
        top: 0px;
        left: 0px;
      `;
    } else {
      return `
        width: 140px;
        height: 140px;
        border-radius: 80% 80% 50% 0% / 80% 80% 50% 0%;
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
