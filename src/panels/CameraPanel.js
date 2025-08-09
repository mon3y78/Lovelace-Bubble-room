// src/panels/CameraPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';

export class CameraPanel extends LitElement {
  static properties = {
    hass:     { type: Object },
    config:   { type: Object },
    expanded: { type: Boolean },
    _entity:  { type: String,  state: true },
    _icon:    { type: String,  state: true },
    _presence: { type: String, state: true },
    _presenceCandidates: { type: Array, state: true },
    _cameraCandidates:   { type: Array, state: true },
  };

  constructor() {
    super();
    this.hass     = {};
    this.config   = {};
    this.expanded = false;
    this._entity  = '';
    this._icon    = '';
    this._presence = '';
    this._presenceCandidates = [];
    this._cameraCandidates   = [];
  }

  /** Ritorna l'area_id selezionato, accettando sia area_id che nome area */
  _getSelectedAreaId() {
    const raw = Array.isArray(this.config?.area) ? this.config.area[0] : this.config?.area;
    if (!raw) return '';
    // se già è un area_id presente, usalo
    const areas = Array.isArray(this.hass?.areas) ? this.hass.areas : [];
    const byId  = areas.find(a => a.area_id === raw);
    if (byId) return byId.area_id;
    // prova per nome (case-insensitive)
    const byName = areas.find(a => (a.name || '').toLowerCase() === String(raw).toLowerCase());
    return byName ? byName.area_id : (typeof raw === 'string' ? raw : '');
  }

  /** Ricava tutte le entity_id di un'area dal registry frontend */
  _getEntityIdsInArea(areaId) {
    const reg = this.hass?.entities;
    if (!areaId || !reg) return [];
    // hass.entities è un map { entity_id -> { area_id, ... } } in frontend
    return Object.values(reg)
      .filter(e => e?.area_id === areaId && e?.entity_id)
      .map(e => e.entity_id);
  }

  /** Ricostruisce le liste candidate per i selector quando l'auto-discovery è attivo */
  _rebuildAutoDiscoveryLists() {
    const autoDisc = this.config?.auto_discovery_sections?.camera ?? false;
    if (!autoDisc) {
      this._cameraCandidates = [];
      this._presenceCandidates = [];
      return;
    }
    const areaId = this._getSelectedAreaId();
    const inArea = this._getEntityIdsInArea(areaId);
    if (!inArea.length) {
      this._cameraCandidates = [];
      this._presenceCandidates = [];
      return;
    }

    // Camera → solo camera.*
    this._cameraCandidates = inArea.filter(id => id.startsWith('camera.'));

    // Presenza → binary_sensor.* con classi utili
    const good = new Set(['motion','occupancy','presence','moving']);
    this._presenceCandidates = inArea
      .filter(id => id.startsWith('binary_sensor.'))
      .filter(id => {
        const dc = this.hass?.states?.[id]?.attributes?.device_class;
        return !dc || good.has(dc);
      });
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      // mantieni l'allineamento con la logica globale di auto-discovery
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.camera');

      const ent = this.config?.entities?.camera?.entity || '';
      const ico = this.config?.entities?.camera?.icon   || '';
      const prs = this.config?.entities?.camera?.presence?.entity || '';

      // Se ho una camera e l'icona è vuota, prova a ricavarla
      if (ent && !ico) {
        const st = this.hass?.states?.[ent];
        const iconFromState = st?.attributes?.icon;
        const autoIcon = iconFromState || resolveEntityIcon(ent, this.hass);
        if (autoIcon) this._set('entities.camera.icon', autoIcon);
      }

      this._entity   = ent;
      this._icon     = this.config?.entities?.camera?.icon || '';
      this._presence = prs;

      // 🔸 Qui è il punto giusto per calcolare i candidati
      this._rebuildAutoDiscoveryLists();
    }
  }

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important; width: 100%; box-sizing: border-box;
      border-radius: 40px; position: relative;
      background: var(--glass-bg, rgba(80,235,175,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(40,220,145,0.18));
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
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 18px; display:flex; align-items:center; gap:8px;
    }
    .input-group { margin: 12px 16px; }
    .input-group label {
      display:block; font-weight:700; margin-bottom:6px; color:#36e6a0;
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
          <label>🪄 Auto-discovery</label>
        </div>

        <div class="input-group">
          <label>Camera (ID):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._entity}
            .selector=${{
              entity: this._cameraCandidates.length
                ? { include_entities: this._cameraCandidates }
                : { domain: 'camera' }
            }}
            allow-custom-entity
            @value-changed=${e => this._set('entities.camera.entity', e.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Camera Icon:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._icon}
            .selector=${{ icon: {} }}
            @value-changed=${e => this._set('entities.camera.icon', e.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Entità Presenza/Motion (binary_sensor):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._presence}
            .selector=${{
              entity: this._presenceCandidates.length
                ? { include_entities: this._presenceCandidates }
                : { domain: 'binary_sensor' }
            }}
            allow-custom-entity
            @value-changed=${e => this._set('entities.camera.presence.entity', e.detail.value)}
          ></ha-selector>
        </div>

        <button class="reset-button" @click=${this._reset}>🧹 Reset Camera</button>
      </ha-expansion-panel>
    `;
  }

  _toggleAuto(on) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'auto_discovery_sections.camera', val: on },
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
    this._set('entities.camera.entity', '');
    this._set('entities.camera.icon',   '');
    this._set('entities.camera.presence.entity', '');
  };
}

customElements.define('camera-panel', CameraPanel);