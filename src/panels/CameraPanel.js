// src/panels/CameraPanel.js
import { LitElement, html, css } from 'lit';
import { candidatesFor } from '../helpers/entity-filters.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';
import { sharedPanelStyles } from './shared-styles.js';
import { localize } from '../helpers/i18n.js';

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

  static styles = [
    sharedPanelStyles,
    css`
      :host {
        --bubble-glass-bg: rgba(80,120,200,0.28);
        --bubble-glass-shadow: 0 2px 24px rgba(80,120,200,0.18);
        --bubble-glass-sheen: linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0.10) 70%, transparent 100%);
        --bubble-accent-color: #a7c7ff;
        --bubble-autodiscover-label-color: #a7c7ff;
      }
    `,
  ];

  render() {
    const autoDisc = this.config?.auto_discovery_sections?.camera ?? false;
    const t = (key, vars, fallback) => localize(this.hass, key, vars, fallback);
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">${t('panel.camera.title')}</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
          />
          <label>${t('panel.camera.auto_discover')}</label>
        </div>

        <div class="input-group">
          <label>${t('panel.camera.entity')}</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._entity}
            .includeEntities=${this._candidates.length ? this._candidates : undefined}
            .includeDomains=${this._candidates.length ? undefined : ['camera']}
            allow-custom-entity
            @value-changed=${e => this._onEntity(e.detail.value)}
          ></ha-entity-picker>
        </div>

        <div class="input-group">
          <label>${t('panel.camera.icon')}</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this._icon}
            allow-custom-icon
            @value-changed=${e => this._onIcon(e.detail.value)}
          ></ha-icon-picker>
        </div>

        <div class="input-group">
          <label>${t('panel.camera.presence')}</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._presence}
            .includeEntities=${this._presenceCandidates.length ? this._presenceCandidates : undefined}
            .includeDomains=${this._presenceCandidates.length ? undefined : ['binary_sensor']}
            allow-custom-entity
            @value-changed=${e => this._onPresence(e.detail.value)}
          ></ha-entity-picker>
        </div>


        <button
          class="reset-button"
          @click=${() => this._reset()}
        >${t('panel.camera.reset')}</button>
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

    // salva l’entità
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.camera.entity', val: this._entity },
      bubbles: true, composed: true,
    }));

    // se l’entità è stata svuotata → svuota anche l’icona
    if (!this._entity) {
      this._icon = '';
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: 'entities.camera.icon', val: '' },
        bubbles: true, composed: true,
      }));
      return;
    }

    // altrimenti calcola auto-icona
    const st = this.hass?.states?.[this._entity];
    const iconFromState = st?.attributes?.icon;
    const autoIco = iconFromState || resolveEntityIcon(this._entity, this.hass) || '';

    this._icon = autoIco;
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.camera.icon', val: autoIco },
      bubbles: true, composed: true,
    }));
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

  _reset() {
    // reset immediato dello stato locale (feedback UI prima della propagazione del config)
    this._entity = '';
    this._icon = '';
    this._presence = '';
    this._candidates = [];
    this._presenceCandidates = [];

    // resetCamera() nell'editor rimuove entities.camera dal config
    this.dispatchEvent(new CustomEvent('__panel_cmd__', {
      detail: { cmd: 'reset', section: 'camera' },
      bubbles: true, composed: true,
    }));
  }
}

if (!customElements.get('camera-panel')) {
  customElements.define('camera-panel', CameraPanel);
}
