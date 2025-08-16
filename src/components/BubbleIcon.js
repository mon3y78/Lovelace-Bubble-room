// src/elements/BubbleIcon.js
import { html, css, LitElement } from 'lit';

export class BubbleIcon extends LitElement {
  static properties = {
    // stato/tema icona principale
    icon: { type: String },
    active: { type: Boolean },
    colorActive: { type: String },
    colorInactive: { type: String },
    backgroundActive: { type: String },
    backgroundInactive: { type: String },
    
    // azioni & contesto (come Mushroom/SubButton)
    hass: { type: Object },
    entity_id: { type: String }, // entità associata alla main icon (per more-info/toggle)
    tap_action: { type: Object }, // es. { action: 'navigate', navigation_path: '/lovelace/xyz' }
    hold_action: { type: Object }, // es. { action: 'call-service', service: 'light.turn_on', ... }
    double_tap_action: { type: Object } // opzionale
  };
  
  constructor() {
    super();
    
    // valori di default (coerenti con stile UI)
    this.icon = '';
    this.active = false;
    this.colorActive = '#21df73';
    this.colorInactive = '#173c16';
    this.backgroundActive = 'rgba(33,223,115,0.12)';
    this.backgroundInactive = 'rgba(23,60,22,0.08)';
    
    // azioni di default (stessa UX degli altri pannelli)
    this.hass = null;
    this.entity_id = '';
    this.tap_action = { action: 'more-info' };
    this.hold_action = { action: 'none' };
    this.double_tap_action = { action: 'none' };
  }
  
  static styles = css`
    :host {
      position: absolute;   /* reference = .icon-mushroom-area */
      inset: 0;
      box-sizing: border-box;
    }
    .main-icon-container {
      box-sizing: border-box;
      background: var(--main-icon-bg, rgba(33,223,115,0.12));
      border-radius: 0 70% 70% 0; /* shape identica alla card */
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      user-select: none;
      -webkit-user-select: none;
      cursor: pointer;
    }
    .main-icon {
      --mdc-icon-size: var(--main-icon-size, 160px);
      width: var(--mdc-icon-size);
      height: var(--mdc-icon-size);
      transform: translateX(var(--icon-shift-x, -20%));
      transition: transform .18s ease, opacity .18s ease;
    }
    .main-icon-container:active .main-icon {
      transform: translateX(var(--icon-shift-x, -20%)) scale(0.98);
    }
  `;
  
  render() {
    const iconColor = this.active ? this.colorActive : this.colorInactive;
    const iconColorBg = this.active ? this.backgroundActive : this.backgroundInactive;
    
    return html`
      <div
        class="main-icon-container"
        style="background:${iconColorBg}"
        @click=${(e) => this._handleGesture(e, 'tap')}
        @dblclick=${(e) => this._handleGesture(e, 'double_tap')}
        @contextmenu=${(e) => { e.preventDefault(); this._handleGesture(e, 'hold'); }}
        role="button"
        tabindex="0"
      >
        <ha-icon
          class="main-icon"
          .icon="${this.icon || 'mdi:checkbox-blank-circle-outline'}"
          style="color:${iconColor}"
        ></ha-icon>
      </div>
    `;
  }
  
  /* ────────────────────────── GESTIONE AZIONI ────────────────────────── */
  
  _handleGesture(ev, which /* 'tap' | 'double_tap' | 'hold' */ ) {
    const actionCfg =
      which === 'hold' ? (this.hold_action || { action: 'none' }) :
      which === 'double_tap' ? (this.double_tap_action || { action: 'none' }) :
      (this.tap_action || { action: 'more-info' });
    
    // evento legacy (non rimuovo per compatibilità pre-patch)
    this.dispatchEvent(new CustomEvent('main-icon-click', {
      detail: { type: which },
      bubbles: true,
      composed: true,
    }));
    
    if (!actionCfg || actionCfg.action === 'none') return;
    
    // Caso speciale: navigate → molti container preferiscono l'evento standard
    if (actionCfg.action === 'navigate' && actionCfg.navigation_path) {
      this.dispatchEvent(new CustomEvent('hass-navigate', {
        detail: { navigation_path: actionCfg.navigation_path },
        bubbles: true,
        composed: true,
      }));
      return;
    }
    
    // Emissione unificata — come BubbleMushroom / BubbleSubButton
    const detail = {
      entity: this.entity_id || '',
      tap_action: this.tap_action || { action: 'more-info' },
      hold_action: this.hold_action || { action: 'none' },
      double_tap_action: this.double_tap_action || { action: 'none' },
      action: which, // 'tap' | 'double_tap' | 'hold'
    };
    
    this.dispatchEvent(new CustomEvent('hass-action', {
      detail,
      bubbles: true,
      composed: true,
    }));
    
    // Fallback basico: se nessuno gestisce hass-action a monte,
    // eseguiamo qui alcune azioni comuni per sicurezza.
    this._fallbackDo(actionCfg);
  }
  
  _fallbackDo(cfg) {
    if (!cfg || cfg.action === 'none') return;
    
    const hass = this.hass;
    
    switch (cfg.action) {
      case 'more-info':
        if (this.entity_id) {
          this.dispatchEvent(new CustomEvent('hass-more-info', {
            detail: { entityId: this.entity_id },
            bubbles: true,
            composed: true,
          }));
        }
        break;
        
      case 'toggle':
        if (hass && this.entity_id) {
          hass.callService('homeassistant', 'toggle', { entity_id: this.entity_id });
        }
        break;
        
      case 'call-service':
        if (hass && cfg.service) {
          const [domain, service] = String(cfg.service).split('.');
          if (domain && service) {
            const data = cfg.service_data || {};
            hass.callService(domain, service, data);
          }
        }
        break;
        
        // 'navigate' gestito sopra via hass-navigate
      default:
        // no-op
        break;
    }
  }
}

customElements.define('bubble-icon', BubbleIcon);