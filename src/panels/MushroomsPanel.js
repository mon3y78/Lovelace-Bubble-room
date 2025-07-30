import { LitElement, html, css } from 'lit';

const DEBUG = !!window.__BUBBLE_DEBUG__;
import { FILTERS, candidatesFor } from '../helpers/entity-filters.js';


export class MushroomsPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedItems: { type: Array },
  };

  constructor() {
    super();
    this.hass = undefined;
    this.config = {};
    this._expanded = false;
    this._expandedItems = Array(7).fill(false);
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
      --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.18),rgba(255,255,255,0.10) 70%,transparent 100%);
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
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      color: #36e6a0;
      letter-spacing: 0.03em;
      cursor: pointer;
      user-select: none;
      position: relative;
      z-index: 1;
      text-shadow: 0 2px 7px #0004;
    }
    .mini-pill-header .chevron {
      margin-left: auto;
      font-size: 1.22em;
      opacity: 0.64;
      transition: transform 0.18s;
    }
    .mini-pill.expanded .mini-pill-header .chevron {
      transform: rotate(90deg);
    }
    .mini-pill-content {
      padding: 15px 22px;
      background: transparent;
      position: relative;
      z-index: 1;
    }
    .autodiscover-box {
      z-index: 2!important;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 18px;
      padding: 18px 0;
      font-size: 1.17rem;
      color: #fff;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-align: center;
      border: 1.5px solid #66baff!important;
      box-shadow: 0 4px 24px 0 rgba(73,164,255,0.26)!important;
      border-radius: 24px!important;
      transition: box-shadow 0.18s, border 0.18s;
      cursor: pointer;
      max-width: 88%;
    }
    .autodiscover-box:hover {
      border: 1.5px solid #4dabf7!important;
    }
    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius: 18px;
      margin-bottom: 13px;
      padding: 14px 18px 10px;
    }
    label {
      display: block;
      margin-bottom: 6px;
      font-size: 1.11rem;
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      color: #36e6a0;
      letter-spacing: 0.03em;
    }
    input, select {
      width: 100%;
      border: 1px solid #444;
      border-radius: 6px;
      padding: 8px;
      background: #202020;
      color: #f1f1f1;
      font-size: 0.97rem;
    }
    ha-entity-picker, ha-icon-picker {
      width: 100%;
      margin-bottom: 12px;
    }
    .reset-button {
      border: 3.5px solid #ff4c6a!important;
      color: #ff4c6a!important;
      font-size: 1.15rem;
      font-weight: 700;
      box-shadow: 0 2px 24px 0 #ff4c6a44;
      padding: 12px 38px!important;
      margin: 20px auto 0 auto!important;
      display: block;
      background: rgba(255,214,0,0.08);
      border-radius: 24px!important;
      transition: background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18)!important;
      color: #fff!important;
      border-color: #ff1744!important;
      box-shadow: 0 6px 32px 0 #ff4c6abf;
    }
  `;

  render() {
    const cfg = this.config;
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded="${this._expanded}"
        @expanded-changed="${e => this._expanded = e.detail.expanded}"
      >
        <div slot="header" class="glass-header">🍄 Mushroom Entities</div>
        <div class="glass-content">
          <div class="autodiscover-box" @click="${() => this._fire('auto_discovery_sections.mushroom', !cfg.auto_discovery_sections?.mushroom)}">
            <label>
              <input type="checkbox"
                     .checked="${cfg.auto_discovery_sections?.mushroom || false}"
                     @change="${e => this._fire('auto_discovery_sections.mushroom', e.target.checked)}"
                     @click="${e => e.stopPropagation()}">
              <span>🪄 Auto-discovery</span>
            </label>
          </div>
          ${['entities1','entities2','entities3','entities4','entities5','climate','camera'].map((key, i) => html`
            <div class="mini-pill ${this._expandedItems[i] ? 'expanded' : ''}" @click="${() => this._toggleOne(i)}">
              <div class="mini-pill-header">Entity ${i+1}
                <span class="chevron">${this._expandedItems[i] ? '▼' : '▶'}</span>
              </div>
              ${this._expandedItems[i] ? html`
                <div class="mini-pill-content">
                  <div class="input-group">
                    <label>Entity</label>
                    <ha-entity-picker
  .hass="${this.hass}"
  .area="${this.config.area || ''}"
  .includeEntities=${candidatesFor(this.hass, this.config, 'mushroom')}
  .value="${ent.entity_id || ''}"
  allow-custom-entity
  @value-changed="${e => this._updateMushroomEntity(i, e.detail.value)}"
></ha-entity-picker>
                  </div>
                  <div class="input-group">
                    <label>Icon</label>
                    <ha-icon-picker
                      .hass="${this.hass}"
                      .value="${cfg.entities?.[key]?.icon || ''}"
                      allow-custom-icon
                      @value-changed="${e => this._fire(`entities.${key}.icon`, e.detail.value)}"
                    ></ha-icon-picker>
                  </div>
                  ${this._renderActions('tap', key)}
                  ${this._renderActions('hold', key)}
                </div>
              ` : ''}
            </div>`)}
          <button class="reset-button" @click="${() => this._resetAll()}">🧹 Reset Mushroom Entities</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _toggleOne(idx) {
    this._expandedItems = this._expandedItems.map((_, i) => i === idx);
    this.requestUpdate();
  }

  _renderActions(actionType, key) {
    const cfg = this.config.entities?.[key] || {};
    const actCfg = cfg[`${actionType}_action`] || {};
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];
    return html`
      <div class="input-group">
        <label>${actionType === 'tap' ? 'Tap Action' : 'Hold Action'}</label>
        <div class="pill-group">
          ${actions.map(a => html`
            <paper-button
              class="pill-button ${actCfg.action === a ? 'active' : ''}"
              @click="${() => this._fire(`entities.${key}.${actionType}_action.action`, a)}"
            >${a}</paper-button>
          `)}
        </div>
        ${actCfg.action === 'navigate' ? html`
          <input type="text" placeholder="Path" .value="${actCfg.navigation_path || ''}" @input="${e => this._fire(`entities.${key}.${actionType}_action.navigation_path`, e.target.value)}">
        ` : ''}
      </div>
    `;
  }

  _fire(prop, value) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val: value }, bubbles: true, composed: true
    }));
  }

  _resetAll() {
    ['entities1','entities2','entities3','entities4','entities5','climate','camera'].forEach(k => this._fire(`entities.${k}`, undefined));
  }
}


      _getMushroomCandidates() {
        const hass = this.hass;
        if (!hass || !hass.states) return [];
        const allowed = new Set(['light','switch','media_player','fan','cover','humidifier','lock','scene','input_boolean','script','button','sensor','binary_sensor','climate']);
        let res = Object.keys(hass.states || {}).filter((id) => allowed.has(id.split('.')[0]));
        const area = this.config?.area;
        if (area) {
          const inArea = res.filter((id) => {
            const st = hass.states[id];
            const a1 = st?.attributes?.area_id;
            const a2 = st?.attributes?.area;
            return a1 === area || a2 === area;
          });
          if (inArea.length) res = inArea;
        }
        if (DEBUG) {
          console.info('[MushroomsPanel][Candidates]', { area, count: res.length, sample: res.slice(0,8) });
        }
        return res;
      }

customElements.define('mushrooms-panel', MushroomsPanel);