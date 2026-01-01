// src/panels/MushroomPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import {
  candidatesFor,
  COMMON_CATS,
  FILTER_LABELS,
  BINARY_SENSOR_CATS, // ← aggiunto: includiamo anche le device_class dei binary_sensor
} from '../helpers/entity-filters.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';
import { sharedPanelStyles } from './shared-styles.js';
import { localize } from '../helpers/i18n.js';

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

    // Tutte le categorie disponibili: domini comuni + device_class dei binary_sensor
    this._ALL_CATS = Array.from(new Set([...COMMON_CATS, ...BINARY_SENSOR_CATS]));

    this._expanded = Array(5).fill(false);
    // Default: tutte le categorie disponibili (non solo COMMON_CATS)
    this._filters  = Array(5).fill().map(() => [...this._ALL_CATS]);
    this._entities = Array(5).fill('');
    this._icons    = Array(5).fill('');

    this._syncingFromConfig = false;        // evita side effects durante la sync
    this._ignoreNextFilterChange = new Set(); // per “Clear” intenzionale
  }

  updated(changed) {
    if (!changed.has('config') && !changed.has('hass')) return;

    this._syncingFromConfig = true;

    // 1) Autodiscovery area-based (applica il valore di ritorno)
    if (this.config?.area || this.config?.area_id) {
      const next = maybeAutoDiscover(this.hass, this.config, 'area', false);
      if (next && next !== this.config) {
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: next }, bubbles: true, composed: true
        }));
      }
    }

    // 2) sincronizza filtri da config (se presenti)
    const cfgFilters = this.config?.mushroom_filters;
    if (Array.isArray(cfgFilters) && cfgFilters.length === 5) {
      this._filters = cfgFilters.map(f => Array.isArray(f) ? [...f] : [...this._ALL_CATS]);
    } else {
      // se non c’è nulla in config, assicurati di avere il default completo
      this._filters = Array(5).fill().map(() => [...this._ALL_CATS]);
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

    // 4) Auto-icona al primo load (non sovrascrive scelta utente)
    const pending = [];
    for (let i = 0; i < 5; i++) {
      const key = `mushroom${i+1}`;
      const ent = this._entities[i];
      const cfgIcon = this.config?.entities?.[key]?.icon;
      if (ent && !cfgIcon) {
        const st = this.hass?.states?.[ent];
        const iconFromState = st?.attributes?.icon;
        const autoIco = iconFromState || resolveEntityIcon(ent, this.hass);
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

  static styles = [
    sharedPanelStyles,
    css`
      :host {
        --bubble-glass-bg: var(--glass-bg, rgba(80,235,175,0.28));
        --bubble-glass-shadow: var(--glass-shadow, 0 2px 24px rgba(40,220,145,0.18));
        --bubble-glass-sheen: var(--glass-sheen,
          linear-gradient(120deg, rgba(255,255,255,0.18),
          rgba(255,255,255,0.10) 70%, transparent 100%));
        --bubble-accent-color: #36e6a0;
      }

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
    `,
  ];

  render() {
    const autoDisc = this.config?.auto_discovery_sections?.mushroom ?? false;
    const t = (key, vars, fallback) => localize(this.hass, key, vars, fallback);

    // Opzioni: tutte le categorie (domini + device_class)
    const options = this._ALL_CATS.map(cat => ({
      value: cat,
      label: FILTER_LABELS[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1)),
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
        <div slot="header" class="glass-header">${t('panel.mushroom.title')}</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
          />
          <label>${t('panel.mushroom.auto_discover')}</label>
        </div>

        ${this._expanded.map((open, i) => this._renderMushroom(i, open, options))}

        <button class="reset-button" @click=${() => this._reset()}>
          ${t('panel.mushroom.reset')}
        </button>
      </ha-expansion-panel>
    `;
  }

  _renderMushroom(i, open, options) {
    const t = (key, vars, fallback) => localize(this.hass, key, vars, fallback);
    const key   = `mushroom${i+1}`;
    const types = this._filters[i];
    const ent   = this._entities[i];
    const icon  = this._icons[i];
    const cfg   = (this.config.entities && this.config.entities[key]) ? this.config.entities[key] : {};

    // Candidati:
    // - AD ON  ⇒ pipeline standard (filtrata per area) via candidatesFor
    // - AD OFF ⇒ stessa pipeline ma senza area (così funzionano anche le device_class)
    const autoDisc = this.config?.auto_discovery_sections?.mushroom ?? false;
    let cands;
    if (autoDisc) {
      cands = candidatesFor(this.hass, this.config, 'mushroom', types) || [];
    } else {
      const cfgNoArea = { ...this.config, area: undefined, area_id: undefined };
      cands = candidatesFor(this.hass, cfgNoArea, 'mushroom', types) || [];
    }
    // preserva l’entità selezionata in cima se non già inclusa
    if (ent && !cands.includes(ent)) cands = [ent, ...cands];
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];
    const actionLabels = {
      toggle: t('actions.toggle'),
      'more-info': t('actions.more-info'),
      navigate: t('actions.navigate'),
      'call-service': t('actions.call-service'),
      none: t('actions.none'),
    };

    return html`
      <div class="mini-pill ${open ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${() => this._togglePill(i)}>
          ${t('panel.mushroom.item', { index: i + 1 })}
          <span class="chevron">${open ? '▼' : '▶'}</span>
        </div>

        ${open ? html`
          <div class="mini-pill-content">
            <!-- Filter categories (layout/UX identici a SensorPanel) -->
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${i}">${t('panel.mushroom.filter_category')}</label>
                <button
                  class="clear-chip"
                  type="button"
                  @click=${() => this._clearFilter(i)}
                  title=${t('panel.mushroom.clear_filter')}>
                  ${t('panel.mushroom.clear')}
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

            <!-- Entity -->
            <div class="input-group">
              <label>${t('panel.mushroom.entity')}</label>
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
              <label>${t('panel.mushroom.icon')}</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${icon}
                allow-custom-icon
                @value-changed=${e => this._onIcon(i, e.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Tap Action -->
            <div class="input-group">
              <label>${t('panel.mushroom.tap_action')}</label>
              <div class="pill-group">
                ${actions.map(a => html`
                  <button
                    class="pill-button ${cfg.tap_action?.action === a ? 'active' : ''}"
                    @click=${() => this._onAction(i, 'tap', 'action', a)}
                  >${actionLabels[a]}</button>
                `)}
              </div>
              ${this._extraFields(i, 'tap', cfg)}
            </div>

            <!-- Hold Action -->
            <div class="input-group">
              <label>${t('panel.mushroom.hold_action')}</label>
              <div class="pill-group">
                ${actions.map(a => html`
                  <button
                    class="pill-button ${cfg.hold_action?.action === a ? 'active' : ''}"
                    @click=${() => this._onAction(i, 'hold', 'action', a)}
                  >${actionLabels[a]}</button>
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
    const t = (key, vars, fallback) => localize(this.hass, key, vars, fallback);
    const act = cfg?.[`${type}_action`]?.action;
    if (act === 'navigate') {
      return html`
        <input type="text" placeholder=${t('panel.mushroom.path')}
          .value=${cfg[`${type}_action`]?.navigation_path || ''}
          @input=${e => this._onAction(i, type, 'navigation_path', e.target.value)}
        />
      `;
    }
    if (act === 'call-service') {
      return html`
        <input type="text" placeholder=${t('panel.mushroom.service_with_example')}
          .value=${cfg[`${type}_action`]?.service || ''}
          @input=${e => this._onAction(i, type, 'service', e.target.value)}
        />
        <input type="text" placeholder=${t('panel.mushroom.service_data')}
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
    // stessa logica di SensorPanel ma con default = _ALL_CATS
    if (this._ignoreNextFilterChange.has(i)) {
      this._ignoreNextFilterChange.delete(i);
      this._filters[i] = [];
    } else {
      const arr = Array.isArray(values) && values.length
        ? values.filter(Boolean)
        : [...this._ALL_CATS];
      this._filters[i] = [...arr];
    }
    this.requestUpdate('_filters');

    if (!this._syncingFromConfig) {
      const nextFilters = this._filters.map(list => [...list]);
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: 'mushroom_filters', val: nextFilters },
        bubbles: true, composed: true,
      }));
    }

    // Sync visuale del selector
    const sel = this.renderRoot?.querySelector(`#filter-${i}`);
    if (sel) sel.value = [...this._filters[i]];
  }

  // Clear identico a SensorPanel: svuota, setta il flag, dispatch value-changed([])
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

    if (!this._syncingFromConfig) {
      // salva l’entità
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: `entities.mushroom${i+1}.entity`, val: ent },
        bubbles: true, composed: true,
      }));

      // se l’icona è vuota → imposta subito auto-icona (stato → fallback)
      const currentIcon = this.config?.entities?.[`mushroom${i+1}`]?.icon || '';
      if (!currentIcon) {
        const st = this.hass?.states?.[ent];
        const iconFromState = st?.attributes?.icon;
        const autoIco = iconFromState || resolveEntityIcon(ent, this.hass);
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
    this._filters  = Array(5).fill().map(() => [...this._ALL_CATS]);
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
