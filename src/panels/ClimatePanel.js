// src/panels/ClimatePanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor } from '../helpers/entity-filters.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';

export class ClimatePanel extends LitElement {
  static properties = {
    hass:     { type: Object },
    config:   { type: Object },
    expanded: { type: Boolean },

    _entity:  { type: String, state: true },
    _icon:    { type: String, state: true },
    _candidates: { type: Array, state: true },
  };

  constructor() {
    super();
    this.hass       = {};
    this.config     = {};
    this.expanded   = false;

    this._entity    = '';
    this._icon      = '';
    this._candidates = [];
    this._syncingFromConfig = false;
  }

  updated(changed) {
    if (!changed.has('config') && !changed.has('hass')) return;
  
    this._syncingFromConfig = true;
  
    // 🔁 Applica autodiscovery in base all'area (copre climate se attivo)
    if (this.config?.area || this.config?.area_id) {
      maybeAutoDiscover(this.hass, this.config, 'area', false);
    }
  
    // 🔹 Entità e icona dalla config
    const ent = this.config?.entities?.climate?.entity || '';
    const ico = this.config?.entities?.climate?.icon   || '';
    this._entity = ent;
    this._icon   = ico;
  
    // 🎯 Candidate filtrate per area (keep selected)
    const list = candidatesFor(this.hass, this.config, 'climate') || [];
    this._candidates = Array.isArray(list) ? list : [];
  
    // 🎨 Auto-icona al primo load se entità presente e icona vuota
    if (this._entity && !this._icon) {
      const st = this.hass?.states?.[this._entity];
      const iconFromState = st?.attributes?.icon;
      const autoIcon = iconFromState || resolveEntityIcon(this._entity, this.hass);
      if (autoIcon) {
        this._icon = autoIcon;
        this.dispatchEvent(new CustomEvent('panel-changed', {
          detail: { prop: 'entities.climate.icon', val: autoIcon },
          bubbles: true, composed: true,
        }));
      }
    }
  
    this._syncingFromConfig = false;
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
    .input-group.autodiscover {
      margin: 0 16px 13px; padding: 14px 18px 10px;
      background: rgba(20,40,70,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(40,120,180,0.10);
      border-radius: 18px; display:flex; align-items:center; gap:8px;
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
    const autoDisc = this.config?.auto_discovery_sections?.climate ?? false;
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🌡️ Climate</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto-discover</label>
        </div>

        <div class="input-group">
          <label>Climate (ID):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._entity}
            .selector=${
              this._candidates.length
                ? { entity: { include_entities: this._candidates, multiple: false } }
                : { entity: { domain: 'climate' } }
            }
            allow-custom-entity
            @value-changed=${e => this._onEntity(e.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Climate Icon:</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this._icon}
            allow-custom-icon
            @value-changed=${e => this._onIcon(e.detail.value)}
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

  _toggleAuto(on) {
    if (this._syncingFromConfig) return;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'auto_discovery_sections.climate', val: on },
      bubbles: true, composed: true,
    }));
  }

  _onEntity(ent) {
    this._entity = ent || '';
    if (this._syncingFromConfig) return;

    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.climate.entity', val: this._entity },
      bubbles: true, composed: true,
    }));

    const currentIcon = this.config?.entities?.climate?.icon || '';
    if (!currentIcon && this._entity) {
      const st = this.hass?.states?.[this._entity];
      const iconFromState = st?.attributes?.icon;
      const autoIcon = iconFromState || resolveEntityIcon(this._entity, this.hass);
      if (autoIcon) {
        this._icon = autoIcon;
        this.dispatchEvent(new CustomEvent('panel-changed', {
          detail: { prop: 'entities.climate.icon', val: autoIcon },
          bubbles: true, composed: true,
        }));
      }
    }
  }

  _onIcon(icon) {
    this._icon = icon || '';
    if (this._syncingFromConfig) return;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.climate.icon', val: this._icon },
      bubbles: true, composed: true,
    }));
  }
}

customElements.define('climate-panel', ClimatePanel);
