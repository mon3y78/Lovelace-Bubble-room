// src/panels/ColorPanel.js
import { LitElement, html, css } from 'lit';

/**
 * Pannello colori con layout a card + checkbox (stile screenshot).
 * - Preset selezionabile (bordo evidenziato)
 * - Checkbox: Applica a Room / Subbutton / Mushroom-Climate-Camera / Sensors
 * - Checkbox: Includi testo (Room)
 * - Pulsante "Applica preset"
 * - Sezioni di editing manuale: Room, Subbutton, Mushroom, Sensors
 *
 * Eventi: CustomEvent('panel-changed', { detail: { prop, val } })
 */

export class ColorPanel extends LitElement {
  static properties = {
    hass:     { type: Object },
    config:   { type: Object },
    expanded: { type: Boolean },

    // stato locale per editing manuale
    _room:      { type: Object, state: true },
    _subbutton: { type: Object, state: true },
    _mushroom:  { type: Object, state: true },
    _sensor:    { type: Object, state: true },

    // stato UI layout preset
    _selectedPreset: { type: String,  state: true },
    _applyRoom:      { type: Boolean, state: true },
    _applySub:       { type: Boolean, state: true },
    _applyMush:      { type: Boolean, state: true },
    _applySens:      { type: Boolean, state: true },
    _applyText:      { type: Boolean, state: true },

    // fisarmoniche per le sezioni manuali
    _expandedColors: { type: Array, state: true }, // [room, subbutton, mushroom, sensor]
  };

  constructor() {
    super();
    this.hass     = {};
    this.config   = {};
    this.expanded = false;

    this._room      = {};
    this._subbutton = {};
    this._mushroom  = {};
    this._sensor    = {};

    // layout state
    this._selectedPreset = 'green';
    // di default applica TUTTO, come nel comportamento originale
    this._applyRoom = true;
    this._applySub  = true;
    this._applyMush = true;
    this._applySens = true;
    this._applyText = true;

    this._expandedColors = [false, false, false, false];
  }

