import { LitElement, html, css } from 'lit';

const DEBUG = !!window.__BUBBLE_DEBUG__;
import { FILTERS, candidatesFor } from '../helpers/entity-filters.js';

export class SubButtonsPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedItems: { type: Array },
  };
  
  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this._expanded = false;
    this._expandedItems = Array(6).fill(false); // sub-button1..6
  }
  
  setConfig(config) {
    this.config = config;
  }
  
  getConfig() {
    return this.config;
  }
  
  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0!important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      background: var(--glass-bg, rgba(80,235,175,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px 0 rgba(40,220,145,0.18));
      position: relative;
      border: none;
    }
    .glass-header {
      position: relative;
      z-index: 1;
      background: none!important;
      box-shadow: none!important;
      border-radius: 0!important;
      padding: 22px 0 18px;
      margin: 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      backdrop-filter: blur(7px) saturate(1.2);
      border-radius: 24px;
      margin-bottom: 13px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 15px 22px;
      font-size: 1.12rem;
      font-weight: 800;
      color: #36e6a0;
      letter-spacing: 0.03em;
      cursor: pointer;
      user-select: none;
      position: relative;
      z-index: 1;
      text-shadow: 0 2px 7px #0004;
      font-family: 'Inter', sans-serif;
    }
    .mini-pill-header .chevron {
      margin-left: auto;
      font-size: 1.22em;
      opacity: 0.64;
      transition: transform 0.18s;
    }
    .mini-pill.expanded .mini-pill-header .chevron { transform: rotate(90deg); }
    .mini-pill-content { padding: 15px 22px; background: transparent; position: relative; z-index: 1; }

    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius: 18px; margin-bottom: 13px; padding: 14px 18px 10px;
    }
    label {
      display: block; margin-bottom: 6px; font-size: 1.11rem;
      font-family: 'Inter', sans-serif; font-weight: 700; color: #36e6a0; letter-spacing: 0.03em;
    }
    input, select, ha-entity-picker, ha-icon-picker { width: 100%; }
    .reset-button {
      border: 3.5px solid #ff4c6a!important;
      color: #ff4c6a!important; font-size: 1.15rem; font-weight: 700;
      box-shadow: 0 2px 24px 0 #ff4c6a44; padding: 12px 38px!important;
      margin: 20px auto 0 auto!important; display: block;
      background: rgba(255,214,0,0.08); border-radius: 24px!important;
      transition: background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18)!important; color: #fff!important;
      border-color: #ff1744!important; box-shadow: 0 6px 32px 0 #ff4c6abf;
    }
  `;
  
  render() {
    const keys = ['sub-button1', 'sub-button2', 'sub-button3', 'sub-button4', 'sub-button5', 'sub-button6'];
    
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${(e) => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🔘 Sub Buttons</div>

        <div class="glass-content">
          ${keys.map((key, i) => this._renderSingle(i, key))}
          <button class="reset-button" @click=${this._resetAll}>🧹 Reset Sub Buttons</button>
        </div>
      </ha-expansion-panel>
    `;
  }
  
  _renderSingle(index, key) {
    const item = this.config.entities?.[key] || {};
    const expanded = this._expandedItems[index];
    
    return html`
      <div class="mini-pill ${expanded ? 'expanded' : ''}" @click=${() => this._toggleOne(index)}>
        <div class="mini-pill-header">
          ${item.icon || '🔘'} ${item.label || 'Sub Button ' + (index + 1)}
          <span class="chevron">${expanded ? '▼' : '▶'}</span>
        </div>

        ${expanded ? html`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .includeEntities=${this._getSubButtonCandidates()}
                .value=${item.entity || ''}
                allow-custom-entity
                @value-changed=${(e) => this._fire('entities.' + key + '.entity', e.detail.value)}
              ></ha-entity-picker>
            </div>

            <div class="input-group">
              <label>Label</label>
              <input
                type="text"
                .value=${item.label || ''}
                @input=${(e) => this._fire('entities.' + key + '.label', e.target.value)}
              />
            </div>

            <div class="input-group">
              <label>Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${item.icon || ''}
                allow-custom-icon
                @value-changed=${(e) => this._fire('entities.' + key + '.icon', e.detail.value)}
              ></ha-icon-picker>
            </div>

            ${this._renderActions('tap', key)}
            ${this._renderActions('hold', key)}
          </div>
        ` : ''}
      </div>
    `;
  }
  
  _renderActions(actionType, key) {
    const cfg = this.config.entities?.[key] || {};
    const actCfg = cfg[actionType + '_action'] || {};
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];
    return html`
      <div class="input-group">
        <label>${actionType === 'tap' ? 'Tap Action' : 'Hold Action'}</label>
        <div class="pill-group">
          ${actions.map((a) => html`
            <paper-button
              class="pill-button ${actCfg.action === a ? 'active' : ''}"
              @click=${() => this._fire('entities.' + key + '.' + actionType + '_action.action', a)}
            >${a}</paper-button>
          `)}
        </div>
        ${actCfg.action === 'navigate' ? html`
          <input
            type="text"
            placeholder="Path"
            .value=${actCfg.navigation_path || ''}
            @input=${(e) => this._fire('entities.' + key + '.' + actionType + '_action.navigation_path', e.target.value)}
          />
        ` : ''}
      </div>
    `;
  }
  
  _toggleOne(i) {
    this._expandedItems = this._expandedItems.map((_, j) => j === i);
    this.requestUpdate();
  }
  
  _resetAll() {
  this.dispatchEvent(new CustomEvent('panel-changed', {
    detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: 'subbutton' } },
    bubbles: true, composed: true,
  }));
}
_fire(prop, value) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val: value },
      bubbles: true,
      composed: true,
    }));
  }
  
  // --- Wrapper locale (Opzione A): usa logica centralizzata + log ---
  _getSubButtonCandidates() {
    // Preferisci la funzione centralizzata (applica domini, classi e filtro Area)
    let list = [];
    try {
      list = candidatesFor(this.hass, this.config, 'subbutton');
    } catch (e) {
      // Fallback locale se l'helper non fosse disponibile
      const hass = this.hass;
      if (!hass || !hass.states) return [];
      const allowed = new Set([
        'light', 'switch', 'media_player', 'fan', 'cover', 'humidifier', 'lock',
        'scene', 'input_boolean', 'script', 'button'
      ]);
      list = Object.keys(hass.states || {}).filter((id) => allowed.has(id.split('.')[0]));
      const area = this.config?.area;
      if (area) {
        const inArea = list.filter((id) => {
          const st = hass.states[id];
          const a1 = st?.attributes?.area_id;
          const a2 = st?.attributes?.area;
          return a1 === area || a2 === area;
        });
        if (inArea.length) list = inArea;
      }
    }
    
    if (DEBUG) {
      console.info('[SubButtonsPanel][Candidates]', {
        area: this.config?.area || null,
        count: list.length,
        sample: list.slice(0, 8),
      });
    }
    return list;
  }
}

customElements.define('subbuttons-panel', SubButtonsPanel);