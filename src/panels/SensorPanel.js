// src/panels/SensorPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor }     from '../helpers/entity-filters.js';
import { SENSOR_TYPE_MAP }   from '../helpers/sensor-mapping.js';
import { sharedPanelStyles } from './shared-styles.js';
import { localize } from '../helpers/i18n.js';

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
      // Auto-discover: usa il valore di ritorno e propaga la nuova config (se serve)
      const next = maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.sensor');
      if (next && next !== this.config) {
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: next }, bubbles: true, composed: true
        }));
      }

      // Se esiste in config, carica ma NON riscrivere mai sensor_filters nel YAML
      for (let i = 0; i < 5; i++) {
        const key = `sensor${i + 1}`;
        const cfgFilter = this.config?.sensor_filters?.[i];
        const cfgEnt    = this.config?.entities?.[key]?.entity;
        if (Array.isArray(cfgFilter)) this._filters[i] = [...cfgFilter];
        if (cfgEnt)                   this._entities[i] = cfgEnt;
      }
    }
  }

  static styles = [
    sharedPanelStyles,
    css`
      :host {
        --bubble-glass-bg: var(--glass-bg, rgba(167,255,175,0.22));
        --bubble-glass-shadow: var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13));
        --bubble-glass-sheen: var(--glass-sheen,
          linear-gradient(120deg, rgba(255,255,255,0.11),
          rgba(255,255,255,0.07) 70%, transparent 100%));
        --bubble-accent-color: #8cff8a;
      }

      .preview {
        display: flex;
        align-items: center;
        gap: 12px;
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
    `,
  ];

  render() {
    const autoDisc = this.config?.auto_discovery_sections?.sensor ?? false;
    const t = (key, vars, fallback) => localize(this.hass, key, vars, fallback);

    const options = Object.entries(SENSOR_TYPE_MAP)
      .filter(([type]) => type !== '_fallback')
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
        <div slot="header" class="glass-header">${t('panel.sensor.title')}</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
          />
          <label>${t('panel.sensor.auto_discover')}</label>
        </div>

        ${this._expanded.map((open, i) => this._renderSensor(i, open, options))}

        <button class="reset-button" @click=${() => this._reset()}>
          ${t('panel.sensor.reset')}
        </button>
      </ha-expansion-panel>
    `;
  }

  _renderSensor(i, open, options) {
    const t = (key, vars, fallback) => localize(this.hass, key, vars, fallback);
    const types = this._filters[i];
    const ent   = this._entities[i];

    // AD ON ⇒ filtrato per area; AD OFF ⇒ nessun filtro area (per device_class)
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
          ${t('panel.sensor.sensor_item', { index: i + 1 })}
          <span class="chevron">${open ? '▼' : '▶'}</span>
        </div>
        ${open ? html`
          <div class="mini-pill-content">
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${i}">${t('panel.sensor.filter_category')}</label>
                <button
                  class="clear-chip"
                  type="button"
                  @click=${() => this._clearFilter(i)}
                  title=${t('panel.sensor.clear_filter')}>
                  ${t('panel.sensor.clear')}
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
              <label>${t('panel.sensor.entity')}</label>
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
