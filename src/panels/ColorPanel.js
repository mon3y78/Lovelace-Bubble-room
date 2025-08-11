// src/panels/ColorPanel.js
import { LitElement, html, css } from 'lit';

export class ColorPanel extends LitElement {
  static properties = {
    hass:     { type: Object },
    config:   { type: Object },
    expanded: { type: Boolean },
    _room:      { type: Object, state: true },
    _subbutton: { type: Object, state: true },
    _mushroom:  { type: Object, state: true },
    _sensor:    { type: Object, state: true },

    // ✅ quale preset è selezionato (per la cornice stile screenshot)
    _selectedKey: { type: String, state: true },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this.expanded = false;

    this._room = {};
    this._subbutton = {};
    this._mushroom = {};
    this._sensor = {};
    this._selectedKey = ''; // nessuno selezionato di default
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

  /* ─────────── Preset data ─────────── */
  get _presets() {
    return [
      {
        key: 'green',
        name: 'Green',
        preview: { active: '#21df73', inactive: '#173c16' },
        map: {
          'colors.room.icon_active':        '#21df73',
          'colors.room.icon_inactive':      '#173c16',
          'colors.room.background_active':  'rgba(33,223,115,0.12)',
          'colors.room.background_inactive':'rgba(23,60,22,0.12)',
          'colors.room.text_active':        '#ffffff',
          'colors.room.text_inactive':      'rgba(255,255,255,0.55)',
          'colors.subbutton.background_on':  'rgba(33,223,115,1)',
          'colors.subbutton.background_off': 'rgba(33,223,115,0.28)',
          'colors.subbutton.icon_on':        '#fff',
          'colors.subbutton.icon_off':       '#667a6a',
          'colors.mushroom.active':   '#00e676',
          'colors.mushroom.inactive': '#7a8b7a',
          'colors.sensor.sensor_active':   '#21df73',
          'colors.sensor.sensor_inactive': '#173c16',
        }
      },
      {
        key: 'blue', name: 'Blue',
        preview: { active: '#55afff', inactive: '#0f2a4a' },
        map: {
          'colors.room.icon_active':        '#55afff',
          'colors.room.icon_inactive':      '#0f2a4a',
          'colors.room.background_active':  'rgba(85,175,255,0.14)',
          'colors.room.background_inactive':'rgba(15,42,74,0.14)',
          'colors.room.text_active':        '#ffffff',
          'colors.room.text_inactive':      'rgba(255,255,255,0.55)',
          'colors.subbutton.background_on':  'rgba(85,175,255,1)',
          'colors.subbutton.background_off': 'rgba(85,175,255,0.28)',
          'colors.subbutton.icon_on':        '#fff',
          'colors.subbutton.icon_off':       '#5c6b7a',
          'colors.mushroom.active':   '#59c3ff',
          'colors.mushroom.inactive': '#7a8793',
          'colors.sensor.sensor_active':   '#55afff',
          'colors.sensor.sensor_inactive': '#0f2a4a',
        }
      },
      {
        key: 'orange', name: 'Amber',
        preview: { active: '#ff9b3d', inactive: '#4a2a0f' },
        map: {
          'colors.room.icon_active':        '#ff9b3d',
          'colors.room.icon_inactive':      '#4a2a0f',
          'colors.room.background_active':  'rgba(255,155,61,0.16)',
          'colors.room.background_inactive':'rgba(74,42,15,0.12)',
          'colors.room.text_active':        '#ffffff',
          'colors.room.text_inactive':      'rgba(255,255,255,0.55)',
          'colors.subbutton.background_on':  'rgba(255,155,61,1)',
          'colors.subbutton.background_off': 'rgba(255,155,61,0.28)',
          'colors.subbutton.icon_on':        '#1f140a',
          'colors.subbutton.icon_off':       '#6b5c52',
          'colors.mushroom.active':   '#ffb067',
          'colors.mushroom.inactive': '#8b7a6e',
          'colors.sensor.sensor_active':   '#ff9b3d',
          'colors.sensor.sensor_inactive': '#4a2a0f',
        }
      },
      {
        key: 'purple', name: 'Purple',
        preview: { active: '#bd64ff', inactive: '#2c0f4a' },
        map: {
          'colors.room.icon_active':        '#bd64ff',
          'colors.room.icon_inactive':      '#2c0f4a',
          'colors.room.background_active':  'rgba(189,100,255,0.16)',
          'colors.room.background_inactive':'rgba(44,15,74,0.12)',
          'colors.room.text_active':        '#ffffff',
          'colors.room.text_inactive':      'rgba(255,255,255,0.55)',
          'colors.subbutton.background_on':  'rgba(189,100,255,1)',
          'colors.subbutton.background_off': 'rgba(189,100,255,0.28)',
          'colors.subbutton.icon_on':        '#160a1f',
          'colors.subbutton.icon_off':       '#6b5c7a',
          'colors.mushroom.active':   '#c785ff',
          'colors.mushroom.inactive': '#837a8b',
          'colors.sensor.sensor_active':   '#bd64ff',
          'colors.sensor.sensor_inactive': '#2c0f4a',
        }
      },
      {
        key: 'red', name: 'Red',
        preview: { active: '#ff5c6a', inactive: '#4a0f1a' },
        map: {
          'colors.room.icon_active':        '#ff5c6a',
          'colors.room.icon_inactive':      '#4a0f1a',
          'colors.room.background_active':  'rgba(255,92,106,0.16)',
          'colors.room.background_inactive':'rgba(74,15,26,0.12)',
          'colors.room.text_active':        '#ffffff',
          'colors.room.text_inactive':      'rgba(255,255,255,0.55)',
          'colors.subbutton.background_on':  'rgba(255,92,106,1)',
          'colors.subbutton.background_off': 'rgba(255,92,106,0.28)',
          'colors.subbutton.icon_on':        '#1f0a10',
          'colors.subbutton.icon_off':       '#7a5c65',
          'colors.mushroom.active':   '#ff7884',
          'colors.mushroom.inactive': '#8b7a7f',
          'colors.sensor.sensor_active':   '#ff5c6a',
          'colors.sensor.sensor_inactive': '#4a0f1a',
        }
      },
      {
        key: 'gray', name: 'Gray',
        preview: { active: '#c5c8ce', inactive: '#3b4048' },
        map: {
          'colors.room.icon_active':        '#c5c8ce',
          'colors.room.icon_inactive':      '#3b4048',
          'colors.room.background_active':  'rgba(197,200,206,0.14)',
          'colors.room.background_inactive':'rgba(59,64,72,0.12)',
          'colors.room.text_active':        '#ffffff',
          'colors.room.text_inactive':      'rgba(255,255,255,0.55)',
          'colors.subbutton.background_on':  'rgba(197,200,206,1)',
          'colors.subbutton.background_off': 'rgba(197,200,206,0.28)',
          'colors.subbutton.icon_on':        '#1a1b1d',
          'colors.subbutton.icon_off':       '#6b707a',
          'colors.mushroom.active':   '#d7d9de',
          'colors.mushroom.inactive': '#83878f',
          'colors.sensor.sensor_active':   '#c5c8ce',
          'colors.sensor.sensor_inactive': '#3b4048',
        }
      },
    ];
  }

  /* ─────────── Helpers ─────────── */
  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }

