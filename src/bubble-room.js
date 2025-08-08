// src/bubble-room.js
import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';
import './components/BubbleSubButton.js';
import './components/BubbleName.js';
import './components/BubbleSensor.js';
import './components/BubbleMushroom.js';
import './components/BubbleIcon.js';
import { resolveEntityIcon } from './helpers/icon-mapping.js';

export class BubbleRoom extends LitElement {
  static properties = {
    config: { type: Object },
    hass:   { type: Object },
  };

  /* copia mutabile delle entità (dx, dy, ecc.) */
  _entities = {};

  constructor() {
    super();
    this.config = {};
    this.hass   = {};
  }

  /* ───────────── configurazione ───────────── */
  setConfig(rawConfig) {
    /* salvo il config (HA lo congelerà) */
    this.config = { layout: 'wide', ...rawConfig };
    /* clono solo la parte che potrei modificare */
    this._entities = structuredClone(this.config.entities || {});
  }

  static getStubConfig() {
    return {
      type: 'custom:bubble-room',
      layout: 'wide',
      name: [],
      area: [],
      sensors: [],
      mushrooms: [],
      subbuttons: [],
      colors: {
        subbutton: {
          background_on: 'rgba(var(--color-blue),1)',
          background_off: 'rgba(var(--color-blue),0.3)',
          icon_on: 'yellow',
          icon_off: '#666',
        },
      },
    };
  }

  static async getConfigElement() {
    await import('./bubble-room-editor.js');
    return document.createElement('bubble-room-editor');
  }

  /* ───────────── ciclo vita ───────────── */
  connectedCallback() {
    super.connectedCallback();
    this._resizeObs = new ResizeObserver(() => this.requestUpdate());
  }
  firstUpdated() {
    const area = this.shadowRoot?.querySelector('.icon-mushroom-area');
    area && this._resizeObs.observe(area);
  }
  disconnectedCallback() {
    this._resizeObs?.disconnect();
    super.disconnectedCallback();
  }

  /** riclona se l’utente modifica la card dall’editor */
  updated(changed) {
    if (changed.has('config')) {
      this._entities = structuredClone(this.config.entities || {});
    }
  }

  /* ───────────── sub-button helper ───────────── */
  _getSubButtons() {
    const bgOn   = this.config.colors?.subbutton?.background_on  ?? '#00d46d';
    const bgOff  = this.config.colors?.subbutton?.background_off ?? '#999';
    const iconOn = this.config.colors?.subbutton?.icon_on ?? 'yellow';
    const iconOff= this.config.colors?.subbutton?.icon_off ?? '#666';
  
    return (this.config.subbuttons || []).map(sb => {
      const stateObj = this.hass.states?.[sb.entity_id];
  
      // Ordine di priorità icona:
      // 1) icona personalizzata in config
      // 2) icona da entity (device_class / icon attribute / mapping)
      let finalIcon = sb.icon || resolveEntityIcon(sb.entity_id, this.hass);
  
      const active = stateObj?.state === 'on';
  
      return {
        icon: finalIcon,
        active,
        colorOn:  bgOn,
        colorOff: bgOff,
        iconOn,
        iconOff,
        entity_id: sb.entity_id,
        tap_action: sb.tap_action,
        hold_action: sb.hold_action,
      };
    });
  }
  

  /* ───────────── presenza stanza ───────────── */
  _isRoomActive() {
    const entityId = this.config?.entities?.presence?.entity;
    if (!entityId) return false;
    const state = this.hass?.states?.[entityId]?.state;
    return ['on', 'home', 'occupied', 'motion', 'detected'].includes(state);
  }

  /** lato dell’icona principale */
  _getMainIconSize() {
    const area = this.shadowRoot?.querySelector('.icon-mushroom-area');
    if (!area) return 64;
    return Math.round(Math.min(area.clientWidth, area.clientHeight) * 0.60);
  }

  /* ───────────── sensori ───────────── */
  _getSensors() {
    const entities = this._entities || {};
    const sensorColorActive =
      this.config.colors?.room?.sensor_active ??
      this.config.colors?.room?.text_active ??
      '#21df73';

    const sensorColorInactive =
      this.config.colors?.room?.sensor_inactive ??
      this.config.colors?.room?.text_inactive ??
      '#173c16';

    const color = this._isRoomActive() ? sensorColorActive : sensorColorInactive;

    const result = [];
    for (let i = 1; i <= 6; i++) {
      const entId = entities[`sensor${i}`]?.entity;
      const st    = this.hass?.states?.[entId];
      if (!entId || !st) continue;

      result.push({
        icon:  st.attributes.icon || '',
        value: st.state,
        unit:  st.attributes.unit_of_measurement,
        device_class: st.attributes.device_class,
        color,
      });
    }
    return result;
  }

