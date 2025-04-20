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
    const controllers = fitty(els, { maxSize: 20, multiLine: false });
    controllers.forEach(c => c.unsubscribe());
  }

  static async getConfigElement() {
    await import('./bubble-room-editor.js');
    return document.createElement('bubble-room-editor');
  }

  static getStubConfig() {
    return {
      entities: {
        presence: { entity: 'binary_sensor.aqara_fp1_presence' },
        'sub-button1': { entity: 'light.luce_ventola', icon: '', tap_action: { action: 'toggle' }, hold_action: { action: 'more-info' } },
        'sub-button2': { entity: 'fan.sonoff_1000f6e5c7', icon: '', tap_action: { action: 'toggle' }, hold_action: { action: 'more-info' } },
        'sub-button3': { entity: 'media_player.google_nest_1', icon: '', tap_action: { action: 'toggle' }, hold_action: { action: 'more-info' } },
        'sub-button4': { entity: 'vacuum.slider', icon: '', tap_action: { action: 'toggle' }, hold_action: { action: 'more-info' } },
        climate:       { entity: 'climate.termostato_salotto', icon: '', tap_action: { action: 'more-info' } },
        camera:        { entity: 'camera.front_door', icon: '', tap_action: { action: 'more-info' }, preview_url: '' },
        entities1:     { entity: 'sensor.some_sensor1', icon: '' },
        entities2:     { entity: 'sensor.some_sensor2', icon: '' },
        entities3:     { entity: 'sensor.some_sensor3', icon: '' },
        entities4:     { entity: 'sensor.some_sensor4', icon: '' },
        entities5:     { entity: 'sensor.some_sensor5', icon: '' },
        temperature:   {
          temperature_sensor: 'sensor.vindstyrka_salotto_temperature',
          humidity_sensor:    'sensor.vindstyrka_salotto_humidity',
          tap_action: { action: 'more-info' }
        },
      },
      colors: {
        active: 'var(--primary-color)',
        inactive: 'color-mix(in srgb, var(--primary-color) 40%, transparent)',
        backgroundActive: 'color-mix(in srgb, var(--primary-color) 20%, transparent)',
        backgroundInactive: 'color-mix(in srgb, var(--primary-color) 10%, transparent)'
      },
      icon: '',
      name: 'Salotto',
      tap_action: { action: 'navigate', navigation_path: '/lovelace/sala' }
    };
  }

  _getFallbackIcon(entityId, explicitIcon) {
    explicitIcon = typeof explicitIcon === 'string' ? explicitIcon : '';
    if (explicitIcon.trim()) return explicitIcon;
    if (this.hass?.entities?.[entityId]?.icon) return this.hass.entities[entityId].icon;
    const stateObj = this.hass?.states?.[entityId];
    if (stateObj?.attributes?.icon) return stateObj.attributes.icon;
    if (stateObj?.attributes?.device_class) {
      return this._getDeviceClassIcon(stateObj.attributes.device_class, stateObj.state);
    }
    const domain = entityId?.split?.('.')?.[0] || '';
    return this._getDomainDefaultIcon(domain, stateObj?.state);
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

  _getDomainDefaultIcon(domain, state) {
    switch (domain) {
      case 'light':         return 'mdi:lightbulb';
      case 'switch':        return 'mdi:toggle-switch';
      case 'fan':           return 'mdi:fan';
      case 'climate':       return 'mdi:thermostat';
      case 'media_player':  return 'mdi:speaker';
      case 'vacuum':        return 'mdi:robot-vacuum';
      case 'binary_sensor': return state === 'on' ? 'mdi:motion-sensor' : 'mdi:motion-sensor-off';
      case 'sensor':        return 'mdi:information-outline';
      case 'input_boolean': return 'mdi:toggle-switch';
      case 'cover':         return state === 'open' ? 'mdi:blinds-open'   : 'mdi:blinds-closed';
      case 'lock':          return state === 'locked' ? 'mdi:lock'         : 'mdi:lock-open';
      case 'door':          return state === 'open'   ? 'mdi:door-open'    : 'mdi:door-closed';
      case 'window':        return state === 'open'   ? 'mdi:window-open'  : 'mdi:window-closed';
      default:              return '';
    }
  }

  _renderMushroom(item, idx, color) {
    const style = this._defaultMushroomStyle(idx);
    if (item.temperature_sensor || item.humidity_sensor) {
      const text = this._buildTemperatureText(item);
      return html`
        <div class="mushroom-item" style="${style}">
          <span class="fit-text" style="color: ${color};">${text}</span>
        </div>
      `;
    }
    const icon = this._getFallbackIcon(item.entity, item.icon || '');
    return html`
      <div class="mushroom-item" style="${style}"
           @pointerdown=${e => this._startHold(e, item)}
           @pointerup=${e => this._endHold(e, item, () => this._handleMushroomTap(item))}
           @pointerleave=${() => this._cancelHold()}>
        <ha-icon icon="${icon}" style="color: ${color};"></ha-icon>
      </div>
    `;
  }

  _buildTemperatureText(item) {
    const hass = this.hass;
    const temp = item.temperature_sensor ? hass.states[item.temperature_sensor]?.state : null;
    const hum  = item.humidity_sensor   ? hass.states[item.humidity_sensor]?.state    : null;
    let text = '';
    if (temp != null && temp !== '') text += `🌡️${temp}°C`;
    if (hum  != null && hum  !== '') text += (text ? ' ' : '') + `💦${hum}%`;
    return text;
  }

  setConfig(config) {
    config = JSON.parse(JSON.stringify(config));
    if (!config || typeof config !== 'object' || Array.isArray(config))
      throw new Error('La configurazione deve essere un oggetto valido.');
    if (!config.entities || typeof config.entities !== 'object')
      throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");

    const keysWithIcon = [
      'presence','sub-button1','sub-button2','sub-button3','sub-button4',
      'entities1','entities2','entities3','entities4','entities5',
      'climate','camera','temperature'
    ];
    const defaultAction = { tap_action: { action: 'toggle' }, hold_action: { action: 'more-info' } };
    const entities = {};

    for (const key in config.entities) {
      let value = config.entities[key];
      // merge numerically indexed entities
      if (
        ['entities1','entities2','entities3','entities4','entities5'].includes(key) &&
        typeof value === 'object'
      ) {
        const newValue = {};
        const numericKeys = Object.keys(value).filter(k => /^\d+$/.test(k));
        Object.entries(value).forEach(([k,v]) => {
          if (!/^\d+$/.test(k)) newValue[k] = v;
        });
        if (numericKeys.length) {
          newValue.entity = numericKeys
            .sort((a,b) => a-b)
            .map(k => value[k])
            .join('');
        }
        value = newValue;
      }

      if (key === 'climate' && typeof value === 'string') {
        value = { entity: value, ...defaultAction };
      }

      if (typeof value === 'string') {
        entities[key] = keysWithIcon.includes(key)
          ? (key === 'presence'
              ? { entity: value }
              : { entity: value, ...defaultAction })
          : value;
      } else if (typeof value === 'object') {
        if (keysWithIcon.includes(key)) {
          if (!value.style && key.startsWith('entities')) {
            const idx = Number(key.replace('entities','')) - 1;
            value.style = this._defaultMushroomStyle(idx);
          }
          entities[key] = key === 'presence'
            ? { ...value }
            : { ...defaultAction, ...value };
        } else {
          entities[key] = value;
        }
      }
    }

    const userColors = config.colors || {};
    this.config = {
      entities,
      colors: {
        active: userColors.active ?? 'var(--primary-color)',
        inactive: userColors.inactive ?? 'var(--primary-color-faded)',
        backgroundActive: userColors.backgroundActive ?? 'color-mix(in srgb, var(--primary-color) 85%, transparent)',
        backgroundInactive: userColors.backgroundInactive ?? 'color-mix(in srgb, var(--primary-color) 15%, transparent)',
      },
      icon:       config.icon       || '',
      name:       config.name       || 'Salotto',
      tap_action: config.tap_action || { action: 'navigate', navigation_path: '' }
    };

    if (!this.config.entity && this.config.entities.presence) {
      this.config.entity = this.config.entities.presence.entity;
    }
  }

  getConfig() {
    const copy = JSON.parse(JSON.stringify(this._config));
    const filtered = {};
    Object.entries(copy.entities).forEach(([k,e]) => {
      if (k.startsWith('sub-button') || (e.entity && e.entity.trim())) {
        filtered[k] = e;
      }
    });
    copy.entities = filtered;
    this._config = copy;
    return copy;
  }

  static get styles() {
    return css`
      *, *::before, *::after { box-sizing: border-box; }
      :host { display: block; --card-height: 190px; font-family: sans-serif; }
      ha-card {
        display: block;
        margin: 0;
        padding: 0 !important;
        background: var(--bubble-room-background, var(--card-background-color, var(--ha-card-background, white))) !important;
        border-radius: var(--bubble-room-border-radius, var(--ha-card-border-radius, 8px)) !important;
      }
      .card {
        position: relative;
        width: 100%;
        height: var(--card-height);
        overflow: hidden;
        border-radius: inherit;
      }
      .grid-container {
        display: grid;
        width:100%;
        height:100%;
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
      }
      .bubble-sub-button ha-icon {
        color: inherit;
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
      }
    `;
  }

  _defaultMushroomStyle(index) {
    switch (index) {
      case 0: return 'top: -77px; left: 0px;';
      case 1: return 'top: -85px; left: 38px;';
      case 2: return 'top: -64px; left: 77px;';
      case 3: return 'bottom: 39px; left: 96px;';
      case 4: return 'bottom: -1px; left: 85px;';
      case 5: return 'bottom: -2px; left: -2px;';
      case 6: return 'top: -140px; left: 5px;';
      case 7: return 'top: -95px; right: 5px;';
      default: return '';
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
    if (!this._holdTriggered) clickCallback();
    this._holdTriggered = false;
  }

  _cancelHold() {
    clearTimeout(this._holdTimeout);
    this._holdTriggered = false;
  }

  _handleHoldAction(item) {
    if (!item.hold_action) {
      this.dispatchEvent(new CustomEvent('hass-more-info', {
        detail: { entityId: item.entity },
        bubbles: true,
        composed: true,
      }));
      return;
    }
    const { action, service, service_data, navigation_path } = item.hold_action;
    switch (action) {
      case 'more-info':
        this.dispatchEvent(new CustomEvent('hass-more-info', {
          detail: { entityId: item.entity },
          bubbles: true,
          composed: true,
        }));
        break;
      case 'toggle':
        this._toggleEntity(item.entity);
        break;
      case 'call-service':
        if (service) {
          const [domain, svc] = service.split('.');
          const data = { ...service_data, entity_id: service_data?.entity_id || item.entity };
          this.hass.callService(domain, svc, data);
        }
        break;
      case 'navigate':
        if (navigation_path) {
          window.history.pushState({}, '', navigation_path);
          window.dispatchEvent(new Event('location-changed'));
        }
        break;
    }
  }

  _handleMainIconTap() {
    const { action, service, service_data, navigation_path } = this.config.tap_action || {};
    switch (action) {
      case 'toggle':
        this._toggleEntity(this.config.entity);
        break;
      case 'more-info':
        this.dispatchEvent(new CustomEvent('hass-more-info', {
          detail: { entityId: this.config.entity },
          bubbles: true,
          composed: true,
        }));
        break;
      case 'call-service':
        if (service) {
          const [domain, svc] = service.split('.');
          const data = { ...service_data, entity_id: service_data?.entity_id || this.config.entity };
          this.hass.callService(domain, svc, data);
        }
        break;
      case 'navigate':
        if (navigation_path) {
          window.history.pushState({}, '', navigation_path);
          window.dispatchEvent(new Event('location-changed'));
        }
        break;
    }
  }

  _toggleEntity(entity) {
    if (!this.hass) return;
    this.hass.callService('homeassistant', 'toggle', { entity_id: entity });
  }

  _handleSubButtonTap(item) {
    const { action, service, service_data, navigation_path } = item.tap_action || {};
    switch (action) {
      case 'toggle':
        this._toggleEntity(item.entity);
        break;
      case 'more-info':
        this.dispatchEvent(new CustomEvent('hass-more-info', {
          detail: { entityId: item.entity },
          bubbles: true,
          composed: true,
        }));
        break;
      case 'call-service':
        if (service) {
          const [domain, svc] = service.split('.');
          const data = { ...service_data, entity_id: service_data?.entity_id || item.entity };
          this.hass.callService(domain, svc, data);
        }
        break;
      case 'navigate':
        if (navigation_path) {
          window.history.pushState({}, '', navigation_path);
          window.dispatchEvent(new Event('location-changed'));
        }
        break;
    }
  }

  _handleMushroomTap(item) {
    this._handleSubButtonTap(item);
  }

  render() {
    if (!this.config || !this.hass) {
      return html`<div>Loading…</div>`;
    }


    const { entities, name, icon, background, border_radius } = this.config;
    const colors = this.config.colors;
    const hass = this.hass;
    const presenceOn = hass.states[entities.presence.entity]?.state === 'on';

    const ACCENT_ICON    = 'var(--primary-color)';
    const INACTIVE_ICON  = 'var(--secondary-text-color)';
    const ACCENT_BG      = 'color-mix(in srgb, var(--primary-color) 20%, transparent)';
    const INACTIVE_BG    = 'var(--card-background-color)';
    const iconOnColor = colors.active;
    const iconOffColor = colors.inactive;
    const bgOnColor = colors.backgroundActive;
    const bgOffColor = colors.backgroundInactive;

 

    const bubbleIconColor = presenceOn ? iconOnColor : iconOffColor;
    const bubbleBgColor   = presenceOn ? bgOnColor   : bgOffColor;

    const cardVars = [
      background    ? `--bubble-room-background: ${background}`       : '',
      border_radius ? `--bubble-room-border-radius: ${border_radius}` : '',
      `--bubble-room-icon-bg: ${bubbleBgColor}`,
      `--bubble-room-icon-color: ${bubbleIconColor}`,
      `--bubble-room-name-color: ${bubbleIconColor}`
    ].filter(v => v).join(';');

    const mainIcon = icon?.trim() ? icon : this._getFallbackIcon(entities.presence.entity);

    const subButtons = [
      entities['sub-button1'],
      entities['sub-button2'],
      entities['sub-button3'],
      entities['sub-button4']
    ].filter(b => b && b.entity);

    const mushroomKeys = [
      'entities1','entities2','entities3','entities4','entities5',
      'climate','temperature','camera'
    ];
    const mushrooms = mushroomKeys.map((key, idx) => {
      const item = entities[key];
      if (!item) return { item: null, idx, color: null };
      if (item.temperature_sensor || item.humidity_sensor) {
        return { item, idx, color: bubbleIconColor };
      }
      const on = hass.states[item.entity]?.state === 'on';
      return { item, idx, color: on ? iconOnColor : iconOffColor };
    });

    return html`
      <ha-card style="${cardVars}">
        <div class="card">
          <div class="grid-container">
            <div class="name-area" style="color: ${bubbleIconColor};">${name}</div>
            <div class="icon-area">
              <div class="bubble-icon-container"
                   @pointerdown=${e => this._startHold(e, this.config)}
                   @pointerup=${e => this._endHold(e, this.config, () => this._handleMainIconTap())}
                   @pointerleave=${() => this._cancelHold()}>
                ${ mainIcon
                  ? html`<ha-icon class="bubble-icon" icon="${mainIcon}" style="color: ${bubbleIconColor};"></ha-icon>`
                  : nothing }
              </div>
              <div class="mushroom-container">
                ${ mushrooms.map(({ item, idx, color }) => {
                    if (!item) {
                      return html`<div class="mushroom-item" style="${this._defaultMushroomStyle(idx)}"></div>`;
                    }
                    return this._renderMushroom(item, idx, color);
                  }) }
              </div>
            </div>
            <div class="bubble-sub-button-container">
              ${ subButtons.map(btn => {
                  const isOn    = hass.states[btn.entity]?.state === 'on';
                  const btnBg   = isOn ? this.config.colors.backgroundActive   ?? ACCENT_BG : this.config.colors.backgroundInactive ?? INACTIVE_BG;
                  const iconCol = isOn ? this.config.colors.active             ?? ACCENT_ICON : this.config.colors.inactive ?? INACTIVE_ICON;

                  const ic      = this._getFallbackIcon(btn.entity);
                  return html`
                    <div class="bubble-sub-button ${isOn ? 'active' : 'inactive'}"
                         style="background-color: ${btnBg}; color: ${iconCol};"
                         @pointerdown=${e => this._startHold(e, btn)}
                         @pointerup=${e => this._endHold(e, btn, () => this._handleSubButtonTap(btn))}
                         @pointerleave=${() => this._cancelHold()}>
                      <ha-icon icon="${ic}" style="color: inherit;"></ha-icon>
                    </div>
                  `;
                }) }
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
console.log('[Bubble Room] Custom card script loaded');