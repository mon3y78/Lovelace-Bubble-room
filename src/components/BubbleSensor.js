// src/components/BubbleSensor.js
import { LitElement, html, css } from 'lit';
import { SENSOR_TYPE_MAP } from '../helpers/sensor-mapping.js';

export class BubbleSensor extends LitElement {
  static properties = {
    sensors: { type: Array },
    preset:  { type: String, reflect: true },
    showIcons: { type: Boolean, attribute: 'show-icons' },
  };

  constructor() {
    super();
    this.sensors = [];
    this.preset  = 'standard';
    this.showIcons = false;
    this.rows = 1;
    this.columns = 1;
    this._resizeObserver = null;
    this._autoscaleScheduled = false;
    this._lastBox = { w: 0, h: 0 };
    this._fontsReadyScheduled = false;
    this._fontVersion = 0;
    this._lastAutoscaleSignature = '';
    this._settleTimer = null;
    this._settleUntil = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateLayout();
    // NON schedulare autoscale qui: Lit non ha ancora renderizzato le colonne della grid.
    // L'autoscale parte da updated() dopo il primo render.
    this._resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      let w = 0, h = 0;
      if (entry && entry.contentBoxSize) {
        const box = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize;
        w = Math.round(box.inlineSize);
        h = Math.round(box.blockSize);
      } else {
        const rect = this.getBoundingClientRect();
        w = Math.round(rect.width);
        h = Math.round(rect.height);
      }
      if (Math.abs(w - this._lastBox.w) > 2 || Math.abs(h - this._lastBox.h) > 2) {
        this._lastBox = { w, h };
        this._scheduleAutoscale();
      }
    });
    this._resizeObserver.observe(this);
  }

  firstUpdated() {
    this._ensureFonts();
    this._scheduleAutoscaleWhenFontsReady();
    this.reflowLayout(true, 850);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    this._autoscaleScheduled = false;
    if (this._settleTimer) clearTimeout(this._settleTimer);
    this._settleTimer = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('sensors') || changedProperties.has('showIcons') || changedProperties.has('preset')) {
      this.reflowLayout(true, 250);
    }
  }

  reflowLayout(force = false, duration = 0) {
    if (force) this._lastAutoscaleSignature = '';
    this._updateLayout();

    if (duration > 0) {
      const now = performance?.now?.() ?? Date.now();
      this._settleUntil = Math.max(this._settleUntil || 0, now + duration);
      this._scheduleAutoscaleSettle();
    }

    this._scheduleAutoscale();
  }

  _scheduleAutoscaleSettle() {
    if (this._settleTimer) return;
    const now = performance?.now?.() ?? Date.now();
    if (!this._settleUntil || now >= this._settleUntil) return;

    this._settleTimer = setTimeout(() => {
      this._settleTimer = null;
      this._lastAutoscaleSignature = '';
      this._updateLayout();
      this._scheduleAutoscale();
      this._scheduleAutoscaleSettle();
    }, 90);
  }

  _updateLayout() {
    const count = this.sensors?.length || 0;
    this.rows = count > 5 ? 2 : 1;
    this.columns = count > 5 ? 5 : count || 1;
  }

  _scheduleAutoscale() {
    if (this._autoscaleScheduled) return;
    this._autoscaleScheduled = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._autoscaleScheduled = false;
        this._autoScaleValues();
      });
    });
  }

  _ensureFonts() {
    if (typeof document === 'undefined') return;
    const head = document.head;
    if (!head) return;

    if (!head.querySelector('link[rel="preconnect"][data-bubble-fonts="1"]')) {
      const pre = document.createElement('link');
      pre.rel = 'preconnect';
      pre.href = 'https://fonts.gstatic.com';
      pre.crossOrigin = 'anonymous';
      pre.setAttribute('data-bubble-fonts', '1');
      head.appendChild(pre);
    }

    if (!head.querySelector('link[rel="stylesheet"][data-bubble-fonts="1"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=Bebas+Neue&family=Barlow+Condensed:wght@900&family=Oswald:wght@700&display=swap';
      link.setAttribute('data-bubble-fonts', '1');
      link.addEventListener('load', () => {
        this._fontVersion += 1;
        this._lastAutoscaleSignature = '';
        this._scheduleAutoscale();
      });
      head.appendChild(link);
    }
  }

  _scheduleAutoscaleWhenFontsReady() {
    if (this._fontsReadyScheduled || typeof document === 'undefined') return;
    this._fontsReadyScheduled = true;

    const fonts = document.fonts;
    if (!fonts?.ready) {
      this._scheduleAutoscale();
      return;
    }

    fonts.load?.('900 16px "Barlow Condensed"');
    fonts.ready
      .then(() => {
        this._fontVersion += 1;
        this._lastAutoscaleSignature = '';
        this._scheduleAutoscale();
      })
      .catch(() => this._scheduleAutoscale());
  }

  // Calcola una sola dimensione font per TUTTE le pill della card.
  // Strategia: trova la pill con contenuto più largo (worst-case),
  // cerca per bisezione il font-size massimo che entra nella sua larghezza,
  // poi applica quella stessa dimensione a tutte le altre pill.
  _autoScaleValues() {
    const pills = Array.from(this.renderRoot?.querySelectorAll('.sensor-pill') || []);
    if (!pills.length) return;

    const signature = this._autoscaleSignature();
    if (signature === this._lastAutoscaleSignature) return;

    // Seleziona la pill più "pesante" in termini di testo
    let worst = pills[0];
    let worstScore = 0;
    for (const pill of pills) {
      const v = pill.querySelector('.sensor-value')?.textContent ?? '';
      const u = pill.querySelector('.sensor-unit')?.textContent  ?? '';
      const l = pill.querySelector('.sensor-label')?.textContent ?? '';
      const i = pill.querySelector('.sensor-icon') ? 2 : 0;
      const score = v.length + u.length * 0.8 + l.length * 1.1 + i;
      if (score > worstScore) { worstScore = score; worst = pill; }
    }

    const bestPx = this._fitInPill(worst);
    const unitPx  = Math.max(5, Math.round(bestPx * 0.68));
    const labelPx = Math.max(5, Math.round(bestPx * 0.68));
    const iconPx  = Math.max(5, Math.round(bestPx * 0.82));

    for (const pill of pills) {
      const valueEl = pill.querySelector('.sensor-value');
      const unitEl  = pill.querySelector('.sensor-unit');
      const labelEl = pill.querySelector('.sensor-label');
      const iconEl  = pill.querySelector('.sensor-icon');
      if (!valueEl) continue;
      valueEl.style.fontSize = `${bestPx}px`;
      if (unitEl)  unitEl.style.fontSize  = `${unitPx}px`;
      if (labelEl) labelEl.style.fontSize = `${labelPx}px`;
      if (iconEl) {
        iconEl.style.fontSize = `${iconPx}px`;
        iconEl.style.setProperty('--mdc-icon-size', `${iconPx}px`);
      }
    }

    this._lastAutoscaleSignature = signature;
  }

  _autoscaleSignature() {
    const sensors = (this.sensors || []).map((sensor) => [
      sensor?.entity,
      sensor?.value,
      sensor?.unit,
      sensor?.device_class,
      sensor?.icon,
      sensor?.color,
    ].join(':')).join('|');

    return [
      Math.round(this.clientWidth || 0),
      Math.round(this.clientHeight || 0),
      this.rows,
      this.columns,
      this.showIcons ? 1 : 0,
      this.preset,
      this._fontVersion,
      sensors,
    ].join('|');
  }

  // Bisezione sul worst-case pill: vincola sia larghezza sia altezza.
  _fitInPill(pill) {
    const valueEl = pill.querySelector('.sensor-value');
    const unitEl  = pill.querySelector('.sensor-unit');
    const labelEl = pill.querySelector('.sensor-label');
    const iconEl  = pill.querySelector('.sensor-icon');
    if (!valueEl) return 10;

    // Usa la larghezza dell'host divisa per le colonne: immune al timing della grid CSS.
    // pill.clientWidth può essere 0 o errato se la grid non ha ancora applicato grid-template-columns.
    const hostW = Math.round(this.clientWidth);
    const cols  = Math.max(1, this.columns);
    const boxW  = hostW > 0 ? Math.floor(hostW / cols) : Math.round(pill.clientWidth);
    if (boxW <= 0) return 10;

    const PADDING_X = 12;
    const PADDING_Y = 4;
    const UNIT_ML   = 1;
    const maxWidth  = Math.max(0, boxW - PADDING_X);
    if (maxWidth <= 0) return 5;
    const boxH = Math.round(pill.clientHeight || this.clientHeight || 36);
    const maxHeight = Math.max(10, boxH - PADDING_Y);

    const unitRatio  = 0.68;
    const labelRatio = 0.68;
    const iconRatio  = 0.82;

    let lo = 6, hi = Math.min(40, Math.max(10, maxHeight + 6)), best = lo;

    for (let i = 0; i < 10 && lo <= hi; i++) {
      const mid = (lo + hi) >> 1;
      valueEl.style.fontSize = `${mid}px`;
      if (unitEl)  unitEl.style.fontSize  = `${Math.max(5, Math.round(mid * unitRatio))}px`;
      if (labelEl) labelEl.style.fontSize = `${Math.max(5, Math.round(mid * labelRatio))}px`;
      if (iconEl) {
        const ipx = Math.max(5, Math.round(mid * iconRatio));
        iconEl.style.fontSize = `${ipx}px`;
        iconEl.style.setProperty('--mdc-icon-size', `${ipx}px`);
      }

      const vW = valueEl.offsetWidth;
      const uW = unitEl  ? unitEl.offsetWidth  : 0;
      const lW = labelEl ? labelEl.offsetWidth : 0;
      const iW = iconEl  ? iconEl.offsetWidth  : 0;
      const totalWidth = iW + lW + vW + (uW > 0 ? UNIT_ML + uW : 0);
      const totalHeight = Math.max(
        valueEl.scrollHeight || valueEl.offsetHeight || 0,
        unitEl ? (unitEl.scrollHeight || unitEl.offsetHeight || 0) : 0,
        labelEl ? (labelEl.scrollHeight || labelEl.offsetHeight || 0) : 0,
        iconEl ? (iconEl.scrollHeight || iconEl.offsetHeight || 0) : 0
      );

      if (totalWidth <= maxWidth && totalHeight <= maxHeight) { best = mid; lo = mid + 1; }
      else                                                    { hi = mid - 1; }
    }
    return best;
  }

  _formatValueForDisplay(value, decimals = 1, trimIntegers = true) {
    if (value === null || value === undefined) return '--';

    if (typeof value === 'number' && Number.isFinite(value)) {
      return (trimIntegers && Number.isInteger(value))
        ? String(value)
        : value.toFixed(decimals);
    }

    if (typeof value === 'string') {
      const m = value.replace(',', '.').match(/-?\d+(?:\.\d+)?/);
      if (m) {
        const n = Number(m[0]);
        if (Number.isFinite(n)) {
          return (trimIntegers && Number.isInteger(n))
            ? String(n)
            : n.toFixed(decimals);
        }
      }
      return value.trim();
    }

    return String(value);
  }



  _openMoreInfo(entityId) {
    if (!entityId || typeof entityId !== 'string') return;
    const ev = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    const ha = document.querySelector('home-assistant');
    (ha || this).dispatchEvent(ev);
  }

  static styles = css`
    :host {
      display: flex;
      align-items: stretch;
      height: 100%;
      min-height: 0;
      max-height: 100%;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }
    .sensor-grid {
      display: grid;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 1px 3px;
      margin: 0;
      gap: 0;
    }

    :host([preset='liquid-glass']) .sensor-grid {
      border-radius: 11px;
      overflow: hidden;
      position: relative;
      isolation: isolate;
      /* padding verticale: crea lo spazio visivo della bolla attorno al testo */
      padding: 1px 3px;

      backdrop-filter: blur(20px) saturate(2.2) brightness(1.05);
      -webkit-backdrop-filter: blur(20px) saturate(2.2) brightness(1.05);

      /* colore puro della stanza come base */
      background: color-mix(in srgb, var(--bubble-sensor-active-color, white) 26%, rgba(255, 255, 255, 0.06));

      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.30),
        inset 0 -1px 0 rgba(0, 0, 0, 0.08),
        0 2px 10px rgba(0, 0, 0, 0.16);
      border: 1px solid color-mix(in srgb, var(--bubble-sensor-active-color, white) 48%, transparent);

      transition: background 0.3s ease, border-color 0.3s ease;
    }

    :host([preset='liquid-glass']) .sensor-grid::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      /* highlight overlay in alto + glow colorato in basso */
      background:
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.45) 0%,
          rgba(255, 255, 255, 0.10) 35%,
          transparent 55%
        ),
        radial-gradient(
          ellipse 120% 70% at 50% 118%,
          color-mix(in srgb, var(--bubble-sensor-active-color, white) 40%, transparent),
          transparent 65%
        );
      mix-blend-mode: overlay;
      opacity: 0.85;
      z-index: 0;
    }

    :host([preset='liquid-glass']) .sensor-pill {
      position: relative;
      z-index: 1;
      background: transparent;
      border-right: none;
    }

    :host([preset='soft-glass']) .sensor-grid {
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      isolation: isolate;
      padding: 0;
      backdrop-filter: blur(8px) saturate(1.25);
      -webkit-backdrop-filter: blur(8px) saturate(1.25);
      background: color-mix(in srgb, var(--bubble-sensor-active-color, white) 32%, rgba(255, 255, 255, 0.06));
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.22),
        0 4px 14px rgba(0, 0, 0, 0.16);
      border: 2px solid color-mix(in srgb, var(--bubble-sensor-active-color, white) 48%, transparent);
      transition: background 0.25s ease, border-color 0.25s ease;
    }

    :host([preset='soft-glass']) .sensor-grid::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), transparent 48%);
      opacity: 0.65;
      z-index: 0;
    }

    :host([preset='soft-glass']) .sensor-pill {
      position: relative;
      z-index: 1;
      background: transparent;
      border-right: none;
      text-shadow:
        0 1px 2px rgba(0, 0, 0, 0.36),
        0 0 6px color-mix(in srgb, currentColor 24%, transparent);
    }

    :host([preset='minimal']) .sensor-grid {
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      padding: 1px 3px;
      background: color-mix(in srgb, var(--bubble-sensor-active-color, white) 18%, rgba(255, 255, 255, 0.04));
      border: 2px solid color-mix(in srgb, var(--bubble-sensor-active-color, white) 44%, transparent);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
      transition: background 0.18s ease, border-color 0.18s ease;
    }

    :host([preset='minimal']) .sensor-pill {
      position: relative;
      z-index: 1;
      background: transparent;
      border-right: none;
      text-shadow: none;
    }

    :host([preset='minimal']) .sensor-value {
      color: color-mix(in srgb, var(--bubble-sensor-value-color, currentColor) 82%, white);
      filter: brightness(1.12) saturate(1.08);
      text-shadow: none;
    }

    :host([preset='minimal']) .sensor-unit,
    :host([preset='minimal']) .sensor-label,
    :host([preset='minimal']) .sensor-icon {
      filter: none;
      text-shadow: none;
    }

    .sensor-pill {
      display: flex;
      align-items: center;
      min-width: 0;
      background: transparent;
      border: 0;
      border-radius: 0;
      font-size: 1em;
      font-family: "Barlow Condensed", "Roboto Condensed", "Arial Narrow", system-ui, sans-serif;
      font-weight: 800;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      min-height: 0;
      cursor: pointer;
      padding: 1px 3px 0;
      justify-content: center;
      text-align: center;
      border-right: none;
      gap: 3px;
      -webkit-font-smoothing: antialiased;
      text-rendering: geometricPrecision;
      text-shadow:
        0 1px 2px rgba(0, 0, 0, 0.48),
        0 0 10px color-mix(in srgb, currentColor 42%, transparent);
    }
    .sensor-pill:last-child {
      border-right: none;
    }
    .sensor-label {
      font-weight: 750;
      font-size: 0.5em;           /* sarà scalata via JS */
      line-height: 1;
      display: inline-block;
      flex: 0 0 auto;
      opacity: 0.85;
      filter: brightness(1.14) saturate(1.08);
    }
    .sensor-icon {
      flex: 0 0 auto;
      opacity: 0.9;
      filter:
        drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45))
        brightness(1.08)
        saturate(1.12);
    }
    .sensor-value {
      font-weight: 900;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0;
      line-height: 1;
      flex: 0 0 auto;
      color: color-mix(in srgb, var(--bubble-sensor-value-color, currentColor) 78%, white);
      filter: brightness(1.38) saturate(1.26);
      text-shadow:
        0 1px 2px rgba(0, 0, 0, 0.42),
        0 0 8px color-mix(in srgb, var(--bubble-sensor-value-color, currentColor) 56%, transparent),
        0 0 14px color-mix(in srgb, var(--bubble-sensor-value-color, currentColor) 32%, transparent);
    }
    .sensor-unit {
      font-weight: 750;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
      margin-left: 1px;
      flex: 0 0 auto;
      opacity: 0.75;
      color: color-mix(in srgb, var(--bubble-sensor-value-color, currentColor) 78%, white);
      filter: brightness(1.12);
    }
  `;

  render() {
    const sensors = (this.sensors || []).map(sensor => {
      const devClass = sensor.device_class;
      const map = SENSOR_TYPE_MAP[devClass] || {};
      const emoji = map.emoji || '❓';
      const unit  = sensor.unit || map.units?.[0] || '';

      // Mostra 1 decimale SOLO se non è intero
      const value = this._formatValueForDisplay(sensor.value, 1, true);

      return { ...sensor, value, label: emoji, unit };
    });


    return html`
      <div
        class="sensor-grid"
        style="
          grid-template-columns: repeat(${this.columns}, 1fr);
          grid-template-rows: repeat(${this.rows}, 1fr);
        "
      >
        ${sensors.map(sensor => {
          const entityId = sensor.entity || sensor.entity_id || '';
          const title = entityId
            ? `Show history graph: ${entityId}`
            : 'Show history graph';

          return html`
            <div
              class="sensor-pill"
              style="color:${sensor.color || '#e3f6ff'}"
              title="${title}"
              role="button"
              tabindex="0"
              @click=${() => this._openMoreInfo(entityId)}
              @keydown=${(e) => { if (e.key === 'Enter' || e.key === ' ') this._openMoreInfo(entityId); }}
            >
              ${this.showIcons && sensor.icon
                ? html`<ha-icon class="sensor-icon" .icon="${sensor.icon}"></ha-icon>`
                : ''}
              ${this.showIcons
                ? html`<span class="sensor-label">${sensor.label || ''}</span>`
                : ''}
              <span class="sensor-value">${sensor.value ?? '--'}</span>
              <span class="sensor-unit">${sensor.unit || ''}</span>
            </div>
          `;
        })}
      </div>
    `;
  }
}

if (!customElements.get('bubble-sensor')) {
  customElements.define('bubble-sensor', BubbleSensor);
}
