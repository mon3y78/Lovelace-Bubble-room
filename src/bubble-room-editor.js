/* ==== src/bubble-room-editor.js  (ver. 29-lug-22:13 patched) ==== */
import { LitElement, html, css } from 'lit';

export class BubbleRoomEditor extends LitElement {
  static properties = {
    hass:   { type: Object },
    config: { type: Object }
  };

  constructor() {
    super();
    this.hass   = {};
    this.config = {};
  }

  setConfig(config) {
    this.config = structuredClone(config);
  }

  get _entities() { return this.config.entities || {}; }

  /* ---------- STYLE / TEMPLATE HEAD ----------- */
  static styles = css`/* … i tuoi stili … */`;

  render() {
    return html`
      <h2>🧭 Room Settings 2</h2>

      <!-- ROOM -->
      <div class="form-section">
        <label>Room name:</label>
        <!-- … input … -->

        <label>Area:</label>
        <ha-area-picker
          .hass="${this.hass}"
          .value="${this.config.area || ''}"
          @value-changed="${e=>this._setProp('area', e.detail.value)}"
        ></ha-area-picker>
      </div>

      <!-- ICON -->
      <div class="form-section">
        <label>Room Icon:</label>
        <ha-icon-picker
          .hass="${this.hass}"
          .value="${this.config.icon || 'mdi:sofa'}"
          @value-changed="${e=>this._setProp('icon', e.detail.value)}"
        ></ha-icon-picker>

        <!-- Presence (ID)  *** PATCHED *** -->
        <label>Presence (ID):</label>
        <ha-entity-picker
          .hass="${this.hass}"
          .area="${this.config.area || ''}"
          .includeDomains=${['person','device_tracker','binary_sensor','light','switch','media_player','fan','humidifier','lock','input_boolean','scene']}
          .includeDeviceClasses=${['motion','occupancy','presence']}
          .value="${this._entities.presence?.entity || this.config.presence_entity || ''}"
          allow-custom-entity
          @value-changed="${e=>this._updateEntity('presence', e.detail.value)}"
        ></ha-entity-picker>

        <!-- Tap/Hold Action placeholders rimasti invariati -->
        <label>Tap Action:</label>
        <p>...qui copi esattamente il blocco di codice di tap come in originale...</p>
        <label>Hold Action:</label>
        <p>...qui copi esattamente il blocco di codice di hold come in originale...</p>
      </div>

      <!-- SENSORS  *** PATCHED picker *** -->
      <h3>🌡️ Sensors</h3>
      ${(this.config.sensors || []).map((s, i) => html`
        <div class="sensor-row">
          <!-- tipo, label ecc. -->
          <ha-entity-picker
            .hass="${this.hass}"
            .area="${this.config.area || ''}"
            .includeDomains=${['sensor']}
            .value="${s.entity_id || ''}"
            allow-custom-entity
            @value-changed="${e=>this._fire(`sensors[${i}].entity_id`, e.detail.value)}"
          ></ha-entity-picker>
        </div>
      `)}

      <!-- SubButtons / Mushrooms restano invariati -->
    `;
  }

  /* -------- helpers -------- */
  _setProp(prop, val) {
    this.config = { ...this.config, [prop]: val };
    this._save();
  }
  
  _fire(path, value) {
    // path es: sensors[0].entity_id
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
  
  _setByPath(obj, path, value) {
    const parts = path.replace(/\\[(\\d+)\\]/g, '.$1').split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      const nextIsIndex = /^\\d+$/.test(parts[i + 1]);
      if (cur[k] == null) cur[k] = nextIsIndex ? [] : {};
      cur = cur[k];
    }
    cur[parts[parts.length - 1]] = value;
  }
  
  _save() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    }));
  }
  }
  
  customElements.define('bubble-room-editor', BubbleRoomEditor);
  /* ==== fine bubble-room-editor.js ==== */