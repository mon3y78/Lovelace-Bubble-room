/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}}const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new o(s,e,i)},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var a;const l=window,c=l.trustedTypes,d=c?c.emptyScript:"",h=l.reactiveElementPolyfillSupport,p={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},u=(e,t)=>t!==e&&(t==t||e==e),b={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:u},g="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||b}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{t?i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):s.forEach(t=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=b){var s;const o=this.constructor._$Ep(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,o=s._$Ev.get(e);if(void 0!==o&&this._$El!==o){const e=s.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:p;this._$El=o,this[o]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;f[g]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:f}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.3");const v=window,_=v.trustedTypes,x=_?_.createPolicy("lit-html",{createHTML:e=>e}):void 0,y="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,A=`<${w}>`,k=document,C=()=>k.createComment(""),E=e=>null===e||"object"!=typeof e&&"function"!=typeof e,S=Array.isArray,z="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,R=/>/g,U=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,T=/"/g,H=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),I=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),F=new WeakMap,N=k.createTreeWalker(k,129,null,!1);function L(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const D=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":"",r=O;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===O?"!--"===l[1]?r=P:void 0!==l[1]?r=R:void 0!==l[2]?(H.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=U):void 0!==l[3]&&(r=U):r===U?">"===l[0]?(r=null!=o?o:O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?U:'"'===l[3]?T:j):r===T||r===j?r=U:r===P||r===R?r=O:(r=U,o=void 0);const h=r===U&&e[t+1].startsWith("/>")?" ":"";n+=r===O?i+A:c>=0?(s.push(a),i.slice(0,c)+y+i.slice(c)+$+h):i+$+(-2===c?(s.push(void 0),t):h)}return[L(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),s]};class V{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[l,c]=D(e,t);if(this.el=V.createElement(l,i),N.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=N.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith(y)||t.startsWith($)){const i=c[n++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+y).split($),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?G:"?"===t[1]?Z:"@"===t[1]?X:Y})}else a.push({type:6,index:o})}for(const t of e)s.removeAttribute(t)}if(H.test(s.tagName)){const e=s.textContent.split($),t=e.length-1;if(t>0){s.textContent=_?_.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],C()),N.nextNode(),a.push({type:2,index:++o});s.append(e[t],C())}}}else if(8===s.nodeType)if(s.data===w)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf($,e+1));)a.push({type:7,index:o}),e+=$.length-1}o++}}static createElement(e,t){const i=k.createElement("template");return i.innerHTML=e,i}}function q(e,t,i=e,s){var o,n,r,a;if(t===I)return t;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=E(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(t=q(e,l._$AS(e,t.values),l,s)),t}class W{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:k).importNode(i,!0);N.currentNode=o;let n=N.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let t;2===l.type?t=new J(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new Q(n,this,e)),this._$AV.push(t),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=N.nextNode(),r++)}return N.currentNode=k,o}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class J{constructor(e,t,i,s){var o;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=q(this,e,t),E(e)?e===M||null==e||""===e?(this._$AH!==M&&this._$AR(),this._$AH=M):e!==this._$AH&&e!==I&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>S(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==M&&E(this._$AH)?this._$AA.nextSibling.data=e:this.$(k.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=V.createElement(L(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.v(i);else{const e=new W(o,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new V(e)),t}T(e){S(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new J(this.k(C()),this.k(C()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Y{constructor(e,t,i,s,o){this.type=1,this._$AH=M,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=q(this,e,t,0),n=!E(e)||e!==this._$AH&&e!==I,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=q(this,s[i+r],t,r),a===I&&(a=this._$AH[r]),n||(n=!E(a)||a!==this._$AH[r]),a===M?e=M:e!==M&&(e+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(e)}j(e){e===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class G extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===M?void 0:e}}const K=_?_.emptyScript:"";class Z extends Y{constructor(){super(...arguments),this.type=4}j(e){e&&e!==M?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class X extends Y{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=q(this,e,t,0))&&void 0!==i?i:M)===I)return;const s=this._$AH,o=e===M&&s!==M||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==M&&(s===M||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Q{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){q(this,e)}}const ee=v.litHtmlPolyfillSupport;null==ee||ee(V,J),(null!==(m=v.litHtmlVersions)&&void 0!==m?m:v.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var te,ie;class se extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let r=n._$litPart$;if(void 0===r){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new J(t.insertBefore(C(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return I}}se.finalized=!0,se._$litElement$=!0,null===(te=globalThis.litElementHydrateSupport)||void 0===te||te.call(globalThis,{LitElement:se});const oe=globalThis.litElementPolyfillSupport;null==oe||oe({LitElement:se}),(null!==(ie=globalThis.litElementVersions)&&void 0!==ie?ie:globalThis.litElementVersions=[]).push("3.3.3");const ne={alarm_control_panel:"Allarmi",binary_sensor:"Sensori Binari",camera:"Telecamere",climate:"Clima",cover:"Tapparelle",fan:"Ventola",light:"Luce",lock:"Serratura",media_player:"Media Player",scene:"Scene",script:"Script",siren:"Sirena",vacuum:"Aspirapolvere",motion:"Movimento",occupancy:"Occupazione",presence:"Presenza",switch:"Pulsante"},re=["alarm_control_panel","binary_sensor","camera","climate","cover","fan","light","lock","media_player","scene","script","siren","switch","vacuum"],ae=(e=[])=>({includeDomains:re,entityFilter:(t,i)=>{if(!e.length)return!1;const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return e.includes(s)}}),le=(e=[])=>({includeDomains:["sensor"],entityFilter:(t,i)=>{if(!e.length)return!0;const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}}),ce=(e=[])=>({includeDomains:re,entityFilter:(t,i)=>{if(!e.length)return"binary_sensor"===t.split(".")[0];const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return e.includes(s)}}),de=(e=[])=>({includeDomains:re,entityFilter:(t,i)=>{if(!e.length)return re.includes(t.split(".")[0]);const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return e.includes(s)}});function he(e,t,i,s=[]){if(!e?.states)return[];let o;if("presence"===i?o=ae(s):"sensor"===i?o=le(s):"mushroom"===i?o=ce(s):"subbutton"===i&&(o=de(s)),!o)return[];const n=Object.keys(e.states).filter(e=>o.includeDomains.includes(e.split(".")[0])).filter(t=>o.entityFilter(t,e));if((t?.auto_discovery_sections?.[i]??!1)&&t?.area){const i=function(e,t){if(!e?.states||!t)return[];const i=e.entities??{},s=e.devices??{};return Object.keys(e.states).filter(o=>{const n=i[o];if(n?.area_id===t)return!0;const r=n?.device_id;if(r&&s[r]?.area_id===t)return!0;const a=e.states[o]?.attributes??{};return a.area_id===t||a.area===t})}(e,t.area);return n.filter(e=>i.includes(e))}return n}const pe=!!window.__BUBBLE_DEBUG__,ue=(e,t)=>e.find(e=>!t.has(e))||null;function be(e,t){const i={...t.entities||{}},s=i.presence||(i.presence={});if(!s.entity){const i=function(e,t){if(!e||!e.states)return[];const i=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let s=Object.keys(e.states).filter(e=>i.has(e.split(".")[0]));s=s.filter(t=>{if("binary_sensor"!==t.split(".")[0])return!0;const i=e.states[t]?.attributes?.device_class;return["motion","occupancy","presence"].includes(i||"")});const o=t?.area;if(o){const t=s.filter(t=>{const i=e.states[t],s=i?.attributes?.area_id,n=i?.attributes?.area;return s===o||n===o});t.length&&(s=t)}const n=t?.entities?.presence?.entity||t?.presence_entity;return n&&!s.includes(n)&&s.push(n),pe&&console.info("[AutoDiscovery][presence candidates]",{area:o,count:s.length,sample:s.slice(0,8)}),s}(e,t);i.length&&(s.entity=i[0])}return{...t,entities:i}}function ge(e,t,i,s=!1){const o=t.auto_discovery_sections||{},n="area"===i,r=i&&i.startsWith("auto_discovery_sections.");if(!n&&!r)return t;let a=t;return o.sensor&&(a=function(e,t){const i=["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6"],s={...t.entities||{}},o=new Set(i.map(e=>s[e]?.entity_id).filter(Boolean));for(const n of i){const i=s[n]||(s[n]={});if(i.entity_id)continue;const r=he(e,t,{section:"sensor",type:i.type||""}),a=ue(r,o);a&&(i.entity_id=a,o.add(a))}return{...t,entities:s}}(e,a)),o.mushroom&&(a=function(e,t){const i={...t.entities||{}},s=new Set(["climate","camera","entities1","entities2","entities3","entities4","entities5"].map(e=>i[e]?.entity).filter(Boolean)),o=he(e,t,"mushroom"),n=i.climate||(i.climate={});if(!n.entity){const e=o.find(e=>e.startsWith("climate.")&&!s.has(e));e&&(n.entity=e,s.add(e))}const r=i.camera||(i.camera={});if(!r.entity){const e=o.find(e=>e.startsWith("camera.")&&!s.has(e));e&&(r.entity=e,s.add(e))}for(const e of["entities1","entities2","entities3","entities4","entities5"]){const t=i[e]||(i[e]={});if(t.entity)continue;const n=ue(o,s);n&&(t.entity=n,s.add(n))}return{...t,entities:i}}(e,a)),o.subbutton&&(a=function(e,t){const i=["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"],s={...t.entities||{}},o=new Set(i.map(e=>s[e]?.entity).filter(Boolean)),n=he(e,t,"subbutton");for(const e of i){const t=s[e]||(s[e]={});if(t.entity)continue;const i=ue(n,o);i&&(t.entity=i,o.add(i))}return{...t,entities:s}}(e,a)),o.presence&&(a=be(e,a)),s&&"undefined"!=typeof window&&window.__BUBBLE_DEBUG__&&console.info("[AutoDiscovery] applied after",i,{sections:o}),a}const fe=["presence","motion","occupancy","light","switch","fan"];class me extends se{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean,state:!0},activeFilters:{type:Array,state:!0},layout:{type:String}};static styles=n`
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
  `;constructor(){super(),this.hass={},this.config={},this._expanded=!1,this.activeFilters=[],this.layout="wide"}updated(e){if(e.has("config")||e.has("hass")){ge(this.hass,this.config,"area"),ge(this.hass,this.config,"auto_discovery_sections.presence"),e.has("config")&&Array.isArray(this.config.presence_filters)&&(this.activeFilters=[...this.config.presence_filters]);const t=this.config.layout;t&&t!==this.layout&&(this.layout=t)}}_onLayoutClick(e){this.layout=e,this._fire("layout",e)}_fire(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}render(){const e=this.config,t=e.auto_discovery_sections?.presence??!1,i=e.area??"",s=e.name??"",o=e.icon??"",n=e.entities?.presence?.entity??"",r=this.activeFilters.length?this.activeFilters:e.presence_filters??[...fe],a=fe.map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1)})),l=he(this.hass,this.config,"presence",r);return B`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e=>this._expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>
      
        <!-- 🔍 Auto-discover -->
        <div class="input-group">
          <label>🔍 Auto-discover Presence:</label>
          <input
            type="checkbox"
            .checked=${t}
            @change=${e=>this._fire("auto_discovery_sections.presence",e.target.checked)}
          />
        </div>
      
        <!-- 🏷️ Area -->
        <div class="input-group">
          <label>🏷️ Area:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${i}
            .selector=${{area:{}}}
            @value-changed=${e=>{const t=e.detail.value;this._fire("area",t),t&&(this._fire("name",t.toUpperCase()),this._fire("auto_discovery_sections.presence",!0))}}
          ></ha-selector>
        </div>
      
        <!-- 🏠 Room name -->
        <div class="input-group">
          <label>🏠 Room name:</label>
          <input
            type="text"
            .value=${s}
            @input=${e=>this._fire("name",e.target.value)}
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
                @value-changed=${e=>this._fire("icon",e.detail.value)}
              ></ha-icon-picker>
            </div>
      
            <!-- Filter categories -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${r}
                .selector=${{select:{multiple:!0,mode:"box",options:a}}}
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
    `}_renderActions(e){const t=this.config?.[`${e}_action`]||{};return B`
      <div class="input-group">
        <label>${"tap"===e?"Tap Action":"Hold Action"}</label>
        <div class="pill-group">
          ${["toggle","more-info","navigate","call-service","none"].map(i=>B`
            <paper-button
              class="pill-button ${t.action===i?"active":""}"
              @click=${()=>this._fire(`${e}_action.action`,i)}
            >${i}</paper-button>
          `)}
        </div>
        ${"navigate"===t.action?B`
          <input
            type="text"
            placeholder="Path"
            .value=${t.navigation_path||""}
            @input=${t=>this._fire(`${e}_action.navigation_path`,t.target.value)}
          />
        `:""}
        ${"call-service"===t.action?B`
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
    `}}customElements.define("room-panel",me);const ve={temperature:{label:"Temperature",emoji:"🌡️",icon:"mdi:thermometer",units:["°C","°F"]},humidity:{label:"Humidity",emoji:"💧",icon:"mdi:water-percent",units:["%"]},co2:{label:"CO₂",emoji:"🟢",icon:"mdi:molecule-co2",units:["ppm"]},lux:{label:"Luminosity",emoji:"🔆",icon:"mdi:brightness-5",units:["lx"]},uv:{label:"UV Index",emoji:"🌞",icon:"mdi:weather-sunny-alert",units:["UV"]},pressure:{label:"Pressure",emoji:"⏲️",icon:"mdi:gauge",units:["hPa"]},noise:{label:"Noise",emoji:"🔊",icon:"mdi:volume-high",units:["dB"]},pm25:{label:"PM2.5",emoji:"🌫️",icon:"mdi:blur",units:["µg/m³"]},pm10:{label:"PM10",emoji:"🌫️",icon:"mdi:blur-linear",units:["µg/m³"]}};class _e extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(8).fill(!1);const e=Object.keys(ve);this._filters=Array(8).fill().map(()=>[...e]),this._entities=Array(8).fill("")}updated(e){if(e.has("config")||e.has("hass")){ge(this.hass,this.config,"auto_discovery_sections.sensor");for(let e=0;e<8;e++){const t=`sensor${e+1}`,i=this.config.sensor_filters?.[e],s=this.config.entities?.[t]?.entity;Array.isArray(i)&&(this._filters[e]=[...i]),s&&(this._entities[e]=s)}}}static styles=n`
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
  `;render(){const e=this.config.auto_discovery_sections?.sensor??!1,t=Object.entries(ve).map(([e,t])=>({value:e,label:`${t.emoji} ${t.label}`}));return B`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expanded=Array(8).fill(!1))}}
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
    `}_renderSensor(e,t,i){const s=this._filters[e],o=this._entities[e],n=he(this.hass,this.config,"sensor",s);return B`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          Sensor ${e+1}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>
        ${t?B`
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
            ${o?(()=>{const e=this.hass.states[o],t=e?.attributes?.device_class,i=ve[t]||{},s=i.emoji||"❓",n=e?.attributes?.unit_of_measurement||(i.units?.[0]??"");return B`
                <div class="preview">
                  <span class="emoji">${s}</span>
                  <div class="state">${e?.state??"-"} ${n}</div>
                </div>
              `})():""}
          </div>
        `:""}
      </div>
    `}_toggleAuto(e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.sensor",val:e},bubbles:!0,composed:!0}))}_togglePill(e){this._expanded=this._expanded.map((t,i)=>i===e&&!t),this.requestUpdate()}_onFilter(e,t){this._filters[e]=[...t],this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"sensor_filters",val:this._filters},bubbles:!0,composed:!0}))}_onEntity(e,t){this._entities[e]=t,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${e+1}.entity`,val:t},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(8).fill(!1);const e=Object.keys(ve);this._filters=Array(8).fill().map(()=>[...e]),this._entities=Array(8).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"sensor_filters",val:this._filters},bubbles:!0,composed:!0}));for(let e=1;e<=8;e++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${e}.entity`,val:""},bubbles:!0,composed:!0}))}}customElements.define("sensor-panel",_e);class xe extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...re]),this._entities=Array(5).fill("")}updated(e){if(e.has("config")||e.has("hass")){ge(this.hass,this.config,"auto_discovery_sections.mushroom");const e=this.config.mushroom_filters;Array.isArray(e)&&5===e.length&&(this._filters=e.map(e=>Array.isArray(e)?[...e]:[...re]));const t=this.config.entities||{};for(let e=0;e<5;e++){const i=`mushroom${e+1}`,s=t[i]?.entity;s&&(this._entities[e]=s)}}}static styles=n`
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
  `;render(){const e=this.config.auto_discovery_sections?.mushroom??!1,t=re.map(e=>({value:e,label:ne[e]||e.charAt(0).toUpperCase()+e.slice(1)}));return B`
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
    `}_renderMushroom(e,t,i){const s=this._filters[e],o=this._entities[e],n=he(this.hass,this.config,"mushroom",s);return B`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          Mushroom ${e+1}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>
        ${t?B`
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
    `}_toggleAuto(e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.mushroom",val:e},bubbles:!0,composed:!0}))}_togglePill(e){this._expanded=this._expanded.map((t,i)=>i===e&&!t),this.requestUpdate()}_onFilter(e,t){this._filters[e]=[...t],this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}))}_onEntity(e,t){this._entities[e]=t,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e+1}.entity`,val:t},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...re]),this._entities=Array(5).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}));for(let e=1;e<=5;e++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e}.entity`,val:""},bubbles:!0,composed:!0}))}}customElements.define("mushroom-panel",xe);const ye={door:{on:"mdi:door-open",off:"mdi:door-closed"},window:{on:"mdi:window-open",off:"mdi:window-closed"},motion:{on:"mdi:motion-sensor",off:"mdi:motion-sensor-off"},moisture:{on:"mdi:water-alert",off:"mdi:water-off"},smoke:{on:"mdi:smoke",off:"mdi:smoke-detector-off"},gas:{on:"mdi:gas-cylinder",off:"mdi:gas-off"},lock:{on:"mdi:lock-open-variant",off:"mdi:lock"},garage:{on:"mdi:garage-open",off:"mdi:garage"},light:{on:"mdi:lightbulb-on",off:"mdi:lightbulb-off"},plug:{on:"mdi:power-plug",off:"mdi:power-plug-off"},presence:{on:"mdi:account",off:"mdi:account-off"},vibration:{on:"mdi:vibrate",off:"mdi:vibrate-off"},opening:{on:"mdi:door-open",off:"mdi:door-closed"},battery:{on:"mdi:battery",off:"mdi:battery-outline"},connectivity:{on:"mdi:wifi",off:"mdi:wifi-off"},safety:{on:"mdi:shield-check",off:"mdi:shield-off"},cold:{on:"mdi:snowflake",off:"mdi:snowflake-off"}},$e={light:"mdi:lightbulb",switch:"mdi:toggle-switch",fan:"mdi:fan",climate:"mdi:thermostat",cover:"mdi:window-shutter",media_player:"mdi:play-circle",script:"mdi:script-text",scene:"mdi:palette",lock:"mdi:lock",camera:"mdi:video",binary_sensor:"mdi:checkbox-marked-circle-outline",sensor:"mdi:eye",alarm_control_panel:"mdi:shield-home",vacuum:"mdi:robot-vacuum",siren:"mdi:bullhorn"};function we(e,t){const i=t.states?.[e],s=i?.attributes||{},o=s.device_class,n=e?.split(".")?.[0]??"",r=i?.state,a=o&&ye[o]?ye[o]["on"===r?"on":"off"]:null;return s.icon||a||$e[n]||"mdi:bookmark"}class Ae extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...re]),this._entities=Array(4).fill("")}updated(e){if(e.has("config")||e.has("hass")){ge(this.hass,this.config,"auto_discovery_sections.subbutton"),Array.isArray(this.config.subbuttons)||(this.config.subbuttons=Array(4).fill().map(()=>({})));const e=this.config.subbutton_filters;Array.isArray(e)&&4===e.length&&(this._filters=e.map(e=>Array.isArray(e)?[...e]:[...re]));for(let e=0;e<4;e++){const t=this.config.subbuttons[e]?.entity_id||"";this._entities[e]=t}}}static styles=n`
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
  `;render(){const e=this.config.auto_discovery_sections?.subbutton??!1,t=re.map(e=>({value:e,label:ne[e]||e.charAt(0).toUpperCase()+e.slice(1)}));return B`
        <ha-expansion-panel
          class="glass-panel"
          .expanded=${this.expanded}
          @expanded-changed=${e=>this.expanded=e.detail.expanded}
        >
          <div slot="header" class="glass-header">🎛️ Sub-buttons</div>
  
          <div class="input-group autodiscover">
            <input type="checkbox" .checked=${e}
                   @change=${e=>this._toggleAuto(e.target.checked)} />
            <label>🪄 Auto-discover Subbuttons</label>
          </div>
  
          ${this._expanded.map((e,i)=>this._renderSubButton(i,e,t))}
  
          <button class="reset-button" @click=${()=>this._reset()}>🧹 Reset Sub-buttons</button>
        </ha-expansion-panel>
      `}_renderSubButton(e,t,i){const s=this._filters[e],o=this._entities[e],n=he(this.hass,this.config,"subbutton",s),r=this.config.subbuttons?.[e]||{},a=["toggle","more-info","navigate","call-service","none"];return B`
        <div class="mini-pill ${t?"expanded":""}">
          <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
            Sub-button ${e+1}  <span class="chevron">${t?"▼":"▶"}</span>
          </div>
          ${t?B`
            <div class="mini-pill-content">
              <div class="input-group">
                <label>Filter categories:</label>
                <ha-selector .hass=${this.hass} .value=${s}
                  .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                  @value-changed=${t=>this._onFilter(e,t.detail.value)}
                ></ha-selector>
              </div>
  
              <div class="input-group">
                <label>Entity:</label>
                <ha-selector .hass=${this.hass} .value=${o}
                  .selector=${{entity:{include_entities:n,multiple:!1}}}
                  allow-custom-entity
                  @value-changed=${t=>this._onEntity(e,t.detail.value)}
                ></ha-selector>
              </div>
  
              <div class="input-group">
                <label>Icon:</label>
                <ha-icon-picker .hass=${this.hass} .value=${r.icon||""}
                  allow-custom-icon
                  @value-changed=${t=>this._onIcon(e,t.detail.value)}
                ></ha-icon-picker>
              </div>
  
              ${["tap","hold"].map(t=>B`
                <div class="input-group">
                  <label>${"tap"===t?"Tap Action":"Hold Action"}:</label>
                  <div class="pill-group">
                    ${a.map(i=>B`
                      <button
                        class="pill-button ${r[`${t}_action`]?.action===i?"active":""}"
                        @click=${()=>this._onAction(e,t,"action",i)}
                      >${i}</button>
                    `)}
                  </div>
                  ${this._extraFields(e,t,r)}
                </div>
              `)}
            </div>
          `:""}
        </div>
      `}_extraFields(e,t,i){const s=i[`${t}_action`]?.action;return"navigate"===s?B`
          <input type="text" placeholder="Path"
            .value=${i[`${t}_action`]?.navigation_path||""}
            @input=${i=>this._onAction(e,t,"navigation_path",i.target.value)}
          />
        `:"call-service"===s?B`
          <input type="text" placeholder="Service"
            .value=${i[`${t}_action`]?.service||""}
            @input=${i=>this._onAction(e,t,"service",i.target.value)}
          />
          <input type="text" placeholder='Service Data (JSON)'
            .value=${i[`${t}_action`]?.service_data?JSON.stringify(i[`${t}_action`].service_data):""}
            @input=${i=>this._onAction(e,t,"service_data",this._safeJson(i.target.value))}
          />
        `:""}_safeJson(e){try{return JSON.parse(e)}catch{return{}}}_toggleAuto(e){this._emit("auto_discovery_sections.subbutton",e)}_togglePill(e){this._expanded=this._expanded.map((t,i)=>i===e&&!t)}_onFilter(e,t){this._filters[e]=[...t],this._emit("subbutton_filters",this._filters)}_onEntity(e,t){this._entities[e]=t,this.config.subbuttons[e]||(this.config.subbuttons[e]={}),this.config.subbuttons[e].entity_id=t,!this.config.subbuttons[e].icon&&this.hass&&(this.config.subbuttons[e].icon=we(t,this.hass)),this._emit("subbuttons",this.config.subbuttons)}_onIcon(e,t){this.config.subbuttons[e]||(this.config.subbuttons[e]={}),this.config.subbuttons[e].icon=t,this._emit("subbuttons",this.config.subbuttons)}_onAction(e,t,i,s){this.config.subbuttons[e]||(this.config.subbuttons[e]={}),this.config.subbuttons[e][`${t}_action`]={...this.config.subbuttons[e][`${t}_action`],[i]:s},this._emit("subbuttons",this.config.subbuttons)}_reset(){this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...re]),this._entities=Array(4).fill(""),this.config.subbuttons=Array(4).fill().map(()=>({})),this._emit("subbutton_filters",this._filters),this._emit("subbuttons",this.config.subbuttons)}_emit(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}}customElements.define("sub-button-panel",Ae);class ke extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expandedColors:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expandedColors=[!1,!1]}updated(e){(e.has("config")||e.has("hass"))&&ge(this.hass,this.config,"auto_discovery_sections.colors")}static styles=n`
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
  `;render(){return this.config.auto_discovery_sections,B`
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
          ${this._expandedColors[0]?B`
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
          ${this._expandedColors[1]?B`
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
    `}_toggleColor(e){this._expandedColors=this._expandedColors.map((t,i)=>i===e&&!t)}_renderColorField(e,t,i){const s=this.config.colors?.[e]?.[t]||"",[o,n,r,a]=this._parseRGBA(s),l=`#${[o,n,r].map(e=>e.toString(16).padStart(2,"0")).join("")}`;return B`
      <div class="input-group">
        <label>${i}</label>
        <input
          type="color"
          .value=${l}
          @input=${i=>this._updateColor(e,t,i.target.value,a)}
        />
        <input
          type="range"
          min="0" max="1" step="0.01"
          .value=${a}
          @input=${i=>this._updateColor(e,t,l,i.target.value)}
        />
        <input
          type="text"
          .value=${s}
          @input=${i=>this._updateColorRaw(e,t,i.target.value)}
        />
      </div>
    `}_parseRGBA(e){if(!e)return[0,0,0,1];const t=/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(e);return t?[+t[1],+t[2],+t[3],+(t[4]??1)]:[0,0,0,1]}_updateColor(e,t,i,s){const o=`rgba(${parseInt(i.slice(1,3),16)},${parseInt(i.slice(3,5),16)},${parseInt(i.slice(5,7),16)},${s})`;this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${e}.${t}`,val:o},bubbles:!0,composed:!0}))}_updateColorRaw(e,t,i){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${e}.${t}`,val:i},bubbles:!0,composed:!0}))}_resetColors(){this._expandedColors=[!1,!1];const e={room:["background_active","background_inactive","icon_active","icon_inactive","text_active","text_inactive"],subbutton:["background_on","background_off","icon_on","icon_off"]};["room","subbutton"].forEach(t=>{e[t].forEach(e=>{this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`colors.${t}.${e}`,val:""},bubbles:!0,composed:!0}))})})}}customElements.define("color-panel",ke);class Ce extends se{static properties={hass:{type:Object},config:{type:Object},openPanel:{type:String,state:!0}};static styles=n`
    :host {
      display: block;
      padding: 0;
      margin: 0;
      background: transparent;
    }
  `;constructor(){super(),this.hass={},this.config={},this.openPanel=""}setConfig(e){const t={layout:"wide",...e};t.auto_discovery_sections={room:!!t.area,sensor:!!t.area,mushroom:!!t.area,subbutton:!!t.area,color:!0,...t.auto_discovery_sections||{}},Array.isArray(t.sensor_filters)||(t.sensor_filters=[]),t.entities||(t.entities={}),this.config=t}render(){return B`
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
    `}_togglePanel(e,t){this.openPanel=e.detail.expanded?t:this.openPanel===t?"":this.openPanel}_onConfigChanged(e){const{prop:t,val:i}=e.detail;this._setConfigValue(t,i),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}_setConfigValue(e,t){const i=e.split(".");let s=this.config;for(let e=0;e<i.length-1;e++){const t=i[e];null==s[t]&&(s[t]={}),s=s[t]}s[i[i.length-1]]=t,this.config={...this.config}}}customElements.define("bubble-room-editor",Ce);var Ee=Object.freeze({__proto__:null,BubbleRoomEditor:Ce});class Se extends se{static properties={subbuttons:{type:Array}};constructor(){super(),this.subbuttons=[],this._holdThreshold=500,this._holdTimer=null,this._holdFired=!1,this._currentIndex=-1}static styles=n`
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
    .sub-button:last-child {
      margin-bottom: 0;
    }
    .sub-button:first-child {
      margin-top: 0;
    }
    .sub-button:active {
      transform: scale(0.97);
    }
    .sub-button ha-icon {
      --mdc-icon-size: 3em;
    }
    .sub-button .label {
      font-size: 0.95rem;
      font-weight: 600;
      text-align: center;
      color: var(--primary-text-color);
      word-break: break-word;
    }
  `;render(){return B`
      <div class="container">
        ${this.subbuttons.map((e,t)=>{const i=e.active?e.colorOn:e.colorOff,s=e.active?e.iconOn:e.iconOff;return B`
            <div
              class="sub-button"
              style="background:${i};color:${s};"
              @pointerdown=${()=>this._onDown(t)}
              @pointerup=${()=>this._onUp(t)}
              @pointerleave=${()=>this._clearHoldTimer()}
              @pointercancel=${()=>this._clearHoldTimer()}
            >
              <ha-icon icon="${e.icon}"></ha-icon>
            </div>
          `})}
      </div>
    `}_onDown(e){this._holdFired=!1,this._currentIndex=e,this._holdTimer=window.setTimeout(()=>{this._holdFired=!0,this._fireHassAction(e,"hold")},this._holdThreshold)}_onUp(e){this._clearHoldTimer(),this._holdFired||this._currentIndex!==e||this._fireHassAction(e,"tap")}_clearHoldTimer(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)}_fireHassAction(e,t){const i=this.subbuttons?.[e];if(!i||!i.entity_id)return;const s={entity:i.entity_id,tap_action:i.tap_action||{action:"toggle"},hold_action:i.hold_action||{action:"more-info"}},o=new Event("hass-action",{bubbles:!0,composed:!0});o.detail={config:s,action:t},this.dispatchEvent(o)}}customElements.define("bubble-subbutton",Se);class ze extends se{static properties={hass:{type:Object},name:{type:String},area:{type:String},config:{type:Object},container:{type:Object}};constructor(){super(),this._resizeObserver=null}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>{const e=this.container||this.parentElement;e&&(this._resizeObserver=new ResizeObserver(()=>this._autoScaleFont()),this._resizeObserver.observe(e))})}disconnectedCallback(){this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),super.disconnectedCallback()}updated(){this._autoScaleFont()}render(){return B`
      <!-- il colore ora lo prende dal CSS var impostata dal genitore -->
      <div class="bubble-name">${this.name}</div>
    `}_isRoomActive(){const e=this.config?.entities?.presence?.entity;if(!e)return!1;const t=this.hass?.states?.[e]?.state;return["on","home","occupied","motion","detected"].includes(t)}_autoScaleFont(){const e=this.renderRoot.querySelector(".bubble-name"),t=this.container||this.parentElement;if(!e||!t)return;let i=100;e.style.fontSize=`${i}px`,requestAnimationFrame(()=>{const s=t.clientWidth,o=t.clientHeight;for(;(e.scrollWidth>s||e.scrollHeight>o)&&i>10;)i-=1,e.style.fontSize=`${i}px`,console.log("Resizing font to:",i)})}static styles=n`
    .bubble-name {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 1.1;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
      text-transform: uppercase;
      font-family: "Arial Narrow", sans-serif;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      font-stretch: condensed;
      color: var(--bubble-room-name-color, white);
    }
  `}customElements.define("bubble-name",ze);class Oe extends se{static properties={sensors:{type:Array}};constructor(){super(),this.sensors=[],this.rows=1,this.columns=1,this._resizeObserver=null,this._resizeScheduled=!1}connectedCallback(){super.connectedCallback(),this._updateLayout(),this._resizeObserver=new ResizeObserver(()=>{this._resizeScheduled||(this._resizeScheduled=!0,requestAnimationFrame(()=>{this._autoScaleValues(),this._resizeScheduled=!1}))}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect()}updated(e){e.has("sensors")&&(this._updateLayout(),this._autoScaleValues())}_updateLayout(){const e=this.sensors?.length||0;this.rows=e>4?2:1,this.columns=e>4?4:e||1}_autoScaleValues(){const e=this.renderRoot?.querySelectorAll(".sensor-value");e&&e.forEach(e=>this._autoScaleValueFont(e))}_autoScaleValueFont(e){const t=e?.parentElement;if(!t)return;const i=.48*t.clientWidth,s=.75*t.clientHeight;if(Math.min(i,s)<=0)return;e.style.fontSize="";let o=parseInt(getComputedStyle(e).fontSize,10)||14;for(;o>8;){e.style.fontSize=`${o}px`;const{width:t,height:n}=e.getBoundingClientRect();if(t<=i&&n<=s)break;o--}e.style.fontSize=`${o}px`}static styles=n`
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
  `;render(){const e=(this.sensors||[]).map(e=>{const t=e.device_class,i=ve[t]||{},s=i.emoji||"❓",o=e.unit||i.units?.[0]||"";return{...e,label:s,unit:o}});return B`
      <div
        class="sensor-grid"
        style="
          grid-template-columns: repeat(${this.columns}, 1fr);
          grid-template-rows: repeat(${this.rows}, 1fr);
        "
      >
        ${e.map(e=>B`
          <div class="sensor-pill" style="color: ${e.color||"#e3f6ff"}">
            <ha-icon class="sensor-icon" .icon="${e.icon||""}"></ha-icon>
            <span class="sensor-label">${e.label||""}</span>
            <span class="sensor-value">${e.value??"--"}</span>
            <span class="sensor-unit">${e.unit||""}</span>
          </div>
        `)}
      </div>
    `}}customElements.define("bubble-sensor",Oe);class Pe extends se{static properties={entities:{type:Array}};constructor(){super(),this.entities=[],this._containerSize={width:0,height:0},this._resizeObserver=new ResizeObserver(()=>this._updateContainerSize())}connectedCallback(){super.connectedCallback(),this._resizeObserver.observe(this)}disconnectedCallback(){super.connectedCallback(),this._resizeObserver.disconnect()}_updateContainerSize(){const e=this.getBoundingClientRect();this._containerSize={width:e.width,height:e.height},this.requestUpdate()}_handleClick(e){this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:{entity:e.entity_id,tap_action:e.tap_action||{action:"toggle"},hold_action:e.hold_action||{action:"more-info"}},action:"tap"},bubbles:!0,composed:!0}))}static styles=n`
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
      border-radius: 50%;
      background: rgba(0,0,0,0.25);
      z-index: 1;
    }
    .mushroom-entity ha-icon {
      display: block;
    }
  `;render(){const{width:e,height:t}=this._containerSize;if(!e||!t)return B``;let i;if(e<=480)i=.3;else if(e>=1400)i=.14;else{i=.3+(.14-.3)*((e-480)/920)}const s=Math.min(e,t)*i,o=.6*e,n=e-o,r=.5*t,a=o-.5*s,l=.6*t-.5*s,c=.33*e,d=Math.PI/4,h=[{x:.5*s,y:.5*s},{x:c,y:.5*s},{x:n+a*Math.cos(-d),y:r+l*Math.sin(-d)},{x:n+a*Math.cos(d),y:r+l*Math.sin(d)},{x:c,y:t-.5*s}];return B`
      ${this.entities.map((e,t)=>{const i=h[t]??{x:n,y:r};return B`
          <div
            class="mushroom-entity"
            style="
              left:${i.x}px;
              top:${i.y}px;
              width:${s}px;
              height:${s}px;
              color:${e.color};
            "
            @click=${()=>this._handleClick(e)}
          >
            <ha-icon
              icon="${e.icon}"
              style="--mdc-icon-size:${.6*s}px;"
            ></ha-icon>
          </div>
        `})}
    `}}customElements.define("bubble-mushroom",Pe);class Re extends se{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String},backgroundActive:{type:String},backgroundInactive:{type:String}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16",this.backgroundActive="rgba(33,223,115,0.12)",this.backgroundInactive="rgba(23,60,22,0.08)"}static styles=n`
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
  `;render(){const e=this.active?this.colorActive:this.colorInactive,t=this.active?this.backgroundActive:this.backgroundInactive;return B`
      <div class="main-icon-container" style="background:${t}">
        <ha-icon
          class="main-icon"
          .icon="${this.icon}"
          style="color:${e}"
          @click="${()=>this.dispatchEvent(new CustomEvent("main-icon-click"))}"
        ></ha-icon>
      </div>
    `}}customElements.define("bubble-icon",Re);class Ue extends se{static properties={config:{type:Object},hass:{type:Object}};constructor(){super(),this.config={},this.hass={}}setConfig(e){this.config={layout:"wide",...e}}static getStubConfig(){return{type:"custom:bubble-room",layout:"wide",name:[],area:[],sensors:[],mushrooms:[],subbuttons:[],colors:{subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return Ee}),document.createElement("bubble-room-editor")}connectedCallback(){super.connectedCallback(),this._resizeObs=new ResizeObserver(()=>this.requestUpdate())}firstUpdated(){const e=this.shadowRoot?.querySelector(".icon-mushroom-area");e&&this._resizeObs.observe(e)}disconnectedCallback(){this._resizeObs?.disconnect(),super.disconnectedCallback()}_getSubButtons(){const e=this.config.colors?.subbutton?.background_on??"#00d46d",t=this.config.colors?.subbutton?.background_off??"#999",i=this.config.colors?.subbutton?.icon_on??"yellow",s=this.config.colors?.subbutton?.icon_off??"#666";return(this.config.subbuttons||[]).map(o=>{const n=this.hass.states?.[o.entity_id],r=n?.state;return{icon:we(o.entity_id,this.hass),active:"on"===r,colorOn:e,colorOff:t,iconOn:i,iconOff:s,entity_id:o.entity_id,tap_action:o.tap_action,hold_action:o.hold_action}})}_isRoomActive(){const e=this.config?.entities?.presence?.entity;if(!e)return!1;const t=this.hass?.states?.[e]?.state;return["on","home","occupied","motion","detected"].includes(t)}_getMainIconSize(){const e=this.shadowRoot?.querySelector(".icon-mushroom-area");if(!e)return 64;const t=Math.min(e.clientWidth,e.clientHeight);return Math.round(.65*t)}_getSensors(){const e=this.config.entities||{},t=this.config.colors?.room?.sensor_active??this.config.colors?.room?.text_active??"#21df73",i=this.config.colors?.room?.sensor_inactive??this.config.colors?.room?.text_inactive??"#173c16",s=this._isRoomActive()?t:i,o=[];for(let t=1;t<=6;t++){const i=`sensor${t}`,n=e[i]?.entity,r=this.hass?.states?.[n];if(!n||!r)continue;const a=r.attributes.device_class,l=r.state,c=r.attributes.unit_of_measurement,d=r.attributes.icon||"";o.push({icon:d,value:l,unit:c,color:s,device_class:a})}return o}_getMushrooms(){const e=this.config.entities||{},t=[];for(let i=1;i<=6;i++){const s=`mushroom${i}`,o=e[s]?.entity,n=this.hass?.states?.[o];if(!o||!n)continue;const r=n.attributes.icon||"mdi:flash",a=n.state,l="on"===a?this.config.colors?.mushroom?.active||"#00e676":this.config.colors?.mushroom?.inactive||"#888";t.push({icon:r,state:a,color:l})}return t}render(){const e=this.config.layout||"wide",t=this._getMainIconSize(),i=this._getSubButtons(),s=this._isRoomActive(),o=this.config.colors?.room?.icon_active??"#21df73",n=this.config.colors?.room?.icon_inactive??"#173c16",r=this.config.colors?.room?.background_active??"rgba(33,223,115,0.12)",a=this.config.colors?.room?.background_inactive??"rgba(23,60,22,0.12)",l=this.config.colors?.room?.text_active??"#ffffff",c=this.config.colors?.room?.text_inactive??"rgba(255,255,255,0.5)";return B`
      <div class="bubble-room-grid ${e}">
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
              ></bubble-name>, 
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
                  --main-icon-size:${t}px;
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
    :host {
      display: block; height: 100%; box-sizing: border-box;
    }
    .bubble-room-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      width: 100%; height: 100%; box-sizing: border-box;
      border: 2px dashed yellow;
    }
    .main-area {
      display: grid; height: 100%; min-height: 0; box-sizing: border-box;
      border: 2px dashed green;
    }
    .row1 {
      display: grid; min-height: 0; box-sizing: border-box;
      border: 2px dashed blue;
      grid-template-columns: 1fr;
    }
    .row2 {
      display: grid; height: 100%; min-height: 0; box-sizing: border-box;
      border: 2px dashed purple;
    }
    .name-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 100%;
      height: 100%;
      box-sizing: border-box;
      contain: strict;
      flex-shrink: 1;
    }
    .sensor-placeholder {
      border: 2px dashed lime;
      box-sizing: border-box;
    }
    .icon-mushroom-area  { 
      border: 2px dashed violet;  
      box-sizing: border-box; 
      position: relative;   
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;  
    }
    .k-space             { border: 2px dashed black; box-sizing: border-box; }
    .sidebar {
      display: flex; flex-direction: column;
      height: 100%; min-height: 0; box-sizing: border-box;
      border: 2px dashed red;
    } 
    .bubble-room-grid.tall .main-area    { grid-template-rows: 1fr 2fr; }
    .bubble-room-grid.tall .row1         { grid-template-rows: 1fr 2fr; }
    .bubble-room-grid.tall .row2         { grid-template-columns: 1fr 0fr; }

    .bubble-room-grid.wide .main-area    { grid-template-rows: 2fr 1fr; }
    .bubble-room-grid.wide .row1         { grid-template-rows: 2fr 1fr; }
    .bubble-room-grid.wide .row2         { grid-template-columns: 1fr 1fr; }
  `}customElements.define("bubble-room",Ue),window.customCards.push({type:"bubble-room",name:"Bubble Room",description:"A stylish room control card with environmental sensors",preview:!0,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});export{Ue as BubbleRoom};
//# sourceMappingURL=lovelace-bubble-room.js.map
