/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var r;const l=window,c=l.trustedTypes,d=c?c.emptyScript:"",h=l.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:u},b="finalized";class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty(b))return!1;this[b]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(e=>{const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=g){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;m[b]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:m}),(null!==(r=l.reactiveElementVersions)&&void 0!==r?r:l.reactiveElementVersions=[]).push("1.6.3");const _=window,v=_.trustedTypes,x=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,y="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,k=`<${w}>`,A=document,C=()=>A.createComment(""),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,P="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,j=/>/g,M=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,T=/"/g,F=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),U=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),B=new WeakMap,H=A.createTreeWalker(A,129,null,!1);function L(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",a=z;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===z?"!--"===l[1]?a=O:void 0!==l[1]?a=j:void 0!==l[2]?(F.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=M):void 0!==l[3]&&(a=M):a===M?">"===l[0]?(a=null!=o?o:z,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?M:'"'===l[3]?T:R):a===T||a===R?a=M:a===O||a===j?a=z:(a=M,o=void 0);const h=a===M&&t[e+1].startsWith("/>")?" ":"";n+=a===z?i+k:c>=0?(s.push(r),i.slice(0,c)+y+i.slice(c)+$+h):i+$+(-2===c?(s.push(void 0),e):h)}return[L(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class D{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[l,c]=W(t,e);if(this.el=D.createElement(l,i),H.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=H.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(y)||e.startsWith($)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+y).split($),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?Z:"@"===e[1]?X:Y})}else r.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(F.test(s.tagName)){const t=s.textContent.split($),e=t.length-1;if(e>0){s.textContent=v?v.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),H.nextNode(),r.push({type:2,index:++o});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===w)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf($,t+1));)r.push({type:7,index:o}),t+=$.length-1}o++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function V(t,e,i=t,s){var o,n,a,r;if(e===U)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=S(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(a=(r=i)._$Co)&&void 0!==a?a:r._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=V(t,l._$AS(t,e.values),l,s)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(i,!0);H.currentNode=o;let n=H.nextNode(),a=0,r=0,l=s[0];for(;void 0!==l;){if(a===l.index){let e;2===l.type?e=new J(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new Q(n,this,t)),this._$AV.push(e),l=s[++r]}a!==(null==l?void 0:l.index)&&(n=H.nextNode(),a++)}return H.currentNode=A,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,s){var o;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),S(t)?t===N||null==t||""===t?(this._$AH!==N&&this._$AR(),this._$AH=N):t!==this._$AH&&t!==U&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>E(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==N&&S(this._$AH)?this._$AA.nextSibling.data=t:this.$(A.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=D.createElement(L(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new q(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new D(t)),e}T(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new J(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Y{constructor(t,e,i,s,o){this.type=1,this._$AH=N,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=V(this,t,e,0),n=!S(t)||t!==this._$AH&&t!==U,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=V(this,s[i+a],e,a),r===U&&(r=this._$AH[a]),n||(n=!S(r)||r!==this._$AH[a]),r===N?t=N:t!==N&&(t+=(null!=r?r:"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(t)}j(t){t===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===N?void 0:t}}const K=v?v.emptyScript:"";class Z extends Y{constructor(){super(...arguments),this.type=4}j(t){t&&t!==N?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class X extends Y{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=V(this,t,e,0))&&void 0!==i?i:N)===U)return;const s=this._$AH,o=t===N&&s!==N||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==N&&(s===N||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Q{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const tt=_.litHtmlPolyfillSupport;null==tt||tt(D,J),(null!==(f=_.litHtmlVersions)&&void 0!==f?f:_.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et,it;class st extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let a=n._$litPart$;if(void 0===a){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=a=new J(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return U}}st.finalized=!0,st._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:st});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:st}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");const nt={alarm_control_panel:"Allarmi",binary_sensor:"Sensori Binari",camera:"Telecamere",climate:"Clima",cover:"Tapparelle",fan:"Ventola",light:"Luce",lock:"Serratura",media_player:"Media Player",scene:"Scene",script:"Script",siren:"Sirena",vacuum:"Aspirapolvere",motion:"Movimento",occupancy:"Occupazione",presence:"Presenza",switch:"Pulsante"},at=["alarm_control_panel","binary_sensor","camera","climate","cover","fan","light","lock","media_player","scene","script","siren","switch","vacuum"],rt=(t=[])=>({includeDomains:at,entityFilter:(e,i)=>{if(!t.length)return!1;const[s]=e.split(".");if("binary_sensor"===s){const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}return t.includes(s)}}),lt=(t=[])=>({includeDomains:["sensor"],entityFilter:(e,i)=>{if(!t.length)return!0;const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}}),ct=(t=[])=>({includeDomains:at,entityFilter:(e,i)=>{if(!t.length)return"binary_sensor"===e.split(".")[0];const[s]=e.split(".");if("binary_sensor"===s){const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}return t.includes(s)}}),dt=(t=[])=>({includeDomains:at,entityFilter:(e,i)=>{if(!t.length)return at.includes(e.split(".")[0]);const[s]=e.split(".");if("binary_sensor"===s){const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}return t.includes(s)}}),ht=(t=[])=>({includeDomains:["camera"],entityFilter:(e,i)=>{if(!t.length)return!0;const s=i.states[e]?.attributes?.device_class??"";return t.includes(s)}});function pt(t,e,i,s=[]){if(!t?.states)return[];let o;if("presence"===i?o=rt(s):"sensor"===i?o=lt(s):"mushroom"===i?o=ct(s):"subbutton"===i?o=dt(s):"camera"===i&&(o=ht(s)),!o)return[];const n=Object.keys(t.states).filter(t=>o.includeDomains.includes(t.split(".")[0])).filter(e=>o.entityFilter(e,t));if((e?.auto_discovery_sections?.[i]??!1)&&e?.area){const i=function(t,e){if(!t?.states||!e)return[];const i=t.entities??{},s=t.devices??{};return Object.keys(t.states).filter(o=>{const n=i[o];if(n?.area_id===e)return!0;const a=n?.device_id;if(a&&s[a]?.area_id===e)return!0;const r=t.states[o]?.attributes??{};return r.area_id===e||r.area===e})}(t,e.area);return n.filter(t=>i.includes(t))}return n}const ut=!!window.__BUBBLE_DEBUG__;function gt(t,e){const i=Array.isArray(e?.area)?e.area[0]:e?.area,s="string"!=typeof i||i.startsWith("area_")?"":i;let o="string"==typeof i&&i.startsWith("area_")?i:"";const n=Array.isArray(t?.areas)?t.areas:[];if(!o&&n.length&&s){const t=n.find(t=>(t.name||"").toLowerCase()===String(s).toLowerCase());t?.area_id&&(o=t.area_id)}return{areaId:o,areaName:s}}function bt(t,e,i,s){if(!i&&!s)return!0;const o=t?.entities,n=t?.devices,a=o?.[e];if(a?.area_id&&i)return a.area_id===i;if(a?.device_id&&Array.isArray(n)){const t=n.find(t=>t.id===a.device_id||t.device_id===a.device_id);if(t?.area_id&&i)return t.area_id===i}const r=t?.states?.[e];if(r){const t=r.attributes?.area_id,e=r.attributes?.area;if(i&&t)return t===i;if(s&&e)return String(e).toLowerCase()===String(s).toLowerCase()}return!0}function mt(t,e,i){let s=pt(t,e,i)||[];return!s.length&&t?.states&&(s=Object.keys(t.states)),s}function ft(t,e,i,s){const o={...e.entities||{}},n=o[s]||(o[s]={});if(n.entity)return{...e,entities:o};let a=mt(t,e,i);a.length||(a=mt(t,e,"mushroom")),a=(a||[]).filter(t=>t.startsWith(`${i}.`));const r=gt(t,e),l=function(t,e,i,s){const{areaId:o,areaName:n}=i,a=(e||[]).filter(e=>bt(t,e,o,n));return s&&!a.includes(s)&&a.unshift(s),Array.from(new Set(a))}(t,a,r,n.entity),c=l[0]||a[0]||"";return c&&(n.entity=c),ut&&console.info(`[AutoDiscovery][${s}]`,{domain:i,chosen:n.entity,areaRef:r,pool:a.length,filtered:l.length}),{...e,entities:o}}const _t=(t,e)=>t.find(t=>!e.has(t))||null;function vt(t,e){const i={...e.entities||{}},s=i.presence||(i.presence={});if(!s.entity){const i=function(t,e){if(!t||!t.states)return[];const i=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let s=Object.keys(t.states).filter(t=>i.has(t.split(".")[0]));s=s.filter(e=>{if("binary_sensor"!==e.split(".")[0])return!0;const i=t.states[e]?.attributes?.device_class;return["motion","occupancy","presence"].includes(i||"")});const{areaId:o,areaName:n}=gt(t,e);if(o||n){const e=s.filter(e=>bt(t,e,o,n));e.length&&(s=e)}const a=e?.entities?.presence?.entity||e?.presence_entity;return a&&!s.includes(a)&&s.unshift(a),ut&&console.info("[AutoDiscovery][presence candidates]",{areaId:o,areaName:n,count:s.length,sample:s.slice(0,8)}),s}(t,e);i.length&&(s.entity=i[0])}return{...e,entities:i}}function xt(t,e,i,s=!1){if(!t||!e)return e;const o=e.auto_discovery_sections||{},n="area"===i,a=i&&String(i).startsWith("auto_discovery_sections.");if(!n&&!a)return e;let r=e;return o.sensor&&(r=function(t,e){const i=["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6","sensor7","sensor8"],s={...e.entities||{}},o=new Set(i.map(t=>s[t]?.entity||s[t]?.entity_id).filter(Boolean));for(const n of i){const i=s[n]||(s[n]={});if(i.entity||i.entity_id)continue;const a=pt(t,e,{section:"sensor",type:i.type||""})||[],r=_t(a,o);r&&(i.entity=r,delete i.entity_id,o.add(r))}return{...e,entities:s}}(t,r)),o.mushroom&&(r=function(t,e){const i={...e.entities||{}},s=new Set(["climate","camera","mushroom1","mushroom2","mushroom3","mushroom4","mushroom5"].map(t=>i[t]?.entity).filter(Boolean));let o=mt(t,e,"mushroom");const n=i.climate||(i.climate={});if(!n.entity){const t=o.find(t=>t.startsWith("climate.")&&!s.has(t));t&&(n.entity=t,s.add(t))}const a=i.camera||(i.camera={});if(!a.entity){const t=o.find(t=>t.startsWith("camera.")&&!s.has(t));t&&(a.entity=t,s.add(t))}for(let t=1;t<=5;t++){const e=`mushroom${t}`,n=i[e]||(i[e]={});if(n.entity)continue;const a=_t(o,s);a&&(n.entity=a,s.add(a))}return{...e,entities:i}}(t,r)),o.subbutton&&(r=function(t,e){const i=["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"],s={...e.entities||{}},o=new Set(i.map(t=>s[t]?.entity).filter(Boolean)),n=pt(t,e,"subbutton")||[];for(const t of i){const e=s[t]||(s[t]={});if(e.entity)continue;const i=_t(n,o);i&&(e.entity=i,o.add(i))}return{...e,entities:s}}(t,r)),o.presence&&(r=vt(t,r)),o.climate&&(r=function(t,e){return ft(t,e,"climate","climate")}(t,r)),o.camera&&(r=function(t,e){return ft(t,e,"camera","camera")}(t,r)),(s||ut)&&"undefined"!=typeof window&&console.info("[AutoDiscovery] applied after",i,{sections:o}),r}const yt={door:{on:"mdi:door-open",off:"mdi:door-closed"},window:{on:"mdi:window-open",off:"mdi:window-closed"},motion:{on:"mdi:motion-sensor",off:"mdi:motion-sensor-off"},moisture:{on:"mdi:water-alert",off:"mdi:water-off"},smoke:{on:"mdi:smoke",off:"mdi:smoke-detector-off"},gas:{on:"mdi:gas-cylinder",off:"mdi:gas-off"},lock:{on:"mdi:lock-open-variant",off:"mdi:lock"},garage:{on:"mdi:garage-open",off:"mdi:garage"},light:{on:"mdi:lightbulb-on",off:"mdi:lightbulb-off"},plug:{on:"mdi:power-plug",off:"mdi:power-plug-off"},presence:{on:"mdi:account",off:"mdi:account-off"},vibration:{on:"mdi:vibrate",off:"mdi:vibrate-off"},opening:{on:"mdi:door-open",off:"mdi:door-closed"},battery:{on:"mdi:battery",off:"mdi:battery-outline"},connectivity:{on:"mdi:wifi",off:"mdi:wifi-off"},safety:{on:"mdi:shield-check",off:"mdi:shield-off"},cold:{on:"mdi:snowflake",off:"mdi:snowflake-off"}},$t={light:"mdi:lightbulb",switch:"mdi:toggle-switch",fan:"mdi:fan",climate:"mdi:thermostat",cover:"mdi:window-shutter",media_player:"mdi:play-circle",script:"mdi:script-text",scene:"mdi:palette",lock:"mdi:lock",camera:"mdi:video",binary_sensor:"mdi:checkbox-marked-circle-outline",sensor:"mdi:eye",alarm_control_panel:"mdi:shield-home",vacuum:"mdi:robot-vacuum",siren:"mdi:bullhorn"};function wt(t,e){const i=e.states?.[t],s=i?.attributes||{},o=s.device_class,n=t?.split(".")?.[0]??"",a=i?.state,r=o&&yt[o]?yt[o]["on"===a?"on":"off"]:null;return s.icon||r||$t[n]||"mdi:bookmark"}const kt=["presence","motion","occupancy","light","switch","fan"];class At extends st{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean,state:!0},activeFilters:{type:Array,state:!0},layout:{type:String}};static styles=n`
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
  `;constructor(){super(),this.hass={},this.config={},this._expanded=!1,this.activeFilters=[],this.layout="wide",this._syncingFromConfig=!1}updated(t){if(t.has("config")||t.has("hass")){this._syncingFromConfig=!0,xt(this.hass,this.config,"area"),xt(this.hass,this.config,"auto_discovery_sections.presence"),t.has("config")&&Array.isArray(this.config.presence_filters)&&(this.activeFilters=[...this.config.presence_filters]);const e=this.config.layout;e&&e!==this.layout&&(this.layout=e),this._syncingFromConfig=!1}}_onLayoutClick(t){this.layout=t,this._fire("layout",t);const e="tall"===t?{columns:6,rows:4}:{columns:12,rows:4};this._fire("grid_options",e)}_fire(t,e){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}_onPresenceEntityChange=t=>{this._fire("entities.presence.entity",t);const e=this.config?.icon||"";if(t&&!e){const e=this.hass?.states?.[t],i=e?.attributes?.icon||wt(t,this.hass);i&&this._fire("icon",i)}};render(){const t=this.config,e=t.auto_discovery_sections?.presence??!1,i=t.area??"",s=t.name??"",o=t.icon??"",n=t.entities?.presence?.entity??"",a=this.activeFilters.length?this.activeFilters:t.presence_filters??[...kt],r=kt.map(t=>({value:t,label:t.charAt(0).toUpperCase()+t.slice(1)})),l=pt(this.hass,this.config,"presence",a),c=["toggle","more-info","navigate","call-service","none"],d=this.config?.tap_action||{},h=this.config?.hold_action||{};return I`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${t=>this._expanded=t.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>
      
        <!-- Auto‑discover (identico a CameraPanel: checkbox + label in linea) -->
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${t=>this._fire("auto_discovery_sections.presence",t.target.checked)}
          />
          <label>🪄 Auto‑discover Presence</label>
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
                .value=${n}
                .selector=${{entity:{include_entities:l,multiple:!1}}}
                allow-custom-entity
                @value-changed=${t=>this._onPresenceEntityChange(t.detail.value)}
              ></ha-selector>
            </div>
      
            <!-- Actions -->
            <div class="input-group">
              <label>Tap Action</label>
              <div class="pill-group">
                ${c.map(t=>I`
                  <button
                    class="pill-button ${d.action===t?"active":""}"
                    @click=${()=>this._fire("tap_action.action",t)}
                  >${t}</button>
                `)}
              </div>
              ${"navigate"===d.action?I`
                <input type="text" placeholder="Path"
                  .value=${d.navigation_path||""}
                  @input=${t=>this._fire("tap_action.navigation_path",t.target.value)}
                />
              `:""}
              ${"call-service"===d.action?I`
                <input type="text" placeholder="service (es. light.turn_on)"
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
                ${c.map(t=>I`
                  <button
                    class="pill-button ${h.action===t?"active":""}"
                    @click=${()=>this._fire("hold_action.action",t)}
                  >${t}</button>
                `)}
              </div>
              ${"navigate"===h.action?I`
                <input type="text" placeholder="Path"
                  .value=${h.navigation_path||""}
                  @input=${t=>this._fire("hold_action.navigation_path",t.target.value)}
                />
              `:""}
              ${"call-service"===h.action?I`
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
              <span>Stretto</span>
            </button>
            <button
              class="toggle-btn ${"wide"===this.layout?"active":""}"
              @click=${()=>this._onLayoutClick("wide")}
            >
              <ha-icon icon="mdi:tablet"></ha-icon> 
              <span>Largo</span> 
            </button>
          </div>
        </div>
      
        <!-- Reset (identico a CameraPanel) -->
        <button class="reset-button"
          @click=${()=>this._fire("__panel_cmd__",{cmd:"reset",section:"room"})}>
          🧹 Reset Room
        </button>
      </ha-expansion-panel>
    `}}customElements.define("room-panel",At);const Ct={temperature:{label:"Temperature",emoji:"🌡️",units:["°C","°F"]},apparent_temperature:{label:"Feels Like",emoji:"🥵",units:["°C","°F"]},humidity:{label:"Humidity",emoji:"💧",units:["%"]},pressure:{label:"Pressure",emoji:"🧭",units:["hPa","mbar","kPa"]},illuminance:{label:"Illuminance",emoji:"🔆",units:["lx"]},sound_pressure:{label:"Sound Pressure",emoji:"🔊",units:["dB"]},pm1:{label:"PM1",emoji:"🌫️",units:["µg/m³"]},pm2_5:{label:"PM2.5",emoji:"🌫️",units:["µg/m³"]},pm10:{label:"PM10",emoji:"🌫️",units:["µg/m³"]},co2:{label:"CO₂",emoji:"🫁",units:["ppm"]},uv_index:{label:"UV Index",emoji:"☀️",units:["UV index"]},irradiance:{label:"Irradiance",emoji:"🌞",units:["W/m²"]},wind_speed:{label:"Wind Speed",emoji:"🌀",units:["km/h","m/s","mph","kn"],formatter:(t,e)=>{const i=Number(t);return isNaN(i)?{value:t,unit:e}:"m/s"===e?{value:(3.6*i).toFixed(0),unit:"km/h"}:"mph"===e?{value:(1.60934*i).toFixed(0),unit:"km/h"}:"kn"===e?{value:(1.852*i).toFixed(0),unit:"km/h"}:{value:i.toFixed(0),unit:e||"km/h"}}},speed:{label:"Speed",emoji:"🌀",units:["km/h","m/s","mph","kn"]},wind_gust:{label:"Wind Gust",emoji:"🌬️",units:["km/h","m/s","mph","kn"]},wind_bearing:{label:"Wind Direction",emoji:"🧭",units:["°","cardinal"]},precipitation:{label:"Precipitation",emoji:"🌧️",units:["mm","cm","in"]},precipitation_intensity:{label:"Precipitation Intensity",emoji:"🌦️",units:["mm/h","in/h"]},precipitation_probability:{label:"Rain Probability",emoji:"☔",units:["%"]},cloud_coverage:{label:"Cloud Coverage",emoji:"☁️",units:["%"]},visibility:{label:"Visibility",emoji:"👁️",units:["km","m","mi"]},dew_point:{label:"Dew Point",emoji:"💧",units:["°C","°F"]},power:{label:"Power",emoji:"⚡",units:["kW","W","MW"],formatter:(t,e)=>{const i=Number(t);return isNaN(i)?{value:t,unit:e}:"W"===e?{value:(i/1e3).toFixed(i>=100?0:1),unit:"kW"}:"MW"===e?{value:(1e3*i).toFixed(0),unit:"kW"}:{value:i,unit:e||"kW"}}},energy:{label:"Energy",emoji:"🔌",units:["kWh","Wh","MWh"],formatter:(t,e)=>{const i=Number(t);return isNaN(i)?{value:t,unit:e}:"Wh"===e?{value:(i/1e3).toFixed(i>=1e3?0:1),unit:"kWh"}:"MWh"===e?{value:(1e3*i).toFixed(0),unit:"kWh"}:{value:i,unit:e||"kWh"}}},power_factor:{label:"Power Factor",emoji:"📐",units:["%","ratio"]},voltage:{label:"Voltage",emoji:"⚙️",units:["V"]},current:{label:"Current",emoji:"🧲",units:["A","mA"]},frequency:{label:"Frequency",emoji:"〰️",units:["Hz"]},apparent_power:{label:"Apparent Power",emoji:"🧮",units:["VA","kVA"]},reactive_power:{label:"Reactive Power",emoji:"🧮",units:["var","kvar"]},monetary:{label:"Cost",emoji:"💶",units:["€","EUR","$"]},gas:{label:"Gas",emoji:"🔥",units:["m³","Nm³","kWh"]},water:{label:"Water",emoji:"🚿",units:["m³","L"]},battery:{label:"Battery",emoji:"🔋",units:["%"]},signal_strength:{label:"Signal Strength",emoji:"📶",units:["dBm"]},_fallback:{label:"Other",emoji:"❓",units:[""]}};class St extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(8).fill(!1);const t=Object.keys(Ct);this._filters=Array(8).fill().map(()=>[...t]),this._entities=Array(8).fill("")}updated(t){if(t.has("config")||t.has("hass")){xt(this.hass,this.config,"auto_discovery_sections.sensor");for(let t=0;t<8;t++){const e=`sensor${t+1}`,i=this.config.sensor_filters?.[t],s=this.config.entities?.[e]?.entity;Array.isArray(i)&&(this._filters[t]=[...i]),s&&(this._entities[t]=s)}}}static styles=n`
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
  `;render(){const t=this.config.auto_discovery_sections?.sensor??!1,e=Object.entries(Ct).filter(([t])=>"_fallback"!==t).map(([t,e])=>{const i=e.label||t.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase());return{value:t,label:`${e.emoji||""} ${i}`.trim()}});return I`
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
    `}_renderSensor(t,e,i){const s=this._filters[t],o=this._entities[t],n=pt(this.hass,this.config,"sensor",s);return I`
      <div class="mini-pill ${e?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(t)}>
          Sensor ${t+1}
          <span class="chevron">${e?"▼":"▶"}</span>
        </div>
        ${e?I`
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
            ${o?(()=>{const t=this.hass.states[o],e=t?.attributes?.device_class,i=Ct[e]||{},s=i.emoji||"❓",n=t?.attributes?.unit_of_measurement||(i.units?.[0]??"");return I`
                <div class="preview">
                  <span class="emoji">${s}</span>
                  <div class="state">${t?.state??"-"} ${n}</div>
                </div>
              `})():""}
          </div>
        `:""}
      </div>
    `}_toggleAuto(t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.sensor",val:t},bubbles:!0,composed:!0}))}_togglePill(t){this._expanded=this._expanded.map((e,i)=>i===t&&!e),this.requestUpdate()}_onFilter(t,e){this._filters[t]=[...e],this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"sensor_filters",val:this._filters},bubbles:!0,composed:!0}))}_onEntity(t,e){this._entities[t]=e,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${t+1}.entity`,val:e},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(8).fill(!1);const t=Object.keys(Ct);this._filters=Array(8).fill().map(()=>[...t]),this._entities=Array(8).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"sensor_filters",val:this._filters},bubbles:!0,composed:!0}));for(let t=1;t<=8;t++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${t}.entity`,val:""},bubbles:!0,composed:!0}))}}customElements.define("sensor-panel",St);class Et extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0},_icons:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...at]),this._entities=Array(5).fill(""),this._icons=Array(5).fill(""),this._syncingFromConfig=!1}updated(t){if(t.has("config")||t.has("hass")){this._syncingFromConfig=!0,xt(this.hass,this.config,"auto_discovery_sections.mushroom");const t=this.config.mushroom_filters;Array.isArray(t)&&5===t.length&&(this._filters=t.map(t=>Array.isArray(t)?[...t]:[...at]));const e=this.config.entities||{};for(let t=0;t<5;t++){const i=e[`mushroom${t+1}`]||{};i.entity&&(this._entities[t]=i.entity),"string"==typeof i.icon&&(this._icons[t]=i.icon)}this._syncingFromConfig=!1}}static styles=n`
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
    ha-selector { width: 100%; box-sizing: border-box; }
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
  `;render(){const t=this.config.auto_discovery_sections?.mushroom??!1,e=at.map(t=>({value:t,label:nt[t]||t.charAt(0).toUpperCase()+t.slice(1)}));return I`
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
    `}_renderMushroom(t,e,i){const s=`mushroom${t+1}`,o=this._filters[t],n=this._entities[t],a=this._icons[t],r=this.config.entities&&this.config.entities[s]?this.config.entities[s]:{},l=pt(this.hass,this.config,"mushroom",o),c=["toggle","more-info","navigate","call-service","none"];return I`
      <div class="mini-pill ${e?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(t)}>
          Mushroom ${t+1}
          <span class="chevron">${e?"▼":"▶"}</span>
        </div>

        ${e?I`
          <div class="mini-pill-content">
            <!-- Filter categories -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${o}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${e=>this._onFilter(t,e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Entity -->
            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${n}
                .selector=${{entity:{include_entities:l,multiple:!1}}}
                allow-custom-entity
                @value-changed=${e=>this._onEntity(t,e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Icon -->
            <div class="input-group">
              <label>Icon:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${a}
                .selector=${{icon:{}}}
                @value-changed=${e=>this._onIcon(t,e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Tap Action -->
            <div class="input-group">
              <label>Tap Action:</label>
              <div class="pill-group">
                ${c.map(e=>I`
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
                ${c.map(e=>I`
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
    `}_extraFields(t,e,i){const s=i?.[`${e}_action`]?.action;return"navigate"===s?I`
        <input type="text" placeholder="Path"
          .value=${i[`${e}_action`]?.navigation_path||""}
          @input=${i=>this._onAction(t,e,"navigation_path",i.target.value)}
        />
      `:"call-service"===s?I`
        <input type="text" placeholder="Service (es. light.turn_on)"
          .value=${i[`${e}_action`]?.service||""}
          @input=${i=>this._onAction(t,e,"service",i.target.value)}
        />
        <input type="text" placeholder='Service Data (JSON)'
          .value=${i[`${e}_action`]?.service_data?JSON.stringify(i[`${e}_action`].service_data):""}
          @input=${i=>this._onAction(t,e,"service_data",this._safeJson(i.target.value))}
        />
      `:""}_safeJson(t){try{return JSON.parse(t)}catch{return{}}}_toggleAuto(t){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.mushroom",val:t},bubbles:!0,composed:!0}))}_togglePill(t){this._expanded=this._expanded.map((e,i)=>i===t&&!e),this.requestUpdate()}_onFilter(t,e){this._filters[t]=[...e],this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}))}_onEntity(t,e){if(this._entities[t]=e,!this._syncingFromConfig&&(this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t+1}.entity`,val:e},bubbles:!0,composed:!0})),!this._icons[t])){const i=this._autoIconFor(e);i&&(this._icons[t]=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t+1}.icon`,val:i},bubbles:!0,composed:!0})))}}_onIcon(t,e){this._icons[t]=e||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t+1}.icon`,val:this._icons[t]},bubbles:!0,composed:!0}))}_onAction(t,e,i,s){if(this._syncingFromConfig)return;const o=`mushroom${t+1}`,n={...this.config?.entities?.[o]?.[`${e}_action`]||{},[i]:s};this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${o}.${e}_action`,val:n},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...at]),this._entities=Array(5).fill(""),this._icons=Array(5).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}));for(let t=1;t<=5;t++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t}.entity`,val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t}.icon`,val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t}.tap_action`,val:{action:"none"}},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${t}.hold_action`,val:{action:"none"}},bubbles:!0,composed:!0}))}_autoIconFor(t){if(!t)return"";const e=this.hass?.states?.[t];return e?.attributes?.icon||wt(t,this.hass)}}customElements.define("mushroom-panel",Et);class Pt extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...at]),this._entities=Array(4).fill("")}updated(t){if(t.has("config")||t.has("hass")){xt(this.hass,this.config,"auto_discovery_sections.subbutton"),Array.isArray(this.config.subbuttons)||(this.config.subbuttons=Array(4).fill().map(()=>({})));const t=this.config.subbutton_filters;Array.isArray(t)&&4===t.length&&(this._filters=t.map(t=>Array.isArray(t)?[...t]:[...at]));for(let t=0;t<4;t++){const e=this.config.subbuttons[t]?.entity_id||"";if(this._entities[t]=e,e&&!this.config.subbuttons[t].icon&&this.hass){const i=this.hass.states?.[e],s=i?.attributes?.icon,o=s||wt(e,this.hass);o&&(this.config.subbuttons[t].icon=o)}}}}static styles=n`
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
  `;render(){const t=this.config.auto_discovery_sections?.subbutton??!1,e=at.map(t=>({value:t,label:nt[t]||t.charAt(0).toUpperCase()+t.slice(1)}));return I`
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
    `}_renderSubButton(t,e,i){const s=this._filters[t],o=this._entities[t],n=pt(this.hass,this.config,"subbutton",s),a=this.config.subbuttons?.[t]||{},r=["toggle","more-info","navigate","call-service","none"];return I`
      <div class="mini-pill ${e?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(t)}>
          Sub-button ${t+1}  <span class="chevron">${e?"▼":"▶"}</span>
        </div>
        ${e?I`
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
              <ha-icon-picker .hass=${this.hass} .value=${a.icon||""}
                allow-custom-icon
                @value-changed=${e=>this._onIcon(t,e.detail.value)}
              ></ha-icon-picker>
            </div>

            ${["tap","hold"].map(e=>I`
              <div class="input-group">
                <label>${"tap"===e?"Tap Action":"Hold Action"}:</label>
                <div class="pill-group">
                  ${r.map(i=>I`
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
    `}_extraFields(t,e,i){const s=i[`${e}_action`]?.action;return"navigate"===s?I`
        <input type="text" placeholder="Path"
          .value=${i[`${e}_action`]?.navigation_path||""}
          @input=${i=>this._onAction(t,e,"navigation_path",i.target.value)}
        />
      `:"call-service"===s?I`
        <input type="text" placeholder="Service"
          .value=${i[`${e}_action`]?.service||""}
          @input=${i=>this._onAction(t,e,"service",i.target.value)}
        />
        <input type="text" placeholder='Service Data (JSON)'
          .value=${i[`${e}_action`]?.service_data?JSON.stringify(i[`${e}_action`].service_data):""}
          @input=${i=>this._onAction(t,e,"service_data",this._safeJson(i.target.value))}
        />
      `:""}_safeJson(t){try{return JSON.parse(t)}catch{return{}}}_toggleAuto(t){this._emit("auto_discovery_sections.subbutton",t)}_togglePill(t){this._expanded=this._expanded.map((e,i)=>i===t&&!e)}_onFilter(t,e){this._filters[t]=[...e],this._emit("subbutton_filters",this._filters)}_onEntity(t,e){if(this._entities[t]=e,this.config.subbuttons[t]||(this.config.subbuttons[t]={}),this.config.subbuttons[t].entity_id=e,!this.config.subbuttons[t].icon&&this.hass){const i=this.hass.states?.[e],s=i?.attributes?.icon,o=s||wt(e,this.hass);o&&(this.config.subbuttons[t].icon=o)}this._emit("subbuttons",this.config.subbuttons)}_onIcon(t,e){this.config.subbuttons[t]||(this.config.subbuttons[t]={}),this.config.subbuttons[t].icon=e,this._emit("subbuttons",this.config.subbuttons)}_onAction(t,e,i,s){this.config.subbuttons[t]||(this.config.subbuttons[t]={}),this.config.subbuttons[t][`${e}_action`]={...this.config.subbuttons[t][`${e}_action`],[i]:s},this._emit("subbuttons",this.config.subbuttons)}_reset(){this._expanded=Array(4).fill(!1),this._filters=Array(4).fill().map(()=>[...at]),this._entities=Array(4).fill(""),this.config.subbuttons=Array(4).fill().map(()=>({})),this._emit("subbutton_filters",this._filters),this._emit("subbuttons",this.config.subbuttons)}_emit(t,e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}}customElements.define("sub-button-panel",Pt);const zt={green:{label:"Green",active:{bg:"#1f3a2e",icon:"#7de2a8"},inactive:{bg:"#162a22",icon:"#4fb684"}},blue:{label:"Blue",active:{bg:"#18293d",icon:"#8fd0ff"},inactive:{bg:"#122031",icon:"#6fb7ef"}},amber:{label:"Amber",active:{bg:"#3a2d18",icon:"#ffd37a"},inactive:{bg:"#2b2112",icon:"#efbf62"}},red:{label:"Red",active:{bg:"#3a2224",icon:"#ff9aa4"},inactive:{bg:"#2b191b",icon:"#e67c87"}},gray:{label:"Gray",active:{bg:"#2c2f36",icon:"#cfd6e4"},inactive:{bg:"#24262c",icon:"#aeb7c7"}}};class Ot extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_preset:{type:String,state:!0},_applyRoom:{type:Boolean,state:!0},_applySub:{type:Boolean,state:!0},_applyMushroom:{type:Boolean,state:!0},_applySensors:{type:Boolean,state:!0},_includeText:{type:Boolean,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._preset="green",this._applyRoom=!0,this._applySub=!0,this._applyMushroom=!0,this._applySensors=!0,this._includeText=!0}static styles=n`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important; width: 100%; box-sizing: border-box;
      border-radius: 40px; position: relative; overflow: hidden;
      background: var(--glass-bg, rgba(110,160,170,0.25));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(110,160,170,0.18));
    }
    .glass-panel::after {
      content:''; position:absolute; inset:0; border-radius:inherit;
      background: linear-gradient(120deg, rgba(255,255,255,0.16),
        rgba(255,255,255,0.08) 70%, transparent 100%);
      pointer-events:none;
    }
    .glass-header {
      padding: 22px 0; text-align: center; font-size: 1.12rem;
      font-weight: 700; color: #fff;
    }

    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 720px) { .row { grid-template-columns: 1fr; } }

    .group {
      margin: 10px 16px; padding: 14px; border-radius: 18px;
      background: rgba(20,30,40,0.28);
      border: 1px solid rgba(255,255,255,0.12);
    }
    .group h4 {
      margin: 0 0 10px; font-weight: 800; color: #bfe7ff;
      letter-spacing: .2px;
    }

    .preset-card {
      border: 2px solid rgba(255,255,255,0.18);
      border-radius: 16px; padding: 10px; cursor: pointer;
      background: rgba(255,255,255,0.04);
      transition: transform .15s, border-color .15s, background .15s;
    }
    .preset-card.active {
      border-color: #67e8f9;
      background: rgba(103,232,249,0.10);
      transform: translateY(-1px);
    }
    .preset-title { color:#fff; font-weight:700; margin-bottom:8px; }
    .swatches { display:flex; gap:12px; }
    .swatch {
      flex:1; display:flex; align-items:center; gap:8px;
      padding:10px; border-radius:12px;
      border:1px solid rgba(255,255,255,0.18);
      background: rgba(0,0,0,0.2);
    }
    .dot { width:20px; height:20px; border-radius:50%; border:2px solid #fff3; }
    .lbl { color:#fff; font-weight:600; }

    .toggles { display:flex; flex-wrap:wrap; gap:16px; margin: 10px 16px; }
    .toggle { display:flex; align-items:center; gap:8px; color:#d4efff; font-weight:700; }
    .actions { display:flex; gap:12px; margin: 14px 16px 6px; }
    .apply-btn {
      flex:1; padding:12px 16px; border-radius:14px;
      border:0; cursor:pointer; font-weight:800; font-size:1rem;
      background:#7af8d0; color:#05302a;
      box-shadow: 0 8px 24px rgba(122,248,208,0.24);
    }

    .reset {
      display:block; margin: 20px auto; padding:12px 30px;
      border-radius:24px; border:3px solid #ff4c6a; background:transparent;
      color:#ff9cab; font-weight:800; cursor:pointer;
      box-shadow: 0 2px 24px #ff4c6a44;
    }

    details { margin: 0 16px 12px; }
    summary {
      list-style: none; cursor: pointer; padding: 12px 14px;
      border-radius: 14px; background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.12); color:#c9e3ff; font-weight:800;
      display:flex; align-items:center; gap:10px;
    }
    summary::-webkit-details-marker { display:none; }
    .kbd {
      margin-left:auto; background:#0b2233; border:1px solid #193245;
      padding: 4px 8px; border-radius:8px; color:#7ec8ff; font-weight:800;
    }
    .hint { color:#9ccaf0; font-size:.93rem; padding:12px 2px 0; }
  `;render(){return I`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${t=>this.expanded=t.detail.expanded}
      >
        <div slot="header" class="glass-header">🎨 Color Presets</div>

        <!-- Preset picker -->
        <div class="row">
          ${Object.entries(zt).map(([t,e])=>I`
            <div
              class="preset-card ${this._preset===t?"active":""}"
              @click=${()=>this._preset=t}
            >
              <div class="preset-title">${e.label}</div>
              <div class="swatches">
                <div class="swatch">
                  <div class="dot" style="background:${e.active.bg}"></div>
                  <div class="lbl">Active</div>
                </div>
                <div class="swatch">
                  <div class="dot" style="background:${e.inactive.bg}"></div>
                  <div class="lbl">Inactive</div>
                </div>
              </div>
            </div>
          `)}
        </div>

        <!-- Target toggles -->
        <div class="toggles">
          <label class="toggle">
            <input type="checkbox" .checked=${this._applyRoom}
              @change=${t=>this._applyRoom=t.target.checked} />
            Applica a Room
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._applySub}
              @change=${t=>this._applySub=t.target.checked} />
            Applica a Subbutton
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._applyMushroom}
              @change=${t=>this._applyMushroom=t.target.checked} />
            Applica ai Mushroom (incl. Camera & Climate)
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._applySensors}
              @change=${t=>this._applySensors=t.target.checked} />
            Applica ai Sensori
          </label>
          <label class="toggle">
            <input type="checkbox" .checked=${this._includeText}
              @change=${t=>this._includeText=t.target.checked} />
            Includi testo (Room)
          </label>
        </div>

        <div class="actions">
          <button class="apply-btn" @click=${this._applyPreset}>Applica preset</button>
        </div>

        <!-- (Facoltativo) Mostra i rami che andremo a toccare -->
        <details>
          <summary>
            Room Colors & Subbutton Colors
            <span class="kbd">preview</span>
          </summary>
          <div class="hint">
            Applichiamo background/icon per Active/Inactive.
            Se “Includi testo” è attivo, aggiorniamo anche
            <code>colors.room.text_active</code> / <code>text_inactive</code>
            (con alias <code>title_active</code> / <code>title_inactive</code>).
          </div>
        </details>

        <button class="reset" @click=${this._resetAll}>🧹 Reset Colors</button>
      </ha-expansion-panel>
    `}_applyPreset=()=>{const t=zt[this._preset];if(!t)return;const e=t.active,i=t.inactive;if(this._applyRoom&&(this._set("colors.room.background_active",e.bg),this._set("colors.room.background_inactive",i.bg),this._set("colors.room.icon_active",e.icon),this._set("colors.room.icon_inactive",i.icon),this._includeText&&(this._set("colors.room.text_active",e.icon),this._set("colors.room.text_inactive",i.icon),this._set("colors.room.title_active",e.icon),this._set("colors.room.title_inactive",i.icon))),this._applySub&&(this._set("colors.subbutton.background_active",e.bg),this._set("colors.subbutton.background_inactive",i.bg),this._set("colors.subbutton.icon_active",e.icon),this._set("colors.subbutton.icon_inactive",i.icon)),this._applyMushroom){this._set("colors.mushroom.background_active",e.bg),this._set("colors.mushroom.background_inactive",i.bg),this._set("colors.mushroom.icon_active",e.icon),this._set("colors.mushroom.icon_inactive",i.icon);for(const t of["camera","climate"])this._set(`colors.${t}.background_active`,e.bg),this._set(`colors.${t}.background_inactive`,i.bg),this._set(`colors.${t}.icon_active`,e.icon),this._set(`colors.${t}.icon_inactive`,i.icon)}this._applySensors&&(this._set("colors.sensors.chip_bg_active",e.bg),this._set("colors.sensors.chip_bg_inactive",i.bg),this._set("colors.sensors.chip_icon_active",e.icon),this._set("colors.sensors.chip_icon_inactive",i.icon))};_resetAll=()=>{const t=["colors.room.background_active","colors.room.background_inactive","colors.room.icon_active","colors.room.icon_inactive","colors.room.text_active","colors.room.text_inactive","colors.room.title_active","colors.room.title_inactive","colors.subbutton.background_active","colors.subbutton.background_inactive","colors.subbutton.icon_active","colors.subbutton.icon_inactive","colors.mushroom.background_active","colors.mushroom.background_inactive","colors.mushroom.icon_active","colors.mushroom.icon_inactive","colors.camera.background_active","colors.camera.background_inactive","colors.camera.icon_active","colors.camera.icon_inactive","colors.climate.background_active","colors.climate.background_inactive","colors.climate.icon_active","colors.climate.icon_inactive","colors.sensors.chip_bg_active","colors.sensors.chip_bg_inactive","colors.sensors.chip_icon_active","colors.sensors.chip_icon_inactive"];for(const e of t)this._set(e,"")};_set(t,e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}}customElements.define("color-panel",Ot);class jt extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_entity:{type:String,state:!0},_icon:{type:String,state:!0},_cameraCandidates:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._entity="",this._icon="",this._cameraCandidates=[]}_resolveAreaRef(){const t=Array.isArray(this.config?.area)?this.config.area[0]:this.config?.area,e="string"!=typeof t||t.startsWith("area_")?"":t;let i="string"==typeof t&&t.startsWith("area_")?t:"";const s=Array.isArray(this.hass?.areas)?this.hass.areas:[];if(!i&&s.length&&e){const t=s.find(t=>(t.name||"").toLowerCase()===String(e).toLowerCase());t?.area_id&&(i=t.area_id)}if(!i){const t=this.config?.entities?.camera?.entity,e=this.hass?.entities;t&&e?.[t]?.area_id&&(i=e[t].area_id)}return{areaId:i,areaName:e}}_matchAreaForEntityId(t,e,i){const s=this.hass?.entities;if(e&&s?.[t]?.area_id)return s[t].area_id===e;const o=this.hass?.states?.[t];if(!o)return!(e||i);const n=o.attributes?.area_id,a=o.attributes?.area;return e&&n?n===e:i&&a?String(a).toLowerCase()===String(i).toLowerCase():!(e||i)}_filterByAreaIncludeSelected(t,e,i,s){const o=(t||[]).filter(t=>this._matchAreaForEntityId(t,e,i));return s&&!o.includes(s)&&o.unshift(s),Array.from(new Set(o))}updated(t){if(t.has("config")||t.has("hass")){const t=this.config?.entities?.camera?.entity||"",e=this.config?.entities?.camera?.icon||"";if(t&&!e){const e=this.hass?.states?.[t],i=e?.attributes?.icon,s=i||wt(t,this.hass);s&&this._set("entities.camera.icon",s)}this._entity=t,this._icon=this.config?.entities?.camera?.icon||"";if(this.config?.auto_discovery_sections?.camera??!1){const{areaId:t,areaName:e}=this._resolveAreaRef();let i=pt(this.hass,this.config,"camera")||[];!i.length&&this.hass?.states&&(i=Object.keys(this.hass.states).filter(t=>t.startsWith("camera."))),this._cameraCandidates=this._filterByAreaIncludeSelected(i,t,e,this._entity)}else this._cameraCandidates=[]}}static styles=n`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important; width: 100%; box-sizing: border-box;
      border-radius: 40px; position: relative;
      background: var(--glass-bg, rgba(40,120,180,0.28));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(40,120,180,0.18));
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
      display:block; font-weight:700; margin-bottom:6px; color:#7ec2ff;
    }
    ha-selector { width:100%; box-sizing:border-box; }
    .reset-button {
      border: 3.5px solid #ff4c6a; color:#ff4c6a; border-radius:24px;
      padding:12px 38px; background:transparent; cursor:pointer;
      display:block; margin: 20px auto; font-size:1.15rem; font-weight:700;
      box-shadow: 0 2px 24px #ff4c6a44;
    }
  `;render(){const t=this.config?.auto_discovery_sections?.camera??!1;return I`
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
          <label>🪄 Auto-discovery</label>
        </div>

        <div class="input-group">
          <label>Camera (ID):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._entity}
            .selector=${this._cameraCandidates.length?{entity:{include_entities:this._cameraCandidates}}:{entity:{domain:"camera"}}}
            allow-custom-entity
            @value-changed=${t=>this._set("entities.camera.entity",t.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Camera Icon:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._icon}
            .selector={{ icon: {} }}
            @value-changed=${t=>this._set("entities.camera.icon",t.detail.value)}
          ></ha-selector>
        </div>

        <button
          class="reset-button"
          @click=${()=>this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"camera"},bubbles:!0,composed:!0}))}
        >🧹 Reset Camera</button>
      </ha-expansion-panel>
    `}_toggleAuto(t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.camera",val:t},bubbles:!0,composed:!0}))}_set(t,e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}}customElements.define("camera-panel",jt);class Mt extends st{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_entity:{type:String,state:!0},_icon:{type:String,state:!0},_climateCandidates:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._entity="",this._icon="",this._climateCandidates=[]}_resolveAreaRef(){const t=Array.isArray(this.config?.area)?this.config.area[0]:this.config?.area,e="string"!=typeof t||t.startsWith("area_")?"":t;let i="string"==typeof t&&t.startsWith("area_")?t:"";const s=Array.isArray(this.hass?.areas)?this.hass.areas:[];if(!i&&s.length&&e){const t=s.find(t=>(t.name||"").toLowerCase()===String(e).toLowerCase());t?.area_id&&(i=t.area_id)}if(!i){const t=this.config?.entities?.climate?.entity,e=this.hass?.entities;t&&e?.[t]?.area_id&&(i=e[t].area_id)}return{areaId:i,areaName:e}}_matchAreaForEntityId(t,e,i){const s=this.hass?.entities;if(e&&s?.[t]?.area_id)return s[t].area_id===e;const o=this.hass?.states?.[t];if(!o)return!(e||i);const n=o.attributes?.area_id,a=o.attributes?.area;return e&&n?n===e:i&&a?String(a).toLowerCase()===String(i).toLowerCase():!(e||i)}_filterByAreaIncludeSelected(t,e,i,s){const o=(t||[]).filter(t=>this._matchAreaForEntityId(t,e,i));return s&&!o.includes(s)&&o.unshift(s),Array.from(new Set(o))}updated(t){if(t.has("config")||t.has("hass")){const t=this.config?.entities?.climate?.entity||"",e=this.config?.entities?.climate?.icon||"";if(t&&!e){const e=this.hass?.states?.[t],i=e?.attributes?.icon,s=i||wt(t,this.hass);s&&this._set("entities.climate.icon",s)}this._entity=t,this._icon=this.config?.entities?.climate?.icon||"";if(this.config?.auto_discovery_sections?.climate??!1){const{areaId:t,areaName:e}=this._resolveAreaRef();let i=pt(this.hass,this.config,"climate")||[];!i.length&&this.hass?.states&&(i=Object.keys(this.hass.states).filter(t=>t.startsWith("climate."))),this._climateCandidates=this._filterByAreaIncludeSelected(i,t,e,this._entity)}else this._climateCandidates=[]}}static styles=n`
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
    ha-selector { width:100%; box-sizing:border-box; }
    .reset-button {
      border: 3.5px solid #ff4c6a; color:#ff4c6a; border-radius:24px;
      padding:12px 38px; background:transparent; cursor:pointer;
      display:block; margin: 20px auto; font-size:1.15rem; font-weight:700;
      box-shadow: 0 2px 24px #ff4c6a44;
    }
  `;render(){const t=this.config?.auto_discovery_sections?.climate??!1;return I`
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
          <label>🪄 Auto-discovery</label>
        </div>

        <div class="input-group">
          <label>Climate (ID):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._entity}
            .selector=${this._climateCandidates.length?{entity:{include_entities:this._climateCandidates}}:{entity:{domain:"climate"}}}
            allow-custom-entity
            @value-changed=${t=>this._set("entities.climate.entity",t.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Climate Icon:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._icon}
            .selector={{ icon: {} }}
            @value-changed=${t=>this._set("entities.climate.icon",t.detail.value)}
          ></ha-selector>
        </div>

        <button
          class="reset-button"
          @click=${()=>this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"climate"},bubbles:!0,composed:!0}))}
        >🧹 Reset Climate</button>
      </ha-expansion-panel>
    `}_toggleAuto(t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.climate",val:t},bubbles:!0,composed:!0}))}_set(t,e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:t,val:e},bubbles:!0,composed:!0}))}}customElements.define("climate-panel",Mt);class Rt extends st{static properties={hass:{type:Object},config:{type:Object},openPanel:{type:String,state:!0}};constructor(){super(),this.hass=void 0,this.config={},this.openPanel="",this._onPanelChanged=this._onPanelChanged.bind(this),this._onPanelCmd=this._onPanelCmd.bind(this),this._togglePanel=this._togglePanel.bind(this),this._onConfigChanged=this._onConfigChanged.bind(this)}setConfig(t){this.config={type:t?.type||"custom:bubble-room",...t||{}},this.requestUpdate()}set value(t){this.config=t||{}}get value(){return this.config}connectedCallback(){super.connectedCallback(),this.addEventListener("panel-changed",this._onPanelChanged),this.addEventListener("__panel_cmd__",this._onPanelCmd)}disconnectedCallback(){this.removeEventListener("panel-changed",this._onPanelChanged),this.removeEventListener("__panel_cmd__",this._onPanelCmd),super.disconnectedCallback()}_emitConfig(t){const e={type:this.config?.type||"custom:bubble-room",...t||{}};this.config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0})),this.requestUpdate()}_setConfigValue(t,e){const i=String(t).split("."),s=structuredClone(this.config||{});let o=s;for(let t=0;t<i.length-1;t++){const e=i[t];"object"==typeof o[e]&&null!==o[e]||(o[e]={}),o=o[e]}o[i[i.length-1]]=e,this._emitConfig(s)}_onPanelChanged(t){t.stopPropagation();const{prop:e,val:i}=t.detail||{};if(!e)return;const s=this.config,o=structuredClone(s||{}),n=String(e).split(".");let a=o;for(let t=0;t<n.length-1;t++){const e=n[t];"object"==typeof a[e]&&null!==a[e]||(a[e]={}),a=a[e]}a[n[n.length-1]]=i;const r="area"===e,l=e.startsWith("auto_discovery_sections."),c=r||l?xt(this.hass,o,e,!1):o;this._emitConfig(c)}_onConfigChanged(t){t.stopPropagation();const{path:e,value:i}=t.detail||{};if(!e)return;const s=this.config,o=structuredClone(s||{}),n=String(e).split(".");let a=o;for(let t=0;t<n.length-1;t++){const e=n[t];"object"==typeof a[e]&&null!==a[e]||(a[e]={}),a=a[e]}a[n[n.length-1]]=i;const r="area"===e,l=e.startsWith("auto_discovery_sections."),c=r||l?xt(this.hass,o,e,!1):o;this._emitConfig(c)}_onPanelCmd(t){t.stopPropagation();const{cmd:e,section:i}=t.detail||{};if("reset"!==e)return;let s=this.config||{};switch(i){case"room":s=function(t){const e={...t.entities||{}};delete e.presence;const i={...t,entities:e};return delete i.name,delete i.icon,delete i.area,delete i.presence_entity,i}(s);break;case"sensors":s=function(t){const e={...t.entities||{}};return["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6","sensor7","sensor8"].forEach(t=>delete e[t]),{...t,entities:e}}(s);break;case"mushrooms":s=function(t){const e={...t.entities||{}};return["mushroom1","mushroom2","mushroom3","mushroom4","mushroom5","climate","camera"].forEach(t=>delete e[t]),{...t,entities:e}}(s);break;case"subbuttons":s=function(t){const e={...t.entities||{}};return["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"].forEach(t=>delete e[t]),{...t,entities:e}}(s);break;case"climate":s=function(t){const e={...t.entities||{}};return delete e.climate,{...t,entities:e}}(s),s?.auto_discovery_sections?.climate&&(s=xt(this.hass,s,"auto_discovery_sections.climate",!1));break;case"camera":s=function(t){const e={...t.entities||{}};return delete e.camera,{...t,entities:e}}(s),s?.auto_discovery_sections?.camera&&(s=xt(this.hass,s,"auto_discovery_sections.camera",!1));break;default:return}this._emitConfig(s)}_togglePanel(t,e){const i=t?.detail?.expanded;this.openPanel=i?e:""}static styles=n`
    :host { display:block; }
    .editor-grid {
      display:grid; gap: 16px;
      grid-template-columns: 1fr;
      align-items: start;
    }
    @media (min-width: 1100px) {
      .editor-grid { grid-template-columns: 1fr 1fr; }
    }
  `;render(){const t=this.config||{};return I`
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
    `}}customElements.define("bubble-room-editor",Rt);var Tt=Object.freeze({__proto__:null,BubbleRoomEditor:Rt});class Ft extends st{static properties={subbuttons:{type:Array}};constructor(){super(),this.subbuttons=[],this._holdThreshold=500,this._holdTimer=null,this._holdFired=!1,this._currentIndex=-1}static styles=n`
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
  `;render(){return I`
      <div class="container">
        ${this.subbuttons.map((t,e)=>{const i=t.active?t.colorOn:t.colorOff,s=t.active?t.iconOn:t.iconOff;return I`
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
    `}_onDown(t){this._holdFired=!1,this._currentIndex=t,this._holdTimer=window.setTimeout(()=>{this._holdFired=!0,this._fireHassAction(t,"hold")},this._holdThreshold)}_onUp(t){this._clearHoldTimer(),this._holdFired||this._currentIndex!==t||this._fireHassAction(t,"tap")}_clearHoldTimer(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)}_fireHassAction(t,e){const i=this.subbuttons?.[t];if(!i||!i.entity_id)return;const s={entity:i.entity_id,tap_action:i.tap_action||{action:"toggle"},hold_action:i.hold_action||{action:"more-info"}},o=new Event("hass-action",{bubbles:!0,composed:!0});o.detail={config:s,action:e},this.dispatchEvent(o)}}customElements.define("bubble-subbutton",Ft);class It extends st{static properties={hass:{type:Object},name:{type:String},area:{type:String},config:{type:Object},container:{type:Object}};_raf=null;_resizeObs=null;constructor(){super(),this.name=""}firstUpdated(){this._scheduleScale(),this._resizeObs=new ResizeObserver(()=>this._scheduleScale()),this._resizeObs.observe(this),window.addEventListener("resize",this._scheduleScale,{passive:!0})}updated(t){(t.has("name")||t.has("config")||t.has("container"))&&this._scheduleScale()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObs?.disconnect(),window.removeEventListener("resize",this._scheduleScale)}_scheduleScale=()=>{this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=null,this._autoScaleFont()}))};_autoScaleFont(){const t=this.renderRoot.querySelector(".bubble-name"),e=this.container||this.parentElement||this;if(!t||!e)return;this._resizeObs.disconnect();let i=8,s=160;for(let o=0;o<8;o++){const o=i+s>>1;t.style.fontSize=`${o}px`,t.scrollWidth<=e.clientWidth&&t.scrollHeight<=e.clientHeight?i=o:s=o-1}t.style.fontSize=`${i}px`,this._resizeObs.observe(this)}_isRoomActive(){const t=this.config?.entities?.presence?.entity;if(!t)return!1;const e=this.hass?.states?.[t]?.state;return["on","home","occupied","motion","detected"].includes(e)}render(){return I`<div class="bubble-name">${this.name}</div>`}static styles=n`
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
  `}customElements.define("bubble-name",It);class Ut extends st{static properties={sensors:{type:Array}};constructor(){super(),this.sensors=[],this.rows=1,this.columns=1,this._resizeObserver=null,this._resizeScheduled=!1}connectedCallback(){super.connectedCallback(),this._updateLayout(),this._resizeObserver=new ResizeObserver(()=>{this._resizeScheduled||(this._resizeScheduled=!0,requestAnimationFrame(()=>{this._autoScaleValues(),this._resizeScheduled=!1}))}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect()}updated(t){t.has("sensors")&&(this._updateLayout(),this._autoScaleValues())}_updateLayout(){const t=this.sensors?.length||0;this.rows=t>4?2:1,this.columns=t>4?4:t||1}_autoScaleValues(){const t=this.renderRoot?.querySelectorAll(".sensor-pill");t?.length&&t.forEach(t=>this._fitValueAndUnit(t))}_fitValueAndUnit(t){const e=t.querySelector(".sensor-value"),i=t.querySelector(".sensor-unit");if(!e)return;const s=.52*t.clientWidth,o=.78*t.clientHeight;if(s<=0||o<=0)return;e.style.fontSize="",i&&(i.style.fontSize="");let n=10,a=44,r=n;for(let t=0;t<16;t++){const t=Math.floor((n+a)/2);if(e.style.fontSize=`${t}px`,i){const e=Math.max(10,Math.round(.75*t));i.style.fontSize=`${e}px`}const l=e.getBoundingClientRect(),c=i?i.getBoundingClientRect():{width:0,height:0},d=l.width+c.width+6,h=Math.max(l.height,c.height);d<=s&&h<=o?(r=t,n=t+1):a=t-1}e.style.fontSize=`${r}px`,i&&(i.style.fontSize=`${Math.max(10,Math.round(.75*r))}px`)}_openMoreInfo(t){if(!t||"string"!=typeof t)return;const e=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}});(document.querySelector("home-assistant")||this).dispatchEvent(e)}static styles=n`
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
      /* layout determinato da rows/columns impostati in _updateLayout */
    }

    .sensor-pill {
      display: flex;
      align-items: center;
      gap: 8px;
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
      cursor: pointer;
      padding: 10px 12px;
    }

    .sensor-icon {
      font-size: 1.4em; /* leggermente più grande dell'originale */
      opacity: 0.81;
      flex: 0 0 auto;
    }

    .sensor-label {
      opacity: 0.85;
      font-weight: 600;
      font-size: clamp(14px, 1.5vw, 20px); /* emoji più grande */
      transform: scale(0.95);
      display: inline-block;
      line-height: 1;
      flex: 0 0 auto;
    }

    .sensor-value {
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.01em;
      line-height: 1;
      /* la size viene impostata dinamicamente via JS */
    }

    .sensor-unit {
      opacity: 0.8;
      font-weight: 600;
      /* la size viene impostata dinamicamente via JS */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
      margin-left: 4px;
      flex: 0 0 auto;
    }
  `;render(){const t=(this.sensors||[]).map(t=>{const e=t.device_class,i=Ct[e]||{},s=i.emoji||"❓",o=t.unit||i.units?.[0]||"";return{...t,label:s,unit:o}});return I`
      <div
        class="sensor-grid"
        style="
          grid-template-columns: repeat(${this.columns}, 1fr);
          grid-template-rows: repeat(${this.rows}, 1fr);
        "
      >
        ${t.map(t=>{const e=t.entity||t.entity_id||"",i=e?`Mostra grafico storico: ${e}`:"Mostra grafico storico";return I`
            <div
              class="sensor-pill"
              style="color: ${t.color||"#e3f6ff"}"
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
    `}}customElements.define("bubble-sensor",Ut);class Nt extends st{static properties={entities:{type:Array}};constructor(){super(),this.entities=[],this._containerSize={width:0,height:0},this._rafSize=null,this._ro=new ResizeObserver(t=>{const e=t[0]?.contentRect;e&&(this._rafSize&&cancelAnimationFrame(this._rafSize),this._rafSize=requestAnimationFrame(()=>{const t=Math.round(e.width),i=Math.round(e.height);t===this._containerSize.width&&i===this._containerSize.height||(this._containerSize={width:t,height:i},this.requestUpdate())}))}),this._holdThreshold=500,this._holdTimer=null,this._holdFired=!1,this._lastTapTs=0}connectedCallback(){super.connectedCallback(),this._ro.observe(this)}disconnectedCallback(){this._ro.disconnect(),super.disconnectedCallback()}_updateSize(){const t=this.getBoundingClientRect();this._containerSize={width:t.width,height:t.height},this.requestUpdate()}_handleClick(t){this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:{entity:t.entity_id,tap_action:t.tap_action||{action:"toggle"},hold_action:t.hold_action||{action:"more-info"}},action:"tap"},bubbles:!0,composed:!0}))}_dispatchAction(t,e){const i={entity:t.entity_id||t.entity||t,tap_action:t.tap_action||{action:"toggle"},hold_action:t.hold_action||{action:"more-info"},double_tap_action:t.double_tap_action};this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:i,action:e},bubbles:!0,composed:!0}))}_onPointerDown(t,e){t.preventDefault(),this._holdFired=!1,clearTimeout(this._holdTimer),this._holdTimer=setTimeout(()=>{this._holdFired=!0,this._dispatchAction(e,"hold")},this._holdThreshold)}_onPointerUp(t,e){if(t.preventDefault(),clearTimeout(this._holdTimer),this._holdFired)return void(this._holdFired=!1);const i=Date.now();if(e?.double_tap_action&&i-this._lastTapTs<300)return this._lastTapTs=0,void this._dispatchAction(e,"double_tap");this._lastTapTs=i,setTimeout(()=>{Date.now()-this._lastTapTs>=280&&this._dispatchAction(e,"tap")},280)}_onPointerCancel(){clearTimeout(this._holdTimer),this._holdFired=!1}static styles=n`
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
  `;render(){const{width:t,height:e}=this._containerSize;if(!t||!e)return I``;const i=window.innerWidth||t,s=.55;let o;if(i<=100)o=s;else if(i>=200)o=.25;else{o=s+(.25-s)*((i-100)/100)}const n=Math.min(t,1.6*e),a=.5*(e+n)*o,r=.6*t,l=.6*e,c=r*Math.min(1,t/(2*r)),d=l*Math.min(1,e/(2*l)),h=t-c,p=.5*e,u=Math.max(0,c-a/2-1),g=Math.max(0,d-a/2-1),b=t=>Math.PI*t/180,m=b(30),f=b(85),_=.75*a,v=.75*a,x=[{x:a/2+1,y:a/2+1},{x:h+u*Math.cos(-f),y:p+g*Math.sin(-f)},{x:h+u*Math.cos(-m),y:p+g*Math.sin(-m)},{x:h+u*Math.cos(+m),y:p+g*Math.sin(+m)},{x:h+u*Math.cos(+f),y:p+g*Math.sin(+f)}];let y=0;return I`
      ${this.entities.map(i=>{const s="camera"===i?.kind,o="climate"===i?.kind,n=s?_:o?v:a,r=.95*n;let l;s?l={x:t-n/2,y:n/2}:o?l={x:n/2+1,y:e-n/2-1}:(l=x[Math.min(y,x.length-1)]??{x:h,y:p},y++);const c=s||o?0:i.dx??0,d=s||o?0:i.dy??0,u=l.x+c,g=l.y+d;return I`
          <div
            class="mushroom-entity"
            style="
              left:${u}px;
              top:${g}px;
              width:${n}px;
              height:${n}px;
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
    `}}customElements.define("bubble-mushroom",Nt);class Bt extends st{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String},backgroundActive:{type:String},backgroundInactive:{type:String}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16",this.backgroundActive="rgba(33,223,115,0.12)",this.backgroundInactive="rgba(23,60,22,0.08)"}static styles=n`
    :host {
      position: absolute;   /* prende come riferimento .icon-mushroom-area */
      inset: 0;
      box-sizing: border-box;
    }
    .main-icon-container {
      opacity: 0.30;
      box-sizing: border-box;
      background: var(--main-icon-bg, rgba(33,223,115,0.12));
      border-radius: 0 70% 70% 0;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
    .main-icon {
      --mdc-icon-size: var(--main-icon-size, 160px);
      width: var(--mdc-icon-size);
      height: var(--mdc-icon-size);
      transform: translateX(var(--icon-shift-x, -20%));
    }
  `;render(){const t=this.active?this.colorActive:this.colorInactive,e=this.active?this.backgroundActive:this.backgroundInactive;return I`
      <div class="main-icon-container" style="background:${e}">
        <ha-icon
          class="main-icon"
          .icon="${this.icon}"
          style="color:${t}"
          @click="${()=>this.dispatchEvent(new CustomEvent("main-icon-click"))}"
        ></ha-icon>
      </div>
    `}}customElements.define("bubble-icon",Bt);class Ht extends st{static properties={config:{type:Object},hass:{type:Object}};_entities={};constructor(){super(),this.config={},this.hass={}}setConfig(t){this.config={layout:"wide",...t},this._entities=structuredClone(this.config.entities||{}),this._entities.camera=this._entities.camera||{entity:"",icon:""},this._entities.camera.presence||(this._entities.camera.presence={entity:""}),this._entities.climate=this._entities.climate||{entity:"",icon:""}}static getStubConfig(){return{type:"custom:bubble-room",layout:"wide",name:[],area:[],sensors:[],mushrooms:[],subbuttons:[],colors:{subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return Tt}),document.createElement("bubble-room-editor")}connectedCallback(){super.connectedCallback(),this._resizeObs=new ResizeObserver(()=>this.requestUpdate())}firstUpdated(){const t=this.shadowRoot?.querySelector(".icon-mushroom-area");t&&this._resizeObs.observe(t)}disconnectedCallback(){this._resizeObs?.disconnect(),super.disconnectedCallback()}updated(t){t.has("config")&&(this._entities=structuredClone(this.config.entities||{}))}_getSubButtons(){const t=this.config.colors?.subbutton?.background_on??"#00d46d",e=this.config.colors?.subbutton?.background_off??"#999",i=this.config.colors?.subbutton?.icon_on??"yellow",s=this.config.colors?.subbutton?.icon_off??"#666";return(this.config.subbuttons||[]).map(o=>{const n=this.hass.states?.[o.entity_id];return{icon:o.icon||wt(o.entity_id,this.hass),active:"on"===n?.state,colorOn:t,colorOff:e,iconOn:i,iconOff:s,entity_id:o.entity_id,tap_action:o.tap_action,hold_action:o.hold_action}})}_isRoomActive(){const t=this.config?.entities?.presence?.entity;if(!t)return!1;const e=this.hass?.states?.[t]?.state;return["on","home","occupied","motion","detected"].includes(e)}_getMainIconSize(){const t=this.shadowRoot?.querySelector(".icon-mushroom-area");return t?Math.round(.6*Math.min(t.clientWidth,t.clientHeight)):64}_getSensors(){const t=this._entities||{},e=this.config.colors?.room?.sensor_active??this.config.colors?.room?.text_active??"#21df73",i=this.config.colors?.room?.sensor_inactive??this.config.colors?.room?.text_inactive??"#173c16",s=this._isRoomActive()?e:i,o=[];for(let e=1;e<=6;e++){const i=t[`sensor${e}`]?.entity,n=this.hass?.states?.[i];i&&n&&o.push({icon:n.attributes.icon||"",value:n.state,unit:n.attributes.unit_of_measurement,device_class:n.attributes.device_class,color:s,entity:i})}return o}_getMushrooms(){const t=this._entities||{},e=this.config.colors?.mushroom?.active??"#00e676",i=this.config.colors?.mushroom?.inactive??"#888",s=[];for(let o=1;o<=5;o++){const n=t[`mushroom${o}`]||{},a=n.entity,r=this.hass?.states?.[a];a&&r&&s.push({icon:n.icon||r.attributes.icon||wt(a,this.hass)||"mdi:flash",state:r.state,color:"on"===r.state?e:i,dx:n.dx??0,dy:n.dy??0,angle_deg:n.angle_deg,radius_factor:n.radius_factor,entity_id:a,tap_action:n.tap_action,hold_action:n.hold_action})}const o=t.camera||{},n=o.entity;if(n&&this.hass.states?.[n]){const t=this.hass.states[n],a=o.presence?.entity,r=a?this.hass?.states?.[a]?.state:void 0,l=!a||["on","home","occupied","motion","detected"].includes(r);s.push({icon:o.icon||t.attributes.icon||wt(n,this.hass)||"mdi:cctv",state:t.state,color:l?e:i,left:"calc(100% - 12px - 36px)",top:12,dx:0,dy:0,kind:"camera",angle_deg:o.angle_deg,radius_factor:o.radius_factor,entity_id:n,tap_action:{action:"more-info"},hold_action:{action:"none"}})}const a=this._entities?.climate||{},r=a.entity;if(r&&this.hass.states?.[r]){const t=this.hass.states[r],o=t.state&&"off"!==t.state&&"idle"!==t.state||t.attributes?.hvac_action&&"off"!==t.attributes.hvac_action;s.push({icon:a.icon||t.attributes.icon||wt(r,this.hass)||"mdi:thermostat",state:t.state,color:o?e:i,dx:0,dy:0,angle_deg:a.angle_deg,radius_factor:a.radius_factor,kind:"climate",entity_id:r})}return s}_onMushroomClick(t){}render(){const t=this.config.layout||"wide",e=this._getMainIconSize(),i=this._getSubButtons(),s=this._isRoomActive(),o=this.config.colors?.room?.icon_active??"#21df73",n=this.config.colors?.room?.icon_inactive??"#173c16",a=this.config.colors?.room?.background_active??"rgba(33,223,115,0.12)",r=this.config.colors?.room?.background_inactive??"rgba(23,60,22,0.12)",l=this.config.colors?.room?.text_active??"#ffffff",c=this.config.colors?.room?.text_inactive??"rgba(255,255,255,0.5)";return I`
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
                .backgroundActive="${a}"
                .backgroundInactive="${r}"
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
  `}customElements.define("bubble-room",Ht),window.customCards.push({type:"bubble-room",name:"Bubble Room",description:"A stylish room control card with environmental sensors",preview:!0,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});export{Ht as BubbleRoom};
//# sourceMappingURL=lovelace-bubble-room.js.map
