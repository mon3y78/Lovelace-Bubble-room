/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var r;const c=window,l=c.trustedTypes,d=l?l.emptyScript:"",h=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:u},b="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty(b))return!1;this[b]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(e=>{const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=g){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;f[b]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:f}),(null!==(r=c.reactiveElementVersions)&&void 0!==r?r:c.reactiveElementVersions=[]).push("1.6.3");const _=window,v=_.trustedTypes,x=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,y="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,k=`<${w}>`,C=document,A=()=>C.createComment(""),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,z="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,M=/>/g,O=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,T=/"/g,R=/^(?:script|style|textarea|title)$/i,N=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),B=new WeakMap,H=C.createTreeWalker(C,129,null,!1);function W(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",a=P;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,d=0;for(;d<i.length&&(a.lastIndex=d,c=a.exec(i),null!==c);)d=a.lastIndex,a===P?"!--"===c[1]?a=F:void 0!==c[1]?a=M:void 0!==c[2]?(R.test(c[2])&&(n=RegExp("</"+c[2],"g")),a=O):void 0!==c[3]&&(a=O):a===O?">"===c[0]?(a=null!=n?n:P,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?O:'"'===c[3]?T:j):a===T||a===j?a=O:a===F||a===M?a=P:(a=O,n=void 0);const h=a===O&&t[e+1].startsWith("/>")?" ":"";o+=a===P?i+k:l>=0?(s.push(r),i.slice(0,l)+y+i.slice(l)+$+h):i+$+(-2===l?(s.push(void 0),e):h)}return[W(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class L{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const a=t.length-1,r=this.parts,[c,l]=q(t,e);if(this.el=L.createElement(c,i),H.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=H.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(y)||e.startsWith($)){const i=l[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+y).split($),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?X:"@"===e[1]?Z:J})}else r.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(R.test(s.tagName)){const t=s.textContent.split($),e=t.length-1;if(e>0){s.textContent=v?v.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],A()),H.nextNode(),r.push({type:2,index:++n});s.append(t[e],A())}}}else if(8===s.nodeType)if(s.data===w)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf($,t+1));)r.push({type:7,index:n}),t+=$.length-1}n++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function D(t,e,i=t,s){var n,o,a,r;if(e===I)return e;let c=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const l=S(e)?void 0:e._$litDirective$;return(null==c?void 0:c.constructor)!==l&&(null===(o=null==c?void 0:c._$AO)||void 0===o||o.call(c,!1),void 0===l?c=void 0:(c=new l(t),c._$AT(t,i,s)),void 0!==s?(null!==(a=(r=i)._$Co)&&void 0!==a?a:r._$Co=[])[s]=c:i._$Cl=c),void 0!==c&&(e=D(t,c._$AS(t,e.values),c,s)),e}class V{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);H.currentNode=n;let o=H.nextNode(),a=0,r=0,c=s[0];for(;void 0!==c;){if(a===c.index){let e;2===c.type?e=new Y(o,o.nextSibling,this,t):1===c.type?e=new c.ctor(o,c.name,c.strings,this,t):6===c.type&&(e=new Q(o,this,t)),this._$AV.push(e),c=s[++r]}a!==(null==c?void 0:c.index)&&(o=H.nextNode(),a++)}return H.currentNode=C,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{constructor(t,e,i,s){var n;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),S(t)?t===U||null==t||""===t?(this._$AH!==U&&this._$AR(),this._$AH=U):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>E(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==U&&S(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=L.createElement(W(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new V(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new L(t)),e}T(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Y(this.k(A()),this.k(A()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,i,s,n){this.type=1,this._$AH=U,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=D(this,t,e,0),o=!S(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{const s=t;let a,r;for(t=n[0],a=0;a<n.length-1;a++)r=D(this,s[i+a],e,a),r===I&&(r=this._$AH[a]),o||(o=!S(r)||r!==this._$AH[a]),r===U?t=U:t!==U&&(t+=(null!=r?r:"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(t)}j(t){t===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===U?void 0:t}}const K=v?v.emptyScript:"";class X extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==U?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class Z extends J{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=D(this,t,e,0))&&void 0!==i?i:U)===I)return;const s=this._$AH,n=t===U&&s!==U||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==U&&(s===U||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Q{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}}const tt=_.litHtmlPolyfillSupport;null==tt||tt(L,Y),(null!==(m=_.litHtmlVersions)&&void 0!==m?m:_.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et,it;class st extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let a=o._$litPart$;if(void 0===a){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=a=new Y(e.insertBefore(A(),t),t,void 0,null!=i?i:{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return I}}st.finalized=!0,st._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:st});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:st}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");const ot={alarm_control_panel:"Alarms",binary_sensor:"Binary Sensors",camera:"Cameras",climate:"Climate",cover:"Covers",fan:"Fan",light:"Light",lock:"Lock",media_player:"Media Player",scene:"Scenes",script:"Scripts",siren:"Siren",vacuum:"Vacuum",motion:"Motion",occupancy:"Occupancy",presence:"Presence",moving:"Moving",door:"Door",window:"Window",opening:"Opening",garage_door:"Garage Door",vibration:"Vibration",sound:"Sound",moisture:"Moisture/Leak",water:"Water/Leak",smoke:"Smoke",gas:"Gas",carbon_monoxide:"Carbon Monoxide",cold:"Cold",heat:"Heat",light_level:"Light Level",connectivity:"Connectivity",lock_dc:"Lock (status)",plug:"Plug",power:"Power",problem:"Problem",running:"Running",safety:"Safety",tamper:"Tamper",update:"Update",switch:"Switch",input_boolean:"Boolean Switch"},at=["alarm_control_panel","binary_sensor","camera","climate","cover","fan","input_boolean","light","lock","media_player","scene","script","siren","switch","vacuum"],rt=["motion","occupancy","presence","moving","door","window","opening","garage_door","vibration","sound","moisture","water","smoke","gas","carbon_monoxide","cold","heat","light_level","connectivity","plug","power","problem","running","safety","tamper","update"],ct=(t=[])=>({includeDomains:at,entityFilter:(e,i)=>{if(!t.length)return!1;const[s]=e.split(".");if("binary_sensor"===s){const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}return t.includes(s)}}),lt=(t=[])=>({includeDomains:["sensor"],entityFilter:(e,i)=>{if(!t.length)return!0;const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}}),dt=(t=[])=>({includeDomains:at,entityFilter:(e,i)=>{if(!t.length)return"binary_sensor"===e.split(".")[0];const[s]=e.split(".");if("binary_sensor"===s){const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}return t.includes(s)}}),ht=(t=[])=>({includeDomains:at,entityFilter:(e,i)=>{const[s]=e.split(".");if(!t.length)return at.includes(s);if("binary_sensor"===s){const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}return t.includes(s)}}),pt=(t=[])=>({includeDomains:["camera"],entityFilter:(e,i)=>{if(!t.length)return!0;const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}}),ut=(t=[])=>({includeDomains:["climate"],entityFilter:(t,e)=>!0});function gt(t){return"string"==typeof t&&t.trim().length>0}function bt(t,e,i){if(!gt(i))return!0;const s=function(t){if(!t)return{};if(!Array.isArray(t))return t;const e={};for(const i of t){const t=i?.entity_id||i?.id;t&&(e[t]=i)}return e}(t?.entities),n=function(t){if(!t)return{};if(!Array.isArray(t))return t;const e={};for(const i of t){const t=i?.id||i?.device_id;t&&(e[t]=i)}return e}(t?.devices),o=s[e];if(o?.area_id===i)return!0;const a=o?.device_id||o?.deviceId;if(a&&n[a]?.area_id===i)return!0;const r=t?.states?.[e]?.attributes?.area_id;return r===i}function ft(t,e,i,s=[]){if(!t?.states)return[];let n;if("presence"===i?n=ct(s):"sensor"===i?n=lt(s):"mushroom"===i?n=dt(s):"subbutton"===i?n=ht(s):"camera"===i?n=pt(s):"climate"===i&&(n=ut(s)),!n)return[];const o=Object.keys(t.states).filter(t=>n.includeDomains.includes(t.split(".")[0])).filter(e=>n.entityFilter(e,t));let a=o;const r="string"==typeof e?.area_id?e.area_id:e?.area;if(gt(r)){const e=function(t,e){return t?.states&&gt(e)?Object.keys(t.states).filter(i=>bt(t,i,e)):[]}(t,r),i=o.filter(t=>e.includes(t));i.length&&(a=i)}const c=function(t){const e=new Set,i=t=>{t&&("string"==typeof t&&t.includes(".")?e.add(t):Array.isArray(t)?t.forEach(i):"object"==typeof t&&Object.values(t).forEach(i))};return i(t),Array.from(e)}("subbutton"===i?e?.subbuttons:e?.entities?.[i]);return function(t,e){const i=Array.from(new Set(t)),s=Array.isArray(e)?e:e?[e]:[];for(let t=s.length-1;t>=0;t--){const e=s[t];e&&!i.includes(e)&&i.unshift(e)}return i}(a,c)}const mt=!!window.__BUBBLE_DEBUG__;function _t(t,e,i,s=!1){if(!t||!e)return e;const n=e.auto_discovery_sections||{};return i&&String(i).startsWith("auto_discovery_sections."),(s||mt)&&"undefined"!=typeof window&&console.info("[AutoDiscovery] (no-op) after",i,{sections:n}),e}let vt;try{const{IconCache:t}=await Promise.resolve().then(function(){return Ct});vt=t}catch(t){vt={_m:new Map,get(t){return this._m.get(t)},set(t,e){this._m.set(t,e)}}}const xt="mdi:bookmark",yt={light:"mdi:lightbulb",switch:"mdi:toggle-switch",fan:"mdi:fan",climate:"mdi:thermostat",cover:"mdi:window-shutter",media_player:"mdi:play-circle",script:"mdi:script-text",scene:"mdi:palette",lock:"mdi:lock",camera:"mdi:video",binary_sensor:"mdi:checkbox-marked-circle-outline",sensor:"mdi:eye",alarm_control_panel:"mdi:shield-home",vacuum:"mdi:robot-vacuum",siren:"mdi:bullhorn"},$t={door:{on:"mdi:door-open",off:"mdi:door-closed"},window:{on:"mdi:window-open",off:"mdi:window-closed"},motion:{on:"mdi:motion-sensor",off:"mdi:motion-sensor-off"},moisture:{on:"mdi:water-alert",off:"mdi:water-off"},smoke:{on:"mdi:smoke",off:"mdi:smoke-detector-off"},gas:{on:"mdi:gas-cylinder",off:"mdi:gas-off"},lock:{on:"mdi:lock-open-variant",off:"mdi:lock"},garage:{on:"mdi:garage-open",off:"mdi:garage"},light:{on:"mdi:lightbulb-on",off:"mdi:lightbulb-off"},plug:{on:"mdi:power-plug",off:"mdi:power-plug-off"},presence:{on:"mdi:account",off:"mdi:account-off"},vibration:{on:"mdi:vibrate",off:"mdi:vibrate-off"},opening:{on:"mdi:door-open",off:"mdi:door-closed"},battery:{on:"mdi:battery",off:"mdi:battery-outline"},connectivity:{on:"mdi:wifi",off:"mdi:wifi-off"},safety:{on:"mdi:shield-check",off:"mdi:shield-off"},cold:{on:"mdi:snowflake",off:"mdi:snowflake-off"}};function wt(t,e){const{entityId:i,hass:s}=function(t,e){return t&&"object"==typeof t&&t.states&&"string"==typeof e?{entityId:e,hass:t}:{entityId:t,hass:e}}(t,e);if(!i)return xt;const n=vt?.get?.(i);if(n)return n;const o=s?.states?.[i],a=o?.attributes||{},r=function(t){return(t||"").split(".")[0]||""}(i),c=a.icon;if(c)return vt?.set?.(i,c),c;const l=a.device_class?function(t,e){const i=$t[t];return i?function(t){return"on"===t||"open"===t||"unlocked"===t||"playing"===t||"active"===t}(e)?i.on:i.off:null}(a.device_class,o?.state):null;if(l)return vt?.set?.(i,l),l;const d=yt[r]||xt;return vt?.set?.(i,d),d}const kt={_list:null,get(t){if(this._list)return this._list;const e=t?.mdiIcons||null;return this._list=e?Object.keys(e).sort():[],this._list},warm(t){return this.get(t)}};var Ct=Object.freeze({__proto__:null,IconCache:kt});const At=["presence","motion","occupancy","light","switch","fan"];class St extends st{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean,state:!0},activeFilters:{type:Array,state:!0},layout:{type:String}};static styles=o`
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

    /* RESET — allineato a CameraPanel */
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
    .toggle-btn:hover { background: rgba(255,255,255,0.18); }

    /* AUTODISCOVER — pill orizzontale identica a CameraPanel */
    .input-group.autodiscover {
      margin: 0 16px 13px;
      padding: 14px 18px 10px;
      background: rgba(44, 70, 100, 0.23);
      border: 1.5px solid rgba(255, 255, 255, 0.13);
      border-radius: 18px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .input-group.autodiscover label {
      margin: 0;               /* niente margine bottom, è inline con la checkbox */
      display: inline-block;   /* stessa resa di CameraPanel */
      color: #55afff;
      font-weight: 700;
      font-size: 1.13rem;
    }
  `;constructor(){super(),this.hass={},this.config={},this._expanded=!1,this.activeFilters=[],this.layout="wide",this._syncingFromConfig=!1}updated(t){if(!t.has("config")&&!t.has("hass"))return;if(this._syncingFromConfig=!0,(this.config?.area||this.config?.area_id)&&_t(this.hass,this.config,"area",!1),kt.warm(this.hass),t.has("config")){Array.isArray(this.config?.presence_filters)&&(this.activeFilters=[...this.config.presence_filters]);const t=this.config?.layout;t&&t!==this.layout&&(this.layout=t)}this._syncingFromConfig=!1;const e=this.config?.entities?.presence?.entity,i=this.config?.icon||"";if(e&&!i){const t=this.hass?.states?.[e],i=t?.attributes?.icon||wt(e,this.hass);i&&this._fire("icon",i)}}_onLayoutClick(t){this.layout=t,this._fire("layout",t);const e="tall"===t?{columns:6,rows:4}:{columns:12,rows:4};this._fire("grid_options",e)}_fire(t,e){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}_onPresenceEntityChange=t=>{this._fire("entities.presence.entity",t);const e=this.config?.icon||"";if(t&&!e){const e=this.hass?.states?.[t],i=e?.attributes?.icon||wt(t,this.hass);i&&this._fire("icon",i)}};_onAreaChange(t){const e=this.config||{},i={...e.auto_discovery_sections||{}};t&&!e.area&&(i.camera=!0,i.climate=!0,i.sensor=!0,i.mushroom=!0,i.subbutton=!0,i.presence=!0);const s={...e,area:t,area_id:t,auto_discovery_sections:i};t&&(s.name=t.toUpperCase()),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}_presenceCandidatesNoArea(t,e=[],i){if(!t?.states)return[];const s=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let n=Object.keys(t.states).filter(t=>s.has(t.split(".")[0]));const o=new Set(e||[]);return o.size&&(n=n.filter(e=>{const[i]=e.split(".");if("binary_sensor"!==i)return!0;const s=t.states[e]?.attributes?.device_class||"";return o.has("motion")&&"motion"===s||o.has("occupancy")&&"occupancy"===s||o.has("presence")&&"presence"===s})),i&&!n.includes(i)&&n.unshift(i),n}render(){const t=this.config,e=t.auto_discovery_sections?.presence??!1,i=t.area??"",s=t.name??"",n=t.icon??"",o=t.entities?.presence?.entity??"",a=this.activeFilters.length?this.activeFilters:t.presence_filters??[...At],r=At.map(t=>({value:t,label:t.charAt(0).toUpperCase()+t.slice(1)})),c=e?ft(this.hass,this.config,"presence",a):this._presenceCandidatesNoArea(this.hass,a,o),l=["toggle","more-info","navigate","call-service","none"],d=this.config?.tap_action||{},h=this.config?.hold_action||{};return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${t=>this._expanded=t.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>
      
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${t=>this._fire("auto_discovery_sections.presence",t.target.checked)}
          />
          <label>🪄 Auto-discover Presence</label>
        </div>
      
        <div class="input-group">
          <label>🏷️ Area:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${i}
            .selector=${{area:{}}}
            @value-changed=${t=>this._onAreaChange(t.detail.value)}
          ></ha-selector>
        </div>
      
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
                .value=${n}
                allow-custom-icon
                @opened=${()=>kt.warm(this.hass)}
                @value-changed=${t=>this._fire("icon",t.detail.value)}
              ></ha-icon-picker>
            </div>
      
            <!-- Filter categories -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${a}
                .selector=${{select:{multiple:!0,mode:"box",options:r}}}
                @value-changed=${t=>this._fire("presence_filters",t.detail.value)}
              ></ha-selector>
            </div>
      
            <!-- Presence entity -->
            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${o}
                .selector=${{entity:{include_entities:c,multiple:!1}}}
                allow-custom-entity
                @value-changed=${t=>this._onPresenceEntityChange(t.detail.value)}
              ></ha-selector>
            </div>
      
            <!-- Actions -->
            <div class="input-group">
              <label>Tap Action</label>
              <div class="pill-group">
                ${l.map(t=>N`
                  <button
                    class="pill-button ${d.action===t?"active":""}"
                    @click=${()=>this._fire("tap_action.action",t)}
                  >${t}</button>
                `)}
              </div>
              ${"navigate"===d.action?N`
                <input type="text" placeholder="Path"
                  .value=${d.navigation_path||""}
                  @input=${t=>this._fire("tap_action.navigation_path",t.target.value)}
                />
              `:""}
              ${"call-service"===d.action?N`
                <input type="text" placeholder="service"
                  .value=${d.service||""}
                  @input=${t=>this._fire("tap_action.service",t.target.value)}
                />
                <input type="text" placeholder='service_data (JSON)'
                  .value=${d.service_data?JSON.stringify(d.service_data):""}
                  @input=${t=>{let e=t.target.value;try{e=e?JSON.parse(e):void 0}catch{e=void 0}this._fire("tap_action.service_data",e)}}
                />
              `:""}
            </div>

            <div class="input-group">
              <label>Hold Action</label>
              <div class="pill-group">
                ${l.map(t=>N`
                  <button
                    class="pill-button ${h.action===t?"active":""}"
                    @click=${()=>this._fire("hold_action.action",t)}
                  >${t}</button>
                `)}
              </div>
              ${"navigate"===h.action?N`
                <input type="text" placeholder="Path"
                  .value=${h.navigation_path||""}
                  @input=${t=>this._fire("hold_action.navigation_path",t.target.value)}
                />
              `:""}
              ${"call-service"===h.action?N`
                <input type="text" placeholder="service (es. light.turn_on)"
                  .value=${h.service||""}
                  @input=${t=>this._fire("hold_action.service",t.target.value)}
                />
                <input type="text" placeholder='service_data (JSON)'
                  .value=${h.service_data?JSON.stringify(h.service_data):""}
                  @input=${t=>{let e=t.target.value;try{e=e?JSON.parse(e):void 0}catch{e=void 0}this._fire("hold_action.service_data",e)}}
                />
              `:""}
            </div>
          </div>
        </div>
      
        <!-- 📐 Layout -->
        <div class="input-group">
          <label>📐 Layout:</label>
          <div class="toggle-group">

            <button
              class="toggle-btn ${"tall"===this.layout?"active":""}"
              @click=${()=>this._onLayoutClick("tall")}
            >
              <ha-icon icon="mdi:cellphone"></ha-icon>
              <span>Tall</span>
            </button>
            <button
              class="toggle-btn ${"wide"===this.layout?"active":""}"
              @click=${()=>this._onLayoutClick("wide")}
            >
              <ha-icon icon="mdi:tablet"></ha-icon> 
              <span>Wide</span> 
            </button>
          </div>
        </div>
      
        <!-- Reset (identico a CameraPanel) -->
        <button class="reset-button"
          @click=${()=>this._fire("__panel_cmd__",{cmd:"reset",section:"room"})}>
          🧹 Reset Room
        </button>
      </ha-expansion-panel>
    `}}customElements.define("room-panel",St);const Et={temperature:{label:"Temperature",emoji:"🌡️",units:["°C","°F"]},apparent_temperature:{label:"Feels Like",emoji:"🥵",units:["°C","°F"]},humidity:{label:"Humidity",emoji:"💧",units:["%"]},pressure:{label:"Pressure",emoji:"🧭",units:["hPa","mbar","kPa"]},illuminance:{label:"Illuminance",emoji:"🔆",units:["lx"]},sound_pressure:{label:"Sound Pressure",emoji:"🔊",units:["dB"]},pm1:{label:"PM1",emoji:"🌫️",units:["µg/m³"]},pm2_5:{label:"PM2.5",emoji:"🌫️",units:["µg/m³"]},pm10:{label:"PM10",emoji:"🌫️",units:["µg/m³"]},co2:{label:"CO₂",emoji:"🫁",units:["ppm"]},uv_index:{label:"UV Index",emoji:"☀️",units:["UV index"]},irradiance:{label:"Irradiance",emoji:"🌞",units:["W/m²"]},wind_speed:{label:"Wind Speed",emoji:"🌀",units:["km/h","m/s","mph","kn"],formatter:(t,e)=>{const i=Number(t);return isNaN(i)?{value:t,unit:e}:"m/s"===e?{value:(3.6*i).toFixed(0),unit:"km/h"}:"mph"===e?{value:(1.60934*i).toFixed(0),unit:"km/h"}:"kn"===e?{value:(1.852*i).toFixed(0),unit:"km/h"}:{value:i.toFixed(0),unit:e||"km/h"}}},speed:{label:"Speed",emoji:"🌀",units:["km/h","m/s","mph","kn"]},wind_gust:{label:"Wind Gust",emoji:"🌬️",units:["km/h","m/s","mph","kn"]},wind_bearing:{label:"Wind Direction",emoji:"🧭",units:["°","cardinal"]},precipitation:{label:"Precipitation",emoji:"🌧️",units:["mm","cm","in"]},precipitation_intensity:{label:"Precipitation Intensity",emoji:"🌦️",units:["mm/h","in/h"]},precipitation_probability:{label:"Rain Probability",emoji:"☔",units:["%"]},cloud_coverage:{label:"Cloud Coverage",emoji:"☁️",units:["%"]},visibility:{label:"Visibility",emoji:"👁️",units:["km","m","mi"]},dew_point:{label:"Dew Point",emoji:"💧",units:["°C","°F"]},power:{label:"Power",emoji:"⚡",units:["kW","W","MW"],formatter:(t,e)=>{const i=Number(t);return isNaN(i)?{value:t,unit:e}:"W"===e?{value:(i/1e3).toFixed(i>=100?0:1),unit:"kW"}:"MW"===e?{value:(1e3*i).toFixed(0),unit:"kW"}:{value:i,unit:e||"kW"}}},energy:{label:"Energy",emoji:"🔌",units:["kWh","Wh","MWh"],formatter:(t,e)=>{const i=Number(t);return isNaN(i)?{value:t,unit:e}:"Wh"===e?{value:(i/1e3).toFixed(i>=1e3?0:1),unit:"kWh"}:"MWh"===e?{value:(1e3*i).toFixed(0),unit:"kWh"}:{value:i,unit:e||"kWh"}}},power_factor:{label:"Power Factor",emoji:"📐",units:["%","ratio"]},voltage:{label:"Voltage",emoji:"⚙️",units:["V"]},current:{label:"Current",emoji:"🧲",units:["A","mA"]},frequency:{label:"Frequency",emoji:"〰️",units:["Hz"]},apparent_power:{label:"Apparent Power",emoji:"🧮",units:["VA","kVA"]},reactive_power:{label:"Reactive Power",emoji:"🧮",units:["var","kvar"]},monetary:{label:"Cost",emoji:"💶",units:["€","EUR","$"]},gas:{label:"Gas",emoji:"🔥",units:["m³","Nm³","kWh"]},water:{label:"Water",emoji:"🚿",units:["m³","L"]},battery:{label:"Battery",emoji:"🔋",units:["%"]},signal_strength:{label:"Signal Strength",emoji:"📶",units:["dBm"]},_fallback:{label:"Other",emoji:"❓",units:[""]}};class zt extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(5).fill(!1);const t=Object.keys(Et);this._filters=Array(5).fill().map(()=>[...t]),this._entities=Array(5).fill(""),this._ignoreNextFilterChange=new Set}updated(t){if(t.has("config")||t.has("hass")){const t=_t(this.hass,this.config,"auto_discovery_sections.sensor");t&&t!==this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}));for(let t=0;t<5;t++){const e=`sensor${t+1}`,i=this.config?.sensor_filters?.[t],s=this.config?.entities?.[e]?.entity;Array.isArray(i)&&(this._filters[t]=[...i]),s&&(this._entities[t]=s)}}}static styles=o`
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

    .input-group { margin-bottom: 12px; }
    .input-group label {
      display: block; font-weight: 600;
      margin-bottom: 6px; color: #8cff8a;
    }
    ha-selector { width: 100%; box-sizing: border-box; }
    ha-selector::part(combobox) { min-height: 40px; }

    /* layout Clear */
    .filter-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
    }
    .clear-chip {
      border: 2px solid var(--warning-color, #ff8a65);
      color: var(--warning-color, #ff8a65);
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
  `;render(){const t=this.config?.auto_discovery_sections?.sensor??!1,e=Object.entries(Et).filter(([t])=>"_fallback"!==t).map(([t,e])=>{const i=e.label||t.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase());return{value:t,label:`${e.emoji||""} ${i}`.trim()}});return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${t=>{this.expanded=t.detail.expanded,this.expanded&&(this._expanded=Array(5).fill(!1))}}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${t}
            @change=${t=>this._toggleAuto(t.target.checked)}
          />
          <label>🪄 Auto-discover Sensors</label>
        </div>

        ${this._expanded.map((t,i)=>this._renderSensor(i,t,e))}

        <button class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Sensors
        </button>
      </ha-expansion-panel>
    `}_renderSensor(t,e,i){const s=this._filters[t],n=this._entities[t];let o;if(this.config?.auto_discovery_sections?.sensor??!1)o=ft(this.hass,this.config,"sensor",s)||[];else{const t=this.hass?.states||{},e=Object.keys(t),i=Array.isArray(s)&&s.length>0,n=i?new Set(s):null;o=e.filter(e=>{const s=e.split(".")[0];if("sensor"!==s&&"binary_sensor"!==s)return!1;if(!i)return!0;const o=t[e]?.attributes?.device_class;return!!o&&n.has(o)})}return n&&!o.includes(n)&&(o=[n,...o]),N`
      <div class="mini-pill ${e?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(t)}>
          Sensor ${t+1}
          <span class="chevron">${e?"▼":"▶"}</span>
        </div>
        ${e?N`
          <div class="mini-pill-content">
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${t}">Filter category:</label>
                <button
                  class="clear-chip"
                  type="button"
                  @click=${()=>this._clearFilter(t)}
                  title="Clear filter category">
                  Clear
                </button>
              </div>
              <ha-selector
                id="filter-${t}"
                .hass=${this.hass}
                .value=${s}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${e=>this._onFilter(t,e.detail.value)}
              ></ha-selector>
            </div>

            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${n}
                .selector=${{entity:{include_entities:o,multiple:!1}}}
                allow-custom-entity
                @value-changed=${e=>this._onEntity(t,e.detail.value)}
              ></ha-selector>
            </div>

            ${n?(()=>{const t=this.hass.states[n],e=t?.attributes?.device_class,i=Et[e]||{},s=i.emoji||"❓",o=t?.attributes?.unit_of_measurement||(i.units?.[0]??"");return N`
                <div class="preview">
                  <span class="emoji">${s}</span>
                  <div class="state">${t?.state??"-"} ${o}</div>
                </div>
              `})():""}
          </div>
        `:""}
      </div>
    `}_toggleAuto(t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.sensor",val:t},bubbles:!0,composed:!0}))}_togglePill(t){this._expanded=this._expanded.map((e,i)=>i===t&&!e),this.requestUpdate()}_onFilter(t,e){const i=Object.keys(Et);if(this._ignoreNextFilterChange.has(t))this._ignoreNextFilterChange.delete(t),this._filters[t]=[];else{const s=Array.isArray(e)&&e.length?e.filter(Boolean):i;this._filters[t]=[...s]}this.requestUpdate("_filters");const s=this.renderRoot?.querySelector(`#filter-${t}`);s&&(s.value=[...this._filters[t]])}_clearFilter(t){this._filters[t]=[],this.requestUpdate("_filters");const e=this.renderRoot?.querySelector(`#filter-${t}`);e&&(this._ignoreNextFilterChange.add(t),e.value=[],e.dispatchEvent(new CustomEvent("value-changed",{detail:{value:[]},bubbles:!0,composed:!0})))}_onEntity(t,e){this._entities[t]=e,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${t+1}.entity`,val:e},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(5).fill(!1);const t=Object.keys(Et);this._filters=Array(5).fill().map(()=>[...t]),this._entities=Array(5).fill("");for(let t=1;t<=5;t++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${t}.entity`,val:""},bubbles:!0,composed:!0}))}}customElements.define("sensor-panel",zt);class Pt extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0},_icons:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...at]),this._entities=Array(5).fill(""),this._icons=Array(5).fill(""),this._syncingFromConfig=!1,this._ignoreNextFilterChange=new Set}updated(t){if(!t.has("config")&&!t.has("hass"))return;if(this._syncingFromConfig=!0,this.config?.area||this.config?.area_id){const t=_t(this.hass,this.config,"area",!1);t&&t!==this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}const e=this.config?.mushroom_filters;Array.isArray(e)&&5===e.length&&(this._filters=e.map(t=>Array.isArray(t)?[...t]:[...at]));const i=this.config?.entities||{};for(let t=0;t<5;t++){const e=i[`mushroom${t+1}`]||{};e.entity&&(this._entities[t]=e.entity),"string"==typeof e.icon&&(this._icons[t]=e.icon)}this._syncingFromConfig=!1;const s=[];for(let t=0;t<5;t++){const e=`mushroom${t+1}`,i=this._entities[t],n=this.config?.entities?.[e]?.icon;if(i&&!n){const n=this.hass?.states?.[i],o=n?.attributes?.icon,a=o||wt(i,this.hass);a&&s.push({i:t,key:e,icon:a})}}if(s.length)for(const{i:t,key:e,icon:i}of s)this._icons[t]=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${e}.icon`,val:i},bubbles:!0,composed:!0}))}static styles=o`
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

    .input-group { margin-bottom: 12px; }
    .input-group label {
      display: block; font-weight: 600;
      margin-bottom: 6px; color: #36e6a0;
    }
    ha-selector, ha-icon-picker { width: 100%; box-sizing: border-box; }
    ha-selector::part(combobox) { min-height: 40px; }

    /* === stile bottoni azione (come SubButtonPanel) === */
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

    .reset-button {
      border: 3.5px solid #ff4c6a; color: #ff4c6a;
      border-radius: 24px; padding: 12px 38px;
      background: transparent; cursor: pointer;
      display: block; margin: 20px auto;
      font-size: 1.15rem; font-weight: 700;
      box-shadow: 0 2px 24px #ff4c6a44;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover {
      background: rgba(255,76,106,0.18);
      color: #fff; box-shadow: 0 6px 32px #ff4c6abf;
    }
     /* —— stile Clear identico a SensorPanel ——————————————— */
    .filter-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8 px;
      margin-bottom: 6px;
    }
    .clear-chip {
      border: 2px solid var(--warning-color, #ff8a65);
      color: var(--warning-color, #ff8a65);
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
  `;render(){const t=this.config?.auto_discovery_sections?.mushroom??!1,e=Array.from(new Set([...at,...rt])).map(t=>({value:t,label:ot[t]||t.charAt(0).toUpperCase()+t.slice(1)}));return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${t=>{this.expanded=t.detail.expanded,this.expanded&&(this._expanded=Array(5).fill(!1))}}
      >
        <div slot="header" class="glass-header">🍄 Mushroom Entities</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${t}
            @change=${t=>this._toggleAuto(t.target.checked)}
          />
          <label>🪄 Auto-discover Mushroom</label>
        </div>

        ${this._expanded.map((t,i)=>this._renderMushroom(i,t,e))}

        <button class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Mushrooms
        </button>
      </ha-expansion-panel>
    `}_renderMushroom(t,e,i){const s=`mushroom${t+1}`,n=this._filters[t],o=this._entities[t],a=this._icons[t],r=this.config.entities&&this.config.entities[s]?this.config.entities[s]:{};let c;if(this.config?.auto_discovery_sections?.mushroom??!1)c=ft(this.hass,this.config,"mushroom",n)||[];else{const t={...this.config,area:void 0,area_id:void 0};c=ft(this.hass,t,"mushroom",n)||[]}o&&!c.includes(o)&&(c=[o,...c]);const l=["toggle","more-info","navigate","call-service","none"];return N`
      <div class="mini-pill ${e?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(t)}>
          Mushroom ${t+1}
          <span class="chevron">${e?"▼":"▶"}</span>
        </div>

        ${e?N`
          <div class="mini-pill-content">
            <!-- Filter categories (layout/UX identici a SensorPanel) -->
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${t}">Filter category:</label>
                <button
                  class="clear-chip"
                  type="button"
                  @click=${()=>this._clearFilter(t)}
                  title="Clear filter category">
                  Clear
                </button>
              </div>
              <ha-selector
                id="filter-${t}"
                .hass=${this.hass}
                .value=${n}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${e=>this._onFilter(t,e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Entity -->
            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${o}
                .selector=${{entity:{include_entities:c,multiple:!1}}}
                allow-custom-entity
                @value-changed=${e=>this._onEntity(t,e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Icon -->
            <div class="input-group">
              <label>Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${a}
                allow-custom-icon
                @value-changed=${e=>this._onIcon(t,e.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Tap Action -->
            <div class="input-group">
              <label>Tap Action:</label>
              <div class="pill-group">
                ${l.map(e=>N`
                  <button
                    class="pill-button ${r.tap_action?.action===e?"active":""}"
                    @click=${()=>this._onAction(t,"tap","action",e)}
                  >${e}</button>
                `)}
              </div>
              ${this._extraFields(t,"tap",r)}
            </div>

            <!-- Hold Action -->
            <div class="input-group">
              <label>Hold Action:</label>
              <div class="pill-group">
                ${l.map(e=>N`
                  <button
                    class="pill-button ${r.hold_action?.action===e?"active":""}"
                    @click=${()=>this._onAction(t,"hold","action",e)}
                  >${e}</button>
                `)}
              </div>
              ${this._extraFields(t,"hold",r)}
            </div>
          </div>
        `:""}
      </div>
    `}_extraFields(t,e,i){const s=i?.[`${e}_action`]?.action;return"navigate"===s?N`
        <input type="text" placeholder="Path"
          .value=${i[`${e}_action`]?.navigation_path||""}
          @input=${i=>this._onAction(t,e,"navigation_path",i.target.value)}
        />
      `:"call-service"===s?N`
        <input type="text" placeholder="Service"
          .value=${i[`${e}_action`]?.service||""}
          @input=${i=>this._onAction(t,e,"service",i.target.value)}
        />
        <input type="text" placeholder='Service Data (JSON)'
          .value=${i[`${e}_action`]?.service_data?JSON.stringify(i[`${e}_action`].service_data):""}
          @input=${i=>this._onAction(t,e,"service_data",this._safeJson(i.target.value))}
        />
      `:""}_safeJson(t){try{return JSON.parse(t)}catch{return{}}}_toggleAuto(t){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.mushroom",val:t},bubbles:!0,composed:!0}))}_togglePill(t){this._expanded=this._expanded.map((e,i)=>i===t&&!e),this.requestUpdate()}_onFilter(t,e){if(this._ignoreNextFilterChange.has(t))this._ignoreNextFilterChange.delete(t),this._filters[t]=[];else{const i=Array.isArray(e)&&e.length?e.filter(Boolean):[...at];this._filters[t]=[...i]}const i=this.renderRoot?.querySelector(`#filter-${t}`);i&&(i.value=[...this._filters[t]])}_clearFilter(t){this._filters[t]=[],this.requestUpdate("_filters");const e=this.renderRoot?.querySelector(`#filter-${t}`);e&&(this._ignoreNextFilterChange.add(t),e.value=[],e.dispatchEvent(new CustomEvent("value-changed",{detail:{value:[]},bubbles:!0,composed:!0})))}_onEntity(t,e){const i=`mushroom${t+1}`;if(this._entities[t]=e||"",this._syncingFromConfig)return;if(this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${i}.entity`,val:this._entities[t]},bubbles:!0,composed:!0})),!this._entities[t])return this._icons[t]="",void this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${i}.icon`,val:""},bubbles:!0,composed:!0}));const s=this.hass?.states?.[this._entities[t]],n=s?.attributes?.icon,o=n||wt(this._entities[t],this.hass)||"";this._icons[t]=o,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${i}.icon`,val:o},bubbles:!0,composed:!0}))}_onIcon(t,e){this._icons[t]=e||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t+1}.icon`,val:this._icons[t]},bubbles:!0,composed:!0}))}_onAction(t,e,i,s){if(this._syncingFromConfig)return;const n=`mushroom${t+1}`,o={...this.config?.entities?.[n]?.[`${e}_action`]||{},[i]:s};this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${n}.${e}_action`,val:o},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...at]),this._entities=Array(5).fill(""),this._icons=Array(5).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}));for(let t=1;t<=5;t++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t}.entity`,val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t}.icon`,val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t}.tap_action`,val:{action:"none"}},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t}.hold_action`,val:{action:"none"}},bubbles:!0,composed:!0}))}_autoIconFor(t){if(!t)return"";const e=this.hass?.states?.[t];return e?.attributes?.icon||wt(t,this.hass)}}customElements.define("mushroom-panel",Pt);class Ft extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...at]),this._entities=Array(4).fill(""),this._ignoreNextFilterChange=new Set,this._filtersHydrated=!1,this._syncingFromConfig=!1}updated(t){if(!t.has("config")&&!t.has("hass"))return;if(this._syncingFromConfig=!0,this.config?.area||this.config?.area_id){const t=_t(this.hass,this.config,"area",!1);t&&t!==this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}const e=Array.isArray(this.config?.subbuttons)?this.config.subbuttons:[];if(e.length)for(let t=0;t<Math.min(4,e.length);t++){const i=e[t]?.entity_id||"";if(this._entities[t]=i,i){const s=e[t]?.icon;if(!s){const e=this.hass?.states?.[i],s=e?.attributes?.icon,n=s||wt(i,this.hass);n&&this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`subbuttons.${t}.icon`,val:n},bubbles:!0,composed:!0}))}}}if(!this._filtersHydrated){const t=this.config?.subbutton_filters;Array.isArray(t)&&4===t.length&&(this._filters=t.map(t=>Array.isArray(t)?[...t]:[...at])),this._filtersHydrated=!0}this._syncingFromConfig=!1}static styles=o`
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
    .input-group.autodiscover label { margin: 0; font-weight: 700; color: #fff; }

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
    .mini-pill-header .chevron { margin-left: auto; transition: transform 0.2s; }
    .mini-pill.expanded .mini-pill-header .chevron { transform: rotate(90deg); }
    .mini-pill-content { padding: 12px 16px 16px; animation: pill-expand 0.2s ease-out both; }
    @keyframes pill-expand { from {opacity:0;transform:translateY(-8px);} to {opacity:1;transform:translateY(0);} }

    .input-group { margin-bottom: 12px; }
    .input-group label { display: block; font-weight: 600; margin-bottom: 6px; color: #b28fff; }
    ha-selector, ha-icon-picker { width: 100%; box-sizing: border-box; }
    ha-selector::part(combobox) { min-height: 40px; }

    /* ——— stile Clear (allineato al label, come Sensor/Mushroom) ——— */
    .filter-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
    }
    .clear-chip {
      border: 2px solid var(--warning-color, #ff8a65);
      color: var(--warning-color, #ff8a65);
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

    /* === STYLE TAP/HOLD like RoomPanel === */
    .pill-group { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
    .pill-button {
      padding: 6px 10px; border-radius: 999px; border: 1px solid #555; cursor: pointer;
      background: transparent; font-weight: 600; transition: background 0.18s, border-color 0.18s, color 0.18s;
    }
    .pill-button.active { border-color: #b28fff; color: #b28fff; }
    .pill-button:hover:not(.active) { background: rgba(178,143,255,0.1); }

    .reset-button {
      border: 3.5px solid #ff4c6a; color: #ff4c6a; border-radius: 24px; padding: 12px 38px;
      background: transparent; cursor: pointer; display: block; margin: 20px auto;
      font-size: 1.15rem; font-weight: 700; box-shadow: 0 2px 24px #ff4c6a44; transition: background 0.18s, color 0.18s, box-shadow 0.18s;
    }
    .reset-button:hover { background: rgba(255,76,106,0.18); color: #fff; box-shadow: 0 6px 32px #ff4c6abf; }
  `;render(){const t=this.config?.auto_discovery_sections?.subbutton??!1,e=at.map(t=>({value:t,label:ot[t]||t.charAt(0).toUpperCase()+t.slice(1)}));return N`
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
    `}_renderSubButton(t,e,i){const s=this._filters[t],n=this._entities[t];let o;if(this.config?.auto_discovery_sections?.subbutton??!1)o=ft(this.hass,this.config,"subbutton",s)||[];else{const t={...this.config,area:void 0,area_id:void 0};o=ft(this.hass,t,"subbutton",s)||[]}n&&!o.includes(n)&&(o=[n,...o]);const a=Array.isArray(this.config?.subbuttons)&&this.config.subbuttons[t]||{},r=["toggle","more-info","navigate","call-service","none"];return N`
      <div class="mini-pill ${e?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(t)}>
          Sub-button ${t+1}  <span class="chevron">${e?"▼":"▶"}</span>
        </div>
        ${e?N`
          <div class="mini-pill-content">
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${t}">Filter category:</label>
                <button class="clear-chip" type="button"
                        @click=${()=>this._clearFilter(t)}
                        title="Clear filter category">Clear</button>
              </div>
              <ha-selector
                id="filter-${t}"
                .hass=${this.hass}
                .value=${s}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${e=>this._onFilter(t,e.detail.value)}
              ></ha-selector>
            </div>

            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${n}
                .selector=${{entity:{include_entities:o,multiple:!1}}}
                allow-custom-entity
                @value-changed=${e=>this._onEntity(t,e.detail.value)}
              ></ha-selector>
            </div>

            <div class="input-group">
              <label>Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${a.icon||""}
                allow-custom-icon
                @value-changed=${e=>this._onIcon(t,e.detail.value)}
              ></ha-icon-picker>
            </div>

            ${["tap","hold"].map(e=>N`
              <div class="input-group">
                <label>${"tap"===e?"Tap Action":"Hold Action"}:</label>
                <div class="pill-group">
                  ${r.map(i=>N`
                    <button
                      class="pill-button ${a[`${e}_action`]?.action===i?"active":""}"
                      @click=${()=>this._onAction(t,e,"action",i)}
                    >${i}</button>
                  `)}
                </div>
                ${this._extraFields(t,e,a)}
              </div>
            `)}
          </div>
        `:""}
      </div>
    `}_extraFields(t,e,i){const s=i?.[`${e}_action`]?.action;return"navigate"===s?N`
        <input type="text" placeholder="Path"
          .value=${i?.[`${e}_action`]?.navigation_path||""}
          @input=${i=>this._onAction(t,e,"navigation_path",i.target.value)}
        />
      `:"call-service"===s?N`
        <input type="text" placeholder="Service"
          .value=${i?.[`${e}_action`]?.service||""}
          @input=${i=>this._onAction(t,e,"service",i.target.value)}
        />
        <input type="text" placeholder='Service Data (JSON)'
          .value=${i?.[`${e}_action`]?.service_data?JSON.stringify(i[`${e}_action`].service_data):""}
          @input=${i=>this._onAction(t,e,"service_data",this._safeJson(i.target.value))}
        />
      `:""}_safeJson(t){try{return JSON.parse(t)}catch{return{}}}_toggleAuto(t){this._syncingFromConfig||this._emit("auto_discovery_sections.subbutton",t)}_togglePill(t){this._expanded=this._expanded.map((e,i)=>i===t&&!e)}_onFilter(t,e){let i;this._ignoreNextFilterChange.has(t)?(this._ignoreNextFilterChange.delete(t),i=[]):i=Array.isArray(e)?e.filter(Boolean):[],this._filters=this._filters.map((e,s)=>s===t?[...i]:e),this.requestUpdate("_filters"),this._emit("subbutton_filters",this._filters)}_clearFilter(t){this._ignoreNextFilterChange.add(t),this._filters=this._filters.map((e,i)=>i===t?[]:e),this.requestUpdate("_filters"),this._emit("subbutton_filters",this._filters)}_onEntity(t,e){if(this._entities[t]=e||"",!this._syncingFromConfig&&(this._emit(`subbuttons.${t}.entity_id`,this._entities[t]),this._entities[t])){const e=this.hass?.states?.[this._entities[t]],i=e?.attributes?.icon,s=i||wt(this._entities[t],this.hass);s&&this._emit(`subbuttons.${t}.icon`,s)}}_onIcon(t,e){this._syncingFromConfig||this._emit(`subbuttons.${t}.icon`,e||"")}_onAction(t,e,i,s){if(this._syncingFromConfig)return;const n={...(this.config?.subbuttons?.[t]||{})[`${e}_action`]||{},[i]:s};this._emit(`subbuttons.${t}.${e}_action`,n)}_reset(){this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...at]),this._entities=Array(4).fill(""),this._emit("subbutton_filters",this._filters);for(let t=0;t<4;t++)this._emit(`subbuttons.${t}`,{})}_emit(t,e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}}customElements.define("sub-button-panel",Ft);class Mt extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_room:{type:Object,state:!0},_subbutton:{type:Object,state:!0},_mushroom:{type:Object,state:!0},_sensor:{type:Object,state:!0},_selectedPreset:{type:String,state:!0},_expandedColors:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._room={},this._subbutton={},this._mushroom={},this._sensor={},this._selectedPreset="green",this._expandedColors=[!1,!1,!1]}updated(t){if(t.has("config")){const t=this.config?.colors||{};this._room={icon_active:t.room?.icon_active??"",icon_inactive:t.room?.icon_inactive??"",background_active:t.room?.background_active??"",background_inactive:t.room?.background_inactive??"",text_active:t.room?.text_active??"",text_inactive:t.room?.text_inactive??""},this._subbutton={background_on:t.subbutton?.background_on??"",background_off:t.subbutton?.background_off??"",icon_on:t.subbutton?.icon_on??"",icon_off:t.subbutton?.icon_off??""},this._mushroom={active:t.mushroom?.active??"",inactive:t.mushroom?.inactive??""},this._sensor={sensor_active:t.sensor?.sensor_active??"",sensor_inactive:t.sensor?.sensor_inactive??""}}}get PRESETS(){return{green:{label:"Green",room:{icon_active:"#21df73",icon_inactive:"#21df73",background_active:"rgba(33,223,115,0.24)",background_inactive:"rgba(33,223,115,0.10)",text_active:"#21df73",text_inactive:"#21df73"},sub:{background_on:"rgba(33,223,115,0.24)",background_off:"rgba(33,223,115,0.10)",icon_on:"#21df73",icon_off:"#21df73"},mushroom:{active:"#21df73",inactive:"rgba(33,223,115,0.60)"},sensor:{sensor_active:"#21df73",sensor_inactive:"#21df73"}},blue:{label:"Blue",room:{icon_active:"#55afff",icon_inactive:"#55afff",background_active:"rgba(85,175,255,0.24)",background_inactive:"rgba(85,175,255,0.10)",text_active:"#55afff",text_inactive:"#55afff"},sub:{background_on:"rgba(85,175,255,0.24)",background_off:"rgba(85,175,255,0.10)",icon_on:"#55afff",icon_off:"#55afff"},mushroom:{active:"#55afff",inactive:"rgba(85,175,255,0.60)"},sensor:{sensor_active:"#55afff",sensor_inactive:"#55afff"}},amber:{label:"Amber",room:{icon_active:"#ff9b3d",icon_inactive:"#ff9b3d",background_active:"rgba(255,155,61,0.24)",background_inactive:"rgba(255,155,61,0.10)",text_active:"#ff9b3d",text_inactive:"#ff9b3d"},sub:{background_on:"rgba(255,155,61,0.24)",background_off:"rgba(255,155,61,0.10)",icon_on:"#ff9b3d",icon_off:"#ff9b3d"},mushroom:{active:"#ff9b3d",inactive:"rgba(255,155,61,0.60)"},sensor:{sensor_active:"#ff9b3d",sensor_inactive:"#ff9b3d"}},purple:{label:"Purple",room:{icon_active:"#bd64ff",icon_inactive:"#bd64ff",background_active:"rgba(189,100,255,0.24)",background_inactive:"rgba(189,100,255,0.10)",text_active:"#bd64ff",text_inactive:"#bd64ff"},sub:{background_on:"rgba(189,100,255,0.24)",background_off:"rgba(189,100,255,0.10)",icon_on:"#bd64ff",icon_off:"#bd64ff"},mushroom:{active:"#bd64ff",inactive:"rgba(189,100,255,0.60)"},sensor:{sensor_active:"#bd64ff",sensor_inactive:"#bd64ff"}},red:{label:"Red",room:{icon_active:"#ff5c6a",icon_inactive:"#ff5c6a",background_active:"rgba(255,92,106,0.24)",background_inactive:"rgba(255,92,106,0.10)",text_active:"#ff5c6a",text_inactive:"#ff5c6a"},sub:{background_on:"rgba(255,92,106,0.24)",background_off:"rgba(255,92,106,0.10)",icon_on:"#ff5c6a",icon_off:"#ff5c6a"},mushroom:{active:"#ff5c6a",inactive:"rgba(255,92,106,0.60)"},sensor:{sensor_active:"#ff5c6a",sensor_inactive:"#ff5c6a"}},gray:{label:"Gray",room:{icon_active:"#c5c8ce",icon_inactive:"#c5c8ce",background_active:"rgba(197,200,206,0.24)",background_inactive:"rgba(197,200,206,0.10)",text_active:"#c5c8ce",text_inactive:"#c5c8ce"},sub:{background_on:"rgba(197,200,206,0.24)",background_off:"rgba(197,200,206,0.10)",icon_on:"#c5c8ce",icon_off:"#c5c8ce"},mushroom:{active:"#c5c8ce",inactive:"rgba(197,200,206,0.60)"},sensor:{sensor_active:"#c5c8ce",sensor_inactive:"#c5c8ce"}},yellow:{label:"Yellow",room:{icon_active:"#ffd633",icon_inactive:"#ffd633",background_active:"rgba(255,214,51,0.24)",background_inactive:"rgba(255,214,51,0.10)",text_active:"#ffd633",text_inactive:"#ffd633"},sub:{background_on:"rgba(255,214,51,0.24)",background_off:"rgba(255,214,51,0.10)",icon_on:"#ffd633",icon_off:"#ffd633"},mushroom:{active:"#ffd633",inactive:"rgba(255,214,51,0.60)"},sensor:{sensor_active:"#ffd633",sensor_inactive:"#ffd633"}},teal:{label:"Teal",room:{icon_active:"#00bfa5",icon_inactive:"#00bfa5",background_active:"rgba(0,191,165,0.24)",background_inactive:"rgba(0,191,165,0.10)",text_active:"#00bfa5",text_inactive:"#00bfa5"},sub:{background_on:"rgba(0,191,165,0.24)",background_off:"rgba(0,191,165,0.10)",icon_on:"#00bfa5",icon_off:"#00bfa5"},mushroom:{active:"#00bfa5",inactive:"rgba(0,191,165,0.60)"},sensor:{sensor_active:"#00bfa5",sensor_inactive:"#00bfa5"}}}}static styles=o`
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
      grid-template-rows: auto auto; /* nome sopra, swatches sotto */
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

    /* swatches: etichetta SOTTO al pallino */
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
      flex-direction: column;   /* testo sotto */
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
    /* tasto apply preset */
    .apply-row {
      display: flex;
      justify-content: center;
      padding: 16px 0;
    }

    .apply-btn {
      font-size: 1.1rem;
      padding: 12px 24px;
      border: 2.5px solid #73f6e5;
      color: #073a34;
      background: #73f6e5;
      border-radius: 14px;
      cursor: pointer;
      font-weight: 800;
      transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
    }
    .apply-btn:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }

    /* Sezioni manuali */
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
    input[type="range"] { width: 100%; }
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
  `;render(){return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${t=>{this.expanded=t.detail.expanded,this.expanded&&(this._expandedColors=[!1,!1,!1])}}
      >
        <div slot="header" class="glass-header">🎨 Colors & Presets</div>

        <!-- Preset chooser -->
        ${this._renderPresetChooser()}

        <!-- Room colors -->
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
              ${this._renderColorField("room","text_active","Text Active")}
              ${this._renderColorField("room","text_inactive","Text Inactive")}
            </div>
          `:""}
        </div>

        <!-- Subbutton colors -->
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

        <!-- Mushroom colors -->
        <div class="mini-pill ${this._expandedColors[2]?"expanded":""}">
          <div
            class="mini-pill-header"
            style="--section-accent: #4bd1b4;"
            @click=${()=>this._toggleColor(2)}
          >
            Mushroom Colors
            <span class="chevron">${this._expandedColors[2]?"▼":"▶"}</span>
          </div>
          ${this._expandedColors[2]?N`
            <div class="mini-pill-content">
              ${this._renderColorField("mushroom","active","Active")}
              ${this._renderColorField("mushroom","inactive","Inactive")}
            </div>
          `:""}
        </div>

        <!-- Reset -->
        <button class="reset-button" @click=${()=>this._resetColors()}>
          🧹 Reset Colors
        </button>
      </ha-expansion-panel>
    `}_renderPresetChooser(){const t=Object.keys(this.PRESETS);return N`
      <div class="preset-bar">
        ${t.map(t=>this._renderPresetCard(t,this.PRESETS[t]))}
      </div>
      <div class="apply-row">
        <button class="apply-btn" @click=${this._applySelectedPreset}>
          Apply Preset
        </button>
      </div>
    `}_renderPresetCard(t,e){const i=this._selectedPreset===t?"selected":"",s=e.room.background_active,n=e.room.background_inactive,o=e.room.icon_active,a=e.room.icon_inactive;return N`
      <div class="preset-card ${i}" @click=${()=>this._selectedPreset=t}>
        <div class="preset-name">${e.label}</div>
        <div class="swatches">
          <div class="swatch" style="background:${s}">
            <span class="dot" style="background:${o}"></span>
            <span class="swatch-label">On</span>
          </div>
          <div class="swatch" style="background:${n}">
            <span class="dot" style="background:${a}"></span>
            <span class="swatch-label">Off</span>
          </div>
        </div>
      </div>
    `}_toggleColor(t){this._expandedColors=this._expandedColors.map((e,i)=>i===t&&!e)}_renderColorField(t,e,i){const s=this.config?.colors?.[t]?.[e]||"",[n,o,a,r]=this._parseRGBA(s),c=`#${[n,o,a].map(t=>t.toString(16).padStart(2,"0")).join("")}`;return N`
      <div class="input-group">
        <label>${i}</label>
        <input
          type="color"
          .value=${c}
          @input=${i=>this._updateColor(t,e,i.target.value,r)}
        />
        <input
          type="range"
          min="0" max="1" step="0.01"
          .value=${r}
          @input=${i=>this._updateColor(t,e,c,i.target.value)}
        />
        <input
          type="text"
          .value=${s}
          @input=${i=>this._updateColorRaw(t,e,i.target.value)}
        />
      </div>
    `}_applySelectedPreset=()=>{const t=this._selectedPreset,e=this.PRESETS[t];if(!e)return;const i=[["colors.room.background_active",e.room.background_active],["colors.room.background_inactive",e.room.background_inactive],["colors.room.icon_active",e.room.icon_active],["colors.room.icon_inactive",e.room.icon_inactive],["colors.room.text_active",e.room.text_active],["colors.room.text_inactive",e.room.text_inactive],["colors.subbutton.background_on",e.sub.background_on],["colors.subbutton.background_off",e.sub.background_off],["colors.subbutton.icon_on",e.sub.icon_on],["colors.subbutton.icon_off",e.sub.icon_off],["colors.mushroom.active",e.mushroom.active],["colors.mushroom.inactive",e.mushroom.inactive],["colors.sensor.sensor_active",e.sensor.sensor_active],["colors.sensor.sensor_inactive",e.sensor.sensor_inactive]];for(const[t,e]of i)this._emit(t,e)};_resetColors(){this._expandedColors=[!1,!1,!1];const t={room:["background_active","background_inactive","icon_active","icon_inactive","text_active","text_inactive"],subbutton:["background_on","background_off","icon_on","icon_off"],mushroom:["active","inactive"],sensor:["sensor_active","sensor_inactive"]};["room","subbutton","mushroom","sensor"].forEach(e=>{t[e].forEach(t=>this._emit(`colors.${e}.${t}`,""))})}_parseRGBA(t){if(!t)return[0,0,0,1];const e=/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(t);if(e)return[+e[1],+e[2],+e[3],+(e[4]??1)];if(t.startsWith("#")&&(7===t.length||4===t.length)){const e=7===t.length?t.slice(1):t.slice(1).split("").map(t=>t+t).join("");return[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16),1]}return[0,0,0,1]}_updateColor(t,e,i,s){const n=parseInt(i.slice(1,3),16),o=parseInt(i.slice(3,5),16),a=parseInt(i.slice(5,7),16),r=Number(s),c=`rgba(${n},${o},${a},${isNaN(r)?1:r})`;this._emit(`colors.${t}.${e}`,c)}_updateColorRaw(t,e,i){this._emit(`colors.${t}.${e}`,i)}_emit(t,e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}}customElements.define("color-panel",Mt);class Ot extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_entity:{type:String,state:!0},_icon:{type:String,state:!0},_candidates:{type:Array,state:!0},_presence:{type:String,state:!0},_presenceCandidates:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._entity="",this._icon="",this._candidates=[],this._presence="",this._presenceCandidates=[],this._syncingFromConfig=!1}updated(t){if(t.has("config")||t.has("hass")){if(this._syncingFromConfig=!0,this.config?.area||this.config?.area_id){const t=_t(this.hass,this.config,"area",!1);t&&t!==this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}this._entity=this.config?.entities?.camera?.entity||"",this._icon=this.config?.entities?.camera?.icon||"",this._presence=this.config?.entities?.camera?.presence?.entity||"";if(this.config?.auto_discovery_sections?.camera??!1){this._candidates=ft(this.hass,this.config,"camera")||[];const t=(ft(this.hass,this.config,"presence",["motion","occupancy","presence","moving"])||[]).filter(t=>t.startsWith("binary_sensor."));this._presence&&!t.includes(this._presence)&&t.unshift(this._presence),this._presenceCandidates=t}else{let t=Object.keys(this.hass?.states||{}).filter(t=>t.startsWith("camera."));this._entity&&!t.includes(this._entity)&&t.unshift(this._entity),this._candidates=t;let e=Object.keys(this.hass?.states||{}).filter(t=>t.startsWith("binary_sensor."));this._presence&&!e.includes(this._presence)&&e.unshift(this._presence),this._presenceCandidates=e}if(this._entity&&!this._icon){const t=this.hass?.states?.[this._entity],e=t?.attributes?.icon||wt(this._entity,this.hass);e&&(this._icon=e)}this._syncingFromConfig=!1}}static styles=o`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important; width: 100%; box-sizing: border-box;
      border-radius: 40px; position: relative;
      background: var(--glass-bg, rgba(80,120,200,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(80,120,200,0.18));
      overflow: hidden;
    }
    .glass-panel::after {
      content:''; position:absolute; inset:0; border-radius:inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.18),
        rgba(255,255,255,0.10) 70%, transparent 100%));
      pointer-events:none;
    }
    .glass-header {
      padding: 22px 0; text-align: center; font-size: 1.12rem;
      font-weight: 700; color: #fff;
    }
    .input-group.autodiscover {
      margin: 0 16px 13px; padding: 14px 18px 10px;
      background: rgba(20,40,70,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(40,120,180,0.10);
      border-radius: 18px; display:flex; align-items:center; gap:8px;
    }
    .input-group { margin: 12px 16px; }
    .input-group label {
      display:block; font-weight:700; margin-bottom:6px; color:#a7c7ff;
    }
    ha-selector, ha-icon-picker { width:100%; box-sizing:border-box; }
    .reset-button {
      border: 3.5px solid #ff4c6a; color:#ff4c6a; border-radius:24px;
      padding:12px 38px; background:transparent; cursor:pointer;
      display:block; margin: 20px auto; font-size:1.15rem; font-weight:700;
      box-shadow: 0 2px 24px #ff4c6a44;
    }
  `;render(){const t=this.config?.auto_discovery_sections?.camera??!1;return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${t=>this.expanded=t.detail.expanded}
      >
        <div slot="header" class="glass-header">📷 Camera</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${t}
            @change=${t=>this._toggleAuto(t.target.checked)}
          />
          <label>🪄 Auto-discover</label>
        </div>

        <div class="input-group">
          <label>Camera (ID):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._entity}
            .selector=${this._candidates.length?{entity:{include_entities:this._candidates,multiple:!1}}:{entity:{domain:"camera"}}}
            allow-custom-entity
            @value-changed=${t=>this._onEntity(t.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Camera Icon:</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this._icon}
            allow-custom-icon
            @value-changed=${t=>this._onIcon(t.detail.value)}
          ></ha-icon-picker>
        </div>
        
        <div class="input-group">
          <label>Presence/Motion Entity:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._presence}
            .selector=${this._presenceCandidates.length?{entity:{include_entities:this._presenceCandidates,multiple:!1}}:{entity:{domain:"binary_sensor"}}}
            allow-custom-entity
            @value-changed=${t=>this._onPresence(t.detail.value)}
          ></ha-selector>
        </div>


        <button
          class="reset-button"
          @click=${()=>this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"camera"},bubbles:!0,composed:!0}))}
        >🧹 Reset Camera</button>
      </ha-expansion-panel>
    `}_toggleAuto(t){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.camera",val:t},bubbles:!0,composed:!0}))}_onEntity(t){if(this._entity=t||"",this._syncingFromConfig)return;this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.entity",val:this._entity},bubbles:!0,composed:!0}));if(!(this.config?.entities?.camera?.icon||"")&&this._entity){const t=this.hass?.states?.[this._entity],e=t?.attributes?.icon,i=e||wt(this._entity,this.hass);i&&(this._icon=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:i},bubbles:!0,composed:!0})))}}_onPresence(t){this._presence=t||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.presence.entity",val:this._presence},bubbles:!0,composed:!0}))}_onIcon(t){this._icon=t||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:this._icon},bubbles:!0,composed:!0}))}_onIcon(t){this._icon=t||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:this._icon},bubbles:!0,composed:!0}))}_reset=()=>{this._entity="",this._icon="",void 0!==this._presence&&(this._presence=""),Array.isArray(this._candidates)&&(this._candidates=[]),Array.isArray(this._presenceCandidates)&&(this._presenceCandidates=[]),this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"camera"},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.entity",val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.presence.entity",val:""},bubbles:!0,composed:!0}))}}customElements.define("camera-panel",Ot);class jt extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_entity:{type:String,state:!0},_icon:{type:String,state:!0},_candidates:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._entity="",this._icon="",this._candidates=[],this._syncingFromConfig=!1}updated(t){if(!t.has("config")&&!t.has("hass"))return;if(this._syncingFromConfig=!0,this.config?.area||this.config?.area_id){const t=_t(this.hass,this.config,"area",!1);t&&t!==this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}const e=this.config?.entities?.climate?.entity||"",i=this.config?.entities?.climate?.icon||"";this._entity=e,this._icon=i;if(this.config?.auto_discovery_sections?.climate??!1){const t=ft(this.hass,this.config,"climate")||[];this._candidates=Array.isArray(t)?t:[]}else{let t=Object.keys(this.hass?.states||{}).filter(t=>t.startsWith("climate."));this._entity&&!t.includes(this._entity)&&t.unshift(this._entity),this._candidates=t}if(this._entity&&!this._icon){const t=this.hass?.states?.[this._entity],e=t?.attributes?.icon,i=e||wt(this._entity,this.hass);i&&(this._icon=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.icon",val:i},bubbles:!0,composed:!0})))}this._syncingFromConfig=!1}static styles=o`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important; width: 100%; box-sizing: border-box;
      border-radius: 40px; position: relative;
      background: var(--glass-bg, rgba(200,120,80,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(200,120,80,0.18));
      overflow: hidden;
    }
    .glass-panel::after {
      content:''; position:absolute; inset:0; border-radius:inherit;
      background: var(--glass-sheen,
        linear-gradient(120deg, rgba(255,255,255,0.18),
        rgba(255,255,255,0.10) 70%, transparent 100%));
      pointer-events:none;
    }
    .glass-header {
      padding: 22px 0; text-align: center; font-size: 1.12rem;
      font-weight: 700; color: #fff;
    }
    .input-group.autodiscover {
      margin: 0 16px 13px; padding: 14px 18px 10px;
      background: rgba(20,40,70,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(40,120,180,0.10);
      border-radius: 18px; display:flex; align-items:center; gap:8px;
    }
    .input-group { margin: 12px 16px; }
    .input-group label {
      display:block; font-weight:700; margin-bottom:6px; color:#ffb07e;
    }
    ha-selector, ha-icon-picker { width:100%; box-sizing:border-box; }
    .reset-button {
      border: 3.5px solid #ff4c6a; color:#ff4c6a; border-radius:24px;
      padding:12px 38px; background:transparent; cursor:pointer;
      display:block; margin: 20px auto; font-size:1.15rem; font-weight:700;
      box-shadow: 0 2px 24px #ff4c6a44;
    }
  `;render(){const t=this.config?.auto_discovery_sections?.climate??!1;return N`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${t=>this.expanded=t.detail.expanded}
      >
        <div slot="header" class="glass-header">🌡️ Climate</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${t}
            @change=${t=>this._toggleAuto(t.target.checked)}
          />
          <label>🪄 Auto-discover</label>
        </div>

        <div class="input-group">
          <label>Climate (ID):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._entity}
            .selector=${this._candidates.length?{entity:{include_entities:this._candidates,multiple:!1}}:{entity:{domain:"climate"}}}
            allow-custom-entity
            @value-changed=${t=>this._onEntity(t.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Climate Icon:</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this._icon}
            allow-custom-icon
            @value-changed=${t=>this._onIcon(t.detail.value)}
          ></ha-icon-picker>
        </div>

        <button
          class="reset-button"
          @click=${()=>this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"climate"},bubbles:!0,composed:!0}))}
        >🧹 Reset Climate</button>
      </ha-expansion-panel>
    `}_toggleAuto(t){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.climate",val:t},bubbles:!0,composed:!0}))}_onEntity(t){if(this._entity=t||"",this._syncingFromConfig)return;this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.entity",val:this._entity},bubbles:!0,composed:!0}));if(!(this.config?.entities?.climate?.icon||"")&&this._entity){const t=this.hass?.states?.[this._entity],e=t?.attributes?.icon,i=e||wt(this._entity,this.hass);i&&(this._icon=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.icon",val:i},bubbles:!0,composed:!0})))}}_onIcon(t){this._icon=t||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.icon",val:this._icon},bubbles:!0,composed:!0}))}}customElements.define("climate-panel",jt);class Tt extends st{static properties={hass:{type:Object},config:{type:Object},openPanel:{type:String,state:!0}};constructor(){super(),this.hass=void 0,this.config={},this.openPanel="",this._onPanelChanged=this._onPanelChanged.bind(this),this._onPanelCmd=this._onPanelCmd.bind(this),this._togglePanel=this._togglePanel.bind(this),this._onConfigChanged=this._onConfigChanged.bind(this)}setConfig(t){this.config={type:t?.type||"custom:bubble-room",...t||{}},this.requestUpdate()}set value(t){this.config=t||{}}get value(){return this.config}connectedCallback(){super.connectedCallback(),this.addEventListener("panel-changed",this._onPanelChanged),this.addEventListener("__panel_cmd__",this._onPanelCmd)}disconnectedCallback(){this.removeEventListener("panel-changed",this._onPanelChanged),this.removeEventListener("__panel_cmd__",this._onPanelCmd),super.disconnectedCallback()}_emitConfig(t){const e={type:this.config?.type||"custom:bubble-room",...t||{}};this.config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0})),this.requestUpdate()}_setConfigValue(t,e){const i=String(t).split("."),s=structuredClone(this.config||{});let n=s;for(let t=0;t<i.length-1;t++){const e=i[t];"object"==typeof n[e]&&null!==n[e]||(n[e]={}),n=n[e]}n[i[i.length-1]]=e,this._emitConfig(s)}_onPanelChanged(t){t.stopPropagation();const{prop:e,val:i}=t.detail||{};if(!e)return;const s=this.config,n=structuredClone(s||{}),o=String(e).split(".");let a=n;for(let t=0;t<o.length-1;t++){const e=o[t];"object"==typeof a[e]&&null!==a[e]||(a[e]={}),a=a[e]}a[o[o.length-1]]=i;const r="area"===e,c=e.startsWith("auto_discovery_sections."),l=r||c?_t(this.hass,n,e,!1):n;this._emitConfig(l)}_onConfigChanged(t){t.stopPropagation();const{path:e,value:i}=t.detail||{};if(!e)return;const s=this.config,n=structuredClone(s||{}),o=String(e).split(".");let a=n;for(let t=0;t<o.length-1;t++){const e=o[t];"object"==typeof a[e]&&null!==a[e]||(a[e]={}),a=a[e]}a[o[o.length-1]]=i;const r="area"===e,c=e.startsWith("auto_discovery_sections."),l=r||c?_t(this.hass,n,e,!1):n;this._emitConfig(l)}_onPanelCmd(t){t.stopPropagation();const{cmd:e,section:i}=t.detail||{};if("reset"!==e)return;let s=this.config||{};switch(i){case"room":s=function(t){const e={...t.entities||{}};delete e.presence;const i={...t,entities:e};return delete i.name,delete i.icon,delete i.area,delete i.presence_entity,i}(s);break;case"sensors":s=function(t){const e={...t.entities||{}};return["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6","sensor7","sensor8"].forEach(t=>delete e[t]),{...t,entities:e}}(s);break;case"mushrooms":s=function(t){const e={...t.entities||{}};return["mushroom1","mushroom2","mushroom3","mushroom4","mushroom5","climate","camera"].forEach(t=>delete e[t]),{...t,entities:e}}(s);break;case"subbuttons":s=function(t){const e={...t.entities||{}};return["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"].forEach(t=>delete e[t]),{...t,entities:e}}(s);break;case"climate":s=function(t){const e={...t.entities||{}};return delete e.climate,{...t,entities:e}}(s);break;case"camera":s=function(t){const e={...t.entities||{}};return delete e.camera,{...t,entities:e}}(s);break;default:return}const n=s?.auto_discovery_sections||{};(n.sensor||n.mushroom||n.subbutton||n.presence||n.climate||n.camera)&&(s=_t(this.hass,s,void 0,!1)),this._emitConfig(s)}_togglePanel(t,e){const i=t?.detail?.expanded;this.openPanel=i?e:""}static styles=o`
    :host { display:block; }
    .editor-grid {
      display:grid; gap: 16px;
      grid-template-columns: 1fr;
      align-items: start;
    }
  `;render(){const t=this.config||{};return N`
      <div class="editor-grid">
        <!-- ROOM -->
        <room-panel
          .hass=${this.hass}
          .config=${t}
          .expanded=${"room"===this.openPanel}
          @expanded-changed=${t=>this._togglePanel(t,"room")}
          @panel-changed=${this._onPanelChanged}
        ></room-panel>

        <!-- CLIMATE -->
        <climate-panel
          .hass=${this.hass}
          .config=${t}
          .expanded=${"climate"===this.openPanel}
          @expanded-changed=${t=>this._togglePanel(t,"climate")}
          @panel-changed=${this._onPanelChanged}
        ></climate-panel>

        <!-- CAMERA -->
        <camera-panel
          .hass=${this.hass}
          .config=${t}
          .expanded=${"camera"===this.openPanel}
          @expanded-changed=${t=>this._togglePanel(t,"camera")}
          @panel-changed=${this._onPanelChanged}
        ></camera-panel>

        <!-- SENSOR -->
        <sensor-panel
          .hass=${this.hass}
          .config=${t}
          .expanded=${"sensor"===this.openPanel}
          @expanded-changed=${t=>this._togglePanel(t,"sensor")}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></sensor-panel>

        <!-- MUSHROOM -->
        <mushroom-panel
          .hass=${this.hass}
          .config=${t}
          .expanded=${"mushroom"===this.openPanel}
          @expanded-changed=${t=>this._togglePanel(t,"mushroom")}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></mushroom-panel>

        <!-- SUBBUTTON -->
        <sub-button-panel
          .hass=${this.hass}
          .config=${t}
          .expanded=${"subbuttons"===this.openPanel}
          @expanded-changed=${t=>this._togglePanel(t,"subbuttons")}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></sub-button-panel>

        <!-- COLORS -->
        <color-panel
          .hass=${this.hass}
          .config=${t}
          .expanded=${"colors"===this.openPanel}
          @expanded-changed=${t=>this._togglePanel(t,"colors")}
          @panel-changed=${this._onPanelChanged}
          @config-changed=${this._onConfigChanged}
        ></color-panel>
      </div>
    `}}customElements.define("bubble-room-editor",Tt);var Rt=Object.freeze({__proto__:null,BubbleRoomEditor:Tt});class Nt extends st{static properties={subbuttons:{type:Array}};constructor(){super(),this.subbuttons=[],this._holdThreshold=500,this._holdTimer=null,this._holdFired=!1,this._currentIndex=-1}static styles=o`
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
  `;render(){return N`
      <div class="container">
        ${this.subbuttons.map((t,e)=>{const i=t.active?t.colorOn:t.colorOff,s=t.active?t.iconOn:t.iconOff;return N`
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
    `}_onDown(t){this._holdFired=!1,this._currentIndex=t,this._holdTimer=window.setTimeout(()=>{this._holdFired=!0,this._fireHassAction(t,"hold")},this._holdThreshold)}_onUp(t){this._clearHoldTimer(),this._holdFired||this._currentIndex!==t||this._fireHassAction(t,"tap")}_clearHoldTimer(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)}_fireHassAction(t,e){const i=this.subbuttons?.[t];if(!i||!i.entity_id)return;const s={entity:i.entity_id,tap_action:i.tap_action||{action:"toggle"},hold_action:i.hold_action||{action:"more-info"}},n=new Event("hass-action",{bubbles:!0,composed:!0});n.detail={config:s,action:e},this.dispatchEvent(n)}}customElements.define("bubble-subbutton",Nt);class It extends st{static properties={hass:{type:Object},name:{type:String},area:{type:String},config:{type:Object},container:{type:Object},fitMode:{type:String},stretchY:{type:Number}};constructor(){super(),this.name="",this.fitMode="height",this.stretchY=1.12,this._raf=null,this._resizeObs=null,this._lastScale=null,this._lastBox=null}_ensureFonts(){const t=this.renderRoot||this.shadowRoot;if(!t)return;if(t.querySelector('link[data-bubble-fonts="1"]'))return;const e=document.createElement("link");e.rel="preconnect",e.href="https://fonts.gstatic.com",e.crossOrigin="anonymous",e.setAttribute("data-bubble-fonts","1"),t.appendChild(e);const i=document.createElement("link");i.rel="stylesheet",i.href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap",i.setAttribute("data-bubble-fonts","1"),i.addEventListener("load",()=>{requestAnimationFrame(()=>this._scheduleScale())}),t.appendChild(i)}firstUpdated(){this._ensureFonts(),this._scheduleScale(),this._resizeObs=new ResizeObserver(t=>{const e=t[0];let i=0,s=0;if(e?.contentBoxSize){const t=Array.isArray(e.contentBoxSize)?e.contentBoxSize[0]:e.contentBoxSize;i=Math.round(t.inlineSize),s=Math.round(t.blockSize)}else{const t=this.getBoundingClientRect();i=Math.round(t.width),s=Math.round(t.height)}(!this._lastBox||Math.abs(i-this._lastBox.w)>2||Math.abs(s-this._lastBox.h)>2)&&(this._lastBox={w:i,h:s},this._scheduleScale())}),this._resizeObs.observe(this),window.addEventListener("resize",this._scheduleScale,{passive:!0})}updated(t){(t.has("name")||t.has("config")||t.has("container")||t.has("fitMode")||t.has("stretchY"))&&this._scheduleScale()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObs?.disconnect(),window.removeEventListener("resize",this._scheduleScale)}_scheduleScale=()=>{this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=null,this._autoScaleFont()}))};_autoScaleFont(){const t=this.renderRoot.querySelector(".bubble-name"),e=this.container||this.parentElement||this;if(!t||!e)return;const i=this.name??"",s=Math.max(0,Math.round(e.clientWidth)),n=Math.max(0,Math.round(e.clientHeight));if(this._lastScale&&this._lastScale.text===i&&this._lastScale.w===s&&this._lastScale.h===n&&this._lastScale.fitMode===this.fitMode&&this._lastScale.stretchY===this.stretchY)return;this._resizeObs.disconnect(),t.style.fontSize="10px",t.style.transform="none";const o=240;let a;if("height"===this.fitMode){let e=8,i=o;for(let s=0;s<9&&e<=i;s++){const s=e+i>>1;t.style.fontSize=`${s}px`;t.scrollHeight<=n?e=s+1:i=s-1}a=Math.max(8,Math.min(o,i)),t.style.fontSize=`${a}px`;const r=t.scrollWidth;if(r>s&&r>0){const t=s/r;a=Math.floor(a*t)}}else{let e=8,i=o;for(let o=0;o<8&&e<=i;o++){const o=e+i>>1;t.style.fontSize=`${o}px`,t.scrollWidth<=s&&t.scrollHeight<=n?e=o+1:i=o-1}a=Math.max(8,Math.min(o,i))}t.style.fontSize=`${a}px`,this.stretchY&&1!==this.stretchY?(t.style.transform=`scaleY(${this.stretchY})`,t.style.transformOrigin="center"):t.style.transform="none",this._lastScale={text:i,w:s,h:n,fitMode:this.fitMode,stretchY:this.stretchY},this._resizeObs.observe(this)}render(){return N`
      <div class="bubble-name" title="${this.name||""}">
        ${this.name}
      </div>
    `}static styles=o`
    :host { display: block; }

    .bubble-name {
      /* centratura e layout */
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      /* leading serrato: riduce lo spazio sopra/sotto */
      line-height: 0.95;

      /* font stack “alto”: caricato automaticamente */
      font-family:
        "Bebas Neue",
        "Oswald",
        "Roboto Condensed",
        "Arial Narrow",
        Arial, sans-serif;

      font-weight: 700;
      letter-spacing: 0.01em;
      font-stretch: condensed;

      text-align: center;
      white-space: nowrap;
      text-transform: uppercase;
      color: var(--bubble-room-name-color, white);

      margin: 0;
      padding: 0;

      user-select: none;
    }
  `}customElements.define("bubble-name",It);class Ut extends st{static properties={sensors:{type:Array}};constructor(){super(),this.sensors=[],this.rows=1,this.columns=1,this._resizeObserver=null,this._resizeScheduled=!1,this._autoscaleScheduled=!1,this._lastBox={w:0,h:0},this._pillCache=new WeakMap,this._pendingChanged=null,this._sharedSize=new Map}connectedCallback(){super.connectedCallback(),this._updateLayout(),this._sharedSize.clear(),this._scheduleAutoscale(),this._resizeObserver=new ResizeObserver(t=>{const e=t[0];let i=0,s=0;if(e&&e.contentBoxSize){const t=Array.isArray(e.contentBoxSize)?e.contentBoxSize[0]:e.contentBoxSize;i=Math.round(t.inlineSize),s=Math.round(t.blockSize)}else{const t=this.getBoundingClientRect();i=Math.round(t.width),s=Math.round(t.height)}(Math.abs(i-this._lastBox.w)>2||Math.abs(s-this._lastBox.h)>2)&&(this._lastBox={w:i,h:s},this._sharedSize.clear(),this._scheduleAutoscale())}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=null}updated(t){if(t.has("sensors")){const e=t.get("sensors")||[];this._updateLayout(),this._sharedSize.clear();const i=this._diffChangedSensorIndices(e,this.sensors);if(0===i.size)return;this._scheduleAutoscale(i)}}_updateLayout(){const t=this.sensors?.length||0;this.rows=t>5?2:1,this.columns=t>5?5:t||1}_scheduleAutoscale(t=null){this._autoscaleScheduled?this._pendingChanged=this._mergeChanged(this._pendingChanged,t):(this._pendingChanged=this._mergeChanged(this._pendingChanged,t),this._autoscaleScheduled=!0,requestAnimationFrame(()=>{this._autoscaleScheduled=!1;const t=this._pendingChanged;this._pendingChanged=null,this._autoScaleValues(t)}))}_mergeChanged(t,e){if(!t&&!e)return null;if(!t)return e instanceof Set?new Set(e):null;if(!e)return t instanceof Set?new Set(t):null;const i=new Set(t);for(const t of e)i.add(t);return i}_keyForPill(t){return`${Math.round(t.clientWidth)||0}x${Math.round(t.clientHeight)||0}|u:${!!t.querySelector(".sensor-unit")?.textContent?.trim()?"1":"0"}|l:${!!t.querySelector(".sensor-label")?.textContent?.trim()?"1":"0"}|i:${!!t.querySelector(".sensor-icon")?"1":"0"}`}_textWeight(t){const e=e=>t.querySelector(e)?.textContent??"",i=e(".sensor-value"),s=e(".sensor-unit"),n=e(".sensor-label");return i.length+.8*s.length+1.1*n.length}_measureAndApply(t){this._fitValueAndUnit(t);const e=t.querySelector(".sensor-value"),i=t.querySelector(".sensor-unit"),s=t.querySelector(".sensor-label"),n=t.querySelector(".sensor-icon"),o=parseFloat(getComputedStyle(e).fontSize)||10;return{best:o,unit:i?parseFloat(getComputedStyle(i).fontSize)||Math.round(.5*o):0,label:s?parseFloat(getComputedStyle(s).fontSize)||Math.round(.5*o):0,icon:n?parseFloat(getComputedStyle(n).fontSize)||Math.round(.5*o):0}}_applySharedSize(t,e){const i=t.querySelector(".sensor-value"),s=t.querySelector(".sensor-unit"),n=t.querySelector(".sensor-label"),o=t.querySelector(".sensor-icon");i&&(i.style.fontSize=`${e.best}px`,s&&(s.style.fontSize=`${e.unit}px`),n&&(n.style.fontSize=`${e.label}px`),o&&(o.style.fontSize=`${e.icon}px`),this._pillCache.set(t,{text:i.textContent??"",unitText:s?s.textContent??"":"",labelTxt:n?n.textContent??"":"",iconName:o?.getAttribute("icon")||o?.icon||"",boxW:Math.round(t.clientWidth),boxH:Math.round(t.clientHeight),best:e.best}))}_autoScaleValues(t=null){const e=this.renderRoot?.querySelectorAll(".sensor-pill");if(!e?.length)return;const i=t?Array.from(t).map(t=>e[t]).filter(Boolean):Array.from(e);if(!i.length)return;const s=new Map;for(const t of i){const e=this._keyForPill(t);s.has(e)||s.set(e,[]),s.get(e).push(t)}for(const[t,e]of s.entries()){const i=this._sharedSize.get(t);if(i){for(const t of e)this._applySharedSize(t,i);continue}let s=e[0],n=this._textWeight(s);for(let t=1;t<e.length;t++){const i=this._textWeight(e[t]);i>n&&(n=i,s=e[t])}const o=this._measureAndApply(s);this._sharedSize.set(t,o);for(const t of e)t!==s&&this._applySharedSize(t,o)}}_fitValueAndUnit(t){const e=t.querySelector(".sensor-value"),i=t.querySelector(".sensor-unit"),s=t.querySelector(".sensor-label"),n=t.querySelector(".sensor-icon");if(!e)return;const o=e.textContent??"",a=i?i.textContent??"":"",r=s?s.textContent??"":"",c=n?.getAttribute("icon")||n?.icon||"",l=Math.round(t.clientWidth),d=Math.round(t.clientHeight);if(l<=0||d<=0)return;const h=this._pillCache.get(t);if(h&&h.text===o&&h.unitText===a&&h.labelTxt===r&&h.iconName===c&&h.boxW===l&&h.boxH===d)return;e.style.fontSize="",i&&(i.style.fontSize=""),s&&(s.style.fontSize=""),n&&(n.style.fontSize="");const p=Math.max(0,l-0),u=Math.max(0,d-0);if(0===p||0===u)return;let g=5,b=Math.min(40,u),f=g;for(let t=0;t<8&&g<=b;t++){const t=g+b>>1;e.style.fontSize=`${t}px`,i&&(i.style.fontSize=`${Math.max(5,Math.round(.7*t))}px`),s&&(s.style.fontSize=`${Math.max(5,Math.round(.7*t))}px`),n&&(n.style.fontSize=`${Math.max(5,Math.round(.7*t))}px`);const o=e.offsetWidth,a=e.offsetHeight,r=i?i.offsetWidth:0,c=i?i.offsetHeight:0,l=s?s.offsetWidth:0,d=s?s.offsetHeight:0,h=n?n.offsetWidth:0,m=n?n.offsetHeight:0,_=(h>0?h:0)+l+o+(r>0?1+r:0),v=Math.max(m,d,a,c);_<=p&&v<=u?(f=t,g=t+1):b=t-1}e.style.fontSize=`${f}px`,i&&(i.style.fontSize=`${Math.max(5,Math.round(.7*f))}px`),s&&(s.style.fontSize=`${Math.max(5,Math.round(.7*f))}px`),n&&(n.style.fontSize=`${Math.max(5,Math.round(.7*f))}px`),this._pillCache.set(t,{text:o,unitText:a,labelTxt:r,iconName:c,boxW:l,boxH:d,best:f})}_formatValueForCompare(t){if(null==t)return"--";let e=null;if("number"==typeof t)e=t;else if("string"==typeof t){const i=t.replace(",",".").match(/-?\d+(?:\.\d+)?/);i&&(e=Number(i[0]))}return Number.isFinite(e)?Number.isInteger(e)?String(e):e.toFixed(1):String(t).trim().replace(/\s+/g," ")}_formatValueForDisplay(t,e=1,i=!0){if(null==t)return"--";if("number"==typeof t&&Number.isFinite(t))return i&&Number.isInteger(t)?String(t):t.toFixed(e);if("string"==typeof t){const s=t.replace(",",".").match(/-?\d+(?:\.\d+)?/);if(s){const t=Number(s[0]);if(Number.isFinite(t))return i&&Number.isInteger(t)?String(t):t.toFixed(e)}return t.trim()}return String(t)}_getSensorKey(t,e){return t?.entity||t?.entity_id||`idx:${e}`}_diffChangedSensorIndices(t=[],e=[]){const i=new Set;if((t?.length||0)!==(e?.length||0)){for(let t=0;t<(e?.length||0);t++)i.add(t);return i}const s=new Map(e.map((t,e)=>[this._getSensorKey(t,e),e]));return t.forEach((t,n)=>{const o=this._getSensorKey(t,n),a=s.get(o);if(void 0===a)return void(n<e.length&&i.add(n));const r=e[a];([t?.label??"",this._formatValueForCompare(t?.value),t?.unit??""].join("|")!==[r?.label??"",this._formatValueForCompare(r?.value),r?.unit??""].join("|")||(t?.icon??"")!==(r?.icon??"")||(t?.device_class??"")!==(r?.device_class??"")||(t?.color??"")!==(r?.color??""))&&i.add(a)}),i}_openMoreInfo(t){if(!t||"string"!=typeof t)return;const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}});(document.querySelector("home-assistant")||this).dispatchEvent(e)}static styles=o`
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
      gap: 0;                /* nessuno spazio tra le celle */
    }
    .sensor-pill {
      display: flex;
      align-items: center;
      background: transparent;  /* niente sfondo */
      border: 0;                /* niente bordo */
      border-radius: 0;         /* niente raggio, si toccano */
      font-size: 1em;
      font-family: "Bebas Neue", "Arial Narrow", sans-serif;
      font-weight: 700;
      color: #e3f6ff;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      contain: strict;
      cursor: pointer;
      padding: 0;     
      justify-content: center;  
      text-align: center;         
    }
    .sensor-label {
      font-weight: 600;
      font-size: 0.5em;           /* sarà scalata via JS */
      line-height: 1;
      display: inline-block;
      flex: 0 0 auto;
    }
    .sensor-value {
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
      line-height: 1;
      flex: 0 0 auto;
    }
    .sensor-unit {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
      margin-left: 1px;         /* separa valore e unità */
      flex: 0 0 auto;
      opacity: 1;               /* assicurati sia visibile */
    }
  `;render(){const t=(this.sensors||[]).map(t=>{const e=t.device_class,i=Et[e]||{},s=i.emoji||"❓",n=t.unit||i.units?.[0]||"",o=this._formatValueForDisplay(t.value,1,!0);return{...t,value:o,label:s,unit:n}});return N`
      <div
        class="sensor-grid"
        style="
          grid-template-columns: repeat(${this.columns}, 1fr);
          grid-template-rows: repeat(${this.rows}, 1fr);
        "
      >
        ${t.map(t=>{const e=t.entity||t.entity_id||"",i=e?`Show history graph: ${e}`:"Show history graph";return N`
            <div
              class="sensor-pill"
              style="color:${t.color||"#e3f6ff"}"
              title="${i}"
              role="button"
              tabindex="0"
              @click=${()=>this._openMoreInfo(e)}
              @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||this._openMoreInfo(e)}}
            >
              <ha-icon class="sensor-icon" .icon="${t.icon||""}"></ha-icon>
              <span class="sensor-label">${t.label||""}</span>
              <span class="sensor-value">${t.value??"--"}</span>
              <span class="sensor-unit">${t.unit||""}</span>
            </div>
          `})}
      </div>
    `}}customElements.define("bubble-sensor",Ut);class Bt extends st{static properties={entities:{type:Array}};constructor(){super(),this.entities=[],this._containerSize={width:0,height:0},this._rafSize=null,this._ro=new ResizeObserver(t=>{const e=t[0]?.contentRect;e&&(this._rafSize&&cancelAnimationFrame(this._rafSize),this._rafSize=requestAnimationFrame(()=>{const t=Math.round(e.width),i=Math.round(e.height);t===this._containerSize.width&&i===this._containerSize.height||(this._containerSize={width:t,height:i},this.requestUpdate())}))}),this._holdThreshold=500,this._holdTimer=null,this._holdFired=!1,this._lastTapTs=0}connectedCallback(){super.connectedCallback(),this._ro.observe(this)}disconnectedCallback(){this._ro.disconnect(),super.disconnectedCallback()}_updateSize(){const t=this.getBoundingClientRect();this._containerSize={width:t.width,height:t.height},this.requestUpdate()}_handleClick(t){this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:{entity:t.entity_id,tap_action:t.tap_action||{action:"toggle"},hold_action:t.hold_action||{action:"more-info"}},action:"tap"},bubbles:!0,composed:!0}))}_dispatchAction(t,e){const i={entity:t.entity_id||t.entity||t,tap_action:t.tap_action||{action:"toggle"},hold_action:t.hold_action||{action:"more-info"},double_tap_action:t.double_tap_action};this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:i,action:e},bubbles:!0,composed:!0}))}_onPointerDown(t,e){t.preventDefault(),this._holdFired=!1,clearTimeout(this._holdTimer),this._holdTimer=setTimeout(()=>{this._holdFired=!0,this._dispatchAction(e,"hold")},this._holdThreshold)}_onPointerUp(t,e){if(t.preventDefault(),clearTimeout(this._holdTimer),this._holdFired)return void(this._holdFired=!1);const i=Date.now();if(e?.double_tap_action&&i-this._lastTapTs<300)return this._lastTapTs=0,void this._dispatchAction(e,"double_tap");this._lastTapTs=i,setTimeout(()=>{Date.now()-this._lastTapTs>=280&&this._dispatchAction(e,"tap")},280)}_onPointerCancel(){clearTimeout(this._holdTimer),this._holdFired=!1}static styles=o`
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
    }
    .mushroom-entity ha-icon { display: block; }
  `;render(){const{width:t,height:e}=this._containerSize;if(!t||!e)return N``;const i=window.innerWidth||t,s=.55;let n;if(i<=100)n=s;else if(i>=200)n=.25;else{n=s+(.25-s)*((i-100)/100)}const o=Math.min(t,1.6*e),a=.5*(e+o)*n,r=.6*t,c=.6*e,l=r*Math.min(1,t/(2*r)),d=c*Math.min(1,e/(2*c)),h=t-l,p=.5*e,u=Math.max(0,l-a/2-1),g=Math.max(0,d-a/2-1),b=t=>Math.PI*t/180,f=b(30),m=b(85),_=.75*a,v=.75*a,x=[{x:a/2+1,y:a/2+1},{x:h+u*Math.cos(-m),y:p+g*Math.sin(-m)},{x:h+u*Math.cos(-f),y:p+g*Math.sin(-f)},{x:h+u*Math.cos(+f),y:p+g*Math.sin(+f)},{x:h+u*Math.cos(+m),y:p+g*Math.sin(+m)}];let y=0;return N`
      ${this.entities.map(i=>{const s="camera"===i?.kind,n="climate"===i?.kind,o=s?_:n?v:a,r=.95*o;let c;s?c={x:t-o/2,y:o/2}:n?c={x:o/2+1,y:e-o/2-1}:(c=x[Math.min(y,x.length-1)]??{x:h,y:p},y++);const l=s||n?0:i.dx??0,d=s||n?0:i.dy??0,u=c.x+l,g=c.y+d;return N`
          <div
            class="mushroom-entity"
            style="
              left:${u}px;
              top:${g}px;
              width:${o}px;
              height:${o}px;
              color:${i.color};
            "
            @pointerdown=${t=>this._onPointerDown(t,i)}
            @pointerup=${t=>this._onPointerUp(t,i)}
            @pointercancel=${this._onPointerCancel}
            @pointerleave=${this._onPointerCancel}
            @contextmenu=${t=>t.preventDefault()}
          >
            <ha-icon icon="${i.icon}" style="--mdc-icon-size:${r}px;"></ha-icon>
          </div>
        `})}
    `}}customElements.define("bubble-mushroom",Bt);class Ht extends st{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String},backgroundActive:{type:String},backgroundInactive:{type:String},entity_id:{type:String},tap_action:{type:Object},hold_action:{type:Object}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16",this.backgroundActive="rgba(33,223,115,0.12)",this.backgroundInactive="rgba(23,60,22,0.08)",this.entity_id="",this.tap_action={action:"more-info"},this.hold_action={action:"none"},this._holdThreshold=500,this._holdTimer=null,this._holdFired=!1}static styles=o`
    :host {
      position: absolute;
      display: block;
      inset: 0;
      box-sizing: border-box;
      z-index: 1;
    }
    .container {
      box-sizing: border-box;
      border-radius: 0 70% 70% 0;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      transition: background 0.2s, transform 0.1s;
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
  `;render(){const t=this.active?this.colorActive:this.colorInactive,e=this.active?this.backgroundActive:this.backgroundInactive;return N`
      <div
        class="container"
        style="background:${e}"
        @pointerdown=${this._onDown}
        @pointerup=${this._onUp}
        @pointerleave=${this._clearHoldTimer}
        @pointercancel=${this._clearHoldTimer}
      >
        <ha-icon class="icon" icon="${this.icon||"mdi:checkbox-blank-circle-outline"}" style="color:${t}"></ha-icon>
      </div>
    `}_onDown=()=>{this._holdFired=!1,this._holdTimer=window.setTimeout(()=>{this._holdFired=!0,this._fireHassAction("hold")},this._holdThreshold)};_onUp=()=>{this._clearHoldTimer(),this._holdFired||this._fireHassAction("tap")};_clearHoldTimer=()=>{this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)};_fireHassAction(t){const e=(("hold"===t?this.hold_action:this.tap_action)||{action:"more-info"}).action||"more-info";if(("toggle"===e||"call-service"===e||"more-info"===e)&&!this.entity_id)return;const i=new Event("hass-action",{bubbles:!0,composed:!0});i.detail={config:{entity:this.entity_id,tap_action:this.tap_action||{action:"more-info"},hold_action:this.hold_action||{action:"none"}},action:t},this.dispatchEvent(i)}}customElements.define("bubble-icon",Ht);class Wt extends st{static properties={config:{type:Object},hass:{type:Object}};_entities={};constructor(){super(),this.config={},this.hass={}}setConfig(t){this.config={layout:"wide",...t},this._entities=structuredClone(this.config.entities||{}),this._entities.camera=this._entities.camera||{entity:"",icon:""},this._entities.camera.presence||(this._entities.camera.presence={entity:""}),this._entities.climate=this._entities.climate||{entity:"",icon:""}}get hass(){return this._hass}set hass(t){this._hass=t,t?.states&&this.requestUpdate?.()}static getStubConfig(){return{type:"custom:bubble-room",layout:"wide",name:[],area:[],sensors:[],mushrooms:[],subbuttons:[],colors:{subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return Rt}),document.createElement("bubble-room-editor")}connectedCallback(){super.connectedCallback(),this._resizeObs=new ResizeObserver(()=>this.requestUpdate())}firstUpdated(){const t=this.shadowRoot?.querySelector(".icon-mushroom-area");t&&this._resizeObs.observe(t)}disconnectedCallback(){this._resizeObs?.disconnect(),super.disconnectedCallback()}updated(t){t.has("config")&&(this._entities=structuredClone(this.config.entities||{}))}_getSubButtons(){const t=this.config.colors?.subbutton?.background_on??"#00d46d",e=this.config.colors?.subbutton?.background_off??"#999",i=this.config.colors?.subbutton?.icon_on??"yellow",s=this.config.colors?.subbutton?.icon_off??"#666";return(this.config.subbuttons||[]).map(n=>{const o=this.hass.states?.[n.entity_id];return{icon:n.icon||wt(n.entity_id,this.hass),active:"on"===o?.state,colorOn:t,colorOff:e,iconOn:i,iconOff:s,entity_id:n.entity_id,tap_action:n.tap_action,hold_action:n.hold_action}})}_isRoomActive(){const t=this.config?.entities?.presence?.entity;if(!t)return!1;const e=this.hass?.states?.[t]?.state;return["on","home","occupied","motion","detected"].includes(e)}_getMainIconSize(){const t=this.shadowRoot?.querySelector(".icon-mushroom-area");return t?Math.round(.6*Math.min(t.clientWidth,t.clientHeight)):64}_getSensors(){const t=this._entities||{},e=this.config.colors?.room?.sensor_active??this.config.colors?.room?.text_active??"#21df73",i=this.config.colors?.room?.sensor_inactive??this.config.colors?.room?.text_inactive??"#173c16",s=this._isRoomActive()?e:i,n=[];for(let e=1;e<=6;e++){const i=t[`sensor${e}`]?.entity,o=this.hass?.states?.[i];i&&o&&n.push({icon:o.attributes.icon||"",value:o.state,unit:o.attributes.unit_of_measurement,device_class:o.attributes.device_class,color:s,entity:i})}return n}_getState(t){return t?this.hass?.states?.[t]:void 0}_getMushrooms(){const t=this._entities||{},e=this.config.colors?.mushroom?.active??"#00e676",i=this.config.colors?.mushroom?.inactive??"#888",s=[];for(let n=1;n<=5;n++){const o=t[`mushroom${n}`]||{},a=o.entity,r=this.hass?.states?.[a];a&&r&&s.push({icon:o.icon||r.attributes.icon||wt(a,this.hass)||"mdi:flash",state:r.state,color:"on"===r.state?e:i,dx:o.dx??0,dy:o.dy??0,angle_deg:o.angle_deg,radius_factor:o.radius_factor,entity_id:a,tap_action:o.tap_action,hold_action:o.hold_action})}const n=t.camera||{},o=n.entity;if(o&&this.hass.states?.[o]){const t=this.hass?.states?.[o],a=n.presence?.entity,r=a?this.hass?.states?.[a]?.state:void 0,c=!a||["on","home","occupied","motion","detected"].includes(r);s.push({icon:n.icon||t.attributes.icon||wt(o,this.hass)||"mdi:cctv",state:t.state,color:c?e:i,left:"calc(100% - 12px - 36px)",top:12,dx:0,dy:0,kind:"camera",angle_deg:n.angle_deg,radius_factor:n.radius_factor,entity_id:o,tap_action:{action:"more-info"},hold_action:{action:"none"}})}const a=this._entities?.climate||{},r=a.entity;if(r&&this.hass.states?.[r]){const t=this.hass?.states?.[r],n=t.state&&"off"!==t.state&&"idle"!==t.state||t.attributes?.hvac_action&&"off"!==t.attributes.hvac_action;s.push({icon:a.icon||t.attributes.icon||wt(r,this.hass)||"mdi:thermostat",state:t.state,color:n?e:i,dx:0,dy:0,angle_deg:a.angle_deg,radius_factor:a.radius_factor,kind:"climate",entity_id:r})}return s}_onMushroomClick(t){}render(){const t=this.config.layout||"wide",e=this._getMainIconSize(),i=this._getSubButtons(),s=this._isRoomActive(),n=this.config.colors?.room?.icon_active??"#21df73",o=this.config.colors?.room?.icon_inactive??"#173c16",a=this.config.colors?.room?.background_active??"rgba(33,223,115,0.12)",r=this.config.colors?.room?.background_inactive??"rgba(23,60,22,0.12)",c=this.config.colors?.room?.text_active??"#ffffff",l=this.config.colors?.room?.text_inactive??"rgba(255,255,255,0.5)",d=this.config?.entities?.presence?.entity||"",h=this.config?.tap_action||{action:"more-info"},p=this.config?.hold_action||{action:"none"};return N`
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
                style="--bubble-room-name-color:${s?c:l}"
              ></bubble-name>
            </div>
          </div>

          <div class="row2">
            <div class="icon-mushroom-area">
              <bubble-icon
                .icon="${this.config.icon}"
                .active=${s}
                .colorActive="${n}"
                .colorInactive="${o}"
                .backgroundActive="${a}"
                .backgroundInactive="${r}"
                style="
                  --main-icon-size:${e}px;
                  --icon-shift-x:-20%;
                "
                .entity_id=${d}
                .tap_action=${h}
                .hold_action=${p}
                @hass-action=${this._onMainIconAction}
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
    `}_onMainIconAction=t=>{const{config:e,action:i}=t.detail||{};if(!e)return;const s="hold"===i?e.hold_action||{action:"none"}:e.tap_action||{action:"none"};this._runAction(s,e.entity)};_runAction(t,e){const i=t?.action||"none";if("none"!==i)switch(i){case"navigate":{const e=t.navigation_path||t.navigationPath;e&&(window.history.pushState({},"",e),window.dispatchEvent(new Event("location-changed")));break}case"more-info":{const i=t.entity||e;i&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}));break}case"toggle":{const i=t.entity||e;i&&this.hass?.callService&&this.hass.callService("homeassistant","toggle",{entity_id:i});break}case"call-service":{const i=t.service||"",[s,n]=i.split(".");if(s&&n&&this.hass?.callService){const i={...t.service_data||t.data||{}};!i.entity_id&&e&&(i.entity_id=e),this.hass.callService(s,n,i)}break}}}static styles=o`
    :host { display:block; height:100%; box-sizing:border-box; }
    .bubble-room-grid { display:grid; grid-template-columns:2fr 1fr;
      width:100%; height:100%; box-sizing:border-box; }
    .main-area { display:grid; height:100%; min-height:0; box-sizing:border-box; }
    .row1 { display:grid; min-height:0; box-sizing:border-box;
      grid-template-columns:1fr; }
    .row2 { display:grid; height:100%; min-height:0; box-sizing:border-box;
    }
    .name-placeholder { display:flex; align-items:center; justify-content:center;
      width:100%; max-width:100%; height:100%; box-sizing:border-box;
      contain:strict; flex-shrink:1; }
    .icon-mushroom-area { box-sizing:border-box;
      position:relative; width:100%; height:100%; display:flex; align-items:center; }
    .k-space { box-sizing:border-box; }
    .sidebar { display:flex; flex-direction:column; height:100%; min-height:0;
      box-sizing:border-box; }

    .bubble-room-grid.tall .main-area { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.tall .row1      { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.tall .row2      { grid-template-columns:1fr 0fr; }

    .bubble-room-grid.wide .main-area { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.wide .row1      { grid-template-rows:1fr 2fr; }
    .bubble-room-grid.wide .row2      { grid-template-columns:2fr 1fr; }
  `}customElements.define("bubble-room",Wt),window.customCards.push({type:"bubble-room",name:"Bubble Room",description:"A stylish room control card with environmental sensors",preview:!0,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});export{Wt as BubbleRoom};
//# sourceMappingURL=lovelace-bubble-room.js.map
