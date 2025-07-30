// src/panels/RoomPanel.js
import { LitElement, html, css } from 'lit';

const DEBUG = !!window.__BUBBLE_DEBUG__;

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
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen);
      pointer-events: none;
      z-index: 0;
    }
    .glass-header {
      position: relative;
      z-index: 1;
      background: none !important;
      box-shadow: none !important;
      padding: 22px 0 18px;
      margin: 0;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
    }
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
      cursor: pointer;
      user-select: none;
      position: relative;
      z-index: 1;
    }
    .mini-pill-content {
      padding: 15px 22px;
      background: transparent;
      position: relative;
      z-index: 1;
    }
    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
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
    input, datalist {
      width: 100%;
      box-sizing: border-box;
    }
    input[type="text"] {
      border: 1px solid #444;
      border-radius: 6px;
      padding: 8px;
      background: #202020;
      color: #f1f1f1;
      font-size: 0.97rem;
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
  `;

  render() {
    const area = this.config?.area || '';
    const name = this.config?.name || '';
    const icon = this.config?.icon || '';
    const presenceValue =
      this.config?.entities?.presence?.entity || this.config?.presence_entity || '';
    const adPresence = this.config?.auto_discovery_sections?.presence || false;
    const candidates = this._getPresenceCandidates();

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings 2</div>

        <!-- Auto‑discovery Presence -->
        <div class="input-group ad-top">
          <label style="display:flex;align-items:center;gap:8px;margin:0;">
            <input
              type="checkbox"
              .checked=${adPresence}
              @change=${e => this._fire('auto_discovery_sections.presence', e.target.checked)}
            />
            <span>🪄 Auto‑discovery Presence</span>
          </label>
        </div>

        <!-- Room Name & Area -->
        <div class="mini-pill">
          <div class="mini-pill-header">Room</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room name:</label>
              <input type="text" .value=${name} @input=${e => this._fire('name', e.target.value)} />
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
              <!-- input + datalist -->
              <input
                list="presence-list"
                type="text"
                .value=${presenceValue}
                @input=${e => this._fire('entities.presence.entity', e.target.value)}
                placeholder="digita o seleziona…"
              />
              <datalist id="presence-list">
                ${candidates.map(id => html`<option value=${id}></option>`)}
              </datalist>
            </div>

            ${this._renderActions('tap')}
            ${this._renderActions('hold')}
          </div>
        </div>

        <div style="text-align:center; margin-top:1.2em;">
          <button class="reset-button" @click=${this._resetRoom}>🧹 Reset Room</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderActions(actionType) {
    const cfg = this.config?.[`${actionType}_action`] || {};
    const actions = ['toggle','more-info','navigate','call-service','none'];
    return html`
      <div class="input-group">
        <label>${actionType === 'tap' ? 'Tap Action' : 'Hold Action'}</label>
        <div class="pill-group">
          ${actions.map(a => html`
            <paper-button
              class="pill-button ${cfg.action===a?'active':''}"
              @click=${() => this._fire(`${actionType}_action.action`, a)}
            >${a}</paper-button>`)}
        </div>
        ${cfg.action==='navigate'? html`
          <input
            type="text" placeholder="Path"
            .value=${cfg.navigation_path||''}
            @input=${e=>this._fire(`${actionType}_action.navigation_path`,e.target.value)}>
        ` : ''}
        ${cfg.action==='call-service'? html`
          <input
            type="text" placeholder="domain.service"
            .value=${cfg.service||''}
            @input=${e=>this._fire(`${actionType}_action.service`,e.target.value)}>
          <input
            type="text" placeholder="service_data (JSON)"
            .value=${cfg.service_data?JSON.stringify(cfg.service_data):''}
            @input=${e=>{
              let v=e.target.value;
              try{v=v?JSON.parse(v):undefined;}catch{v=undefined;}
              this._fire(`${actionType}_action.service_data`,v);
            }}>
        ` : ''}
      </div>
    `;
  }

  _resetRoom() {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop:'__panel_cmd__', val:{cmd:'reset',section:'room'} },
      bubbles:true, composed:true }));
  }

  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val }, bubbles:true, composed:true }));
  }

  _getPresenceCandidates() {
    const hass = this.hass;
    if (!hass||!hass.states) return [];
    const allowed = new Set([
      'person','device_tracker','binary_sensor','light','switch',
      'media_player','fan','humidifier','lock','input_boolean','scene'
    ]);
    let ids = Object.keys(hass.states).filter(id=>allowed.has(id.split('.')[0]));
    // binary_sensor: solo motion/occupancy/presence
    ids = ids.filter(id=>{
      if(id.split('.')[0]!=='binary_sensor') return true;
      const dc = hass.states[id].attributes?.device_class;
      return ['motion','occupancy','presence'].includes(dc||'');
    });
    // filtra area
    const area = this.config?.area;
    if(area){
      const inA = ids.filter(id=>{
        const st=hass.states[id],a1=st.attributes?.area_id,a2=st.attributes?.area;
        return a1===area||a2===area;
      });
      if(inA.length) ids=inA;
    }
    // mantieni selezionata
    const sel = this.config?.entities?.presence?.entity||this.config?.presence_entity;
    if(sel&&!ids.includes(sel)) ids.push(sel);
    if(DEBUG) console.info('[RoomPanel][Presence]',ids);
    return ids;
  }
}

customElements.define('room-panel', RoomPanel);