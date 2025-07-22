/**
 * sensor-section.js – Sensor Section Editor
 *
 * Bubble Room Custom Card – Editor Section
 * ----------------------------------------
 * Gestisce la configurazione dei sensori stanza (fino a 6): tipo, unità,
 * entità, reset.
 *
 * Da importare nell’editor principale.
 * Usa helpers e mappature centralizzate per i tipi di sensore.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: [DATA]
 */
 /**
 * sensor-panel.js – Modulo Sensor Section Bubble Room Card
 *
 * Bubble Room Custom Card – Editor Section: Sensors
 * -------------------------------------------------
 * Gestisce la sezione "Sensors" dell’editor Bubble Room: fino a 6 sensori configurabili (tipo, entità, unità).
 * Permette la selezione tipo sensore, entità e unità. Tutto lo stato e le funzioni vengono passate dal main editor via ctx.
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: 2025-07-21
 */


 import { html } from 'lit';
 import {
   SENSOR_TYPE_MAP,
   renderAutoDiscoveryToggle,
   renderResetButton,
 } from './ui-helpers.js';
 
 export function renderSensorSection({ hass, config, onConfigChange, expanded, onExpand }) {
   // Stato espansione pill (6 sensori)
   if (!config._expandedSensors || config._expandedSensors.length !== 6) {
     config._expandedSensors = [false, false, false, false, false, false];
   }
 
   const sensorKeys = Array.from({ length: 6 }, (_, i) => ({
     key: `sensor${i + 1}`,
     label: `Sensor ${i + 1}`,
   }));
 
   const toggleExpand = (idx) => {
     config._expandedSensors = config._expandedSensors.map((v, i) => (i === idx ? !v : false));
     onConfigChange({ ...config });
   };
 
   // Reset
   const onReset = () => {
     const entities = { ...config.entities };
     sensorKeys.forEach(({ key }) => delete entities[key]);
     onConfigChange({ ...config, entities });
   };
 
   // Auto-discovery
   const onAutoDiscovery = (enabled) => {
     const auto = { ...(config.auto_discovery_sections || {}) };
     auto.sensor = enabled;
     onConfigChange({ ...config, auto_discovery_sections: auto });
   };
 
   return html`
     <ha-expansion-panel
       class="glass-panel sensor-panel"
       .expanded="${expanded}"
       @expanded-changed="${(e) => onExpand(e.detail.expanded)}"
     >
       <div slot="header" class="glass-header sensor-header">🧭 Sensors</div>
       <div class="glass-content sensor-content">
         <!-- Auto-discovery toggle -->
         ${renderAutoDiscoveryToggle({
           checked: config.auto_discovery_sections?.sensor ?? false,
           onToggle: onAutoDiscovery,
           accent: '#8cff8a',
         })}
 
         <!-- Sensori (pill expandable) -->
         <div style="display:flex; flex-direction:column; gap:10px;">
           ${sensorKeys.map((sensor, i) => {
             const sensConf = config.entities?.[sensor.key] || {};
             const expandedPill = config._expandedSensors[i];
             const units = SENSOR_TYPE_MAP[sensConf.type]?.units || [];
             return html`
               <div class="mini-pill glass-pill ${expandedPill ? 'expanded' : ''}">
                 <div
                   class="mini-pill-header"
                   style="--section-accent:#8cff8a"
                   @click="${() => toggleExpand(i)}"
                 >
                   ${SENSOR_TYPE_MAP[sensConf.type]?.emoji || ''} ${sensor.label}
                   <span class="chevron">${expandedPill ? '▼' : '▶'}</span>
                 </div>
                 ${expandedPill
                   ? html`
                       <div class="mini-pill-content">
                         <div style="display:flex; flex-direction:column; gap:8px;">
                           <div class="input-group">
                             <label>Type</label>
                             <select
                               style="width:100%;"
                               .value="${sensConf.type || ''}"
                               @change="${(e) => {
                                 // Cambia tipo, aggiorna unità default
                                 const newType = e.target.value;
                                 const newUnit = SENSOR_TYPE_MAP[newType]?.units?.[0] || '';
                                 const entities = {
                                   ...config.entities,
                                   [sensor.key]: { ...sensConf, type: newType, unit: newUnit },
                                 };
                                 onConfigChange({ ...config, entities });
                               }}"
                             >
                               <option value="">-- none --</option>
                               ${Object.entries(SENSOR_TYPE_MAP).map(
                                 ([type, { emoji, label }]) =>
                                   html`<option value="${type}">${emoji} ${label}</option>`
                               )}
                             </select>
                           </div>
                           <div class="input-group">
                             <label>Entity</label>
                             <ha-entity-picker
                               .hass="${hass}"
                               .value="${sensConf.entity || ''}"
                               @value-changed="${(e) => {
                                 const entities = { ...config.entities, [sensor.key]: { ...sensConf, entity: e.detail.value } };
                                 onConfigChange({ ...config, entities });
                               }}"
                               allow-custom-entity
                             ></ha-entity-picker>
                           </div>
                           <div class="input-group">
                             <label>Unit</label>
                             <select
                               style="width:100%;"
                               .value="${sensConf.unit || (units[0] || '')}"
                               @change="${(e) => {
                                 const entities = { ...config.entities, [sensor.key]: { ...sensConf, unit: e.target.value } };
                                 onConfigChange({ ...config, entities });
                               }}"
                             >
                               ${units.map(
                                 (u) => html`<option value="${u}">${u}</option>`
                               )}
                             </select>
                           </div>
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
             label: '🧹 Reset Sensors',
             onClick: onReset,
           })}
         </div>
       </div>
     </ha-expansion-panel>
   `;
 }