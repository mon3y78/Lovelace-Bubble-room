/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var a;const l=window,c=l.trustedTypes,d=c?c.emptyScript:"",p=l.reactiveElementPolyfillSupport,h={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),b={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:u},m="finalized";class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||b}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(e=>{const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=b){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:h).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:h;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;g[m]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:g}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.3");const v=window,x=v.trustedTypes,_=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,y="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,A=`<${w}>`,E=document,k=()=>E.createComment(""),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,P="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,U=/>/g,B=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,R=/"/g,j=/^(?:script|style|textarea|title)$/i,N=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),I=new WeakMap,F=E.createTreeWalker(E,129,null,!1);function D(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(e):e}const L=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=z;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===z?"!--"===l[1]?r=O:void 0!==l[1]?r=U:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=B):void 0!==l[3]&&(r=B):r===B?">"===l[0]?(r=null!=n?n:z,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?B:'"'===l[3]?R:T):r===R||r===T?r=B:r===O||r===U?r=z:(r=B,n=void 0);const p=r===B&&t[e+1].startsWith("/>")?" ":"";o+=r===z?i+A:c>=0?(s.push(a),i.slice(0,c)+y+i.slice(c)+$+p):i+$+(-2===c?(s.push(void 0),e):p)}return[D(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class V{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=L(t,e);if(this.el=V.createElement(l,i),F.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=F.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(y)||e.startsWith($)){const i=c[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+y).split($),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?Y:"@"===e[1]?Q:q})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(j.test(s.tagName)){const t=s.textContent.split($),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),F.nextNode(),a.push({type:2,index:++n});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===w)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf($,t+1));)a.push({type:7,index:n}),t+=$.length-1}n++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function W(t,e,i=t,s){var n,o,r,a;if(e===H)return e;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const c=S(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=W(t,l._$AS(t,e.values),l,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(i,!0);F.currentNode=n;let o=F.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new J(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new X(o,this,t)),this._$AV.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(o=F.nextNode(),r++)}return F.currentNode=E,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,s){var n;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),S(t)?t===M||null==t||""===t?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>C(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==M&&S(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(D(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new G(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new V(t)),e}T(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new J(this.k(k()),this.k(k()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class q{constructor(t,e,i,s,n){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=W(this,t,e,0),o=!S(t)||t!==this._$AH&&t!==H,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=W(this,s[i+r],e,r),a===H&&(a=this._$AH[r]),o||(o=!S(a)||a!==this._$AH[r]),a===M?t=M:t!==M&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}const K=x?x.emptyScript:"";class Y extends q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==M?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class Q extends q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=W(this,t,e,0))&&void 0!==i?i:M)===H)return;const s=this._$AH,n=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==M&&(s===M||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class X{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const tt=v.litHtmlPolyfillSupport;null==tt||tt(V,J),(null!==(f=v.litHtmlVersions)&&void 0!==f?f:v.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et,it;class st extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new J(e.insertBefore(k(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return H}}st.finalized=!0,st._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:st});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:st}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");const ot=(t=[])=>({includeDomains:["binary_sensor","light","switch","fan"],entityFilter:(e,i)=>{if(!t.length)return!1;const[s]=e.split(".");if("binary_sensor"===s){const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}return t.includes(s)}});function rt(t,e,i,s=[]){if(!t?.states)return[];let n=null;if("presence"===i&&(n=ot(s)),!n)return[];const o=Object.keys(t.states).filter(t=>n.includeDomains.includes(t.split(".")[0])).filter(e=>n.entityFilter(e,t));if((e?.auto_discovery_sections?.presence??!1)&&e?.area){const i=function(t,e){if(!t?.states||!e)return[];const i=t.entities??{},s=t.devices??{};return Object.keys(t.states).filter(n=>{const o=i[n];if(o?.area_id===e)return!0;const r=o?.device_id;if(r&&s[r]?.area_id===e)return!0;const a=t.states[n]?.attributes??{};return a.area_id===e||a.area===e})}(t,e.area);return o.filter(t=>i.includes(t))}return o}const at=!!window.__BUBBLE_DEBUG__,lt=(t,e)=>t.find(t=>!e.has(t))||null;function ct(t,e){const i={...e.entities||{}},s=i.presence||(i.presence={});if(!s.entity){const i=function(t,e){if(!t||!t.states)return[];const i=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let s=Object.keys(t.states).filter(t=>i.has(t.split(".")[0]));s=s.filter(e=>{if("binary_sensor"!==e.split(".")[0])return!0;const i=t.states[e]?.attributes?.device_class;return["motion","occupancy","presence"].includes(i||"")});const n=e?.area;if(n){const e=s.filter(e=>{const i=t.states[e],s=i?.attributes?.area_id,o=i?.attributes?.area;return s===n||o===n});e.length&&(s=e)}const o=e?.entities?.presence?.entity||e?.presence_entity;return o&&!s.includes(o)&&s.push(o),at&&console.info("[AutoDiscovery][presence candidates]",{area:n,count:s.length,sample:s.slice(0,8)}),s}(t,e);i.length&&(s.entity=i[0])}return{...e,entities:i}}function dt(t,e,i,s=!1){const n=e.auto_discovery_sections||{},o="area"===i,r=i&&i.startsWith("auto_discovery_sections.");if(!o&&!r)return e;let a=e;return n.sensor&&(a=function(t,e){const i=["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6"],s={...e.entities||{}},n=new Set(i.map(t=>s[t]?.entity_id).filter(Boolean));for(const o of i){const i=s[o]||(s[o]={});if(i.entity_id)continue;const r=rt(t,e,{section:"sensor",type:i.type||""}),a=lt(r,n);a&&(i.entity_id=a,n.add(a))}return{...e,entities:s}}(t,a)),n.mushroom&&(a=function(t,e){const i={...e.entities||{}},s=new Set(["climate","camera","entities1","entities2","entities3","entities4","entities5"].map(t=>i[t]?.entity).filter(Boolean)),n=rt(t,e,"mushroom"),o=i.climate||(i.climate={});if(!o.entity){const t=n.find(t=>t.startsWith("climate.")&&!s.has(t));t&&(o.entity=t,s.add(t))}const r=i.camera||(i.camera={});if(!r.entity){const t=n.find(t=>t.startsWith("camera.")&&!s.has(t));t&&(r.entity=t,s.add(t))}for(const t of["entities1","entities2","entities3","entities4","entities5"]){const e=i[t]||(i[t]={});if(e.entity)continue;const o=lt(n,s);o&&(e.entity=o,s.add(o))}return{...e,entities:i}}(t,a)),n.subbutton&&(a=function(t,e){const i=["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"],s={...e.entities||{}},n=new Set(i.map(t=>s[t]?.entity).filter(Boolean)),o=rt(t,e,"subbutton");for(const t of i){const e=s[t]||(s[t]={});if(e.entity)continue;const i=lt(o,n);i&&(e.entity=i,n.add(i))}return{...e,entities:s}}(t,a)),n.presence&&(a=ct(t,a)),s&&"undefined"!=typeof window&&window.__BUBBLE_DEBUG__&&console.info("[AutoDiscovery] applied after",i,{sections:n}),a}const pt=["presence","motion","occupancy","light","switch","fan"];class ht extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},activeFilters:{type:Array,state:!0}};static styles=o`
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
  `;constructor(){super(),this.hass={},this.config={},this.expanded=!1,this.activeFilters=[]}updated(t){(t.has("config")||t.has("hass"))&&(dt(this.hass,this.config,"area"),dt(this.hass,this.config,"auto_discovery_sections.presence"),t.has("config")&&Array.isArray(this.config.presence_filters)&&(this.activeFilters=[...this.config.presence_filters]))}_onAreaChanged(t){const e=t.detail.value;this._fire("area",e),e&&this._fire("auto_discovery_sections.presence",!0)}_fire(t,e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}render(){const t=this.config,e=t.auto_discovery_sections?.presence??!1,i=t.area??"",s=t.name??"",n=t.icon??"",o=t.entities?.presence?.entity??t.presence_entity??"",r=this.activeFilters.length?this.activeFilters:t.presence_filters??[...pt],a=pt.map(t=>({value:t,label:t.charAt(0).toUpperCase()+t.slice(1)})),l=rt(this.hass,this.config,"presence",r);return N`
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
              .checked=${e}
              @change=${t=>this._fire("auto_discovery_sections.presence",t.target.checked)}
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
                @input=${t=>this._fire("name",t.target.value)}
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
                @value-changed=${t=>this._fire("icon",t.detail.value)}
              ></ha-icon-picker>
            </div>
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${r}
                .selector=${{select:{multiple:!0,mode:"box",options:a}}}
                @value-changed=${t=>this._fire("presence_filters",t.detail.value)}
              ></ha-selector>
            </div>
            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${o}
                .selector=${{entity:{multiple:!1,include_entities:l}}}
                allow-custom-entity
                @value-changed=${t=>this._fire("entities.presence.entity",t.detail.value)}
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
    `}_renderActions(t){const e=this.config?.[`${t}_action`]||{};return N`
      <div class="input-group">
        <label>${"tap"===t?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(i=>N`
            <paper-button
              class="pill-button ${e.action===i?"active":""}"
              @click=${()=>this._fire(`${t}_action.action`,i)}
            >${i}</paper-button>
          `)}
        </div>

        ${"navigate"===e.action?N`
          <input
            type="text"
            placeholder="Path"
            .value=${e.navigation_path||""}
            @input=${e=>this._fire(`${t}_action.navigation_path`,e.target.value)}
          />
        `:""}

        ${"call-service"===e.action?N`
          <input
            type="text"
            placeholder="service: domain.service_name"
            .value=${e.service||""}
            @input=${e=>this._fire(`${t}_action.service`,e.detail.value)}
          />
          <input
            type="text"
            placeholder="service_data (JSON)"
            .value=${e.service_data?JSON.stringify(e.service_data):""}
            @input=${e=>{let i=e.target.value;try{i=i?JSON.parse(i):void 0}catch{i=void 0}this._fire(`${t}_action.service_data`,i)}}
          />
        `:""}
      </div>
    `}_onExpandedChanged(t){this.expanded=t.detail.expanded,this.dispatchEvent(new CustomEvent("expanded-changed",{detail:{expanded:t.detail.expanded},bubbles:!0,composed:!0}))}}customElements.define("room-panel",ht);const ut={temperature:{label:"Temperature",emoji:"🌡️",icon:"mdi:thermometer",units:["°C","°F"]},humidity:{label:"Humidity",emoji:"💧",icon:"mdi:water-percent",units:["%"]},co2:{label:"CO₂",emoji:"🟢",icon:"mdi:molecule-co2",units:["ppm"]},lux:{label:"Luminosity",emoji:"🔆",icon:"mdi:brightness-5",units:["lx"]},uv:{label:"UV Index",emoji:"🌞",icon:"mdi:weather-sunny-alert",units:["UV"]},pressure:{label:"Pressure",emoji:"⏲️",icon:"mdi:gauge",units:["hPa"]},noise:{label:"Noise",emoji:"🔊",icon:"mdi:volume-high",units:["dB"]},pm25:{label:"PM2.5",emoji:"🌫️",icon:"mdi:blur",units:["µg/m³"]},pm10:{label:"PM10",emoji:"🌫️",icon:"mdi:blur-linear",units:["µg/m³"]}};class bt extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},filterType:{type:String,state:!0},selectedEntity:{type:String,state:!0}};static styles=o`
    :host { display: block; }

    .glass-panel {
      position: relative;
      margin: 8px;
      border-radius: 24px;
      background: var(--glass-bg, rgba(200,200,200,0.1));
      box-shadow: var(--glass-shadow, 0 2px 8px rgba(0,0,0,0.1));
    }
    .glass-panel::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen, rgba(255,255,255,0.03));
      pointer-events: none;
    }
    .glass-header {
      padding: 12px;
      font-weight: bold;
      color: var(--primary-text-color);
    }
    .autodiscover-box,
    .reset-button {
      border: 2.5px solid #FFD600 !important;
      box-shadow: 0 2px 24px 0 #FFD60033 !important;
      background: rgba(255,214,0,0.08) !important;
      border-radius: 24px !important;
      backdrop-filter: blur(7px) saturate(1.2) !important;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 16px 12px;
      padding: 14px 0;
      cursor: pointer;
      color: #fff;
      font-weight: 700;
      gap: 8px;
      position: relative;
    }
    .autodiscover-box input {
      margin-right: 8px;
    }
    .input-group {
      padding: 0 16px 12px;
    }
    .input-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 4px;
      color: var(--secondary-text-color);
    }
    ha-selector {
      width: 100%;
      box-sizing: border-box;
    }
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
      display: flex;
      align-items: center;
      padding: 12px 16px;
      cursor: pointer;
      user-select: none;
      font-weight: 700;
    }
    .mini-pill-header .chevron {
      margin-left: auto;
      transition: transform 0.2s;
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
    .preview {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 16px 16px;
    }
    .preview ha-icon {
      --mdc-icon-size: 32px;
    }
    .preview .state {
      font-size: 1.2rem;
    }
  `;constructor(){super(),this.hass={},this.config={},this.expanded=!1,this.filterType="",this.selectedEntity=""}updated(t){if(t.has("config")||t.has("hass")){dt(this.hass,this.config,"auto_discovery_sections.sensor");const t=this.config.sensor_filters;Array.isArray(t)&&t[0]!==this.filterType&&(this.filterType=t[0]||"");const e=this.config.entities?.sensor?.entity;e&&e!==this.selectedEntity&&(this.selectedEntity=e)}}render(){const t=this.config.auto_discovery_sections?.sensor??!1,e=Object.entries(ut).map(([t,e])=>({value:t,label:e.label})),i=this.filterType?[this.filterType]:[],s=rt(this.hass,this.config,"sensor",i);return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${t=>this.expanded=t.detail.expanded}
      >
        <div slot="header" class="glass-header">🔢 Sensor</div>

        <!-- Auto-discovery -->
        <div class="autodiscover-box" @click=${()=>this._toggleAuto(!t)}>
          <input
            type="checkbox"
            .checked=${t}
            @change=${t=>this._toggleAuto(t.target.checked)}
            @click=${t=>t.stopPropagation()}
          />🪄 Auto-discover Sensor
        </div>

        <!-- Filter device_class -->
        <div class="input-group">
          <label>Filter category:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this.filterType?[this.filterType]:[]}
            .selector=${{select:{multiple:!1,mode:"box",options:e}}}
            @value-changed=${t=>this._onFilterChanged(t.detail.value[0]||"")}
          ></ha-selector>
        </div>

        <!-- Entity selector -->
        <div class="input-group">
          <label>Entity:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this.selectedEntity}
            .selector=${{entity:{include_entities:s,multiple:!1}}}
            allow-custom-entity
            @value-changed=${t=>this._onEntityChanged(t.detail.value)}
          ></ha-selector>
        </div>

        <!-- Preview -->
        ${this.selectedEntity?N`
          <div class="preview">
            <ha-icon .icon=${this._iconFor(this.selectedEntity)}></ha-icon>
            <div class="state">
              ${this._stateFor(this.selectedEntity)}
              ${this._unitFor(this.selectedEntity)}
            </div>
          </div>
        `:""}

        <!-- Reset -->
        <div class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Sensor
        </div>
      </ha-expansion-panel>
    `}_toggleAuto(t){const e={...this.config.auto_discovery_sections||{}};e.sensor=t,this.config={...this.config,auto_discovery_sections:e},this._fire("auto_discovery_sections.sensor",t)}_onFilterChanged(t){this.filterType=t,this._fire("sensor_filters",[t])}_onEntityChanged(t){this.selectedEntity=t,this._fire("entities.sensor.entity",t)}_stateFor(t){return this.hass.states[t]?.state??""}_unitFor(t){return this.hass.states[t]?.attributes?.unit_of_measurement||ut[this.filterType]?.units[0]||""}_iconFor(t){return this.hass.states[t]?.attributes?.icon||ut[this.filterType]?.icon||"mdi:thermometer"}_reset(){this.filterType="",this.selectedEntity="",this._fire("sensor_filters",[]),this._fire("entities.sensor.entity","")}_fire(t,e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}}customElements.define("sensor-panel",bt);window.__BUBBLE_DEBUG__;Boolean,o`
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
`;customElements.define("mushroom-panel",MushroomPanel);window.__BUBBLE_DEBUG__;Boolean,o`
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
`;customElements.define("subbutton-panel",SubButtonPanel);Boolean,o`
    /* glass-panel, mini-pill/header, input-group, color-row etc. */
  `;customElements.define("color-panel",ColorPanel);class mt extends st{static properties={hass:{type:Object},config:{type:Object},openPanel:{type:String,state:!0}};static styles=o`
    :host {
      display: block;
      padding: 0;
      margin: 0;
      background: transparent;
    }
  `;constructor(){super(),this.hass={},this.config={},this.openPanel=""}render(){return N`
      <!-- Room Settings -->
      <room-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"room"===this.openPanel}
        @expanded-changed=${t=>this._togglePanel(t,"room")}
        @panel-changed=${this._onPanelChanged}
      ></room-panel>

      <!-- Sensor Settings -->
      <sensor-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"sensor"===this.openPanel}
        @expanded-changed=${t=>this._togglePanel(t,"sensor")}
        @panel-changed=${this._onPanelChanged}
      ></sensor-panel>

      <!-- Mushroom Entities -->
      <mushroom-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"mushroom"===this.openPanel}
        @expanded-changed=${t=>this._togglePanel(t,"mushroom")}
        @panel-changed=${this._onPanelChanged}
      ></mushroom-panel>

      <!-- Sub-Button Settings -->
      <sub-button-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"subbutton"===this.openPanel}
        @expanded-changed=${t=>this._togglePanel(t,"subbutton")}
        @panel-changed=${this._onPanelChanged}
      ></sub-button-panel>

      <!-- Color Settings -->
      <color-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"color"===this.openPanel}
        @expanded-changed=${t=>this._togglePanel(t,"color")}
        @panel-changed=${this._onPanelChanged}
      ></color-panel>
    `}_togglePanel(t,e){t.detail.expanded?this.openPanel=e:this.openPanel===e&&(this.openPanel="")}_onPanelChanged(t){const{prop:e,val:i}=t.detail;this.dispatchEvent(new CustomEvent("editor-changed",{detail:{prop:e,val:i},bubbles:!0,composed:!0}))}setConfig(t){(t={...t}).auto_discovery_sections={room:!!t.area,sensor:!!t.area,mushroom:!!t.area,subbutton:!!t.area,color:!0,...t.auto_discovery_sections||{}},this.config=t}}customElements.define("bubble-room-editor",mt);var gt=Object.freeze({__proto__:null,BubbleRoomEditor:mt});class ft extends st{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16"}static styles=o`
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
  `;render(){const t=this.active?this.colorActive:this.colorInactive;return N`
      <ha-icon
        class="main-icon ${this.active?"active":""}"
        .icon="${this.icon}"
        style="--icon-color: ${t}"
        @click="${()=>this.dispatchEvent(new CustomEvent("main-icon-click"))}"
      ></ha-icon>
    `}}customElements.define("bubble-icon",ft);class vt extends st{static properties={entities:{type:Array},containerSize:{type:Object}};constructor(){super(),this.entities=[],this.containerSize={width:200,height:200}}static styles=o`
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
  `;_entityRatios(){return[{x:.2,y:.09},{x:.54,y:.05},{x:.81,y:.33},{x:.82,y:.67},{x:.54,y:.92},{x:.2,y:.87}]}render(){const{width:t,height:e}=this.containerSize||{width:200,height:200},i=this._entityRatios();return N`
      <div class="mushroom-container" style="width:${t}px;height:${e}px;">
        ${this.entities.map((s,n)=>{const o=i[n]||{x:.5,y:.5},r=Math.round(o.x*t)-26+"px",a=Math.round(o.y*e)-26+"px";return N`
            <ha-icon
              class="mushroom-entity ${"on"===s.state?"active":""}"
              .icon="${s.icon}"
              style="left: ${r}; top: ${a}; color: ${s.color||"#888"}"
              @click="${()=>this.dispatchEvent(new CustomEvent("mushroom-entity-click",{detail:n}))}"
            ></ha-icon>
          `})}
      </div>
    `}}customElements.define("bubble-mushroom",vt);class xt extends st{static properties={name:{type:String},area:{type:String}};constructor(){super(),this.name="",this.area=""}static styles=o`
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
  `;render(){return N`
      <div class="bubble-name">
        ${this.name}
        ${this.area?N`<span class="bubble-area">(${this.area})</span>`:""}
      </div>
    `}}customElements.define("bubble-name",xt);class _t extends st{static properties={sensors:{type:Array}};static styles=o`
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
  `;render(){const t=this.sensors?.slice(0,3)||[],e=this.sensors?.slice(3,6)||[];return N`
      <div class="sensor-row">
        ${t.map(t=>N`
          <div class="sensor-pill" style="color: ${t.color||"#e3f6ff"}">
            <ha-icon class="sensor-icon" .icon="${t.icon}"></ha-icon>
            <span class="sensor-label">${t.label||""}</span>
            <span class="sensor-value">${t.value??"--"}</span>
            <span class="sensor-unit">${t.unit||""}</span>
          </div>
        `)}
      </div>
      ${e.length?N`
        <div class="sensor-row">
          ${e.map(t=>N`
            <div class="sensor-pill" style="color: ${t.color||"#e3f6ff"}">
              <ha-icon class="sensor-icon" .icon="${t.icon}"></ha-icon>
              <span class="sensor-label">${t.label||""}</span>
              <span class="sensor-value">${t.value??"--"}</span>
              <span class="sensor-unit">${t.unit||""}</span>
            </div>
          `)}
        </div>
      `:""}
    `}}customElements.define("bubble-sensors",_t);class yt extends st{static properties={subbuttons:{type:Array}};constructor(){super(),this.subbuttons=[]}static styles=o`
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
  `;render(){return N`
      <div class="subbutton-column">
        ${this.subbuttons.map((t,e)=>N`
            <div
              class="subbutton ${t.active?"active":""}"
              @click="${()=>this.dispatchEvent(new CustomEvent("subbutton-click",{detail:e}))}"
              title="${t.label||""}"
              style="background:${t.active?t.colorOn||"#21df73":t.colorOff||"#455a64"};"
            >
              <ha-icon class="subbutton-icon" .icon="${t.icon}"></ha-icon>
              ${t.label?N`<span class="subbutton-label">${t.label}</span>`:""}
            </div>
          `)}
      </div>
    `}}customElements.define("bubble-subbutton",yt);const $t={temperature:{icon:"mdi:thermometer",unit:"°C"},humidity:{icon:"mdi:water-percent",unit:"%"},co2:{icon:"mdi:molecule-co2",unit:"ppm"},lux:{icon:"mdi:brightness-5",unit:"lx"},uv:{icon:"mdi:weather-sunny-alert",unit:"UV"},pressure:{icon:"mdi:gauge",unit:"hPa"},noise:{icon:"mdi:volume-high",unit:"dB"},pm25:{icon:"mdi:blur",unit:"µg/m³"},pm10:{icon:"mdi:blur-linear",unit:"µg/m³"}};class wt extends st{static properties={config:{type:Object},hass:{type:Object}};constructor(){super(),this.config={},this.hass={}}static getStubConfig(){return{type:"custom:bubble-room",name:"Salotto",area:"Zona Giorno",icon:"mdi:sofa",sensors:[{entity_id:"sensor.some_sensor1",type:"temperature",label:"Temperatura",color:"#e3f6ff"}],mushrooms:[{entity_id:"switch.lampada",icon:"mdi:lightbulb",color:"#ffeb3b"}],subbuttons:[{entity_id:"light.luce_tavolo",icon:"mdi:lamp",label:"Tavolo",colorOn:"#00d46d",colorOff:"#999"}],colors:{room:{background_active:"rgba(var(--color-green),1)",background_inactive:"rgba(var(--color-green),0.3)",icon_active:"orange",icon_inactive:"#80808055",mushroom_active:"rgba(var(--color-green),1)",mushroom_inactive:"#80808055"},subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return gt}),document.createElement("bubble-room-editor")}setConfig(t){this.config=t}static styles=o`
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
  `;render(){const t=this.config.icon||"mdi:sofa",e=this.config.colors?.room?.icon_active??this.config.icon_active??"#21df73",i=this.config.colors?.room?.icon_inactive??this.config.icon_inactive??"#173c16",s=this.config.name||"Room",n=this.config.area||"",o=this._getSensors(),r=this._getMushroomEntities(),a=this._getSubButtons();return N`
      <div class="bubble-room-grid">
        <div class="main-area">
          <bubble-sensors .sensors="${o}"></bubble-sensors>
          <bubble-name .name="${s}" .area="${n}"></bubble-name>
          <div class="icon-mushroom-area">
            <bubble-icon
              .icon="${t}"
              .active="${this._isMainIconActive()}"
              .colorActive="${e}"
              .colorInactive="${i}"
              @main-icon-click="${this._onMainIconClick}"
            ></bubble-icon>
            <bubble-mushroom
              .entities="${r}"
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
    `}_getSensors(){return(this.config.sensors||[]).map(t=>{return{icon:$t[t.type]?.icon||"mdi:help-circle",label:t.label||(e=t.type||"",e?e.charAt(0).toUpperCase()+e.slice(1):""),value:this.hass.states?.[t.entity_id]?.state??"--",unit:$t[t.type]?.unit||"",color:t.color||"#e3f6ff"};var e})}_getMushroomEntities(){const t=this.config.colors?.room?.mushroom_inactive??"#999";return(this.config.mushrooms||[]).map(e=>({icon:e.icon||"mdi:flash",state:this.hass.states?.[e.entity_id]?.state,color:e.color??t}))}_getSubButtons(){const t=this.config.colors?.subbutton?.background_on??"#00d46d",e=this.config.colors?.subbutton?.background_off??"#999";return(this.config.subbuttons||[]).map(i=>({icon:i.icon||"mdi:light-switch",active:"on"===this.hass.states?.[i.entity_id]?.state,colorOn:i.colorOn??t,colorOff:i.colorOff??e,label:i.label||""}))}_isMainIconActive(){return!!this.config.active}_onMainIconClick(){}_onMushroomEntityClick(t){}_onSubButtonClick(t){}}customElements.define("bubble-room",wt);export{wt as BubbleRoom};
//# sourceMappingURL=lovelace-bubble-room.js.map
