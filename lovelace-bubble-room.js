/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;class s{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=o.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(i,e))}return e}toString(){return this.cssText}}const r=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new s(o,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var a;const l=window,c=l.trustedTypes,d=c?c.emptyScript:"",h=l.reactiveElementPolyfillSupport,p={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},u=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:u},b="finalized";class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);void 0!==o&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const s=this[e];this[t]=o,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty(b))return!1;this[b]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var i;const o=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{t?i.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):o.forEach(t=>{const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=t.cssText,i.appendChild(o)})})(o,this.constructor.elementStyles),o}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=v){var o;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:p).toAttribute(t,i.type);this._$El=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,s=o._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=o.getPropertyOptions(s),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:p;this._$El=s,this[s]=r.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;m[b]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:m}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.3");const g=window,y=g.trustedTypes,_=y?y.createPolicy("lit-html",{createHTML:e=>e}):void 0,x="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,A=`<${w}>`,C=document,k=()=>C.createComment(""),E=e=>null===e||"object"!=typeof e&&"function"!=typeof e,S=Array.isArray,P="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,O=/>/g,R=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,T=/"/g,L=/^(?:script|style|textarea|title)$/i,U=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),M=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),H=new WeakMap,F=C.createTreeWalker(C,129,null,!1);function D(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(t):t}const j=(e,t)=>{const i=e.length-1,o=[];let s,r=2===t?"<svg>":"",n=I;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===I?"!--"===l[1]?n=z:void 0!==l[1]?n=O:void 0!==l[2]?(L.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=R):void 0!==l[3]&&(n=R):n===R?">"===l[0]?(n=null!=s?s:I,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?R:'"'===l[3]?T:B):n===T||n===B?n=R:n===z||n===O?n=I:(n=R,s=void 0);const h=n===R&&e[t+1].startsWith("/>")?" ":"";r+=n===I?i+A:c>=0?(o.push(a),i.slice(0,c)+x+i.slice(c)+$+h):i+$+(-2===c?(o.push(void 0),t):h)}return[D(e,r+(e[i]||"<?>")+(2===t?"</svg>":"")),o]};class V{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,r=0;const n=e.length-1,a=this.parts,[l,c]=j(e,t);if(this.el=V.createElement(l,i),F.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=F.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith(x)||t.startsWith($)){const i=c[r++];if(e.push(t),void 0!==i){const e=o.getAttribute(i.toLowerCase()+x).split($),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?Y:"?"===t[1]?Z:"@"===t[1]?X:K})}else a.push({type:6,index:s})}for(const t of e)o.removeAttribute(t)}if(L.test(o.tagName)){const e=o.textContent.split($),t=e.length-1;if(t>0){o.textContent=y?y.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],k()),F.nextNode(),a.push({type:2,index:++s});o.append(e[t],k())}}}else if(8===o.nodeType)if(o.data===w)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=o.data.indexOf($,e+1));)a.push({type:7,index:s}),e+=$.length-1}s++}}static createElement(e,t){const i=C.createElement("template");return i.innerHTML=e,i}}function G(e,t,i=e,o){var s,r,n,a;if(t===M)return t;let l=void 0!==o?null===(s=i._$Co)||void 0===s?void 0:s[o]:i._$Cl;const c=E(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,o)),void 0!==o?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(t=G(e,l._$AS(e,t.values),l,o)),t}class q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:C).importNode(i,!0);F.currentNode=s;let r=F.nextNode(),n=0,a=0,l=o[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new W(r,r.nextSibling,this,e):1===l.type?t=new l.ctor(r,l.name,l.strings,this,e):6===l.type&&(t=new Q(r,this,e)),this._$AV.push(t),l=o[++a]}n!==(null==l?void 0:l.index)&&(r=F.nextNode(),n++)}return F.currentNode=C,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class W{constructor(e,t,i,o){var s;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=null===(s=null==o?void 0:o.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),E(e)?e===N||null==e||""===e?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==M&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>S(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==N&&E(this._$AH)?this._$AA.nextSibling.data=e:this.$(C.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,s="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=V.createElement(D(o.h,o.h[0]),this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new q(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=H.get(e.strings);return void 0===t&&H.set(e.strings,t=new V(e)),t}T(e){S(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new W(this.k(k()),this.k(k()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class K{constructor(e,t,i,o,s){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const s=this.strings;let r=!1;if(void 0===s)e=G(this,e,t,0),r=!E(e)||e!==this._$AH&&e!==M,r&&(this._$AH=e);else{const o=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=G(this,o[i+n],t,n),a===M&&(a=this._$AH[n]),r||(r=!E(a)||a!==this._$AH[n]),a===N?e=N:e!==N&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}r&&!o&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Y extends K{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}}const J=y?y.emptyScript:"";class Z extends K{constructor(){super(...arguments),this.type=4}j(e){e&&e!==N?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class X extends K{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=G(this,e,t,0))&&void 0!==i?i:N)===M)return;const o=this._$AH,s=e===N&&o!==N||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,r=e!==N&&(o===N||s);s&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Q{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const ee=g.litHtmlPolyfillSupport;null==ee||ee(V,W),(null!==(f=g.litHtmlVersions)&&void 0!==f?f:g.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var te,ie;class oe extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var o,s;const r=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:t;let n=r._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;r._$litPart$=n=new W(t.insertBefore(k(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return M}}oe.finalized=!0,oe._$litElement$=!0,null===(te=globalThis.litElementHydrateSupport)||void 0===te||te.call(globalThis,{LitElement:oe});const se=globalThis.litElementPolyfillSupport;let re;null==se||se({LitElement:oe}),(null!==(ie=globalThis.litElementVersions)&&void 0!==ie?ie:globalThis.litElementVersions=[]).push("3.3.3");const ne=(e=[])=>({includeDomains:["binary_sensor","light","switch","fan"],entityFilter:(t,i)=>{if(!e.length)return!1;const[o]=t.split(".");if("binary_sensor"===o){const o=i.states[t]?.attributes?.device_class??"";return e.includes(o)}return e.includes(o)}});function ae(e,t,i,o=[]){if(!e?.states)return[];let s=null;if("presence"===i&&(s=ne(o)),!s)return[];const r=Object.keys(e.states).filter(e=>s.includeDomains.includes(e.split(".")[0])).filter(t=>s.entityFilter(t,e));if((t?.auto_discovery_sections?.presence??!1)&&t?.area){const i=function(e,t){if(!e?.states||!t)return[];const i=e.entities??{},o=e.devices??{};return Object.keys(e.states).filter(s=>{const r=i[s];if(r?.area_id===t)return!0;const n=r?.device_id;if(n&&o[n]?.area_id===t)return!0;const a=e.states[s]?.attributes??{};return a.area_id===t||a.area===t})}(e,t.area);return r.filter(e=>i.includes(e))}return r}const le=!!window.__BUBBLE_DEBUG__,ce=(e,t)=>e.find(e=>!t.has(e))||null;function de(e,t){const i={...t.entities||{}},o=i.presence||(i.presence={});if(!o.entity){const i=function(e,t){if(!e||!e.states)return[];const i=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let o=Object.keys(e.states).filter(e=>i.has(e.split(".")[0]));o=o.filter(t=>{if("binary_sensor"!==t.split(".")[0])return!0;const i=e.states[t]?.attributes?.device_class;return["motion","occupancy","presence"].includes(i||"")});const s=t?.area;if(s){const t=o.filter(t=>{const i=e.states[t],o=i?.attributes?.area_id,r=i?.attributes?.area;return o===s||r===s});t.length&&(o=t)}const r=t?.entities?.presence?.entity||t?.presence_entity;return r&&!o.includes(r)&&o.push(r),le&&console.info("[AutoDiscovery][presence candidates]",{area:s,count:o.length,sample:o.slice(0,8)}),o}(e,t);i.length&&(o.entity=i[0])}return{...t,entities:i}}function he(e,t,i,o=!1){const s=t.auto_discovery_sections||{},r="area"===i,n=i&&i.startsWith("auto_discovery_sections.");if(!r&&!n)return t;let a=t;return s.sensor&&(a=function(e,t){const i=["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6"],o={...t.entities||{}},s=new Set(i.map(e=>o[e]?.entity_id).filter(Boolean));for(const r of i){const i=o[r]||(o[r]={});if(i.entity_id)continue;const n=ae(e,t,{section:"sensor",type:i.type||""}),a=ce(n,s);a&&(i.entity_id=a,s.add(a))}return{...t,entities:o}}(e,a)),s.mushroom&&(a=function(e,t){const i={...t.entities||{}},o=new Set(["climate","camera","entities1","entities2","entities3","entities4","entities5"].map(e=>i[e]?.entity).filter(Boolean)),s=ae(e,t,"mushroom"),r=i.climate||(i.climate={});if(!r.entity){const e=s.find(e=>e.startsWith("climate.")&&!o.has(e));e&&(r.entity=e,o.add(e))}const n=i.camera||(i.camera={});if(!n.entity){const e=s.find(e=>e.startsWith("camera.")&&!o.has(e));e&&(n.entity=e,o.add(e))}for(const e of["entities1","entities2","entities3","entities4","entities5"]){const t=i[e]||(i[e]={});if(t.entity)continue;const r=ce(s,o);r&&(t.entity=r,o.add(r))}return{...t,entities:i}}(e,a)),s.subbutton&&(a=function(e,t){const i=["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"],o={...t.entities||{}},s=new Set(i.map(e=>o[e]?.entity).filter(Boolean)),r=ae(e,t,"subbutton");for(const e of i){const t=o[e]||(o[e]={});if(t.entity)continue;const i=ce(r,s);i&&(t.entity=i,s.add(i))}return{...t,entities:o}}(e,a)),s.presence&&(a=de(e,a)),o&&"undefined"!=typeof window&&window.__BUBBLE_DEBUG__&&console.info("[AutoDiscovery] applied after",i,{sections:s}),a}const pe=["presence","motion","occupancy","light","switch","fan"];class ue extends oe{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean},activeFilters:{type:Array,state:!0}};static styles=r`
    :host { display: block; }
    --md-filter-chip-container-shape: 16px;

    /* Glass panel */
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      border: none;
      --glass-bg: rgba(73,164,255,0.38);
      --glass-shadow: 0 2px 24px rgba(50,180,255,0.25);
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
      padding: 22px 0 18px;
      text-align: center;
      font-size: 1.2rem;
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
  `;constructor(){super(),this.hass={},this.config={},this._expanded=!1,this.activeFilters=[]}connectedCallback(){super.connectedCallback(),re||(re=(async()=>{try{customElements.get("md-filter-chip")||await Promise.resolve().then(function(){return Ct})}catch(e){console.warn("loadMaterialChips error:",e)}})())}updated(e){(e.has("config")||e.has("hass"))&&(he(this.hass,this.config,"area"),he(this.hass,this.config,"auto_discovery_sections.presence"),e.has("config")&&Array.isArray(this.config.presence_filters)&&(this.activeFilters=[...this.config.presence_filters]))}addFilter(e){this.activeFilters.includes(e)||(this.activeFilters=[...this.activeFilters,e])}removeFilter(e){this.activeFilters=this.activeFilters.filter(t=>t!==e)}toggleFilter(e){this.activeFilters.includes(e)?this.removeFilter(e):this.addFilter(e),this._fire("presence_filters",this.activeFilters)}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}_renderActions(e){const t=this.config?.[`${e}_action`]||{};return U`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(i=>U`
            <paper-button
              class="pill-button ${t.action===i?"active":""}"
              @click=${()=>this._fire(`${e}_action.action`,i)}
            >${i}</paper-button>
          `)}
        </div>

        ${"navigate"===t.action?U`
          <input
            type="text"
            placeholder="Path"
            .value=${t.navigation_path||""}
            @input=${t=>this._fire(`${e}_action.navigation_path`,t.target.value)}
          />
        `:""}

        ${"call-service"===t.action?U`
          <input
            type="text"
            placeholder="service: domain.service_name"
            .value=${t.service||""}
            @input=${t=>this._fire(`${e}_action.service`,t.target.value)}
          />
          <input
            type="text"
            placeholder="service_data (JSON)"
            .value=${t.service_data?JSON.stringify(t.service_data):""}
            @input=${t=>{let i=t.target.value;try{i=i?JSON.parse(i):void 0}catch{i=void 0}this._fire(`${e}_action.service_data`,i)}}
          />
        `:""}
      </div>
    `}render(){const e=this.config,t=e.auto_discovery_sections?.presence??!1,i=e.area??"",o=e.name??"",s=e.icon??"",r=this.activeFilters.length?this.activeFilters:e.presence_filters??[...pe],n=e.entities?.presence?.entity??e.presence_entity??"",a=ae(this.hass,this.config,"presence",r);return U`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e=>this._expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>

        <!-- AUTO-DISCOVER -->
        <div class="input-group ad-top">
          <label style="display:flex;align-items:center;gap:8px;margin:0;">
            <input
              type="checkbox"
              .checked=${t}
              @change=${e=>this._fire("auto_discovery_sections.presence",e.target.checked)}
            /><span>🔍 Auto-discover Presence</span>
          </label>
        </div>

        <!-- ROOM NAME & AREA -->
        <div class="mini-pill">
          <div class="mini-pill-header">Room</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room name:</label>
              <input
                type="text"
                .value=${o}
                @input=${e=>this._fire("name",e.target.value)}
              />
            </div>
            <div class="input-group">
              <label>Area:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${i}
                .selector=${{area:{}}}
                @value-changed=${e=>{const t=e.detail.value;this._fire("area",t),t&&this._fire("auto_discovery_sections.presence",!0)}}
              ></ha-selector>
            </div>
          </div>
        </div>

        <!-- ICON & PRESENCE + CHIPS -->
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
              <md-chip-set aria-label="Categorie di Presence" selectable>
                ${pe.map(e=>U`
                  <md-filter-chip
                    .label=${e}
                    ?selected=${this.activeFilters.includes(e)}
                    ?removable=${this.activeFilters.includes(e)}
                    @click=${()=>this.toggleFilter(e)}
                  ></md-filter-chip>
                `)}
              </md-chip-set>
            </div>

            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${n}
                .selector=${{entity:{multiple:!1,include_entities:a}}}
                allow-custom-entity
                @value-changed=${e=>this._fire("entities.presence.entity",e.detail.value)}
              ></ha-selector>
            </div>

            ${this._renderActions("tap")}
            ${this._renderActions("hold")}
          </div>
        </div>

        <!-- RESET -->
        <div style="text-align:center;margin-top:1.2em;">
          <button class="reset-button" @click=${()=>this._fire("__panel_cmd__",{cmd:"reset",section:"room"})}>
            🧹 Reset Room
          </button>
        </div>
      </ha-expansion-panel>
    `}}customElements.define("room-panel",ue);class ve extends oe{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean},_expandedSensors:{type:Array}};constructor(){super(),customElements.get("ha-entity-picker")||customElements.whenDefined("ha-entity-picker").then(()=>this.requestUpdate()),this.hass={},this.config={},this._expanded=!1,this._expandedSensors=Array(6).fill(!1)}static styles=r`
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
`;render(){const e=this.config?.auto_discovery_sections?.sensor||!1;return U`
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
    `}_renderSingle(e,t){const i=this.config?.entities?.[t]||{},o=!!this._expandedSensors[e],s=i.type?`Sensor ${e+1} – ${i.type}`:`Sensor ${e+1}`,r=`entities.${t}.type`,n=`entities.${t}.entity_id`,a=i.type||"",l=i.entity_id||"",c=ae(this.hass,this.config,{section:"sensor",type:a});return U`
      <div class="mini-pill ${o?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._toggleOne(e)}>
          ${s}
          <span class="chevron">${o?"▼":"▶"}</span>
        </div>
        ${o?U`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Sensor Type</label>
              <select .value=${a} @change=${e=>this._fire(r,e.target.value)}>
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
                @value-changed=${e=>this._fire(n,e.detail.value)}
              ></ha-entity-picker>
            </div>

            ${this._renderUnit(e,a,i.unit)}
          </div>
        `:""}
      </div>
    `}_renderUnit(e,t,i){const o=`entities.sensor${e+1}.unit`;let s=[];return"temperature"===t?s=["°C","°F","K"]:"humidity"===t?s=["%"]:"pressure"===t&&(s=["hPa","mbar","bar","psi"]),U`
      <div class="input-group">
        <label>Unit</label>
        <select .value=${i||s[0]||""}
                @change=${e=>this._fire(o,e.target.value)}>
          ${s.map(e=>U`<option value=${e}>${e}</option>`)}
        </select>
      </div>
    `}_toggleOne(e){this._expandedSensors=this._expandedSensors.map((t,i)=>i===e),this.requestUpdate()}_resetAll(){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"__panel_cmd__",val:{cmd:"reset",section:"sensor"}},bubbles:!0,composed:!0}))}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}}customElements.define("sensors-panel",ve);const be=!!window.__BUBBLE_DEBUG__;class me extends oe{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean},_expandedItems:{type:Array}};constructor(){super(),customElements.get("ha-entity-picker")||customElements.whenDefined("ha-entity-picker").then(()=>this.requestUpdate()),this.hass={},this.config={},this._expanded=!1,this._expandedItems=Array(7).fill(!1)}setConfig(e){this.config=e}getConfig(){return this.config}static styles=r`
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
`;render(){const e=this.config;return U`
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
    `}_renderSingle(e,t){const i=this.config.entities?.[t]||{},o=this._expandedItems[e];return U`
      <div class="mini-pill ${o?"expanded":""}" @click=${()=>this._toggleOne(e)}>
        <div class="mini-pill-header">
          ${i.icon||"🔘"} ${i.label||"Entity "+(e+1)}
          <span class="chevron">${o?"▼":"▶"}</span>
        </div>

        ${o?U`
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
    `}_toggleOne(e){this._expandedItems=this._expandedItems.map((t,i)=>i===e),this.requestUpdate()}_renderActions(e,t){const i=(this.config.entities?.[t]||{})[e+"_action"]||{};return U`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(o=>U`
            <paper-button
              class="pill-button ${i.action===o?"active":""}"
              @click=${()=>this._fire("entities."+t+"."+e+"_action.action",o)}
            >${o}</paper-button>
          `)}
        </div>

        ${"navigate"===i.action?U`
          <input
            type="text"
            placeholder="Path"
            .value=${i.navigation_path||""}
            @input=${i=>this._fire("entities."+t+"."+e+"_action.navigation_path",i.target.value)}
          />
        `:""}
      </div>
    `}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}_resetAll(){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"__panel_cmd__",val:{cmd:"reset",section:"mushroom"}},bubbles:!0,composed:!0}))}_getMushroomCandidates(){const e=ae(this.hass,this.config,"mushroom");return be&&console.info("[MushroomsPanel][Candidates]",{area:this.config?.area||null,count:e.length,sample:e.slice(0,8)}),e}}customElements.define("mushrooms-panel",me);const fe=!!window.__BUBBLE_DEBUG__;class ge extends oe{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean},_expandedItems:{type:Array}};constructor(){super(),customElements.get("ha-entity-picker")||customElements.whenDefined("ha-entity-picker").then(()=>this.requestUpdate()),this.hass={},this.config={},this._expanded=!1,this._expandedItems=Array(6).fill(!1)}setConfig(e){this.config=e}getConfig(){return this.config}static styles=r`
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
`;render(){return U`
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
    `}_renderSingle(e,t){const i=this.config.entities?.[t]||{},o=this._expandedItems[e];return U`
      <div class="mini-pill ${o?"expanded":""}" @click=${()=>this._toggleOne(e)}>
        <div class="mini-pill-header">
          ${i.icon||"🔘"} ${i.label||"Sub Button "+(e+1)}
          <span class="chevron">${o?"▼":"▶"}</span>
        </div>

        ${o?U`
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
    `}_renderActions(e,t){const i=(this.config.entities?.[t]||{})[e+"_action"]||{};return U`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(o=>U`
            <paper-button
              class="pill-button ${i.action===o?"active":""}"
              @click=${()=>this._fire("entities."+t+"."+e+"_action.action",o)}
            >${o}</paper-button>
          `)}
        </div>
        ${"navigate"===i.action?U`
          <input
            type="text"
            placeholder="Path"
            .value=${i.navigation_path||""}
            @input=${i=>this._fire("entities."+t+"."+e+"_action.navigation_path",i.target.value)}
          />
        `:""}
      </div>
    `}_toggleOne(e){this._expandedItems=this._expandedItems.map((t,i)=>i===e),this.requestUpdate()}_resetAll(){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"__panel_cmd__",val:{cmd:"reset",section:"subbutton"}},bubbles:!0,composed:!0}))}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}_getSubButtonCandidates(){let e=[];try{e=ae(this.hass,this.config,"subbutton")}catch(t){const i=this.hass;if(!i||!i.states)return[];const o=new Set(["light","switch","media_player","fan","cover","humidifier","lock","scene","input_boolean","script","button"]);e=Object.keys(i.states||{}).filter(e=>o.has(e.split(".")[0]));const s=this.config?.area;if(s){const t=e.filter(e=>{const t=i.states[e],o=t?.attributes?.area_id,r=t?.attributes?.area;return o===s||r===s});t.length&&(e=t)}}return fe&&console.info("[SubButtonsPanel][Candidates]",{area:this.config?.area||null,count:e.length,sample:e.slice(0,8)}),e}}customElements.define("subbuttons-panel",ge);class ye extends oe{static properties={config:{type:Object},_expanded:{type:Boolean},_expandedColors:{type:Array}};constructor(){super(),this.config={},this._expanded=!1,this._expandedColors=[!1,!1]}static styles=r`
    /* glass-panel, mini-pill/header, input-group, color-row etc. */
  `;render(){return U`
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
    `}_renderColorPill(e,t,i,o){return U`
      <div class="mini-pill ${this._expandedColors[e]?"expanded":""}" @click="${()=>this._expandedColors[e]=!this._expandedColors[e]}">
        <div class="mini-pill-header" style="--section-accent:${i}">${t}<span class="chevron">${this._expandedColors[e]?"▼":"▶"}</span></div>
        ${this._expandedColors[e]?U`
          <div class="mini-pill-content">
            ${o.map(e=>U`
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
    `}_toHex(e){if(!e)return"#000000";if(e.startsWith("#"))return 7===e.length?e.slice(0,7):e;const t=/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(e);if(!t)return"#000000";const[i,o,s]=t.slice(1).map(e=>Math.max(0,Math.min(255,parseInt(e,10)||0)));return"#"+[i,o,s].map(e=>e.toString(16).padStart(2,"0")).join("")}_updateColor(e,t,i,o=!1){const s=this._toHex(i);this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${e}.${t}`,val:s},bubbles:!0,composed:!0}))}}customElements.define("colors-panel",ye);const _e=!!window.__BUBBLE_DEBUG__;class xe extends oe{static properties={hass:{type:Object},config:{type:Object}};constructor(){super(),this.hass={},this.config={}}setConfig(e){this.config={...e,sensors:Array.isArray(e.sensors)?e.sensors:[],mushrooms:Array.isArray(e.mushrooms)?e.mushrooms:[],subbuttons:Array.isArray(e.subbuttons)?e.subbuttons:[],colors:e.colors?e.colors:{room:{},subbutton:{}}}}getConfig(){return{...this.config}}render(){return U`
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
    `}_onPanelChanged(e){const{prop:t,val:i}=e.detail||{};if(!t)return;const o=this._mapLegacyPath(t);if(_e&&console.info("[Editor][panel-changed]",{prop:t,mapped:o,val:i}),this._setByPath(this.config,o,i),this.config=he(this.hass,this.config,t,_e),"__panel_cmd__"===t&&i&&"reset"===i.cmd){const e=i.section;"sensor"===e&&(this.config=function(e){const t={...e.entities||{}};return["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6"].forEach(e=>delete t[e]),{...e,entities:t}}(this.config)),"mushroom"===e&&(this.config=function(e){const t={...e.entities||{}};return["entities1","entities2","entities3","entities4","entities5","climate","camera"].forEach(e=>delete t[e]),{...e,entities:t}}(this.config)),"subbutton"===e&&(this.config=function(e){const t={...e.entities||{}};return["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"].forEach(e=>delete t[e]),{...e,entities:t}}(this.config)),"room"===e&&(this.config=function(e){const t={...e.entities||{}};delete t.presence;const i={...e,entities:t};return delete i.name,delete i.icon,delete i.area,delete i.presence_entity,i}(this.config)),_e&&console.info("[Reset]",e)}this.requestUpdate(),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.getConfig()},bubbles:!0,composed:!0}))}_mapLegacyPath(e){if(e&&e.startsWith("entities.")){const t=e.slice(9);let i=t.match(/^sensor(\d+)$/);return i?"sensors["+(parseInt(i[1],10)-1)+"]":(i=t.match(/^sub-button(\d+)$/),i?"subbuttons["+(parseInt(i[1],10)-1)+"]":(i=t.match(/^entities(\d+)$/),i?"mushrooms["+(parseInt(i[1],10)-1)+"]":"entities."+t))}return e}_setByPath(e,t,i){const o=t.replace(/\[(\d+)\]/g,".$1").split(".");let s=e;for(let e=0;e<o.length-1;e++){const t=o[e],i=/^\d+$/.test(o[e+1]);null==s[t]&&(s[t]=i?[]:{}),s=s[t]}s[o[o.length-1]]=i}static styles=r`
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
  `}customElements.define("bubble-room-editor",xe);var $e=Object.freeze({__proto__:null,BubbleRoomEditor:xe});class we extends oe{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16"}static styles=r`
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
  `;render(){const e=this.active?this.colorActive:this.colorInactive;return U`
      <ha-icon
        class="main-icon ${this.active?"active":""}"
        .icon="${this.icon}"
        style="--icon-color: ${e}"
        @click="${()=>this.dispatchEvent(new CustomEvent("main-icon-click"))}"
      ></ha-icon>
    `}}customElements.define("bubble-icon",we);class Ae extends oe{static properties={entities:{type:Array},containerSize:{type:Object}};constructor(){super(),this.entities=[],this.containerSize={width:200,height:200}}static styles=r`
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
  `;_entityRatios(){return[{x:.2,y:.09},{x:.54,y:.05},{x:.81,y:.33},{x:.82,y:.67},{x:.54,y:.92},{x:.2,y:.87}]}render(){const{width:e,height:t}=this.containerSize||{width:200,height:200},i=this._entityRatios();return U`
      <div class="mushroom-container" style="width:${e}px;height:${t}px;">
        ${this.entities.map((o,s)=>{const r=i[s]||{x:.5,y:.5},n=Math.round(r.x*e)-26+"px",a=Math.round(r.y*t)-26+"px";return U`
            <ha-icon
              class="mushroom-entity ${"on"===o.state?"active":""}"
              .icon="${o.icon}"
              style="left: ${n}; top: ${a}; color: ${o.color||"#888"}"
              @click="${()=>this.dispatchEvent(new CustomEvent("mushroom-entity-click",{detail:s}))}"
            ></ha-icon>
          `})}
      </div>
    `}}customElements.define("bubble-mushroom",Ae);class Ce extends oe{static properties={name:{type:String},area:{type:String}};constructor(){super(),this.name="",this.area=""}static styles=r`
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
  `;render(){return U`
      <div class="bubble-name">
        ${this.name}
        ${this.area?U`<span class="bubble-area">(${this.area})</span>`:""}
      </div>
    `}}customElements.define("bubble-name",Ce);class ke extends oe{static properties={sensors:{type:Array}};static styles=r`
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
  `;render(){const e=this.sensors?.slice(0,3)||[],t=this.sensors?.slice(3,6)||[];return U`
      <div class="sensor-row">
        ${e.map(e=>U`
          <div class="sensor-pill" style="color: ${e.color||"#e3f6ff"}">
            <ha-icon class="sensor-icon" .icon="${e.icon}"></ha-icon>
            <span class="sensor-label">${e.label||""}</span>
            <span class="sensor-value">${e.value??"--"}</span>
            <span class="sensor-unit">${e.unit||""}</span>
          </div>
        `)}
      </div>
      ${t.length?U`
        <div class="sensor-row">
          ${t.map(e=>U`
            <div class="sensor-pill" style="color: ${e.color||"#e3f6ff"}">
              <ha-icon class="sensor-icon" .icon="${e.icon}"></ha-icon>
              <span class="sensor-label">${e.label||""}</span>
              <span class="sensor-value">${e.value??"--"}</span>
              <span class="sensor-unit">${e.unit||""}</span>
            </div>
          `)}
        </div>
      `:""}
    `}}customElements.define("bubble-sensors",ke);class Ee extends oe{static properties={subbuttons:{type:Array}};constructor(){super(),this.subbuttons=[]}static styles=r`
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
  `;render(){return U`
      <div class="subbutton-column">
        ${this.subbuttons.map((e,t)=>U`
            <div
              class="subbutton ${e.active?"active":""}"
              @click="${()=>this.dispatchEvent(new CustomEvent("subbutton-click",{detail:t}))}"
              title="${e.label||""}"
              style="background:${e.active?e.colorOn||"#21df73":e.colorOff||"#455a64"};"
            >
              <ha-icon class="subbutton-icon" .icon="${e.icon}"></ha-icon>
              ${e.label?U`<span class="subbutton-label">${e.label}</span>`:""}
            </div>
          `)}
      </div>
    `}}customElements.define("bubble-subbutton",Ee);const Se={temperature:{icon:"mdi:thermometer",unit:"°C"},humidity:{icon:"mdi:water-percent",unit:"%"},co2:{icon:"mdi:molecule-co2",unit:"ppm"},lux:{icon:"mdi:brightness-5",unit:"lx"},uv:{icon:"mdi:weather-sunny-alert",unit:"UV"},pressure:{icon:"mdi:gauge",unit:"hPa"},noise:{icon:"mdi:volume-high",unit:"dB"},pm25:{icon:"mdi:blur",unit:"µg/m³"},pm10:{icon:"mdi:blur-linear",unit:"µg/m³"}};const Pe=customElements.define;customElements.define=function(e,t,i){return console.groupCollapsed(`⟮define⟯ ${e}`),console.log("– constructor:",t),console.log("– call site:"),console.trace(),console.groupEnd(),Pe.call(this,e,t,i)};class Ie extends oe{static properties={config:{type:Object},hass:{type:Object}};constructor(){super(),this.config={},this.hass={}}static getStubConfig(){return{type:"custom:bubble-room",name:"Salotto",area:"Zona Giorno",icon:"mdi:sofa",sensors:[{entity_id:"sensor.some_sensor1",type:"temperature",label:"Temperatura",color:"#e3f6ff"}],mushrooms:[{entity_id:"switch.lampada",icon:"mdi:lightbulb",color:"#ffeb3b"}],subbuttons:[{entity_id:"light.luce_tavolo",icon:"mdi:lamp",label:"Tavolo",colorOn:"#00d46d",colorOff:"#999"}],colors:{room:{background_active:"rgba(var(--color-green),1)",background_inactive:"rgba(var(--color-green),0.3)",icon_active:"orange",icon_inactive:"#80808055",mushroom_active:"rgba(var(--color-green),1)",mushroom_inactive:"#80808055"},subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return $e}),document.createElement("bubble-room-editor")}setConfig(e){this.config=e}static styles=r`
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
  `;render(){const e=this.config.icon||"mdi:sofa",t=this.config.colors?.room?.icon_active??this.config.icon_active??"#21df73",i=this.config.colors?.room?.icon_inactive??this.config.icon_inactive??"#173c16",o=this.config.name||"Room",s=this.config.area||"",r=this._getSensors(),n=this._getMushroomEntities(),a=this._getSubButtons();return U`
      <div class="bubble-room-grid">
        <div class="main-area">
          <bubble-sensors .sensors="${r}"></bubble-sensors>
          <bubble-name .name="${o}" .area="${s}"></bubble-name>
          <div class="icon-mushroom-area">
            <bubble-icon
              .icon="${e}"
              .active="${this._isMainIconActive()}"
              .colorActive="${t}"
              .colorInactive="${i}"
              @main-icon-click="${this._onMainIconClick}"
            ></bubble-icon>
            <bubble-mushroom
              .entities="${n}"
              .containerSize="${{width:240,height:190}}"
              @mushroom-entity-click="${this._onMushroomEntityClick}"
            ></bubble-mushroom>
          </div>
        </div>
        <div class="sidebar">
          <bubble-subbutton
            .subbuttons="${a}"
            @subbutton-click="${this._onSubButtonClick}"
          ></bubble-subbutton>
        </div>
      </div>
    `}_getSensors(){return(this.config.sensors||[]).map(e=>{return{icon:Se[e.type]?.icon||"mdi:help-circle",label:e.label||(t=e.type||"",t?t.charAt(0).toUpperCase()+t.slice(1):""),value:this.hass.states?.[e.entity_id]?.state??"--",unit:Se[e.type]?.unit||"",color:e.color||"#e3f6ff"};var t})}_getMushroomEntities(){const e=this.config.colors?.room?.mushroom_inactive??"#999";return(this.config.mushrooms||[]).map(t=>({icon:t.icon||"mdi:flash",state:this.hass.states?.[t.entity_id]?.state,color:t.color??e}))}_getSubButtons(){const e=this.config.colors?.subbutton?.background_on??"#00d46d",t=this.config.colors?.subbutton?.background_off??"#999";return(this.config.subbuttons||[]).map(i=>({icon:i.icon||"mdi:light-switch",active:"on"===this.hass.states?.[i.entity_id]?.state,colorOn:i.colorOn??e,colorOff:i.colorOff??t,label:i.label||""}))}_isMainIconActive(){return!!this.config.active}_onMainIconClick(){}_onMushroomEntityClick(e){}_onSubButtonClick(e){}}function ze(e,t,i,o){var s,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(r<3?s(n):r>3?s(t,i,n):s(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}customElements.define("bubble-room",Ie),"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:o}=t;return{kind:i,elements:o,finisher(t){customElements.define(e,t)}}})(e,t),Re=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Be(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):Re(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Te(e){return Be({...e,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Le(e,t){return(({finisher:e,descriptor:t})=>(i,o)=>{var s;if(void 0===o){const o=null!==(s=i.originalKey)&&void 0!==s?s:i.key,r=null!=t?{kind:"method",placement:"prototype",key:o,descriptor:t(i.key)}:{...i,key:o};return null!=e&&(r.finisher=function(t){e(t,o)}),r}{const s=i.constructor;void 0!==t&&Object.defineProperty(i,o,t(o)),null==e||e(s,o)}})({descriptor:i=>{const o={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;o.get=function(){var i,o;return void 0===this[t]&&(this[t]=null!==(o=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==o?o:null),this[t]}}return o}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ue;null===(Ue=window.HTMLSlotElement)||void 0===Ue||Ue.prototype.assignedElements;
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Me=r`.elevated{--md-elevation-level: var(--_elevated-container-elevation);--md-elevation-shadow-color: var(--_elevated-container-shadow-color)}.elevated::before{background:var(--_elevated-container-color)}.elevated:hover{--md-elevation-level: var(--_elevated-hover-container-elevation)}.elevated:focus-within{--md-elevation-level: var(--_elevated-focus-container-elevation)}.elevated:active{--md-elevation-level: var(--_elevated-pressed-container-elevation)}.elevated.disabled{--md-elevation-level: var(--_elevated-disabled-container-elevation)}.elevated.disabled::before{background:var(--_elevated-disabled-container-color);opacity:var(--_elevated-disabled-container-opacity)}@media(forced-colors: active){.elevated md-elevation{border:1px solid CanvasText}.elevated.disabled md-elevation{border-color:GrayText}}
`
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;class Ne extends oe{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return U`<span class="shadow"></span>`}}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const He=r`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let Fe=class extends Ne{};Fe.styles=[He],Fe=ze([Oe("md-elevation")],Fe);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const De=Symbol("attachableController");let je;je=new MutationObserver(e=>{for(const t of e)t.target[De]?.hostConnected()});class Ve{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(e){null===e?this.host.removeAttribute("for"):this.host.setAttribute("for",e)}get control(){return this.host.hasAttribute("for")?this.htmlFor&&this.host.isConnected?this.host.getRootNode().querySelector(`#${this.htmlFor}`):null:this.currentControl||this.host.parentElement}set control(e){e?this.attach(e):this.detach()}constructor(e,t){this.host=e,this.onControlChange=t,this.currentControl=null,e.addController(this),e[De]=this,je?.observe(e,{attributeFilter:["for"]})}attach(e){e!==this.currentControl&&(this.setCurrentControl(e),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(e){this.onControlChange(this.currentControl,e),this.currentControl=e}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ge=["focusin","focusout","pointerdown"];class qe extends oe{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new Ve(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(e){if(!e[We]){switch(e.type){default:return;case"focusin":this.visible=this.control?.matches(":focus-visible")??!1;break;case"focusout":case"pointerdown":this.visible=!1}e[We]=!0}}onControlChange(e,t){for(const i of Ge)e?.removeEventListener(i,this),t?.addEventListener(i,this)}update(e){e.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(e)}}ze([Be({type:Boolean,reflect:!0})],qe.prototype,"visible",void 0),ze([Be({type:Boolean,reflect:!0})],qe.prototype,"inward",void 0);const We=Symbol("handledByFocusRing"),Ke=r`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ye=class extends qe{};Ye.styles=[Ke],Ye=ze([Oe("md-focus-ring")],Ye);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je=1;class Ze{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends Ze{constructor(e){var t;if(super(e),e.type!==Je||"class"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(e))&&this.it.add(e);return this.render(t)}const s=e.element.classList;this.it.forEach(e=>{e in t||(s.remove(e),this.it.delete(e))});for(const e in t){const i=!!t[e];i===this.it.has(e)||(null===(o=this.nt)||void 0===o?void 0:o.has(e))||(i?(s.add(e),this.it.add(e)):(s.remove(e),this.it.delete(e)))}return M}}),Qe="cubic-bezier(0.2, 0, 0, 1)";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var et;!function(e){e[e.INACTIVE=0]="INACTIVE",e[e.TOUCH_DELAY=1]="TOUCH_DELAY",e[e.HOLDING=2]="HOLDING",e[e.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"}(et||(et={}));const tt=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],it=window.matchMedia("(forced-colors: active)");class ot extends oe{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=et.INACTIVE,this.checkBoundsAfterContextMenu=!1,this.attachableController=new Ve(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const e={hovered:this.hovered,pressed:this.pressed};return U`<div class="surface ${Xe(e)}"></div>`}update(e){e.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(e)}handlePointerenter(e){this.shouldReactToEvent(e)&&(this.hovered=!0)}handlePointerleave(e){this.shouldReactToEvent(e)&&(this.hovered=!1,this.state!==et.INACTIVE&&this.endPressAnimation())}handlePointerup(e){if(this.shouldReactToEvent(e)){if(this.state!==et.HOLDING)return this.state===et.TOUCH_DELAY?(this.state=et.WAITING_FOR_CLICK,void this.startPressAnimation(this.rippleStartEvent)):void 0;this.state=et.WAITING_FOR_CLICK}}async handlePointerdown(e){if(this.shouldReactToEvent(e)){if(this.rippleStartEvent=e,!this.isTouch(e))return this.state=et.WAITING_FOR_CLICK,void this.startPressAnimation(e);this.checkBoundsAfterContextMenu&&!this.inBounds(e)||(this.checkBoundsAfterContextMenu=!1,this.state=et.TOUCH_DELAY,await new Promise(e=>{setTimeout(e,150)}),this.state===et.TOUCH_DELAY&&(this.state=et.HOLDING,this.startPressAnimation(e)))}}handleClick(){this.disabled||(this.state!==et.WAITING_FOR_CLICK?this.state===et.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation()):this.endPressAnimation())}handlePointercancel(e){this.shouldReactToEvent(e)&&this.endPressAnimation()}handleContextmenu(){this.disabled||(this.checkBoundsAfterContextMenu=!0,this.endPressAnimation())}determineRippleSize(){const{height:e,width:t}=this.getBoundingClientRect(),i=Math.max(e,t),o=Math.max(.35*i,75),s=Math.floor(.2*i),r=Math.sqrt(t**2+e**2)+10;this.initialSize=s,this.rippleScale=""+(r+o)/s,this.rippleSize=`${s}px`}getNormalizedPointerEventCoords(e){const{scrollX:t,scrollY:i}=window,{left:o,top:s}=this.getBoundingClientRect(),r=t+o,n=i+s,{pageX:a,pageY:l}=e;return{x:a-r,y:l-n}}getTranslationCoordinates(e){const{height:t,width:i}=this.getBoundingClientRect(),o={x:(i-this.initialSize)/2,y:(t-this.initialSize)/2};let s;return s=e instanceof PointerEvent?this.getNormalizedPointerEventCoords(e):{x:i/2,y:t/2},s={x:s.x-this.initialSize/2,y:s.y-this.initialSize/2},{startPoint:s,endPoint:o}}startPressAnimation(e){if(!this.mdRoot)return;this.pressed=!0,this.growAnimation?.cancel(),this.determineRippleSize();const{startPoint:t,endPoint:i}=this.getTranslationCoordinates(e),o=`${t.x}px, ${t.y}px`,s=`${i.x}px, ${i.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${o}) scale(1)`,`translate(${s}) scale(${this.rippleScale})`]},{pseudoElement:"::after",duration:450,easing:Qe,fill:"forwards"})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=et.INACTIVE;const e=this.growAnimation;let t=1/0;"number"==typeof e?.currentTime?t=e.currentTime:e?.currentTime&&(t=e.currentTime.to("ms").value),t>=225?this.pressed=!1:(await new Promise(e=>{setTimeout(e,225-t)}),this.growAnimation===e&&(this.pressed=!1))}shouldReactToEvent(e){if(this.disabled||!e.isPrimary)return!1;if(this.rippleStartEvent&&this.rippleStartEvent.pointerId!==e.pointerId)return!1;if("pointerenter"===e.type||"pointerleave"===e.type)return!this.isTouch(e);const t=1===e.buttons;return this.isTouch(e)||t}inBounds({x:e,y:t}){const{top:i,left:o,bottom:s,right:r}=this.getBoundingClientRect();return e>=o&&e<=r&&t>=i&&t<=s}isTouch({pointerType:e}){return"touch"===e}async handleEvent(e){if(!it?.matches)switch(e.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(e);break;case"pointerdown":await this.handlePointerdown(e);break;case"pointerenter":this.handlePointerenter(e);break;case"pointerleave":this.handlePointerleave(e);break;case"pointerup":this.handlePointerup(e)}}onControlChange(e,t){for(const i of tt)e?.removeEventListener(i,this),t?.addEventListener(i,this)}}ze([Be({type:Boolean,reflect:!0})],ot.prototype,"disabled",void 0),ze([Te()],ot.prototype,"hovered",void 0),ze([Te()],ot.prototype,"pressed",void 0),ze([Le(".surface")],ot.prototype,"mdRoot",void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const st=r`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let rt=class extends ot{};rt.styles=[st],rt=ze([Oe("md-ripple")],rt);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const nt=["role","ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"],at=nt.map(ct);function lt(e){return at.includes(e)}function ct(e){return e.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const dt=Symbol("privateIgnoreAttributeChangesFor");function ht(e){return`data-${e}`}function pt(e){return e.replace(/-\w/,e=>e[1].toUpperCase())}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ut=function(e){var t;class i extends e{constructor(){super(...arguments),this[t]=new Set}attributeChangedCallback(e,t,i){if(!lt(e))return void super.attributeChangedCallback(e,t,i);if(this[dt].has(e))return;this[dt].add(e),this.removeAttribute(e),this[dt].delete(e);const o=pt(e);null===i?delete this.dataset[o]:this.dataset[o]=i,this.requestUpdate(pt(e),t)}getAttribute(e){return lt(e)?super.getAttribute(ht(e)):super.getAttribute(e)}removeAttribute(e){super.removeAttribute(e),lt(e)&&(super.removeAttribute(ht(e)),this.requestUpdate())}}return t=dt,function(e){for(const t of nt){const i=ct(t),o=ht(i),s=pt(i);e.createProperty(t,{attribute:i,noAccessor:!0}),e.createProperty(Symbol(o),{attribute:o,noAccessor:!0}),Object.defineProperty(e.prototype,t,{configurable:!0,enumerable:!0,get(){return this.dataset[s]??null},set(e){const i=this.dataset[s]??null;e!==i&&(null===e?delete this.dataset[s]:this.dataset[s]=e,this.requestUpdate(t,i))}})}}(i),i}(oe);class vt extends ut{get rippleDisabled(){return this.disabled||this.softDisabled}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.alwaysFocusable=!1,this.label="",this.hasIcon=!1,this.addEventListener("click",this.handleClick.bind(this))}focus(e){this.disabled&&!this.alwaysFocusable||super.focus(e)}render(){return U`
      <div class="container ${Xe(this.getContainerClasses())}">
        ${this.renderContainerContent()}
      </div>
    `}updated(e){e.has("disabled")&&void 0!==e.get("disabled")&&this.dispatchEvent(new Event("update-focus",{bubbles:!0}))}getContainerClasses(){return{disabled:this.disabled||this.softDisabled,"has-icon":this.hasIcon}}renderContainerContent(){return U`
      ${this.renderOutline()}
      <md-focus-ring part="focus-ring" for=${this.primaryId}></md-focus-ring>
      <md-ripple
        for=${this.primaryId}
        ?disabled=${this.rippleDisabled}></md-ripple>
      ${this.renderPrimaryAction(this.renderPrimaryContent())}
    `}renderOutline(){return U`<span class="outline"></span>`}renderLeadingIcon(){return U`<slot name="icon" @slotchange=${this.handleIconChange}></slot>`}renderPrimaryContent(){return U`
      <span class="leading icon" aria-hidden="true">
        ${this.renderLeadingIcon()}
      </span>
      <span class="label">
        <span class="label-text" id="label">
          ${this.label?this.label:U`<slot></slot>`}
        </span>
      </span>
      <span class="touch"></span>
    `}handleIconChange(e){const t=e.target;this.hasIcon=t.assignedElements({flatten:!0}).length>0}handleClick(e){if(this.softDisabled||this.disabled&&this.alwaysFocusable)return e.stopImmediatePropagation(),void e.preventDefault()}}vt.shadowRootOptions={...oe.shadowRootOptions,delegatesFocus:!0},ze([Be({type:Boolean,reflect:!0})],vt.prototype,"disabled",void 0),ze([Be({type:Boolean,attribute:"soft-disabled",reflect:!0})],vt.prototype,"softDisabled",void 0),ze([Be({type:Boolean,attribute:"always-focusable"})],vt.prototype,"alwaysFocusable",void 0),ze([Be()],vt.prototype,"label",void 0),ze([Be({type:Boolean,reflect:!0,attribute:"has-icon"})],vt.prototype,"hasIcon",void 0);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const bt="aria-label-remove";class mt extends vt{get ariaLabelRemove(){if(this.hasAttribute(bt))return this.getAttribute(bt);const{ariaLabel:e}=this;return e||this.label?`Remove ${e||this.label}`:null}set ariaLabelRemove(e){e!==this.ariaLabelRemove&&(null===e?this.removeAttribute(bt):this.setAttribute(bt,e),this.requestUpdate())}constructor(){super(),this.handleTrailingActionFocus=this.handleTrailingActionFocus.bind(this),this.addEventListener("keydown",this.handleKeyDown.bind(this))}focus(e){(this.alwaysFocusable||!this.disabled)&&e?.trailing&&this.trailingAction?this.trailingAction.focus(e):super.focus(e)}renderContainerContent(){return U`
      ${super.renderContainerContent()}
      ${this.renderTrailingAction(this.handleTrailingActionFocus)}
    `}handleKeyDown(e){const t="ArrowLeft"===e.key,i="ArrowRight"===e.key;if(!t&&!i)return;if(!this.primaryAction||!this.trailingAction)return;const o="rtl"===getComputedStyle(this).direction?t:i,s=this.primaryAction?.matches(":focus-within"),r=this.trailingAction?.matches(":focus-within");if(o&&r||!o&&s)return;e.preventDefault(),e.stopPropagation();(o?this.trailingAction:this.primaryAction).focus()}handleTrailingActionFocus(){const{primaryAction:e,trailingAction:t}=this;e&&t&&(e.tabIndex=-1,t.addEventListener("focusout",()=>{e.tabIndex=0},{once:!0}))}}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ft({ariaLabel:e,disabled:t,focusListener:i,tabbable:o=!1}){return U`
    <span id="remove-label" hidden aria-hidden="true">Remove</span>
    <button
      class="trailing action"
      aria-label=${e||N}
      aria-labelledby=${e?N:"remove-label label"}
      tabindex=${o?N:-1}
      @click=${gt}
      @focus=${i}>
      <md-focus-ring part="trailing-focus-ring"></md-focus-ring>
      <md-ripple ?disabled=${t}></md-ripple>
      <span class="trailing icon" aria-hidden="true">
        <slot name="remove-trailing-icon">
          <svg viewBox="0 96 960 960">
            <path
              d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
          </svg>
        </slot>
      </span>
      <span class="touch"></span>
    </button>
  `}function gt(e){if(this.disabled||this.softDisabled)return;e.stopPropagation();!this.dispatchEvent(new Event("remove",{cancelable:!0}))||this.remove()}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class yt extends mt{constructor(){super(...arguments),this.elevated=!1,this.removable=!1,this.selected=!1,this.hasSelectedIcon=!1}get primaryId(){return"button"}getContainerClasses(){return{...super.getContainerClasses(),elevated:this.elevated,selected:this.selected,"has-trailing":this.removable,"has-icon":this.hasIcon||this.selected}}renderPrimaryAction(e){const{ariaLabel:t}=this;return U`
      <button
        class="primary action"
        id="button"
        aria-label=${t||N}
        aria-pressed=${this.selected}
        aria-disabled=${this.softDisabled||N}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        @click=${this.handleClickOnChild}
        >${e}</button
      >
    `}renderLeadingIcon(){return this.selected?U`
      <slot name="selected-icon">
        <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
        </svg>
      </slot>
    `:super.renderLeadingIcon()}renderTrailingAction(e){return this.removable?ft({focusListener:e,ariaLabel:this.ariaLabelRemove,disabled:this.disabled||this.softDisabled}):N}renderOutline(){return this.elevated?U`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}handleClickOnChild(e){if(this.disabled||this.softDisabled)return;const t=this.selected;this.selected=!this.selected;const i=!
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function(e,t){!t.bubbles||e.shadowRoot&&!t.composed||t.stopPropagation();const i=Reflect.construct(t.constructor,[t.type,t]),o=e.dispatchEvent(i);return o||t.preventDefault(),o}(this,e);i&&(this.selected=t)}}ze([Be({type:Boolean})],yt.prototype,"elevated",void 0),ze([Be({type:Boolean})],yt.prototype,"removable",void 0),ze([Be({type:Boolean,reflect:!0})],yt.prototype,"selected",void 0),ze([Be({type:Boolean,reflect:!0,attribute:"has-selected-icon"})],yt.prototype,"hasSelectedIcon",void 0),ze([Le(".primary.action")],yt.prototype,"primaryAction",void 0),ze([Le(".trailing.action")],yt.prototype,"trailingAction",void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const _t=r`:host{--_container-height: var(--md-filter-chip-container-height, 32px);--_disabled-label-text-color: var(--md-filter-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filter-chip-disabled-label-text-opacity, 0.38);--_elevated-container-elevation: var(--md-filter-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-filter-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-filter-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-filter-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-filter-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-filter-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-filter-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-filter-chip-elevated-pressed-container-elevation, 1);--_elevated-selected-container-color: var(--md-filter-chip-elevated-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_label-text-font: var(--md-filter-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filter-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filter-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filter-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_selected-focus-label-text-color: var(--md-filter-chip-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-filter-chip-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-filter-chip-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-opacity: var(--md-filter-chip-selected-hover-state-layer-opacity, 0.08);--_selected-label-text-color: var(--md-filter-chip-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-filter-chip-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-filter-chip-selected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_selected-pressed-state-layer-opacity: var(--md-filter-chip-selected-pressed-state-layer-opacity, 0.12);--_elevated-container-color: var(--md-filter-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_disabled-outline-color: var(--md-filter-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-filter-chip-disabled-outline-opacity, 0.12);--_disabled-selected-container-color: var(--md-filter-chip-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-filter-chip-disabled-selected-container-opacity, 0.12);--_focus-outline-color: var(--md-filter-chip-focus-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-filter-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-filter-chip-outline-width, 1px);--_selected-container-color: var(--md-filter-chip-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-outline-width: var(--md-filter-chip-selected-outline-width, 0px);--_focus-label-text-color: var(--md-filter-chip-focus-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-filter-chip-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filter-chip-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-filter-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filter-chip-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-filter-chip-pressed-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-filter-chip-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filter-chip-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-filter-chip-icon-size, 18px);--_disabled-leading-icon-color: var(--md-filter-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filter-chip-disabled-leading-icon-opacity, 0.38);--_selected-focus-leading-icon-color: var(--md-filter-chip-selected-focus-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-leading-icon-color: var(--md-filter-chip-selected-hover-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-leading-icon-color: var(--md-filter-chip-selected-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-leading-icon-color: var(--md-filter-chip-selected-pressed-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-leading-icon-color: var(--md-filter-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-filter-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-filter-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-leading-icon-color: var(--md-filter-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_disabled-trailing-icon-color: var(--md-filter-chip-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filter-chip-disabled-trailing-icon-opacity, 0.38);--_selected-focus-trailing-icon-color: var(--md-filter-chip-selected-focus-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-trailing-icon-color: var(--md-filter-chip-selected-hover-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-trailing-icon-color: var(--md-filter-chip-selected-pressed-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-trailing-icon-color: var(--md-filter-chip-selected-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-trailing-icon-color: var(--md-filter-chip-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filter-chip-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-trailing-icon-color: var(--md-filter-chip-pressed-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-color: var(--md-filter-chip-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-filter-chip-container-shape-start-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-filter-chip-container-shape-start-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-filter-chip-container-shape-end-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-filter-chip-container-shape-end-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-filter-chip-leading-space, 16px);--_trailing-space: var(--md-filter-chip-trailing-space, 16px);--_icon-label-space: var(--md-filter-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-filter-chip-with-leading-icon-leading-space, 8px);--_with-trailing-icon-trailing-space: var(--md-filter-chip-with-trailing-icon-trailing-space, 8px)}.selected.elevated::before{background:var(--_elevated-selected-container-color)}.checkmark{height:var(--_icon-size);width:var(--_icon-size)}.disabled .checkmark{opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){.disabled .checkmark{opacity:1}}
`
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */,xt=r`.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}:where(.selected)::before{background:var(--_selected-container-color)}:where(.selected) .outline{border-width:var(--_selected-outline-width)}:where(.selected.disabled)::before{background:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}:where(.selected) .label{color:var(--_selected-label-text-color)}:where(.selected:hover) .label{color:var(--_selected-hover-label-text-color)}:where(.selected:focus) .label{color:var(--_selected-focus-label-text-color)}:where(.selected:active) .label{color:var(--_selected-pressed-label-text-color)}:where(.selected) .leading.icon{color:var(--_selected-leading-icon-color)}:where(.selected:hover) .leading.icon{color:var(--_selected-hover-leading-icon-color)}:where(.selected:focus) .leading.icon{color:var(--_selected-focus-leading-icon-color)}:where(.selected:active) .leading.icon{color:var(--_selected-pressed-leading-icon-color)}@media(forced-colors: active){:where(.selected:not(.elevated))::before{border:1px solid CanvasText}:where(.selected) .outline{border-width:1px}}
`
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */,$t=r`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);display:inline-flex;height:var(--_container-height);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host(:is([disabled],[soft-disabled])){pointer-events:none}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.container{border-radius:inherit;box-sizing:border-box;display:flex;height:100%;position:relative;width:100%}.container::before{border-radius:inherit;content:"";inset:0;pointer-events:none;position:absolute}.container:not(.disabled){cursor:pointer}.container.disabled{pointer-events:none}.cell{display:flex}.action{align-items:baseline;appearance:none;background:none;border:none;border-radius:inherit;display:flex;outline:none;padding:0;position:relative;text-decoration:none}.primary.action{min-width:0;padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space)}.has-icon .primary.action{padding-inline-start:var(--_with-leading-icon-leading-space)}.touch{height:48px;inset:50% 0 0;position:absolute;transform:translateY(-50%);width:100%}:host([touch-target=none]) .touch{display:none}.outline{border:var(--_outline-width) solid var(--_outline-color);border-radius:inherit;inset:0;pointer-events:none;position:absolute}:where(:focus) .outline{border-color:var(--_focus-outline-color)}:where(.disabled) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}md-ripple{border-radius:inherit}.label,.icon,.touch{z-index:1}.label{align-items:center;color:var(--_label-text-color);display:flex;font-family:var(--_label-text-font);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);height:100%;line-height:var(--_label-text-line-height);overflow:hidden;user-select:none}.label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:where(:hover) .label{color:var(--_hover-label-text-color)}:where(:focus) .label{color:var(--_focus-label-text-color)}:where(:active) .label{color:var(--_pressed-label-text-color)}:where(.disabled) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.icon{align-self:center;display:flex;fill:currentColor;position:relative}.icon ::slotted(:first-child){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.leading.icon{color:var(--_leading-icon-color)}.leading.icon ::slotted(*),.leading.icon svg{margin-inline-end:var(--_icon-label-space)}:where(:hover) .leading.icon{color:var(--_hover-leading-icon-color)}:where(:focus) .leading.icon{color:var(--_focus-leading-icon-color)}:where(:active) .leading.icon{color:var(--_pressed-leading-icon-color)}:where(.disabled) .leading.icon{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){:where(.disabled) :is(.label,.outline,.leading.icon){color:GrayText;opacity:1}}a,button{text-transform:inherit}a,button:not(:disabled,[aria-disabled=true]){cursor:inherit}
`
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */,wt=r`.trailing.action{align-items:center;justify-content:center;padding-inline-start:var(--_icon-label-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}.trailing.action :is(md-ripple,md-focus-ring){border-radius:50%;height:calc(1.3333333333*var(--_icon-size));width:calc(1.3333333333*var(--_icon-size))}.trailing.action md-focus-ring{inset:unset}.has-trailing .primary.action{padding-inline-end:0}.trailing.icon{color:var(--_trailing-icon-color);height:var(--_icon-size);width:var(--_icon-size)}:where(:hover) .trailing.icon{color:var(--_hover-trailing-icon-color)}:where(:focus) .trailing.icon{color:var(--_focus-trailing-icon-color)}:where(:active) .trailing.icon{color:var(--_pressed-trailing-icon-color)}:where(.disabled) .trailing.icon{color:var(--_disabled-trailing-icon-color);opacity:var(--_disabled-trailing-icon-opacity)}:where(.selected) .trailing.icon{color:var(--_selected-trailing-icon-color)}:where(.selected:hover) .trailing.icon{color:var(--_selected-hover-trailing-icon-color)}:where(.selected:focus) .trailing.icon{color:var(--_selected-focus-trailing-icon-color)}:where(.selected:active) .trailing.icon{color:var(--_selected-pressed-trailing-icon-color)}@media(forced-colors: active){.trailing.icon{color:ButtonText}:where(.disabled) .trailing.icon{color:GrayText;opacity:1}}
`
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let At=class extends yt{};At.styles=[$t,Me,wt,xt,_t],At=ze([Oe("md-filter-chip")],At);var Ct=Object.freeze({__proto__:null,get MdFilterChip(){return At}});export{Ie as BubbleRoom};
//# sourceMappingURL=lovelace-bubble-room.js.map
