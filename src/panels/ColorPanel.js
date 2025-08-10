// src/panels/ColorPanel.js
import { LitElement, html, css } from 'lit';

const PRESETS = {
  // palette pensate per dark UI
  green: {
    label: 'Green',
    active:   { bg: '#2f6a5b', icon: '#79f5c6', text: '#79f5c6' },
    inactive: { bg: '#1e2a28', icon: '#7a9d90', text: '#9bb6ae' },
  },
  blue: {
    label: 'Blue',
    active:   { bg: '#2a4f6a', icon: '#7bd1ff', text: '#7bd1ff' },
    inactive: { bg: '#1d2a33', icon: '#7a93a6', text: '#9eb6c6' },
  },
  amber: {
    label: 'Amber',
    active:   { bg: '#6a4b2a', icon: '#ffd37b', text: '#ffd37b' },
    inactive: { bg: '#2f261d', icon: '#bba17d', text: '#d8c7a7' },
  },
  red: {
    label: 'Red',
    active:   { bg: '#5b2f36', icon: '#ff9aa5', text: '#ff9aa5' },
    inactive: { bg: '#271b1d', icon: '#a78288', text: '#c7a5ab' },
  },
  purple: {
    label: 'Purple',
    active:   { bg: '#4a2f6a', icon: '#d3a6ff', text: '#d3a6ff' },
    inactive: { bg: '#241d2f', icon: '#a18bbd', text: '#c3b1da' },
  },
  gray: {
    label: 'Gray',
    active:   { bg: '#3c424a', icon: '#cbd3dc', text: '#cbd3dc' },
    inactive: { bg: '#24282d', icon: '#8b93a1', text: '#aab3c2' },
  },
};

export class ColorPanel extends LitElement {
  static properties = {
    hass:     { type: Object },
    config:   { type: Object },
    expanded: { type: Boolean },

    // stato locale UI
    _selectedPreset:   { type: String, state: true },
    _applyRoom:        { type: Boolean, state: true },
    _applySub:         { type: Boolean, state: true },
    _applyMushroom:    { type: Boolean, state: true }, // include Camera & Climate
    _applySensors:     { type: Boolean, state: true },
    _includeText:      { type: Boolean, state: true }, // per Room: titoli/testi
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.expanded = false;

    // default UI
    this._selectedPreset = 'green';
    this._applyRoom = true;
    this._applySub = true;
    this._applyMushroom = true; // include camera & climate
    this._applySensors = true;
    this._includeText = true;
  }

