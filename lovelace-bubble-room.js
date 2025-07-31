import"@material/mwc-chip/mwc-chip.js";import"@material/mwc-chip-set/mwc-chip-set.js";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}}const o=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(s,e,i)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:r,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:d,getPrototypeOf:h}=Object,u=globalThis,b=u.trustedTypes,m=b?b.emptyScript:"",g=u.reactiveElementPolyfillSupport,f=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},x=(e,t)=>!r(e,t),_={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:x};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:n}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const o=s?.call(this);n?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...p(e),...d(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(t)i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const o=n.fromAttribute(t,e.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const s=this.constructor,n=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??x)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==n||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,g?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y=globalThis,w=y.trustedTypes,A=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+E,C=`<${S}>`,O=document,P=()=>O.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,B=Array.isArray,U="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,R=/>/g,H=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,N=/"/g,T=/^(?:script|style|textarea|title)$/i,D=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),L=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,V=O.createTreeWalker(O,129);function G(e,t){if(!B(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const F=(e,t)=>{const i=e.length-1,s=[];let n,o=2===t?"<svg>":3===t?"<math>":"",a=I;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,p=0;for(;p<i.length&&(a.lastIndex=p,l=a.exec(i),null!==l);)p=a.lastIndex,a===I?"!--"===l[1]?a=M:void 0!==l[1]?a=R:void 0!==l[2]?(T.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=H):void 0!==l[3]&&(a=H):a===H?">"===l[0]?(a=n??I,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?H:'"'===l[3]?N:j):a===N||a===j?a=H:a===M||a===R?a=I:(a=H,n=void 0);const d=a===H&&e[t+1].startsWith("/>")?" ":"";o+=a===I?i+C:c>=0?(s.push(r),i.slice(0,c)+k+i.slice(c)+E+d):i+E+(-2===c?t:d)}return[G(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class J{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,o=0;const a=e.length-1,r=this.parts,[l,c]=F(e,t);if(this.el=J.createElement(l,i),V.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=V.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(k)){const t=c[o++],i=s.getAttribute(e).split(E),a=/([.?@])?(.*)/.exec(t);r.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?Y:"?"===a[1]?ee:"@"===a[1]?te:X}),s.removeAttribute(e)}else e.startsWith(E)&&(r.push({type:6,index:n}),s.removeAttribute(e));if(T.test(s.tagName)){const e=s.textContent.split(E),t=e.length-1;if(t>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],P()),V.nextNode(),r.push({type:2,index:++n});s.append(e[t],P())}}}else if(8===s.nodeType)if(s.data===S)r.push({type:2,index:n});else{let e=-1;for(;-1!==(e=s.data.indexOf(E,e+1));)r.push({type:7,index:n}),e+=E.length-1}n++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function K(e,t,i=e,s){if(t===L)return t;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=z(t)?void 0:t._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(e),n._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(t=K(e,n._$AS(e,t.values),n,s)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??O).importNode(t,!0);V.currentNode=s;let n=V.nextNode(),o=0,a=0,r=i[0];for(;void 0!==r;){if(o===r.index){let t;2===r.type?t=new Q(n,n.nextSibling,this,e):1===r.type?t=new r.ctor(n,r.name,r.strings,this,e):6===r.type&&(t=new ie(n,this,e)),this._$AV.push(t),r=i[++a]}o!==r?.index&&(n=V.nextNode(),o++)}return V.currentNode=O,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),z(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==L&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>B(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Z(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new J(e)),t}k(e){B(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,s){const n=this.strings;let o=!1;if(void 0===n)e=K(this,e,t,0),o=!z(e)||e!==this._$AH&&e!==L,o&&(this._$AH=e);else{const s=e;let a,r;for(e=n[0],a=0;a<n.length-1;a++)r=K(this,s[i+a],t,a),r===L&&(r=this._$AH[a]),o||=!z(r)||r!==this._$AH[a],r===q?e=q:e!==q&&(e+=(r??"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Y extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ee extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class te extends X{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??q)===L)return;const i=this._$AH,s=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ie{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const se=y.litHtmlPolyfillSupport;se?.(J,Q),(y.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class oe extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let n=s._$litPart$;if(void 0===n){const e=i?.renderBefore??null;s._$litPart$=n=new Q(t.insertBefore(P(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}oe._$litElement$=!0,oe.finalized=!0,ne.litElementHydrateSupport?.({LitElement:oe});const ae=ne.litElementPolyfillSupport;ae?.({LitElement:oe}),(ne.litElementVersions??=[]).push("4.2.1");const re={presence:"Presenza",motion:"Movimento",occupancy:"Occupazione",light:"Luce",switch:"Switch",fan:"Ventola"},le=(e=[])=>({includeDomains:["binary_sensor","light","switch","fan"],entityFilter:(t,i)=>{if(!e.length)return!1;const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return e.includes(s)}});function ce(e,t,i,s=[]){if(!e?.states)return[];let n=null;if("presence"===i&&(n=le(s)),!n)return[];const o=Object.keys(e.states).filter(e=>n.includeDomains.includes(e.split(".")[0])).filter(t=>n.entityFilter(t,e));if((t?.auto_discovery_sections?.presence??!1)&&t?.area){const i=function(e,t){if(!e?.states||!t)return[];const i=e.entities??{},s=e.devices??{};return Object.keys(e.states).filter(n=>{const o=i[n];if(o?.area_id===t)return!0;const a=o?.device_id;if(a&&s[a]?.area_id===t)return!0;const r=e.states[n]?.attributes??{};return r.area_id===t||r.area===t})}(e,t.area);return o.filter(e=>i.includes(e))}return o}const pe=!!window.__BUBBLE_DEBUG__,de=(e,t)=>e.find(e=>!t.has(e))||null;function he(e,t){const i={...t.entities||{}},s=i.presence||(i.presence={});if(!s.entity){const i=function(e,t){if(!e||!e.states)return[];const i=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let s=Object.keys(e.states).filter(e=>i.has(e.split(".")[0]));s=s.filter(t=>{if("binary_sensor"!==t.split(".")[0])return!0;const i=e.states[t]?.attributes?.device_class;return["motion","occupancy","presence"].includes(i||"")});const n=t?.area;if(n){const t=s.filter(t=>{const i=e.states[t],s=i?.attributes?.area_id,o=i?.attributes?.area;return s===n||o===n});t.length&&(s=t)}const o=t?.entities?.presence?.entity||t?.presence_entity;return o&&!s.includes(o)&&s.push(o),pe&&console.info("[AutoDiscovery][presence candidates]",{area:n,count:s.length,sample:s.slice(0,8)}),s}(e,t);i.length&&(s.entity=i[0])}return{...t,entities:i}}function ue(e,t,i,s=!1){const n=t.auto_discovery_sections||{},o="area"===i,a=i&&i.startsWith("auto_discovery_sections.");if(!o&&!a)return t;let r=t;return n.sensor&&(r=function(e,t){const i=["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6"],s={...t.entities||{}},n=new Set(i.map(e=>s[e]?.entity_id).filter(Boolean));for(const o of i){const i=s[o]||(s[o]={});if(i.entity_id)continue;const a=ce(e,t,{section:"sensor",type:i.type||""}),r=de(a,n);r&&(i.entity_id=r,n.add(r))}return{...t,entities:s}}(e,r)),n.mushroom&&(r=function(e,t){const i={...t.entities||{}},s=new Set(["climate","camera","entities1","entities2","entities3","entities4","entities5"].map(e=>i[e]?.entity).filter(Boolean)),n=ce(e,t,"mushroom"),o=i.climate||(i.climate={});if(!o.entity){const e=n.find(e=>e.startsWith("climate.")&&!s.has(e));e&&(o.entity=e,s.add(e))}const a=i.camera||(i.camera={});if(!a.entity){const e=n.find(e=>e.startsWith("camera.")&&!s.has(e));e&&(a.entity=e,s.add(e))}for(const e of["entities1","entities2","entities3","entities4","entities5"]){const t=i[e]||(i[e]={});if(t.entity)continue;const o=de(n,s);o&&(t.entity=o,s.add(o))}return{...t,entities:i}}(e,r)),n.subbutton&&(r=function(e,t){const i=["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"],s={...t.entities||{}},n=new Set(i.map(e=>s[e]?.entity).filter(Boolean)),o=ce(e,t,"subbutton");for(const e of i){const t=s[e]||(s[e]={});if(t.entity)continue;const i=de(o,n);i&&(t.entity=i,n.add(i))}return{...t,entities:s}}(e,r)),n.presence&&(r=he(e,r)),s&&"undefined"!=typeof window&&window.__BUBBLE_DEBUG__&&console.info("[AutoDiscovery] applied after",i,{sections:n}),r}class be extends oe{static properties={value:{type:Array},allowed:{type:Array}};constructor(){super(),this.value=[],this.allowed=[]}static styles=o`
    mwc-chip {
      margin: 4px;
    }
  `;_toggle(e){const t=new Set(this.value);t.has(e)?t.delete(e):t.add(e),this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:Array.from(t)},bubbles:!0,composed:!0}))}render(){return this.allowed?.length?D`
      <mwc-chip-set choice>
        ${this.allowed.map(e=>D`
          <mwc-chip
            .label=${re[e]??e}
            ?selected=${this.value.includes(e)}
            @click=${()=>this._toggle(e)}
          ></mwc-chip>
        `)}
      </mwc-chip-set>
    `:D``}}customElements.define("filter-chips",be);const me=["presence","motion","occupancy","light","switch","fan"];class ge extends oe{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean}};constructor(){super(),this.hass={},this.config={},this._expanded=!1}updated(e){(e.has("config")||e.has("hass"))&&(ue(this.hass,this.config,"area"),ue(this.hass,this.config,"auto_discovery_sections.presence"))}static styles=o`
    :host { display: block; }

    /* Glass panel */
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      border: none;
      --glass-bg: rgba(73,164,255,0.38);
      --glass-shadow: 0 2px 24px 0 rgba(50,180,255,0.25);
      --glass-sheen: linear-gradient(
        120deg,
        rgba(255,255,255,0.26),
        rgba(255,255,255,0.11) 70%,
        transparent 100%
      );
      background: var(--glass-bg);
      box-shadow: var(--glass-shadow);
    }
    .glass-panel::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen);
      pointer-events: none;
    }
    .glass-header {
      position: relative;
      z-index: 1;
      padding: 22px 0 18px;
      margin: 0;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
    }

    /* Mini-pill */
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px 0 rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin-bottom: 18px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      padding: 15px 22px;
      font-size: 1.09em;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      color: #55afff;
      user-select: none;
    }
    .mini-pill-content {
      padding: 15px 22px;
    }

    /* Input group */
    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius: 18px;
      margin-bottom: 13px;
      padding: 14px 18px 10px;
    }
    .ad-top {
      margin: 0 16px 14px;
    }
    label {
      display: block;
      font-size: 1.13rem;
      font-weight: 700;
      color: #55afff;
      margin-bottom: 6px;
    }
    ha-selector,
    ha-icon-picker {
      display: block;
      width: 100%;
      min-height: 56px;
      box-sizing: border-box;
    }
    ha-selector::part(combobox) {
      min-height: 56px;
    }

    /* Reset button */
    .reset-button {
      border: 2px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 12px;
      padding: 8px 16px;
      background: transparent;
      cursor: pointer;
    }

    /* Tap/Hold action pills */
    .pill-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 6px;
    }
    .pill-button {
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid #555;
      cursor: pointer;
    }
    .pill-button.active {
      border-color: #55afff;
      color: #55afff;
    }

    /* Vaadin overlay fix */
    vaadin-combo-box-overlay,
    vaadin-combo-box-item,
    vaadin-combo-box-item::part(content) {
      color: var(--primary-text-color, #eaeef8) !important;
    }
  `;render(){const e=this.config,t=e.area||"",i=e.name||"",s=e.icon||"",n=e.entities?.presence?.entity||e.presence_entity||"",o=e.auto_discovery_sections?.presence??!1,a=e.presence_filters??[...me],r=ce(this.hass,this.config,"presence",a);return D`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e=>this._expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>

        <!-- Auto-discover -->
        <div class="input-group ad-top">
          <label style="display:flex;align-items:center;gap:8px;margin:0;">
            <input
              type="checkbox"
              .checked=${o}
              @change=${e=>this._emit("auto_discovery_sections.presence",e.target.checked)}
            />
            <span>🔍 Auto-discover Presence</span>
          </label>
        </div>

        <!-- Room name & Area -->
        <div class="mini-pill">
          <div class="mini-pill-header">Room</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room name:</label>
              <input
                type="text"
                .value=${i}
                @input=${e=>this._fire("name",e.target.value)}
              />
            </div>
            <div class="input-group">
              <label>Area:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${t}
                .selector=${{area:{}}}
                @value-changed=${this._onAreaChanged}
              ></ha-selector>
            </div>
          </div>
        </div>

        <!-- Icon & Presence + Chips -->
        <div class="mini-pill">
          <div class="mini-pill-header">Icon & Presence</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${s}
                allow-custom-icon
                @value-changed=${e=>this._fire("icon",e.detail.value)}
              ></ha-icon-picker>
            </div>

            <div class="input-group">
              <label>Filtra per categoria:</label>
              <filter-chips
                .value=${a}
                .allowed=${me}
                @value-changed=${e=>this._fire("presence_filters",e.detail.value)}
              ></filter-chips>
            </div>

            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${n}
                .selector=${{entity:{multiple:!1,include_entities:r}}}
                allow-custom-entity
                @value-changed=${e=>this._emit("entities.presence.entity",e.detail.value)}
              ></ha-selector>
            </div>

            ${this._renderActions("tap")}
            ${this._renderActions("hold")}
          </div>
        </div>

        <!-- Reset -->
        <div style="text-align:center;margin-top:1.2em;">
          <button class="reset-button" @click=${this._resetRoom}>🧹 Reset Room</button>
        </div>
      </ha-expansion-panel>
    `}_onAreaChanged=e=>{const t=e.detail.value;this._fire("area",t),t&&this._emit("auto_discovery_sections.presence",!0)};_renderActions(e){const t=this.config?.[`${e}_action`]||{};return D`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(i=>D`
            <paper-button
              class="pill-button ${t.action===i?"active":""}"
              @click=${()=>this._fire(`${e}_action.action`,i)}
            >${i}</paper-button>
          `)}
        </div>

        ${"navigate"===t.action?D`
          <input
            type="text"
            placeholder="Path"
            .value=${t.navigation_path||""}
            @input=${t=>this._fire(`${e}_action.navigation_path`,t.target.value)}
          />
        `:""}

        ${"call-service"===t.action?D`
          <input
            type="text"
            placeholder="service: domain.service_name"
            .value=${t.service||""}
            @input=${t=>this._fire(`${e}_action.service`,t.target.value)}
          />
          <input
            type="text"
            placeholder='service_data (JSON)'
            .value=${t.service_data?JSON.stringify(t.service_data):""}
            @input=${t=>{let i=t.target.value;try{i=i?JSON.parse(i):void 0}catch{i=void 0}this._fire(`${e}_action.service_data`,i)}}
          />
        `:""}
      </div>
    `}_resetRoom(){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"__panel_cmd__",val:{cmd:"reset",section:"room"}},bubbles:!0,composed:!0}))}_emit(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}_fire(e,t){this._emit(e,t)}}customElements.define("room-panel",ge);class fe extends oe{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean},_expandedSensors:{type:Array}};constructor(){super(),customElements.get("ha-entity-picker")||customElements.whenDefined("ha-entity-picker").then(()=>this.requestUpdate()),this.hass={},this.config={},this._expanded=!1,this._expandedSensors=Array(6).fill(!1)}static styles=o`
    :host { display:block; }
    .glass-panel{
      margin:0!important; width:100%; box-sizing:border-box; border-radius:40px;
      background: var(--glass-bg, rgba(80,235,175,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px 0 rgba(40,220,145,0.18));
      position:relative; border:none;
    }
    .glass-header{
      position:relative; padding:22px 0 18px; text-align:center;
      font-size:1.12rem; font-weight:700; color:#fff;
    }
    .mini-pill{
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius: 24px; margin-bottom: 13px; overflow:hidden;
    }
    .mini-pill-header{
      display:flex; align-items:center; gap:14px; padding:15px 22px;
      font-size:1.02rem; font-weight:800; color:#36e6a0; cursor:pointer;
    }
    .chevron{ margin-left:auto; opacity:.64; transition:transform .18s; }
    .mini-pill.expanded .chevron{ transform: rotate(90deg); }
    .mini-pill-content{ padding:15px 22px; }
    .input-group{
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      border-radius:18px; margin-bottom: 13px; padding: 14px 18px 10px;
    }
    label{ display:block; margin-bottom:6px; color:#36e6a0; font-weight:700; }
    .reset-button{
      border:2px solid #ff4c6a; color:#ff4c6a; border-radius:12px; padding:8px 16px;
      background:transparent; cursor:pointer;
    }
  
/* Ensure HA pickers are visible and not collapsed */
ha-entity-picker,
ha-icon-picker,
ha-area-picker,
ha-device-picker,
ha-select {
  display: block;
  width: 100%;
  min-height: 56px;
  box-sizing: border-box;
}
/* Best-effort vaadin parts */
ha-entity-picker::part(input),
ha-entity-picker::part(text-field),
ha-entity-picker::part(combobox) {
  min-height: 56px;
}
`;render(){const e=this.config?.auto_discovery_sections?.sensor||!1;return D`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e=>this._expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">🌡️ Sensors</div>

        <div class="input-group" style="margin:0 16px 14px;">
          <label style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox"
              .checked=${e}
              @change=${e=>this._fire("auto_discovery_sections.sensor",e.target.checked)}>
            <span>🪄 Auto-discovery</span>
          </label>
        </div>

        ${["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6"].map((e,t)=>this._renderSingle(t,e))}

        <div style="text-align:center; margin-top:1.2em; padding-bottom:16px;">
          <button class="reset-button" @click=${this._resetAll}>🧹 Reset Sensors</button>
        </div>
      </ha-expansion-panel>
    `}_renderSingle(e,t){const i=this.config?.entities?.[t]||{},s=!!this._expandedSensors[e],n=i.type?`Sensor ${e+1} – ${i.type}`:`Sensor ${e+1}`,o=`entities.${t}.type`,a=`entities.${t}.entity_id`,r=i.type||"",l=i.entity_id||"",c=ce(this.hass,this.config,{section:"sensor",type:r});return D`
      <div class="mini-pill ${s?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._toggleOne(e)}>
          ${n}
          <span class="chevron">${s?"▼":"▶"}</span>
        </div>
        ${s?D`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Sensor Type</label>
              <select .value=${r} @change=${e=>this._fire(o,e.target.value)}>
                <option value="">-- none --</option>
                <option value="temperature">🌡️ Temperature</option>
                <option value="humidity">💧 Humidity</option>
                <option value="pressure">🔽 Pressure</option>
                <option value="generic">🔎 Generic</option>
              </select>
            </div>

            <div class="input-group">
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${l}
                .includeEntities=${c}
                allow-custom-entity
                @value-changed=${e=>this._fire(a,e.detail.value)}
              ></ha-entity-picker>
            </div>

            ${this._renderUnit(e,r,i.unit)}
          </div>
        `:""}
      </div>
    `}_renderUnit(e,t,i){const s=`entities.sensor${e+1}.unit`;let n=[];return"temperature"===t?n=["°C","°F","K"]:"humidity"===t?n=["%"]:"pressure"===t&&(n=["hPa","mbar","bar","psi"]),D`
      <div class="input-group">
        <label>Unit</label>
        <select .value=${i||n[0]||""}
                @change=${e=>this._fire(s,e.target.value)}>
          ${n.map(e=>D`<option value=${e}>${e}</option>`)}
        </select>
      </div>
    `}_toggleOne(e){this._expandedSensors=this._expandedSensors.map((t,i)=>i===e),this.requestUpdate()}_resetAll(){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"__panel_cmd__",val:{cmd:"reset",section:"sensor"}},bubbles:!0,composed:!0}))}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}}customElements.define("sensors-panel",fe);const ve=!!window.__BUBBLE_DEBUG__;class xe extends oe{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean},_expandedItems:{type:Array}};constructor(){super(),customElements.get("ha-entity-picker")||customElements.whenDefined("ha-entity-picker").then(()=>this.requestUpdate()),this.hass={},this.config={},this._expanded=!1,this._expandedItems=Array(7).fill(!1)}setConfig(e){this.config=e}getConfig(){return this.config}static styles=o`
    :host { display: block; }
    .glass-panel {
      margin: 0!important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      background: var(--glass-bg, rgba(80,235,175,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px 0 rgba(40,220,145,0.18));
      position: relative;
      border: none;
      --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.18),rgba(255,255,255,0.10) 70%,transparent 100%);
    }
    .glass-panel::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen);
      pointer-events: none;
      z-index: 0;
    }
    .glass-header {
      position: relative;
      z-index: 1;
      background: none!important;
      box-shadow: none!important;
      border-radius: 0!important;
      padding: 22px 0 18px;
      margin: 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      backdrop-filter: blur(7px) saturate(1.2);
      border-radius: 24px;
      margin-bottom: 13px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 15px 22px;
      font-size: 1.12rem;
      font-weight: 800;
      color: #36e6a0;
      letter-spacing: 0.03em;
      cursor: pointer;
      user-select: none;
      position: relative;
      z-index: 1;
      text-shadow: 0 2px 7px #0004;
      font-family: 'Inter', sans-serif;
    }
    .mini-pill-header .chevron {
      margin-left: auto;
      font-size: 1.22em;
      opacity: 0.64;
      transition: transform 0.18s;
    }
    .mini-pill.expanded .mini-pill-header .chevron {
      transform: rotate(90deg);
    }
    .mini-pill-content {
      padding: 15px 22px;
      background: transparent;
      position: relative;
      z-index: 1;
    }
    .autodiscover-box {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 18px;
      padding: 18px 0;
      font-size: 1.17rem;
      color: #fff;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-align: center;
      border: 1.5px solid #66baff!important;
      box-shadow: 0 4px 24px 0 rgba(73,164,255,0.26)!important;
      border-radius: 24px!important;
      transition: box-shadow 0.18s, border 0.18s;
      cursor: pointer;
      max-width: 88%;
    }
    .autodiscover-box:hover {
      border: 1.5px solid #4dabf7!important;
    }
    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius: 18px;
      margin-bottom: 13px;
      padding: 14px 18px 10px;
    }
    label {
      display: block;
      margin-bottom: 6px;
      font-size: 1.11rem;
      font-weight: 700;
      color: #36e6a0;
      letter-spacing: 0.03em;
      font-family: 'Inter', sans-serif;
    }
    input, select, ha-entity-picker, ha-icon-picker {
      width: 100%;
    }
    .reset-button {
      border: 3.5px solid #ff4c6a!important;
      color: #ff4c6a!important;
      font-size: 1.15rem;
      font-weight: 700;
      box-shadow: 0 2px 24px 0 #ff4c6a44;
      padding: 12px 38px!important;
      margin: 20px auto 0 auto!important;
      display: block;
      background: rgba(255,214,0,0.08);
      border-radius: 24px!important;
      transition: background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18)!important;
      color: #fff!important;
      border-color: #ff1744!important;
      box-shadow: 0 6px 32px 0 #ff4c6abf;
    }
  
