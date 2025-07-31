import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor } from '../helpers/entity-filters.js';
import '../helpers/device-class-chips.js';

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
      maybeAutoDiscover(this.hass, this.config, 'area');
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.presence');
    }
  }

  static styles = css`/* …stili invariati… */`;

  render() {
    const cfg   = this.config;
    const area  = cfg.area || '';
    const name  = cfg.name || '';
    const icon  = cfg.icon || '';

    const pres  = cfg.entities?.presence?.entity || cfg.presence_entity || '';
    const presCandidates = candidatesFor(this.hass, this.config, 'presence');

    const sensorCls = cfg.sensor_classes ?? [];
    const alertCls  = cfg.alert_classes  ?? [];

    const allowedSensorDC = ['temperature','humidity','pressure','battery'];
    const allowedAlertDC  = ['occupancy','motion','presence'];

    const ad = cfg.auto_discovery_sections?.presence || false;

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
              .checked=${ad}
              @change=${e =>
                this._emit('auto_discovery_sections.presence', e.target.checked)}
            />
            <span>🔍 Auto-discover Presence</span>
          </label>
        </div>

        <!-- Room -->
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

        <!-- Icon & Presence -->
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
              <ha-selector
                .hass=${this.hass}
                .value=${pres}
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

        <!-- Sensor classes -->
        <div class="mini-pill">
          <div class="mini-pill-header">Categorie di sensori</div>
          <div class="mini-pill-content">
            <device-class-chips
              .value=${sensorCls}
              .allowed=${allowedSensorDC}
              @value-changed=${e =>
                this._fire('sensor_classes', e.detail.value)}
            ></device-class-chips>
          </div>
        </div>

        <!-- Alert classes -->
        <div class="mini-pill">
          <div class="mini-pill-header">Categorie di avviso</div>
          <div class="mini-pill-content">
            <device-class-chips
              .value=${alertCls}
              .allowed=${allowedAlertDC}
              @value-changed=${e =>
                this._fire('alert_classes', e.detail.value)}
            ></device-class-chips>
          </div>
        </div>

        <!-- Reset -->
        <div style="text-align:center;margin-top:1.2em;">
          <button class="reset-button" @click=${this._resetRoom}>
            🧹 Reset Room
          </button>
        </div>
      </ha-expansion-panel>
    `;
  }

  /* area change → auto-discover on */
  _onAreaChanged = (e) => {
    const v = e.detail.value;
    this._fire('area', v);
    if (v) this._emit('auto_discovery_sections.presence', true);
  };

  _renderActions(type) { /* …come prima… */ }

  _resetRoom() {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: 'room' } },
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