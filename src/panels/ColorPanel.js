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
    _cardBg:    { type: Object, state: true },

    _selectedPreset:  { type: String,  state: true },
    _expandedColors:  { type: Array,   state: true }, // [card, room, subbutton, mushroom, sensor]
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
    this._cardBg = { enabled: false, color: '' };

    // UI state
    this._selectedPreset = 'green';
    this._expandedColors = [false, false, false, false, false, false]; // [card, icon, name, subbutton, mushroom, sensor]
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

      // Sfondo card: attivo di default (se non ancora configurato)
      const bgEnabled = this.config?.card_background?.enabled ?? true;
      this._cardBg = {
        enabled: bgEnabled,
        color:   this.config?.card_background?.color ?? '',
      };
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
          if (this.expanded) this._expandedColors = [false, false, false, false, false, false];
        }}
      >
        <div slot="header" class="glass-header">${t('panel.colors.title')}</div>

        ${this._renderStyleChooser()}

        <!-- Card background: colore e abilitazione sfondo card -->
        <div class="mini-pill ${this._expandedColors[0] ? 'expanded' : ''}">
          <div
            class="mini-pill-header"
            style="--section-accent: #e0e0e0;"
            @click=${() => this._toggleColor(0)}
          >
            ${t('panel.colors.card_bg_section')}
            <span class="toggle-badge ${this._cardBg.enabled ? 'on' : 'off'}">
              ${this._cardBg.enabled ? t('panel.colors.on') : t('panel.colors.off')}
            </span>
            <span class="chevron">${this._expandedColors[0] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[0] ? html`
            <div class="mini-pill-content">
              <div class="toggle-row">
                <span class="toggle-label">${t('panel.colors.card_bg.enabled')}</span>
                <label class="toggle-switch">
                  <input type="checkbox"
                    .checked=${this._cardBg.enabled}
                    @change=${e => this._emit('card_background.enabled', e.target.checked)}
                  />
                  <span class="toggle-track"></span>
                </label>
              </div>
              ${this._cardBg.enabled ? html`
                <div class="card-bg-hint">${t('panel.colors.card_bg.hint')}</div>
                ${this._renderColorField('card_background', 'color', t('panel.colors.card_bg.color'))}
              ` : ''}
            </div>
          ` : ''}
        </div>

        <!-- Preset chooser (cards only, no apply button here) -->
        ${this._renderPresetChooser()}

        <!-- [1] Icona principale: colore icona + sfondo bubble -->
        <div class="mini-pill ${this._expandedColors[1] ? 'expanded' : ''}">
          <div class="mini-pill-header" style="--section-accent: #55afff;"
               @click=${() => this._toggleColor(1)}>
            ${t('panel.colors.room_icon_section')}
            <span class="chevron">${this._expandedColors[1] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[1] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('room', 'icon_active',         t('panel.colors.room.icon_active'))}
              ${this._renderColorField('room', 'icon_inactive',       t('panel.colors.room.icon_inactive'))}
              ${this._renderColorField('room', 'background_active',   t('panel.colors.room.background_active'))}
              ${this._renderColorField('room', 'background_inactive', t('panel.colors.room.background_inactive'))}
            </div>
          ` : ''}
        </div>

        <!-- [2] Nome stanza: colore testo nome -->
        <div class="mini-pill ${this._expandedColors[2] ? 'expanded' : ''}">
          <div class="mini-pill-header" style="--section-accent: #80cfff;"
               @click=${() => this._toggleColor(2)}>
            ${t('panel.colors.room_name_section')}
            <span class="chevron">${this._expandedColors[2] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[2] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('room', 'text_active',   t('panel.colors.room.text_active'))}
              ${this._renderColorField('room', 'text_inactive', t('panel.colors.room.text_inactive'))}
            </div>
          ` : ''}
        </div>

        <!-- [3] Sub-button: bottoni entità laterali -->
        <div class="mini-pill ${this._expandedColors[3] ? 'expanded' : ''}">
          <div class="mini-pill-header" style="--section-accent: #b28fff;"
               @click=${() => this._toggleColor(3)}>
            ${t('panel.colors.subbutton_section')}
            <span class="chevron">${this._expandedColors[3] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[3] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('subbutton', 'icon_on',        t('panel.colors.subbutton.icon_on'))}
              ${this._renderColorField('subbutton', 'icon_off',       t('panel.colors.subbutton.icon_off'))}
              ${this._renderColorField('subbutton', 'background_on',  t('panel.colors.subbutton.background_on'))}
              ${this._renderColorField('subbutton', 'background_off', t('panel.colors.subbutton.background_off'))}
            </div>
          ` : ''}
        </div>

        <!-- [4] Mushroom: icone entità fluttuanti -->
        <div class="mini-pill ${this._expandedColors[4] ? 'expanded' : ''}">
          <div class="mini-pill-header" style="--section-accent: #4bd1b4;"
               @click=${() => this._toggleColor(4)}>
            ${t('panel.colors.mushroom_section')}
            <span class="chevron">${this._expandedColors[4] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[4] ? html`
            <div class="mini-pill-content">
              ${this._renderColorField('mushroom', 'active',   t('panel.colors.mushroom.active'))}
              ${this._renderColorField('mushroom', 'inactive', t('panel.colors.mushroom.inactive'))}
            </div>
          ` : ''}
        </div>

        <!-- [5] Sensori: riga sensori in basso -->
        <div class="mini-pill ${this._expandedColors[5] ? 'expanded' : ''}">
          <div class="mini-pill-header" style="--section-accent: #ffa742;"
               @click=${() => this._toggleColor(5)}>
            ${t('panel.colors.sensor_section')}
            <span class="chevron">${this._expandedColors[5] ? '▼' : '▶'}</span>
          </div>
          ${this._expandedColors[5] ? html`
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

  // Restituisce il valore attuale per un campo colore.
  // Se section è 'card_background', legge da this.config.card_background.[key].
  // Altrimenti legge da this.config.colors.[section].[key].
  _readColorValue(section, key) {
    if (section === 'card_background') {
      return this.config?.card_background?.[key] || '';
    }
    return this.config?.colors?.[section]?.[key] || '';
  }

  // Restituisce il path puntato da passare a _emit.
  _colorEmitPath(section, key) {
    if (section === 'card_background') return `card_background.${key}`;
    return `colors.${section}.${key}`;
  }

  _renderColorField(section, key, label) {
    const rgba = this._readColorValue(section, key);
    const isCardBg = section === 'card_background';
    // Per card_background: alpha di default 0.10 se vuoto, max slider 0.30
    const [r, g, b, a] = this._parseRGBA(rgba || (isCardBg ? 'rgba(33,223,115,0.10)' : ''));
    const alphaDefault = isCardBg ? (rgba ? a : 0.10) : a;
    const alphaMax     = isCardBg ? '0.30' : '1';
    const hex = `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    return html`
      <div class="input-group">
        <label>${label}</label>
        <input
          type="color"
          .value=${hex}
          @input=${e => this._updateColor(section, key, e.target.value, alphaDefault)}
        />
        <input
          type="range"
          min="0" max=${alphaMax} step="0.01"
          .value=${alphaDefault}
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

    // Card background: deriva da icon_active del preset a 10% alpha
    const [r, g, b] = this._parseRGBA(preset.room.icon_active);
    this._emit('card_background.color', `rgba(${r},${g},${b},0.10)`);
    this._emit('card_background.enabled', true);
  };

  _resetColors() {
    this._expandedColors = [false, false, false, false, false, false];
    // Reset card background: riabilita con colore auto
    this._emit('card_background.enabled', true);
    this._emit('card_background.color', '');
    // Reset all color sections
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
    this._emit(this._colorEmitPath(section, key), rgba);
  }

  _updateColorRaw(section, key, raw) {
    this._emit(this._colorEmitPath(section, key), raw);
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
