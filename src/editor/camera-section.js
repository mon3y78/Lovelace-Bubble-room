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
 import { renderAutoDiscoveryToggle, renderResetButton } from './ui-helpers.js';
 
 export function renderCameraSection({ hass, config, onConfigChange, expanded, onExpand }) {
   // Stato pill unica, sempre expanded (o puoi renderlo dinamico)
   const cameraConf = config.entities?.camera || {};
 
   // Handlers
   const onEntityChange = (entity) => {
     const entities = { ...config.entities, camera: { ...cameraConf, entity } };
     onConfigChange({ ...config, entities });
   };
   const onIconChange = (icon) => {
     const entities = { ...config.entities, camera: { ...cameraConf, icon } };
     onConfigChange({ ...config, entities });
   };
   const onReset = () => {
     const entities = { ...config.entities };
     delete entities.camera;
     onConfigChange({ ...config, entities });
   };
   const onAutoDiscovery = (enabled) => {
     const auto = { ...(config.auto_discovery_sections || {}) };
     auto.camera = enabled;
     onConfigChange({ ...config, auto_discovery_sections: auto });
   };
 
   return html`
     <ha-expansion-panel
       class="glass-panel camera-panel"
       .expanded="${expanded}"
       @expanded-changed="${(e) => onExpand(e.detail.expanded)}"
     >
       <div slot="header" class="glass-header camera-header">📷 Camera</div>
       <div class="glass-content camera-content">
         <!-- Auto-discovery toggle -->
         ${renderAutoDiscoveryToggle({
           checked: config.auto_discovery_sections?.camera ?? false,
           onToggle: onAutoDiscovery,
           accent: '#50d2ff',
         })}
 
         <!-- Pill unica camera -->
         <div class="mini-pill glass-pill expanded" style="margin-bottom:18px;">
           <div class="mini-pill-header" style="color:#50d2ff">Camera</div>
           <div class="mini-pill-content">
             <div style="display:flex; flex-direction:column; gap:14px;">
               <div class="input-group">
                 <label>Entity</label>
                 <ha-entity-picker
                   .hass="${hass}"
                   .value="${cameraConf.entity || ''}"
                   allow-custom-entity
                   @value-changed="${(e) => onEntityChange(e.detail.value)}"
                   include-domains="camera"
                 ></ha-entity-picker>
               </div>
               <div class="input-group">
                 <label>Icon</label>
                 <ha-icon-picker
                   .hass="${hass}"
                   .value="${cameraConf.icon || ''}"
                   allow-custom-icon
                   @value-changed="${(e) => onIconChange(e.detail.value)}"
                 ></ha-icon-picker>
               </div>
             </div>
           </div>
         </div>
 
         <!-- Reset Button -->
         <div style="margin-top:1.2em; text-align:center;">
           ${renderResetButton({
             label: '🧹 Reset Camera',
             onClick: onReset,
           })}
         </div>
       </div>
     </ha-expansion-panel>
   `;
 }