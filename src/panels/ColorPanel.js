// src/panels/ColorPanel.js
import { LitElement, html, css } from 'lit';

export class ColorPanel extends LitElement {
  static properties = {
    hass:     { type: Object },
    config:   { type: Object },
    expanded: { type: Boolean },

    // stati derivati e UI
    _room:      { type: Object, state: true },
    _subbutton: { type: Object, state: true },
    _mushroom:  { type: Object, state: true },
    _sensor:    { type: Object, state: true },

    _selectedPreset:  { type: String,  state: true },
    _expandedColors:  { type: Array,   state: true }, // [room, subbutton, mushroom]
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.expanded = false;

    // stati locali
    this._room = {};
    this._subbutton = {};
    this._mushroom = {};
    this._sensor = {};

    // UI state
    this._selectedPreset = 'green';
    this._expandedColors = [false, false, false];
  }

  updated(changed) {
    if (changed.has('config')) {
      const c = this.config?.colors || {};
      this._room = {
        icon_active:         c.room?.icon_active ?? '',
        icon_inactive:       c.room?.icon_inactive ?? '',
        background_active:   c.room?.background_active ?? '',
        background_inactive: c.room?.background_inactive ?? '',
        text_active:         c.room?.text_active ?? '',
        text_inactive:       c.room?.text_inactive ?? '',
      };
      this._subbutton = {
        background_on:  c.subbutton?.background_on  ?? '',
        background_off: c.subbutton?.background_off ?? '',
        icon_on:        c.subbutton?.icon_on        ?? '',
        icon_off:       c.subbutton?.icon_off       ?? '',
      };
      this._mushroom = {
        active:   c.mushroom?.active   ?? '',
        inactive: c.mushroom?.inactive ?? '',
      };
      this._sensor = {
        sensor_active:   c.sensor?.sensor_active   ?? '',
        sensor_inactive: c.sensor?.sensor_inactive ?? '',
      };
    }
  }

  // ───────────────── Preset (schema NIDIFICATO usato dalla UI) ─────────────────
  get PRESETS() {
    return {
      green: {
        label: 'Green',
        room: {
          icon_active: '#21df73',
          icon_inactive: '#173c16',
          background_active: 'rgba(33,223,115,0.12)',
          background_inactive: 'rgba(23,60,22,0.12)',
          text_active: '#ffffff',
          text_inactive: 'rgba(255,255,255,0.55)',
        },
        sub: {
          background_on: 'rgba(33,223,115,1)',
          background_off: 'rgba(33,223,115,0.28)',
          icon_on: '#fff',
          icon_off: '#667a6a',
        },
        mushroom: { active: '#00e676', inactive: '#7a8b7a' },
        sensor: { sensor_active: '#21df73', sensor_inactive: '#173c16' },
      },
      blue: {
        label: 'Blue',
        room: {
          icon_active: '#55afff',
          icon_inactive: '#0f2a4a',
          background_active: 'rgba(85,175,255,0.14)',
          background_inactive: 'rgba(15,42,74,0.14)',
          text_active: '#ffffff',
          text_inactive: 'rgba(255,255,255,0.55)',
        },
        sub: {
          background_on: 'rgba(85,175,255,1)',
          background_off: 'rgba(85,175,255,0.28)',
          icon_on: '#fff',
          icon_off: '#5c6b7a',
        },
        mushroom: { active: '#59c3ff', inactive: '#7a8793' },
        sensor: { sensor_active: '#55afff', sensor_inactive: '#0f2a4a' },
      },
      amber: {
        label: 'Amber',
        room: {
          icon_active: '#ff9b3d',
          icon_inactive: '#4a2a0f',
          background_active: 'rgba(255,155,61,0.16)',
          background_inactive: 'rgba(74,42,15,0.12)',
          text_active: '#ffffff',
          text_inactive: 'rgba(255,255,255,0.55)',
        },
        sub: {
          background_on: 'rgba(255,155,61,1)',
          background_off: 'rgba(255,155,61,0.28)',
          icon_on: '#1f140a',
          icon_off: '#6b5c52',
        },
        mushroom: { active: '#ffb067', inactive: '#8b7a6e' },
        sensor: { sensor_active: '#ff9b3d', sensor_inactive: '#4a2a0f' },
      },
      purple: {
        label: 'Purple',
        room: {
          icon_active: '#bd64ff',
          icon_inactive: '#2c0f4a',
          background_active: 'rgba(189,100,255,0.16)',
          background_inactive: 'rgba(44,15,74,0.12)',
          text_active: '#ffffff',
          text_inactive: 'rgba(255,255,255,0.55)',
        },
        sub: {
          background_on: 'rgba(189,100,255,1)',
          background_off: 'rgba(189,100,255,0.28)',
          icon_on: '#160a1f',
          icon_off: '#6b5c7a',
        },
        mushroom: { active: '#c785ff', inactive: '#837a8b' },
        sensor: { sensor_active: '#bd64ff', sensor_inactive: '#2c0f4a' },
      },
      red: {
        label: 'Red',
        room: {
          icon_active: '#ff5c6a',
          icon_inactive: '#4a0f1a',
          background_active: 'rgba(255,92,106,0.16)',
          background_inactive: 'rgba(74,15,26,0.12)',
          text_active: '#ffffff',
          text_inactive: 'rgba(255,255,255,0.55)',
        },
        sub: {
          background_on: 'rgba(255,92,106,1)',
          background_off: 'rgba(255,92,106,0.28)',
          icon_on: '#1f0a10',
          icon_off: '#7a5c65',
        },
        mushroom: { active: '#ff7884', inactive: '#8b7a7f' },
        sensor: { sensor_active: '#ff5c6a', sensor_inactive: '#4a0f1a' },
      },
      gray: {
        label: 'Gray',
        room: {
          icon_active: '#c5c8ce',
          icon_inactive: '#3b4048',
          background_active: 'rgba(197,200,206,0.14)',
          background_inactive: 'rgba(59,64,72,0.12)',
          text_active: '#ffffff',
          text_inactive: 'rgba(255,255,255,0.55)',
        },
        sub: {
          background_on: 'rgba(197,200,206,1)',
          background_off: 'rgba(197,200,206,0.28)',
          icon_on: '#1a1b1d',
          icon_off: '#6b707a',
        },
        mushroom: { active: '#d7d9de', inactive: '#83878f' },
        sensor: { sensor_active: '#c5c8ce', sensor_inactive: '#3b4048' },
      },
    };
  }

