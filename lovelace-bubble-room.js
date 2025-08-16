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
 */var r;const l=window,c=l.trustedTypes,d=c?c.emptyScript:"",h=l.reactiveElementPolyfillSupport,p={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},u=(e,t)=>t!==e&&(t==t||e==e),g={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:u},b="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=g){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const n=this[e];this[t]=s,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||g}static finalize(){if(this.hasOwnProperty(b))return!1;this[b]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{t?i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):s.forEach(t=>{const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=g){var s;const n=this.constructor._$Ep(e,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,n=s._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=s.getPropertyOptions(n),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:p;this._$El=n,this[n]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;f[b]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:f}),(null!==(r=l.reactiveElementVersions)&&void 0!==r?r:l.reactiveElementVersions=[]).push("1.6.3");const _=window,v=_.trustedTypes,x=v?v.createPolicy("lit-html",{createHTML:e=>e}):void 0,y="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,w="?"+$,k=`<${w}>`,C=document,A=()=>C.createComment(""),S=e=>null===e||"object"!=typeof e&&"function"!=typeof e,E=Array.isArray,z="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,F=/>/g,O=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,R=/"/g,T=/^(?:script|style|textarea|title)$/i,I=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),N=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),B=new WeakMap,H=C.createTreeWalker(C,129,null,!1);function W(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const q=(e,t)=>{const i=e.length-1,s=[];let n,o=2===t?"<svg>":"",a=P;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===P?"!--"===l[1]?a=M:void 0!==l[1]?a=F:void 0!==l[2]?(T.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=O):void 0!==l[3]&&(a=O):a===O?">"===l[0]?(a=null!=n?n:P,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?O:'"'===l[3]?R:j):a===R||a===j?a=O:a===M||a===F?a=P:(a=O,n=void 0);const h=a===O&&e[t+1].startsWith("/>")?" ":"";o+=a===P?i+k:c>=0?(s.push(r),i.slice(0,c)+y+i.slice(c)+$+h):i+$+(-2===c?(s.push(void 0),t):h)}return[W(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),s]};class L{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,o=0;const a=e.length-1,r=this.parts,[l,c]=q(e,t);if(this.el=L.createElement(l,i),H.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=H.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith(y)||t.startsWith($)){const i=c[o++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+y).split($),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?G:"?"===t[1]?X:"@"===t[1]?Z:J})}else r.push({type:6,index:n})}for(const t of e)s.removeAttribute(t)}if(T.test(s.tagName)){const e=s.textContent.split($),t=e.length-1;if(t>0){s.textContent=v?v.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],A()),H.nextNode(),r.push({type:2,index:++n});s.append(e[t],A())}}}else if(8===s.nodeType)if(s.data===w)r.push({type:2,index:n});else{let e=-1;for(;-1!==(e=s.data.indexOf($,e+1));)r.push({type:7,index:n}),e+=$.length-1}n++}}static createElement(e,t){const i=C.createElement("template");return i.innerHTML=e,i}}function D(e,t,i=e,s){var n,o,a,r;if(t===N)return t;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const c=S(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,s)),void 0!==s?(null!==(a=(r=i)._$Co)&&void 0!==a?a:r._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(t=D(e,l._$AS(e,t.values),l,s)),t}class V{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:C).importNode(i,!0);H.currentNode=n;let o=H.nextNode(),a=0,r=0,l=s[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new Y(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new Q(o,this,e)),this._$AV.push(t),l=s[++r]}a!==(null==l?void 0:l.index)&&(o=H.nextNode(),a++)}return H.currentNode=C,n}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Y{constructor(e,t,i,s){var n;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=D(this,e,t),S(e)?e===U||null==e||""===e?(this._$AH!==U&&this._$AR(),this._$AH=U):e!==this._$AH&&e!==N&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>E(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==U&&S(this._$AH)?this._$AA.nextSibling.data=e:this.$(C.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,n="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=L.createElement(W(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(i);else{const e=new V(n,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new L(e)),t}T(e){E(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new Y(this.k(A()),this.k(A()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class J{constructor(e,t,i,s,n){this.type=1,this._$AH=U,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const n=this.strings;let o=!1;if(void 0===n)e=D(this,e,t,0),o=!S(e)||e!==this._$AH&&e!==N,o&&(this._$AH=e);else{const s=e;let a,r;for(e=n[0],a=0;a<n.length-1;a++)r=D(this,s[i+a],t,a),r===N&&(r=this._$AH[a]),o||(o=!S(r)||r!==this._$AH[a]),r===U?e=U:e!==U&&(e+=(null!=r?r:"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(e)}j(e){e===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class G extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===U?void 0:e}}const K=v?v.emptyScript:"";class X extends J{constructor(){super(...arguments),this.type=4}j(e){e&&e!==U?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class Z extends J{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=D(this,e,t,0))&&void 0!==i?i:U)===N)return;const s=this._$AH,n=e===U&&s!==U||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==U&&(s===U||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Q{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){D(this,e)}}const ee=_.litHtmlPolyfillSupport;null==ee||ee(L,Y),(null!==(m=_.litHtmlVersions)&&void 0!==m?m:_.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var te,ie;class se extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let a=o._$litPart$;if(void 0===a){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=a=new Y(t.insertBefore(A(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return N}}se.finalized=!0,se._$litElement$=!0,null===(te=globalThis.litElementHydrateSupport)||void 0===te||te.call(globalThis,{LitElement:se});const ne=globalThis.litElementPolyfillSupport;null==ne||ne({LitElement:se}),(null!==(ie=globalThis.litElementVersions)&&void 0!==ie?ie:globalThis.litElementVersions=[]).push("3.3.3");const oe={alarm_control_panel:"Allarmi",binary_sensor:"Sensori Binari",camera:"Telecamere",climate:"Clima",cover:"Tapparelle",fan:"Ventola",light:"Luce",lock:"Serratura",media_player:"Media Player",scene:"Scene",script:"Script",siren:"Sirena",vacuum:"Aspirapolvere",motion:"Movimento",occupancy:"Occupazione",presence:"Presenza",motion:"Movimento",occupancy:"Occupazione",presence:"Presenza",moving:"In movimento",door:"Porta",window:"Finestra",opening:"Apertura",garage_door:"Basculante",vibration:"Vibrazione",sound:"Suono",moisture:"Umidità/Perdita",water:"Acqua/Perdita",smoke:"Fumo",gas:"Gas",carbon_monoxide:"Monossido",cold:"Freddo",heat:"Caldo",light_level:"Luce (livello)",connectivity:"Connettività",lock_dc:"Serratura (stato)",plug:"Presa",power:"Alimentazione",problem:"Problema",running:"In esecuzione",safety:"Sicurezza",tamper:"Manomissione",update:"Aggiornamento",switch:"Pulsante"},ae=["alarm_control_panel","binary_sensor","camera","climate","cover","fan","light","lock","media_player","scene","script","siren","switch","vacuum"],re=["motion","occupancy","presence","moving","door","window","opening","garage_door","vibration","sound","moisture","water","smoke","gas","carbon_monoxide","cold","heat","light_level","connectivity","plug","power","problem","running","safety","tamper","update"],le=(e=[])=>({includeDomains:ae,entityFilter:(t,i)=>{if(!e.length)return!1;const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return e.includes(s)}}),ce=(e=[])=>({includeDomains:["sensor"],entityFilter:(t,i)=>{if(!e.length)return!0;const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}}),de=(e=[])=>({includeDomains:ae,entityFilter:(t,i)=>{if(!e.length)return"binary_sensor"===t.split(".")[0];const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return e.includes(s)}}),he=(e=[])=>({includeDomains:ae,entityFilter:(t,i)=>{if(!e.length)return ae.includes(t.split(".")[0]);const[s]=t.split(".");if("binary_sensor"===s){const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}return ae.includes(s)}}),pe=(e=[])=>({includeDomains:["camera"],entityFilter:(t,i)=>{if(!e.length)return!0;const s=i.states[t]?.attributes?.device_class??"";return e.includes(s)}}),ue=(e=[])=>({includeDomains:["climate"],entityFilter:(e,t)=>!0});function ge(e){return"string"==typeof e&&e.trim().length>0}function be(e,t,i){if(!ge(i))return!0;const s=function(e){if(!e)return{};if(!Array.isArray(e))return e;const t={};for(const i of e){const e=i?.entity_id||i?.id;e&&(t[e]=i)}return t}(e?.entities),n=function(e){if(!e)return{};if(!Array.isArray(e))return e;const t={};for(const i of e){const e=i?.id||i?.device_id;e&&(t[e]=i)}return t}(e?.devices),o=s[t];if(o?.area_id===i)return!0;const a=o?.device_id||o?.deviceId;if(a&&n[a]?.area_id===i)return!0;const r=e?.states?.[t]?.attributes?.area_id;return r===i}function fe(e,t,i,s=[]){if(!e?.states)return[];let n;if("presence"===i?n=le(s):"sensor"===i?n=ce(s):"mushroom"===i?n=de(s):"subbutton"===i?n=he(s):"camera"===i?n=pe(s):"climate"===i&&(n=ue(s)),!n)return[];const o=Object.keys(e.states).filter(e=>n.includeDomains.includes(e.split(".")[0])).filter(t=>n.entityFilter(t,e));let a=o;const r="string"==typeof t?.area_id?t.area_id:t?.area;if(ge(r)){const t=function(e,t){return e?.states&&ge(t)?Object.keys(e.states).filter(i=>be(e,i,t)):[]}(e,r),i=o.filter(e=>t.includes(e));i.length&&(a=i)}const l=t?.entities?.[i],c=function(e){const t=new Set,i=e=>{e&&("string"==typeof e&&e.includes(".")?t.add(e):Array.isArray(e)?e.forEach(i):"object"==typeof e&&Object.values(e).forEach(i))};return i(e),Array.from(t)}(l);return function(e,t){const i=Array.from(new Set(e)),s=Array.isArray(t)?t:t?[t]:[];for(let e=s.length-1;e>=0;e--){const t=s[e];t&&!i.includes(t)&&i.unshift(t)}return i}(a,c)}const me=!!window.__BUBBLE_DEBUG__;function _e(e,t,i,s=!1){if(!e||!t)return t;const n=t.auto_discovery_sections||{};return i&&String(i).startsWith("auto_discovery_sections."),(s||me)&&"undefined"!=typeof window&&console.info("[AutoDiscovery] (no-op) after",i,{sections:n}),t}let ve;try{const{IconCache:e}=await Promise.resolve().then(function(){return Ce});ve=e}catch(e){ve={_m:new Map,get(e){return this._m.get(e)},set(e,t){this._m.set(e,t)}}}const xe="mdi:bookmark",ye={light:"mdi:lightbulb",switch:"mdi:toggle-switch",fan:"mdi:fan",climate:"mdi:thermostat",cover:"mdi:window-shutter",media_player:"mdi:play-circle",script:"mdi:script-text",scene:"mdi:palette",lock:"mdi:lock",camera:"mdi:video",binary_sensor:"mdi:checkbox-marked-circle-outline",sensor:"mdi:eye",alarm_control_panel:"mdi:shield-home",vacuum:"mdi:robot-vacuum",siren:"mdi:bullhorn"},$e={door:{on:"mdi:door-open",off:"mdi:door-closed"},window:{on:"mdi:window-open",off:"mdi:window-closed"},motion:{on:"mdi:motion-sensor",off:"mdi:motion-sensor-off"},moisture:{on:"mdi:water-alert",off:"mdi:water-off"},smoke:{on:"mdi:smoke",off:"mdi:smoke-detector-off"},gas:{on:"mdi:gas-cylinder",off:"mdi:gas-off"},lock:{on:"mdi:lock-open-variant",off:"mdi:lock"},garage:{on:"mdi:garage-open",off:"mdi:garage"},light:{on:"mdi:lightbulb-on",off:"mdi:lightbulb-off"},plug:{on:"mdi:power-plug",off:"mdi:power-plug-off"},presence:{on:"mdi:account",off:"mdi:account-off"},vibration:{on:"mdi:vibrate",off:"mdi:vibrate-off"},opening:{on:"mdi:door-open",off:"mdi:door-closed"},battery:{on:"mdi:battery",off:"mdi:battery-outline"},connectivity:{on:"mdi:wifi",off:"mdi:wifi-off"},safety:{on:"mdi:shield-check",off:"mdi:shield-off"},cold:{on:"mdi:snowflake",off:"mdi:snowflake-off"}};function we(e,t){const{entityId:i,hass:s}=function(e,t){return e&&"object"==typeof e&&e.states&&"string"==typeof t?{entityId:t,hass:e}:{entityId:e,hass:t}}(e,t);if(!i)return xe;const n=ve?.get?.(i);if(n)return n;const o=s?.states?.[i],a=o?.attributes||{},r=function(e){return(e||"").split(".")[0]||""}(i),l=a.icon;if(l)return ve?.set?.(i,l),l;const c=a.device_class?function(e,t){const i=$e[e];return i?function(e){return"on"===e||"open"===e||"unlocked"===e||"playing"===e||"active"===e}(t)?i.on:i.off:null}(a.device_class,o?.state):null;if(c)return ve?.set?.(i,c),c;const d=ye[r]||xe;return ve?.set?.(i,d),d}const ke={_list:null,get(e){if(this._list)return this._list;const t=e?.mdiIcons||null;return this._list=t?Object.keys(t).sort():[],this._list},warm(e){return this.get(e)}};var Ce=Object.freeze({__proto__:null,IconCache:ke});const Ae=["presence","motion","occupancy","light","switch","fan"];class Se extends se{static properties={hass:{type:Object},config:{type:Object},_expanded:{type:Boolean,state:!0},activeFilters:{type:Array,state:!0},layout:{type:String}};static styles=o`
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
  `;constructor(){super(),this.hass={},this.config={},this._expanded=!1,this.activeFilters=[],this.layout="wide",this._syncingFromConfig=!1}updated(e){if(!e.has("config")&&!e.has("hass"))return;if(this._syncingFromConfig=!0,(this.config?.area||this.config?.area_id)&&_e(this.hass,this.config,"area",!1),ke.warm(this.hass),e.has("config")){Array.isArray(this.config?.presence_filters)&&(this.activeFilters=[...this.config.presence_filters]);const e=this.config?.layout;e&&e!==this.layout&&(this.layout=e)}this._syncingFromConfig=!1;const t=this.config?.entities?.presence?.entity,i=this.config?.icon||"";if(t&&!i){const e=this.hass?.states?.[t],i=e?.attributes?.icon||we(t,this.hass);i&&this._fire("icon",i)}}_onLayoutClick(e){this.layout=e,this._fire("layout",e);const t="tall"===e?{columns:6,rows:4}:{columns:12,rows:4};this._fire("grid_options",t)}_fire(e,t){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}_onPresenceEntityChange=e=>{this._fire("entities.presence.entity",e);const t=this.config?.icon||"";if(e&&!t){const t=this.hass?.states?.[e],i=t?.attributes?.icon||we(e,this.hass);i&&this._fire("icon",i)}};_onAreaChange(e){const t=this.config||{},i={...t.auto_discovery_sections||{}};e&&!t.area&&(i.camera=!0,i.climate=!0,i.sensor=!0,i.mushroom=!0,i.subbutton=!0,i.presence=!0);const s={...t,area:e,area_id:e,auto_discovery_sections:i};e&&(s.name=e.toUpperCase()),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}_presenceCandidatesNoArea(e,t=[],i){if(!e?.states)return[];const s=new Set(["person","device_tracker","binary_sensor","light","switch","media_player","fan","humidifier","lock","input_boolean","scene"]);let n=Object.keys(e.states).filter(e=>s.has(e.split(".")[0]));const o=new Set(t||[]);return o.size&&(n=n.filter(t=>{const[i]=t.split(".");if("binary_sensor"!==i)return!0;const s=e.states[t]?.attributes?.device_class||"";return o.has("motion")&&"motion"===s||o.has("occupancy")&&"occupancy"===s||o.has("presence")&&"presence"===s})),i&&!n.includes(i)&&n.unshift(i),n}render(){const e=this.config,t=e.auto_discovery_sections?.presence??!1,i=e.area??"",s=e.name??"",n=e.icon??"",o=e.entities?.presence?.entity??"",a=this.activeFilters.length?this.activeFilters:e.presence_filters??[...Ae],r=Ae.map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1)})),l=t?fe(this.hass,this.config,"presence",a):this._presenceCandidatesNoArea(this.hass,a,o),c=["toggle","more-info","navigate","call-service","none"],d=this.config?.tap_action||{},h=this.config?.hold_action||{};return I`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e=>this._expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>
      
        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${t}
            @change=${e=>this._fire("auto_discovery_sections.presence",e.target.checked)}
          />
          <label>🪄 Auto-discover Presence</label>
        </div>
      
        <div class="input-group">
          <label>🏷️ Area:</label>
          <ha-selector
            .hass=${this.hass}
            .value=${i}
            .selector=${{area:{}}}
            @value-changed=${e=>this._onAreaChange(e.detail.value)}
          ></ha-selector>
        </div>
      
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
                .value=${n}
                allow-custom-icon
                @opened=${()=>ke.warm(this.hass)}
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
                .value=${o}
                .selector=${{entity:{include_entities:l,multiple:!1}}}
                allow-custom-entity
                @value-changed=${e=>this._onPresenceEntityChange(e.detail.value)}
              ></ha-selector>
            </div>
      
            <!-- Actions -->
            <div class="input-group">
              <label>Tap Action</label>
              <div class="pill-group">
                ${c.map(e=>I`
                  <button
                    class="pill-button ${d.action===e?"active":""}"
                    @click=${()=>this._fire("tap_action.action",e)}
                  >${e}</button>
                `)}
              </div>
              ${"navigate"===d.action?I`
                <input type="text" placeholder="Path"
                  .value=${d.navigation_path||""}
                  @input=${e=>this._fire("tap_action.navigation_path",e.target.value)}
                />
              `:""}
              ${"call-service"===d.action?I`
                <input type="text" placeholder="service (es. light.turn_on)"
                  .value=${d.service||""}
                  @input=${e=>this._fire("tap_action.service",e.target.value)}
                />
                <input type="text" placeholder='service_data (JSON)'
                  .value=${d.service_data?JSON.stringify(d.service_data):""}
                  @input=${e=>{let t=e.target.value;try{t=t?JSON.parse(t):void 0}catch{t=void 0}this._fire("tap_action.service_data",t)}}
                />
              `:""}
            </div>

            <div class="input-group">
              <label>Hold Action</label>
              <div class="pill-group">
                ${c.map(e=>I`
                  <button
                    class="pill-button ${h.action===e?"active":""}"
                    @click=${()=>this._fire("hold_action.action",e)}
                  >${e}</button>
                `)}
              </div>
              ${"navigate"===h.action?I`
                <input type="text" placeholder="Path"
                  .value=${h.navigation_path||""}
                  @input=${e=>this._fire("hold_action.navigation_path",e.target.value)}
                />
              `:""}
              ${"call-service"===h.action?I`
                <input type="text" placeholder="service (es. light.turn_on)"
                  .value=${h.service||""}
                  @input=${e=>this._fire("hold_action.service",e.target.value)}
                />
                <input type="text" placeholder='service_data (JSON)'
                  .value=${h.service_data?JSON.stringify(h.service_data):""}
                  @input=${e=>{let t=e.target.value;try{t=t?JSON.parse(t):void 0}catch{t=void 0}this._fire("hold_action.service_data",t)}}
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
    `}}customElements.define("room-panel",Se);const Ee={temperature:{label:"Temperature",emoji:"🌡️",units:["°C","°F"]},apparent_temperature:{label:"Feels Like",emoji:"🥵",units:["°C","°F"]},humidity:{label:"Humidity",emoji:"💧",units:["%"]},pressure:{label:"Pressure",emoji:"🧭",units:["hPa","mbar","kPa"]},illuminance:{label:"Illuminance",emoji:"🔆",units:["lx"]},sound_pressure:{label:"Sound Pressure",emoji:"🔊",units:["dB"]},pm1:{label:"PM1",emoji:"🌫️",units:["µg/m³"]},pm2_5:{label:"PM2.5",emoji:"🌫️",units:["µg/m³"]},pm10:{label:"PM10",emoji:"🌫️",units:["µg/m³"]},co2:{label:"CO₂",emoji:"🫁",units:["ppm"]},uv_index:{label:"UV Index",emoji:"☀️",units:["UV index"]},irradiance:{label:"Irradiance",emoji:"🌞",units:["W/m²"]},wind_speed:{label:"Wind Speed",emoji:"🌀",units:["km/h","m/s","mph","kn"],formatter:(e,t)=>{const i=Number(e);return isNaN(i)?{value:e,unit:t}:"m/s"===t?{value:(3.6*i).toFixed(0),unit:"km/h"}:"mph"===t?{value:(1.60934*i).toFixed(0),unit:"km/h"}:"kn"===t?{value:(1.852*i).toFixed(0),unit:"km/h"}:{value:i.toFixed(0),unit:t||"km/h"}}},speed:{label:"Speed",emoji:"🌀",units:["km/h","m/s","mph","kn"]},wind_gust:{label:"Wind Gust",emoji:"🌬️",units:["km/h","m/s","mph","kn"]},wind_bearing:{label:"Wind Direction",emoji:"🧭",units:["°","cardinal"]},precipitation:{label:"Precipitation",emoji:"🌧️",units:["mm","cm","in"]},precipitation_intensity:{label:"Precipitation Intensity",emoji:"🌦️",units:["mm/h","in/h"]},precipitation_probability:{label:"Rain Probability",emoji:"☔",units:["%"]},cloud_coverage:{label:"Cloud Coverage",emoji:"☁️",units:["%"]},visibility:{label:"Visibility",emoji:"👁️",units:["km","m","mi"]},dew_point:{label:"Dew Point",emoji:"💧",units:["°C","°F"]},power:{label:"Power",emoji:"⚡",units:["kW","W","MW"],formatter:(e,t)=>{const i=Number(e);return isNaN(i)?{value:e,unit:t}:"W"===t?{value:(i/1e3).toFixed(i>=100?0:1),unit:"kW"}:"MW"===t?{value:(1e3*i).toFixed(0),unit:"kW"}:{value:i,unit:t||"kW"}}},energy:{label:"Energy",emoji:"🔌",units:["kWh","Wh","MWh"],formatter:(e,t)=>{const i=Number(e);return isNaN(i)?{value:e,unit:t}:"Wh"===t?{value:(i/1e3).toFixed(i>=1e3?0:1),unit:"kWh"}:"MWh"===t?{value:(1e3*i).toFixed(0),unit:"kWh"}:{value:i,unit:t||"kWh"}}},power_factor:{label:"Power Factor",emoji:"📐",units:["%","ratio"]},voltage:{label:"Voltage",emoji:"⚙️",units:["V"]},current:{label:"Current",emoji:"🧲",units:["A","mA"]},frequency:{label:"Frequency",emoji:"〰️",units:["Hz"]},apparent_power:{label:"Apparent Power",emoji:"🧮",units:["VA","kVA"]},reactive_power:{label:"Reactive Power",emoji:"🧮",units:["var","kvar"]},monetary:{label:"Cost",emoji:"💶",units:["€","EUR","$"]},gas:{label:"Gas",emoji:"🔥",units:["m³","Nm³","kWh"]},water:{label:"Water",emoji:"🚿",units:["m³","L"]},battery:{label:"Battery",emoji:"🔋",units:["%"]},signal_strength:{label:"Signal Strength",emoji:"📶",units:["dBm"]},_fallback:{label:"Other",emoji:"❓",units:[""]}};class ze extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(5).fill(!1);const e=Object.keys(Ee);this._filters=Array(5).fill().map(()=>[...e]),this._entities=Array(5).fill(""),this._ignoreNextFilterChange=new Set}updated(e){if(e.has("config")||e.has("hass")){const e=_e(this.hass,this.config,"auto_discovery_sections.sensor");e&&e!==this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}));for(let e=0;e<5;e++){const t=`sensor${e+1}`,i=this.config?.sensor_filters?.[e],s=this.config?.entities?.[t]?.entity;Array.isArray(i)&&(this._filters[e]=[...i]),s&&(this._entities[e]=s)}}}static styles=o`
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
  `;render(){const e=this.config?.auto_discovery_sections?.sensor??!1,t=Object.entries(Ee).filter(([e])=>"_fallback"!==e).map(([e,t])=>{const i=t.label||e.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase());return{value:e,label:`${t.emoji||""} ${i}`.trim()}});return I`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expanded=Array(5).fill(!1))}}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto-discover Sensors</label>
        </div>

        ${this._expanded.map((e,i)=>this._renderSensor(i,e,t))}

        <button class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Sensors
        </button>
      </ha-expansion-panel>
    `}_renderSensor(e,t,i){const s=this._filters[e],n=this._entities[e];let o;if(this.config?.auto_discovery_sections?.sensor??!1)o=fe(this.hass,this.config,"sensor",s)||[];else{const e=this.hass?.states||{},t=Object.keys(e),i=Array.isArray(s)&&s.length>0,n=i?new Set(s):null;o=t.filter(t=>{const s=t.split(".")[0];if("sensor"!==s&&"binary_sensor"!==s)return!1;if(!i)return!0;const o=e[t]?.attributes?.device_class;return!!o&&n.has(o)})}return n&&!o.includes(n)&&(o=[n,...o]),I`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          Sensor ${e+1}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>
        ${t?I`
          <div class="mini-pill-content">
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${e}">Filter category:</label>
                <button
                  class="clear-chip"
                  type="button"
                  @click=${()=>this._clearFilter(e)}
                  title="Clear filter category">
                  Clear
                </button>
              </div>
              <ha-selector
                id="filter-${e}"
                .hass=${this.hass}
                .value=${s}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${t=>this._onFilter(e,t.detail.value)}
              ></ha-selector>
            </div>

            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${n}
                .selector=${{entity:{include_entities:o,multiple:!1}}}
                allow-custom-entity
                @value-changed=${t=>this._onEntity(e,t.detail.value)}
              ></ha-selector>
            </div>

            ${n?(()=>{const e=this.hass.states[n],t=e?.attributes?.device_class,i=Ee[t]||{},s=i.emoji||"❓",o=e?.attributes?.unit_of_measurement||(i.units?.[0]??"");return I`
                <div class="preview">
                  <span class="emoji">${s}</span>
                  <div class="state">${e?.state??"-"} ${o}</div>
                </div>
              `})():""}
          </div>
        `:""}
      </div>
    `}_toggleAuto(e){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.sensor",val:e},bubbles:!0,composed:!0}))}_togglePill(e){this._expanded=this._expanded.map((t,i)=>i===e&&!t),this.requestUpdate()}_onFilter(e,t){const i=Object.keys(Ee);if(this._ignoreNextFilterChange.has(e))this._ignoreNextFilterChange.delete(e),this._filters[e]=[];else{const s=Array.isArray(t)&&t.length?t.filter(Boolean):i;this._filters[e]=[...s]}this.requestUpdate("_filters");const s=this.renderRoot?.querySelector(`#filter-${e}`);s&&(s.value=[...this._filters[e]])}_clearFilter(e){this._filters[e]=[],this.requestUpdate("_filters");const t=this.renderRoot?.querySelector(`#filter-${e}`);t&&(this._ignoreNextFilterChange.add(e),t.value=[],t.dispatchEvent(new CustomEvent("value-changed",{detail:{value:[]},bubbles:!0,composed:!0})))}_onEntity(e,t){this._entities[e]=t,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${e+1}.entity`,val:t},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(5).fill(!1);const e=Object.keys(Ee);this._filters=Array(5).fill().map(()=>[...e]),this._entities=Array(5).fill("");for(let e=1;e<=5;e++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sensor${e}.entity`,val:""},bubbles:!0,composed:!0}))}}customElements.define("sensor-panel",ze);class Pe extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0},_icons:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...ae]),this._entities=Array(5).fill(""),this._icons=Array(5).fill(""),this._syncingFromConfig=!1,this._ignoreNextFilterChange=new Set}updated(e){if(!e.has("config")&&!e.has("hass"))return;if(this._syncingFromConfig=!0,this.config?.area||this.config?.area_id){const e=_e(this.hass,this.config,"area",!1);e&&e!==this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}const t=this.config?.mushroom_filters;Array.isArray(t)&&5===t.length&&(this._filters=t.map(e=>Array.isArray(e)?[...e]:[...ae]));const i=this.config?.entities||{};for(let e=0;e<5;e++){const t=i[`mushroom${e+1}`]||{};t.entity&&(this._entities[e]=t.entity),"string"==typeof t.icon&&(this._icons[e]=t.icon)}this._syncingFromConfig=!1;const s=[];for(let e=0;e<5;e++){const t=`mushroom${e+1}`,i=this._entities[e],n=this.config?.entities?.[t]?.icon;if(i&&!n){const n=this.hass?.states?.[i],o=n?.attributes?.icon,a=o||we(i,this.hass);a&&s.push({i:e,key:t,icon:a})}}if(s.length)for(const{i:e,key:t,icon:i}of s)this._icons[e]=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${t}.icon`,val:i},bubbles:!0,composed:!0}))}static styles=o`
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
  `;render(){const e=this.config?.auto_discovery_sections?.mushroom??!1,t=Array.from(new Set([...ae,...re])).map(e=>({value:e,label:oe[e]||e.charAt(0).toUpperCase()+e.slice(1)}));return I`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expanded=Array(5).fill(!1))}}
      >
        <div slot="header" class="glass-header">🍄 Mushroom Entities</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
          />
          <label>🪄 Auto-discover Mushroom</label>
        </div>

        ${this._expanded.map((e,i)=>this._renderMushroom(i,e,t))}

        <button class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Mushrooms
        </button>
      </ha-expansion-panel>
    `}_renderMushroom(e,t,i){const s=`mushroom${e+1}`,n=this._filters[e],o=this._entities[e],a=this._icons[e],r=this.config.entities&&this.config.entities[s]?this.config.entities[s]:{};let l;if(this.config?.auto_discovery_sections?.mushroom??!1)l=fe(this.hass,this.config,"mushroom",n)||[];else{const e={...this.config,area:void 0,area_id:void 0};l=fe(this.hass,e,"mushroom",n)||[]}o&&!l.includes(o)&&(l=[o,...l]);const c=["toggle","more-info","navigate","call-service","none"];return I`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          Mushroom ${e+1}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>

        ${t?I`
          <div class="mini-pill-content">
            <!-- Filter categories (layout/UX identici a SensorPanel) -->
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${e}">Filter category:</label>
                <button
                  class="clear-chip"
                  type="button"
                  @click=${()=>this._clearFilter(e)}
                  title="Clear filter category">
                  Clear
                </button>
              </div>
              <ha-selector
                id="filter-${e}"
                .hass=${this.hass}
                .value=${n}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${t=>this._onFilter(e,t.detail.value)}
              ></ha-selector>
            </div>

            <!-- Entity -->
            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${o}
                .selector=${{entity:{include_entities:l,multiple:!1}}}
                allow-custom-entity
                @value-changed=${t=>this._onEntity(e,t.detail.value)}
              ></ha-selector>
            </div>

            <!-- Icon -->
            <div class="input-group">
              <label>Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${a}
                allow-custom-icon
                @value-changed=${t=>this._onIcon(e,t.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Tap Action -->
            <div class="input-group">
              <label>Tap Action:</label>
              <div class="pill-group">
                ${c.map(t=>I`
                  <button
                    class="pill-button ${r.tap_action?.action===t?"active":""}"
                    @click=${()=>this._onAction(e,"tap","action",t)}
                  >${t}</button>
                `)}
              </div>
              ${this._extraFields(e,"tap",r)}
            </div>

            <!-- Hold Action -->
            <div class="input-group">
              <label>Hold Action:</label>
              <div class="pill-group">
                ${c.map(t=>I`
                  <button
                    class="pill-button ${r.hold_action?.action===t?"active":""}"
                    @click=${()=>this._onAction(e,"hold","action",t)}
                  >${t}</button>
                `)}
              </div>
              ${this._extraFields(e,"hold",r)}
            </div>
          </div>
        `:""}
      </div>
    `}_extraFields(e,t,i){const s=i?.[`${t}_action`]?.action;return"navigate"===s?I`
        <input type="text" placeholder="Path"
          .value=${i[`${t}_action`]?.navigation_path||""}
          @input=${i=>this._onAction(e,t,"navigation_path",i.target.value)}
        />
      `:"call-service"===s?I`
        <input type="text" placeholder="Service (es. light.turn_on)"
          .value=${i[`${t}_action`]?.service||""}
          @input=${i=>this._onAction(e,t,"service",i.target.value)}
        />
        <input type="text" placeholder='Service Data (JSON)'
          .value=${i[`${t}_action`]?.service_data?JSON.stringify(i[`${t}_action`].service_data):""}
          @input=${i=>this._onAction(e,t,"service_data",this._safeJson(i.target.value))}
        />
      `:""}_safeJson(e){try{return JSON.parse(e)}catch{return{}}}_toggleAuto(e){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.mushroom",val:e},bubbles:!0,composed:!0}))}_togglePill(e){this._expanded=this._expanded.map((t,i)=>i===e&&!t),this.requestUpdate()}_onFilter(e,t){if(this._ignoreNextFilterChange.has(e))this._ignoreNextFilterChange.delete(e),this._filters[e]=[];else{const i=Array.isArray(t)&&t.length?t.filter(Boolean):[...ae];this._filters[e]=[...i]}const i=this.renderRoot?.querySelector(`#filter-${e}`);i&&(i.value=[...this._filters[e]])}_clearFilter(e){this._filters[e]=[],this.requestUpdate("_filters");const t=this.renderRoot?.querySelector(`#filter-${e}`);t&&(this._ignoreNextFilterChange.add(e),t.value=[],t.dispatchEvent(new CustomEvent("value-changed",{detail:{value:[]},bubbles:!0,composed:!0})))}_onEntity(e,t){if(this._entities[e]=t,!this._syncingFromConfig){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e+1}.entity`,val:t},bubbles:!0,composed:!0}));if(!(this.config?.entities?.[`mushroom${e+1}`]?.icon||"")){const i=this.hass?.states?.[t],s=i?.attributes?.icon,n=s||we(t,this.hass);n&&(this._icons[e]=n,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e+1}.icon`,val:n},bubbles:!0,composed:!0})))}}}_onIcon(e,t){this._icons[e]=t||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e+1}.icon`,val:this._icons[e]},bubbles:!0,composed:!0}))}_onAction(e,t,i,s){if(this._syncingFromConfig)return;const n=`mushroom${e+1}`,o={...this.config?.entities?.[n]?.[`${t}_action`]||{},[i]:s};this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.${n}.${t}_action`,val:o},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(5).fill(!1),this._filters=Array(5).fill().map(()=>[...ae]),this._entities=Array(5).fill(""),this._icons=Array(5).fill(""),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"mushroom_filters",val:this._filters},bubbles:!0,composed:!0}));for(let e=1;e<=5;e++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e}.entity`,val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e}.icon`,val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e}.tap_action`,val:{action:"none"}},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.mushroom${e}.hold_action`,val:{action:"none"}},bubbles:!0,composed:!0}))}_autoIconFor(e){if(!e)return"";const t=this.hass?.states?.[e];return t?.attributes?.icon||we(e,this.hass)}}customElements.define("mushroom-panel",Pe);class Me extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_expanded:{type:Array,state:!0},_filters:{type:Array,state:!0},_entities:{type:Array,state:!0},_icons:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._expanded=Array(6).fill(!1),this._filters=Array(6).fill().map(()=>[...ae]),this._entities=Array(6).fill(""),this._icons=Array(6).fill(""),this._ignoreNextFilterChange=new Set}updated(e){if(!e.has("config")&&!e.has("hass"))return;const t=_e(this.hass,this.config,"auto_discovery_sections.subbutton");t&&t!==this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}));const i=this.config?.entities||{};for(let e=0;e<6;e++){const t=i[`sub-button${e+1}`]||{};t.entity&&(this._entities[e]=t.entity),"string"==typeof t.icon&&(this._icons[e]=t.icon)}}static styles=o`
    :host { display: block; }

    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      background: var(--glass-bg, rgba(200,200,255,0.18));
      box-shadow: var(--glass-shadow, 0 2px 24px rgba(120,120,220,0.12));
      overflow: hidden;
    }
    .glass-header {
      padding: 22px 0;
      text-align: center;
      font-size: 1.12rem;
      font-weight: 700;
      color: #fff;
    }

    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px rgba(70,120,220,0.10);
      border-radius: 24px;
      margin: 8px 16px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      cursor: pointer;
      font-weight: 700;
      color: #66b0ff;
    }
    .mini-pill-header .chevron { margin-left: auto; transition: transform 0.2s; }
    .mini-pill.expanded .mini-pill-header .chevron { transform: rotate(90deg); }
    .mini-pill-content { padding: 12px 16px 16px; }

    .input-group { margin-bottom: 12px; }
    .input-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 6px;
      color: #66b0ff;
    }

    ha-selector, ha-icon-picker { width: 100%; box-sizing: border-box; }

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
  `;render(){const e=this.config?.auto_discovery_sections?.subbutton??!1,t=Array.from(new Set([...ae,...re])).map(e=>({value:e,label:oe[e]||e.charAt(0).toUpperCase()+e.slice(1)}));return I`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expanded=Array(6).fill(!1))}}
      >
        <div slot="header" class="glass-header">🎛 Sub Buttons</div>

        ${this._expanded.map((i,s)=>this._renderSubButton(s,i,t,e))}

        <button class="reset-button" @click=${()=>this._reset()}>
          🧹 Reset Subbuttons
        </button>
      </ha-expansion-panel>
    `}_renderSubButton(e,t,i,s){const n=this._filters[e],o=this._entities[e],a=this._icons[e];let r;if(s)r=fe(this.hass,this.config,"subbutton",n)||[];else{const e={...this.config,area:void 0,area_id:void 0};r=fe(this.hass,e,"subbutton",n)||[]}return o&&!r.includes(o)&&(r=[o,...r]),I`
      <div class="mini-pill ${t?"expanded":""}">
        <div class="mini-pill-header" @click=${()=>this._togglePill(e)}>
          SubButton ${e+1}
          <span class="chevron">${t?"▼":"▶"}</span>
        </div>
        ${t?I`
          <div class="mini-pill-content">
            <div class="input-group">
              <div class="filter-row">
                <label for="filter-${e}">Filter category:</label>
                <button
                  class="clear-chip"
                  type="button"
                  @click=${()=>this._clearFilter(e)}
                  title="Clear filter category">
                  Clear
                </button>
              </div>
              <ha-selector
                id="filter-${e}"
                .hass=${this.hass}
                .value=${n}
                .selector=${{select:{multiple:!0,mode:"box",options:i}}}
                @value-changed=${t=>this._onFilter(e,t.detail.value)}
              ></ha-selector>
            </div>

            <div class="input-group">
              <label>Entity:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${o}
                .selector=${{entity:{include_entities:r,multiple:!1}}}
                allow-custom-entity
                @value-changed=${t=>this._onEntity(e,t.detail.value)}
              ></ha-selector>
            </div>

            <div class="input-group">
              <label>Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${a}
                allow-custom-icon
                @value-changed=${t=>this._onIcon(e,t.detail.value)}
              ></ha-icon-picker>
            </div>
          </div>
        `:""}
      </div>
    `}_togglePill(e){this._expanded=this._expanded.map((t,i)=>i===e&&!t)}_onFilter(e,t){if(this._ignoreNextFilterChange.has(e))this._ignoreNextFilterChange.delete(e),this._filters[e]=[];else{const i=Array.isArray(t)&&t.length?t.filter(Boolean):[...ae];this._filters[e]=[...i]}this.requestUpdate("_filters");const i=this.renderRoot?.querySelector(`#filter-${e}`);i&&(i.value=[...this._filters[e]])}_clearFilter(e){this._filters[e]=[],this.requestUpdate("_filters");const t=this.renderRoot?.querySelector(`#filter-${e}`);t&&(this._ignoreNextFilterChange.add(e),t.value=[],t.dispatchEvent(new CustomEvent("value-changed",{detail:{value:[]},bubbles:!0,composed:!0})))}_onEntity(e,t){this._entities[e]=t,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sub-button${e+1}.entity`,val:t},bubbles:!0,composed:!0}))}_onIcon(e,t){this._icons[e]=t||"",this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sub-button${e+1}.icon`,val:this._icons[e]},bubbles:!0,composed:!0}))}_reset(){this._expanded=Array(6).fill(!1),this._filters=Array(6).fill().map(()=>[...ae]),this._entities=Array(6).fill(""),this._icons=Array(6).fill("");for(let e=1;e<=6;e++)this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sub-button${e}.entity`,val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:`entities.sub-button${e}.icon`,val:""},bubbles:!0,composed:!0}))}}customElements.define("subbutton-panel",Me);class Fe extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_room:{type:Object,state:!0},_subbutton:{type:Object,state:!0},_mushroom:{type:Object,state:!0},_sensor:{type:Object,state:!0},_selectedPreset:{type:String,state:!0},_expandedColors:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._room={},this._subbutton={},this._mushroom={},this._sensor={},this._selectedPreset="green",this._expandedColors=[!1,!1,!1]}updated(e){if(e.has("config")){const e=this.config?.colors||{};this._room={icon_active:e.room?.icon_active??"",icon_inactive:e.room?.icon_inactive??"",background_active:e.room?.background_active??"",background_inactive:e.room?.background_inactive??"",text_active:e.room?.text_active??"",text_inactive:e.room?.text_inactive??""},this._subbutton={background_on:e.subbutton?.background_on??"",background_off:e.subbutton?.background_off??"",icon_on:e.subbutton?.icon_on??"",icon_off:e.subbutton?.icon_off??""},this._mushroom={active:e.mushroom?.active??"",inactive:e.mushroom?.inactive??""},this._sensor={sensor_active:e.sensor?.sensor_active??"",sensor_inactive:e.sensor?.sensor_inactive??""}}}get PRESETS(){return{green:{label:"Green",room:{icon_active:"#21df73",icon_inactive:"#173c16",background_active:"rgba(33,223,115,0.12)",background_inactive:"rgba(23,60,22,0.12)",text_active:"#ffffff",text_inactive:"rgba(255,255,255,0.55)"},sub:{background_on:"rgba(33,223,115,1)",background_off:"rgba(33,223,115,0.28)",icon_on:"#fff",icon_off:"#667a6a"},mushroom:{active:"#00e676",inactive:"#7a8b7a"},sensor:{sensor_active:"#21df73",sensor_inactive:"#173c16"}},blue:{label:"Blue",room:{icon_active:"#55afff",icon_inactive:"#0f2a4a",background_active:"rgba(85,175,255,0.14)",background_inactive:"rgba(15,42,74,0.14)",text_active:"#ffffff",text_inactive:"rgba(255,255,255,0.55)"},sub:{background_on:"rgba(85,175,255,1)",background_off:"rgba(85,175,255,0.28)",icon_on:"#fff",icon_off:"#5c6b7a"},mushroom:{active:"#59c3ff",inactive:"#7a8793"},sensor:{sensor_active:"#55afff",sensor_inactive:"#0f2a4a"}},amber:{label:"Amber",room:{icon_active:"#ff9b3d",icon_inactive:"#4a2a0f",background_active:"rgba(255,155,61,0.16)",background_inactive:"rgba(74,42,15,0.12)",text_active:"#ffffff",text_inactive:"rgba(255,255,255,0.55)"},sub:{background_on:"rgba(255,155,61,1)",background_off:"rgba(255,155,61,0.28)",icon_on:"#1f140a",icon_off:"#6b5c52"},mushroom:{active:"#ffb067",inactive:"#8b7a6e"},sensor:{sensor_active:"#ff9b3d",sensor_inactive:"#4a2a0f"}},purple:{label:"Purple",room:{icon_active:"#bd64ff",icon_inactive:"#2c0f4a",background_active:"rgba(189,100,255,0.16)",background_inactive:"rgba(44,15,74,0.12)",text_active:"#ffffff",text_inactive:"rgba(255,255,255,0.55)"},sub:{background_on:"rgba(189,100,255,1)",background_off:"rgba(189,100,255,0.28)",icon_on:"#160a1f",icon_off:"#6b5c7a"},mushroom:{active:"#c785ff",inactive:"#837a8b"},sensor:{sensor_active:"#bd64ff",sensor_inactive:"#2c0f4a"}},red:{label:"Red",room:{icon_active:"#ff5c6a",icon_inactive:"#4a0f1a",background_active:"rgba(255,92,106,0.16)",background_inactive:"rgba(74,15,26,0.12)",text_active:"#ffffff",text_inactive:"rgba(255,255,255,0.55)"},sub:{background_on:"rgba(255,92,106,1)",background_off:"rgba(255,92,106,0.28)",icon_on:"#1f0a10",icon_off:"#7a5c65"},mushroom:{active:"#ff7884",inactive:"#8b7a7f"},sensor:{sensor_active:"#ff5c6a",sensor_inactive:"#4a0f1a"}},gray:{label:"Gray",room:{icon_active:"#c5c8ce",icon_inactive:"#3b4048",background_active:"rgba(197,200,206,0.14)",background_inactive:"rgba(59,64,72,0.12)",text_active:"#ffffff",text_inactive:"rgba(255,255,255,0.55)"},sub:{background_on:"rgba(197,200,206,1)",background_off:"rgba(197,200,206,0.28)",icon_on:"#1a1b1d",icon_off:"#6b707a"},mushroom:{active:"#d7d9de",inactive:"#83878f"},sensor:{sensor_active:"#c5c8ce",sensor_inactive:"#3b4048"}}}}static styles=o`
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
  `;render(){return I`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>{this.expanded=e.detail.expanded,this.expanded&&(this._expandedColors=[!1,!1,!1])}}
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
          ${this._expandedColors[0]?I`
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
          ${this._expandedColors[1]?I`
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
          ${this._expandedColors[2]?I`
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
    `}_renderPresetChooser(){const e=Object.keys(this.PRESETS);return I`
      <div class="preset-bar">
        ${e.map(e=>this._renderPresetCard(e,this.PRESETS[e]))}
      </div>
      <div class="apply-row">
        <button class="apply-btn" @click=${this._applySelectedPreset}>
          Apply Preset
        </button>
      </div>
    `}_renderPresetCard(e,t){const i=this._selectedPreset===e?"selected":"",s=t.room.background_active,n=t.room.background_inactive,o=t.room.icon_active,a=t.room.icon_inactive;return I`
      <div class="preset-card ${i}" @click=${()=>this._selectedPreset=e}>
        <div class="preset-name">${t.label}</div>
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
    `}_toggleColor(e){this._expandedColors=this._expandedColors.map((t,i)=>i===e&&!t)}_renderColorField(e,t,i){const s=this.config?.colors?.[e]?.[t]||"",[n,o,a,r]=this._parseRGBA(s),l=`#${[n,o,a].map(e=>e.toString(16).padStart(2,"0")).join("")}`;return I`
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
    `}_applySelectedPreset=()=>{const e=this._selectedPreset,t=this.PRESETS[e];if(!t)return;const i=[["colors.room.background_active",t.room.background_active],["colors.room.background_inactive",t.room.background_inactive],["colors.room.icon_active",t.room.icon_active],["colors.room.icon_inactive",t.room.icon_inactive],["colors.room.text_active",t.room.text_active],["colors.room.text_inactive",t.room.text_inactive],["colors.subbutton.background_on",t.sub.background_on],["colors.subbutton.background_off",t.sub.background_off],["colors.subbutton.icon_on",t.sub.icon_on],["colors.subbutton.icon_off",t.sub.icon_off],["colors.mushroom.active",t.mushroom.active],["colors.mushroom.inactive",t.mushroom.inactive],["colors.sensor.sensor_active",t.sensor.sensor_active],["colors.sensor.sensor_inactive",t.sensor.sensor_inactive]];for(const[e,t]of i)this._emit(e,t)};_resetColors(){this._expandedColors=[!1,!1,!1];const e={room:["background_active","background_inactive","icon_active","icon_inactive","text_active","text_inactive"],subbutton:["background_on","background_off","icon_on","icon_off"],mushroom:["active","inactive"],sensor:["sensor_active","sensor_inactive"]};["room","subbutton","mushroom","sensor"].forEach(t=>{e[t].forEach(e=>this._emit(`colors.${t}.${e}`,""))})}_parseRGBA(e){if(!e)return[0,0,0,1];const t=/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(e);if(t)return[+t[1],+t[2],+t[3],+(t[4]??1)];if(e.startsWith("#")&&(7===e.length||4===e.length)){const t=7===e.length?e.slice(1):e.slice(1).split("").map(e=>e+e).join("");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16),1]}return[0,0,0,1]}_updateColor(e,t,i,s){const n=parseInt(i.slice(1,3),16),o=parseInt(i.slice(3,5),16),a=parseInt(i.slice(5,7),16),r=Number(s),l=`rgba(${n},${o},${a},${isNaN(r)?1:r})`;this._emit(`colors.${e}.${t}`,l)}_updateColorRaw(e,t,i){this._emit(`colors.${e}.${t}`,i)}_emit(e,t){this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:e,val:t},bubbles:!0,composed:!0}))}}customElements.define("color-panel",Fe);class Oe extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_entity:{type:String,state:!0},_icon:{type:String,state:!0},_candidates:{type:Array,state:!0},_presence:{type:String,state:!0},_presenceCandidates:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._entity="",this._icon="",this._candidates=[],this._presence="",this._presenceCandidates=[],this._syncingFromConfig=!1}updated(e){if(e.has("config")||e.has("hass")){if(this._syncingFromConfig=!0,this.config?.area||this.config?.area_id){const e=_e(this.hass,this.config,"area",!1);e&&e!==this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}this._entity=this.config?.entities?.camera?.entity||"",this._icon=this.config?.entities?.camera?.icon||"",this._presence=this.config?.entities?.camera?.presence?.entity||"";if(this.config?.auto_discovery_sections?.camera??!1){this._candidates=fe(this.hass,this.config,"camera")||[];const e=(fe(this.hass,this.config,"presence",["motion","occupancy","presence","moving"])||[]).filter(e=>e.startsWith("binary_sensor."));this._presence&&!e.includes(this._presence)&&e.unshift(this._presence),this._presenceCandidates=e}else{let e=Object.keys(this.hass?.states||{}).filter(e=>e.startsWith("camera."));this._entity&&!e.includes(this._entity)&&e.unshift(this._entity),this._candidates=e;let t=Object.keys(this.hass?.states||{}).filter(e=>e.startsWith("binary_sensor."));this._presence&&!t.includes(this._presence)&&t.unshift(this._presence),this._presenceCandidates=t}if(this._entity&&!this._icon){const e=this.hass?.states?.[this._entity],t=e?.attributes?.icon||we(this._entity,this.hass);t&&(this._icon=t)}this._syncingFromConfig=!1}}static styles=o`
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
  `;render(){const e=this.config?.auto_discovery_sections?.camera??!1;return I`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>this.expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">📷 Camera</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
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
            @value-changed=${e=>this._onEntity(e.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Camera Icon:</label>
          <ha-icon-picker
            .hass=${this.hass}
            .value=${this._icon}
            allow-custom-icon
            @value-changed=${e=>this._onIcon(e.detail.value)}
          ></ha-icon-picker>
        </div>
        
        <div class="input-group">
          <label>Entità Presenza/Motion (binary_sensor):</label>
          <ha-selector
            .hass=${this.hass}
            .value=${this._presence}
            .selector=${this._presenceCandidates.length?{entity:{include_entities:this._presenceCandidates,multiple:!1}}:{entity:{domain:"binary_sensor"}}}
            allow-custom-entity
            @value-changed=${e=>this._onPresence(e.detail.value)}
          ></ha-selector>
        </div>


        <button
          class="reset-button"
          @click=${()=>this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"camera"},bubbles:!0,composed:!0}))}
        >🧹 Reset Camera</button>
      </ha-expansion-panel>
    `}_toggleAuto(e){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.camera",val:e},bubbles:!0,composed:!0}))}_onEntity(e){if(this._entity=e||"",this._syncingFromConfig)return;this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.entity",val:this._entity},bubbles:!0,composed:!0}));if(!(this.config?.entities?.camera?.icon||"")&&this._entity){const e=this.hass?.states?.[this._entity],t=e?.attributes?.icon,i=t||we(this._entity,this.hass);i&&(this._icon=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:i},bubbles:!0,composed:!0})))}}_onPresence(e){this._presence=e||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.presence.entity",val:this._presence},bubbles:!0,composed:!0}))}_onIcon(e){this._icon=e||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:this._icon},bubbles:!0,composed:!0}))}_onIcon(e){this._icon=e||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:this._icon},bubbles:!0,composed:!0}))}_reset=()=>{this._entity="",this._icon="",void 0!==this._presence&&(this._presence=""),Array.isArray(this._candidates)&&(this._candidates=[]),Array.isArray(this._presenceCandidates)&&(this._presenceCandidates=[]),this.dispatchEvent(new CustomEvent("__panel_cmd__",{detail:{cmd:"reset",section:"camera"},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.entity",val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.icon",val:""},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.camera.presence.entity",val:""},bubbles:!0,composed:!0}))}}customElements.define("camera-panel",Oe);class je extends se{static properties={hass:{type:Object},config:{type:Object},expanded:{type:Boolean},_entity:{type:String,state:!0},_icon:{type:String,state:!0},_candidates:{type:Array,state:!0}};constructor(){super(),this.hass={},this.config={},this.expanded=!1,this._entity="",this._icon="",this._candidates=[],this._syncingFromConfig=!1}updated(e){if(!e.has("config")&&!e.has("hass"))return;if(this._syncingFromConfig=!0,this.config?.area||this.config?.area_id){const e=_e(this.hass,this.config,"area",!1);e&&e!==this.config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}const t=this.config?.entities?.climate?.entity||"",i=this.config?.entities?.climate?.icon||"";this._entity=t,this._icon=i;if(this.config?.auto_discovery_sections?.climate??!1){const e=fe(this.hass,this.config,"climate")||[];this._candidates=Array.isArray(e)?e:[]}else{let e=Object.keys(this.hass?.states||{}).filter(e=>e.startsWith("climate."));this._entity&&!e.includes(this._entity)&&e.unshift(this._entity),this._candidates=e}if(this._entity&&!this._icon){const e=this.hass?.states?.[this._entity],t=e?.attributes?.icon,i=t||we(this._entity,this.hass);i&&(this._icon=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.icon",val:i},bubbles:!0,composed:!0})))}this._syncingFromConfig=!1}static styles=o`
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
  `;render(){const e=this.config?.auto_discovery_sections?.climate??!1;return I`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this.expanded}
        @expanded-changed=${e=>this.expanded=e.detail.expanded}
      >
        <div slot="header" class="glass-header">🌡️ Climate</div>

        <div class="input-group autodiscover">
          <input
            type="checkbox"
            .checked=${e}
            @change=${e=>this._toggleAuto(e.target.checked)}
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
            @value-changed=${e=>this._onEntity(e.detail.value)}
          ></ha-selector>
        </div>

        <div class="input-group">
          <label>Climate Icon:</label>
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
        >🧹 Reset Climate</button>
      </ha-expansion-panel>
    `}_toggleAuto(e){this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"auto_discovery_sections.climate",val:e},bubbles:!0,composed:!0}))}_onEntity(e){if(this._entity=e||"",this._syncingFromConfig)return;this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.entity",val:this._entity},bubbles:!0,composed:!0}));if(!(this.config?.entities?.climate?.icon||"")&&this._entity){const e=this.hass?.states?.[this._entity],t=e?.attributes?.icon,i=t||we(this._entity,this.hass);i&&(this._icon=i,this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.icon",val:i},bubbles:!0,composed:!0})))}}_onIcon(e){this._icon=e||"",this._syncingFromConfig||this.dispatchEvent(new CustomEvent("panel-changed",{detail:{prop:"entities.climate.icon",val:this._icon},bubbles:!0,composed:!0}))}}customElements.define("climate-panel",je);class Re extends se{static properties={hass:{type:Object},config:{type:Object},openPanel:{type:String,state:!0}};constructor(){super(),this.hass=void 0,this.config={},this.openPanel="",this._onPanelChanged=this._onPanelChanged.bind(this),this._onPanelCmd=this._onPanelCmd.bind(this),this._togglePanel=this._togglePanel.bind(this),this._onConfigChanged=this._onConfigChanged.bind(this)}setConfig(e){this.config={type:e?.type||"custom:bubble-room",...e||{}},this.requestUpdate()}set value(e){this.config=e||{}}get value(){return this.config}connectedCallback(){super.connectedCallback(),this.addEventListener("panel-changed",this._onPanelChanged),this.addEventListener("__panel_cmd__",this._onPanelCmd)}disconnectedCallback(){this.removeEventListener("panel-changed",this._onPanelChanged),this.removeEventListener("__panel_cmd__",this._onPanelCmd),super.disconnectedCallback()}_emitConfig(e){const t={type:this.config?.type||"custom:bubble-room",...e||{}};this.config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0})),this.requestUpdate()}_setConfigValue(e,t){const i=String(e).split("."),s=structuredClone(this.config||{});let n=s;for(let e=0;e<i.length-1;e++){const t=i[e];"object"==typeof n[t]&&null!==n[t]||(n[t]={}),n=n[t]}n[i[i.length-1]]=t,this._emitConfig(s)}_onPanelChanged(e){e.stopPropagation();const{prop:t,val:i}=e.detail||{};if(!t)return;const s=this.config,n=structuredClone(s||{}),o=String(t).split(".");let a=n;for(let e=0;e<o.length-1;e++){const t=o[e];"object"==typeof a[t]&&null!==a[t]||(a[t]={}),a=a[t]}a[o[o.length-1]]=i;const r="area"===t,l=t.startsWith("auto_discovery_sections."),c=r||l?_e(this.hass,n,t,!1):n;this._emitConfig(c)}_onConfigChanged(e){e.stopPropagation();const{path:t,value:i}=e.detail||{};if(!t)return;const s=this.config,n=structuredClone(s||{}),o=String(t).split(".");let a=n;for(let e=0;e<o.length-1;e++){const t=o[e];"object"==typeof a[t]&&null!==a[t]||(a[t]={}),a=a[t]}a[o[o.length-1]]=i;const r="area"===t,l=t.startsWith("auto_discovery_sections."),c=r||l?_e(this.hass,n,t,!1):n;this._emitConfig(c)}_onPanelCmd(e){e.stopPropagation();const{cmd:t,section:i}=e.detail||{};if("reset"!==t)return;let s=this.config||{};switch(i){case"room":s=function(e){const t={...e.entities||{}};delete t.presence;const i={...e,entities:t};return delete i.name,delete i.icon,delete i.area,delete i.presence_entity,i}(s);break;case"sensors":s=function(e){const t={...e.entities||{}};return["sensor1","sensor2","sensor3","sensor4","sensor5","sensor6","sensor7","sensor8"].forEach(e=>delete t[e]),{...e,entities:t}}(s);break;case"mushrooms":s=function(e){const t={...e.entities||{}};return["mushroom1","mushroom2","mushroom3","mushroom4","mushroom5","climate","camera"].forEach(e=>delete t[e]),{...e,entities:t}}(s);break;case"subbuttons":s=function(e){const t={...e.entities||{}};return["sub-button1","sub-button2","sub-button3","sub-button4","sub-button5","sub-button6"].forEach(e=>delete t[e]),{...e,entities:t}}(s);break;case"climate":s=function(e){const t={...e.entities||{}};return delete t.climate,{...e,entities:t}}(s);break;case"camera":s=function(e){const t={...e.entities||{}};return delete t.camera,{...e,entities:t}}(s);break;default:return}const n=s?.auto_discovery_sections||{};(n.sensor||n.mushroom||n.subbutton||n.presence||n.climate||n.camera)&&(s=_e(this.hass,s,void 0,!1)),this._emitConfig(s)}_togglePanel(e,t){const i=e?.detail?.expanded;this.openPanel=i?t:""}static styles=o`
    :host { display:block; }
    .editor-grid {
      display:grid; gap: 16px;
      grid-template-columns: 1fr;
      align-items: start;
    }
  `;render(){const e=this.config||{};return I`
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
    `}}customElements.define("bubble-room-editor",Re);var Te=Object.freeze({__proto__:null,BubbleRoomEditor:Re});class Ie extends se{static properties={subbuttons:{type:Array}};constructor(){super(),this.subbuttons=[],this._holdThreshold=500,this._holdTimer=null,this._holdFired=!1,this._currentIndex=-1}static styles=o`
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
        ${this.subbuttons.map((e,t)=>{const i=e.active?e.colorOn:e.colorOff,s=e.active?e.iconOn:e.iconOff;return I`
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
    `}_onDown(e){this._holdFired=!1,this._currentIndex=e,this._holdTimer=window.setTimeout(()=>{this._holdFired=!0,this._fireHassAction(e,"hold")},this._holdThreshold)}_onUp(e){this._clearHoldTimer(),this._holdFired||this._currentIndex!==e||this._fireHassAction(e,"tap")}_clearHoldTimer(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)}_fireHassAction(e,t){const i=this.subbuttons?.[e];if(!i||!i.entity_id)return;const s={entity:i.entity_id,tap_action:i.tap_action||{action:"toggle"},hold_action:i.hold_action||{action:"more-info"}},n=new Event("hass-action",{bubbles:!0,composed:!0});n.detail={config:s,action:t},this.dispatchEvent(n)}}customElements.define("bubble-subbutton",Ie);class Ne extends se{static properties={hass:{type:Object},name:{type:String},area:{type:String},config:{type:Object},container:{type:Object},fitMode:{type:String},stretchY:{type:Number}};constructor(){super(),this.name="",this.fitMode="height",this.stretchY=1.12,this._raf=null,this._resizeObs=null,this._lastScale=null,this._lastBox=null}_ensureFonts(){const e=this.renderRoot||this.shadowRoot;if(!e)return;if(e.querySelector('link[data-bubble-fonts="1"]'))return;const t=document.createElement("link");t.rel="preconnect",t.href="https://fonts.gstatic.com",t.crossOrigin="anonymous",t.setAttribute("data-bubble-fonts","1"),e.appendChild(t);const i=document.createElement("link");i.rel="stylesheet",i.href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap",i.setAttribute("data-bubble-fonts","1"),i.addEventListener("load",()=>{requestAnimationFrame(()=>this._scheduleScale())}),e.appendChild(i)}firstUpdated(){this._ensureFonts(),this._scheduleScale(),this._resizeObs=new ResizeObserver(e=>{const t=e[0];let i=0,s=0;if(t?.contentBoxSize){const e=Array.isArray(t.contentBoxSize)?t.contentBoxSize[0]:t.contentBoxSize;i=Math.round(e.inlineSize),s=Math.round(e.blockSize)}else{const e=this.getBoundingClientRect();i=Math.round(e.width),s=Math.round(e.height)}(!this._lastBox||Math.abs(i-this._lastBox.w)>2||Math.abs(s-this._lastBox.h)>2)&&(this._lastBox={w:i,h:s},this._scheduleScale())}),this._resizeObs.observe(this),window.addEventListener("resize",this._scheduleScale,{passive:!0})}updated(e){(e.has("name")||e.has("config")||e.has("container")||e.has("fitMode")||e.has("stretchY"))&&this._scheduleScale()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObs?.disconnect(),window.removeEventListener("resize",this._scheduleScale)}_scheduleScale=()=>{this._raf||(this._raf=requestAnimationFrame(()=>{this._raf=null,this._autoScaleFont()}))};_autoScaleFont(){const e=this.renderRoot.querySelector(".bubble-name"),t=this.container||this.parentElement||this;if(!e||!t)return;const i=this.name??"",s=Math.max(0,Math.round(t.clientWidth)),n=Math.max(0,Math.round(t.clientHeight));if(this._lastScale&&this._lastScale.text===i&&this._lastScale.w===s&&this._lastScale.h===n&&this._lastScale.fitMode===this.fitMode&&this._lastScale.stretchY===this.stretchY)return;this._resizeObs.disconnect(),e.style.fontSize="10px",e.style.transform="none";const o=240;let a;if("height"===this.fitMode){let t=8,i=o;for(let s=0;s<9&&t<=i;s++){const s=t+i>>1;e.style.fontSize=`${s}px`;e.scrollHeight<=n?t=s+1:i=s-1}a=Math.max(8,Math.min(o,i)),e.style.fontSize=`${a}px`;const r=e.scrollWidth;if(r>s&&r>0){const e=s/r;a=Math.floor(a*e)}}else{let t=8,i=o;for(let o=0;o<8&&t<=i;o++){const o=t+i>>1;e.style.fontSize=`${o}px`,e.scrollWidth<=s&&e.scrollHeight<=n?t=o+1:i=o-1}a=Math.max(8,Math.min(o,i))}e.style.fontSize=`${a}px`,this.stretchY&&1!==this.stretchY?(e.style.transform=`scaleY(${this.stretchY})`,e.style.transformOrigin="center"):e.style.transform="none",this._lastScale={text:i,w:s,h:n,fitMode:this.fitMode,stretchY:this.stretchY},this._resizeObs.observe(this)}render(){return I`
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
  `}customElements.define("bubble-name",Ne);class Ue extends se{static properties={sensors:{type:Array}};constructor(){super(),this.sensors=[],this.rows=1,this.columns=1,this._resizeObserver=null,this._resizeScheduled=!1,this._autoscaleScheduled=!1,this._lastBox={w:0,h:0},this._pillCache=new WeakMap,this._pendingChanged=null,this._sharedSize=new Map}connectedCallback(){super.connectedCallback(),this._updateLayout(),this._sharedSize.clear(),this._scheduleAutoscale(),this._resizeObserver=new ResizeObserver(e=>{const t=e[0];let i=0,s=0;if(t&&t.contentBoxSize){const e=Array.isArray(t.contentBoxSize)?t.contentBoxSize[0]:t.contentBoxSize;i=Math.round(e.inlineSize),s=Math.round(e.blockSize)}else{const e=this.getBoundingClientRect();i=Math.round(e.width),s=Math.round(e.height)}(Math.abs(i-this._lastBox.w)>2||Math.abs(s-this._lastBox.h)>2)&&(this._lastBox={w:i,h:s},this._sharedSize.clear(),this._scheduleAutoscale())}),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),this._resizeObserver=null}updated(e){if(e.has("sensors")){const t=e.get("sensors")||[];this._updateLayout(),this._sharedSize.clear();const i=this._diffChangedSensorIndices(t,this.sensors);if(0===i.size)return;this._scheduleAutoscale(i)}}_updateLayout(){const e=this.sensors?.length||0;this.rows=e>5?2:1,this.columns=e>5?5:e||1}_scheduleAutoscale(e=null){this._autoscaleScheduled?this._pendingChanged=this._mergeChanged(this._pendingChanged,e):(this._pendingChanged=this._mergeChanged(this._pendingChanged,e),this._autoscaleScheduled=!0,requestAnimationFrame(()=>{this._autoscaleScheduled=!1;const e=this._pendingChanged;this._pendingChanged=null,this._autoScaleValues(e)}))}_mergeChanged(e,t){if(!e&&!t)return null;if(!e)return t instanceof Set?new Set(t):null;if(!t)return e instanceof Set?new Set(e):null;const i=new Set(e);for(const e of t)i.add(e);return i}_keyForPill(e){return`${Math.round(e.clientWidth)||0}x${Math.round(e.clientHeight)||0}|u:${!!e.querySelector(".sensor-unit")?.textContent?.trim()?"1":"0"}|l:${!!e.querySelector(".sensor-label")?.textContent?.trim()?"1":"0"}|i:${!!e.querySelector(".sensor-icon")?"1":"0"}`}_textWeight(e){const t=t=>e.querySelector(t)?.textContent??"",i=t(".sensor-value"),s=t(".sensor-unit"),n=t(".sensor-label");return i.length+.8*s.length+1.1*n.length}_measureAndApply(e){this._fitValueAndUnit(e);const t=e.querySelector(".sensor-value"),i=e.querySelector(".sensor-unit"),s=e.querySelector(".sensor-label"),n=e.querySelector(".sensor-icon"),o=parseFloat(getComputedStyle(t).fontSize)||10;return{best:o,unit:i?parseFloat(getComputedStyle(i).fontSize)||Math.round(.5*o):0,label:s?parseFloat(getComputedStyle(s).fontSize)||Math.round(.5*o):0,icon:n?parseFloat(getComputedStyle(n).fontSize)||Math.round(.5*o):0}}_applySharedSize(e,t){const i=e.querySelector(".sensor-value"),s=e.querySelector(".sensor-unit"),n=e.querySelector(".sensor-label"),o=e.querySelector(".sensor-icon");i&&(i.style.fontSize=`${t.best}px`,s&&(s.style.fontSize=`${t.unit}px`),n&&(n.style.fontSize=`${t.label}px`),o&&(o.style.fontSize=`${t.icon}px`),this._pillCache.set(e,{text:i.textContent??"",unitText:s?s.textContent??"":"",labelTxt:n?n.textContent??"":"",iconName:o?.getAttribute("icon")||o?.icon||"",boxW:Math.round(e.clientWidth),boxH:Math.round(e.clientHeight),best:t.best}))}_autoScaleValues(e=null){const t=this.renderRoot?.querySelectorAll(".sensor-pill");if(!t?.length)return;const i=e?Array.from(e).map(e=>t[e]).filter(Boolean):Array.from(t);if(!i.length)return;const s=new Map;for(const e of i){const t=this._keyForPill(e);s.has(t)||s.set(t,[]),s.get(t).push(e)}for(const[e,t]of s.entries()){const i=this._sharedSize.get(e);if(i){for(const e of t)this._applySharedSize(e,i);continue}let s=t[0],n=this._textWeight(s);for(let e=1;e<t.length;e++){const i=this._textWeight(t[e]);i>n&&(n=i,s=t[e])}const o=this._measureAndApply(s);this._sharedSize.set(e,o);for(const e of t)e!==s&&this._applySharedSize(e,o)}}_fitValueAndUnit(e){const t=e.querySelector(".sensor-value"),i=e.querySelector(".sensor-unit"),s=e.querySelector(".sensor-label"),n=e.querySelector(".sensor-icon");if(!t)return;const o=t.textContent??"",a=i?i.textContent??"":"",r=s?s.textContent??"":"",l=n?.getAttribute("icon")||n?.icon||"",c=Math.round(e.clientWidth),d=Math.round(e.clientHeight);if(c<=0||d<=0)return;const h=this._pillCache.get(e);if(h&&h.text===o&&h.unitText===a&&h.labelTxt===r&&h.iconName===l&&h.boxW===c&&h.boxH===d)return;t.style.fontSize="",i&&(i.style.fontSize=""),s&&(s.style.fontSize=""),n&&(n.style.fontSize="");const p=Math.max(0,c-0),u=Math.max(0,d-0);if(0===p||0===u)return;let g=5,b=Math.min(40,u),f=g;for(let e=0;e<8&&g<=b;e++){const e=g+b>>1;t.style.fontSize=`${e}px`,i&&(i.style.fontSize=`${Math.max(5,Math.round(.7*e))}px`),s&&(s.style.fontSize=`${Math.max(5,Math.round(.7*e))}px`),n&&(n.style.fontSize=`${Math.max(5,Math.round(.7*e))}px`);const o=t.offsetWidth,a=t.offsetHeight,r=i?i.offsetWidth:0,l=i?i.offsetHeight:0,c=s?s.offsetWidth:0,d=s?s.offsetHeight:0,h=n?n.offsetWidth:0,m=n?n.offsetHeight:0,_=(h>0?h:0)+c+o+(r>0?1+r:0),v=Math.max(m,d,a,l);_<=p&&v<=u?(f=e,g=e+1):b=e-1}t.style.fontSize=`${f}px`,i&&(i.style.fontSize=`${Math.max(5,Math.round(.7*f))}px`),s&&(s.style.fontSize=`${Math.max(5,Math.round(.7*f))}px`),n&&(n.style.fontSize=`${Math.max(5,Math.round(.7*f))}px`),this._pillCache.set(e,{text:o,unitText:a,labelTxt:r,iconName:l,boxW:c,boxH:d,best:f})}_formatValueForCompare(e){if(null==e)return"--";let t=null;if("number"==typeof e)t=e;else if("string"==typeof e){const i=e.replace(",",".").match(/-?\d+(?:\.\d+)?/);i&&(t=Number(i[0]))}return Number.isFinite(t)?Number.isInteger(t)?String(t):t.toFixed(1):String(e).trim().replace(/\s+/g," ")}_formatValueForDisplay(e,t=1,i=!0){if(null==e)return"--";if("number"==typeof e&&Number.isFinite(e))return i&&Number.isInteger(e)?String(e):e.toFixed(t);if("string"==typeof e){const s=e.replace(",",".").match(/-?\d+(?:\.\d+)?/);if(s){const e=Number(s[0]);if(Number.isFinite(e))return i&&Number.isInteger(e)?String(e):e.toFixed(t)}return e.trim()}return String(e)}_getSensorKey(e,t){return e?.entity||e?.entity_id||`idx:${t}`}_diffChangedSensorIndices(e=[],t=[]){const i=new Set;if((e?.length||0)!==(t?.length||0)){for(let e=0;e<(t?.length||0);e++)i.add(e);return i}const s=new Map(t.map((e,t)=>[this._getSensorKey(e,t),t]));return e.forEach((e,n)=>{const o=this._getSensorKey(e,n),a=s.get(o);if(void 0===a)return void(n<t.length&&i.add(n));const r=t[a];([e?.label??"",this._formatValueForCompare(e?.value),e?.unit??""].join("|")!==[r?.label??"",this._formatValueForCompare(r?.value),r?.unit??""].join("|")||(e?.icon??"")!==(r?.icon??"")||(e?.device_class??"")!==(r?.device_class??"")||(e?.color??"")!==(r?.color??""))&&i.add(a)}),i}_openMoreInfo(e){if(!e||"string"!=typeof e)return;const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});(document.querySelector("home-assistant")||this).dispatchEvent(t)}static styles=o`
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
  `;render(){const e=(this.sensors||[]).map(e=>{const t=e.device_class,i=Ee[t]||{},s=i.emoji||"❓",n=e.unit||i.units?.[0]||"",o=this._formatValueForDisplay(e.value,1,!0);return{...e,value:o,label:s,unit:n}});return I`
      <div
        class="sensor-grid"
        style="
          grid-template-columns: repeat(${this.columns}, 1fr);
          grid-template-rows: repeat(${this.rows}, 1fr);
        "
      >
        ${e.map(e=>{const t=e.entity||e.entity_id||"",i=t?`Mostra grafico storico: ${t}`:"Mostra grafico storico";return I`
            <div
              class="sensor-pill"
              style="color:${e.color||"#e3f6ff"}"
              title="${i}"
              role="button"
              tabindex="0"
              @click=${()=>this._openMoreInfo(t)}
              @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||this._openMoreInfo(t)}}
            >
              <ha-icon class="sensor-icon" .icon="${e.icon||""}"></ha-icon>
              <span class="sensor-label">${e.label||""}</span>
              <span class="sensor-value">${e.value??"--"}</span>
              <span class="sensor-unit">${e.unit||""}</span>
            </div>
          `})}
      </div>
    `}}customElements.define("bubble-sensor",Ue);class Be extends se{static properties={entities:{type:Array}};constructor(){super(),this.entities=[],this._containerSize={width:0,height:0},this._rafSize=null,this._ro=new ResizeObserver(e=>{const t=e[0]?.contentRect;t&&(this._rafSize&&cancelAnimationFrame(this._rafSize),this._rafSize=requestAnimationFrame(()=>{const e=Math.round(t.width),i=Math.round(t.height);e===this._containerSize.width&&i===this._containerSize.height||(this._containerSize={width:e,height:i},this.requestUpdate())}))}),this._holdThreshold=500,this._holdTimer=null,this._holdFired=!1,this._lastTapTs=0}connectedCallback(){super.connectedCallback(),this._ro.observe(this)}disconnectedCallback(){this._ro.disconnect(),super.disconnectedCallback()}_updateSize(){const e=this.getBoundingClientRect();this._containerSize={width:e.width,height:e.height},this.requestUpdate()}_handleClick(e){this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:{entity:e.entity_id,tap_action:e.tap_action||{action:"toggle"},hold_action:e.hold_action||{action:"more-info"}},action:"tap"},bubbles:!0,composed:!0}))}_dispatchAction(e,t){const i={entity:e.entity_id||e.entity||e,tap_action:e.tap_action||{action:"toggle"},hold_action:e.hold_action||{action:"more-info"},double_tap_action:e.double_tap_action};this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:i,action:t},bubbles:!0,composed:!0}))}_onPointerDown(e,t){e.preventDefault(),this._holdFired=!1,clearTimeout(this._holdTimer),this._holdTimer=setTimeout(()=>{this._holdFired=!0,this._dispatchAction(t,"hold")},this._holdThreshold)}_onPointerUp(e,t){if(e.preventDefault(),clearTimeout(this._holdTimer),this._holdFired)return void(this._holdFired=!1);const i=Date.now();if(t?.double_tap_action&&i-this._lastTapTs<300)return this._lastTapTs=0,void this._dispatchAction(t,"double_tap");this._lastTapTs=i,setTimeout(()=>{Date.now()-this._lastTapTs>=280&&this._dispatchAction(t,"tap")},280)}_onPointerCancel(){clearTimeout(this._holdTimer),this._holdFired=!1}static styles=o`
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
  `;render(){const{width:e,height:t}=this._containerSize;if(!e||!t)return I``;const i=window.innerWidth||e,s=.55;let n;if(i<=100)n=s;else if(i>=200)n=.25;else{n=s+(.25-s)*((i-100)/100)}const o=Math.min(e,1.6*t),a=.5*(t+o)*n,r=.6*e,l=.6*t,c=r*Math.min(1,e/(2*r)),d=l*Math.min(1,t/(2*l)),h=e-c,p=.5*t,u=Math.max(0,c-a/2-1),g=Math.max(0,d-a/2-1),b=e=>Math.PI*e/180,f=b(30),m=b(85),_=.75*a,v=.75*a,x=[{x:a/2+1,y:a/2+1},{x:h+u*Math.cos(-m),y:p+g*Math.sin(-m)},{x:h+u*Math.cos(-f),y:p+g*Math.sin(-f)},{x:h+u*Math.cos(+f),y:p+g*Math.sin(+f)},{x:h+u*Math.cos(+m),y:p+g*Math.sin(+m)}];let y=0;return I`
      ${this.entities.map(i=>{const s="camera"===i?.kind,n="climate"===i?.kind,o=s?_:n?v:a,r=.95*o;let l;s?l={x:e-o/2,y:o/2}:n?l={x:o/2+1,y:t-o/2-1}:(l=x[Math.min(y,x.length-1)]??{x:h,y:p},y++);const c=s||n?0:i.dx??0,d=s||n?0:i.dy??0,u=l.x+c,g=l.y+d;return I`
          <div
            class="mushroom-entity"
            style="
              left:${u}px;
              top:${g}px;
              width:${o}px;
              height:${o}px;
              color:${i.color};
            "
            @pointerdown=${e=>this._onPointerDown(e,i)}
            @pointerup=${e=>this._onPointerUp(e,i)}
            @pointercancel=${this._onPointerCancel}
            @pointerleave=${this._onPointerCancel}
            @contextmenu=${e=>e.preventDefault()}
          >
            <ha-icon icon="${i.icon}" style="--mdc-icon-size:${r}px;"></ha-icon>
          </div>
        `})}
    `}}customElements.define("bubble-mushroom",Be);class He extends se{static properties={icon:{type:String},active:{type:Boolean},colorActive:{type:String},colorInactive:{type:String},backgroundActive:{type:String},backgroundInactive:{type:String}};constructor(){super(),this.icon="",this.active=!1,this.colorActive="#21df73",this.colorInactive="#173c16",this.backgroundActive="rgba(33,223,115,0.12)",this.backgroundInactive="rgba(23,60,22,0.08)"}static styles=o`
    :host {
      position: absolute;   /* prende come riferimento .icon-mushroom-area */
      inset: 0;
      box-sizing: border-box;
    }
    .main-icon-container {
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
  `;render(){const e=this.active?this.colorActive:this.colorInactive,t=this.active?this.backgroundActive:this.backgroundInactive;return I`
      <div class="main-icon-container" style="background:${t}">
        <ha-icon
          class="main-icon"
          .icon="${this.icon}"
          style="color:${e}"
          @click="${()=>this.dispatchEvent(new CustomEvent("main-icon-click"))}"
        ></ha-icon>
      </div>
    `}}customElements.define("bubble-icon",He);class We extends se{static properties={config:{type:Object},hass:{type:Object}};_entities={};constructor(){super(),this.config={},this.hass={}}setConfig(e){this.config={layout:"wide",...e},this._entities=structuredClone(this.config.entities||{}),this._entities.camera=this._entities.camera||{entity:"",icon:""},this._entities.camera.presence||(this._entities.camera.presence={entity:""}),this._entities.climate=this._entities.climate||{entity:"",icon:""}}get hass(){return this._hass}set hass(e){this._hass=e,e?.states&&this.requestUpdate?.()}static getStubConfig(){return{type:"custom:bubble-room",layout:"wide",name:[],area:[],sensors:[],mushrooms:[],subbuttons:[],colors:{subbutton:{background_on:"rgba(var(--color-blue),1)",background_off:"rgba(var(--color-blue),0.3)",icon_on:"yellow",icon_off:"#666"}}}}static async getConfigElement(){return await Promise.resolve().then(function(){return Te}),document.createElement("bubble-room-editor")}connectedCallback(){super.connectedCallback(),this._resizeObs=new ResizeObserver(()=>this.requestUpdate())}firstUpdated(){const e=this.shadowRoot?.querySelector(".icon-mushroom-area");e&&this._resizeObs.observe(e)}disconnectedCallback(){this._resizeObs?.disconnect(),super.disconnectedCallback()}updated(e){e.has("config")&&(this._entities=structuredClone(this.config.entities||{}))}_getSubButtons(){const e=this.config.colors?.subbutton?.background_on??"#00d46d",t=this.config.colors?.subbutton?.background_off??"#999",i=this.config.colors?.subbutton?.icon_on??"yellow",s=this.config.colors?.subbutton?.icon_off??"#666";return(this.config.subbuttons||[]).map(n=>{const o=this.hass.states?.[n.entity_id];return{icon:n.icon||we(n.entity_id,this.hass),active:"on"===o?.state,colorOn:e,colorOff:t,iconOn:i,iconOff:s,entity_id:n.entity_id,tap_action:n.tap_action,hold_action:n.hold_action}})}_isRoomActive(){const e=this.config?.entities?.presence?.entity;if(!e)return!1;const t=this.hass?.states?.[e]?.state;return["on","home","occupied","motion","detected"].includes(t)}_getMainIconSize(){const e=this.shadowRoot?.querySelector(".icon-mushroom-area");return e?Math.round(.6*Math.min(e.clientWidth,e.clientHeight)):64}_getSensors(){const e=this._entities||{},t=this.config.colors?.room?.sensor_active??this.config.colors?.room?.text_active??"#21df73",i=this.config.colors?.room?.sensor_inactive??this.config.colors?.room?.text_inactive??"#173c16",s=this._isRoomActive()?t:i,n=[];for(let t=1;t<=6;t++){const i=e[`sensor${t}`]?.entity,o=this.hass?.states?.[i];i&&o&&n.push({icon:o.attributes.icon||"",value:o.state,unit:o.attributes.unit_of_measurement,device_class:o.attributes.device_class,color:s,entity:i})}return n}_getState(e){return e?this.hass?.states?.[e]:void 0}_getMushrooms(){const e=this._entities||{},t=this.config.colors?.mushroom?.active??"#00e676",i=this.config.colors?.mushroom?.inactive??"#888",s=[];for(let n=1;n<=5;n++){const o=e[`mushroom${n}`]||{},a=o.entity,r=this.hass?.states?.[a];a&&r&&s.push({icon:o.icon||r.attributes.icon||we(a,this.hass)||"mdi:flash",state:r.state,color:"on"===r.state?t:i,dx:o.dx??0,dy:o.dy??0,angle_deg:o.angle_deg,radius_factor:o.radius_factor,entity_id:a,tap_action:o.tap_action,hold_action:o.hold_action})}const n=e.camera||{},o=n.entity;if(o&&this.hass.states?.[o]){const e=this.hass?.states?.[o],a=n.presence?.entity,r=a?this.hass?.states?.[a]?.state:void 0,l=!a||["on","home","occupied","motion","detected"].includes(r);s.push({icon:n.icon||e.attributes.icon||we(o,this.hass)||"mdi:cctv",state:e.state,color:l?t:i,left:"calc(100% - 12px - 36px)",top:12,dx:0,dy:0,kind:"camera",angle_deg:n.angle_deg,radius_factor:n.radius_factor,entity_id:o,tap_action:{action:"more-info"},hold_action:{action:"none"}})}const a=this._entities?.climate||{},r=a.entity;if(r&&this.hass.states?.[r]){const e=this.hass?.states?.[r],n=e.state&&"off"!==e.state&&"idle"!==e.state||e.attributes?.hvac_action&&"off"!==e.attributes.hvac_action;s.push({icon:a.icon||e.attributes.icon||we(r,this.hass)||"mdi:thermostat",state:e.state,color:n?t:i,dx:0,dy:0,angle_deg:a.angle_deg,radius_factor:a.radius_factor,kind:"climate",entity_id:r})}return s}_onMushroomClick(e){}render(){const e=this.config.layout||"wide",t=this._getMainIconSize(),i=this._getSubButtons(),s=this._isRoomActive(),n=this.config.colors?.room?.icon_active??"#21df73",o=this.config.colors?.room?.icon_inactive??"#173c16",a=this.config.colors?.room?.background_active??"rgba(33,223,115,0.12)",r=this.config.colors?.room?.background_inactive??"rgba(23,60,22,0.12)",l=this.config.colors?.room?.text_active??"#ffffff",c=this.config.colors?.room?.text_inactive??"rgba(255,255,255,0.5)";return I`
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
    `}static styles=o`
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
  `}customElements.define("bubble-room",We),window.customCards.push({type:"bubble-room",name:"Bubble Room",description:"A stylish room control card with environmental sensors",preview:!0,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});export{We as BubbleRoom};
//# sourceMappingURL=lovelace-bubble-room.js.map
