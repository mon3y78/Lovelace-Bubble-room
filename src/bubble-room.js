// src/bubble-room.js
import { LitElement, html, css } from 'lit';
import './bubble-room-editor.js';
import './components/BubbleSubButton.js';
import './components/BubbleName.js';
import './components/BubbleSensor.js';
import './components/BubbleMushroom.js';
import './components/BubbleIcon.js';
import { resolveEntityIcon } from './helpers/icon-mapping.js';
import { parseColor } from './helpers/color-utils.js';

export class BubbleRoom extends LitElement {
  static properties = {
    config: { type: Object },
    hass:   { type: Object },
  };

  /* copia mutabile delle entità (dx, dy, ecc.) */
  _entities = {};

  constructor() {
    super();
    this.config = {};
    this.hass   = {};
    this._trackedEntityIds = new Set();
    this._viewCache = new Map();
    this._layoutSettleTimer = null;
    this._layoutSettleRaf = null;
    this._layoutSettleUntil = 0;
  }

  /* ───────────── configurazione ───────────── */
  setConfig(rawConfig) {
    this.config = { layout: 'wide', ...rawConfig };
    this._entities = structuredClone(this.config.entities || {});

    // default soft per i nuovi gruppi (se non ci sono)
    this._entities.camera  = this._entities.camera  || { entity: '', icon: '' };
    if (!this._entities.camera.presence) this._entities.camera.presence = { entity: '' };
    this._entities.climate = this._entities.climate || { entity: '', icon: '' };
    this._trackedEntityIds = this._collectTrackedEntityIds();
    this._viewCache.clear();
  }

  get hass() {
    return this._hass;
  }

  set hass(hass) {
    const previous = this._hass;
    this._hass = hass;

    if (!hass?.states) return;

    if (!previous?.states || this._hasTrackedStateChanged(previous, hass)) {
      this.requestUpdate?.();
    }
  }

  _collectTrackedEntityIds() {
    const ids = new Set();
    const add = (id) => {
      if (typeof id === 'string' && id.includes('.')) ids.add(id);
    };

    const entities = this.config?.entities || {};
    add(entities.presence?.entity);
    add(entities.camera?.entity);
    add(entities.camera?.presence?.entity);
    add(entities.climate?.entity);

    for (let i = 1; i <= 8; i++) add(entities[`sensor${i}`]?.entity);
    for (let i = 1; i <= 8; i++) add(entities[`mushroom${i}`]?.entity);

    for (const subbutton of this.config?.subbuttons || []) {
      add(subbutton?.entity_id || subbutton?.entity);
    }

    return ids;
  }

  _hasTrackedStateChanged(previousHass, nextHass) {
    if (!this._trackedEntityIds?.size) return true;

    for (const id of this._trackedEntityIds) {
      const previousState = previousHass?.states?.[id];
      const nextState = nextHass?.states?.[id];
      if (this._stateSignature(previousState) !== this._stateSignature(nextState)) {
        return true;
      }
    }

    return false;
  }

  _stateSignature(stateObj) {
    if (!stateObj) return '';
    return `${stateObj.state}|${stateObj.last_changed}|${stateObj.last_updated}|${JSON.stringify(stateObj.attributes || {})}`;
  }

  _cachedView(key, signature, compute) {
    const cached = this._viewCache.get(key);
    if (cached?.signature === signature) return cached.value;

    const value = compute();
    this._viewCache.set(key, { signature, value });
    return value;
  }

  _statesSignature(ids) {
    return (ids || [])
      .filter(Boolean)
      .map((id) => `${id}:${this._stateSignature(this.hass?.states?.[id])}`)
      .join('|');
  }

  static getStubConfig() {
    return {
      type: 'custom:bubble-room',
      layout: 'wide',
      name: [],
      area: [],
      sensors: [],
      mushrooms: [],
      subbuttons: [],
      colors: {
        subbutton: {
          background_on: 'rgba(var(--color-blue),1)',
          background_off: 'rgba(var(--color-blue),0.3)',
          icon_on: 'yellow',
          icon_off: '#666',
        },
      },
    };
  }

  static async getConfigElement() {
    await import('./bubble-room-editor.js');
    return document.createElement('bubble-room-editor');
  }

