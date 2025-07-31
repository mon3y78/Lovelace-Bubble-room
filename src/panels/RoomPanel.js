// src/panels/RoomPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor } from '../helpers/entity-filters.js';
import '../helpers/filter-chips.js'; // <filter-chips>

const PRESENCE_CATS = ['presence', 'motion', 'occupancy', 'light', 'switch', 'fan'];

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
  
  updated(changed) {
    /* tiene in sync auto-discover se arriva dall’esterno */
    if (changed.has('config') || changed.has('hass')) {
      maybeAutoDiscover(this.hass, this.config, 'area');
      maybeAutoDiscover(this.hass, this.config,
        'auto_discovery_sections.presence');
    }
  }
  
  /* ──────────────── STILI  */
  static styles = css`
    :host { display: block; }

    /* ── Pannello glass ───────────────── */
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

    /* ── mini-pill ─────────────────────── */
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
    .mini-pill-content { padding: 15px 22px; }

    /* ── Input group ───────────────────── */
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

    ha-selector, ha-icon-picker {
      display: block;
      width: 100%;
      min-height: 56px;
      box-sizing: border-box;
    }
    ha-selector::part(combobox) { min-height: 56px; }

    /* ── Reset ─────────────────────────── */
    .reset-button {
      border: 2px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 12px;
      padding: 8px 16px;
      background: transparent;
      cursor: pointer;
    }

    /* ── Tap / hold pills ──────────────── */
    .pill-group { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
    .pill-button {
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid #555;
      cursor: pointer;
    }
    .pill-button.active { border-color: #55afff; color: #55afff; }

    /* fix Vaadin overlay */
    vaadin-combo-box-overlay,
    vaadin-combo-box-item,
    vaadin-combo-box-item::part(content) {
      color: var(--primary-text-color, #eaeef8) !important;
    }
  `;

  static styles = css`/* …stili tagliati per brevità… */`;

  /* ────────────────────────── RENDER ────────────────────────── */
  render() {
    const cfg  = this.config;

    /* valori di stato */
    const area  = cfg.area  || '';
    const name  = cfg.name  || '';
    const icon  = cfg.icon  || '';

    /* chip selezionati (se mancano => tutti attivi) */
    const presCats = cfg.presence_filters ?? [...PRESENCE_CATS];

    /* lista entità filtrate */
    const presCandidates = candidatesFor(
      this.hass, this.config, 'presence', presCats,
    );

    const presValue = cfg.entities?.presence?.entity
                   || cfg.presence_entity
                   || '';

    const autoDisc  = cfg.auto_discovery_sections?.presence ?? false;

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>

        <!-- ── AUTO-DISCOVER ── -->
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

        <!-- ── ROOM / AREA ── -->
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

        <!-- ── ICON & PRESENCE ── -->
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

            <!-- CHIPS -->
            <div class="input-group">
              <label>Filtra per categoria:</label>
              <filter-chips
                .value=${presCats}
                .allowed=${PRESENCE_CATS}
                @value-changed=${e =>
                  this._fire('presence_filters', e.detail.value)}
              ></filter-chips>
            </div>

            <!-- SELECTOR ENTITÀ -->
            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${presValue}
                .selector=${{
                  entity: {
                    multiple: false,
                    include_entities: presCandidates,
                  },
                }}
                allow-custom-entity
                @value-changed=${e =>
                  this._emit('entities.presence.entity', e.detail.value)}
              ></ha-selector>
            </div>
          </div>
        </div>

        <!-- ── RESET ── -->
        <div style="text-align:center;margin-top:1.2em;">
          <button class="reset-button" @click=${this._resetRoom}>
            🧹 Reset Room
          </button>
        </div>
      </ha-expansion-panel>
    `;
  }

  /* quando l’utente cambia Area -> salva + forza auto-discover */
  _onAreaChanged = (e) => {
    const v = e.detail.value;
    this._fire('area', v);
    if (v) {
      this._emit('auto_discovery_sections.presence', true);
    }
  };

  /* ── helper azioni tap/hold (identico a prima) ── */
  _renderActions(type) { /* …uguale… */ }

  /* ── reset stanza ── */
  _resetRoom() {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: 'room' } },
      bubbles: true, composed: true,
    }));
  }

  /* shortcut per dispatch di panel-changed */
  _emit(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val }, bubbles: true, composed: true,
    }));
  }
  _fire(prop, val) { this._emit(prop, val); }
}

customElements.define('room-panel', RoomPanel);