/**
 * room-section.js – Room Section Editor
 *
 * Bubble Room Custom Card – Editor Section
 * ----------------------------------------
 * Gestisce la configurazione della stanza: nome, area, icona principale,
 * presenza, tap/hold action, reset.
 *
 * Da importare come componente nell’editor principale.
 * Utilizza helpers centralizzati (icon-mapping, utils, ecc).
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: [DATA]
 */
 
 /**
 * room-panel.js – Modulo Room Section Bubble Room Card
 *
 * Bubble Room Custom Card – Editor Section: Room
 * ----------------------------------------------
 * Gestisce la sezione "Room" dell'editor: nome stanza, area, icona stanza, presenza e tap/hold action.
 * Tutta la logica di stato rimane nel file principale. Il modulo riceve il context `this` dal main editor.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: 2025-07-21
 */

/**
 * src/editor/room.js – Room Settings Editor Bubble Room Card
 *
 * Bubble Room Custom Card – Sezione Room
 * --------------------------------------
 * Editor della sezione "Room" della Bubble Room Card:
 *  - Nome stanza, selezione area
 *  - Icona stanza (ha-icon-picker)
 *  - Presenza (ha-entity-picker) e tap/hold action stanza
 *  - Auto-discovery e reset
 *
 * Usa helper UI centralizzati (src/editor/ui-helpers.js) per azioni, reset e box autodiscovery.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: 22 luglio 2025
 */

import { LitElement, html, css } from 'https://unpkg.com/lit@2.6.1/index.js?module';
import { renderTapHoldAction, renderAutoDiscoveryBox, renderResetButton } from './ui-helpers.js';

export class BubbleRoomEditorRoom extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _expanded: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.hass = undefined;
    this.config = {};
    this._expanded = true;
  }

  setConfig(config) {
    this.config = { ...config };
  }

  // Patch su campi (anche profondi)
  _patchConfig(pathArray, value) {
    const conf = JSON.parse(JSON.stringify(this.config));
    let ref = conf;
    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i];
      if (typeof ref[key] !== "object" || ref[key] === null) ref[key] = {};
      ref = ref[key];
    }
    ref[pathArray[pathArray.length - 1]] = value;
    this.config = conf;
    this._fireConfigChanged();
  }

  _fireConfigChanged() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    }));
  }

  _updateName(e) {
    this._patchConfig(['name'], e.target.value);
  }
  _updateArea(e) {
    this._patchConfig(['area'], e.detail.value);
  }
  _updateIcon(e) {
    this._patchConfig(['icon'], e.detail.value);
  }
  _updatePresence(e) {
    this._patchConfig(['entities', 'presence', 'entity'], e.detail.value);
  }

  _handleAutoDiscovery(checked) {
    const autoSections = { ...(this.config.auto_discovery_sections || {}) };
    autoSections.room_presence = checked;
    this._patchConfig(['auto_discovery_sections'], autoSections);
  }

  _handleReset() {
    this.config = {
      ...this.config,
      name: '',
      icon: '',
      area: '',
      entities: { ...this.config.entities, presence: {} },
      tap_action: { action: 'none' },
      hold_action: { action: 'none' }
    };
    this.requestUpdate();
    this._fireConfigChanged();
  }

  static get styles() {
    return css`
      :host { display: block; }
      .glass-panel { border-radius: 40px; margin: 0; background: rgba(73,164,255,0.14); }
      .glass-header { font-size: 1.2rem; font-weight: 700; color: #55afff; padding: 22px 0 18px 0; text-align: center; }
      .glass-content { padding: 20px 12px 15px 12px; }
      .mini-pill { background: rgba(44,70,100,0.23); border-radius: 24px; margin-bottom: 16px; }
      .mini-pill-header { font-size:1.09em; color:#55afff; padding: 15px 22px 12px 26px; font-weight:800; }
      .mini-pill-content { padding: 12px 22px 16px 22px; }
      .input-group { margin-bottom: 12px; }
      label { font-weight:700; color:#55afff; display:block; margin-bottom:6px; }
    `;
  }

  render() {
    return html`
      <div class="glass-panel room-panel">
        <div class="glass-header">🛋️ Room Settings</div>
        <div class="glass-content room-content">

          <!-- Auto-discovery box -->
          ${renderAutoDiscoveryBox({
            checked: this.config.auto_discovery_sections?.room_presence ?? false,
            onToggle: checked => this._handleAutoDiscovery(checked)
          })}

          <!-- Pill: Nome e area -->
          <div class="mini-pill glass-pill expanded">
            <div class="mini-pill-header">Room</div>
            <div class="mini-pill-content">
              <div style="display:flex; flex-direction:column; gap:8px;">
                <div>
                  <label>Room name:</label>
                  <input type="text" .value="${this.config.name || ''}" @input="${this._updateName}" />
                </div>
                <div>
                  <label>Area:</label>
                  <ha-area-picker
                    .hass="${this.hass}"
                    .value="${this.config.area || ''}"
                    @value-changed="${this._updateArea}">
                  </ha-area-picker>
                </div>
              </div>
            </div>
          </div>

          <!-- Pill: Icona e presence -->
          <div class="mini-pill glass-pill expanded">
            <div class="mini-pill-header">Icon</div>
            <div class="mini-pill-content">
              <div style="display:flex; flex-direction:column; gap:8px;">
                <div>
                  <label>Room Icon:</label>
                  <ha-icon-picker
                    .hass="${this.hass}"
                    .value="${this.config.icon || ''}"
                    allow-custom-icon
                    @value-changed="${this._updateIcon}">
                  </ha-icon-picker>
                </div>
                <div>
                  <label>Presence (entity):</label>
                  <ha-entity-picker
                    .hass="${this.hass}"
                    .value="${this.config.entities?.presence?.entity || ''}"
                    .includeEntities="${Object.keys(this.hass?.states || {}).filter(eid => eid.startsWith('binary_sensor.') || eid.startsWith('person.'))}"
                    allow-custom-entity
                    @value-changed="${this._updatePresence}">
                  </ha-entity-picker>
                </div>
              </div>
            </div>
          </div>

          <!-- Pill: Tap/Hold action -->
          <div class="mini-pill glass-pill expanded">
            <div class="mini-pill-header">Actions</div>
            <div class="mini-pill-content">
              ${renderTapHoldAction({
                actionType: "tap",
                configObj: this.config,
                patchFn: (path, value) => this._patchConfig(path, value)
              })}
              ${renderTapHoldAction({
                actionType: "hold",
                configObj: this.config,
                patchFn: (path, value) => this._patchConfig(path, value)
              })}
            </div>
          </div>

          <!-- Reset button -->
          ${renderResetButton({
            label: "Reset Room Settings",
            onClick: () => this._handleReset()
          })}
        </div>
      </div>
    `;
  }
}

customElements.define('bubble-room-editor-room', BubbleRoomEditorRoom);
export default BubbleRoomEditorRoom;