  /* ───────────── mushroom ───────────── */
  _getMushrooms() {
    const entities = this._entities || {};
    const res = [];
    for (let i = 1; i <= 6; i++) {
      const entId = entities[`mushroom${i}`]?.entity;
      const st    = this.hass?.states?.[entId];
      if (!entId || !st) continue;

      const color = st.state === 'on'
        ? (this.config.colors?.mushroom?.active   ?? '#00e676')
        : (this.config.colors?.mushroom?.inactive ?? '#888');

      res.push({
        icon:  st.attributes.icon || 'mdi:flash',
        state: st.state,
        color,
        dx: entities[`mushroom${i}`]?.dx ?? 0,
        dy: entities[`mushroom${i}`]?.dy ?? 0,
        angle_deg: entities[`mushroom${i}`]?.angle_deg,
        radius_factor: entities[`mushroom${i}`]?.radius_factor,
      });
    }
    return res;
  }

  /* stub click */
  _onMushroomClick(ev) {
    /* puoi gestire altri eventi qui */
  }

  /* ───────────── render ───────────── */
  render() {
    const layout        = this.config.layout || 'wide';
    const mainIconSize  = this._getMainIconSize();
    const subbuttons    = this._getSubButtons();
    const isActive      = this._isRoomActive();

    /* palette */
    const iconColorActive   = this.config.colors?.room?.icon_active   ?? '#21df73';
    const iconColorInactive = this.config.colors?.room?.icon_inactive ?? '#173c16';
    const iconBgActive      = this.config.colors?.room?.background_active   ?? 'rgba(33,223,115,0.12)';
    const iconBgInactive    = this.config.colors?.room?.background_inactive ?? 'rgba(23,60,22,0.12)';
    const textColorActive   = this.config.colors?.room?.text_active   ?? '#ffffff';
    const textColorInactive = this.config.colors?.room?.text_inactive ?? 'rgba(255,255,255,0.5)';

    return html`
      <div class="bubble-room-grid ${layout}">
        <div class="main-area">
          <div class="row1">
            <bubble-sensor .sensors="${this._getSensors()}"></bubble-sensor>

            <div class="name-placeholder" id="nameContainer">
              <bubble-name
                .name="${this.config.name}"
                .area="${this.config.area}"
                .hass=${this.hass}
                .config=${this.config}
                .container=${this.shadowRoot?.getElementById('nameContainer')}
                style="--bubble-room-name-color:${isActive ? textColorActive : textColorInactive}"
              ></bubble-name>
            </div>
          </div>

          <div class="row2">
            <div class="icon-mushroom-area">
              <bubble-icon
                .icon="${this.config.icon}"
                .active=${isActive}
                .colorActive="${iconColorActive}"
                .colorInactive="${iconColorInactive}"
                .backgroundActive="${iconBgActive}"
                .backgroundInactive="${iconBgInactive}"
                style="
                  --main-icon-size:${mainIconSize}px;
                  --icon-shift-x:-20%;
                "
              ></bubble-icon>

              <bubble-mushroom
                .entities="${this._getMushrooms()}"
                .containerSize="${{ width: 180, height: 180 }}"
                @mushroom-entity-click="${this._onMushroomClick}"
              ></bubble-mushroom>
            </div>
            <div class="k-space"></div>
          </div>
        </div>

        <div class="sidebar">
          <bubble-subbutton .subbuttons="${subbuttons}"></bubble-subbutton>
        </div>
      </div>
    `;
  }

  /* ───────────── stili originali ───────────── */
  static styles = css`
    :host { display:block; height:100%; box-sizing:border-box; }
    .bubble-room-grid { display:grid; grid-template-columns:2fr 1fr;
      width:100%; height:100%; box-sizing:border-box; border:2px dashed yellow; }
    .main-area { display:grid; height:100%; min-height:0; box-sizing:border-box;
      border:2px dashed green; }
    .row1 { display:grid; min-height:0; box-sizing:border-box;
      border:2px dashed blue; grid-template-columns:1fr; }
    .row2 { display:grid; height:100%; min-height:0; box-sizing:border-box;
      border:2px dashed purple; }
    .name-placeholder { display:flex; align-items:center; justify-content:center;
      width:100%; max-width:100%; height:100%; box-sizing:border-box;
      contain:strict; flex-shrink:1; }
    .icon-mushroom-area { border:2px dashed violet; box-sizing:border-box;
      position:relative; width:100%; height:100%; display:flex; align-items:center; }
    .k-space { border:2px dashed black; box-sizing:border-box; }
    .sidebar { display:flex; flex-direction:column; height:100%; min-height:0;
      box-sizing:border-box; border:2px dashed red; }

    .bubble-room-grid.tall .main-area { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.tall .row1      { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.tall .row2      { grid-template-columns:1fr 0fr; }

    .bubble-room-grid.wide .main-area { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.wide .row1      { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.wide .row2      { grid-template-columns:2fr 1fr; }
  `;
}

customElements.define('bubble-room', BubbleRoom);

window.customCards.push({
  type: 'bubble-room',
  name: 'Bubble Room',
  description: 'A stylish room control card with environmental sensors',
  preview: true,
  documentationURL: 'https://github.com/mon3y78/Lovelace-Bubble-room',
});
