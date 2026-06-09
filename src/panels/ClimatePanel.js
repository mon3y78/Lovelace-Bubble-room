// src/panels/ClimatePanel.js
import { LitElement, html, css } from 'lit';
import { candidatesFor } from '../helpers/entity-filters.js';
import { resolveEntityIcon } from '../helpers/icon-mapping.js';
import { sharedPanelStyles } from './shared-styles.js';
import { localize } from '../helpers/i18n.js';

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

    // 🔹 Entità e icona dalla config
    const ent = this.config?.entities?.climate?.entity || '';
    const ico = this.config?.entities?.climate?.icon   || '';
    this._entity = ent;
    this._icon   = ico;

    // 🎯 Candidati: AD ON ⇒ filtrati per area; AD OFF ⇒ nessun filtro area
    const adClimate = this.config?.auto_discovery_sections?.climate ?? false;
    if (adClimate) {
      const list = candidatesFor(this.hass, this.config, 'climate') || [];
      this._candidates = Array.isArray(list) ? list : [];
    } else {
      let ids = Object.keys(this.hass?.states || {}).filter((id) => id.startsWith('climate.'));
      if (this._entity && !ids.includes(this._entity)) ids.unshift(this._entity);
      this._candidates = ids;
    }

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


  static styles = [
    sharedPanelStyles,
    css`
      :host {
        --bubble-glass-bg: rgba(200,120,80,0.28);
        --bubble-glass-shadow: 0 2px 24px rgba(200,120,80,0.18);
        --bubble-glass-sheen: linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0.10) 70%, transparent 100%);
        --bubble-accent-color: #ffb07e;
        --bubble-autodiscover-label-color: #ffb07e;
      }
    `,
  ];

  render() {
    const autoDisc = this.config?.auto_discovery_sections?.climate ?? false;
    const t = (key, vars, fallback) => localize(this.hass, key, vars, fallback);
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">${t('panel.climate.title')}</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${autoDisc}
            @change=${e => this._toggleAuto(e.target.checked)}
          />
          <label>${t('panel.climate.auto_discover')}</label>
        </div>

        <div class="input-group">
          <label>${t('panel.climate.entity')}</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._entity}
            .includeEntities=${this._candidates.length ? this._candidates : undefined}
            .includeDomains=${this._candidates.length ? undefined : ['climate']}
            allow-custom-entity
            @value-changed=${e => this._onEntity(e.detail.value)}
          ></ha-entity-picker>
        </div>

        <div class="input-group">
          <label>${t('panel.climate.icon')}</label>
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
        >${t('panel.climate.reset')}</button>
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

    // salva l’entità
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: 'entities.climate.entity', val: this._entity },
      bubbles: true, composed: true,
    }));

    // se l’entità è stata svuotata → svuota anche l’icona
    if (!this._entity) {
      this._icon = '';
      this.dispatchEvent(new CustomEvent('panel-changed', {
        detail: { prop: 'entities.climate.icon', val: '' },
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
      detail: { prop: 'entities.climate.icon', val: autoIco },
      bubbles: true, composed: true,
    }));
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

if (!customElements.get('climate-panel')) {
  customElements.define('climate-panel', ClimatePanel);
}