  // ─────────────────── STILI ───────────────────
  static styles = css`
    :host { display:block; }
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(95,255,235,0.26));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(95,255,235,0.13));
      overflow: hidden;
    }
    / *.glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.14),
        rgba(255,255,255,0.08) 70%, transparent 100%));
      pointer-events: none;
    } */
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.11rem;
      font-weight: 700;
      color: #fff;
    }

    /* Grid delle card preset */
    .preset-bar {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
      padding: 8px 16px 2px 16px;
      box-sizing: border-box;
    }
    .preset-card {
      position: relative;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.14);
      background: rgba(24,32,40,0.45);
      padding: 12px 12px 10px;
      cursor: pointer;
      user-select: none;
      transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
      outline: none;
      display: grid;
      grid-template-rows: auto auto; /* nome sopra, swatches sotto */
      gap: 8px;
    }
    .preset-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
      border-color: rgba(255,255,255,0.28);
    }
    .preset-card.selected {
      border-color: #73f6e5;
      box-shadow: 0 0 0 2px inset rgba(115,246,229,0.35);
    }
    .preset-name {
      order: 1;
      font-weight: 800;
      color: #e9f8ff;
      font-size: .95rem;
      text-align: center;
      margin-bottom: 2px;
    }

    /* swatches: etichetta SOTTO al pallino */
    .swatches {
      order: 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .swatch {
      border-radius: 10px;
      padding: 8px 6px;
      border: 1px solid rgba(255,255,255,0.10);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      flex-direction: column;   /* testo sotto */
    }
    .dot {
      width: 16px; height: 16px; border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.75);
      flex: 0 0 auto;
    }
    .swatch-label {
      color: #f0f6ff;
      font-size: .8rem;
      opacity: .95;
      line-height: 1;
    }
    /* tasto apply preset */
    .apply-row {
      display: flex;
      justify-content: center;
      padding: 16px 0;
    }

    .apply-btn {
      font-size: 1.1rem;
      padding: 12px 24px;
      border: 2.5px solid #73f6e5;
      color: #073a34;
      background: #73f6e5;
      border-radius: 14px;
      cursor: pointer;
      font-weight: 800;
      transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
    }
    .apply-btn:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }

    /* Sezioni manuali */
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin: 8px 16px;
      overflow: hidden;
      transition: background 0.18s, box-shadow 0.18s, border 0.18s;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      padding: 15px 22px;
      font-weight: 800;
      color: var(--section-accent, #73f6e5);
      cursor: pointer;
      user-select: none;
    }
    .mini-pill-header .chevron {
      margin-left: auto;
      font-size: 1.2em;
      transition: transform 0.18s;
    }
    .mini-pill.expanded .mini-pill-header .chevron {
      transform: rotate(90deg);
    }
    .mini-pill-content {
      padding: 15px 22px 16px;
      animation: pill-expand 0.22s cubic-bezier(.5,1.2,.6,1) both;
      position: relative;
      z-index: 1;
    }
    @keyframes pill-expand {
      from { opacity: 0; transform: translateY(-12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 18px;
      margin-bottom: 13px;
      padding: 14px 18px 10px;
    }
    .input-group label {
      display: block;
      font-size: 1.13rem;
      font-weight: 700;
      color: var(--section-accent, #73f6e5);
      margin-bottom: 6px;
    }
    input[type="color"] {
      width: 56px; height: 32px;
      border: 2px solid #fff4;
      border-radius: 9px;
      cursor: pointer;
    }
    input[type="range"] { width: 100%; }
    input[type="text"] {
      width: 100%;
      border: 1px solid #444;
      border-radius: 6px;
      padding: 8px;
      background-color: #202020;
      color: #f1f1f1;
      font-size: 0.97rem;
    }
    .reset-button {
      border: 3.5px solid #ff4c6a !important;
      color: #ff4c6a !important;
      font-size: 1.15rem;
      font-weight: 700;
      box-shadow: 0 2px 24px #ff4c6a44;
      padding: 12px 38px !important;
      margin: 20px auto 0 auto !important;
      display: block;
      background: transparent;
      border-radius: 24px !important;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18) !important;
      color: #fff !important;
      box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;

  // ─────────────────── UI ───────────────────
  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => {
          this.expanded = e.detail.expanded;
          if (this.expanded) this._expandedColors = [false, false, false];
        }}
      >
        <div slot="header" class="glass-header">🎨 Colors & Presets</div>

        <!-- Preset chooser -->
        ${this._renderPresetChooser()}

        <!-- Room colors -->
        <div class="mini-pill ${this._expandedColors[0] ? 'expanded' : ''}">
          <div
            class="mini-pill-header"
            style="--section-accent: #55afff;"
            @click=${() => this._toggleColor(0)}
          >
            Room Colors
            <span class="chevron">${this._expandedColors[0] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[0] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('room', 'background_active',   'Background Active')}
              ${this._renderColorField('room', 'background_inactive', 'Background Inactive')}
              ${this._renderColorField('room', 'icon_active',         'Icon Active')}
              ${this._renderColorField('room', 'icon_inactive',       'Icon Inactive')}
              ${this._renderColorField('room', 'text_active',         'Text Active')}
              ${this._renderColorField('room', 'text_inactive',       'Text Inactive')}
            </div>
          ` : ''}
        </div>

        <!-- Subbutton colors -->
        <div class="mini-pill ${this._expandedColors[1] ? 'expanded' : ''}">
          <div
            class="mini-pill-header"
            style="--section-accent: #b28fff;"
            @click=${() => this._toggleColor(1)}
          >
            Subbutton Colors
            <span class="chevron">${this._expandedColors[1] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[1] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('subbutton', 'background_on',  'Background On')}
              ${this._renderColorField('subbutton', 'background_off', 'Background Off')}
              ${this._renderColorField('subbutton', 'icon_on',        'Icon On')}
              ${this._renderColorField('subbutton', 'icon_off',       'Icon Off')}
            </div>
          ` : ''}
        </div>

        <!-- Mushroom colors -->
        <div class="mini-pill ${this._expandedColors[2] ? 'expanded' : ''}">
          <div
            class="mini-pill-header"
            style="--section-accent: #4bd1b4;"
            @click=${() => this._toggleColor(2)}
          >
            Mushroom Colors
            <span class="chevron">${this._expandedColors[2] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[2] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('mushroom', 'active',   'Active')}
              ${this._renderColorField('mushroom', 'inactive', 'Inactive')}
            </div>
          ` : ''}
        </div>

        <!-- Reset -->
        <button class="reset-button" @click=${() => this._resetColors()}>
          🧹 Reset Colors
        </button>
      </ha-expansion-panel>
    `;
  }

  // ─────────────────── UI helpers ───────────────────
  _renderPresetChooser() {
    const keys = Object.keys(this.PRESETS);
    return html`
      <div class="preset-bar">
        ${keys.map(k => this._renderPresetCard(k, this.PRESETS[k]))}
      </div>
      <div class="apply-row">
        <button class="apply-btn" @click=${this._applySelectedPreset}>
          Apply Preset
        </button>
      </div>
    `;
  }

  _renderPresetCard(key, p) {
    const sel = this._selectedPreset === key ? 'selected' : '';
    const roomA = p.room.background_active;
    const roomI = p.room.background_inactive;
    const iconA = p.room.icon_active;
    const iconI = p.room.icon_inactive;
    return html`
      <div class="preset-card ${sel}" @click=${() => this._selectedPreset = key}>
        <div class="preset-name">${p.label}</div>
        <div class="swatches">
          <div class="swatch" style="background:${roomA}">
            <span class="dot" style="background:${iconA}"></span>
            <span class="swatch-label">On</span>
          </div>
          <div class="swatch" style="background:${roomI}">
            <span class="dot" style="background:${iconI}"></span>
            <span class="swatch-label">Off</span>
          </div>
        </div>
      </div>
    `;
  }

  _toggleColor(index) {
    this._expandedColors = this._expandedColors.map((v, i) => i === index ? !v : false);
  }

  _renderColorField(section, key, label) {
    const rgba = this.config?.colors?.[section]?.[key] || '';
    const [r, g, b, a] = this._parseRGBA(rgba);
    const hex = `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    return html`
      <div class="input-group">
        <label>${label}</label>
        <input
          type="color"
          .value=${hex}
          @input=${e => this._updateColor(section, key, e.target.value, a)}
        />
        <input
          type="range"
          min="0" max="1" step="0.01"
          .value=${a}
          @input=${e => this._updateColor(section, key, hex, e.target.value)}
        />
        <input
          type="text"
          .value=${rgba}
          @input=${e => this._updateColorRaw(section, key, e.target.value)}
        />
      </div>
    `;
  }

  // ─────────────────── APPLY / RESET ───────────────────
  _applySelectedPreset = () => {
    const key = this._selectedPreset;
    const preset = this.PRESETS[key];
    if (!preset) return;

    const ops = [
      // Room
      ['colors.room.background_active',   preset.room.background_active],
      ['colors.room.background_inactive', preset.room.background_inactive],
      ['colors.room.icon_active',         preset.room.icon_active],
      ['colors.room.icon_inactive',       preset.room.icon_inactive],
      ['colors.room.text_active',         preset.room.text_active],
      ['colors.room.text_inactive',       preset.room.text_inactive],

      // Subbutton
      ['colors.subbutton.background_on',  preset.sub.background_on],
      ['colors.subbutton.background_off', preset.sub.background_off],
      ['colors.subbutton.icon_on',        preset.sub.icon_on],
      ['colors.subbutton.icon_off',       preset.sub.icon_off],

      // Mushroom
      ['colors.mushroom.active',          preset.mushroom.active],
      ['colors.mushroom.inactive',        preset.mushroom.inactive],

      // Sensor
      ['colors.sensor.sensor_active',     preset.sensor.sensor_active],
      ['colors.sensor.sensor_inactive',   preset.sensor.sensor_inactive],
    ];

    for (const [prop, val] of ops) {
      this._emit(prop, val);
    }
  };

  _resetColors() {
    this._expandedColors = [false, false, false];
    const sections = ['room','subbutton','mushroom','sensor'];
    const keys = {
      room:      ['background_active','background_inactive','icon_active','icon_inactive','text_active','text_inactive'],
      subbutton: ['background_on','background_off','icon_on','icon_off'],
      mushroom:  ['active','inactive'],
      sensor:    ['sensor_active','sensor_inactive'],
    };
    sections.forEach(sec => {
      keys[sec].forEach(k => this._emit(`colors.${sec}.${k}`, ''));
    });
  }

  // ─────────────────── Low-level helpers ───────────────────
  _parseRGBA(str) {
    if (!str) return [0,0,0,1];
    const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(str);
    if (m) return [ +m[1], +m[2], +m[3], +(m[4] ?? 1) ];
    // supporta anche #rrggbb fallback
    if (str.startsWith('#') && (str.length === 7 || str.length === 4)) {
      const hex = str.length === 7 ? str.slice(1) :
        str.slice(1).split('').map(c => c + c).join('');
      const r = parseInt(hex.slice(0,2),16);
      const g = parseInt(hex.slice(2,4),16);
      const b = parseInt(hex.slice(4,6),16);
      return [r,g,b,1];
    }
    return [0,0,0,1];
  }

  _updateColor(section, key, hex, alpha) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    const a = Number(alpha);
    const rgba = `rgba(${r},${g},${b},${isNaN(a) ? 1 : a})`;
    this._emit(`colors.${section}.${key}`, rgba);
  }

  _updateColorRaw(section, key, raw) {
    this._emit(`colors.${section}.${key}`, raw);
  }

  _emit(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('color-panel', ColorPanel);