  /* ───────────── ciclo vita ───────────── */
  connectedCallback() {
    super.connectedCallback();
    this._resizeObs = new ResizeObserver(() => {
      this.requestUpdate();
      this._startLayoutSettle(250);
    });
  }
  firstUpdated() {
    const area = this.shadowRoot?.querySelector('.icon-mushroom-area');
    area && this._resizeObs.observe(area);
    this._startLayoutSettle(1000);
  }
  disconnectedCallback() {
    this._resizeObs?.disconnect();
    if (this._layoutSettleTimer) clearTimeout(this._layoutSettleTimer);
    if (this._layoutSettleRaf) cancelAnimationFrame(this._layoutSettleRaf);
    this._layoutSettleTimer = null;
    this._layoutSettleRaf = null;
    super.disconnectedCallback();
  }

  /** riclona se l’utente modifica la card dall’editor */
  updated(changed) {
    if (changed.has('config')) {
      this._entities = structuredClone(this.config.entities || {});
      this._trackedEntityIds = this._collectTrackedEntityIds();
      this._viewCache.clear();
      this._startLayoutSettle(700);
    }
  }

  _startLayoutSettle(duration = 700) {
    const now = performance?.now?.() ?? Date.now();
    this._layoutSettleUntil = Math.max(this._layoutSettleUntil || 0, now + duration);
    this._scheduleLayoutSettleTick();
  }

  _scheduleLayoutSettleTick() {
    if (this._layoutSettleRaf || this._layoutSettleTimer) return;
    const now = performance?.now?.() ?? Date.now();
    if (!this._layoutSettleUntil || now >= this._layoutSettleUntil) return;

    this._layoutSettleRaf = requestAnimationFrame(() => {
      this._layoutSettleRaf = null;
      this.requestUpdate();
      this.updateComplete
        .then(() => {
          this._reflowVisualChildren();
          const current = performance?.now?.() ?? Date.now();
          if (current >= this._layoutSettleUntil) return;

          this._layoutSettleTimer = setTimeout(() => {
            this._layoutSettleTimer = null;
            this._scheduleLayoutSettleTick();
          }, 90);
        })
        .catch(() => {});
    });
  }

  _reflowVisualChildren() {
    const root = this.renderRoot;
    root?.querySelector('bubble-name')?.reflowLayout?.({ force: true, duration: 250 });
    root?.querySelector('bubble-sensor')?.reflowLayout?.(true, 250);
    root?.querySelector('bubble-mushroom')?.reflowLayout?.(true);
    root?.querySelector('bubble-icon')?.requestUpdate?.();
  }

  /* ───────────── sub-button helper ───────────── */
  _getSubButtons() {
    const subbuttons = this.config.subbuttons || [];
    const ids = subbuttons.map((sb) => sb?.entity_id || sb?.entity).filter(Boolean);
    const signature = JSON.stringify({
      subbuttons,
      colors: this.config.colors?.subbutton || {},
      states: this._statesSignature(ids),
    });

    return this._cachedView('subbuttons', signature, () => {
    const bgOn   = this.config.colors?.subbutton?.background_on  ?? '#00d46d';
    const bgOff  = this.config.colors?.subbutton?.background_off ?? '#999';
    const iconOn = this.config.colors?.subbutton?.icon_on ?? 'yellow';
    const iconOff= this.config.colors?.subbutton?.icon_off ?? '#666';

    return subbuttons.map(sb => {
      const stateObj = this.hass.states?.[sb.entity_id];

      // Ordine di priorità icona:
      // 1) icona personalizzata in config
      // 2) icona da entity (device_class / icon attribute / mapping)
      let finalIcon = sb.icon || resolveEntityIcon(sb.entity_id, this.hass);

      const active = stateObj?.state === 'on';

      return {
        icon: finalIcon,
        active,
        colorOn:  bgOn,
        colorOff: bgOff,
        iconOn,
        iconOff,
        entity_id:  sb.entity_id,
        tap_action:  sb.tap_action,
        hold_action: sb.hold_action,
        animation:   sb.animation,
      };
    });
    });
  }


  /* ───────────── presenza stanza ───────────── */
  _isRoomActive() {
    const entityId = this.config?.entities?.presence?.entity;
    if (!entityId) return false;
    const state = this.hass?.states?.[entityId]?.state;
    return ['on', 'home', 'occupied', 'motion', 'detected'].includes(state);
  }

  /** lato dell’icona principale */
  _getMainIconSize() {
    const area = this.shadowRoot?.querySelector('.icon-mushroom-area');
    if (!area) return 0;
    return Math.round(Math.min(area.clientWidth, area.clientHeight) * 0.58);
  }

