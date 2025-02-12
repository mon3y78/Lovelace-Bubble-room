/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:a,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,m=_?_.emptyScript:"",f=u.reactiveElementPolyfillSupport,g=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class v extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return s?.call(this)},set(e){const o=s?.call(this);n.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s,this[s]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??y)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[g("elementProperties")]=new Map,v[g("finalized")]=new Map,f?.({ReactiveElement:v}),(u.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,E=A.trustedTypes,w=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+x,T=`<${C}>`,H=document,P=()=>H.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,O="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,R=/>/g,j=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,z=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,J=H.createTreeWalker(H,129);function q(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(r.lastIndex=l,c=r.exec(i),null!==c);)l=r.lastIndex,r===N?"!--"===c[1]?r=M:void 0!==c[1]?r=R:void 0!==c[2]?(L.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=j):void 0!==c[3]&&(r=j):r===j?">"===c[0]?(r=n??N,h=-1):void 0===c[1]?h=-2:(h=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?j:'"'===c[3]?z:I):r===z||r===I?r=j:r===M||r===R?r=N:(r=j,n=void 0);const d=r===j&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+T:h>=0?(s.push(a),i.slice(0,h)+S+i.slice(h)+x+d):i+x+(-2===h?e:d)}return[q(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,h]=K(t,e);if(this.el=Z.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=h[o++],i=s.getAttribute(t).split(x),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?Y:"?"===r[1]?tt:"@"===r[1]?et:X}),s.removeAttribute(t)}else t.startsWith(x)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(x),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),J.nextNode(),a.push({type:2,index:++n});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(x,t+1));)a.push({type:7,index:n}),t+=x.length-1}n++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,s){if(e===D)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=k(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=F(t,n._$AS(t,e.values),n,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??H).importNode(e,!0);J.currentNode=s;let n=J.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=J.nextNode(),o++)}return J.currentNode=H,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),k(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=F(this,t,e,0),o=!k(t)||t!==this._$AH&&t!==D,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=F(this,s[i+r],e,r),a===D&&(a=this._$AH[r]),o||=!k(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Y extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class tt extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class et extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=F(this,t,e,0)??W)===D)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const st=A.litHtmlPolyfillSupport;st?.(Z,Q),(A.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class nt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}nt._$litElement$=!0,nt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:nt});const ot=globalThis.litElementPolyfillSupport;ot?.({LitElement:nt}),(globalThis.litElementVersions??=[]).push("4.1.1");customElements.define("bubble-room",class extends nt{static get properties(){return{config:{type:Object},hass:{type:Object}}}static async getConfigElement(){return await import("./bubble-room-editor-29a131f2.js"),document.createElement("bubble-room-editor")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"mdi:lightbulb",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"mdi:fan",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"mdi:play-circle",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"mdi:robot-vacuum",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"mdi:thermostat",tap_action:{action:"more-info"}},entities1:{entity:"sensor.some_sensor1",icon:"mdi:information-outline"},entities2:{entity:"sensor.some_sensor2",icon:"mdi:information-outline"},entities3:{entity:"sensor.some_sensor3",icon:"mdi:information-outline"},entities4:{entity:"sensor.some_sensor4",icon:"mdi:information-outline"},entities5:{entity:"sensor.some_sensor5",icon:"mdi:information-outline"},temperatura:{sensore_temperatura:"sensor.vindstyrka_salotto_temperature","sensore_umitidà":"sensor.vindstyrka_salotto_humidity",tap_action:{action:"more-info"}}},colors:{active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"},name:"Salotto",icon:"mdi:sofa",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"}}}_defaultMushroomStyle(t){switch(t){case 0:return"top: -82px; left: 0px;";case 1:return"top: -87px; left: 43px;";case 2:return"top: -67px; left: 80px;";case 3:return"bottom: 42px; left: 98px;";case 4:return"bottom: 0px; left: 90px;";case 5:return"bottom: -2px; left: -2px;";case 6:return"top: -140px; left: 15px;";default:return""}}setConfig(t){if(!(t=JSON.parse(JSON.stringify(t)))||"object"!=typeof t||Array.isArray(t))throw new Error("La configurazione deve essere un oggetto valido.");if(!t.entities||"object"!=typeof t.entities)throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");const e=["presence","sub-button1","sub-button2","sub-button3","sub-button4","entities1","entities2","entities3","entities4","entities5","climate","temperatura"],i={tap_action:{action:"toggle"},hold_action:{action:"more-info"}},s={"sub-button1":"mdi:lightbulb","sub-button2":"mdi:fan","sub-button3":"mdi:play-circle","sub-button4":"mdi:robot-vacuum",entities1:"mdi:information-outline",entities2:"mdi:information-outline",entities3:"mdi:information-outline",entities4:"mdi:information-outline",entities5:"mdi:information-outline",presence:"mdi:account",climate:"mdi:thermostat",temperatura:""},n={};for(const o in t.entities){let r=t.entities[o];if(["entities1","entities2","entities3","entities4","entities5"].includes(o)&&r&&"object"==typeof r&&Object.keys(r).some((t=>/^\d+$/.test(t)))){let t={};for(const e in r)/^\d+$/.test(e)||(t[e]=r[e]);const e=Object.keys(r).filter((t=>/^\d+$/.test(t)));e.length>0&&(t.entity=e.sort(((t,e)=>Number(t)-Number(e))).map((t=>r[t])).join("")),r=t}if("climate"===o&&"string"==typeof r&&(r={entity:r,icon:s.climate,...i}),"string"==typeof r)e.includes(o)?n[o]="presence"===o?{entity:r,icon:s[o]}:{entity:r,icon:s[o],...i}:n[o]=r;else if("object"==typeof r)if(e.includes(o)){if(r.icon||(r.icon=s[o]),["entities1","entities2","entities3","entities4","entities5"].includes(o)&&!r.style){let t=parseInt(o.replace("entities",""))-1;r.style=this._defaultMushroomStyle(t)}n[o]="presence"===o?{...r}:{...i,...r}}else n[o]=r}this.config={entities:n,colors:{active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)",...t.colors},name:t.name||"Salotto",icon:t.icon||"mdi:sofa",tap_action:t.tap_action||{action:"navigate",navigation_path:""}},!this.config.entity&&this.config.entities&&this.config.entities.presence&&(this.config.entity=this.config.entities.presence.entity)}getConfig(){return JSON.parse(JSON.stringify(this.config))}static get styles(){return o`
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
    `}_startHold(t,e){t.stopPropagation(),this._holdTriggered=!1,this._holdTimeout=setTimeout((()=>{this._holdTriggered=!0,this._handleHoldAction(e)}),500)}_endHold(t,e,i){t.stopPropagation(),clearTimeout(this._holdTimeout),this._holdTriggered||i(),this._holdTriggered=!1}_cancelHold(t){clearTimeout(this._holdTimeout),this._holdTriggered=!1}_handleHoldAction(t){if(!t.hold_action)return void this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));switch(t.hold_action.action){case"more-info":default:this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"toggle":this._toggleEntity(t.entity);break;case"call-service":if(t.hold_action.service){const[e,i]=t.hold_action.service.split("."),s=t.hold_action.service_data||{};s.entity_id||(s.entity_id=t.entity),this.hass.callService(e,i,s)}break;case"navigate":t.hold_action.navigation_path&&(window.history.pushState({},"",t.hold_action.navigation_path),window.dispatchEvent(new Event("location-changed")))}}_handleMainIconTap(){if(!this.config.tap_action)return;switch(this.config.tap_action.action){case"toggle":this._toggleEntity(this.config.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0}));break;case"navigate":this.config.tap_action.navigation_path&&(window.history.pushState({},"",this.config.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(this.config.tap_action.service){const[t,e]=this.config.tap_action.service.split("."),i=this.config.tap_action.service_data||{};i.entity_id||(i.entity_id=this.config.entity),this.hass.callService(t,e,i)}}}_toggleEntity(t){this.hass&&this.hass.callService("homeassistant","toggle",{entity_id:t})}_handleSubButtonTap(t){if(!t.tap_action||"none"===t.tap_action.action)return;switch(t.tap_action.action){case"toggle":this._toggleEntity(t.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"navigate":t.tap_action.navigation_path&&(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(t.tap_action.service){const[e,i]=t.tap_action.service.split("."),s=t.tap_action.service_data||{};s.entity_id||(s.entity_id=t.entity),this.hass.callService(e,i,s)}}}_handleMushroomTap(t){if(!t.tap_action||"none"===t.tap_action.action)return;switch(t.tap_action.action){case"toggle":this._toggleEntity(t.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"navigate":t.tap_action.navigation_path&&(window.history.pushState({},"",t.tap_action.navigation_path),window.dispatchEvent(new Event("location-changed")));break;case"call-service":if(t.tap_action.service){const[e,i]=t.tap_action.service.split("."),s=t.tap_action.service_data||{};s.entity_id||(s.entity_id=t.entity),this.hass.callService(e,i,s)}}}render(){if(!this.config||!this.hass)return B`<div>Loading...</div>`;const{entities:t,colors:e,name:i,icon:s}=this.config,n=this.hass,o="on"===(n.states[t.presence.entity]?.state||"off")?e.backgroundActive:e.backgroundInactive,r="#ffffff",a=r,c=[t["sub-button1"],t["sub-button2"],t["sub-button3"],t["sub-button4"]];let h=[t.entities1,t.entities2,t.entities3,t.entities4,t.entities5];return t.climate&&h.push(t.climate),t.temperatura&&h.push(t.temperatura),B`
      <div class="card">
        <div class="grid-container">
          <!-- Area "n": Nome -->
          <div class="name-area" style="color: ${a};">
            ${i}
          </div>
          <!-- Area "i": Icona principale e mushroom template -->
          <div class="icon-area">
            <div class="bubble-icon-container"
                 style="background-color: ${o};"
                 @pointerdown="${t=>this._startHold(t,this.config)}"
                 @pointerup="${t=>this._endHold(t,this.config,(()=>this._handleMainIconTap()))}"
                 @pointerleave="${t=>this._cancelHold(t)}">
              <ha-icon class="bubble-icon" icon="${s}" style="color: ${r};"></ha-icon>
            </div>
            <div class="mushroom-container">
              ${h.map(((t,e)=>{if(!t)return B``;if(t.sensore_temperatura&&t.sensore_umitidà){const i=n.states[t.sensore_temperatura]?.state||"N/A",s=n.states[t.sensore_umitidà]?.state||"N/A";return B`
                    <div class="mushroom-item"
                         style="${t.style?t.style:this._defaultMushroomStyle(e)}"
                         @pointerdown="${e=>this._startHold(e,t)}"
                         @pointerup="${e=>this._endHold(e,t,(()=>this._handleMushroomTap(t)))}"
                         @pointerleave="${t=>this._cancelHold(t)}">
                      <div class="mushroom-primary">🌡️${i}°C 💦${s}%</div>
                    </div>
                  `}{const i="on"===(n.states[t.entity]?.state||"off")?t.icon_color&&t.icon_color.on?t.icon_color.on:"orange":t.icon_color&&t.icon_color.off?t.icon_color.off:"#80808055",s=t.style?t.style:this._defaultMushroomStyle(e);return B`
                    <div class="mushroom-item"
                         style="${s}"
                         @pointerdown="${e=>this._startHold(e,t)}"
                         @pointerup="${e=>this._endHold(e,t,(()=>this._handleMushroomTap(t)))}"
                         @pointerleave="${t=>this._cancelHold(t)}">
                      <ha-icon icon="${t.icon}" style="color: ${i};"></ha-icon>
                    </div>
                  `}}))}
            </div>
          </div>
          <!-- Area "b": Sub-button -->
          <div class="bubble-sub-button-container">
            ${c.map((t=>{if(!t)return B``;const i="on"===(n.states[t.entity]?.state||"off")?e.active:e.inactive;return B`
                <div class="bubble-sub-button"
                     style="background-color: ${i};"
                     @pointerdown="${e=>this._startHold(e,t)}"
                     @pointerup="${e=>this._endHold(e,t,(()=>this._handleSubButtonTap(t)))}"
                     @pointerleave="${t=>this._cancelHold(t)}">
                  <ha-icon icon="${t.icon}"></ha-icon>
                </div>
              `}))}
          </div>
        </div>
      </div>
    `}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}});export{o as i,nt as r,B as x};
