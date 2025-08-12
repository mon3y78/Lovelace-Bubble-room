// src/panels/MushroomPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import {
  candidatesFor,
  COMMON_CATS,
  FILTER_LABELS,
} from '../helpers/entity-filters.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';

export class MushroomPanel extends LitElement {
  static properties = {
    hass:      { type: Object },
    config:    { type: Object },
    expanded:  { type: Boolean },

    _expanded: { type: Array,  state: true }, // quale “pill” è aperta
    _filters:  { type: Array,  state: true }, // 5 array di categorie
    _entities: { type: Array,  state: true }, // 5 entity_id
    _icons:    { type: Array,  state: true }, // 5 icone (mdi:...)
  };

  constructor() {
    super();
    this.hass      = {};
    this.config    = {};
    this.expanded  = false;

    this._expanded = Array(5).fill(false);
    this._filters  = Array(5).fill().map(() => [...COMMON_CATS]);
    this._entities = Array(5).fill('');
    this._icons    = Array(5).fill('');

    // flag di servizio: evita side-effect mentre sincronizziamo lo stato locale
    this._syncingFromConfig = false;
  }

  updated(changed) {
    if (!changed.has('config') && !changed.has('hass')) return;

    this._syncingFromConfig = true;

    // 1) Autodiscovery area-based (copre la sezione mushroom se il toggle è attivo)
    if (this.config?.area || this.config?.area_id) {
      maybeAutoDiscover(this.hass, this.config, 'area', false);
    }

    // 2) sincronizza filtri da config (se presenti)
    const cfgFilters = this.config?.mushroom_filters;
    if (Array.isArray(cfgFilters) && cfgFilters.length === 5) {
      this._filters = cfgFilters.map(f => Array.isArray(f) ? [...f] : [...COMMON_CATS]);
    }

    // 3) sincronizza entity + icon da config.entities
    const ents = this.config?.entities || {};
    for (let i = 0; i < 5; i++) {
      const key = `mushroom${i+1}`;
      const rec = ents[key] || {};
      if (rec.entity) this._entities[i] = rec.entity;
      if (typeof rec.icon === 'string') this._icons[i] = rec.icon;
    }

    this._syncingFromConfig = false;

    // 4) Auto-icona al primo load: se c'è entità ma l'icona in config è vuota, impostala ora
    const pending = [];
    for (let i = 0; i < 5; i++) {
      const key = `mushroom${i+1}`;
      const ent = this._entities[i];
      const cfgIcon = this.config?.entities?.[key]?.icon;
      if (ent && !cfgIcon) {
        const autoIco = this._autoIconFor(ent);
        if (autoIco) pending.push({ i, key, icon: autoIco });
      }
    }
    if (pending.length) {
      for (const { i, key, icon } of pending) {
        this._icons[i] = icon;
        this.dispatchEvent(new CustomEvent('panel-changed', {
          detail: { prop: `entities.${key}.icon`, val: icon },
          bubbles: true, composed: true,
        }));
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
      background: var(--glass-bg, rgba(80,235,175,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(40,220,145,0.18));
      overflow: hidden;
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.18),
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
      font-weight: 700; color: #36e6a0;
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
      margin-bottom: 6px; color: #36e6a0;
    }
    ha-selector { width: 100%; box-sizing: border-box; }
    ha-selector::part(combobox) { min-height: 40px; }

    /* === stile bottoni azione (come SubButtonPanel) === */
    .pill-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 6px;
    }
    .pill-button {
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid #555;
      cursor: pointer;
      background: transparent;
      font-weight: 600;
      transition: background 0.18s, border-color 0.18s, color 0.18s;
    }
    .pill-button.active {
      border-color: #36e6a0;
      color: #36e6a0;
    }
    .pill-button:hover:not(.active) {
      background: rgba(54,230,160,0.1);
    }

    .reset-button {
      border: 3.5px solid #ff4c6a; color: #ff4c6a;
      border-radius: 24px; padding: 12px 38px;
      background: transparent; cursor: pointer;
      display: block; margin: 20px auto;
      font-size: 1.15rem; font-weight: 700;
      box-shadow: 0 2px 24px #ff4c6a44;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18);
      color: #fff; box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;

  render() {
    const autoDisc = this.config?.auto_discovery_sections?.mushroom ?? false;

    const options = COMMON_CATS.map(cat => ({
      value: cat,
      label: FILTER_LABELS[cat] || cat.charAt(0).toUpperCase() + cat.slice(1),
    }));

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => {
          this.expanded = e.detail.expanded;
          if (this.expanded) this._expanded = Array(5).fill(false);
        }}
      >
        <div slot="header" class="glass-header">🍄 Mushroom Entities</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto-discover Mushroom</label>
        </div>

        ${this._expanded.map((open, i) => this._renderMushroom(i, open, options))}

        <button class="reset-button" @click=${() => this._reset()}>
          🧹 Reset Mushrooms
        </button>
      </ha-expansion-panel>
    `;
  }

  _renderMushroom(i, open, options) {
    const key   = `mushroom${i+1}`;
    const types = this._filters[i];
    const ent   = this._entities[i];
    const icon  = this._icons[i];
    const cfg   = (this.config.entities && this.config.entities[key]) ? this.config.entities[key] : {};

    const cands = candidatesFor(this.hass, this.config, 'mushroom', types);
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];

    return html`
      <div class="mini-pill ${open ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${() => this._togglePill(i)}>
          Mushroom ${i+1}
          <span class="chevron">${open ? '▼' : '▶'}</span>
        </div>

        ${open ? html`
          <div class="mini-pill-content">
            <!-- Filter categories -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${types}
                .selector=${{ select: { multiple: true, mode: 'box', options } }}
                @value-changed=${e => this._onFilter(i, e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Entity -->
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

            <!-- Icon -->
            <div class="input-group">
              <label>Icon:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${icon}
                .selector={{ icon: {} }}
                @value-changed=${e => this._onIcon(i, e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Tap Action -->
            <div class="input-group">
              <label>Tap Action:</label>
              <div class="pill-group">
                ${actions.map(a => html`
                  <button
                    class="pill-button ${cfg.tap_action?.action === a ? 'active' : ''}"
                    @click=${() => this._onAction(i, 'tap', 'action', a)}
                  >${a}</button>
                `)}
              </div>
              ${this._extraFields(i, 'tap', cfg)}
            </div>

            <!-- Hold Action -->
            <div class="input-group">
              <label>Hold Action:</label>
              <div class="pill-group">
                ${actions.map(a => html`
                  <button
                    class="pill-button ${cfg.hold_action?.action === a ? 'active' : ''}"
                    @click=${() => this._onAction(i, 'hold', 'action', a)}
                  >${a}</button>
                `)}
              </div>
              ${this._extraFields(i, 'hold', cfg)}
            </div>
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
          .value=${cfg[`${type}_action`]?.navigation_path || ''}
          @input=${e => this._onAction(i, type, 'navigation_path', e.target.value)}
        />
      `;
    }
    if (act === 'call-service') {
      return html`
        <input type="text" placeholder="Service (es. light.turn_on)"
          .value=${cfg[`${type}_action`]?.service || ''}
          @input=${e => this._onAction(i, type, 'service', e.target.value)}
        />
        <input type="text" placeholder='Service Data (JSON)'
          .value=${cfg[`${type}_action`]?.service_data ? JSON.stringify(cfg[`${type}_action`].service_data) : ''}
          @input=${e => this._onAction(i, type, 'service_data', this._safeJson(e.target.value))}
        />
      `;
    }
    return '';
  }

  _safeJson(txt) { try { return JSON.parse(txt); } catch { return {}; } }

  /* --------------------------- HANDLERS ------------------------------ */
  _toggleAuto(on) {
    if (this._syncingFromConfig) return;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'auto_discovery_sections.mushroom', val: on },
      bubbles: true, composed: true,
    }));
  }

  _togglePill(i) {
    this._expanded = this._expanded.map((v, idx) => (idx === i ? !v : false));
    this.requestUpdate();
  }

  _onFilter(i, values) {
    this._filters[i] = [...values];
    if (this._syncingFromConfig) return;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'mushroom_filters', val: this._filters },
      bubbles: true, composed: true,
    }));
  }

  _onEntity(i, ent) {
    this._entities[i] = ent;

    if (!this._syncingFromConfig) {
      // salva l’entità
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: `entities.mushroom${i+1}.entity`, val: ent },
        bubbles: true, composed: true,
      }));

      // se l’icona è vuota → imposta subito auto-icona (stato → fallback)
      const currentIcon = this.config?.entities?.[`mushroom${i+1}`]?.icon || '';
      if (!currentIcon) {
        const autoIco = this._autoIconFor(ent);
        if (autoIco) {
          this._icons[i] = autoIco;
          this.dispatchEvent(new CustomEvent('panel-changed', {
            detail: { prop: `entities.mushroom${i+1}.icon`, val: autoIco },
            bubbles: true, composed: true,
          }));
        }
      }
    }
  }

  _onIcon(i, icon) {
    this._icons[i] = icon || '';
    if (this._syncingFromConfig) return;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: `entities.mushroom${i+1}.icon`, val: this._icons[i] },
      bubbles: true, composed: true,
    }));
  }

  _onAction(i, type, field, val) {
    if (this._syncingFromConfig) return;
    const key = `mushroom${i+1}`;
    const prev = this.config?.entities?.[key]?.[`${type}_action`] || {};
    const next = { ...prev, [field]: val };
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: `entities.${key}.${type}_action`, val: next },
      bubbles: true, composed: true,
    }));
  }

  _reset() {
    this._expanded = Array(5).fill(false);
    this._filters  = Array(5).fill().map(() => [...COMMON_CATS]);
    this._entities = Array(5).fill('');
    this._icons    = Array(5).fill('');

    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'mushroom_filters', val: this._filters },
      bubbles: true, composed: true,
    }));

    for (let i = 1; i <= 5; i++) {
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: `entities.mushroom${i}.entity`, val: '' },
        bubbles: true, composed: true,
      }));
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: `entities.mushroom${i}.icon`, val: '' },
        bubbles: true, composed: true,
      }));
      // reset anche azioni
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: `entities.mushroom${i}.tap_action`, val: { action: 'none' } },
        bubbles: true, composed: true,
      }));
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: `entities.mushroom${i}.hold_action`, val: { action: 'none' } },
        bubbles: true, composed: true,
      }));
    }
  }

  /* --------------------------- UTILS -------------------------------- */
  _autoIconFor(entityId) {
    if (!entityId) return '';
    const st = this.hass?.states?.[entityId];
    return st?.attributes?.icon || resolveEntityIcon(entityId, this.hass);
  }
}

customElements.define('mushroom-panel', MushroomPanel);
