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
 import {
   renderTapHoldAction,
   renderAutoDiscoveryToggle,
   renderResetButton,
 } from './ui-helpers.js';
 
 export function renderMushroomSection({ hass, config, onConfigChange, expanded, onExpand }) {
   // Assicurati che lo stato sia sempre lungo 7
   if (!config._expandedMushroom || config._expandedMushroom.length !== 7) {
     config._expandedMushroom = [false, false, false, false, false, false, false];
   }
 
   const entityKeys = Array.from({ length: 7 }, (_, i) => ({
     key: `mushroom${i + 1}`,
     label: `Entity ${i + 1}`,
   }));
 
   const toggleExpand = (idx) => {
     config._expandedMushroom = config._expandedMushroom.map((v, i) => (i === idx ? !v : false));
     onConfigChange({ ...config });
   };
 
   // Per reset
   const onReset = () => {
     const entities = { ...config.entities };
     entityKeys.forEach(({ key }) => delete entities[key]);
     onConfigChange({ ...config, entities });
   };
 
   // Per autodiscovery
   const onAutoDiscovery = (enabled) => {
     const auto = { ...(config.auto_discovery_sections || {}) };
     auto.mushroom = enabled;
     onConfigChange({ ...config, auto_discovery_sections: auto });
   };
 
   return html`
     <ha-expansion-panel
       class="glass-panel mushroom-panel"
       .expanded="${expanded}"
       @expanded-changed="${(e) => onExpand(e.detail.expanded)}"
     >
       <div slot="header" class="glass-header mushroom-header">🍄 Mushroom Entities</div>
       <div class="glass-content mushroom-content">
         <!-- Auto-discovery toggle -->
         ${renderAutoDiscoveryToggle({
           checked: config.auto_discovery_sections?.mushroom ?? false,
           onToggle: onAutoDiscovery,
           accent: '#36e6a0',
         })}
 
         <!-- Entità Mushroom (pill expandable) -->
         <div style="display:flex; flex-direction:column; gap:10px;">
           ${entityKeys.map((entity, i) => {
             const entConf = config.entities?.[entity.key] || {};
             const expandedPill = config._expandedMushroom[i];
             return html`
               <div class="mini-pill glass-pill ${expandedPill ? 'expanded' : ''}">
                 <div
                   class="mini-pill-header"
                   style="--section-accent:#36e6a0"
                   @click="${() => toggleExpand(i)}"
                 >
                   ${entity.label}
                   <span class="chevron">${expandedPill ? '▼' : '▶'}</span>
                 </div>
                 ${expandedPill
                   ? html`
                       <div class="mini-pill-content">
                         <div style="display:flex; flex-direction:column; gap:8px;">
                           <div class="input-group">
                             <label>Entity</label>
                             <ha-entity-picker
                               .hass="${hass}"
                               .value="${entConf.entity || ''}"
                               @value-changed="${(e) => {
                                 const entities = { ...config.entities, [entity.key]: { ...entConf, entity: e.detail.value } };
                                 onConfigChange({ ...config, entities });
                               }}"
                               allow-custom-entity
                             ></ha-entity-picker>
                           </div>
                           <div class="input-group">
                             <label>Icon</label>
                             <ha-icon-picker
                               .hass="${hass}"
                               .value="${entConf.icon || ''}"
                               allow-custom-icon
                               @value-changed="${(e) => {
                                 const entities = { ...config.entities, [entity.key]: { ...entConf, icon: e.detail.value } };
                                 onConfigChange({ ...config, entities });
                               }}"
                             ></ha-icon-picker>
                           </div>
                         </div>
                         <div style="margin-top:7px;">
                           ${renderTapHoldAction({
                             config: entConf,
                             onChange: (actionType, field, value) => {
                               const actions = { ...entConf[`${actionType}_action`] || {}, [field]: value };
                               const entities = {
                                 ...config.entities,
                                 [entity.key]: {
                                   ...entConf,
                                   [`${actionType}_action`]: actions,
                                 },
                               };
                               onConfigChange({ ...config, entities });
                             },
                           })}
                         </div>
                       </div>
                     `
                   : ''}
               </div>
             `;
           })}
         </div>
         <!-- Reset Button -->
         <div style="margin-top:1.2em; text-align:center;">
           ${renderResetButton({
             label: '🧹 Reset Mushroom Entities',
             onClick: onReset,
           })}
         </div>
       </div>
     </ha-expansion-panel>
   `;
 }