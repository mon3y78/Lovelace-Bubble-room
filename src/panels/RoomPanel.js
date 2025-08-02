// src/panels/RoomPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover }      from '../helpers/auto-discovery.js';
import { candidatesFor }          from '../helpers/entity-filters.js';

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
    _expanded:     { type: Boolean, state: true },
    activeFilters: { type: Array,  state: true },
    layout:        { type: String },       // 'wide' | 'tall'
  };

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      border: none;
      --glass-bg: rgba(73,164,255,0.38);
      --glass-shadow: 0 2px 24px rgba(50,180,255,0.25);
      --glass-sheen: linear-gradient(
        120deg,
        rgba(255,255,255,0.26),
        rgba(255,255,255,0.11) 70%,
        transparent 100%
      );
      background: var(--glass-bg);
      box-shadow: var(--glass-shadow);
    }
    .glass-panel::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen);
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0 18px;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
    }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin-bottom: 18px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      padding: 15px 22px;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      color: #55afff;
    }
    .mini-pill-content {
      padding: 15px 22px;
    }
    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 18px;
      margin-bottom: 13px;
      padding: 14px 18px 10px;
    }
    .input-group label {
      display: block;
      font-size: 1.13rem;
      font-weight: 700;
      color: #55afff;
      margin-bottom: 6px;
    }
    ha-selector,
    ha-icon-picker {
      display: block;
      width: 100%;
      min-height: 56px;
      box-sizing: border-box;
    }
    ha-selector::part(combobox) {
      min-height: 56px;
    }
    .reset-button {
      border: 2px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 12px;
      padding: 8px 16px;
      background: transparent;
      cursor: pointer;
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
    }
    .pill-button.active {
      border-color: #55afff;
      color: #55afff;
    }
    vaadin-combo-box-overlay,
    vaadin-combo-box-item,
    vaadin-combo-box-item::part(content) {
      color: var(--primary-text-color, #eaeef8) !important;
    }

    /* Layout toggle */
    .layout-toggle {
      display: flex;
      align-items: center;
      padding: 0 18px 12px;
    }
    .layout-toggle label {
      font-size: 1.13rem;
      font-weight: 700;
      color: #55afff;
    }
    .toggle-group {
      display: flex;
      gap: 8px;
      margin-left: 12px;
    }
    .toggle-btn {
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.24);
      border-radius: 6px;
      padding: 6px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    .toggle-btn ha-icon {
      --mdc-icon-size: 24px;
      color: var(--primary-text-color);
    }
    .toggle-btn.active {
      background: #55afff;
      border-color: #55afff;
    }
    .toggle-btn.active ha-icon {
      color: white;
    }
    .toggle-btn:hover {
      background: rgba(255,255,255,0.18);
    }
  `;

  constructor() {
    super();
    this.hass          = {};
    this.config        = {};
    this._expanded     = false;
    this.activeFilters = [];
    this.layout        = 'wide';
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      maybeAutoDiscover(this.hass, this.config, 'area');
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.presence');
      if (changed.has('config') && Array.isArray(this.config.presence_filters)) {
        this.activeFilters = [...this.config.presence_filters];
      }
      const cfgLayout = this.config.layout;
      if (cfgLayout && cfgLayout !== this.layout) {
        this.layout = cfgLayout;
      }
    }
  }

  _onLayoutClick(mode) {
    this.layout = mode;
    this._fire('layout', mode);
  }

  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const cfg       = this.config;
    const autoDisc  = cfg.auto_discovery_sections?.presence ?? false;
    const area      = cfg.area              ?? '';
    const name      = cfg.name              ?? '';
    const icon      = cfg.icon              ?? '';
    const presEntity= cfg.entities?.presence?.entity
                        ?? cfg.presence_entity
                        ?? '';
    const presFilters = this.activeFilters.length
      ? this.activeFilters
      : (cfg.presence_filters ?? [...PRESENCE_CATS]);
    const filterOptions = PRESENCE_CATS.map(cat => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));
    const presCandidates = candidatesFor(
      this.hass, this.config, 'presence', presFilters
    );

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e => this._expanded = e.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>

        <!-- Auto-discover Presence -->
        <div class="input-group">
          <label style="display:flex;align-items:center;gap:8px">
            <input
              type="checkbox"
              .checked=${autoDisc}
              @change=${e => this._fire('auto_discovery_sections.presence', e.target.checked)}
            />🔍 Auto-discover Presence
          </label>
        </div>

        <!-- Room name & Area -->
        <div class="mini-pill">
          <div class="mini-pill-header">Room</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room name:</label>
              <input
                type="text"
                .value=${name}
                @input=${e => this._fire('name', e.target.value)}
              />
            </div>
            <div class="input-group">
              <label>Area:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${area}
                .selector=${{ area: {} }}
                @value-changed=${e => {
                  const v = e.detail.value;
                  this._fire('area', v);
                  if (v) this._fire('auto_discovery_sections.presence', true);
                }}
              ></ha-selector>
            </div>

            <!-- Layout toggle -->
            <div class="input-group layout-toggle">
              <label>Layout:</label>
              <div class="toggle-group">
                <button
                  class="toggle-btn ${this.layout === 'wide' ? 'active' : ''}"
                  @click=${() => this._onLayoutClick('wide')}
                  title="Largo"
                >
                  <ha-icon icon="mdi:tablet-landscape"></ha-icon>
                </button>
                <button
                  class="toggle-btn ${this.layout === 'tall' ? 'active' : ''}"
                  @click=${() => this._onLayoutClick('tall')}
                  title="Stretto"
                >
                  <ha-icon icon="mdi:tablet-portrait"></ha-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Icon & Presence -->
        <div class="mini-pill">
          <div class="mini-pill-header">Icon & Presence</div>
          <div class="mini-pill-content">

            <!-- Icon -->
            <div class="input-group">
              <label>Room Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${icon}
                allow-custom-icon
                @value-changed=${e => this._fire('icon', e.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Filter categories -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${presFilters}
                .selector=${{
                  select: {
                    multiple: true,
                    mode: 'box',
                    options: filterOptions,
                  }
                }}
                @value-changed=${e => this._fire('presence_filters', e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Presence entity -->
            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${presEntity}
                .selector=${{
                  entity: {
                    include_entities: presCandidates,
                    multiple: false,
                  }
                }}
                allow-custom-entity
                @value-changed=${e => this._fire('entities.presence.entity', e.detail.value)}
              ></ha-selector>
            </div>

            ${this._renderActions('tap')}
            ${this._renderActions('hold')}

          </div>
        </div>

        <!-- Reset -->
        <div style="text-align:center;margin-top:1.2em;">
          <button
            class="reset-button"
            @click=${() => this._fire('__panel_cmd__', { cmd: 'reset', section: 'room' })}
          >🧹 Reset Room</button>
        </div>

      </ha-expansion-panel>
    `;
  }

  _renderActions(type) {
    const cfg     = this.config?.[`${type}_action`] || {};
    const actions = ['toggle','more-info','navigate','call-service','none'];
    return html`
      <div class="input-group">
        <label>${type === 'tap' ? 'Tap Action' : 'Hold Action'}</label>
        <div class="pill-group">
          ${actions.map(a => html`
            <paper-button
              class="pill-button ${cfg.action === a ? 'active' : ''}"
              @click=${() => this._fire(`${type}_action.action`, a)}
            >${a}</paper-button>
          `)}
        </div>

        ${cfg.action === 'navigate' ? html`
          <input
            type="text"
            placeholder="Path"
            .value=${cfg.navigation_path || ''}
            @input=${e => this._fire(`${type}_action.navigation_path`, e.target.value)}
          />
        ` : ''}

        ${cfg.action === 'call-service' ? html`
          <input
            type="text"
            placeholder="service: domain.service_name"
            .value=${cfg.service || ''}
            @input=${e => this._fire(`${type}_action.service`, e.target.value)}
          />
          <input
            type="text"
            placeholder="service_data (JSON)"
            .value=${cfg.service_data ? JSON.stringify(cfg.service_data) : ''}
            @input=${e => {
              let v = e.target.value;
              try { v = v ? JSON.parse(v) : undefined; } catch { v = undefined; }
              this._fire(`${type}_action.service_data`, v);
            }}
          />
        ` : ''}
      </div>
    `;
  }
}

customElements.define('room-panel', RoomPanel);
