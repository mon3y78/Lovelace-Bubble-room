// src/panels/ColorPanel.js
import { LitElement, html, css } from 'lit';

/**
 * Questo pannello:
 * - Mostra una libreria di preset colore con anteprima (Active/Inactive)
 * - Quando applichi un preset viene aggiornato TUTTO:
 *   - colors.room:  icon_[active|inactive], background_[active|inactive], text_[active|inactive]
 *   - colors.subbutton: background_[on|off], icon_[on|off]
 *   - colors.mushroom: active, inactive  (usato anche da camera/climate)
 *   - colors.sensor:   sensor_[active|inactive]
 * - Consente modifica manuale di tutti i campi
 * - Ha un Reset che pulisce le sezioni colore
 *
 * Eventi emessi: CustomEvent('panel-changed', { detail: { prop, val } })
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
  }

  updated(changed) {
    if (changed.has('config')) {
      const c = this.config?.colors || {};
      // Sync in → stato locale (senza rompere gli override già esistenti)
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

  // Palette compatte, ben contrastate
  get _presets() {
    // Nota: puoi ritoccare i valori come preferisci
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

          // MUSHROOM (usato anche da camera/climate)
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

  /* ───────────────────── HELPERS ───────────────────── */

  _applyPreset(map) {
    // Applica tutti i path→val come eventi separati (compatibile con l’editor)
    Object.entries(map).forEach(([prop, val]) => {
      this._fire(prop, val);
    });
  }

  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }

  _onColorInput(section, key, val) {
    // aggiorna stato locale
    const next = { ...(this[`_${section}`] || {}) };
    next[key] = val;
    this[`_${section}`] = next;
    // scrive nella config
    this._fire(`colors.${section}.${key}`, val);
  }

  _resetAll() {
    // Svuota tutte le sezioni colore
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

  /* ───────────────────── STILI ───────────────────── */

  static styles = css`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important; width: 100%; box-sizing: border-box;
      border-radius: 40px; position: relative; overflow: hidden;
      background: var(--glass-bg, rgba(120,140,160,0.22));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(120,140,160,0.18));
    }
    .glass-panel::after {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      background: linear-gradient(120deg, rgba(255,255,255,0.18),
        rgba(255,255,255,0.08) 70%, transparent 100%);
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0; text-align: center;
      font-size: 1.12rem; font-weight: 700; color: #fff;
    }

    .preset-grid {
      display: grid; gap: 12px; padding: 0 16px 8px;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
    .preset-card {
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 16px; padding: 12px; background: rgba(255,255,255,0.06);
    }
    .preset-title {
      font-weight: 700; color: #fff; margin-bottom: 8px;
      display:flex; align-items:center; justify-content:space-between;
    }
    .swatch-row { display: flex; gap: 8px; margin-bottom: 8px; }
    .swatch {
      flex: 1; border-radius: 10px; height: 24px; border: 1px solid rgba(0,0,0,0.15);
      display:flex; align-items:center; justify-content:center; color:#000; font-weight:700; font-size:0.8rem;
      background: repeating-linear-gradient(
        45deg, rgba(255,255,255,0.18), rgba(255,255,255,0.18) 6px, transparent 6px, transparent 12px
      );
    }
    .swatch .label { background: rgba(255,255,255,0.86); padding: 0 8px; border-radius: 8px; }
    .apply-btn {
      width: 100%; margin-top: 4px; border-radius: 10px; padding: 8px 10px;
      border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.12);
      cursor: pointer; color: #fff; font-weight: 700;
    }
    .apply-btn:hover { background: rgba(255,255,255,0.18); }

    .section {
      margin: 14px 16px; padding: 14px;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 16px; background: rgba(255,255,255,0.05);
    }
    .section h3 { margin: 0 0 10px; color: #fff; font-size: 1rem; }
    .row { display: grid; grid-template-columns: 1fr 140px; align-items: center; gap: 10px; margin-bottom: 8px; }
    .row label { color: #dfe7f2; font-weight: 600; }
    .color-input {
      display: flex; gap: 8px; align-items: center; justify-content: flex-end;
    }
    .color-input input[type="color"] {
      width: 40px; height: 32px; border: none; background: transparent; padding: 0;
    }
    .color-input input[type="text"] {
      width: 90px; height: 32px; box-sizing: border-box; border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.25);
      color: #fff; padding: 0 8px; font-family: monospace;
    }

    .reset-button {
      border: 3.5px solid #ff4c6a; color: #ff4c6a; border-radius: 24px;
      padding: 12px 38px; background: transparent; cursor: pointer;
      display: block; margin: 20px auto; font-size: 1.15rem; font-weight: 700;
      box-shadow: 0 2px 24px #ff4c6a44;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18); color: #fff; box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;

  /* ───────────────────── UI ───────────────────── */

  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🎨 Color Presets & Theme</div>

        <!-- Presets -->
        <div class="preset-grid">
          ${this._presets.map(p => html`
            <div class="preset-card">
              <div class="preset-title">
                <span>${p.name}</span>
              </div>
              <div class="swatch-row">
                <div class="swatch" style="background:${p.preview.active}">
                  <span class="label">Active</span>
                </div>
                <div class="swatch" style="background:${p.preview.inactive}">
                  <span class="label">Inactive</span>
                </div>
              </div>
              <button class="apply-btn" @click=${() => this._applyPreset(p.map)}>Applica preset</button>
            </div>
          `)}
        </div>

        <!-- Editing manuale -->
        ${this._renderSectionRoom()}
        ${this._renderSectionSubButtons()}
        ${this._renderSectionMushroom()}
        ${this._renderSectionSensor()}

        <!-- Reset -->
        <button class="reset-button" @click=${() => this._resetAll()}>
          🧹 Reset colori
        </button>
      </ha-expansion-panel>
    `;
  }

  /* ───────────── sezioni manuali ───────────── */

  _renderSectionRoom() {
    const R = this._room;
    return html`
      <div class="section">
        <h3>Room</h3>
        ${this._colorRow('Icon (active)',     'room','icon_active',        R.icon_active)}
        ${this._colorRow('Icon (inactive)',   'room','icon_inactive',      R.icon_inactive)}
        ${this._colorRow('Background (active)','room','background_active',  R.background_active)}
        ${this._colorRow('Background (inactive)','room','background_inactive', R.background_inactive)}
        ${this._colorRow('Text (active)',     'room','text_active',        R.text_active)}
        ${this._colorRow('Text (inactive)',   'room','text_inactive',      R.text_inactive)}
      </div>
    `;
  }

  _renderSectionSubButtons() {
    const S = this._subbutton;
    return html`
      <div class="section">
        <h3>Subbutton</h3>
        ${this._colorRow('Background ON',  'subbutton','background_on',  S.background_on)}
        ${this._colorRow('Background OFF', 'subbutton','background_off', S.background_off)}
        ${this._colorRow('Icon ON',        'subbutton','icon_on',        S.icon_on)}
        ${this._colorRow('Icon OFF',       'subbutton','icon_off',       S.icon_off)}
      </div>
    `;
  }

  _renderSectionMushroom() {
    const M = this._mushroom;
    return html`
      <div class="section">
        <h3>Mushroom (incl. Camera & Climate)</h3>
        ${this._colorRow('Active',   'mushroom','active',   M.active)}
        ${this._colorRow('Inactive', 'mushroom','inactive', M.inactive)}
      </div>
    `;
  }

  _renderSectionSensor() {
    const S = this._sensor;
    return html`
      <div class="section">
        <h3>Sensori</h3>
        ${this._colorRow('Sensor Active',   'sensor','sensor_active',   S.sensor_active)}
        ${this._colorRow('Sensor Inactive', 'sensor','sensor_inactive', S.sensor_inactive)}
      </div>
    `;
  }

  _colorRow(label, section, key, val) {
    // prova a derivare un hex se val è rgba/altro: altrimenti lascia text
    const hexGuess = this._guessHex(val);
    return html`
      <div class="row">
        <label>${label}</label>
        <div class="color-input">
          <input
            type="color"
            .value=${hexGuess}
            @input=${e => this._onColorInput(section, key, e.target.value)}
          />
          <input
            type="text"
            placeholder="#RRGGBB oppure rgba(...)"
            .value=${val || ''}
            @change=${e => this._onColorInput(section, key, e.target.value)}
          />
        </div>
      </div>
    `;
  }

  _guessHex(v) {
    if (!v) return '#000000';
    const s = String(v).trim();
    if (s.startsWith('#') && (s.length === 7 || s.length === 4)) return s.length === 4 ? this._expandShorthandHex(s) : s;
    if (s.startsWith('rgba') || s.startsWith('rgb')) {
      try {
        const nums = s.replace(/rgba?\(|\)|\s/g,'').split(',');
        const r = Number(nums[0])|0, g = Number(nums[1])|0, b = Number(nums[2])|0;
        return '#' + [r,g,b].map(n => n.toString(16).padStart(2,'0')).join('');
      } catch { return '#000000'; }
    }
    // fallback: non è un colore parsabile → restituisco un valore safe per il color picker
    return '#000000';
    }
  _expandShorthandHex(h) {
    // #abc → #aabbcc
    if (!h || h.length !== 4) return '#000000';
    return '#' + h.slice(1).split('').map(c => c + c).join('');
  }
}

customElements.define('color-panel', ColorPanel);