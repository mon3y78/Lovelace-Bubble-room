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

/**
 * Render della sezione Sensors dell’editor Bubble Room.
 * @param {Object} ctx - Context principale del BubbleRoomEditor (this)
 * @returns {TemplateResult}
 */
export function renderSensorPanel(ctx) {
  const {
    _config,
    _expandedPanel,
    _expandedSensors,
    _onPanelExpanded,
    _toggleAutoDiscoverySection,
    _renderEntityInput,
    _updateSensor,
    SENSOR_TYPE_MAP,
    _resetSensorConfig,
    _toggleSensorExpand
  } = ctx;

  // Difensivo: sempre length 6 per 6 sensori
  const expandedArr = Array.isArray(_expandedSensors) && _expandedSensors.length === 6
    ? _expandedSensors
    : [false, false, false, false, false, false];
  const sensorKeys = ['sensor1', 'sensor2', 'sensor3', 'sensor4', 'sensor5', 'sensor6'];

  return html`
    <ha-expansion-panel
      class="glass-panel sensor-panel"
      .expanded="${_expandedPanel === 'sensor'}"
      @expanded-changed="${e => _onPanelExpanded('sensor', e)}" >
      <div slot="header" class="glass-header sensor-header">🧭 Sensors</div>
      <div class="glass-content sensor-content">
        <!-- Auto-discovery -->
        <div class="autodiscover-box" @click="${() => {
            const curr = _config.auto_discovery_sections?.sensor ?? false;
            _toggleAutoDiscoverySection('sensor', !curr);
          }}">
          <label>
            <input
              type="checkbox"
              .checked="${_config.auto_discovery_sections?.sensor ?? false}"
              @change="${e => _toggleAutoDiscoverySection('sensor', e.target.checked)}"
              @click="${e => e.stopPropagation()}"
            />
            <span>🪄 Auto-discovery enabled</span>
          </label>
        </div>

        <!-- 6 sensori, ognuno espandibile -->
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${sensorKeys.map((key, i) => renderSingleSensorPill(ctx, key, `SENSOR ${i+1}`, i, expandedArr[i]))}
        </div>

        <!-- Reset -->
        <div style="margin-top:1.2em; text-align:center;">
          <button class="reset-button" @click="${_resetSensorConfig}">🧹 Reset Sensors</button>
        </div>
      </div>
    </ha-expansion-panel>
  `;
}

/**
 * Pillola sensore espandibile (singolo sensore)
 */
function renderSingleSensorPill(ctx, key, label, index, expanded) {
  const { _config, _renderEntityInput, _updateSensor, SENSOR_TYPE_MAP, _toggleSensorExpand } = ctx;
  const sensor = _config.entities?.[key] || {};
  const accent = "#8cff8a";
  return renderExpandablePill({
    label,
    expanded,
    accent,
    onToggle: () => _toggleSensorExpand(index),
    content: html`
      <div style="display:flex; flex-direction:column; gap:5px;">
        <div class="input-group" style="flex:2; margin-bottom:0;">
          <label>Sensor Type</label>
          <select
            style="width:100%;"
            .value="${sensor.type || ''}"
            @change="${e => _updateSensor(index, 'type', e.target.value)}"
          >
            <option value="">-- none --</option>
            ${Object.entries(SENSOR_TYPE_MAP).map(
              ([type, { emoji, label }]) =>
                html`<option value="${type}">${emoji} ${label}</option>`
            )}
          </select>
        </div>
        <div class="input-group" style="flex:2; margin-bottom:0;">
          ${_renderEntityInput("Sensor (ID)", key, "entity", "sensor")}
        </div>
        <div style="display:flex; flex-direction:column; gap:5px;">
          <label>Unit</label>
          <select
            style="width:100%;"
            .value="${sensor.unit || (SENSOR_TYPE_MAP[sensor.type]?.units[0] || '')}"
            @change="${e => _updateSensor(index, 'unit', e.target.value)}"
          >
            ${(SENSOR_TYPE_MAP[sensor.type]?.units || []).map(u =>
              html`<option value="${u}">${u}</option>`
            )}
          </select>
        </div>
      </div>
    `
  });
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