  /* ───────────── sensori ───────────── */
  _getSensors() {
    const entities = this._entities || {};
    const sensorIds = [];
    for (let i = 1; i <= 8; i++) sensorIds.push(entities[`sensor${i}`]?.entity);
    const presenceId = this.config?.entities?.presence?.entity;
    const signature = JSON.stringify({
      sensorIds,
      presenceId,
      sensorColors: this.config.colors?.sensor || {},
      roomColors: this.config.colors?.room || {},
      states: this._statesSignature([...sensorIds, presenceId]),
    });

    return this._cachedView('sensors', signature, () => {
    const sensorColorActive =
      this.config.colors?.sensor?.sensor_active ??
      this.config.colors?.room?.icon_active ??
      '#21df73';

    const sensorColorInactive =
      this.config.colors?.sensor?.sensor_inactive ??
      this.config.colors?.room?.icon_inactive ??
      '#173c16';

    const color = this._isRoomActive() ? sensorColorActive : sensorColorInactive;

    const result = [];
    for (let i = 1; i <= 6; i++) {
      const entId = entities[`sensor${i}`]?.entity;
      const st    = this.hass?.states?.[entId];
      if (!entId || !st) continue;

      result.push({
        icon:  st.attributes.icon || '',
        value: st.state,
        unit:  st.attributes.unit_of_measurement,
        device_class: st.attributes.device_class,
        color,
        entity: entId,
      });
    }
    return result;
    });
  }

  /* ───────────── mushroom ───────────── */
  _getMushrooms() {
    const entities = this._entities || {};
    const ids = [];
    for (let i = 1; i <= 8; i++) ids.push(entities[`mushroom${i}`]?.entity);
    ids.push(entities.camera?.entity, entities.camera?.presence?.entity, entities.climate?.entity);

    const signature = JSON.stringify({
      entities: {
        mushrooms: Array.from({ length: 8 }, (_, i) => entities[`mushroom${i + 1}`] || {}),
        camera: entities.camera || {},
        climate: entities.climate || {},
      },
      colors: this.config.colors?.mushroom || {},
      states: this._statesSignature(ids),
    });

    return this._cachedView('mushrooms', signature, () => {

    const activeCol   = this.config.colors?.mushroom?.active   ?? '#00e676';
    const inactiveCol = this.config.colors?.mushroom?.inactive ?? '#888';

    const list = [];

    // i “mushroom” normali (1..5) — ora passiamo anche entity_id, tap_action, hold_action
    for (let i = 1; i <= 5; i++) {
      const key   = `mushroom${i}`;
      const conf  = entities[key] || {};
      const entId = conf.entity;
      const st    = this.hass?.states?.[entId];
      if (!entId || !st) continue;

      const mushroomActive = st.state === 'on';
      list.push({
        icon:  conf.icon || st.attributes.icon || resolveEntityIcon(entId, this.hass) || 'mdi:flash',
        state: st.state,
        active: mushroomActive,
        color: mushroomActive ? activeCol : inactiveCol,
        dx: conf.dx ?? 0,
        dy: conf.dy ?? 0,
        angle_deg: conf.angle_deg,
        radius_factor: conf.radius_factor,
        entity_id: entId,
        tap_action:  conf.tap_action,
        hold_action: conf.hold_action,
        animation:   conf.animation,
      });
    }

    // 6) CAMERA (in alto a destra: posizione/scala gestite in BubbleMushroom)
    const camCfg = entities.camera || {};
    const camId  = camCfg.entity;
    if (camId && this.hass.states?.[camId]) {
      const st = this.hass?.states?.[camId];
      const presId = camCfg.presence?.entity;
      const presState = presId ? this.hass?.states?.[presId]?.state : undefined;
      const presActive = presId ? ['on', 'home', 'occupied', 'motion', 'detected'].includes(presState) : true;
      list.push({
        icon: camCfg.icon || st.attributes.icon || resolveEntityIcon(camId, this.hass) || 'mdi:cctv',
        state: st.state,
        active: presActive,
        color: presActive ? activeCol : inactiveCol,
        left: 'calc(100% - 12px - 36px)',
        top: 12,
        dx: 0,
        dy: 0,
        kind: 'camera',
        angle_deg: camCfg.angle_deg,
        radius_factor: camCfg.radius_factor,
        entity_id: camId,
        tap_action: { action: 'more-info' },
        hold_action: { action: 'none' },
      });
    }

    // 7) CLIMATE (fisso via kind:'climate')
    const cliCfg = this._entities?.climate || {};
    const cliId = cliCfg.entity;
    if (cliId && this.hass.states?.[cliId]) {
      const st = this.hass?.states?.[cliId];
      const isActive =
        (st.state && st.state !== 'off' && st.state !== 'idle') ||
        (st.attributes?.hvac_action && st.attributes.hvac_action !== 'off');

      list.push({
        icon: cliCfg.icon || st.attributes.icon || resolveEntityIcon(cliId, this.hass) || 'mdi:thermostat',
        state: st.state,
        active: isActive,
        color: isActive ? activeCol : inactiveCol,
        dx: 0,
        dy: 0,
        angle_deg: cliCfg.angle_deg,
        radius_factor: cliCfg.radius_factor,
        kind: 'climate',
        entity_id: cliId,
      });
    }

    return list;
    });
  }