/* Ensure HA pickers are visible and not collapsed */
ha-entity-picker,
ha-icon-picker,
ha-area-picker,
ha-device-picker,
ha-select {
  display: block;
  width: 100%;
  min-height: 56px;
  box-sizing: border-box;
}
/* Best-effort vaadin parts */
ha-entity-picker::part(input),
ha-entity-picker::part(text-field),
ha-entity-picker::part(combobox) {
  min-height: 56px;
}
`;render(){const e=this.config;return D`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e=>this._expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">🍄 Mushroom Entities</div>

        <div class="glass-content">
          <div
            class="autodiscover-box"
            @click=${()=>this._fire("auto_discovery_sections.mushroom",!e.auto_discovery_sections?.mushroom)}
          >
            <label>
              <input
                type="checkbox"
                .checked=${e.auto_discovery_sections?.mushroom||!1}
                @change=${e=>this._fire("auto_discovery_sections.mushroom",e.target.checked)}
                @click=${e=>e.stopPropagation()}
              />
              <span>🪄 Auto-discovery</span>
            </label>
          </div>

          ${["entities1","entities2","entities3","entities4","entities5","climate","camera"].map((e,t)=>this._renderSingle(t,e))}

          <button class="reset-button" @click=${this._resetAll}>🧹 Reset Mushroom Entities</button>
        </div>
      </ha-expansion-panel>
    `}_renderSingle(e,t){const i=this.config.entities?.[t]||{},s=this._expandedItems[e];return D`
      <div class="mini-pill ${s?"expanded":""}" @click=${()=>this._toggleOne(e)}>
        <div class="mini-pill-header">
          ${i.icon||"🔘"} ${i.label||"Entity "+(e+1)}
          <span class="chevron">${s?"▼":"▶"}</span>
        </div>

        ${s?D`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .includeEntities=${this._getMushroomCandidates()}
                .value=${i.entity||""}
                allow-custom-entity
                @value-changed=${e=>this._fire("entities."+t+".entity",e.detail.value)}
              ></ha-entity-picker>
            </div>

            <div class="input-group">
              <label>Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${i.icon||""}
                allow-custom-icon
                @value-changed=${e=>this._fire("entities."+t+".icon",e.detail.value)}
              ></ha-icon-picker>
            </div>

            ${this._renderActions("tap",t)}
            ${this._renderActions("hold",t)}
          </div>
        `:""}
      </div>
    `}_toggleOne(e){this._expandedItems=this._expandedItems.map((t,i)=>i===e),this.requestUpdate()}_renderActions(e,t){const i=(this.config.entities?.[t]||{})[e+"_action"]||{};return D`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(s=>D`
            <paper-button
              class="pill-button ${i.action===s?"active":""}"
              @click=${()=>this._fire("entities."+t+"."+e+"_action.action",s)}
            >${s}</paper-button>
          `)}
        </div>

        ${"navigate"===i.action?D`
          <input
            type="text"
            placeholder="Path"
            .value=${i.navigation_path||""}
            @input=${i=>this._fire("entities."+t+"."+e+"_action.navigation_path",i.target.value)}
          />
        `:""}
      </div>
    `}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}_resetAll(){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"__panel_cmd__",val:{cmd:"reset",section:"mushroom"}},bubbles:!0,composed:!0}))}_getMushroomCandidates(){const e=ce(this.hass,this.config,"mushroom");return ve&&console.info("[MushroomsPanel][Candidates]",{area:this.config?.area||null,count:e.length,sample:e.slice(0,8)}),e}}customElements.define("mushrooms-panel",xe);const _e=!!window.__BUBBLE_DEBUG__;class $e extends oe{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean},_expandedItems:{type:Array}};constructor(){super(),customElements.get("ha-entity-picker")||customElements.whenDefined("ha-entity-picker").then(()=>this.requestUpdate()),this.hass={},this.config={},this._expanded=!1,this._expandedItems=Array(6).fill(!1)}setConfig(e){this.config=e}getConfig(){return this.config}static styles=o`
    :host { display: block; }
    .glass-panel {
      margin: 0!important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      background: var(--glass-bg, rgba(80,235,175,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px 0 rgba(40,220,145,0.18));
      position: relative;
      border: none;
    }
    .glass-header {
      position: relative;
      z-index: 1;
      background: none!important;
      box-shadow: none!important;
      border-radius: 0!important;
      padding: 22px 0 18px;
      margin: 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      backdrop-filter: blur(7px) saturate(1.2);
      border-radius: 24px;
      margin-bottom: 13px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 15px 22px;
      font-size: 1.12rem;
      font-weight: 800;
      color: #36e6a0;
      letter-spacing: 0.03em;
      cursor: pointer;
      user-select: none;
      position: relative;
      z-index: 1;
      text-shadow: 0 2px 7px #0004;
      font-family: 'Inter', sans-serif;
    }
    .mini-pill-header .chevron {
      margin-left: auto;
      font-size: 1.22em;
      opacity: 0.64;
      transition: transform 0.18s;
    }
    .mini-pill.expanded .mini-pill-header .chevron { transform: rotate(90deg); }
    .mini-pill-content { padding: 15px 22px; background: transparent; position: relative; z-index: 1; }

    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius: 18px; margin-bottom: 13px; padding: 14px 18px 10px;
    }
    label {
      display: block; margin-bottom: 6px; font-size: 1.11rem;
      font-family: 'Inter', sans-serif; font-weight: 700; color: #36e6a0; letter-spacing: 0.03em;
    }
    input, select, ha-entity-picker, ha-icon-picker { width: 100%; }
    .reset-button {
      border: 3.5px solid #ff4c6a!important;
      color: #ff4c6a!important; font-size: 1.15rem; font-weight: 700;
      box-shadow: 0 2px 24px 0 #ff4c6a44; padding: 12px 38px!important;
      margin: 20px auto 0 auto!important; display: block;
      background: rgba(255,214,0,0.08); border-radius: 24px!important;
      transition: background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18)!important; color: #fff!important;
      border-color: #ff1744!important; box-shadow: 0 6px 32px 0 #ff4c6abf;
    }
  
