import { LitElement, html, css } from 'https://unpkg.com/lit@2.6.1/index.js?module';

class BubbleRoom extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object },
    };
  }
  
  // Supporto all'editor visivo (assicuriamoci che il file bubble-room-editor.js esista)
  static async getConfigElement() {
    await import('./bubble-room-editor.js');
    return document.createElement('bubble-room-editor');
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
        temperatura: {
          sensore_temperatura: 'sensor.vindstyrka_salotto_temperature',
          sensore_umitidà: 'sensor.vindstyrka_salotto_humidity',
          tap_action: { action: 'more-info' }
          // Puoi aggiungere anche una hold_action personalizzata, ad esempio:
          // hold_action: { action: 'toggle' }
        }
      },
      colors: {
        active: 'rgba(var(--color-green), 1)',
        inactive: 'rgba(var(--color-green), 0.3)',
        backgroundActive: 'rgba(var(--color-green), 0.4)',
        backgroundInactive: 'rgba(var(--color-green), 0.1)',
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
      'climate',
      'temperatura'
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
      'temperatura': ''
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
          if (['entities1','entities2','entities3','entities4','entities5'].includes(key) && !value.style) {
            let index = parseInt(key.replace('entities','')) - 1;
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
      colors: {
        active: 'rgba(var(--color-green), 1)',
        inactive: 'rgba(var(--color-green), 0.3)',
        backgroundActive: 'rgba(var(--color-green), 0.4)',
        backgroundInactive: 'rgba(var(--color-green), 0.1)',
        ...config.colors
      },
      name: config.name || "Salotto",
      icon: config.icon || "mdi:sofa",
      tap_action: config.tap_action || { action: 'navigate', navigation_path: '' }
    };
    if (!this.config.entity && this.config.entities && this.config.entities.presence) {
      this.config.entity = this.config.entities.presence.entity;
    }
  }
  
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
        margin-top: -65px;
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
        border-radius: 100% !important;
        width: 170px !important;
        height: 170px !important;
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
        width: 50% !important;
        --mdc-icon-size: 90px !important;
        opacity: 0.5 !important;
      }
      .bubble-sub-button-container {
        grid-area: b;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-self: stretch;
        align-self: stretch;
      }
      .bubble-sub-button {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        text-align: center;
        min-height: 38px;
        margin: 5px 0 0 0;
        cursor: pointer;
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
      .mushroom-item ha-icon {
        --mdc-icon-size: 33px;
        width: 33px;
        height: 33px;
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
  
  // Gestione della hold action (con supporto anche a call-service)
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
        }
        break;
      default:
        this.dispatchEvent(new CustomEvent("hass-more-info", {
          detail: { entityId: item.entity },
          bubbles: true,
          composed: true,
        }));
    }
  }
  
  _handleMainIconTap() {
    if (!this.config.tap_action) return;
    const action = this.config.tap_action.action;
    switch (action) {
      case 'toggle':
        this._toggleEntity(this.config.entity);
        break;
      case 'more-info':
        this.dispatchEvent(new CustomEvent("hass-more-info", {
          detail: { entityId: this.config.entity },
          bubbles: true,
          composed: true,
        }));
        break;
      case 'navigate':
        if (this.config.tap_action.navigation_path) {
          window.history.pushState({}, '', this.config.tap_action.navigation_path);
          window.dispatchEvent(new Event('location-changed'));
        }
        break;
      case 'call-service':
        if (this.config.tap_action.service) {
          const [domain, serviceName] = this.config.tap_action.service.split('.');
          const serviceData = this.config.tap_action.service_data || {};
          if (!serviceData.entity_id) { serviceData.entity_id = this.config.entity; }
          this.hass.callService(domain, serviceName, serviceData);
        }
        break;
      default:
        break;
    }
  }
  
  _toggleEntity(entity) {
    if (!this.hass) return;
    this.hass.callService('homeassistant', 'toggle', { entity_id: entity });
  }
  
  _handleSubButtonTap(item) {
    if (!item.tap_action || item.tap_action.action === 'none') return;
    const action = item.tap_action.action;
    switch (action) {
      case 'toggle':
        this._toggleEntity(item.entity);
        break;
      case 'more-info':
        this.dispatchEvent(new CustomEvent("hass-more-info", {
          detail: { entityId: item.entity },
          bubbles: true,
          composed: true,
        }));
        break;
      case 'navigate':
        if (item.tap_action.navigation_path) {
          window.history.pushState({}, '', item.tap_action.navigation_path);
          window.dispatchEvent(new Event('location-changed'));
        }
        break;
      case 'call-service':
        if (item.tap_action.service) {
          const [domain, serviceName] = item.tap_action.service.split('.');
          const serviceData = item.tap_action.service_data || {};
          if (!serviceData.entity_id) { serviceData.entity_id = item.entity; }
          this.hass.callService(domain, serviceName, serviceData);
        }
        break;
      default:
        break;
    }
  }
  
  _handleMushroomTap(item) {
    if (!item.tap_action || item.tap_action.action === 'none') return;
    const action = item.tap_action.action;
    switch (action) {
      case 'toggle':
        this._toggleEntity(item.entity);
        break;
      case 'more-info':
        this.dispatchEvent(new CustomEvent("hass-more-info", {
          detail: { entityId: item.entity },
          bubbles: true,
          composed: true,
        }));
        break;
      case 'navigate':
        if (item.tap_action.navigation_path) {
          window.history.pushState({}, '', item.tap_action.navigation_path);
          window.dispatchEvent(new Event('location-changed'));
        }
        break;
      case 'call-service':
        if (item.tap_action.service) {
          const [domain, serviceName] = item.tap_action.service.split('.');
          const serviceData = item.tap_action.service_data || {};
          if (!serviceData.entity_id) { serviceData.entity_id = item.entity; }
          this.hass.callService(domain, serviceName, serviceData);
        }
        break;
      default:
        break;
    }
  }
  
  render() {
    if (!this.config || !this.hass) {
      return html`<div>Loading...</div>`;
    }
    
    const { entities, colors, name, icon } = this.config;
    const hass = this.hass;
    const presenceState = hass.states[entities.presence.entity]?.state || 'off';
    const bubbleBg = presenceState === 'on' ? colors.backgroundActive : colors.backgroundInactive;
    // Per l'icona principale se vuoi escluderla dal comportamento active/inactive,
    // puoi forzare un colore fisso oppure rimuovere lo style inline.
    const bubbleIconColor = "#ffffff"; // Ad esempio, forzo il colore bianco
    const nameColor = bubbleIconColor;
    
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
    if (entities.temperatura) { mushroomTemplates.push(entities.temperatura); }
    
    return html`
      <div class="card">
        <div class="grid-container">
          <!-- Area "n": Nome -->
          <div class="name-area" style="color: ${nameColor};">
            ${name}
          </div>
          <!-- Area "i": Icona principale e mushroom template -->
          <div class="icon-area">
            <div class="bubble-icon-container"
                 style="background-color: ${bubbleBg};"
                 @pointerdown="${(e) => this._startHold(e, this.config)}"
                 @pointerup="${(e) => this._endHold(e, this.config, () => this._handleMainIconTap())}"
                 @pointerleave="${(e) => this._cancelHold(e)}">
              <ha-icon class="bubble-icon" icon="${icon}" style="color: ${bubbleIconColor};"></ha-icon>
            </div>
            <div class="mushroom-container">
              ${mushroomTemplates.map((item, index) => {
                if (!item) return html``;
                if (item.sensore_temperatura && item.sensore_umitidà) {
                  const tempState = hass.states[item.sensore_temperatura]?.state || 'N/A';
                  const humState = hass.states[item.sensore_umitidà]?.state || 'N/A';
                  return html`
                    <div class="mushroom-item"
                         style="${item.style ? item.style : this._defaultMushroomStyle(index)}"
                         @pointerdown="${(e) => this._startHold(e, item)}"
                         @pointerup="${(e) => this._endHold(e, item, () => this._handleMushroomTap(item))}"
                         @pointerleave="${(e) => this._cancelHold(e)}">
                      <div class="mushroom-primary">🌡️${tempState}°C 💦${humState}%</div>
                    </div>
                  `;
                } else {
                  const state = hass.states[item.entity]?.state || 'off';
                  const iconColor = state === 'on'
                    ? (item.icon_color && item.icon_color.on ? item.icon_color.on : 'orange')
                    : (item.icon_color && item.icon_color.off ? item.icon_color.off : '#80808055');
                  const style = item.style ? item.style : this._defaultMushroomStyle(index);
                  return html`
                    <div class="mushroom-item"
                         style="${style}"
                         @pointerdown="${(e) => this._startHold(e, item)}"
                         @pointerup="${(e) => this._endHold(e, item, () => this._handleMushroomTap(item))}"
                         @pointerleave="${(e) => this._cancelHold(e)}">
                      <ha-icon icon="${item.icon}" style="color: ${iconColor};"></ha-icon>
                    </div>
                  `;
                }
              })}
            </div>
          </div>
          <!-- Area "b": Sub-button -->
          <div class="bubble-sub-button-container">
            ${subButtons.map(btn => {
              if (!btn) return html``;
              const state = hass.states[btn.entity]?.state || 'off';
              const btnColor = state === 'on' ? colors.active : colors.inactive;
              return html`
                <div class="bubble-sub-button"
                     style="background-color: ${btnColor};"
                     @pointerdown="${(e) => this._startHold(e, btn)}"
                     @pointerup="${(e) => this._endHold(e, btn, () => this._handleSubButtonTap(btn))}"
                     @pointerleave="${(e) => this._cancelHold(e)}">
                  <ha-icon icon="${btn.icon}"></ha-icon>
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
}

customElements.define('bubble-room', BubbleRoom);
