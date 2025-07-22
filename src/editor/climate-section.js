/**
 * climate-section.js – Climate Section Editor
 *
 * Bubble Room Custom Card – Editor Section
 * ----------------------------------------
 * Gestisce la configurazione della sezione climate: entità, icona,
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
 * climate-panel.js – Modulo Climate Section Bubble Room Card
 *
 * Bubble Room Custom Card – Editor Section: Climate
 * -------------------------------------------------
 * Gestisce la sezione "Climate" dell’editor Bubble Room.
 * Permette la selezione dell’entità climate e dell’icona associata, 
 * integra auto-discovery e reset delle configurazioni.
 * Tutte le funzioni e lo stato vengono gestite dal contesto ctx del main editor.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: 2025-07-21
 */

import { html } from 'lit';

/**
 * Render della sezione Climate dell’editor Bubble Room.
 * @param {Object} ctx - Context principale del BubbleRoomEditor (this)
 * @returns {TemplateResult}
 */
export function renderClimatePanel(ctx) {
 const {
  _config,
  _expandedPanel,
  _onPanelExpanded,
  _toggleAutoDiscoverySection,
  _renderEntityInput,
  _renderIconInput,
  _resetClimateConfig
 } = ctx;
 
 return html`
    <ha-expansion-panel
      class="glass-panel climate-panel"
      .expanded="${_expandedPanel === 'climate'}"
      @expanded-changed="${e => _onPanelExpanded('climate', e)}">
      <div slot="header" class="glass-header climate-header">🌡️ Climate</div>
      <div class="glass-content climate-content">
        <!-- Auto-discovery -->
        <div class="autodiscover-box" @click="${() => {
            const curr = _config.auto_discovery_sections?.climate ?? false;
            _toggleAutoDiscoverySection('climate', !curr);
          }}">
          <label>
            <input
              type="checkbox"
              .checked="${_config.auto_discovery_sections?.climate ?? false}"
              @change="${e => _toggleAutoDiscoverySection('climate', e.target.checked)}"
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
                ${_renderEntityInput("Climate (ID)", "climate", "entity", "climate")}
              </div>
              <div class="input-group" style="flex:1; margin-bottom:0;">
                ${_renderIconInput("Climate Icon", "climate")}
              </div>
            </div>
          </div>
        </div>
        <!-- Reset -->
        <div style="margin-top:1.2em; text-align:center;">
          <button class="reset-button" @click="${_resetClimateConfig}">🧹 Reset Climate</button>
        </div>
      </div>
    </ha-expansion-panel>
  `;
}