  updated(changed) {
    if (changed.has('config')) {
      const c = this.config?.colors || {};
      // Sync in → stato locale
      this._room = {
        icon_active:        c.room?.icon_active        ?? '',
        icon_inactive:      c.room?.icon_inactive      ?? '',
        background_active:  c.room?.background_active  ?? '',
        background_inactive:c.room?.background_inactive?? '',
        text_active:        c.room?.text_active        ?? '',
        text_inactive:      c.room?.text_inactive      ?? '',
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

  /* ───────────────────── PRESET ───────────────────── */
  // (stessi valori funzionali; preview usata solo per le card)
  get _presets() {
    return [
      {
        key: 'green',
        name: 'Green',
        preview: { active: '#21df73', inactive: '#173c16' },
        map: {
          // ROOM
          'colors.room.icon_active':        '#21df73',
          'colors.room.icon_inactive':      '#173c16',
          'colors.room.background_active':  'rgba(33,223,115,0.12)',
          'colors.room.background_inactive':'rgba(23,60,22,0.12)',
          'colors.room.text_active':        '#ffffff',
          'colors.room.text_inactive':      'rgba(255,255,255,0.55)',

          // SUBBUTTON
          'colors.subbutton.background_on':  'rgba(33,223,115,1)',
          'colors.subbutton.background_off': 'rgba(33,223,115,0.28)',
          'colors.subbutton.icon_on':        '#fff',
          'colors.subbutton.icon_off':       '#667a6a',

          // MUSHROOM
          'colors.mushroom.active':   '#00e676',
          'colors.mushroom.inactive': '#7a8b7a',

          // SENSOR
          'colors.sensor.sensor_active':   '#21df73',
          'colors.sensor.sensor_inactive': '#173c16',
        }
      },
      {
        key: 'blue',
        name: 'Blue',
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
        key: 'orange',
        name: 'Orange',
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
        key: 'purple',
        name: 'Purple',
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
        key: 'red',
        name: 'Red',
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
        key: 'gray',
        name: 'Gray',
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

  /* ───────────────────── STILI ───────────────────── */
  static styles = css`
    :host { display: block; }
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

    /* Preset bar (card a griglia) */
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

    /* Riga apply: checkbox + pulsante */
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

    /* Sezioni (fisarmonica) */
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

  /* ───────────────────── RENDER ───────────────────── */
  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => {
          this.expanded = e.detail.expanded;
          if (this.expanded) this._expandedColors = [false, false, false, false];
        }}
      >
        <div slot="header" class="glass-header">🎨 Colors & Presets</div>

        ${this._renderPresetChooser()}

        ${this._renderPill(
          0, 'Room Colors', '#55afff',
          () => html`
            ${this._renderColorField('room', 'background_active',   'Background Active')}
            ${this._renderColorField('room', 'background_inactive', 'Background Inactive')}
            ${this._renderColorField('room', 'icon_active',         'Icon Active')}
            ${this._renderColorField('room', 'icon_inactive',       'Icon Inactive')}
            ${this._renderColorField('room', 'text_active',         'Text Active')}
            ${this._renderColorField('room', 'text_inactive',       'Text Inactive')}
          `
        )}

        ${this._renderPill(
          1, 'Subbutton Colors', '#b28fff',
          () => html`
            ${this._renderColorField('subbutton', 'background_on',  'Background On')}
            ${this._renderColorField('subbutton', 'background_off', 'Background Off')}
            ${this._renderColorField('subbutton', 'icon_on',        'Icon On')}
            ${this._renderColorField('subbutton', 'icon_off',       'Icon Off')}
          `
        )}

        ${this._renderPill(
          2, 'Mushroom / Camera / Climate', '#36e6a0',
          () => html`
            ${this._renderColorField('mushroom', 'active',   'Active')}
            ${this._renderColorField('mushroom', 'inactive', 'Inactive')}
          `
        )}

        ${this._renderPill(
          3, 'Sensor Colors', '#8cff8a',
          () => html`
            ${this._renderColorField('sensor', 'sensor_active',   'Sensor Active')}
            ${this._renderColorField('sensor', 'sensor_inactive', 'Sensor Inactive')}
          `
        )}

        <button class="reset-button" @click=${() => this._resetAll()}>
          🧹 Reset Colors
        </button>
      </ha-expansion-panel>
    `;
  }

  /* ───────────────────── UI helpers ───────────────────── */
  _renderPresetChooser() {
    return html`
      <div class="preset-bar">
        ${this._presets.map(p => this._renderPresetCard(p))}
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
          <label>
            <input type="checkbox" .checked=${this._applyMush}
              @change=${e => this._applyMush = e.target.checked} />
            Applica a Mushroom/Camera/Climate
          </label>
          <label>
            <input type="checkbox" .checked=${this._applySens}
              @change=${e => this._applySens = e.target.checked} />
            Applica a Sensors
          </label>
        </div>
        <button class="apply-btn" @click=${this._applySelectedPreset}>
          Applica preset
        </button>
      </div>
    `;
  }

  _renderPresetCard(p) {
    const sel = this._selectedPreset === p.key ? 'selected' : '';
    const iconA = p.map['colors.room.icon_active'];
    const iconI = p.map['colors.room.icon_inactive'];
    return html`
      <div class="preset-card ${sel}" @click=${() => (this._selectedPreset = p.key)}>
        <div class="preset-name">${p.name}</div>
        <div class="swatches">
          <div class="swatch" style="background:${p.preview.active}">
            <span class="dot" style="background:${iconA}"></span>
            <span class="swatch-label">Active</span>
          </div>
          <div class="swatch" style="background:${p.preview.inactive}">
            <span class="dot" style="background:${iconI}"></span>
            <span class="swatch-label">Inactive</span>
          </div>
        </div>
      </div>
    `;
  }

  _renderPill(index, title, accent, content) {
    const open = this._expandedColors[index];
    return html`
      <div class="mini-pill ${open ? 'expanded' : ''}">
        <div class="mini-pill-header" style="--section-accent:${accent}"
             @click=${() => this._toggleColor(index)}>
          ${title}
          <span class="chevron">${open ? '▼' : '▶'}</span>
        </div>
        ${open ? html`<div class="mini-pill-content">${content()}</div>` : ''}
      </div>
    `;
  }

  _toggleColor(index) {
    this._expandedColors = this._expandedColors.map((v, i) => i === index ? !v : false);
  }

  _renderColorField(section, key, label) {
    const rgba = this.config.colors?.[section]?.[key] || '';
    const hex = this._guessHex(rgba);
    return html`
      <div class="input-group">
        <label>${label}</label>
        <input
          type="color"
          .value=${hex}
          @input=${e => this._onColorInput(section, key, e.target.value)}
        />
        <input
          type="text"
          placeholder="#RRGGBB oppure rgba(...)"
          .value=${rgba || ''}
          @change=${e => this._onColorInput(section, key, e.target.value)}
        />
      </div>
    `;
  }

  /* ───────────────────── APPLY / RESET ───────────────────── */
  _applySelectedPreset = () => {
    const preset = this._presets.find(p => p.key === this._selectedPreset);
    if (!preset) return;

    // Filtra le entry in base ai toggle
    const entries = Object.entries(preset.map).filter(([prop]) => {
      if (prop.startsWith('colors.room.')) {
        if (!this._applyRoom) return false;
        if (!this._applyText && (prop.endsWith('text_active') || prop.endsWith('text_inactive'))) return false;
        return true;
      }
      if (prop.startsWith('colors.subbutton.')) return this._applySub;
      if (prop.startsWith('colors.mushroom.'))  return this._applyMush;
      if (prop.startsWith('colors.sensor.'))    return this._applySens;
      return true;
    });

    for (const [prop, val] of entries) this._fire(prop, val);
  };

  _resetAll() {
    const blank = {
      room: ['icon_active','icon_inactive','background_active','background_inactive','text_active','text_inactive'],
      subbutton: ['background_on','background_off','icon_on','icon_off'],
      mushroom: ['active','inactive'],
      sensor: ['sensor_active','sensor_inactive'],
    };
    Object.entries(blank).forEach(([sec, keys]) => {
      keys.forEach(k => this._fire(`colors.${sec}.${k}`, ''));
    });
  }

  /* ───────────────────── LOW-LEVEL ───────────────────── */
  _onColorInput(section, key, val) {
    const next = { ...(this[`_${section}`] || {}) };
    next[key] = val;
    this[`_${section}`] = next;
    this._fire(`colors.${section}.${key}`, val);
  }

  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }

  _guessHex(v) {
    if (!v) return '#000000';
    const s = String(v).trim();
    if (s.startsWith('#') && (s.length === 7 || s.length === 4)) {
      return s.length === 4 ? this._expandShorthandHex(s) : s;
    }
    if (s.startsWith('rgba') || s.startsWith('rgb')) {
      try {
        const nums = s.replace(/rgba?\(|\)|\s/g,'').split(',');
        const r = Number(nums[0])|0, g = Number(nums[1])|0, b = Number(nums[2])|0;
        return '#' + [r,g,b].map(n => n.toString(16).padStart(2,'0')).join('');
      } catch { return '#000000'; }
    }
    return '#000000';
  }
  _expandShorthandHex(h) {
    if (!h || h.length !== 4) return '#000000';
    return '#' + h.slice(1).split('').map(c => c + c).join('');
  }
}

customElements.define('color-panel', ColorPanel);