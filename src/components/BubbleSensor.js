// src/components/BubbleSensor.js
// src/components/BubbleSensor.js
import { LitElement, html, css } from 'lit';
import { SENSOR_TYPE_MAP } from '../helpers/sensor-mapping.js';

export class BubbleSensor extends LitElement {
  static properties = {
    sensors: { type: Array },
  };

  constructor() {
    super();
    this.sensors = [];
    this.rows = 1;
    this.columns = 1;

    // Stato interno per ottimizzazioni
    this._resizeObserver = null;
    this._resizeScheduled = false;
    this._autoscaleScheduled = false;
    this._lastBox = { w: 0, h: 0 };        // dimensione ultima osservata
    this._pillCache = new WeakMap();       // cache risultati per singola pill
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateLayout();
    this._scheduleAutoscale('connected');  // ➊ al primo attach

    this._resizeObserver = new ResizeObserver((entries) => {
      // Usa contentBoxSize quando disponibile; fallback a getBoundingClientRect
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

      // ➋ Schedula solo se cambia davvero (soglia 2px per evitare jitter)
      if (Math.abs(w - this._lastBox.w) > 2 || Math.abs(h - this._lastBox.h) > 2) {
        this._lastBox = { w, h };
        this._scheduleAutoscale('resize');
      }
    });

    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }

  // ➌ Triggera layout e (se serve) autoscale solo quando cambiano i sensori
  updated(changedProperties) {
    if (changedProperties.has('sensors')) {
      this._updateLayout();
      this._scheduleAutoscale('sensors-changed');
    }
  }

  _updateLayout() {
    const count = this.sensors?.length || 0;
    this.rows = count > 4 ? 2 : 1;
    this.columns = count > 4 ? 4 : count || 1;
  }

  // ————————————————————————————————————————————————————————————————
  // Batching e debounce: un solo autoscale per frame, indipendentemente
  // da quante volte viene richiesto (resize, sensors, first render, ecc.)
  // ————————————————————————————————————————————————————————————————
  _scheduleAutoscale(_reason) {
    if (this._autoscaleScheduled) return;
    this._autoscaleScheduled = true;
    requestAnimationFrame(() => {
      this._autoscaleScheduled = false;
      this._autoScaleValues();
    });
  }

  /** Esegue lo scaling per ogni pill (valore + unità in coppia) */
  _autoScaleValues() {
    const pills = this.renderRoot?.querySelectorAll('.sensor-pill');
    if (!pills?.length) return;

    pills.forEach((pill) => this._fitValueAndUnit(pill));
  }

  /**
   * Calcola la dimensione del font del valore (con unità in proporzione)
   * in modo che (valore + unità) stiano entro i limiti della pill.
   * Ottimizzazioni:
   *  - Limita le volte in cui forza il layout.
   *  - Cache per evitare ricalcoli identici quando testo e box non cambiano.
   *  - Meno iterazioni grazie a bounds dinamici.
   */
  _fitValueAndUnit(pill) {
    const valueEl = pill.querySelector('.sensor-value');
    const unitEl  = pill.querySelector('.sensor-unit');
    if (!valueEl) return;

    // Stato attuale (per cache)
    const text = valueEl.textContent ?? '';
    const unitText = unitEl ? unitEl.textContent ?? '' : '';
    const boxW = Math.round(pill.clientWidth);
    const boxH = Math.round(pill.clientHeight);
    if (boxW <= 0 || boxH <= 0) return;

    const cacheKey = this._pillCache.get(pill);
    if (cacheKey
      && cacheKey.text === text
      && cacheKey.unitText === unitText
      && cacheKey.boxW === boxW
      && cacheKey.boxH === boxH) {
      // Niente è cambiato: salta
      return;
    }

    // Limiti di spazio disponibili
    const maxWidth  = Math.floor(boxW * 0.52);
    const maxHeight = Math.floor(boxH * 0.78);
    if (maxWidth <= 0 || maxHeight <= 0) return;

    // Reset dimensioni per misurazioni coerenti
    valueEl.style.fontSize = '';
    if (unitEl) unitEl.style.fontSize = '';

    // Stima upper-bound più stretta: non ha senso superare l’altezza disponibile
    let lo = 10;                                 // px min
    let hi = Math.min(44, maxHeight);            // px max dinamico
    let best = lo;

    // Iterazioni ridotte: 8 bastano con bounds più stretti
    for (let i = 0; i < 8 && lo <= hi; i++) {
      const mid = (lo + hi) >> 1;

      // Applica dimensione di prova
      valueEl.style.fontSize = `${mid}px`;
      if (unitEl) {
        const unitSize = Math.max(10, Math.round(mid * 0.75));
        unitEl.style.fontSize = `${unitSize}px`;
      }

      // Misure: usa offsetWidth/Height per evitare più reflow costosi
      const vW = valueEl.offsetWidth;
      const vH = valueEl.offsetHeight;
      const uW = unitEl ? unitEl.offsetWidth : 0;
      const uH = unitEl ? unitEl.offsetHeight : 0;

      const totalWidth  = vW + uW + 6; // piccolo gap
      const totalHeight = vH > uH ? vH : uH;

      const fits = totalWidth <= maxWidth && totalHeight <= maxHeight;
      if (fits) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    // Applica la dimensione "migliore"
    valueEl.style.fontSize = `${best}px`;
    if (unitEl) {
      unitEl.style.fontSize = `${Math.max(10, Math.round(best * 0.75))}px`;
    }

    // Aggiorna cache
    this._pillCache.set(pill, { text, unitText, boxW, boxH, best });
  }

  /** Apre il more-info nativo (grafico history incluso) */
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
      display: block;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      contain: strict;
    }

    .sensor-grid {
      display: grid;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      /* layout determinato da rows/columns impostati in _updateLayout */
    }

    .sensor-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(32,38,55,0.12);
      border-radius: 18px;
      font-size: 1em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      contain: strict;
      cursor: pointer;
      padding: 10px 12px;
    }

    .sensor-icon {
      font-size: 1.4em; /* leggermente più grande dell'originale */
      flex: 0 0 auto;
    }

    .sensor-label {
      font-weight: 600;
      font-size: clamp(14px, 1.5vw, 20px); /* emoji più grande */
      transform: scale(0.95);
      display: inline-block;
      line-height: 1;
      flex: 0 0 auto;
    }

    .sensor-value {
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
      line-height: 1;
      /* la size viene impostata dinamicamente via JS */
    }

    .sensor-unit {
      font-weight: 600;
      /* la size viene impostata dinamicamente via JS */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
      margin-left: 4px;
      flex: 0 0 auto;
    }
  `;
  
  render() {
    const sensors = (this.sensors || []).map(sensor => {
      const devClass = sensor.device_class;
      const map = SENSOR_TYPE_MAP[devClass] || {};
      const emoji = map.emoji || '❓';
      const unit = sensor.unit || map.units?.[0] || '';
      return { ...sensor, label: emoji, unit };
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
          const title = entityId ? `Mostra grafico storico: ${entityId}` : 'Mostra grafico storico';
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
              <ha-icon class="sensor-icon" .icon="${sensor.icon || ''}"></ha-icon>
              <span class="sensor-label">${sensor.label || ''}</span>
              <span class="sensor-value">${sensor.value ?? '--'}</span>
              <span class="sensor-unit">${sensor.unit || ''}</span>
            </div>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('bubble-sensor', BubbleSensor);