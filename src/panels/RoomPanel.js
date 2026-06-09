// src/panels/RoomPanel.js
import { LitElement, html, css } from 'lit';
import { candidatesFor }     from '../helpers/entity-filters.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js'; // path corretto
import { IconCache }         from '../helpers/icon-cache.js';
import { sharedPanelStyles } from './shared-styles.js';
import { localize } from '../helpers/i18n.js';

const PRESENCE_CATS = [
  'presence',
  'motion',
  'occupancy',
  'light',
  'switch',
  'fan',
];

export class RoomPanel extends LitElement {
  static properties = {
    hass:          { type: Object },
    config:        { type: Object },
    expanded:      { type: Boolean },
    activeFilters: { type: Array,  state: true },
    layout:        { type: String },  // 'wide' or 'tall'
  };

  static styles = [
    sharedPanelStyles,
    css`
    :host {
      --bubble-glass-bg: rgba(73,164,255,0.38);
      --bubble-glass-shadow: 0 2px 24px rgba(50,180,255,0.25);
      --bubble-glass-sheen: linear-gradient(120deg, rgba(255,255,255,0.26), rgba(255,255,255,0.11) 70%, transparent 100%);
      --bubble-accent-color: #55afff;
      --bubble-autodiscover-label-color: #55afff;
    }

    .input-group input[type="text"],
    input[type="text"] {
      width: 100%;
      box-sizing: border-box;
      min-height: 40px;
    }

    /* pill actions come Mushroom/SubButton */
    .pill-group {
      display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px;
    }
    .pill-button {
      padding: 6px 10px; border-radius: 999px; border: 1px solid #555;
      cursor: pointer; background: transparent; font-weight: 600;
      transition: background .18s, border-color .18s, color .18s;
    }
    .pill-button.active { border-color: #55afff; color: #55afff; }
    .pill-button:hover:not(.active) { background: rgba(85,175,255,0.12); }

    /* Layout chooser */
    .toggle-group {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 4px;
    }
    .toggle-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 64px;
      padding: 8px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.24);
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    .toggle-btn ha-icon {
      --mdc-icon-size: 28px;
      color: var(--primary-text-color);
    }
    .toggle-btn span {
      margin-top: 4px;
      font-size: 0.9rem;
      color: var(--primary-text-color);
    }
    .toggle-btn.active {
      background: #55afff;
      border-color: #55afff;
    }
    .toggle-btn.active ha-icon,
    .toggle-btn.active span {
      color: white;
    }
    .toggle-btn:hover { background: rgba(255,255,255,0.18); }

  `,
  ];

  constructor() {
    super();
    this.hass          = {};
    this.config        = {};
    this.expanded      = false;
    this.activeFilters = [];
    this.layout        = 'wide';
    this._syncingFromConfig = false;
  }

  updated(changed) {
    if (!changed.has('config') && !changed.has('hass')) return;

    this._syncingFromConfig = true;

    // 🔸 Pre‑warm cache icone MDI — idempotente
    IconCache.warm(this.hass);

    // 🧩 Sync filtri presenza dall a config (se presenti)
    if (changed.has('config')) {
      if (Array.isArray(this.config?.presence_filters)) {
        this.activeFilters = [...this.config.presence_filters];
      }
      const cfgLayout = this.config?.layout;
      if (cfgLayout && cfgLayout !== this.layout) {
        this.layout = cfgLayout;
      }
    }

    this._syncingFromConfig = false;

    // 🎨 Auto‑icona stanza al primo load: se c'è una presence e manca l'icona della stanza
    const pres = this.config?.entities?.presence?.entity;
    const roomIcon = this.config?.icon || '';
    if (pres && !roomIcon) {
      const st = this.hass?.states?.[pres];
      const autoIcon = st?.attributes?.icon || resolveEntityIcon(pres, this.hass);
      if (autoIcon) {
        // emetti l'aggiornamento dell'icona stanza
        this._fire('icon', autoIcon);
      }
    }
  }


  _onLayoutClick(mode) {
    this.layout = mode;
    this._fire('layout', mode);
    const grid = mode === 'tall' ? { columns: 6, rows: 4 } : { columns: 12, rows: 4 };
    this._fire('grid_options', grid);
  }

  _fire(prop, val) {
    if (this._syncingFromConfig) return;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }

  _onPresenceEntityChange = (ent) => {
    const entity = ent || '';
    this._fire('entities.presence.entity', entity);
    const currentIcon = this.config?.icon || '';
    if (entity && !currentIcon) {
      const st = this.hass?.states?.[entity];
      const autoIcon = st?.attributes?.icon || resolveEntityIcon(entity, this.hass);
      if (autoIcon) this._fire('icon', autoIcon);
    }
  };

