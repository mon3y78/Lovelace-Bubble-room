/* ==== src/bubble-room-editor.js — monolitico completo (29-lug, patched) ==== */
import { LitElement, html, css } from 'lit';
import { SENSOR_TYPES } from './helpers/sensor-mapping.js';

const SUBBUTTON_DOMAINS = [
  'light','switch','media_player','fan','cover','humidifier','lock',
  'scene','input_boolean','script','button'
];
const MUSHROOM_DOMAINS = [
  'light','switch','media_player','fan','cover','humidifier','lock',
  'scene','input_boolean','script','button','sensor','binary_sensor','climate'
];
const PRESENCE_DOMAINS = [
  'person','device_tracker','binary_sensor','light','switch','media_player',
  'fan','humidifier','lock','input_boolean','scene'
];
const PRESENCE_DEVICE_CLASSES = ['motion','occupancy','presence'];

export class BubbleRoomEditor extends LitElement {
  static properties = {
    hass:   { type: Object },
    config: { type: Object },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
  }

  setConfig(config) {
    const c = structuredClone(config || {});
    // normalizza strutture usate dalla card
    c.sensors    = Array.isArray(c.sensors)    ? c.sensors    : [];
    c.mushrooms  = Array.isArray(c.mushrooms)  ? c.mushrooms  : [];
    c.subbuttons = Array.isArray(c.subbuttons) ? c.subbuttons : [];
    c.colors     = c.colors || { room:{}, subbutton:{} };
    c.entities   = c.entities || {};
    this.config = c;
  }

  get _entities() { return this.config.entities || {}; }

  static styles = css`
    :host { display:block; }
    .section { margin: 18px 0 8px; padding: 12px; border-radius: 12px; background: var(--card-background-color); }
    .row { display:grid; grid-template-columns: 1fr; gap: 8px; margin: 8px 0; }
    .grid-2 { display:grid; gap: 8px; grid-template-columns: 1fr 1fr; }
    .grid-3 { display:grid; gap: 8px; grid-template-columns: 1fr 1fr 1fr; }
    .muted { opacity: .8; font-size: .9em; }
    .h { margin: 0 0 8px; font-weight: 600; }
    .btns { display:flex; gap:8px; }
    ha-textfield, ha-select, ha-icon-picker, ha-color-picker, ha-entity-picker, ha-area-picker { width: 100%; }
    .item { border: 1px dashed var(--divider-color); border-radius: 10px; padding: 10px; }
  `;

