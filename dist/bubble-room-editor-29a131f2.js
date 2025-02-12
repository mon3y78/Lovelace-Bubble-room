import{r as t,i as e,x as i}from"./bubble-room-12270560.js";customElements.define("bubble-room-editor",class extends t{static get properties(){return{_config:{type:Object},hass:{type:Object},_iconList:{type:Array}}}static async getConfigElement(){return await Promise.resolve().then((function(){return n})),document.createElement("bubble-room-editor")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"mdi:lightbulb",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"mdi:fan",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"mdi:play-circle",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"mdi:robot-vacuum",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"mdi:thermostat",tap_action:{action:"more-info"}},entities1:{entity:"sensor.some_sensor1",icon:"mdi:information-outline"},entities2:{entity:"sensor.some_sensor2",icon:"mdi:information-outline"},entities3:{entity:"sensor.some_sensor3",icon:"mdi:information-outline"},entities4:{entity:"sensor.some_sensor4",icon:"mdi:information-outline"},entities5:{entity:"sensor.some_sensor5",icon:"mdi:information-outline"},temperatura:{sensore_temperatura:"sensor.vindstyrka_salotto_temperature","sensore_umitidà":"sensor.vindstyrka_salotto_humidity",tap_action:{action:"more-info"}}},colors:{active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"},name:"Salotto",icon:"mdi:sofa",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"},hold_action:{action:"more-info",navigation_path:""}}}constructor(){super(),this._iconList=[]}connectedCallback(){super.connectedCallback(),this._loadIconList()}async _loadIconList(){try{const t=await fetch("/local/mdi-icons.json");if(t.ok){const e=await t.json();this._iconList=e}}catch(t){}this.requestUpdate()}_defaultIconList(){return this._iconList.length>0?this._iconList:["mdi:lightbulb","mdi:fan","mdi:play-circle","mdi:robot-vacuum","mdi:information-outline","mdi:sofa","mdi:account","mdi:bed","mdi:home","mdi:weather-sunny","mdi:weather-cloudy","mdi:weather-rainy"]}setConfig(t){t||(t={}),t.entities||(t.entities={}),t.colors||(t.colors={active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"}),t.hold_action||(t.hold_action={action:"more-info",navigation_path:""}),this._config=t}getConfig(){return this._config}static get styles(){return e`
      :host {
        display: block;
        padding: 20px;
        background-color: #1e1e1e;
        color: #e0e0e0;
        font-family: 'Roboto', sans-serif;
      }
      h3 {
        margin: 0 0 20px 0;
        font-size: 24px;
        text-align: center;
        color: #ffffff;
      }
      /* Intestazioni principali in blu */
      legend {
        font-weight: bold;
        padding: 0 5px;
        color: #2196F3;
        font-size: 20px;
      }
      h4 {
        margin: 5px 0;
        font-size: 16px;
        font-weight: bold;
        color: #2196F3;
      }
      label {
        display: block;
        margin: 12px 0;
        font-size: 16px;
        color: #cccccc;
      }
      input, textarea, select {
        width: 100%;
        padding: 8px;
        margin-top: 4px;
        font-size: 14px;
        border: 1px solid #444;
        border-radius: 4px;
        background-color: #2a2a2a;
        color: #e0e0e0;
        box-sizing: border-box;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }
      input:focus, textarea:focus, select:focus {
        border-color: #666;
        outline: none;
        box-shadow: 0 0 5px rgba(102, 102, 102, 0.6);
      }
      fieldset {
        border: 1px solid #444;
        border-radius: 4px;
        padding: 5px;
        margin-bottom: 15px;
        background-color: #2a2a2a;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }
      .sub-button-config fieldset {
        padding: 3px;       /* riduce lo spazio interno */
        margin-bottom: 3px;  /* riduce lo spazio tra i fieldset */
      }
      datalist {
        font-size: 14px;
      }
      .sub-button-config {
        padding: 5px;
        border: 1px solid #666;
        margin-bottom: 5px;
        border-radius: 4px;
      }
      .sub-button-action {
        margin-top: 5px;
      }
      .sub-button-action > div {
        margin-bottom: 5px;
      }
      hr {
        border: 0;
        height: 1px;
        background: #444;
        margin: 10px 0;
      }
      /* Per le aree Action, non coloriamo il legend di blu */
      .room-action legend,
      .sub-button-action legend {
        color: #e0e0e0;
      }
      /* Stili specifici per la ROOM Action */
      .room-action {
        margin-top: 10px;
      }
      .room-action > div {
        margin-bottom: 5px;
      }
    `}_renderEntityInput(t,e,n="entity"){const o=this._config.entities&&this._config.entities[e]&&this._config.entities[e][n]||"";return i`
      <label>
        ${t}:
        <input type="text" .value="${o}" list="entity-list" @input="${this._updateEntity(e,n)}" />
      </label>
    `}_renderIconInput(t,e,n="icon"){const o=this._config.entities&&this._config.entities[e]&&this._config.entities[e][n]||"";return i`
      <label>
        ${t}:
        <input type="text" .value="${o}" list="icon-list" @input="${this._updateEntity(e,n)}" />
      </label>
    `}_renderRoomAction(){const t=this._config.tap_action||{action:"navigate",navigation_path:""},e=this._config.hold_action||{action:"more-info",navigation_path:""};return i`
      <fieldset class="room-action">
        <legend>Action</legend>
        <div class="room-tap">
          <label>Tap:</label>
          <select @change="${this._updateTapActionField("action")}" .value="${t.action}">
            <option value="toggle">Toggle</option>
            <option value="more-info">More Info</option>
            <option value="navigate">Navigate</option>
            <option value="call-service">Call Service</option>
            <option value="none">None</option>
          </select>
          ${"navigate"===t.action?i`
            <label>Navigation Path:
              <input type="text" .value="${t.navigation_path||""}" @input="${this._updateTapActionField("navigation_path")}" />
            </label>
          `:""}
          ${"call-service"===t.action?i`
            <label>Service:
              <input type="text" .value="${t.service||""}" @input="${this._updateTapActionField("service")}" />
            </label>
            <label>Service Data (JSON):
              <textarea .value="${t.service_data?JSON.stringify(t.service_data):""}" @input="${this._updateTapActionField("service_data")}"></textarea>
            </label>
          `:""}
        </div>
        <div class="room-hold">
          <label>Hold:</label>
          <select @change="${this._updateHoldActionField("action")}" .value="${e.action}">
            <option value="more-info">More Info</option>
            <option value="toggle">Toggle</option>
            <option value="call-service">Call Service</option>
            <option value="navigate">Navigate</option>
            <option value="none">None</option>
          </select>
          ${"navigate"===e.action?i`
            <label>Navigation Path:
              <input type="text" .value="${e.navigation_path||""}" @input="${this._updateHoldActionField("navigation_path")}" ?disabled="${"navigate"!==e.action}" />
            </label>
          `:""}
          ${"call-service"===e.action?i`
            <label>Service:
              <input type="text" .value="${e.service||""}" @input="${this._updateHoldActionField("service")}" />
            </label>
            <label>Service Data (JSON):
              <textarea .value="${e.service_data?JSON.stringify(e.service_data):""}" @input="${this._updateHoldActionField("service_data")}"></textarea>
            </label>
          `:""}
        </div>
      </fieldset>
    `}_updateTapActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const n={...this._config.tap_action||{action:"navigate",navigation_path:""},[t]:i};this._config={...this._config,tap_action:n},this.requestUpdate(),this._fireConfigChanged()}}_updateHoldActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const n={...this._config.hold_action||{action:"more-info",navigation_path:""},[t]:i};this._config={...this._config,hold_action:n},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityTapAction(t,e){return i=>{let n=i.target.value;if("service_data"===e)try{n=JSON.parse(n)}catch(t){}let o=this._config.entities[t]||{},a=o.tap_action||{action:"toggle",navigation_path:""};a={...a,[e]:n},o={...o,tap_action:a};const s={...this._config.entities,[t]:o};this._config={...this._config,entities:s},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityHoldAction(t,e){return i=>{let n=i.target.value;if("service_data"===e)try{n=JSON.parse(n)}catch(t){}let o=this._config.entities[t]||{},a=o.hold_action||{action:"more-info",navigation_path:""};a={...a,[e]:n},o={...o,hold_action:a};const s={...this._config.entities,[t]:o};this._config={...this._config,entities:s},this.requestUpdate(),this._fireConfigChanged()}}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateName(t){const e=t.target.value;this._config={...this._config,name:e},this.requestUpdate(),this._fireConfigChanged()}_updateIcon(t){const e=t.target.value;this._config={...this._config,icon:e},this.requestUpdate(),this._fireConfigChanged()}_updateEntity(t,e="entity"){return i=>{const n=i.target.value;let o=this._config.entities[t]||{};o={...o,[e]:n};const a={...this._config.entities,[t]:o};this._config={...this._config,entities:a},this.requestUpdate(),this._fireConfigChanged()}}_updateColor(t){return e=>{const i=e.target.value,n={...this._config.colors||{},[t]:i};this._config={...this._config,colors:n},this.requestUpdate(),this._fireConfigChanged()}}_updateTemperature(t){return e=>{const i=e.target.value,n={...this._config.entities?.temperatura,[t]:i};n.sensore_temperatura&&n.sensore_umitidà&&(n.primary=`🌡️{{ states("${n.sensore_temperatura}") }}°C 💦{{ states("${n.sensore_umitidà}") }}%`);const o={...this._config.entities,temperatura:n};this._config={...this._config,entities:o},this.requestUpdate(),this._fireConfigChanged()}}_renderSubButtonAction(t){const e=this._config.entities[t]?.tap_action||{action:"toggle",navigation_path:""},n=this._config.entities[t]?.hold_action||{action:"more-info",navigation_path:""};return i`
      <fieldset class="sub-button-action">
        <legend>Action</legend>
        <div class="sub-button-tap">
          <label>Tap:</label>
          <select @change="${this._updateEntityTapAction(t,"action")}" .value="${e.action}">
            <option value="toggle">Toggle</option>
            <option value="more-info">More Info</option>
            <option value="navigate">Navigate</option>
            <option value="call-service">Call Service</option>
            <option value="none">None</option>
          </select>
          ${"navigate"===e.action?i`
            <label>Navigation Path:
              <input type="text" .value="${e.navigation_path||""}" @input="${this._updateEntityTapAction(t,"navigation_path")}" />
            </label>
          `:""}
          ${"call-service"===e.action?i`
            <label>Service:
              <input type="text" .value="${e.service||""}" @input="${this._updateEntityTapAction(t,"service")}" />
            </label>
            <label>Service Data (JSON):
              <textarea .value="${e.service_data?JSON.stringify(e.service_data):""}" @input="${this._updateEntityTapAction(t,"service_data")}"></textarea>
            </label>
          `:""}
        </div>
        <div class="sub-button-hold">
          <label>Hold:</label>
          <select @change="${this._updateEntityHoldAction(t,"action")}" .value="${n.action}">
            <option value="more-info">More Info</option>
            <option value="toggle">Toggle</option>
            <option value="navigate">Navigate</option>
            <option value="call-service">Call Service</option>
            <option value="none">None</option>
          </select>
          ${"navigate"===n.action?i`
            <label>Navigation Path:
              <input type="text" .value="${n.navigation_path||""}" @input="${this._updateEntityHoldAction(t,"navigation_path")}" />
            </label>
          `:""}
          ${"call-service"===n.action?i`
            <label>Service:
              <input type="text" .value="${n.service||""}" @input="${this._updateEntityHoldAction(t,"service")}" />
            </label>
            <label>Service Data (JSON):
              <textarea .value="${n.service_data?JSON.stringify(n.service_data):""}" @input="${this._updateEntityHoldAction(t,"service_data")}"></textarea>
            </label>
          `:""}
        </div>
      </fieldset>
    `}_renderSubButton(t){let e;switch(t){case"sub-button1":e="Sub-button1";break;case"sub-button2":e="Sub-button2";break;case"sub-button3":e="Sub-button3";break;case"sub-button4":e="Sub-button4";break;default:e=t}return i`
      <div class="sub-button-config">
        <h4>${e}</h4>
        ${this._renderEntityInput("Entità (ID)",t)}
        ${this._renderIconInput("Icona",t)}
        ${this._renderSubButtonAction(t)}
      </div>
      <hr />
    `}render(){return this._config?i`
      <div>
        <h3>Editor Visuale Bubble Room</h3>
        
        <!-- Fieldset ROOM -->
        <fieldset>
          <legend>ROOM</legend>
          <label>
            Nome della Room:
            <input type="text" .value="${this._config.name||""}" @input="${this._updateName}" />
          </label>
          <label>
            Icona principale:
            <input type="text" .value="${this._config.icon||""}" list="icon-list" @input="${this._updateIcon}" />
          </label>
          ${this._renderRoomAction()}
          ${this._renderEntityInput("Presence (ID)","presence")}
        </fieldset>
        
        <!-- Fieldset SUB-BUTTON -->
        <fieldset>
          <legend>SUB-BUTTON</legend>
          ${this._renderSubButton("sub-button1")}
          ${this._renderSubButton("sub-button2")}
          ${this._renderSubButton("sub-button3")}
          ${this._renderSubButton("sub-button4")}
        </fieldset>
        
        <!-- Fieldset Mushroom Templates -->
        <fieldset>
          <legend>Mushroom Templates</legend>
          ${this._renderEntityInput("Entities1 (ID)","entities1")}
          ${this._renderIconInput("Entities1 Icona","entities1")}
          ${this._renderEntityInput("Entities2 (ID)","entities2")}
          ${this._renderIconInput("Entities2 Icona","entities2")}
          ${this._renderEntityInput("Entities3 (ID)","entities3")}
          ${this._renderIconInput("Entities3 Icona","entities3")}
          ${this._renderEntityInput("Entities4 (ID)","entities4")}
          ${this._renderIconInput("Entities4 Icona","entities4")}
          ${this._renderEntityInput("Entities5 (ID)","entities5")}
          ${this._renderIconInput("Entities5 Icona","entities5")}
        </fieldset>
        
        <!-- Fieldset Clima -->
        <fieldset>
          <legend>Clima</legend>
          ${this._renderEntityInput("Climate (ID)","climate")}
          <label>
            Sensore Temperatura:
            <input type="text"
                   .value="${this._config.entities?.temperatura?.sensore_temperatura||""}"
                   list="entity-list"
                   @input="${this._updateTemperature("sensore_temperatura")}" />
          </label>
          <label>
            Sensore Umidità:
            <input type="text"
                   .value="${this._config.entities?.temperatura?.sensore_umitidà||""}"
                   list="entity-list"
                   @input="${this._updateTemperature("sensore_umitidà")}" />
          </label>
        </fieldset>
        
        <!-- Fieldset Colori -->
        <fieldset>
          <legend>Colori</legend>
          <label>
            Active:
            <input type="text" .value="${this._config.colors&&this._config.colors.active||""}" @input="${this._updateColor("active")}" />
          </label>
          <label>
            Inactive:
            <input type="text" .value="${this._config.colors&&this._config.colors.inactive||""}" @input="${this._updateColor("inactive")}" />
          </label>
          <label>
            Background Active:
            <input type="text" .value="${this._config.colors&&this._config.colors.backgroundActive||""}" @input="${this._updateColor("backgroundActive")}" />
          </label>
          <label>
            Background Inactive:
            <input type="text" .value="${this._config.colors&&this._config.colors.backgroundInactive||""}" @input="${this._updateColor("backgroundInactive")}" />
          </label>
        </fieldset>
        
        <datalist id="entity-list">
          ${this.hass?Object.keys(this.hass.entities).map((t=>i`<option value="${t}"></option>`)):""}
        </datalist>
        <datalist id="icon-list">
          ${this._defaultIconList().map((t=>i`<option value="${t}"></option>`))}
        </datalist>
        <p>
          Nota: I mushroom templates hanno posizioni fisse e le azioni di default per le entità (eccetto per Presence) sono: tap: toggle, hold: more-info.
          Per configurazioni avanzate, modifica direttamente il YAML.
        </p>
      </div>
    `:i`<div>Caricamento configurazione...</div>`}});var n=Object.freeze({__proto__:null});
