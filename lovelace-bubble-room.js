/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),i=new WeakMap;let s=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const o=this.t;if(t&&void 0===e){const t=void 0!==o&&1===o.length;t&&(e=i.get(o)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&i.set(o,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,o,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[i+1],e[0]);return new s(i,e,o)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,o))(t)})(e):e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var r;const l=window,c=l.trustedTypes,u=c?c.emptyScript:"",d=l.reactiveElementPolyfillSupport,h={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},p=(e,t)=>t!==e&&(t==t||e==e),b={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:p},m="finalized";let g=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,o)=>{const i=this._$Ep(o,t);void 0!==i&&(this._$Ev.set(i,o),e.push(i))}),e}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const o="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,o,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this.requestUpdate(e,s,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||b}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const o of t)this.createProperty(o,e[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,o;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(o=e.hostConnected)||void 0===o||o.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var o;const i=null!==(o=this.shadowRoot)&&void 0!==o?o:this.attachShadow(this.constructor.shadowRootOptions);return((o,i)=>{t?o.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):i.forEach(t=>{const i=document.createElement("style"),s=e.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)})})(i,this.constructor.elementStyles),i}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EO(e,t,o=b){var i;const s=this.constructor._$Ep(e,o);if(void 0!==s&&!0===o.reflect){const n=(void 0!==(null===(i=o.converter)||void 0===i?void 0:i.toAttribute)?o.converter:h).toAttribute(t,o.type);this._$El=e,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(e,t){var o;const i=this.constructor,s=i._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=i.getPropertyOptions(s),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(o=e.converter)||void 0===o?void 0:o.fromAttribute)?e.converter:h;this._$El=s,this[s]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,o){let i=!0;void 0!==e&&(((o=o||this.constructor.getPropertyOptions(e)).hasChanged||p)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===o.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,o))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(o)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(o)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;g[m]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:g}),(null!==(r=l.reactiveElementVersions)&&void 0!==r?r:l.reactiveElementVersions=[]).push("1.6.3");const _=window,v=_.trustedTypes,y=v?v.createPolicy("lit-html",{createHTML:e=>e}):void 0,x="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,k=`<${w}>`,S=document,C=()=>S.createComment(""),A=e=>null===e||"object"!=typeof e&&"function"!=typeof e,E=Array.isArray,z="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,F=/>/g,O=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,R=/"/g,q=/^(?:script|style|textarea|title)$/i,N=(e=>(t,...o)=>({_$litType$:e,strings:t,values:o}))(1),T=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),B=new WeakMap,L=S.createTreeWalker(S,129,null,!1);function D(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==y?y.createHTML(t):t}const H=(e,t)=>{const o=e.length-1,i=[];let s,n=2===t?"<svg>":"",a=M;for(let t=0;t<o;t++){const o=e[t];let r,l,c=-1,u=0;for(;u<o.length&&(a.lastIndex=u,l=a.exec(o),null!==l);)u=a.lastIndex,a===M?"!--"===l[1]?a=P:void 0!==l[1]?a=F:void 0!==l[2]?(q.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=O):void 0!==l[3]&&(a=O):a===O?">"===l[0]?(a=null!=s?s:M,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?O:'"'===l[3]?R:I):a===R||a===I?a=O:a===P||a===F?a=M:(a=O,s=void 0);const d=a===O&&e[t+1].startsWith("/>")?" ":"";n+=a===M?o+k:c>=0?(i.push(r),o.slice(0,c)+x+o.slice(c)+$+d):o+$+(-2===c?(i.push(void 0),t):d)}return[D(e,n+(e[o]||"<?>")+(2===t?"</svg>":"")),i]};class U{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let s=0,n=0;const a=e.length-1,r=this.parts,[l,c]=H(e,t);if(this.el=U.createElement(l,o),L.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=L.nextNode())&&r.length<a;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith(x)||t.startsWith($)){const o=c[n++];if(e.push(t),void 0!==o){const e=i.getAttribute(o.toLowerCase()+x).split($),t=/([.?@])?(.*)/.exec(o);r.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?Y:"?"===t[1]?X:"@"===t[1]?Z:G})}else r.push({type:6,index:s})}for(const t of e)i.removeAttribute(t)}if(q.test(i.tagName)){const e=i.textContent.split($),t=e.length-1;if(t>0){i.textContent=v?v.emptyScript:"";for(let o=0;o<t;o++)i.append(e[o],C()),L.nextNode(),r.push({type:2,index:++s});i.append(e[t],C())}}}else if(8===i.nodeType)if(i.data===w)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf($,e+1));)r.push({type:7,index:s}),e+=$.length-1}s++}}static createElement(e,t){const o=S.createElement("template");return o.innerHTML=e,o}}function W(e,t,o=e,i){var s,n,a,r;if(t===T)return t;let l=void 0!==i?null===(s=o._$Co)||void 0===s?void 0:s[i]:o._$Cl;const c=A(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,o,i)),void 0!==i?(null!==(a=(r=o)._$Co)&&void 0!==a?a:r._$Co=[])[i]=l:o._$Cl=l),void 0!==l&&(t=W(e,l._$AS(e,t.values),l,i)),t}class V{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:o},parts:i}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:S).importNode(o,!0);L.currentNode=s;let n=L.nextNode(),a=0,r=0,l=i[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new J(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new Q(n,this,e)),this._$AV.push(t),l=i[++r]}a!==(null==l?void 0:l.index)&&(n=L.nextNode(),a++)}return L.currentNode=S,s}v(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class J{constructor(e,t,o,i){var s;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cp=null===(s=null==i?void 0:i.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),A(e)?e===j||null==e||""===e?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==T&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>E(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==j&&A(this._$AH)?this._$AA.nextSibling.data=e:this.$(S.createTextNode(e)),this._$AH=e}g(e){var t;const{values:o,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=U.createElement(D(i.h,i.h[0]),this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(o);else{const e=new V(s,this),t=e.u(this.options);e.v(o),this.$(t),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new U(e)),t}T(e){E(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const s of e)i===t.length?t.push(o=new J(this.k(C()),this.k(C()),this,this.options)):o=t[i],o._$AI(s),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class G{constructor(e,t,o,i,s){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,o,i){const s=this.strings;let n=!1;if(void 0===s)e=W(this,e,t,0),n=!A(e)||e!==this._$AH&&e!==T,n&&(this._$AH=e);else{const i=e;let a,r;for(e=s[0],a=0;a<s.length-1;a++)r=W(this,i[o+a],t,a),r===T&&(r=this._$AH[a]),n||(n=!A(r)||r!==this._$AH[a]),r===j?e=j:e!==j&&(e+=(null!=r?r:"")+s[a+1]),this._$AH[a]=r}n&&!i&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Y extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}}const K=v?v.emptyScript:"";class X extends G{constructor(){super(...arguments),this.type=4}j(e){e&&e!==j?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class Z extends G{constructor(e,t,o,i,s){super(e,t,o,i,s),this.type=5}_$AI(e,t=this){var o;if((e=null!==(o=W(this,e,t,0))&&void 0!==o?o:j)===T)return;const i=this._$AH,s=e===j&&i!==j||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==j&&(i===j||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,o;"function"==typeof this._$AH?this._$AH.call(null!==(o=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==o?o:this.element,e):this._$AH.handleEvent(e)}}class Q{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const ee=_.litHtmlPolyfillSupport;null==ee||ee(U,J),(null!==(f=_.litHtmlVersions)&&void 0!==f?f:_.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var te,oe;class ie extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const o=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=o.firstChild),o}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{var i,s;const n=null!==(i=null==o?void 0:o.renderBefore)&&void 0!==i?i:t;let a=n._$litPart$;if(void 0===a){const e=null!==(s=null==o?void 0:o.renderBefore)&&void 0!==s?s:null;n._$litPart$=a=new J(t.insertBefore(C(),e),e,void 0,null!=o?o:{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return T}}ie.finalized=!0,ie._$litElement$=!0,null===(te=globalThis.litElementHydrateSupport)||void 0===te||te.call(globalThis,{LitElement:ie});const se=globalThis.litElementPolyfillSupport;null==se||se({LitElement:ie}),(null!==(oe=globalThis.litElementVersions)&&void 0!==oe?oe:globalThis.litElementVersions=[]).push("3.3.3");const ne={alarm_control_panel:"Alarms",binary_sensor:"Binary Sensors",camera:"Cameras",climate:"Climate",cover:"Covers",fan:"Fan",light:"Light",lock:"Lock",media_player:"Media Player",scene:"Scenes",script:"Scripts",siren:"Siren",vacuum:"Vacuum",motion:"Motion",occupancy:"Occupancy",presence:"Presence",moving:"Moving",door:"Door",window:"Window",opening:"Opening",garage_door:"Garage Door",vibration:"Vibration",sound:"Sound",moisture:"Moisture/Leak",water:"Water/Leak",smoke:"Smoke",gas:"Gas",carbon_monoxide:"Carbon Monoxide",cold:"Cold",heat:"Heat",light_level:"Light Level",connectivity:"Connectivity",lock_dc:"Lock (status)",plug:"Plug",power:"Power",problem:"Problem",running:"Running",safety:"Safety",tamper:"Tamper",update:"Update",switch:"Switch",input_boolean:"Boolean Switch"},ae=["alarm_control_panel","binary_sensor","camera","climate","cover","fan","input_boolean","light","lock","media_player","scene","script","siren","switch","vacuum"],re=["motion","occupancy","presence","moving","door","window","opening","garage_door","vibration","sound","moisture","water","smoke","gas","carbon_monoxide","cold","heat","light_level","connectivity","plug","power","problem","running","safety","tamper","update"],le=(e=[])=>({includeDomains:ae,entityFilter:(t,o)=>{if(!e.length)return!1;const[i]=t.split(".");if("binary_sensor"===i){const i=o.states[t]?.attributes?.device_class??"";return e.includes(i)}return e.includes(i)}}),ce=(e=[])=>({includeDomains:["sensor"],entityFilter:(t,o)=>{if(!e.length)return!0;const i=o.states[t]?.attributes?.device_class??"";return e.includes(i)}}),ue=(e=[])=>({includeDomains:ae,entityFilter:(t,o)=>{if(!e.length)return"binary_sensor"===t.split(".")[0];const[i]=t.split(".");if("binary_sensor"===i){const i=o.states[t]?.attributes?.device_class??"";return e.includes(i)}return e.includes(i)}}),de=(e=[])=>({includeDomains:ae,entityFilter:(t,o)=>{const[i]=t.split(".");if(!e.length)return ae.includes(i);if("binary_sensor"===i){const i=o.states[t]?.attributes?.device_class??"";return e.includes(i)}return e.includes(i)}}),he=(e=[])=>({includeDomains:["camera"],entityFilter:(t,o)=>{if(!e.length)return!0;const i=o.states[t]?.attributes?.device_class??"";return e.includes(i)}}),pe=(e=[])=>({includeDomains:["climate"],entityFilter:(e,t)=>!0});function be(e){return"string"==typeof e&&e.trim().length>0}function me(e,t,o){if(!be(o))return!0;const i=function(e){if(!e)return{};if(!Array.isArray(e))return e;const t={};for(const o of e){const e=o?.entity_id||o?.id;e&&(t[e]=o)}return t}(e?.entities),s=function(e){if(!e)return{};if(!Array.isArray(e))return e;const t={};for(const o of e){const e=o?.id||o?.device_id;e&&(t[e]=o)}return t}(e?.devices),n=i[t];if(n?.area_id===o)return!0;const a=n?.device_id||n?.deviceId;if(a&&s[a]?.area_id===o)return!0;const r=e?.states?.[t]?.attributes?.area_id;return r===o}function ge(e,t,o,i=[]){if(!e?.states)return[];let s;if("presence"===o?s=le(i):"sensor"===o?s=ce(i):"mushroom"===o?s=ue(i):"subbutton"===o?s=de(i):"camera"===o?s=he(i):"climate"===o&&(s=pe(i)),!s)return[];const n=Object.keys(e.states).filter(e=>s.includeDomains.includes(e.split(".")[0])).filter(t=>s.entityFilter(t,e));let a=n;const r="string"==typeof t?.area_id?t.area_id:t?.area;if(be(r)){const t=function(e,t){return e?.states&&be(t)?Object.keys(e.states).filter(o=>me(e,o,t)):[]}(e,r),o=n.filter(e=>t.includes(e));o.length&&(a=o)}const l=function(e){const t=new Set,o=e=>{e&&("string"==typeof e&&e.includes(".")?t.add(e):Array.isArray(e)?e.forEach(o):"object"==typeof e&&Object.values(e).forEach(o))};return o(e),Array.from(t)}("subbutton"===o?t?.subbuttons:t?.entities?.[o]);return function(e,t){const o=Array.from(new Set(e)),i=Array.isArray(t)?t:t?[t]:[];for(let e=i.length-1;e>=0;e--){const t=i[e];t&&!o.includes(t)&&o.unshift(t)}return o}(a,l)}const fe=new Map,_e="mdi:bookmark",ve={light:"mdi:lightbulb",switch:"mdi:toggle-switch",fan:"mdi:fan",climate:"mdi:thermostat",media_player:"mdi:play-circle",script:"mdi:script-text",scene:"mdi:palette",lock:"mdi:lock",camera:"mdi:video",binary_sensor:"mdi:checkbox-marked-circle-outline",sensor:"mdi:eye",alarm_control_panel:"mdi:shield-home",vacuum:"mdi:robot-vacuum",siren:"mdi:bullhorn",input_boolean:"mdi:toggle-switch",humidifier:"mdi:air-humidifier"},ye={door:{on:"mdi:door-open",off:"mdi:door-closed"},window:{on:"mdi:window-open",off:"mdi:window-closed"},motion:{on:"mdi:motion-sensor",off:"mdi:motion-sensor-off"},moisture:{on:"mdi:water-alert",off:"mdi:water-off"},smoke:{on:"mdi:smoke",off:"mdi:smoke-detector-off"},gas:{on:"mdi:gas-cylinder",off:"mdi:gas-off"},lock:{on:"mdi:lock-open-variant",off:"mdi:lock"},garage:{on:"mdi:garage-open",off:"mdi:garage"},light:{on:"mdi:lightbulb-on",off:"mdi:lightbulb-off"},plug:{on:"mdi:power-plug",off:"mdi:power-plug-off"},presence:{on:"mdi:account",off:"mdi:account-off"},vibration:{on:"mdi:vibrate",off:"mdi:vibrate-off"},opening:{on:"mdi:door-open",off:"mdi:door-closed"},battery:{on:"mdi:battery",off:"mdi:battery-outline"},connectivity:{on:"mdi:wifi",off:"mdi:wifi-off"},safety:{on:"mdi:shield-check",off:"mdi:shield-off"},cold:{on:"mdi:snowflake",off:"mdi:snowflake-off"},blind:{on:"mdi:blinds-open",off:"mdi:blinds"},curtain:{on:"mdi:curtains-open",off:"mdi:curtains-closed"},shutter:{on:"mdi:window-shutter-open",off:"mdi:window-shutter"},awning:{on:"mdi:awning-open",off:"mdi:awning"},shade:{on:"mdi:blinds-open",off:"mdi:blinds"},gate:{on:"mdi:gate-open",off:"mdi:gate"},damper:{on:"mdi:air-filter",off:"mdi:air-filter-alert"},garage_door:{on:"mdi:garage-open",off:"mdi:garage"},occupancy:{on:"mdi:account-group",off:"mdi:account-off"},running:{on:"mdi:play",off:"mdi:stop"},problem:{on:"mdi:alert",off:"mdi:check-circle"},sound:{on:"mdi:volume-high",off:"mdi:volume-off"},tamper:{on:"mdi:cellphone-alert",off:"mdi:cellphone-check"},update:{on:"mdi:update-alert",off:"mdi:update"},carbon_monoxide:{on:"mdi:cloud-alert",off:"mdi:cloud-check"},heat:{on:"mdi:thermometer-high",off:"mdi:thermometer-low"},moving:{on:"mdi:arrow-up-down-bold",off:"mdi:ray-vertex"},power:{on:"mdi:flash",off:"mdi:flash-off"}};function xe(e){return["on","open","unlocked","playing","active"].includes(e)}function $e(e,t){const{entityId:o,hass:i}=function(e,t){return e&&"object"==typeof e&&e.states&&"string"==typeof t?{entityId:t,hass:e}:{entityId:e,hass:t}}(e,t);if(!o)return _e;const s=fe.get(o);if(s)return s;const n=i?.states?.[o],a=n?.attributes||{},r=function(e){return(e||"").split(".")[0]||""}(o),l=n?.state;if(a.icon)return fe.set(o,a.icon),a.icon;const c=a.device_class;if(c&&ye[c]){const e=xe(l)?ye[c].on:ye[c].off;return fe.set(o,e),e}const u={light:["mdi:lightbulb-on","mdi:lightbulb-off"],switch:["mdi:toggle-switch","mdi:toggle-switch-off"],fan:["mdi:fan","mdi:fan-off"],lock:["mdi:lock-open-variant","mdi:lock"],media_player:["mdi:play-circle","mdi:stop-circle"],humidifier:["mdi:air-humidifier","mdi:air-humidifier-off"],siren:["mdi:bullhorn-variant","mdi:bullhorn-outline"],vacuum:["mdi:robot-vacuum","mdi:robot-vacuum-off"],input_boolean:["mdi:toggle-switch","mdi:toggle-switch-off"],scene:["mdi:palette","mdi:palette-outline"],script:["mdi:script-text-play-outline","mdi:script-text-outline"],alarm_control_panel:["mdi:shield-lock","mdi:shield-outline"],camera:["mdi:cctv","mdi:cctv-off"]};if(u[r]){const[e,t]=u[r],i=xe(l)?e:t;return fe.set(o,i),i}const d=ve[r]||_e;return fe.set(o,d),d}function we(e,t=""){const o=(e||"").toLowerCase(),i=o.includes(":")?o.split(":").pop():o;return"camera"===t||i.includes("cctv")||i.includes("camera")||i.includes("webcam")||i.includes("doorbell")||i.includes("video")||i.includes("telescope")||i.includes("binoculars")?"anim-scan":i.includes("fan")||i.includes("propeller")||i.includes("turbine")||i.includes("wind-turbine")||i.includes("rotate")||i.includes("reload")||i.includes("refresh")||i.includes("sync")||i.includes("loading")||i.includes("disc")||i.includes("record")||i.includes("vinyl")||i.includes("wheel")||i.includes("circular")||i.includes("spinner")?"anim-spin":i.includes("lightbulb")||i.includes("lamp")||i.includes("bulb")||i.includes("chandelier")||i.includes("ceiling-light")||i.includes("floor-lamp")||i.includes("desk-lamp")||i.includes("string-lights")||i.includes("wall-sconce")||i.includes("spotlight")||i.includes("spot")||i.includes("torch")||i.includes("flashlight")||i.includes("candle")||i.includes("fire")||i.includes("flame")||i.includes("lantern")||i.includes("lava-lamp")||i.includes("neon")||i.includes("strip-lights")||i.includes("led")||"bloom"===i||"iris"===i||"go"===i||"play"===i||"beyond"===i||"phoenix"===i||"signe"===i||"ensis"===i||"arc"===i||"infuse"===i||"still"===i||"appear"===i||"struana"===i||"buratto"===i||"cher"===i||"econic"===i||"fugato"===i||"amaze"===i||"aurelle"===i||"devote"===i||"centurion"===i||"being"===i||"adore"===i||"explore"===i||i.startsWith("ceiling-")||i.startsWith("floor-")||i.startsWith("table-")||i.startsWith("wall-")||i.includes("gradient")||i.includes("lightstrip")||i.includes("filament")||i.includes("ambiance")||i.includes("colour")?"anim-illuminate":i.includes("bell")||i.includes("alarm")||i.includes("siren")||i.includes("alert")||i.includes("smoke")||i.includes("fire-alert")||i.includes("water-alert")||i.includes("leak")||i.includes("vibrate")||i.includes("shield-alert")||i.includes("hazard")||i.includes("warning")||i.includes("flood")||i.includes("door-open")||i.includes("window-open")||i.includes("bullhorn")?"anim-alarm":i.includes("motion")||i.includes("walk")||i.includes("run")||i.includes("human")||i.includes("account")||i.includes("presence")||i.includes("wifi")||i.includes("bluetooth")||i.includes("signal")||i.includes("broadcast")||i.includes("antenna")||i.includes("eye")||i.includes("network")||i.includes("access-point")||i.includes("blink")||i.includes("sensor")||i.includes("radar")||i.includes("sonar")||"satellite-dish"===i||"tower-broadcast"===i||"satellite"===i?"anim-blink":i.includes("speaker")||i.includes("music")||i.includes("audio")||i.includes("subwoofer")||i.includes("headphone")||i.includes("headset")||i.includes("microphone")||i.includes("heart")||i.includes("waveform")||i.includes("equalizer")||i.includes("radio")||i.includes("podcast")||i.includes("piano")||i.includes("guitar")||i.includes("drum")||i.includes("pump")||i.includes("pacemaker")||i.includes("volume")||"compact-disc"===i||"drum"===i||"guitar"===i||"music"===i||"volume-up"===i||"volume-high"===i?"anim-beat":i.includes("washing")||i.includes("dishwasher")||i.includes("dryer")||i.includes("tumble")||i.includes("blender")||i.includes("mixer")||i.includes("vacuum")||i.includes("robot")||i.includes("drill")||i.includes("wrench")||i.includes("hammer")||i.includes("saw")||i.includes("gamepad")||i.includes("joystick")||i.includes("controller")||i.includes("vibration")?"anim-shake":i.includes("dog")||i.includes("cat")||i.includes("bird")||i.includes("pet")||i.includes("paw")||i.includes("rabbit")||i.includes("fish")||i.includes("turtle")||i.includes("horse")||i.includes("cow")||i.includes("pig")||i.includes("bee")||i.includes("butterfly")||i.includes("bug")||i.includes("spider")||i.includes("emoticon")||i.includes("balloon")||i.includes("ball")||i.includes("basketball")||i.includes("soccer")||i.includes("football")||i.includes("tennis")||i.includes("volleyball")?"anim-bounce":""}const ke={_list:null,get(e){if(this._list)return this._list;const t=e?.mdiIcons||null;return this._list=t?Object.keys(t).sort():[],this._list},warm(e){return this.get(e)}},Se=n`
  :host { display: block; }

  .glass-panel {
    margin: 0 !important;
    width: 100%;
    box-sizing: border-box;
    border-radius: 40px;
    position: relative;
    background: var(--bubble-glass-bg, var(--glass-bg, rgba(167,255,175,0.22)));
    box-shadow: var(--bubble-glass-shadow, var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13)));
    overflow: hidden;
  }
  .glass-panel::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--bubble-glass-sheen,
      var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.11),
        rgba(255,255,255,0.07) 70%, transparent 100%)
      )
    );
    pointer-events: none;
  }

  .glass-header {
    padding: 22px 0;
    text-align: center;
    font-size: 1.12rem;
    font-weight: 700;
    color: var(--bubble-header-color, #fff);
  }

  .input-group.autodiscover {
    margin: 0 16px 13px;
    padding: 14px 18px 10px;
    background: rgba(44,70,100,0.23);
    border: 1.5px solid rgba(255,255,255,0.13);
    box-shadow: 0 2px 14px rgba(70,120,220,0.10);
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .input-group.autodiscover input {
    margin-right: 8px;
  }
  .input-group.autodiscover label {
    margin: 0;
    font-weight: 700;
    color: var(--bubble-autodiscover-label-color, #fff);
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
    color: var(--bubble-accent-color, #8cff8a);
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

  .input-group {
    margin-bottom: 12px;
  }
  .input-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
    color: var(--bubble-accent-color, #8cff8a);
  }

  ha-selector,
  ha-icon-picker,
  ha-entity-picker,
  ha-area-picker {
    width: 100%;
    box-sizing: border-box;
  }
  ha-selector::part(combobox) {
    min-height: 40px;
  }

  .filter-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }

  .clear-chip {
    border: 2px solid var(--bubble-clear-chip-color, var(--warning-color, #ff8a65));
    color: var(--bubble-clear-chip-color, var(--warning-color, #ff8a65));
    background: transparent;
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 0.9rem;
    font-weight: 800;
    cursor: pointer;
    transition: background .15s, color .15s, box-shadow .15s, border-color .15s;
    box-shadow: 0 1px 10px rgba(255,138,101,0.25);
  }
  .clear-chip:hover {
    background: rgba(255,138,101,0.18);
    color: #fff;
    border-color: #ff8a65;
    box-shadow: 0 3px 16px rgba(255,138,101,0.45);
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
`,Ce={en:{"panel.room.title":"🛋️ Room Settings","panel.room.auto_discover_presence":"🪄 Auto-discover Presence","panel.room.area":"🏷️ Area:","panel.room.name":"🏠 Room name:","panel.room.icon_presence":"🎭 Icon & Presence","panel.room.icon":"Icon:","panel.room.filter_categories":"Filter categories:","panel.room.presence_id":"Presence (ID):","panel.room.tap_action":"Tap Action","panel.room.hold_action":"Hold Action","panel.room.path":"Path","panel.room.service":"Service","panel.room.service_with_example":"Service (e.g. light.turn_on)","panel.room.service_data":"Service Data (JSON)","panel.room.layout":"📐 Layout:","panel.room.layout_tall":"Tall","panel.room.layout_wide":"Wide","panel.room.reset":"🧹 Reset Room","panel.camera.title":"📷 Camera","panel.camera.auto_discover":"🪄 Auto-discover","panel.camera.entity":"Camera (ID):","panel.camera.icon":"Camera Icon:","panel.camera.presence":"Presence/Motion Entity:","panel.camera.reset":"🧹 Reset Camera","panel.climate.title":"🌡️ Climate","panel.climate.auto_discover":"🪄 Auto-discover","panel.climate.entity":"Climate (ID):","panel.climate.icon":"Climate Icon:","panel.climate.reset":"🧹 Reset Climate","panel.sensor.title":"🧭 Sensors","panel.sensor.auto_discover":"🪄 Auto-discover Sensors","panel.sensor.show_icons":"Show sensor icons","panel.sensor.sensor_item":"Sensor {index}","panel.sensor.filter_category":"Filter category:","panel.sensor.clear_filter":"Clear filter category","panel.sensor.clear":"Clear","panel.sensor.entity":"Entity:","panel.sensor.reset":"🧹 Reset Sensors","panel.mushroom.title":"🍄 Mushroom Entities","panel.mushroom.auto_discover":"🪄 Auto-discover Mushroom","panel.mushroom.item":"Mushroom {index}","panel.mushroom.filter_category":"Filter category:","panel.mushroom.clear_filter":"Clear filter category","panel.mushroom.clear":"Clear","panel.mushroom.entity":"Entity:","panel.mushroom.icon":"Icon:","panel.mushroom.tap_action":"Tap Action:","panel.mushroom.hold_action":"Hold Action:","panel.mushroom.path":"Path","panel.mushroom.service_with_example":"Service (e.g. light.turn_on)","panel.mushroom.service_data":"Service Data (JSON)","panel.mushroom.reset":"🧹 Reset Mushrooms","panel.subbutton.title":"🎛️ Sub-buttons","panel.subbutton.auto_discover":"🪄 Auto-discover Subbuttons","panel.subbutton.item":"Sub-button {index}","panel.subbutton.filter_category":"Filter category:","panel.subbutton.clear_filter":"Clear filter category","panel.subbutton.clear":"Clear","panel.subbutton.entity":"Entity:","panel.subbutton.icon":"Icon:","panel.subbutton.tap_action":"Tap Action:","panel.subbutton.hold_action":"Hold Action:","panel.subbutton.path":"Path","panel.subbutton.service":"Service","panel.subbutton.service_data":"Service Data (JSON)","panel.subbutton.reset":"🧹 Reset Sub-buttons","panel.colors.title":"🎨 Colors & Presets","panel.colors.room_section":"🏠 Room","panel.colors.room_icon_section":"💡 Main Icon","panel.colors.room_name_section":"🏷️ Room Name","panel.colors.subbutton_section":"🎛️ Sub-button","panel.colors.mushroom_section":"🍄 Mushroom","panel.colors.sensor_section":"📊 Sensors","panel.colors.reset":"🧹 Reset","panel.colors.apply_preset":"✨ Apply Preset","panel.colors.on":"On","panel.colors.off":"Off","panel.colors.subbutton_style":"Subbutton Style","panel.colors.style.standard":"Standard (v5.0.6)","panel.colors.style.standard_desc":"Classic look with solid, high-contrast pills.","panel.colors.style.soft_glass":"Soft Glass","panel.colors.style.soft_glass_desc":"Cleaner glass look with lighter blur and softer shadows.","panel.colors.style.minimal":"Minimal","panel.colors.style.minimal_desc":"Lightweight style without blur, glow or heavy shadows.","panel.colors.style.liquid_glass":"Liquid Glass","panel.colors.style.liquid_glass_desc":"Liquid glass effect with soft transparency.","panel.colors.room.background_active":"Icon Background (active)","panel.colors.room.background_inactive":"Icon Background (inactive)","panel.colors.room.icon_active":"Main Icon (active)","panel.colors.room.icon_inactive":"Main Icon (inactive)","panel.colors.room.text_active":"Room Name (active)","panel.colors.room.text_inactive":"Room Name (inactive)","panel.colors.subbutton.background_on":"Background (active)","panel.colors.subbutton.background_off":"Background (inactive)","panel.colors.subbutton.icon_on":"Icon (active)","panel.colors.subbutton.icon_off":"Icon (inactive)","panel.colors.mushroom.active":"Icon Color (active)","panel.colors.mushroom.inactive":"Icon Color (inactive)","panel.colors.sensor.sensor_active":"Color (active)","panel.colors.sensor.sensor_inactive":"Color (inactive)","panel.colors.card_bg_section":"🃏 Card Background","panel.colors.card_bg.enabled":"Enable card background","panel.colors.card_bg.color":"Background color","panel.colors.card_bg.hint":"Empty = auto from room color (subtle tint).","actions.toggle":"toggle","actions.more-info":"more-info","actions.navigate":"navigate","actions.url":"url","actions.call-service":"call-service","actions.none":"none","presets.green":"Green","presets.blue":"Blue","presets.amber":"Amber","presets.purple":"Purple","presets.red":"Red","presets.yellow":"Yellow","presets.teal":"Teal","presets.gray":"Gray"},it:{"panel.room.title":"🛋️ Impostazioni stanza","panel.room.auto_discover_presence":"🪄 Autodiscovery presenza","panel.room.area":"🏷️ Area:","panel.room.name":"🏠 Nome stanza:","panel.room.icon_presence":"🎭 Icona e presenza","panel.room.icon":"Icona:","panel.room.filter_categories":"Categorie filtro:","panel.room.presence_id":"Presenza (ID):","panel.room.tap_action":"Azione tap","panel.room.hold_action":"Azione hold","panel.room.path":"Percorso","panel.room.service":"Servizio","panel.room.service_with_example":"Servizio (es. light.turn_on)","panel.room.service_data":"Dati servizio (JSON)","panel.room.layout":"📐 Layout:","panel.room.layout_tall":"Alto","panel.room.layout_wide":"Largo","panel.room.reset":"🧹 Reset stanza","panel.camera.title":"📷 Camera","panel.camera.auto_discover":"🪄 Autodiscovery","panel.camera.entity":"Camera (ID):","panel.camera.icon":"Icona camera:","panel.camera.presence":"Entità presenza/movimento:","panel.camera.reset":"🧹 Reset camera","panel.climate.title":"🌡️ Clima","panel.climate.auto_discover":"🪄 Autodiscovery","panel.climate.entity":"Clima (ID):","panel.climate.icon":"Icona clima:","panel.climate.reset":"🧹 Reset clima","panel.sensor.title":"🧭 Sensori","panel.sensor.auto_discover":"🪄 Autodiscovery sensori","panel.sensor.show_icons":"Mostra icone sensori","panel.sensor.sensor_item":"Sensore {index}","panel.sensor.filter_category":"Categoria filtro:","panel.sensor.clear_filter":"Pulisci categoria filtro","panel.sensor.clear":"Pulisci","panel.sensor.entity":"Entità:","panel.sensor.reset":"🧹 Reset sensori","panel.mushroom.title":"🍄 Entità mushroom","panel.mushroom.auto_discover":"🪄 Autodiscovery mushroom","panel.mushroom.item":"Mushroom {index}","panel.mushroom.filter_category":"Categoria filtro:","panel.mushroom.clear_filter":"Pulisci categoria filtro","panel.mushroom.clear":"Pulisci","panel.mushroom.entity":"Entità:","panel.mushroom.icon":"Icona:","panel.mushroom.tap_action":"Azione tap:","panel.mushroom.hold_action":"Azione hold:","panel.mushroom.path":"Percorso","panel.mushroom.service_with_example":"Servizio (es. light.turn_on)","panel.mushroom.service_data":"Dati servizio (JSON)","panel.mushroom.reset":"🧹 Reset mushroom","panel.subbutton.title":"🎛️ Sub-button","panel.subbutton.auto_discover":"🪄 Autodiscovery subbutton","panel.subbutton.item":"Sub-button {index}","panel.subbutton.filter_category":"Categoria filtro:","panel.subbutton.clear_filter":"Pulisci categoria filtro","panel.subbutton.clear":"Pulisci","panel.subbutton.entity":"Entità:","panel.subbutton.icon":"Icona:","panel.subbutton.tap_action":"Azione tap:","panel.subbutton.hold_action":"Azione hold:","panel.subbutton.path":"Percorso","panel.subbutton.service":"Servizio","panel.subbutton.service_data":"Dati servizio (JSON)","panel.subbutton.reset":"🧹 Reset sub-button","panel.colors.title":"🎨 Colori e preset","panel.colors.room_section":"🏠 Stanza","panel.colors.room_icon_section":"💡 Icona principale","panel.colors.room_name_section":"🏷️ Nome stanza","panel.colors.subbutton_section":"🎛️ Sub-button","panel.colors.mushroom_section":"🍄 Mushroom","panel.colors.sensor_section":"📊 Sensori","panel.colors.reset":"🧹 Reset","panel.colors.apply_preset":"✨ Applica preset","panel.colors.on":"On","panel.colors.off":"Off","panel.colors.subbutton_style":"Stile subbutton","panel.colors.style.standard":"Standard (v5.0.6)","panel.colors.style.standard_desc":"Aspetto classico con pillole solide e contrastate.","panel.colors.style.soft_glass":"Soft Glass","panel.colors.style.soft_glass_desc":"Vetro morbido piu leggero, con blur e ombre ridotti.","panel.colors.style.minimal":"Minimal","panel.colors.style.minimal_desc":"Stile leggero senza blur, glow o ombre pesanti.","panel.colors.style.liquid_glass":"Liquid Glass","panel.colors.style.liquid_glass_desc":"Effetto vetro liquido con trasparenze morbide.","panel.colors.room.background_active":"Sfondo icona (attivo)","panel.colors.room.background_inactive":"Sfondo icona (inattivo)","panel.colors.room.icon_active":"Icona principale (attiva)","panel.colors.room.icon_inactive":"Icona principale (inattiva)","panel.colors.room.text_active":"Nome stanza (attivo)","panel.colors.room.text_inactive":"Nome stanza (inattivo)","panel.colors.subbutton.background_on":"Sfondo (attivo)","panel.colors.subbutton.background_off":"Sfondo (inattivo)","panel.colors.subbutton.icon_on":"Icona (attiva)","panel.colors.subbutton.icon_off":"Icona (inattiva)","panel.colors.mushroom.active":"Colore icona (attivo)","panel.colors.mushroom.inactive":"Colore icona (inattivo)","panel.colors.sensor.sensor_active":"Colore (attivo)","panel.colors.sensor.sensor_inactive":"Colore (inattivo)","panel.colors.card_bg_section":"🃏 Sfondo card","panel.colors.card_bg.enabled":"Abilita sfondo card","panel.colors.card_bg.color":"Colore sfondo","panel.colors.card_bg.hint":"Vuoto = automatico dal colore della stanza (tint sottile).","actions.toggle":"toggle","actions.more-info":"more-info","actions.navigate":"navigate","actions.url":"url","actions.call-service":"call-service","actions.none":"none","presets.green":"Verde","presets.blue":"Blu","presets.amber":"Ambra","presets.purple":"Viola","presets.red":"Rosso","presets.yellow":"Giallo","presets.teal":"Teal","presets.gray":"Grigio"},es:{"panel.room.title":"🛋️ Configuración de la habitación","panel.room.auto_discover_presence":"🪄 Autodescubrimiento de presencia","panel.room.area":"🏷️ Área:","panel.room.name":"🏠 Nombre de la habitación:","panel.room.icon_presence":"🎭 Icono y presencia","panel.room.icon":"Icono:","panel.room.filter_categories":"Categorías de filtro:","panel.room.presence_id":"Presencia (ID):","panel.room.tap_action":"Acción tap","panel.room.hold_action":"Acción hold","panel.room.path":"Ruta","panel.room.service":"Servicio","panel.room.service_with_example":"Servicio (p. ej. light.turn_on)","panel.room.service_data":"Datos del servicio (JSON)","panel.room.layout":"📐 Diseño:","panel.room.layout_tall":"Alto","panel.room.layout_wide":"Ancho","panel.room.reset":"🧹 Reiniciar habitación","panel.camera.title":"📷 Cámara","panel.camera.auto_discover":"🪄 Autodescubrimiento","panel.camera.entity":"Cámara (ID):","panel.camera.icon":"Icono de cámara:","panel.camera.presence":"Entidad de presencia/movimiento:","panel.camera.reset":"🧹 Reiniciar cámara","panel.climate.title":"🌡️ Clima","panel.climate.auto_discover":"🪄 Autodescubrimiento","panel.climate.entity":"Clima (ID):","panel.climate.icon":"Icono de clima:","panel.climate.reset":"🧹 Reiniciar clima","panel.sensor.title":"🧭 Sensores","panel.sensor.auto_discover":"🪄 Autodescubrimiento de sensores","panel.sensor.show_icons":"Mostrar iconos de sensores","panel.sensor.sensor_item":"Sensor {index}","panel.sensor.filter_category":"Categoría de filtro:","panel.sensor.clear_filter":"Limpiar categoría de filtro","panel.sensor.clear":"Limpiar","panel.sensor.entity":"Entidad:","panel.sensor.reset":"🧹 Reiniciar sensores","panel.mushroom.title":"🍄 Entidades mushroom","panel.mushroom.auto_discover":"🪄 Autodescubrimiento mushroom","panel.mushroom.item":"Mushroom {index}","panel.mushroom.filter_category":"Categoría de filtro:","panel.mushroom.clear_filter":"Limpiar categoría de filtro","panel.mushroom.clear":"Limpiar","panel.mushroom.entity":"Entidad:","panel.mushroom.icon":"Icono:","panel.mushroom.tap_action":"Acción tap:","panel.mushroom.hold_action":"Acción hold:","panel.mushroom.path":"Ruta","panel.mushroom.service_with_example":"Servicio (p. ej. light.turn_on)","panel.mushroom.service_data":"Datos del servicio (JSON)","panel.mushroom.reset":"🧹 Reiniciar mushroom","panel.subbutton.title":"🎛️ Sub-botones","panel.subbutton.auto_discover":"🪄 Autodescubrimiento subbuttons","panel.subbutton.item":"Sub-botón {index}","panel.subbutton.filter_category":"Categoría de filtro:","panel.subbutton.clear_filter":"Limpiar categoría de filtro","panel.subbutton.clear":"Limpiar","panel.subbutton.entity":"Entidad:","panel.subbutton.icon":"Icono:","panel.subbutton.tap_action":"Acción tap:","panel.subbutton.hold_action":"Acción hold:","panel.subbutton.path":"Ruta","panel.subbutton.service":"Servicio","panel.subbutton.service_data":"Datos del servicio (JSON)","panel.subbutton.reset":"🧹 Reiniciar sub-botones","panel.colors.title":"🎨 Colores y presets","panel.colors.room_section":"🏠 Habitación","panel.colors.room_icon_section":"💡 Icono principal","panel.colors.room_name_section":"🏷️ Nombre habitación","panel.colors.subbutton_section":"🎛️ Sub-button","panel.colors.mushroom_section":"🍄 Mushroom","panel.colors.sensor_section":"📊 Sensores","panel.colors.reset":"🧹 Reiniciar","panel.colors.apply_preset":"✨ Aplicar preset","panel.colors.on":"On","panel.colors.off":"Off","panel.colors.subbutton_style":"Estilo de subbutton","panel.colors.style.standard":"Estándar (v5.0.6)","panel.colors.style.standard_desc":"Aspecto clásico con píldoras sólidas y de alto contraste.","panel.colors.style.soft_glass":"Soft Glass","panel.colors.style.soft_glass_desc":"Cristal mas ligero, con desenfoque y sombras reducidos.","panel.colors.style.minimal":"Minimal","panel.colors.style.minimal_desc":"Estilo ligero sin desenfoque, brillo ni sombras pesadas.","panel.colors.style.liquid_glass":"Cristal líquido","panel.colors.style.liquid_glass_desc":"Efecto de cristal líquido con transparencias suaves.","panel.colors.room.background_active":"Fondo del icono (activo)","panel.colors.room.background_inactive":"Fondo del icono (inactivo)","panel.colors.room.icon_active":"Icono principal (activo)","panel.colors.room.icon_inactive":"Icono principal (inactivo)","panel.colors.room.text_active":"Nombre habitación (activo)","panel.colors.room.text_inactive":"Nombre habitación (inactivo)","panel.colors.subbutton.background_on":"Fondo (activo)","panel.colors.subbutton.background_off":"Fondo (inactivo)","panel.colors.subbutton.icon_on":"Icono (activo)","panel.colors.subbutton.icon_off":"Icono (inactivo)","panel.colors.mushroom.active":"Color icono (activo)","panel.colors.mushroom.inactive":"Color icono (inactivo)","panel.colors.sensor.sensor_active":"Color (activo)","panel.colors.sensor.sensor_inactive":"Color (inactivo)","panel.colors.card_bg_section":"🃏 Fondo de tarjeta","panel.colors.card_bg.enabled":"Habilitar fondo de tarjeta","panel.colors.card_bg.color":"Color de fondo","panel.colors.card_bg.hint":"Vacío = automático desde el color de la habitación.","actions.toggle":"toggle","actions.more-info":"more-info","actions.navigate":"navigate","actions.url":"url","actions.call-service":"call-service","actions.none":"none","presets.green":"Verde","presets.blue":"Azul","presets.amber":"Ámbar","presets.purple":"Morado","presets.red":"Rojo","presets.yellow":"Amarillo","presets.teal":"Teal","presets.gray":"Gris"},fr:{"panel.room.title":"🛋️ Paramètres de la pièce","panel.room.auto_discover_presence":"🪄 Découverte automatique de présence","panel.room.area":"🏷️ Zone :","panel.room.name":"🏠 Nom de la pièce :","panel.room.icon_presence":"🎭 Icône et présence","panel.room.icon":"Icône :","panel.room.filter_categories":"Catégories de filtre :","panel.room.presence_id":"Présence (ID) :","panel.room.tap_action":"Action tap","panel.room.hold_action":"Action hold","panel.room.path":"Chemin","panel.room.service":"Service","panel.room.service_with_example":"Service (ex. light.turn_on)","panel.room.service_data":"Données du service (JSON)","panel.room.layout":"📐 Mise en page :","panel.room.layout_tall":"Haute","panel.room.layout_wide":"Large","panel.room.reset":"🧹 Réinitialiser la pièce","panel.camera.title":"📷 Caméra","panel.camera.auto_discover":"🪄 Découverte automatique","panel.camera.entity":"Caméra (ID) :","panel.camera.icon":"Icône de caméra :","panel.camera.presence":"Entité de présence/mouvement :","panel.camera.reset":"🧹 Réinitialiser la caméra","panel.climate.title":"🌡️ Climat","panel.climate.auto_discover":"🪄 Découverte automatique","panel.climate.entity":"Climat (ID) :","panel.climate.icon":"Icône de climat :","panel.climate.reset":"🧹 Réinitialiser le climat","panel.sensor.title":"🧭 Capteurs","panel.sensor.auto_discover":"🪄 Découverte automatique des capteurs","panel.sensor.show_icons":"Afficher les icônes des capteurs","panel.sensor.sensor_item":"Capteur {index}","panel.sensor.filter_category":"Catégorie de filtre :","panel.sensor.clear_filter":"Effacer la catégorie de filtre","panel.sensor.clear":"Effacer","panel.sensor.entity":"Entité :","panel.sensor.reset":"🧹 Réinitialiser les capteurs","panel.mushroom.title":"🍄 Entités mushroom","panel.mushroom.auto_discover":"🪄 Découverte automatique mushroom","panel.mushroom.item":"Mushroom {index}","panel.mushroom.filter_category":"Catégorie de filtre :","panel.mushroom.clear_filter":"Effacer la catégorie de filtre","panel.mushroom.clear":"Effacer","panel.mushroom.entity":"Entité :","panel.mushroom.icon":"Icône :","panel.mushroom.tap_action":"Action tap :","panel.mushroom.hold_action":"Action hold :","panel.mushroom.path":"Chemin","panel.mushroom.service_with_example":"Service (ex. light.turn_on)","panel.mushroom.service_data":"Données du service (JSON)","panel.mushroom.reset":"🧹 Réinitialiser les mushroom","panel.subbutton.title":"🎛️ Sous-boutons","panel.subbutton.auto_discover":"🪄 Découverte automatique subbuttons","panel.subbutton.item":"Sous-bouton {index}","panel.subbutton.filter_category":"Catégorie de filtre :","panel.subbutton.clear_filter":"Effacer la catégorie de filtre","panel.subbutton.clear":"Effacer","panel.subbutton.entity":"Entité :","panel.subbutton.icon":"Icône :","panel.subbutton.tap_action":"Action tap :","panel.subbutton.hold_action":"Action hold :","panel.subbutton.path":"Chemin","panel.subbutton.service":"Service","panel.subbutton.service_data":"Données du service (JSON)","panel.subbutton.reset":"🧹 Réinitialiser les sous-boutons","panel.colors.title":"🎨 Couleurs et préréglages","panel.colors.room_section":"🏠 Pièce","panel.colors.room_icon_section":"💡 Icône principale","panel.colors.room_name_section":"🏷️ Nom de la pièce","panel.colors.subbutton_section":"🎛️ Sub-button","panel.colors.mushroom_section":"🍄 Mushroom","panel.colors.sensor_section":"📊 Capteurs","panel.colors.reset":"🧹 Réinitialiser","panel.colors.apply_preset":"✨ Appliquer le préréglage","panel.colors.on":"On","panel.colors.off":"Off","panel.colors.subbutton_style":"Style de subbutton","panel.colors.style.standard":"Standard (v5.0.6)","panel.colors.style.standard_desc":"Style classique avec des pilules solides et contrastées.","panel.colors.style.soft_glass":"Soft Glass","panel.colors.style.soft_glass_desc":"Verre plus leger, avec flou et ombres reduits.","panel.colors.style.minimal":"Minimal","panel.colors.style.minimal_desc":"Style leger sans flou, lueur ou ombres lourdes.","panel.colors.style.liquid_glass":"Verre liquide","panel.colors.style.liquid_glass_desc":"Effet verre liquide avec des transparences douces.","panel.colors.room.background_active":"Fond icône (actif)","panel.colors.room.background_inactive":"Fond icône (inactif)","panel.colors.room.icon_active":"Icône principale (active)","panel.colors.room.icon_inactive":"Icône principale (inactive)","panel.colors.room.text_active":"Nom pièce (actif)","panel.colors.room.text_inactive":"Nom pièce (inactif)","panel.colors.subbutton.background_on":"Fond (actif)","panel.colors.subbutton.background_off":"Fond (inactif)","panel.colors.subbutton.icon_on":"Icône (active)","panel.colors.subbutton.icon_off":"Icône (inactive)","panel.colors.mushroom.active":"Couleur icône (actif)","panel.colors.mushroom.inactive":"Couleur icône (inactif)","panel.colors.sensor.sensor_active":"Couleur (actif)","panel.colors.sensor.sensor_inactive":"Couleur (inactif)","panel.colors.card_bg_section":"🃏 Fond de carte","panel.colors.card_bg.enabled":"Activer le fond de carte","panel.colors.card_bg.color":"Couleur de fond","panel.colors.card_bg.hint":"Vide = automatique depuis la couleur de la pièce.","actions.toggle":"toggle","actions.more-info":"more-info","actions.navigate":"navigate","actions.url":"url","actions.call-service":"call-service","actions.none":"none","presets.green":"Vert","presets.blue":"Bleu","presets.amber":"Ambre","presets.purple":"Violet","presets.red":"Rouge","presets.yellow":"Jaune","presets.teal":"Sarcelle","presets.gray":"Gris"},de:{"panel.room.title":"🛋️ Raumeinstellungen","panel.room.auto_discover_presence":"🪄 Präsenz automatisch erkennen","panel.room.area":"🏷️ Bereich:","panel.room.name":"🏠 Raumname:","panel.room.icon_presence":"🎭 Symbol und Präsenz","panel.room.icon":"Symbol:","panel.room.filter_categories":"Filterkategorien:","panel.room.presence_id":"Präsenz (ID):","panel.room.tap_action":"Tap-Aktion","panel.room.hold_action":"Hold-Aktion","panel.room.path":"Pfad","panel.room.service":"Dienst","panel.room.service_with_example":"Dienst (z. B. light.turn_on)","panel.room.service_data":"Dienst-Daten (JSON)","panel.room.layout":"📐 Layout:","panel.room.layout_tall":"Hoch","panel.room.layout_wide":"Breit","panel.room.reset":"🧹 Raum zurücksetzen","panel.camera.title":"📷 Kamera","panel.camera.auto_discover":"🪄 Automatische Erkennung","panel.camera.entity":"Kamera (ID):","panel.camera.icon":"Kamera-Symbol:","panel.camera.presence":"Präsenz-/Bewegungs-Entität:","panel.camera.reset":"🧹 Kamera zurücksetzen","panel.climate.title":"🌡️ Klima","panel.climate.auto_discover":"🪄 Automatische Erkennung","panel.climate.entity":"Klima (ID):","panel.climate.icon":"Klima-Symbol:","panel.climate.reset":"🧹 Klima zurücksetzen","panel.sensor.title":"🧭 Sensoren","panel.sensor.auto_discover":"🪄 Automatische Sensorerkennung","panel.sensor.show_icons":"Sensorsymbole anzeigen","panel.sensor.sensor_item":"Sensor {index}","panel.sensor.filter_category":"Filterkategorie:","panel.sensor.clear_filter":"Filterkategorie löschen","panel.sensor.clear":"Löschen","panel.sensor.entity":"Entität:","panel.sensor.reset":"🧹 Sensoren zurücksetzen","panel.mushroom.title":"🍄 Mushroom-Entitäten","panel.mushroom.auto_discover":"🪄 Automatische Mushroom-Erkennung","panel.mushroom.item":"Mushroom {index}","panel.mushroom.filter_category":"Filterkategorie:","panel.mushroom.clear_filter":"Filterkategorie löschen","panel.mushroom.clear":"Löschen","panel.mushroom.entity":"Entität:","panel.mushroom.icon":"Symbol:","panel.mushroom.tap_action":"Tap-Aktion:","panel.mushroom.hold_action":"Hold-Aktion:","panel.mushroom.path":"Pfad","panel.mushroom.service_with_example":"Dienst (z. B. light.turn_on)","panel.mushroom.service_data":"Dienst-Daten (JSON)","panel.mushroom.reset":"🧹 Mushroom zurücksetzen","panel.subbutton.title":"🎛️ Sub-Buttons","panel.subbutton.auto_discover":"🪄 Automatische Subbutton-Erkennung","panel.subbutton.item":"Sub-Button {index}","panel.subbutton.filter_category":"Filterkategorie:","panel.subbutton.clear_filter":"Filterkategorie löschen","panel.subbutton.clear":"Löschen","panel.subbutton.entity":"Entität:","panel.subbutton.icon":"Symbol:","panel.subbutton.tap_action":"Tap-Aktion:","panel.subbutton.hold_action":"Hold-Aktion:","panel.subbutton.path":"Pfad","panel.subbutton.service":"Dienst","panel.subbutton.service_data":"Dienst-Daten (JSON)","panel.subbutton.reset":"🧹 Sub-Buttons zurücksetzen","panel.colors.title":"🎨 Farben und Presets","panel.colors.room_section":"🏠 Raum","panel.colors.room_icon_section":"💡 Hauptsymbol","panel.colors.room_name_section":"🏷️ Raumname","panel.colors.subbutton_section":"🎛️ Sub-button","panel.colors.mushroom_section":"🍄 Mushroom","panel.colors.sensor_section":"📊 Sensoren","panel.colors.reset":"🧹 Zurücksetzen","panel.colors.apply_preset":"✨ Preset anwenden","panel.colors.on":"On","panel.colors.off":"Off","panel.colors.subbutton_style":"Subbutton-Stil","panel.colors.style.standard":"Standard (v5.0.6)","panel.colors.style.standard_desc":"Klassisches Aussehen mit soliden, kontrastreichen Pills.","panel.colors.style.soft_glass":"Soft Glass","panel.colors.style.soft_glass_desc":"Leichterer Glas-Look mit weniger Blur und weicheren Schatten.","panel.colors.style.minimal":"Minimal","panel.colors.style.minimal_desc":"Leichter Stil ohne Blur, Glow oder schwere Schatten.","panel.colors.style.liquid_glass":"Flüssigglas","panel.colors.style.liquid_glass_desc":"Flüssigglas-Effekt mit weichen Transparenzen.","panel.colors.room.background_active":"Symbol-Hintergrund (aktiv)","panel.colors.room.background_inactive":"Symbol-Hintergrund (inaktiv)","panel.colors.room.icon_active":"Hauptsymbol (aktiv)","panel.colors.room.icon_inactive":"Hauptsymbol (inaktiv)","panel.colors.room.text_active":"Raumname (aktiv)","panel.colors.room.text_inactive":"Raumname (inaktiv)","panel.colors.subbutton.background_on":"Hintergrund (aktiv)","panel.colors.subbutton.background_off":"Hintergrund (inaktiv)","panel.colors.subbutton.icon_on":"Symbol (aktiv)","panel.colors.subbutton.icon_off":"Symbol (inaktiv)","panel.colors.mushroom.active":"Symbolfarbe (aktiv)","panel.colors.mushroom.inactive":"Symbolfarbe (inaktiv)","panel.colors.sensor.sensor_active":"Farbe (aktiv)","panel.colors.sensor.sensor_inactive":"Farbe (inaktiv)","panel.colors.card_bg_section":"🃏 Karten-Hintergrund","panel.colors.card_bg.enabled":"Karten-Hintergrund aktivieren","panel.colors.card_bg.color":"Hintergrundfarbe","panel.colors.card_bg.hint":"Leer = automatisch von der Raumfarbe.","actions.toggle":"toggle","actions.more-info":"more-info","actions.navigate":"navigate","actions.url":"url","actions.call-service":"call-service","actions.none":"none","presets.green":"Grün","presets.blue":"Blau","presets.amber":"Bernstein","presets.purple":"Lila","presets.red":"Rot","presets.yellow":"Gelb","presets.teal":"Türkis","presets.gray":"Grau"},pt:{"panel.room.title":"🛋️ Configurações do cômodo","panel.room.auto_discover_presence":"🪄 Autodescoberta de presença","panel.room.area":"🏷️ Área:","panel.room.name":"🏠 Nome do cômodo:","panel.room.icon_presence":"🎭 Ícone e presença","panel.room.icon":"Ícone:","panel.room.filter_categories":"Categorias de filtro:","panel.room.presence_id":"Presença (ID):","panel.room.tap_action":"Ação tap","panel.room.hold_action":"Ação hold","panel.room.path":"Caminho","panel.room.service":"Serviço","panel.room.service_with_example":"Serviço (ex. light.turn_on)","panel.room.service_data":"Dados do serviço (JSON)","panel.room.layout":"📐 Layout:","panel.room.layout_tall":"Alto","panel.room.layout_wide":"Largo","panel.room.reset":"🧹 Redefinir cômodo","panel.camera.title":"📷 Câmera","panel.camera.auto_discover":"🪄 Autodescoberta","panel.camera.entity":"Câmera (ID):","panel.camera.icon":"Ícone da câmera:","panel.camera.presence":"Entidade de presença/movimento:","panel.camera.reset":"🧹 Redefinir câmera","panel.climate.title":"🌡️ Clima","panel.climate.auto_discover":"🪄 Autodescoberta","panel.climate.entity":"Clima (ID):","panel.climate.icon":"Ícone do clima:","panel.climate.reset":"🧹 Redefinir clima","panel.sensor.title":"🧭 Sensores","panel.sensor.auto_discover":"🪄 Autodescoberta de sensores","panel.sensor.show_icons":"Mostrar ícones dos sensores","panel.sensor.sensor_item":"Sensor {index}","panel.sensor.filter_category":"Categoria de filtro:","panel.sensor.clear_filter":"Limpar categoria de filtro","panel.sensor.clear":"Limpar","panel.sensor.entity":"Entidade:","panel.sensor.reset":"🧹 Redefinir sensores","panel.mushroom.title":"🍄 Entidades mushroom","panel.mushroom.auto_discover":"🪄 Autodescoberta mushroom","panel.mushroom.item":"Mushroom {index}","panel.mushroom.filter_category":"Categoria de filtro:","panel.mushroom.clear_filter":"Limpar categoria de filtro","panel.mushroom.clear":"Limpar","panel.mushroom.entity":"Entidade:","panel.mushroom.icon":"Ícone:","panel.mushroom.tap_action":"Ação tap:","panel.mushroom.hold_action":"Ação hold:","panel.mushroom.path":"Caminho","panel.mushroom.service_with_example":"Serviço (ex. light.turn_on)","panel.mushroom.service_data":"Dados do serviço (JSON)","panel.mushroom.reset":"🧹 Redefinir mushroom","panel.subbutton.title":"🎛️ Sub-botões","panel.subbutton.auto_discover":"🪄 Autodescoberta subbuttons","panel.subbutton.item":"Sub-botão {index}","panel.subbutton.filter_category":"Categoria de filtro:","panel.subbutton.clear_filter":"Limpar categoria de filtro","panel.subbutton.clear":"Limpar","panel.subbutton.entity":"Entidade:","panel.subbutton.icon":"Ícone:","panel.subbutton.tap_action":"Ação tap:","panel.subbutton.hold_action":"Ação hold:","panel.subbutton.path":"Caminho","panel.subbutton.service":"Serviço","panel.subbutton.service_data":"Dados do serviço (JSON)","panel.subbutton.reset":"🧹 Redefinir sub-botões","panel.colors.title":"🎨 Cores e presets","panel.colors.room_section":"🏠 Cômodo","panel.colors.room_icon_section":"💡 Ícone principal","panel.colors.room_name_section":"🏷️ Nome do cômodo","panel.colors.subbutton_section":"🎛️ Sub-button","panel.colors.mushroom_section":"🍄 Mushroom","panel.colors.sensor_section":"📊 Sensores","panel.colors.reset":"🧹 Redefinir","panel.colors.apply_preset":"✨ Aplicar preset","panel.colors.on":"On","panel.colors.off":"Off","panel.colors.subbutton_style":"Estilo de subbutton","panel.colors.style.standard":"Padrão (v5.0.6)","panel.colors.style.standard_desc":"Visual clássico com pílulas sólidas e contrastantes.","panel.colors.style.soft_glass":"Soft Glass","panel.colors.style.soft_glass_desc":"Vidro mais leve, com blur e sombras reduzidos.","panel.colors.style.minimal":"Minimal","panel.colors.style.minimal_desc":"Estilo leve sem blur, brilho ou sombras pesadas.","panel.colors.style.liquid_glass":"Vidro líquido","panel.colors.style.liquid_glass_desc":"Efeito de vidro líquido com transparências suaves.","panel.colors.room.background_active":"Fundo do ícone (ativo)","panel.colors.room.background_inactive":"Fundo do ícone (inativo)","panel.colors.room.icon_active":"Ícone principal (ativo)","panel.colors.room.icon_inactive":"Ícone principal (inativo)","panel.colors.room.text_active":"Nome do cômodo (ativo)","panel.colors.room.text_inactive":"Nome do cômodo (inativo)","panel.colors.subbutton.background_on":"Fundo (ativo)","panel.colors.subbutton.background_off":"Fundo (inativo)","panel.colors.subbutton.icon_on":"Ícone (ativo)","panel.colors.subbutton.icon_off":"Ícone (inativo)","panel.colors.mushroom.active":"Cor do ícone (ativo)","panel.colors.mushroom.inactive":"Cor do ícone (inativo)","panel.colors.sensor.sensor_active":"Cor (ativo)","panel.colors.sensor.sensor_inactive":"Cor (inativo)","panel.colors.card_bg_section":"🃏 Fundo do cartão","panel.colors.card_bg.enabled":"Ativar fundo do cartão","panel.colors.card_bg.color":"Cor do fundo","panel.colors.card_bg.hint":"Vazio = automático da cor do cômodo.","actions.toggle":"toggle","actions.more-info":"more-info","actions.navigate":"navigate","actions.url":"url","actions.call-service":"call-service","actions.none":"none","presets.green":"Verde","presets.blue":"Azul","presets.amber":"Âmbar","presets.purple":"Roxo","presets.red":"Vermelho","presets.yellow":"Amarelo","presets.teal":"Teal","presets.gray":"Cinza"}};function Ae(e,t,o={},i){const s=(e?.language||e?.selectedLanguage||"en").toLowerCase().split("-")[0];return((Ce[s]||Ce.en)[t]??Ce.en[t]??i??t).replace(/\{(\w+)\}/g,(e,t)=>{const i=o[t];return null==i?`{${t}}`:String(i)})}const Ee=["presence","motion","occupancy","light","switch","fan"];class ze extends ie{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},activeFilters:{type:Array,state:!0},layout:{type:String}};static styles=[Se,n`
    :host {
      --bubble-glass-bg: rgba(73,164,255,0.38);
      --bubble-glass-shadow: 0 2px 24px rgba(50,180,255,0.25);
      --bubble-glass-sheen: linear-gradient(120deg, rgba(255,255,255,0.26), rgba(255,255,255,0.11) 70%, transparent 100%);
      --bubble-accent-color: #55afff;
      --bubble-autodiscover-label-color: #55afff;
    }

    .input-group input[type="text"],
    input[type="text"] {
      width: 100%;
      box-sizing: border-box;
      min-height: 40px;
    }

    /* pill actions come Mushroom/SubButton */
    .pill-group {
      display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px;
    }
    .pill-button {
      padding: 6px 10px; border-radius: 999px; border: 1px solid #555;
      cursor: pointer; background: transparent; font-weight: 600;
      transition: background .18s, border-color .18s, color .18s;
    }
    .pill-button.active { border-color: #55afff; color: #55afff; }
    .pill-button:hover:not(.active) { background: rgba(85,175,255,0.12); }

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
    .toggle-btn:hover { background: rgba(255,255,255,0.18); }

  `];constructor(){super(),this.hass={},this.config={},this.expanded=!1,this.activeFilters=[],this.layout="wide",this._syncingFromConfig=!1}updated(e){if(!e.has("config")&&!e.has("hass"))return;if(this._syncingFromConfig=!0,ke.warm(this.hass),e.has("config")){Array.isArray(this.config?.presence_filters)&&(this.activeFilters=[...this.config.presence_filters]);const e=this.config?.layout;e&&e!==this.layout&&(this.layout=e)}this._syncingFromConfig=!1;const t=this.config?.entities?.presence?.entity,o=this.config?.icon||"";if(t&&!o){const e=this.hass?.states?.[t],o=e?.attributes?.icon||$e(t,this.hass);o&&this._fire("icon",o)}}_onLayoutClick(e){this.layout=e,this._fire("layout",e);const t="tall"===e?{columns:6,rows:4}:{columns:12,rows:4};this._fire("grid_options",t)}_fire(e,t){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}_onPresenceEntityChange=e=>{const t=e||"";this._fire("entities.presence.entity",t);const o=this.config?.icon||"";if(t&&!o){const e=this.hass?.states?.[t],o=e?.attributes?.icon||$e(t,this.hass);o&&this._fire("icon",o)}};_onAreaChange(e){const t=e||"",o=this.config||{},i={...o.auto_discovery_sections||{}};t&&!o.area&&(i.camera=!0,i.climate=!0,i.sensor=!0,i.mushroom=!0,i.subbutton=!0,i.presence=!0);const s={...o,area:t,area_id:t,auto_discovery_sections:i};t&&(s.name=t.toUpperCase()),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}_presenceCandidatesNoArea(e,t=[],o){if(!e?.states)return[];const i=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let s=Object.keys(e.states).filter(e=>i.has(e.split(".")[0]));const n=new Set(t||[]);return n.size&&(s=s.filter(t=>{const[o]=t.split(".");if("binary_sensor"!==o)return!0;const i=e.states[t]?.attributes?.device_class||"";return n.has("motion")&&"motion"===i||n.has("occupancy")&&"occupancy"===i||n.has("presence")&&"presence"===i})),o&&!s.includes(o)&&s.unshift(o),s}render(){const e=this.config,t=(e,t,o)=>Ae(this.hass,e,t,o),o=e.auto_discovery_sections?.presence??!1,i=e.area??"",s=e.name??"",n=e.icon??"",a=e.entities?.presence?.entity??"",r=this.activeFilters.length?this.activeFilters:e.presence_filters??[...Ee],l=Ee.map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1)})),c=o?ge(this.hass,this.config,"presence",r):this._presenceCandidatesNoArea(this.hass,r,a),u=["toggle","more-info","navigate","url","call-service","none"],d={toggle:t("actions.toggle"),"more-info":t("actions.more-info"),navigate:t("actions.navigate"),url:t("actions.url"),"call-service":t("actions.call-service"),none:t("actions.none")},h=this.config?.tap_action||{},p=this.config?.hold_action||{};return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>this.expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">${t("panel.room.title")}</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${o}
            @change=${e=>this._fire("auto_discovery_sections.presence",e.target.checked)}
          />
          <label>${t("panel.room.auto_discover_presence")}</label>
        </div>

        <div class="input-group">
          <label>${t("panel.room.area")}</label>
          <ha-area-picker
            .hass=${this.hass}
            .value=${i}
            @value-changed=${e=>this._onAreaChange(e.detail.value)}
          ></ha-area-picker>
        </div>

        <div class="input-group">
          <label>${t("panel.room.name")}</label>
          <input
            type="text"
            .value=${s}
            @input=${e=>this._fire("name",e.target.value)}
          />
        </div>

        <!-- 🎭 Icon & Presence -->
        <div class="mini-pill">
          <div class="mini-pill-header">${t("panel.room.icon_presence")}</div>
          <div class="mini-pill-content">
            <!-- Room Icon -->
            <div class="input-group">
              <label>${t("panel.room.icon")}</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${n}
                allow-custom-icon
                @opened=${()=>ke.warm(this.hass)}
                @value-changed=${e=>this._fire("icon",e.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Filter categories -->
            <div class="input-group">
              <label>${t("panel.room.filter_categories")}</label>
              <ha-selector
                .hass=${this.hass}
                .value=${r}
                .selector=${{select:{multiple:!0,mode:"box",options:l}}}
                @value-changed=${e=>this._fire("presence_filters",e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Presence entity -->
            <div class="input-group">
              <label>${t("panel.room.presence_id")}</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${a}
                .includeEntities=${c}
                allow-custom-entity
                @value-changed=${e=>this._onPresenceEntityChange(e.detail.value)}
              ></ha-entity-picker>
            </div>

            <!-- Actions -->
            <div class="input-group">
              <label>${t("panel.room.tap_action")}</label>
              <div class="pill-group">
                ${u.map(e=>N`
                  <button
                    class="pill-button ${h.action===e?"active":""}"
                    @click=${()=>this._fire("tap_action.action",e)}
                  >${d[e]}</button>
                `)}
              </div>
              ${"navigate"===h.action?N`
                <input type="text" placeholder=${t("panel.room.path")}
                  .value=${h.navigation_path||""}
                  @input=${e=>this._fire("tap_action.navigation_path",e.target.value)}
                />
              `:""}
              ${"url"===h.action?N`
                <input type="text" placeholder=${t("panel.room.path")}
                  .value=${h.url_path||""}
                  @input=${e=>this._fire("tap_action.url_path",e.target.value)}
                />
              `:""}
              ${"call-service"===h.action?N`
                <input type="text" placeholder=${t("panel.room.service")}
                  .value=${h.service||""}
                  @input=${e=>this._fire("tap_action.service",e.target.value)}
                />
                <input type="text" placeholder=${t("panel.room.service_data")}
                  .value=${h.service_data?JSON.stringify(h.service_data):""}
                  @input=${e=>{let t=e.target.value;try{t=t?JSON.parse(t):void 0}catch{t=void 0}this._fire("tap_action.service_data",t)}}
                />
              `:""}
            </div>

            <div class="input-group">
              <label>${t("panel.room.hold_action")}</label>
              <div class="pill-group">
                ${u.map(e=>N`
                  <button
                    class="pill-button ${p.action===e?"active":""}"
                    @click=${()=>this._fire("hold_action.action",e)}
                  >${d[e]}</button>
                `)}
              </div>
              ${"navigate"===p.action?N`
                <input type="text" placeholder=${t("panel.room.path")}
                  .value=${p.navigation_path||""}
                  @input=${e=>this._fire("hold_action.navigation_path",e.target.value)}
                />
              `:""}
              ${"url"===p.action?N`
                <input type="text" placeholder=${t("panel.room.path")}
                  .value=${p.url_path||""}
                  @input=${e=>this._fire("hold_action.url_path",e.target.value)}
                />
              `:""}
              ${"call-service"===p.action?N`
                <input type="text" placeholder=${t("panel.room.service_with_example")}
                  .value=${p.service||""}
                  @input=${e=>this._fire("hold_action.service",e.target.value)}
                />
                <input type="text" placeholder=${t("panel.room.service_data")}
                  .value=${p.service_data?JSON.stringify(p.service_data):""}
                  @input=${e=>{let t=e.target.value;try{t=t?JSON.parse(t):void 0}catch{t=void 0}this._fire("hold_action.service_data",t)}}
                />
              `:""}
            </div>
          </div>
        </div>

        <!-- 📐 Layout -->
        <div class="input-group">
          <label>${t("panel.room.layout")}</label>
          <div class="toggle-group">

            <button
              class="toggle-btn ${"tall"===this.layout?"active":""}"
              @click=${()=>this._onLayoutClick("tall")}
            >
              <ha-icon icon="mdi:cellphone"></ha-icon>
              <span>${t("panel.room.layout_tall")}</span>
            </button>
            <button
              class="toggle-btn ${"wide"===this.layout?"active":""}"
              @click=${()=>this._onLayoutClick("wide")}
            >
              <ha-icon icon="mdi:tablet"></ha-icon>
              <span>${t("panel.room.layout_wide")}</span>
            </button>
          </div>
        </div>

        <button class="reset-button"
          @click=${()=>this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"room"},bubbles:!0,composed:!0}))}>
          ${t("panel.room.reset")}
        </button>
      </ha-expansion-panel>
    `}}customElements.get("room-panel")||customElements.define("room-panel",ze);const Me={temperature:{label:"Temperature",emoji:"🌡️",units:["°C","°F"]},apparent_temperature:{label:"Feels Like",emoji:"🥵",units:["°C","°F"]},humidity:{label:"Humidity",emoji:"💧",units:["%"]},pressure:{label:"Pressure",emoji:"🧭",units:["hPa","mbar","kPa"]},illuminance:{label:"Illuminance",emoji:"🔆",units:["lx"]},sound_pressure:{label:"Sound Pressure",emoji:"🔊",units:["dB"]},pm1:{label:"PM1",emoji:"🌫️",units:["µg/m³"]},pm2_5:{label:"PM2.5",emoji:"🌫️",units:["µg/m³"]},pm10:{label:"PM10",emoji:"🌫️",units:["µg/m³"]},co2:{label:"CO₂",emoji:"🫁",units:["ppm"]},uv_index:{label:"UV Index",emoji:"☀️",units:["UV index"]},irradiance:{label:"Irradiance",emoji:"🌞",units:["W/m²"]},wind_speed:{label:"Wind Speed",emoji:"🌀",units:["km/h","m/s","mph","kn"],formatter:(e,t)=>{const o=Number(e);return isNaN(o)?{value:e,unit:t}:"m/s"===t?{value:(3.6*o).toFixed(0),unit:"km/h"}:"mph"===t?{value:(1.60934*o).toFixed(0),unit:"km/h"}:"kn"===t?{value:(1.852*o).toFixed(0),unit:"km/h"}:{value:o.toFixed(0),unit:t||"km/h"}}},speed:{label:"Speed",emoji:"🌀",units:["km/h","m/s","mph","kn"]},wind_gust:{label:"Wind Gust",emoji:"🌬️",units:["km/h","m/s","mph","kn"]},wind_bearing:{label:"Wind Direction",emoji:"🧭",units:["°","cardinal"]},precipitation:{label:"Precipitation",emoji:"🌧️",units:["mm","cm","in"]},precipitation_intensity:{label:"Precipitation Intensity",emoji:"🌦️",units:["mm/h","in/h"]},precipitation_probability:{label:"Rain Probability",emoji:"☔",units:["%"]},cloud_coverage:{label:"Cloud Coverage",emoji:"☁️",units:["%"]},visibility:{label:"Visibility",emoji:"👁️",units:["km","m","mi"]},dew_point:{label:"Dew Point",emoji:"💧",units:["°C","°F"]},power:{label:"Power",emoji:"⚡",units:["kW","W","MW"],formatter:(e,t)=>{const o=Number(e);return isNaN(o)?{value:e,unit:t}:"W"===t?{value:(o/1e3).toFixed(o>=100?0:1),unit:"kW"}:"MW"===t?{value:(1e3*o).toFixed(0),unit:"kW"}:{value:o,unit:t||"kW"}}},energy:{label:"Energy",emoji:"🔌",units:["kWh","Wh","MWh"],formatter:(e,t)=>{const o=Number(e);return isNaN(o)?{value:e,unit:t}:"Wh"===t?{value:(o/1e3).toFixed(o>=1e3?0:1),unit:"kWh"}:"MWh"===t?{value:(1e3*o).toFixed(0),unit:"kWh"}:{value:o,unit:t||"kWh"}}},power_factor:{label:"Power Factor",emoji:"📐",units:["%","ratio"]},voltage:{label:"Voltage",emoji:"⚙️",units:["V"]},current:{label:"Current",emoji:"🧲",units:["A","mA"]},frequency:{label:"Frequency",emoji:"〰️",units:["Hz"]},apparent_power:{label:"Apparent Power",emoji:"🧮",units:["VA","kVA"]},reactive_power:{label:"Reactive Power",emoji:"🧮",units:["var","kvar"]},monetary:{label:"Cost",emoji:"💶",units:["€","EUR","$"]},gas:{label:"Gas",emoji:"🔥",units:["m³","Nm³","kWh"]},water:{label:"Water",emoji:"🚿",units:["m³","L"]},battery:{label:"Battery",emoji:"🔋",units:["%"]},signal_strength:{label:"Signal Strength",emoji:"📶",units:["dBm"]},_fallback:{label:"Other",emoji:"❓",units:[""]}};class Pe extends ie{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(5).fill(!1);const e=Object.keys(Me);this._filters=Array(5).fill().map(()=>[...e]),this._entities=Array(5).fill(""),this._ignoreNextFilterChange=new Set}updated(e){if(e.has("config")||e.has("hass")){this._entities=Array(5).fill("");for(let e=0;e<5;e++){const t=`sensor${e+1}`,o=this.config?.sensor_filters?.[e],i=this.config?.entities?.[t]?.entity;Array.isArray(o)&&(this._filters[e]=[...o]),this._entities[e]=i||""}}}static styles=[Se,n`
      :host {
        --bubble-glass-bg: var(--glass-bg, rgba(167,255,175,0.22));
        --bubble-glass-shadow: var(--glass-shadow, 0 2px 24px rgba(167,255,175,0.13));
        --bubble-glass-sheen: var(--glass-sheen,
          linear-gradient(120deg, rgba(255,255,255,0.11),
          rgba(255,255,255,0.07) 70%, transparent 100%));
        --bubble-accent-color: #8cff8a;
      }

      .preview {
        display: flex;
        align-items: center;
        gap: 12px;
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
    `];render(){const e=this.config?.auto_discovery_sections?.sensor??!1,t=this.config?.sensor_options?.show_icons??!1,o=(e,t,o)=>Ae(this.hass,e,t,o),i=Object.entries(Me).filter(([e])=>"_fallback"!==e).map(([e,t])=>{const o=t.label||e.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase());return{value:e,label:`${t.emoji||""} ${o}`.trim()}});return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expanded=Array(5).fill(!1))}}
      >
        <div slot="header" class="glass-header">${o("panel.sensor.title")}</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
          />
          <label>${o("panel.sensor.auto_discover")}</label>
        </div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${t}
            @change=${e=>this._toggleIcons(e.target.checked)}
          />
          <label>${o("panel.sensor.show_icons")}</label>
        </div>

        ${this._expanded.map((e,t)=>this._renderSensor(t,e,i))}

        <button class="reset-button" @click=${()=>this._reset()}>
          ${o("panel.sensor.reset")}
        </button>
      </ha-expansion-panel>
    `}_renderSensor(e,t,o){const i=(e,t,o)=>Ae(this.hass,e,t,o),s=this._filters[e],n=this._entities[e];let a;if(this.config?.auto_discovery_sections?.sensor??!1)a=ge(this.hass,this.config,"sensor",s)||[];else{const e=this.hass?.states||{},t=Object.keys(e),o=Array.isArray(s)&&s.length>0,i=o?new Set(s):null;a=t.filter(t=>{const s=t.split(".")[0];if("sensor"!==s&&"binary_sensor"!==s)return!1;if(!o)return!0;const n=e[t]?.attributes?.device_class;return!!n&&i.has(n)})}return n&&!a.includes(n)&&(a=[n,...a]),N`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          ${i("panel.sensor.sensor_item",{index:e+1})}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>
        ${t?N`
          <div class="mini-pill-content">
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${e}">${i("panel.sensor.filter_category")}</label>
                <button
                  class="clear-chip"
                  type="button"
                  @click=${()=>this._clearFilter(e)}
                  title=${i("panel.sensor.clear_filter")}>
                  ${i("panel.sensor.clear")}
                </button>
              </div>
              <ha-selector
                id="filter-${e}"
                .hass=${this.hass}
                .value=${s}
                .selector=${{select:{multiple:!0,mode:"box",options:o}}}
                @value-changed=${t=>this._onFilter(e,t.detail.value)}
              ></ha-selector>
            </div>

            <div class="input-group">
              <label>${i("panel.sensor.entity")}</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${n}
                .includeEntities=${a}
                allow-custom-entity
                @value-changed=${t=>this._onEntity(e,t.detail.value)}
              ></ha-entity-picker>
            </div>

            ${n?(()=>{const e=this.hass.states[n],t=e?.attributes?.device_class,o=Me[t]||{},i=o.emoji||"❓",s=e?.attributes?.unit_of_measurement||(o.units?.[0]??"");return N`
                <div class="preview">
                  <span class="emoji">${i}</span>
                  <div class="state">${e?.state??"-"} ${s}</div>
                </div>
              `})():""}
          </div>
        `:""}
      </div>
    `}_toggleAuto(e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.sensor",val:e},bubbles:!0,composed:!0}))}_toggleIcons(e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"sensor_options.show_icons",val:e},bubbles:!0,composed:!0}))}_togglePill(e){this._expanded=this._expanded.map((t,o)=>o===e&&!t),this.requestUpdate()}_onFilter(e,t){const o=Object.keys(Me);if(this._ignoreNextFilterChange.has(e))this._ignoreNextFilterChange.delete(e),this._filters[e]=[];else{const i=Array.isArray(t)&&t.length?t.filter(Boolean):o;this._filters[e]=[...i]}this.requestUpdate("_filters");const i=this.renderRoot?.querySelector(`#filter-${e}`);i&&(i.value=[...this._filters[e]])}_clearFilter(e){this._filters[e]=[],this.requestUpdate("_filters");const t=this.renderRoot?.querySelector(`#filter-${e}`);t&&(this._ignoreNextFilterChange.add(e),t.value=[],t.dispatchEvent(new CustomEvent("value-changed",{detail:{value:[]},bubbles:!0,composed:!0})))}_onEntity(e,t){this._entities[e]=t||"",this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${e+1}.entity`,val:this._entities[e]},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(5).fill(!1);const e=Object.keys(Me);this._filters=Array(5).fill().map(()=>[...e]),this._entities=Array(5).fill("");for(let e=1;e<=5;e++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${e}.entity`,val:""},bubbles:!0,composed:!0}))}}customElements.get("sensor-panel")||customElements.define("sensor-panel",Pe);class Fe extends ie{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0},_icons:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._ALL_CATS=Array.from(new Set([...ae,...re])),this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...this._ALL_CATS]),this._entities=Array(5).fill(""),this._icons=Array(5).fill(""),this._syncingFromConfig=!1,this._ignoreNextFilterChange=new Set}updated(e){if(!e.has("config")&&!e.has("hass"))return;this._syncingFromConfig=!0;const t=this.config?.mushroom_filters;Array.isArray(t)&&5===t.length?this._filters=t.map(e=>Array.isArray(e)?[...e]:[...this._ALL_CATS]):this._filters=Array(5).fill().map(()=>[...this._ALL_CATS]);const o=this.config?.entities||{};this._entities=Array(5).fill(""),this._icons=Array(5).fill("");for(let e=0;e<5;e++){const t=o[`mushroom${e+1}`]||{};this._entities[e]=t.entity||"","string"==typeof t.icon&&(this._icons[e]=t.icon)}this._syncingFromConfig=!1;const i=[];for(let e=0;e<5;e++){const t=`mushroom${e+1}`,o=this._entities[e],s=this.config?.entities?.[t]?.icon;if(o&&!s){const s=this.hass?.states?.[o],n=s?.attributes?.icon,a=n||$e(o,this.hass);a&&i.push({i:e,key:t,icon:a})}}if(i.length)for(const{i:e,key:t,icon:o}of i)this._icons[e]=o,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${t}.icon`,val:o},bubbles:!0,composed:!0}))}static styles=[Se,n`
      :host {
        --bubble-glass-bg: var(--glass-bg, rgba(80,235,175,0.28));
        --bubble-glass-shadow: var(--glass-shadow, 0 2px 24px rgba(40,220,145,0.18));
        --bubble-glass-sheen: var(--glass-sheen,
          linear-gradient(120deg, rgba(255,255,255,0.18),
          rgba(255,255,255,0.10) 70%, transparent 100%));
        --bubble-accent-color: #36e6a0;
      }

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
        border-color: #36e6a0;
        color: #36e6a0;
      }
      .pill-button:hover:not(.active) {
        background: rgba(54,230,160,0.1);
      }
      .anim-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 6px;
      }
      .anim-select {
        flex: 1;
        background: rgba(255,255,255,0.07);
        border: 1px solid #555;
        border-radius: 8px;
        color: inherit;
        padding: 6px 8px;
        font-size: 0.9em;
      }
      .anim-toggle {
        display: flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
        font-size: 0.85em;
        cursor: pointer;
      }
    `];render(){const e=this.config?.auto_discovery_sections?.mushroom??!1,t=(e,t,o)=>Ae(this.hass,e,t,o),o=this._ALL_CATS.map(e=>({value:e,label:ne[e]||e.charAt(0).toUpperCase()+e.slice(1)}));return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expanded=Array(5).fill(!1))}}
      >
        <div slot="header" class="glass-header">${t("panel.mushroom.title")}</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
          />
          <label>${t("panel.mushroom.auto_discover")}</label>
        </div>

        ${this._expanded.map((e,t)=>this._renderMushroom(t,e,o))}

        <button class="reset-button" @click=${()=>this._reset()}>
          ${t("panel.mushroom.reset")}
        </button>
      </ha-expansion-panel>
    `}_renderMushroom(e,t,o){const i=(e,t,o)=>Ae(this.hass,e,t,o),s=`mushroom${e+1}`,n=this._filters[e],a=this._entities[e],r=this._icons[e],l=this.config.entities&&this.config.entities[s]?this.config.entities[s]:{};let c;if(this.config?.auto_discovery_sections?.mushroom??!1)c=ge(this.hass,this.config,"mushroom",n)||[];else{const e={...this.config,area:void 0,area_id:void 0};c=ge(this.hass,e,"mushroom",n)||[]}a&&!c.includes(a)&&(c=[a,...c]);const u=["toggle","more-info","navigate","url","call-service","none"],d={toggle:i("actions.toggle"),"more-info":i("actions.more-info"),navigate:i("actions.navigate"),url:i("actions.url"),"call-service":i("actions.call-service"),none:i("actions.none")};return N`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          ${i("panel.mushroom.item",{index:e+1})}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>

        ${t?N`
          <div class="mini-pill-content">
            <!-- Filter categories (layout/UX identici a SensorPanel) -->
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${e}">${i("panel.mushroom.filter_category")}</label>
                <button
                  class="clear-chip"
                  type="button"
                  @click=${()=>this._clearFilter(e)}
                  title=${i("panel.mushroom.clear_filter")}>
                  ${i("panel.mushroom.clear")}
                </button>
              </div>
              <ha-selector
                id="filter-${e}"
                .hass=${this.hass}
                .value=${n}
                .selector=${{select:{multiple:!0,mode:"box",options:o}}}
                @value-changed=${t=>this._onFilter(e,t.detail.value)}
              ></ha-selector>
            </div>

            <!-- Entity -->
            <div class="input-group">
              <label>${i("panel.mushroom.entity")}</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${a}
                .includeEntities=${c}
                allow-custom-entity
                @value-changed=${t=>this._onEntity(e,t.detail.value)}
              ></ha-entity-picker>
            </div>

            <!-- Icon -->
            <div class="input-group">
              <label>${i("panel.mushroom.icon")}</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${r}
                allow-custom-icon
                @value-changed=${t=>this._onIcon(e,t.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Animazione -->
            <div class="input-group">
              <label>Animazione</label>
              <div class="anim-row">
                <select
                  class="anim-select"
                  .value=${l.animation?.type??"auto"}
                  @change=${t=>this._onAnimType(e,t.target.value)}
                >
                  <option value="auto">Auto (icona)</option>
                  <option value="anim-spin">Spin</option>
                  <option value="anim-illuminate">Illuminate</option>
                  <option value="anim-alarm">Alarm</option>
                  <option value="anim-blink">Blink</option>
                  <option value="anim-beat">Beat</option>
                  <option value="anim-scan">Scan</option>
                  <option value="anim-shake">Shake</option>
                  <option value="anim-bounce">Bounce</option>
                  <option value="none">Nessuna</option>
                </select>
                <label class="anim-toggle">
                  <input
                    type="checkbox"
                    .checked=${!1!==l.animation?.enabled}
                    @change=${t=>this._onAnimEnabled(e,t.target.checked)}
                  />
                  Attiva
                </label>
              </div>
            </div>

            <!-- Tap Action -->
            <div class="input-group">
              <label>${i("panel.mushroom.tap_action")}</label>
              <div class="pill-group">
                ${u.map(t=>N`
                  <button
                    class="pill-button ${l.tap_action?.action===t?"active":""}"
                    @click=${()=>this._onAction(e,"tap","action",t)}
                  >${d[t]}</button>
                `)}
              </div>
              ${this._extraFields(e,"tap",l)}
            </div>

            <!-- Hold Action -->
            <div class="input-group">
              <label>${i("panel.mushroom.hold_action")}</label>
              <div class="pill-group">
                ${u.map(t=>N`
                  <button
                    class="pill-button ${l.hold_action?.action===t?"active":""}"
                    @click=${()=>this._onAction(e,"hold","action",t)}
                  >${d[t]}</button>
                `)}
              </div>
              ${this._extraFields(e,"hold",l)}
            </div>
          </div>
        `:""}
      </div>
    `}_extraFields(e,t,o){const i=(e,t,o)=>Ae(this.hass,e,t,o),s=o?.[`${t}_action`]?.action;return"navigate"===s?N`
        <input type="text" placeholder=${i("panel.mushroom.path")}
          .value=${o[`${t}_action`]?.navigation_path||""}
          @input=${o=>this._onAction(e,t,"navigation_path",o.target.value)}
        />
      `:"url"===s?N`
        <input type="text" placeholder=${i("panel.mushroom.path")}
          .value=${o[`${t}_action`]?.url_path||""}
          @input=${o=>this._onAction(e,t,"url_path",o.target.value)}
        />
      `:"call-service"===s?N`
        <input type="text" placeholder=${i("panel.mushroom.service_with_example")}
          .value=${o[`${t}_action`]?.service||""}
          @input=${o=>this._onAction(e,t,"service",o.target.value)}
        />
        <input type="text" placeholder=${i("panel.mushroom.service_data")}
          .value=${o[`${t}_action`]?.service_data?JSON.stringify(o[`${t}_action`].service_data):""}
          @input=${o=>this._onAction(e,t,"service_data",this._safeJson(o.target.value))}
        />
      `:""}_safeJson(e){try{return JSON.parse(e)}catch{return{}}}_toggleAuto(e){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.mushroom",val:e},bubbles:!0,composed:!0}))}_togglePill(e){this._expanded=this._expanded.map((t,o)=>o===e&&!t),this.requestUpdate()}_onFilter(e,t){if(this._ignoreNextFilterChange.has(e))this._ignoreNextFilterChange.delete(e),this._filters[e]=[];else{const o=Array.isArray(t)&&t.length?t.filter(Boolean):[...this._ALL_CATS];this._filters[e]=[...o]}if(this.requestUpdate("_filters"),!this._syncingFromConfig){const e=this._filters.map(e=>[...e]);this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:e},bubbles:!0,composed:!0}))}const o=this.renderRoot?.querySelector(`#filter-${e}`);o&&(o.value=[...this._filters[e]])}_clearFilter(e){this._filters[e]=[],this.requestUpdate("_filters");const t=this.renderRoot?.querySelector(`#filter-${e}`);t&&(this._ignoreNextFilterChange.add(e),t.value=[],t.dispatchEvent(new CustomEvent("value-changed",{detail:{value:[]},bubbles:!0,composed:!0})))}_onEntity(e,t){const o=t||"";if(this._entities[e]=o,!this._syncingFromConfig){if(this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e+1}.entity`,val:o},bubbles:!0,composed:!0})),!o)return this._icons[e]="",void this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e+1}.icon`,val:""},bubbles:!0,composed:!0}));if(!(this.config?.entities?.[`mushroom${e+1}`]?.icon||"")){const t=this.hass?.states?.[o],i=t?.attributes?.icon,s=i||$e(o,this.hass);s&&(this._icons[e]=s,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e+1}.icon`,val:s},bubbles:!0,composed:!0})))}}}_onIcon(e,t){this._icons[e]=t||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e+1}.icon`,val:this._icons[e]},bubbles:!0,composed:!0}))}_onAnimType(e,t){if(this._syncingFromConfig)return;const o=`mushroom${e+1}`,i=this.config?.entities?.[o]?.animation||{};this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${o}.animation`,val:{...i,type:t}},bubbles:!0,composed:!0}))}_onAnimEnabled(e,t){if(this._syncingFromConfig)return;const o=`mushroom${e+1}`,i=this.config?.entities?.[o]?.animation||{};this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${o}.animation`,val:{...i,enabled:t}},bubbles:!0,composed:!0}))}_onAction(e,t,o,i){if(this._syncingFromConfig)return;const s=`mushroom${e+1}`,n={...this.config?.entities?.[s]?.[`${t}_action`]||{},[o]:i};this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${s}.${t}_action`,val:n},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...this._ALL_CATS]),this._entities=Array(5).fill(""),this._icons=Array(5).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}));for(let e=1;e<=5;e++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e}.entity`,val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e}.icon`,val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e}.tap_action`,val:{action:"none"}},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e}.hold_action`,val:{action:"none"}},bubbles:!0,composed:!0}))}_autoIconFor(e){if(!e)return"";const t=this.hass?.states?.[e];return t?.attributes?.icon||$e(e,this.hass)}}customElements.get("mushroom-panel")||customElements.define("mushroom-panel",Fe);class Oe extends ie{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...ae]),this._entities=Array(4).fill(""),this._ignoreNextFilterChange=new Set,this._filtersHydrated=!1,this._syncingFromConfig=!1}updated(e){if(!e.has("config")&&!e.has("hass"))return;this._syncingFromConfig=!0;const t=Array.isArray(this.config?.subbuttons)?this.config.subbuttons:[];this._entities=Array(4).fill("").map((e,o)=>t[o]?.entity_id||"");for(let e=0;e<Math.min(4,t.length);e++){const o=t[e]?.entity_id||"";if(o){const i=t[e]?.icon;if(!i){const t=this.hass?.states?.[o],i=t?.attributes?.icon,s=i||$e(o,this.hass);s&&this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`subbuttons.${e}.icon`,val:s},bubbles:!0,composed:!0}))}}}if(!this._filtersHydrated){const e=this.config?.subbutton_filters;Array.isArray(e)&&4===e.length&&(this._filters=e.map(e=>Array.isArray(e)?[...e]:[...ae])),this._filtersHydrated=!0}this._syncingFromConfig=!1}static styles=[Se,n`
      :host {
        --bubble-glass-bg: var(--glass-bg, rgba(180,120,255,0.34));
        --bubble-glass-shadow: var(--glass-shadow, 0 2px 24px rgba(160,100,255,0.19));
        --bubble-glass-sheen: var(--glass-sheen,
          linear-gradient(120deg, rgba(255,255,255,0.22),
          rgba(255,255,255,0.10) 70%, transparent 100%));
        --bubble-accent-color: #b28fff;
      }

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
      .anim-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 6px;
      }
      .anim-select {
        flex: 1;
        background: rgba(255,255,255,0.07);
        border: 1px solid #555;
        border-radius: 8px;
        color: inherit;
        padding: 6px 8px;
        font-size: 0.9em;
      }
      .anim-toggle {
        display: flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
        font-size: 0.85em;
        cursor: pointer;
      }
    `];render(){const e=this.config?.auto_discovery_sections?.subbutton??!1,t=(e,t,o)=>Ae(this.hass,e,t,o),o=ae.map(e=>({value:e,label:ne[e]||e.charAt(0).toUpperCase()+e.slice(1)}));return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>this.expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">${t("panel.subbutton.title")}</div>

        <div class="input-group autodiscover">
          <input type="checkbox" .checked=${e}
                 @change=${e=>this._toggleAuto(e.target.checked)} />
          <label>${t("panel.subbutton.auto_discover")}</label>
        </div>

        ${this._expanded.map((e,t)=>this._renderSubButton(t,e,o))}

        <button class="reset-button" @click=${()=>this._reset()}>
          ${t("panel.subbutton.reset")}
        </button>
      </ha-expansion-panel>
    `}_renderSubButton(e,t,o){const i=(e,t,o)=>Ae(this.hass,e,t,o),s=this._filters[e],n=this._entities[e];let a;if(this.config?.auto_discovery_sections?.subbutton??!1)a=ge(this.hass,this.config,"subbutton",s)||[];else{const e={...this.config,area:void 0,area_id:void 0};a=ge(this.hass,e,"subbutton",s)||[]}n&&!a.includes(n)&&(a=[n,...a]);const r=Array.isArray(this.config?.subbuttons)&&this.config.subbuttons[e]||{},l=["toggle","more-info","navigate","url","call-service","none"],c={toggle:i("actions.toggle"),"more-info":i("actions.more-info"),navigate:i("actions.navigate"),url:i("actions.url"),"call-service":i("actions.call-service"),none:i("actions.none")};return N`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          ${i("panel.subbutton.item",{index:e+1})}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>
        ${t?N`
          <div class="mini-pill-content">
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${e}">${i("panel.subbutton.filter_category")}</label>
                <button class="clear-chip" type="button"
                        @click=${()=>this._clearFilter(e)}
                        title=${i("panel.subbutton.clear_filter")}>${i("panel.subbutton.clear")}</button>
              </div>
              <ha-selector
                id="filter-${e}"
                .hass=${this.hass}
                .value=${s}
                .selector=${{select:{multiple:!0,mode:"box",options:o}}}
                @value-changed=${t=>this._onFilter(e,t.detail.value)}
              ></ha-selector>
            </div>

            <div class="input-group">
              <label>${i("panel.subbutton.entity")}</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${n}
                .includeEntities=${a}
                allow-custom-entity
                @value-changed=${t=>this._onEntity(e,t.detail.value)}
              ></ha-entity-picker>
            </div>

            <div class="input-group">
              <label>${i("panel.subbutton.icon")}</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${r.icon||""}
                allow-custom-icon
                @value-changed=${t=>this._onIcon(e,t.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Animazione -->
            <div class="input-group">
              <label>Animazione</label>
              <div class="anim-row">
                <select
                  class="anim-select"
                  .value=${r.animation?.type??"auto"}
                  @change=${t=>this._onAnimType(e,t.target.value)}
                >
                  <option value="auto">Auto (icona)</option>
                  <option value="anim-spin">Spin</option>
                  <option value="anim-illuminate">Illuminate</option>
                  <option value="anim-alarm">Alarm</option>
                  <option value="anim-blink">Blink</option>
                  <option value="anim-beat">Beat</option>
                  <option value="anim-scan">Scan</option>
                  <option value="anim-shake">Shake</option>
                  <option value="anim-bounce">Bounce</option>
                  <option value="none">Nessuna</option>
                </select>
                <label class="anim-toggle">
                  <input
                    type="checkbox"
                    .checked=${!1!==r.animation?.enabled}
                    @change=${t=>this._onAnimEnabled(e,t.target.checked)}
                  />
                  Attiva
                </label>
              </div>
            </div>

            ${["tap","hold"].map(t=>N`
              <div class="input-group">
                <label>${i("tap"===t?"panel.subbutton.tap_action":"panel.subbutton.hold_action")}</label>
                <div class="pill-group">
                  ${l.map(o=>N`
                    <button
                      class="pill-button ${r[`${t}_action`]?.action===o?"active":""}"
                      @click=${()=>this._onAction(e,t,"action",o)}
                    >${c[o]}</button>
                  `)}
                </div>
                ${this._extraFields(e,t,r)}
              </div>
            `)}
          </div>
        `:""}
      </div>
    `}_extraFields(e,t,o){const i=(e,t,o)=>Ae(this.hass,e,t,o),s=o?.[`${t}_action`]?.action;return"navigate"===s?N`
        <input type="text" placeholder=${i("panel.subbutton.path")}
          .value=${o?.[`${t}_action`]?.navigation_path||""}
          @input=${o=>this._onAction(e,t,"navigation_path",o.target.value)}
        />
      `:"url"===s?N`
        <input type="text" placeholder=${i("panel.subbutton.path")}
          .value=${o?.[`${t}_action`]?.url_path||""}
          @input=${o=>this._onAction(e,t,"url_path",o.target.value)}
        />
      `:"call-service"===s?N`
        <input type="text" placeholder=${i("panel.subbutton.service")}
          .value=${o?.[`${t}_action`]?.service||""}
          @input=${o=>this._onAction(e,t,"service",o.target.value)}
        />
        <input type="text" placeholder=${i("panel.subbutton.service_data")}
          .value=${o?.[`${t}_action`]?.service_data?JSON.stringify(o[`${t}_action`].service_data):""}
          @input=${o=>this._onAction(e,t,"service_data",this._safeJson(o.target.value))}
        />
      `:""}_safeJson(e){try{return JSON.parse(e)}catch{return{}}}_toggleAuto(e){this._syncingFromConfig||this._emit("auto_discovery_sections.subbutton",e)}_togglePill(e){this._expanded=this._expanded.map((t,o)=>o===e&&!t)}_onFilter(e,t){let o;this._ignoreNextFilterChange.has(e)?(this._ignoreNextFilterChange.delete(e),o=[]):o=Array.isArray(t)?t.filter(Boolean):[],this._filters=this._filters.map((t,i)=>i===e?[...o]:t),this.requestUpdate("_filters"),this._emit("subbutton_filters",this._filters)}_clearFilter(e){this._ignoreNextFilterChange.add(e),this._filters=this._filters.map((t,o)=>o===e?[]:t),this.requestUpdate("_filters"),this._emit("subbutton_filters",this._filters)}_onEntity(e,t){if(this._entities[e]=t||"",this._syncingFromConfig)return;if(this._emit(`subbuttons.${e}.entity_id`,this._entities[e]),!this._entities[e])return void this._emit(`subbuttons.${e}.icon`,"");const o=this.hass?.states?.[this._entities[e]],i=o?.attributes?.icon,s=i||$e(this._entities[e],this.hass);s&&this._emit(`subbuttons.${e}.icon`,s)}_onIcon(e,t){this._syncingFromConfig||this._emit(`subbuttons.${e}.icon`,t||"")}_onAnimType(e,t){if(this._syncingFromConfig)return;const o=this.config?.subbuttons?.[e]?.animation||{};this._emit(`subbuttons.${e}.animation`,{...o,type:t})}_onAnimEnabled(e,t){if(this._syncingFromConfig)return;const o=this.config?.subbuttons?.[e]?.animation||{};this._emit(`subbuttons.${e}.animation`,{...o,enabled:t})}_onAction(e,t,o,i){if(this._syncingFromConfig)return;const s={...(this.config?.subbuttons?.[e]||{})[`${t}_action`]||{},[o]:i};this._emit(`subbuttons.${e}.${t}_action`,s)}_reset(){this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...ae]),this._entities=Array(4).fill(""),this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"subbuttons"},bubbles:!0,composed:!0}))}_emit(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}}customElements.get("sub-button-panel")||customElements.define("sub-button-panel",Oe);const Ie={green:{label:"Green",room:{icon_active:"#21df73",icon_inactive:"rgba(33,223,115,0.35)",background_active:"rgba(33,223,115,0.50)",background_inactive:"rgba(33,223,115,0.25)",text_active:"rgba(33,223,115,0.50)",text_inactive:"rgba(33,223,115,0.25)"},sub:{background_on:"rgba(33,223,115,0.50)",background_off:"rgba(33,223,115,0.25)",icon_on:"#21df73",icon_off:"rgba(33,223,115,0.35)"},mushroom:{active:"#21df73",inactive:"rgba(33,223,115,0.35)"},sensor:{sensor_active:"rgba(33,223,115,0.50)",sensor_inactive:"rgba(33,223,115,0.25)"}},blue:{label:"Blue",room:{icon_active:"#55afff",icon_inactive:"rgba(85,175,255,0.35)",background_active:"rgba(85,175,255,0.50)",background_inactive:"rgba(85,175,255,0.25)",text_active:"rgba(85,175,255,0.50)",text_inactive:"rgba(85,175,255,0.25)"},sub:{background_on:"rgba(85,175,255,0.50)",background_off:"rgba(85,175,255,0.25)",icon_on:"#55afff",icon_off:"rgba(85,175,255,0.35)"},mushroom:{active:"#55afff",inactive:"rgba(85,175,255,0.35)"},sensor:{sensor_active:"rgba(85,175,255,0.50)",sensor_inactive:"rgba(85,175,255,0.25)"}},amber:{label:"Amber",room:{icon_active:"#ff9b3d",icon_inactive:"rgba(255,155,61,0.35)",background_active:"rgba(255,155,61,0.50)",background_inactive:"rgba(255,155,61,0.25)",text_active:"rgba(255,155,61,0.50)",text_inactive:"rgba(255,155,61,0.25)"},sub:{background_on:"rgba(255,155,61,0.50)",background_off:"rgba(255,155,61,0.25)",icon_on:"#ff9b3d",icon_off:"rgba(255,155,61,0.35)"},mushroom:{active:"#ff9b3d",inactive:"rgba(255,155,61,0.35)"},sensor:{sensor_active:"rgba(255,155,61,0.50)",sensor_inactive:"rgba(255,155,61,0.25)"}},purple:{label:"Purple",room:{icon_active:"#bd64ff",icon_inactive:"rgba(189,100,255,0.35)",background_active:"rgba(189,100,255,0.50)",background_inactive:"rgba(189,100,255,0.25)",text_active:"rgba(189,100,255,0.50)",text_inactive:"rgba(189,100,255,0.25)"},sub:{background_on:"rgba(189,100,255,0.50)",background_off:"rgba(189,100,255,0.25)",icon_on:"#bd64ff",icon_off:"rgba(189,100,255,0.35)"},mushroom:{active:"#bd64ff",inactive:"rgba(189,100,255,0.35)"},sensor:{sensor_active:"rgba(189,100,255,0.50)",sensor_inactive:"rgba(189,100,255,0.25)"}},red:{label:"Red",room:{icon_active:"#ff5c6a",icon_inactive:"rgba(255,92,106,0.35)",background_active:"rgba(255,92,106,0.50)",background_inactive:"rgba(255,92,106,0.25)",text_active:"rgba(255,92,106,0.50)",text_inactive:"rgba(255,92,106,0.25)"},sub:{background_on:"rgba(255,92,106,0.50)",background_off:"rgba(255,92,106,0.25)",icon_on:"#ff5c6a",icon_off:"rgba(255,92,106,0.35)"},mushroom:{active:"#ff5c6a",inactive:"rgba(255,92,106,0.35)"},sensor:{sensor_active:"rgba(255,92,106,0.50)",sensor_inactive:"rgba(255,92,106,0.25)"}},yellow:{label:"Yellow",room:{icon_active:"#ffd633",icon_inactive:"rgba(255,214,51,0.35)",background_active:"rgba(255,214,51,0.50)",background_inactive:"rgba(255,214,51,0.25)",text_active:"rgba(255,214,51,0.50)",text_inactive:"rgba(255,214,51,0.25)"},sub:{background_on:"rgba(255,214,51,0.50)",background_off:"rgba(255,214,51,0.25)",icon_on:"#ffd633",icon_off:"rgba(255,214,51,0.35)"},mushroom:{active:"#ffd633",inactive:"rgba(255,214,51,0.35)"},sensor:{sensor_active:"rgba(255,214,51,0.50)",sensor_inactive:"rgba(255,214,51,0.25)"}},teal:{label:"Teal",room:{icon_active:"#00bfa5",icon_inactive:"rgba(0,191,165,0.35)",background_active:"rgba(0,191,165,0.50)",background_inactive:"rgba(0,191,165,0.25)",text_active:"rgba(0,191,165,0.50)",text_inactive:"rgba(0,191,165,0.25)"},sub:{background_on:"rgba(0,191,165,0.50)",background_off:"rgba(0,191,165,0.25)",icon_on:"#00bfa5",icon_off:"rgba(0,191,165,0.35)"},mushroom:{active:"#00bfa5",inactive:"rgba(0,191,165,0.35)"},sensor:{sensor_active:"rgba(0,191,165,0.50)",sensor_inactive:"rgba(0,191,165,0.25)"}},gray:{label:"Gray",room:{icon_active:"#c5c8ce",icon_inactive:"rgba(197,200,206,0.35)",background_active:"rgba(197,200,206,0.50)",background_inactive:"rgba(197,200,206,0.25)",text_active:"rgba(197,200,206,0.50)",text_inactive:"rgba(197,200,206,0.25)"},sub:{background_on:"rgba(197,200,206,0.50)",background_off:"rgba(197,200,206,0.25)",icon_on:"#c5c8ce",icon_off:"rgba(197,200,206,0.35)"},mushroom:{active:"#c5c8ce",inactive:"rgba(197,200,206,0.35)"},sensor:{sensor_active:"rgba(197,200,206,0.50)",sensor_inactive:"rgba(197,200,206,0.25)"}}},Re=n`
  :host { display:block; }
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

  /* Grid delle card preset */
  .preset-bar {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
    padding: 8px 16px 2px 16px;
    box-sizing: border-box;
  }
  .style-section {
    padding: 0 16px 12px 16px;
    box-sizing: border-box;
  }
  .style-heading {
    font-size: 1.05rem;
    font-weight: 700;
    color: #e9f8ff;
    text-align: center;
    margin: 4px 0 10px 0;
  }
  .style-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
  .style-card {
    position: relative;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(24,32,40,0.45);
    padding: 14px 16px;
    cursor: pointer;
    user-select: none;
    transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
    outline: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: center;
    min-height: 98px;
  }
  .style-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    border-color: rgba(255,255,255,0.28);
  }
  .style-card.selected {
    border-color: #73f6e5;
    box-shadow: 0 0 0 2px inset rgba(115,246,229,0.35);
  }
  .style-card:focus-visible {
    box-shadow: 0 0 0 3px rgba(115,246,229,0.55);
  }
  .style-name {
    font-weight: 800;
    font-size: 1.0rem;
    color: #e9f8ff;
  }
  .style-desc {
    font-size: 0.88rem;
    color: rgba(233,248,255,0.75);
    line-height: 1.35;
  }
  .preset-card {
    position: relative;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(24,32,40,0.45);
    padding: 12px 12px 10px;
    cursor: pointer;
    user-select: none;
    transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
    outline: none;
    display: grid;
    grid-template-rows: auto auto;
    gap: 8px;
  }
  .preset-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    border-color: rgba(255,255,255,0.28);
  }
  .preset-card.selected {
    border-color: #73f6e5;
    box-shadow: 0 0 0 2px inset rgba(115,246,229,0.35);
  }
  .preset-name {
    order: 1;
    font-weight: 800;
    color: #e9f8ff;
    font-size: .95rem;
    text-align: center;
    margin-bottom: 2px;
  }

  .swatches {
    order: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .swatch {
    border-radius: 10px;
    padding: 8px 6px;
    border: 1px solid rgba(255,255,255,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex-direction: column;
  }
  .dot {
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.75);
    flex: 0 0 auto;
  }
  .swatch-label {
    color: #f0f6ff;
    font-size: .8rem;
    opacity: .95;
    line-height: 1;
  }
  /* ── sezioni colore (stile allineato a preset-card / style-card) ── */
  .mini-pill {
    background: rgba(24,32,40,0.45);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 14px;
    margin: 6px 16px;
    overflow: hidden;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .mini-pill:hover {
    border-color: rgba(255,255,255,0.28);
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  }
  .mini-pill.expanded {
    border-color: rgba(255,255,255,0.22);
    box-shadow: 0 4px 18px rgba(0,0,0,0.22);
  }
  .mini-pill-header {
    display: flex;
    align-items: center;
    padding: 14px 18px;
    font-weight: 800;
    font-size: 0.97rem;
    color: var(--section-accent, #73f6e5);
    cursor: pointer;
    user-select: none;
    border-radius: 14px;
    transition: background 0.14s;
  }
  .mini-pill-header:hover {
    background: rgba(255,255,255,0.04);
  }
  .mini-pill-header .chevron {
    margin-left: auto;
    font-size: 0.85em;
    opacity: 0.7;
    transition: transform 0.18s;
  }
  .mini-pill.expanded .mini-pill-header .chevron {
    transform: rotate(90deg);
  }
  .mini-pill-content {
    padding: 4px 14px 14px;
    animation: pill-expand 0.22s cubic-bezier(.5,1.2,.6,1) both;
  }
  @keyframes pill-expand {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── campi colore interni ── */
  .input-group {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 10px;
    margin-bottom: 8px;
    padding: 12px 14px 10px;
  }
  .input-group label {
    display: block;
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--section-accent, #73f6e5);
    margin-bottom: 8px;
  }
  input[type="color"] {
    width: 48px; height: 28px;
    border: 1.5px solid rgba(255,255,255,0.25);
    border-radius: 7px;
    cursor: pointer;
    vertical-align: middle;
  }
  input[type="range"] {
    width: 100%;
    margin: 6px 0 4px;
  }
  input[type="text"] {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 8px;
    padding: 7px 10px;
    background: rgba(0,0,0,0.30);
    color: #e9f8ff;
    font-size: 0.88rem;
    margin-top: 2px;
  }

  /* ── toggle switch ── */
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0 10px;
  }
  .toggle-label {
    font-size: 0.92rem;
    font-weight: 600;
    color: #e9f8ff;
  }
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    flex-shrink: 0;
  }
  .toggle-switch input {
    opacity: 0;
    width: 0; height: 0;
    position: absolute;
  }
  .toggle-track {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: rgba(255,255,255,0.14);
    border: 1.5px solid rgba(255,255,255,0.18);
    transition: background 0.22s, border-color 0.22s;
    cursor: pointer;
  }
  .toggle-track::after {
    content: '';
    position: absolute;
    top: 2px; left: 2px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: rgba(255,255,255,0.55);
    transition: transform 0.22s, background 0.22s;
  }
  .toggle-switch input:checked + .toggle-track {
    background: rgba(115,246,229,0.35);
    border-color: #73f6e5;
  }
  .toggle-switch input:checked + .toggle-track::after {
    transform: translateX(20px);
    background: #73f6e5;
  }
  /* badge on/off nel mini-pill-header */
  .toggle-badge {
    margin-left: auto;
    margin-right: 10px;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
    letter-spacing: 0.03em;
  }
  .toggle-badge.on {
    background: rgba(115,246,229,0.22);
    color: #73f6e5;
    border: 1px solid rgba(115,246,229,0.4);
  }
  .toggle-badge.off {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.45);
    border: 1px solid rgba(255,255,255,0.12);
  }
  /* hint testo piccolo */
  .card-bg-hint {
    font-size: 0.83rem;
    color: rgba(233,248,255,0.55);
    margin-bottom: 10px;
    line-height: 1.4;
  }

  /* ── riga bottoni in fondo ── */
  .bottom-actions {
    display: flex;
    gap: 10px;
    padding: 16px 16px 20px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .apply-btn {
    flex: 1 1 0;
    min-width: 120px;
    font-size: 0.97rem;
    padding: 11px 18px;
    border: 2px solid #73f6e5;
    color: #073a34;
    background: #73f6e5;
    border-radius: 14px;
    cursor: pointer;
    font-weight: 800;
    transition: transform .12s ease, filter .12s ease;
  }
  .apply-btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.07);
  }
  .reset-button {
    flex: 1 1 0;
    min-width: 100px;
    border: 2px solid #ff4c6a;
    color: #ff4c6a;
    font-size: 0.97rem;
    font-weight: 700;
    padding: 11px 18px;
    background: transparent;
    border-radius: 14px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .reset-button:hover {
    background: rgba(255,76,106,0.15);
    color: #fff;
  }
`;class qe extends ie{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_room:{type:Object,state:!0},_subbutton:{type:Object,state:!0},_mushroom:{type:Object,state:!0},_sensor:{type:Object,state:!0},_cardBg:{type:Object,state:!0},_selectedPreset:{type:String,state:!0},_expandedColors:{type:Array,state:!0},_subbuttonStyle:{type:String,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._room={},this._subbutton={},this._mushroom={},this._sensor={},this._cardBg={enabled:!1,color:""},this._selectedPreset="green",this._expandedColors=[!1,!1,!1,!1,!1,!1],this._subbuttonStyle="standard"}updated(e){if(e.has("config")){const e=this.config?.colors||{};this._room={icon_active:e.room?.icon_active??"",icon_inactive:e.room?.icon_inactive??"",background_active:e.room?.background_active??"",background_inactive:e.room?.background_inactive??"",text_active:e.room?.text_active??"",text_inactive:e.room?.text_inactive??""},this._subbutton={background_on:e.subbutton?.background_on??"",background_off:e.subbutton?.background_off??"",icon_on:e.subbutton?.icon_on??"",icon_off:e.subbutton?.icon_off??""},this._mushroom={active:e.mushroom?.active??"",inactive:e.mushroom?.inactive??""},this._sensor={sensor_active:e.sensor?.sensor_active??"",sensor_inactive:e.sensor?.sensor_inactive??""},this._subbuttonStyle=this.config?.subbutton_style||"standard";const t=this.config?.card_background?.enabled??!0;this._cardBg={enabled:t,color:this.config?.card_background?.color??""}}}get PRESETS(){return Ie}static styles=Re;render(){const e=(e,t,o)=>Ae(this.hass,e,t,o);return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expandedColors=[!1,!1,!1,!1,!1,!1])}}
      >
        <div slot="header" class="glass-header">${e("panel.colors.title")}</div>

        ${this._renderStyleChooser()}

        <!-- Card background: colore e abilitazione sfondo card -->
        <div class="mini-pill ${this._expandedColors[0]?"expanded":""}">
          <div
            class="mini-pill-header"
            style="--section-accent: #e0e0e0;"
            @click=${()=>this._toggleColor(0)}
          >
            ${e("panel.colors.card_bg_section")}
            <span class="toggle-badge ${this._cardBg.enabled?"on":"off"}">
              ${this._cardBg.enabled?e("panel.colors.on"):e("panel.colors.off")}
            </span>
            <span class="chevron">${this._expandedColors[0]?"▼":"▶"}</span>
          </div>
          ${this._expandedColors[0]?N`
            <div class="mini-pill-content">
              <div class="toggle-row">
                <span class="toggle-label">${e("panel.colors.card_bg.enabled")}</span>
                <label class="toggle-switch">
                  <input type="checkbox"
                    .checked=${this._cardBg.enabled}
                    @change=${e=>this._emit("card_background.enabled",e.target.checked)}
                  />
                  <span class="toggle-track"></span>
                </label>
              </div>
              ${this._cardBg.enabled?N`
                <div class="card-bg-hint">${e("panel.colors.card_bg.hint")}</div>
                ${this._renderColorField("card_background","color",e("panel.colors.card_bg.color"))}
              `:""}
            </div>
          `:""}
        </div>

        <!-- Preset chooser (cards only, no apply button here) -->
        ${this._renderPresetChooser()}

        <!-- [1] Icona principale: colore icona + sfondo bubble -->
        <div class="mini-pill ${this._expandedColors[1]?"expanded":""}">
          <div class="mini-pill-header" style="--section-accent: #55afff;"
               @click=${()=>this._toggleColor(1)}>
            ${e("panel.colors.room_icon_section")}
            <span class="chevron">${this._expandedColors[1]?"▼":"▶"}</span>
          </div>
          ${this._expandedColors[1]?N`
            <div class="mini-pill-content">
              ${this._renderColorField("room","icon_active",e("panel.colors.room.icon_active"))}
              ${this._renderColorField("room","icon_inactive",e("panel.colors.room.icon_inactive"))}
              ${this._renderColorField("room","background_active",e("panel.colors.room.background_active"))}
              ${this._renderColorField("room","background_inactive",e("panel.colors.room.background_inactive"))}
            </div>
          `:""}
        </div>

        <!-- [2] Nome stanza: colore testo nome -->
        <div class="mini-pill ${this._expandedColors[2]?"expanded":""}">
          <div class="mini-pill-header" style="--section-accent: #80cfff;"
               @click=${()=>this._toggleColor(2)}>
            ${e("panel.colors.room_name_section")}
            <span class="chevron">${this._expandedColors[2]?"▼":"▶"}</span>
          </div>
          ${this._expandedColors[2]?N`
            <div class="mini-pill-content">
              ${this._renderColorField("room","text_active",e("panel.colors.room.text_active"))}
              ${this._renderColorField("room","text_inactive",e("panel.colors.room.text_inactive"))}
            </div>
          `:""}
        </div>

        <!-- [3] Sub-button: bottoni entità laterali -->
        <div class="mini-pill ${this._expandedColors[3]?"expanded":""}">
          <div class="mini-pill-header" style="--section-accent: #b28fff;"
               @click=${()=>this._toggleColor(3)}>
            ${e("panel.colors.subbutton_section")}
            <span class="chevron">${this._expandedColors[3]?"▼":"▶"}</span>
          </div>
          ${this._expandedColors[3]?N`
            <div class="mini-pill-content">
              ${this._renderColorField("subbutton","icon_on",e("panel.colors.subbutton.icon_on"))}
              ${this._renderColorField("subbutton","icon_off",e("panel.colors.subbutton.icon_off"))}
              ${this._renderColorField("subbutton","background_on",e("panel.colors.subbutton.background_on"))}
              ${this._renderColorField("subbutton","background_off",e("panel.colors.subbutton.background_off"))}
            </div>
          `:""}
        </div>

        <!-- [4] Mushroom: icone entità fluttuanti -->
        <div class="mini-pill ${this._expandedColors[4]?"expanded":""}">
          <div class="mini-pill-header" style="--section-accent: #4bd1b4;"
               @click=${()=>this._toggleColor(4)}>
            ${e("panel.colors.mushroom_section")}
            <span class="chevron">${this._expandedColors[4]?"▼":"▶"}</span>
          </div>
          ${this._expandedColors[4]?N`
            <div class="mini-pill-content">
              ${this._renderColorField("mushroom","active",e("panel.colors.mushroom.active"))}
              ${this._renderColorField("mushroom","inactive",e("panel.colors.mushroom.inactive"))}
            </div>
          `:""}
        </div>

        <!-- [5] Sensori: riga sensori in basso -->
        <div class="mini-pill ${this._expandedColors[5]?"expanded":""}">
          <div class="mini-pill-header" style="--section-accent: #ffa742;"
               @click=${()=>this._toggleColor(5)}>
            ${e("panel.colors.sensor_section")}
            <span class="chevron">${this._expandedColors[5]?"▼":"▶"}</span>
          </div>
          ${this._expandedColors[5]?N`
            <div class="mini-pill-content">
              ${this._renderColorField("sensor","sensor_active",e("panel.colors.sensor.sensor_active"))}
              ${this._renderColorField("sensor","sensor_inactive",e("panel.colors.sensor.sensor_inactive"))}
            </div>
          `:""}
        </div>

        <!-- Actions: Applica preset + Reset (entrambi in fondo) -->
        <div class="bottom-actions">
          <button class="apply-btn" @click=${this._applySelectedPreset}>
            ${e("panel.colors.apply_preset")}
          </button>
          <button class="reset-button" @click=${()=>this._resetColors()}>
            ${e("panel.colors.reset")}
          </button>
        </div>
      </ha-expansion-panel>
    `}_renderStyleChooser(){const e=(e,t,o)=>Ae(this.hass,e,t,o),t=[{key:"standard",label:e("panel.colors.style.standard"),description:e("panel.colors.style.standard_desc")},{key:"soft-glass",label:e("panel.colors.style.soft_glass"),description:e("panel.colors.style.soft_glass_desc")},{key:"minimal",label:e("panel.colors.style.minimal"),description:e("panel.colors.style.minimal_desc")},{key:"liquid-glass",label:e("panel.colors.style.liquid_glass"),description:e("panel.colors.style.liquid_glass_desc")}];return N`
      <div class="style-section">
        <div class="style-heading">${e("panel.colors.subbutton_style")}</div>
        <div class="style-bar">
          ${t.map(e=>this._renderStyleCard(e))}
        </div>
      </div>
    `}_renderStyleCard({key:e,label:t,description:o}){const i=this._subbuttonStyle===e;return N`
      <div
        class="style-card ${i?"selected":""}"
        role="button"
        tabindex="0"
        aria-pressed=${i?"true":"false"}
        @click=${()=>this._selectStyle(e)}
        @keydown=${t=>this._onStyleKeydown(t,e)}
      >
        <div class="style-name">${t}</div>
        <div class="style-desc">${o}</div>
      </div>
    `}_renderPresetChooser(){const e=Object.keys(this.PRESETS);return N`
      <div class="preset-bar">
        ${e.map(e=>this._renderPresetCard(e,this.PRESETS[e]))}
      </div>
    `}_renderPresetCard(e,t){const o=(e,t,o)=>Ae(this.hass,e,t,o),i=this._selectedPreset===e?"selected":"",s=t.room.background_active,n=t.room.background_inactive,a=t.room.icon_active,r=t.room.icon_inactive;return N`
      <div class="preset-card ${i}" @click=${()=>this._selectedPreset=e}>
        <div class="preset-name">${o(`presets.${e}`)}</div>
        <div class="swatches">
          <div class="swatch" style="background:${s}">
            <span class="dot" style="background:${a}"></span>
            <span class="swatch-label">${o("panel.colors.on")}</span>
          </div>
          <div class="swatch" style="background:${n}">
            <span class="dot" style="background:${r}"></span>
            <span class="swatch-label">${o("panel.colors.off")}</span>
          </div>
        </div>
      </div>
    `}_toggleColor(e){this._expandedColors=this._expandedColors.map((t,o)=>o===e&&!t)}_readColorValue(e,t){return"card_background"===e?this.config?.card_background?.[t]||"":this.config?.colors?.[e]?.[t]||""}_colorEmitPath(e,t){return"card_background"===e?`card_background.${t}`:`colors.${e}.${t}`}_renderColorField(e,t,o){const i=this._readColorValue(e,t),s="card_background"===e,[n,a,r,l]=this._parseRGBA(i||(s?"rgba(33,223,115,0.15)":"")),c=s?i?l:.15:l,u=s?"0.35":"1",d=`#${[n,a,r].map(e=>e.toString(16).padStart(2,"0")).join("")}`;return N`
      <div class="input-group">
        <label>${o}</label>
        <input
          type="color"
          .value=${d}
          @input=${o=>this._updateColor(e,t,o.target.value,c)}
        />
        <input
          type="range"
          min="0" max=${u} step="0.01"
          .value=${c}
          @input=${o=>this._updateColor(e,t,d,o.target.value)}
        />
        <input
          type="text"
          .value=${i}
          @input=${o=>this._updateColorRaw(e,t,o.target.value)}
        />
      </div>
    `}_applySelectedPreset=()=>{const e=this._selectedPreset,t=this.PRESETS[e];if(!t)return;const o=[["colors.room.background_active",t.room.background_active],["colors.room.background_inactive",t.room.background_inactive],["colors.room.icon_active",t.room.icon_active],["colors.room.icon_inactive",t.room.icon_inactive],["colors.room.text_active",t.room.text_active],["colors.room.text_inactive",t.room.text_inactive],["colors.subbutton.background_on",t.sub.background_on],["colors.subbutton.background_off",t.sub.background_off],["colors.subbutton.icon_on",t.sub.icon_on],["colors.subbutton.icon_off",t.sub.icon_off],["colors.mushroom.active",t.mushroom.active],["colors.mushroom.inactive",t.mushroom.inactive],["colors.sensor.sensor_active",t.sensor.sensor_active],["colors.sensor.sensor_inactive",t.sensor.sensor_inactive]];for(const[e,t]of o)this._emit(e,t);const[i,s,n]=this._parseRGBA(t.room.icon_active);this._emit("card_background.color",`rgba(${i},${s},${n},0.15)`),this._emit("card_background.enabled",!0)};_resetColors(){this._expandedColors=[!1,!1,!1,!1,!1,!1],this._emit("card_background.enabled",!0),this._emit("card_background.color","");const e={room:["background_active","background_inactive","icon_active","icon_inactive","text_active","text_inactive"],subbutton:["background_on","background_off","icon_on","icon_off"],mushroom:["active","inactive"],sensor:["sensor_active","sensor_inactive"]};["room","subbutton","mushroom","sensor"].forEach(t=>{e[t].forEach(e=>this._emit(`colors.${t}.${e}`,""))})}_parseRGBA(e){if(!e)return[0,0,0,1];const t=/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(e);if(t)return[+t[1],+t[2],+t[3],+(t[4]??1)];if(e.startsWith("#")&&(7===e.length||4===e.length)){const t=7===e.length?e.slice(1):e.slice(1).split("").map(e=>e+e).join("");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),1]}return[0,0,0,1]}_updateColor(e,t,o,i){const s=parseInt(o.slice(1,3),16),n=parseInt(o.slice(3,5),16),a=parseInt(o.slice(5,7),16),r=Number(i),l=`rgba(${s},${n},${a},${isNaN(r)?1:r})`;this._emit(this._colorEmitPath(e,t),l)}_updateColorRaw(e,t,o){this._emit(this._colorEmitPath(e,t),o)}_selectStyle(e){this._subbuttonStyle!==e&&(this._subbuttonStyle=e,this._emit("subbutton_style",e))}_onStyleKeydown(e,t){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._selectStyle(t))}_emit(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}}customElements.get("color-panel")||customElements.define("color-panel",qe);class Ne extends ie{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_entity:{type:String,state:!0},_icon:{type:String,state:!0},_candidates:{type:Array,state:!0},_presence:{type:String,state:!0},_presenceCandidates:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._entity="",this._icon="",this._candidates=[],this._presence="",this._presenceCandidates=[],this._syncingFromConfig=!1}updated(e){if(e.has("config")||e.has("hass")){this._syncingFromConfig=!0,this._entity=this.config?.entities?.camera?.entity||"",this._icon=this.config?.entities?.camera?.icon||"",this._presence=this.config?.entities?.camera?.presence?.entity||"";if(this.config?.auto_discovery_sections?.camera??!1){this._candidates=ge(this.hass,this.config,"camera")||[];const e=(ge(this.hass,this.config,"presence",["motion","occupancy","presence","moving"])||[]).filter(e=>e.startsWith("binary_sensor."));this._presence&&!e.includes(this._presence)&&e.unshift(this._presence),this._presenceCandidates=e}else{let e=Object.keys(this.hass?.states||{}).filter(e=>e.startsWith("camera."));this._entity&&!e.includes(this._entity)&&e.unshift(this._entity),this._candidates=e;let t=Object.keys(this.hass?.states||{}).filter(e=>e.startsWith("binary_sensor."));this._presence&&!t.includes(this._presence)&&t.unshift(this._presence),this._presenceCandidates=t}if(this._entity&&!this._icon){const e=this.hass?.states?.[this._entity],t=e?.attributes?.icon||$e(this._entity,this.hass);t&&(this._icon=t)}this._syncingFromConfig=!1}}static styles=[Se,n`
      :host {
        --bubble-glass-bg: rgba(80,120,200,0.28);
        --bubble-glass-shadow: 0 2px 24px rgba(80,120,200,0.18);
        --bubble-glass-sheen: linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0.10) 70%, transparent 100%);
        --bubble-accent-color: #a7c7ff;
        --bubble-autodiscover-label-color: #a7c7ff;
      }
    `];render(){const e=this.config?.auto_discovery_sections?.camera??!1,t=(e,t,o)=>Ae(this.hass,e,t,o);return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>this.expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">${t("panel.camera.title")}</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
          />
          <label>${t("panel.camera.auto_discover")}</label>
        </div>

        <div class="input-group">
          <label>${t("panel.camera.entity")}</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._entity}
            .includeEntities=${this._candidates.length?this._candidates:void 0}
            .includeDomains=${this._candidates.length?void 0:["camera"]}
            allow-custom-entity
            @value-changed=${e=>this._onEntity(e.detail.value)}
          ></ha-entity-picker>
        </div>

        <div class="input-group">
          <label>${t("panel.camera.icon")}</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this._icon}
            allow-custom-icon
            @value-changed=${e=>this._onIcon(e.detail.value)}
          ></ha-icon-picker>
        </div>

        <div class="input-group">
          <label>${t("panel.camera.presence")}</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._presence}
            .includeEntities=${this._presenceCandidates.length?this._presenceCandidates:void 0}
            .includeDomains=${this._presenceCandidates.length?void 0:["binary_sensor"]}
            allow-custom-entity
            @value-changed=${e=>this._onPresence(e.detail.value)}
          ></ha-entity-picker>
        </div>


        <button
          class="reset-button"
          @click=${()=>this._reset()}
        >${t("panel.camera.reset")}</button>
      </ha-expansion-panel>
    `}_toggleAuto(e){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.camera",val:e},bubbles:!0,composed:!0}))}_onEntity(e){if(this._entity=e||"",this._syncingFromConfig)return;if(this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.entity",val:this._entity},bubbles:!0,composed:!0})),!this._entity)return this._icon="",void this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:""},bubbles:!0,composed:!0}));const t=this.hass?.states?.[this._entity],o=t?.attributes?.icon,i=o||$e(this._entity,this.hass)||"";this._icon=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:i},bubbles:!0,composed:!0}))}_onPresence(e){this._presence=e||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.presence.entity",val:this._presence},bubbles:!0,composed:!0}))}_onIcon(e){this._icon=e||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:this._icon},bubbles:!0,composed:!0}))}_reset(){this._entity="",this._icon="",this._presence="",this._candidates=[],this._presenceCandidates=[],this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"camera"},bubbles:!0,composed:!0}))}}customElements.get("camera-panel")||customElements.define("camera-panel",Ne);class Te extends ie{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_entity:{type:String,state:!0},_icon:{type:String,state:!0},_candidates:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._entity="",this._icon="",this._candidates=[],this._syncingFromConfig=!1}updated(e){if(!e.has("config")&&!e.has("hass"))return;this._syncingFromConfig=!0;const t=this.config?.entities?.climate?.entity||"",o=this.config?.entities?.climate?.icon||"";this._entity=t,this._icon=o;if(this.config?.auto_discovery_sections?.climate??!1){const e=ge(this.hass,this.config,"climate")||[];this._candidates=Array.isArray(e)?e:[]}else{let e=Object.keys(this.hass?.states||{}).filter(e=>e.startsWith("climate."));this._entity&&!e.includes(this._entity)&&e.unshift(this._entity),this._candidates=e}if(this._entity&&!this._icon){const e=this.hass?.states?.[this._entity],t=e?.attributes?.icon,o=t||$e(this._entity,this.hass);o&&(this._icon=o,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.icon",val:o},bubbles:!0,composed:!0})))}this._syncingFromConfig=!1}static styles=[Se,n`
      :host {
        --bubble-glass-bg: rgba(200,120,80,0.28);
        --bubble-glass-shadow: 0 2px 24px rgba(200,120,80,0.18);
        --bubble-glass-sheen: linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0.10) 70%, transparent 100%);
        --bubble-accent-color: #ffb07e;
        --bubble-autodiscover-label-color: #ffb07e;
      }
    `];render(){const e=this.config?.auto_discovery_sections?.climate??!1,t=(e,t,o)=>Ae(this.hass,e,t,o);return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>this.expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">${t("panel.climate.title")}</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
          />
          <label>${t("panel.climate.auto_discover")}</label>
        </div>

        <div class="input-group">
          <label>${t("panel.climate.entity")}</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._entity}
            .includeEntities=${this._candidates.length?this._candidates:void 0}
            .includeDomains=${this._candidates.length?void 0:["climate"]}
            allow-custom-entity
            @value-changed=${e=>this._onEntity(e.detail.value)}
          ></ha-entity-picker>
        </div>

        <div class="input-group">
          <label>${t("panel.climate.icon")}</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this._icon}
            allow-custom-icon
            @value-changed=${e=>this._onIcon(e.detail.value)}
          ></ha-icon-picker>
        </div>

        <button
          class="reset-button"
          @click=${()=>this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"climate"},bubbles:!0,composed:!0}))}
        >${t("panel.climate.reset")}</button>
      </ha-expansion-panel>
    `}_toggleAuto(e){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.climate",val:e},bubbles:!0,composed:!0}))}_onEntity(e){if(this._entity=e||"",this._syncingFromConfig)return;if(this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.entity",val:this._entity},bubbles:!0,composed:!0})),!this._entity)return this._icon="",void this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.icon",val:""},bubbles:!0,composed:!0}));const t=this.hass?.states?.[this._entity],o=t?.attributes?.icon,i=o||$e(this._entity,this.hass)||"";this._icon=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.icon",val:i},bubbles:!0,composed:!0}))}_onIcon(e){this._icon=e||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.icon",val:this._icon},bubbles:!0,composed:!0}))}}customElements.get("climate-panel")||customElements.define("climate-panel",Te);const je="undefined"!=typeof window&&!!window.__BUBBLE_DEBUG__;function Be(e,t){const o=Array.isArray(t?.area)?t.area[0]:t?.area,i="string"==typeof t?.area_id?t.area_id:"",s="string"!=typeof o||o.startsWith("area_")?"":o;let n=i||("string"==typeof o&&o.startsWith("area_")?o:"");const a=Array.isArray(e?.areas)?e.areas:[];if(!n&&a.length&&s){const e=a.find(e=>(e.name||"").toLowerCase()===String(s).toLowerCase());e?.area_id&&(n=e.area_id)}return{areaId:n,areaName:s}}function Le(e,t,o,i){if(!o&&!i)return!0;const s=e?.entities,n=e?.devices,a=s?.[t];if(a?.area_id&&o)return a.area_id===o;if(a?.device_id&&Array.isArray(n)){const e=n.find(e=>e.id===a.device_id||e.device_id===a.device_id);if(e?.area_id&&o)return e.area_id===o}const r=e?.states?.[t];if(r){const e=r.attributes?.area_id,t=r.attributes?.area;if(o&&e)return e===o;if(i&&t)return String(t).toLowerCase()===String(i).toLowerCase()}return!0}function De(e,t,o){let i=ge(e,t,o)||[];return!i.length&&e?.states&&(i=Object.keys(e.states)),i}function He(e,t,o,i){const s={...t.entities||{}},n={...s[i]||{}};if(n.entity)return t;let a=De(e,t,o);a.length||(a=De(e,t,"mushroom")),a=(a||[]).filter(e=>e.startsWith(`${o}.`));const r=Be(e,t),l=function(e,t,o,i){const{areaId:s,areaName:n}=o;let a=(t||[]).filter(t=>Le(e,t,s,n));return(s||n)&&0===a.length&&(a=[]),i&&!a.includes(i)&&a.unshift(i),Array.from(new Set(a))}(e,a,r,n.entity),c=l[0]||"";return c&&(n.entity=c),n.entity&&(s[i]=n),je&&console.info(`[AutoDiscovery][${i}]`,{domain:o,chosen:n.entity,areaRef:r,pool:a.length,filtered:l.length}),Ve(t,s)}const Ue=(e,t)=>e.find(e=>!t.has(e))||null,We=(e,t)=>JSON.stringify(t)===JSON.stringify(e)?e:t,Ve=(e,t)=>e.entities||0!==Object.keys(t).length?We(e,{...e,entities:t}):e;function Je(e,t){const o=["sensor1","sensor2","sensor3","sensor4","sensor5"],i={...t.entities||{}},s=Array.isArray(t.sensor_filters)?t.sensor_filters:[],n=new Set(o.map(e=>i[e]?.entity||i[e]?.entity_id).filter(Boolean));for(let a=0;a<o.length;a++){const r=o[a],l={...i[r]||{}};if(l.entity||l.entity_id)continue;const c=ge(e,t,"sensor",Array.isArray(s[a])?s[a]:[])||[],u=Ue(c,n);u&&(l.entity=u,delete l.entity_id,i[r]=l,n.add(u))}return Ve(t,i)}function Ge(e,t){const o={...t.entities||{}},i=new Set(["mushroom1","mushroom2","mushroom3","mushroom4","mushroom5"].map(e=>o[e]?.entity).filter(Boolean));let s=De(e,t,"mushroom");for(let e=1;e<=5;e++){const t=`mushroom${e}`,n={...o[t]||{}};if(n.entity)continue;const a=Ue(s,i);a&&(n.entity=a,o[t]=n,i.add(a))}return Ve(t,o)}function Ye(e,t){const o=Array.isArray(t.subbuttons)?t.subbuttons.map(e=>({...e||{}})):[];for(;o.length<4;)o.push({});const i=t.entities||{},s=new Set(o.map((e,t)=>e.entity_id||i[`sub-button${t+1}`]?.entity).filter(Boolean)),n=ge(e,t,"subbutton")||[];for(let e=0;e<4;e++){const t=o[e];if(!t.entity_id&&i[`sub-button${e+1}`]?.entity&&(t.entity_id=i[`sub-button${e+1}`].entity),t.entity_id)continue;const a=Ue(n,s);a&&(t.entity_id=a,s.add(a))}for(;o.length&&0===Object.keys(o[o.length-1]).length;)o.pop();return o.length||Array.isArray(t.subbuttons)?We(t,{...t,subbuttons:o}):t}function Ke(e,t){const o={...t.entities||{}},i={...o.presence||{}};if(!i.entity){const o=function(e,t){if(!e||!e.states)return[];const o=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let i=Object.keys(e.states).filter(e=>o.has(e.split(".")[0]));i=i.filter(t=>{if("binary_sensor"!==t.split(".")[0])return!0;const o=e.states[t]?.attributes?.device_class;return["motion","occupancy","presence"].includes(o||"")});const s=t?.auto_discovery_sections?.presence??!1,{areaId:n,areaName:a}=Be(e,t);if(s&&(n||a)){const t=i.filter(t=>Le(e,t,n,a));t.length&&(i=t)}const r=t?.entities?.presence?.entity||t?.presence_entity;return r&&!i.includes(r)&&i.unshift(r),je&&console.info("[AutoDiscovery][presence candidates]",{areaId:n,areaName:a,count:i.length,sample:i.slice(0,8)}),i}(e,t);o.length&&(i.entity=o[0])}return i.entity&&(o.presence=i),Ve(t,o)}function Xe(e,t){return He(e,t,"climate","climate")}function Ze(e,t){return He(e,t,"camera","camera")}function Qe(e,t,o,i=!1){if(!e||!t)return t;const s=t.auto_discovery_sections||{},n="area"===o,a=o&&String(o).startsWith("auto_discovery_sections."),r=a?String(o).split(".").pop():void 0;let l=t;const c=(t,o)=>{t&&(l=o(e,l))};return n||void 0===o?(c(s.presence,Ke),c(s.sensor,Je),c(s.mushroom,Ge),c(s.subbutton,Ye),c(s.climate,Xe),c(s.camera,Ze)):"presence"===r?c(s.presence,Ke):"sensor"===r?c(s.sensor,Je):"mushroom"===r?c(s.mushroom,Ge):"subbutton"===r?c(s.subbutton,Ye):"climate"===r?c(s.climate,Xe):"camera"===r&&c(s.camera,Ze),(i||je)&&"undefined"!=typeof window&&console.info("[AutoDiscovery] after",o,{sections:s,isAreaChange:n,isADChange:a}),JSON.stringify(l)===JSON.stringify(t)?t:l}class et extends ie{static properties={hass:{type:Object},config:{type:Object},openPanel:{type:String,state:!0}};constructor(){super(),this.hass=void 0,this.config={},this.openPanel="",this._onPanelChanged=this._onPanelChanged.bind(this),this._onPanelCmd=this._onPanelCmd.bind(this),this._togglePanel=this._togglePanel.bind(this),this._onConfigChanged=this._onConfigChanged.bind(this)}setConfig(e){this.config={type:e?.type||"custom:bubble-room",...e||{}},this.requestUpdate()}set value(e){this.config=e||{}}get value(){return this.config}connectedCallback(){super.connectedCallback(),this.addEventListener("panel-changed",this._onPanelChanged),this.addEventListener("__panel_cmd__",this._onPanelCmd)}disconnectedCallback(){this.removeEventListener("panel-changed",this._onPanelChanged),this.removeEventListener("__panel_cmd__",this._onPanelCmd),super.disconnectedCallback()}_emitConfig(e){const t={type:this.config?.type||"custom:bubble-room",...e||{}};this.config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0})),this.requestUpdate()}_setConfigValue(e,t){const o=structuredClone(this.config||{});this._applyPath(o,e,t),this._emitConfig(o)}_applyPath(e,t,o){const i=String(t).split(".");let s=e;for(let e=0;e<i.length-1;e++){const t=i[e],o=i[e+1],n=/^\d+$/.test(o);"object"==typeof s[t]&&null!==s[t]||(s[t]=n?[]:{}),s=s[t]}s[i[i.length-1]]=o}_onPanelChanged(e){e.stopPropagation();const{prop:t}=e.detail||{},o=this._normalizePanelValue(t,e.detail?.val);if(!t)return;const i=this.config,s=structuredClone(i||{});this._applyPath(s,t,o);const n="area"===t?Qe(this.hass,s,t,!1):s;this._emitConfig(n)}_onConfigChanged(e){e.stopPropagation();const{path:t}=e.detail||{},o=this._normalizePanelValue(t,e.detail?.value);if(!t)return;const i=this.config,s=structuredClone(i||{});this._applyPath(s,t,o);const n="area"===t?Qe(this.hass,s,t,!1):s;this._emitConfig(n)}_normalizePanelValue(e,t){if(null!=t)return t;if(!e)return t;const o=String(e);return"area"===o||"area_id"===o||"name"===o||"icon"===o||o.endsWith(".entity")||o.endsWith(".entity_id")||o.endsWith(".icon")?"":t}_onPanelCmd(e){e.stopPropagation();const{cmd:t,section:o}=e.detail||{};if("reset"!==t)return;let i=this.config||{};switch(o){case"room":i=function(e){const t={...e.entities||{}};delete t.presence;const o={...e,entities:t};return delete o.name,delete o.icon,delete o.area,delete o.presence_entity,o}(i);break;case"sensors":i=function(e){const t={...e.entities||{}};return["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6","sensor7","sensor8"].forEach(e=>delete t[e]),{...e,entities:t}}(i);break;case"mushrooms":i=function(e){const t={...e.entities||{}};return["mushroom1","mushroom2","mushroom3","mushroom4","mushroom5","climate","camera"].forEach(e=>delete t[e]),{...e,entities:t}}(i);break;case"subbuttons":i=function(e){const t={...e.entities||{}};["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"].forEach(e=>delete t[e]);const o={...e,entities:t};return delete o.subbuttons,delete o.subbutton_filters,o}(i);break;case"climate":i=function(e){const t={...e.entities||{}};return delete t.climate,{...e,entities:t}}(i);break;case"camera":i=function(e){const t={...e.entities||{}};return delete t.camera,{...e,entities:t}}(i);break;default:return}const s=i?.auto_discovery_sections||{};(s.sensor||s.mushroom||s.subbutton||s.presence||s.climate||s.camera)&&(i=Qe(this.hass,i,void 0,!1)),this._emitConfig(i)}_togglePanel(e,t){const o=e?.detail?.expanded;this.openPanel=o?t:""}static styles=n`
    :host { display:block; }
    .editor-grid {
      display:grid; gap: 16px;
      grid-template-columns: 1fr;
      align-items: start;
    }
  `;render(){const e=this.config||{};return N`
      <div class="editor-grid">
        <!-- ROOM -->
        <room-panel
          .hass=${this.hass}
          .config=${e}
          .expanded=${"room"===this.openPanel}
          @expanded-changed=${e=>this._togglePanel(e,"room")}
          @panel-changed=${this._onPanelChanged}
        ></room-panel>

        <!-- CLIMATE -->
        <climate-panel
          .hass=${this.hass}
          .config=${e}
          .expanded=${"climate"===this.openPanel}
          @expanded-changed=${e=>this._togglePanel(e,"climate")}
          @panel-changed=${this._onPanelChanged}
        ></climate-panel>

        <!-- CAMERA -->
        <camera-panel
          .hass=${this.hass}
          .config=${e}
          .expanded=${"camera"===this.openPanel}
          @expanded-changed=${e=>this._togglePanel(e,"camera")}
          @panel-changed=${this._onPanelChanged}
        ></camera-panel>

        <!-- SENSOR -->
        <sensor-panel
          .hass=${this.hass}
          .config=${e}
          .expanded=${"sensor"===this.openPanel}
          @expanded-changed=${e=>this._togglePanel(e,"sensor")}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></sensor-panel>

        <!-- MUSHROOM -->
        <mushroom-panel
          .hass=${this.hass}
          .config=${e}
          .expanded=${"mushroom"===this.openPanel}
          @expanded-changed=${e=>this._togglePanel(e,"mushroom")}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></mushroom-panel>

        <!-- SUBBUTTON -->
        <sub-button-panel
          .hass=${this.hass}
          .config=${e}
          .expanded=${"subbuttons"===this.openPanel}
          @expanded-changed=${e=>this._togglePanel(e,"subbuttons")}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></sub-button-panel>

        <!-- COLORS -->
        <color-panel
          .hass=${this.hass}
          .config=${e}
          .expanded=${"colors"===this.openPanel}
          @expanded-changed=${e=>this._togglePanel(e,"colors")}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></color-panel>
      </div>
    `}}customElements.get("bubble-room-editor")||customElements.define("bubble-room-editor",et);var tt=Object.freeze({__proto__:null,BubbleRoomEditor:et});function ot({holdThreshold:e=500,onTap:t,onHold:o}={}){let i,s=null,n=!1;function a(){null!==s&&(clearTimeout(s),s=null)}return{onDown:function(t){n=!1,i=t,a(),s=setTimeout(()=>{n=!0,s=null,o?.(i)},e)},onUp:function(e){a(),n?n=!1:void 0!==e&&void 0!==i&&e!==i||t?.(void 0!==e?e:i)},onCancel:function(){a(),n=!1,i=void 0},clearTimer:a}}let it=null,st=null;function nt(e){if(!e||"string"!=typeof e||e.startsWith("var("))return null;const t=st||("undefined"==typeof document?null:(it=document.createElement("canvas"),it.width=it.height=1,st=it.getContext("2d",{willReadFrequently:!0})||it.getContext("2d"),st));if(!t)return null;try{t.fillStyle="#000",t.fillStyle=e}catch{return null}const o=t.fillStyle;t.clearRect(0,0,1,1),t.fillStyle=o,t.fillRect(0,0,1,1);const[i,s,n,a]=t.getImageData(0,0,1,1).data;return{r:i,g:s,b:n,a:a/255}}class at extends ie{static properties={subbuttons:{type:Array},preset:{type:String,reflect:!0}};constructor(){super(),this.subbuttons=[],this.preset="liquid-glass",this._gesture=ot({onTap:e=>this._fireHassAction(e,"tap"),onHold:e=>this._fireHassAction(e,"hold")})}static styles=n`
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

    :host([preset='standard']) .sub-button {
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

    :host([preset='standard']) .sub-button:first-child {
      margin-top: 0;
    }

    :host([preset='standard']) .sub-button:last-child {
      margin-bottom: 0;
    }

    :host([preset='standard']) .sub-button:active {
      transform: scale(0.97);
    }

    :host([preset='standard']) .sub-button ha-icon {
      width: 80%;
      height: 80%;
    }

    :host([preset='liquid-glass']) .sub-button {
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      margin: 2px 0;
      border-radius: 18px;
      cursor: pointer;
      min-height: 0;
      color: var(--bubble-subbutton-color, #fff);

      /* colore entità puro come base — no white blend che sbiadisce */
      background: var(--bubble-subbutton-bg, rgba(255, 255, 255, 0.08));

      /* catch-light sull'edge superiore + ombra esterna + bordo colorato */
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.32),
        inset 0 -1px 0 rgba(0, 0, 0, 0.10),
        0 8px 28px var(--bubble-subbutton-glass-shadow, rgba(0, 0, 0, 0.20));
      border: 1.5px solid var(--bubble-subbutton-border, currentColor);

      /* saturate più aggressivo per estrarre i colori reali del backdrop */
      backdrop-filter: blur(20px) saturate(2.2) brightness(1.05);
      -webkit-backdrop-filter: blur(20px) saturate(2.2) brightness(1.05);
      transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.18s ease,
        border-color 0.3s ease, filter 0.35s ease;
      isolation: isolate;
      filter:
        saturate(var(--bubble-subbutton-saturation, 1))
        brightness(var(--bubble-subbutton-luminance, 1.05));
    }

    :host([preset='liquid-glass']) .sub-button:first-child {
      margin-top: 0;
    }

    :host([preset='liquid-glass']) .sub-button:last-child {
      margin-bottom: 0;
    }

    :host([preset='liquid-glass']) .sub-button:active {
      transform: scale(0.97);
      box-shadow: 0 4px 16px var(--bubble-subbutton-glass-shadow-active, rgba(13, 22, 41, 0.20));
      border-color: var(
        --bubble-subbutton-border-active,
        var(--bubble-subbutton-border, currentColor)
      );
    }

    :host([preset='liquid-glass']) .sub-button:hover {
      box-shadow: 0 12px 36px var(--bubble-subbutton-glass-shadow-hover, rgba(13, 22, 41, 0.18));
      border-color: var(
        --bubble-subbutton-border-hover,
        var(--bubble-subbutton-border, currentColor)
      );
    }

    :host([preset='liquid-glass']) .sub-button::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      /* overlay crea il riflesso glossy che interagisce con il colore sottostante
         (screen lo sbiadisce, overlay lo esalta) */
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.50) 0%,
        rgba(255, 255, 255, 0.14) 35%,
        transparent 55%
      );
      opacity: 0.75;
      mix-blend-mode: overlay;
      transition: opacity 0.35s ease;
    }

    :host([preset='liquid-glass']) .sub-button:hover::before {
      opacity: 1.0;
    }

    :host([preset='liquid-glass']) .sub-button::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: radial-gradient(
        ellipse 120% 75% at 50% 118%,
        var(--bubble-subbutton-glow, rgba(255, 255, 255, 0.12)),
        transparent 65%
      );
      mix-blend-mode: screen;
      opacity: 0.90;
      transition: opacity 0.35s ease;
    }

    :host([preset='liquid-glass']) .sub-button.is-active::after {
      opacity: 1.0;
    }

    :host([preset='liquid-glass']) .sub-button:hover::after {
      opacity: 0.90;
    }

    :host([preset='liquid-glass']) .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter:
        drop-shadow(0 6px 12px rgba(var(--bubble-subbutton-glass-shadow-rgb, 13, 22, 41), 0.14))
        brightness(var(--bubble-subbutton-icon-brightness, 1.1))
        saturate(var(--bubble-subbutton-icon-saturation, 1));
      transition: filter 0.35s ease, color 0.35s ease;
    }

    :host([preset='soft-glass']) .sub-button {
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      margin: 2px 0;
      border-radius: 14px;
      cursor: pointer;
      min-height: 0;
      color: var(--bubble-subbutton-color, #fff);
      background: color-mix(in srgb, var(--bubble-subbutton-color, white) 32%, rgba(255, 255, 255, 0.06));
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.22),
        0 4px 14px rgba(0, 0, 0, 0.16);
      border: 2px solid color-mix(in srgb, var(--bubble-subbutton-color, white) 48%, transparent);
      backdrop-filter: blur(8px) saturate(1.25);
      -webkit-backdrop-filter: blur(8px) saturate(1.25);
      transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease,
        border-color 0.25s ease, filter 0.25s ease;
      filter:
        saturate(var(--bubble-subbutton-saturation, 1))
        brightness(var(--bubble-subbutton-luminance, 1));
    }

    :host([preset='soft-glass']) .sub-button:first-child { margin-top: 0; }
    :host([preset='soft-glass']) .sub-button:last-child { margin-bottom: 0; }

    :host([preset='soft-glass']) .sub-button:active {
      transform: scale(0.97);
      box-shadow: 0 2px 8px rgba(13, 22, 41, 0.16);
    }

    :host([preset='soft-glass']) .sub-button::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), transparent 48%);
      opacity: 0.65;
      transition: opacity 0.25s ease;
    }

    :host([preset='soft-glass']) .sub-button.is-active::before {
      opacity: 0.72;
    }

    :host([preset='soft-glass']) .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter:
        drop-shadow(0 3px 7px rgba(var(--bubble-subbutton-glass-shadow-rgb, 13, 22, 41), 0.13))
        brightness(var(--bubble-subbutton-icon-brightness, 1))
        saturate(var(--bubble-subbutton-icon-saturation, 1));
      transition: filter 0.25s ease, color 0.25s ease;
    }

    :host([preset='minimal']) .sub-button {
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 2px 0;
      border-radius: 12px;
      cursor: pointer;
      min-height: 0;
      color: var(--bubble-subbutton-color, #fff);
      background: color-mix(in srgb, var(--bubble-subbutton-color, white) 18%, rgba(255, 255, 255, 0.04));
      border: 2px solid color-mix(in srgb, var(--bubble-subbutton-color, white) 44%, transparent);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
      transition: background 0.18s ease, border-color 0.18s ease, transform 0.12s ease;
    }

    :host([preset='minimal']) .sub-button:first-child { margin-top: 0; }
    :host([preset='minimal']) .sub-button:last-child { margin-bottom: 0; }
    :host([preset='minimal']) .sub-button:active { transform: scale(0.97); }

    :host([preset='minimal']) .sub-button ha-icon {
      width: 80%;
      height: 80%;
      color: inherit;
      filter: none;
    }

    /* 👇 (Opzionale) Rende l'icona SVG responsiva */
    ha-icon {
      --mdc-icon-size: 100%;
    }

    ha-icon svg {
      width: 100%;
      height: 100%;
    }

    /* --- Keyframe animations (same as mushrooms) --- */
    @keyframes subbutton-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes subbutton-illuminate {
      0%, 100% { clip-path: inset(0 0 0 0); opacity: 1; }
      45%       { clip-path: inset(0 0 55% 0); opacity: 0.6; }
      55%       { clip-path: inset(0 0 0 0); opacity: 1; }
    }
    @keyframes subbutton-alarm {
      0%   { transform: rotate(0deg) translateY(0); }
      15%  { transform: rotate(18deg) translateY(-2px); }
      30%  { transform: rotate(-14deg) translateY(-1px); }
      45%  { transform: rotate(10deg) translateY(-1px); }
      60%  { transform: rotate(-6deg) translateY(0); }
      75%  { transform: rotate(3deg) translateY(0); }
      100% { transform: rotate(0deg) translateY(0); }
    }
    @keyframes subbutton-blink {
      0%, 49%  { opacity: 1; }
      50%, 100% { opacity: 0.15; }
    }
    @keyframes subbutton-beat {
      0%, 100% { transform: scale(1); }
      14%      { transform: scale(1.18); }
      28%      { transform: scale(1); }
      42%      { transform: scale(1.12); }
      70%      { transform: scale(1); }
    }
    @keyframes subbutton-scan {
      0%, 100% { transform: rotate(-18deg); }
      50%      { transform: rotate(18deg); }
    }
    @keyframes subbutton-shake {
      0%, 100% { transform: translateX(0); }
      20%      { transform: translateX(-3px) rotate(-1deg); }
      40%      { transform: translateX(3px) rotate(1deg); }
      60%      { transform: translateX(-2px); }
      80%      { transform: translateX(2px); }
    }
    @keyframes subbutton-bounce {
      0%, 100% { transform: translateY(0); }
      40%      { transform: translateY(-5px); }
      60%      { transform: translateY(-3px); }
    }

    :host([preset='liquid-glass']) .sub-button.is-active.anim-spin ha-icon {
      animation: subbutton-spin 1.4s linear infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-illuminate ha-icon {
      animation: subbutton-illuminate 2.5s ease-in-out infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-alarm ha-icon {
      animation: subbutton-alarm 0.9s ease infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-blink ha-icon {
      animation: subbutton-blink 1.1s step-end infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-beat ha-icon {
      animation: subbutton-beat 1.3s ease-out infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-scan ha-icon {
      transform-origin: 90% 80%;
      animation: subbutton-scan 5s ease-in-out infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-shake ha-icon {
      animation: subbutton-shake 400ms ease-in-out infinite;
    }
    :host([preset='liquid-glass']) .sub-button.is-active.anim-bounce ha-icon {
      animation: subbutton-bounce 0.7s cubic-bezier(0.30, 2.40, 0.85, 2.50) infinite;
    }

    :host([preset='soft-glass']) .sub-button.is-active.anim-spin ha-icon {
      animation: subbutton-spin 1.4s linear infinite;
    }
    :host([preset='soft-glass']) .sub-button.is-active.anim-illuminate ha-icon {
      animation: subbutton-illuminate 2.5s ease-in-out infinite;
    }
    :host([preset='soft-glass']) .sub-button.is-active.anim-alarm ha-icon {
      animation: subbutton-alarm 0.9s ease infinite;
    }
    :host([preset='soft-glass']) .sub-button.is-active.anim-blink ha-icon {
      animation: subbutton-blink 1.1s step-end infinite;
    }
    :host([preset='soft-glass']) .sub-button.is-active.anim-beat ha-icon {
      animation: subbutton-beat 1.3s ease-out infinite;
    }
    :host([preset='soft-glass']) .sub-button.is-active.anim-scan ha-icon {
      transform-origin: 90% 80%;
      animation: subbutton-scan 5s ease-in-out infinite;
    }
    :host([preset='soft-glass']) .sub-button.is-active.anim-shake ha-icon {
      animation: subbutton-shake 400ms ease-in-out infinite;
    }
    :host([preset='soft-glass']) .sub-button.is-active.anim-bounce ha-icon {
      animation: subbutton-bounce 0.7s cubic-bezier(0.30, 2.40, 0.85, 2.50) infinite;
    }
  `;render(){return"standard"===this.preset?this._renderStandard():this._renderLiquidGlass()}_renderStandard(){return N`
      <div class="container">
        ${this.subbuttons.map((e,t)=>{const o=e.active?e.colorOn:e.colorOff,i=e.active?e.iconOn:e.iconOff;return N`
            <div
              class="sub-button"
              style="background:${o};color:${i};"
              @pointerdown=${()=>this._onDown(t)}
              @pointerup=${()=>this._onUp(t)}
              @pointerleave=${()=>this._clearHoldTimer()}
              @pointercancel=${()=>this._clearHoldTimer()}
            >
              <ha-icon icon="${e.icon}"></ha-icon>
            </div>
          `})}
      </div>
    `}_renderLiquidGlass(){return N`
      <div class="container">
        ${this.subbuttons.map((e,t)=>{const o=e.active?e.colorOn:e.colorOff,i=e.active?e.iconOn:e.iconOff,s=this._computeGlassColors(o,e.active),n=[],a=this._computeIconTone(i,e.active);if(a&&n.push(`--bubble-subbutton-color:${a}`),s)n.push(`--bubble-subbutton-bg:${s.surface}`),n.push(`--bubble-subbutton-glow:${s.glow}`),n.push(`--bubble-subbutton-glass-base:${s.base}`),n.push(`--bubble-subbutton-glass-highlight:${s.highlight}`),n.push(`--bubble-subbutton-glass-soft:${s.soft}`),n.push(`--bubble-subbutton-glass-sheen:${s.sheen}`),n.push(`--bubble-subbutton-glass-accent:${s.accent}`),n.push(`--bubble-subbutton-tint:${s.rgb}`),n.push(`--bubble-subbutton-glass-shadow:${s.shadow}`),n.push(`--bubble-subbutton-glass-shadow-hover:${s.shadowHover}`),n.push(`--bubble-subbutton-glass-shadow-active:${s.shadowActive}`),n.push(`--bubble-subbutton-glass-shadow-rgb:${s.shadowRgb}`);else if(o){const t=e.active?this._lightenColor(o,.35):null;n.push(`--bubble-subbutton-bg:${t||o}`)}const r=this._computeBorderColors(i,e.active);r?(n.push(`--bubble-subbutton-border:${r.base}`),n.push(`--bubble-subbutton-border-hover:${r.hover}`),n.push(`--bubble-subbutton-border-active:${r.active}`)):i&&(n.push(`--bubble-subbutton-border:${i}`),n.push(`--bubble-subbutton-border-hover:${i}`),n.push(`--bubble-subbutton-border-active:${i}`));const l=this._computeGlowPalette(i,e.active);l?(n.push(`--bubble-subbutton-glass-glow:${l.glow}`),n.push(`--bubble-subbutton-glass-rim:${l.rim}`),n.push(`--bubble-subbutton-glass-rim-soft:${l.rimSoft}`),n.push(`--bubble-subbutton-glass-rim-shadow:${l.rimShadow}`)):i&&(n.push(`--bubble-subbutton-glass-glow:${i}`),n.push(`--bubble-subbutton-glass-rim:${i}`),n.push(`--bubble-subbutton-glass-rim-soft:${i}`),n.push(`--bubble-subbutton-glass-rim-shadow:${i}`)),e.active&&(n.push("--bubble-subbutton-saturation:1.15"),n.push("--bubble-subbutton-luminance:1.04"),n.push("--bubble-subbutton-icon-brightness:1.25"),n.push("--bubble-subbutton-icon-saturation:1.15"));const c=n.join(";"),u=["sub-button"];e.active&&u.push("is-active");const d=e.active?this._getAnimClass(e):"";return d&&u.push(d),N`
            <div
              class="${u.join(" ")}"
              style="${c}"
              @pointerdown=${()=>this._onDown(t)}
              @pointerup=${()=>this._onUp(t)}
              @pointerleave=${()=>this._clearHoldTimer()}
              @pointercancel=${()=>this._clearHoldTimer()}
            >
              <ha-icon icon="${e.icon}"></ha-icon>
            </div>
          `})}
      </div>
    `}_getAnimClass(e){const t=e?.animation;return!1===t?.enabled?"":t?.type&&"auto"!==t.type?t.type:we(e?.icon)}_onDown(e){this._gesture.onDown(e)}_onUp(e){this._gesture.onUp(e)}_clearHoldTimer(){this._gesture.clearTimer()}_lightenColor(e,t=.3){const o=this._colorToRgb(e);if(!o)return null;const i=Math.min(Math.max(t,0),1),s=this._mixWithWhite(o,i),n="number"==typeof o.a?Math.min(Math.max(Number(o.a.toFixed(3)),0),1):1;return n<1?`rgba(${s.r}, ${s.g}, ${s.b}, ${n})`:`rgb(${s.r}, ${s.g}, ${s.b})`}_computeGlassColors(e,t=!1){const o=this._colorToRgb(e);if(!o)return null;const i=t?this._boostColorIntensity(o,.42):o,{r:s,g:n,b:a}=i,r=`${s}, ${n}, ${a}`,l=this._mixWithWhite(i,t?.14:.28),c=`${l.r}, ${l.g}, ${l.b}`,u=t?{surface:.42,base:.3,highlight:.38,soft:.26,sheen:.48,accent:.2,glow:.55,border:.42,borderHover:.52,borderActive:.48,shadow:.2,shadowHover:.28,shadowActive:.24,rim:.72,rimSoft:.34,rimShadow:.4}:{surface:.22,base:.16,highlight:.24,soft:.14,sheen:.3,accent:.1,glow:.38,border:.18,borderHover:.26,borderActive:.22,shadow:.08,shadowHover:.12,shadowActive:.1,rim:.38,rimSoft:.14,rimShadow:.26},d=`rgba(${c}, ${u.surface})`,h=`rgba(${c}, ${u.base})`,p=`rgba(${c}, ${u.highlight})`,b=`rgba(${c}, ${u.soft})`,m=`rgba(${c}, ${u.sheen})`,g=`rgba(${c}, ${u.accent})`,f=`rgba(${c}, ${u.border})`,_=`rgba(${c}, ${u.borderHover})`,v=`rgba(${c}, ${u.borderActive})`,y=`${Math.max(0,Math.round(.2*s))}, ${Math.max(0,Math.round(.2*n))}, ${Math.max(0,Math.round(.2*a))}`;return{rgb:r,surface:d,base:h,highlight:p,soft:b,sheen:m,accent:g,shadow:`rgba(${y}, ${u.shadow})`,shadowHover:`rgba(${y}, ${u.shadowHover})`,shadowActive:`rgba(${y}, ${u.shadowActive})`,shadowRgb:y,border:f,borderHover:_,borderActive:v,glow:`rgba(${c}, ${u.glow})`,rim:`rgba(${c}, ${u.rim})`,rimSoft:`rgba(${c}, ${u.rimSoft})`,rimShadow:`rgba(${y}, ${u.rimShadow})`}}_computeBorderColors(e,t=!1){const o=this._colorToRgb(e);if(!o)return null;const i=t?.78:.62,s=t?.88:.78,n=t?.82:.7;return{base:`rgba(${o.r}, ${o.g}, ${o.b}, ${i})`,hover:`rgba(${o.r}, ${o.g}, ${o.b}, ${s})`,active:`rgba(${o.r}, ${o.g}, ${o.b}, ${n})`}}_computeGlowPalette(e,t=!1){const o=this._colorToRgb(e);if(!o)return null;const i=t?this._boostColorIntensity(o,.4):o,s=this._mixWithWhite(i,t?.34:.58),n=`${s.r}, ${s.g}, ${s.b}`;return{glow:`rgba(${n}, ${t?.55:.3})`,rim:`rgba(${n}, ${t?.74:.48})`,rimSoft:`rgba(${n}, ${t?.34:.2})`,rimShadow:`rgba(${`${Math.max(0,Math.round(.2*i.r))}, ${Math.max(0,Math.round(.2*i.g))}, ${Math.max(0,Math.round(.2*i.b))}`}, ${t?.42:.26})`}}_computeIconTone(e,t=!1){if(!e)return e;const o=this._colorToRgb(e);if(!o)return e;if(!t)return this._rgbToCss({r:o.r,g:o.g,b:o.b},o.a);const i=this._boostColorIntensity(o,.35),s=this._mixWithWhite(i,.2);return this._rgbToCss(s,o.a)}_mixWithWhite({r:e,g:t,b:o},i=.5){const s=Math.min(Math.max(i,0),1),n=e=>Math.round(e+(255-e)*s);return{r:n(e),g:n(t),b:n(o)}}_boostColorIntensity({r:e,g:t,b:o,a:i},s=.18){const n=1+Math.max(s,0),a=e=>Math.min(255,Math.round(e*n)),r={r:a(e),g:a(t),b:a(o)};return"number"==typeof i&&(r.a=i),r}_rgbToCss({r:e,g:t,b:o},i=1){const s="number"==typeof i?Math.min(Math.max(Number(i.toFixed(3)),0),1):1;return s<1?`rgba(${e}, ${t}, ${o}, ${s})`:`rgb(${e}, ${t}, ${o})`}_colorToRgb(e){if(!e)return null;const t=/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/.exec(e);return t?{r:+t[1],g:+t[2],b:+t[3],a:+(t[4]??1)}:nt(e)}_fireHassAction(e,t){const o=this.subbuttons?.[e];if(!o||!o.entity_id)return;const i={entity:o.entity_id,tap_action:o.tap_action||{action:"toggle"},hold_action:o.hold_action||{action:"more-info"}},s=new Event("hass-action",{bubbles:!0,composed:!0});s.detail={config:i,action:t},this.dispatchEvent(s)}}at._colorCanvas=null,at._colorCtx=null,customElements.get("bubble-subbutton")||customElements.define("bubble-subbutton",at);class rt extends ie{static properties={hass:{type:Object},name:{type:String},area:{type:String},config:{type:Object},container:{type:Object},fitMode:{type:String},preset:{type:String,reflect:!0}};get stretchY(){return"liquid-glass"===this.preset?1.18:"soft-glass"===this.preset?1.16:1.12}constructor(){super(),this.name="",this.fitMode="both",this.preset="standard",this._raf=null,this._resizeObs=null,this._lastScale=null,this._lastBox=null,this._scaling=!1,this._fontVersion=0,this._settleTimer=null,this._settleUntil=0,this._hideUntil=0,this._forceNextScale=!1}_ensureFonts(){if("undefined"==typeof document)return;const e=document.head;if(e){if(!e.querySelector('link[rel="preconnect"][data-bubble-fonts="1"]')){const t=document.createElement("link");t.rel="preconnect",t.href="https://fonts.gstatic.com",t.crossOrigin="anonymous",t.setAttribute("data-bubble-fonts","1"),e.appendChild(t)}if(!e.querySelector('link[rel="stylesheet"][data-bubble-fonts="1"]')){const t=document.createElement("link");t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=Bebas+Neue&family=Barlow+Condensed:wght@900&family=Oswald:wght@700&display=swap",t.setAttribute("data-bubble-fonts","1"),t.addEventListener("load",()=>{this._fontVersion+=1,this._lastScale=null,this.reflowLayout({force:!0,duration:500})}),e.appendChild(t)}document.fonts?.load?.('900 32px "Big Shoulders Display"'),document.fonts?.load?.('900 32px "Barlow Condensed"'),document.fonts?.load?.('900 32px "Bebas Neue"'),document.fonts?.ready?.then(()=>{this._fontVersion+=1,this._lastScale=null,this.reflowLayout({force:!0,duration:500})}).catch(()=>{})}}firstUpdated(){this._ensureFonts(),this.reflowLayout({force:!0,duration:900,hideFor:140}),this._resizeObs=new ResizeObserver(e=>{if(this._scaling)return;const t=e[0];let o=0,i=0;if(t?.contentBoxSize){const e=Array.isArray(t.contentBoxSize)?t.contentBoxSize[0]:t.contentBoxSize;o=Math.round(e.inlineSize),i=Math.round(e.blockSize)}else{const e=this.getBoundingClientRect();o=Math.round(e.width),i=Math.round(e.height)}(!this._lastBox||Math.abs(o-this._lastBox.w)>2||Math.abs(i-this._lastBox.h)>2)&&(this._lastBox={w:o,h:i},this._scheduleScale())}),this._resizeObs.observe(this),window.addEventListener("resize",this._scheduleScale,{passive:!0})}updated(e){(e.has("name")||e.has("config")||e.has("container")||e.has("fitMode")||e.has("preset"))&&this._scheduleScale()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObs?.disconnect(),window.removeEventListener("resize",this._scheduleScale),this._raf&&cancelAnimationFrame(this._raf),this._settleTimer&&clearTimeout(this._settleTimer),this._raf=null,this._settleTimer=null}reflowLayout({force:e=!1,duration:t=0,hideFor:o=0}={}){const i=performance?.now?.()??Date.now();e&&(this._forceNextScale=!0,this._lastScale=null),o>0&&(this._hideUntil=Math.max(this._hideUntil||0,i+o)),t>0&&(this._settleUntil=Math.max(this._settleUntil||0,i+t),this._scheduleSettleScale()),this._scheduleScale()}_scheduleSettleScale(){if(this._settleTimer)return;const e=performance?.now?.()??Date.now();!this._settleUntil||e>=this._settleUntil||(this._settleTimer=setTimeout(()=>{this._settleTimer=null,this._forceNextScale=!0,this._lastScale=null,this._scheduleScale(),this._scheduleSettleScale()},90))}_scheduleScale=()=>{this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=requestAnimationFrame(()=>{this._raf=null,this._autoScaleFont()})}))};_autoScaleFont(){const e=this.renderRoot.querySelector(".bubble-name"),t=this.container||this.parentElement||this;if(!e||!t)return;const o=this.name??"",i=Math.max(0,Math.round(t.clientWidth)),s=Math.max(0,Math.round(t.clientHeight)),n=this.stretchY;if(i<=0||s<=0)return void requestAnimationFrame(()=>this._scheduleScale());const a=this._forceNextScale;if(this._forceNextScale=!1,!a&&this._lastScale&&this._lastScale.text===o&&this._lastScale.w===i&&this._lastScale.h===s&&this._lastScale.fitMode===this.fitMode&&this._lastScale.preset===this.preset&&this._lastScale.fontVersion===this._fontVersion)return void(e.style.visibility=this._shouldKeepHidden()?"hidden":"visible");this._scaling=!0,e.style.visibility="hidden",e.style.fontSize="10px",e.style.transform="none";const r=300,l=n>1?Math.round(.88*s/n):Math.round(.88*s);let c;if("height"===this.fitMode){let t=8,o=r;for(let i=0;i<10&&t<=o;i++){const i=t+o>>1;e.style.fontSize=`${i}px`,e.scrollHeight<=l?t=i+1:o=i-1}c=Math.max(8,Math.min(r,o)),e.style.fontSize=`${c}px`;const s=e.scrollWidth;s>i&&s>0&&(c=Math.floor(c*(i/s)))}else{let t=8,o=r;for(let i=0;i<10&&t<=o;i++){const i=t+o>>1;e.style.fontSize=`${i}px`,e.scrollHeight<=l?t=i+1:o=i-1}c=Math.max(8,Math.min(r,o)),e.style.fontSize=`${c}px`;let s=i/Math.max(1,Math.round(e.scrollWidth));for(;c>8&&s<.48;)c-=1,e.style.fontSize=`${c}px`,s=i/Math.max(1,Math.round(e.scrollWidth))}e.style.fontSize=`${c}px`;const u=i/Math.max(1,Math.round(e.scrollWidth)),d=Math.min(Math.max(.96*u,.48),.96);e.style.transform=`scaleX(${d}) scaleY(${n})`,e.style.transformOrigin="left top",e.style.visibility=this._shouldKeepHidden()?"hidden":"visible",this._lastScale={text:o,w:i,h:s,fitMode:this.fitMode,preset:this.preset,fontVersion:this._fontVersion},this._scaling=!1}_shouldKeepHidden(){const e=performance?.now?.()??Date.now();return this._hideUntil>0&&e<this._hideUntil}render(){return N`
      <div class="bubble-name" title="${this.name||""}">
        ${this.name}
      </div>
    `}static styles=n`
    :host { display: block; width: 100%; overflow: visible; }

    .bubble-name {
      display: inline-flex;
      align-items: flex-start;
      justify-content: flex-start;
      width: max-content;
      height: auto;
      line-height: 0.9;

      font-family:
        "Big Shoulders Display",
        "Barlow Condensed",
        "Bebas Neue",
        "Oswald",
        "Arial Narrow",
        Arial, sans-serif;
      font-weight: 900;
      letter-spacing: 0;
      font-stretch: condensed;

      text-align: left;
      white-space: nowrap;
      text-transform: uppercase;
      color: var(--bubble-room-name-color, white);
      visibility: hidden;

      /* transizione fluida cambio presenza */
      transition: color 0.3s ease;

      text-shadow:
        0 0 20px color-mix(in srgb, var(--bubble-room-name-color, white) 50%, transparent),
        0 2px 4px rgba(0, 0, 0, 0.4);

      margin: 0;
      padding: 0;
      user-select: none;
    }

    :host([preset='liquid-glass']) .bubble-name {
      font-family:
        "Big Shoulders Display",
        "Bebas Neue",
        "Arial Narrow",
        Arial, sans-serif;
      font-weight: 900;
      letter-spacing: 0em;
      line-height: 0.88;
      text-shadow:
        0 0 60px color-mix(in srgb, var(--bubble-room-name-color, white) 100%, transparent),
        0 0 28px color-mix(in srgb, var(--bubble-room-name-color, white) 70%, transparent),
        0 0 10px color-mix(in srgb, var(--bubble-room-name-color, white) 40%, transparent),
        0 2px 8px rgba(0, 0, 0, 0.45);
      /* luminosità/saturazione uniforme con sub-button: gestita dal colore passato via CSS var */
      filter: saturate(var(--bubble-room-name-saturation, 1)) brightness(var(--bubble-room-name-brightness, 1));
      transition: color 0.3s ease, filter 0.3s ease;
    }

    :host([preset='soft-glass']) .bubble-name {
      font-family:
        "Big Shoulders Display",
        "Barlow Condensed",
        "Bebas Neue",
        "Arial Narrow",
        Arial, sans-serif;
      font-weight: 900;
      letter-spacing: 0;
      line-height: 0.9;
      text-shadow:
        0 0 18px color-mix(in srgb, var(--bubble-room-name-color, white) 42%, transparent),
        0 2px 5px rgba(0, 0, 0, 0.36);
      filter: saturate(var(--bubble-room-name-saturation, 1)) brightness(var(--bubble-room-name-brightness, 1));
      transition: color 0.25s ease, filter 0.25s ease;
    }

    :host([preset='minimal']) .bubble-name {
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.34);
      filter: none;
      transition: color 0.18s ease;
    }
  `}customElements.get("bubble-name")||customElements.define("bubble-name",rt);class lt extends ie{static properties={sensors:{type:Array},preset:{type:String,reflect:!0},showIcons:{type:Boolean,attribute:"show-icons"}};constructor(){super(),this.sensors=[],this.preset="standard",this.showIcons=!1,this.rows=1,this.columns=1,this._resizeObserver=null,this._autoscaleScheduled=!1,this._lastBox={w:0,h:0},this._fontsReadyScheduled=!1,this._fontVersion=0,this._lastAutoscaleSignature="",this._settleTimer=null,this._settleUntil=0}connectedCallback(){super.connectedCallback(),this._updateLayout(),this._resizeObserver=new ResizeObserver(e=>{const t=e[0];let o=0,i=0;if(t&&t.contentBoxSize){const e=Array.isArray(t.contentBoxSize)?t.contentBoxSize[0]:t.contentBoxSize;o=Math.round(e.inlineSize),i=Math.round(e.blockSize)}else{const e=this.getBoundingClientRect();o=Math.round(e.width),i=Math.round(e.height)}(Math.abs(o-this._lastBox.w)>2||Math.abs(i-this._lastBox.h)>2)&&(this._lastBox={w:o,h:i},this._scheduleAutoscale())}),this._resizeObserver.observe(this)}firstUpdated(){this._ensureFonts(),this._scheduleAutoscaleWhenFontsReady(),this.reflowLayout(!0,850)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=null,this._autoscaleScheduled=!1,this._settleTimer&&clearTimeout(this._settleTimer),this._settleTimer=null}updated(e){(e.has("sensors")||e.has("showIcons")||e.has("preset"))&&this.reflowLayout(!0,250)}reflowLayout(e=!1,t=0){if(e&&(this._lastAutoscaleSignature=""),this._updateLayout(),t>0){const e=performance?.now?.()??Date.now();this._settleUntil=Math.max(this._settleUntil||0,e+t),this._scheduleAutoscaleSettle()}this._scheduleAutoscale()}_scheduleAutoscaleSettle(){if(this._settleTimer)return;const e=performance?.now?.()??Date.now();!this._settleUntil||e>=this._settleUntil||(this._settleTimer=setTimeout(()=>{this._settleTimer=null,this._lastAutoscaleSignature="",this._updateLayout(),this._scheduleAutoscale(),this._scheduleAutoscaleSettle()},90))}_updateLayout(){const e=this.sensors?.length||0;this.rows=e>5?2:1,this.columns=e>5?5:e||1}_scheduleAutoscale(){this._autoscaleScheduled||(this._autoscaleScheduled=!0,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this._autoscaleScheduled=!1,this._autoScaleValues()})}))}_ensureFonts(){if("undefined"==typeof document)return;const e=document.head;if(e){if(!e.querySelector('link[rel="preconnect"][data-bubble-fonts="1"]')){const t=document.createElement("link");t.rel="preconnect",t.href="https://fonts.gstatic.com",t.crossOrigin="anonymous",t.setAttribute("data-bubble-fonts","1"),e.appendChild(t)}if(!e.querySelector('link[rel="stylesheet"][data-bubble-fonts="1"]')){const t=document.createElement("link");t.rel="stylesheet",t.href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=Bebas+Neue&family=Barlow+Condensed:wght@900&family=Oswald:wght@700&display=swap",t.setAttribute("data-bubble-fonts","1"),t.addEventListener("load",()=>{this._fontVersion+=1,this._lastAutoscaleSignature="",this._scheduleAutoscale()}),e.appendChild(t)}}}_scheduleAutoscaleWhenFontsReady(){if(this._fontsReadyScheduled||"undefined"==typeof document)return;this._fontsReadyScheduled=!0;const e=document.fonts;e?.ready?(e.load?.('900 16px "Barlow Condensed"'),e.ready.then(()=>{this._fontVersion+=1,this._lastAutoscaleSignature="",this._scheduleAutoscale()}).catch(()=>this._scheduleAutoscale())):this._scheduleAutoscale()}_autoScaleValues(){const e=Array.from(this.renderRoot?.querySelectorAll(".sensor-pill")||[]);if(!e.length)return;const t=this._autoscaleSignature();if(t===this._lastAutoscaleSignature)return;let o=e[0],i=0;for(const t of e){const e=t.querySelector(".sensor-value")?.textContent??"",s=t.querySelector(".sensor-unit")?.textContent??"",n=t.querySelector(".sensor-label")?.textContent??"",a=t.querySelector(".sensor-icon")?2:0,r=e.length+.8*s.length+1.1*n.length+a;r>i&&(i=r,o=t)}const s=this._fitInPill(o),n=Math.max(5,Math.round(.68*s)),a=Math.max(5,Math.round(.68*s)),r=Math.max(5,Math.round(.82*s));for(const t of e){const e=t.querySelector(".sensor-value"),o=t.querySelector(".sensor-unit"),i=t.querySelector(".sensor-label"),l=t.querySelector(".sensor-icon");e&&(e.style.fontSize=`${s}px`,o&&(o.style.fontSize=`${n}px`),i&&(i.style.fontSize=`${a}px`),l&&(l.style.fontSize=`${r}px`,l.style.setProperty("--mdc-icon-size",`${r}px`)))}this._lastAutoscaleSignature=t}_autoscaleSignature(){const e=(this.sensors||[]).map(e=>[e?.entity,e?.value,e?.unit,e?.device_class,e?.icon,e?.color].join(":")).join("|");return[Math.round(this.clientWidth||0),Math.round(this.clientHeight||0),this.rows,this.columns,this.showIcons?1:0,this.preset,this._fontVersion,e].join("|")}_fitInPill(e){const t=e.querySelector(".sensor-value"),o=e.querySelector(".sensor-unit"),i=e.querySelector(".sensor-label"),s=e.querySelector(".sensor-icon");if(!t)return 10;const n=Math.round(this.clientWidth),a=Math.max(1,this.columns),r=n>0?Math.floor(n/a):Math.round(e.clientWidth);if(r<=0)return 10;const l=Math.max(0,r-12);if(l<=0)return 5;const c=Math.round(e.clientHeight||this.clientHeight||36),u=Math.max(10,c-4);let d=6,h=Math.min(40,Math.max(10,u+6)),p=d;for(let e=0;e<10&&d<=h;e++){const e=d+h>>1;if(t.style.fontSize=`${e}px`,o&&(o.style.fontSize=`${Math.max(5,Math.round(.68*e))}px`),i&&(i.style.fontSize=`${Math.max(5,Math.round(.68*e))}px`),s){const t=Math.max(5,Math.round(.82*e));s.style.fontSize=`${t}px`,s.style.setProperty("--mdc-icon-size",`${t}px`)}const n=t.offsetWidth,a=o?o.offsetWidth:0,r=i?i.offsetWidth:0,c=(s?s.offsetWidth:0)+r+n+(a>0?1+a:0),b=Math.max(t.scrollHeight||t.offsetHeight||0,o&&(o.scrollHeight||o.offsetHeight)||0,i&&(i.scrollHeight||i.offsetHeight)||0,s&&(s.scrollHeight||s.offsetHeight)||0);c<=l&&b<=u?(p=e,d=e+1):h=e-1}return p}_formatValueForDisplay(e,t=1,o=!0){if(null==e)return"--";if("number"==typeof e&&Number.isFinite(e))return o&&Number.isInteger(e)?String(e):e.toFixed(t);if("string"==typeof e){const i=e.replace(",",".").match(/-?\d+(?:\.\d+)?/);if(i){const e=Number(i[0]);if(Number.isFinite(e))return o&&Number.isInteger(e)?String(e):e.toFixed(t)}return e.trim()}return String(e)}_openMoreInfo(e){if(!e||"string"!=typeof e)return;const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});(document.querySelector("home-assistant")||this).dispatchEvent(t)}static styles=n`
    :host {
      display: flex;
      align-items: stretch;
      height: 100%;
      min-height: 0;
      max-height: 100%;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }
    .sensor-grid {
      display: grid;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 1px 3px;
      margin: 0;
      gap: 0;
    }

    :host([preset='liquid-glass']) .sensor-grid {
      border-radius: 11px;
      overflow: hidden;
      position: relative;
      isolation: isolate;
      /* padding verticale: crea lo spazio visivo della bolla attorno al testo */
      padding: 1px 3px;

      backdrop-filter: blur(20px) saturate(2.2) brightness(1.05);
      -webkit-backdrop-filter: blur(20px) saturate(2.2) brightness(1.05);

      /* colore puro della stanza come base */
      background: color-mix(in srgb, var(--bubble-sensor-active-color, white) 26%, rgba(255, 255, 255, 0.06));

      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.30),
        inset 0 -1px 0 rgba(0, 0, 0, 0.08),
        0 2px 10px rgba(0, 0, 0, 0.16);
      border: 1px solid color-mix(in srgb, var(--bubble-sensor-active-color, white) 48%, transparent);

      transition: background 0.3s ease, border-color 0.3s ease;
    }

    :host([preset='liquid-glass']) .sensor-grid::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      /* highlight overlay in alto + glow colorato in basso */
      background:
        linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.45) 0%,
          rgba(255, 255, 255, 0.10) 35%,
          transparent 55%
        ),
        radial-gradient(
          ellipse 120% 70% at 50% 118%,
          color-mix(in srgb, var(--bubble-sensor-active-color, white) 40%, transparent),
          transparent 65%
        );
      mix-blend-mode: overlay;
      opacity: 0.85;
      z-index: 0;
    }

    :host([preset='liquid-glass']) .sensor-pill {
      position: relative;
      z-index: 1;
      background: transparent;
      border-right: none;
    }

    :host([preset='soft-glass']) .sensor-grid {
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      isolation: isolate;
      padding: 0;
      backdrop-filter: blur(8px) saturate(1.25);
      -webkit-backdrop-filter: blur(8px) saturate(1.25);
      background: color-mix(in srgb, var(--bubble-sensor-active-color, white) 32%, rgba(255, 255, 255, 0.06));
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.22),
        0 4px 14px rgba(0, 0, 0, 0.16);
      border: 2px solid color-mix(in srgb, var(--bubble-sensor-active-color, white) 48%, transparent);
      transition: background 0.25s ease, border-color 0.25s ease;
    }

    :host([preset='soft-glass']) .sensor-grid::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), transparent 48%);
      opacity: 0.65;
      z-index: 0;
    }

    :host([preset='soft-glass']) .sensor-pill {
      position: relative;
      z-index: 1;
      background: transparent;
      border-right: none;
      text-shadow:
        0 1px 2px rgba(0, 0, 0, 0.36),
        0 0 6px color-mix(in srgb, currentColor 24%, transparent);
    }

    :host([preset='minimal']) .sensor-grid {
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      padding: 1px 3px;
      background: color-mix(in srgb, var(--bubble-sensor-active-color, white) 18%, rgba(255, 255, 255, 0.04));
      border: 2px solid color-mix(in srgb, var(--bubble-sensor-active-color, white) 44%, transparent);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
      transition: background 0.18s ease, border-color 0.18s ease;
    }

    :host([preset='minimal']) .sensor-pill {
      position: relative;
      z-index: 1;
      background: transparent;
      border-right: none;
      text-shadow: none;
    }

    :host([preset='minimal']) .sensor-value {
      color: color-mix(in srgb, var(--bubble-sensor-value-color, currentColor) 82%, white);
      filter: brightness(1.12) saturate(1.08);
      text-shadow: none;
    }

    :host([preset='minimal']) .sensor-unit,
    :host([preset='minimal']) .sensor-label,
    :host([preset='minimal']) .sensor-icon {
      filter: none;
      text-shadow: none;
    }

    .sensor-pill {
      display: flex;
      align-items: center;
      min-width: 0;
      background: transparent;
      border: 0;
      border-radius: 0;
      font-size: 1em;
      font-family: "Barlow Condensed", "Roboto Condensed", "Arial Narrow", system-ui, sans-serif;
      font-weight: 800;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      min-height: 0;
      cursor: pointer;
      padding: 1px 3px 0;
      justify-content: center;
      text-align: center;
      border-right: none;
      gap: 3px;
      -webkit-font-smoothing: antialiased;
      text-rendering: geometricPrecision;
      text-shadow:
        0 1px 2px rgba(0, 0, 0, 0.48),
        0 0 10px color-mix(in srgb, currentColor 42%, transparent);
    }
    .sensor-pill:last-child {
      border-right: none;
    }
    .sensor-label {
      font-weight: 750;
      font-size: 0.5em;           /* sarà scalata via JS */
      line-height: 1;
      display: inline-block;
      flex: 0 0 auto;
      opacity: 0.85;
      filter: brightness(1.14) saturate(1.08);
    }
    .sensor-icon {
      flex: 0 0 auto;
      opacity: 0.9;
      filter:
        drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45))
        brightness(1.08)
        saturate(1.12);
    }
    .sensor-value {
      font-weight: 900;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0;
      line-height: 1;
      flex: 0 0 auto;
      color: color-mix(in srgb, var(--bubble-sensor-value-color, currentColor) 78%, white);
      filter: brightness(1.38) saturate(1.26);
      text-shadow:
        0 1px 2px rgba(0, 0, 0, 0.42),
        0 0 8px color-mix(in srgb, var(--bubble-sensor-value-color, currentColor) 56%, transparent),
        0 0 14px color-mix(in srgb, var(--bubble-sensor-value-color, currentColor) 32%, transparent);
    }
    .sensor-unit {
      font-weight: 750;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
      margin-left: 1px;
      flex: 0 0 auto;
      opacity: 0.75;
      color: color-mix(in srgb, var(--bubble-sensor-value-color, currentColor) 78%, white);
      filter: brightness(1.12);
    }
  `;render(){const e=(this.sensors||[]).map(e=>{const t=e.device_class,o=Me[t]||{},i=o.emoji||"❓",s=e.unit||o.units?.[0]||"",n=this._formatValueForDisplay(e.value,1,!0);return{...e,value:n,label:i,unit:s}});return N`
      <div
        class="sensor-grid"
        style="
          grid-template-columns: repeat(${this.columns}, 1fr);
          grid-template-rows: repeat(${this.rows}, 1fr);
        "
      >
        ${e.map(e=>{const t=e.entity||e.entity_id||"",o=t?`Show history graph: ${t}`:"Show history graph";return N`
            <div
              class="sensor-pill"
              style="color:${e.color||"#e3f6ff"}"
              title="${o}"
              role="button"
              tabindex="0"
              @click=${()=>this._openMoreInfo(t)}
              @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||this._openMoreInfo(t)}}
            >
              ${this.showIcons&&e.icon?N`<ha-icon class="sensor-icon" .icon="${e.icon}"></ha-icon>`:""}
              ${this.showIcons?N`<span class="sensor-label">${e.label||""}</span>`:""}
              <span class="sensor-value">${e.value??"--"}</span>
              <span class="sensor-unit">${e.unit||""}</span>
            </div>
          `})}
      </div>
    `}}customElements.get("bubble-sensor")||customElements.define("bubble-sensor",lt);class ct extends ie{static properties={entities:{type:Array},preset:{type:String,reflect:!0}};constructor(){super(),this.entities=[],this.preset="standard",this._containerSize={width:0,height:0},this._rafSize=null,this._ripplingKeys=new Set,this._ro=new ResizeObserver(e=>{const t=e[0]?.contentRect;t&&(this._rafSize&&cancelAnimationFrame(this._rafSize),this._rafSize=requestAnimationFrame(()=>{const e=Math.round(t.width),o=Math.round(t.height);e===this._containerSize.width&&o===this._containerSize.height||(this._containerSize={width:e,height:o},this.requestUpdate())}))}),this._lastTapTs=0,this._gesture=ot({onTap:e=>this._handleTap(e),onHold:e=>this._dispatchAction(e,"hold")})}connectedCallback(){super.connectedCallback(),this._ro.observe(this),requestAnimationFrame(()=>this.reflowLayout(!0))}disconnectedCallback(){this._rafSize&&cancelAnimationFrame(this._rafSize),this._ro.disconnect(),super.disconnectedCallback()}_getAnimClass(e){const t=e?.animation;return!1===t?.enabled?"":t?.type&&"auto"!==t.type?t.type:we(e?.icon,e?.kind)}reflowLayout(e=!1){this._updateSize(e)}_updateSize(e=!1){const t=this.getBoundingClientRect(),o=Math.round(t.width),i=Math.round(t.height);(e||o!==this._containerSize.width||i!==this._containerSize.height)&&(this._containerSize={width:o,height:i},this.requestUpdate())}_handleClick(e){this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:{entity:e.entity_id,tap_action:e.tap_action||{action:"toggle"},hold_action:e.hold_action||{action:"more-info"}},action:"tap"},bubbles:!0,composed:!0}))}_dispatchAction(e,t){const o={entity:e.entity_id||e.entity||e,tap_action:e.tap_action||{action:"toggle"},hold_action:e.hold_action||{action:"more-info"},double_tap_action:e.double_tap_action};this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:o,action:t},bubbles:!0,composed:!0}))}_onPointerDown(e,t){e.preventDefault();const o=t.entity_id||t.kind||"unknown";this._ripplingKeys.add(o),this.requestUpdate(),setTimeout(()=>{this._ripplingKeys.delete(o),this.requestUpdate()},500),this._gesture.onDown(t)}_onPointerUp(e,t){e.preventDefault(),this._gesture.onUp(t)}_onPointerCancel(){this._gesture.onCancel()}_handleTap(e){const t=Date.now();if(e?.double_tap_action&&t-this._lastTapTs<300)return this._lastTapTs=0,void this._dispatchAction(e,"double_tap");this._lastTapTs=t,setTimeout(()=>{Date.now()-this._lastTapTs>=280&&this._dispatchAction(e,"tap")},280)}static styles=n`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
      contain: strict;
      z-index: 3;
      pointer-events: none;
    }
    .mushroom-entity {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
      pointer-events: auto;
      border-radius: 50%;
      overflow: hidden;
      transition: color 0.3s ease, filter 0.3s ease, opacity 0.3s ease;
    }

    :host([preset='liquid-glass']) .mushroom-entity.is-active {
      filter: saturate(1.15) brightness(1.1);
      opacity: 1.0;
      background: transparent;
      box-shadow: none;
    }

    :host([preset='liquid-glass']) .mushroom-entity.is-inactive {
      filter: saturate(0.55) brightness(1.10);
      opacity: 0.88;
      background: transparent;
      box-shadow: none;
    }

    :host([preset='soft-glass']) .mushroom-entity.is-active {
      filter: saturate(1.05) brightness(1.04) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.16));
      opacity: 1.0;
      background: transparent;
      box-shadow: none;
    }

    :host([preset='soft-glass']) .mushroom-entity.is-inactive {
      filter: saturate(0.72) brightness(0.96);
      opacity: 0.82;
      background: transparent;
      box-shadow: none;
    }

    :host([preset='minimal']) .mushroom-entity.is-active {
      filter: none;
      opacity: 1;
      background: transparent;
      box-shadow: none;
    }

    :host([preset='minimal']) .mushroom-entity.is-inactive {
      filter: none;
      opacity: 0.62;
      background: transparent;
      box-shadow: none;
    }

    .mushroom-entity ha-icon { display: block; }

    /* ── animazioni ── */

    /* ventilatori, eliche, rotori */
    @keyframes mushroom-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* lampadine, lampade — flash del riflesso */
    @keyframes mushroom-illuminate {
      0%, 79%  { clip-path: inset(0 0 0 0); }
      80%, 100%{ clip-path: polygon(0% 99%, 20% 55%, 22% 37%, 39% 20%, 61% 21%, 77% 35%, 79% 57%, 99% 100%); }
    }

    /* campanelli, allarmi — scuotimento con smorzamento */
    @keyframes mushroom-alarm {
      0%, 80%, 100% { transform: translateY(0); }
      10% { transform: translateY(-2px) rotate(-27deg); }
      20% { transform: translateY(-2px) rotate(21deg); }
      30% { transform: translateY(-2px) rotate(-15deg); }
      40% { transform: translateY(-2px) rotate(9deg); }
      50% { transform: translateY(0); }
      60% { transform: translateY(-1.2px); }
    }

    /* sensori di movimento — blink a passo */
    @keyframes mushroom-blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.08; }
    }

    /* speaker, musica — pulsazione heartbeat */
    @keyframes mushroom-beat {
      0%  { transform: scale(1); }
      10% { transform: scale(1.1); }
      17% { transform: scale(1.05); }
      33% { transform: scale(1.25); }
      60% { transform: scale(1); }
    }

    /* telecamera — pan/scan laterale */
    @keyframes mushroom-scan {
      0%, 100% { transform: rotate(20deg); }
      50%       { transform: rotate(-15deg); }
    }

    /* elettrodomestici — vibrazione */
    @keyframes mushroom-shake {
      0%, 100% { transform: translate(0, 0) rotate(0); }
      20%       { transform: translate(0.4px, -0.4px) rotate(-4deg); }
      40%       { transform: translate(-0.4px,  0.4px) rotate(4deg); }
      60%       { transform: translate(0.4px,  0.4px) rotate(-4deg); }
      80%       { transform: translate(-0.4px, -0.4px) rotate(4deg); }
    }

    /* animali domestici — rimbalzo elastico */
    @keyframes mushroom-bounce {
      0%, 100% { transform: translateY(0) scaleY(0.9); }
      80%       { transform: translateY(-20%) scaleY(1); }
    }

    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-spin ha-icon {
      animation: mushroom-spin 1.4s linear infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-illuminate ha-icon {
      animation: mushroom-illuminate 2.5s ease-in-out infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-alarm ha-icon {
      animation: mushroom-alarm 0.9s ease infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-blink ha-icon {
      animation: mushroom-blink 1.1s step-end infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-beat ha-icon {
      animation: mushroom-beat 1.3s ease-out infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-scan ha-icon {
      animation: mushroom-scan 5s ease-in-out infinite;
      transform-origin: 90% 80%;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-shake ha-icon {
      animation: mushroom-shake 400ms ease-in-out infinite;
    }
    :host([preset='liquid-glass']) .mushroom-entity.is-active.anim-bounce ha-icon {
      animation: mushroom-bounce 0.7s cubic-bezier(0.30, 2.40, 0.85, 2.50) infinite;
      transform-origin: 50% 100%;
    }

    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-spin ha-icon {
      animation: mushroom-spin 1.4s linear infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-illuminate ha-icon {
      animation: mushroom-illuminate 2.5s ease-in-out infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-alarm ha-icon {
      animation: mushroom-alarm 0.9s ease infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-blink ha-icon {
      animation: mushroom-blink 1.1s step-end infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-beat ha-icon {
      animation: mushroom-beat 1.3s ease-out infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-scan ha-icon {
      animation: mushroom-scan 5s ease-in-out infinite;
      transform-origin: 90% 80%;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-shake ha-icon {
      animation: mushroom-shake 400ms ease-in-out infinite;
    }
    :host([preset='soft-glass']) .mushroom-entity.is-active.anim-bounce ha-icon {
      animation: mushroom-bounce 0.7s cubic-bezier(0.30, 2.40, 0.85, 2.50) infinite;
      transform-origin: 50% 100%;
    }

    @keyframes mushroom-ripple {
      from { transform: scale(0); opacity: 0.55; }
      to   { transform: scale(2.8); opacity: 0; }
    }
    .ripple {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: currentColor;
      animation: mushroom-ripple 0.45s ease-out forwards;
      pointer-events: none;
    }
  `;render(){const{width:e,height:t}=this._containerSize;if(!e||!t)return N``;const o=Math.min(e,1.6*t),i=.25*(.5*(t+o)),s=.6*e,n=.6*t,a=s*Math.min(1,e/(2*s)),r=n*Math.min(1,t/(2*n)),l=e-a,c=.5*t,u=Math.max(0,a-i/2-1),d=Math.max(0,r-i/2-1),h=e=>Math.PI*e/180,p=h(30),b=h(85),m=.75*i,g=.75*i,f=[{x:i/2+1,y:i/2+1},{x:l+u*Math.cos(-b),y:c+d*Math.sin(-b)},{x:l+u*Math.cos(-p),y:c+d*Math.sin(-p)},{x:l+u*Math.cos(+p),y:c+d*Math.sin(+p)},{x:l+u*Math.cos(+b),y:c+d*Math.sin(+b)}];let _=0;return N`
      ${this.entities.map(o=>{const s="camera"===o?.kind,n="climate"===o?.kind,a=s?m:n?g:i,r=.95*a;let u;s?u={x:e-a/2,y:a/2}:n?u={x:a/2+1,y:t-a/2-1}:(u=f[Math.min(_,f.length-1)]??{x:l,y:c},_++);const d=s||n?0:o.dx??0,h=s||n?0:o.dy??0,p=u.x+d,b=u.y+h,v=o.entity_id||o.kind||"unknown",y=this._ripplingKeys.has(v),x=o.active?this._getAnimClass(o):"",$="liquid-glass"===this.preset||"soft-glass"===this.preset||"minimal"===this.preset?o.active?`is-active ${x}`:"is-inactive":"";return N`
          <div
            class="mushroom-entity ${$}"
            style="
              left:${p}px;
              top:${b}px;
              width:${a}px;
              height:${a}px;
              color:${o.color};
            "
            @pointerdown=${e=>this._onPointerDown(e,o)}
            @pointerup=${e=>this._onPointerUp(e,o)}
            @pointercancel=${this._onPointerCancel}
            @pointerleave=${this._onPointerCancel}
            @contextmenu=${e=>e.preventDefault()}
          >
            ${y?N`<span class="ripple"></span>`:""}
            <ha-icon icon="${o.icon||$e(o.entity_id,this.hass)}" style="--mdc-icon-size:${r}px;"></ha-icon>
          </div>
        `})}
    `}}customElements.get("bubble-mushroom")||customElements.define("bubble-mushroom",ct);class ut extends ie{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String},backgroundActive:{type:String},backgroundInactive:{type:String},preset:{type:String,reflect:!0},entity_id:{type:String},tap_action:{type:Object},hold_action:{type:Object}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16",this.backgroundActive="rgba(33,223,115,0.1)",this.backgroundInactive="rgba(23,60,22,0.1)",this.preset="standard",this.entity_id="",this.tap_action={action:"more-info"},this.hold_action={action:"none"},this._gesture=ot({onTap:()=>this._fireHassAction("tap"),onHold:()=>this._fireHassAction("hold")})}static styles=n`
    :host {
      position: absolute;
      display: block;
      inset: 0;
      box-sizing: border-box;
      z-index: 1;
    }
    .container {
      box-sizing: border-box;
      border-radius: var(--bubble-main-icon-border-radius, 0 70% 70% 0);
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      /* transizione colore/sfondo al cambio stato presenza */
      transition: background 0.3s ease, color 0.3s ease, transform 0.1s;
      position: relative;
      overflow: hidden;
      background: var(--bubble-main-icon-bg, transparent);
    }
    .container:active .icon {
      transform: scale(0.98);
    }
    .icon {
      --mdc-icon-size: var(--main-icon-size, 160px);
      width: var(--mdc-icon-size);
      height: var(--mdc-icon-size);
      transform: translateX(var(--icon-shift-x, -20%));
      transition: transform .18s ease, opacity .18s ease;
    }

    :host([preset='liquid-glass']) .container {
      color: var(--bubble-main-icon-color, currentColor);
      border: none;

      /* colore entità puro come base — no background-blend che sbiadisce */
      background: var(--bubble-main-icon-bg, rgba(255, 255, 255, 0.06));

      /* catch-light sull'edge superiore */
      box-shadow:
        inset 0 1.5px 0 rgba(255, 255, 255, 0.35),
        inset 0 -1px 0 rgba(0, 0, 0, 0.12),
        0 10px 40px rgba(0, 0, 0, 0.28),
        0 2px 10px rgba(0, 0, 0, 0.18);

      /* saturate più alto: estrae i colori reali dal backdrop */
      backdrop-filter: blur(32px) saturate(2.4) brightness(1.05);
      -webkit-backdrop-filter: blur(32px) saturate(2.4) brightness(1.05);
      transition: background 0.35s ease, box-shadow 0.35s ease, filter 0.35s ease;
      filter:
        saturate(var(--bubble-main-icon-saturation, 1))
        brightness(var(--bubble-main-icon-luminance, 1));
      isolation: isolate;
    }

    :host([preset='liquid-glass']) .container::before,
    :host([preset='liquid-glass']) .container::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      transition: opacity 0.35s ease;
    }

    /* striscia riflessiva: overlay esalta il colore sottostante invece di sbiadirlo */
    :host([preset='liquid-glass']) .container::before {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.55) 0%,
        rgba(255, 255, 255, 0.15) 35%,
        transparent 55%
      );
      opacity: 0.85;
      mix-blend-mode: overlay;
    }

    /* glow ambientale addittivo dal colore dell'entità */
    :host([preset='liquid-glass']) .container::after {
      background: radial-gradient(
        ellipse 120% 70% at 50% 118%,
        var(--bubble-main-icon-bg, rgba(255, 255, 255, 0.10)),
        transparent 65%
      );
      mix-blend-mode: screen;
      opacity: 1.0;
    }

    :host([preset='liquid-glass']) .container:hover::before {
      opacity: 1.0;
    }

    :host([preset='liquid-glass']) .container:hover::after {
      opacity: 1.0;
    }

    :host([preset='liquid-glass']) .container:active {
      box-shadow:
        0 6px 24px rgba(0, 0, 0, 0.32),
        0 1px 6px rgba(0, 0, 0, 0.22);
      border: none;
    }

    :host([preset='liquid-glass']) .container:hover {
      border: none;
    }

    :host([preset='liquid-glass']) .icon {
      filter:
        drop-shadow(0 16px 32px rgba(var(--bubble-main-icon-shadow-rgb, 13, 22, 41), 0.2))
        brightness(var(--bubble-main-icon-icon-brightness, 1))
        saturate(var(--bubble-main-icon-icon-saturation, 1));
      transition: filter 0.35s ease, opacity 0.18s ease, transform 0.18s ease;
    }

    :host([preset='soft-glass']) .container {
      color: var(--bubble-main-icon-color, currentColor);
      border: 2px solid color-mix(in srgb, var(--bubble-main-icon-color, white) 48%, transparent);
      background: color-mix(in srgb, var(--bubble-main-icon-color, white) 32%, rgba(255, 255, 255, 0.06));
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.22),
        0 4px 14px rgba(0, 0, 0, 0.16);
      backdrop-filter: blur(8px) saturate(1.25);
      -webkit-backdrop-filter: blur(8px) saturate(1.25);
      transition: background 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
      filter:
        saturate(var(--bubble-main-icon-saturation, 1))
        brightness(var(--bubble-main-icon-luminance, 1));
    }

    :host([preset='soft-glass']) .container::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), transparent 48%);
      opacity: 0.65;
    }

    :host([preset='soft-glass']) .icon {
      filter:
        drop-shadow(0 5px 10px rgba(var(--bubble-main-icon-shadow-rgb, 13, 22, 41), 0.14))
        brightness(var(--bubble-main-icon-icon-brightness, 1))
        saturate(var(--bubble-main-icon-icon-saturation, 1));
      transition: filter 0.25s ease, opacity 0.18s ease, transform 0.18s ease;
    }

    :host([preset='minimal']) .container {
      color: var(--bubble-main-icon-color, currentColor);
      border: 2px solid color-mix(in srgb, var(--bubble-main-icon-color, white) 44%, transparent);
      background: color-mix(in srgb, var(--bubble-main-icon-color, white) 18%, rgba(255, 255, 255, 0.04));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
      transition: background 0.18s ease, border-color 0.18s ease;
      filter: none;
    }

    :host([preset='minimal']) .icon {
      filter: none;
      transition: opacity 0.18s ease, transform 0.18s ease;
    }
  `;render(){const e=this.active?this.colorActive:this.colorInactive,t=this.active?this.backgroundActive:this.backgroundInactive,o="liquid-glass"===this.preset,i="soft-glass"===this.preset,s="minimal"===this.preset,n=o||i,a=o?this.active?.52:.38:i?this.active?.32:.2:s&&this.active?.18:.1,r=this._withOpacity(t,a)??t,l=this.active?.9:.8,c=[];r&&c.push(`--bubble-main-icon-bg:${r}`),e&&(c.push(`color:${e}`),n||c.push(`--bubble-main-icon-border:${e}`),c.push(`--bubble-main-icon-color:${e}`)),n&&this.active?(c.push("--bubble-main-icon-saturation:1.12"),c.push("--bubble-main-icon-luminance:1.04"),c.push("--bubble-main-icon-icon-brightness:"+(o?"1.25":"1.12")),c.push("--bubble-main-icon-icon-saturation:1.12")):n&&!this.active&&(c.push("--bubble-main-icon-saturation:"+(o?"0.72":"0.82")),c.push("--bubble-main-icon-luminance:"+(o?"0.90":"0.94")),c.push("--bubble-main-icon-icon-brightness:"+(o?"0.92":"0.96")),c.push("--bubble-main-icon-icon-saturation:"+(o?"0.78":"0.86")));const u=c.map(e=>`${e};`).join(" ");return N`
      <div
        class="container"
        style="${u}"
        @pointerdown=${this._onDown}
        @pointerup=${this._onUp}
        @pointerleave=${this._clearHoldTimer}
        @pointercancel=${this._clearHoldTimer}
      >
        <ha-icon
          class="icon"
          icon="${this.icon||"mdi:checkbox-blank-circle-outline"}"
          style="color:${e};opacity:${l}"
        ></ha-icon>
      </div>
    `}_withOpacity(e,t){if(!e)return null;const o=/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)/.exec(e);return o?`rgba(${o[1]},${o[2]},${o[3]},${t})`:function(e,t){const o=nt(e);return o?`rgba(${o.r}, ${o.g}, ${o.b}, ${t})`:null}(e,t)}_onDown=()=>this._gesture.onDown();_onUp=()=>this._gesture.onUp();_clearHoldTimer=()=>this._gesture.clearTimer();_fireHassAction(e){const t=(("hold"===e?this.hold_action:this.tap_action)||{action:"more-info"}).action||"more-info";if(("toggle"===t||"call-service"===t||"more-info"===t)&&!this.entity_id)return;const o=new Event("hass-action",{bubbles:!0,composed:!0});o.detail={config:{entity:this.entity_id,tap_action:this.tap_action||{action:"more-info"},hold_action:this.hold_action||{action:"none"}},action:e},this.dispatchEvent(o)}}customElements.get("bubble-icon")||customElements.define("bubble-icon",ut);class dt extends ie{static properties={config:{type:Object},hass:{type:Object}};_entities={};constructor(){super(),this.config={},this.hass={},this._trackedEntityIds=new Set,this._viewCache=new Map,this._layoutSettleTimer=null,this._layoutSettleRaf=null,this._layoutSettleUntil=0}setConfig(e){this.config={layout:"wide",...e},this._entities=structuredClone(this.config.entities||{}),this._entities.camera=this._entities.camera||{entity:"",icon:""},this._entities.camera.presence||(this._entities.camera.presence={entity:""}),this._entities.climate=this._entities.climate||{entity:"",icon:""},this._trackedEntityIds=this._collectTrackedEntityIds(),this._viewCache.clear()}get hass(){return this._hass}set hass(e){const t=this._hass;this._hass=e,e?.states&&(t?.states&&!this._hasTrackedStateChanged(t,e)||this.requestUpdate?.())}_collectTrackedEntityIds(){const e=new Set,t=t=>{"string"==typeof t&&t.includes(".")&&e.add(t)},o=this.config?.entities||{};t(o.presence?.entity),t(o.camera?.entity),t(o.camera?.presence?.entity),t(o.climate?.entity);for(let e=1;e<=8;e++)t(o[`sensor${e}`]?.entity);for(let e=1;e<=8;e++)t(o[`mushroom${e}`]?.entity);for(const e of this.config?.subbuttons||[])t(e?.entity_id||e?.entity);return e}_hasTrackedStateChanged(e,t){if(!this._trackedEntityIds?.size)return!0;for(const o of this._trackedEntityIds){const i=e?.states?.[o],s=t?.states?.[o];if(this._stateSignature(i)!==this._stateSignature(s))return!0}return!1}_stateSignature(e){return e?`${e.state}|${e.last_changed}|${e.last_updated}|${JSON.stringify(e.attributes||{})}`:""}_cachedView(e,t,o){const i=this._viewCache.get(e);if(i?.signature===t)return i.value;const s=o();return this._viewCache.set(e,{signature:t,value:s}),s}_statesSignature(e){return(e||[]).filter(Boolean).map(e=>`${e}:${this._stateSignature(this.hass?.states?.[e])}`).join("|")}static getStubConfig(){return{type:"custom:bubble-room",layout:"wide",name:[],area:[],sensors:[],mushrooms:[],subbuttons:[],colors:{subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return tt}),document.createElement("bubble-room-editor")}connectedCallback(){super.connectedCallback(),this._resizeObs=new ResizeObserver(()=>{this.requestUpdate(),this._startLayoutSettle(250)})}firstUpdated(){const e=this.shadowRoot?.querySelector(".icon-mushroom-area");e&&this._resizeObs.observe(e),this._startLayoutSettle(1e3)}disconnectedCallback(){this._resizeObs?.disconnect(),this._layoutSettleTimer&&clearTimeout(this._layoutSettleTimer),this._layoutSettleRaf&&cancelAnimationFrame(this._layoutSettleRaf),this._layoutSettleTimer=null,this._layoutSettleRaf=null,super.disconnectedCallback()}updated(e){e.has("config")&&(this._entities=structuredClone(this.config.entities||{}),this._trackedEntityIds=this._collectTrackedEntityIds(),this._viewCache.clear(),this._startLayoutSettle(700))}_startLayoutSettle(e=700){const t=performance?.now?.()??Date.now();this._layoutSettleUntil=Math.max(this._layoutSettleUntil||0,t+e),this._scheduleLayoutSettleTick()}_scheduleLayoutSettleTick(){if(this._layoutSettleRaf||this._layoutSettleTimer)return;const e=performance?.now?.()??Date.now();!this._layoutSettleUntil||e>=this._layoutSettleUntil||(this._layoutSettleRaf=requestAnimationFrame(()=>{this._layoutSettleRaf=null,this.requestUpdate(),this.updateComplete.then(()=>{this._reflowVisualChildren();(performance?.now?.()??Date.now())>=this._layoutSettleUntil||(this._layoutSettleTimer=setTimeout(()=>{this._layoutSettleTimer=null,this._scheduleLayoutSettleTick()},90))}).catch(()=>{})}))}_reflowVisualChildren(){const e=this.renderRoot;e?.querySelector("bubble-name")?.reflowLayout?.({force:!0,duration:250}),e?.querySelector("bubble-sensor")?.reflowLayout?.(!0,250),e?.querySelector("bubble-mushroom")?.reflowLayout?.(!0),e?.querySelector("bubble-icon")?.requestUpdate?.()}_getSubButtons(){const e=this.config.subbuttons||[],t=e.map(e=>e?.entity_id||e?.entity).filter(Boolean),o=JSON.stringify({subbuttons:e,colors:this.config.colors?.subbutton||{},states:this._statesSignature(t)});return this._cachedView("subbuttons",o,()=>{const t=this.config.colors?.subbutton?.background_on??"#00d46d",o=this.config.colors?.subbutton?.background_off??"#999",i=this.config.colors?.subbutton?.icon_on??"yellow",s=this.config.colors?.subbutton?.icon_off??"#666";return e.map(e=>{const n=this.hass.states?.[e.entity_id];return{icon:e.icon||$e(e.entity_id,this.hass),active:"on"===n?.state,colorOn:t,colorOff:o,iconOn:i,iconOff:s,entity_id:e.entity_id,tap_action:e.tap_action,hold_action:e.hold_action,animation:e.animation}})})}_isRoomActive(){const e=this.config?.entities?.presence?.entity;if(!e)return!1;const t=this.hass?.states?.[e]?.state;return["on","home","occupied","motion","detected"].includes(t)}_getMainIconSize(){const e=this.shadowRoot?.querySelector(".icon-mushroom-area");return e?Math.round(.58*Math.min(e.clientWidth,e.clientHeight)):0}_getSensors(){const e=this._entities||{},t=[];for(let o=1;o<=8;o++)t.push(e[`sensor${o}`]?.entity);const o=this.config?.entities?.presence?.entity,i=JSON.stringify({sensorIds:t,presenceId:o,sensorColors:this.config.colors?.sensor||{},roomColors:this.config.colors?.room||{},states:this._statesSignature([...t,o])});return this._cachedView("sensors",i,()=>{const t=this.config.colors?.sensor?.sensor_active??this.config.colors?.room?.icon_active??"#21df73",o=this.config.colors?.sensor?.sensor_inactive??this.config.colors?.room?.icon_inactive??"#173c16",i=this._isRoomActive()?t:o,s=[];for(let t=1;t<=6;t++){const o=e[`sensor${t}`]?.entity,n=this.hass?.states?.[o];o&&n&&s.push({icon:n.attributes.icon||"",value:n.state,unit:n.attributes.unit_of_measurement,device_class:n.attributes.device_class,color:i,entity:o})}return s})}_getMushrooms(){const e=this._entities||{},t=[];for(let o=1;o<=8;o++)t.push(e[`mushroom${o}`]?.entity);t.push(e.camera?.entity,e.camera?.presence?.entity,e.climate?.entity);const o=JSON.stringify({entities:{mushrooms:Array.from({length:8},(t,o)=>e[`mushroom${o+1}`]||{}),camera:e.camera||{},climate:e.climate||{}},colors:this.config.colors?.mushroom||{},states:this._statesSignature(t)});return this._cachedView("mushrooms",o,()=>{const t=this.config.colors?.mushroom?.active??"#00e676",o=this.config.colors?.mushroom?.inactive??"#888",i=[];for(let s=1;s<=5;s++){const n=e[`mushroom${s}`]||{},a=n.entity,r=this.hass?.states?.[a];if(!a||!r)continue;const l="on"===r.state;i.push({icon:n.icon||r.attributes.icon||$e(a,this.hass)||"mdi:flash",state:r.state,active:l,color:l?t:o,dx:n.dx??0,dy:n.dy??0,angle_deg:n.angle_deg,radius_factor:n.radius_factor,entity_id:a,tap_action:n.tap_action,hold_action:n.hold_action,animation:n.animation})}const s=e.camera||{},n=s.entity;if(n&&this.hass.states?.[n]){const e=this.hass?.states?.[n],a=s.presence?.entity,r=a?this.hass?.states?.[a]?.state:void 0,l=!a||["on","home","occupied","motion","detected"].includes(r);i.push({icon:s.icon||e.attributes.icon||$e(n,this.hass)||"mdi:cctv",state:e.state,active:l,color:l?t:o,left:"calc(100% - 12px - 36px)",top:12,dx:0,dy:0,kind:"camera",angle_deg:s.angle_deg,radius_factor:s.radius_factor,entity_id:n,tap_action:{action:"more-info"},hold_action:{action:"none"}})}const a=this._entities?.climate||{},r=a.entity;if(r&&this.hass.states?.[r]){const e=this.hass?.states?.[r],s=e.state&&"off"!==e.state&&"idle"!==e.state||e.attributes?.hvac_action&&"off"!==e.attributes.hvac_action;i.push({icon:a.icon||e.attributes.icon||$e(r,this.hass)||"mdi:thermostat",state:e.state,active:s,color:s?t:o,dx:0,dy:0,angle_deg:a.angle_deg,radius_factor:a.radius_factor,kind:"climate",entity_id:r})}return i})}_onMushroomClick(e){}render(){try{return this._renderCard()}catch(e){return console.error("[bubble-room] render error:",e),N`<div style="padding:12px;color:#f87;font-size:0.9rem">
        bubble-room: errore di rendering — ${e.message}
      </div>`}}_renderCard(){const e=this.config.layout||"wide",t=this._getMainIconSize(),o=this._getSubButtons(),i=this.config?.subbutton_style||"standard",s=this._isRoomActive(),n=this.config.colors?.room?.icon_active??"#21df73",a=nt(n),r=this.config.colors?.room?.icon_inactive??(a?`rgba(${a.r},${a.g},${a.b},0.42)`:"rgba(33,223,115,0.42)"),l=this.config.colors?.room?.background_active??"rgba(33,223,115,0.12)",c=this.config.colors?.room?.background_inactive??(a?`rgba(${a.r},${a.g},${a.b},0.06)`:"rgba(33,223,115,0.06)"),u=this.config.colors?.room?.text_active??"#ffffff",d=this.config.colors?.room?.text_inactive??"rgba(255,255,255,0.65)",h=this.config.colors?.sensor?.sensor_active??this.config.colors?.room?.icon_active??n,p=this.config.colors?.sensor?.sensor_inactive??this.config.colors?.room?.icon_inactive??r,b=s?h:p;let m="";if(this.config?.card_background?.enabled??!0){const e=this.config?.card_background?.color||"";let t,o,i,n;if(e){const s=/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/.exec(e);if(s)t=+s[1],o=+s[2],i=+s[3],n=Math.min(+(s[4]??1),.4);else if(e.startsWith("#")){const s=nt(e);s&&(t=s.r,o=s.g,i=s.b,n=.22)}}void 0===t&&(a&&(t=a.r,o=a.g,i=a.b),n=s?.22:.12),void 0!==t&&(m=[`--bubble-room-accent-rgb:${t},${o},${i}`,`--bubble-room-accent-alpha:${n}`].join(";"))}const g=this.config?.entities?.presence?.entity||"",f=this.config?.tap_action||{action:"more-info"},_=this.config?.hold_action||{action:"none"},v=o.length>0,y=[this.config.name,this.config.area].flat().filter(Boolean).join(" - ")||"Bubble Room";return N`
      <div
        class="bubble-room-grid ${e} ${s?"is-active":"is-inactive"} ${v?"":"no-sidebar"}"
        style="${m}"
        role="group"
        aria-label="${y}"
        @hass-action=${this._onHassAction}
      >
        <div class="main-area">
          <div class="row1">
            <bubble-sensor
              .sensors="${this._getSensors()}"
              .showIcons=${this.config?.sensor_options?.show_icons??!1}
              .preset="${i}"
              style="
                --bubble-sensor-active-color:${b};
                --bubble-sensor-value-color:${h};
              "
            ></bubble-sensor>

            <div class="name-placeholder" id="nameContainer">
              <bubble-name
                .name="${this.config.name}"
                .area="${this.config.area}"
                .hass=${this.hass}
                .config=${this.config}
                .container=${this.shadowRoot?.getElementById("nameContainer")}
                .preset="${i}"
                style="
                --bubble-room-name-color:${s?u:d};
                --bubble-room-name-saturation:${s?"1.25":"0.55"};
                --bubble-room-name-brightness:${s?"1.45":"0.68"};
              "
              ></bubble-name>
            </div>
          </div>

          <div class="row2">
            <div class="icon-mushroom-area">
              <bubble-icon
                .icon="${this.config.icon||$e(this.config.entity,this.hass)}"
                .active=${s}
                .colorActive="${n}"
                .colorInactive="${r}"
                .backgroundActive="${l}"
                .backgroundInactive="${c}"
                .preset="${i}"
                style="
                  ${t?`--main-icon-size:${t}px;`:""}
                  --icon-shift-x:-20%;
                "
                .entity_id=${g}
                .tap_action=${f}
                .hold_action=${_}
              ></bubble-icon>

              <bubble-mushroom
                .entities="${this._getMushrooms()}"
                .preset="${i}"
                .containerSize="${{width:180,height:180}}"
                @mushroom-entity-click="${this._onMushroomClick}"
              ></bubble-mushroom>
            </div>
            <div class="k-space"></div>
          </div>
        </div>

        <div class="sidebar">
          <bubble-subbutton
            .subbuttons="${o}"
            .preset="${i}"
          ></bubble-subbutton>
        </div>
      </div>
    `}_onHassAction=e=>{e.stopPropagation();const{config:t,action:o}=e.detail||{};if(!t)return;const i="hold"===o?t.hold_action||{action:"none"}:"double_tap"===o?t.double_tap_action||{action:"none"}:t.tap_action||{action:"none"};this._runAction(i,t.entity)};_runAction(e,t){const o=e?.action||"none";if("none"!==o)try{switch(o){case"navigate":{const t=e.navigation_path||e.navigationPath;t&&(window.history.pushState({},"",t),window.dispatchEvent(new Event("location-changed")));break}case"url":{const t=e.url_path||e.urlPath||e.url;t&&(e.new_tab?window.open(t,"_blank","noopener,noreferrer"):window.location.href=t);break}case"more-info":{const o=e.entity||t;o&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:o},bubbles:!0,composed:!0}));break}case"toggle":{const o=e.entity||t;o&&this.hass?.callService&&this.hass.callService("homeassistant","toggle",{entity_id:o});break}case"call-service":{const o=e.service||"",[i,s]=o.split(".");if(i&&s&&this.hass?.callService){const o={...e.service_data||e.data||{}};!o.entity_id&&t&&(o.entity_id=t),this.hass.callService(i,s,o)}break}}}catch(e){console.error("[bubble-room] action error:",o,e)}}static styles=n`
    :host { display:block; height:100%; box-sizing:border-box; }
    .bubble-room-grid { display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 22%);
      grid-template-rows:minmax(0, 1fr);
      gap: 0 2.5%;
      width:100%; height:100%; box-sizing:border-box; padding: 0 2.8% 2.2% 0;
      overflow: hidden;
      position: relative;
      isolation: isolate;
      border-radius: var(--ha-card-border-radius, 12px);
      background:
        radial-gradient(
          circle at 20% 82%,
          rgba(var(--bubble-room-accent-rgb, 33, 223, 115), var(--bubble-room-accent-alpha, 0.16)) 0%,
          rgba(var(--bubble-room-accent-rgb, 33, 223, 115), calc(var(--bubble-room-accent-alpha, 0.16) * 0.55)) 28%,
          transparent 62%
        );
      transition: background 0.35s ease, filter 0.35s ease; }
    .bubble-room-grid::before { content:""; position:absolute; inset:0; z-index:-1;
      pointer-events:none;
      background:
        linear-gradient(135deg, rgba(255,255,255,0.10), transparent 38%),
        radial-gradient(circle at 86% 10%, rgba(255,255,255,0.08), transparent 30%);
      opacity: 0.72; }
    .bubble-room-grid.is-inactive { filter: saturate(0.82); }
    .bubble-room-grid.no-sidebar { grid-template-columns:minmax(0, 1fr); padding-right:0; }
    .bubble-room-grid.no-sidebar .sidebar { display:none; }
    .main-area { display:grid; height:100%; min-height:0; min-width:0; box-sizing:border-box; overflow:visible; }
    .row1 { display:grid; min-height:0; min-width:0; box-sizing:border-box; overflow:visible;
      grid-template-columns:1fr; row-gap:1%; }
    .row2 { display:grid; height:100%; min-height:0; box-sizing:border-box;
    }
    .name-placeholder { display:flex; align-items:center; justify-content:flex-start;
      width:100%; max-width:100%; height:100%; box-sizing:border-box;
      min-width:0; min-height:0; overflow:visible; flex-shrink:1; background:transparent; }
    .icon-mushroom-area { box-sizing:border-box;
      position:relative; width:100%; height:100%; min-width:0; min-height:0; display:flex; align-items:center; overflow:hidden; }
    .k-space { box-sizing:border-box; }
    .sidebar { display:flex; flex-direction:column; height:100%; min-height:0; min-width:0;
      box-sizing:border-box; }

    .bubble-room-grid.tall .main-area { grid-template-rows:minmax(0, 34%) minmax(0, 66%); }
    .bubble-room-grid.tall .row1      { grid-template-rows:minmax(0, 27%) minmax(0, 72%); }
    .bubble-room-grid.tall .row2      { grid-template-columns:1fr 0fr; }

    .bubble-room-grid.wide .main-area { grid-template-rows:minmax(0, 34%) minmax(0, 66%); }
    .bubble-room-grid.wide .row1      { grid-template-rows:minmax(0, 27%) minmax(0, 72%); }
    .bubble-room-grid.wide .row2      { grid-template-columns:2fr 1fr; }
  `}customElements.get("bubble-room")||customElements.define("bubble-room",dt),window.customCards=window.customCards||[],window.customCards.push({type:"bubble-room",name:"Bubble Room",description:"All‑in‑one room card: control entities, see sensors, and tweak colors & layout.",preview:!1,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});export{dt as BubbleRoom};
//# sourceMappingURL=lovelace-bubble-room.js.map
