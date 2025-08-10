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
      margin:0 !important; width:100%; box-sizing:border-box;
      border-radius:40px; position:relative; overflow:hidden;
      background: var(--glass-bg, rgba(95,255,235,0.26));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(95,255,235,0.13));
    }
    .glass-panel::after{
      content:''; position:absolute; inset:0; border-radius:inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.14),
        rgba(255,255,255,0.08) 70%, transparent 100%));
      pointer-events:none;
    }
    .glass-header{
      padding:22px 0; text-align:center; font-size:1.11rem;
      font-weight:700; color:#fff;
    }

    /* === Cards preset in griglia === */
    .preset-bar{
      display:grid; gap:14px; padding: 6px 16px 0 16px;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
    .preset-card{
      position:relative; border-radius:26px;
      border:1px solid rgba(255,255,255,0.12);
      background: rgba(24,32,40,0.45);
      padding:16px 18px 18px;
      cursor:pointer; user-select:none;
      transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
      outline:none;
    }
    .preset-card:hover{
      transform: translateY(-1px);
      box-shadow: 0 6px 22px rgba(0,0,0,0.22);
      border-color: rgba(255,255,255,0.24);
    }
    /* ✅ Cornice evidenziata (doppio bordo + glow) */
    .preset-card.selected{
      border-color:#73f6e5;
      box-shadow:
        0 0 0 2px inset rgba(115,246,229,0.40),
        0 0 0 3px rgba(115,246,229,0.22);
    }
    .preset-name{
      font-weight:800; color:#e9f8ff; font-size:1.05rem; margin-bottom:10px;
    }

    /* Pallini con etichetta SOTTO (come richiesto) */
    .swatches{
      display:grid; grid-template-columns: 1fr 1fr; gap:12px;
    }
    .swatch-col{
      display:flex; flex-direction:column; align-items:flex-start; gap:6px;
    }
    .swatch-pill{
      width:64px; height:36px; border-radius:12px;
      border:1px solid rgba(255,255,255,0.10);
      background: rgba(255,255,255,0.06);
      display:flex; align-items:center; justify-content:center; gap:10px;
      padding:0 10px;
    }
    .dot{
      width:16px; height:16px; border-radius:50%;
      border:2px solid rgba(255,255,255,0.75);
      flex:0 0 auto;
    }
    .swatch-label{
      color:#f0f6ff; font-size:.86rem; opacity:.95;
    }

    /* Bottone “Applica preset” unico e centrato */
    .apply-center{
      display:flex; justify-content:center; padding: 10px 16px 6px;
    }
    .apply-btn{
      border:2.5px solid #73f6e5; color:#073a34; background:#73f6e5;
      border-radius:14px; padding:10px 18px; font-weight:900; cursor:pointer;
      transition: transform .12s ease, filter .12s ease, box-shadow .12s ease;
    }
    .apply-btn:hover{ transform: translateY(-1px); filter:brightness(1.05); }
    .apply-btn:disabled{
      opacity:.45; cursor:not-allowed; filter:none; transform:none;
      border-color:#73f6e588; background:#73f6e588; color:#083f38aa;
    }

    /* Sezioni manuali (come prima) */
    .section{ margin:14px 16px; padding:14px;
      border:1px solid rgba(255,255,255,0.12);
      border-radius:16px; background:rgba(255,255,255,0.05);
    }
    .section h3{ margin:0 0 10px; color:#fff; font-size:1rem; }
    .row{ display:grid; grid-template-columns: 1fr 140px; align-items:center; gap:10px; margin-bottom:8px; }
    .row label{ color:#dfe7f2; font-weight:600; }
    .color-input{ display:flex; gap:8px; align-items:center; justify-content:flex-end; }
    input[type="color"]{ width:40px; height:32px; border:none; background:transparent; padding:0; }
    input[type="text"]{
      width:90px; height:32px; box-sizing:border-box; border-radius:8px;
      border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.25);
      color:#fff; padding:0 8px; font-family:monospace;
    }

    .reset-button{
      border:3.5px solid #ff4c6a; color:#ff4c6a; border-radius:24px;
      padding:12px 38px; background:transparent; cursor:pointer;
      display:block; margin:20px auto; font-size:1.15rem; font-weight:700;
      box-shadow:0 2px 24px #ff4c6a44;
    }
    .reset-button:hover{ background:rgba(255,76,106,0.18); color:#fff; box-shadow:0 6px 32px #ff4c6abf; }
  `;

  /* ─────────── UI ─────────── */
  render() {
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => (this.expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🎨 Color Presets & Theme</div>

        <!-- Griglia presets con selezione -->
        <div class="preset-bar">
          ${this._presets.map(p => {
            const sel = this._selectedKey === p.key;
            return html`
              <div
                class="preset-card ${sel ? 'selected' : ''}"
                role="button" tabindex="0" aria-pressed="${sel}"
                @click=${() => (this._selectedKey = p.key)}
                @keydown=${(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._selectedKey = p.key; } }}
              >
                <div class="preset-name">${p.name}</div>

                <div class="swatches">
                  <div class="swatch-col">
                    <div class="swatch-pill">
                      <div class="dot" style="background:${p.preview.active}"></div>
                    </div>
                    <div class="swatch-label">Active</div>
                  </div>
                  <div class="swatch-col">
                    <div class="swatch-pill">
                      <div class="dot" style="background:${p.preview.inactive}"></div>
                    </div>
                    <div class="swatch-label">Inactive</div>
                  </div>
                </div>
              </div>
            `;
          })}
        </div>

        <!-- Bottone unico centrato -->
        <div class="apply-center">
          <button class="apply-btn" ?disabled=${!this._selectedKey} @click=${this._applySelected}>
            Applica preset
          </button>
        </div>

        ${this._renderSectionRoom()}
        ${this._renderSectionSubButtons()}
        ${this._renderSectionMushroom()}
        ${this._renderSectionSensor()}

        <button class="reset-button" @click=${this._resetAll}>🧹 Reset colori</button>
      </ha-expansion-panel>
    `;
  }

  /* ─────────── sezioni manuali ─────────── */
  _renderSectionRoom() {
    const R = this._room;
    return html`
      <div class="section">
        <h3>Room</h3>
        ${this._colorRow('Icon (active)', 'room','icon_active', R.icon_active)}
        ${this._colorRow('Icon (inactive)', 'room','icon_inactive', R.icon_inactive)}
        ${this._colorRow('Background (active)', 'room','background_active', R.background_active)}
        ${this._colorRow('Background (inactive)', 'room','background_inactive', R.background_inactive)}
        ${this._colorRow('Text (active)', 'room','text_active', R.text_active)}
        ${this._colorRow('Text (inactive)', 'room','text_inactive', R.text_inactive)}
      </div>
    `;
  }
  _renderSectionSubButtons() {
    const S = this._subbutton;
    return html`
      <div class="section">
        <h3>Subbutton</h3>
        ${this._colorRow('Background ON','subbutton','background_on', S.background_on)}
        ${this._colorRow('Background OFF','subbutton','background_off', S.background_off)}
        ${this._colorRow('Icon ON','subbutton','icon_on', S.icon_on)}
        ${this._colorRow('Icon OFF','subbutton','icon_off', S.icon_off)}
      </div>
    `;
  }
  _renderSectionMushroom() {
    const M = this._mushroom;
    return html`
      <div class="section">
        <h3>Mushroom (incl. Camera & Climate)</h3>
        ${this._colorRow('Active','mushroom','active', M.active)}
        ${this._colorRow('Inactive','mushroom','inactive', M.inactive)}
      </div>
    `;
  }
  _renderSectionSensor() {
    const S = this._sensor;
    return html`
      <div class="section">
        <h3>Sensori</h3>
        ${this._colorRow('Sensor Active','sensor','sensor_active', S.sensor_active)}
        ${this._colorRow('Sensor Inactive','sensor','sensor_inactive', S.sensor_inactive)}
      </div>
    `;
  }

  _colorRow(label, section, key, val) {
    const hexGuess = this._guessHex(val);
    return html`
      <div class="row">
        <label>${label}</label>
        <div class="color-input">
          <input type="color" .value=${hexGuess} @input=${e => this._onColorInput(section, key, e.target.value)}/>
          <input type="text" placeholder="#RRGGBB oppure rgba(...)" .value=${val || ''} @change=${e => this._onColorInput(section, key, e.target.value)}/>
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
        const [r,g,b] = s.replace(/rgba?\(|\)|\s/g,'').split(',').map(n => Number(n)|0);
        return '#' + [r,g,b].map(n => n.toString(16).padStart(2,'0')).join('');
      } catch { return '#000000'; }
    }
    return '#000000';
  }
  _expandShorthandHex(h) { return '#' + h.slice(1).split('').map(c => c + c).join(''); }
}

customElements.define('color-panel', ColorPanel);