  static styles = css`
    :host { display: block; }

    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(40,80,60,0.26));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(40,180,120,0.18));
      overflow: hidden;
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.16),
        rgba(255,255,255,0.08) 70%, transparent 100%));
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }

    .row { display: flex; flex-wrap: wrap; gap: 10px; padding: 0 16px 8px; }

    .preset-card {
      flex: 1 0 210px;
      min-width: 210px;
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      border-radius: 18px;
      padding: 12px;
    }
    .preset-title {
      font-weight: 800; color: #bfead7; margin-bottom: 10px;
    }

    .swatches { display: flex; gap: 10px; }
    .swatch {
      flex: 1 1 0;
      display: grid; grid-template-columns: 32px 1fr; gap: 8px;
      align-items: center;
      background: rgba(0,0,0,0.22);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px;
      padding: 10px;
      color: #fff;
      cursor: pointer;
      transition: transform .15s ease;
    }
    .swatch:hover { transform: translateY(-1px); }
    .dot {
      width: 24px; height: 24px; border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.55);
      box-sizing: border-box;
    }
    .swatch small { opacity: .85; }

    .toggles {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 18px;
      padding: 10px 16px 0;
    }
    .toggle {
      display: flex; align-items: center; gap: 10px;
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      border-radius: 14px; padding: 10px 12px;
      color: #d6f7ea; font-weight: 600;
    }

    .apply {
      display: flex; justify-content: center; padding: 12px 16px 4px;
    }
    .apply button {
      border: none; border-radius: 14px; padding: 14px 22px;
      font-weight: 800; font-size: 1.02rem; cursor: pointer;
      background: #79f5c6; color: #0f1a16;
      box-shadow: 0 10px 24px rgba(121,245,198,0.23);
      transition: transform .08s ease, box-shadow .18s ease;
    }
    .apply button:active { transform: translateY(1px); box-shadow: 0 4px 14px rgba(121,245,198,0.23); }

    .note {
      margin: 8px 16px 0; padding: 12px 14px;
      border-radius: 12px; font-size: .92rem; line-height: 1.35;
      color: #cde5dc; background: rgba(30,40,36,0.55);
      border: 1px dashed rgba(255,255,255,0.12);
    }

    .group {
      margin: 10px 16px 14px;
      padding: 12px 16px;
      border-radius: 16px;
      background: rgba(20,28,26,0.42);
      border: 1px solid rgba(255,255,255,0.10);
      display: flex; justify-content: space-between; align-items: center;
    }
    .group-title { color: #a7dcff; font-weight: 800; }
    .group button {
      border: 1px solid rgba(255,255,255,0.25);
      background: rgba(255,255,255,0.08);
      color: #fff; border-radius: 12px; padding: 8px 14px; cursor: pointer;
    }

    .reset {
      display: flex; justify-content: center; padding: 10px 0 20px;
    }
    .reset button {
      border: 3.5px solid #ff4c6a; color: #ff4c6a; border-radius: 24px;
      padding: 12px 38px; background: transparent; cursor: pointer;
      font-size: 1.05rem; font-weight: 800; box-shadow: 0 2px 24px #ff4c6a44;
      transition: background .18s, color .18s, box-shadow .18s;
    }
    .reset button:hover {
      background: rgba(255,76,106,0.18);
      color: #fff; box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;

  render() {
    const pkey = this._selectedPreset;
    const p = PRESETS[pkey] || PRESETS.green;

    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🎨 Color Presets</div>

        <!-- Preset picker -->
        <div class="row">
          ${Object.entries(PRESETS).map(([key, def]) => html`
            <div class="preset-card" style="outline:${this._selectedPreset===key?'2px solid #79f5c6':'none'}">
              <div class="preset-title">${def.label}</div>
              <div class="swatches">
                <div class="swatch" @click=${() => this._selectPreset(key, 'active')}>
                  <div class="dot" style="background:${def.active.icon}"></div>
                  <div>
                    <div style="font-weight:700">Active</div>
                    <small>bg <span style="color:${def.active.bg}">${def.active.bg}</span> &nbsp;•&nbsp; icon <span style="color:${def.active.icon}">${def.active.icon}</span></small>
                  </div>
                </div>
                <div class="swatch" @click=${() => this._selectPreset(key, 'inactive')}>
                  <div class="dot" style="background:${def.inactive.icon}"></div>
                  <div>
                    <div style="font-weight:700">Inactive</div>
                    <small>bg <span style="color:${def.inactive.bg}">${def.inactive.bg}</span> &nbsp;•&nbsp; icon <span style="color:${def.inactive.icon}">${def.inactive.icon}</span></small>
                  </div>
                </div>
              </div>
            </div>
          `)}
        </div>

        <!-- Toggle di applicazione -->
        <div class="toggles">
          <label class="toggle">
            <input type="checkbox" .checked=${this._applyRoom} @change=${e => this._applyRoom = e.target.checked} />
            <span>Applica a Room</span>
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._applySub} @change=${e => this._applySub = e.target.checked} />
            <span>Applica a Subbutton</span>
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._applyMushroom} @change=${e => this._applyMushroom = e.target.checked} />
            <span>Applica ai Mushroom (incl. Camera & Climate)</span>
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._applySensors} @change=${e => this._applySensors = e.target.checked} />
            <span>Applica ai Sensori</span>
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._includeText} @change=${e => this._includeText = e.target.checked} />
            <span>Includi testo (Room)</span>
          </label>
        </div>

        <div class="apply">
          <button @click=${() => this._applyPreset()}>Applica preset</button>
        </div>

        <div class="group">
          <div class="group-title">Room Colors & Subbutton Colors</div>
          <button @click=${() => this._previewInfo()}>preview</button>
        </div>

        <div class="note">
          Applichiamo background/icon per <b>Active/Inactive</b>. Se “Includi testo” è attivo,
          aggiorniamo anche <code>colors.room.text_active / text_inactive</code> (alias
          <code>title_active / title_inactive</code>).
        </div>

        <div class="reset">
          <button @click=${this._resetAll}>🧹 Reset Colors</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  /* --------------------------- helpers/dispatch --------------------------- */
  _set(path, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: path, val },
      bubbles: true, composed: true,
    }));
  }
  _setMany(paths, val) {
    for (const p of paths) this._set(p, val);
  }
  _selectPreset(key) {
    this._selectedPreset = key;
  }
  _previewInfo() {
    // solo un placeholder informativo per ora
  }

  /* --------------------------- applicazione preset ------------------------ */
  _applyPreset() {
    const preset = PRESETS[this._selectedPreset] || PRESETS.green;
    const ACTIVE   = { bg: preset.active.bg,   icon: preset.active.icon,   text: preset.active.text   || preset.active.icon };
    const INACTIVE = { bg: preset.inactive.bg, icon: preset.inactive.icon, text: preset.inactive.text || preset.inactive.icon };

    // ROOM
    if (this._applyRoom) {
      this._set('colors.room.background_active',   ACTIVE.bg);
      this._set('colors.room.background_inactive', INACTIVE.bg);
      this._set('colors.room.icon_active',         ACTIVE.icon);
      this._set('colors.room.icon_inactive',       INACTIVE.icon);

      if (this._includeText) {
        this._set('colors.room.text_active',   ACTIVE.text);
        this._set('colors.room.text_inactive', INACTIVE.text);
        // alias titolo (alcuni layout leggono questi)
        this._set('colors.room.title_active',   ACTIVE.text);
        this._set('colors.room.title_inactive', INACTIVE.text);
      }
    }

    // SUBBUTTON (singolare + plurale)
    if (this._applySub) {
      this._setMany([
        'colors.subbutton.background_active',
        'colors.subbuttons.background_active',
      ], ACTIVE.bg);
      this._setMany([
        'colors.subbutton.background_inactive',
        'colors.subbuttons.background_inactive',
      ], INACTIVE.bg);
      this._setMany([
        'colors.subbutton.icon_active',
        'colors.subbuttons.icon_active',
      ], ACTIVE.icon);
      this._setMany([
        'colors.subbutton.icon_inactive',
        'colors.subbuttons.icon_inactive',
      ], INACTIVE.icon);
    }

    // MUSHROOM + alias & Camera/Climate
    if (this._applyMushroom) {
      // bucket generale per entità mushroom
      this._setMany([
        'colors.mushroom.background_active',
        'colors.mushrooms.background_active',
        'colors.entities.background_active',
      ], ACTIVE.bg);
      this._setMany([
        'colors.mushroom.background_inactive',
        'colors.mushrooms.background_inactive',
        'colors.entities.background_inactive',
      ], INACTIVE.bg);
      this._setMany([
        'colors.mushroom.icon_active',
        'colors.mushrooms.icon_active',
        'colors.entities.icon_active',
      ], ACTIVE.icon);
      this._setMany([
        'colors.mushroom.icon_inactive',
        'colors.mushrooms.icon_inactive',
        'colors.entities.icon_inactive',
      ], INACTIVE.icon);

      // alias specifici camera & climate
      for (const key of ['camera', 'climate']) {
        this._set(`colors.${key}.background_active`,   ACTIVE.bg);
        this._set(`colors.${key}.background_inactive`, INACTIVE.bg);
        this._set(`colors.${key}.icon_active`,         ACTIVE.icon);
        this._set(`colors.${key}.icon_inactive`,       INACTIVE.icon);
      }
    }

    // SENSORS (chip)
    if (this._applySensors) {
      this._set('colors.sensors.chip_bg_active',      ACTIVE.bg);
      this._set('colors.sensors.chip_bg_inactive',    INACTIVE.bg);
      this._set('colors.sensors.chip_icon_active',    ACTIVE.icon);
      this._set('colors.sensors.chip_icon_inactive',  INACTIVE.icon);
    }
  }

  /* --------------------------- reset ------------------------------------- */
  _resetAll = () => {
    const paths = [
      // room
      'colors.room.background_active','colors.room.background_inactive',
      'colors.room.icon_active','colors.room.icon_inactive',
      'colors.room.text_active','colors.room.text_inactive',
      'colors.room.title_active','colors.room.title_inactive',

      // subbutton (sing. + plur.)
      'colors.subbutton.background_active','colors.subbutton.background_inactive',
      'colors.subbutton.icon_active','colors.subbutton.icon_inactive',
      'colors.subbuttons.background_active','colors.subbuttons.background_inactive',
      'colors.subbuttons.icon_active','colors.subbuttons.icon_inactive',

      // mushroom (sing. + plur. + entities)
      'colors.mushroom.background_active','colors.mushroom.background_inactive',
      'colors.mushroom.icon_active','colors.mushroom.icon_inactive',
      'colors.mushrooms.background_active','colors.mushrooms.background_inactive',
      'colors.mushrooms.icon_active','colors.mushrooms.icon_inactive',
      'colors.entities.background_active','colors.entities.background_inactive',
      'colors.entities.icon_active','colors.entities.icon_inactive',

      // camera/climate
      'colors.camera.background_active','colors.camera.background_inactive',
      'colors.camera.icon_active','colors.camera.icon_inactive',
      'colors.climate.background_active','colors.climate.background_inactive',
      'colors.climate.icon_active','colors.climate.icon_inactive',

      // sensors (chips)
      'colors.sensors.chip_bg_active','colors.sensors.chip_bg_inactive',
      'colors.sensors.chip_icon_active','colors.sensors.chip_icon_inactive',
    ];
    for (const p of paths) this._set(p, '');
  };
}

customElements.define('color-panel', ColorPanel);