// src/panels/SensorPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor }     from '../helpers/entity-filters.js';
import { SENSOR_TYPE_MAP }   from '../helpers/sensor-mapping.js';

export class SensorPanel extends LitElement {
  static properties = {
    hass:       { type: Object },
    config:     { type: Object },
    expanded:   { type: Boolean },
    _expanded:  { type: Array, state: true },
    _filters:   { type: Array, state: true },
    _entities:  { type: Array, state: true },
  };

  constructor() {
    super();
    this.hass      = {};
    this.config    = {};
    this.expanded  = false;
    this._expanded = Array(5).fill(false);

    const allTypes = Object.keys(SENSOR_TYPE_MAP).filter(k => !k.startsWith('_'));
    this._filters  = Array(5).fill().map(() => [...allTypes]);
    this._entities = Array(5).fill('');

    this._ignoreNextFilterChange = new Set();
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      const next = maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.sensor');
      if (next && next !== this.config) {
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: next }, bubbles: true, composed: true
        }));
      }

      for (let i = 0; i < 5; i++) {
        const key = `sensor${i + 1}`;
        const cfgFilter = this.config?.sensor_filters?.[i];
        const cfgEnt    = this.config?.entities?.[key]?.entity;
        if (Array.isArray(cfgFilter)) this._filters[i] = [...cfgFilter];
        if (cfgEnt)                   this._entities[i] = cfgEnt;
      }
    }
  }

  static styles = css`
    :host { display: block; }
    .glass-panel {
      background: var(--ha-card-background, rgba(255, 255, 255, 0.05));
      border-radius: 16px;
      margin: 4px 0;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .glass-header {
      padding: 12px;
      font-weight: 500;
      font-size: 1.05em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .mini-pill {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .mini-pill-header {
      padding: 10px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.95em;
    }
    .mini-pill.expanded .mini-pill-header {
      background: rgba(255, 255, 255, 0.05);
    }
    .mini-pill-content {
      padding: 10px 14px;
      display: grid;
      gap: 12px;
      font-size: 0.9em;
    }
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    label {
      font-size: 0.8em;
      opacity: 0.8;
    }
    .reset-button {
      margin: 10px auto 14px auto;
      display: block;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.06);
      border: none;
      border-radius: 8px;
      font-size: 0.85em;
      cursor: pointer;
    }
    .reset-button:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .chevron {
      opacity: 0.6;
      font-size: 0.8em;
    }
    .filter-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .clear-chip {
      font-size: 0.7em;
      padding: 2px 6px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 6px;
      cursor: pointer;
    }
    .clear-chip:hover {
      background: rgba(255,255,255,0.1);
    }
    .preview {
      margin-top: 6px;
      padding: 8px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .preview .emoji {
      font-size: 1.2em;
    }
    .preview .state {
      font-size: 0.9em;
      font-weight: 500;
    }
    .autodiscover {
      margin: 8px 14px;
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 0.9em;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
  `;

  render() {
    const autoDisc = this.config?.auto_discovery_sections?.sensor ?? false;

    const options = Object.entries(SENSOR_TYPE_MAP)
      .filter(([key]) => !key.startsWith('_'))
      .map(([type, info]) => {
        const niceLabel = info.label ||
          type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        return { value: type, label: `${info.emoji || ''} ${niceLabel}`.trim() };
      });

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => {
          this.expanded = e.detail.expanded;
          if (this.expanded) this._expanded = Array(5).fill(false);
        }}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto-discover Sensors</label>
        </div>

        ${this._expanded.map((open, i) => this._renderSensor(i, open, options))}

        <button class="reset-button" @click=${() => this._reset()}>
          🧹 Reset Sensors
        </button>
      </ha-expansion-panel>
    `;
  }

  _renderSensor(i, open, options) {
    const types = this._filters[i];
    const ent   = this._entities[i];
    const adOn = this.config?.auto_discovery_sections?.sensor ?? false;
    let cands;

    if (adOn) {
      cands = candidatesFor(this.hass, this.config, 'sensor', types) || [];
    } else {
      const states = this.hass?.states || {};
      const allIds = Object.keys(states);
      const hasTypes = Array.isArray(types) && types.length > 0;
      const typeSet  = hasTypes ? new Set(types) : null;
      cands = allIds.filter((id) => {
        const domain = id.split('.')[0];
        if (domain !== 'sensor' && domain !== 'binary_sensor') return false;
        if (!hasTypes) return true;

        const dc = states[id]?.attributes?.device_class;
        if (dc && typeSet.has(dc)) return true;

        // PATCH: fallback per sensori senza device_class
        if (!dc) {
          const name = String(id).split('.').slice(1).join('.');
          const inferred = this._inferTypeFromName(name);
          if (inferred && typeSet.has(inferred)) return true;
        }
        return false;
      });
    }

    if (ent && !cands.includes(ent)) cands = [ent, ...cands];

    return html`
      <div class="mini-pill ${open ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${() => this._togglePill(i)}>
          Sensor ${i+1}
          <span class="chevron">${open ? '▼' : '▶'}</span>
        </div>
        ${open ? html`
          <div class="mini-pill-content">
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${i}">Filter category:</label>
                <button
                  class="clear-chip"
                  type="button"
                  @click=${() => this._clearFilter(i)}
                  title="Clear filter category">
                  Clear
                </button>
              </div>
              <ha-selector
                id="filter-${i}"
                .hass=${this.hass}
                .value=${types}
                .selector=${{ select: { multiple: true, mode: 'box', options } }}
                @value-changed=${e => this._onFilter(i, e.detail.value)}
              ></ha-selector>
            </div>

            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${ent}
                .selector=${{ entity: { include_entities: cands, multiple: false } }}
                allow-custom-entity
                @value-changed=${e => this._onEntity(i, e.detail.value)}
              ></ha-selector>
            </div>

            ${ent ? (() => {
              const stateObj = this.hass.states[ent];
              const dc       = stateObj?.attributes?.device_class;

              let typeKey = dc || '';
              if (!typeKey) {
                const name = String(ent).split('.').slice(1).join('.');
                typeKey = this._inferTypeFromName(name) || '';
              }

              const info  = typeKey ? (SENSOR_TYPE_MAP[typeKey] || {}) : {};
              const emoji = info.emoji || '❓';
              const unit  = stateObj?.attributes?.unit_of_measurement
                            || info.unit
                            || (Array.isArray(info.units) ? info.units[0] : '')
                            || '';

              const val   = stateObj?.state ?? '-';
              return html`
                <div class="preview">
                  <span class="emoji">${emoji}</span>
                  <div class="state">${val} ${unit}</div>
                </div>
              `;
            })() : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  _inferTypeFromName(name) {
    const list = SENSOR_TYPE_MAP?._nameFallbacks;
    if (!Array.isArray(list) || !name) return null;
    const low = String(name).toLowerCase();
    const hit = list.find(f => low.includes(f.pattern));
    return hit ? hit.type : null;
  }

  _toggleAuto(on) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'auto_discovery_sections.sensor', val: on },
      bubbles: true, composed: true,
    }));
  }

  _togglePill(i) {
    this._expanded = this._expanded.map((v, idx) => idx === i ? !v : false);
    this.requestUpdate();
  }

  _onFilter(i, values) {
    const all = Object.keys(SENSOR_TYPE_MAP).filter(k => !k.startsWith('_'));
    if (this._ignoreNextFilterChange.has(i)) {
      this._ignoreNextFilterChange.delete(i);
      this._filters[i] = [];
    } else {
      const arr = Array.isArray(values) && values.length ? values.filter(Boolean) : all;
      this._filters[i] = [...arr];
    }
    this.requestUpdate('_filters');
    const sel = this.renderRoot?.querySelector(`#filter-${i}`);
    if (sel) sel.value = [...this._filters[i]];
  }

  _clearFilter(i) {
    this._filters[i] = [];
    this.requestUpdate('_filters');
    const sel = this.renderRoot?.querySelector(`#filter-${i}`);
    if (sel) {
      this._ignoreNextFilterChange.add(i);
      sel.value = [];
      sel.dispatchEvent(new CustomEvent('value-changed', {
        detail: { value: [] }, bubbles: true, composed: true
      }));
    }
  }

  _onEntity(i, ent) {
    this._entities[i] = ent;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: `entities.sensor${i+1}.entity`, val: ent },
      bubbles: true, composed: true,
    }));
  }

  _reset() {
    this._expanded = Array(5).fill(false);
    const allTypes = Object.keys(SENSOR_TYPE_MAP).filter(k => !k.startsWith('_'));
    this._filters  = Array(5).fill().map(() => [...allTypes]);
    this._entities = Array(5).fill('');
    for (let i = 1; i <= 5; i++) {
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: `entities.sensor${i}.entity`, val: '' },
        bubbles: true, composed: true,
      }));
    }
  }
}

customElements.define('sensor-panel', SensorPanel);