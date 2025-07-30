// src/panels/RoomPanel.js
import { LitElement, html, css } from 'lit';

const DEBUG = !!window.__BUBBLE_DEBUG__;

export class RoomPanel extends LitElement {
  static properties = {
    hass:       { type: Object },
    config:     { type: Object },
    _expanded:  { type: Boolean },
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
      margin: 0!important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      border: none;
      z-index: 0;
      --glass-bg: rgba(73,164,255,0.38);
      --glass-shadow: 0 2px 24px 0 rgba(50,180,255,0.25);
      --glass-sheen:
        linear-gradient(120deg,
                        rgba(255,255,255,0.26),
                        rgba(255,255,255,0.11) 70%,
                        transparent 100%);
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
      background: none!important;
      box-shadow: none!important;
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
    input[type="text"] {
      width: 100%;
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

    /* Assicura che il picker non venga nascosto */
    ha-entity-picker,
    ha-area-picker,
    ha-icon-picker {
      display: block;
      width: 100%;
      min-height: 56px;
      box-sizing: border-box;
    }
    ha-entity-picker::part(text-field),
    ha-entity-picker::part(combobox) {
      min-height: 56px;
    }
  `;

  render() {
    const area   = this.config?.area || '';
    const name   = this.config?.name || '';
    const icon   = this.config?.icon || '';
    const pres   =
      this.config?.entities?.presence?.entity ||
      this.config?.presence_entity ||
      '';
    const adPres = this.config?.auto_discovery_sections?.presence || false;

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e => this._expanded = e.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings 2</div>

        <!-- Auto-discovery Presence toggle -->
        <div class="input-group ad-top">
          <label style="display:flex;align-items:center;gap:8px;margin:0;">
            <input
              type="checkbox"
              .checked=${adPres}
              @change=${e => this._fire('auto_discovery_sections.presence', e.target.checked)}
            />
            <span>🪄 Auto-discovery Presence</span>
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
                @value-changed=${e => this._fire('entities.presence.entity', e.detail.value)}
              ></ha-entity-picker>
            </div>

            ${this._renderActions('tap')}
            ${this._renderActions('hold')}
          </div>
        </div>

        <div style="text-align:center; margin-top:1.2em;">
          <button class="reset-button"
                  @click=${() => this._fire('__panel_cmd__', { cmd:'reset', section:'room' })}>
            🧹 Reset Room
          </button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderActions(type) {
    const cfg = this.config?.[`${type}_action`] || {};
    const opts = ['toggle','more-info','navigate','call-service','none'];
    return html`
      <div class="input-group">
        <label>${type==='tap'?'Tap Action':'Hold Action'}</label>
        <div class="pill-group">
          ${opts.map(o => html`
            <paper-button
              class="pill-button ${cfg.action===o?'active':''}"
              @click=${()=>this._fire(`${type}_action.action`, o)}
            >${o}</paper-button>
          `)}
        </div>
        ${cfg.action==='navigate'?html`
          <input type="text" placeholder="Path"
                 .value=${cfg.navigation_path||''}
                 @input=${e=>this._fire(`${type}_action.navigation_path`, e.target.value)} />
        `:''}
        ${cfg.action==='call-service'?html`
          <input type="text" placeholder="domain.service"
                 .value=${cfg.service||''}
                 @input=${e=>this._fire(`${type}_action.service`, e.target.value)} />
          <input type="text" placeholder='service_data (JSON)'
                 .value=${cfg.service_data?JSON.stringify(cfg.service_data):''}
                 @input=${e=>{
                   let v=e.target.value; try{v=v?JSON.parse(v):undefined}catch{v=undefined}
                   this._fire(`${type}_action.service_data`,v);
                 }} />
        `:''}
      </div>
    `;
  }

  _getPresenceCandidates() {
    const hass = this.hass;
    if(!hass||!hass.states) return [];
    const allowed = new Set([
      'person','device_tracker','binary_sensor','light','switch',
      'media_player','fan','humidifier','lock','input_boolean','scene'
    ]);
    let list = Object.keys(hass.states).filter(id=>allowed.has(id.split('.')[0]));
    list = list.filter(id=>{
      const d=id.split('.')[0];
      if(d!=='binary_sensor') return true;
      const dc=hass.states[id]?.attributes?.device_class;
      return ['motion','occupancy','presence'].includes(dc||'');
    });
    const area=this.config?.area;
    if(area){
      const ia=list.filter(id=>{
        const st=hass.states[id];
        return st?.attributes?.area_id===area||st?.attributes?.area===area;
      });
      if(ia.length) list=ia;
    }
    const sel=this.config?.entities?.presence?.entity||this.config?.presence_entity;
    if(sel&&!list.includes(sel)) list.push(sel);
    if(DEBUG) console.info('[RoomPanel] Presence candidates:',list.length,list.slice(0,8));
    return list;
  }

  _fire(prop,val){
    this.dispatchEvent(new CustomEvent('panel-changed',{
      detail:{prop,val},
      bubbles:true,composed:true
    }));
  }
}

customElements.define('room-panel', RoomPanel);
