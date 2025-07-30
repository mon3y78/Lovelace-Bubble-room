// src/panels/RoomPanel.js
import { LitElement, html, css } from "lit";

const DEBUG = !!window.__BUBBLE_DEBUG__;

export class RoomPanel extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this._expanded = false;

    // se il custom element arriva dopo, forzo update
    if (!customElements.get("ha-entity-picker")) {
      customElements.whenDefined("ha-entity-picker").then(() => this.requestUpdate());
    }
  }

  firstUpdated() {
    this._injectOverlayCss(); // stile di sicurezza per l’overlay
  }

  static styles = css`
    :host { display:block; }
    .glass-panel {
      margin:0!important; width:100%; box-sizing:border-box; border-radius:40px;
      position:relative; border:none; z-index:0;
      --glass-bg: rgba(73,164,255,0.38);
      --glass-shadow: 0 2px 24px 0 rgba(50,180,255,0.25);
      --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.26),rgba(255,255,255,0.11) 70%,transparent 100%);
      background: var(--glass-bg); box-shadow: var(--glass-shadow);
    }
    .glass-panel::after { content:""; position:absolute; inset:0; border-radius:inherit;
      background:var(--glass-sheen); pointer-events:none; z-index:0; }
    .glass-header { position:relative; z-index:1; background:none!important; box-shadow:none!important;
      padding:22px 0 18px; margin:0; text-align:center; font-size:1.2rem; font-weight:700; color:#fff; }

    .mini-pill { background:rgba(44,70,100,0.23); border:1.5px solid rgba(255,255,255,0.12);
      box-shadow:0 3px 22px 0 rgba(70,120,220,0.13); backdrop-filter: blur(10px) saturate(1.2);
      border-radius:24px; margin-bottom:18px; overflow:hidden; }
    .mini-pill-header { display:flex; align-items:center; padding:15px 22px; font-size:1.09em;
      font-family:Inter, system-ui, sans-serif; font-weight:800; color:#55afff; user-select:none; z-index:1; }
    .mini-pill-content { padding:15px 22px; background:transparent; position:relative; z-index:1; }

    .input-group { background:rgba(44,70,100,0.23); border:1.5px solid rgba(255,255,255,0.13);
      box-shadow:0 2px 14px 0 rgba(70,120,220,0.10); border-radius:18px; margin-bottom:13px; padding:14px 18px 10px; }
    .ad-top { margin:0 16px 14px; }
    label { display:block; font-size:1.13rem; font-weight:700; color:#55afff; margin-bottom:6px; }

    input[type="text"] { width:100%; border:1px solid #444; border-radius:6px; padding:8px; background:#202020; color:#f1f1f1; font-size:.97rem; }
    .reset-button{ border:2px solid #ff4c6a; color:#ff4c6a; border-radius:12px; padding:8px 16px; background:transparent; cursor:pointer; }
    .pill-group { display:flex; flex-wrap:wrap; gap:8px; margin-top:6px; }
    .pill-button { padding:6px 10px; border-radius:999px; border:1px solid #555; cursor:pointer; }
    .pill-button.active { border-color:#55afff; color:#55afff; }

    /* evita collasso del picker */
    ha-entity-picker, ha-icon-picker, ha-area-picker {
      display:block; width:100%; min-height:56px; box-sizing:border-box;
    }
    ha-entity-picker::part(input), ha-entity-picker::part(text-field), ha-entity-picker::part(combobox) { min-height:56px; }
  `;

  render() {
    const area   = this.config?.area || "";
    const name   = this.config?.name || "";
    const icon   = this.config?.icon || "";
    const presenceValue =
      this.config?.entities?.presence?.entity || this.config?.presence_entity || "";
    const adPresence = this.config?.auto_discovery_sections?.presence || false;

    return html`
      <ha-expansion-panel class="glass-panel" .expanded=${this._expanded}
        @expanded-changed=${(e)=> (this._expanded = e.detail.expanded)}>
        <div slot="header" class="glass-header">🛋️ Room Settings 2</div>

        <!-- Auto‑discovery Presence -->
        <div class="input-group ad-top">
          <label style="display:flex;align-items:center;gap:8px;margin:0;">
            <input type="checkbox" .checked=${adPresence}
              @change=${(e)=> this._emit("auto_discovery_sections.presence", e.target.checked)}>
            <span>🪄 Auto-discovery Presence</span>
          </label>
        </div>

        <div class="mini-pill">
          <div class="mini-pill-header">Room</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room name:</label>
              <input type="text" .value=${name} @input=${this._updateName}>
            </div>
            <div class="input-group">
              <label>Area:</label>
              <ha-area-picker .hass=${this.hass} .value=${area} @value-changed=${this._updateArea}></ha-area-picker>
            </div>
          </div>
        </div>

        <div class="mini-pill">
          <div class="mini-pill-header">Icon & Presence</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room Icon:</label>
              <ha-icon-picker .hass=${this.hass} .value=${icon} allow-custom-icon @value-changed=${this._updateIcon}></ha-icon-picker>
            </div>

            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-entity-picker class="presence-picker"
                style="display:block;min-height:56px;width:100%;box-sizing:border-box"
                .hass=${this.hass}
                .value=${presenceValue}
                .includeEntities=${this._getPresenceCandidates()}
                allow-custom-entity
                @opened=${(e)=> this._fixEntityPickerOverlay(e.currentTarget)}
                @value-changed=${(e)=> this._emit("entities.presence.entity", e.detail.value)}>
              </ha-entity-picker>
            </div>

            ${this._renderActions("tap")}
            ${this._renderActions("hold")}
          </div>
        </div>

        <div style="text-align:center; margin-top:1.2em;">
          <button class="reset-button" @click=${this._resetRoom}>🧹 Reset Room</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  /* handlers */
  _updateName(e){ this._fire("name", e.target.value); }
  _updateArea(e){ this._fire("area", e.detail.value); }
  _updateIcon(e){ this._fire("icon", e.detail.value); }
  _emit(prop, val){ this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop, val},bubbles:true,composed:true})); }
  _fire(prop, val){ this._emit(prop, val); }

  // Forza il testo dell’overlay del combo interno a ha-entity-picker
  _fixEntityPickerOverlay(picker) {
    try {
      const haCombo = picker?.shadowRoot?.querySelector("ha-combo-box");
      const vaadin  = haCombo?.shadowRoot?.querySelector("vaadin-combo-box");
      if (vaadin && !vaadin._bubbleRendererApplied) {
        vaadin.renderer = (root, _combo, model) => {
          root.style.padding = "10px 14px";
          root.style.color = "var(--primary-text-color, #eaeef8)";
          root.style.fontSize = "14px";
          root.style.whiteSpace = "nowrap";
          root.style.overflow = "hidden";
          root.style.textOverflow = "ellipsis";
          const txt = typeof model.item === "string"
            ? model.item
            : (model.item?.label || model.item?.value || "");
          root.textContent = txt || "";
        };
        vaadin._bubbleRendererApplied = true;
      }
      this._injectOverlayCss();
    } catch (e) {
      if (DEBUG) console.warn("[RoomPanel] overlay fix skipped:", e);
    }
  }

  _injectOverlayCss() {
    if (document.getElementById("bubble-room-vaadin-overlay-fix")) return;
    const style = document.createElement("style");
    style.id = "bubble-room-vaadin-overlay-fix";
    style.textContent = `
      vaadin-combo-box-overlay {
        color: var(--primary-text-color, #eaeef8) !important;
        max-width: min(92vw, 520px) !important;
      }
      vaadin-combo-box-item,
      vaadin-combo-box-item::part(content) {
        color: var(--primary-text-color, #eaeef8) !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
    `;
    document.head.appendChild(style);
  }

  /* candidates */
  _getPresenceCandidates() {
    const hass = this.hass;
    if (!hass || !hass.states) return [];
    const allowed = new Set([
      "person","device_tracker","binary_sensor","light","switch",
      "media_player","fan","humidifier","lock","input_boolean","scene",
    ]);
    let ids = Object.keys(hass.states).filter((id)=> allowed.has(id.split(".")[0]));
    ids = ids.filter((id)=>{
      const d = id.split(".")[0];
      if (d !== "binary_sensor") return true;
      const dc = hass.states[id]?.attributes?.device_class;
      return ["motion","occupancy","presence"].includes(dc || "");
    });
    const area = this.config?.area;
    if (area) {
      const inArea = ids.filter((id)=>{
        const st = hass.states[id];
        const a1 = st?.attributes?.area_id; const a2 = st?.attributes?.area;
        return a1 === area || a2 === area;
      });
      if (inArea.length) ids = inArea;
    }
    const selected = this.config?.entities?.presence?.entity || this.config?.presence_entity;
    if (selected && !ids.includes(selected)) ids.push(selected);
    if (DEBUG) console.info("[RoomPanel][Presence candidates]", { area, count: ids.length, sample: ids.slice(0,8) });
    return ids;
  }
}

customElements.define("room-panel", RoomPanel);