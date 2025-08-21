// src/panels/SubButtonPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import {
  candidatesFor,
  COMMON_CATS,
  FILTER_LABELS,
} from '../helpers/entity-filters.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';

export class SubButtonPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    expanded: { type: Boolean },
    _expanded: { type: Array, state: true },
    _filters: { type: Array, state: true },
    _entities: { type: Array, state: true },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.expanded = false;

    this._expanded = Array(4).fill(false);
    this._filters  = Array(4).fill().map(() => [...COMMON_CATS]);
    this._entities = Array(4).fill('');

    this._ignoreNextFilterChange = new Set(); // one-shot per Clear
    this._filtersHydrated = false;
    this._syncingFromConfig = false;          // evita side-effects
  }

  updated(changed) {
    if (!changed.has('config') && !changed.has('hass')) return;

    this._syncingFromConfig = true;

    // Autodiscovery area-aware (non muta la config localmente)
    if (this.config?.area || this.config?.area_id) {
      const next = maybeAutoDiscover(this.hass, this.config, 'area', false);
      if (next && next !== this.config) {
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: next }, bubbles: true, composed: true,
        }));
      }
    }

    // Non mutare mai this.config qui. Assicura però la struttura letta.
    const list = Array.isArray(this.config?.subbuttons) ? this.config.subbuttons : [];
    if (list.length) {
      for (let i = 0; i < Math.min(4, list.length); i++) {
        const ent = list[i]?.entity_id || '';
        this._entities[i] = ent;
        // auto-icona (solo dispatch, non scrivere this.config)
        if (ent) {
          const existing = list[i]?.icon;
          if (!existing) {
            const st = this.hass?.states?.[ent];
            const iconFromState = st?.attributes?.icon;
            const autoIcon = iconFromState || resolveEntityIcon(ent, this.hass);
            if (autoIcon) {
              this.dispatchEvent(new CustomEvent('panel-changed', {
                detail: { prop: `subbuttons.${i}.icon`, val: autoIcon },
                bubbles: true, composed: true,
              }));
            }
          }
        }
      }
    }

    // idrata filtri da YAML SOLO la prima volta
    if (!this._filtersHydrated) {
      const cfgFilters = this.config?.subbutton_filters;
      if (Array.isArray(cfgFilters) && cfgFilters.length === 4) {
        this._filters = cfgFilters.map(f => Array.isArray(f) ? [...f] : [...COMMON_CATS]);
      }
      this._filtersHydrated = true;
    }

    this._syncingFromConfig = false;
  }

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(180,120,255,0.34));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(160,100,255,0.19));
      overflow: hidden;
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.22),
        rgba(255,255,255,0.10) 70%, transparent 100%));
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
    .input-group.autodiscover label { margin: 0; font-weight: 700; color: #fff; }

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
      font-weight: 700; color: #b28fff;
    }
    .mini-pill-header .chevron { margin-left: auto; transition: transform 0.2s; }
    .mini-pill.expanded .mini-pill-header .chevron { transform: rotate(90deg); }
    .mini-pill-content { padding: 12px 16px 16px; animation: pill-expand 0.2s ease-out both; }
    @keyframes pill-expand { from {opacity:0;transform:translateY(-8px);} to {opacity:1;transform:translateY(0);} }

    .input-group { margin-bottom: 12px; }
    .input-group label { display: block; font-weight: 600; margin-bottom: 6px; color: #b28fff; }
    ha-selector, ha-icon-picker { width: 100%; box-sizing: border-box; }
    ha-selector::part(combobox) { min-height: 40px; }

    /* ——— stile Clear (allineato al label, come Sensor/Mushroom) ——— */
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

    /* === STYLE TAP/HOLD like RoomPanel === */
    .pill-group { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
    .pill-button {
      padding: 6px 10px; border-radius: 999px; border: 1px solid #555; cursor: pointer;
      background: transparent; font-weight: 600; transition: background 0.18s, border-color 0.18s, color 0.18s;
    }
    .pill-button.active { border-color: #b28fff; color: #b28fff; }
    .pill-button:hover:not(.active) { background: rgba(178,143,255,0.1); }

    .reset-button {
      border: 3.5px solid #ff4c6a; color: #ff4c6a; border-radius: 24px; padding: 12px 38px;
      background: transparent; cursor: pointer; display: block; margin: 20px auto;
      font-size: 1.15rem; font-weight: 700; box-shadow: 0 2px 24px #ff4c6a44; transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover { background: rgba(255,76,106,0.18); color: #fff; box-shadow: 0 6px 32px #ff4c6abf; }
  `;

  render() {
    const autoDisc = this.config?.auto_discovery_sections?.subbutton ?? false;
    const options = COMMON_CATS.map(cat => ({
      value: cat,
      label: FILTER_LABELS[cat] || cat.charAt(0).toUpperCase() + cat.slice(1),
    }));

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🎛️ Sub-buttons</div>

        <div class="input-group autodiscover">
          <input type="checkbox" .checked=${autoDisc}
                 @change=${e => this._toggleAuto(e.target.checked)} />
          <label>🪄 Auto-discover Subbuttons</label>
        </div>

        ${this._expanded.map((open, i) => this._renderSubButton(i, open, options))}

        <button class="reset-button" @click=${() => this._reset()}>🧹 Reset Sub-buttons</button>
      </ha-expansion-panel>
    `;
  }

  _renderSubButton(i, open, options) {
    const types = this._filters[i];
    const ent = this._entities[i];
    const adOn = this.config?.auto_discovery_sections?.subbutton ?? false;

    let cands;
    if (adOn) {
      cands = candidatesFor(this.hass, this.config, 'subbutton', types) || [];
    } else {
      const cfgNoArea = { ...this.config, area: undefined, area_id: undefined };
      cands = candidatesFor(this.hass, cfgNoArea, 'subbutton', types) || [];
    }
    if (ent && !cands.includes(ent)) cands = [ent, ...cands];

    const cfg = Array.isArray(this.config?.subbuttons) ? (this.config.subbuttons[i] || {}) : {};
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];

    return html`
      <div class="mini-pill ${open ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${() => this._togglePill(i)}>
          Sub-button ${i + 1}  <span class="chevron">${open ? '▼' : '▶'}</span>
        </div>
        ${open ? html`
          <div class="mini-pill-content">
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${i}">Filter category:</label>
                <button class="clear-chip" type="button"
                        @click=${() => this._clearFilter(i)}
                        title="Clear filter category">Clear</button>
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

            <div class="input-group">
              <label>Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${cfg.icon || ''}
                allow-custom-icon
                @value-changed=${e => this._onIcon(i, e.detail.value)}
              ></ha-icon-picker>
            </div>

            ${['tap','hold'].map(type => html`
              <div class="input-group">
                <label>${type === 'tap' ? 'Tap Action' : 'Hold Action'}:</label>
                <div class="pill-group">
                  ${actions.map(a => html`
                    <button
                      class="pill-button ${cfg[`${type}_action`]?.action === a ? 'active' : ''}"
                      @click=${() => this._onAction(i, type, 'action', a)}
                    >${a}</button>
                  `)}
                </div>
                ${this._extraFields(i, type, cfg)}
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  _extraFields(i, type, cfg) {
    const act = cfg?.[`${type}_action`]?.action;
    if (act === 'navigate') {
      return html`
        <input type="text" placeholder="Path"
          .value=${cfg?.[`${type}_action`]?.navigation_path || ''}
          @input=${e => this._onAction(i, type, 'navigation_path', e.target.value)}
        />
      `;
    }
    if (act === 'call-service') {
      return html`
        <input type="text" placeholder="Service"
          .value=${cfg?.[`${type}_action`]?.service || ''}
          @input=${e => this._onAction(i, type, 'service', e.target.value)}
        />
        <input type="text" placeholder='Service Data (JSON)'
          .value=${cfg?.[`${type}_action`]?.service_data ? JSON.stringify(cfg[`${type}_action`].service_data) : ''}
          @input=${e => this._onAction(i, type, 'service_data', this._safeJson(e.target.value))}
        />
      `;
    }
    return '';
  }

  _safeJson(txt) { try { return JSON.parse(txt); } catch { return {}; } }

  _toggleAuto(on) {
    if (this._syncingFromConfig) return;
    this._emit('auto_discovery_sections.subbutton', on);
  }

  _togglePill(i) {
    this._expanded = this._expanded.map((v, k) => (k === i ? !v : false));
  }

  // Filtri: singolo chip e Clear (one-shot)
  // identico a MushroomPanel: niente .value forzato
  _onFilter(i, vals) {
    let newFilters;
    
    if (this._ignoreNextFilterChange.has(i)) {
      this._ignoreNextFilterChange.delete(i);
      newFilters = [];
    } else {
      newFilters = Array.isArray(vals) ? vals.filter(Boolean) : [];
    }
    
    // crea un nuovo array per triggerare il re-render
    this._filters = this._filters.map((f, idx) => idx === i ? [...newFilters] : f);
    
    this.requestUpdate('_filters');
    this._emit('subbutton_filters', this._filters);
  }
  
  _clearFilter(i) {
    this._ignoreNextFilterChange.add(i);
    
    // crea nuovo array vuoto nella posizione i
    this._filters = this._filters.map((f, idx) => idx === i ? [] : f);
    
    this.requestUpdate('_filters');
    this._emit('subbutton_filters', this._filters);
  }


  _onEntity(i, ent) {
    this._entities[i] = ent || '';
    if (this._syncingFromConfig) return;
    
    // Salva l’entità selezionata (anche vuota)
    this._emit(`subbuttons.${i}.entity_id`, this._entities[i]);
    
    // Se l'entità è stata cancellata → cancella anche l'icona (comportamento come MushroomPanel)
    if (!this._entities[i]) {
      this._emit(`subbuttons.${i}.icon`, '');
      return;
    }
    
    // Entità presente → ricalcola SEMPRE l’icona (stato → fallback mapping)
    const st = this.hass?.states?.[this._entities[i]];
    const iconFromState = st?.attributes?.icon;
    const autoIcon = iconFromState || resolveEntityIcon(this._entities[i], this.hass);
    if (autoIcon) {
      this._emit(`subbuttons.${i}.icon`, autoIcon);
    }
  }
  _onIcon(i, icon) {
    if (this._syncingFromConfig) return;
    this._emit(`subbuttons.${i}.icon`, icon || '');
  }

  _onAction(i, type, field, val) {
    if (this._syncingFromConfig) return;
    const patch = { ...((this.config?.subbuttons?.[i] || {})[`${type}_action`] || {}), [field]: val };
    this._emit(`subbuttons.${i}.${type}_action`, patch);
  }

  _reset() {
    this._expanded = Array(4).fill(false);
    this._filters  = Array(4).fill().map(() => [...COMMON_CATS]);
    this._entities = Array(4).fill('');

    // Propaga reset: filtri ed entità
    this._emit('subbutton_filters', this._filters);
    for (let i = 0; i < 4; i++) {
      this._emit(`subbuttons.${i}`, {}); // svuota ogni subbutton
    }
  }

  _emit(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('sub-button-panel', SubButtonPanel);