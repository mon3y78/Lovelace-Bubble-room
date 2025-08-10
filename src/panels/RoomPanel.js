// src/panels/RoomPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor }     from '../helpers/entity-filters.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js'; // path corretto

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
    layout:        { type: String },  // 'wide' or 'tall'
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

    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 18px;
      margin: 0 16px 13px;
      padding: 14px 18px 10px;
    }
    .input-group label {
      display: block;
      font-size: 1.13rem;
      font-weight: 700;
      color: #55afff;
      margin-bottom: 8px;
    }
    .input-group input[type="text"],
    .input-group ha-selector,
    .input-group ha-icon-picker {
      width: 100%;
      box-sizing: border-box;
      min-height: 56px;
    }
    .input-group ha-selector::part(combobox) {
      min-height: 56px;
    }

    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin: 0 16px 18px;
      overflow: hidden;
    }
    .mini-pill-header {
      padding: 15px 22px;
      font-size: 1.15rem;
      font-weight: 800;
      color: #55afff;
    }
    .mini-pill-content {
      padding: 15px 22px;
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

    /* RESET — allineato a CameraPanel */
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
    }

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

    /* AUTODISCOVER — pill orizzontale identica a CameraPanel */
    .input-group.autodiscover {
      margin: 0 16px 13px;
      padding: 14px 18px 10px;
      background: rgba(44, 70, 100, 0.23);
      border: 1.5px solid rgba(255, 255, 255, 0.13);
      border-radius: 18px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .input-group.autodiscover label {
      margin: 0;               /* niente margine bottom, è inline con la checkbox */
      display: inline-block;   /* stessa resa di CameraPanel */
      color: #55afff;
      font-weight: 700;
      font-size: 1.13rem;
    }
  `;

  constructor() {
    super();
    this.hass          = {};
    this.config        = {};
    this._expanded     = false;
    this.activeFilters = [];
    this.layout        = 'wide';

    // guardia anti-loop durante la sync da config/hass
    this._syncingFromConfig = false;
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      this._syncingFromConfig = true;

      maybeAutoDiscover(this.hass, this.config, 'area');
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.presence');

      if (changed.has('config') && Array.isArray(this.config.presence_filters)) {
        this.activeFilters = [...this.config.presence_filters];
      }

      const cfgLayout = this.config.layout;
      if (cfgLayout && cfgLayout !== this.layout) {
        this.layout = cfgLayout;
      }

      // ⛔️ NIENTE auto-icona qui: la gestiamo SOLO su scelta entità (vedi _onPresenceEntityChange)

      this._syncingFromConfig = false;
    }
  }

  _onLayoutClick(mode) {
    this.layout = mode;
    // 1) aggiorna il layout
    this._fire('layout', mode);
    // 2) invia i grid_options coerenti con la scelta
    const grid = mode === 'tall' ? { columns: 6, rows: 4 } : { columns: 12, rows: 4 };
    this._fire('grid_options', grid);
  }
  
  _fire(prop, val) {
    if (this._syncingFromConfig) return; // blocca eventi durante la sync
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }

  // auto-icona immediata quando cambi l’entità presence
  _onPresenceEntityChange = (ent) => {
    this._fire('entities.presence.entity', ent);

    // imposta icona solo se vuota (rispetta eventuale scelta manuale)
    const currentIcon = this.config?.icon || '';
    if (ent && !currentIcon) {
      const st = this.hass?.states?.[ent];
      const autoIcon = st?.attributes?.icon || resolveEntityIcon(ent, this.hass);
      if (autoIcon) this._fire('icon', autoIcon);
    }
  };

  render() {
    const cfg      = this.config;
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
    const presCandidates = candidatesFor(
      this.hass, this.config, 'presence', presFilters
    );

    const actions = ['toggle','more-info','navigate','call-service','none'];
    const tapCfg  = this.config?.tap_action  || {};
    const holdCfg = this.config?.hold_action || {};

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e => this._expanded = e.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>
      
        <!-- Auto‑discover (identico a CameraPanel: checkbox + label in linea) -->
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._fire('auto_discovery_sections.presence', e.target.checked)}
          />
          <label>🪄 Auto‑discover Presence</label>
        </div>
      
        <!-- 🏷️ Area -->
        <div class="input-group">
          <label>🏷️ Area:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${area}
            .selector=${{ area: {} }}
            @value-changed=${e => {
              const v = e.detail.value;
              this._fire('area', v);
              if (v) {
                this._fire('name', v.toUpperCase());
                this._fire('auto_discovery_sections.presence', true);
              }
            }}
          ></ha-selector>
        </div>
      
        <!-- 🏠 Room name -->
        <div class="input-group">
          <label>🏠 Room name:</label>
          <input
            type="text"
            .value=${name}
            @input=${e => this._fire('name', e.target.value)}
          />
        </div>
      
        <!-- 🎭 Icon & Presence -->
        <div class="mini-pill">
          <div class="mini-pill-header">🎭 Icon & Presence</div>
          <div class="mini-pill-content">
            <!-- Room Icon -->
            <div class="input-group">
              <label>Icon:</label>
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
                .selector=${{ select: { multiple: true, mode: 'box', options: filterOptions } }}
                @value-changed=${e => this._fire('presence_filters', e.detail.value)}
              ></ha-selector>
            </div>
      
            <!-- Presence entity -->
            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${presEntity}
                .selector=${{ entity: { include_entities: presCandidates, multiple: false } }}
                allow-custom-entity
                @value-changed=${e => this._onPresenceEntityChange(e.detail.value)}
              ></ha-selector>
            </div>
      
            <!-- Actions -->
            <div class="input-group">
              <label>Tap Action</label>
              <div class="pill-group">
                ${actions.map(a => html`
                  <button
                    class="pill-button ${tapCfg.action === a ? 'active' : ''}"
                    @click=${() => this._fire('tap_action.action', a)}
                  >${a}</button>
                `)}
              </div>
              ${tapCfg.action === 'navigate' ? html`
                <input type="text" placeholder="Path"
                  .value=${tapCfg.navigation_path || ''}
                  @input=${e => this._fire('tap_action.navigation_path', e.target.value)}
                />
              ` : ''}
              ${tapCfg.action === 'call-service' ? html`
                <input type="text" placeholder="service (es. light.turn_on)"
                  .value=${tapCfg.service || ''}
                  @input=${e => this._fire('tap_action.service', e.target.value)}
                />
                <input type="text" placeholder='service_data (JSON)'
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
              <label>Hold Action</label>
              <div class="pill-group">
                ${actions.map(a => html`
                  <button
                    class="pill-button ${holdCfg.action === a ? 'active' : ''}"
                    @click=${() => this._fire('hold_action.action', a)}
                  >${a}</button>
                `)}
              </div>
              ${holdCfg.action === 'navigate' ? html`
                <input type="text" placeholder="Path"
                  .value=${holdCfg.navigation_path || ''}
                  @input=${e => this._fire('hold_action.navigation_path', e.target.value)}
                />
              ` : ''}
              ${holdCfg.action === 'call-service' ? html`
                <input type="text" placeholder="service (es. light.turn_on)"
                  .value=${holdCfg.service || ''}
                  @input=${e => this._fire('hold_action.service', e.target.value)}
                />
                <input type="text" placeholder='service_data (JSON)'
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
          <label>📐 Layout:</label>
          <div class="toggle-group">

            <button
              class="toggle-btn ${this.layout === 'tall' ? 'active' : ''}"
              @click=${() => this._onLayoutClick('tall')}
            >
              <ha-icon icon="mdi:cellphone"></ha-icon>
              <span>Stretto</span>
            </button>
            <button
              class="toggle-btn ${this.layout === 'wide' ? 'active' : ''}"
              @click=${() => this._onLayoutClick('wide')}
            >
              <ha-icon icon="mdi:tablet"></ha-icon> 
              <span>Largo</span> 
            </button>
          </div>
        </div>
      
        <!-- Reset (identico a CameraPanel) -->
        <button class="reset-button"
          @click=${() => this._fire('__panel_cmd__', { cmd: 'reset', section: 'room' })}>
          🧹 Reset Room
        </button>
      </ha-expansion-panel>
    `;
  }
}

customElements.define('room-panel', RoomPanel);