// src/panels/CameraPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor } from '../helpers/entity-filters.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';

export class CameraPanel extends LitElement {
  static properties = {
    hass:     { type: Object },
    config:   { type: Object },
    expanded: { type: Boolean },

    _entity:      { type: String, state: true },
    _icon:        { type: String, state: true },
    _candidates:  { type: Array,  state: true },
    _presence: { type: String, state: true },
    _presenceCandidates: { type: Array, state: true },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.expanded = false;

    this._entity = '';
    this._icon = '';
    this._candidates = [];
    this._presence = '';
    this._presenceCandidates = [];
    this._syncingFromConfig = false;
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      this._syncingFromConfig = true;

      // 🔎 applica autodiscovery (usando il valore di ritorno)
      if (this.config?.area || this.config?.area_id) {
        const next = maybeAutoDiscover(this.hass, this.config, 'area', false);
        if (next && next !== this.config) {
          this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config: next }, bubbles: true, composed: true
          }));
        }
      }

      // sync stato locale da config
      this._entity = this.config?.entities?.camera?.entity || '';
      this._icon   = this.config?.entities?.camera?.icon   || '';
      this._presence = this.config?.entities?.camera?.presence?.entity || '';

      // 🎯 candidati
      const autoDisc = this.config?.auto_discovery_sections?.camera ?? false;
      if (autoDisc) {
        this._candidates = candidatesFor(this.hass, this.config, 'camera') || [];
        
          // Presence/Motion: filtra per device_class e poi area
        const presAll = candidatesFor(this.hass, this.config, 'presence', [
          'motion', 'occupancy', 'presence', 'moving'
        ]) || [];
        const presBin = presAll.filter(id => id.startsWith('binary_sensor.'));
        // Mantiene la selezionata in cima
        if (this._presence && !presBin.includes(this._presence)) {
          presBin.unshift(this._presence);
        }
        this._presenceCandidates = presBin;   
        
      } else {
        // Nessun filtro area: tutte le entità camera, con la selezionata in cima
        let ids = Object.keys(this.hass?.states || {}).filter((id) => id.startsWith('camera.'));
        if (this._entity && !ids.includes(this._entity)) ids.unshift(this._entity);
        this._candidates = ids;
        
        // Nessun filtro presence: tutti i binary_sensor, con la selezionata in cima
        let presIds = Object.keys(this.hass?.states || {}).filter(id => id.startsWith('binary_sensor.'));
        if (this._presence && !presIds.includes(this._presence)) presIds.unshift(this._presence);
        this._presenceCandidates = presIds;        
        
      }
      // 🎨 Auto-icona camera al primo load se entità presente e icona vuota
      if (this._entity && !this._icon) {
        const st = this.hass?.states?.[this._entity];
        const autoIcon = st?.attributes?.icon || resolveEntityIcon(this._entity, this.hass);
        if (autoIcon) this._icon = autoIcon;
      }

      this._syncingFromConfig = false;
    }
  }

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important; width: 100%; box-sizing: border-box;
      border-radius: 40px; position: relative;
      background: var(--glass-bg, rgba(80,120,200,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(80,120,200,0.18));
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
      display:block; font-weight:700; margin-bottom:6px; color:#a7c7ff;
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
    const autoDisc = this.config?.auto_discovery_sections?.camera ?? false;
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">📷 Camera</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto-discover</label>
        </div>

        <div class="input-group">
          <label>Camera (ID):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._entity}
            .selector=${
              this._candidates.length
                ? { entity: { include_entities: this._candidates, multiple: false } }
                : { entity: { domain: 'camera' } }
            }
            allow-custom-entity
            @value-changed=${e => this._onEntity(e.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Camera Icon:</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this._icon}
            allow-custom-icon
            @value-changed=${e => this._onIcon(e.detail.value)}
          ></ha-icon-picker>
        </div>
        
        <div class="input-group">
          <label>Entità Presenza/Motion (binary_sensor):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._presence}
            .selector=${
              this._presenceCandidates.length
                ? { entity: { include_entities: this._presenceCandidates, multiple: false } }
                : { entity: { domain: 'binary_sensor' } }
            }
            allow-custom-entity
            @value-changed=${e => this._onPresence(e.detail.value)}
          ></ha-selector>
        </div>


        <button
          class="reset-button"
          @click=${() =>
            this.dispatchEvent(new CustomEvent('__panel_cmd__', {
              detail: { cmd: 'reset', section: 'camera' },
              bubbles: true, composed: true,
            }))
          }
        >🧹 Reset Camera</button>
      </ha-expansion-panel>
    `;
  }

  _toggleAuto(on) {
    if (this._syncingFromConfig) return;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'auto_discovery_sections.camera', val: on },
      bubbles: true, composed: true,
    }));
  }

  _onEntity(ent) {
    this._entity = ent || '';
    if (this._syncingFromConfig) return;

    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.camera.entity', val: this._entity },
      bubbles: true, composed: true,
    }));

    // auto‑icon come ClimatePanel
    const currentIcon = this.config?.entities?.camera?.icon || '';
    if (!currentIcon && this._entity) {
      const st = this.hass?.states?.[this._entity];
      const iconFromState = st?.attributes?.icon;
      const autoIcon = iconFromState || resolveEntityIcon(this._entity, this.hass);
      if (autoIcon) {
        this._icon = autoIcon;
        this.dispatchEvent(new CustomEvent('panel-changed', {
          detail: { prop: 'entities.camera.icon', val: autoIcon },
          bubbles: true, composed: true,
        }));
      }
    }
  }
  _onPresence(ent) {
    this._presence = ent || '';
    if (this._syncingFromConfig) return;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.camera.presence.entity', val: this._presence },
      bubbles: true,
      composed: true,
    }));
  }
  _onIcon(icon) {
    this._icon = icon || '';
    if (this._syncingFromConfig) return;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.camera.icon', val: this._icon },
      bubbles: true, composed: true,
    }));
  }
  
@@
   _onIcon(icon) {
     this._icon = icon || '';
     if (this._syncingFromConfig) return;
     this.dispatchEvent(new CustomEvent('panel-changed', {
       detail: { prop: 'entities.camera.icon', val: this._icon },
       bubbles: true, composed: true,
     }));
   }

  // Reset locale  richiesta di reset allo YAML
  _reset = () => {
    // 1) feedback immediato sulla UI
    this._entity = '';
    this._icon = '';
    // se abbiamo reintrodotto presence/motion, puliamola senza errori anche se non esiste
    if (typeof this._presence !== 'undefined') this._presence = '';
    if (Array.isArray(this._candidates)) this._candidates = [];
    if (Array.isArray(this._presenceCandidates)) this._presenceCandidates = [];

    // 2) comanda il reset centralizzato dell'editor (usa resetCamera in backend)
    this.dispatchEvent(new CustomEvent('__panel_cmd__', {
      detail: { cmd: 'reset', section: 'camera' },
      bubbles: true, composed: true,
    }));

    // 3) compatibilità: azzera esplicitamente le chiavi nel YAML
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.camera.entity', val: '' },
      bubbles: true, composed: true,
    }));
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.camera.icon', val: '' },
      bubbles: true, composed: true,
    }));
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.camera.presence.entity', val: '' },
      bubbles: true, composed: true,
    }));
  }
  
  
}

customElements.define('camera-panel', CameraPanel);
