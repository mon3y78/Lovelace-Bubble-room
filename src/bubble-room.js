import { LitElement, html, css, nothing } from 'lit';
import fitty from 'fitty';

class BubbleRoom extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object },
    };
  }

  firstUpdated() {
    const els = this.shadowRoot.querySelectorAll('.mushroom-primary');
    if (!els.length) return;
    // installa fitty e poi disattiva i listener interni
    const controllers = fitty(els, {
      maxSize: 20,
      multiLine: false
    });
    controllers.forEach(c => c.unsubscribe());
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
          icon: '',  // Vuoto per forzare il fallback
          tap_action: { action: 'toggle' },
          hold_action: { action: 'more-info' }
        },
        "sub-button2": {
          entity: 'fan.sonoff_1000f6e5c7',
          icon: '',
          tap_action: { action: 'toggle' },
          hold_action: { action: 'more-info' }
        },
        "sub-button3": {
          entity: 'media_player.google_nest_1',
          icon: '',
          tap_action: { action: 'toggle' },
          hold_action: { action: 'more-info' }
        },
        "sub-button4": {
          entity: 'vacuum.slider',
          icon: '',
          tap_action: { action: 'toggle' },
          hold_action: { action: 'more-info' }
        },
        climate: {
          entity: 'climate.termostato_salotto',
          icon: '',
          tap_action: { action: 'more-info' }
        },
        camera: {
          entity: 'camera.front_door',
          icon: '',  // Vuoto per usare il fallback
          tap_action: { action: 'more-info' },
          preview_url: ''
        },
        entities1: { entity: 'sensor.some_sensor1', icon: '' },
        entities2: { entity: 'sensor.some_sensor2', icon: '' },
        entities3: { entity: 'sensor.some_sensor3', icon: '' },
        entities4: { entity: 'sensor.some_sensor4', icon: '' },
        entities5: { entity: 'sensor.some_sensor5', icon: '' },
        temperature: {
          temperature_sensor: 'sensor.vindstyrka_salotto_temperature',
          humidity_sensor: 'sensor.vindstyrka_salotto_humidity',
          tap_action: { action: 'more-info' }
        }
      },
      colors: {
        active: 'rgba(var(--color-green), 1)',
        inactive: 'rgba(var(--color-green), 0.3)',
        backgroundActive: 'rgba(var(--color-green), 0.4)',
        backgroundInactive: 'rgba(var(--color-green), 0.1)',
      },
      icon: '',  // Vuoto per utilizzare il fallback
      name: 'Salotto',
      tap_action: { action: 'navigate', navigation_path: '/lovelace/sala' }
    };
  }

  // Funzione helper per ottenere l'icona di fallback
  _getFallbackIcon(entityId, explicitIcon) {
    // se arriva null/undefined, diventa sempre stringa vuota
    explicitIcon = typeof explicitIcon === 'string' ? explicitIcon : '';
  
    if (explicitIcon.trim() !== '') {
      return explicitIcon;
    }
  
    // se l’utente ha specificato un’icona nell’entity state
    if (this.hass?.entities?.[entityId]?.icon) {
      return this.hass.entities[entityId].icon;
    }
  
    const stateObj = this.hass?.states?.[entityId];
    if (stateObj?.attributes?.icon) {
      return stateObj.attributes.icon;
    }
  
    if (stateObj?.attributes?.device_class) {
      return this._getDeviceClassIcon(stateObj.attributes.device_class, stateObj.state);
    }
  
    const domain = entityId?.split?.('.')?.[0] || '';
    return this._getDomainDefaultIcon(domain, stateObj?.state);
  }
  
  _getDeviceClassIcon(deviceClass, state) {
    switch (deviceClass) {
      case 'door':
        return state === 'on' ? 'mdi:door-open' : 'mdi:door-closed';
      case 'window':
        return state === 'on' ? 'mdi:window-open' : 'mdi:window-closed';
      case 'motion':
        return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off';
      case 'moisture':
        return state === 'on' ? 'mdi:water-alert' : 'mdi:water-off';
      case 'smoke':
        return state === 'on' ? 'mdi:smoke' : 'mdi:smoke-detector-off';
      case 'gas':
        return state === 'on' ? 'mdi:gas-cylinder' : 'mdi:gas-off';
      case 'problem':
        return 'mdi:alert';
      case 'connectivity':
        return 'mdi:connection';
      case 'occupancy':
        return state === 'on' ? 'mdi:account-voice' : 'mdi:account-voice-off';
      case 'presence':
        return state === 'on' ? 'mdi:account-voice' : 'mdi:account-voice-off';
      case 'tamper':
        return 'mdi:lock-open-alert';
      case 'vibration':
        return state === 'on' ? 'mdi:vibrate' : 'mdi:vibrate-off';
      case 'running':
        return state === 'on' ? 'mdi:server-network' : 'mdi:server-network-off';
      case 'shutter':
        return state === 'on' ? 'mdi:window-shutter-open' : 'mdi:window-shutter';        
      case 'blind':
        return state === 'on' ? 'mdi:blinds-horizontal' : 'mdi:blinds-horizontal-closed';
      default:
        return '';
    }
  }
  _getDomainDefaultIcon(domain, state) {
    switch (domain) {
      case 'light':
        return 'mdi:lightbulb';
      case 'switch':
        return 'mdi:toggle-switch';
      case 'fan':
        return 'mdi:fan';
      case 'climate':
        return 'mdi:thermostat';
      case 'media_player':
        return 'mdi:speaker';
      case 'vacuum':
        return 'mdi:robot-vacuum';
      case 'binary_sensor':
        return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off';
      case 'sensor':
        return 'mdi:information-outline';
      case 'input_boolean':
        return 'mdi:toggle-switch';
      case 'cover':
        return state === 'open' ? 'mdi:blinds-open' : 'mdi:blinds-closed';
      case 'occupancy':
        return state === 'on' ? 'mdi:account-voice' : 'mdi:account-voice-off';
      case 'lock':
        return state === 'locked' ? 'mdi:lock' : 'mdi:lock-open';
      case 'door':
        return state === 'open' ? 'mdi:door-open' : 'mdi:door-closed';
      case 'window':
        return state === 'open' ? 'mdi:window-open' : 'mdi:window-closed';
      default:
        return '';
    }
  }
  /**
   * @param {object} item
   * @param {number} idx
   * @param {string} iconColor
   */
  _renderMushroom(item, idx, color) {
    // ottengo sempre lo style di default in base all'indice
    const style = this._defaultMushroomStyle(idx);
  
    // 1) caso temperatura/umidità
    if (item.temperature_sensor || item.humidity_sensor) {
      const text = this._buildTemperatureText(item);
      return html`
        <div class="mushroom-item" style="${style}">
          <span class="fit-text" style="color: ${color};">
            ${text}
          </span>
        </div>
      `;
    }
  
    // 2) altrimenti è un mushroom “iconico”
    // ricavo l'icona (custom o fallback)
    const icon = this._getFallbackIcon(item.entity, item.icon || '');
  
    return html`
      <div
        class="mushroom-item"
        style="${style}"
        @pointerdown=${e => this._startHold(e, item)}
        @pointerup=${e => this._endHold(e, item, () => this._handleMushroomTap(item))}
        @pointerleave=${e => this._cancelHold(e)}
      >
        <ha-icon
          icon="${icon}"
          style="color: ${color};"
        ></ha-icon>
      </div>
    `;
  }
  
  

  // Funzione helper per costruire il testo per temperatura e umidità
  _buildTemperatureText(item) {
    const hass = this.hass;
    // Recupera lo stato dei sensori se esistono, altrimenti null
    const temp = item.temperature_sensor ? hass.states[item.temperature_sensor]?.state : null;
    const hum = item.humidity_sensor ? hass.states[item.humidity_sensor]?.state : null;
    
    let text = "";
    if (temp !== null && temp !== undefined && temp !== '') {
      text += `🌡️${temp}°C`;
    }
    if (hum !== null && hum !== undefined && hum !== '') {
      if (text) text += " ";  // Se già c'è temperatura, aggiungo uno spazio
      text += `💦${hum}%`;
    }
    return text.trim();
  }

  setConfig(config) {
    config = JSON.parse(JSON.stringify(config));
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
      throw new Error("La configurazione deve essere un oggetto valido.");
    }
    if (!config.entities || typeof config.entities !== 'object') {
      throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");
    }
    const keysWithIcon = [
      'presence', 'sub-button1', 'sub-button2', 'sub-button3',
      'sub-button4', 'entities1', 'entities2', 'entities3',
      'entities4', 'entities5', 'climate', 'camera', 'temperature'
    ];
    const defaultAction = { tap_action: { action: 'toggle' }, hold_action: { action: 'more-info' } };

    const entities = {};
    for (const key in config.entities) {
      let value = config.entities[key];
      if (['entities1', 'entities2', 'entities3', 'entities4', 'entities5'].includes(key)) {
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
        value = { entity: value, ...defaultAction };
      }
      if (typeof value === 'string') {
        if (keysWithIcon.includes(key)) {
          if (key === 'presence') {
            entities[key] = { entity: value };
          } else {
            entities[key] = { entity: value, ...defaultAction };
          }
        } else {
          entities[key] = value;
        }
      } else if (typeof value === 'object') {
        if (keysWithIcon.includes(key)) {
          if (['entities1', 'entities2', 'entities3', 'entities4', 'entities5'].includes(key) && !value.style) {
            let index = parseInt(key.replace('entities', '')) - 1;
            value.style = this._defaultMushroomStyle(index);
          }
          if (key === 'presence') {
            entities[key] = { ...value };
          } else {
            entities[key] = { ...defaultAction, ...value };
          }
        } else {
          entities[key] = value;
        }
      }
    }
    const userColors = config.colors || {};

    this.config = {
      entities,
      colors: {
        ...(userColors.active           !== undefined ? { active: userColors.active }           : {}),
        ...(userColors.inactive         !== undefined ? { inactive: userColors.inactive }       : {}),
        ...(userColors.backgroundActive !== undefined ? { backgroundActive: userColors.backgroundActive }   : {}),
        ...(userColors.backgroundInactive!== undefined ? { backgroundInactive: userColors.backgroundInactive } : {}),
      },
      icon: config.icon || '',
      name: config.name || "Salotto",
      tap_action: config.tap_action || { action: 'navigate', navigation_path: '' }
    };
    if (!this.config.entity && this.config.entities && this.config.entities.presence) {
      this.config.entity = this.config.entities.presence.entity;
    }
  }

  getConfig() {
    const configCopy = JSON.parse(JSON.stringify(this._config));
    const filteredEntities = {};
    Object.keys(configCopy.entities).forEach((key) => {
      const entityConfig = configCopy.entities[key];
      // Per i subbutton, non rimuovere la configurazione anche se l’entity è vuota.
      if (key.startsWith("sub-button") || (entityConfig.entity && entityConfig.entity.trim() !== "")) {
        filteredEntities[key] = entityConfig;
      }
    });
    configCopy.entities = filteredEntities;
    this._config = configCopy;
    return configCopy;
  }
  

  static get styles() {
    return css`
      *, *::before, *::after { box-sizing: border-box; }
      :host {
        display: block;
      }
      ha-card {
        /* background e border-radius ereditati dalle variabili inline */
      }
      .name-area {
        /* fallback: verrà comunque sovrascritto dall’inline style */
        color: var(--bubble-room-name-color, var(--primary-text-color));
      }
      .bubble-icon-container {
        /* Sfondo bubble via CSS‑var */
        background-color: var(--bubble-room-icon-bg, rgba(var(--rgb-primary-color),0.1)) !important;
      }
      .bubble-icon {
        /* Icona bubble via CSS‑var */
        color: var(--bubble-room-icon-color, var(--primary-color)) !important;
        opacity: 0.5 !important;
      }
      .bubble-sub-button {
        /* Fallback di ogni sub‑button se vuoi */
        /* I colori “on/off” li passi inline, qui serve solo il fallback */
        background-color: var(--bubble-room-sub-bg, var(--divider-color));
      }
      .bubble-sub-button ha-icon {
        /* Fallback colore icona sub‑button */
        color: var(--bubble-room-sub-icon-color, var(--secondary-text-color));
      }

    `;
  }
    /**
   * Renderizza una singola “mushroom”: prendi
   * item.style, item.entity e item.icon,
   * e ritorna un template Lit con posizione e azioni.
   */

    

  _defaultMushroomStyle(index) {
    switch (index) {
      case 0: return "top: -77px; left: 0px;";
      case 1: return "top: -85px; left: 38px;";
      case 2: return "top: -64px; left: 77px;";
      case 3: return "bottom: 39px; left: 96px;";
      case 4: return "bottom: -1px; left: 85px;";
      case 5: return "bottom: -2px; left: -2px;";
      case 6: return "top: -140px; left: 5px;";
      case 7: return "top: -95px; right: 5px;";
      default: return "";
    }
  }

  _startHold(e, item) {
    e.stopPropagation();
    this._holdTriggered = false;
    this._holdTimeout = setTimeout(() => {
      this._holdTriggered = true;
      this._handleHoldAction(item);
    }, 500);
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
      return html`<div>Loading…</div>`;
    }
  
    // 1) Estrai config e stato
    const { entities, name, icon, colors = {}, background, border_radius } = this.config;
    const hass       = this.hass;
    const presOn     = hass.states[entities.presence.entity]?.state === 'on';
  
    // 2) Fallback tema HA
    const ACCENT_ICON   = 'var(--primary-color)';
    const INACTIVE_ICON = 'var(--secondary-text-color)';
    const ACCENT_BG     = 'rgba(var(--rgb-primary-color),0.1)';
    const INACTIVE_BG   = 'var(--divider-color, rgba(0,0,0,0.12))';
  
    // 3) Colori finali (config.colors sovrascrive, altrimenti tema HA)
    const iconOn   = colors.active            ?? ACCENT_ICON;
    const iconOff  = colors.inactive          ?? INACTIVE_ICON;
    const bgOn     = colors.backgroundActive  ?? ACCENT_BG;
    const bgOff    = colors.backgroundInactive?? INACTIVE_BG;
    const bubbleIconCol = presOn ? iconOn : iconOff;
    const bubbleBgCol   = presOn ? bgOn   : bgOff;
  
    // 4) Costruisci l’inline‑style per la <ha-card> con le variabili CSS
    const cardCssVars = [
      background    ? `--bubble-room-background: ${background}`        : '',
      border_radius ? `--bubble-room-border-radius: ${border_radius}`  : '',
      `--bubble-room-icon-bg: ${bubbleBgCol}`,
      `--bubble-room-icon-color: ${bubbleIconCol}`,
      `--bubble-room-name-color: ${bubbleIconCol}`
    ].filter(v => v).join(';');
  
    // 5) Recupera icona principale (fallback)
    const mainIcon = icon?.trim()
      ? icon
      : this._getFallbackIcon(entities.presence.entity);
  
    // 6) Prepara sub‑button
    const subButtons = [
      entities['sub-button1'],
      entities['sub-button2'],
      entities['sub-button3'],
      entities['sub-button4']
    ].filter(b => b && b.entity);
  
    // 7) Prepara “mushrooms” se ti servono (qui le lasciamo fuori per semplicità)
  
    return html`
      <ha-card style="${cardCssVars}">
        <div class="card">
          <div class="grid-container">
  
            <!-- NOME -->
            <div
              class="name-area"
              style="color: ${bubbleIconColor};"
            >
              ${name}
            </div>
  
            <!-- BUBBLE PRINCIPALE -->
            <div class="icon-area">
              <div class="bubble-icon-container">
                ${ mainIcon ? html`
                  <ha-icon
                    class="bubble-icon"
                    icon="${mainIcon}"
                  ></ha-icon>`
                : nothing }
              </div>
            </div>
  
            <!-- SUB‑BUTTONS -->
            <div class="bubble-sub-button-container">
              ${ subButtons.map(btn => {
                  const isOn    = hass.states[btn.entity]?.state === 'on';
                  const btnBg   = isOn ? iconOn : iconOff;
                  const iconCol = isOn ? iconOn : iconOff;
                  const ic      = this._getFallbackIcon(btn.entity);
                  return html`
                    <div
                      class="bubble-sub-button"
                      style="background-color: ${btnBg};"
                      @pointerdown=${e => this._startHold(e, btn)}
                      @pointerup=${e => this._endHold(e, btn, () => this._handleSubButtonTap(btn))}
                      @pointerleave=${e => this._cancelHold(e)}
                    >
                      <ha-icon
                        icon="${ic}"
                        style="color: ${iconCol};"
                      ></ha-icon>
                    </div>
                  `;
                })
              }
            </div>
  
          </div>
        </div>
      </ha-card>
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
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'bubble-room',
  name: 'Bubble Room',
  description: 'Bubble Room',
  preview: true,
  documentationURL: 'https://github.com/mon3y78/Lovelace-Bubble-room'
});