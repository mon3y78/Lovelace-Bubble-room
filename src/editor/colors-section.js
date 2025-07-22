/**
 * colors-section.js – Colors Section Editor
 *
 * Bubble Room Custom Card – Editor Section
 * ----------------------------------------
 * Gestisce la configurazione dei colori (RGBA, picker, reset) per Room e Subbutton.
 *
 * Da importare nell’editor principale.
 * Usa helpers e utility per parsing e conversioni colori.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: [DATA]
 */
 
 /**
 * colors-panel.js – Modulo Colors Section Bubble Room Card
 *
 * Bubble Room Custom Card – Editor Section: Colors
 * ------------------------------------------------
 * Gestisce la sezione "Colors" dell’editor Bubble Room.
 * Permette la modifica dei colori delle sezioni Room e Subbutton, con supporto RGBA e reset.
 * Utilizza i controlli grafici personalizzati per colore, trasparenza e input diretto RGBA.
 * Tutte le funzioni e lo stato vengono gestite dal contesto ctx del main editor.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: 2025-07-21
 */

import { html } from 'lit';

/**
 * Render della sezione Colors dell’editor Bubble Room.
 * @param {Object} ctx - Context principale del BubbleRoomEditor (this)
 * @returns {TemplateResult}
 */
export function renderColorPanel(ctx) {
 const {
  _expandedPanel,
  _onPanelExpanded,
  _expandedColors,
  _toggleColorExpand,
  _renderExpandablePill,
  _renderColorField,
  _resetColorsConfig,
 } = ctx;
 
 // Larghezza massima per ogni box colore
 const colorBoxStyle = "flex:1 1 0; max-width: 250px; min-width: 0;";
 
 return html`
    <ha-expansion-panel
      class="glass-panel colors-panel"
      .expanded="${_expandedPanel === 'colors'}"
      @expanded-changed="${e => _onPanelExpanded('colors', e)}" >
      <div slot="header" class="glass-header colors-header">🎨 Colors</div>
      <div class="glass-content colors-content">
        <!-- Pillola: Room -->
        ${_renderExpandablePill({
          label: "Room",
          expanded: _expandedColors[0],
          accent: "#55afff",
          onToggle: () => _toggleColorExpand(0),
          content: html`
            <div class="input-group color-row">
              <div style="display: flex; gap:12px; margin-bottom:4px;">
                <div style="flex:1;"><span style="font-weight:700; color:#55afff;">Background Active</span></div>
                <div style="flex:1;"><span style="font-weight:700; color:#55afff;">Background Inactive</span></div>
              </div>
              <div style="display: flex; gap:12px;">
                <div style="${colorBoxStyle}">
                  ${_renderColorField('room', 'background_active')}
                </div>
                <div style="${colorBoxStyle}">
                  ${_renderColorField('room', 'background_inactive')}
                </div>
              </div>
            </div>
            <div class="input-group color-row">
              <div style="display: flex; gap:12px; margin-bottom:4px;">
                <div style="flex:1;"><span style="font-weight:700; color:#55afff;">Icon Active</span></div>
                <div style="flex:1;"><span style="font-weight:700; color:#55afff;">Icon Inactive</span></div>
              </div>
              <div style="display: flex; gap:12px;">
                <div style="${colorBoxStyle}">
                  ${_renderColorField('room', 'icon_active')}
                </div>
                <div style="${colorBoxStyle}">
                  ${_renderColorField('room', 'icon_inactive')}
                </div>
              </div>
            </div>
          `
        })}
        <!-- Pillola: Subbutton -->
        ${_renderExpandablePill({
          label: "Subbutton",
          expanded: _expandedColors[1],
          accent: "#b28fff",
          onToggle: () => _toggleColorExpand(1),
          content: html`
            <div class="input-group color-row">
              <div style="display: flex; gap:12px; margin-bottom:4px;">
                <div style="flex:1;"><span style="font-weight:700; color:#b28fff;">Background Active</span></div>
                <div style="flex:1;"><span style="font-weight:700; color:#b28fff;">Background Inactive</span></div>
              </div>
              <div style="display: flex; gap:12px;">
                <div style="${colorBoxStyle}">
                  ${_renderColorField('subbutton', 'background_on')}
                </div>
                <div style="${colorBoxStyle}">
                  ${_renderColorField('subbutton', 'background_off')}
                </div>
              </div>
            </div>
            <div class="input-group color-row">
              <div style="display: flex; gap:12px; margin-bottom:4px;">
                <div style="flex:1;"><span style="font-weight:700; color:#b28fff;">Icon On</span></div>
                <div style="flex:1;"><span style="font-weight:700; color:#b28fff;">Icon Off</span></div>
              </div>
              <div style="display: flex; gap:12px;">
                <div style="${colorBoxStyle}">
                  ${_renderColorField('subbutton', 'icon_on')}
                </div>
                <div style="${colorBoxStyle}">
                  ${_renderColorField('subbutton', 'icon_off')}
                </div>
              </div>
            </div>
          `
        })}
        <!-- Reset -->
        <div style="margin-top:1.5em; text-align:center;">
          <button class="reset-button" @click="${_resetColorsConfig}">🧹 Reset Colors</button>
        </div>
      </div>
    </ha-expansion-panel>
  `;
}