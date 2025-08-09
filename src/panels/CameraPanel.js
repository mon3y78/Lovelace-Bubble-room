// src/panels/CameraPanel.js
import { LitElement, html, css } from 'lit';
import { maybeAutoDiscover } from '../helpers/auto-discovery.js';
import { candidatesFor } from '../helpers/entity-filters.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';

export class CameraPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    expanded: { type: Boolean },

    _entity: { type: String, state: true },
    _icon: { type: String, state: true },
    _presence: { type: String, state: true },

    _cameraCandidates: { type: Array, state: true },
    _presenceCandidates: { type: Array, state: true },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.expanded = false;

    this._entity = '';
    this._icon = '';
    this._presence = '';

    this._cameraCandidates = [];
    this._presenceCandidates = [];
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      // 1) auto-discovery per la sezione Camera (usa il trigger centrale)
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.camera'); // attiva autoFillCamera

      // 2) sincronizza valori correnti
      const camRec = this.config?.entities?.camera || {};
      this._entity = camRec.entity || '';
      this._icon = camRec.icon || '';
      this._presence = camRec.presence?.entity || '';

      // 3) auto-icon se vuota
      if (this._entity && !this._icon) {
        const st = this.hass?.states?.[this._entity];
        const autoIcon = st?.attributes?.icon || resolveEntityIcon(this._entity, this.hass);
        if (autoIcon) {
          this._icon = autoIcon;
          this.dispatchEvent(new CustomEvent('panel-changed', {
            detail: { prop: 'entities.camera.icon', val: autoIcon },
            bubbles: true, composed: true,
          }));
        }
      }

      // 4) costruisci liste candidate (pattern Mushroom → già filtrate per area)
      const autoDisc = this.config?.auto_discovery_sections?.camera ?? false;
      if (autoDisc) {
        const all = candidatesFor(this.hass, this.config, 'mushroom') || [];
        this._cameraCandidates = all.filter((id) => id.startsWith('camera.'));

        const pres = candidatesFor(
          this.hass, this.config, 'mushroom',
          ['motion','occupancy','presence','moving']
        ) || [];
        this._presenceCandidates = pres.filter((id) => id.startsWith('binary_sensor.'));
      } else {
        this._cameraCandidates = [];
        this._presenceCandidates = [];
      }
    }
  }

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(80,235,175,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(40,220,145,0.18));
      overflow: hidden;
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.18),
        rgba(255,255,255,0.10) 70%, transparent 100%));
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }
    .input-group.autodiscover {
      margin: 0 16px 13px;
      padding: 14px 18px 10px;
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      border-radius: 18px;
      display: flex; align-items: center; gap: 8px;
    }
    .input-group { margin: 12px 16px; }
    .input-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 6px;
      color: #36e6a0;
    }
    ha-selector { width: 100%; box-sizing: border-box; }
    .reset-button {
      border: 3.5px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 24px;
      padding: 12px 38px;
      background: transparent;
      cursor: pointer;
      display: block;
      margin: 20px auto;
      font-size: 1.15rem;
      font-weight: 700;
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

        <!-- Auto‑discover Camera -->
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto‑discover Camera</label>
        </div>

        <!-- Camera -->
        <div class="input-group">
          <label>Camera (ID):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._entity}
            .selector=${
              this._cameraCandidates.length
                ? { entity: { include_entities: this._cameraCandidates } }
                : { entity: { domain: 'camera' } }
            }
            allow-custom-entity
            @value-changed=${e => this._set('entities.camera.entity', e.detail.value)}
          ></ha-selector>
        </div>

        <!-- Icona -->
        <div class="input-group">
          <label>Camera Icon:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._icon}
            .selector=${{ icon: {} }}
            @value-changed=${e => this._set('entities.camera.icon', e.detail.value)}
          ></ha-selector>
        </div>

        <!-- Presence/Motion -->
        <div class="input-group">
          <label>Entità Presenza/Motion (binary_sensor):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._presence}
            .selector=${
              this._presenceCandidates.length
                ? { entity: { include_entities: this._presenceCandidates } }
                : { entity: { domain: 'binary_sensor' } }
            }
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

  _reset() {
    this._set('entities.camera.entity', '');
    this._set('entities.camera.icon',   '');
    this._set('entities.camera.presence.entity', '');
  }
}

customElements.define('camera-panel', CameraPanel);