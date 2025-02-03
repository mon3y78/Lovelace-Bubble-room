// /config/www/bubble-room/src/bubble-room.js
import { LitElement, html, css } from 'https://unpkg.com/lit@2.6.1/index.js?module';

class BubbleRoom extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object },
    };
  }

  /**
   * Supporto all'editor visivo.
   */
  static async getConfigElement() {
    await import('./bubble-room-editor.js');
    return document.createElement('bubble-room-editor');
  }

  /**
   * Restituisce una configurazione stub di base per la card.
   */
  static getStubConfig() {
    return {
      entities: {
        presence: 'binary_sensor.aqara_fp1_presence',
        light: 'light.luce_ventola',
        fan: 'fan.sonoff_1000f6e5c7',
        media: 'media_player.google_nest_1',
        vacuum: 'vacuum.slider',
        climate: 'climate.termostato_salotto',
      },
      colors: {
        active: 'rgba(var(--color-green), 1)',
        inactive: 'rgba(var(--color-green), 0.3)',
        backgroundActive: 'rgba(var(--color-green), 0.4)',
        backgroundInactive: 'rgba(var(--color-green), 0.1)',
      },
      name: 'Salotto',
      icon: 'mdi:sofa',
      mushrooms: []
    };
  }

  setConfig(config) {
    console.log("bubble-room.js: setConfig() called with:", config);
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
      throw new Error("La configurazione deve essere un oggetto valido.");
    }
    if (!config.entities || typeof config.entities !== 'object') {
      throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");
    }
    this.config = {
      entities: {
        presence: 'binary_sensor.aqara_fp1_presence',
        light: 'light.luce_ventola',
        fan: 'fan.sonoff_1000f6e5c7',
        media: 'media_player.google_nest_1',
        vacuum: 'vacuum.slider',
        climate: 'climate.termostato_salotto',
        ...config.entities,
      },
      colors: {
        active: 'rgba(var(--color-green), 1)',
        inactive: 'rgba(var(--color-green), 0.3)',
        backgroundActive: 'rgba(var(--color-green), 0.4)',
        backgroundInactive: 'rgba(var(--color-green), 0.1)',
        ...config.colors,
      },
      name: config.name || "Salotto",
      icon: config.icon || "mdi:sofa",
      mushrooms: config.mushrooms || [],
      ...config,
    };
    console.log("bubble-room.js: Processed configuration:", this.config);
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: sans-serif;
      }
      /* Card con dimensione fissa 180px x 180px, sfondo nero, bordi arrotondati e ombreggiatura personalizzata */
      .card {
        position: relative;
        width: 180px;
        height: 180px;
        background: black;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.8);
        overflow: hidden;
        margin: auto;
        padding: 5px;
      }
      /* Griglia per posizionare il nome, l'icona principale e i sub-button.
         Qui le colonne sono: 3fr, 3fr, 3fr, 5fr (l'ultima colonna è più larga) e le righe sono definite in base all'altezza della card. */
      .bubble-button-card {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-areas:
          "n n n b"
          "l l l b"
          "i i . b"
          "i i . b";
        grid-template-columns: 3fr 3fr 3fr 5fr;
        grid-template-rows: 1.5fr 0.5fr 1fr 1fr;
        justify-items: center;
        align-items: start;
      }
      /* Contenitore del nome (area "n") */
      .bubble-name-container {
        grid-area: n;
        align-self: start;
        justify-self: start;
        padding-left: 5px;
        padding-top: 5px;
      }
      .bubble-name {
        font-weight: bold;
        font-size: 20px;
        color: inherit;
      }
      /* Contenitore dell'icona principale (area "i") */
      .bubble-icon-container {
        grid-area: i;
        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 150%;
        overflow: hidden;
        left: -20%;
        top: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .bubble-icon {
        width: 50%;
        position: absolute;
        left: 27%;
        top: 13%;
        --mdc-icon-size: 100px;
        opacity: 0.5;
      }
      /* Contenitore dei sub-button (area "b") */
      .bubble-sub-button-container {
        grid-area: b;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: stretch;
        padding-right: 5px;
        height: 100%;
      }
      .bubble-sub-button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border-radius: 10px;
        text-align: center;
        background-color: rgba(var(--color-green), 0.4);
        margin: 2px 0;
      }
      /* Contenitore per gli elementi mushroom (overlay) */
      .mushroom-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
      }
      .mushroom-item {
        position: absolute;
        pointer-events: auto;
      }
      .sensor-item .primary {
        font-size: 11px;
        font-weight: bold;
        overflow: visible;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("bubble-room.js: Bubble Room card connected");
  }

  render() {
    if (!this.config || !this.hass) {
      console.log("bubble-room.js: config or hass not defined yet");
      return html`<div>Loading...</div>`;
    }
    const { entities, colors, name, icon, mushrooms } = this.config;
    const hass = this.hass;
    const presenceState = hass.states[entities.presence]?.state || 'off';
    const bubbleBg = presenceState === 'on'
      ? colors.backgroundActive
      : colors.backgroundInactive;
    const bubbleIconColor = presenceState === 'on'
      ? colors.active
      : colors.inactive;
    const bubbleNameColor = bubbleIconColor;
    
    // Definisce i sub-button da visualizzare nell'area "b"
    const subButtons = [
      { entity: entities.light, icon: 'mdi:lightbulb', label: 'Luce' },
      { entity: entities.fan, icon: 'mdi:fan', label: 'Ventola' },
      { entity: entities.media, icon: 'mdi:play-circle', label: 'Media' },
      { entity: entities.vacuum, icon: 'mdi:robot-vacuum', label: 'Aspirapolvere' },
    ];

    console.log("bubble-room.js: Rendering with config:", this.config);

    return html`
      <div class="card">
        <div class="bubble-button-card">
          <!-- Area del nome (grid-area n) -->
          <div class="bubble-name-container">
            <div class="bubble-name" style="color: ${bubbleNameColor};">
              ${name}
            </div>
          </div>
          <!-- (Area "l" lasciata vuota per eventuali ulteriori etichette) -->
          <!-- Contenitore dell'icona principale (grid-area i) -->
          <div class="bubble-icon-container" style="background-color: ${bubbleBg};">
            <ha-icon class="bubble-icon" icon="${icon}" style="color: ${bubbleIconColor};"></ha-icon>
          </div>
          <!-- Contenitore dei sub-button (grid-area b) -->
          <div class="bubble-sub-button-container">
            ${subButtons.map((btn) => {
              const state = hass.states[btn.entity]?.state || 'off';
              const btnColor = state === 'on' ? colors.active : colors.inactive;
              return html`
                <div class="bubble-sub-button" @click="${() => this._toggleEntity(btn.entity)}">
                  <ha-icon icon="${btn.icon}" style="color: ${btnColor};"></ha-icon>
                </div>
              `;
            })}
          </div>
        </div>
        <!-- Contenitore per gli elementi mushroom (overlay) -->
        <div class="mushroom-container">
          ${mushrooms.map((item) => {
            if (item.type === 'sensor') {
              return html`
                <div class="mushroom-item sensor-item" style="${item.style}">
                  <div class="primary">${this._renderTemplate(item.primary)}</div>
                </div>
              `;
            }
            const state = hass.states[item.entity]?.state || 'off';
            const iconColor = state === 'on'
              ? (item.icon_color && item.icon_color.on ? item.icon_color.on : 'orange')
              : (item.icon_color && item.icon_color.off ? item.icon_color.off : '#80808055');
            return html`
              <div class="mushroom-item" style="${item.style}" @click="${() => this._handleMushroomTap(item)}">
                <ha-icon icon="${item.icon}" style="color: ${iconColor};"></ha-icon>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  _toggleEntity(entity) {
    if (!this.hass) return;
    console.log("bubble-room.js: Toggling entity:", entity);
    this.hass.callService('homeassistant', 'toggle', { entity_id: entity });
  }

  _handleMushroomTap(item) {
    if (!item.tap_action || item.tap_action.action === 'none') {
      console.log("bubble-room.js: No tap_action for item:", item);
      return;
    }
    const action = item.tap_action.action;
    console.log("bubble-room.js: Handling mushroom tap, action:", action);
    if (action === 'toggle') {
      this._toggleEntity(item.entity);
    } else if (action === 'more-info') {
      this.hass.moreInfo(item.entity);
    } else if (action === 'navigate') {
      const event = new CustomEvent('ll-custom-navigate', {
        detail: { navigation_path: item.tap_action.navigation_path },
      });
      window.dispatchEvent(event);
    }
  }

  _renderTemplate(str) {
    if (!str) return "";
    return str.replace(
      /\{\{\s*states\(["'](.*?)["']\)\s*\}\}/g,
      (match, entity) => {
        return this.hass.states[entity] ? this.hass.states[entity].state : 'unknown';
      }
    );
  }

  set hass(hass) {
    console.log("bubble-room.js: Setting hass:", hass);
    this._hass = hass;
    this.requestUpdate();
  }

  get hass() {
    return this._hass;
  }
}

customElements.define('bubble-room', BubbleRoom);
