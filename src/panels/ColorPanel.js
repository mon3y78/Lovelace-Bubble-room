import { LitElement, html, css } from 'lit';

export class ColorPanel extends LitElement {
  static properties = {
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedColors: { type: Array },
  };
  
  constructor() {
    super();
    this.config = {};
    this._expanded = false;
    this._expandedColors = [false, false];
  }
  
  static styles = css`
    /* glass-panel, mini-pill/header, input-group, color-row etc. */
  `;
  
  render() {
    const styleBox = "flex:1 1 0; max-width:250px; min-width:0;";
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded="${this._expanded}"
        @expanded-changed="${e=>this._expanded=e.detail.expanded}"
      >
        <div slot="header" class="glass-header">🎨 Colors</div>
        <div class="glass-content">
          ${this._renderColorPill(0,'Room','#55afff',[
            {label:'Background Active','field':'background_active'},
            {label:'Background Inactive','field':'background_inactive'},
            {label:'Icon Active','field':'icon_active'},
            {label:'Icon Inactive','field':'icon_inactive'},
          ])}
          ${this._renderColorPill(1,'Subbutton','#b28fff',[
            {label:'Background On','field':'background_on'},
            {label:'Background Off','field':'background_off'},
            {label:'Icon On','field':'icon_on'},
            {label:'Icon Off','field':'icon_off'},
          ])}
        </div>
      </ha-expansion-panel>
    `;
  }
  
  _renderColorPill(idx, label, accent, fields) {
    return html`
      <div class="mini-pill ${this._expandedColors[idx]?'expanded':''}" @click="${()=>this._expandedColors[idx]=!this._expandedColors[idx]}">
        <div class="mini-pill-header" style="--section-accent:${accent}">${label}<span class="chevron">${this._expandedColors[idx]?'▼':'▶'}</span></div>
        ${this._expandedColors[idx]? html`
          <div class="mini-pill-content">
            ${fields.map(f=>html`
              <div class="input-group color-row">
                <label>${f.label}</label>
                <input type="color"
                       .value="${this._toHex(this.config.colors[label.toLowerCase()]?.[f.field]||'#000')}"
                       @input="${e=>this._updateColor(label.toLowerCase(),f.field,e.target.value)}">
                <input type="range" min="0" max="1" step="0.01"
                       .value="${parseFloat((this.config.colors[label.toLowerCase()]?.[f.field]||'1').split(',').pop())}"
                       @input="${e=>this._updateColor(label.toLowerCase(),f.field,e.target.value,true)}">
              </div>
            `)}
          </div>
        `:''}
      </div>
    `;
  }
  
  _toHex(color) {
    if (!color) return '#000000';
    if (color.startsWith('#')) return color.length===7 ? color.slice(0,7) : color;
    const m = /rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(color);
    if (!m) return '#000000';
    const [r,g,b] = m.slice(1).map(n => Math.max(0, Math.min(255, parseInt(n,10)||0)));
    return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
  }
  _updateColor(section, key, value, alpha = false) {
    const hex = this._toHex(value);
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: `colors.${section}.${key}`, val: hex },
      bubbles: true, composed: true
    }));
  }
}

customElements.define('color-panel', ColorPanel);