  /* stub click */
  _onMushroomClick(_ev) {
    /* puoi gestire altri eventi qui */
  }

  /* ───────────── render ───────────── */
  render() {
    try {
      return this._renderCard();
    } catch (err) {
      console.error('[bubble-room] render error:', err);
      return html`<div style="padding:12px;color:#f87;font-size:0.9rem">
        bubble-room: errore di rendering — ${err.message}
      </div>`;
    }
  }

  _renderCard() {
    const layout        = this.config.layout || 'wide';
    const mainIconSize  = this._getMainIconSize();
    const subbuttons    = this._getSubButtons();
    const subbuttonMode = this.config?.subbutton_style || 'standard';
    const isActive      = this._isRoomActive();

    /* palette */
    const iconColorActive = this.config.colors?.room?.icon_active ?? '#21df73';
    const _activeRgb      = parseColor(iconColorActive);
    // Se non configurato, inattivo = stesso colore attivo a 42% opacità (come subbutton)
    const iconColorInactive = this.config.colors?.room?.icon_inactive
      ?? (_activeRgb ? `rgba(${_activeRgb.r},${_activeRgb.g},${_activeRgb.b},0.42)` : 'rgba(33,223,115,0.42)');
    const iconBgActive   = this.config.colors?.room?.background_active   ?? 'rgba(33,223,115,0.12)';
    const iconBgInactive = this.config.colors?.room?.background_inactive
      ?? (_activeRgb ? `rgba(${_activeRgb.r},${_activeRgb.g},${_activeRgb.b},0.06)` : 'rgba(33,223,115,0.06)');
    const textColorActive   = this.config.colors?.room?.text_active   ?? '#ffffff';
    const textColorInactive = this.config.colors?.room?.text_inactive ?? 'rgba(255,255,255,0.65)';
    const sensorColorActive =
      this.config.colors?.sensor?.sensor_active ??
      this.config.colors?.room?.icon_active ??
      iconColorActive;
    const sensorColorInactive =
      this.config.colors?.sensor?.sensor_inactive ??
      this.config.colors?.room?.icon_inactive ??
      iconColorInactive;
    const sensorGlassColor = isActive ? sensorColorActive : sensorColorInactive;

    // Card background: blob radiale + variabili accent per un look più profondo.
    const cardBgEnabled = this.config?.card_background?.enabled ?? true;
    let cardBgStyle = '';
    if (cardBgEnabled) {
      const rawColor = this.config?.card_background?.color || '';
      let r, g, b, alpha;
      if (rawColor) {
        // Regex: evita il bug canvas premult su rgba semitrasparenti
        const m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/.exec(rawColor);
        if (m) {
          r = +m[1]; g = +m[2]; b = +m[3];
          alpha = Math.min(+(m[4] ?? 1), 0.40);
        } else if (rawColor.startsWith('#')) {
          const rgb = parseColor(rawColor); // hex opaco: nessun problema premult
          if (rgb) { r = rgb.r; g = rgb.g; b = rgb.b; alpha = 0.22; }
        }
      }
      if (r === undefined) {
        // Auto: usa _activeRgb (da hex opaco, senza errori canvas premult)
        if (_activeRgb) { r = _activeRgb.r; g = _activeRgb.g; b = _activeRgb.b; }
        alpha = isActive ? 0.22 : 0.12;
      }
      if (r !== undefined) {
        cardBgStyle = [
          `--bubble-room-accent-rgb:${r},${g},${b}`,
          `--bubble-room-accent-alpha:${alpha}`,
        ].join(';');
      }
    }

    // Azioni per la main icon: uso quelle della card (tap/hold) e come fallback entity la "presence"
    const mainEntity = this.config?.entities?.presence?.entity || '';
    const tapAct     = this.config?.tap_action  || { action: 'more-info' };
    const holdAct    = this.config?.hold_action || { action: 'none' };
    const hasSidebar = subbuttons.length > 0;
    const roomLabel = [this.config.name, this.config.area]
      .flat()
      .filter(Boolean)
      .join(' - ') || 'Bubble Room';

    return html`
      <div
        class="bubble-room-grid ${layout} ${isActive ? 'is-active' : 'is-inactive'} ${hasSidebar ? '' : 'no-sidebar'}"
        style="${cardBgStyle}"
        role="group"
        aria-label="${roomLabel}"
        @hass-action=${this._onHassAction}
      >
        <div class="main-area">
          <div class="row1">
            <bubble-sensor
              .sensors="${this._getSensors()}"
              .showIcons=${this.config?.sensor_options?.show_icons ?? false}
              .preset="${subbuttonMode}"
              style="
                --bubble-sensor-active-color:${sensorGlassColor};
                --bubble-sensor-value-color:${sensorColorActive};
              "
            ></bubble-sensor>

            <div class="name-placeholder" id="nameContainer">
              <bubble-name
                .name="${this.config.name}"
                .area="${this.config.area}"
                .hass=${this.hass}
                .config=${this.config}
                .container=${this.shadowRoot?.getElementById('nameContainer')}
                .preset="${subbuttonMode}"
                style="
                --bubble-room-name-color:${isActive ? textColorActive : textColorInactive};
                --bubble-room-name-saturation:${isActive ? '1.25' : '0.55'};
                --bubble-room-name-brightness:${isActive ? '1.45' : '0.68'};
              "
              ></bubble-name>
            </div>
          </div>

          <div class="row2">
            <div class="icon-mushroom-area">
              <bubble-icon
                .icon="${this.config.icon || resolveEntityIcon(this.config.entity, this.hass)}"
                .active=${isActive}
                .colorActive="${iconColorActive}"
                .colorInactive="${iconColorInactive}"
                .backgroundActive="${iconBgActive}"
                .backgroundInactive="${iconBgInactive}"
                .preset="${subbuttonMode}"
                style="
                  ${mainIconSize ? `--main-icon-size:${mainIconSize}px;` : ''}
                  --icon-shift-x:-20%;
                "
                .entity_id=${mainEntity}
                .tap_action=${tapAct}
                .hold_action=${holdAct}
              ></bubble-icon>

              <bubble-mushroom
                .entities="${this._getMushrooms()}"
                .preset="${subbuttonMode}"
                .containerSize="${{ width: 180, height: 180 }}"
                @mushroom-entity-click="${this._onMushroomClick}"
              ></bubble-mushroom>
            </div>
            <div class="k-space"></div>
          </div>
        </div>

        <div class="sidebar">
          <bubble-subbutton
            .subbuttons="${subbuttons}"
            .preset="${subbuttonMode}"
          ></bubble-subbutton>
        </div>
      </div>
    `;
  }

