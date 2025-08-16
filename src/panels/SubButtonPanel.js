// src/panels/SubButtonPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import {
  candidatesFor,
  COMMON_CATS,
  FILTER_LABELS,
  BINARY_SENSOR_CATS,
} from '../helpers/entity-filters.js';

export class SubButtonPanel extends LitElement {
  static properties = {
    hass:      { type: Object },
    config:    { type: Object },
    expanded:  { type: Boolean },
    _expanded: { type: Array, state: true },
    _filters:  { type: Array, state: true },
    _entities: { type: Array, state: true },
    _icons:    { type: Array, state: true },
  };

  constructor() {
    super();
    this.hass      = {};
    this.config    = {};
    this.expanded  = false;
    this._expanded = Array(6).fill(false); // 6 subbuttons
    this._filters  = Array(6).fill().map(() => [...COMMON_CATS]);
    this._entities = Array(6).fill('');
    this._icons    = Array(6).fill('');
    this._ignoreNextFilterChange = new Set();
  }

  updated(changed) {
    if (!changed.has('config') && !changed.has('hass')) return;

    // Auto-discover sync
    const next = maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.subbutton');
    if (next && next !== this.config) {
      this.dispatchEvent(new CustomEvent('config-changed', {
        detail: { config: next }, bubbles: true, composed: true
      }));
    }

    // Sync da config
    const ents = this.config?.entities || {};
    for (let i = 0; i < 6; i++) {
      const key = `sub-button${i+1}`;
      const rec = ents[key] || {};
      if (rec.entity) this._entities[i] = rec.entity;
      if (typeof rec.icon === 'string') this._icons[i] = rec.icon;
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
      background: var(--glass-bg, rgba(200,200,255,0.18));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(120,120,220,0.12));
      overflow: hidden;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }

    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 24px;
      margin: 8px 16px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      cursor: pointer;
      font-weight: 700;
      color: #66b0ff;
    }
    .mini-pill-header .chevron { margin-left: auto; transition: transform 0.2s; }
    .mini-pill.expanded .mini-pill-header .chevron { transform: rotate(90deg); }
    .mini-pill-content { padding: 12px 16px 16px; }

    .input-group { margin-bottom: 12px; }
    .input-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 6px;
      color: #66b0ff;
    }

    ha-selector, ha-icon-picker { width: 100%; box-sizing: border-box; }

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
    const autoDisc = this.config?.auto_discovery_sections?.subbutton ?? false;
    const allCats = Array.from(new Set([...COMMON_CATS, ...BINARY_SENSOR_CATS]));
    const options = allCats.map(cat => ({
      value: cat,
      label: FILTER_LABELS[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1)),
    }));

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => {
          this.expanded = e.detail.expanded;
          if (this.expanded) this._expanded = Array(6).fill(false);
        }}
      >
        <div slot="header" class="glass-header">🎛 Sub Buttons</div>

        ${this._expanded.map((open, i) => this._renderSubButton(i, open, options, autoDisc))}

        <button class="reset-button" @click=${() => this._reset()}>
          🧹 Reset Subbuttons
        </button>
      </ha-expansion-panel>
    `;
  }

  _renderSubButton(i, open, options, autoDisc) {
    const key   = `sub-button${i+1}`;
    const types = this._filters[i];
    const ent   = this._entities[i];
    const icon  = this._icons[i];

    let cands;
    if (autoDisc) {
      cands = candidatesFor(this.hass, this.config, 'subbutton', types) || [];
    } else {
      const cfgNoArea = { ...this.config, area: undefined, area_id: undefined };
      cands = candidatesFor(this.hass, cfgNoArea, 'subbutton', types) || [];
    }
    if (ent && !cands.includes(ent)) cands = [ent, ...cands];

    return html`
      <div class="mini-pill ${open ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${() => this._togglePill(i)}>
          SubButton ${i+1}
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

            <div class="input-group">
              <label>Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${icon}
                allow-custom-icon
                @value-changed=${e => this._onIcon(i, e.detail.value)}
              ></ha-icon-picker>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  _togglePill(i) {
    this._expanded = this._expanded.map((v, idx) => idx === i ? !v : false);
  }

  _onFilter(i, values) {
    if (this._ignoreNextFilterChange.has(i)) {
      this._ignoreNextFilterChange.delete(i);
      this._filters[i] = [];
    } else {
      const arr = Array.isArray(values) && values.length ? values.filter(Boolean) : [...COMMON_CATS];
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
      detail: { prop: `entities.sub-button${i+1}.entity`, val: ent },
      bubbles: true, composed: true,
    }));
  }

  _onIcon(i, icon) {
    this._icons[i] = icon || '';
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: `entities.sub-button${i+1}.icon`, val: this._icons[i] },
      bubbles: true, composed: true,
    }));
  }

  _reset() {
    this._expanded = Array(6).fill(false);
    this._filters  = Array(6).fill().map(() => [...COMMON_CATS]);
    this._entities = Array(6).fill('');
    this._icons    = Array(6).fill('');
    for (let i = 1; i <= 6; i++) {
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: `entities.sub-button${i}.entity`, val: '' },
        bubbles: true, composed: true,
      }));
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: `entities.sub-button${i}.icon`, val: '' },
        bubbles: true, composed: true,
      }));
    }
  }
}

customElements.define('subbutton-panel', SubButtonPanel);