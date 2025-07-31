// src/panels/RoomPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
// IMPORTS UI COMPONENTS DI HOME ASSISTANT
import "@home-assistant/frontend/src/components/ha-entity-picker";

export class RoomPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this._expanded = false;
  }

  updated(changedProps) {
    if (changedProps.has('config') || changedProps.has('hass')) {
      // trigger auto-discovery on area or toggle change
      maybeAutoDiscover(this.hass, this.config, 'area');
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.presence');
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
    .mini-pill {
      background: rgba(44, 70, 100, 0.23);
      border: 1.5px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 3px 22px 0 rgba(70, 120, 220, 0.13);
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
      cursor: pointer;
      user-select: none;
    }
    .mini-pill-content {
      padding: 15px 22px;
    }
    .input-group {
      background: rgba(44, 70, 100, 0.23);
      border: 1.5px solid rgba(255, 255, 255, 0.13);
      box-shadow: 0 2px 14px 0 rgba(70, 120, 220, 0.10);
      border-radius: 18px;
      margin-bottom: 13px;
      padding: 14px 18px 10px;
    }
    .ad-top { margin: 0 16px 14px; }
    label {
      display: block;
      font-size: 1.13rem;
      font-weight: 700;
      color: #55afff;
      margin-bottom: 6px;
    }
    /* rendiamo il picker HA sempre visibile */
    ha-entity-picker, ha-icon-picker, ha-area-picker {
      display: block;
      width: 100%;
      min-height: 56px;
      box-sizing: border-box;
    }
    ha-entity-picker::part(combobox) {
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

    /* fix globale overlay Vaadin */
    vaadin-combo-box-overlay,
    vaadin-combo-box-item,
    vaadin-combo-box-item::part(content) {
      color: var(--primary-text-color, #eaeef8) !important;
    }
  `;

  render() {
    const cfg = this.config;
    const area = cfg.area || '';
    const name = cfg.name || '';
    const icon = cfg.icon || '';
    const pres = cfg.entities?.presence?.entity || cfg.presence_entity || '';
    const ad = cfg.auto_discovery_sections?.presence || false;

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings 2</div>

        <!-- Auto-discover subito sotto il titolo -->
        <div class="input-group ad-top">
          <label style="display:flex;align-items:center;gap:8px;margin:0;">
            <input
              type="checkbox"
              .checked=${ad}
              @change=${e => this._emit('auto_discovery_sections.presence', e.target.checked)}
            />
            <span>🔍 Auto-discover Presence</span>
          </label>
        </div>

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
              <ha-area-picker
                .hass=${this.hass}
                .value=${area}
                @value-changed=${e => this._fire('area', e.detail.value)}
              ></ha-area-picker>
            </div>
          </div>
        </div>

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
              <label>Presence (ID):</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${pres}
                .includeEntities=${this._getPresenceCandidates()}
                allow-custom-entity
                @value-changed=${e => this._emit('entities.presence.entity', e.detail.value)}
              ></ha-entity-picker>
            </div>
            ${this._renderActions('tap')}
            ${this._renderActions('hold')}
          </div>
        </div>

        <div style="text-align:center;margin-top:1.2em;">
          <button class="reset-button" @click=${this._resetRoom}>
            🧹 Reset Room
          </button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderActions(type) {
    const cfg = this.config?.[`${type}_action`] || {};
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];
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

  _getPresenceCandidates() {
    const h = this.hass?.states || {};
    return Object.keys(h)
      .filter(id => ['person','device_tracker','binary_sensor'].includes(id.split('.')[0]))
      .filter(id => {
        if (id.split('.')[0] !== 'binary_sensor') return true;
        const dc = h[id]?.attributes?.device_class;
        return ['motion','occupancy','presence'].includes(dc);
      });
  }

  _resetRoom() {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: 'room' } },
      bubbles: true, composed: true,
    }));
  }

  _emit(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }
  _fire(prop, val) { this._emit(prop, val); }
}

customElements.define('room-panel', RoomPanel);