  /* ───────────── esecuzione azioni card ───────────── */
  _onHassAction = (e) => {
    e.stopPropagation();
    // e.detail = { config:{ entity, tap_action, hold_action, double_tap_action }, action: 'tap'|'hold'|'double_tap' }
    const { config, action } = e.detail || {};
    if (!config) return;

    const actCfg = action === 'hold'
      ? (config.hold_action || { action: 'none' })
      : action === 'double_tap'
        ? (config.double_tap_action || { action: 'none' })
        : (config.tap_action  || { action: 'none' });

    this._runAction(actCfg, config.entity);
  };

  _runAction(actionCfg, fallbackEntity) {
    const act = actionCfg?.action || 'none';
    if (act === 'none') return;

    try {
      switch (act) {
        case 'navigate': {
          const path = actionCfg.navigation_path || actionCfg.navigationPath;
          if (path) {
            window.history.pushState({}, '', path);
            window.dispatchEvent(new Event('location-changed'));
          }
          break;
        }
        case 'url': {
          const path = actionCfg.url_path || actionCfg.urlPath || actionCfg.url;
          if (path) {
            if (actionCfg.new_tab) {
              window.open(path, '_blank', 'noopener,noreferrer');
            } else {
              window.location.href = path;
            }
          }
          break;
        }
        case 'more-info': {
          const entityId = actionCfg.entity || fallbackEntity;
          if (entityId) {
            this.dispatchEvent(new CustomEvent('hass-more-info', {
              detail: { entityId }, bubbles: true, composed: true
            }));
          }
          break;
        }
        case 'toggle': {
          const entityId = actionCfg.entity || fallbackEntity;
          if (entityId && this.hass?.callService) {
            this.hass.callService('homeassistant', 'toggle', { entity_id: entityId });
          }
          break;
        }
        case 'call-service': {
          const srv = actionCfg.service || '';
          const [domain, service] = srv.split('.');
          if (domain && service && this.hass?.callService) {
            const data = { ...(actionCfg.service_data || actionCfg.data || {}) };
            if (!data.entity_id && fallbackEntity) data.entity_id = fallbackEntity;
            this.hass.callService(domain, service, data);
          }
          break;
        }
        default:
          break;
      }
    } catch (err) {
      console.error('[bubble-room] action error:', act, err);
    }
  }

