import { LitElement, html, css, nothing } from 'lit';
import fitty from 'fitty';

class BubbleRoom extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object },
      _sensorTexts: { type: Array, state: true } 
    };
  }

  constructor() {
    super();
    this._fittyInstances = [];
  }

  firstUpdated() {
    this._initFitty();
  }

  updated(changedProperties) {
    if (changedProperties.has('hass') || changedProperties.has('config')) {
      // Aspetta che il rendering sia completato prima di inizializzare fitty
      setTimeout(() => this._initFitty(), 0);
    }
  }

  disconnectedCallback() {
    this._cleanupFitty();
    super.disconnectedCallback();
  }

  _initFitty() {
    this._cleanupFitty();
    
    const els = this.shadowRoot?.querySelectorAll('.fit-text');
    if (els && els.length > 0) {
      try {
        this._fittyInstances = fitty(els, {
          maxSize: 20,
          minSize: 10,
          multiLine: false,
          observeMutations: false // Disabilita l'osservazione automatica
        });
      } catch (e) {
        console.error('Fitty initialization error:', e);
      }
    }
  }

  _cleanupFitty() {
    if (this._fittyInstances?.length) {
      this._fittyInstances.forEach(instance => {
        try {
          if (typeof instance.unsubscribe === 'function') {
            instance.unsubscribe();
          }
        } catch (e) {
          console.debug('Error cleaning up fitty instance', e);
        }
      });
      this._fittyInstances = [];
    }
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
        climate: { 
          entity: 'climate.termostato_salotto', 
          icon: 'mdi:thermostat', 
          tap_action: { action: 'more-info' } 
        },
        camera: { 
          entity: 'camera.front_door', 
          icon: 'mdi:camera', 
          tap_action: { action: 'more-info' } 
        },
        sensors: [
          {
            type: 'temperature',
            entity: 'sensor.vindstyrka_salotto_temperature',
            unit: '°C'
          },
          {
            type: 'humidity',
            entity: 'sensor.vindstyrka_salotto_humidity'
          }
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
      tap_action: { action: 'navigate', navigation_path: '/lovelace/sala' }
    };
  }

  firstUpdated() {
    this._fittyInstances = [];
    this._initFitty();
  }
  
  disconnectedCallback() {
    this._cleanupFitty();
    super.disconnectedCallback();
  }
  
  _initFitty() {
    this._cleanupFitty();
    
    const els = this.shadowRoot.querySelectorAll('.fit-text');
    if (els.length) {
      this._fittyInstances = fitty(els, { 
        maxSize: 20,
        minSize: 10,
        multiLine: false 
      });
    }
  }
  
  _cleanupFitty() {
    if (this._fittyInstances && this._fittyInstances.length) {
      this._fittyInstances.forEach(instance => {
        try {
          instance.unsubscribe();
        } catch (e) {
          console.debug('Error cleaning up fitty instance', e);
        }
      });
      this._fittyInstances = [];
    }
  }
  updated(changedProperties) {
    if (changedProperties.has('hass') || changedProperties.has('config')) {
      this._initFitty();
    }
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    
    // Creiamo una copia profonda della configurazione per evitare problemi con oggetti non estensibili
    const newConfig = JSON.parse(JSON.stringify(config));
    
    // Migrate old temperature config to new sensors array
    if (newConfig.entities?.temperature && !newConfig.entities?.sensors) {
      newConfig.entities.sensors = [];
      
      if (newConfig.entities.temperature.temperature_sensor) {
        newConfig.entities.sensors.push({
          type: 'temperature',
          entity: newConfig.entities.temperature.temperature_sensor,
          unit: newConfig.entities.temperature.unit || '°C'
        });
      }
      
      if (newConfig.entities.temperature.humidity_sensor) {
        newConfig.entities.sensors.push({
          type: 'humidity',
          entity: newConfig.entities.temperature.humidity_sensor
        });
      }
    }
  
    // Assicuriamoci che entities esista
    if (!newConfig.entities) newConfig.entities = {};
    
    // Assicuriamoci che sensors esista come array
    if (!Array.isArray(newConfig.entities.sensors)) {
      newConfig.entities.sensors = [];
    }
  
    this.config = {
      entities: newConfig.entities || {},
      colors: {
        active: newConfig.colors?.active || 'var(--primary-color)',
        inactive: newConfig.colors?.inactive || 'var(--secondary-text-color)',
        backgroundActive: newConfig.colors?.backgroundActive || 'color-mix(in srgb, var(--primary-color) 20%, transparent)',
        backgroundInactive: newConfig.colors?.backgroundInactive || 'color-mix(in srgb, var(--primary-color) 10%, transparent)'
      },
      icon: newConfig.icon || '',
      name: newConfig.name || 'Room',
      tap_action: newConfig.tap_action || { action: 'navigate', navigation_path: '' }
    };
  }

  _getFallbackIcon(entityId, explicitIcon) {
    if (typeof explicitIcon === 'string' && explicitIcon.trim()) return explicitIcon;
    if (!entityId) return '';
    
    const stateObj = this.hass?.states?.[entityId];
    if (stateObj?.attributes?.icon) return stateObj.attributes.icon;
    
    if (stateObj?.attributes?.device_class) {
      return this._getDeviceClassIcon(stateObj.attributes.device_class, stateObj.state);
    }
    
    const domain = entityId.split('.')[0];
    return this._getDomainDefaultIcon(domain, stateObj?.state);
  }

  _getDeviceClassIcon(deviceClass, state) {
    const icons = {
      door: state === 'on' ? 'mdi:door-open' : 'mdi:door-closed',
      window: state === 'on' ? 'mdi:window-open' : 'mdi:window-closed',
      motion: state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off',
      moisture: state === 'on' ? 'mdi:water-alert' : 'mdi:water-off',
      smoke: state === 'on' ? 'mdi:smoke' : 'mdi:smoke-detector-off',
      gas: state === 'on' ? 'mdi:gas-cylinder' : 'mdi:gas-off',
      problem: 'mdi:alert',
      connectivity: 'mdi:connection',
      presence: state === 'on' ? 'mdi:account-voice' : 'mdi:account-voice-off',
      tamper: 'mdi:lock-open-alert',
      vibration: state === 'on' ? 'mdi:vibrate' : 'mdi:vibrate-off'
    };
    return icons[deviceClass] || '';
  }

  _getDomainDefaultIcon(domain, state) {
    const icons = {
      light: 'mdi:lightbulb',
      switch: 'mdi:toggle-switch',
      fan: 'mdi:fan',
      climate: 'mdi:thermostat',
      media_player: 'mdi:speaker',
      vacuum: 'mdi:robot-vacuum',
      binary_sensor: state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off',
      sensor: 'mdi:information-outline',
      cover: state === 'open' ? 'mdi:blinds-open' : 'mdi:blinds-closed',
      lock: state === 'locked' ? 'mdi:lock' : 'mdi:lock-open'
    };
    return icons[domain] || '';
  }

  _renderMushroom(item, idx, color) {
    const style = this._defaultMushroomStyle(idx);
    
    if (item?.type) { // Verifica aggiuntiva sull'item
      const text = this._buildSensorText(item);
      if (!text) return nothing;
      
      return html`
        <div class="mushroom-item" style="${style}">
          <span class="fit-text" style="color: ${color}; font-size: ${this._getFontSize(text)};">
            ${text}
          </span>
        </div>
      `;
    }
    
    const icon = this._getFallbackIcon(item?.entity, item?.icon || '');
    if (!icon) return nothing;
    
    return html`
      <div class="mushroom-item" style="${style}"
           @pointerdown=${e => this._startHold(e, item)}
           @pointerup=${e => this._endHold(e, item, () => this._handleMushroomTap(item))}
           @pointerleave=${() => this._cancelHold()}>
        <ha-icon icon="${icon}" style="color: ${color};"></ha-icon>
      </div>
    `;
  }

  _buildSensorText(sensor) {
    if (!this.hass || !sensor.entity) return '';
    const state = this.hass.states[sensor.entity]?.state;
    if (state == null || state === '') return '';
    
    const icon = sensor.customIcon || this._getSensorIcon(sensor.type);
    const unit = sensor.unit || this._getDefaultUnit(sensor.type);
    
    return `${icon}${state}${unit}`;
  }

  _getFontSize(text) {
    const length = text.length;
    if (length > 15) return '12px';
    if (length > 10) return '14px';
    return '16px';
  }


  _getSensorIcon(sensorType) {
    const icons = {
      temperature: '🌡️',
      humidity: '💦',
      light: '💡',
      co2: '🌫️',
      pressure: '⏲️',
      uv: '☀️',
      noise: '🔊',
      pm25: '💨',
      pm10: '💨',
      voc: '🌡️'
    };
    return icons[sensorType] || '';
  }

  _getDefaultUnit(sensorType) {
    const units = {
      temperature: '°C',
      humidity: '%',
      light: 'lx',
      co2: 'ppm',
      pressure: 'hPa',
      uv: '',
      noise: 'dB',
      pm25: 'µg/m³',
      pm10: 'µg/m³',
      voc: 'ppb'
    };
    return units[sensorType] || '';
  }

  _getFontSize(text) {
    const length = text.length;
    if (length > 30) return '12px';
    if (length > 20) return '14px';
    if (length > 15) return '16px';
    return '18px';
  }

  _defaultMushroomStyle(index) {
    const positions = [
      'top: -77px; left: 0px;',      // 0
      'top: -85px; left: 38px;',      // 1
      'top: -64px; left: 77px;',      // 2
      'bottom: 39px; left: 96px;',    // 3
      'bottom: -1px; left: 85px;',    // 4
      'bottom: -2px; left: -2px;',    // 5
      'top: -140px; left: 5px;',      // 6
      'top: -95px; right: 5px;'       // 7
    ];
    return positions[index] || '';
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
    if (!this._holdTriggered) clickCallback();
    this._holdTriggered = false;
  }

  _cancelHold() {
    clearTimeout(this._holdTimeout);
    this._holdTriggered = false;
  }

  _handleHoldAction(item) {
    if (!item?.hold_action) {
      this._showMoreInfo(item.entity);
      return;
    }
    
    const { action, service, service_data, navigation_path } = item.hold_action;
    switch (action) {
      case 'more-info':
        this._showMoreInfo(item.entity);
        break;
      case 'toggle':
        this._toggleEntity(item.entity);
        break;
      case 'call-service':
        this._callService(service, service_data, item.entity);
        break;
      case 'navigate':
        this._navigate(navigation_path);
        break;
    }
  }

  _handleMainIconTap() {
    if (!this.config?.tap_action) return;
    const { action, service, service_data, navigation_path } = this.config.tap_action;
    
    switch (action) {
      case 'toggle':
        if (this.config.entity) this._toggleEntity(this.config.entity);
        break;
      case 'more-info':
        if (this.config.entity) this._showMoreInfo(this.config.entity);
        break;
      case 'call-service':
        this._callService(service, service_data, this.config.entity);
        break;
      case 'navigate':
        this._navigate(navigation_path);
        break;
    }
  }

  _handleSubButtonTap(item) {
    if (!item?.tap_action) return;
    const { action, service, service_data, navigation_path } = item.tap_action;
    
    switch (action) {
      case 'toggle':
        this._toggleEntity(item.entity);
        break;
      case 'more-info':
        this._showMoreInfo(item.entity);
        break;
      case 'call-service':
        this._callService(service, service_data, item.entity);
        break;
      case 'navigate':
        this._navigate(navigation_path);
        break;
    }
  }

  _handleMushroomTap(item) {
    this._handleSubButtonTap(item);
  }

  _toggleEntity(entity) {
    if (!this.hass || !entity) return;
    this.hass.callService('homeassistant', 'toggle', { entity_id: entity });
  }

  _showMoreInfo(entity) {
    if (!entity) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      detail: { entityId: entity },
      bubbles: true,
      composed: true,
    }));
  }

  _callService(service, service_data, entity) {
    if (!service || !this.hass) return;
    const [domain, svc] = service.split('.');
    const data = { 
      ...service_data, 
      entity_id: service_data?.entity_id || entity 
    };
    this.hass.callService(domain, svc, data);
  }

  _navigate(path) {
    if (!path) return;
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('location-changed'));
  }

  static get styles() {
    return css`
      :host {
        display: block;
        --card-height: 190px;
        font-family: sans-serif;
      }
      ha-card {
        display: block;
        margin: 0;
        padding: 0 !important;
        background: var(--bubble-room-background, var(--card-background-color)) !important;
        border-radius: var(--bubble-room-border-radius, 8px) !important;
        overflow: hidden;
      }
      .card {
        position: relative;
        width: 100%;
        height: var(--card-height);
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
        padding-left: 2px;
        margin-top: -67px;
        font-size: 30px;
        font-weight: bold;
        color: var(--bubble-room-name-color);
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
        border-radius: 50%;
        width: 170px;
        height: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -39px;
        left: -40px;
        background-color: var(--bubble-room-icon-bg);
      }
      .bubble-icon {
        position: absolute;
        top: 20%;
        left: 30%;
        --mdc-icon-size: 75px;
        opacity: 0.5;
        color: var(--bubble-room-icon-color);
      }
      .bubble-sub-button-container {
        grid-area: b;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8px;
      }
      .bubble-sub-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        margin: 3px;
        cursor: pointer;
        background-color: var(--bubble-room-sub-bg, var(--card-background-color));
        color: var(--bubble-room-sub-icon-color, var(--primary-color));
        transition: all 0.3s ease;
      }
      .bubble-sub-button:hover {
        filter: brightness(0.9);
      }
      .mushroom-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        pointer-events: none;
      }
      .mushroom-item {
        position: absolute;
        pointer-events: auto;
      }
      .mushroom-item ha-icon {
        --mdc-icon-size: 33px;
      }
      .fit-text {
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        display: block;
        width: 100%;
      }
      .fit-text {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        width: 100%;
        /* Aggiungi una larghezza massima per sicurezza */
        max-width: 100px;
      }

      .mushroom-item {
        pointer-events: auto;
        /* Assicura che l'elemento sia sempre visibile */
        display: block;
        visibility: visible;
      }
    `;
  }

  render() {
    if (!this.config || !this.hass) {
      return html`<div>Loading...</div>`;
    }
  
    const { entities, name, icon, background, border_radius } = this.config;
    const presenceOn = entities.presence?.entity && 
                      this.hass.states[entities.presence.entity]?.state === 'on';
  
    const colors = {
      active: this.config.colors.active,
      inactive: this.config.colors.inactive,
      backgroundActive: this.config.colors.backgroundActive,
      backgroundInactive: this.config.colors.backgroundInactive
    };
  
    const bubbleIconColor = presenceOn ? colors.active : colors.inactive;
    const bubbleBgColor = presenceOn ? colors.backgroundActive : colors.backgroundInactive;
  
    const cardVars = [
      background ? `--bubble-room-background: ${background}` : '',
      border_radius ? `--bubble-room-border-radius: ${border_radius}` : '',
      `--bubble-room-icon-bg: ${bubbleBgColor}`,
      `--bubble-room-icon-color: ${bubbleIconColor}`,
      `--bubble-room-name-color: ${bubbleIconColor}`
    ].filter(v => v).join(';');
  
    const mainIcon = icon?.trim() ? icon : 
                   (entities.presence?.entity ? this._getFallbackIcon(entities.presence.entity) : '');
  
    const subButtons = [
      entities['sub-button1'],
      entities['sub-button2'],
      entities['sub-button3'],
      entities['sub-button4']
    ].filter(b => b?.entity);
  
    const mushroomItems = [
      ...(entities.sensors || []).filter(s => s.type && s.entity).slice(0, 4), // Prendiamo solo i primi 4 sensori validi
      entities.climate,
      entities.camera
    ].filter(Boolean).map((item, idx) => {
      if (item.type) {
        return { item, idx, color: bubbleIconColor };
      }
      
      const entityId = item.entity;
      if (!entityId) return null;
      
      const state = this.hass.states[entityId]?.state;
      const isOn = state === 'on' || state === 'open' || state === 'playing';
      return { item, idx, color: isOn ? colors.active : colors.inactive };
    }).filter(Boolean);
  
    return html`
      <ha-card style="${cardVars}">
        <div class="card">
          <div class="grid-container">
            <div class="name-area">${name}</div>
            
            <div class="icon-area">
              <div class="bubble-icon-container"
                  @pointerdown=${e => this._startHold(e, this.config)}
                  @pointerup=${e => this._endHold(e, this.config, () => this._handleMainIconTap())}
                  @pointerleave=${this._cancelHold}>
                ${mainIcon ? html`<ha-icon class="bubble-icon" icon="${mainIcon}"></ha-icon>` : nothing}
              </div>
              
              <div class="mushroom-container">
                ${mushroomItems.map(({ item, idx, color }) => 
                  this._renderMushroom(item, idx, color)
                )}
              </div>
            </div>
            
            <div class="bubble-sub-button-container">
              ${subButtons.map(btn => {
                const state = this.hass.states[btn.entity]?.state;
                const isOn = state === 'on' || state === 'open' || state === 'playing';
                const btnBg = isOn ? colors.backgroundActive : colors.backgroundInactive;
                const iconCol = isOn ? colors.active : colors.inactive;
                const btnIcon = this._getFallbackIcon(btn.entity, btn.icon);
                
                return html`
                  <div class="bubble-sub-button"
                      style="background-color: ${btnBg}; color: ${iconCol};"
                      @pointerdown=${e => this._startHold(e, btn)}
                      @pointerup=${e => this._endHold(e, btn, () => this._handleSubButtonTap(btn))}
                      @pointerleave=${this._cancelHold}>
                    <ha-icon icon="${btnIcon}"></ha-icon>
                  </div>
                `;
              })}
            </div>
          </div>
        </div>
      </ha-card>
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