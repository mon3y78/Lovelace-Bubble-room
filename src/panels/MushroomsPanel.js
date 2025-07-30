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
    
    if (!customElements.get('ha-entity-picker')) {
      customElements.whenDefined('ha-entity-picker').then(() => this.requestUpdate());
    }
this.hass = {};
    this.config = {};
    this._expanded = false;
    this._expandedItems = Array(7).fill(false); // entities1..5 + climate + camera
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
      font-weight: 700;
      color: #36e6a0;
      letter-spacing: 0.03em;
      font-family: 'Inter', sans-serif;
    }
    input, select, ha-entity-picker, ha-icon-picker {
      width: 100%;
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
  
/* Ensure HA pickers are visible and not collapsed */
ha-entity-picker,
ha-icon-picker,
ha-area-picker,
ha-device-picker,
ha-select {
  display: block;
  width: 100%;
  min-height: 56px;
  box-sizing: border-box;
}
/* Best-effort vaadin parts */
ha-entity-picker::part(input),
ha-entity-picker::part(text-field),
ha-entity-picker::part(combobox) {
  min-height: 56px;
}
`;

  render() {
    const cfg = this.config;
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${(e) => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🍄 Mushroom Entities</div>

        <div class="glass-content">
          <div
            class="autodiscover-box"
            @click=${() => this._fire('auto_discovery_sections.mushroom', !cfg.auto_discovery_sections?.mushroom)}
          >
            <label>
              <input
                type="checkbox"
                .checked=${cfg.auto_discovery_sections?.mushroom || false}
                @change=${(e) => this._fire('auto_discovery_sections.mushroom', e.target.checked)}
                @click=${(e) => e.stopPropagation()}
              />
              <span>🪄 Auto-discovery</span>
            </label>
          </div>

          ${['entities1','entities2','entities3','entities4','entities5','climate','camera'].map(
            (key, i) => this._renderSingle(i, key)
          )}

          <button class="reset-button" @click=${this._resetAll}>🧹 Reset Mushroom Entities</button>
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
          ${item.icon || '🔘'} ${item.label || 'Entity ' + (index + 1)}
          <span class="chevron">${expanded ? '▼' : '▶'}</span>
        </div>

        ${expanded ? html`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .includeEntities=${this._getMushroomCandidates()}
                .value=${item.entity || ''}
                allow-custom-entity
                @value-changed=${(e) => this._fire('entities.' + key + '.entity', e.detail.value)}
              ></ha-entity-picker>
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

  _toggleOne(idx) {
    this._expandedItems = this._expandedItems.map((_, i) => i === idx);
    this.requestUpdate();
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

  _fire(prop, value) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val: value },
      bubbles: true,
      composed: true,
    }));
  }

  _resetAll() {
  this.dispatchEvent(new CustomEvent('panel-changed', {
    detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: 'mushroom' } },
    bubbles: true, composed: true,
  }));
}
// --- Wrapper locale: calcola candidati + log ---
  _getMushroomCandidates() {
    // Usa la logica centralizzata, ma aggiunge log locale (Opzione A)
    const list = candidatesFor(this.hass, this.config, 'mushroom');
    if (DEBUG) {
      console.info('[MushroomsPanel][Candidates]', {
        area: this.config?.area || null,
        count: list.length,
        sample: list.slice(0, 8),
      });
    }
    return list;
  }
}

customElements.define('mushrooms-panel', MushroomsPanel);