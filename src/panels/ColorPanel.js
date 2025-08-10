// src/panels/ColorPanel.js
import { LitElement, html, css } from 'lit';

/** Preset: per ciascuno definisco colori active/inactive per bg e icon */
const PRESETS = {
  green: {
    label: 'Green',
    active:   { bg: '#1f3a2e', icon: '#7de2a8' },
    inactive: { bg: '#162a22', icon: '#4fb684' },
  },
  blue: {
    label: 'Blue',
    active:   { bg: '#18293d', icon: '#8fd0ff' },
    inactive: { bg: '#122031', icon: '#6fb7ef' },
  },
  amber: {
    label: 'Amber',
    active:   { bg: '#3a2d18', icon: '#ffd37a' },
    inactive: { bg: '#2b2112', icon: '#efbf62' },
  },
  red: {
    label: 'Red',
    active:   { bg: '#3a2224', icon: '#ff9aa4' },
    inactive: { bg: '#2b191b', icon: '#e67c87' },
  },
  gray: {
    label: 'Gray',
    active:   { bg: '#2c2f36', icon: '#cfd6e4' },
    inactive: { bg: '#24262c', icon: '#aeb7c7' },
  },
};

export class ColorPanel extends LitElement {
  static properties = {
    hass:     { type: Object },
    config:   { type: Object },
    expanded: { type: Boolean },

    // stato locale UI
    _preset:         { type: String, state: true },
    _applyRoom:      { type: Boolean, state: true },
    _applySub:       { type: Boolean, state: true },
    _applyMushroom:  { type: Boolean, state: true },
    _applySensors:   { type: Boolean, state: true },
    _includeText:    { type: Boolean, state: true },
  };

