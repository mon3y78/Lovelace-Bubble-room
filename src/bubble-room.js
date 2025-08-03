// src/bubble-room.js
import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';
import './components/BubbleSubButton.js';

export class BubbleRoom extends LitElement {
  static properties = {
    config: { type: Object },
    hass:   { type: Object },
  };

  constructor() {
    super();
    this.config = {};
    this.hass   = {};
  }

  setConfig(rawConfig) {
    // Clono la config e imposto default layout “wide”
    this.config = {
      layout: 'wide',
      ...rawConfig,
    };
  }

  static getStubConfig() {
    return {
      type: 'custom:bubble-room',
      layout: 'wide',
      name: 'Stanza di prova',
      area: 'Zona Giorno',
      sensors: [],
      mushrooms: [],
      subbuttons: [
        { entity_id: 'light.luce', icon: 'mdi:lightbulb', active: false }
      ],
      colors: {
        subbutton: {
          background_on: 'rgba(var(--color-blue),1)',
          background_off: 'rgba(var(--color-blue),0.3)',
          icon_on: 'yellow',
          icon_off: '#666'
        }
      }
    };
  }

  static async getConfigElement() {
    await import('./bubble-room-editor.js');
    return document.createElement('bubble-room-editor');
  }

  // Trasforma config.subbuttons + hass.states → {icon, active, colorOn, colorOff, iconOn, iconOff}
  _getSubButtons() {
    const bgOn    = this.config.colors?.subbutton?.background_on  ?? '#00d46d';
    const bgOff   = this.config.colors?.subbutton?.background_off ?? '#999';
    const iconOn  = this.config.colors?.subbutton?.icon_on        ?? 'yellow';
    const iconOff = this.config.colors?.subbutton?.icon_off       ?? '#666';

    return (this.config.subbuttons || []).map(sb => ({
      icon:     sb.icon,
      active:   this.hass.states?.[sb.entity_id]?.state === 'on',
      colorOn:  bgOn,
      colorOff: bgOff,
      iconOn:   iconOn,
      iconOff:  iconOff,
      entity_id: sb.entity_id,
    }));
  }

  _onSubButtonClick(detail) {
    console.log('Tap action on sub-button:', detail);
    // Esempio di callService:
    // const idx = detail.index;
    // const key = `sub-button${idx+1}`;
    // const action = this.config.entities?.[key]?.tap_action;
    // this.hass.callService(action.service_domain, action.service, action.service_data);
  }

  _onSubButtonHold(detail) {
    console.log('Hold action on sub-button:', detail);
    // Simile al tap, ma usando hold_action:
    // const idx = detail.index;
    // const key = `sub-button${idx+1}`;
    // const action = this.config.entities?.[key]?.hold_action;
    // this.hass.callService(action.service_domain, action.service, action.service_data);
  }



  render() {
    // layout sarà 'wide' o 'tall' in base a RoomPanel.js :contentReference[oaicite:6]{index=6}
    const layout    = this.config.layout || 'wide';
    const subbuttons= this._getSubButtons();

    return html`
      <div class="bubble-room-grid ${layout}">
        <div class="main-area">
          <div class="row1">
            <div class="sensors-placeholder">[bubble-sensors]</div>
            <div class="name-placeholder">[bubble-name]</div>
          </div>
          <div class="row2">
            <div class="icon-mushroom-area">[bubble-mushroom]</div>
            <div class="k-space"></div>
          </div>
        </div>
        <div class="sidebar">
          <bubble-subbutton
            .subbuttons="${subbuttons}"
            @subbutton-click="${e => this._onSubButtonClick(e.detail)}"
            @subbutton-hold="${e => this._onSubButtonHold(e.detail)}"
          ></bubble-subbutton>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block; height: 100%; box-sizing: border-box;
    }
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      width: 100%; height: 100%; box-sizing: border-box;
      border: 2px dashed yellow;
    }
    .main-area {
      display: grid; height: 100%; min-height: 0; box-sizing: border-box;
      border: 2px dashed green;
    }
    .row1 {
      display: grid; gap: 4px; min-height: 0; box-sizing: border-box;
      border: 2px dashed blue;
    }
    .row2 {
      display: grid; gap: 4px; height: 100%; min-height: 0; box-sizing: border-box;
      border: 2px dashed purple;
    }
    .sensors-placeholder { border: 2px dashed lime; box-sizing: border-box; }
    .name-placeholder    { border: 2px dashed orange; box-sizing: border-box; }
    .icon-mushroom-area  { border: 2px dashed violet; box-sizing: border-box; }
    .k-space             { border: 2px dashed black; box-sizing: border-box; }
    .sidebar {
      display: flex; flex-direction: column;
      height: 100%; min-height: 0; box-sizing: border-box;
      border: 2px dashed red;
    }

    /* ── LAYOUT “TALL” ── */
    .bubble-room-grid.tall .main-area    { grid-template-rows: 1fr 2fr; }
    .bubble-room-grid.tall .row1         { grid-template-rows: 1fr 2fr; }
    .bubble-room-grid.tall .row2         { grid-template-columns: 1fr 0fr; }

    /* ── LAYOUT “WIDE” ── */
    .bubble-room-grid.wide .main-area    { grid-template-rows: 2fr 1fr; }
    .bubble-room-grid.wide .row1         { grid-template-rows: 2fr 1fr; }
    .bubble-room-grid.wide .row2         { grid-template-columns: 1fr 1fr; }
  `;
}

customElements.define('bubble-room', BubbleRoom);
