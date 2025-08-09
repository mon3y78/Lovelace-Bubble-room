// src/panels/ClimatePanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor } from '../helpers/entity-filters.js'; // 👈 aggiunto
import { resolveEntityIcon } from '../helpers/icon-mapping.js'; // ← AGGIUNTA

export class ClimatePanel extends LitElement {
  static properties = {
    hass:     { type: Object },
    config:   { type: Object },
    expanded: { type: Boolean },
    _entity:  { type: String, state: true },
    _icon:    { type: String, state: true },
    _climateCandidates: { type: Array, state: true }, // 👈 aggiunto
  };

  constructor() {
    super();
    this.hass     = {};
    this.config   = {};
    this.expanded = false;
    this._entity  = '';
    this._icon    = '';
    this._climateCandidates = []; // 👈 aggiunto
  }

  // --- helpers area/registry (stessi di CameraPanel) -------------------------
  _resolveAreaId() {
    const raw = Array.isArray(this.config?.area) ? this.config.area[0] : this.config?.area;
    if (typeof raw === 'string' && raw.startsWith('area_')) return raw;
    const areas = Array.isArray(this.hass?.areas) ? this.hass.areas : [];
    if (areas.length && raw) {
      const hit = areas.find(a => (a.name || '').toLowerCase() === String(raw).toLowerCase());
      if (hit?.area_id) return hit.area_id;
    }
    // fallback: area dell'entità climate già selezionata
    const ent = this.config?.entities?.climate?.entity;
    const reg = this.hass?.entities;
    return ent && reg ? (reg[ent]?.area_id || '') : '';
  }

  _filterByAreaIncludeSelected(list, areaId, selected) {
    const reg = this.hass?.entities || {};
    const filtered = (list || []).filter(id => !areaId || reg[id]?.area_id === areaId);
    if (selected && !filtered.includes(selected)) filtered.unshift(selected);
    return Array.from(new Set(filtered));
  }
  // --------------------------------------------------------------------------

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.climate');

      const ent = this.config?.entities?.climate?.entity || '';
      const ico = this.config?.entities?.climate?.icon   || '';

      // AUTO-ICONA: se ho un'entità e l'icona è vuota → impostala
      if (ent && !ico) {
        const st = this.hass?.states?.[ent];
        const iconFromState = st?.attributes?.icon;
        const autoIcon = iconFromState || resolveEntityIcon(ent, this.hass);
        if (autoIcon) {
          this._set('entities.climate.icon', autoIcon);
        }
      }

      this._entity = ent;
      this._icon   = this.config?.entities?.climate?.icon || '';

      // 👇 Candidati con filtro area "duro" (come per Camera)
      const autoDisc = this.config?.auto_discovery_sections?.climate ?? false;
      if (autoDisc) {
        const areaId = this._resolveAreaId();

        // usa i candidati mushroom e tieni solo climate.*
        const all = candidatesFor(this.hass, this.config, 'mushroom') || [];
        const climatesAll = all.filter(id => id.startsWith('climate.'));

        this._climateCandidates = this._filterByAreaIncludeSelected(
          climatesAll, areaId, this._entity
        );
      } else {
        this._climateCandidates = [];
      }
    }
  }

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important; width: 100%; box-sizing: border-box;
      border-radius: 40px; position: relative;
      background: var(--glass-bg, rgba(150,120,60,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(120,90,40,0.18));
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
      background: rgba(44,40,20,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(120,90,40,0.10);
      border-radius: 18px; display:flex; align-items:center; gap:8px;
    }
    .input-group { margin: 12px 16px; }
    .input-group label {
      display:block; font-weight:700; margin-bottom:6px; color:#ffd27a;
    }
    ha-selector { width:100%; box-sizing:border-box; }
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
          <label>🪄 Auto-discovery</label>
        </div>

        <div class="input-group">
          <label>Climate (ID):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._entity}
            .selector=${
              this._climateCandidates.length
                ? { entity: { include_entities: this._climateCandidates } }
                : { entity: { domain: 'climate' } }
            }
            allow-custom-entity
            @value-changed=${e => this._set('entities.climate.entity', e.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Climate Icon:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._icon}
            .selector=${{ icon: {} }}
            @value-changed=${e => this._set('entities.climate.icon', e.detail.value)}
          ></ha-selector>
        </div>

        <button class="reset-button" @click=${this._reset}>🧹 Reset Climate</button>
      </ha-expansion-panel>
    `;
  }

  _toggleAuto(on) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'auto_discovery_sections.climate', val: on },
      bubbles: true, composed: true,
    }));
  }

  _set(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true, composed: true,
    }));
  }

  _reset = () => {
    this._set('entities.climate.entity', '');
    this._set('entities.climate.icon',   '');
  };
}

customElements.define('climate-panel', ClimatePanel);