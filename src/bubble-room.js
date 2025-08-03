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
      subbuttons: [],
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
      icon      : sb.icon,
      active    : this.hass.states?.[sb.entity_id]?.state === 'on',
      colorOn   : bgOn,
      colorOff  : bgOff,
      iconOn,
      iconOff,
      entity_id : sb.entity_id,
    }));
  }

  _onSubButtonClick = e => this._runAction(e.detail, 'tap');

  _onSubButtonHold  = e => this._runAction(e.detail, 'hold');

  _runAction(detail, type) {
    const idx = detail.index;
    if (typeof idx !== 'number') return;
  
    const btnCfg = this.config.subbuttons?.[idx];
    if (!btnCfg || !btnCfg.entity_id) return;
    const entId  = btnCfg.entity_id;
  
    const key    = `sub-button${idx + 1}`;
    const actObj = btnCfg[`${type}_action`] ?? { action: 'toggle' };
    const act    = actObj.action ?? 'toggle';
  
    console.log('[BubbleRoom] runAction', { idx, type, entId, actObj });
  
    const callSvc = (svc, data = {}) => {
      const [dom, srv] = svc.split('.');
      this.hass.callService(dom, srv, data);
    };
  
    switch (act) {
      case 'toggle': {
        const domain = entId.split('.')[0];
        this.hass.callService(domain, 'toggle', { entity_id: entId });
        break;
      }
      case 'more-info': {
        this.dispatchEvent(new CustomEvent('hass-more-info', {
          bubbles: true, composed: true,
          detail: { entityId: entId },
        }));
        break;
      }
      case 'navigate': {
        if (actObj.navigation_path) location.assign(actObj.navigation_path);
        break;
      }
      case 'call-service': {
        if (actObj.service) callSvc(actObj.service, actObj.service_data || {});
        break;
      }
      case 'none':
      default:
        // do nothing
    }
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
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'bubble-room',
  name: 'Bubble Room',
  description: 'A stylish room control card with environmental sensors',
  preview: true,
  documentationURL: 'https://github.com/mon3y78/Lovelace-Bubble-room'
});