  render() {
    const area = this.config.area || '';

    return html`
      <h2 class="h">🧭 Room Settings 2</h2>

      <!-- ROOM -->
      <div class="section">
        <div class="row">
          <label>Room name:</label>
          <ha-textfield
            .value=${this.config.name || ''}
            @input=${e => this._setProp('name', e.currentTarget.value)}
          ></ha-textfield>
        </div>

        <div class="row">
          <label>Area:</label>
          <ha-area-picker
            .hass=${this.hass}
            .value=${area}
            @value-changed=${e=>this._setProp('area', e.detail.value)}
          ></ha-area-picker>
        </div>
      </div>

      <!-- ICON & PRESENCE -->
      <div class="section">
        <div class="row">
          <label>Room Icon:</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this.config.icon || 'mdi:sofa'}
            @value-changed=${e=>this._setProp('icon', e.detail.value)}
          ></ha-icon-picker>
        </div>

        <div class="row">
          <label>Presence (ID):</label>
          <ha-entity-picker
            style="display:block"
            .hass=${this.hass}
            .area=${area}
            .includeDomains=${PRESENCE_DOMAINS}
            .includeDeviceClasses=${PRESENCE_DEVICE_CLASSES}
            .value=${(this._entities.presence?.entity || this.config.presence_entity || '')}
            allow-custom-entity
            @value-changed=${(e)=>this._updateEntity('presence', e.detail.value)}
          ></ha-entity-picker>
          <div class="muted">Suggerite solo entità dell'area selezionata e dei domini ammessi.</div>
        </div>

        <div class="row">
          <label>Tap Action:</label>
          <p class="muted">…placeholder: inserisci qui la tua action…</p>
          <label>Hold Action:</label>
          <p class="muted">…placeholder: inserisci qui la tua action…</p>
        </div>
      </div>

      <!-- SENSORS -->
      <div class="section">
        <h3 class="h">🌡️ Sensors</h3>

        ${this.config.sensors.map((s, i) => html`
          <div class="item">
            <div class="grid-3">
              <div>
                <label>Type</label>
                <ha-select
                  .value=${s.type || ''}
                  @selected=${e=>this._fire(\`sensors[\${i}].type\`, e.target.value)}
                  @closed=${e=>e.stopPropagation()}
                >
                  ${SENSOR_TYPES.map(t => html`<mwc-list-item .value=${t.key}>${t.label || t.key}</mwc-list-item>`)}
                </ha-select>
              </div>
              <div>
                <label>Label</label>
                <ha-textfield
                  .value=${s.label || ''}
                  @input=${e=>this._fire(\`sensors[\${i}].label\`, e.currentTarget.value)}
                ></ha-textfield>
              </div>
              <div>
                <label>Color</label>
                <ha-color-picker
                  .value=${s.color || '#e3f6ff'}
                  @value-changed=${e=>this._fire(\`sensors[\${i}].color\`, e.detail.value)}
                ></ha-color-picker>
              </div>
            </div>

            <div class="row">
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .area=${area}
                .includeDomains=${['sensor']}
                .value=${s.entity_id || ''}
                allow-custom-entity
                @value-changed=${e=>this._fire(\`sensors[\${i}].entity_id\`, e.detail.value)}
              ></ha-entity-picker>
            </div>

            <div class="btns">
              <mwc-button outlined @click=${()=>this._removeItem('sensors', i)}>Remove</mwc-button>
            </div>
          </div>
        `)}

        <div class="btns" style="margin-top:8px;">
          <mwc-button raised @click=${()=>this._addItem('sensors',{ type:'temperature', entity_id:'', label:'', color:'#e3f6ff' })}>Add sensor</mwc-button>
        </div>
      </div>

      <!-- SUBBUTTONS -->
      <div class="section">
        <h3 class="h">🔘 Subbuttons</h3>

        ${this.config.subbuttons.map((b, i) => html`
          <div class="item">
            <div class="grid-3">
              <div>
                <label>Icon</label>
                <ha-icon-picker
                  .hass=${this.hass}
                  .value=${b.icon || 'mdi:light-switch'}
                  @value-changed=${e=>this._fire(\`subbuttons[\${i}].icon\`, e.detail.value)}
                ></ha-icon-picker>
              </div>
              <div>
                <label>Label</label>
                <ha-textfield
                  .value=${b.label || ''}
                  @input=${e=>this._fire(\`subbuttons[\${i}].label\`, e.currentTarget.value)}
                ></ha-textfield>
              </div>
              <div>
                <label>Entity</label>
                <ha-entity-picker
                  .hass=${this.hass}
                  .area=${area}
                  .includeDomains=${SUBBUTTON_DOMAINS}
                  .value=${b.entity_id || ''}
                  allow-custom-entity
                  @value-changed=${e=>this._fire(\`subbuttons[\${i}].entity_id\`, e.detail.value)}
                ></ha-entity-picker>
              </div>
            </div>

            <div class="grid-2">
              <div>
                <label>Color ON</label>
                <ha-color-picker
                  .value=${b.colorOn ?? this.config.colors?.subbutton?.background_on ?? '#00d46d'}
                  @value-changed=${e=>this._fire(\`subbuttons[\${i}].colorOn\`, e.detail.value)}
                ></ha-color-picker>
              </div>
              <div>
                <label>Color OFF</label>
                <ha-color-picker
                  .value=${b.colorOff ?? this.config.colors?.subbutton?.background_off ?? '#999'}
                  @value-changed=${e=>this._fire(\`subbuttons[\${i}].colorOff\`, e.detail.value)}
                ></ha-color-picker>
              </div>
            </div>

            <div class="btns">
              <mwc-button outlined @click=${()=>this._removeItem('subbuttons', i)}>Remove</mwc-button>
            </div>
          </div>
        `)}

        <div class="btns" style="margin-top:8px;">
          <mwc-button raised @click=${()=>this._addItem('subbuttons',{ entity_id:'', icon:'mdi:light-switch', label:'', colorOn:null, colorOff:null })}>Add subbutton</mwc-button>
        </div>
      </div>

      <!-- MUSHROOMS -->
      <div class="section">
        <h3 class="h">🍄 Mushrooms</h3>

        ${this.config.mushrooms.map((m, i) => html`
          <div class="item">
            <div class="grid-3">
              <div>
                <label>Icon</label>
                <ha-icon-picker
                  .hass=${this.hass}
                  .value=${m.icon || 'mdi:flash'}
                  @value-changed=${e=>this._fire(\`mushrooms[\${i}].icon\`, e.detail.value)}
                ></ha-icon-picker>
              </div>
              <div>
                <label>Color</label>
                <ha-color-picker
                  .value=${m.color ?? this.config.colors?.room?.mushroom_inactive ?? '#999'}
                  @value-changed=${e=>this._fire(\`mushrooms[\${i}].color\`, e.detail.value)}
                ></ha-color-picker>
              </div>
              <div>
                <label>Entity</label>
                <ha-entity-picker
                  .hass=${this.hass}
                  .area=${area}
                  .includeDomains=${MUSHROOM_DOMAINS}
                  .value=${m.entity_id || ''}
                  allow-custom-entity
                  @value-changed=${e=>this._fire(\`mushrooms[\${i}].entity_id\`, e.detail.value)}
                ></ha-entity-picker>
              </div>
            </div>

            <div class="btns">
              <mwc-button outlined @click=${()=>this._removeItem('mushrooms', i)}>Remove</mwc-button>
            </div>
          </div>
        `)}

        <div class="btns" style="margin-top:8px;">
          <mwc-button raised @click=${()=>this._addItem('mushrooms',{ entity_id:'', icon:'mdi:flash', color:null })}>Add mushroom</mwc-button>
        </div>
      </div>

      <!-- COLORS -->
      <div class="section">
        <h3 class="h">🎨 Colors</h3>
        <div class="grid-2">
          <div class="item">
            <h4 class="h">Room</h4>
            <div class="row">
              <label>Icon Active</label>
              <ha-color-picker
                .value=${this.config.colors?.room?.icon_active ?? '#21df73'}
                @value-changed=${e=>this._fire('colors.room.icon_active', e.detail.value)}
              ></ha-color-picker>
            </div>
            <div class="row">
              <label>Icon Inactive</label>
              <ha-color-picker
                .value=${this.config.colors?.room?.icon_inactive ?? '#173c16'}
                @value-changed=${e=>this._fire('colors.room.icon_inactive', e.detail.value)}
              ></ha-color-picker>
            </div>
            <div class="row">
              <label>Mushroom Inactive</label>
              <ha-color-picker
                .value=${this.config.colors?.room?.mushroom_inactive ?? '#999'}
                @value-changed=${e=>this._fire('colors.room.mushroom_inactive', e.detail.value)}
              ></ha-color-picker>
            </div>
          </div>

          <div class="item">
            <h4 class="h">Subbutton</h4>
            <div class="row">
              <label>Background ON</label>
              <ha-color-picker
                .value=${this.config.colors?.subbutton?.background_on ?? '#00d46d'}
                @value-changed=${e=>this._fire('colors.subbutton.background_on', e.detail.value)}
              ></ha-color-picker>
            </div>
            <div class="row">
              <label>Background OFF</label>
              <ha-color-picker
                .value=${this.config.colors?.subbutton?.background_off ?? '#999'}
                @value-changed=${e=>this._fire('colors.subbutton.background_off', e.detail.value)}
              ></ha-color-picker>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ---------- helpers ---------- */
  _setProp(prop, val) {
    this.config = { ...this.config, [prop]: val };
    this._save();
  }

  _fire(path, value) {
    this._setByPath(this.config, path, value);
    this._save();
  }

  _updateEntity(key, entity_id) {
    this.config = {
      ...this.config,
      entities: {
        ...this.config.entities,
        [key]: { ...(this.config.entities?.[key] || {}), entity: entity_id },
      },
    };
    this._save();
  }

  _addItem(section, item) {
    const arr = Array.isArray(this.config[section]) ? [...this.config[section]] : [];
    arr.push(item);
    this.config = { ...this.config, [section]: arr };
    this._save();
  }

  _removeItem(section, index) {
    const arr = Array.isArray(this.config[section]) ? [...this.config[section]] : [];
    arr.splice(index, 1);
    this.config = { ...this.config, [section]: arr };
    this._save();
  }

  _setByPath(obj, path, value) {
    const parts = String(path).replace(/\[(\d+)\]/g, '.$1').split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      const nextIsIndex = /^\d+$/.test(parts[i + 1]);
      if (cur[k] == null) cur[k] = nextIsIndex ? [] : {};
      cur = cur[k];
    }
    cur[parts[parts.length - 1]] = value;
  }

  _save() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true, composed: true,
    }));
  }
}

customElements.define('bubble-room-editor', BubbleRoomEditor);
/* ==== fine bubble-room-editor.js ==== */