  /* ───────────── stili originali ───────────── */
  static styles = css`
    :host { display:block; height:100%; box-sizing:border-box; }
    .bubble-room-grid { display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 22%);
      grid-template-rows:minmax(0, 1fr);
      gap: 0 2.5%;
      width:100%; height:100%; box-sizing:border-box; padding: 0 2.8% 2.2% 0;
      overflow: hidden;
      position: relative;
      isolation: isolate;
      border-radius: var(--ha-card-border-radius, 12px);
      background:
        radial-gradient(
          circle at 20% 82%,
          rgba(var(--bubble-room-accent-rgb, 33, 223, 115), var(--bubble-room-accent-alpha, 0.16)) 0%,
          rgba(var(--bubble-room-accent-rgb, 33, 223, 115), calc(var(--bubble-room-accent-alpha, 0.16) * 0.55)) 28%,
          transparent 62%
        );
      transition: background 0.35s ease, filter 0.35s ease; }
    .bubble-room-grid::before { content:""; position:absolute; inset:0; z-index:-1;
      pointer-events:none;
      background:
        linear-gradient(135deg, rgba(255,255,255,0.10), transparent 38%),
        radial-gradient(circle at 86% 10%, rgba(255,255,255,0.08), transparent 30%);
      opacity: 0.72; }
    .bubble-room-grid.is-inactive { filter: saturate(0.82); }
    .bubble-room-grid.no-sidebar { grid-template-columns:minmax(0, 1fr); padding-right:0; }
    .bubble-room-grid.no-sidebar .sidebar { display:none; }
    .main-area { display:grid; height:100%; min-height:0; min-width:0; box-sizing:border-box; overflow:visible; }
    .row1 { display:grid; min-height:0; min-width:0; box-sizing:border-box; overflow:visible;
      grid-template-columns:1fr; row-gap:1%; }
    .row2 { display:grid; height:100%; min-height:0; box-sizing:border-box;
    }
    .name-placeholder { display:flex; align-items:center; justify-content:flex-start;
      width:100%; max-width:100%; height:100%; box-sizing:border-box;
      min-width:0; min-height:0; overflow:visible; flex-shrink:1; background:transparent; }
    .icon-mushroom-area { box-sizing:border-box;
      position:relative; width:100%; height:100%; min-width:0; min-height:0; display:flex; align-items:center; overflow:hidden; }
    .k-space { box-sizing:border-box; }
    .sidebar { display:flex; flex-direction:column; height:100%; min-height:0; min-width:0;
      box-sizing:border-box; }

    .bubble-room-grid.tall .main-area { grid-template-rows:minmax(0, 34%) minmax(0, 66%); }
    .bubble-room-grid.tall .row1      { grid-template-rows:minmax(0, 27%) minmax(0, 72%); }
    .bubble-room-grid.tall .row2      { grid-template-columns:1fr 0fr; }

    .bubble-room-grid.wide .main-area { grid-template-rows:minmax(0, 34%) minmax(0, 66%); }
    .bubble-room-grid.wide .row1      { grid-template-rows:minmax(0, 27%) minmax(0, 72%); }
    .bubble-room-grid.wide .row2      { grid-template-columns:2fr 1fr; }
  `;
}

if (!customElements.get('bubble-room')) {
  customElements.define('bubble-room', BubbleRoom);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'bubble-room',
  name: 'Bubble Room',
  description: 'All‑in‑one room card: control entities, see sensors, and tweak colors & layout.',
  preview: false,
  documentationURL: 'https://github.com/mon3y78/Lovelace-Bubble-room',
});
