import{LitElement as t,css as e,html as i,nothing as n}from"lit";import{styleMap as o}from"lit/directives/style-map.js";import a from"fitty";customElements.define("bubble-room",class extends t{static get properties(){return{config:{type:Object},hass:{type:Object}}}firstUpdated(){const t=this.shadowRoot.querySelectorAll(".mushroom-primary");t.length&&a(t,{maxSize:20,multiLine:!1})}static async getConfigElement(){return await Promise.resolve().then((function(){return s})),document.createElement("bubble-room-editor")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"",tap_action:{action:"more-info"}},camera:{entity:"camera.front_door",icon:"",tap_action:{action:"more-info"},preview_url:""},entities1:{entity:"sensor.some_sensor1",icon:""},entities2:{entity:"sensor.some_sensor2",icon:""},entities3:{entity:"sensor.some_sensor3",icon:""},entities4:{entity:"sensor.some_sensor4",icon:""},entities5:{entity:"sensor.some_sensor5",icon:""},temperature:{temperature_sensor:"sensor.vindstyrka_salotto_temperature",humidity_sensor:"sensor.vindstyrka_salotto_humidity",tap_action:{action:"more-info"}}},colors:{active:"default",inactive:"default",backgroundActive:"default",backgroundInactive:"default"},icon:"",name:"Salotto",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"},background:"default",border_radius:"default"}}_getFallbackIcon(t,e=""){if(e&&""!==e.trim())return e;if(this.hass?.entities?.[t]?.icon)return this.hass.entities[t].icon;const i=this.hass?.states?.[t];if(i?.attributes?.icon)return i.attributes.icon;if(i?.attributes?.device_class)return this._getDeviceClassIcon(i.attributes.device_class,i?.state);const n=t.split(".")[0];return this._getDomainDefaultIcon(n,i?.state)}_getDeviceClassIcon(t,e){switch(t){case"door":return"on"===e?"mdi:door-open":"mdi:door-closed";case"window":return"on"===e?"mdi:window-open":"mdi:window-closed";case"motion":return"on"===e?"mdi:motion-sensor":"mdi:motion-sensor-off";case"moisture":return"on"===e?"mdi:water-alert":"mdi:water-off";case"smoke":return"on"===e?"mdi:smoke":"mdi:smoke-detector-off";case"gas":return"on"===e?"mdi:gas-cylinder":"mdi:gas-off";case"problem":return"mdi:alert";case"connectivity":return"mdi:connection";case"occupancy":case"presence":return"on"===e?"mdi:account-voice":"mdi:account-voice-off";case"tamper":return"mdi:lock-open-alert";case"vibration":return"on"===e?"mdi:vibrate":"mdi:vibrate-off";case"running":return"on"===e?"mdi:server-network":"mdi:server-network-off";case"shutter":return"on"===e?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return"on"===e?"mdi:blinds-horizontal":"mdi:blinds-horizontal-closed";default:return""}}_getDomainDefaultIcon(t,e){switch(t){case"light":return"mdi:lightbulb";case"switch":case"input_boolean":return"mdi:toggle-switch";case"fan":return"mdi:fan";case"climate":return"mdi:thermostat";case"media_player":return"mdi:speaker";case"vacuum":return"mdi:robot-vacuum";case"binary_sensor":return"on"===e?"mdi:motion-sensor":"mdi:motion-sensor-off";case"sensor":return"mdi:information-outline";case"cover":return"open"===e?"mdi:blinds-open":"mdi:blinds-closed";case"occupancy":return"on"===e?"mdi:account-voice":"mdi:account-voice-off";case"lock":return"locked"===e?"mdi:lock":"mdi:lock-open";case"door":return"open"===e?"mdi:door-open":"mdi:door-closed";case"window":return"open"===e?"mdi:window-open":"mdi:window-closed";default:return""}}_buildTemperatureText(t){const e=this.hass,i=t.temperature_sensor?e.states[t.temperature_sensor]?.state:null,n=t.humidity_sensor?e.states[t.humidity_sensor]?.state:null;let o="";return null!=i&&""!==i&&(o+=`🌡️${i}°C`),null!=n&&""!==n&&(o&&(o+=" "),o+=`💦${n}%`),o.trim()}setConfig(t){if(!(t=JSON.parse(JSON.stringify(t)))||"object"!=typeof t||Array.isArray(t))throw new Error("La configurazione deve essere un oggetto valido.");if(!t.entities||"object"!=typeof t.entities)throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");const e=["presence","sub-button1","sub-button2","sub-button3","sub-button4","entities1","entities2","entities3","entities4","entities5","climate","camera","temperature"],i={tap_action:{action:"toggle"},hold_action:{action:"more-info"}},n={};for(const o in t.entities){let a=t.entities[o];if(["entities1","entities2","entities3","entities4","entities5"].includes(o)&&a&&"object"==typeof a&&Object.keys(a).some((t=>/^\d+$/.test(t)))){let t={};for(const e in a)/^\d+$/.test(e)||(t[e]=a[e]);const e=Object.keys(a).filter((t=>/^\d+$/.test(t)));e.length>0&&(t.entity=e.sort(((t,e)=>Number(t)-Number(e))).map((t=>a[t])).join("")),a=t}if("climate"===o&&"string"==typeof a&&(a={entity:a,...i}),"string"==typeof a)e.includes(o)?n[o]="presence"===o?{entity:a}:{entity:a,...i}:n[o]=a;else if("object"==typeof a)if(e.includes(o)){if(["entities1","entities2","entities3","entities4","entities5"].includes(o)&&!a.style){let t=parseInt(o.replace("entities",""))-1;a.style=this._defaultMushroomStyle(t)}n[o]="presence"===o?{...a}:{...i,...a}}else n[o]=a}this.config={entities:n,colors:{},background:t.background||"default",border_radius:t.border_radius||"default",icon:t.icon||"",name:t.name||"Salotto",tap_action:t.tap_action||{action:"navigate",navigation_path:""}},!this.config.entity&&this.config.entities&&this.config.entities.presence&&(this.config.entity=this.config.entities.presence.entity),this._config=this.config}getConfig(){const t=JSON.parse(JSON.stringify(this._config)),e={};return Object.keys(t.entities).forEach((i=>{const n=t.entities[i];(i.startsWith("sub-button")||n.entity&&""!==n.entity.trim())&&(e[i]=n)})),t.entities=e,this._config=t,t}static get styles(){return e`
      *, *::before, *::after { box-sizing: border-box; }
      :host {
        display: block;
        --card-height: 190px;
        /* non serve più --card-background qui */
        font-family: sans-serif;
      }
      ha-card {
        display: block;
        margin: 0;
        padding: 0 !important;
        /* background: transparent !important; */
        background: var(
          --bubble-room-background,
          var(--ha-card-background, white)
        ) !important;
        height: var(--card-height);
        border-radius: var(
          --bubble-room-border-radius,
          var(--ha-card-border-radius, 8px)
        ) !important;
      }
      .card {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .grid-container {
        display: grid;
        width: 00%;
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
        padding-left: 2px;
        margin-top: -67px;
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
        top: 20%;
        left: 30%;
        width: 50% !important;
        --mdc-icon-size: 75px !important;
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
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        text-align: center;
        min-height: 38px;
        margin: 3px;
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
      .fit-text {
        white-space: nowrap;
        overflow: hidden;
      }  
    `}_defaultMushroomStyle(t){switch(t){case 0:return"top: -77px; left: 0px;";case 1:return"top: -85px; left: 38px;";case 2:return"top: -64px; left: 77px;";case 3:return"bottom: 39px; left: 96px;";case 4:return"bottom: -1px; left: 85px;";case 5:return"bottom: -2px; left: -2px;";case 6:return"top: -140px; left: 5px;";case 7:return"top: -95px; right: 5px;";default:return""}}_startHold(t,e){t.stopPropagation(),this._holdTriggered=!1,this._holdTimeout=setTimeout((()=>{this._holdTriggered=!0,this._handleHoldAction(e)}),500)}_endHold(t,e,i){t.stopPropagation(),clearTimeout(this._holdTimeout),this._holdTriggered||i(),this._holdTriggered=!1}_cancelHold(t){clearTimeout(this._holdTimeout),this._holdTriggered=!1}_handleHoldAction(t){if(!t.hold_action)return void this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));switch(t.hold_action.action){case"more-info":default:this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"toggle":this._toggleEntity(t.entity);break;case"call-service":if(t.hold_action.service){const[e,i]=t.hold_action.service.split("."),n=t.hold_action.service_data||{};n.entity_id||(n.entity_id=t.entity),this.hass.callService(e,i,n)}break;case"navigate":t.hold_action.navigation_path&&(window.history.pushState({},"",t.hold_action.navigation_path),window.dispatchEvent(new Event("location-changed")))}}_handleMainIconTap(){if(!this.config.tap_action)return;switch(this.config.tap_action.action){case"toggle":this._toggleEntity(this.config.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0}));break;case"navigate":this.config.tap_action.navigation_path&&(window.history.pushState({},"",this.config.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(this.config.tap_action.service){const[t,e]=this.config.tap_action.service.split("."),i=this.config.tap_action.service_data||{};i.entity_id||(i.entity_id=this.config.entity),this.hass.callService(t,e,i)}}}_toggleEntity(t){this.hass&&this.hass.callService("homeassistant","toggle",{entity_id:t})}_handleSubButtonTap(t){if(!t.tap_action||"none"===t.tap_action.action)return;switch(t.tap_action.action){case"toggle":this._toggleEntity(t.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"navigate":t.tap_action.navigation_path&&(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(t.tap_action.service){const[e,i]=t.tap_action.service.split("."),n=t.tap_action.service_data||{};n.entity_id||(n.entity_id=t.entity),this.hass.callService(e,i,n)}}}_handleMushroomTap(t){if(!t.tap_action||"none"===t.tap_action.action)return;switch(t.tap_action.action){case"toggle":this._toggleEntity(t.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"navigate":t.tap_action.navigation_path&&(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(t.tap_action.service){const[e,i]=t.tap_action.service.split("."),n=t.tap_action.service_data||{};n.entity_id||(n.entity_id=t.entity),this.hass.callService(e,i,n)}}}render(){if(!this.config||!this.hass)return i`<div>Loading…</div>`;const{entities:t,name:e,icon:a,background:s,border_radius:r,colors:c}=this.config,l=this.hass,d="on"===l.states[t.presence.entity]?.state,u="default"!==c.active?c.active:"var(--primary-color)",p="default"!==c.inactive?c.inactive:"var(--accent-color)",h="default"!==c.backgroundInactive?c.backgroundInactive:"rgba(var(--rgb-primary-color),0.1)",g="default"!==c.backgroundActive?c.backgroundActive:"rgba(var(--rgb-primary-color),0.3)",_={};s&&"default"!==s&&(_["--bubble-room-background"]=s),r&&"default"!==r&&(_["--bubble-room-border-radius"]=r);const m=d?g:h,v=d?p:u,b=this.config.entity;this._getFallbackIcon(b);this.config.icon&&""!==this.config.icon.trim()&&this.config.icon,t["sub-button1"],t["sub-button2"],t["sub-button3"],t["sub-button4"];let f=[t.entities1,t.entities2,t.entities3,t.entities4,t.entities5];return t.climate&&f.push(t.climate),t.temperature&&f.push(t.temperature),t.camera&&f.push(t.camera),i`
      <ha-card style=${o(_)}>
        <div class="card">
          <div class="grid-container">
            <div class="name-area"
                 style="color: ${v};">
              ${e}
            </div>
            <div class="icon-area">
              <div class="bubble-icon-container"
                   style="background-color: ${m};"
                   @pointerdown=${t=>this._startHold(t,this.config)}
                   @pointerup=${t=>this._endHold(t,this.config,(()=>this._handleMainIconTap()))}
                   @pointerleave=${t=>this._cancelHold(t)}>
                ${a||this._getFallbackIcon(this.config.entity)?i`
                  <ha-icon
                    class="bubble-icon"
                    icon=${a||this._getFallbackIcon(this.config.entity)}
                    style="color: ${v};">
                  </ha-icon>
                `:n}
              </div>
            </div>
              <div class="mushroom-container">
                ${f.map(((t,e)=>{if(!t)return i``;if(t.temperature_sensor||t.humidity_sensor){const n=this._buildTemperatureText(t);return n?i`
                      <div class="mushroom-item"
                          style=${t.style?t.style:this._defaultMushroomStyle(e)}
                          @pointerdown=${e=>this._startHold(e,t)}
                          @pointerup=${e=>this._endHold(e,t,(()=>this._handleMushroomTap(t)))}
                          @pointerleave=${t=>this._cancelHold(t)}>
                        <div class="mushroom-primary fit-text">
                          ${n}
                        </div>
                      </div>
                    `:i``}{const o="on"===(l.states[t.entity]?.state||"off")?t.icon_color&&t.icon_color.on?t.icon_color.on:"orange":t.icon_color&&t.icon_color.off?t.icon_color.off:"#80808055",a=this._getFallbackIcon(t.entity),s=t.icon&&""!==t.icon.trim()?t.icon:a,r=t.style?t.style:this._defaultMushroomStyle(e);return i`
                      <div class="mushroom-item"
                          style=${r}
                          @pointerdown=${e=>this._startHold(e,t)}
                          @pointerup=${e=>this._endHold(e,t,(()=>this._handleMushroomTap(t)))}
                          @pointerleave=${t=>this._cancelHold(t)}>
                        ${s?i`
                          <ha-icon icon=${s}" style="color: ${o};></ha-icon>
                        `:n}
                      </div>
                    `}}))}
              </div>
            </div>
            <div class="bubble-sub-button-container">
              ${["sub-button1","sub-button2","sub-button3","sub-button4"].map((e=>t[e])).map((t=>{if(!t?.entity)return i``;const e="on"===l.states[t.entity]?.state,o=e?g:h,a=e?p:u,s=t.icon?.trim()||this._getFallbackIcon(t.entity);return i`
                    <div class="bubble-sub-button"
                         style="background-color: ${o};"
                         @pointerdown=${e=>this._startHold(e,t)}
                         @pointerup=${e=>this._endHold(e,t,(()=>this._handleSubButtonTap(t)))}
                         @pointerleave=${t=>this._cancelHold(t)}>
                      ${s?i`
                        <ha-icon icon=${s}" style="color: ${a};></ha-icon>
                      `:n}
                    </div>
                  `}))}
            </div>
          </div>
        </div>
      </ha-card>
    `}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}}),window.customCards=window.customCards||[],window.customCards.push({type:"bubble-room",name:"Bubble Room",description:"Bubble Room",preview:!0,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});customElements.define("bubble-room-editor",class extends t{static get properties(){return{_config:{type:Object},hass:{type:Object},_iconList:{type:Array}}}static async getConfigElement(){return await Promise.resolve().then((function(){return s})),document.createElement("bubble-room-editor")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"mdi:lightbulb",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"mdi:fan",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"mdi:speaker",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"mdi:robot-vacuum",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"mdi:thermostat",tap_action:{action:"more-info"}},entities1:{entity:"sensor.some_sensor1",icon:"mdi:information-outline"},entities2:{entity:"sensor.some_sensor2",icon:"mdi:information-outline"},entities3:{entity:"sensor.some_sensor3",icon:"mdi:information-outline"},entities4:{entity:"sensor.some_sensor4",icon:"mdi:information-outline"},entities5:{entity:"sensor.some_sensor5",icon:"mdi:information-outline"},temperature:{temperature_sensor:"sensor.vindstyrka_salotto_temperature",humidity_sensor:"sensor.vindstyrka_salotto_humidity",tap_action:{action:"more-info"}}},colors:{active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"},name:"Salotto",icon:"mdi:sofa",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"},hold_action:{action:"more-info",navigation_path:""}}}constructor(){super(),this._iconList=["mdi:lightbulb","mdi:fan","mdi:play-circle","mdi:robot-vacuum","mdi:information-outline","mdi:sofa","mdi:account","mdi:bed","mdi:home","mdi:weather-sunny","mdi:weather-cloudy","mdi:weather-rainy"]}connectedCallback(){super.connectedCallback()}setConfig(t){t||(t={}),t.entities||(t.entities={}),t.colors||(t.colors={active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"}),t.hold_action||(t.hold_action={action:"more-info",navigation_path:""}),this._config=t}getConfig(){const t=JSON.parse(JSON.stringify(this._config)),e={};return Object.keys(t.entities).forEach((i=>{const n=t.entities[i];n.entity&&""!==n.entity.trim()&&(e[i]=n)})),t.entities=e,this._config=t,t}_defaultIconList(){return this._iconList}static get styles(){return e`
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
    `}_togglePanel(t){const e=this.shadowRoot.getElementById(t);e&&(e.open=!e.open)}_renderSubButtonPanel(t){let e;switch(this._config.entities,t){case"sub-button1":e="Sub-button1";break;case"sub-button2":e="Sub-button2";break;case"sub-button3":e="Sub-button3";break;case"sub-button4":e="Sub-button4";break;default:e=t}const n=`${t}Panel`;return i`
      <ha-expansion-panel id="${n}">
        <div slot="header" @click="${()=>this._togglePanel(n)}">
          ${e}
        </div>
        <div class="section-content">
          ${this._renderEntityInput("Entities (ID)",t)}
          ${this._renderIconInput("Icon",t)}
          ${this._renderSubButtonAction(t)}
        </div>
      </ha-expansion-panel>
    `}render(){return this._config?i`
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
            <label>Main icon:</label>
            <input
              type="text"
              .value="${this._config.icon||""}"
              list="icon-list"
              @input="${this._updateIcon}"
            />
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
        ${this.hass?Object.keys(this.hass.entities).map((t=>i`<option value="${t}"></option>`)):""}
      </datalist>
      <datalist id="icon-list">
        ${this._defaultIconList().map((t=>i`<option value="${t}"></option>`))}
      </datalist>

      <p class="note">
        For advanced configurations, modify the YAML directly.
      </p>
    `:i`<div>Caricamento configurazione...</div>`}_renderMushroomEntityPanel(t,e){const n=`${t}Panel`;return i`
      <ha-expansion-panel id="${n}">
        <div slot="header" @click="${()=>this._togglePanel(n)}">
          ${e}
        </div>
        <div class="section-content">
          ${this._renderEntityInput(`${e} (ID)`,t)}
          ${this._renderIconInput(`${e} Icon`,t)}
        </div>
      </ha-expansion-panel>
    `}_renderEntityInput(t,e,n="entity"){const o=this._config.entities&&this._config.entities[e]&&this._config.entities[e][n]||"";return i`
      <label>${t}:</label>
      <input
        type="text"
        .value="${o}"
        list="entity-list"
        @input="${this._updateEntity(e,n)}"
      />
    `}_renderIconInput(t,e,n="icon"){let o=this._config.entities&&this._config.entities[e]&&this._config.entities[e][n]||"";if(!o&&this.hass&&this._config.entities&&this._config.entities[e]?.entity){const t=this._config.entities[e].entity;o=this.hass.states[t]?.attributes?.icon||""}return i`
      <label>${t}:</label>
      <input
        type="text"
        .value="${o}"
        list="icon-list"
        @input="${this._updateEntity(e,n)}"
      />
    `}_renderRoomAction(){const t=this._config.tap_action||{action:"navigate",navigation_path:""},e=this._config.hold_action||{action:"more-info",navigation_path:""};return i`
      <div class="input-group">
        <label>Tap:</label>
        <select @change="${this._updateTapActionField("action")}" .value="${t.action}">
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===t.action?i`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${t.navigation_path||""}"
                @input="${this._updateTapActionField("navigation_path")}"
              />
            `:""}
        ${"call-service"===t.action?i`
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
        ${"navigate"===e.action?i`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${e.navigation_path||""}"
                @input="${this._updateHoldActionField("navigation_path")}"
              />
            `:""}
        ${"call-service"===e.action?i`
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
    `}_renderSubButtonAction(t){const e=this._config.entities[t]?.tap_action||{action:"toggle",navigation_path:""},n=this._config.entities[t]?.hold_action||{action:"more-info",navigation_path:""};return i`
      <div class="input-group">
        <label>Tap:</label>
        <select @change="${this._updateEntityTapAction(t,"action")}" .value="${e.action}">
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===e.action?i`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${e.navigation_path||""}"
                @input="${this._updateEntityTapAction(t,"navigation_path")}"
              />
            `:""}
        ${"call-service"===e.action?i`
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
        <select @change="${this._updateEntityHoldAction(t,"action")}" .value="${n.action}">
          <option value="more-info">More Info</option>
          <option value="toggle">Toggle</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===n.action?i`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${n.navigation_path||""}"
                @input="${this._updateEntityHoldAction(t,"navigation_path")}"
              />
            `:""}
        ${"call-service"===n.action?i`
              <label>Service:</label>
              <input
                type="text"
                .value="${n.service||""}"
                @input="${this._updateEntityHoldAction(t,"service")}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${n.service_data?JSON.stringify(n.service_data):""}"
                @input="${this._updateEntityHoldAction(t,"service_data")}"
              ></textarea>
            `:""}
      </div>
    `}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateName(t){const e=t.target.value;this._config={...this._config,name:e},this.requestUpdate(),this._fireConfigChanged()}_updateIcon(t){const e=t.target.value;this._config={...this._config,icon:e},this.requestUpdate(),this._fireConfigChanged()}_updateEntity(t,e="entity"){return i=>{const n=i.target.value;let o=this._config.entities[t]||{};o={...o,[e]:n};const a={...this._config.entities,[t]:o};this._config={...this._config,entities:a},this.requestUpdate(),this._fireConfigChanged()}}_updateColor(t){return e=>{const i=e.target.value,n={...this._config.colors||{},[t]:i};this._config={...this._config,colors:n},this.requestUpdate(),this._fireConfigChanged()}}_updateTemperature(t){return e=>{const i=e.target.value,n={...this._config.entities?.temperature,[t]:i};n.temperature_sensor&&n.humidity_sensor&&(n.primary=`🌡️{{ states("${n.temperature_sensor}") }}°C 💦{{ states("${n.humidity_sensor}") }}%`);const o={...this._config.entities,temperature:n};this._config={...this._config,entities:o},this.requestUpdate(),this._fireConfigChanged()}}_updateTapActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const n={...this._config.tap_action||{action:"navigate",navigation_path:""},[t]:i};this._config={...this._config,tap_action:n},this.requestUpdate(),this._fireConfigChanged()}}_updateHoldActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const n={...this._config.hold_action||{action:"more-info",navigation_path:""},[t]:i};this._config={...this._config,hold_action:n},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityTapAction(t,e){return i=>{let n=i.target.value;if("service_data"===e)try{n=JSON.parse(n)}catch(t){}let o=this._config.entities[t]||{},a=o.tap_action||{action:"toggle",navigation_path:""};a={...a,[e]:n},o={...o,tap_action:a};const s={...this._config.entities,[t]:o};this._config={...this._config,entities:s},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityHoldAction(t,e){return i=>{let n=i.target.value;if("service_data"===e)try{n=JSON.parse(n)}catch(t){}let o=this._config.entities[t]||{},a=o.hold_action||{action:"more-info",navigation_path:""};a={...a,[e]:n},o={...o,hold_action:a};const s={...this._config.entities,[t]:o};this._config={...this._config,entities:s},this.requestUpdate(),this._fireConfigChanged()}}});var s=Object.freeze({__proto__:null});
