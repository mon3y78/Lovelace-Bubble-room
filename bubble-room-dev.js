import{LitElement as t,css as e,html as i}from"https://unpkg.com/lit@2.6.1/index.js?module";customElements.define("bubble-room",class extends t{static get properties(){return{config:{type:Object},hass:{type:Object}}}static async getConfigElement(){return await Promise.resolve().then((function(){return ct})),document.createElement("bubble-room-editor-dev")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"mdi:lightbulb",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"mdi:fan",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"mdi:play-circle",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"mdi:robot-vacuum",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"mdi:thermostat",tap_action:{action:"more-info"}},entities1:{entity:"sensor.some_sensor1",icon:"mdi:information-outline"},entities2:{entity:"sensor.some_sensor2",icon:"mdi:information-outline"},entities3:{entity:"sensor.some_sensor3",icon:"mdi:information-outline"},entities4:{entity:"sensor.some_sensor4",icon:"mdi:information-outline"},entities5:{entity:"sensor.some_sensor5",icon:"mdi:information-outline"}},colors:{room:{color_active:"rgba(var(--color-green), 1)",color_inactive:"rgba(var(--color-green), 0.3)",icon_on:"orange",icon_off:"#80808055"},subbutton:{color_on:"rgba(var(--color-blue), 1)",color_off:"rgba(var(--color-blue), 0.3)",icon_on:"yellow",icon_off:"#666"}},name:"Salotto",icon:"mdi:sofa",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"}}}_defaultMushroomStyle(t){switch(t){case 0:return"top: -82px; left: 0px;";case 1:return"top: -87px; left: 43px;";case 2:return"top: -67px; left: 80px;";case 3:return"bottom: 42px; left: 98px;";case 4:return"bottom: 0px; left: 90px;";case 5:return"bottom: -2px; left: -2px;";case 6:return"top: -140px; left: 15px;";default:return""}}setConfig(t){if(!(t=JSON.parse(JSON.stringify(t)))||"object"!=typeof t||Array.isArray(t))throw new Error("La configurazione deve essere un oggetto valido.");if(!t.entities||"object"!=typeof t.entities)throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");const e=["presence","sub-button1","sub-button2","sub-button3","sub-button4","entities1","entities2","entities3","entities4","entities5","climate"],i={tap_action:{action:"toggle"},hold_action:{action:"more-info"}},o={"sub-button1":"mdi:lightbulb","sub-button2":"mdi:fan","sub-button3":"mdi:play-circle","sub-button4":"mdi:robot-vacuum",entities1:"mdi:information-outline",entities2:"mdi:information-outline",entities3:"mdi:information-outline",entities4:"mdi:information-outline",entities5:"mdi:information-outline",presence:"mdi:account",climate:"mdi:thermostat",camera:"mdi:cctv"},n={};for(const s in t.entities){let a=t.entities[s];if(["entities1","entities2","entities3","entities4","entities5"].includes(s)&&a&&"object"==typeof a&&Object.keys(a).some((t=>/^\d+$/.test(t)))){let t={};for(const e in a)/^\d+$/.test(e)||(t[e]=a[e]);const e=Object.keys(a).filter((t=>/^\d+$/.test(t)));e.length>0&&(t.entity=e.sort(((t,e)=>Number(t)-Number(e))).map((t=>a[t])).join("")),a=t}if("climate"===s&&"string"==typeof a&&(a={entity:a,icon:o.climate,...i}),"string"==typeof a)e.includes(s)?n[s]="presence"===s?{entity:a,icon:o[s]}:{entity:a,icon:o[s],...i}:n[s]=a;else if("object"==typeof a)if(e.includes(s)){if(a.icon||(a.icon=o[s]),["entities1","entities2","entities3","entities4","entities5","camera"].includes(s)&&!a.style){let t="camera"===s?6:parseInt(s.replace("entities",""))-1;a.style=this._defaultMushroomStyle(t)}n[s]="presence"===s?{...a}:{...i,...a}}else n[s]=a}this.config={entities:n,layout_mode:t.layout_mode||"6x3",colors:{room:{color_active:"rgba(var(--color-green), 1)",color_inactive:"rgba(var(--color-green), 0.3)",icon_on:"orange",icon_off:"#80808055",...t.colors?.room||{}},subbutton:{color_on:"rgba(var(--color-blue), 1)",color_off:"rgba(var(--color-blue), 0.3)",icon_on:"yellow",icon_off:"#666",...t.colors?.subbutton||{}}},name:t.name||"Salotto",icon:t.icon||"mdi:sofa",tap_action:t.tap_action||{action:"navigate",navigation_path:""}}}getConfig(){return JSON.parse(JSON.stringify(this.config))}static get styles(){return e`
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
        margin-top: 5px;
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
        border-radius: 100%;
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
        width: 50% 
        --mdc-icon-size: 90px 
        opacity: 0.5
      }
      .bubble-sub-button-container {
        grid-area: b;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-self: stretch;
        align-self: stretch;
        width: 100%;
      }
      .bubble-sub-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: var(--sub-button-height, 48px);
        border-radius: 10px;
        margin: 5px 0 0 0;
        cursor: pointer;
        background-color: var(--sub-button-color);
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
      .mushroom-primary {
        pointer-events: auto;
      }
    `}_startHold(t,e){t.stopPropagation(),this._holdTriggered=!1,this._holdTimeout=setTimeout((()=>{this._holdTriggered=!0,this._handleHoldAction(e)}),500)}_endHold(t,e,i){t.stopPropagation(),clearTimeout(this._holdTimeout),this._holdTriggered||i(),this._holdTriggered=!1}_cancelHold(t){clearTimeout(this._holdTimeout),this._holdTriggered=!1}_handleMainIconTap(){if(console.log("Main icon tapped",this.config.tap_action),!this.config.tap_action)return;const t=this.config.tap_action.action;"toggle"===t?this._toggleEntity(this.config.entity):"more-info"===t?this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0})):"navigate"===t&&(this.config.tap_action.navigation_path?(window.history.pushState({},"",this.config.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed"))):console.warn("navigation_path non definito per l'azione navigate della main icon."))}_toggleEntity(t){this.hass&&(console.log("Toggling entity:",t),this.hass.callService("homeassistant","toggle",{entity_id:t}))}_handleHoldAction(t){if(!t.hold_action)return void this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));const e=t.hold_action.action;switch(e){case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"toggle":this._toggleEntity(t.entity);break;case"call-service":if(t.hold_action.service){const[e,i]=t.hold_action.service.split("."),o=t.hold_action.service_data||{};o.entity_id||(o.entity_id=t.entity),this.hass.callService(e,i,o)}break;case"navigate":t.hold_action.navigation_path?(window.history.pushState({},"",t.hold_action.navigation_path),window.dispatchEvent(new Event("location-changed"))):console.warn("navigation_path non definito in hold_action.");break;default:console.warn(`Azione hold_action "${e}" non supportata.`)}}_handleSubButtonTap(t){if(console.log("Handling sub-button tap",t),!t.tap_action||"none"===t.tap_action.action)return;const e=t.tap_action.action;"toggle"===e?this._toggleEntity(t.entity):"more-info"===e?this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0})):"navigate"===e&&(t.tap_action.navigation_path?(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed"))):console.warn("navigation_path non definito per l'azione navigate nel sub-button."))}_handleMushroomTap(t){if(console.log("Handling mushroom tap",t),!t.tap_action||"none"===t.tap_action.action)return;const e=t.tap_action.action;"toggle"===e?this._toggleEntity(t.entity):"more-info"===e?this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0})):"navigate"===e&&(t.tap_action.navigation_path?(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed"))):console.warn("navigation_path non definito per l'azione navigate nel mushroom tap."))}render(){const t=this._getLayoutStyle(this.config.layout_mode||"6x3");if(!this.config||!this.hass)return console.log("bubble-room.js: config or hass not defined yet"),i`<div>Loading...</div>`;const{entities:e,colors:o,name:n,icon:s}=this.config,a=o?.room||{},r=o?.subbutton||{},l=this.hass,c=l.states[e.presence.entity]?.state||"off",h=t=>{const e=t?.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([^)]+)\)/);return e?parseFloat(e[1]):1},d=h("on"===c?a.background_active||"rgba(0,128,0,1)":a.background_inactive||"rgba(0,128,0,0.3)"),u="on"===c?a.background_active||"rgba(0,128,0,0.5)":a.background_inactive||"rgba(0,128,0,0.3)",p=u,g="on"===c?a.icon_on||"orange":a.icon_off||"#80808055";console.log("bubbleIconColor",g);const _=[e["sub-button1"],e["sub-button2"],e["sub-button3"],e["sub-button4"]];let m=[e.entities1,e.entities2,e.entities3,e.entities4,e.entities5];e.climate&&m.push(e.climate);const f=[];return[1,2,3,4].forEach((t=>{const i=e[`sensor${t}`];if(!i||!i.entity||!i.type)return;const o=l.states[i.entity]?.state||"N/A",{emoji:n,unit:s}=this._getSensorEmojiAndUnit(i.type,i.unit);f.push(`${n} ${o}${s}`)})),e.camera&&m.push(e.camera),i`
      <div class="card" style="height: ${t.cardHeight};">
        <div class="grid-container"
            style="
              grid-template-areas: ${t.gridTemplate};
              grid-template-columns: ${t.gridColumns};
              grid-template-rows: ${t.gridRows};
            ">
          <!-- Nome stanza -->
          <div class="name-area" style="color: ${p}; font-size: ${t.nameFont};">
            ${n}
          </div>
  
          <!-- Icona principale -->
          <div class="icon-area">
            <div class="bubble-icon-container"
                style="
                  background-color: ${u};
                  ${this._getIconShapeStyle(this.config.layout_mode)}
                "

                 @pointerdown="${t=>this._startHold(t,this.config)}"
                 @pointerup="${t=>this._endHold(t,this.config,(()=>this._handleMainIconTap()))}"
                 @pointerleave="${t=>this._cancelHold(t)}">
              <ha-icon class="bubble-icon"
                       icon="${s}"
                       style="color: ${g}; --mdc-icon-size: ${t.iconSize}; width: ${t.iconSize}; height: ${t.iconSize};">
              </ha-icon>
            </div>
  
            <!-- Mushroom templates -->
            <div class="mushroom-container">
              ${m.map(((e,o)=>{if(!e)return i``;const n=t.mushroomPositions[o]||this._defaultMushroomStyle(o),s="on"===(l.states[e.entity]?.state||"off")?a.mushroom_active||"orange":a.mushroom_inactive||"#80808055";return i`
                  <div class="mushroom-item"
                      style="${n}"
                      @pointerdown="${t=>this._startHold(t,e)}"
                      @pointerup="${t=>this._endHold(t,e,(()=>this._handleMushroomTap(e)))}"
                      @pointerleave="${t=>this._cancelHold(t)}">
                    <ha-icon icon="${e.icon}"
                            style="color: ${s}; --mdc-icon-size: ${t.mushroomSize}; width: ${t.mushroomSize}; height: ${t.mushroomSize};">
                    </ha-icon>
                  </div>
                `}))}
            
              ${f.length>0?i`
                <div class="mushroom-item"
                    style="${t.mushroomPositions[6]}; font-size: ${t.mushroomSize};"
                    title="Environmental Sensors">
                  <div class="mushroom-primary"
                      style="
                        font-size: calc(${t.mushroomSize} * 0.55);
                        color: white;
                        font-weight: bold;
                        text-align: center;
                        line-height: 1.2;
                        text-shadow: 0 0 3px black;
                        padding: 4px 6px;
                        border-radius: 6px;
                        opacity: ${d};
                      ">

                    ${f.join(" ")}
                  </div>
                </div>
              `:""}
            </div>
          </div>
  
          <!-- Sub-button -->
          <div class="bubble-sub-button-container">
            ${_.map((e=>{if(!e)return i``;const o=l.states[e.entity]?.state||"off",n="on"===o?r.background_on||"rgba(0,0,255,1)":r.background_off||"rgba(0,0,255,0.3)",s="on"===o?r.icon_on||"yellow":r.icon_off||"#666";return i`
                <div class="bubble-sub-button"
                    style="
                      --sub-button-color: ${n};
                      --sub-button-height: ${t.subButtonHeight};
                    "


                     @pointerdown="${t=>this._startHold(t,e)}"
                     @pointerup="${t=>this._endHold(t,e,(()=>this._handleSubButtonTap(e)))}"
                     @pointerleave="${t=>this._cancelHold(t)}">
                  <ha-icon icon="${e.icon}"
                           style="color: ${s}; --mdc-icon-size: ${t.mushroomSize}; width: ${t.mushroomSize}; height: ${t.mushroomSize};">
                  </ha-icon>

                </div>
              `}))}
          </div>
        </div>
      </div>
    `}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}_getSensorEmojiAndUnit(t,e="C"){const i={temperature:{emoji:"🌡️",unitC:"°C",unitF:"°F"},humidity:{emoji:"💦",unit:"%"},co2:{emoji:"🟢",unit:"ppm"},illuminance:{emoji:"☀️",unit:"lx"},pm1:{emoji:"🟤",unit:"µg/m³"},pm25:{emoji:"⚫️",unit:"µg/m³"},pm10:{emoji:"⚪️",unit:"µg/m³"},uv:{emoji:"🌞",unit:"UV"},noise:{emoji:"🔊",unit:"dB"},pressure:{emoji:"📈",unit:"hPa"},voc:{emoji:"🧪",unit:"ppb"}}[t];if(!i)return{emoji:"❓",unit:""};const o="temperature"===t?"F"===e?i.unitF:i.unitC:i.unit;return{emoji:i.emoji,unit:o}}_getLayoutStyle(t){const e={"6x3":{cardHeight:"190px",iconSize:"75px",nameFont:"28px",mushroomSize:"33px",subButtonPadding:"10px",mushroomPositions:["top: -77px; left: 0px;","top: -85px; left: 38px;","top: -64px; left: 77px;","bottom: 39px; left: 96px;","bottom: -1px; left: 85px;","bottom: -2px; left: -2px;","top: -140px; left: 5px;","top: -95px; right: 5px;"],gridTemplate:'\n          "n n n b"\n          "i i . b"\n          "i i . b"\n          "i i . b"',gridColumns:"35% 35% 10% 20%",gridRows:"25% 25% 25% 25%",subButtonPadding:"10px",subButtonHeight:"48px",subButtonIconSize:"26px"},"12x4":{cardHeight:"250px",iconSize:"95px",nameFont:"32px",mushroomSize:"40px",subButtonPadding:"14px",mushroomPositions:["top: -100px; left: 0px;","top: -105px; left: 55px;","top: -85px; left: 120px;","bottom: 55px; left: 160px;","bottom: 5px; left: 145px;","bottom: 0px; left: 0px;","top: -180px; left: 10px;","top: -135px; right: 10px;"],gridTemplate:'\n          "n n n b"\n          "i i . b"\n          "i i . b"\n          "i i . b"',gridColumns:"30% 30% 10% 30%",gridRows:"25% 25% 25% 25%",subButtonPadding:"14px",subButtonHeight:"60px",subButtonIconSize:"55px"}};return e[t]||e["6x3"]}_getIconShapeStyle(t){return"12x4"===t?"\n        width: 240px;\n        height: 190px;\n        border-radius: 80% 80% 50% 0% / 80% 80% 50% 0%;\n        top: 0px;\n        left: 0px;\n      ":"\n        width: 140px;\n        height: 140px;\n        border-radius: 80% 80% 50% 0% / 80% 80% 50% 0%;\n        top: 0px;\n        left: 0px;\n      "}}),window.customCards=window.customCards||[],window.customCards.push({type:"bubble-room",name:"Bubble Room",description:"A stylish room control card with environmental sensors",preview:!0,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o=globalThis,n=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}}const l=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1]),t[0]);return new r(i,t,s)},c=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:h,defineProperty:d,getOwnPropertyDescriptor:u,getOwnPropertyNames:p,getOwnPropertySymbols:g,getPrototypeOf:_}=Object,m=globalThis,f=m.trustedTypes,b=f?f.emptyScript:"",v=m.reactiveElementPolyfillSupport,$=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!h(t,e),S={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class A extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=S){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&d(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:n}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return o?.call(this)},set(e){const s=o?.call(this);n.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??S}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...p(t),...g(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(n)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of e){const e=document.createElement("style"),n=o.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=o,this[o]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??x)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[$("elementProperties")]=new Map,A[$("finalized")]=new Map,v?.({ReactiveElement:A}),(m.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E=globalThis,C=E.trustedTypes,w=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,P="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+k,T=`<${I}>`,N=document,U=()=>N.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,M="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,R=/>/g,B=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,L=/"/g,D=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),J=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,G=N.createTreeWalker(N,129);function K(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":3===e?"<math>":"",a=j;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===j?"!--"===l[1]?a=z:void 0!==l[1]?a=R:void 0!==l[2]?(D.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=B):void 0!==l[3]&&(a=B):a===B?">"===l[0]?(a=n??j,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?B:'"'===l[3]?L:F):a===L||a===F?a=B:a===z||a===R?a=j:(a=B,n=void 0);const d=a===B&&t[e+1].startsWith("/>")?" ":"";s+=a===j?i+T:c>=0?(o.push(r),i.slice(0,c)+P+i.slice(c)+k+d):i+k+(-2===c?e:d)}return[K(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Y{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const a=t.length-1,r=this.parts,[l,c]=Z(t,e);if(this.el=Y.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=G.nextNode())&&r.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(P)){const e=c[s++],i=o.getAttribute(t).split(k),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?ot:"@"===a[1]?nt:et}),o.removeAttribute(t)}else t.startsWith(k)&&(r.push({type:6,index:n}),o.removeAttribute(t));if(D.test(o.tagName)){const t=o.textContent.split(k),e=t.length-1;if(e>0){o.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],U()),G.nextNode(),r.push({type:2,index:++n});o.append(t[e],U())}}}else if(8===o.nodeType)if(o.data===I)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(k,t+1));)r.push({type:7,index:n}),t+=k.length-1}n++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===J)return e;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const s=H(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,o)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??N).importNode(e,!0);G.currentNode=o;let n=G.nextNode(),s=0,a=0,r=i[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new tt(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new st(n,this,t)),this._$AV.push(e),r=i[++a]}s!==r?.index&&(n=G.nextNode(),s++)}return G.currentNode=N,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),H(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==J&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new X(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Y(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new tt(this.O(U()),this.O(U()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=Q(this,t,e,0),s=!H(t)||t!==this._$AH&&t!==J,s&&(this._$AH=t);else{const o=t;let a,r;for(t=n[0],a=0;a<n.length-1;a++)r=Q(this,o[i+a],e,a),r===J&&(r=this._$AH[a]),s||=!H(r)||r!==this._$AH[a],r===V?t=V:t!==V&&(t+=(r??"")+n[a+1]),this._$AH[a]=r}s&&!o&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class ot extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class nt extends et{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??V)===J)return;const i=this._$AH,o=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=E.litHtmlPolyfillSupport;at?.(Y,tt),(E.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class rt extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let n=o._$litPart$;if(void 0===n){const t=i?.renderBefore??null;o._$litPart$=n=new tt(e.insertBefore(U(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}}rt._$litElement$=!0,rt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:rt});const lt=globalThis.litElementPolyfillSupport;lt?.({LitElement:rt}),(globalThis.litElementVersions??=[]).push("4.1.1");customElements.define("bubble-room-editor-dev",class extends rt{static get properties(){return{_config:{type:Object},hass:{type:Object},_iconList:{type:Array}}}static async getConfigElement(){return await Promise.resolve().then((function(){return ct})),document.createElement("bubble-room-editor-dev")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"mdi:lightbulb",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"mdi:fan",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"mdi:speaker",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"mdi:robot-vacuum",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"mdi:thermostat",tap_action:{action:"more-info"}},entities1:{entity:"sensor.some_sensor1",icon:"mdi:information-outline"},entities2:{entity:"sensor.some_sensor2",icon:"mdi:information-outline"},entities3:{entity:"sensor.some_sensor3",icon:"mdi:information-outline"},entities4:{entity:"sensor.some_sensor4",icon:"mdi:information-outline"},entities5:{entity:"sensor.some_sensor5",icon:"mdi:information-outline"},temperature:{temperature_sensor:"sensor.vindstyrka_salotto_temperature",humidity_sensor:"sensor.vindstyrka_salotto_humidity",unit:"C",tap_action:{action:"more-info"}}},colors:{room:{text_active:"",text_inactive:"",background_active:"",background_inactive:"",icon_on:"",icon_off:""},subbutton:{background_on:"",background_off:"",icon_on:"",icon_off:""}},name:"Salotto",icon:"mdi:sofa",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"},hold_action:{action:"more-info",navigation_path:""}}}constructor(){super(),this._iconList=["mdi:sofa","mdi:bed","mdi:home","mdi:table-furniture","mdi:television","mdi:lightbulb","mdi:fan","mdi:air-conditioner","mdi:robot-vacuum","mdi:led-strip-variant","mdi:lamp","mdi:window-closed","mdi:window-open","mdi:door","mdi:door-closed","mdi:speaker","mdi:volume-high","mdi:volume-off","mdi:thermostat","mdi:fire","mdi:water","mdi:shower","mdi:toilet","mdi:fridge","mdi:oven","mdi:coffee-maker","mdi:washing-machine","mdi:vacuum","mdi:garage","mdi:garage-open","mdi:cctv"]}connectedCallback(){super.connectedCallback()}setConfig(t){t||(t={}),t.entities||(t.entities={});for(let e=1;e<=4;e++){const i=`sensor${e}`;t.entities[i]||(t.entities[i]={})}t.colors||(t.colors={}),t.colors.room=t.colors.room||{},t.colors.subbutton=t.colors.subbutton||{},t.colors.room.icon_active=t.colors.room.icon_active||"rgba(255, 255, 255, 1)",t.colors.room.icon_inactive=t.colors.room.icon_inactive||"rgba(128, 128, 128, 0.3)",t.colors.room.background_active=t.colors.room.background_active||"rgba(0, 128, 0, 1)",t.colors.room.background_inactive=t.colors.room.background_inactive||"rgba(0, 128, 0, 0.3)",t.colors.room.mushroom_active=t.colors.room.mushroom_active||"rgba(255, 255, 255, 1)",t.colors.room.mushroom_inactive=t.colors.room.mushroom_inactive||"rgba(128, 128, 128, 0.3)",t.colors.subbutton.background_on=t.colors.subbutton.background_on||"rgba(0, 0, 255, 1)",t.colors.subbutton.background_off=t.colors.subbutton.background_off||"rgba(0, 0, 255, 0.3)",t.colors.subbutton.icon_on=t.colors.subbutton.icon_on||"rgba(255, 255, 0, 1)",t.colors.subbutton.icon_off=t.colors.subbutton.icon_off||"rgba(102, 102, 102, 1)",t.entities.temperature||(t.entities.temperature={}),t.entities.temperature.unit=t.entities.temperature.unit||"C",t.hold_action||(t.hold_action={action:"more-info",navigation_path:""}),this._config=t}_updateTemperatureUnit(t){const e=t.target.value,i={...this._config.entities.temperature,unit:e},o={...this._config.entities,temperature:i};this._config={...this._config,entities:o},this.requestUpdate(),this._fireConfigChanged()}_updateLayoutMode(t){const e=t.target.value;this._config={...this._config,layout_mode:e},this.requestUpdate(),this._fireConfigChanged()}getConfig(){const t=JSON.parse(JSON.stringify(this._config));t.layout_mode||(t.layout_mode=this._config.layout_mode||"6x3");const e={};return Object.keys(t.entities).forEach((i=>{const o=t.entities[i];o.entity&&""!==o.entity.trim()&&(e[i]=o)})),t.entities=e,t.colors&&["room","subbutton"].forEach((e=>{t.colors[e]&&Object.keys(t.colors[e]).forEach((i=>{"string"==typeof t.colors[e][i]&&""===t.colors[e][i].trim()&&delete t.colors[e][i]}))})),t}_defaultIconList(){return this._iconList}static get styles(){return l`
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
            <label>Room Icon:</label>
            <input
              type="text"
              .value="${this._config.icon||""}"
              list="icon-list"
              @input="${this._updateIcon}"
            />
          </div>
          <div class="input-group">
            <label>Layout:</label>
            <select
              .value="${this._config.layout_mode||"6x3"}"
              @change="${this._updateLayoutMode}"
            >
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
            ${this._renderIconInput("Climate Icon","climate")}
          </div>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="sensorPanel">
        <div slot="header" @click="${()=>this._togglePanel("sensorPanel")}">
          Sensor
        </div>
        <div class="section-content">
          ${[0,1,2,3].map((t=>this._renderSensorConfig(t)))}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="colorsPanel">
        <div slot="header" @click="${()=>this._togglePanel("colorsPanel")}">
          Colors
        </div>
        <div class="section-content">
          <h4>Room</h4>
          ${this._renderColorField("room","icon_active","Icon Active")}
          ${this._renderColorField("room","icon_inactive","Icon Inactive")}
          ${this._renderColorField("room","background_active","Background Active")}
          ${this._renderColorField("room","background_inactive","Background Inactive")}
          ${this._renderColorField("room","mushroom_active","Mushroom Icon Active")}
          ${this._renderColorField("room","mushroom_inactive","Mushroom Icon Inactive")}

          <h4>Subbutton</h4>
          ${this._renderColorField("subbutton","background_on","Background On")}
          ${this._renderColorField("subbutton","background_off","Background Off")}
          ${this._renderColorField("subbutton","icon_on","Icon On")}
          ${this._renderColorField("subbutton","icon_off","Icon Off")}
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
    `}_renderEntityInput(t,e,i="entity"){const o=this._config.entities&&this._config.entities[e]&&this._config.entities[e][i]||"";return q`
      <label>${t}:</label>
      <input
        type="text"
        .value="${o}"
        list="entity-list"
        @input="${this._updateEntity(e,i)}"
      />
    `}_renderIconInput(t,e,i="icon"){let o=this._config.entities&&this._config.entities[e]&&this._config.entities[e][i]||"";if(!o&&this.hass&&this._config.entities&&this._config.entities[e]?.entity){const t=this._config.entities[e].entity;o=this.hass.states[t]?.attributes?.icon||""}return q`
      <label>${t}:</label>
      <div style="display: flex; align-items: center; gap: 10px;">
        <input
          type="text"
          .value="${o}"
          list="icon-list"
          style="flex-grow: 1;"
          @input="${this._updateEntity(e,i)}"
        />
        <ha-icon .icon="${o}" style="color: var(--primary-text-color);"></ha-icon>
      </div>
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
    `}_renderSensorConfig(t){const e=this._config.entities?.[`sensor${t+1}`]||{};return q`
      <div class="input-group">
        <label>Sensor ${t+1} Type:</label>
        <select
          .value="${e.type||""}"
          @change="${e=>this._updateSensor(t,"type",e.target.value)}"
        >
          <option value="">-- none --</option>
          ${[{type:"temperature",label:"🌡️ Temperatura"},{type:"humidity",label:"💦 Umidità"},{type:"co2",label:"🟢 CO₂"},{type:"illuminance",label:"☀️ Luminosità"},{type:"pm1",label:"🟤 PM1"},{type:"pm25",label:"⚫️ PM2.5"},{type:"pm10",label:"⚪️ PM10"},{type:"uv",label:"🌞 UV Index"},{type:"noise",label:"🔊 Rumore"},{type:"pressure",label:"📈 Pressione"},{type:"voc",label:"🧪 VOC"}].map((t=>q`<option value="${t.type}">${t.label}</option>`))}
        </select>
      </div>
      ${e.type?q`
        <div class="input-group">
          <label>Entity ID:</label>
          <input
            type="text"
            .value="${e.entity||""}"
            list="entity-list"
            @input="${e=>this._updateSensor(t,"entity",e.target.value)}"
          />
        </div>
        ${"temperature"===e.type?q`
          <div class="input-group">
            <label>Unità:</label>
            <select
              .value="${e.unit||"C"}"
              @change="${e=>this._updateSensor(t,"unit",e.target.value)}"
            >
              <option value="C">°C</option>
              <option value="F">°F</option>
            </select>
          </div>
        `:""}
      `:""}
      <hr/>
    `}_parseRGBA(t){const e=[0,128,0,1];if(!t||"string"!=typeof t)return e;if(t.includes("var("))return e;const i=/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(t);return i?[parseInt(i[1]),parseInt(i[2]),parseInt(i[3]),parseFloat(i[4]??"1")]:t.startsWith("#")&&7===t.length?[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16),1]:e}_renderColorField(t,e,i){const o=this._config.colors?.[t]?.[e]||"rgba(0,0,0,1)",[n,s,a,r]=this._parseRGBA(o),l=`#${[n,s,a].map((t=>t.toString(16).padStart(2,"0"))).join("")}`;return q`
      <div class="input-group">
        <label>${i}:</label>
        <div style="display: flex; gap: 10px; align-items: center;">
          <input type="color"
                 .value="${l}"
                 @input="${i=>this._updateColorField(t,e,i.target.value,r)}" />
          <input type="range"
                 min="0" max="1" step="0.01"
                 .value="${r}"
                 @input="${i=>this._updateColorField(t,e,l,i.target.value)}" />
          <span>${Math.round(100*r)}%</span>
        </div>
        <input
          type="text"
          .value="${o}"
          @input="${i=>this._updateNestedColorDirect(t,e,i.target.value)}"
        />
      </div>
    `}_toHex(t){const e=document.createElement("canvas").getContext("2d");return e.fillStyle=t||"#000000",e.fillStyle}_updateNestedColorDirect(t,e,i){const o={...this._config.colors};o[t]={...o[t],[e]:i},this._config={...this._config,colors:o},this.requestUpdate(),this._fireConfigChanged()}_updateColorField(t,e,i,o){const n=`rgba(${parseInt(i.slice(1,3),16)}, ${parseInt(i.slice(3,5),16)}, ${parseInt(i.slice(5,7),16)}, ${o})`,s={...this._config.colors};s[t]={...s[t],[e]:n},this._config={...this._config,colors:s},this.requestUpdate(),this._fireConfigChanged()}_renderSubButtonAction(t){const e=this._config.entities[t]?.tap_action||{action:"toggle",navigation_path:""},i=this._config.entities[t]?.hold_action||{action:"more-info",navigation_path:""};return q`
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
    `}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateName(t){const e=t.target.value;this._config={...this._config,name:e},this.requestUpdate(),this._fireConfigChanged()}_updateLayoutMode(t){const e=t.target.value;this._config={...this._config,layout_mode:e},this.requestUpdate(),this._fireConfigChanged()}_updateIcon(t){const e=t.target.value;this._config={...this._config,icon:e},this.requestUpdate(),this._fireConfigChanged()}_updateEntity(t,e="entity"){return i=>{const o=i.target.value;let n=this._config.entities[t]||{};n={...n,[e]:o};const s={...this._config.entities,[t]:n};this._config={...this._config,entities:s},this.requestUpdate(),this._fireConfigChanged()}}_updateTemperature(t){return e=>{const i=e.target.value,o={...this._config.entities?.temperature,[t]:i};o.temperature_sensor&&o.humidity_sensor&&(o.primary=`🌡️{{ states("${o.temperature_sensor}") }}°C 💦{{ states("${o.humidity_sensor}") }}%`);const n={...this._config.entities,temperature:o};this._config={...this._config,entities:n},this.requestUpdate(),this._fireConfigChanged()}}_updateTapActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const o={...this._config.tap_action||{action:"navigate",navigation_path:""},[t]:i};this._config={...this._config,tap_action:o},this.requestUpdate(),this._fireConfigChanged()}}_updateHoldActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const o={...this._config.hold_action||{action:"more-info",navigation_path:""},[t]:i};this._config={...this._config,hold_action:o},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityTapAction(t,e){return i=>{let o=i.target.value;if("service_data"===e)try{o=JSON.parse(o)}catch(t){}let n=this._config.entities[t]||{},s=n.tap_action||{action:"toggle",navigation_path:""};s={...s,[e]:o},n={...n,tap_action:s};const a={...this._config.entities,[t]:n};this._config={...this._config,entities:a},this.requestUpdate(),this._fireConfigChanged()}}_updateSensor(t,e,i){const o=`sensor${t+1}`,n={...this._config.entities?.[o]||{},[e]:i},s={...this._config.entities,[o]:n};this._config={...this._config,entities:s},this.requestUpdate(),this._fireConfigChanged()}_updateNestedColor(t,e){return i=>{const o=i.target.value,n={...this._config.colors};n[t]={...n[t],[e]:o},this._config={...this._config,colors:n},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityHoldAction(t,e){return i=>{let o=i.target.value;if("service_data"===e)try{o=JSON.parse(o)}catch(t){}let n=this._config.entities[t]||{},s=n.hold_action||{action:"more-info",navigation_path:""};s={...s,[e]:o},n={...n,hold_action:s};const a={...this._config.entities,[t]:n};this._config={...this._config,entities:a},this.requestUpdate(),this._fireConfigChanged()}}});var ct=Object.freeze({__proto__:null});