  _applyPreset(map) {
    Object.entries(map).forEach(([prop, val]) => this._fire(prop, val));
  }

  // ✅ applica quello selezionato
  _applySelected = () => {
    const p = this._presets.find(x => x.key === this._selectedKey);
    if (p) this._applyPreset(p.map);
  };

  _onColorInput(section, key, val) {
    const next = { ...(this[`_${section}`] || {}) };
    next[key] = val;
    this[`_${section}`] = next;
    this._fire(`colors.${section}.${key}`, val);
  }

  _resetAll() {
    const blank = {
      room: ['icon_active','icon_inactive','background_active','background_inactive','text_active','text_inactive'],
      subbutton: ['background_on','background_off','icon_on','icon_off'],
      mushroom: ['active','inactive'],
      sensor: ['sensor_active','sensor_inactive'],
    };
    Object.entries(blank).forEach(([sec, keys]) =>
      keys.forEach(k => this._fire(`colors.${sec}.${k}`, ''))
    );
  }

  /* ─────────── STILI ─────────── */
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
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.14),
        rgba(255,255,255,0.08) 70%, transparent 100%));
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.11rem;
      font-weight: 700;
      color: #fff;
    }

    /* === Cards preset in griglia === */
    .preset-bar {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 10px;
      padding: 8px 16px 2px 16px;
      box-sizing: border-box;
    }
    .preset-card {
      position: relative;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.14);
      background: rgba(24,32,40,0.45);
      padding: 10px 10px 12px;
      cursor: pointer;
      user-select: none;
      transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
      outline: none;
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
      font-weight: 700;
      color: #e9f8ff;
      font-size: .95rem;
      margin-bottom: 6px;
      text-align: left;
    }

    /* Pallini con etichetta SOTTO (come richiesto) */
    .swatches {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .swatch {
      border-radius: 10px;
      padding: 8px;
      border: 1px solid rgba(255,255,255,0.10);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .dot {
      width: 14px; height: 14px; border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.75);
      flex: 0 0 auto;
    }
    .swatch-label {
      color: #f0f6ff; font-size: .85rem; opacity: .9;
    }

    /* Bottone “Applica preset” unico e centrato */
    .apply-row {
      display: flex; flex-wrap: wrap; gap: 10px;
      align-items: center; padding: 10px 16px 2px 16px;
    }
    .apply-row .checks { display: flex; gap: 14px; align-items: center; }
    .apply-row label { color: #dfefff; font-weight: 600; font-size: .95rem; }
    .apply-btn {
      margin-left: auto;
      border: 2.5px solid #73f6e5;
      color: #073a34;
      background: #73f6e5;
      border-radius: 12px;
      padding: 8px 16px;
      cursor: pointer;
      font-weight: 800;
      transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
    }
    .apply-btn:hover { transform: translateY(-1px); filter: brightness(1.05); }


    /* Sezioni manuali (come prima) */
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

  /* ─────────── UI ─────────── */
  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => {
          this.expanded = e.detail.expanded;
          if (this.expanded) this._expandedColors = [false, false];
        }}
      >
        <div slot="header" class="glass-header">🎨 Colors & Presets</div>

        <!-- Preset chooser -->
        ${this._renderPresetChooser()}

        <!-- Room colors pill -->
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

        <!-- Subbutton colors pill -->
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

        <!-- Reset -->
        <button class="reset-button" @click=${() => this._resetColors()}>
          🧹 Reset Colors
        </button>
      </ha-expansion-panel>
    `;
  }

  // ===================== UI helpers =====================
  _renderPresetChooser() {
    const keys = Object.keys(this.PRESETS);
    return html`
      <div class="preset-bar">
        ${keys.map(k => this._renderPresetCard(k, this.PRESETS[k]))}
      </div>
      <div class="apply-row">
        <div class="checks">
          <label>
            <input type="checkbox" .checked=${this._applyRoom}
              @change=${e => this._applyRoom = e.target.checked} />
            Applica a Room
          </label>
          <label>
            <input type="checkbox" .checked=${this._applySub}
              @change=${e => this._applySub = e.target.checked} />
            Applica a Subbutton
          </label>
          <label title="Solo per Room">
            <input type="checkbox" .checked=${this._applyText}
              @change=${e => this._applyText = e.target.checked} />
            Includi testo (Room)
          </label>
        </div>
        <button class="apply-btn" @click=${this._applySelectedPreset}>
          Applica preset
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
            <span class="swatch-label">Active</span>
          </div>
          <div class="swatch" style="background:${roomI}">
            <span class="dot" style="background:${iconI}"></span>
            <span class="swatch-label">Inactive</span>
          </div>
        </div>
      </div>
    `;
  }

  _toggleColor(index) {
    this._expandedColors = this._expandedColors.map((v, i) => i === index ? !v : false);
  }

  _renderColorField(section, key, label) {
    const rgba = this.config.colors?.[section]?.[key] || '';
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

  // ===================== APPLY / RESET =====================
  _applySelectedPreset = () => {
    const key = this._selectedPreset;
    const preset = this.PRESETS[key];
    if (!preset) return;

    const ops = [];

    if (this._applyRoom) {
      ops.push(['colors.room.background_active',   preset.room.background_active]);
      ops.push(['colors.room.background_inactive', preset.room.background_inactive]);
      ops.push(['colors.room.icon_active',         preset.room.icon_active]);
      ops.push(['colors.room.icon_inactive',       preset.room.icon_inactive]);
      if (this._applyText) {
        ops.push(['colors.room.text_active',       preset.room.text_active]);
        ops.push(['colors.room.text_inactive',     preset.room.text_inactive]);
      }
    }

    if (this._applySub) {
      ops.push(['colors.subbutton.background_on',  preset.sub.background_on]);
      ops.push(['colors.subbutton.background_off', preset.sub.background_off]);
      ops.push(['colors.subbutton.icon_on',        preset.sub.icon_on]);
      ops.push(['colors.subbutton.icon_off',       preset.sub.icon_off]);
    }

    for (const [prop, val] of ops) {
      this._emit(prop, val);
    }
  };

  _resetColors() {
    this._expandedColors = [false, false];
    const sections = ['room','subbutton'];
    const keys = {
      room:      ['background_active','background_inactive','icon_active','icon_inactive','text_active','text_inactive'],
      subbutton: ['background_on','background_off','icon_on','icon_off']
    };
    sections.forEach(sec => {
      keys[sec].forEach(k => this._emit(`colors.${sec}.${k}`, ''));
    });
  }

  // ===================== Low-level helpers =====================
  _parseRGBA(str) {
    if (!str) return [0,0,0,1];
    const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(str);
    if (m) return [ +m[1], +m[2], +m[3], +(m[4] ?? 1) ];
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
      bubbles: true, composed: true,
    }));
  }
}

customElements.define('color-panel', ColorPanel);