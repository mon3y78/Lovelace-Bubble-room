/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}}const s=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new o(n,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:r,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,g=_?_.emptyScript:"",v=u.reactiveElementPolyfillSupport,f=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!r(t,e),y={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const s=n?.call(this);o.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of n){const n=document.createElement("style"),o=t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=n,this[n]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??b)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,v?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+w,P=`<${C}>`,k=document,T=()=>k.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,O="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,M=/>/g,R=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,B=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),q=new WeakMap,F=k.createTreeWalker(k,129);function V(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,n=[];let o,s=2===e?"<svg>":3===e?"<math>":"",a=U;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,h=0;for(;h<i.length&&(a.lastIndex=h,c=a.exec(i),null!==c);)h=a.lastIndex,a===U?"!--"===c[1]?a=I:void 0!==c[1]?a=M:void 0!==c[2]?(j.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=R):void 0!==c[3]&&(a=R):a===R?">"===c[0]?(a=o??U,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?R:'"'===c[3]?B:z):a===B||a===z?a=R:a===I||a===M?a=U:(a=R,o=void 0);const d=a===R&&t[e+1].startsWith("/>")?" ":"";s+=a===U?i+P:l>=0?(n.push(r),i.slice(0,l)+x+i.slice(l)+w+d):i+w+(-2===l?e:d)}return[V(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class K{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,s=0;const a=t.length-1,r=this.parts,[c,l]=W(t,e);if(this.el=K.createElement(c,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=F.nextNode())&&r.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(x)){const e=l[s++],i=n.getAttribute(t).split(w),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?X:"?"===a[1]?tt:"@"===a[1]?et:Q}),n.removeAttribute(t)}else t.startsWith(w)&&(r.push({type:6,index:o}),n.removeAttribute(t));if(j.test(n.tagName)){const t=n.textContent.split(w),e=t.length-1;if(e>0){n.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],T()),F.nextNode(),r.push({type:2,index:++o});n.append(t[e],T())}}}else if(8===n.nodeType)if(n.data===C)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(w,t+1));)r.push({type:7,index:o}),t+=w.length-1}o++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,n){if(e===D)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const s=N(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,n)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??k).importNode(e,!0);F.currentNode=n;let o=F.nextNode(),s=0,a=0,r=i[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new G(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new it(o,this,t)),this._$AV.push(e),r=i[++a]}s!==r?.index&&(o=F.nextNode(),s++)}return F.currentNode=k,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),N(t)?t===J||null==t||""===t?(this._$AH!==J&&this._$AR(),this._$AH=J):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==J&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new Y(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new G(this.O(T()),this.O(T()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=J,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=J}_$AI(t,e=this,i,n){const o=this.strings;let s=!1;if(void 0===o)t=Z(this,t,e,0),s=!N(t)||t!==this._$AH&&t!==D,s&&(this._$AH=t);else{const n=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=Z(this,n[i+a],e,a),r===D&&(r=this._$AH[a]),s||=!N(r)||r!==this._$AH[a],r===J?t=J:t!==J&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}s&&!n&&this.j(t)}j(t){t===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===J?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==J)}}class et extends Q{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??J)===D)return;const i=this._$AH,n=t===J&&i!==J||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==J&&(i===J||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(K,G),(A.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new G(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}ot._$litElement$=!0,ot.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ot});const st=globalThis.litElementPolyfillSupport;st?.({LitElement:ot}),(globalThis.litElementVersions??=[]).push("4.1.1");customElements.define("bubble-room",class extends ot{static get properties(){return{config:{type:Object},hass:{type:Object}}}static async getConfigElement(){return await Promise.resolve().then((function(){return at})),document.createElement("bubble-room-editor")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"",tap_action:{action:"more-info"}},entities1:{entity:"sensor.some_sensor1",icon:""},entities2:{entity:"sensor.some_sensor2",icon:""},entities3:{entity:"sensor.some_sensor3",icon:""},entities4:{entity:"sensor.some_sensor4",icon:""},entities5:{entity:"sensor.some_sensor5",icon:""},temperature:{temperature_sensor:"sensor.vindstyrka_salotto_temperature",humidity_sensor:"sensor.vindstyrka_salotto_humidity",tap_action:{action:"more-info"}}},colors:{active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"},icon:"",name:"Salotto",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"}}}_getFallbackIcon(t){return this.hass&&this.hass.states&&this.hass.states[t]?this.hass.customize&&this.hass.customize[t]&&this.hass.customize[t].icon?this.hass.customize[t].icon:this.hass.states[t].attributes.icon||"mdi:alert-circle-outline":""}setConfig(t){if(!(t=JSON.parse(JSON.stringify(t)))||"object"!=typeof t||Array.isArray(t))throw new Error("La configurazione deve essere un oggetto valido.");if(!t.entities||"object"!=typeof t.entities)throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");const e=["presence","sub-button1","sub-button2","sub-button3","sub-button4","entities1","entities2","entities3","entities4","entities5","climate","temperature"],i={tap_action:{action:"toggle"},hold_action:{action:"more-info"}},n={};for(const o in t.entities){let s=t.entities[o];if(["entities1","entities2","entities3","entities4","entities5"].includes(o)&&s&&"object"==typeof s&&Object.keys(s).some((t=>/^\d+$/.test(t)))){let t={};for(const e in s)/^\d+$/.test(e)||(t[e]=s[e]);const e=Object.keys(s).filter((t=>/^\d+$/.test(t)));e.length>0&&(t.entity=e.sort(((t,e)=>Number(t)-Number(e))).map((t=>s[t])).join("")),s=t}if("climate"===o&&"string"==typeof s&&(s={entity:s,...i}),"string"==typeof s)e.includes(o)?n[o]="presence"===o?{entity:s}:{entity:s,...i}:n[o]=s;else if("object"==typeof s)if(e.includes(o)){if(["entities1","entities2","entities3","entities4","entities5"].includes(o)&&!s.style){let t=parseInt(o.replace("entities",""))-1;s.style=this._defaultMushroomStyle(t)}n[o]="presence"===o?{...s}:{...i,...s}}else n[o]=s}this.config={entities:n,colors:{active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)",...t.colors},icon:t.icon||"",name:t.name||"Salotto",tap_action:t.tap_action||{action:"navigate",navigation_path:""}},!this.config.entity&&this.config.entities&&this.config.entities.presence&&(this.config.entity=this.config.entities.presence.entity)}getConfig(){return JSON.parse(JSON.stringify(this.config))}static get styles(){return s`
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
    `}_defaultMushroomStyle(t){switch(t){case 0:return"top: -77px; left: -2px;";case 1:return"top: -85px; left: 38px;";case 2:return"top: -64px; left: 77px;";case 3:return"bottom: 39px; left: 98px;";case 4:return"bottom: -1px; left: 87px;";case 5:return"bottom: -2px; left: -2px;";case 6:return"top: -140px; left: 15px;";default:return""}}_startHold(t,e){t.stopPropagation(),this._holdTriggered=!1,this._holdTimeout=setTimeout((()=>{this._holdTriggered=!0,this._handleHoldAction(e)}),500)}_endHold(t,e,i){t.stopPropagation(),clearTimeout(this._holdTimeout),this._holdTriggered||i(),this._holdTriggered=!1}_cancelHold(t){clearTimeout(this._holdTimeout),this._holdTriggered=!1}_handleHoldAction(t){if(!t.hold_action)return void this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));switch(t.hold_action.action){case"more-info":default:this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"toggle":this._toggleEntity(t.entity);break;case"call-service":if(t.hold_action.service){const[e,i]=t.hold_action.service.split("."),n=t.hold_action.service_data||{};n.entity_id||(n.entity_id=t.entity),this.hass.callService(e,i,n)}break;case"navigate":t.hold_action.navigation_path&&(window.history.pushState({},"",t.hold_action.navigation_path),window.dispatchEvent(new Event("location-changed")))}}_handleMainIconTap(){if(!this.config.tap_action)return;switch(this.config.tap_action.action){case"toggle":this._toggleEntity(this.config.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0}));break;case"navigate":this.config.tap_action.navigation_path&&(window.history.pushState({},"",this.config.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(this.config.tap_action.service){const[t,e]=this.config.tap_action.service.split("."),i=this.config.tap_action.service_data||{};i.entity_id||(i.entity_id=this.config.entity),this.hass.callService(t,e,i)}}}_toggleEntity(t){this.hass&&this.hass.callService("homeassistant","toggle",{entity_id:t})}_handleSubButtonTap(t){if(!t.tap_action||"none"===t.tap_action.action)return;switch(t.tap_action.action){case"toggle":this._toggleEntity(t.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"navigate":t.tap_action.navigation_path&&(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(t.tap_action.service){const[e,i]=t.tap_action.service.split("."),n=t.tap_action.service_data||{};n.entity_id||(n.entity_id=t.entity),this.hass.callService(e,i,n)}}}_handleMushroomTap(t){if(!t.tap_action||"none"===t.tap_action.action)return;switch(t.tap_action.action){case"toggle":this._toggleEntity(t.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"navigate":t.tap_action.navigation_path&&(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(t.tap_action.service){const[e,i]=t.tap_action.service.split("."),n=t.tap_action.service_data||{};n.entity_id||(n.entity_id=t.entity),this.hass.callService(e,i,n)}}}render(){if(!this.config||!this.hass)return L`<div>Loading...</div>`;const{entities:t,colors:e,name:i,icon:n}=this.config,o=this.hass,s=o.states[t.presence.entity]?.state||"off",a="on"===s?e.backgroundActive:e.backgroundInactive,r=this.config.entity,c=this._getFallbackIcon(r),l=this.config.icon?this.config.icon:c,h=this.config.main_icon_color||("on"===s?e.active:e.inactive),d=h,p=[t["sub-button1"],t["sub-button2"],t["sub-button3"],t["sub-button4"]];let u=[t.entities1,t.entities2,t.entities3,t.entities4,t.entities5];return t.climate&&u.push(t.climate),t.temperature&&u.push(t.temperature),L`
      <div class="card">
        <div class="grid-container">
          <div class="name-area" style="color: ${d};">
            ${i}
          </div>
          <div class="icon-area">
            <div class="bubble-icon-container"
                 style="background-color: ${a};"
                 @pointerdown="${t=>this._startHold(t,this.config)}"
                 @pointerup="${t=>this._endHold(t,this.config,(()=>this._handleMainIconTap()))}"
                 @pointerleave="${t=>this._cancelHold(t)}">
              <ha-icon key="${r}-${c}" class="bubble-icon" icon="${l}" style="color: ${h};"></ha-icon>
            </div>
            <div class="mushroom-container">
              ${u.map(((t,e)=>{if(!t)return L``;if(t.temperature_sensor&&t.humidity_sensor){const i=o.states[t.temperature_sensor]?.state||"N/A",n=o.states[t.humidity_sensor]?.state||"N/A";return L`
                    <div class="mushroom-item"
                         style="${t.style?t.style:this._defaultMushroomStyle(e)}"
                         @pointerdown="${e=>this._startHold(e,t)}"
                         @pointerup="${e=>this._endHold(e,t,(()=>this._handleMushroomTap(t)))}"
                         @pointerleave="${t=>this._cancelHold(t)}">
                      <div class="mushroom-primary">🌡️${i}°C 💦${n}%</div>
                    </div>
                  `}{const i="on"===(o.states[t.entity]?.state||"off")?t.icon_color&&t.icon_color.on?t.icon_color.on:"orange":t.icon_color&&t.icon_color.off?t.icon_color.off:"#80808055",n=this._getFallbackIcon(t.entity),s=t.icon&&""!==t.icon.trim()?t.icon:n,a=t.style?t.style:this._defaultMushroomStyle(e);return L`
                    <div class="mushroom-item"
                         style="${a}"
                         @pointerdown="${e=>this._startHold(e,t)}"
                         @pointerup="${e=>this._endHold(e,t,(()=>this._handleMushroomTap(t)))}"
                         @pointerleave="${t=>this._cancelHold(t)}">
                      <ha-icon icon="${s}" style="color: ${i};"></ha-icon>
                    </div>
                  `}}))}
            </div>
          </div>
          <div class="bubble-sub-button-container">
            ${p.map((t=>{if(!t)return L``;const i="on"===(o.states[t.entity]?.state||"off")?e.active:e.inactive,n=this._getFallbackIcon(t.entity),s=t.icon?t.icon:n;return L`
                <div class="bubble-sub-button"
                     style="background-color: ${i};"
                     @pointerdown="${e=>this._startHold(e,t)}"
                     @pointerup="${e=>this._endHold(e,t,(()=>this._handleSubButtonTap(t)))}"
                     @pointerleave="${t=>this._cancelHold(t)}">
                  <ha-icon icon="${s}"></ha-icon>
                </div>
              `}))}
          </div>
        </div>
      </div>
    `}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}}),window.customCards=window.customCards||[],window.customCards.push({type:"custom:bubble-room",name:"Bubble Room",description:"Bubble Room",preview:!1,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});customElements.define("bubble-room-editor",class extends ot{static get properties(){return{_config:{type:Object},hass:{type:Object},_iconList:{type:Array}}}static async getConfigElement(){return await Promise.resolve().then((function(){return at})),document.createElement("bubble-room-editor")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"mdi:lightbulb",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"mdi:fan",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"mdi:play-circle",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"mdi:robot-vacuum",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"mdi:thermostat",tap_action:{action:"more-info"}},entities1:{entity:"sensor.some_sensor1",icon:"mdi:information-outline"},entities2:{entity:"sensor.some_sensor2",icon:"mdi:information-outline"},entities3:{entity:"sensor.some_sensor3",icon:"mdi:information-outline"},entities4:{entity:"sensor.some_sensor4",icon:"mdi:information-outline"},entities5:{entity:"sensor.some_sensor5",icon:"mdi:information-outline"},temperature:{temperature_sensor:"sensor.vindstyrka_salotto_temperature",humidity_sensor:"sensor.vindstyrka_salotto_humidity",tap_action:{action:"more-info"}}},colors:{active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"},name:"Salotto",icon:"mdi:sofa",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"},hold_action:{action:"more-info",navigation_path:""}}}constructor(){super(),this._iconList=["mdi:lightbulb","mdi:fan","mdi:play-circle","mdi:robot-vacuum","mdi:information-outline","mdi:sofa","mdi:account","mdi:bed","mdi:home","mdi:weather-sunny","mdi:weather-cloudy","mdi:weather-rainy"]}connectedCallback(){super.connectedCallback()}setConfig(t){t||(t={}),t.entities||(t.entities={}),t.colors||(t.colors={active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"}),t.hold_action||(t.hold_action={action:"more-info",navigation_path:""}),this._config=t}getConfig(){return this._config}_defaultIconList(){return this._iconList}static get styles(){return s`
      :host {
        display: block;
        margin: 0;
        padding: 0;
      }
      .editor-header {
        text-align: center;
        margin: 1rem 0;
      }
      ha-expansion-panel {
        margin: 8px 0;
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
    `}_togglePanel(t){const e=this.shadowRoot.getElementById(t);e&&(e.open=!e.open)}_renderSubButtonPanel(t){let e;switch(t){case"sub-button1":e="Sub-button1";break;case"sub-button2":e="Sub-button2";break;case"sub-button3":e="Sub-button3";break;case"sub-button4":e="Sub-button4";break;default:e=t}const i=`${t}Panel`;return L`
      <ha-expansion-panel id="${i}">
        <div slot="header" @click="${()=>this._togglePanel(i)}" style="cursor: pointer;">
          ${e}
        </div>
        <div class="section-content">
          ${this._renderEntityInput("Entities (ID)",t)}
          ${this._renderIconInput("Icon",t)}
          ${this._renderSubButtonAction(t)}
        </div>
      </ha-expansion-panel>
    `}render(){return this._config?L`
      <div class="editor-header">
        <h3>Editor Visuale Bubble Room</h3>
      </div>

      <!-- Sezione ROOM -->
      <ha-expansion-panel id="roomPanel">
        <div slot="header" @click="${()=>this._togglePanel("roomPanel")}" style="cursor: pointer;">
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

      <!-- Sezione SUB-BUTTON principale che contiene i pannelli individuali -->
      <ha-expansion-panel id="subButtonMainPanel">
        <div slot="header" @click="${()=>this._togglePanel("subButtonMainPanel")}" style="cursor: pointer;">
          SUB-BUTTON
        </div>
        <div class="section-content">
          ${this._renderSubButtonPanel("sub-button1")}
          ${this._renderSubButtonPanel("sub-button2")}
          ${this._renderSubButtonPanel("sub-button3")}
          ${this._renderSubButtonPanel("sub-button4")}
        </div>
      </ha-expansion-panel>

      <!-- Sezione Mushroom Entities -->
      <ha-expansion-panel id="mushroomEntitiesPanel">
        <div slot="header" @click="${()=>this._togglePanel("mushroomEntitiesPanel")}" style="cursor: pointer;">
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

      <!-- Sezione Clima -->
      <ha-expansion-panel id="climatePanel">
        <div slot="header" @click="${()=>this._togglePanel("climatePanel")}" style="cursor: pointer;">
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

      <!-- Sezione Colori -->
      <ha-expansion-panel id="colorsPanel">
        <div slot="header" @click="${()=>this._togglePanel("colorsPanel")}" style="cursor: pointer;">
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

      <!-- Datalists per autocomplete -->
      <datalist id="entity-list">
        ${this.hass?Object.keys(this.hass.entities).map((t=>L`<option value="${t}"></option>`)):""}
      </datalist>
      <datalist id="icon-list">
        ${this._defaultIconList().map((t=>L`<option value="${t}"></option>`))}
      </datalist>

      <p class="note">
        Note: Mushroom Entities hanno posizioni fisse e le azioni di default per le entità (eccetto Presence)
        sono: tap: toggle, hold: more-info. Per configurazioni avanzate, modifica direttamente il YAML.
      </p>
    `:L`<div>Caricamento configurazione...</div>`}_renderMushroomEntityPanel(t,e){const i=`${t}Panel`;return L`
      <ha-expansion-panel id="${i}">
        <div slot="header" @click="${()=>this._togglePanel(i)}" style="cursor: pointer;">
          ${e}
        </div>
        <div class="section-content">
          ${this._renderEntityInput(`${e} (ID)`,t)}
          ${this._renderIconInput(`${e} Icon`,t)}
        </div>
      </ha-expansion-panel>
    `}_renderEntityInput(t,e,i="entity"){const n=this._config.entities&&this._config.entities[e]&&this._config.entities[e][i]||"";return L`
      <label>${t}:</label>
      <input
        type="text"
        .value="${n}"
        list="entity-list"
        @input="${this._updateEntity(e,i)}"
      />
    `}_renderIconInput(t,e,i="icon"){let n=this._config.entities&&this._config.entities[e]&&this._config.entities[e][i]||"";if(!n&&this.hass&&this._config.entities&&this._config.entities[e]?.entity){const t=this._config.entities[e].entity;n=this.hass.states[t]?.attributes?.icon||""}return L`
      <label>${t}:</label>
      <input
        type="text"
        .value="${n}"
        list="icon-list"
        @input="${this._updateEntity(e,i)}"
      />
    `}_renderRoomAction(){const t=this._config.tap_action||{action:"navigate",navigation_path:""},e=this._config.hold_action||{action:"more-info",navigation_path:""};return L`
      <div class="input-group">
        <label>Tap:</label>
        <select @change="${this._updateTapActionField("action")}" .value="${t.action}">
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===t.action?L`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${t.navigation_path||""}"
                @input="${this._updateTapActionField("navigation_path")}"
              />
            `:""}
        ${"call-service"===t.action?L`
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
        ${"navigate"===e.action?L`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${e.navigation_path||""}"
                @input="${this._updateHoldActionField("navigation_path")}"
              />
            `:""}
        ${"call-service"===e.action?L`
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
    `}_renderSubButtonAction(t){const e=this._config.entities[t]?.tap_action||{action:"toggle",navigation_path:""},i=this._config.entities[t]?.hold_action||{action:"more-info",navigation_path:""};return L`
      <div class="input-group">
        <label>Tap:</label>
        <select @change="${this._updateEntityTapAction(t,"action")}" .value="${e.action}">
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===e.action?L`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${e.navigation_path||""}"
                @input="${this._updateEntityTapAction(t,"navigation_path")}"
              />
            `:""}
        ${"call-service"===e.action?L`
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
        ${"navigate"===i.action?L`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${i.navigation_path||""}"
                @input="${this._updateEntityHoldAction(t,"navigation_path")}"
              />
            `:""}
        ${"call-service"===i.action?L`
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
    `}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateName(t){const e=t.target.value;this._config={...this._config,name:e},this.requestUpdate(),this._fireConfigChanged()}_updateIcon(t){const e=t.target.value;this._config={...this._config,icon:e},this.requestUpdate(),this._fireConfigChanged()}_updateEntity(t,e="entity"){return i=>{const n=i.target.value;let o=this._config.entities[t]||{};o={...o,[e]:n};const s={...this._config.entities,[t]:o};this._config={...this._config,entities:s},this.requestUpdate(),this._fireConfigChanged()}}_updateColor(t){return e=>{const i=e.target.value,n={...this._config.colors||{},[t]:i};this._config={...this._config,colors:n},this.requestUpdate(),this._fireConfigChanged()}}_updateTemperature(t){return e=>{const i=e.target.value,n={...this._config.entities?.temperature,[t]:i};n.temperature_sensor&&n.humidity_sensor&&(n.primary=`🌡️{{ states("${n.temperature_sensor}") }}°C 💦{{ states("${n.humidity_sensor}") }}%`);const o={...this._config.entities,temperature:n};this._config={...this._config,entities:o},this.requestUpdate(),this._fireConfigChanged()}}_updateTapActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const n={...this._config.tap_action||{action:"navigate",navigation_path:""},[t]:i};this._config={...this._config,tap_action:n},this.requestUpdate(),this._fireConfigChanged()}}_updateHoldActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const n={...this._config.hold_action||{action:"more-info",navigation_path:""},[t]:i};this._config={...this._config,hold_action:n},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityTapAction(t,e){return i=>{let n=i.target.value;if("service_data"===e)try{n=JSON.parse(n)}catch(t){}let o=this._config.entities[t]||{},s=o.tap_action||{action:"toggle",navigation_path:""};s={...s,[e]:n},o={...o,tap_action:s};const a={...this._config.entities,[t]:o};this._config={...this._config,entities:a},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityHoldAction(t,e){return i=>{let n=i.target.value;if("service_data"===e)try{n=JSON.parse(n)}catch(t){}let o=this._config.entities[t]||{},s=o.hold_action||{action:"more-info",navigation_path:""};s={...s,[e]:n},o={...o,hold_action:s};const a={...this._config.entities,[t]:o};this._config={...this._config,entities:a},this.requestUpdate(),this._fireConfigChanged()}}});var at=Object.freeze({__proto__:null});
