/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}}const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new o(s,e,i)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var r;const l=window,c=l.trustedTypes,d=c?c.emptyScript:"",p=l.reactiveElementPolyfillSupport,h={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},u=(e,t)=>t!==e&&(t==t||e==e),b={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:u},g="finalized";class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||b}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{t?i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):s.forEach(t=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=b){var s;const o=this.constructor._$Ep(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:h).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,o=s._$Ev.get(e);if(void 0!==o&&this._$El!==o){const e=s.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:h;this._$El=o,this[o]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;m[g]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:m}),(null!==(r=l.reactiveElementVersions)&&void 0!==r?r:l.reactiveElementVersions=[]).push("1.6.3");const v=window,x=v.trustedTypes,_=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,y="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,A=`<${w}>`,E=document,k=()=>E.createComment(""),C=e=>null===e||"object"!=typeof e&&"function"!=typeof e,S=Array.isArray,P="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,j=/>/g,R=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,B=/"/g,M=/^(?:script|style|textarea|title)$/i,N=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),H=Symbol.for("lit-noChange"),T=Symbol.for("lit-nothing"),I=new WeakMap,F=E.createTreeWalker(E,129,null,!1);function L(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_?_.createHTML(t):t}const D=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":"",a=O;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===O?"!--"===l[1]?a=z:void 0!==l[1]?a=j:void 0!==l[2]?(M.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=null!=o?o:O,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?R:'"'===l[3]?B:U):a===B||a===U?a=R:a===z||a===j?a=O:(a=R,o=void 0);const p=a===R&&e[t+1].startsWith("/>")?" ":"";n+=a===O?i+A:c>=0?(s.push(r),i.slice(0,c)+y+i.slice(c)+$+p):i+$+(-2===c?(s.push(void 0),t):p)}return[L(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),s]};class V{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const a=e.length-1,r=this.parts,[l,c]=D(e,t);if(this.el=V.createElement(l,i),F.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=F.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith(y)||t.startsWith($)){const i=c[n++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+y).split($),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?G:"?"===t[1]?K:"@"===t[1]?Q:q})}else r.push({type:6,index:o})}for(const t of e)s.removeAttribute(t)}if(M.test(s.tagName)){const e=s.textContent.split($),t=e.length-1;if(t>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],k()),F.nextNode(),r.push({type:2,index:++o});s.append(e[t],k())}}}else if(8===s.nodeType)if(s.data===w)r.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf($,e+1));)r.push({type:7,index:o}),e+=$.length-1}o++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}}function W(e,t,i=e,s){var o,n,a,r;if(t===H)return t;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=C(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,s)),void 0!==s?(null!==(a=(r=i)._$Co)&&void 0!==a?a:r._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(t=W(e,l._$AS(e,t.values),l,s)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:E).importNode(i,!0);F.currentNode=o;let n=F.nextNode(),a=0,r=0,l=s[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new J(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new X(n,this,e)),this._$AV.push(t),l=s[++r]}a!==(null==l?void 0:l.index)&&(n=F.nextNode(),a++)}return F.currentNode=E,o}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class J{constructor(e,t,i,s){var o;this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),C(e)?e===T||null==e||""===e?(this._$AH!==T&&this._$AR(),this._$AH=T):e!==this._$AH&&e!==H&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>S(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==T&&C(this._$AH)?this._$AA.nextSibling.data=e:this.$(E.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=V.createElement(L(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.v(i);else{const e=new Y(o,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=I.get(e.strings);return void 0===t&&I.set(e.strings,t=new V(e)),t}T(e){S(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new J(this.k(k()),this.k(k()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class q{constructor(e,t,i,s,o){this.type=1,this._$AH=T,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=T}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=W(this,e,t,0),n=!C(e)||e!==this._$AH&&e!==H,n&&(this._$AH=e);else{const s=e;let a,r;for(e=o[0],a=0;a<o.length-1;a++)r=W(this,s[i+a],t,a),r===H&&(r=this._$AH[a]),n||(n=!C(r)||r!==this._$AH[a]),r===T?e=T:e!==T&&(e+=(null!=r?r:"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(e)}j(e){e===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class G extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===T?void 0:e}}const Z=x?x.emptyScript:"";class K extends q{constructor(){super(...arguments),this.type=4}j(e){e&&e!==T?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class Q extends q{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=W(this,e,t,0))&&void 0!==i?i:T)===H)return;const s=this._$AH,o=e===T&&s!==T||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==T&&(s===T||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class X{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const ee=v.litHtmlPolyfillSupport;null==ee||ee(V,J),(null!==(f=v.litHtmlVersions)&&void 0!==f?f:v.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var te,ie;class se extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let a=n._$litPart$;if(void 0===a){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=a=new J(t.insertBefore(k(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return H}}se.finalized=!0,se._$litElement$=!0,null===(te=globalThis.litElementHydrateSupport)||void 0===te||te.call(globalThis,{LitElement:se});const oe=globalThis.litElementPolyfillSupport;null==oe||oe({LitElement:se}),(null!==(ie=globalThis.litElementVersions)&&void 0!==ie?ie:globalThis.litElementVersions=[]).push("3.3.3");const ne={alarm_control_panel:"Allarmi",binary_sensor:"Sensori Binari",camera:"Telecamere",climate:"Clima",cover:"Tapparelle",fan:"Ventola",light:"Luce",lock:"Serratura",media_player:"Media Player",scene:"Scene",script:"Script",siren:"Sirena",vacuum:"Aspirapolvere",motion:"Movimento",occupancy:"Occupazione",presence:"Presenza"},ae=["alarm_control_panel","binary_sensor","camera","climate","cover","fan","light","lock","media_player","scene","script","siren","vacuum"],re=(e=[])=>({includeDomains:ae,entityFilter:(t,i)=>{if(!e.length)return!1;const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return e.includes(s)}}),le=(e=[])=>({includeDomains:["sensor"],entityFilter:(t,i)=>{if(!e.length)return!0;const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}}),ce=(e=[])=>({includeDomains:ae,entityFilter:(t,i)=>{if(!e.length)return"binary_sensor"===t.split(".")[0];const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return e.includes(s)}}),de=(e=[])=>({includeDomains:ae,entityFilter:(t,i)=>{if(!e.length)return ae.includes(t.split(".")[0]);const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return e.includes(s)}});function pe(e,t,i,s=[]){if(!e?.states)return[];let o;if("presence"===i?o=re(s):"sensor"===i?o=le(s):"mushroom"===i?o=ce(s):"subbutton"===i&&(o=de(s)),!o)return[];const n=Object.keys(e.states).filter(e=>o.includeDomains.includes(e.split(".")[0])).filter(t=>o.entityFilter(t,e));if((t?.auto_discovery_sections?.[i]??!1)&&t?.area){const i=function(e,t){if(!e?.states||!t)return[];const i=e.entities??{},s=e.devices??{};return Object.keys(e.states).filter(o=>{const n=i[o];if(n?.area_id===t)return!0;const a=n?.device_id;if(a&&s[a]?.area_id===t)return!0;const r=e.states[o]?.attributes??{};return r.area_id===t||r.area===t})}(e,t.area);return n.filter(e=>i.includes(e))}return n}const he=!!window.__BUBBLE_DEBUG__,ue=(e,t)=>e.find(e=>!t.has(e))||null;function be(e,t){const i={...t.entities||{}},s=i.presence||(i.presence={});if(!s.entity){const i=function(e,t){if(!e||!e.states)return[];const i=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let s=Object.keys(e.states).filter(e=>i.has(e.split(".")[0]));s=s.filter(t=>{if("binary_sensor"!==t.split(".")[0])return!0;const i=e.states[t]?.attributes?.device_class;return["motion","occupancy","presence"].includes(i||"")});const o=t?.area;if(o){const t=s.filter(t=>{const i=e.states[t],s=i?.attributes?.area_id,n=i?.attributes?.area;return s===o||n===o});t.length&&(s=t)}const n=t?.entities?.presence?.entity||t?.presence_entity;return n&&!s.includes(n)&&s.push(n),he&&console.info("[AutoDiscovery][presence candidates]",{area:o,count:s.length,sample:s.slice(0,8)}),s}(e,t);i.length&&(s.entity=i[0])}return{...t,entities:i}}function ge(e,t,i,s=!1){const o=t.auto_discovery_sections||{},n="area"===i,a=i&&i.startsWith("auto_discovery_sections.");if(!n&&!a)return t;let r=t;return o.sensor&&(r=function(e,t){const i=["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6"],s={...t.entities||{}},o=new Set(i.map(e=>s[e]?.entity_id).filter(Boolean));for(const n of i){const i=s[n]||(s[n]={});if(i.entity_id)continue;const a=pe(e,t,{section:"sensor",type:i.type||""}),r=ue(a,o);r&&(i.entity_id=r,o.add(r))}return{...t,entities:s}}(e,r)),o.mushroom&&(r=function(e,t){const i={...t.entities||{}},s=new Set(["climate","camera","entities1","entities2","entities3","entities4","entities5"].map(e=>i[e]?.entity).filter(Boolean)),o=pe(e,t,"mushroom"),n=i.climate||(i.climate={});if(!n.entity){const e=o.find(e=>e.startsWith("climate.")&&!s.has(e));e&&(n.entity=e,s.add(e))}const a=i.camera||(i.camera={});if(!a.entity){const e=o.find(e=>e.startsWith("camera.")&&!s.has(e));e&&(a.entity=e,s.add(e))}for(const e of["entities1","entities2","entities3","entities4","entities5"]){const t=i[e]||(i[e]={});if(t.entity)continue;const n=ue(o,s);n&&(t.entity=n,s.add(n))}return{...t,entities:i}}(e,r)),o.subbutton&&(r=function(e,t){const i=["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"],s={...t.entities||{}},o=new Set(i.map(e=>s[e]?.entity).filter(Boolean)),n=pe(e,t,"subbutton");for(const e of i){const t=s[e]||(s[e]={});if(t.entity)continue;const i=ue(n,o);i&&(t.entity=i,o.add(i))}return{...t,entities:s}}(e,r)),o.presence&&(r=be(e,r)),s&&"undefined"!=typeof window&&window.__BUBBLE_DEBUG__&&console.info("[AutoDiscovery] applied after",i,{sections:o}),r}const me=["presence","motion","occupancy","light","switch","fan"];class fe extends se{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean,state:!0},activeFilters:{type:Array,state:!0},layout:{type:String}};static styles=n`
    :host { display: block; }

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

    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 18px;
      margin: 0 16px 13px;
      padding: 14px 18px 10px;
    }
    .input-group label {
      display: block;
      font-size: 1.13rem;
      font-weight: 700;
      color: #55afff;
      margin-bottom: 8px;
    }
    .input-group input[type="text"],
    .input-group ha-selector,
    .input-group ha-icon-picker {
      width: 100%;
      box-sizing: border-box;
      min-height: 56px;
    }
    .input-group ha-selector::part(combobox) {
      min-height: 56px;
    }

    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin: 0 16px 18px;
      overflow: hidden;
    }
    .mini-pill-header {
      padding: 15px 22px;
      font-size: 1.15rem;
      font-weight: 800;
      color: #55afff;
    }
    .mini-pill-content {
      padding: 15px 22px;
    }

    .reset-button {
      display: block;
      margin: 20px auto;
      border: 2px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 12px;
      padding: 8px 16px;
      background: transparent;
      cursor: pointer;
    }

    /* Layout chooser */
    .toggle-group {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 4px;
    }
    .toggle-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 64px;
      padding: 8px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.24);
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    .toggle-btn ha-icon {
      --mdc-icon-size: 28px;
      color: var(--primary-text-color);
    }
    .toggle-btn span {
      margin-top: 4px;
      font-size: 0.9rem;
      color: var(--primary-text-color);
    }
    .toggle-btn.active {
      background: #55afff;
      border-color: #55afff;
    }
    .toggle-btn.active ha-icon,
    .toggle-btn.active span {
      color: white;
    }
    .toggle-btn:hover {
      background: rgba(255,255,255,0.18);
    }
  `;constructor(){super(),this.hass={},this.config={},this._expanded=!1,this.activeFilters=[],this.layout="wide"}updated(e){if(e.has("config")||e.has("hass")){ge(this.hass,this.config,"area"),ge(this.hass,this.config,"auto_discovery_sections.presence"),e.has("config")&&Array.isArray(this.config.presence_filters)&&(this.activeFilters=[...this.config.presence_filters]);const t=this.config.layout;t&&t!==this.layout&&(this.layout=t)}}_onLayoutClick(e){this.layout=e,this._fire("layout",e)}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}render(){const e=this.config,t=e.auto_discovery_sections?.presence??!1,i=e.area??"",s=e.name??"",o=e.icon??"",n=e.entities?.presence?.entity??"",a=this.activeFilters.length?this.activeFilters:e.presence_filters??[...me],r=me.map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1)})),l=pe(this.hass,this.config,"presence",a);return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e=>this._expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>

        <!-- Auto-discover -->
        <div class="input-group">
          <label><input
            type="checkbox"
            .checked=${t}
            @change=${e=>this._fire("auto_discovery_sections.presence",e.target.checked)}
          /> 🔍 Auto-discover Presence</label>
        </div>

        <!-- Room name -->
        <div class="input-group">
          <label>Room name:</label>
          <input
            type="text"
            .value=${s}
            @input=${e=>this._fire("name",e.target.value)}
          />
        </div>

        <!-- Area -->
        <div class="input-group">
          <label>Area:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${i}
            .selector=${{area:{}}}
            @value-changed=${e=>{const t=e.detail.value;this._fire("area",t),t&&this._fire("auto_discovery_sections.presence",!0)}}
          ></ha-selector>
        </div>

        <!-- Layout -->
        <div class="input-group">
          <label>Layout:</label>
          <div class="toggle-group">
            <button
              class="toggle-btn ${"wide"===this.layout?"active":""}"
              @click=${()=>this._onLayoutClick("wide")}
            >
              <ha-icon icon="mdi:tablet-landscape"></ha-icon>
              <span>Largo</span>
            </button>
            <button
              class="toggle-btn ${"tall"===this.layout?"active":""}"
              @click=${()=>this._onLayoutClick("tall")}
            >
              <ha-icon icon="mdi:tablet-portrait"></ha-icon>
              <span>Stretto</span>
            </button>
          </div>
        </div>

        <!-- Icon & Presence -->
        <div class="mini-pill">
          <div class="mini-pill-header">Icon & Presence</div>
          <div class="mini-pill-content">

            <!-- Room Icon -->
            <div class="input-group">
              <label>Room Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${o}
                allow-custom-icon
                @value-changed=${e=>this._fire("icon",e.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Filter categories -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${a}
                .selector=${{select:{multiple:!0,mode:"box",options:r}}}
                @value-changed=${e=>this._fire("presence_filters",e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Presence entity -->
            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${n}
                .selector=${{entity:{include_entities:l,multiple:!1}}}
                allow-custom-entity
                @value-changed=${e=>this._fire("entities.presence.entity",e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Actions -->
            ${this._renderActions("tap")}
            ${this._renderActions("hold")}

          </div>
        </div>

        <!-- Reset -->
        <button class="reset-button"
          @click=${()=>this._fire("__panel_cmd__",{cmd:"reset",section:"room"})}>
          🧹 Reset Room
        </button>
      </ha-expansion-panel>
    `}_renderActions(e){const t=this.config?.[`${e}_action`]||{};return N`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(i=>N`
            <paper-button
              class="pill-button ${t.action===i?"active":""}"
              @click=${()=>this._fire(`${e}_action.action`,i)}
            >${i}</paper-button>
          `)}
        </div>
        ${"navigate"===t.action?N`
          <input
            type="text"
            placeholder="Path"
            .value=${t.navigation_path||""}
            @input=${t=>this._fire(`${e}_action.navigation_path`,t.target.value)}
          />
        `:""}
        ${"call-service"===t.action?N`
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
    `}}customElements.define("room-panel",fe);const ve={temperature:{label:"Temperature",emoji:"🌡️",icon:"mdi:thermometer",units:["°C","°F"]},humidity:{label:"Humidity",emoji:"💧",icon:"mdi:water-percent",units:["%"]},co2:{label:"CO₂",emoji:"🟢",icon:"mdi:molecule-co2",units:["ppm"]},lux:{label:"Luminosity",emoji:"🔆",icon:"mdi:brightness-5",units:["lx"]},uv:{label:"UV Index",emoji:"🌞",icon:"mdi:weather-sunny-alert",units:["UV"]},pressure:{label:"Pressure",emoji:"⏲️",icon:"mdi:gauge",units:["hPa"]},noise:{label:"Noise",emoji:"🔊",icon:"mdi:volume-high",units:["dB"]},pm25:{label:"PM2.5",emoji:"🌫️",icon:"mdi:blur",units:["µg/m³"]},pm10:{label:"PM10",emoji:"🌫️",icon:"mdi:blur-linear",units:["µg/m³"]}};class xe extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(6).fill(!1);const e=Object.keys(ve);this._filters=Array(6).fill().map(()=>[...e]),this._entities=Array(6).fill("")}updated(e){if(e.has("config")||e.has("hass")){ge(this.hass,this.config,"auto_discovery_sections.sensor");for(let e=0;e<6;e++){const t=`sensor${e+1}`,i=this.config.sensor_filters?.[e],s=this.config.entities?.[t]?.entity;Array.isArray(i)&&(this._filters[e]=[...i]),s&&(this._entities[e]=s)}}}static styles=n`
    :host { display: block; }

    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(167,255,175,0.22));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13));
      overflow: hidden;
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg,rgba(255,255,255,0.11),
        rgba(255,255,255,0.07) 70%,transparent 100%));
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }

    .input-group.autodiscover {
      margin: 0 16px 13px;
      padding: 14px 18px 10px;
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 18px;
      display: flex; align-items: center; gap: 8px;
    }
    .input-group.autodiscover input { margin-right: 8px; }
    .input-group.autodiscover label {
      margin: 0; font-weight: 700; color: #fff;
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
      display: flex; align-items: center;
      padding: 12px 16px;
      cursor: pointer; user-select: none;
      font-weight: 700; color: #8cff8a;
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

    .input-group {
      margin-bottom: 12px;
    }
    .input-group label {
      display: block; font-weight: 600;
      margin-bottom: 6px; color: #8cff8a;
    }
    ha-selector {
      width: 100%; box-sizing: border-box;
    }
    ha-selector::part(combobox) {
      min-height: 40px;
    }

    .preview {
      display: flex; align-items: center; gap: 12px;
      padding: 0 16px 16px;
    }
    .preview .emoji {
      font-size: 1.8rem;
      line-height: 1;
    }
    .preview .state {
      font-size: 1.2rem;
      color: #fff;
    }

    .reset-button {
      border: 3.5px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 24px;
      padding: 12px 38px;
      background: transparent;
      cursor: pointer;
      display: block;
      margin: 20px auto;
      font-size: 1.15rem;
      font-weight: 700;
      box-shadow: 0 2px 24px #ff4c6a44;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18);
      color: #fff;
      box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;render(){const e=this.config.auto_discovery_sections?.sensor??!1,t=Object.entries(ve).map(([e,t])=>({value:e,label:`${t.emoji} ${t.label}`}));return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expanded=Array(6).fill(!1))}}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <!-- Auto-discover -->
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto-discover Sensors</label>
        </div>

        <!-- Sei mini-pill -->
        ${this._expanded.map((e,i)=>this._renderSensor(i,e,t))}

        <!-- Reset -->
        <button class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Sensors
        </button>
      </ha-expansion-panel>
    `}_renderSensor(e,t,i){const s=this._filters[e],o=this._entities[e],n=pe(this.hass,this.config,"sensor",s);return N`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          Sensor ${e+1}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>
        ${t?N`
          <div class="mini-pill-content">
            <!-- Filter category (multi‐select pill) -->
            <div class="input-group">
              <label>Filter category:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${s}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${t=>this._onFilter(e,t.detail.value)}
              ></ha-selector>
            </div>

            <!-- Entity selector -->
            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${o}
                .selector=${{entity:{include_entities:n,multiple:!1}}}
                allow-custom-entity
                @value-changed=${t=>this._onEntity(e,t.detail.value)}
              ></ha-selector>
            </div>

            <!-- Preview basata su device_class -->
            ${o?(()=>{const e=this.hass.states[o],t=e?.attributes?.device_class,i=ve[t]||{},s=i.emoji||"❓",n=e?.attributes?.unit_of_measurement||(i.units?.[0]??"");return N`
                <div class="preview">
                  <span class="emoji">${s}</span>
                  <div class="state">${e?.state??"-"} ${n}</div>
                </div>
              `})():""}
          </div>
        `:""}
      </div>
    `}_toggleAuto(e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.sensor",val:e},bubbles:!0,composed:!0}))}_togglePill(e){this._expanded=this._expanded.map((t,i)=>i===e&&!t),this.requestUpdate()}_onFilter(e,t){this._filters[e]=[...t],this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"sensor_filters",val:this._filters},bubbles:!0,composed:!0}))}_onEntity(e,t){this._entities[e]=t,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${e+1}.entity`,val:t},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(6).fill(!1);const e=Object.keys(ve);this._filters=Array(6).fill().map(()=>[...e]),this._entities=Array(6).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"sensor_filters",val:this._filters},bubbles:!0,composed:!0}));for(let e=1;e<=6;e++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${e}.entity`,val:""},bubbles:!0,composed:!0}))}}customElements.define("sensor-panel",xe);class _e extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...ae]),this._entities=Array(5).fill("")}updated(e){if(e.has("config")||e.has("hass")){ge(this.hass,this.config,"auto_discovery_sections.mushroom");const e=this.config.mushroom_filters;Array.isArray(e)&&5===e.length&&(this._filters=e.map(e=>Array.isArray(e)?[...e]:[...ae]));const t=this.config.entities||{};for(let e=0;e<5;e++){const i=`mushroom${e+1}`,s=t[i]?.entity;s&&(this._entities[e]=s)}}}static styles=n`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(80,235,175,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(40,220,145,0.18));
      overflow: hidden;
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.18),
        rgba(255,255,255,0.10) 70%, transparent 100%));
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }

    .input-group.autodiscover {
      margin: 0 16px 13px;
      padding: 14px 18px 10px;
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 18px;
      display: flex; align-items: center; gap: 8px;
    }
    .input-group.autodiscover input { margin-right: 8px; }
    .input-group.autodiscover label {
      margin: 0; font-weight: 700; color: #fff;
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
      display: flex; align-items: center;
      padding: 12px 16px;
      cursor: pointer; user-select: none;
      font-weight: 700; color: #36e6a0;
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

    .input-group {
      margin-bottom: 12px;
    }
    .input-group label {
      display: block; font-weight: 600;
      margin-bottom: 6px; color: #36e6a0;
    }
    ha-selector {
      width: 100%; box-sizing: border-box;
    }
    ha-selector::part(combobox) {
      min-height: 40px;
    }

    .reset-button {
      border: 3.5px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 24px;
      padding: 12px 38px;
      background: transparent;
      cursor: pointer;
      display: block;
      margin: 20px auto;
      font-size: 1.15rem;
      font-weight: 700;
      box-shadow: 0 2px 24px #ff4c6a44;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18);
      color: #fff;
      box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;render(){const e=this.config.auto_discovery_sections?.mushroom??!1,t=ae.map(e=>({value:e,label:ne[e]||e.charAt(0).toUpperCase()+e.slice(1)}));return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expanded=Array(5).fill(!1))}}
      >
        <div slot="header" class="glass-header">🍄 Mushroom Entities</div>

        <!-- 1️⃣ Auto-discover -->
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto-discover Mushroom</label>
        </div>

        <!-- 2️⃣ Cinque mini-pill -->
        ${this._expanded.map((e,i)=>this._renderMushroom(i,e,t))}

        <!-- 3️⃣ Reset -->
        <button class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Mushrooms
        </button>
      </ha-expansion-panel>
    `}_renderMushroom(e,t,i){const s=this._filters[e],o=this._entities[e],n=pe(this.hass,this.config,"mushroom",s);return N`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          Mushroom ${e+1}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>
        ${t?N`
          <div class="mini-pill-content">
            <!-- Filter categories -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${s}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${t=>this._onFilter(e,t.detail.value)}
              ></ha-selector>
            </div>

            <!-- Entity selector -->
            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${o}
                .selector=${{entity:{include_entities:n,multiple:!1}}}
                allow-custom-entity
                @value-changed=${t=>this._onEntity(e,t.detail.value)}
              ></ha-selector>
            </div>
          </div>
        `:""}
      </div>
    `}_toggleAuto(e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.mushroom",val:e},bubbles:!0,composed:!0}))}_togglePill(e){this._expanded=this._expanded.map((t,i)=>i===e&&!t),this.requestUpdate()}_onFilter(e,t){this._filters[e]=[...t],this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}))}_onEntity(e,t){this._entities[e]=t,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e+1}.entity`,val:t},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...ae]),this._entities=Array(5).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}));for(let e=1;e<=5;e++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e}.entity`,val:""},bubbles:!0,composed:!0}))}}customElements.define("mushroom-panel",_e);class ye extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...ae]),this._entities=Array(4).fill("")}updated(e){if(e.has("config")||e.has("hass")){ge(this.hass,this.config,"auto_discovery_sections.subbutton");const e=this.config.subbutton_filters;Array.isArray(e)&&4===e.length&&(this._filters=e.map(e=>Array.isArray(e)?[...e]:[...ae]));const t=this.config.entities||{};for(let e=0;e<4;e++){const i=`sub-button${e+1}`,s=t[i]?.entity;s&&(this._entities[e]=s)}}}static styles=n`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(180,120,255,0.34));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(160,100,255,0.19));
      overflow: hidden;
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.22),
        rgba(255,255,255,0.10) 70%, transparent 100%));
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }
    .input-group.autodiscover {
      margin: 0 16px 13px;
      padding: 14px 18px 10px;
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 18px;
      display: flex; align-items: center; gap: 8px;
    }
    .input-group.autodiscover input { margin-right: 8px; }
    .input-group.autodiscover label {
      margin: 0; font-weight: 700; color: #fff;
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
      display: flex; align-items: center;
      padding: 12px 16px;
      cursor: pointer; user-select: none;
      font-weight: 700; color: #b28fff;
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

    .input-group {
      margin-bottom: 12px;
    }
    .input-group label {
      display: block; font-weight: 600;
      margin-bottom: 6px; color: #b28fff;
    }
    ha-selector, ha-icon-picker {
      width: 100%; box-sizing: border-box;
    }
    ha-selector::part(combobox) {
      min-height: 40px;
    }

    /* === STYLE TAP/HOLD like RoomPanel === */
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
      background: transparent;
      font-weight: 600;
      transition: background 0.18s, border-color 0.18s, color 0.18s;
    }
    .pill-button.active {
      border-color: #b28fff;
      color: #b28fff;
    }
    .pill-button:hover:not(.active) {
      background: rgba(178,143,255,0.1);
    }

    .reset-button {
      border: 3.5px solid #ff4c6a;
      color: #ff4c6a;
      border-radius: 24px;
      padding: 12px 38px;
      background: transparent;
      cursor: pointer;
      display: block;
      margin: 20px auto;
      font-size: 1.15rem;
      font-weight: 700;
      box-shadow: 0 2px 24px #ff4c6a44;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18);
      color: #fff;
      box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;render(){const e=this.config.auto_discovery_sections?.subbutton??!1,t=ae.map(e=>({value:e,label:ne[e]||e.charAt(0).toUpperCase()+e.slice(1)}));return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expanded=Array(4).fill(!1))}}
      >
        <div slot="header" class="glass-header">🎛️ Subbuttons</div>

        <!-- 1️⃣ Auto-discover -->
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto-discover Subbuttons</label>
        </div>

        <!-- 2️⃣ Quattro mini-pill -->
        ${this._expanded.map((e,i)=>this._renderSubButton(i,e,t))}

        <!-- 3️⃣ Reset -->
        <button class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Sub-buttons
        </button>
      </ha-expansion-panel>
    `}_renderSubButton(e,t,i){const s=`sub-button${e+1}`,o=this._filters[e],n=this._entities[e],a=pe(this.hass,this.config,"subbutton",o),r=this.config.entities?.[s]||{},l=["toggle","more-info","navigate","call-service","none"];return N`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          Sub-button ${e+1}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>
        ${t?N`
          <div class="mini-pill-content">
            <!-- Filter categories -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${o}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${t=>this._onFilter(e,t.detail.value)}
              ></ha-selector>
            </div>

            <!-- Entity -->
            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${n}
                .selector=${{entity:{include_entities:a,multiple:!1}}}
                allow-custom-entity
                @value-changed=${t=>this._onEntity(e,t.detail.value)}
              ></ha-selector>
            </div>

            <!-- Icon picker -->
            <div class="input-group">
              <label>Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${r.icon||""}
                allow-custom-icon
                @value-changed=${t=>this._onIcon(e,t.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Tap/Hold actions -->
            ${["tap","hold"].map(t=>N`
              <div class="input-group">
                <label>${"tap"===t?"Tap Action":"Hold Action"}:</label>
                <div class="pill-group">
                  ${l.map(i=>N`
                    <button
                      class="pill-button ${r[`${t}_action`]?.action===i?"active":""}"
                      @click=${()=>this._onAction(e,t,"action",i)}
                    >${i}</button>
                  `)}
                </div>
                ${"navigate"===r[`${t}_action`]?.action?N`
                  <input
                    type="text"
                    placeholder="Path"
                    .value=${r[`${t}_action`].navigation_path||""}
                    @input=${i=>this._onAction(e,t,"navigation_path",i.target.value)}
                  />
                `:""}
                ${"call-service"===r[`${t}_action`]?.action?N`
                  <input
                    type="text"
                    placeholder="Service"
                    .value=${r[`${t}_action`].service||""}
                    @input=${i=>this._onAction(e,t,"service",i.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Service Data (JSON)"
                    .value=${r[`${t}_action`].service_data?JSON.stringify(r[`${t}_action`].service_data):""}
                    @input=${i=>this._onAction(e,t,"service_data",JSON.parse(i.target.value)||{})}
                  />
                `:""}
              </div>
            `)}
          </div>
        `:""}
      </div>
    `}_toggleAuto(e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.subbutton",val:e},bubbles:!0,composed:!0}))}_togglePill(e){this._expanded=this._expanded.map((t,i)=>i===e&&!t),this.requestUpdate()}_onFilter(e,t){this._filters[e]=[...t],this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"subbutton_filters",val:this._filters},bubbles:!0,composed:!0}))}_onEntity(e,t){this._entities[e]=t,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sub-button${e+1}.entity`,val:t},bubbles:!0,composed:!0}))}_onIcon(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sub-button${e+1}.icon`,val:t},bubbles:!0,composed:!0}))}_onAction(e,t,i,s){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sub-button${e+1}.${t}_action.${i}`,val:s},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...ae]),this._entities=Array(4).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"subbutton_filters",val:this._filters},bubbles:!0,composed:!0}));for(let e=1;e<=4;e++){const t=`entities.sub-button${e}`;["entity","icon"].forEach(e=>{this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`${t}.${e}`,val:""},bubbles:!0,composed:!0}))}),["tap_action","hold_action"].forEach(e=>{this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`${t}.${e}`,val:{action:"tap_action"===e?"toggle":"more-info"}},bubbles:!0,composed:!0}))})}}}customElements.define("sub-button-panel",ye);class $e extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expandedColors:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expandedColors=[!1,!1]}updated(e){(e.has("config")||e.has("hass"))&&ge(this.hass,this.config,"auto_discovery_sections.colors")}static styles=n`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(95,255,235,0.26));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(95,255,235,0.13));
      overflow: hidden;
    }
    .glass-panel::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.14),
        rgba(255,255,255,0.08) 70%, transparent 100%));
      pointer-events: none;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.11rem;
      font-weight: 700;
      color: #fff;
    }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin: 8px 16px;
      overflow: hidden;
      transition: background 0.18s, box-shadow 0.18s, border 0.18s;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      padding: 15px 22px;
      font-weight: 800;
      color: var(--section-accent, #73f6e5);
      cursor: pointer;
      user-select: none;
    }
    .mini-pill-header .chevron {
      margin-left: auto;
      font-size: 1.2em;
      transition: transform 0.18s;
    }
    .mini-pill.expanded .mini-pill-header .chevron {
      transform: rotate(90deg);
    }
    .mini-pill-content {
      padding: 15px 22px 16px;
      animation: pill-expand 0.22s cubic-bezier(.5,1.2,.6,1) both;
      position: relative;
      z-index: 1;
    }
    @keyframes pill-expand {
      from { opacity: 0; transform: translateY(-12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 18px;
      margin-bottom: 13px;
      padding: 14px 18px 10px;
    }
    .input-group label {
      display: block;
      font-size: 1.13rem;
      font-weight: 700;
      color: var(--section-accent, #73f6e5);
      margin-bottom: 6px;
    }
    input[type="color"] {
      width: 56px; height: 32px;
      border: 2px solid #fff4;
      border-radius: 9px;
      cursor: pointer;
    }
    input[type="range"] {
      width: 100%;
    }
    input[type="text"] {
      width: 100%;
      border: 1px solid #444;
      border-radius: 6px;
      padding: 8px;
      background-color: #202020;
      color: #f1f1f1;
      font-size: 0.97rem;
    }
    .reset-button {
      border: 3.5px solid #ff4c6a !important;
      color: #ff4c6a !important;
      font-size: 1.15rem;
      font-weight: 700;
      box-shadow: 0 2px 24px #ff4c6a44;
      padding: 12px 38px !important;
      margin: 20px auto 0 auto !important;
      display: block;
      background: transparent;
      border-radius: 24px !important;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18) !important;
      color: #fff !important;
      box-shadow: 0 6px 32px #ff4c6abf;
    }
  `;render(){return this.config.auto_discovery_sections,N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expandedColors=[!1,!1])}}
      >
        <div slot="header" class="glass-header">🎨 Colors</div>

        <!-- Room colors pill -->
        <div class="mini-pill ${this._expandedColors[0]?"expanded":""}">
          <div
            class="mini-pill-header"
            style="--section-accent: #55afff;"
            @click=${()=>this._toggleColor(0)}
          >
            Room Colors
            <span class="chevron">${this._expandedColors[0]?"▼":"▶"}</span>
          </div>
          ${this._expandedColors[0]?N`
            <div class="mini-pill-content">
              ${this._renderColorField("room","background_active","Background Active")}
              ${this._renderColorField("room","background_inactive","Background Inactive")}
              ${this._renderColorField("room","icon_active","Icon Active")}
              ${this._renderColorField("room","icon_inactive","Icon Inactive")}
            </div>
          `:""}
        </div>

        <!-- Subbutton colors pill -->
        <div class="mini-pill ${this._expandedColors[1]?"expanded":""}">
          <div
            class="mini-pill-header"
            style="--section-accent: #b28fff;"
            @click=${()=>this._toggleColor(1)}
          >
            Subbutton Colors
            <span class="chevron">${this._expandedColors[1]?"▼":"▶"}</span>
          </div>
          ${this._expandedColors[1]?N`
            <div class="mini-pill-content">
              ${this._renderColorField("subbutton","background_on","Background On")}
              ${this._renderColorField("subbutton","background_off","Background Off")}
              ${this._renderColorField("subbutton","icon_on","Icon On")}
              ${this._renderColorField("subbutton","icon_off","Icon Off")}
            </div>
          `:""}
        </div>

        <!-- Reset -->
        <button class="reset-button" @click=${()=>this._resetColors()}>
          🧹 Reset Colors
        </button>
      </ha-expansion-panel>
    `}_toggleColor(e){this._expandedColors=this._expandedColors.map((t,i)=>i===e&&!t)}_renderColorField(e,t,i){const s=this.config.colors?.[e]?.[t]||"",[o,n,a,r]=this._parseRGBA(s),l=`#${[o,n,a].map(e=>e.toString(16).padStart(2,"0")).join("")}`;return N`
      <div class="input-group">
        <label>${i}</label>
        <input
          type="color"
          .value=${l}
          @input=${i=>this._updateColor(e,t,i.target.value,r)}
        />
        <input
          type="range"
          min="0" max="1" step="0.01"
          .value=${r}
          @input=${i=>this._updateColor(e,t,l,i.target.value)}
        />
        <input
          type="text"
          .value=${s}
          @input=${i=>this._updateColorRaw(e,t,i.target.value)}
        />
      </div>
    `}_parseRGBA(e){if(!e)return[0,0,0,1];const t=/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(e);return t?[+t[1],+t[2],+t[3],+(t[4]??1)]:[0,0,0,1]}_updateColor(e,t,i,s){const o=`rgba(${parseInt(i.slice(1,3),16)},${parseInt(i.slice(3,5),16)},${parseInt(i.slice(5,7),16)},${s})`;this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${e}.${t}`,val:o},bubbles:!0,composed:!0}))}_updateColorRaw(e,t,i){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${e}.${t}`,val:i},bubbles:!0,composed:!0}))}_resetColors(){this._expandedColors=[!1,!1];const e={room:["background_active","background_inactive","icon_active","icon_inactive"],subbutton:["background_on","background_off","icon_on","icon_off"]};["room","subbutton"].forEach(t=>{e[t].forEach(e=>{this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${t}.${e}`,val:""},bubbles:!0,composed:!0}))})})}}customElements.define("color-panel",$e);class we extends se{static properties={hass:{type:Object},config:{type:Object},openPanel:{type:String,state:!0}};static styles=n`
    :host {
      display: block;
      padding: 0;
      margin: 0;
      background: transparent;
    }
  `;constructor(){super(),this.hass={},this.config={},this.openPanel=""}setConfig(e){(e={...e}).auto_discovery_sections={room:!!e.area,sensor:!!e.area,mushroom:!!e.area,subbutton:!!e.area,color:!0,...e.auto_discovery_sections||{}},Array.isArray(e.sensor_filters)||(e.sensor_filters=[]),e.entities||(e.entities={}),this.config=e}render(){return N`
      <room-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"room"===this.openPanel}
        @expanded-changed=${e=>this._togglePanel(e,"room")}
        @panel-changed=${this._onConfigChanged}
      ></room-panel>

      <sensor-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"sensor"===this.openPanel}
        @expanded-changed=${e=>this._togglePanel(e,"sensor")}
        @panel-changed=${this._onConfigChanged}
      ></sensor-panel>

      <mushroom-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"mushroom"===this.openPanel}
        @expanded-changed=${e=>this._togglePanel(e,"mushroom")}
        @panel-changed=${this._onConfigChanged}
      ></mushroom-panel>

      <sub-button-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"subbutton"===this.openPanel}
        @expanded-changed=${e=>this._togglePanel(e,"subbutton")}
        @panel-changed=${this._onConfigChanged}
      ></sub-button-panel>

      <color-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"color"===this.openPanel}
        @expanded-changed=${e=>this._togglePanel(e,"color")}
        @panel-changed=${this._onConfigChanged}
      ></color-panel>
    `}_togglePanel(e,t){this.openPanel=e.detail.expanded?t:this.openPanel===t?"":this.openPanel}_onConfigChanged(e){const{prop:t,val:i}=e.detail;this._setConfigValue(t,i),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}_setConfigValue(e,t){const i=e.split(".");let s=this.config;for(let e=0;e<i.length-1;e++){const t=i[e];null==s[t]&&(s[t]={}),s=s[t]}s[i[i.length-1]]=t,this.config={...this.config}}}customElements.define("bubble-room-editor",we);var Ae=Object.freeze({__proto__:null,BubbleRoomEditor:we});class Ee extends se{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16"}static styles=n`
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
  `;render(){const e=this.active?this.colorActive:this.colorInactive;return N`
      <ha-icon
        class="main-icon ${this.active?"active":""}"
        .icon="${this.icon}"
        style="--icon-color: ${e}"
        @click="${()=>this.dispatchEvent(new CustomEvent("main-icon-click"))}"
      ></ha-icon>
    `}}customElements.define("bubble-icon",Ee);class ke extends se{static properties={entities:{type:Array},containerSize:{type:Object}};constructor(){super(),this.entities=[],this.containerSize={width:200,height:200}}static styles=n`
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
  `;_entityRatios(){return[{x:.2,y:.09},{x:.54,y:.05},{x:.81,y:.33},{x:.82,y:.67},{x:.54,y:.92},{x:.2,y:.87}]}render(){const{width:e,height:t}=this.containerSize||{width:200,height:200},i=this._entityRatios();return N`
      <div class="mushroom-container" style="width:${e}px;height:${t}px;">
        ${this.entities.map((s,o)=>{const n=i[o]||{x:.5,y:.5},a=Math.round(n.x*e)-26+"px",r=Math.round(n.y*t)-26+"px";return N`
            <ha-icon
              class="mushroom-entity ${"on"===s.state?"active":""}"
              .icon="${s.icon}"
              style="left: ${a}; top: ${r}; color: ${s.color||"#888"}"
              @click="${()=>this.dispatchEvent(new CustomEvent("mushroom-entity-click",{detail:o}))}"
            ></ha-icon>
          `})}
      </div>
    `}}customElements.define("bubble-mushroom",ke);class Ce extends se{static properties={name:{type:String},area:{type:String}};constructor(){super(),this.name="",this.area=""}static styles=n`
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
    `}}customElements.define("bubble-name",Ce);class Se extends se{static properties={sensors:{type:Array}};static styles=n`
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
  `;render(){const e=this.sensors?.slice(0,3)||[],t=this.sensors?.slice(3,6)||[];return N`
      <div class="sensor-row">
        ${e.map(e=>N`
          <div class="sensor-pill" style="color: ${e.color||"#e3f6ff"}">
            <ha-icon class="sensor-icon" .icon="${e.icon}"></ha-icon>
            <span class="sensor-label">${e.label||""}</span>
            <span class="sensor-value">${e.value??"--"}</span>
            <span class="sensor-unit">${e.unit||""}</span>
          </div>
        `)}
      </div>
      ${t.length?N`
        <div class="sensor-row">
          ${t.map(e=>N`
            <div class="sensor-pill" style="color: ${e.color||"#e3f6ff"}">
              <ha-icon class="sensor-icon" .icon="${e.icon}"></ha-icon>
              <span class="sensor-label">${e.label||""}</span>
              <span class="sensor-value">${e.value??"--"}</span>
              <span class="sensor-unit">${e.unit||""}</span>
            </div>
          `)}
        </div>
      `:""}
    `}}customElements.define("bubble-sensors",Se);class Pe extends se{static properties={subbuttons:{type:Array}};constructor(){super(),this.subbuttons=[]}static styles=n`
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
        ${this.subbuttons.map((e,t)=>N`
            <div
              class="subbutton ${e.active?"active":""}"
              @click="${()=>this.dispatchEvent(new CustomEvent("subbutton-click",{detail:t}))}"
              title="${e.label||""}"
              style="background:${e.active?e.colorOn||"#21df73":e.colorOff||"#455a64"};"
            >
              <ha-icon class="subbutton-icon" .icon="${e.icon}"></ha-icon>
              ${e.label?N`<span class="subbutton-label">${e.label}</span>`:""}
            </div>
          `)}
      </div>
    `}}customElements.define("bubble-subbutton",Pe);const Oe={temperature:{icon:"mdi:thermometer",unit:"°C"},humidity:{icon:"mdi:water-percent",unit:"%"},co2:{icon:"mdi:molecule-co2",unit:"ppm"},lux:{icon:"mdi:brightness-5",unit:"lx"},uv:{icon:"mdi:weather-sunny-alert",unit:"UV"},pressure:{icon:"mdi:gauge",unit:"hPa"},noise:{icon:"mdi:volume-high",unit:"dB"},pm25:{icon:"mdi:blur",unit:"µg/m³"},pm10:{icon:"mdi:blur-linear",unit:"µg/m³"}};class ze extends se{static properties={config:{type:Object},hass:{type:Object}};constructor(){super(),this.config={},this.hass={}}static getStubConfig(){return{type:"custom:bubble-room",name:"Salotto",area:"Zona Giorno",icon:"mdi:sofa",sensors:[{entity_id:"sensor.some_sensor1",type:"temperature",label:"Temperatura",color:"#e3f6ff"}],mushrooms:[{entity_id:"switch.lampada",icon:"mdi:lightbulb",color:"#ffeb3b"}],subbuttons:[{entity_id:"light.luce_tavolo",icon:"mdi:lamp",label:"Tavolo",colorOn:"#00d46d",colorOff:"#999"}],colors:{room:{background_active:"rgba(var(--color-green),1)",background_inactive:"rgba(var(--color-green),0.3)",icon_active:"orange",icon_inactive:"#80808055",mushroom_active:"rgba(var(--color-green),1)",mushroom_inactive:"#80808055"},subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return Ae}),document.createElement("bubble-room-editor")}setConfig(e){this.config=e}static styles=n`
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
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
  `;render(){const e=this.config.icon||"mdi:sofa",t=this.config.colors?.room?.icon_active??this.config.icon_active??"#21df73",i=this.config.colors?.room?.icon_inactive??this.config.icon_inactive??"#173c16",s=this.config.name||"Room",o=this.config.area||"",n=this._getSensors(),a=this._getMushroomEntities(),r=this._getSubButtons();return N`
      <div class="bubble-room-grid">
        <div class="main-area">
          <bubble-sensors .sensors="${n}"></bubble-sensors>
          <bubble-name .name="${s}" .area="${o}"></bubble-name>
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
    `}_getSensors(){return(this.config.sensors||[]).map(e=>{return{icon:Oe[e.type]?.icon||"mdi:help-circle",label:e.label||(t=e.type||"",t?t.charAt(0).toUpperCase()+t.slice(1):""),value:this.hass.states?.[e.entity_id]?.state??"--",unit:Oe[e.type]?.unit||"",color:e.color||"#e3f6ff"};var t})}_getMushroomEntities(){const e=this.config.colors?.room?.mushroom_inactive??"#999";return(this.config.mushrooms||[]).map(t=>({icon:t.icon||"mdi:flash",state:this.hass.states?.[t.entity_id]?.state,color:t.color??e}))}_getSubButtons(){const e=this.config.colors?.subbutton?.background_on??"#00d46d",t=this.config.colors?.subbutton?.background_off??"#999";return(this.config.subbuttons||[]).map(i=>({icon:i.icon||"mdi:light-switch",active:"on"===this.hass.states?.[i.entity_id]?.state,colorOn:i.colorOn??e,colorOff:i.colorOff??t,label:i.label||""}))}_isMainIconActive(){return!!this.config.active}_onMainIconClick(){}_onMushroomEntityClick(e){}_onSubButtonClick(e){}}customElements.define("bubble-room",ze);export{ze as BubbleRoom};
//# sourceMappingURL=lovelace-bubble-room.js.map
