/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var a;const l=window,c=l.trustedTypes,d=c?c.emptyScript:"",h=l.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),b={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:u},g="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||b}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(e=>{const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=b){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;f[g]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:f}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.3");const v=window,_=v.trustedTypes,x=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,y="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,A=`<${w}>`,k=document,C=()=>k.createComment(""),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,z="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,R=/>/g,U=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,M=/"/g,T=/^(?:script|style|textarea|title)$/i,H=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),F=new WeakMap,N=k.createTreeWalker(k,129,null,!1);function L(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const D=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=O;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===O?"!--"===l[1]?r=P:void 0!==l[1]?r=R:void 0!==l[2]?(T.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=U):void 0!==l[3]&&(r=U):r===U?">"===l[0]?(r=null!=o?o:O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?U:'"'===l[3]?M:j):r===M||r===j?r=U:r===P||r===R?r=O:(r=U,o=void 0);const h=r===U&&t[e+1].startsWith("/>")?" ":"";n+=r===O?i+A:c>=0?(s.push(a),i.slice(0,c)+y+i.slice(c)+$+h):i+$+(-2===c?(s.push(void 0),e):h)}return[L(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class V{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=D(t,e);if(this.el=V.createElement(l,i),N.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=N.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(y)||e.startsWith($)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+y).split($),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Y:"?"===e[1]?Z:"@"===e[1]?X:G})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(T.test(s.tagName)){const t=s.textContent.split($),e=t.length-1;if(e>0){s.textContent=_?_.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),N.nextNode(),a.push({type:2,index:++o});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===w)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf($,t+1));)a.push({type:7,index:o}),t+=$.length-1}o++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,s){var o,n,r,a;if(e===I)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=S(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=q(t,l._$AS(t,e.values),l,s)),e}class W{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:k).importNode(i,!0);N.currentNode=o;let n=N.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new J(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new Q(n,this,t)),this._$AV.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=N.nextNode(),r++)}return N.currentNode=k,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,s){var o;this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),S(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>E(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==B&&S(this._$AH)?this._$AA.nextSibling.data=t:this.$(k.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(L(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new W(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new V(t)),e}T(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new J(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,i,s,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=q(this,t,e,0),n=!S(t)||t!==this._$AH&&t!==I,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=q(this,s[i+r],e,r),a===I&&(a=this._$AH[r]),n||(n=!S(a)||a!==this._$AH[r]),a===B?t=B:t!==B&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Y extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}const K=_?_.emptyScript:"";class Z extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==B?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class X extends G{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:B)===I)return;const s=this._$AH,o=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==B&&(s===B||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Q{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const tt=v.litHtmlPolyfillSupport;null==tt||tt(V,J),(null!==(m=v.litHtmlVersions)&&void 0!==m?m:v.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et,it;class st extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new J(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return I}}st.finalized=!0,st._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:st});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:st}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");const nt={alarm_control_panel:"Allarmi",binary_sensor:"Sensori Binari",camera:"Telecamere",climate:"Clima",cover:"Tapparelle",fan:"Ventola",light:"Luce",lock:"Serratura",media_player:"Media Player",scene:"Scene",script:"Script",siren:"Sirena",vacuum:"Aspirapolvere",motion:"Movimento",occupancy:"Occupazione",presence:"Presenza",switch:"Pulsante"},rt=["alarm_control_panel","binary_sensor","camera","climate","cover","fan","light","lock","media_player","scene","script","siren","switch","vacuum"],at=(t=[])=>({includeDomains:rt,entityFilter:(e,i)=>{if(!t.length)return!1;const[s]=e.split(".");if("binary_sensor"===s){const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}return t.includes(s)}}),lt=(t=[])=>({includeDomains:["sensor"],entityFilter:(e,i)=>{if(!t.length)return!0;const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}}),ct=(t=[])=>({includeDomains:rt,entityFilter:(e,i)=>{if(!t.length)return"binary_sensor"===e.split(".")[0];const[s]=e.split(".");if("binary_sensor"===s){const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}return t.includes(s)}}),dt=(t=[])=>({includeDomains:rt,entityFilter:(e,i)=>{if(!t.length)return rt.includes(e.split(".")[0]);const[s]=e.split(".");if("binary_sensor"===s){const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}return t.includes(s)}});function ht(t,e,i,s=[]){if(!t?.states)return[];let o;if("presence"===i?o=at(s):"sensor"===i?o=lt(s):"mushroom"===i?o=ct(s):"subbutton"===i&&(o=dt(s)),!o)return[];const n=Object.keys(t.states).filter(t=>o.includeDomains.includes(t.split(".")[0])).filter(e=>o.entityFilter(e,t));if((e?.auto_discovery_sections?.[i]??!1)&&e?.area){const i=function(t,e){if(!t?.states||!e)return[];const i=t.entities??{},s=t.devices??{};return Object.keys(t.states).filter(o=>{const n=i[o];if(n?.area_id===e)return!0;const r=n?.device_id;if(r&&s[r]?.area_id===e)return!0;const a=t.states[o]?.attributes??{};return a.area_id===e||a.area===e})}(t,e.area);return n.filter(t=>i.includes(t))}return n}const pt=!!window.__BUBBLE_DEBUG__,ut=(t,e)=>t.find(t=>!e.has(t))||null;function bt(t,e){const i={...e.entities||{}},s=i.presence||(i.presence={});if(!s.entity){const i=function(t,e){if(!t||!t.states)return[];const i=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let s=Object.keys(t.states).filter(t=>i.has(t.split(".")[0]));s=s.filter(e=>{if("binary_sensor"!==e.split(".")[0])return!0;const i=t.states[e]?.attributes?.device_class;return["motion","occupancy","presence"].includes(i||"")});const o=e?.area;if(o){const e=s.filter(e=>{const i=t.states[e],s=i?.attributes?.area_id,n=i?.attributes?.area;return s===o||n===o});e.length&&(s=e)}const n=e?.entities?.presence?.entity||e?.presence_entity;return n&&!s.includes(n)&&s.push(n),pt&&console.info("[AutoDiscovery][presence candidates]",{area:o,count:s.length,sample:s.slice(0,8)}),s}(t,e);i.length&&(s.entity=i[0])}return{...e,entities:i}}function gt(t,e,i,s=!1){const o=e.auto_discovery_sections||{},n="area"===i,r=i&&i.startsWith("auto_discovery_sections.");if(!n&&!r)return e;let a=e;return o.sensor&&(a=function(t,e){const i=["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6"],s={...e.entities||{}},o=new Set(i.map(t=>s[t]?.entity_id).filter(Boolean));for(const n of i){const i=s[n]||(s[n]={});if(i.entity_id)continue;const r=ht(t,e,{section:"sensor",type:i.type||""}),a=ut(r,o);a&&(i.entity_id=a,o.add(a))}return{...e,entities:s}}(t,a)),o.mushroom&&(a=function(t,e){const i={...e.entities||{}},s=new Set(["climate","camera","entities1","entities2","entities3","entities4","entities5"].map(t=>i[t]?.entity).filter(Boolean)),o=ht(t,e,"mushroom"),n=i.climate||(i.climate={});if(!n.entity){const t=o.find(t=>t.startsWith("climate.")&&!s.has(t));t&&(n.entity=t,s.add(t))}const r=i.camera||(i.camera={});if(!r.entity){const t=o.find(t=>t.startsWith("camera.")&&!s.has(t));t&&(r.entity=t,s.add(t))}for(const t of["entities1","entities2","entities3","entities4","entities5"]){const e=i[t]||(i[t]={});if(e.entity)continue;const n=ut(o,s);n&&(e.entity=n,s.add(n))}return{...e,entities:i}}(t,a)),o.subbutton&&(a=function(t,e){const i=["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"],s={...e.entities||{}},o=new Set(i.map(t=>s[t]?.entity).filter(Boolean)),n=ht(t,e,"subbutton");for(const t of i){const e=s[t]||(s[t]={});if(e.entity)continue;const i=ut(n,o);i&&(e.entity=i,o.add(i))}return{...e,entities:s}}(t,a)),o.presence&&(a=bt(t,a)),s&&"undefined"!=typeof window&&window.__BUBBLE_DEBUG__&&console.info("[AutoDiscovery] applied after",i,{sections:o}),a}const ft=["presence","motion","occupancy","light","switch","fan"];class mt extends st{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean,state:!0},activeFilters:{type:Array,state:!0},layout:{type:String}};static styles=n`
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
  `;constructor(){super(),this.hass={},this.config={},this._expanded=!1,this.activeFilters=[],this.layout="wide"}updated(t){if(t.has("config")||t.has("hass")){gt(this.hass,this.config,"area"),gt(this.hass,this.config,"auto_discovery_sections.presence"),t.has("config")&&Array.isArray(this.config.presence_filters)&&(this.activeFilters=[...this.config.presence_filters]);const e=this.config.layout;e&&e!==this.layout&&(this.layout=e)}}_onLayoutClick(t){this.layout=t,this._fire("layout",t)}_fire(t,e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}render(){const t=this.config,e=t.auto_discovery_sections?.presence??!1,i=t.area??"",s=t.name??"",o=t.icon??"",n=t.entities?.presence?.entity??"",r=this.activeFilters.length?this.activeFilters:t.presence_filters??[...ft],a=ft.map(t=>({value:t,label:t.charAt(0).toUpperCase()+t.slice(1)})),l=ht(this.hass,this.config,"presence",r);return H`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${t=>this._expanded=t.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>
      
        <!-- 🔍 Auto-discover -->
        <div class="input-group">
          <label>🔍 Auto-discover Presence:</label>
          <input
            type="checkbox"
            .checked=${e}
            @change=${t=>this._fire("auto_discovery_sections.presence",t.target.checked)}
          />
        </div>
      
        <!-- 🏷️ Area -->
        <div class="input-group">
          <label>🏷️ Area:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${i}
            .selector=${{area:{}}}
            @value-changed=${t=>{const e=t.detail.value;this._fire("area",e),e&&(this._fire("name",e.toUpperCase()),this._fire("auto_discovery_sections.presence",!0))}}
          ></ha-selector>
        </div>
      
        <!-- 🏠 Room name -->
        <div class="input-group">
          <label>🏠 Room name:</label>
          <input
            type="text"
            .value=${s}
            @input=${t=>this._fire("name",t.target.value)}
          />
        </div>
      
        <!-- 🎭 Icon & Presence -->
        <div class="mini-pill">
          <div class="mini-pill-header">🎭 Icon & Presence</div>
          <div class="mini-pill-content">
            <!-- Room Icon -->
            <div class="input-group">
              <label>Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${o}
                allow-custom-icon
                @value-changed=${t=>this._fire("icon",t.detail.value)}
              ></ha-icon-picker>
            </div>
      
            <!-- Filter categories -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${r}
                .selector=${{select:{multiple:!0,mode:"box",options:a}}}
                @value-changed=${t=>this._fire("presence_filters",t.detail.value)}
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
                @value-changed=${t=>this._fire("entities.presence.entity",t.detail.value)}
              ></ha-selector>
            </div>
      
            <!-- Actions -->
            ${this._renderActions("tap")}
            ${this._renderActions("hold")}
          </div>
        </div>
      
        <!-- 📐 Layout -->
        <div class="input-group">
          <label>📐 Layout:</label>
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
      
        <!-- 🧹 Reset -->
        <button class="reset-button"
          @click=${()=>this._fire("__panel_cmd__",{cmd:"reset",section:"room"})}>
          🧹 Reset Room
        </button>
      </ha-expansion-panel>
    `}_renderActions(t){const e=this.config?.[`${t}_action`]||{};return H`
      <div class="input-group">
        <label>${"tap"===t?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(i=>H`
            <paper-button
              class="pill-button ${e.action===i?"active":""}"
              @click=${()=>this._fire(`${t}_action.action`,i)}
            >${i}</paper-button>
          `)}
        </div>
        ${"navigate"===e.action?H`
          <input
            type="text"
            placeholder="Path"
            .value=${e.navigation_path||""}
            @input=${e=>this._fire(`${t}_action.navigation_path`,e.target.value)}
          />
        `:""}
        ${"call-service"===e.action?H`
          <input
            type="text"
            placeholder="service: domain.service_name"
            .value=${e.service||""}
            @input=${e=>this._fire(`${t}_action.service`,e.target.value)}
          />
          <input
            type="text"
            placeholder="service_data (JSON)"
            .value=${e.service_data?JSON.stringify(e.service_data):""}
            @input=${e=>{let i=e.target.value;try{i=i?JSON.parse(i):void 0}catch{i=void 0}this._fire(`${t}_action.service_data`,i)}}
          />
        `:""}
      </div>
    `}}customElements.define("room-panel",mt);const vt={temperature:{label:"Temperature",emoji:"🌡️",icon:"mdi:thermometer",units:["°C","°F"]},humidity:{label:"Humidity",emoji:"💧",icon:"mdi:water-percent",units:["%"]},co2:{label:"CO₂",emoji:"🟢",icon:"mdi:molecule-co2",units:["ppm"]},lux:{label:"Luminosity",emoji:"🔆",icon:"mdi:brightness-5",units:["lx"]},uv:{label:"UV Index",emoji:"🌞",icon:"mdi:weather-sunny-alert",units:["UV"]},pressure:{label:"Pressure",emoji:"⏲️",icon:"mdi:gauge",units:["hPa"]},noise:{label:"Noise",emoji:"🔊",icon:"mdi:volume-high",units:["dB"]},pm25:{label:"PM2.5",emoji:"🌫️",icon:"mdi:blur",units:["µg/m³"]},pm10:{label:"PM10",emoji:"🌫️",icon:"mdi:blur-linear",units:["µg/m³"]}};class _t extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(8).fill(!1);const t=Object.keys(vt);this._filters=Array(8).fill().map(()=>[...t]),this._entities=Array(8).fill("")}updated(t){if(t.has("config")||t.has("hass")){gt(this.hass,this.config,"auto_discovery_sections.sensor");for(let t=0;t<8;t++){const e=`sensor${t+1}`,i=this.config.sensor_filters?.[t],s=this.config.entities?.[e]?.entity;Array.isArray(i)&&(this._filters[t]=[...i]),s&&(this._entities[t]=s)}}}static styles=n`
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
  `;render(){const t=this.config.auto_discovery_sections?.sensor??!1,e=Object.entries(vt).map(([t,e])=>({value:t,label:`${e.emoji} ${e.label}`}));return H`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${t=>{this.expanded=t.detail.expanded,this.expanded&&(this._expanded=Array(8).fill(!1))}}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <!-- Auto-discover -->
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${t}
            @change=${t=>this._toggleAuto(t.target.checked)}
          />
          <label>🪄 Auto-discover Sensors</label>
        </div>

        <!-- Sei mini-pill -->
        ${this._expanded.map((t,i)=>this._renderSensor(i,t,e))}

        <!-- Reset -->
        <button class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Sensors
        </button>
      </ha-expansion-panel>
    `}_renderSensor(t,e,i){const s=this._filters[t],o=this._entities[t],n=ht(this.hass,this.config,"sensor",s);return H`
      <div class="mini-pill ${e?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(t)}>
          Sensor ${t+1}
          <span class="chevron">${e?"▼":"▶"}</span>
        </div>
        ${e?H`
          <div class="mini-pill-content">
            <!-- Filter category (multi‐select pill) -->
            <div class="input-group">
              <label>Filter category:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${s}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${e=>this._onFilter(t,e.detail.value)}
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
                @value-changed=${e=>this._onEntity(t,e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Preview basata su device_class -->
            ${o?(()=>{const t=this.hass.states[o],e=t?.attributes?.device_class,i=vt[e]||{},s=i.emoji||"❓",n=t?.attributes?.unit_of_measurement||(i.units?.[0]??"");return H`
                <div class="preview">
                  <span class="emoji">${s}</span>
                  <div class="state">${t?.state??"-"} ${n}</div>
                </div>
              `})():""}
          </div>
        `:""}
      </div>
    `}_toggleAuto(t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.sensor",val:t},bubbles:!0,composed:!0}))}_togglePill(t){this._expanded=this._expanded.map((e,i)=>i===t&&!e),this.requestUpdate()}_onFilter(t,e){this._filters[t]=[...e],this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"sensor_filters",val:this._filters},bubbles:!0,composed:!0}))}_onEntity(t,e){this._entities[t]=e,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${t+1}.entity`,val:e},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(8).fill(!1);const t=Object.keys(vt);this._filters=Array(8).fill().map(()=>[...t]),this._entities=Array(8).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"sensor_filters",val:this._filters},bubbles:!0,composed:!0}));for(let t=1;t<=8;t++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${t}.entity`,val:""},bubbles:!0,composed:!0}))}}customElements.define("sensor-panel",_t);class xt extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...rt]),this._entities=Array(5).fill("")}updated(t){if(t.has("config")||t.has("hass")){gt(this.hass,this.config,"auto_discovery_sections.mushroom");const t=this.config.mushroom_filters;Array.isArray(t)&&5===t.length&&(this._filters=t.map(t=>Array.isArray(t)?[...t]:[...rt]));const e=this.config.entities||{};for(let t=0;t<5;t++){const i=`mushroom${t+1}`,s=e[i]?.entity;s&&(this._entities[t]=s)}}}static styles=n`
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
  `;render(){const t=this.config.auto_discovery_sections?.mushroom??!1,e=rt.map(t=>({value:t,label:nt[t]||t.charAt(0).toUpperCase()+t.slice(1)}));return H`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${t=>{this.expanded=t.detail.expanded,this.expanded&&(this._expanded=Array(5).fill(!1))}}
      >
        <div slot="header" class="glass-header">🍄 Mushroom Entities</div>

        <!-- 1️⃣ Auto-discover -->
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${t}
            @change=${t=>this._toggleAuto(t.target.checked)}
          />
          <label>🪄 Auto-discover Mushroom</label>
        </div>

        <!-- 2️⃣ Cinque mini-pill -->
        ${this._expanded.map((t,i)=>this._renderMushroom(i,t,e))}

        <!-- 3️⃣ Reset -->
        <button class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Mushrooms
        </button>
      </ha-expansion-panel>
    `}_renderMushroom(t,e,i){const s=this._filters[t],o=this._entities[t],n=ht(this.hass,this.config,"mushroom",s);return H`
      <div class="mini-pill ${e?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(t)}>
          Mushroom ${t+1}
          <span class="chevron">${e?"▼":"▶"}</span>
        </div>
        ${e?H`
          <div class="mini-pill-content">
            <!-- Filter categories -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${s}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${e=>this._onFilter(t,e.detail.value)}
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
                @value-changed=${e=>this._onEntity(t,e.detail.value)}
              ></ha-selector>
            </div>
          </div>
        `:""}
      </div>
    `}_toggleAuto(t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.mushroom",val:t},bubbles:!0,composed:!0}))}_togglePill(t){this._expanded=this._expanded.map((e,i)=>i===t&&!e),this.requestUpdate()}_onFilter(t,e){this._filters[t]=[...e],this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}))}_onEntity(t,e){this._entities[t]=e,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t+1}.entity`,val:e},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...rt]),this._entities=Array(5).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}));for(let t=1;t<=5;t++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t}.entity`,val:""},bubbles:!0,composed:!0}))}}customElements.define("mushroom-panel",xt);const yt={door:{on:"mdi:door-open",off:"mdi:door-closed"},window:{on:"mdi:window-open",off:"mdi:window-closed"},motion:{on:"mdi:motion-sensor",off:"mdi:motion-sensor-off"},moisture:{on:"mdi:water-alert",off:"mdi:water-off"},smoke:{on:"mdi:smoke",off:"mdi:smoke-detector-off"},gas:{on:"mdi:gas-cylinder",off:"mdi:gas-off"},lock:{on:"mdi:lock-open-variant",off:"mdi:lock"},garage:{on:"mdi:garage-open",off:"mdi:garage"},light:{on:"mdi:lightbulb-on",off:"mdi:lightbulb-off"},plug:{on:"mdi:power-plug",off:"mdi:power-plug-off"},presence:{on:"mdi:account",off:"mdi:account-off"},vibration:{on:"mdi:vibrate",off:"mdi:vibrate-off"},opening:{on:"mdi:door-open",off:"mdi:door-closed"},battery:{on:"mdi:battery",off:"mdi:battery-outline"},connectivity:{on:"mdi:wifi",off:"mdi:wifi-off"},safety:{on:"mdi:shield-check",off:"mdi:shield-off"},cold:{on:"mdi:snowflake",off:"mdi:snowflake-off"}},$t={light:"mdi:lightbulb",switch:"mdi:toggle-switch",fan:"mdi:fan",climate:"mdi:thermostat",cover:"mdi:window-shutter",media_player:"mdi:play-circle",script:"mdi:script-text",scene:"mdi:palette",lock:"mdi:lock",camera:"mdi:video",binary_sensor:"mdi:checkbox-marked-circle-outline",sensor:"mdi:eye",alarm_control_panel:"mdi:shield-home",vacuum:"mdi:robot-vacuum",siren:"mdi:bullhorn"};function wt(t,e){const i=e.states?.[t],s=i?.attributes||{},o=s.device_class,n=t?.split(".")?.[0]??"",r=i?.state,a=o&&yt[o]?yt[o]["on"===r?"on":"off"]:null;return s.icon||a||$t[n]||"mdi:bookmark"}class At extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...rt]),this._entities=Array(4).fill("")}updated(t){if(t.has("config")||t.has("hass")){gt(this.hass,this.config,"auto_discovery_sections.subbutton"),Array.isArray(this.config.subbuttons)||(this.config.subbuttons=Array(4).fill().map(()=>({})));const t=this.config.subbutton_filters;Array.isArray(t)&&4===t.length&&(this._filters=t.map(t=>Array.isArray(t)?[...t]:[...rt]));for(let t=0;t<4;t++){const e=this.config.subbuttons[t]?.entity_id||"";this._entities[t]=e}}}static styles=n`
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
  `;render(){const t=this.config.auto_discovery_sections?.subbutton??!1,e=rt.map(t=>({value:t,label:nt[t]||t.charAt(0).toUpperCase()+t.slice(1)}));return H`
        <ha-expansion-panel
          class="glass-panel"
          .expanded=${this.expanded}
          @expanded-changed=${t=>this.expanded=t.detail.expanded}
        >
          <div slot="header" class="glass-header">🎛️ Sub-buttons</div>
  
          <div class="input-group autodiscover">
            <input type="checkbox" .checked=${t}
                   @change=${t=>this._toggleAuto(t.target.checked)} />
            <label>🪄 Auto-discover Subbuttons</label>
          </div>
  
          ${this._expanded.map((t,i)=>this._renderSubButton(i,t,e))}
  
          <button class="reset-button" @click=${()=>this._reset()}>🧹 Reset Sub-buttons</button>
        </ha-expansion-panel>
      `}_renderSubButton(t,e,i){const s=this._filters[t],o=this._entities[t],n=ht(this.hass,this.config,"subbutton",s),r=this.config.subbuttons?.[t]||{},a=["toggle","more-info","navigate","call-service","none"];return H`
        <div class="mini-pill ${e?"expanded":""}">
          <div class="mini-pill-header" @click=${()=>this._togglePill(t)}>
            Sub-button ${t+1}  <span class="chevron">${e?"▼":"▶"}</span>
          </div>
          ${e?H`
            <div class="mini-pill-content">
              <div class="input-group">
                <label>Filter categories:</label>
                <ha-selector .hass=${this.hass} .value=${s}
                  .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                  @value-changed=${e=>this._onFilter(t,e.detail.value)}
                ></ha-selector>
              </div>
  
              <div class="input-group">
                <label>Entity:</label>
                <ha-selector .hass=${this.hass} .value=${o}
                  .selector=${{entity:{include_entities:n,multiple:!1}}}
                  allow-custom-entity
                  @value-changed=${e=>this._onEntity(t,e.detail.value)}
                ></ha-selector>
              </div>
  
              <div class="input-group">
                <label>Icon:</label>
                <ha-icon-picker .hass=${this.hass} .value=${r.icon||""}
                  allow-custom-icon
                  @value-changed=${e=>this._onIcon(t,e.detail.value)}
                ></ha-icon-picker>
              </div>
  
              ${["tap","hold"].map(e=>H`
                <div class="input-group">
                  <label>${"tap"===e?"Tap Action":"Hold Action"}:</label>
                  <div class="pill-group">
                    ${a.map(i=>H`
                      <button
                        class="pill-button ${r[`${e}_action`]?.action===i?"active":""}"
                        @click=${()=>this._onAction(t,e,"action",i)}
                      >${i}</button>
                    `)}
                  </div>
                  ${this._extraFields(t,e,r)}
                </div>
              `)}
            </div>
          `:""}
        </div>
      `}_extraFields(t,e,i){const s=i[`${e}_action`]?.action;return"navigate"===s?H`
          <input type="text" placeholder="Path"
            .value=${i[`${e}_action`]?.navigation_path||""}
            @input=${i=>this._onAction(t,e,"navigation_path",i.target.value)}
          />
        `:"call-service"===s?H`
          <input type="text" placeholder="Service"
            .value=${i[`${e}_action`]?.service||""}
            @input=${i=>this._onAction(t,e,"service",i.target.value)}
          />
          <input type="text" placeholder='Service Data (JSON)'
            .value=${i[`${e}_action`]?.service_data?JSON.stringify(i[`${e}_action`].service_data):""}
            @input=${i=>this._onAction(t,e,"service_data",this._safeJson(i.target.value))}
          />
        `:""}_safeJson(t){try{return JSON.parse(t)}catch{return{}}}_toggleAuto(t){this._emit("auto_discovery_sections.subbutton",t)}_togglePill(t){this._expanded=this._expanded.map((e,i)=>i===t&&!e)}_onFilter(t,e){this._filters[t]=[...e],this._emit("subbutton_filters",this._filters)}_onEntity(t,e){this._entities[t]=e,this.config.subbuttons[t]||(this.config.subbuttons[t]={}),this.config.subbuttons[t].entity_id=e,!this.config.subbuttons[t].icon&&this.hass&&(this.config.subbuttons[t].icon=wt(e,this.hass)),this._emit("subbuttons",this.config.subbuttons)}_onIcon(t,e){this.config.subbuttons[t]||(this.config.subbuttons[t]={}),this.config.subbuttons[t].icon=e,this._emit("subbuttons",this.config.subbuttons)}_onAction(t,e,i,s){this.config.subbuttons[t]||(this.config.subbuttons[t]={}),this.config.subbuttons[t][`${e}_action`]={...this.config.subbuttons[t][`${e}_action`],[i]:s},this._emit("subbuttons",this.config.subbuttons)}_reset(){this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...rt]),this._entities=Array(4).fill(""),this.config.subbuttons=Array(4).fill().map(()=>({})),this._emit("subbutton_filters",this._filters),this._emit("subbuttons",this.config.subbuttons)}_emit(t,e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}}customElements.define("sub-button-panel",At);class kt extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expandedColors:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expandedColors=[!1,!1]}updated(t){(t.has("config")||t.has("hass"))&&gt(this.hass,this.config,"auto_discovery_sections.colors")}static styles=n`
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
  `;render(){return this.config.auto_discovery_sections,H`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${t=>{this.expanded=t.detail.expanded,this.expanded&&(this._expandedColors=[!1,!1])}}
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
          ${this._expandedColors[0]?H`
            <div class="mini-pill-content">
              ${this._renderColorField("room","background_active","Background Active")}
              ${this._renderColorField("room","background_inactive","Background Inactive")}
              ${this._renderColorField("room","icon_active","Icon Active")}
              ${this._renderColorField("room","icon_inactive","Icon Inactive")}
              ${this._renderColorField("room","text_active","Text Active")}       <!-- ✅ AGGIUNTO -->
              ${this._renderColorField("room","text_inactive","Text Inactive")}   <!-- ✅ AGGIUNTO -->
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
          ${this._expandedColors[1]?H`
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
    `}_toggleColor(t){this._expandedColors=this._expandedColors.map((e,i)=>i===t&&!e)}_renderColorField(t,e,i){const s=this.config.colors?.[t]?.[e]||"",[o,n,r,a]=this._parseRGBA(s),l=`#${[o,n,r].map(t=>t.toString(16).padStart(2,"0")).join("")}`;return H`
      <div class="input-group">
        <label>${i}</label>
        <input
          type="color"
          .value=${l}
          @input=${i=>this._updateColor(t,e,i.target.value,a)}
        />
        <input
          type="range"
          min="0" max="1" step="0.01"
          .value=${a}
          @input=${i=>this._updateColor(t,e,l,i.target.value)}
        />
        <input
          type="text"
          .value=${s}
          @input=${i=>this._updateColorRaw(t,e,i.target.value)}
        />
      </div>
    `}_parseRGBA(t){if(!t)return[0,0,0,1];const e=/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(t);return e?[+e[1],+e[2],+e[3],+(e[4]??1)]:[0,0,0,1]}_updateColor(t,e,i,s){const o=`rgba(${parseInt(i.slice(1,3),16)},${parseInt(i.slice(3,5),16)},${parseInt(i.slice(5,7),16)},${s})`;this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${t}.${e}`,val:o},bubbles:!0,composed:!0}))}_updateColorRaw(t,e,i){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${t}.${e}`,val:i},bubbles:!0,composed:!0}))}_resetColors(){this._expandedColors=[!1,!1];const t={room:["background_active","background_inactive","icon_active","icon_inactive","text_active","text_inactive"],subbutton:["background_on","background_off","icon_on","icon_off"]};["room","subbutton"].forEach(e=>{t[e].forEach(t=>{this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${e}.${t}`,val:""},bubbles:!0,composed:!0}))})})}}customElements.define("color-panel",kt);class Ct extends st{static properties={hass:{type:Object},config:{type:Object},openPanel:{type:String,state:!0}};static styles=n`
    :host {
      display: block;
      padding: 0;
      margin: 0;
      background: transparent;
    }
  `;constructor(){super(),this.hass={},this.config={},this.openPanel=""}setConfig(t){const e={layout:"wide",...t};e.auto_discovery_sections={room:!!e.area,sensor:!!e.area,mushroom:!!e.area,subbutton:!!e.area,color:!0,...e.auto_discovery_sections||{}},Array.isArray(e.sensor_filters)||(e.sensor_filters=[]),e.entities||(e.entities={}),this.config=e}render(){return H`
      <room-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"room"===this.openPanel}
        @expanded-changed=${t=>this._togglePanel(t,"room")}
        @panel-changed=${this._onConfigChanged}
      ></room-panel>

      <sensor-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"sensor"===this.openPanel}
        @expanded-changed=${t=>this._togglePanel(t,"sensor")}
        @panel-changed=${this._onConfigChanged}
      ></sensor-panel>

      <mushroom-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"mushroom"===this.openPanel}
        @expanded-changed=${t=>this._togglePanel(t,"mushroom")}
        @panel-changed=${this._onConfigChanged}
      ></mushroom-panel>

      <sub-button-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"subbutton"===this.openPanel}
        @expanded-changed=${t=>this._togglePanel(t,"subbutton")}
        @panel-changed=${this._onConfigChanged}
      ></sub-button-panel>

      <color-panel
        .hass=${this.hass}
        .config=${this.config}
        .expanded=${"color"===this.openPanel}
        @expanded-changed=${t=>this._togglePanel(t,"color")}
        @panel-changed=${this._onConfigChanged}
      ></color-panel>
    `}_togglePanel(t,e){this.openPanel=t.detail.expanded?e:this.openPanel===e?"":this.openPanel}_onConfigChanged(t){const{prop:e,val:i}=t.detail;this._setConfigValue(e,i),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}_setConfigValue(t,e){const i=t.split(".");let s=this.config;for(let t=0;t<i.length-1;t++){const e=i[t];null==s[e]&&(s[e]={}),s=s[e]}s[i[i.length-1]]=e,this.config={...this.config}}}customElements.define("bubble-room-editor",Ct);var St=Object.freeze({__proto__:null,BubbleRoomEditor:Ct});class Et extends st{static properties={subbuttons:{type:Array}};constructor(){super(),this.subbuttons=[],this._holdThreshold=500,this._holdTimer=null,this._holdFired=!1,this._currentIndex=-1}static styles=n`
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
    
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      min-height: 0;
      min-width: 0;
      box-sizing: border-box;
    }
    
    .sub-button {
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 2px 0;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
      min-height: 0;
    }
    
    .sub-button:first-child {
      margin-top: 0;
    }
    
    .sub-button:last-child {
      margin-bottom: 0;
    }
    
    .sub-button:active {
      transform: scale(0.97);
    }
    
    /* 👇 Icona scalabile al contenitore */
    .sub-button ha-icon {
      width: 80%;
      height: 80%;
    }
    
    /* 👇 (Opzionale) Rende l'icona SVG responsiva */
    ha-icon {
      --mdc-icon-size: 100%;
    }
    
    ha-icon svg {
      width: 100%;
      height: 100%;
    }
  `;render(){return H`
      <div class="container">
        ${this.subbuttons.map((t,e)=>{const i=t.active?t.colorOn:t.colorOff,s=t.active?t.iconOn:t.iconOff;return H`
            <div
              class="sub-button"
              style="background:${i};color:${s};"
              @pointerdown=${()=>this._onDown(e)}
              @pointerup=${()=>this._onUp(e)}
              @pointerleave=${()=>this._clearHoldTimer()}
              @pointercancel=${()=>this._clearHoldTimer()}
            >
              <ha-icon icon="${t.icon}"></ha-icon>
            </div>
          `})}
      </div>
    `}_onDown(t){this._holdFired=!1,this._currentIndex=t,this._holdTimer=window.setTimeout(()=>{this._holdFired=!0,this._fireHassAction(t,"hold")},this._holdThreshold)}_onUp(t){this._clearHoldTimer(),this._holdFired||this._currentIndex!==t||this._fireHassAction(t,"tap")}_clearHoldTimer(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)}_fireHassAction(t,e){const i=this.subbuttons?.[t];if(!i||!i.entity_id)return;const s={entity:i.entity_id,tap_action:i.tap_action||{action:"toggle"},hold_action:i.hold_action||{action:"more-info"}},o=new Event("hass-action",{bubbles:!0,composed:!0});o.detail={config:s,action:e},this.dispatchEvent(o)}}customElements.define("bubble-subbutton",Et);class zt extends st{static properties={hass:{type:Object},name:{type:String},area:{type:String},config:{type:Object},container:{type:Object}};_raf=null;_resizeObs=null;constructor(){super(),this.name=""}firstUpdated(){this._scheduleScale(),this._resizeObs=new ResizeObserver(()=>this._scheduleScale()),this._resizeObs.observe(this),window.addEventListener("resize",this._scheduleScale,{passive:!0})}updated(t){(t.has("name")||t.has("config")||t.has("container"))&&this._scheduleScale()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObs?.disconnect(),window.removeEventListener("resize",this._scheduleScale)}_scheduleScale=()=>{this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=null,this._autoScaleFont()}))};_autoScaleFont(){const t=this.renderRoot.querySelector(".bubble-name"),e=this.container||this.parentElement||this;if(!t||!e)return;this._resizeObs.disconnect();let i=8,s=160;for(let o=0;o<8;o++){const o=i+s>>1;t.style.fontSize=`${o}px`,t.scrollWidth<=e.clientWidth&&t.scrollHeight<=e.clientHeight?i=o:s=o-1}t.style.fontSize=`${i}px`,this._resizeObs.observe(this)}_isRoomActive(){const t=this.config?.entities?.presence?.entity;if(!t)return!1;const e=this.hass?.states?.[t]?.state;return["on","home","occupied","motion","detected"].includes(e)}render(){return H`<div class="bubble-name">${this.name}</div>`}static styles=n`
    .bubble-name {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 1.1;
      font-family: "Arial Narrow", sans-serif;
      font-weight: 600;
      letter-spacing: 0.02em;
      font-stretch: condensed;
      text-align: center;
      white-space: nowrap;
      text-transform: uppercase;
      color: var(--bubble-room-name-color, white);
    }
  `}customElements.define("bubble-name",zt);class Ot extends st{static properties={sensors:{type:Array}};constructor(){super(),this.sensors=[],this.rows=1,this.columns=1,this._resizeObserver=null,this._resizeScheduled=!1}connectedCallback(){super.connectedCallback(),this._updateLayout(),this._resizeObserver=new ResizeObserver(()=>{this._resizeScheduled||(this._resizeScheduled=!0,requestAnimationFrame(()=>{this._autoScaleValues(),this._resizeScheduled=!1}))}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect()}updated(t){t.has("sensors")&&(this._updateLayout(),this._autoScaleValues())}_updateLayout(){const t=this.sensors?.length||0;this.rows=t>4?2:1,this.columns=t>4?4:t||1}_autoScaleValues(){const t=this.renderRoot?.querySelectorAll(".sensor-value");t&&t.forEach(t=>this._autoScaleValueFont(t))}_autoScaleValueFont(t){const e=t?.parentElement;if(!e)return;const i=.48*e.clientWidth,s=.75*e.clientHeight;if(Math.min(i,s)<=0)return;t.style.fontSize="";let o=parseInt(getComputedStyle(t).fontSize,10)||14;for(;o>8;){t.style.fontSize=`${o}px`;const{width:e,height:n}=t.getBoundingClientRect();if(e<=i&&n<=s)break;o--}t.style.fontSize=`${o}px`}static styles=n`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      contain: strict;
    }

    .sensor-grid {
      display: grid;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    .sensor-pill {
      display: flex;
      align-items: center;
      background: rgba(32,38,55,0.12);
      border-radius: 18px;
      font-size: 1em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      contain: strict;
    }

    .sensor-icon {
      font-size: 1.14em;
      opacity: 0.81;
    }

    .sensor-label {
      opacity: 0.78;
      font-weight: 600;
      font-size: clamp(9px, 0.85vw, 13px);
      transform: scale(0.85);
      display: inline-block;
      line-height: 1;
    }

    .sensor-value {
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
      line-height: 1;
    }

    .sensor-unit {
      opacity: 0.75;
      font-weight: 600;
      font-size: clamp(9px, 1vw, 14px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;render(){const t=(this.sensors||[]).map(t=>{const e=t.device_class,i=vt[e]||{},s=i.emoji||"❓",o=t.unit||i.units?.[0]||"";return{...t,label:s,unit:o}});return H`
      <div
        class="sensor-grid"
        style="
          grid-template-columns: repeat(${this.columns}, 1fr);
          grid-template-rows: repeat(${this.rows}, 1fr);
        "
      >
        ${t.map(t=>H`
          <div class="sensor-pill" style="color: ${t.color||"#e3f6ff"}">
            <ha-icon class="sensor-icon" .icon="${t.icon||""}"></ha-icon>
            <span class="sensor-label">${t.label||""}</span>
            <span class="sensor-value">${t.value??"--"}</span>
            <span class="sensor-unit">${t.unit||""}</span>
          </div>
        `)}
      </div>
    `}}customElements.define("bubble-sensor",Ot);class Pt extends st{static properties={entities:{type:Array}};constructor(){super(),this.entities=[],this._containerSize={width:0,height:0},this._ro=new ResizeObserver(()=>this._updateSize())}connectedCallback(){super.connectedCallback(),this._ro.observe(this)}disconnectedCallback(){this._ro.disconnect(),super.disconnectedCallback()}_updateSize(){const t=this.getBoundingClientRect();this._containerSize={width:t.width,height:t.height},this.requestUpdate()}_handleClick(t){this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:{entity:t.entity_id,tap_action:t.tap_action||{action:"toggle"},hold_action:t.hold_action||{action:"more-info"}},action:"tap"},bubbles:!0,composed:!0}))}static styles=n`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      contain: strict;
    }
    .mushroom-entity {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      pointer-events: auto;
    }
    .mushroom-entity ha-icon { display: block; }
  `;render(){const{width:t,height:e}=this._containerSize;if(!t||!e)return H``;const i=window.innerWidth||t,s=.55;let o;if(i<=100)o=s;else if(i>=200)o=.25;else{o=s+(.25-s)*((i-100)/100)}const n=.5*(e+Math.min(t,1.6*e))*o,r=.6*t,a=.6*e,l=r*Math.min(1,t/(2*r)),c=a*Math.min(1,e/(2*a)),d=t-l,h=.5*e,p=t=>Math.PI*t/180,u=Math.max(0,l-n/2-1),b=Math.max(0,c-n/2-1),g=p(30),f=p(85),m=[{x:n/2+1,y:n/2+1},{x:d+u*Math.cos(-f),y:h+b*Math.sin(-f)},{x:d+u*Math.cos(-g),y:h+b*Math.sin(-g)},{x:d+u*Math.cos(+g),y:h+b*Math.sin(+g)},{x:d+u*Math.cos(+f),y:h+b*Math.sin(+f)}];return H`
      ${this.entities.map((t,e)=>{const i=m[e]??{x:d,y:h},s=i.x+(t.dx??0),o=i.y+(t.dy??0);return H`
          <div
            class="mushroom-entity"
            style="
              left:${s}px;
              top:${o}px;
              width:${n}px;
              height:${n}px;
              color:${t.color};
            "
            @click=${()=>this._handleClick(t)}
          >
            <ha-icon icon="${t.icon}" style="--mdc-icon-size:${.95*n}px;"></ha-icon>
          </div>
        `})}
    `}}customElements.define("bubble-mushroom",Pt);class Rt extends st{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String},backgroundActive:{type:String},backgroundInactive:{type:String}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16",this.backgroundActive="rgba(33,223,115,0.12)",this.backgroundInactive="rgba(23,60,22,0.08)"}static styles=n`
    :host {
      position: absolute;   /* prende come riferimento .icon-mushroom-area */
      inset: 0;
      box-sizing: border-box;
    .main-icon-container {
      opacity: 0.30;
      box-sizing: border-box;
      background: var(--main-icon-bg, rgba(33,223,115,0.12));
      border-radius: 0 70% 70% 0;
      display: flex;
      width:100%;
      height:100%;
      justify-content: center;
      align-items:   center;
    }
    .main-icon {
      --mdc-icon-size: var(--main-icon-size, 160px);
      width: var(--mdc-icon-size);
      height: var(--mdc-icon-size);
      transform: translateX(var(--icon-shift-x, -20%));
    }
  `;render(){const t=this.active?this.colorActive:this.colorInactive,e=this.active?this.backgroundActive:this.backgroundInactive;return H`
      <div class="main-icon-container" style="background:${e}">
        <ha-icon
          class="main-icon"
          .icon="${this.icon}"
          style="color:${t}"
          @click="${()=>this.dispatchEvent(new CustomEvent("main-icon-click"))}"
        ></ha-icon>
      </div>
    `}}customElements.define("bubble-icon",Rt);class Ut extends st{static properties={config:{type:Object},hass:{type:Object}};_entities={};constructor(){super(),this.config={},this.hass={}}setConfig(t){this.config={layout:"wide",...t},this._entities=structuredClone(this.config.entities||{})}static getStubConfig(){return{type:"custom:bubble-room",layout:"wide",name:[],area:[],sensors:[],mushrooms:[],subbuttons:[],colors:{subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return St}),document.createElement("bubble-room-editor")}connectedCallback(){super.connectedCallback(),this._resizeObs=new ResizeObserver(()=>this.requestUpdate())}firstUpdated(){const t=this.shadowRoot?.querySelector(".icon-mushroom-area");t&&this._resizeObs.observe(t)}disconnectedCallback(){this._resizeObs?.disconnect(),super.disconnectedCallback()}updated(t){t.has("config")&&(this._entities=structuredClone(this.config.entities||{}))}_getSubButtons(){const t=this.config.colors?.subbutton?.background_on??"#00d46d",e=this.config.colors?.subbutton?.background_off??"#999",i=this.config.colors?.subbutton?.icon_on??"yellow",s=this.config.colors?.subbutton?.icon_off??"#666";return(this.config.subbuttons||[]).map(o=>{const n=this.hass.states?.[o.entity_id];return{icon:o.icon||wt(o.entity_id,this.hass),active:"on"===n?.state,colorOn:t,colorOff:e,iconOn:i,iconOff:s,entity_id:o.entity_id,tap_action:o.tap_action,hold_action:o.hold_action}})}_isRoomActive(){const t=this.config?.entities?.presence?.entity;if(!t)return!1;const e=this.hass?.states?.[t]?.state;return["on","home","occupied","motion","detected"].includes(e)}_getMainIconSize(){const t=this.shadowRoot?.querySelector(".icon-mushroom-area");return t?Math.round(.6*Math.min(t.clientWidth,t.clientHeight)):64}_getSensors(){const t=this._entities||{},e=this.config.colors?.room?.sensor_active??this.config.colors?.room?.text_active??"#21df73",i=this.config.colors?.room?.sensor_inactive??this.config.colors?.room?.text_inactive??"#173c16",s=this._isRoomActive()?e:i,o=[];for(let e=1;e<=6;e++){const i=t[`sensor${e}`]?.entity,n=this.hass?.states?.[i];i&&n&&o.push({icon:n.attributes.icon||"",value:n.state,unit:n.attributes.unit_of_measurement,device_class:n.attributes.device_class,color:s})}return o}_getMushrooms(){const t=this._entities||{},e=[];for(let i=1;i<=6;i++){const s=t[`mushroom${i}`]?.entity,o=this.hass?.states?.[s];if(!s||!o)continue;const n="on"===o.state?this.config.colors?.mushroom?.active??"#00e676":this.config.colors?.mushroom?.inactive??"#888";e.push({icon:o.attributes.icon||"mdi:flash",state:o.state,color:n,dx:t[`mushroom${i}`]?.dx??0,dy:t[`mushroom${i}`]?.dy??0,angle_deg:t[`mushroom${i}`]?.angle_deg,radius_factor:t[`mushroom${i}`]?.radius_factor})}return e}_onMushroomClick(t){}render(){const t=this.config.layout||"wide",e=this._getMainIconSize(),i=this._getSubButtons(),s=this._isRoomActive(),o=this.config.colors?.room?.icon_active??"#21df73",n=this.config.colors?.room?.icon_inactive??"#173c16",r=this.config.colors?.room?.background_active??"rgba(33,223,115,0.12)",a=this.config.colors?.room?.background_inactive??"rgba(23,60,22,0.12)",l=this.config.colors?.room?.text_active??"#ffffff",c=this.config.colors?.room?.text_inactive??"rgba(255,255,255,0.5)";return H`
      <div class="bubble-room-grid ${t}">
        <div class="main-area">
          <div class="row1">
            <bubble-sensor .sensors="${this._getSensors()}"></bubble-sensor>

            <div class="name-placeholder" id="nameContainer">
              <bubble-name
                .name="${this.config.name}"
                .area="${this.config.area}"
                .hass=${this.hass}
                .config=${this.config}
                .container=${this.shadowRoot?.getElementById("nameContainer")}
                style="--bubble-room-name-color:${s?l:c}"
              ></bubble-name>
            </div>
          </div>

          <div class="row2">
            <div class="icon-mushroom-area">
              <bubble-icon
                .icon="${this.config.icon}"
                .active=${s}
                .colorActive="${o}"
                .colorInactive="${n}"
                .backgroundActive="${r}"
                .backgroundInactive="${a}"
                style="
                  --main-icon-size:${e}px;
                  --icon-shift-x:-20%;
                "
              ></bubble-icon>

              <bubble-mushroom
                .entities="${this._getMushrooms()}"
                .containerSize="${{width:180,height:180}}"
                @mushroom-entity-click="${this._onMushroomClick}"
              ></bubble-mushroom>
            </div>
            <div class="k-space"></div>
          </div>
        </div>

        <div class="sidebar">
          <bubble-subbutton .subbuttons="${i}"></bubble-subbutton>
        </div>
      </div>
    `}static styles=n`
    :host { display:block; height:100%; box-sizing:border-box; }
    .bubble-room-grid { display:grid; grid-template-columns:2fr 1fr;
      width:100%; height:100%; box-sizing:border-box; border:2px dashed yellow; }
    .main-area { display:grid; height:100%; min-height:0; box-sizing:border-box;
      border:2px dashed green; }
    .row1 { display:grid; min-height:0; box-sizing:border-box;
      border:2px dashed blue; grid-template-columns:1fr; }
    .row2 { display:grid; height:100%; min-height:0; box-sizing:border-box;
      border:2px dashed purple; }
    .name-placeholder { display:flex; align-items:center; justify-content:center;
      width:100%; max-width:100%; height:100%; box-sizing:border-box;
      contain:strict; flex-shrink:1; }
    .icon-mushroom-area { border:2px dashed violet; box-sizing:border-box;
      position:relative; width:100%; height:100%; display:flex; align-items:center; }
    .k-space { border:2px dashed black; box-sizing:border-box; }
    .sidebar { display:flex; flex-direction:column; height:100%; min-height:0;
      box-sizing:border-box; border:2px dashed red; }

    .bubble-room-grid.tall .main-area { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.tall .row1      { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.tall .row2      { grid-template-columns:1fr 0fr; }

    .bubble-room-grid.wide .main-area { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.wide .row1      { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.wide .row2      { grid-template-columns:2fr 1fr; }
  `}customElements.define("bubble-room",Ut),window.customCards.push({type:"bubble-room",name:"Bubble Room",description:"A stylish room control card with environmental sensors",preview:!0,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});export{Ut as BubbleRoom};
//# sourceMappingURL=lovelace-bubble-room.js.map
