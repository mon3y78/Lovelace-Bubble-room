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

    const allTypes = Object.keys(SENSOR_TYPE_MAP);
    // Stato locale dei filtri: default = TUTTI i tipi (non scritto nel YAML)
    this._filters  = Array(5).fill().map(() => [...allTypes]);
    this._entities = Array(5).fill('');

    // Flag per distinguere i change generati dal tasto Clear
    this._ignoreNextFilterChange = new Set(); // indici -> ignora il prossimo value-changed
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      // Auto-discover: usa il valore di ritorno e propaga la nuova config
      const next = maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.sensor');
      if (next && next !== this.config) {
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: next }, bubbles: true, composed: true
        }));
      }
      // Se esiste in config, carica ma NON riscrivere mai sensor_filters nel YAML
      for (let i = 0; i < 5; i++) {
        const key = `sensor${i+1}`;
        const cfgFilter = this.config.sensor_filters?.[i];
        const cfgEnt    = this.config.entities?.[key]?.entity;
        if (Array.isArray(cfgFilter)) this._filters[i] = [...cfgFilter];
        if (cfgEnt)                   this._entities[i] = cfgEnt;
      }
    }
  }

  static styles = css`
    :host { display: block; }

    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(167,255,175,0.22));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13));
      overflow: hidden;
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg,rgba(255,255,255,0.11),
        rgba(255,255,255,0.07) 70%,transparent 100%));
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }

    .input-group.autodiscover {
      margin: 0 16px 13px;
      padding: 14px 18px 10px;
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 18px;
      display: flex; align-items: center; gap: 8px;
    }
    .input-group.autodiscover input { margin-right: 8px; }
    .input-group.autodiscover label {
      margin: 0; font-weight: 700; color: #fff;
    }

    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      backdrop-filter: blur(7px) saturate(1.2);
      border-radius: 24px;
      margin: 8px 16px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex; align-items: center;
      padding: 12px 16px;
      cursor: pointer; user-select: none;
      font-weight: 700; color: #8cff8a;
    }
    .mini-pill-header .chevron {
      margin-left: auto; transition: transform 0.2s;
    }
    .mini-pill.expanded .mini-pill-header .chevron {
      transform: rotate(90deg);
    }
    .mini-pill-content {
      padding: 12px 16px 16px;
      animation: pill-expand 0.2s ease-out both;
    }
    @keyframes pill-expand {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .input-group { margin-bottom: 12px; }
    .input-group label {
      display: block; font-weight: 600;
      margin-bottom: 6px; color: #8cff8a;
    }
    ha-selector { width: 100%; box-sizing: border-box; }
    ha-selector::part(combobox) { min-height: 40px; }

    .filter-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
    }
    .clear-chip {
      border: 2px solid var(--warning-color, #ff8a65);
      color: var(--warning-color, #ff8a65);
      background: transparent;
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 0.9rem;
      font-weight: 800;
      cursor: pointer;
      transition: background .15s, color .15s, box-shadow .15s, border-color .15s;
      box-shadow: 0 1px 10px rgba(255,138,101,0.25);
    }
    .clear-chip:hover {
      background: rgba(255,138,101,0.18);
      color: #fff;
      border-color: #ff8a65;
      box-shadow: 0 3px 16px rgba(255,138,101,0.45);
    }

    .preview {
      display: flex; align-items: center; gap: 12px;
      padding: 0 16px 16px;
    }
    .preview .emoji {
      font-size: 1.8rem;
      line-height: 1;
    }
    .preview .state {
      font-size: 1.2rem;
      color: #fff;
    }

    .reset-button {
      border: 3.5px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 24px;
      padding: 12px 38px;
      background: transparent;
      cursor: pointer;
      display: block;
      margin: 20px auto;
      font-size: 1.15rem;
      font-weight: 700;
      box-shadow: 0 2px 24px #ff4c6a44;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18);
      color: #fff;
      box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;

  render() {
    const autoDisc = this.config.auto_discovery_sections?.sensor ?? false;
    const options = Object.entries(SENSOR_TYPE_MAP)
      .filter(([type]) => type !== '_fallback')
      .map(([type, info]) => {
        const niceLabel = info.label ||
          type.replace(/_/g, ' ')
              .replace(/\b\w/g, c => c.toUpperCase());
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
    // AD ON ⇒ filtrato per area; AD OFF ⇒ nessun filtro area
    const adOn = this.config?.auto_discovery_sections?.sensor ?? false;
    let cands;
    if (adOn) {
      cands = candidatesFor(this.hass, this.config, 'sensor', types) || [];
    } else {
      // bypass area: prendi tutti i sensor/binary_sensor e, se presenti "types",
      // filtra per device_class (non per dominio!)
      const states = this.hass?.states || {};
      const allIds = Object.keys(states);
      const hasTypes = Array.isArray(types) && types.length > 0;
      const typeSet  = hasTypes ? new Set(types) : null;
      cands = allIds.filter((id) => {
        const domain = id.split('.')[0];
        if (domain !== 'sensor' && domain !== 'binary_sensor') return false;
        if (!hasTypes) return true;
        const dc = states[id]?.attributes?.device_class;
        return dc ? typeSet.has(dc) : false;
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
              const info     = SENSOR_TYPE_MAP[dc] || {};
              const emoji    = info.emoji || '❓';
              const unit     = stateObj?.attributes?.unit_of_measurement
                               || (info.units?.[0] ?? '');
              const val      = stateObj?.state ?? '-';
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

  // Se rimuovi manualmente tutti i chip => ricrea la lista completa.
  // Se arriva da "Clear" (flag attivo) => resta vuoto.
  _onFilter(i, values) {
    const all = Object.keys(SENSOR_TYPE_MAP);

    if (this._ignoreNextFilterChange.has(i)) {
      // Cambio generato dal bottone Clear: mantieni vuoto e consuma il flag
      this._ignoreNextFilterChange.delete(i);
      this._filters[i] = [];
    } else {
      // Cambio manuale: se l'array è vuoto/undefined => ripristina tutti
      const arr = Array.isArray(values) && values.length ? values.filter(Boolean) : all;
      this._filters[i] = [...arr];
    }

    this.requestUpdate('_filters');

    // Sincronizza visivamente il selector
    const sel = this.renderRoot?.querySelector(`#filter-${i}`);
    if (sel) sel.value = [...this._filters[i]];
  }

  // Clear: svuota davvero l'elenco e informa _onFilter di NON ricrearlo
  _clearFilter(i) {
    this._filters[i] = [];
    this.requestUpdate('_filters');

    const sel = this.renderRoot?.querySelector(`#filter-${i}`);
    if (sel) {
      // Attiva il flag: il prossimo value-changed ([]) non verrà "riempito"
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
    const allTypes = Object.keys(SENSOR_TYPE_MAP);
    this._filters  = Array(5).fill().map(() => [...allTypes]);
    this._entities = Array(5).fill('');

    // Reset solo delle entità nel YAML; i filtri restano locali
    for (let i = 1; i <= 5; i++) {
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: `entities.sensor${i}.entity`, val: '' },
        bubbles: true, composed: true,
      }));
    }
  }
}

customElements.define('sensor-panel', SensorPanel);