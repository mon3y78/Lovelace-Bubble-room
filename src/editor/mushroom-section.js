/**
 * mushroom-section.js – Mushroom Entities Section Editor
 *
 * Bubble Room Custom Card – Editor Section
 * ----------------------------------------
 * Gestisce la configurazione delle entità “mushroom”: entità secondarie,
 * icona, tap/hold action, reset.
 *
 * Da importare nell’editor principale.
 * Usa helpers e funzioni centralizzate.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: [DATA]
 */
 
 /**
 * mushroom-panel.js – Modulo Mushroom Section Bubble Room Card
 *
 * Bubble Room Custom Card – Editor Section: Mushroom Entities
 * ----------------------------------------------------------
 * Gestisce la sezione "Mushroom Entities" dell’editor Bubble Room: 5 entità configurabili con icona, funzione, tap/hold action.
 * Riceve il context (`this`) dal main editor, NON gestisce logica di stato globale.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: 2025-07-21
 */

import { html } from 'lit';

/**
 * Render della sezione Mushroom Entities dell’editor Bubble Room.
 * @param {Object} ctx - Context principale del BubbleRoomEditor (this)
 * @returns {TemplateResult}
 */
export function renderMushroomPanel(ctx) {
 const {
  _config,
  _expandedPanel,
  _expandedMushroomEntities,
  _onPanelExpanded,
  _toggleAutoDiscoverySection,
  _renderEntityInput,
  _renderIconInput,
  _renderTapHoldAction,
  _updateActionFieldGeneric,
  _resetMushroomEntitiesConfig,
  _toggleMushroomEntityExpand
 } = ctx;
 
 // Defensive: sempre array di 5
 const expandedArr = Array.isArray(_expandedMushroomEntities) && _expandedMushroomEntities.length === 5 ?
  _expandedMushroomEntities :
  [false, false, false, false, false];
 
 const entityKeys = [
  { key: "entities1", label: "Entity 1" },
  { key: "entities2", label: "Entity 2" },
  { key: "entities3", label: "Entity 3" },
  { key: "entities4", label: "Entity 4" },
  { key: "entities5", label: "Entity 5" }
 ];
 
 return html`
    <ha-expansion-panel
      class="glass-panel mushroom-panel"
      .expanded="${_expandedPanel === 'mushroom'}"
      @expanded-changed="${e => _onPanelExpanded('mushroom', e)}">
      <div slot="header" class="glass-header mushroom-header">🍄 Mushroom Entities</div>
      <div class="glass-content mushroom-content">

        <!-- Auto-scoperta -->
        <div class="autodiscover-box" @click="${() => {
            const curr = _config.auto_discovery_sections?.mushroom ?? false;
            _toggleAutoDiscoverySection('mushroom', !curr);
          }}">
          <label>
            <input
              type="checkbox"
              .checked="${_config.auto_discovery_sections?.mushroom ?? false}"
              @change="${e => _toggleAutoDiscoverySection('mushroom', e.target.checked)}"
              @click="${e => e.stopPropagation()}"
            />
            <span>🪄 Auto-discovery</span>
          </label>
        </div>

        <!-- Mushroom Pills -->
        ${entityKeys.map((entity, i) => {
          const expanded = expandedArr[i];
          const accent = "#36e6a0";
          return renderExpandablePill({
            label: entity.label,
            expanded,
            accent,
            onToggle: () => _toggleMushroomEntityExpand(i),
            content: html`
              <div style="display:flex; flex-direction:column; gap:5px;">
                <div class="input-group" style="flex:1; margin-bottom:0;">
                  ${_renderEntityInput("Entity", entity.key, "entity", "mushroom")}
                </div>
                <div class="input-group" style="flex:1; margin-bottom:0;">
                  ${_renderIconInput("Icon", entity.key)}
                </div>
              </div>
              <div style="margin-bottom:6px;">
                <span style="display:block; font-size:1.13em; font-weight:700; color:#36e6a0;">Function:</span>
              </div>
              <div style="display:flex; flex-direction:column; gap:1px;">
                <div style="flex:1; min-width:160px;">
                  ${_renderTapHoldAction("tap", _config.entities?.[entity.key], _updateActionFieldGeneric(entity.key))}
                </div>
                <div style="flex:1; min-width:160px;">
                  ${_renderTapHoldAction("hold", _config.entities?.[entity.key], _updateActionFieldGeneric(entity.key))}
                </div>
              </div>
            `
          });
        })}

        <!-- Reset -->
        <div style="margin-top:1.2em; text-align:center;">
          <button class="reset-button" @click="${_resetMushroomEntitiesConfig}">🧹 Reset Mushroom Entities</button>
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