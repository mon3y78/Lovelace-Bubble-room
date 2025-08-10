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
      // ... altri preset identici alla tua versione precedente ...
    ];
  }

  _applyPreset(map) {
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
    Object.entries(blank).forEach(([sec, keys]) => {
      keys.forEach(k => this._fire(`colors.${sec}.${k}`, ''));
    });
  }

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

  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🎨 Color Presets & Theme</div>

        <div class="preset-bar">
          ${this._presets.map(p => html`
            <div class="preset-card">
              <div class="preset-name">${p.name}</div>
              <div class="swatches">
                <div class="swatch" style="background:${p.preview.active}">
                  <div class="dot" style="background:${p.preview.active}"></div>
                  <div class="swatch-label">Active</div>
                </div>
                <div class="swatch" style="background:${p.preview.inactive}">
                  <div class="dot" style="background:${p.preview.inactive}"></div>
                  <div class="swatch-label">Inactive</div>
                </div>
              </div>
            </div>
          `)}
        </div>

        ${this._renderSectionRoom()}
        ${this._renderSectionSubButtons()}
        ${this._renderSectionMushroom()}
        ${this._renderSectionSensor()}

        <button class="reset-button" @click=${() => this._resetAll()}>
          🧹 Reset colori
        </button>
      </ha-expansion-panel>
    `;
  }

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
    return '#000000';
  }

  _expandShorthandHex(h) {
    if (!h || h.length !== 4) return '#000000';
    return '#' + h.slice(1).split('').map(c => c + c).join('');
  }
}

customElements.define('color-panel', ColorPanel);