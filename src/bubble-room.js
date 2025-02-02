// src/bubble-room.js
import { LitElement, html, css } from 'lit';

/*
  Bubble Room
  -----------
  Questa custom card mostra:
   - Un’area “bubble” centrale con un’icona (es. il simbolo del salotto) il cui colore varia in base allo stato di una entità "presence".
   - Un gruppo di sub-buttons (per luce, ventilatore, media player, aspirapolvere) che eseguono azioni (toggle) al click.
   - Un container overlay per ulteriori elementi in stile mushroom-template, ognuno posizionato in maniera assoluta con
     proprie azioni (toggle, more-info, navigate) o visualizzazioni (es. dati sensor).
  
  La configurazione permette di impostare:
    - entities: oggetto con le entità principali (presence, light, fan, media, vacuum, climate)
    - colors: oggetto con le colorazioni (active, inactive, backgroundActive, backgroundInactive)
    - mushrooms: array di oggetti con la configurazione di ogni elemento "mushroom" (icona, entità, stili, azioni, ecc.)
    - Altri parametri come name e icon per la bubble principale.
*/

class BubbleRoom extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      hass: { type: Object }
    };
  }

  /**
   * setConfig() viene chiamato da Lovelace al momento dell’inizializzazione della card.
   * Qui verifichiamo la configurazione e impostiamo valori di default.
   */
  setConfig(config) {
    if (!config.entities) {
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
        ...config.entities
      },
      colors: {
        active: 'rgba(var(--color-green), 1)',
        inactive: 'rgba(var(--color-green), 0.3)',
        backgroundActive: 'rgba(var(--color-green), 0.4)',
        backgroundInactive: 'rgba(var(--color-green), 0.1)',
        ...config.colors
      },
      name: config.name || "Salotto",
      icon: config.icon || "mdi:sofa",
      // Array di oggetti per configurare gli elementi "mushroom"
      mushrooms: config.mushrooms || [],
      ...config
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: sans-serif;
      }
      .card {
        position: relative;
        width: 100%;
        max-width: 400px;
        background: var(--card-background, white);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        overflow: hidden;
        padding: 16px;
        margin: auto;
      }
      /* Bubble principale */
      .bubble-icon-container {
        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-color: var(--bubble-bg, rgba(var(--color-green), 0.1));
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
      }
      .bubble-icon {
        font-size: 64px;
        opacity: 0.8;
        color: var(--bubble-icon-color, rgba(var(--color-green), 0.3));
      }
      .card-title {
        text-align: center;
        font-size: 24px;
        margin-top: 8px;
        color: var(--primary-text-color, #333);
      }
      /* Sub-buttons */
      .sub-buttons {
        display: flex;
        justify-content: space-around;
        margin-top: 16px;
      }
      .sub-button {
        flex: 1;
        margin: 0 4px;
        padding: 8px;
        background: rgba(var(--color-green), 0.4);
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
      }
      .sub-button ha-icon {
        display: block;
        margin: 0 auto;
        font-size: 24px;
      }
      .sub-button span {
        display: block;
        font-size: 12px;
        margin-top: 4px;
      }
      /* Container per gli elementi mushroom (overlay) */
      .mushroom-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      .mushroom-item {
        pointer-events: auto;
        position: absolute;
      }
      .sensor-item .primary {
        font-size: 11px;
        font-weight: bold;
        overflow: visible;
      }
    `;
  }

  render() {
    if (!this.config || !this.hass) {
      return html`<div>Loading...</div>`;
    }

    const { entities, colors, name, icon, mushrooms } = this.config;
    const hass = this.hass;

    // Stato della presenza per la bubble principale
    const presenceState = hass.states[entities.presence]?.state || 'off';
    const bubbleBg = presenceState === 'on' ? colors.backgroundActive : colors.backgroundInactive;
    const bubbleIconColor = presenceState === 'on' ? colors.active : colors.inactive;

    // Definizione dei sub-buttons (icona e label fisse)
    const subButtons = [
      {
        entity: entities.light,
        icon: 'mdi:lightbulb',
        label: 'Luce'
      },
      {
        entity: entities.fan,
        icon: 'mdi:fan',
        label: 'Ventola'
      },
      {
        entity: entities.media,
        icon: 'mdi:play-circle',
        label: 'Media'
      },
      {
        entity: entities.vacuum,
        icon: 'mdi:robot-vacuum',
        label: 'Aspirapolvere'
      }
    ];

    return html`
      <div class="card">
        <!-- Bubble principale -->
        <div class="bubble-icon-container" style="background-color: ${bubbleBg};">
          <ha-icon class="bubble-icon" icon="${icon}" style="color: ${bubbleIconColor};"></ha-icon>
        </div>
        <div class="card-title">${name}</div>

        <!-- Sub-buttons -->
        <div class="sub-buttons">
          ${subButtons.map((btn) => {
            const state = hass.states[btn.entity]?.state || 'off';
            const btnColor = state === 'on' ? colors.active : colors.inactive;
            return html`
              <div class="sub-button" @click="${() => this._toggleEntity(btn.entity)}">
                <ha-icon icon="${btn.icon}" style="color: ${btnColor};"></ha-icon>
                <span>${btn.label}</span>
              </div>
            `;
          })}
        </div>

        <!-- Container per gli elementi mushroom (overlay) -->
        <div class="mushroom-container">
          ${mushrooms.map(item => {
            // Se l'elemento è di tipo "sensor", visualizza il testo (es. temperatura/umidità)
            if (item.type === 'sensor') {
              return html`
                <div class="mushroom-item sensor-item" style="${item.style}">
                  <div class="primary">${this._renderTemplate(item.primary)}</div>
                </div>
              `;
            }
            // Altrimenti, visualizza un'icona che reagisce al click
            const state = hass.states[item.entity]?.state || 'off';
            const iconColor = (state === 'on')
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

  /**
   * _toggleEntity esegue il toggle di una entità.
   */
  _toggleEntity(entity) {
    if (!this.hass) return;
    this.hass.callService('homeassistant', 'toggle', { entity_id: entity });
  }

  /**
   * _handleMushroomTap gestisce il tap su un elemento mushroom.
   * Se il tap_action è definito e diverso da "none", esegue:
   *   - toggle: cambia lo stato dell'entità
   *   - more-info: mostra la scheda informativa
   *   - navigate: dispatcha un evento di navigazione (da gestire a livello Lovelace)
   */
  _handleMushroomTap(item) {
    if (!item.tap_action || item.tap_action.action === 'none') return;
    const action = item.tap_action.action;
    if (action === 'toggle') {
      this._toggleEntity(item.entity);
    } else if (action === 'more-info') {
      this.hass.moreInfo(item.entity);
    } else if (action === 'navigate') {
      const event = new CustomEvent('ll-custom-navigate', {
        detail: { navigation_path: item.tap_action.navigation_path }
      });
      window.dispatchEvent(event);
    }
  }

  /**
   * _renderTemplate esegue una sostituzione semplice nei template di tipo:
   * {{ states("entity_id") }}
   */
  _renderTemplate(str) {
    if (!str) return "";
    return str.replace(/\{\{\s*states\(["'](.*?)["']\)\s*\}\}/g, (match, entity) => {
      return this.hass.states[entity] ? this.hass.states[entity].state : 'unknown';
    });
  }

  // Gestione dell'oggetto hass (passato da Lovelace)
  set hass(hass) {
    this._hass = hass;
    this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
}

customElements.define('bubble-room', BubbleRoom);
