import { LitElement, html, css } from 'lit';

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

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      border: none;
      z-index: 0;
      --glass-bg: rgba(73,164,255,0.38);
      --glass-shadow: 0 2px 24px 0 rgba(50,180,255,0.25);
      --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.26),rgba(255,255,255,0.11) 70%,transparent 100%);
      background: var(--glass-bg);
      box-shadow: var(--glass-shadow);
    }
    .glass-panel::after {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      background: var(--glass-sheen); pointer-events: none; z-index:0;
    }
    .glass-header {
      position: relative; z-index: 1; background: none!important; box-shadow:none!important;
      padding: 22px 0 18px; margin:0; text-align:center;
      font-size:1.2rem; font-weight:700; color:#fff;
    }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px 0 rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin-bottom:18px;
      overflow:hidden;
    }
    .mini-pill-header {
      display:flex; align-items:center; padding:15px 22px;
      font-size:1.09em; font-family:'Inter',sans-serif; font-weight:800;
      color:#55afff; cursor:pointer; user-select:none; position:relative; z-index:1;
    }
    .mini-pill-header .chevron { margin-left:auto; font-size:1.22em; opacity:0.64; transition:transform 0.18s; }
    .mini-pill.expanded .mini-pill-header .chevron { transform: rotate(90deg); }
    .mini-pill-content {
      padding:15px 22px; background:transparent; position:relative; z-index:1;
    }
    .autodiscover-box {
      margin:0 auto 18px; padding:18px 0; display:flex; align-items:center; justify-content:center;
      font-size:1.17rem; color:#fff; font-weight:700; letter-spacing:0.02em; cursor:pointer;
      border:2.5px solid #FFD600; box-shadow:0 2px 24px 0 #FFD60033;
      border-radius:24px; backdrop-filter: blur(7px) saturate(1.2);
    }
    .input-group {
      background: rgba(44,70,100,0.23);
      border:1.5px solid rgba(255,255,255,0.13);
      box-shadow:0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius:18px; margin-bottom:13px; padding:14px 18px 10px;
    }
    label { display:block; font-size:1.13rem; font-weight:700; color:#55afff; margin-bottom:6px; }
    input[type="text"] {
      width:100%; border:1px solid #444; border-radius:6px; padding:8px;
      background:#202020; color:#f1f1f1; font-size:0.97rem;
    }
  `;

  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded="${this._expanded}"
        @expanded-changed="${e => this._expanded = e.detail.expanded}"
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>
        <div class="mini-pill expanded">
          <div class="mini-pill-header">Room</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room name:</label>
              <input type="text" .value="${this.config.name||''}" @input="${this._updateName}">
            </div>
            <div class="input-group">
              <label>Area:</label>
              <ha-area-picker
                .hass="${this.hass}"
                .value="${this.config.area||''}"
                @value-changed="${this._updateArea}"
              ></ha-area-picker>
            </div>
          </div>
        </div>

        <div class="mini-pill expanded">
          <div class="mini-pill-header">Icon</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room Icon:</label>
              <ha-icon-picker
                .hass="${this.hass}"
                .value="${this.config.icon||''}"
                allow-custom-icon
                @value-changed="${this._updateIcon}"
              ></ha-icon-picker>
            </div>
            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-entity-picker
                .hass="${this.hass}"
                .value="${this.config.entities?.presence?.entity||''}"
                @value-changed="${e=>this._updateEntity('presence',e.detail.value)}"
              ></ha-entity-picker>
            </div>
            <!-- tap/hold actions -->
            ${this._renderActions('tap')}
            ${this._renderActions('hold')}
          </div>
        </div>

        <div style="text-align:center; margin-top:1.2em;">
          <button class="reset-button" @click="${this._reset}">🧹 Reset Room</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _updateName(e) {
    this._fire('name', e.target.value);
  }
  _updateArea(e) {
    this._fire('area', e.detail.value);
  }
  _updateIcon(e) {
    this._fire('icon', e.detail.value);
  }
  _updateEntity(key, val) {
    this._fire(`entities.${key}.entity`, val);
  }
  _renderActions(type) {
    const cfg = this.config[`${type}_action`] || {};
    const labels = { tap: 'Tap', hold: 'Hold' };
    return html`
      <div class="input-group">
        <label>${labels[type]} Action:</label>
        <!-- replica esattamente il _renderTapHoldAction del sorgente -->
        ...qui copi esattamente il blocco di codice di ${type} come in originale...
      </div>
    `;
  }
  _reset() {
    this._fire('resetRoom', true);
  }
  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val }, bubbles: true, composed: true
    }));
  }
}

customElements.define('room-panel', RoomPanel);