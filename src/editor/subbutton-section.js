/**
 * subbutton-section.js – Subbutton Section Editor
 *
 * Bubble Room Custom Card – Editor Section
 * ----------------------------------------
 * Gestisce la configurazione dei subbutton (max 4): entità, icona,
 * tap/hold action, funzione, reset di gruppo.
 *
 * Da importare nell’editor principale.
 * Usa helpers e azioni centralizzate.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: [DATA]
 */
 
 /**
 * subbutton-panel.js – Modulo Subbutton Section Bubble Room Card
 *
 * Bubble Room Custom Card – Editor Section: Subbuttons
 * ----------------------------------------------------
 * Gestisce la sezione "Subbuttons" dell'editor: configurazione dei 4 sub-button con entità, icona, funzione, tap/hold action.
 * Tutta la logica di stato rimane nel file principale. Il modulo riceve il context `this` dal main editor.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: 2025-07-21
 */

import { html } from 'lit';

/**
 * Render della sezione Subbutton dell’editor Bubble Room.
 * @param {Object} ctx - Contesto principale del BubbleRoomEditor (this)
 * @returns {TemplateResult}
 */
export function renderSubButtonPanel(ctx) {
 const {
  _config,
  _expandedPanel,
  _expandedSubButtons,
  _onPanelExpanded,
  _toggleAutoDiscoverySection,
  _renderEntityInput,
  _renderIconInput,
  _renderTapHoldAction,
  _updateActionFieldGeneric,
  _resetSubButtonConfig,
  _toggleSubButtonExpand
 } = ctx;
 
 // Assicurati che lo stato sia sempre lungo 4
 const expandedArr = Array.isArray(_expandedSubButtons) && _expandedSubButtons.length === 4 ?
  _expandedSubButtons :
  [false, false, false, false];
 
 return html`
    <ha-expansion-panel
      class="glass-panel subbutton-panel"
      .expanded="${_expandedPanel === 'subbutton'}"
      @expanded-changed="${e => _onPanelExpanded('subbutton', e)}">
      <div slot="header" class="glass-header subbutton-header">🎛️ Subbuttons</div>
      <div class="glass-content subbutton-content">

        <!-- Auto-scoperta -->
        <div class="autodiscover-box" @click="${() => {
            const curr = _config.auto_discovery_sections?.subbutton ?? false;
            _toggleAutoDiscoverySection('subbutton', !curr);
          }}">
          <label>
            <input
              type="checkbox"
              .checked="${_config.auto_discovery_sections?.subbutton ?? false}"
              @change="${e => _toggleAutoDiscoverySection('subbutton', e.target.checked)}"
              @click="${e => e.stopPropagation()}"
            />
            <span>🪄 Auto-discovery</span>
          </label>
        </div>

        <!-- Subbutton pills -->
        ${["sub-button1", "sub-button2", "sub-button3", "sub-button4"].map((key, i) => {
          const label = `Sub-button ${i+1}`;
          const expanded = expandedArr[i];
          const accent = "#b28fff";
          return renderExpandablePill({
            label,
            expanded,
            accent,
            onToggle: () => _toggleSubButtonExpand(i),
            content: html`
              <div style="display:flex; flex-direction:column; gap:5px;">
                <div class="input-group" style="flex:1; margin-bottom:0;">
                  ${_renderEntityInput("Entities (ID)", key, "entity", "subbutton")}
                </div>
                <div class="input-group" style="flex:1; margin-bottom:0;">
                  ${_renderIconInput("Icon", key)}
                </div>
              </div>
              <div style="margin-bottom:6px;">
                <span style="display:block; font-size:1.13em; font-weight:700; color:#b28fff;">Function:</span>
              </div>
              <div style="display:flex; flex-direction:column; gap:1px;">
                <div style="flex:1; min-width:160px;">
                  ${_renderTapHoldAction("tap", _config.entities?.[key], _updateActionFieldGeneric(key))}
                </div>
                <div style="flex:1; min-width:160px;">
                  ${_renderTapHoldAction("hold", _config.entities?.[key], _updateActionFieldGeneric(key))}
                </div>
              </div>
            `
          });
        })}

        <!-- Reset -->
        <div style="margin-top:1.2em; text-align:center;">
          <button class="reset-button" @click="${_resetSubButtonConfig}">🧹 Reset Sub-buttons</button>
        </div>
      </div>
    </ha-expansion-panel>
  `;
}

/**
 * Wrapper pill espandibile riutilizzabile (stile Bubble Room)
 * @param {Object} params - { label, expanded, onToggle, content, accent }
 * @returns {TemplateResult}
 */
function renderExpandablePill({ label, expanded, onToggle, content, accent }) {
 return html`
    <div class="mini-pill glass-pill ${expanded ? 'expanded' : ''}">
      <div
        class="mini-pill-header"
        style="${accent ? `--section-accent: ${accent}` : ''}"
        @click="${onToggle}"
      >
        ${label}
        <span class="chevron">${expanded ? '▼' : '▶'}</span>
      </div>
      ${expanded ? html`
        <div class="mini-pill-content">
          ${content}
        </div>
      ` : ''}
    </div>
  `;
}