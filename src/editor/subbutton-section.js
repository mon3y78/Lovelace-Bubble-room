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
 import { renderAutoDiscoveryToggle, renderResetButton, renderTapHoldAction } from './ui-helpers.js';
 
 const SUBBUTTON_KEYS = ['sub-button1', 'sub-button2', 'sub-button3', 'sub-button4'];
 const SUBBUTTON_LABELS = ['Sub-button 1', 'Sub-button 2', 'Sub-button 3', 'Sub-button 4'];
 
 export function renderSubbuttonSection({ hass, config, onConfigChange, expanded, onExpand }) {
   const subConf = config.entities || {};
 
   // Handlers
   const onEntityChange = (key, entity) => {
     const entities = { ...config.entities, [key]: { ...subConf[key], entity } };
     onConfigChange({ ...config, entities });
   };
   const onIconChange = (key, icon) => {
     const entities = { ...config.entities, [key]: { ...subConf[key], icon } };
     onConfigChange({ ...config, entities });
   };
   const onTapHoldChange = (key, type, field, value) => {
     const sb = subConf[key] || {};
     const actionConf = { ...(sb[`${type}_action`] || {}) };
     actionConf[field] = value;
     const entities = {
       ...config.entities,
       [key]: { ...sb, [`${type}_action`]: actionConf }
     };
     onConfigChange({ ...config, entities });
   };
   const onReset = () => {
     const entities = { ...config.entities };
     SUBBUTTON_KEYS.forEach(k => delete entities[k]);
     onConfigChange({ ...config, entities });
   };
   const onAutoDiscovery = (enabled) => {
     const auto = { ...(config.auto_discovery_sections || {}) };
     auto.subbutton = enabled;
     onConfigChange({ ...config, auto_discovery_sections: auto });
   };
 
   return html`
     <ha-expansion-panel
       class="glass-panel subbutton-panel"
       .expanded="${expanded}"
       @expanded-changed="${(e) => onExpand(e.detail.expanded)}"
     >
       <div slot="header" class="glass-header subbutton-header">🎛️ Subbuttons</div>
       <div class="glass-content subbutton-content">
         <!-- Auto-discovery toggle -->
         ${renderAutoDiscoveryToggle({
           checked: config.auto_discovery_sections?.subbutton ?? false,
           onToggle: onAutoDiscovery,
           accent: '#b28fff',
         })}
 
         <!-- Subbutton Pills -->
         <div style="display:flex; flex-direction:column; gap:18px;">
         ${SUBBUTTON_KEYS.map((key, i) => {
           const sb = subConf[key] || {};
           return html`
             <div class="mini-pill glass-pill expanded">
               <div class="mini-pill-header" style="color:#b28fff;">${SUBBUTTON_LABELS[i]}</div>
               <div class="mini-pill-content">
                 <div style="display:flex; flex-direction:column; gap:12px;">
                   <div class="input-group">
                     <label>Entity</label>
                     <ha-entity-picker
                       .hass="${hass}"
                       .value="${sb.entity || ''}"
                       allow-custom-entity
                       @value-changed="${e => onEntityChange(key, e.detail.value)}"
                       include-domains="light,switch,media_player,fan,cover,humidifier,lock,input_boolean,scene"
                     ></ha-entity-picker>
                   </div>
                   <div class="input-group">
                     <label>Icon</label>
                     <ha-icon-picker
                       .hass="${hass}"
                       .value="${sb.icon || ''}"
                       allow-custom-icon
                       @value-changed="${e => onIconChange(key, e.detail.value)}"
                     ></ha-icon-picker>
                   </div>
                   <div style="margin-top:6px;">
                     ${renderTapHoldAction({
                       tapAction: sb.tap_action,
                       holdAction: sb.hold_action,
                       onChange: (type, field, value) => onTapHoldChange(key, type, field, value),
                       accent: '#b28fff',
                     })}
                   </div>
                 </div>
               </div>
             </div>
           `;
         })}
         </div>
         <!-- Reset Button -->
         <div style="margin-top:1.2em; text-align:center;">
           ${renderResetButton({
             label: '🧹 Reset Sub-buttons',
             onClick: onReset,
           })}
         </div>
       </div>
     </ha-expansion-panel>
   `;
 }