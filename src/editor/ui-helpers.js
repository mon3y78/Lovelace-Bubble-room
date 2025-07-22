/**
 * src/editor/ui-helpers.js – Helper UI Bubble Room Card
 *
 * Bubble Room Custom Card – UI Helpers
 * ------------------------------------
 * Funzioni centralizzate per elementi ricorrenti dell’editor Bubble Room:
 *  - Pulsanti Tap/Hold Action (pill e select)
 *  - Box di Auto-discovery
 *  - Pulsante Reset sezioni
 *
 * Questi helper assicurano coerenza visuale, riutilizzo e facilità di manutenzione tra tutte le sezioni modulari (Room, Mushroom, Camera, Sensor, ecc).
 *
 * Repository ufficiale: https://github.com/mon3y78/Lovelace-Bubble-room
 * Autore: mon3y78 (https://github.com/mon3y78)
 * Ultima modifica: 22 luglio 2025
 */

import { html } from 'https://unpkg.com/lit@2.6.1/index.js?module';

/**
 * Renderizza i controlli Tap/Hold Action per qualsiasi entità/modulo.
 * @param {Object} opts - { actionType, configObj, patchFn }
 */
export function renderTapHoldAction({ actionType = "tap", configObj, patchFn }) {
  const actConfig = configObj?.[`${actionType}_action`] || {};
  const actions = [
    { value: "toggle", label: "🟢 Toggle" },
    { value: "more-info", label: "🔎 More Info" },
    { value: "navigate", label: "↗️ Navigate" },
    { value: "call-service", label: "⚙️ Call Service" },
    { value: "none", label: "🚫 None" }
  ];
  const updateField = (field, value) => patchFn([`${actionType}_action`, field], value);

  return html`
    <div class="input-group">
      <label style="min-width:50px;">${actionType === "tap" ? "Tap" : "Hold"}:</label>
      <select style="margin-right:16px;" .value="${actConfig.action || 'none'}"
        @change="${e => updateField('action', e.target.value)}">
        ${actions.map(a => html`<option value="${a.value}">${a.label}</option>`)}
      </select>
      ${actConfig.action === 'navigate' ? html`
        <label style="margin-left:12px;">Path:</label>
        <input type="text" .value="${actConfig.navigation_path || ''}" style="width:130px;"
          @input="${e => updateField('navigation_path', e.target.value)}" />
      ` : ''}
      ${actConfig.action === 'call-service' ? html`
        <label style="margin-left:12px;">Service:</label>
        <input type="text" .value="${actConfig.service || ''}" style="width:130px;"
          @input="${e => updateField('service', e.target.value)}" />
        <label style="margin-left:12px;">Data (JSON):</label>
        <input type="text" .value="${actConfig.service_data ? JSON.stringify(actConfig.service_data) : ''}" style="width:120px;"
          @input="${e => {
            let val = e.target.value;
            try { val = JSON.parse(val); updateField('service_data', val); } catch {}
          }}" />
      ` : ''}
    </div>
  `;
}

/**
 * Renderizza il box autodiscovery riutilizzabile in tutte le sezioni.
 * @param {Object} opts - { checked, onToggle }
 */
export function renderAutoDiscoveryBox({ checked, onToggle }) {
  return html`
    <div class="autodiscover-box" @click="${() => onToggle(!checked)}">
      <label>
        <input
          type="checkbox"
          .checked="${checked}"
          @change="${e => onToggle(e.target.checked)}"
          @click="${e => e.stopPropagation()}"
        />
        <span>🪄 Auto-discovery</span>
      </label>
    </div>
  `;
}

/**
 * Renderizza un pulsante reset con label e callback personalizzati.
 * @param {Object} opts - { label, onClick }
 */
export function renderResetButton({ label = "Reset", onClick }) {
  return html`
    <div style="margin-top:1.2em; text-align:center;">
      <button class="reset-button" @click="${onClick}">🧹 ${label}</button>
    </div>
  `;
}
