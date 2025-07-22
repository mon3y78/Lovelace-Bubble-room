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

import { html } from 'lit';

/**
 * Render della sezione Room dell’editor Bubble Room.
 * @param {Object} ctx - Contesto principale del BubbleRoomEditor (this)
 * @returns {TemplateResult}
 */
export function renderRoomPanel(ctx) {
 const {
  _config,
  _hass,
  _expandedPanel,
  _onPanelExpanded,
  _toggleAutoDiscoverySection,
  _updateName,
  _updateIcon,
  _renderEntityInput,
  _renderTapHoldAction,
  _resetRoomConfig
 } = ctx;
 
 return html`
    <ha-expansion-panel
      class="glass-panel room-panel"
      .expanded="${_expandedPanel === 'room'}"
      @expanded-changed="${e => _onPanelExpanded('room', e)}">
      <div slot="header" class="glass-header room-header">🛋️ Room Settings</div>
      <div class="glass-content room-content">
        <!-- Auto-scoperta -->
        <div class="autodiscover-box" @click="${() => {
            const curr = _config.auto_discovery_sections?.room_presence ?? false;
            _toggleAutoDiscoverySection('room_presence', !curr);
          }}">
          <label>
            <input
              type="checkbox"
              .checked="${_config.auto_discovery_sections?.room_presence ?? false}"
              @change="${e => _toggleAutoDiscoverySection('room_presence', e.target.checked)}"
              @click="${e => e.stopPropagation()}"
            />
            <span>🪄 Auto-discovery</span>
          </label>
        </div>

        <!-- MINI-PILL "Room": contiene Room name e Area su una riga -->
        <div class="mini-pill glass-pill expanded" style="margin-bottom:18px;">
          <div class="mini-pill-header" style="font-size:1.09em; color:#55afff;">Room</div>
          <div class="mini-pill-content">
            <div style="display:flex; flex-direction:column; gap:5px;">
              <div style="flex:1;">
                <label>Room name:</label>
                <input type="text" .value="${_config.name || ''}" @input="${_updateName}" />
              </div>
              <div style="flex:1;">
                <label>Area:</label>
                <ha-area-picker
                  .hass="${_hass}"
                  .value="${_config.area || ''}"
                  @value-changed="${e => {
                    const newArea = e.detail.value;
                    const autoDiscovery = {
                      room_presence: true,
                      subbutton: true,
                      mushroom: true,
                      camera: true,
                      climate: true,
                      sensor: true
                    };
                    ctx._config = {
                      ...ctx._config,
                      area: newArea,
                      auto_discovery_sections: autoDiscovery
                    };
                    ctx.requestUpdate();
                    ctx._fireConfigChanged();
                  }}">
                </ha-area-picker>
              </div>
            </div>
          </div>
        </div>

        <!-- MINI-PILL "Icon": Room Icon + Presence su una riga, sotto Tap + Hold -->
        <div class="mini-pill glass-pill expanded" style="margin-bottom:12px;">
          <div class="mini-pill-header" style="font-size:1.09em; color:#55afff;">Icon</div>
          <div class="mini-pill-content">
            <div style="display:flex; flex-direction:column; gap:5px;">
              <div style="flex:1; min-width:170px;">
                <label>Room Icon:</label>
                <ha-icon-picker
                  .hass="${_hass}"
                  .value="${_config.icon || ''}"
                  allow-custom-icon
                  @value-changed="${e => {
                    ctx._config = { ...ctx._config, icon: e.detail.value };
                    ctx.requestUpdate();
                    ctx._fireConfigChanged();
                  }}">
                </ha-icon-picker>
              </div>
              <div style="flex:2; min-width:170px;">
                ${_renderEntityInput("Presence (ID)", "presence", "entity", "room_presence")}
              </div>
            </div>
            <div style="display:flex; flex-direction:column; gap:1px;">
              <div style="flex:1; min-width:160px;">
                ${_renderTapHoldAction("tap")}
              </div>
              <div style="flex:1; min-width:160px;">
                ${_renderTapHoldAction("hold")}
              </div>
            </div>
          </div>
        </div>

        <!-- RESET -->
        <div style="margin-top:1.2em; text-align:center;">
          <button class="reset-button" @click="${_resetRoomConfig}">🧹 Reset Room Settings</button>
        </div>
      </div>
    </ha-expansion-panel>
  `;
}