  constructor() {
    super();
    this.hass     = {};
    this.config   = {};
    this.expanded = false;

    this._preset        = 'green';
    this._applyRoom     = true;
    this._applySub      = true;
    this._applyMushroom = true;  // nuovo
    this._applySensors  = true;  // nuovo
    this._includeText   = true;  // titolo stanza
  }

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important; width: 100%; box-sizing: border-box;
      border-radius: 40px; position: relative; overflow: hidden;
      background: var(--glass-bg, rgba(110,160,170,0.25));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(110,160,170,0.18));
    }
    .glass-panel::after {
      content:''; position:absolute; inset:0; border-radius:inherit;
      background: linear-gradient(120deg, rgba(255,255,255,0.16),
        rgba(255,255,255,0.08) 70%, transparent 100%);
      pointer-events:none;
    }
    .glass-header {
      padding: 22px 0; text-align: center; font-size: 1.12rem;
      font-weight: 700; color: #fff;
    }

    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 720px) { .row { grid-template-columns: 1fr; } }

    .group {
      margin: 10px 16px; padding: 14px; border-radius: 18px;
      background: rgba(20,30,40,0.28);
      border: 1px solid rgba(255,255,255,0.12);
    }
    .group h4 {
      margin: 0 0 10px; font-weight: 800; color: #bfe7ff;
      letter-spacing: .2px;
    }

    .preset-card {
      border: 2px solid rgba(255,255,255,0.18);
      border-radius: 16px; padding: 10px; cursor: pointer;
      background: rgba(255,255,255,0.04);
      transition: transform .15s, border-color .15s, background .15s;
    }
    .preset-card.active {
      border-color: #67e8f9;
      background: rgba(103,232,249,0.10);
      transform: translateY(-1px);
    }
    .preset-title { color:#fff; font-weight:700; margin-bottom:8px; }
    .swatches { display:flex; gap:12px; }
    .swatch {
      flex:1; display:flex; align-items:center; gap:8px;
      padding:10px; border-radius:12px;
      border:1px solid rgba(255,255,255,0.18);
      background: rgba(0,0,0,0.2);
    }
    .dot { width:20px; height:20px; border-radius:50%; border:2px solid #fff3; }
    .lbl { color:#fff; font-weight:600; }

    .toggles { display:flex; flex-wrap:wrap; gap:16px; margin: 10px 16px; }
    .toggle { display:flex; align-items:center; gap:8px; color:#d4efff; font-weight:700; }
    .actions { display:flex; gap:12px; margin: 14px 16px 6px; }
    .apply-btn {
      flex:1; padding:12px 16px; border-radius:14px;
      border:0; cursor:pointer; font-weight:800; font-size:1rem;
      background:#7af8d0; color:#05302a;
      box-shadow: 0 8px 24px rgba(122,248,208,0.24);
    }

    .reset {
      display:block; margin: 20px auto; padding:12px 30px;
      border-radius:24px; border:3px solid #ff4c6a; background:transparent;
      color:#ff9cab; font-weight:800; cursor:pointer;
      box-shadow: 0 2px 24px #ff4c6a44;
    }

    details { margin: 0 16px 12px; }
    summary {
      list-style: none; cursor: pointer; padding: 12px 14px;
      border-radius: 14px; background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.12); color:#c9e3ff; font-weight:800;
      display:flex; align-items:center; gap:10px;
    }
    summary::-webkit-details-marker { display:none; }
    .kbd {
      margin-left:auto; background:#0b2233; border:1px solid #193245;
      padding: 4px 8px; border-radius:8px; color:#7ec8ff; font-weight:800;
    }
    .hint { color:#9ccaf0; font-size:.93rem; padding:12px 2px 0; }
  `;

  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🎨 Color Presets</div>

        <!-- Preset picker -->
        <div class="row">
          ${Object.entries(PRESETS).map(([key, p]) => html`
            <div
              class="preset-card ${this._preset === key ? 'active' : ''}"
              @click=${() => (this._preset = key)}
            >
              <div class="preset-title">${p.label}</div>
              <div class="swatches">
                <div class="swatch">
                  <div class="dot" style="background:${p.active.bg}"></div>
                  <div class="lbl">Active</div>
                </div>
                <div class="swatch">
                  <div class="dot" style="background:${p.inactive.bg}"></div>
                  <div class="lbl">Inactive</div>
                </div>
              </div>
            </div>
          `)}
        </div>

        <!-- Target toggles -->
        <div class="toggles">
          <label class="toggle">
            <input type="checkbox" .checked=${this._applyRoom}
              @change=${e => this._applyRoom = e.target.checked} />
            Applica a Room
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._applySub}
              @change=${e => this._applySub = e.target.checked} />
            Applica a Subbutton
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._applyMushroom}
              @change=${e => this._applyMushroom = e.target.checked} />
            Applica ai Mushroom (incl. Camera & Climate)
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._applySensors}
              @change=${e => this._applySensors = e.target.checked} />
            Applica ai Sensori
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._includeText}
              @change=${e => this._includeText = e.target.checked} />
            Includi testo (Room)
          </label>
        </div>

        <div class="actions">
          <button class="apply-btn" @click=${this._applyPreset}>Applica preset</button>
        </div>

        <!-- (Facoltativo) Mostra i rami che andremo a toccare -->
        <details>
          <summary>
            Room Colors & Subbutton Colors
            <span class="kbd">preview</span>
          </summary>
          <div class="hint">
            Applichiamo background/icon per Active/Inactive.
            Se “Includi testo” è attivo, aggiorniamo anche
            <code>colors.room.text_active</code> / <code>text_inactive</code>
            (con alias <code>title_active</code> / <code>title_inactive</code>).
          </div>
        </details>

        <button class="reset" @click=${this._resetAll}>🧹 Reset Colors</button>
      </ha-expansion-panel>
    `;
  }

  /* -------------------- APPLY / RESET -------------------- */

  _applyPreset = () => {
    const p = PRESETS[this._preset];
    if (!p) return;

    const ACTIVE   = p.active;
    const INACTIVE = p.inactive;

    // ROOM
    if (this._applyRoom) {
      this._set('colors.room.background_active', ACTIVE.bg);
      this._set('colors.room.background_inactive', INACTIVE.bg);
      this._set('colors.room.icon_active', ACTIVE.icon);
      this._set('colors.room.icon_inactive', INACTIVE.icon);
      if (this._includeText) {
        // allinea titolo/nome stanza
        this._set('colors.room.text_active', ACTIVE.icon);
        this._set('colors.room.text_inactive', INACTIVE.icon);
        // alias compatibili
        this._set('colors.room.title_active', ACTIVE.icon);
        this._set('colors.room.title_inactive', INACTIVE.icon);
      }
    }

    // SUBBUTTON
    if (this._applySub) {
      this._set('colors.subbutton.background_active', ACTIVE.bg);
      this._set('colors.subbutton.background_inactive', INACTIVE.bg);
      this._set('colors.subbutton.icon_active', ACTIVE.icon);
      this._set('colors.subbutton.icon_inactive', INACTIVE.icon);
    }

    // MUSHROOM (+ alias camera/climate)
    if (this._applyMushroom) {
      // bucket generico per tutte le mushroom-entities 1..5
      this._set('colors.mushroom.background_active', ACTIVE.bg);
      this._set('colors.mushroom.background_inactive', INACTIVE.bg);
      this._set('colors.mushroom.icon_active', ACTIVE.icon);
      this._set('colors.mushroom.icon_inactive', INACTIVE.icon);

      // alias specifici perché a volte vengono letti separatamente
      for (const key of ['camera','climate']) {
        this._set(`colors.${key}.background_active`, ACTIVE.bg);
        this._set(`colors.${key}.background_inactive`, INACTIVE.bg);
        this._set(`colors.${key}.icon_active`, ACTIVE.icon);
        this._set(`colors.${key}.icon_inactive`, INACTIVE.icon);
      }
    }

    // SENSORS (badge in alto)
    if (this._applySensors) {
      this._set('colors.sensors.chip_bg_active', ACTIVE.bg);
      this._set('colors.sensors.chip_bg_inactive', INACTIVE.bg);
      this._set('colors.sensors.chip_icon_active', ACTIVE.icon);
      this._set('colors.sensors.chip_icon_inactive', INACTIVE.icon);
    }
  };

  _resetAll = () => {
    const paths = [
      // room
      'colors.room.background_active','colors.room.background_inactive',
      'colors.room.icon_active','colors.room.icon_inactive',
      'colors.room.text_active','colors.room.text_inactive',
      'colors.room.title_active','colors.room.title_inactive',
      // subbutton
      'colors.subbutton.background_active','colors.subbutton.background_inactive',
      'colors.subbutton.icon_active','colors.subbutton.icon_inactive',
      // mushroom
      'colors.mushroom.background_active','colors.mushroom.background_inactive',
      'colors.mushroom.icon_active','colors.mushroom.icon_inactive',
      // camera/climate alias
      'colors.camera.background_active','colors.camera.background_inactive',
      'colors.camera.icon_active','colors.camera.icon_inactive',
      'colors.climate.background_active','colors.climate.background_inactive',
      'colors.climate.icon_active','colors.climate.icon_inactive',
      // sensors
      'colors.sensors.chip_bg_active','colors.sensors.chip_bg_inactive',
      'colors.sensors.chip_icon_active','colors.sensors.chip_icon_inactive',
    ];
    for (const p of paths) this._set(p, '');
  };

  /* -------------------- helpers -------------------- */

  _set(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true, composed: true,
    }));
  }
}

customElements.define('color-panel', ColorPanel);