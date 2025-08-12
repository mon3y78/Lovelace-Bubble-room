// src/panels/ClimatePanel.js
import { LitElement, html, css } from 'lit';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';

export class ClimatePanel extends LitElement {
  static properties = {
    hass:     { type: Object },
    config:   { type: Object },
    expanded: { type: Boolean },
    _entity:  { type: String, state: true },
    _icon:    { type: String, state: true },
  };

  constructor() {
    super();
    this.hass     = {};
    this.config   = {};
    this.expanded = false;
    this._entity  = '';
    this._icon    = '';
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      const ent = this.config?.entities?.climate?.entity || '';
      const ico = this.config?.entities?.climate?.icon   || '';

      // auto-icona se vuota: 1) attributes.icon 2) fallback resolveEntityIcon
      if (ent && !ico) {
        const st = this.hass?.states?.[ent];
        const iconFromState = st?.attributes?.icon;
        const autoIcon = iconFromState || resolveEntityIcon(ent, this.hass);
        if (autoIcon) this._set('entities.climate.icon', autoIcon);
      }

      this._entity = ent;
      this._icon   = this.config?.entities?.climate?.icon || '';
    }
  }

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important; width: 100%; box-sizing: border-box;
      border-radius: 40px; position: relative;
      background: var(--glass-bg, rgba(200,120,80,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(200,120,80,0.18));
      overflow: hidden;
    }
    .glass-panel::after {
      content:''; position:absolute; inset:0; border-radius:inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.18),
        rgba(255,255,255,0.10) 70%, transparent 100%));
      pointer-events:none;
    }
    .glass-header {
      padding: 22px 0; text-align: center; font-size: 1.12rem;
      font-weight: 700; color: #fff;
    }
    .input-group { margin: 12px 16px; }
    .input-group label {
      display:block; font-weight:700; margin-bottom:6px; color:#ffb07e;
    }
    ha-selector, ha-icon-picker { width:100%; box-sizing:border-box; }
    .reset-button {
      border: 3.5px solid #ff4c6a; color:#ff4c6a; border-radius:24px;
      padding:12px 38px; background:transparent; cursor:pointer;
      display:block; margin: 20px auto; font-size:1.15rem; font-weight:700;
      box-shadow: 0 2px 24px #ff4c6a44;
    }
  `;

  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🌡️ Climate</div>

        <div class="input-group">
          <label>Climate (ID):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._entity}
            .selector=${{ entity: { domain: 'climate' } }}
            allow-custom-entity
            @value-changed=${e => this._set('entities.climate.entity', e.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Climate Icon:</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this._icon}
            allow-custom-icon
            @value-changed=${e => this._set('entities.climate.icon', e.detail.value)}
          ></ha-icon-picker>
        </div>

        <button
          class="reset-button"
          @click=${() =>
            this.dispatchEvent(new CustomEvent('__panel_cmd__', {
              detail: { cmd: 'reset', section: 'climate' },
              bubbles: true, composed: true,
            }))
          }
        >🧹 Reset Climate</button>
      </ha-expansion-panel>
    `;
  }

  _set(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true, composed: true,
    }));
  }
}

customElements.define('climate-panel', ClimatePanel);