/* Ensure HA pickers are visible and not collapsed */
ha-entity-picker,
ha-icon-picker,
ha-area-picker,
ha-device-picker,
ha-select {
  display: block;
  width: 100%;
  min-height: 56px;
  box-sizing: border-box;
}
/* Best-effort vaadin parts */
ha-entity-picker::part(input),
ha-entity-picker::part(text-field),
ha-entity-picker::part(combobox) {
  min-height: 56px;
}
`;render(){return D`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e=>this._expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">🔘 Sub Buttons</div>

        <div class="glass-content">
          ${["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"].map((e,t)=>this._renderSingle(t,e))}
          <button class="reset-button" @click=${this._resetAll}>🧹 Reset Sub Buttons</button>
        </div>
      </ha-expansion-panel>
    `}_renderSingle(e,t){const i=this.config.entities?.[t]||{},s=this._expandedItems[e];return D`
      <div class="mini-pill ${s?"expanded":""}" @click=${()=>this._toggleOne(e)}>
        <div class="mini-pill-header">
          ${i.icon||"🔘"} ${i.label||"Sub Button "+(e+1)}
          <span class="chevron">${s?"▼":"▶"}</span>
        </div>

        ${s?D`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .includeEntities=${this._getSubButtonCandidates()}
                .value=${i.entity||""}
                allow-custom-entity
                @value-changed=${e=>this._fire("entities."+t+".entity",e.detail.value)}
              ></ha-entity-picker>
            </div>

            <div class="input-group">
              <label>Label</label>
              <input
                type="text"
                .value=${i.label||""}
                @input=${e=>this._fire("entities."+t+".label",e.target.value)}
              />
            </div>

            <div class="input-group">
              <label>Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${i.icon||""}
                allow-custom-icon
                @value-changed=${e=>this._fire("entities."+t+".icon",e.detail.value)}
              ></ha-icon-picker>
            </div>

            ${this._renderActions("tap",t)}
            ${this._renderActions("hold",t)}
          </div>
        `:""}
      </div>
    `}_renderActions(e,t){const i=(this.config.entities?.[t]||{})[e+"_action"]||{};return D`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(s=>D`
            <paper-button
              class="pill-button ${i.action===s?"active":""}"
              @click=${()=>this._fire("entities."+t+"."+e+"_action.action",s)}
            >${s}</paper-button>
          `)}
        </div>
        ${"navigate"===i.action?D`
          <input
            type="text"
            placeholder="Path"
            .value=${i.navigation_path||""}
            @input=${i=>this._fire("entities."+t+"."+e+"_action.navigation_path",i.target.value)}
          />
        `:""}
      </div>
    `}_toggleOne(e){this._expandedItems=this._expandedItems.map((t,i)=>i===e),this.requestUpdate()}_resetAll(){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"__panel_cmd__",val:{cmd:"reset",section:"subbutton"}},bubbles:!0,composed:!0}))}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}_getSubButtonCandidates(){let e=[];try{e=ce(this.hass,this.config,"subbutton")}catch(t){const i=this.hass;if(!i||!i.states)return[];const s=new Set(["light","switch","media_player","fan","cover","humidifier","lock","scene","input_boolean","script","button"]);e=Object.keys(i.states||{}).filter(e=>s.has(e.split(".")[0]));const n=this.config?.area;if(n){const t=e.filter(e=>{const t=i.states[e],s=t?.attributes?.area_id,o=t?.attributes?.area;return s===n||o===n});t.length&&(e=t)}}return _e&&console.info("[SubButtonsPanel][Candidates]",{area:this.config?.area||null,count:e.length,sample:e.slice(0,8)}),e}}customElements.define("subbuttons-panel",$e);class ye extends oe{static properties={config:{type:Object},_expanded:{type:Boolean},_expandedColors:{type:Array}};constructor(){super(),this.config={},this._expanded=!1,this._expandedColors=[!1,!1]}static styles=o`
    /* glass-panel, mini-pill/header, input-group, color-row etc. */
  `;render(){return D`
      <ha-expansion-panel
        class="glass-panel"
        .expanded="${this._expanded}"
        @expanded-changed="${e=>this._expanded=e.detail.expanded}"
      >
        <div slot="header" class="glass-header">🎨 Colors</div>
        <div class="glass-content">
          ${this._renderColorPill(0,"Room","#55afff",[{label:"Background Active",field:"background_active"},{label:"Background Inactive",field:"background_inactive"},{label:"Icon Active",field:"icon_active"},{label:"Icon Inactive",field:"icon_inactive"}])}
          ${this._renderColorPill(1,"Subbutton","#b28fff",[{label:"Background On",field:"background_on"},{label:"Background Off",field:"background_off"},{label:"Icon On",field:"icon_on"},{label:"Icon Off",field:"icon_off"}])}
        </div>
      </ha-expansion-panel>
    `}_renderColorPill(e,t,i,s){return D`
      <div class="mini-pill ${this._expandedColors[e]?"expanded":""}" @click="${()=>this._expandedColors[e]=!this._expandedColors[e]}">
        <div class="mini-pill-header" style="--section-accent:${i}">${t}<span class="chevron">${this._expandedColors[e]?"▼":"▶"}</span></div>
        ${this._expandedColors[e]?D`
          <div class="mini-pill-content">
            ${s.map(e=>D`
              <div class="input-group color-row">
                <label>${e.label}</label>
                <input type="color"
                       .value="${this._toHex(this.config.colors[t.toLowerCase()]?.[e.field]||"#000")}"
                       @input="${i=>this._updateColor(t.toLowerCase(),e.field,i.target.value)}">
                <input type="range" min="0" max="1" step="0.01"
                       .value="${parseFloat((this.config.colors[t.toLowerCase()]?.[e.field]||"1").split(",").pop())}"
                       @input="${i=>this._updateColor(t.toLowerCase(),e.field,i.target.value,!0)}">
              </div>
            `)}
          </div>
        `:""}
      </div>
    `}_toHex(e){if(!e)return"#000000";if(e.startsWith("#"))return 7===e.length?e.slice(0,7):e;const t=/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(e);if(!t)return"#000000";const[i,s,n]=t.slice(1).map(e=>Math.max(0,Math.min(255,parseInt(e,10)||0)));return"#"+[i,s,n].map(e=>e.toString(16).padStart(2,"0")).join("")}_updateColor(e,t,i,s=!1){const n=this._toHex(i);this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${e}.${t}`,val:n},bubbles:!0,composed:!0}))}}customElements.define("colors-panel",ye);const we=!!window.__BUBBLE_DEBUG__;class Ae extends oe{static properties={hass:{type:Object},config:{type:Object}};constructor(){super(),this.hass={},this.config={}}setConfig(e){this.config={...e,sensors:Array.isArray(e.sensors)?e.sensors:[],mushrooms:Array.isArray(e.mushrooms)?e.mushrooms:[],subbuttons:Array.isArray(e.subbuttons)?e.subbuttons:[],colors:e.colors?e.colors:{room:{},subbutton:{}}}}getConfig(){return{...this.config}}render(){return D`
      <div class="editor-container">
        <room-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @panel-changed="${this._onPanelChanged}"
        ></room-panel>

        <sensors-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @panel-changed="${this._onPanelChanged}"
        ></sensors-panel>

        <mushrooms-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @panel-changed="${this._onPanelChanged}"
        ></mushrooms-panel>

        <subbuttons-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @panel-changed="${this._onPanelChanged}"
        ></subbuttons-panel>

        <colors-panel
          .config="${this.config}"
          @panel-changed="${this._onPanelChanged}"
        ></colors-panel>
      </div>
    `}_onPanelChanged(e){const{prop:t,val:i}=e.detail||{};if(!t)return;const s=this._mapLegacyPath(t);if(we&&console.info("[Editor][panel-changed]",{prop:t,mapped:s,val:i}),this._setByPath(this.config,s,i),this.config=ue(this.hass,this.config,t,we),"__panel_cmd__"===t&&i&&"reset"===i.cmd){const e=i.section;"sensor"===e&&(this.config=function(e){const t={...e.entities||{}};return["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6"].forEach(e=>delete t[e]),{...e,entities:t}}(this.config)),"mushroom"===e&&(this.config=function(e){const t={...e.entities||{}};return["entities1","entities2","entities3","entities4","entities5","climate","camera"].forEach(e=>delete t[e]),{...e,entities:t}}(this.config)),"subbutton"===e&&(this.config=function(e){const t={...e.entities||{}};return["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"].forEach(e=>delete t[e]),{...e,entities:t}}(this.config)),"room"===e&&(this.config=function(e){const t={...e.entities||{}};delete t.presence;const i={...e,entities:t};return delete i.name,delete i.icon,delete i.area,delete i.presence_entity,i}(this.config)),we&&console.info("[Reset]",e)}this.requestUpdate(),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.getConfig()},bubbles:!0,composed:!0}))}_mapLegacyPath(e){if(e&&e.startsWith("entities.")){const t=e.slice(9);let i=t.match(/^sensor(\d+)$/);return i?"sensors["+(parseInt(i[1],10)-1)+"]":(i=t.match(/^sub-button(\d+)$/),i?"subbuttons["+(parseInt(i[1],10)-1)+"]":(i=t.match(/^entities(\d+)$/),i?"mushrooms["+(parseInt(i[1],10)-1)+"]":"entities."+t))}return e}_setByPath(e,t,i){const s=t.replace(/\[(\d+)\]/g,".$1").split(".");let n=e;for(let e=0;e<s.length-1;e++){const t=s[e],i=/^\d+$/.test(s[e+1]);null==n[t]&&(n[t]=i?[]:{}),n=n[t]}n[s[s.length-1]]=i}static styles=o`
    :host {
      display: block;
      padding: 0;
      margin: 0;
    }
    .editor-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      box-sizing: border-box;
    }
  `}customElements.define("bubble-room-editor",Ae);var ke=Object.freeze({__proto__:null,BubbleRoomEditor:Ae});class Ee extends oe{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16"}static styles=o`
    :host {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
      pointer-events: auto;
    }
    .main-icon {
      font-size: 8.7em;       /* icona gigante! */
      opacity: 0.18;          /* molto trasparente */
      color: var(--icon-color, #173c16);
      transition: color 0.2s, opacity 0.2s;
      filter: drop-shadow(1px 1.5px 0px rgba(34,54,15,0.07));
      user-select: none;
      border: 2px solid #00bcd4 !important;
    }
    .main-icon.active {
      opacity: 0.26;
      filter: drop-shadow(2px 4px 6px rgba(33,223,115,0.07));
    }
    @media (max-width: 600px) {
      .main-icon {
        font-size: 5.7em;
      }
    }
  `;render(){const e=this.active?this.colorActive:this.colorInactive;return D`
      <ha-icon
        class="main-icon ${this.active?"active":""}"
        .icon="${this.icon}"
        style="--icon-color: ${e}"
        @click="${()=>this.dispatchEvent(new CustomEvent("main-icon-click"))}"
      ></ha-icon>
    `}}customElements.define("bubble-icon",Ee);class Se extends oe{static properties={entities:{type:Array},containerSize:{type:Object}};constructor(){super(),this.entities=[],this.containerSize={width:200,height:200}}static styles=o`
    .mushroom-container {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      border: 2px solid #d500f9 !important;
    }
    .mushroom-entity {
      position: absolute;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: rgba(23,60,22,0.13);
      box-shadow: 0 0 6px 0 rgba(40,80,46,0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.15em;
      cursor: pointer;
      pointer-events: auto;
      transition: color 0.18s, background 0.18s, box-shadow 0.16s;
      z-index: 2;
      user-select: none;
    }
    .mushroom-entity.active {
      background: #21df73;
      color: #fff !important;
      box-shadow: 0 0 12px 2px rgba(33,223,115,0.14);
      filter: brightness(1.18);
    }
  `;_entityRatios(){return[{x:.2,y:.09},{x:.54,y:.05},{x:.81,y:.33},{x:.82,y:.67},{x:.54,y:.92},{x:.2,y:.87}]}render(){const{width:e,height:t}=this.containerSize||{width:200,height:200},i=this._entityRatios();return D`
      <div class="mushroom-container" style="width:${e}px;height:${t}px;">
        ${this.entities.map((s,n)=>{const o=i[n]||{x:.5,y:.5},a=Math.round(o.x*e)-26+"px",r=Math.round(o.y*t)-26+"px";return D`
            <ha-icon
              class="mushroom-entity ${"on"===s.state?"active":""}"
              .icon="${s.icon}"
              style="left: ${a}; top: ${r}; color: ${s.color||"#888"}"
              @click="${()=>this.dispatchEvent(new CustomEvent("mushroom-entity-click",{detail:n}))}"
            ></ha-icon>
          `})}
      </div>
    `}}customElements.define("bubble-mushroom",Se);class Ce extends oe{static properties={name:{type:String},area:{type:String}};constructor(){super(),this.name="",this.area=""}static styles=o`
    .bubble-name {
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      text-transform: uppercase;
      letter-spacing: -0.03em;
      font-size: 3.9em;
      font-weight: 900;
      color: #173c16;
      line-height: 0.92em;
      width: 100%;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 0.13em;
      text-shadow: 1px 1.2px 0 rgba(34,54,15,0.08);
      /* Responsive: riduce su schermi piccoli */
      border: 2px solid #ffd600 !important;
    }
    .bubble-area {
      font-size: 0.47em;
      color: #66bbff;
      opacity: 0.6;
      margin-left: 0.45em;
      font-weight: 400;
    }
    @media (max-width: 480px) {
      .bubble-name {
        font-size: 2.2em;
      }
    }
  `;render(){return D`
      <div class="bubble-name">
        ${this.name}
        ${this.area?D`<span class="bubble-area">(${this.area})</span>`:""}
      </div>
    `}}customElements.define("bubble-name",Ce);class Oe extends oe{static properties={sensors:{type:Array}};static styles=o`
    .sensor-row {
      display: flex;
      gap: 18px;
      justify-content: flex-start;
      margin-bottom: 2px;
      margin-left: 2px;
      border: 2px solid #00e676 !important;
    }
    .sensor-pill {
      background: rgba(32,38,55,0.12);
      border-radius: 18px;
      padding: 0.27em 1.01em 0.27em 0.73em;
      display: flex;
      align-items: center;
      gap: 0.5em;
      font-size: 1.09em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      min-width: 52px;
      max-width: 132px;
      letter-spacing: 0.01em;
    }
    .sensor-icon {
      font-size: 1.14em;
      opacity: 0.81;
    }
    .sensor-label {
      opacity: 0.78;
      font-size: 0.98em;
      margin-right: 0.28em;
      font-weight: 600;
    }
    .sensor-value {
      font-weight: 700;
      font-size: 1.07em;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
    }
    .sensor-unit {
      opacity: 0.75;
      font-size: 0.89em;
      margin-left: 0.12em;
      font-weight: 600;
    }
  `;render(){const e=this.sensors?.slice(0,3)||[],t=this.sensors?.slice(3,6)||[];return D`
      <div class="sensor-row">
        ${e.map(e=>D`
          <div class="sensor-pill" style="color: ${e.color||"#e3f6ff"}">
            <ha-icon class="sensor-icon" .icon="${e.icon}"></ha-icon>
            <span class="sensor-label">${e.label||""}</span>
            <span class="sensor-value">${e.value??"--"}</span>
            <span class="sensor-unit">${e.unit||""}</span>
          </div>
        `)}
      </div>
      ${t.length?D`
        <div class="sensor-row">
          ${t.map(e=>D`
            <div class="sensor-pill" style="color: ${e.color||"#e3f6ff"}">
              <ha-icon class="sensor-icon" .icon="${e.icon}"></ha-icon>
              <span class="sensor-label">${e.label||""}</span>
              <span class="sensor-value">${e.value??"--"}</span>
              <span class="sensor-unit">${e.unit||""}</span>
            </div>
          `)}
        </div>
      `:""}
    `}}customElements.define("bubble-sensors",Oe);class Pe extends oe{static properties={subbuttons:{type:Array}};constructor(){super(),this.subbuttons=[]}static styles=o`
    .subbutton-column {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: flex-end;
      margin-top: 12px;
      margin-bottom: 8px;
      height: 100%;
      min-width: 96px;
      position: relative;
      border: 2px solid #e65100 !important;
    }
    .subbutton {
      background: #455a64;
      border-radius: 16px;
      width: 92px;
      height: 92px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
      transition: background 0.15s, box-shadow 0.15s;
      border: none;
      outline: none;
      position: relative;
      user-select: none;
    }
    .subbutton.active {
      background: #21df73;
      box-shadow: 0 2px 18px 0 rgba(33,223,115,0.18);
    }
    .subbutton-icon {
      font-size: 2.9em;
      opacity: 0.95;
      margin-bottom: 0.16em;
      color: #fff;
      transition: color 0.16s;
    }
    .subbutton.active .subbutton-icon {
      color: #fff700;
    }
    .subbutton-label {
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-size: 1.21em;
      color: #fff;
      opacity: 0.75;
      margin-top: 0.21em;
      letter-spacing: 0.02em;
      text-align: center;
      width: 92px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      pointer-events: none;
    }
    .subbutton.active .subbutton-label {
      color: #fff700;
      opacity: 1;
    }
  `;render(){return D`
      <div class="subbutton-column">
        ${this.subbuttons.map((e,t)=>D`
            <div
              class="subbutton ${e.active?"active":""}"
              @click="${()=>this.dispatchEvent(new CustomEvent("subbutton-click",{detail:t}))}"
              title="${e.label||""}"
              style="background:${e.active?e.colorOn||"#21df73":e.colorOff||"#455a64"};"
            >
              <ha-icon class="subbutton-icon" .icon="${e.icon}"></ha-icon>
              ${e.label?D`<span class="subbutton-label">${e.label}</span>`:""}
            </div>
          `)}
      </div>
    `}}customElements.define("bubble-subbutton",Pe);const ze={temperature:{icon:"mdi:thermometer",unit:"°C"},humidity:{icon:"mdi:water-percent",unit:"%"},co2:{icon:"mdi:molecule-co2",unit:"ppm"},lux:{icon:"mdi:brightness-5",unit:"lx"},uv:{icon:"mdi:weather-sunny-alert",unit:"UV"},pressure:{icon:"mdi:gauge",unit:"hPa"},noise:{icon:"mdi:volume-high",unit:"dB"},pm25:{icon:"mdi:blur",unit:"µg/m³"},pm10:{icon:"mdi:blur-linear",unit:"µg/m³"}};class Be extends oe{static properties={config:{type:Object},hass:{type:Object}};constructor(){super(),this.config={},this.hass={}}static getStubConfig(){return{type:"custom:bubble-room",name:"Salotto",area:"Zona Giorno",icon:"mdi:sofa",sensors:[{entity_id:"sensor.some_sensor1",type:"temperature",label:"Temperatura",color:"#e3f6ff"}],mushrooms:[{entity_id:"switch.lampada",icon:"mdi:lightbulb",color:"#ffeb3b"}],subbuttons:[{entity_id:"light.luce_tavolo",icon:"mdi:lamp",label:"Tavolo",colorOn:"#00d46d",colorOff:"#999"}],colors:{room:{background_active:"rgba(var(--color-green),1)",background_inactive:"rgba(var(--color-green),0.3)",icon_active:"orange",icon_inactive:"#80808055",mushroom_active:"rgba(var(--color-green),1)",mushroom_inactive:"#80808055"},subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return ke}),document.createElement("bubble-room-editor")}setConfig(e){this.config=e}static styles=o`
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 0;
      width: 100%;
      min-width: 360px;
      max-width: 740px;
      min-height: 312px;
      position: relative;
      background: transparent;
      border-radius: 38px;
      overflow: visible;
      border: 2px dashed yellow;
    }
    .main-area {
      position: relative;
      padding: 30px 0 18px 34px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 300px;
      z-index: 1;
    }
    .icon-mushroom-area {
      position: relative;
      width: 240px;
      height: 190px;
      margin-top: 12px;
      margin-left: -10px;
      margin-bottom: 12px;
    }
    .sidebar {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      padding: 28px 8px 8px 0;
      min-width: 120px;
      position: relative;
      z-index: 3;
    }
    @media (max-width: 600px) {
      .bubble-room-grid {
        min-width: 100vw;
        grid-template-columns: 1fr 90px;
        border-radius: 19px;
      }
    }
  `;render(){const e=this.config.icon||"mdi:sofa",t=this.config.colors?.room?.icon_active??this.config.icon_active??"#21df73",i=this.config.colors?.room?.icon_inactive??this.config.icon_inactive??"#173c16",s=this.config.name||"Room",n=this.config.area||"",o=this._getSensors(),a=this._getMushroomEntities(),r=this._getSubButtons();return D`
      <div class="bubble-room-grid">
        <div class="main-area">
          <bubble-sensors .sensors="${o}"></bubble-sensors>
          <bubble-name .name="${s}" .area="${n}"></bubble-name>
          <div class="icon-mushroom-area">
            <bubble-icon
              .icon="${e}"
              .active="${this._isMainIconActive()}"
              .colorActive="${t}"
              .colorInactive="${i}"
              @main-icon-click="${this._onMainIconClick}"
            ></bubble-icon>
            <bubble-mushroom
              .entities="${a}"
              .containerSize="${{width:240,height:190}}"
              @mushroom-entity-click="${this._onMushroomEntityClick}"
            ></bubble-mushroom>
          </div>
        </div>
        <div class="sidebar">
          <bubble-subbutton
            .subbuttons="${r}"
            @subbutton-click="${this._onSubButtonClick}"
          ></bubble-subbutton>
        </div>
      </div>
    `}_getSensors(){return(this.config.sensors||[]).map(e=>{return{icon:ze[e.type]?.icon||"mdi:help-circle",label:e.label||(t=e.type||"",t?t.charAt(0).toUpperCase()+t.slice(1):""),value:this.hass.states?.[e.entity_id]?.state??"--",unit:ze[e.type]?.unit||"",color:e.color||"#e3f6ff"};var t})}_getMushroomEntities(){const e=this.config.colors?.room?.mushroom_inactive??"#999";return(this.config.mushrooms||[]).map(t=>({icon:t.icon||"mdi:flash",state:this.hass.states?.[t.entity_id]?.state,color:t.color??e}))}_getSubButtons(){const e=this.config.colors?.subbutton?.background_on??"#00d46d",t=this.config.colors?.subbutton?.background_off??"#999";return(this.config.subbuttons||[]).map(i=>({icon:i.icon||"mdi:light-switch",active:"on"===this.hass.states?.[i.entity_id]?.state,colorOn:i.colorOn??e,colorOff:i.colorOff??t,label:i.label||""}))}_isMainIconActive(){return!!this.config.active}_onMainIconClick(){}_onMushroomEntityClick(e){}_onSubButtonClick(e){}}customElements.define("bubble-room",Be);export{Be as BubbleRoom};
