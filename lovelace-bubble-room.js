import{LitElement as t,css as e,html as i}from"https://unpkg.com/lit@2.6.1/index.js?module";customElements.define("bubble-room",class extends t{static get properties(){return{config:{type:Object},hass:{type:Object}}}static async getConfigElement(){return await Promise.resolve().then((function(){return lt})),document.createElement("bubble-room-editor")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"mdi:lightbulb",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"mdi:fan",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"mdi:play-circle",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"mdi:robot-vacuum",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"mdi:thermostat",tap_action:{action:"more-info"}},entities1:{entity:"sensor.some_sensor1",icon:"mdi:information-outline"},entities2:{entity:"sensor.some_sensor2",icon:"mdi:information-outline"},entities3:{entity:"sensor.some_sensor3",icon:"mdi:information-outline"},entities4:{entity:"sensor.some_sensor4",icon:"mdi:information-outline"},entities5:{entity:"sensor.some_sensor5",icon:"mdi:information-outline"},temperatura:{sensore_temperatura:"sensor.vindstyrka_salotto_temperature","sensore_umitidà":"sensor.vindstyrka_salotto_humidity",tap_action:{action:"more-info"}}},colors:{active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"},name:"Salotto",icon:"mdi:sofa",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"}}}_defaultMushroomStyle(t){switch(t){case 0:return"top: -82px; left: 0px;";case 1:return"top: -87px; left: 43px;";case 2:return"top: -67px; left: 80px;";case 3:return"bottom: 42px; left: 98px;";case 4:return"bottom: 0px; left: 90px;";case 5:return"bottom: -2px; left: -2px;";case 6:return"top: -140px; left: 15px;";default:return""}}setConfig(t){if(t=JSON.parse(JSON.stringify(t)),console.log("bubble-room.js: setConfig() called with:",t),!t||"object"!=typeof t||Array.isArray(t))throw new Error("La configurazione deve essere un oggetto valido.");if(!t.entities||"object"!=typeof t.entities)throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");const e=["presence","sub-button1","sub-button2","sub-button3","sub-button4","entities1","entities2","entities3","entities4","entities5","climate","temperatura"],i={tap_action:{action:"toggle"},hold_action:{action:"more-info"}},n={"sub-button1":"mdi:lightbulb","sub-button2":"mdi:fan","sub-button3":"mdi:play-circle","sub-button4":"mdi:robot-vacuum",entities1:"mdi:information-outline",entities2:"mdi:information-outline",entities3:"mdi:information-outline",entities4:"mdi:information-outline",entities5:"mdi:information-outline",presence:"mdi:account",climate:"mdi:thermostat",temperatura:""},o={};for(const s in t.entities){let a=t.entities[s];if(["entities1","entities2","entities3","entities4","entities5"].includes(s)&&a&&"object"==typeof a&&Object.keys(a).some((t=>/^\d+$/.test(t)))){let t={};for(const e in a)/^\d+$/.test(e)||(t[e]=a[e]);const e=Object.keys(a).filter((t=>/^\d+$/.test(t)));e.length>0&&(t.entity=e.sort(((t,e)=>Number(t)-Number(e))).map((t=>a[t])).join("")),a=t}if("climate"===s&&"string"==typeof a&&(a={entity:a,icon:n.climate,...i}),"string"==typeof a)e.includes(s)?o[s]="presence"===s?{entity:a,icon:n[s]}:{entity:a,icon:n[s],...i}:o[s]=a;else if("object"==typeof a)if(e.includes(s)){if(a.icon||(a.icon=n[s]),["entities1","entities2","entities3","entities4","entities5"].includes(s)&&!a.style){let t=parseInt(s.replace("entities",""))-1;a.style=this._defaultMushroomStyle(t)}o[s]="presence"===s?{...a}:{...i,...a}}else o[s]=a}this.config={entities:o,colors:{active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)",...t.colors},name:t.name||"Salotto",icon:t.icon||"mdi:sofa",tap_action:t.tap_action||{action:"navigate",navigation_path:""}},console.log("BubbleRoom - Config ricevuta:",this.config),!this.config.entity&&this.config.entities&&this.config.entities.presence&&(this.config.entity=this.config.entities.presence.entity),console.log("bubble-room.js: Processed configuration:",this.config)}getConfig(){return JSON.parse(JSON.stringify(this.config))}static get styles(){return e`
      *, *::before, *::after { box-sizing: border-box; }
      :host {
        display: block;
        --card-height: 190px;
        --card-background: black;
        --bubble-bg: gray;
        font-family: sans-serif;
      }
      ha-card {
        display: block;
        margin: 0;
        padding: 0 !important;
        background: transparent !important;
        height: var(--card-height);
      }
      .card {
        position: relative;
        width: 100%;
        height: 190px;
        border-radius: 8px;
        overflow: hidden;
      }
      .grid-container {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-areas:
          ". . . b"
          "n n n b"
          "i i . b"
          "i i . b";
        grid-template-columns: 35% 35% 10% 20%;
        grid-template-rows: 25% 25% 25% 25%;
      }
      .name-area {
        grid-area: n;
        display: flex;
        align-items: center;
        padding-left: 5px;
        margin-top: -65px;
        margin-left: 0;
        font-size: 30px;
        font-weight: bold;
        color: inherit;
      }
      .icon-area {
        grid-area: i;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .bubble-icon-container {
        position: absolute;
        cursor: pointer;
        border-radius: 100% !important;
        width: 170px !important;
        height: 170px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -39px;
        left: -40px;
      }
      .bubble-icon {
        position: absolute;
        top: 15%;
        left: 25%;
        width: 50% !important;
        --mdc-icon-size: 90px !important;
        opacity: 0.5 !important;
      }
      .bubble-sub-button-container {
        grid-area: b;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-self: stretch;
        align-self: stretch;
      }
      .bubble-sub-button {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        text-align: center;
        min-height: 38px;
        margin: 5px 0 0 0;
        cursor: pointer;
      }
      .mushroom-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        pointer-events: none;
        z-index: 2;
      }
      .mushroom-item {
        position: absolute;
        pointer-events: auto;
        cursor: pointer;
      }
      .mushroom-item ha-icon {
        --mdc-icon-size: 33px;
        width: 33px;
        height: 33px;
      }
    `}_startHold(t,e){t.stopPropagation(),this._holdTriggered=!1,this._holdTimeout=setTimeout((()=>{this._holdTriggered=!0,this._handleHoldAction(e)}),500)}_endHold(t,e,i){t.stopPropagation(),clearTimeout(this._holdTimeout),this._holdTriggered||i(),this._holdTriggered=!1}_cancelHold(t){clearTimeout(this._holdTimeout),this._holdTriggered=!1}_handleMainIconTap(){if(console.log("Main icon tapped",this.config.tap_action),!this.config.tap_action)return;const t=this.config.tap_action.action;"toggle"===t?this._toggleEntity(this.config.entity):"more-info"===t?this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0})):"navigate"===t&&(this.config.tap_action.navigation_path?(window.history.pushState({},"",this.config.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed"))):console.warn("navigation_path non definito per l'azione navigate della main icon."))}_toggleEntity(t){this.hass&&(console.log("Toggling entity:",t),this.hass.callService("homeassistant","toggle",{entity_id:t}))}_handleHoldAction(t){if(!t.hold_action)return void this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));const e=t.hold_action.action;switch(e){case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"toggle":this._toggleEntity(t.entity);break;case"call-service":if(t.hold_action.service){const[e,i]=t.hold_action.service.split("."),n=t.hold_action.service_data||{};n.entity_id||(n.entity_id=t.entity),this.hass.callService(e,i,n)}break;case"navigate":t.hold_action.navigation_path?(window.history.pushState({},"",t.hold_action.navigation_path),window.dispatchEvent(new Event("location-changed"))):console.warn("navigation_path non definito in hold_action.");break;default:console.warn(`Azione hold_action "${e}" non supportata.`)}}_handleSubButtonTap(t){if(console.log("Handling sub-button tap",t),!t.tap_action||"none"===t.tap_action.action)return;const e=t.tap_action.action;"toggle"===e?this._toggleEntity(t.entity):"more-info"===e?this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0})):"navigate"===e&&(t.tap_action.navigation_path?(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed"))):console.warn("navigation_path non definito per l'azione navigate nel sub-button."))}_handleMushroomTap(t){if(console.log("Handling mushroom tap",t),!t.tap_action||"none"===t.tap_action.action)return;const e=t.tap_action.action;"toggle"===e?this._toggleEntity(t.entity):"more-info"===e?this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0})):"navigate"===e&&(t.tap_action.navigation_path?(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed"))):console.warn("navigation_path non definito per l'azione navigate nel mushroom tap."))}render(){const t=this._getLayoutStyle(this.config?.layout_mode||"6x3");if(console.log("BubbleRoom - Layout selezionato:",this.config?.layout_mode,t),this.config,!this.config||!this.hass)return console.log("bubble-room.js: config or hass not defined yet"),i`<div style="height: ${t.cardHeight};">Loading...</div>`;const{entities:e,colors:n,name:o,icon:s}=this.config,a=this.hass,r=a.states[e.presence.entity]?.state||"off",c="on"===r?n.backgroundActive:n.backgroundInactive,l="on"===r?n.active:n.inactive,h=l,p=[e["sub-button1"],e["sub-button2"],e["sub-button3"],e["sub-button4"]];let d=[e.entities1,e.entities2,e.entities3,e.entities4,e.entities5];return e.climate&&d.push(e.climate),e.temperatura&&d.push(e.temperatura),i`
      <div class="card">
        <div class="grid-container">
          <!-- Area "n": Nome -->
          <div class="name-area" style="color: ${h};">
            ${o}
          </div>
          <!-- Area "i": Icona principale e mushroom template -->
          <div class="icon-area">
            <div class="bubble-icon-container"
                 style="background-color: ${c};"
                 @pointerdown="${t=>this._startHold(t,this.config)}"
                 @pointerup="${t=>this._endHold(t,this.config,(()=>this._handleMainIconTap()))}"
                 @pointerleave="${t=>this._cancelHold(t)}">
              <ha-icon class="bubble-icon" icon="${s}" style="color: ${l};"></ha-icon>
            </div>
            <div class="mushroom-container">
              ${d.map(((t,e)=>{if(!t)return i``;if(t.sensore_temperatura&&t.sensore_umitidà){const n=a.states[t.sensore_temperatura]?.state||"N/A",o=a.states[t.sensore_umitidà]?.state||"N/A";return i`
                    <div class="mushroom-item"
                         style="${t.style?t.style:this._defaultMushroomStyle(e)}"
                         @pointerdown="${e=>this._startHold(e,t)}"
                         @pointerup="${e=>this._endHold(e,t,(()=>this._handleMushroomTap(t)))}"
                         @pointerleave="${t=>this._cancelHold(t)}">
                      <div class="mushroom-primary">🌡️${n}°C 💦${o}%</div>
                    </div>
                  `}{const n="on"===(a.states[t.entity]?.state||"off")?t.icon_color&&t.icon_color.on?t.icon_color.on:"orange":t.icon_color&&t.icon_color.off?t.icon_color.off:"#80808055",o=t.style?t.style:this._defaultMushroomStyle(e);return i`
                    <div class="mushroom-item"
                         style="${o}"
                         @pointerdown="${e=>this._startHold(e,t)}"
                         @pointerup="${e=>this._endHold(e,t,(()=>this._handleMushroomTap(t)))}"
                         @pointerleave="${t=>this._cancelHold(t)}">
                      <ha-icon icon="${t.icon}" style="color: ${n};"></ha-icon>
                    </div>
                  `}}))}
            </div>
          </div>
          <!-- Area "b": Sub-button -->
          <div class="bubble-sub-button-container">
            ${p.map((t=>{if(!t)return i``;const e="on"===(a.states[t.entity]?.state||"off")?n.active:n.inactive;return i`
                <div class="bubble-sub-button"
                     style="background-color: ${e};"
                     @pointerdown="${e=>this._startHold(e,t)}"
                     @pointerup="${e=>this._endHold(e,t,(()=>this._handleSubButtonTap(t)))}"
                     @pointerleave="${t=>this._cancelHold(t)}">
                  <ha-icon icon="${t.icon}"></ha-icon>
                </div>
              `}))}
          </div>
        </div>
      </div>
    `}set hass(t){console.log("Setting hass:",t),this._hass=t,this.requestUpdate()}get hass(){return this._hass}_handleSubButtonTap(t){if(console.log("Handling sub-button tap",t),!t.tap_action||"none"===t.tap_action.action)return;const e=t.tap_action.action;"toggle"===e?this._toggleEntity(t.entity):"more-info"===e?this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0})):"navigate"===e&&(t.tap_action.navigation_path?(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed"))):console.warn("navigation_path non definito per l'azione navigate nel sub-button."))}_handleMushroomTap(t){if(console.log("Handling mushroom tap",t),!t.tap_action||"none"===t.tap_action.action)return;const e=t.tap_action.action;"toggle"===e?this._toggleEntity(t.entity):"more-info"===e?this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0})):"navigate"===e&&(t.tap_action.navigation_path?(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed"))):console.warn("navigation_path non definito per l'azione navigate nel mushroom tap."))}_getLayoutStyle(t){const e={"6x3":{cardHeight:"190px",iconSize:"75px",nameFont:"28px",mushroomSize:"33px",subButtonPadding:"10px",mushroomPositions:["top: -77px; left: 0px;","top: -85px; left: 38px;","top: -64px; left: 77px;","bottom: 39px; left: 96px;","bottom: -1px; left: 85px;","bottom: -2px; left: -2px;","top: -140px; left: 5px;","top: -95px; right: 5px;"]},"12x4":{cardHeight:"300px",iconSize:"100px",nameFont:"40px",mushroomSize:"45px",subButtonPadding:"14px",mushroomPositions:["top: -100px; left: 10px;","top: -110px; left: 60px;","top: -80px; left: 120px;","bottom: 60px; left: 160px;","bottom: 0px; left: 140px;","bottom: 0px; left: 0px;","top: -180px; left: 15px;","top: -130px; right: 15px;"]}};return e[t]||e["6x3"]}_defaultMushroomStyle(t){return this._getLayoutStyle(this.config?.layout_mode).mushroomPositions[t]||""}});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n=globalThis,o=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}}const c=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new r(i,t,s)},l=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:h,defineProperty:p,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:g,getPrototypeOf:_}=Object,m=globalThis,v=m.trustedTypes,f=v?v.emptyScript:"",b=m.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!h(t,e),A={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class E extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=A){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&p(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const s=n?.call(this);o.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??A}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...g(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(o)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of e){const e=document.createElement("style"),o=n.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=n,this[n]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??x)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[y("elementProperties")]=new Map,E[y("finalized")]=new Map,b?.({ReactiveElement:E}),(m.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S=globalThis,w=S.trustedTypes,C=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+T,H=`<${k}>`,N=document,O=()=>N.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,M="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,j=/>/g,B=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,D=/"/g,J=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,K=N.createTreeWalker(N,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,n=[];let o,s=2===e?"<svg>":3===e?"<math>":"",a=R;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,h=0;for(;h<i.length&&(a.lastIndex=h,c=a.exec(i),null!==c);)h=a.lastIndex,a===R?"!--"===c[1]?a=z:void 0!==c[1]?a=j:void 0!==c[2]?(J.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=B):void 0!==c[3]&&(a=B):a===B?">"===c[0]?(a=o??R,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?B:'"'===c[3]?D:L):a===D||a===L?a=B:a===z||a===j?a=R:(a=B,o=void 0);const p=a===B&&t[e+1].startsWith("/>")?" ":"";s+=a===R?i+H:l>=0?(n.push(r),i.slice(0,l)+P+i.slice(l)+T+p):i+T+(-2===l?e:p)}return[Z(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class G{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,s=0;const a=t.length-1,r=this.parts,[c,l]=Y(t,e);if(this.el=G.createElement(c,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=K.nextNode())&&r.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(P)){const e=l[s++],i=n.getAttribute(t).split(T),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?nt:"@"===a[1]?ot:et}),n.removeAttribute(t)}else t.startsWith(T)&&(r.push({type:6,index:o}),n.removeAttribute(t));if(J.test(n.tagName)){const t=n.textContent.split(T),e=t.length-1;if(e>0){n.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],O()),K.nextNode(),r.push({type:2,index:++o});n.append(t[e],O())}}}else if(8===n.nodeType)if(n.data===k)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(T,t+1));)r.push({type:7,index:o}),t+=T.length-1}o++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,n){if(e===F)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const s=I(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,n)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??N).importNode(e,!0);K.currentNode=n;let o=K.nextNode(),s=0,a=0,r=i[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new tt(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new st(o,this,t)),this._$AV.push(e),r=i[++a]}s!==r?.index&&(o=K.nextNode(),s++)}return K.currentNode=N,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),I(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new X(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new G(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new tt(this.O(O()),this.O(O()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,n){const o=this.strings;let s=!1;if(void 0===o)t=Q(this,t,e,0),s=!I(t)||t!==this._$AH&&t!==F,s&&(this._$AH=t);else{const n=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=Q(this,n[i+a],e,a),r===F&&(r=this._$AH[a]),s||=!I(r)||r!==this._$AH[a],r===V?t=V:t!==V&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}s&&!n&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class nt extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class ot extends et{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===F)return;const i=this._$AH,n=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=S.litHtmlPolyfillSupport;at?.(G,tt),(S.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class rt extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new tt(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}rt._$litElement$=!0,rt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:rt});const ct=globalThis.litElementPolyfillSupport;ct?.({LitElement:rt}),(globalThis.litElementVersions??=[]).push("4.1.1");customElements.define("bubble-room-editor",class extends rt{static get properties(){return{_config:{type:Object},hass:{type:Object},_iconList:{type:Array}}}static async getConfigElement(){return await Promise.resolve().then((function(){return lt})),document.createElement("bubble-room-editor")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"mdi:lightbulb",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"mdi:fan",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"mdi:speaker",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"mdi:robot-vacuum",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"mdi:thermostat",tap_action:{action:"more-info"}},entities1:{entity:"sensor.some_sensor1",icon:"mdi:information-outline"},entities2:{entity:"sensor.some_sensor2",icon:"mdi:information-outline"},entities3:{entity:"sensor.some_sensor3",icon:"mdi:information-outline"},entities4:{entity:"sensor.some_sensor4",icon:"mdi:information-outline"},entities5:{entity:"sensor.some_sensor5",icon:"mdi:information-outline"},temperature:{temperature_sensor:"sensor.vindstyrka_salotto_temperature",humidity_sensor:"sensor.vindstyrka_salotto_humidity",unit:"C",tap_action:{action:"more-info"}}},colors:{active:"var(--primary-color)",inactive:"var(--secondary-text-color)",backgroundActive:"color-mix(in srgb, var(--primary-color) 85%, transparent)",backgroundInactive:"var(--card-background-color)"},name:"Salotto",icon:"mdi:sofa",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"},hold_action:{action:"more-info",navigation_path:""}}}constructor(){super(),this._iconList=["mdi:lightbulb","mdi:fan","mdi:play-circle","mdi:robot-vacuum","mdi:information-outline","mdi:sofa","mdi:account","mdi:bed","mdi:home","mdi:weather-sunny","mdi:weather-cloudy","mdi:weather-rainy"]}connectedCallback(){super.connectedCallback()}setConfig(t){t||(t={}),t.entities||(t.entities={}),t.colors||(t.colors={}),t.colors.active=t.colors.active||"var(--primary-color)",t.colors.inactive=t.colors.inactive||"color-mix(in srgb, var(--primary-color) 40%, transparent)",t.colors.backgroundActive=t.colors.backgroundActive||"color-mix(in srgb, var(--primary-color) 20%, transparent)",t.colors.backgroundInactive=t.colors.backgroundInactive||"color-mix(in srgb, var(--primary-color) 10%, transparent)",t.entities.temperature||(t.entities.temperature={}),t.entities.temperature.unit=t.entities.temperature.unit||"C",t.hold_action||(t.hold_action={action:"more-info",navigation_path:""}),this._config=t}_updateTemperatureUnit(t){const e=t.target.value,i={...this._config.entities.temperature,unit:e},n={...this._config.entities,temperature:i};this._config={...this._config,entities:n},this.requestUpdate(),this._fireConfigChanged()}_updateLayoutMode(t){const e=t.target.value;this._config={...this._config,layout_mode:e},this.requestUpdate(),this._fireConfigChanged()}getConfig(){const t=JSON.parse(JSON.stringify(this._config));t.layout_mode||(t.layout_mode=this._config.layout_mode||"6x3");const e={};return Object.keys(t.entities).forEach((i=>{const n=t.entities[i];n.entity&&""!==n.entity.trim()&&(e[i]=n)})),t.entities=e,t.colors&&Object.keys(t.colors).forEach((e=>{""===t.colors[e].trim()&&delete t.colors[e]})),console.log("Editor - Config finale restituita:",t),t}_defaultIconList(){return this._iconList}static get styles(){return c`
      :host {
        display: block;
        margin: 0;
        padding: 0;
      }
      .editor-header {
        text-align: center;
        margin: 1rem 0;
      }
      /* Stile comune per tutti gli header dei pannelli */
      ha-expansion-panel div[slot="header"] {
        background-color: var(--slider-bar-color);
        color: var(--text-primary-color);
        padding: 8px;
        font-weight: bold;
      }
      .section-content {
        padding: 16px;
      }
      .input-group {
        margin-bottom: 16px;
      }
      label {
        display: inline-block;
        margin-bottom: 4px;
        font-weight: 600;
      }
      input, textarea, select {
        width: 100%;
        box-sizing: border-box;
      }
      .note {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: var(--secondary-text-color);
      }
    `}_togglePanel(t){const e=this.shadowRoot.getElementById(t);e&&(e.open=!e.open)}_renderSubButtonPanel(t){let e;switch(this._config.entities,t){case"sub-button1":e="Sub-button1";break;case"sub-button2":e="Sub-button2";break;case"sub-button3":e="Sub-button3";break;case"sub-button4":e="Sub-button4";break;default:e=t}const i=`${t}Panel`;return q`
      <ha-expansion-panel id="${i}">
        <div slot="header" @click="${()=>this._togglePanel(i)}">
          ${e}
        </div>
        <div class="section-content">
          ${this._renderEntityInput("Entities (ID)",t)}
          ${this._renderIconInput("Icon",t)}
          ${this._renderSubButtonAction(t)}
        </div>
      </ha-expansion-panel>
    `}render(){return this._config?q`
      <div class="editor-header">
        <h3>Visual Editor Bubble Room</h3>
      </div>

      <ha-expansion-panel id="roomPanel">
        <div slot="header" @click="${()=>this._togglePanel("roomPanel")}">
          Room Settings
        </div>
        <div class="section-content">
          <div class="input-group">
            <label>Room name:</label>
            <input
              type="text"
              .value="${this._config.name||""}"
              @input="${this._updateName}"
            />
          </div>
          <div class="input-group">
            <label>Layout:</label>
              <select .value="${this._config.layout_mode||"6x3"}" @change="${this._updateLayoutMode}">
                <option value="6x3">6x3</option>
                <option value="12x4">12x4</option>
              </select>
                <option value="6x3">6x3</option>
                <option value="12x4">12x4</option>
              </select>
          </div>
          ${this._renderRoomAction()}
          <div class="input-group">
            ${this._renderEntityInput("Presence (ID)","presence")}
          </div>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="subButtonMainPanel">
        <div slot="header" @click="${()=>this._togglePanel("subButtonMainPanel")}">
          SUB-BUTTON
        </div>
        <div class="section-content">
          ${this._renderSubButtonPanel("sub-button1")}
          ${this._renderSubButtonPanel("sub-button2")}
          ${this._renderSubButtonPanel("sub-button3")}
          ${this._renderSubButtonPanel("sub-button4")}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="mushroomEntitiesPanel">
        <div slot="header" @click="${()=>this._togglePanel("mushroomEntitiesPanel")}">
          Mushroom Entities
        </div>
        <div class="section-content">
          ${this._renderMushroomEntityPanel("entities1","Entity 1")}
          ${this._renderMushroomEntityPanel("entities2","Entity 2")}
          ${this._renderMushroomEntityPanel("entities3","Entity 3")}
          ${this._renderMushroomEntityPanel("entities4","Entity 4")}
          ${this._renderMushroomEntityPanel("entities5","Entity 5")}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="cameraPanel">
        <div slot="header" @click="${()=>this._togglePanel("cameraPanel")}">
          Camera
        </div>
        <div class="section-content">
          <div class="input-group">
            ${this._renderEntityInput("Camera (ID)","camera")}
          </div>
          <div class="input-group">
            ${this._renderIconInput("Camera Icon","camera")}
          </div>
        </div>
      </ha-expansion-panel>



      <ha-expansion-panel id="climatePanel">
        <div slot="header" @click="${()=>this._togglePanel("climatePanel")}">
          Climate
        </div>
        <div class="section-content">
          <div class="input-group">
            ${this._renderEntityInput("Climate (ID)","climate")}
          </div>
          <div class="input-group">
            <label>Temperature Sensor:</label>
            <input
              type="text"
              .value="${this._config.entities?.temperature?.temperature_sensor||""}"
              list="entity-list"
              @input="${this._updateTemperature("temperature_sensor")}"
            />
          </div>
          <div class="input-group">
            <label>Unità:</label>
            <select
              .value="${this._config.entities?.temperature?.unit||"C"}"
              @change="${this._updateTemperatureUnit}"
            >
              <option value="C">°C</option>
              <option value="F">°F</option>
            </select>
          </div>
          <div class="input-group">
            <label>Humidity Sensor:</label>
            <input
              type="text"
              .value="${this._config.entities?.temperature?.humidity_sensor||""}"
              list="entity-list"
              @input="${this._updateTemperature("humidity_sensor")}"
            />
          </div>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="colorsPanel">
        <div slot="header" @click="${()=>this._togglePanel("colorsPanel")}">
          Colors
        </div>
        <div class="section-content">
          <div class="input-group">
            <label>Active:</label>
            <input
              type="text"
              .value="${this._config.colors&&this._config.colors.active||""}"
              @input="${this._updateColor("active")}"
            />
          </div>
          <div class="input-group">
            <label>Inactive:</label>
            <input
              type="text"
              .value="${this._config.colors&&this._config.colors.inactive||""}"
              @input="${this._updateColor("inactive")}"
            />
          </div>
          <div class="input-group">
            <label>Background Active:</label>
            <input
              type="text"
              .value="${this._config.colors&&this._config.colors.backgroundActive||""}"
              @input="${this._updateColor("backgroundActive")}"
            />
          </div>
          <div class="input-group">
            <label>Background Inactive:</label>
            <input
              type="text"
              .value="${this._config.colors&&this._config.colors.backgroundInactive||""}"
              @input="${this._updateColor("backgroundInactive")}"
            />
          </div>
        </div>
      </ha-expansion-panel>

      <datalist id="entity-list">
        ${this.hass?Object.keys(this.hass.entities).map((t=>q`<option value="${t}"></option>`)):""}
      </datalist>
      <datalist id="icon-list">
        ${this._defaultIconList().map((t=>q`<option value="${t}"></option>`))}
      </datalist>

      <p class="note">
        For advanced configurations, modify the YAML directly.
      </p>
    `:q`<div>Caricamento configurazione...</div>`}_renderMushroomEntityPanel(t,e){const i=`${t}Panel`;return q`
      <ha-expansion-panel id="${i}">
        <div slot="header" @click="${()=>this._togglePanel(i)}">
          ${e}
        </div>
        <div class="section-content">
          ${this._renderEntityInput(`${e} (ID)`,t)}
          ${this._renderIconInput(`${e} Icon`,t)}
        </div>
      </ha-expansion-panel>
    `}_renderEntityInput(t,e,i="entity"){const n=this._config.entities&&this._config.entities[e]&&this._config.entities[e][i]||"";return q`
      <label>${t}:</label>
      <input
        type="text"
        .value="${n}"
        list="entity-list"
        @input="${this._updateEntity(e,i)}"
      />
    `}_renderIconInput(t,e,i="icon"){let n=this._config.entities&&this._config.entities[e]&&this._config.entities[e][i]||"";if(!n&&this.hass&&this._config.entities&&this._config.entities[e]?.entity){const t=this._config.entities[e].entity;n=this.hass.states[t]?.attributes?.icon||""}return q`
      <label>${t}:</label>
      <input
        type="text"
        .value="${n}"
        list="icon-list"
        @input="${this._updateEntity(e,i)}"
      />
    `}_renderRoomAction(){const t=this._config.tap_action||{action:"navigate",navigation_path:""},e=this._config.hold_action||{action:"more-info",navigation_path:""};return q`
      <div class="input-group">
        <label>Tap:</label>
        <select @change="${this._updateTapActionField("action")}" .value="${t.action}">
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===t.action?q`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${t.navigation_path||""}"
                @input="${this._updateTapActionField("navigation_path")}"
              />
            `:""}
        ${"call-service"===t.action?q`
              <label>Service:</label>
              <input
                type="text"
                .value="${t.service||""}"
                @input="${this._updateTapActionField("service")}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${t.service_data?JSON.stringify(t.service_data):""}"
                @input="${this._updateTapActionField("service_data")}"
              ></textarea>
            `:""}
      </div>
      <div class="input-group">
        <label>Hold:</label>
        <select @change="${this._updateHoldActionField("action")}" .value="${e.action}">
          <option value="more-info">More Info</option>
          <option value="toggle">Toggle</option>
          <option value="call-service">Call Service</option>
          <option value="navigate">Navigate</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===e.action?q`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${e.navigation_path||""}"
                @input="${this._updateHoldActionField("navigation_path")}"
              />
            `:""}
        ${"call-service"===e.action?q`
              <label>Service:</label>
              <input
                type="text"
                .value="${e.service||""}"
                @input="${this._updateHoldActionField("service")}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${e.service_data?JSON.stringify(e.service_data):""}"
                @input="${this._updateHoldActionField("service_data")}"
              ></textarea>
            `:""}
      </div>
    `}_renderSubButtonAction(t){const e=this._config.entities[t]?.tap_action||{action:"toggle",navigation_path:""},i=this._config.entities[t]?.hold_action||{action:"more-info",navigation_path:""};return q`
      <div class="input-group">
        <label>Tap:</label>
        <select @change="${this._updateEntityTapAction(t,"action")}" .value="${e.action}">
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===e.action?q`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${e.navigation_path||""}"
                @input="${this._updateEntityTapAction(t,"navigation_path")}"
              />
            `:""}
        ${"call-service"===e.action?q`
              <label>Service:</label>
              <input
                type="text"
                .value="${e.service||""}"
                @input="${this._updateEntityTapAction(t,"service")}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${e.service_data?JSON.stringify(e.service_data):""}"
                @input="${this._updateEntityTapAction(t,"service_data")}"
              ></textarea>
            `:""}
      </div>
      <div class="input-group">
        <label>Hold:</label>
        <select @change="${this._updateEntityHoldAction(t,"action")}" .value="${i.action}">
          <option value="more-info">More Info</option>
          <option value="toggle">Toggle</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===i.action?q`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${i.navigation_path||""}"
                @input="${this._updateEntityHoldAction(t,"navigation_path")}"
              />
            `:""}
        ${"call-service"===i.action?q`
              <label>Service:</label>
              <input
                type="text"
                .value="${i.service||""}"
                @input="${this._updateEntityHoldAction(t,"service")}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${i.service_data?JSON.stringify(i.service_data):""}"
                @input="${this._updateEntityHoldAction(t,"service_data")}"
              ></textarea>
            `:""}
      </div>
    `}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateName(t){const e=t.target.value;this._config={...this._config,name:e},this.requestUpdate(),this._fireConfigChanged()}_updateIcon(t){const e=t.target.value;this._config={...this._config,icon:e},this.requestUpdate(),this._fireConfigChanged()}_updateEntity(t,e="entity"){return i=>{const n=i.target.value;let o=this._config.entities[t]||{};o={...o,[e]:n};const s={...this._config.entities,[t]:o};this._config={...this._config,entities:s},this.requestUpdate(),this._fireConfigChanged()}}_updateColor(t){return e=>{const i=e.target.value,n={...this._config.colors||{},[t]:i};this._config={...this._config,colors:n},this.requestUpdate(),this._fireConfigChanged()}}_updateTemperature(t){return e=>{const i=e.target.value,n={...this._config.entities?.temperature,[t]:i};n.temperature_sensor&&n.humidity_sensor&&(n.primary=`🌡️{{ states("${n.temperature_sensor}") }}°C 💦{{ states("${n.humidity_sensor}") }}%`);const o={...this._config.entities,temperature:n};this._config={...this._config,entities:o},this.requestUpdate(),this._fireConfigChanged()}}_updateTapActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const n={...this._config.tap_action||{action:"navigate",navigation_path:""},[t]:i};this._config={...this._config,tap_action:n},this.requestUpdate(),this._fireConfigChanged()}}_updateHoldActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const n={...this._config.hold_action||{action:"more-info",navigation_path:""},[t]:i};this._config={...this._config,hold_action:n},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityTapAction(t,e){return i=>{let n=i.target.value;if("service_data"===e)try{n=JSON.parse(n)}catch(t){}let o=this._config.entities[t]||{},s=o.tap_action||{action:"toggle",navigation_path:""};s={...s,[e]:n},o={...o,tap_action:s};const a={...this._config.entities,[t]:o};this._config={...this._config,entities:a},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityHoldAction(t,e){return i=>{let n=i.target.value;if("service_data"===e)try{n=JSON.parse(n)}catch(t){}let o=this._config.entities[t]||{},s=o.hold_action||{action:"more-info",navigation_path:""};s={...s,[e]:n},o={...o,hold_action:s};const a={...this._config.entities,[t]:o};this._config={...this._config,entities:a},this.requestUpdate(),this._fireConfigChanged()}}});var lt=Object.freeze({__proto__:null});
