// src/panels/RoomPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover }       from '../helpers/auto-discovery.js';
import { candidatesFor }           from '../helpers/entity-filters.js';
import { state } from 'lit/decorators.js';


const PRESENCE_CATS = [
  'presence',   // binary_sensor.device_class = presence
  'motion',     // binary_sensor.device_class = motion
  'occupancy',  // binary_sensor.device_class = occupancy
  'light',      // dominio light.*
  'switch',     // dominio switch.*
  'fan',        // dominio fan.*
];

export class RoomPanel extends LitElement {
  static properties = {
    hass:      { type: Object },
    config:    { type: Object },
    _expanded: { type: Boolean },
  };

  constructor() {
    super();
    this.hass      = {};
    this.config    = {};
    this._expanded = false;
    if (!customElements.get('md-focus-ring')) {
      import('@material/web/chips/chip-set.js');
      import('@material/web/chips/filter-chip.js');
    }
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      maybeAutoDiscover(this.hass, this.config, 'area');
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.presence');
    }
  }

  static styles = css`
    :host { display: block; }
    --md-filter-chip-container-shape: 16px;

    /* Glass panel */
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      border: none;
      --glass-bg: rgba(73,164,255,0.38);
      --glass-shadow: 0 2px 24px 0 rgba(50,180,255,0.25);
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
      position: relative;
      z-index: 1;
      padding: 22px 0 18px;
      margin: 0;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
    }

    /* Mini-pill */
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px 0 rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin-bottom: 18px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      padding: 15px 22px;
      font-size: 1.09em;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      color: #55afff;
      user-select: none;
    }
    .mini-pill-content {
      padding: 15px 22px;
    }

    /* Input group */
    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius: 18px;
      margin-bottom: 13px;
      padding: 14px 18px 10px;
    }
    .ad-top {
      margin: 0 16px 14px;
    }
    label {
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

    /* Reset button */
    .reset-button {
      border: 2px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 12px;
      padding: 8px 16px;
      background: transparent;
      cursor: pointer;
    }

    /* Tap/Hold action pills */
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

    /* Vaadin overlay fix */
    vaadin-combo-box-overlay,
    vaadin-combo-box-item,
    vaadin-combo-box-item::part(content) {
      color: var(--primary-text-color, #eaeef8) !important;
    }
  `;

  export class RoomPanel extends LitElement {
    static styles = css`
      /* …override variabili… */
      --md-filter-chip-container-shape: 16px;
    `;
  
    /** array di filtri attivi (es. presence_id) */
    @state()
    activeFilters = [];
    /**
   * Aggiunge un filtro (se non già presente)
   * @param {string} filter
   */
  addFilter(filter) {
    if (!this.activeFilters.includes(filter)) {
      this.activeFilters = [...this.activeFilters, filter];
    }
  }

  /**
   * Rimuove un filtro esistente
   * @param {string} filter
   */
  removeFilter(filter) {
    this.activeFilters = this.activeFilters.filter(f => f !== filter);
  }

  render() {
    const cfg           = this.config;
    const area          = cfg.area || '';
    const name          = cfg.name || '';
    const icon          = cfg.icon || '';
    const presValue     = cfg.entities?.presence?.entity || cfg.presence_entity || '';
    const autoDisc      = cfg.auto_discovery_sections?.presence ?? false;
    const presFilters   = cfg.presence_filters ?? [...PRESENCE_CATS];
    const presCandidates = candidatesFor(this.hass, this.config, 'presence', presFilters);

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>

        <!-- Auto-discover -->
        <div class="input-group ad-top">
          <label style="display:flex;align-items:center;gap:8px;margin:0;">
            <input
              type="checkbox"
              .checked=${autoDisc}
              @change=${e =>
                this._emit('auto_discovery_sections.presence', e.target.checked)}
            />
            <span>🔍 Auto-discover Presence</span>
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
                @value-changed=${this._onAreaChanged}
              ></ha-selector>
            </div>
          </div>
        </div>

        <!-- Icon & Presence + Chips -->
        <div class="mini-pill">
          <div class="mini-pill-header">Icon & Presence</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${icon}
                allow-custom-icon
                @value-changed=${e => this._fire('icon', e.detail.value)}
              ></ha-icon-picker>
            </div>

            <div class="input-group">
              <label>Filtra per categoria:</label>
              <filter-chips
                .value=${presFilters}
                .allowed=${PRESENCE_CATS}
                @value-changed=${e => this._fire('presence_filters', e.detail.value)}
              ></filter-chips>
            </div>

            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${presValue}
                .selector=${{
                  entity: {
                    multiple: false,
                    include_entities: presCandidates
                  }
                }}
                allow-custom-entity
                @value-changed=${e =>
                  this._emit('entities.presence.entity', e.detail.value)}
              ></ha-selector>
            </div>

            ${this._renderActions('tap')}
            ${this._renderActions('hold')}
          </div>
        </div>

        <!-- Reset -->
        <div style="text-align:center;margin-top:1.2em;">
          <button class="reset-button" @click=${this._resetRoom}>🧹 Reset Room</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  // forza auto-discover quando cambia area
  _onAreaChanged = (e) => {
    const v = e.detail.value;
    this._fire('area', v);
    if (v) {
      this._emit('auto_discovery_sections.presence', true);
    }
  };

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
            placeholder='service_data (JSON)'
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

  _resetRoom() {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: 'room' }},
      bubbles: true, composed: true,
    }));
  }

  _emit(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val }, bubbles: true, composed: true,
    }));
  }
  _fire(prop, val) { this._emit(prop, val); }
}

customElements.define('room-panel', RoomPanel);
