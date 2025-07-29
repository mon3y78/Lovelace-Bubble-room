import { LitElement, html, css } from 'lit';
import { FILTERS } from '../helpers/entity-filters.js';


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
  .includeDomains=${FILTERS.subbutton.includeDomains}
  .entityFilter=${(st) => FILTERS.subbutton.entityFilter(st, this.hass)}
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

customElements.define('subbuttons-panel', SubButtonsPanel);