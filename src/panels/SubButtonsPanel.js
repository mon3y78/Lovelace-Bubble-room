import { LitElement, html, css } from 'lit';

const DEBUG = !!window.__BUBBLE_DEBUG__;
import { FILTERS, candidatesFor } from '../helpers/entity-filters.js';


export class SubButtonsPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedBtns: { type: Array },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this._expanded = false;
    this._expandedBtns = Array(4).fill(false);
  }

  static styles = css`
    /* stili glass-panel, mini-pill, input-group ecc */
  `;

  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded="${this._expanded}"
        @expanded-changed="${e=>this._expanded=e.detail.expanded}"
      >
        <div slot="header" class="glass-header">🎛️ Subbuttons</div>
        <div class="glass-content">
          <div class="autodiscover-box" @click="${()=>this._toggleAuto('subbutton')}">
            <label>
              <input type="checkbox"
                     .checked="${this.config.auto_discovery_sections?.subbutton||false}"
                     @change="${e=>this._toggleAuto('subbutton', e.target.checked)}"
                     @click="${e=>e.stopPropagation()}">
              <span>🪄 Auto-discovery</span>
            </label>
          </div>
          ${['sub-button1','sub-button2','sub-button3','sub-button4'].map((key,i)=>html`
            <div class="mini-pill ${this._expandedBtns[i]?'expanded':''}" @click="${()=>this._toggleOne(i)}">
              <div class="mini-pill-header">Sub-button ${i+1}<span class="chevron">${this._expandedBtns[i]?'▼':'▶'}</span></div>
              ${this._expandedBtns[i]? html`
                <div class="mini-pill-content">
                  <div class="input-group">
                    <label>Entity ID</label>
                    <ha-entity-picker
  .hass="${this.hass}"
  .area="${this.config.area || ''}"
  .includeEntities=${candidatesFor(this.hass, this.config, 'subbutton')}
  .value="${btn.entity_id || ''}"
  allow-custom-entity
  @value-changed="${e => this._updateSubButtonEntity(i, e.detail.value)}"
></ha-entity-picker>
                  </div>
                  <div class="input-group">
                    <label>Icon</label>
                    <ha-icon-picker
                      .hass="${this.hass}"
                      .value="${this.config.entities?.[key]?.icon||''}"
                      @value-changed="${e=>this._fire(`entities.${key}.icon`,e.detail.value)}"
                    ></ha-icon-picker>
                  </div>
                  ${this._renderActions('tap', key)}
                  ${this._renderActions('hold', key)}
                </div>
              `:''}
            </div>
          `)}
          <div style="text-align:center; margin-top:1.2em;">
            <button class="reset-button" @click="${this._resetAll}">🧹 Reset Sub-buttons</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  _toggleAuto(section,val){this._fire(`auto_discovery_sections.${section}`,!this.config.auto_discovery_sections?.[section]);}
  _toggleOne(i){this._expandedBtns=this._expandedBtns.map((_,j)=>j===i);}
  _renderActions(type, key) { /* come sopra */ }
  _resetAll(){['sub-button1','sub-button2','sub-button3','sub-button4'].forEach(k=>this._fire(`entities.${k}`,undefined));}
  _fire(prop,val){this.dispatchEvent(new CustomEvent('panel-changed',{detail:{prop,val},bubbles:true,composed:true}));}
}


      _getSubButtonCandidates() {
        const hass = this.hass;
        if (!hass || !hass.states) return [];
        const allowed = new Set(['light','switch','media_player','fan','cover','humidifier','lock','scene','input_boolean','script','button']);
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
          console.info('[SubButtonsPanel][Candidates]', { area, count: res.length, sample: res.slice(0,8) });
        }
        return res;
      }

customElements.define('subbuttons-panel', SubButtonsPanel);