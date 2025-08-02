/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}}const o=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(s,e,i)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var r;const l=window,c=l.trustedTypes,d=c?c.emptyScript:"",p=l.reactiveElementPolyfillSupport,h={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},u=(e,t)=>t!==e&&(t==t||e==e),b={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:u},g="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const n=this[e];this[t]=s,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||b}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{t?i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):s.forEach(t=>{const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=b){var s;const n=this.constructor._$Ep(e,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:h).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,n=s._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=s.getPropertyOptions(n),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:h;this._$El=n,this[n]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;f[g]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:f}),(null!==(r=l.reactiveElementVersions)&&void 0!==r?r:l.reactiveElementVersions=[]).push("1.6.3");const v=window,x=v.trustedTypes,_=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,$="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,w="?"+y,A=`<${w}>`,k=document,E=()=>k.createComment(""),C=e=>null===e||"object"!=typeof e&&"function"!=typeof e,S=Array.isArray,P="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,B=/>/g,U=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,M=/^(?:script|style|textarea|title)$/i,R=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),H=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),T=new WeakMap,D=k.createTreeWalker(k,129,null,!1);function L(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(t):t}const F=(e,t)=>{const i=e.length-1,s=[];let n,o=2===t?"<svg>":"",a=O;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===O?"!--"===l[1]?a=z:void 0!==l[1]?a=B:void 0!==l[2]?(M.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=U):void 0!==l[3]&&(a=U):a===U?">"===l[0]?(a=null!=n?n:O,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?U:'"'===l[3]?j:I):a===j||a===I?a=U:a===z||a===B?a=O:(a=U,n=void 0);const p=a===U&&e[t+1].startsWith("/>")?" ":"";o+=a===O?i+A:c>=0?(s.push(r),i.slice(0,c)+$+i.slice(c)+y+p):i+y+(-2===c?(s.push(void 0),t):p)}return[L(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),s]};class V{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,o=0;const a=e.length-1,r=this.parts,[l,c]=F(e,t);if(this.el=V.createElement(l,i),D.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=D.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith($)||t.startsWith(y)){const i=c[o++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+$).split(y),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?Z:"?"===t[1]?Y:"@"===t[1]?Q:J})}else r.push({type:6,index:n})}for(const t of e)s.removeAttribute(t)}if(M.test(s.tagName)){const e=s.textContent.split(y),t=e.length-1;if(t>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],E()),D.nextNode(),r.push({type:2,index:++n});s.append(e[t],E())}}}else if(8===s.nodeType)if(s.data===w)r.push({type:2,index:n});else{let e=-1;for(;-1!==(e=s.data.indexOf(y,e+1));)r.push({type:7,index:n}),e+=y.length-1}n++}}static createElement(e,t){const i=k.createElement("template");return i.innerHTML=e,i}}function W(e,t,i=e,s){var n,o,a,r;if(t===H)return t;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const c=C(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,s)),void 0!==s?(null!==(a=(r=i)._$Co)&&void 0!==a?a:r._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(t=W(e,l._$AS(e,t.values),l,s)),t}class q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:k).importNode(i,!0);D.currentNode=n;let o=D.nextNode(),a=0,r=0,l=s[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new G(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new X(o,this,e)),this._$AV.push(t),l=s[++r]}a!==(null==l?void 0:l.index)&&(o=D.nextNode(),a++)}return D.currentNode=k,n}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class G{constructor(e,t,i,s){var n;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),C(e)?e===N||null==e||""===e?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==H&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>S(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==N&&C(this._$AH)?this._$AA.nextSibling.data=e:this.$(k.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,n="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=V.createElement(L(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(i);else{const e=new q(n,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=T.get(e.strings);return void 0===t&&T.set(e.strings,t=new V(e)),t}T(e){S(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new G(this.k(E()),this.k(E()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class J{constructor(e,t,i,s,n){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const n=this.strings;let o=!1;if(void 0===n)e=W(this,e,t,0),o=!C(e)||e!==this._$AH&&e!==H,o&&(this._$AH=e);else{const s=e;let a,r;for(e=n[0],a=0;a<n.length-1;a++)r=W(this,s[i+a],t,a),r===H&&(r=this._$AH[a]),o||(o=!C(r)||r!==this._$AH[a]),r===N?e=N:e!==N&&(e+=(null!=r?r:"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Z extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}}const K=x?x.emptyScript:"";class Y extends J{constructor(){super(...arguments),this.type=4}j(e){e&&e!==N?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class Q extends J{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=W(this,e,t,0))&&void 0!==i?i:N)===H)return;const s=this._$AH,n=e===N&&s!==N||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==N&&(s===N||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class X{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const ee=v.litHtmlPolyfillSupport;null==ee||ee(V,G),(null!==(m=v.litHtmlVersions)&&void 0!==m?m:v.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var te,ie;class se extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let a=o._$litPart$;if(void 0===a){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=a=new G(t.insertBefore(E(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return H}}se.finalized=!0,se._$litElement$=!0,null===(te=globalThis.litElementHydrateSupport)||void 0===te||te.call(globalThis,{LitElement:se});const ne=globalThis.litElementPolyfillSupport;null==ne||ne({LitElement:se}),(null!==(ie=globalThis.litElementVersions)&&void 0!==ie?ie:globalThis.litElementVersions=[]).push("3.3.3");const oe=(e=[])=>({includeDomains:["binary_sensor","light","switch","fan"],entityFilter:(t,i)=>{if(!e.length)return!1;const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return e.includes(s)}});function ae(e,t,i,s=[]){if(!e?.states)return[];let n=null;if("presence"===i&&(n=oe(s)),!n)return[];const o=Object.keys(e.states).filter(e=>n.includeDomains.includes(e.split(".")[0])).filter(t=>n.entityFilter(t,e));if((t?.auto_discovery_sections?.presence??!1)&&t?.area){const i=function(e,t){if(!e?.states||!t)return[];const i=e.entities??{},s=e.devices??{};return Object.keys(e.states).filter(n=>{const o=i[n];if(o?.area_id===t)return!0;const a=o?.device_id;if(a&&s[a]?.area_id===t)return!0;const r=e.states[n]?.attributes??{};return r.area_id===t||r.area===t})}(e,t.area);return o.filter(e=>i.includes(e))}return o}const re=!!window.__BUBBLE_DEBUG__,le=(e,t)=>e.find(e=>!t.has(e))||null;function ce(e,t){const i={...t.entities||{}},s=i.presence||(i.presence={});if(!s.entity){const i=function(e,t){if(!e||!e.states)return[];const i=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let s=Object.keys(e.states).filter(e=>i.has(e.split(".")[0]));s=s.filter(t=>{if("binary_sensor"!==t.split(".")[0])return!0;const i=e.states[t]?.attributes?.device_class;return["motion","occupancy","presence"].includes(i||"")});const n=t?.area;if(n){const t=s.filter(t=>{const i=e.states[t],s=i?.attributes?.area_id,o=i?.attributes?.area;return s===n||o===n});t.length&&(s=t)}const o=t?.entities?.presence?.entity||t?.presence_entity;return o&&!s.includes(o)&&s.push(o),re&&console.info("[AutoDiscovery][presence candidates]",{area:n,count:s.length,sample:s.slice(0,8)}),s}(e,t);i.length&&(s.entity=i[0])}return{...t,entities:i}}function de(e,t,i,s=!1){const n=t.auto_discovery_sections||{},o="area"===i,a=i&&i.startsWith("auto_discovery_sections.");if(!o&&!a)return t;let r=t;return n.sensor&&(r=function(e,t){const i=["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6"],s={...t.entities||{}},n=new Set(i.map(e=>s[e]?.entity_id).filter(Boolean));for(const o of i){const i=s[o]||(s[o]={});if(i.entity_id)continue;const a=ae(e,t,{section:"sensor",type:i.type||""}),r=le(a,n);r&&(i.entity_id=r,n.add(r))}return{...t,entities:s}}(e,r)),n.mushroom&&(r=function(e,t){const i={...t.entities||{}},s=new Set(["climate","camera","entities1","entities2","entities3","entities4","entities5"].map(e=>i[e]?.entity).filter(Boolean)),n=ae(e,t,"mushroom"),o=i.climate||(i.climate={});if(!o.entity){const e=n.find(e=>e.startsWith("climate.")&&!s.has(e));e&&(o.entity=e,s.add(e))}const a=i.camera||(i.camera={});if(!a.entity){const e=n.find(e=>e.startsWith("camera.")&&!s.has(e));e&&(a.entity=e,s.add(e))}for(const e of["entities1","entities2","entities3","entities4","entities5"]){const t=i[e]||(i[e]={});if(t.entity)continue;const o=le(n,s);o&&(t.entity=o,s.add(o))}return{...t,entities:i}}(e,r)),n.subbutton&&(r=function(e,t){const i=["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"],s={...t.entities||{}},n=new Set(i.map(e=>s[e]?.entity).filter(Boolean)),o=ae(e,t,"subbutton");for(const e of i){const t=s[e]||(s[e]={});if(t.entity)continue;const i=le(o,n);i&&(t.entity=i,n.add(i))}return{...t,entities:s}}(e,r)),n.presence&&(r=ce(e,r)),s&&"undefined"!=typeof window&&window.__BUBBLE_DEBUG__&&console.info("[AutoDiscovery] applied after",i,{sections:n}),r}const pe=["presence","motion","occupancy","light","switch","fan"];class he extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},activeFilters:{type:Array,state:!0}};static styles=o`
    :host { display: block; }

    /* Glass panel */
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      border: none;
      background: var(--glass-bg, rgba(73,164,255,0.38));
      box-shadow: var(--glass-shadow, 0 2px 24px 0 rgba(50,180,255,0.25));
    }
    .glass-panel::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen, linear-gradient(
        120deg,
        rgba(255,255,255,0.26),
        rgba(255,255,255,0.11) 70%,
        transparent 100%
      ));
      pointer-events: none;
    }
    .glass-header {
      position: relative;
      padding: 22px 0 18px;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }

    /* Mini-pill */
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin-bottom: 18px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      padding: 15px 22px;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      color: #55afff;
    }
    .mini-pill-content {
      padding: 15px 22px;
    }

    /* Input group */
    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 18px;
      margin-bottom: 13px;
      padding: 14px 18px 10px;
    }
    .ad-top { margin: 0 16px 14px; }
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
  `;constructor(){super(),this.hass={},this.config={},this.expanded=!1,this.activeFilters=[]}updated(e){(e.has("config")||e.has("hass"))&&(de(this.hass,this.config,"area"),de(this.hass,this.config,"auto_discovery_sections.presence"),e.has("config")&&Array.isArray(this.config.presence_filters)&&(this.activeFilters=[...this.config.presence_filters]))}_onAreaChanged(e){const t=e.detail.value;this._fire("area",t),t&&this._fire("auto_discovery_sections.presence",!0)}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}render(){const e=this.config,t=e.auto_discovery_sections?.presence??!1,i=e.area??"",s=e.name??"",n=e.icon??"",o=e.entities?.presence?.entity??e.presence_entity??"",a=this.activeFilters.length?this.activeFilters:e.presence_filters??[...pe],r=pe.map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1)})),l=ae(this.hass,this.config,"presence",a);return R`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${this._onExpandedChanged}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>

        <!-- 1️⃣ Auto-discover -->
        <div class="input-group ad-top">
          <label style="display:flex;align-items:center;gap:8px">
            <input
              type="checkbox"
              .checked=${t}
              @change=${e=>this._fire("auto_discovery_sections.presence",e.target.checked)}
            />🔍 Auto-discover Presence
          </label>
        </div>

        <!-- 2️⃣ Room name & Area -->
        <div class="mini-pill">
          <div class="mini-pill-header">Room</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room name:</label>
              <input
                type="text"
                .value=${s}
                @input=${e=>this._fire("name",e.target.value)}
              />
            </div>
            <div class="input-group">
              <label>Area:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${i}
                .selector=${{area:{}}}
                @value-changed=${this._onAreaChanged}
              ></ha-selector>
            </div>
          </div>
        </div>

        <!-- 3️⃣ Icon & Presence + Filtri -->
        <div class="mini-pill">
          <div class="mini-pill-header">Icon & Presence</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${n}
                allow-custom-icon
                @value-changed=${e=>this._fire("icon",e.detail.value)}
              ></ha-icon-picker>
            </div>
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${a}
                .selector=${{select:{multiple:!0,mode:"box",options:r}}}
                @value-changed=${e=>this._fire("presence_filters",e.detail.value)}
              ></ha-selector>
            </div>
            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${o}
                .selector=${{entity:{multiple:!1,include_entities:l}}}
                allow-custom-entity
                @value-changed=${e=>this._fire("entities.presence.entity",e.detail.value)}
              ></ha-selector>
            </div>

            ${this._renderActions("tap")}
            ${this._renderActions("hold")}
          </div>
        </div>

        <!-- 4️⃣ Reset -->
        <div style="text-align:center;margin-top:1.2em;">
          <button
            class="reset-button"
            @click=${()=>this._fire("__panel_cmd__",{cmd:"reset",section:"room"})}
          >🧹 Reset Room</button>
        </div>
      </ha-expansion-panel>
    `}_renderActions(e){const t=this.config?.[`${e}_action`]||{};return R`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(i=>R`
            <paper-button
              class="pill-button ${t.action===i?"active":""}"
              @click=${()=>this._fire(`${e}_action.action`,i)}
            >${i}</paper-button>
          `)}
        </div>

        ${"navigate"===t.action?R`
          <input
            type="text"
            placeholder="Path"
            .value=${t.navigation_path||""}
            @input=${t=>this._fire(`${e}_action.navigation_path`,t.target.value)}
          />
        `:""}

        ${"call-service"===t.action?R`
          <input
            type="text"
            placeholder="service: domain.service_name"
            .value=${t.service||""}
            @input=${t=>this._fire(`${e}_action.service`,t.detail.value)}
          />
          <input
            type="text"
            placeholder="service_data (JSON)"
            .value=${t.service_data?JSON.stringify(t.service_data):""}
            @input=${t=>{let i=t.target.value;try{i=i?JSON.parse(i):void 0}catch{i=void 0}this._fire(`${e}_action.service_data`,i)}}
          />
        `:""}
      </div>
    `}_onExpandedChanged(e){this.expanded=e.detail.expanded,this.dispatchEvent(new CustomEvent("expanded-changed",{detail:{expanded:e.detail.expanded},bubbles:!0,composed:!0}))}}customElements.define("room-panel",he);const ue={temperature:{label:"Temperature",emoji:"🌡️",icon:"mdi:thermometer",units:["°C","°F"]},humidity:{label:"Humidity",emoji:"💧",icon:"mdi:water-percent",units:["%"]},co2:{label:"CO₂",emoji:"🟢",icon:"mdi:molecule-co2",units:["ppm"]},lux:{label:"Luminosity",emoji:"🔆",icon:"mdi:brightness-5",units:["lx"]},uv:{label:"UV Index",emoji:"🌞",icon:"mdi:weather-sunny-alert",units:["UV"]},pressure:{label:"Pressure",emoji:"⏲️",icon:"mdi:gauge",units:["hPa"]},noise:{label:"Noise",emoji:"🔊",icon:"mdi:volume-high",units:["dB"]},pm25:{label:"PM2.5",emoji:"🌫️",icon:"mdi:blur",units:["µg/m³"]},pm10:{label:"PM10",emoji:"🌫️",icon:"mdi:blur-linear",units:["µg/m³"]}},be=["temperature","humidity","illuminance","pressure","pm25","pm10","uv","noise","co2"];class ge extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expandedIdx:{type:Number,state:!0},_filterTypes:{type:Array,state:!0},_selectedEnts:{type:Array,state:!0}};static styles=o`
    :host { display: block; }
    .glass-panel {
      position: relative;
      margin: 8px;
      border-radius: 24px;
      background: var(--glass-bg, rgba(167,255,175,0.22));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13));
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen, linear-gradient(
        120deg, rgba(255,255,255,0.11),
        rgba(255,255,255,0.07) 70%, transparent 100%
      ));
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.11rem;
      font-weight: 700;
      color: #fff;
    }
    .autodiscover-box {
      border: 2.5px solid #FFD600;
      box-shadow: 0 2px 24px #FFD60033;
      background: rgba(255,214,0,0.08);
      border-radius: 24px;
      display: flex; align-items: center; justify-content: center;
      margin: 0 16px 12px; padding: 14px 0;
      cursor: pointer; color: #fff; font-weight: 700; gap: 8px;
    }
    .autodiscover-box input { margin-right: 8px; }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      backdrop-filter: blur(7px) saturate(1.2);
      border-radius: 24px;
      margin: 8px 16px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex; align-items: center; padding: 12px 16px;
      cursor: pointer; user-select: none; font-weight: 700; color: #8cff8a;
    }
    .mini-pill-header .chevron {
      margin-left: auto; transition: transform 0.2s;
    }
    .mini-pill.expanded .mini-pill-header .chevron {
      transform: rotate(90deg);
    }
    .mini-pill-content {
      padding: 12px 16px 16px;
      animation: pill-expand 0.2s ease-out both;
    }
    @keyframes pill-expand {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .input-group { margin-bottom: 12px; }
    .input-group label {
      display: block; margin-bottom: 4px; font-weight: 600; color: #8cff8a;
    }
    ha-selector, select {
      width: 100%; box-sizing: border-box; padding: 6px 8px;
    }
    .preview {
      display: flex; align-items: center; gap: 12px; padding: 0 16px 16px;
    }
    .preview ha-icon { --mdc-icon-size: 32px; color: #fff; }
    .preview .state { font-size: 1.2rem; color: #fff; }
    .reset-button {
      border: 3.5px solid #ff4c6a;
      color: #ff4c6a;
      background: transparent;
      box-shadow: 0 2px 24px #ff4c6a44;
      border-radius: 24px;
      padding: 12px 38px; margin: 20px auto; display: block;
      font-size: 1.15rem; font-weight: 700; cursor: pointer;
      transition: background 0.18s, color 0.18s, border 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18);
      color: #fff;
      border-color: #ff1744;
      box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expandedIdx=-1,this._filterTypes=Array(6).fill(""),this._selectedEnts=Array(6).fill("")}updated(e){if(e.has("config")||e.has("hass")){de(this.hass,this.config,"auto_discovery_sections.sensor");const e=Array.isArray(this.config.sensor_filters)?this.config.sensor_filters:[];this._filterTypes=e.concat(Array(6)).slice(0,6);const t=this.config.entities?.sensor||{};this._selectedEnts=Array(6).fill(0).map((e,i)=>t[`sensor${i+1}`]?.entity||"")}}render(){const e=this.config.auto_discovery_sections?.sensor??!1;return R`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this._expandedIdx=-1,this._fire("panel-changed",{prop:"expanded",val:this.expanded})}}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <!-- Auto-discover -->
        <div class="autodiscover-box" @click=${()=>this._toggleAuto(!e)}>
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
            @click=${e=>e.stopPropagation()}
          />🪄 Auto-discover Sensor
        </div>

        <!-- Six mini-pills -->
        ${[...Array(6)].map((e,t)=>this._renderMini(t))}

        <!-- Reset -->
        <button class="reset-button" @click=${()=>this._resetAll()}>
          🧹 Reset Sensors
        </button>
      </ha-expansion-panel>
    `}_renderMini(e){const t=this._filterTypes[e]||"",i=this._selectedEnts[e]||"",s=this.hass.states[i],n=s?.state??"-",o=s?.attributes.unit_of_measurement||ue[t]?.units[0]||"",a=s?.attributes.icon||ue[t]?.icon||"mdi:thermometer",r=be.map(e=>({value:e,label:ue[e]?.label||e})),l=ae(this.hass,this.config,"sensor",t?[t]:[]);return R`
      <div class="mini-pill ${this._expandedIdx===e?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._toggleMini(e)}>
          Sensor ${e+1}<span class="chevron">▶</span>
        </div>
        ${this._expandedIdx===e?R`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Filter category:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${[t]}
                .selector=${{select:{multiple:!1,mode:"box",options:r}}}
                @value-changed=${t=>this._onFilterChanged(e,t.detail.value[0]||"")}
              ></ha-selector>
            </div>

            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${i}
                .selector=${{entity:{include_entities:l,multiple:!1}}}
                allow-custom-entity
                @value-changed=${t=>this._onEntityChanged(e,t.detail.value)}
              ></ha-selector>
            </div>

            <div class="preview">
              <ha-icon .icon=${a}></ha-icon>
              <div class="state">${n}${o?` ${o}`:""}</div>
            </div>
          </div>
        `:""}
      </div>
    `}_toggleAuto(e){const t={...this.config.auto_discovery_sections||{}};t.sensor=e,this.config={...this.config,auto_discovery_sections:t},this._fire("config-changed",this.config)}_toggleMini(e){this._expandedIdx=this._expandedIdx===e?-1:e,this.requestUpdate()}_onFilterChanged(e,t){this._filterTypes[e]=t,this.config={...this.config,sensor_filters:[...this._filterTypes]},this._fire("config-changed",this.config)}_onEntityChanged(e,t){this._selectedEnts[e]=t;const i={...this.config.entities?.sensor||{}};i[`sensor${e+1}`]={...i[`sensor${e+1}`]||{},entity:t},this.config={...this.config,entities:{...this.config.entities,sensor:i}},this._fire("config-changed",this.config)}_resetAll(){this.config={...this.config,sensor_filters:[],entities:{...this.config.entities,sensor:{}}},this._fire("config-changed",this.config)}_fire(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}}customElements.define("sensor-panel",ge);const fe=!!window.__BUBBLE_DEBUG__;class me extends se{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean},_expandedItems:{type:Array}};constructor(){super(),customElements.get("ha-entity-picker")||customElements.whenDefined("ha-entity-picker").then(()=>this.requestUpdate()),this.hass={},this.config={},this._expanded=!1,this._expandedItems=Array(7).fill(!1)}setConfig(e){this.config=e}getConfig(){return this.config}static styles=o`
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
`;render(){const e=this.config;return R`
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
    `}_renderSingle(e,t){const i=this.config.entities?.[t]||{},s=this._expandedItems[e];return R`
      <div class="mini-pill ${s?"expanded":""}" @click=${()=>this._toggleOne(e)}>
        <div class="mini-pill-header">
          ${i.icon||"🔘"} ${i.label||"Entity "+(e+1)}
          <span class="chevron">${s?"▼":"▶"}</span>
        </div>

        ${s?R`
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
    `}_toggleOne(e){this._expandedItems=this._expandedItems.map((t,i)=>i===e),this.requestUpdate()}_renderActions(e,t){const i=(this.config.entities?.[t]||{})[e+"_action"]||{};return R`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(s=>R`
            <paper-button
              class="pill-button ${i.action===s?"active":""}"
              @click=${()=>this._fire("entities."+t+"."+e+"_action.action",s)}
            >${s}</paper-button>
          `)}
        </div>

        ${"navigate"===i.action?R`
          <input
            type="text"
            placeholder="Path"
            .value=${i.navigation_path||""}
            @input=${i=>this._fire("entities."+t+"."+e+"_action.navigation_path",i.target.value)}
          />
        `:""}
      </div>
    `}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}_resetAll(){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"__panel_cmd__",val:{cmd:"reset",section:"mushroom"}},bubbles:!0,composed:!0}))}_getMushroomCandidates(){const e=ae(this.hass,this.config,"mushroom");return fe&&console.info("[MushroomPanel][Candidates]",{area:this.config?.area||null,count:e.length,sample:e.slice(0,8)}),e}}customElements.define("mushroom-panel",me);const ve=!!window.__BUBBLE_DEBUG__;class xe extends se{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean},_expandedItems:{type:Array}};constructor(){super(),customElements.get("ha-entity-picker")||customElements.whenDefined("ha-entity-picker").then(()=>this.requestUpdate()),this.hass={},this.config={},this._expanded=!1,this._expandedItems=Array(6).fill(!1)}setConfig(e){this.config=e}getConfig(){return this.config}static styles=o`
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
`;render(){return R`
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
    `}_renderSingle(e,t){const i=this.config.entities?.[t]||{},s=this._expandedItems[e];return R`
      <div class="mini-pill ${s?"expanded":""}" @click=${()=>this._toggleOne(e)}>
        <div class="mini-pill-header">
          ${i.icon||"🔘"} ${i.label||"Sub Button "+(e+1)}
          <span class="chevron">${s?"▼":"▶"}</span>
        </div>

        ${s?R`
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
    `}_renderActions(e,t){const i=(this.config.entities?.[t]||{})[e+"_action"]||{};return R`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(s=>R`
            <paper-button
              class="pill-button ${i.action===s?"active":""}"
              @click=${()=>this._fire("entities."+t+"."+e+"_action.action",s)}
            >${s}</paper-button>
          `)}
        </div>
        ${"navigate"===i.action?R`
          <input
            type="text"
            placeholder="Path"
            .value=${i.navigation_path||""}
            @input=${i=>this._fire("entities."+t+"."+e+"_action.navigation_path",i.target.value)}
          />
        `:""}
      </div>
    `}_toggleOne(e){this._expandedItems=this._expandedItems.map((t,i)=>i===e),this.requestUpdate()}_resetAll(){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"__panel_cmd__",val:{cmd:"reset",section:"subbutton"}},bubbles:!0,composed:!0}))}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}_getSubButtonCandidates(){let e=[];try{e=ae(this.hass,this.config,"subbutton")}catch(t){const i=this.hass;if(!i||!i.states)return[];const s=new Set(["light","switch","media_player","fan","cover","humidifier","lock","scene","input_boolean","script","button"]);e=Object.keys(i.states||{}).filter(e=>s.has(e.split(".")[0]));const n=this.config?.area;if(n){const t=e.filter(e=>{const t=i.states[e],s=t?.attributes?.area_id,o=t?.attributes?.area;return s===n||o===n});t.length&&(e=t)}}return ve&&console.info("[SubButtonPanel][Candidates]",{area:this.config?.area||null,count:e.length,sample:e.slice(0,8)}),e}}customElements.define("subbutton-panel",xe);class _e extends se{static properties={config:{type:Object},_expanded:{type:Boolean},_expandedColors:{type:Array}};constructor(){super(),this.config={},this._expanded=!1,this._expandedColors=[!1,!1]}static styles=o`
    /* glass-panel, mini-pill/header, input-group, color-row etc. */
  `;render(){return R`
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
    `}_renderColorPill(e,t,i,s){return R`
      <div class="mini-pill ${this._expandedColors[e]?"expanded":""}" @click="${()=>this._expandedColors[e]=!this._expandedColors[e]}">
        <div class="mini-pill-header" style="--section-accent:${i}">${t}<span class="chevron">${this._expandedColors[e]?"▼":"▶"}</span></div>
        ${this._expandedColors[e]?R`
          <div class="mini-pill-content">
            ${s.map(e=>R`
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
    `}_toHex(e){if(!e)return"#000000";if(e.startsWith("#"))return 7===e.length?e.slice(0,7):e;const t=/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(e);if(!t)return"#000000";const[i,s,n]=t.slice(1).map(e=>Math.max(0,Math.min(255,parseInt(e,10)||0)));return"#"+[i,s,n].map(e=>e.toString(16).padStart(2,"0")).join("")}_updateColor(e,t,i,s=!1){const n=this._toHex(i);this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${e}.${t}`,val:n},bubbles:!0,composed:!0}))}}customElements.define("color-panel",_e);class $e extends se{static properties={hass:{type:Object},config:{type:Object},openPanel:{type:String,state:!0}};static styles=o`
    :host {
      display: block;
      padding: 0;
      margin: 0;
      background: transparent;
    }
  `;constructor(){super(),this.hass={},this.config={},this.openPanel=""}setConfig(e){(e={...e}).auto_discovery_sections={room:!!e.area,sensor:!!e.area,mushroom:!!e.area,subbutton:!!e.area,color:!0,...e.auto_discovery_sections||{}},Array.isArray(e.sensor_filters)||(e.sensor_filters=[]),e.entities||(e.entities={}),e.colors||(e.colors={}),this.config=e}render(){return R`
      <room-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"room"===this.openPanel}
        @expanded-changed=${e=>this._togglePanel(e,"room")}
        @panel-changed=${this._onPanelChanged}
      ></room-panel>

      <sensor-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"sensor"===this.openPanel}
        @expanded-changed=${e=>this._togglePanel(e,"sensor")}
        @panel-changed=${this._onPanelChanged}
      ></sensor-panel>

      <mushroom-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"mushroom"===this.openPanel}
        @expanded-changed=${e=>this._togglePanel(e,"mushroom")}
        @panel-changed=${this._onPanelChanged}
      ></mushroom-panel>

      <sub-button-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"subbutton"===this.openPanel}
        @expanded-changed=${e=>this._togglePanel(e,"subbutton")}
        @panel-changed=${this._onPanelChanged}
      ></sub-button-panel>

      <color-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"color"===this.openPanel}
        @expanded-changed=${e=>this._togglePanel(e,"color")}
        @panel-changed=${this._onPanelChanged}
      ></color-panel>
    `}_togglePanel(e,t){e.detail.expanded?this.openPanel=t:this.openPanel===t&&(this.openPanel="")}_onPanelChanged(e){const{prop:t,val:i}=e.detail;this._updateConfig(t,i),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}_updateConfig(e,t){const i=e.split(".");let s=this.config;for(let e=0;e<i.length-1;e++){const t=i[e];void 0!==s[t]&&null!==s[t]||(s[t]={}),s=s[t]}s[i[i.length-1]]=t,this.config={...this.config}}}customElements.define("bubble-room-editor",$e);var ye=Object.freeze({__proto__:null,BubbleRoomEditor:$e});class we extends se{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16"}static styles=o`
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
  `;render(){const e=this.active?this.colorActive:this.colorInactive;return R`
      <ha-icon
        class="main-icon ${this.active?"active":""}"
        .icon="${this.icon}"
        style="--icon-color: ${e}"
        @click="${()=>this.dispatchEvent(new CustomEvent("main-icon-click"))}"
      ></ha-icon>
    `}}customElements.define("bubble-icon",we);class Ae extends se{static properties={entities:{type:Array},containerSize:{type:Object}};constructor(){super(),this.entities=[],this.containerSize={width:200,height:200}}static styles=o`
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
  `;_entityRatios(){return[{x:.2,y:.09},{x:.54,y:.05},{x:.81,y:.33},{x:.82,y:.67},{x:.54,y:.92},{x:.2,y:.87}]}render(){const{width:e,height:t}=this.containerSize||{width:200,height:200},i=this._entityRatios();return R`
      <div class="mushroom-container" style="width:${e}px;height:${t}px;">
        ${this.entities.map((s,n)=>{const o=i[n]||{x:.5,y:.5},a=Math.round(o.x*e)-26+"px",r=Math.round(o.y*t)-26+"px";return R`
            <ha-icon
              class="mushroom-entity ${"on"===s.state?"active":""}"
              .icon="${s.icon}"
              style="left: ${a}; top: ${r}; color: ${s.color||"#888"}"
              @click="${()=>this.dispatchEvent(new CustomEvent("mushroom-entity-click",{detail:n}))}"
            ></ha-icon>
          `})}
      </div>
    `}}customElements.define("bubble-mushroom",Ae);class ke extends se{static properties={name:{type:String},area:{type:String}};constructor(){super(),this.name="",this.area=""}static styles=o`
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
  `;render(){return R`
      <div class="bubble-name">
        ${this.name}
        ${this.area?R`<span class="bubble-area">(${this.area})</span>`:""}
      </div>
    `}}customElements.define("bubble-name",ke);class Ee extends se{static properties={sensors:{type:Array}};static styles=o`
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
  `;render(){const e=this.sensors?.slice(0,3)||[],t=this.sensors?.slice(3,6)||[];return R`
      <div class="sensor-row">
        ${e.map(e=>R`
          <div class="sensor-pill" style="color: ${e.color||"#e3f6ff"}">
            <ha-icon class="sensor-icon" .icon="${e.icon}"></ha-icon>
            <span class="sensor-label">${e.label||""}</span>
            <span class="sensor-value">${e.value??"--"}</span>
            <span class="sensor-unit">${e.unit||""}</span>
          </div>
        `)}
      </div>
      ${t.length?R`
        <div class="sensor-row">
          ${t.map(e=>R`
            <div class="sensor-pill" style="color: ${e.color||"#e3f6ff"}">
              <ha-icon class="sensor-icon" .icon="${e.icon}"></ha-icon>
              <span class="sensor-label">${e.label||""}</span>
              <span class="sensor-value">${e.value??"--"}</span>
              <span class="sensor-unit">${e.unit||""}</span>
            </div>
          `)}
        </div>
      `:""}
    `}}customElements.define("bubble-sensors",Ee);class Ce extends se{static properties={subbuttons:{type:Array}};constructor(){super(),this.subbuttons=[]}static styles=o`
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
  `;render(){return R`
      <div class="subbutton-column">
        ${this.subbuttons.map((e,t)=>R`
            <div
              class="subbutton ${e.active?"active":""}"
              @click="${()=>this.dispatchEvent(new CustomEvent("subbutton-click",{detail:t}))}"
              title="${e.label||""}"
              style="background:${e.active?e.colorOn||"#21df73":e.colorOff||"#455a64"};"
            >
              <ha-icon class="subbutton-icon" .icon="${e.icon}"></ha-icon>
              ${e.label?R`<span class="subbutton-label">${e.label}</span>`:""}
            </div>
          `)}
      </div>
    `}}customElements.define("bubble-subbutton",Ce);const Se={temperature:{icon:"mdi:thermometer",unit:"°C"},humidity:{icon:"mdi:water-percent",unit:"%"},co2:{icon:"mdi:molecule-co2",unit:"ppm"},lux:{icon:"mdi:brightness-5",unit:"lx"},uv:{icon:"mdi:weather-sunny-alert",unit:"UV"},pressure:{icon:"mdi:gauge",unit:"hPa"},noise:{icon:"mdi:volume-high",unit:"dB"},pm25:{icon:"mdi:blur",unit:"µg/m³"},pm10:{icon:"mdi:blur-linear",unit:"µg/m³"}};class Pe extends se{static properties={config:{type:Object},hass:{type:Object}};constructor(){super(),this.config={},this.hass={}}static getStubConfig(){return{type:"custom:bubble-room",name:"Salotto",area:"Zona Giorno",icon:"mdi:sofa",sensors:[{entity_id:"sensor.some_sensor1",type:"temperature",label:"Temperatura",color:"#e3f6ff"}],mushrooms:[{entity_id:"switch.lampada",icon:"mdi:lightbulb",color:"#ffeb3b"}],subbuttons:[{entity_id:"light.luce_tavolo",icon:"mdi:lamp",label:"Tavolo",colorOn:"#00d46d",colorOff:"#999"}],colors:{room:{background_active:"rgba(var(--color-green),1)",background_inactive:"rgba(var(--color-green),0.3)",icon_active:"orange",icon_inactive:"#80808055",mushroom_active:"rgba(var(--color-green),1)",mushroom_inactive:"#80808055"},subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return ye}),document.createElement("bubble-room-editor")}setConfig(e){this.config=e}static styles=o`
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
  `;render(){const e=this.config.icon||"mdi:sofa",t=this.config.colors?.room?.icon_active??this.config.icon_active??"#21df73",i=this.config.colors?.room?.icon_inactive??this.config.icon_inactive??"#173c16",s=this.config.name||"Room",n=this.config.area||"",o=this._getSensors(),a=this._getMushroomEntities(),r=this._getSubButtons();return R`
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
    `}_getSensors(){return(this.config.sensors||[]).map(e=>{return{icon:Se[e.type]?.icon||"mdi:help-circle",label:e.label||(t=e.type||"",t?t.charAt(0).toUpperCase()+t.slice(1):""),value:this.hass.states?.[e.entity_id]?.state??"--",unit:Se[e.type]?.unit||"",color:e.color||"#e3f6ff"};var t})}_getMushroomEntities(){const e=this.config.colors?.room?.mushroom_inactive??"#999";return(this.config.mushrooms||[]).map(t=>({icon:t.icon||"mdi:flash",state:this.hass.states?.[t.entity_id]?.state,color:t.color??e}))}_getSubButtons(){const e=this.config.colors?.subbutton?.background_on??"#00d46d",t=this.config.colors?.subbutton?.background_off??"#999";return(this.config.subbuttons||[]).map(i=>({icon:i.icon||"mdi:light-switch",active:"on"===this.hass.states?.[i.entity_id]?.state,colorOn:i.colorOn??e,colorOff:i.colorOff??t,label:i.label||""}))}_isMainIconActive(){return!!this.config.active}_onMainIconClick(){}_onMushroomEntityClick(e){}_onSubButtonClick(e){}}customElements.define("bubble-room",Pe);export{Pe as BubbleRoom};
//# sourceMappingURL=lovelace-bubble-room.js.map
