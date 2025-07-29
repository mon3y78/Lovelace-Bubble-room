// src/panels/RoomPanel.js
import { LitElement, html, css } from 'lit';

const DEBUG = !!window.__BUBBLE_DEBUG__;

export class RoomPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
  };
  
  constructor() {
    super();
    this.hass = {};
    this.config = {};
  }
  
  static styles = css`
    :host { display: block; }
    .section { margin: 8px 0 16px; padding: 12px; border-radius: 12px; background: var(--card-background-color); }
    .row { display: grid; grid-template-columns: 1fr; gap: 8px; margin: 8px 0; }
    ha-textfield, ha-area-picker, ha-icon-picker, ha-entity-picker { width: 100%; }
    h3 { margin: 0 0 8px; font-weight: 600; }
  `;
  
  render() {
    const area = this.config?.area || '';
    const presenceValue = (this.config?.entities?.presence?.entity || this.config?.presence_entity || '');
    
    return html`
      <div class="section">
        <h3>Room</h3>

        <div class="row">
          <label>Room name</label>
          <ha-textfield
            .value=${this.config?.name || ''}
            @input=${(e) => this._emit('name', e.currentTarget.value)}
          ></ha-textfield>
        </div>

        <div class="row">
          <label>Area</label>
          <ha-area-picker
            .hass=${this.hass}
            .value=${area}
            @value-changed=${(e) => this._emit('area', e.detail.value)}
          ></ha-area-picker>
        </div>

        <div class="row">
          <label>Room Icon</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this.config?.icon || 'mdi:sofa'}
            @value-changed=${(e) => this._emit('icon', e.detail.value)}
          ></ha-icon-picker>
        </div>

        <div class="row">
          <label>Presence (ID)</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${presenceValue}
            .includeEntities=${this._getPresenceCandidates()}
            allow-custom-entity
            @value-changed=${(e) => this._emit('entities.presence.entity', e.detail.value)}
          ></ha-entity-picker>
        </div>
      </div>
    `;
  }
  
  _getPresenceCandidates() {
    const hass = this.hass;
    if (!hass || !hass.states) return [];
    
    const allowed = new Set([
      'person', 'device_tracker', 'binary_sensor', 'light', 'switch',
      'media_player', 'fan', 'humidifier', 'lock', 'input_boolean', 'scene'
    ]);
    
    const ids = Object.keys(hass.states).filter(
      (id) => allowed.has(id.split('.')[0])
    );
    
    // binary_sensor: solo motion/occupancy/presence
    const byClass = ids.filter((id) => {
      const domain = id.split('.')[0];
      if (domain !== 'binary_sensor') return true;
      const dc = hass.states[id]?.attributes?.device_class;
      return ['motion', 'occupancy', 'presence'].includes(dc || '');
    });
    
    // filtro per Area se disponibile
    const area = this.config?.area;
    let res = byClass;
    if (area) {
      const inArea = byClass.filter((id) => {
        const st = hass.states[id];
        const a1 = st?.attributes?.area_id;
        const a2 = st?.attributes?.area;
        return a1 === area || a2 === area;
      });
      if (inArea.length) res = inArea;
    }
    
    // mantieni l'eventuale selezionata
    const selected = this.config?.entities?.presence?.entity || this.config?.presence_entity;
    if (selected && !res.includes(selected)) res.push(selected);
    
    if (DEBUG) {
      console.info('[RoomPanel][Presence]', {
        area,
        total: ids.length,
        byClass: byClass.length,
        result: res.length,
        sample: res.slice(0, 5),
      });
    }
    
    return res;
  }
  
  _emit(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('room-panel', RoomPanel);