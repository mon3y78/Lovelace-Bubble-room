// src/bubble-room-editor.js
import { LitElement, html, css } from 'lit';
import './panels/RoomPanel.js';
import './panels/SensorsPanel.js';
import './panels/MushroomsPanel.js';
import './panels/SubButtonsPanel.js';
import './panels/ColorsPanel.js';

export class BubbleRoomEditor extends LitElement {
  static properties = {
    hass:       { type: Object },
    config:     { type: Object },
    openPanel:  { type: String, state: true },
  };

  constructor() {
    super();
    this.hass      = {};
    this.config    = {};
    this.openPanel = ''; // nessuno aperto di default
  }

  render() {
    return html`
      <room-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'room'}
        @expanded-changed=${e => this._onToggle(e, 'room')}
        @panel-changed=${this._onPanelChanged}
      ></room-panel>

      <sensors-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'sensors'}
        @expanded-changed=${e => this._onToggle(e, 'sensors')}
        @panel-changed=${this._onPanelChanged}
      ></sensors-panel>

      <mushrooms-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'mushrooms'}
        @expanded-changed=${e => this._onToggle(e, 'mushrooms')}
        @panel-changed=${this._onPanelChanged}
      ></mushrooms-panel>

      <sub-buttons-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'subbuttons'}
        @expanded-changed=${e => this._onToggle(e, 'subbuttons')}
        @panel-changed=${this._onPanelChanged}
      ></sub-buttons-panel>

      <colors-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${this.openPanel === 'colors'}
        @expanded-changed=${e => this._onToggle(e, 'colors')}
        @panel-changed=${this._onPanelChanged}
      ></colors-panel>
    `;
  }

  _onToggle(e, key) {
    if (e.detail.expanded) {
      this.openPanel = key;
    } else if (this.openPanel === key) {
      this.openPanel = '';
    }
  }

  _onPanelChanged(e) {
    // Logica esistente per gestire i cambiamenti di configurazione
    const { prop, val } = e.detail;
    this.dispatchEvent(new CustomEvent('editor-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);
