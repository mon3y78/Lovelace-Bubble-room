// src/panels/ColorPanel.js
import { LitElement, html } from 'lit';
import { localize } from '../helpers/i18n.js';
import { COLOR_PRESETS } from './color-presets.js';
import { colorPanelStyles } from './color-panel-styles.js';

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
    _subbuttonStyle:  { type: String,  state: true },
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
    this._expandedColors = [false, false, false, false]; // [room, subbutton, mushroom, sensor]
    this._subbuttonStyle = 'standard';
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

      this._subbuttonStyle = this.config?.subbutton_style || 'standard';
    }
  }

  get PRESETS() { return COLOR_PRESETS; }

  static styles = colorPanelStyles;

  // ─────────────────── UI ───────────────────
  render() {
    const t = (key, vars, fallback) => localize(this.hass, key, vars, fallback);
    return html`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e => {
          this.expanded = e.detail.expanded;
          if (this.expanded) this._expandedColors = [false, false, false];
        }}
      >
        <div slot="header" class="glass-header">${t('panel.colors.title')}</div>

        ${this._renderStyleChooser()}

        <!-- Preset chooser (cards only, no apply button here) -->
        ${this._renderPresetChooser()}

        <!-- Room colors: icona principale + sfondo + nome stanza -->
        <div class="mini-pill ${this._expandedColors[0] ? 'expanded' : ''}">
          <div
            class="mini-pill-header"
            style="--section-accent: #55afff;"
            @click=${() => this._toggleColor(0)}
          >
            ${t('panel.colors.room_section')}
            <span class="chevron">${this._expandedColors[0] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[0] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('room', 'icon_active',         t('panel.colors.room.icon_active'))}
              ${this._renderColorField('room', 'icon_inactive',       t('panel.colors.room.icon_inactive'))}
              ${this._renderColorField('room', 'background_active',   t('panel.colors.room.background_active'))}
              ${this._renderColorField('room', 'background_inactive', t('panel.colors.room.background_inactive'))}
              ${this._renderColorField('room', 'text_active',         t('panel.colors.room.text_active'))}
              ${this._renderColorField('room', 'text_inactive',       t('panel.colors.room.text_inactive'))}
            </div>
          ` : ''}
        </div>

        <!-- Subbutton colors: bottoni entità laterali -->
        <div class="mini-pill ${this._expandedColors[1] ? 'expanded' : ''}">
          <div
            class="mini-pill-header"
            style="--section-accent: #b28fff;"
            @click=${() => this._toggleColor(1)}
          >
            ${t('panel.colors.subbutton_section')}
            <span class="chevron">${this._expandedColors[1] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[1] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('subbutton', 'icon_on',        t('panel.colors.subbutton.icon_on'))}
              ${this._renderColorField('subbutton', 'icon_off',       t('panel.colors.subbutton.icon_off'))}
              ${this._renderColorField('subbutton', 'background_on',  t('panel.colors.subbutton.background_on'))}
              ${this._renderColorField('subbutton', 'background_off', t('panel.colors.subbutton.background_off'))}
            </div>
          ` : ''}
        </div>

        <!-- Mushroom colors: icone entità fluttuanti -->
        <div class="mini-pill ${this._expandedColors[2] ? 'expanded' : ''}">
          <div
            class="mini-pill-header"
            style="--section-accent: #4bd1b4;"
            @click=${() => this._toggleColor(2)}
          >
            ${t('panel.colors.mushroom_section')}
            <span class="chevron">${this._expandedColors[2] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[2] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('mushroom', 'active',   t('panel.colors.mushroom.active'))}
              ${this._renderColorField('mushroom', 'inactive', t('panel.colors.mushroom.inactive'))}
            </div>
          ` : ''}
        </div>

        <!-- Sensor colors: riga sensori in basso -->
        <div class="mini-pill ${this._expandedColors[3] ? 'expanded' : ''}">
          <div
            class="mini-pill-header"
            style="--section-accent: #ffa742;"
            @click=${() => this._toggleColor(3)}
          >
            ${t('panel.colors.sensor_section')}
            <span class="chevron">${this._expandedColors[3] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[3] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('sensor', 'sensor_active',   t('panel.colors.sensor.sensor_active'))}
              ${this._renderColorField('sensor', 'sensor_inactive', t('panel.colors.sensor.sensor_inactive'))}
            </div>
          ` : ''}
        </div>

        <!-- Actions: Applica preset + Reset (entrambi in fondo) -->
        <div class="bottom-actions">
          <button class="apply-btn" @click=${this._applySelectedPreset}>
            ${t('panel.colors.apply_preset')}
          </button>
          <button class="reset-button" @click=${() => this._resetColors()}>
            ${t('panel.colors.reset')}
          </button>
        </div>
      </ha-expansion-panel>
    `;
  }

  // ─────────────────── UI helpers ───────────────────
  _renderStyleChooser() {
    const t = (key, vars, fallback) => localize(this.hass, key, vars, fallback);
    const options = [
      {
        key: 'standard',
        label: t('panel.colors.style.standard'),
        description: t('panel.colors.style.standard_desc'),
      },
      {
        key: 'liquid-glass',
        label: t('panel.colors.style.liquid_glass'),
        description: t('panel.colors.style.liquid_glass_desc'),
      },
    ];

    return html`
      <div class="style-section">
        <div class="style-heading">${t('panel.colors.subbutton_style')}</div>
        <div class="style-bar">
          ${options.map(opt => this._renderStyleCard(opt))}
        </div>
      </div>
    `;
  }

  _renderStyleCard({ key, label, description }) {
    const isSelected = this._subbuttonStyle === key;
    const selectedClass = isSelected ? 'selected' : '';
    return html`
      <div
        class="style-card ${selectedClass}"
        role="button"
        tabindex="0"
        aria-pressed=${isSelected ? 'true' : 'false'}
        @click=${() => this._selectStyle(key)}
        @keydown=${e => this._onStyleKeydown(e, key)}
      >
        <div class="style-name">${label}</div>
        <div class="style-desc">${description}</div>
      </div>
    `;
  }

  _renderPresetChooser() {
    const keys = Object.keys(this.PRESETS);
    return html`
      <div class="preset-bar">
        ${keys.map(k => this._renderPresetCard(k, this.PRESETS[k]))}
      </div>
    `;
  }

  _renderPresetCard(key, p) {
    const t = (token, vars, fallback) => localize(this.hass, token, vars, fallback);
    const sel = this._selectedPreset === key ? 'selected' : '';
    const roomA = p.room.background_active;
    const roomI = p.room.background_inactive;
    const iconA = p.room.icon_active;
    const iconI = p.room.icon_inactive;
    return html`
      <div class="preset-card ${sel}" @click=${() => this._selectedPreset = key}>
        <div class="preset-name">${t(`presets.${key}`)}</div>
        <div class="swatches">
          <div class="swatch" style="background:${roomA}">
            <span class="dot" style="background:${iconA}"></span>
            <span class="swatch-label">${t('panel.colors.on')}</span>
          </div>
          <div class="swatch" style="background:${roomI}">
            <span class="dot" style="background:${iconI}"></span>
            <span class="swatch-label">${t('panel.colors.off')}</span>
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
    this._expandedColors = [false, false, false, false];
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

  _selectStyle(style) {
    if (this._subbuttonStyle === style) return;
    this._subbuttonStyle = style;
    this._emit('subbutton_style', style);
  }

  _onStyleKeydown(event, style) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._selectStyle(style);
    }
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