  // 🔹 Cambio area con auto-discovery attivo solo alla prima selezione
  _onAreaChange(v) {
    const area = v || '';
    const cfg = this.config || {};
    const ad = { ...(cfg.auto_discovery_sections || {}) };

    // Attiva auto-discovery solo quando l'area passa da vuota a valorizzata
    if (area && !cfg.area) {
      ad.camera = true;
      ad.climate = true;
      ad.sensor = true;
      ad.mushroom = true;
      ad.subbutton = true;
      ad.presence = true;
    }
    const next = {
      ...cfg,
      area,
      area_id: area,
      auto_discovery_sections: ad
    };

    if (area) {
      next.name = area.toUpperCase();
    }

    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: next },
      bubbles: true,
      composed: true
    }));
  }
  _presenceCandidatesNoArea(hass, filters = [], selected) {
    if (!hass?.states) return [];
    const allowed = new Set([
      'person','device_tracker','binary_sensor','light','switch',
      'media_player','fan','humidifier','lock','input_boolean','scene'
    ]);
    let ids = Object.keys(hass.states).filter((id) => allowed.has(id.split('.')[0]));
    const wants = new Set(filters || []);
    if (wants.size) {
      ids = ids.filter((id) => {
        const [domain] = id.split('.');
        if (domain !== 'binary_sensor') return true;
        const dc = hass.states[id]?.attributes?.device_class || '';
        return (wants.has('motion') && dc === 'motion') ||
               (wants.has('occupancy') && dc === 'occupancy') ||
               (wants.has('presence') && dc === 'presence');
      });
    }
    if (selected && !ids.includes(selected)) ids.unshift(selected);
    return ids;
  }

  render() {
    const cfg      = this.config;
    const t = (key, vars, fallback) => localize(this.hass, key, vars, fallback);
    const autoDisc = cfg.auto_discovery_sections?.presence ?? false;
    const area     = cfg.area ?? '';
    const name     = cfg.name ?? '';
    const icon     = cfg.icon ?? '';
    const presEntity = cfg.entities?.presence?.entity ?? '';
    const presFilters = this.activeFilters.length
      ? this.activeFilters
      : (cfg.presence_filters ?? [...PRESENCE_CATS]);
    const filterOptions = PRESENCE_CATS.map(cat => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));

    const presCandidates = (autoDisc)
      ? candidatesFor(this.hass, this.config, 'presence', presFilters)
      : this._presenceCandidatesNoArea(this.hass, presFilters, presEntity);


    const actions = ['toggle','more-info','navigate','url','call-service','none'];
    const actionLabels = {
      toggle: t('actions.toggle'),
      'more-info': t('actions.more-info'),
      navigate: t('actions.navigate'),
      url: t('actions.url'),
      'call-service': t('actions.call-service'),
      none: t('actions.none'),
    };
    const tapCfg  = this.config?.tap_action  || {};
    const holdCfg = this.config?.hold_action || {};

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">${t('panel.room.title')}</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._fire('auto_discovery_sections.presence', e.target.checked)}
          />
          <label>${t('panel.room.auto_discover_presence')}</label>
        </div>

        <div class="input-group">
          <label>${t('panel.room.area')}</label>
          <ha-area-picker
            .hass=${this.hass}
            .value=${area}
            @value-changed=${e => this._onAreaChange(e.detail.value)}
          ></ha-area-picker>
        </div>

        <div class="input-group">
          <label>${t('panel.room.name')}</label>
          <input
            type="text"
            .value=${name}
            @input=${e => this._fire('name', e.target.value)}
          />
        </div>

        <!-- 🎭 Icon & Presence -->
        <div class="mini-pill">
          <div class="mini-pill-header">${t('panel.room.icon_presence')}</div>
          <div class="mini-pill-content">
            <!-- Room Icon -->
            <div class="input-group">
              <label>${t('panel.room.icon')}</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${icon}
                allow-custom-icon
                @opened=${() => IconCache.warm(this.hass)}
                @value-changed=${e => this._fire('icon', e.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Filter categories -->
            <div class="input-group">
              <label>${t('panel.room.filter_categories')}</label>
              <ha-selector
                .hass=${this.hass}
                .value=${presFilters}
                .selector=${{ select: { multiple: true, mode: 'box', options: filterOptions } }}
                @value-changed=${e => this._fire('presence_filters', e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Presence entity -->
            <div class="input-group">
              <label>${t('panel.room.presence_id')}</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${presEntity}
                .includeEntities=${presCandidates}
                allow-custom-entity
                @value-changed=${e => this._onPresenceEntityChange(e.detail.value)}
              ></ha-entity-picker>
            </div>

            <!-- Actions -->
            <div class="input-group">
              <label>${t('panel.room.tap_action')}</label>
              <div class="pill-group">
                ${actions.map(a => html`
                  <button
                    class="pill-button ${tapCfg.action === a ? 'active' : ''}"
                    @click=${() => this._fire('tap_action.action', a)}
                  >${actionLabels[a]}</button>
                `)}
              </div>
              ${tapCfg.action === 'navigate' ? html`
                <input type="text" placeholder=${t('panel.room.path')}
                  .value=${tapCfg.navigation_path || ''}
                  @input=${e => this._fire('tap_action.navigation_path', e.target.value)}
                />
              ` : ''}
              ${tapCfg.action === 'url' ? html`
                <input type="text" placeholder=${t('panel.room.path')}
                  .value=${tapCfg.url_path || ''}
                  @input=${e => this._fire('tap_action.url_path', e.target.value)}
                />
              ` : ''}
              ${tapCfg.action === 'call-service' ? html`
                <input type="text" placeholder=${t('panel.room.service')}
                  .value=${tapCfg.service || ''}
                  @input=${e => this._fire('tap_action.service', e.target.value)}
                />
                <input type="text" placeholder=${t('panel.room.service_data')}
                  .value=${tapCfg.service_data ? JSON.stringify(tapCfg.service_data) : ''}
                  @input=${e => {
                    let v = e.target.value;
                    try { v = v ? JSON.parse(v) : undefined; } catch { v = undefined; }
                    this._fire('tap_action.service_data', v);
                  }}
                />
              ` : ''}
            </div>

            <div class="input-group">
              <label>${t('panel.room.hold_action')}</label>
              <div class="pill-group">
                ${actions.map(a => html`
                  <button
                    class="pill-button ${holdCfg.action === a ? 'active' : ''}"
                    @click=${() => this._fire('hold_action.action', a)}
                  >${actionLabels[a]}</button>
                `)}
              </div>
              ${holdCfg.action === 'navigate' ? html`
                <input type="text" placeholder=${t('panel.room.path')}
                  .value=${holdCfg.navigation_path || ''}
                  @input=${e => this._fire('hold_action.navigation_path', e.target.value)}
                />
              ` : ''}
              ${holdCfg.action === 'url' ? html`
                <input type="text" placeholder=${t('panel.room.path')}
                  .value=${holdCfg.url_path || ''}
                  @input=${e => this._fire('hold_action.url_path', e.target.value)}
                />
              ` : ''}
              ${holdCfg.action === 'call-service' ? html`
                <input type="text" placeholder=${t('panel.room.service_with_example')}
                  .value=${holdCfg.service || ''}
                  @input=${e => this._fire('hold_action.service', e.target.value)}
                />
                <input type="text" placeholder=${t('panel.room.service_data')}
                  .value=${holdCfg.service_data ? JSON.stringify(holdCfg.service_data) : ''}
                  @input=${e => {
                    let v = e.target.value;
                    try { v = v ? JSON.parse(v) : undefined; } catch { v = undefined; }
                    this._fire('hold_action.service_data', v);
                  }}
                />
              ` : ''}
            </div>
          </div>
        </div>

        <!-- 📐 Layout -->
        <div class="input-group">
          <label>${t('panel.room.layout')}</label>
          <div class="toggle-group">

            <button
              class="toggle-btn ${this.layout === 'tall' ? 'active' : ''}"
              @click=${() => this._onLayoutClick('tall')}
            >
              <ha-icon icon="mdi:cellphone"></ha-icon>
              <span>${t('panel.room.layout_tall')}</span>
            </button>
            <button
              class="toggle-btn ${this.layout === 'wide' ? 'active' : ''}"
              @click=${() => this._onLayoutClick('wide')}
            >
              <ha-icon icon="mdi:tablet"></ha-icon>
              <span>${t('panel.room.layout_wide')}</span>
            </button>
          </div>
        </div>

        <button class="reset-button"
          @click=${() => this.dispatchEvent(new CustomEvent('__panel_cmd__', {
            detail: { cmd: 'reset', section: 'room' },
            bubbles: true, composed: true,
          }))}>
          ${t('panel.room.reset')}
        </button>
      </ha-expansion-panel>
    `;
  }
}

if (!customElements.get('room-panel')) {
  customElements.define('room-panel', RoomPanel);
}
