import { LitElement, html, css } from 'lit';

const DEBUG = !!window.__BUBBLE_DEBUG__;
import { FILTERS, candidatesFor } from '../helpers/entity-filters.js';

import { SENSOR_TYPES } from '../helpers/sensor-mapping.js';

const SENSOR_TYPE_MAP = SENSOR_TYPES.reduce((map, { type, label, emoji, unit }) => {
  map[type] = { label, emoji, units: [unit] };
  return map;
}, {});

export class SensorsPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedSensors: { type: Array },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this._expanded = false;
    this._expandedSensors = Array(6).fill(false);
  }

  static styles = css`
    /* inserisci qui i CSS di .glass-panel, .glass-header, .mini-pill, .input-group ecc */
  `;

  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded="${this._expanded}"
        @expanded-changed="${e => this._expanded = e.detail.expanded}"
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>
        <div class="glass-content">
          <div class="autodiscover-box" @click="${() => this._toggleAuto('sensor')}">
            <label>
              <input type="checkbox"
                     .checked="${this.config.auto_discovery_sections?.sensor || false}"
                     @change="${e => this._toggleAuto('sensor', e.target.checked)}"
                     @click="${e => e.stopPropagation()}">
              <span>🪄 Auto‑discovery enabled</span>
            </label>
          </div>
          ${['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6'].map((key, i) => this._renderSingle(i, key))}
          <div style="text-align:center; margin-top:1.2em;">
            <button class="reset-button" @click="${this._resetAll}">🧹 Reset Sensors</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderSingle(index, key) {
    const sensor = this.config.entities?.[key] || {};
    const expanded = this._expandedSensors[index];
    return html`
      <div class="mini-pill ${expanded ? 'expanded' : ''}" @click="${() => this._toggleOne(index)}">
        <div class="mini-pill-header">
          ${SENSOR_TYPE_MAP[sensor.type]?.emoji || '❔'} ${sensor.type || `Sensor ${index+1}`}
          <span class="chevron">${expanded ? '▼' : '▶'}</span>
        </div>
        ${expanded ? html`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Sensor Type</label>
              <select .value="${sensor.type || ''}"
                      @change="${e => this._update(index, 'type', e.target.value)}">
                <option value="">-- none --</option>
                ${Object.entries(SENSOR_TYPE_MAP).map(([type, { emoji, label }]) => html`
                  <option value="${type}">${emoji} ${label}</option>
                `)}
              </select>
            </div>
            <div class="input-group">
              <label>Entity ID</label>
              <ha-entity-picker
  .hass="${this.hass}"
  .includeEntities=${candidatesFor(this.hass, this.config, { section: 'sensor', type: s.type })}
  .value="${s.entity_id || ''}"
  allow-custom-entity
  @value-changed="${e => this._fire(`sensors[${i}].entity_id`, e.detail.value)}"
></ha-entity-picker>
            </div>
            <div class="input-group">
              <label>Unit</label>
              <select .value="${sensor.unit || (SENSOR_TYPE_MAP[sensor.type]?.units[0] || '')}"
                      @change="${e => this._update(index, 'unit', e.target.value)}">
                ${(SENSOR_TYPE_MAP[sensor.type]?.units || []).map(u => html`<option>${u}</option>`)}
              </select>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  _toggleAuto(section, val) {
    this._fire(`auto_discovery_sections.${section}`, !this.config.auto_discovery_sections?.[section]);
  }
  _toggleOne(i) {
    this._expandedSensors = this._expandedSensors.map((_, j) => j === i);
  }
  _update(i, field, value) {
    this._fire(`entities.sensor${i+1}.${field}`, value);
  }
  _resetAll() {
    ['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6'].forEach(k =>
      this._fire(`entities.${k}`, undefined)
    );
  }
  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true
    }));
  }
}


      _getSensorCandidates(type) {
        const hass = this.hass;
        if (!hass || !hass.states) return [];
        const allIds = Object.keys(hass.states || {});
        let res = allIds.filter((id) => id.startsWith('sensor.'));
        try {
          if (type && typeof type === 'string') {
            const t = type.toLowerCase();
            res = res.filter((id) => {
              const st = hass.states[id];
              const dc = st?.attributes?.device_class || '';
              const u  = st?.attributes?.unit_of_measurement || '';
              if (t === 'temperature') return (dc === 'temperature') || (['°C','°F','K'].includes(u));
              if (t === 'humidity') return (dc === 'humidity') || (u === '%') || (/hum/i.test(st?.attributes?.friendly_name || ''));
              if (t === 'pressure') return (dc === 'pressure') || (/hPa|mbar|bar|psi/i.test(u));
              return true;
            });
          }
        } catch (e) {}
        const area = this.config?.area;
        if (area) {
          const inArea = res.filter((id) => {
            const st = hass.states[id];
            const a1 = st?.attributes?.area_id;
            const a2 = st?.attributes?.area;
            return a1 === area || a2 === area;
          });
          if (inArea.length) res = inArea;
        }
        if (DEBUG) {
          console.info('[SensorsPanel][Candidates]', { type, area, count: res.length, sample: res.slice(0,8) });
        }
        return res;
      }

customElements.define('sensors-panel', SensorsPanel);