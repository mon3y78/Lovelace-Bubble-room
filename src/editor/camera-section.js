/**
 * camera-section.js – Camera Section Editor
 *
 * Bubble Room Custom Card – Editor Section
 * ----------------------------------------
 * Gestisce la configurazione della sezione camera: entità, icona,
 * tap/hold action, reset.
 *
 * Da importare nell’editor principale.
 * Usa helpers e azioni centralizzate.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: [DATA]
 */
 
 /**
 * camera-panel.js – Modulo Camera Section Bubble Room Card
 *
 * Bubble Room Custom Card – Editor Section: Camera
 * ------------------------------------------------
 * Gestisce la sezione "Camera" dell’editor Bubble Room.
 * Permette di configurare l’entità camera, l’icona, auto-discovery e reset.
 * Tutte le funzioni di stato e aggiornamento sono fornite tramite il contesto ctx dal main editor.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: 2025-07-21
 */

import { html } from 'lit';

/**
 * Render della sezione Camera dell’editor Bubble Room.
 * @param {Object} ctx - Context principale del BubbleRoomEditor (this)
 * @returns {TemplateResult}
 */
export function renderCameraPanel(ctx) {
 const {
  _config,
  _expandedPanel,
  _onPanelExpanded,
  _toggleAutoDiscoverySection,
  _renderEntityInput,
  _renderIconInput,
  _resetCameraConfig
 } = ctx;
 
 return html`
    <ha-expansion-panel
      class="glass-panel camera-panel"
      .expanded="${_expandedPanel === 'camera'}"
      @expanded-changed="${e => _onPanelExpanded('camera', e)}">
      <div slot="header" class="glass-header camera-header">📷 Camera</div>
      <div class="glass-content camera-content">
        <!-- Auto-discovery -->
        <div class="autodiscover-box" @click="${() => {
            const curr = _config.auto_discovery_sections?.camera ?? false;
            _toggleAutoDiscoverySection('camera', !curr);
          }}">
          <label>
            <input
              type="checkbox"
              .checked="${_config.auto_discovery_sections?.camera ?? false}"
              @change="${e => _toggleAutoDiscoverySection('camera', e.target.checked)}"
              @click="${e => e.stopPropagation()}"
            />
            <span>🪄 Auto-discovery</span>
          </label>
        </div>
        <!-- Glass-pill: Entity & Icon -->
        <div class="mini-pill glass-pill expanded">
          <div class="mini-pill-header">
            Entity & Icon
          </div>
          <div class="mini-pill-content">
            <div style="display:flex; flex-direction:column; gap:5px;">
              <div class="input-group" style="flex:1; margin-bottom:0;">
                ${_renderEntityInput("Camera (ID)", "camera", "entity", "camera")}
              </div>
              <div class="input-group" style="flex:1; margin-bottom:0;">
                ${_renderIconInput("Camera Icon", "camera")}
              </div>
            </div>
          </div>
        </div>
        <!-- Reset -->
        <div style="margin-top:1.2em; text-align:center;">
          <button class="reset-button" @click="${_resetCameraConfig}">🧹 Reset Camera</button>
        </div>
      </div>
    </ha-expansion-panel>
  `;
}