/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=window,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$3=new WeakMap;class o$3{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$3.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$1=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$3(n,t,s$3)},S$1=(s,n)=>{e$2?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$1.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$1=window,r$1=e$1.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$1.reactiveElementPolyfillSupport,n$2={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:n$2,reflect:!1,hasChanged:a$1},d$1="finalized";class u$1 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return !1;this[d$1]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$2).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$2;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}u$1[d$1]=!0,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:u$1}),(null!==(s$2=e$1.reactiveElementVersions)&&void 0!==s$2?s$2:e$1.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i=window,s$1=i.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1="$lit$",n$1=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$1,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$1+s.slice(v)+n$1+w):s+n$1+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$1)||i.startsWith(n$1)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$1).split(n$1),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$1),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$1,t+1));)v.push({type:7,index:r}),t+=n$1.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t=i.litHtmlVersions)&&void 0!==t?t:i.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.3.3");

// src/helpers/entity-filters.js

/* ───────────── filtri di sezione ───────────── */
const FILTERS = {
  /**
   * Presence (ID) – filtra per device_class o dominio
   * @param {string[]} cats  categorie selezionate nei chip
   */
  presence: (cats = []) => ({
    includeDomains: ['binary_sensor', 'light', 'switch', 'fan'],
    entityFilter: (id, hass) => {
      if (!cats.length) return false;
      const [domain] = id.split('.');
      if (domain === 'binary_sensor') {
        const dc = hass.states[id]?.attributes?.device_class ?? '';
        return cats.includes(dc);
      }
      return cats.includes(domain);
    },
  }),

  /* …eventuali altri filtri (sensor, alert, ecc.)… */
};

/* ───────────── funzione che trova entità in una certa area ───────────── */
function entitiesInArea(hass, areaId) {
  if (!hass?.states || !areaId) return [];

  // 1) registry delle entità (area_id diretto)
  const entReg = hass.entities ?? {};
  // 2) registry dei device (area_id ereditato dal device)
  const devReg = hass.devices ?? {};

  return Object.keys(hass.states).filter((eid) => {
    // controllo entity-registry
    const ent = entReg[eid];
    if (ent?.area_id === areaId) return true;
    // controllo device-registry
    const devId = ent?.device_id;
    if (devId && devReg[devId]?.area_id === areaId) return true;
    // fallback sugli attributi legacy
    const attr = hass.states[eid]?.attributes ?? {};
    return attr.area_id === areaId || attr.area === areaId;
  });
}

/**
 * Restituisce la lista di entity_id “candidati” per una sezione,
 * applicando:
 *   • filtro per dominio + device_class (da FILTERS)
 *   • filtro per area (se auto-discovery_sections.presence === true)
 *   • filtro per categorie (solo per 'presence', via cats)
 *
 * Usage: candidatesFor(hass, config, 'presence', ['light','motion'])
 */
function candidatesFor(hass, config, section, cats = []) {
  if (!hass?.states) return [];

  // scegli il descrittore giusto
  let desc = null;
  if (section === 'presence') {
    desc = FILTERS.presence(cats);
  }
  // else if (section==='sensor') … se hai altri filtri

  if (!desc) return [];

  // 1) filtro per dominio
  const byDomain = Object.keys(hass.states).filter((id) =>
    desc.includeDomains.includes(id.split('.')[0]),
  );

  // 2) filtro custom (device_class o dominio)
  const byDesc = byDomain.filter((id) => desc.entityFilter(id, hass));

  // 3) filtro per area (solo se auto-discover è attivo)
  const autoDisc = config?.auto_discovery_sections?.presence ?? false;
  if (autoDisc && config?.area) {
    const inArea = entitiesInArea(hass, config.area);
    return byDesc.filter((id) => inArea.includes(id));
  }

  return byDesc;
}

// src/helpers/auto-discovery.js

const DEBUG$3 = !!window.__BUBBLE_DEBUG__;
const pickFirstFree = (list, used) => list.find((id) => !used.has(id)) || null;

/* =========================
 *   AUTO-FILL (per sezione)
 * ========================= */

// Sensors: sensor1..sensor6 – riempi solo slot vuoti, rispetta type & area, evita duplicati
function autoFillSensors(hass, config) {
  const keys = ['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6'];
  const entities = { ...(config.entities || {}) };
  const used = new Set(keys.map((k) => entities[k]?.entity_id).filter(Boolean));

  for (const k of keys) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity_id) continue; // non sovrascrivere scelte utente
    const type = ent.type || '';
    const list = candidatesFor(hass, config, { section: 'sensor', type });
    const pick = pickFirstFree(list, used);
    if (pick) { ent.entity_id = pick; used.add(pick); }
  }
  return { ...config, entities };
}

// Mushrooms: entities1..5 + climate + camera – priorità al dominio degli slot dedicati
function autoFillMushrooms(hass, config) {
  const order = ['climate','camera','entities1','entities2','entities3','entities4','entities5'];
  const entities = { ...(config.entities || {}) };
  const used = new Set(order.map((k) => entities[k]?.entity).filter(Boolean));
  const all = candidatesFor(hass, config, 'mushroom');

  // slot dedicati
  const climate = entities.climate || (entities.climate = {});
  if (!climate.entity) {
    const pick = all.find((id) => id.startsWith('climate.') && !used.has(id));
    if (pick) { climate.entity = pick; used.add(pick); }
  }
  const camera = entities.camera || (entities.camera = {});
  if (!camera.entity) {
    const pick = all.find((id) => id.startsWith('camera.') && !used.has(id));
    if (pick) { camera.entity = pick; used.add(pick); }
  }
  // slot generici
  for (const k of ['entities1','entities2','entities3','entities4','entities5']) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity) continue;
    const pick = pickFirstFree(all, used);
    if (pick) { ent.entity = pick; used.add(pick); }
  }
  return { ...config, entities };
}

// SubButtons: sub-button1..6 – domini controllabili, filtro area, evita duplicati
function autoFillSubButtons(hass, config) {
  const keys = ['sub-button1','sub-button2','sub-button3','sub-button4','sub-button5','sub-button6'];
  const entities = { ...(config.entities || {}) };
  const used = new Set(keys.map((k) => entities[k]?.entity).filter(Boolean));
  const list = candidatesFor(hass, config, 'subbutton');

  for (const k of keys) {
    const ent = entities[k] || (entities[k] = {});
    if (ent.entity) continue;
    const pick = pickFirstFree(list, used);
    if (pick) { ent.entity = pick; used.add(pick); }
  }
  return { ...config, entities };
}

// Presence (Room): presence entity – scegli se vuoto, filtra per domini ammessi + device_class + area
function presenceCandidatesLocal(hass, config) {
  if (!hass || !hass.states) return [];
  const allowed = new Set([
    'person','device_tracker','binary_sensor','light','switch',
    'media_player','fan','humidifier','lock','input_boolean','scene'
  ]);

  let ids = Object.keys(hass.states).filter((id) => allowed.has(id.split('.')[0]));
  // binary_sensor: solo motion/occupancy/presence
  ids = ids.filter((id) => {
    const domain = id.split('.')[0];
    if (domain !== 'binary_sensor') return true;
    const dc = hass.states[id]?.attributes?.device_class;
    return ['motion','occupancy','presence'].includes(dc || '');
  });

  // filtro Area
  const area = config?.area;
  if (area) {
    const inArea = ids.filter((id) => {
      const st = hass.states[id];
      const a1 = st?.attributes?.area_id;
      const a2 = st?.attributes?.area;
      return a1 === area || a2 === area;
    });
    if (inArea.length) ids = inArea;
  }

  // mantieni selezionata anche se fuori filtro
  const selected = config?.entities?.presence?.entity || config?.presence_entity;
  if (selected && !ids.includes(selected)) ids.push(selected);

  if (DEBUG$3) console.info('[AutoDiscovery][presence candidates]', { area, count: ids.length, sample: ids.slice(0,8) });
  return ids;
}

function autoFillPresence(hass, config) {
  const entities = { ...(config.entities || {}) };
  const ent = entities.presence || (entities.presence = {});
  if (!ent.entity) {
    // Se hai aggiunto 'presence' in entity-filters, puoi usare: candidatesFor(hass, config, 'presence')
    const list = presenceCandidatesLocal(hass, config);
    if (list.length) ent.entity = list[0];
  }
  return { ...config, entities };
}

/* =========================
 *           RESET
 * ========================= */

function resetSensors(config) {
  const entities = { ...(config.entities || {}) };
  ['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6'].forEach((k) => delete entities[k]);
  return { ...config, entities };
}
function resetMushrooms(config) {
  const entities = { ...(config.entities || {}) };
  ['entities1','entities2','entities3','entities4','entities5','climate','camera'].forEach((k) => delete entities[k]);
  return { ...config, entities };
}
function resetSubButtons(config) {
  const entities = { ...(config.entities || {}) };
  ['sub-button1','sub-button2','sub-button3','sub-button4','sub-button5','sub-button6'].forEach((k) => delete entities[k]);
  return { ...config, entities };
}
function resetRoom(config) {
  const entities = { ...(config.entities || {}) };
  delete entities.presence;                 // pulisci presence
  const next = { ...config, entities };
  delete next.name;                         // pulisci campi base Room
  delete next.icon;
  delete next.area;
  delete next.presence_entity;             // legacy
  return next;
}

/* =========================
 *   TRIGGER CENTRALE
 * ========================= */
function maybeAutoDiscover(hass, config, changedProp, debug = false) {
  const ad = config.auto_discovery_sections || {};
  const isAreaChange = changedProp === 'area';
  const isADChange   = changedProp && changedProp.startsWith('auto_discovery_sections.');
  if (!isAreaChange && !isADChange) return config;

  let next = config;
  if (ad.sensor)    next = autoFillSensors(hass, next);
  if (ad.mushroom)  next = autoFillMushrooms(hass, next);
  if (ad.subbutton) next = autoFillSubButtons(hass, next);
  if (ad.presence)  next = autoFillPresence(hass, next);

  if (debug && typeof window !== 'undefined' && window.__BUBBLE_DEBUG__) {
    console.info('[AutoDiscovery] applied after', changedProp, { sections: ad });
  }
  return next;
}

// src/panels/RoomPanel.js

const PRESENCE_CATS = [
  'presence',   // binary_sensor.device_class = presence
  'motion',     // binary_sensor.device_class = motion
  'occupancy',  // binary_sensor.device_class = occupancy
  'light',      // dominio light.*
  'switch',     // dominio switch.*
  'fan',        // dominio fan.*
];

class RoomPanel extends s {
  static properties = {
    hass:           { type: Object },
    config:         { type: Object },
    _expanded:      { type: Boolean, state: true },
    activeFilters:  { type: Array,  state: true },
  };

  static styles = i$1`
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
  `;

  constructor() {
    super();
    this.hass          = {};
    this.config        = {};
    this._expanded     = false;
    this.activeFilters = [];
  }

  updated(changed) {
    // ad ogni cambio di config/hass, rilancia l'autodiscover iniziale
    if (changed.has('config') || changed.has('hass')) {
      maybeAutoDiscover(this.hass, this.config, 'area');
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.presence');

      // sincronizza i filtri se sono definiti in config
      if (changed.has('config') && Array.isArray(this.config.presence_filters)) {
        this.activeFilters = [...this.config.presence_filters];
      }
    }
  }

  // intercetta il cambio di area, abilita subito l'autodiscovery presence
  _onAreaChanged(e) {
    const v = e.detail.value;
    this._fire('area', v);
    if (v) {
      this._fire('auto_discovery_sections.presence', true);
    }
  }

  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const cfg       = this.config;
    const autoDisc  = cfg.auto_discovery_sections?.presence ?? false;
    const area      = cfg.area              ?? '';
    const name      = cfg.name              ?? '';
    const icon      = cfg.icon              ?? '';
    const presEntity= cfg.entities?.presence?.entity
                        ?? cfg.presence_entity
                        ?? '';

    // se ho filtri in stato interno uso quelli, altrimenti quelli da config (o default)
    const presFilters = this.activeFilters.length
      ? this.activeFilters
      : (cfg.presence_filters ?? [...PRESENCE_CATS]);

    // mappa i domini in options per ha-selector a box
    const filterOptions = PRESENCE_CATS.map(cat => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));

    // costruisco la lista di entità candidate col filtro corrente
    const presCandidates = candidatesFor(
      this.hass, this.config, 'presence', presFilters
    );

    return x`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e => this._expanded = e.detail.expanded}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>

        <!-- 1️⃣ Auto-discover -->
        <div class="input-group ad-top">
          <label style="display:flex;align-items:center;gap:8px">
            <input
              type="checkbox"
              .checked=${autoDisc}
              @change=${e => this._fire('auto_discovery_sections.presence', e.target.checked)}
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
                .value=${name}
                @input=${e => this._fire('name', e.target.value)}
              />
            </div>
            <div class="input-group">
              <label>Area:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${area}
                .selector=${{ area: {} }}
                @value-changed=${this._onAreaChanged}
              ></ha-selector>
            </div>
          </div>
        </div>

        <!-- 3️⃣ Icon & Presence + Filtri -->
        <div class="mini-pill">
          <div class="mini-pill-header">Icon & Presence</div>
          <div class="mini-pill-content">

            <!-- Icon -->
            <div class="input-group">
              <label>Room Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${icon}
                allow-custom-icon
                @value-changed=${e => this._fire('icon', e.detail.value)}
              ></ha-icon-picker>
            </div>

            <!-- Filtra per categoria -->
            <div class="input-group">
              <label>Filter categories:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${presFilters}
                .selector=${{
                  select: {
                    multiple: true,
                    mode: 'box',
                    options: filterOptions,
                  }
                }}
                @value-changed=${e => this._fire('presence_filters', e.detail.value)}
              ></ha-selector>
            </div>

            <!-- Presence entity -->
            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${presEntity}
                .selector=${{
                  entity: {
                    multiple: false,
                    include_entities: presCandidates,
                  }
                }}
                allow-custom-entity
                @value-changed=${e => this._fire('entities.presence.entity', e.detail.value)}
              ></ha-selector>
            </div>

            ${this._renderActions('tap')}
            ${this._renderActions('hold')}

          </div>
        </div>

        <!-- 4️⃣ Reset -->
        <div style="text-align:center;margin-top:1.2em;">
          <button
            class="reset-button"
            @click=${() => this._fire('__panel_cmd__', { cmd: 'reset', section: 'room' })}
          >🧹 Reset Room</button>
        </div>

      </ha-expansion-panel>
    `;
  }

  _renderActions(type) {
    const cfg     = this.config?.[`${type}_action`] || {};
    const actions = ['toggle','more-info','navigate','call-service','none'];
    return x`
      <div class="input-group">
        <label>${type === 'tap' ? 'Tap Action' : 'Hold Action'}</label>
        <div class="pill-group">
          ${actions.map(a => x`
            <paper-button
              class="pill-button ${cfg.action === a ? 'active' : ''}"
              @click=${() => this._fire(`${type}_action.action`, a)}
            >${a}</paper-button>
          `)}
        </div>

        ${cfg.action === 'navigate' ? x`
          <input
            type="text"
            placeholder="Path"
            .value=${cfg.navigation_path || ''}
            @input=${e => this._fire(`${type}_action.navigation_path`, e.target.value)}
          />
        ` : ''}

        ${cfg.action === 'call-service' ? x`
          <input
            type="text"
            placeholder="service: domain.service_name"
            .value=${cfg.service || ''}
            @input=${e => this._fire(`${type}_action.service`, e.detail.value)}
          />
          <input
            type="text"
            placeholder="service_data (JSON)"
            .value=${cfg.service_data ? JSON.stringify(cfg.service_data) : ''}
            @input=${e => {
              let v = e.target.value;
              try { v = v ? JSON.parse(v) : undefined; } catch { v = undefined; }
              this._fire(`${type}_action.service_data`, v);
            }}
          />
        ` : ''}
      </div>
    `;
  }
}

customElements.define('room-panel', RoomPanel);

// src/panels/SensorsPanel.js
// Se hai un mapping tipi/etichette, puoi importarlo. Qui rendo opzionale.
// import { SENSOR_TYPES } from '../helpers/sensor-mapping.js';

class SensorsPanel extends s {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedSensors: { type: Array },
  };

  constructor() {
    super();
    
    if (!customElements.get('ha-entity-picker')) {
      customElements.whenDefined('ha-entity-picker').then(() => this.requestUpdate());
    }
this.hass = {};
    this.config = {};
    this._expanded = false;
    this._expandedSensors = Array(6).fill(false);
  }

  static styles = i$1`
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
`;

  render() {
    const ad = this.config?.auto_discovery_sections?.sensor || false;
    const keys = ['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6'];

    return x`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${(e) => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🌡️ Sensors</div>

        <div class="input-group" style="margin:0 16px 14px;">
          <label style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox"
              .checked=${ad}
              @change=${(e) => this._fire('auto_discovery_sections.sensor', e.target.checked)}>
            <span>🪄 Auto-discovery</span>
          </label>
        </div>

        ${keys.map((key, i) => this._renderSingle(i, key))}

        <div style="text-align:center; margin-top:1.2em; padding-bottom:16px;">
          <button class="reset-button" @click=${this._resetAll}>🧹 Reset Sensors</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderSingle(index, key) {
    const ent = this.config?.entities?.[key] || {};
    const expanded = !!this._expandedSensors[index];
    const label = ent.type ? `Sensor ${index + 1} – ${ent.type}` : `Sensor ${index + 1}`;

    // path helper (evita backtick annidati nel template!)
    const pathType = `entities.${key}.type`;
    const pathEntity = `entities.${key}.entity_id`;
    const typeValue = ent.type || '';
    const entityValue = ent.entity_id || '';

    const includeList = candidatesFor(this.hass, this.config, { section: 'sensor', type: typeValue });

    return x`
      <div class="mini-pill ${expanded ? 'expanded' : ''}">
        <div class="mini-pill-header" @click=${() => this._toggleOne(index)}>
          ${label}
          <span class="chevron">${expanded ? '▼' : '▶'}</span>
        </div>
        ${expanded ? x`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Sensor Type</label>
              <select .value=${typeValue} @change=${(e) => this._fire(pathType, e.target.value)}>
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
                .value=${entityValue}
                .includeEntities=${includeList}
                allow-custom-entity
                @value-changed=${(e) => this._fire(pathEntity, e.detail.value)}
              ></ha-entity-picker>
            </div>

            ${this._renderUnit(index, typeValue, ent.unit)}
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderUnit(index, type, currentUnit) {
    const path = `entities.sensor${index + 1}.unit`;
    let units = [];
    if (type === 'temperature') units = ['°C', '°F', 'K'];
    else if (type === 'humidity') units = ['%'];
    else if (type === 'pressure') units = ['hPa', 'mbar', 'bar', 'psi'];

    return x`
      <div class="input-group">
        <label>Unit</label>
        <select .value=${currentUnit || (units[0] || '')}
                @change=${(e) => this._fire(path, e.target.value)}>
          ${units.map((u) => x`<option value=${u}>${u}</option>`)}
        </select>
      </div>
    `;
  }

  /* ---------- helpers ---------- */
  _toggleOne(i) {
    this._expandedSensors = this._expandedSensors.map((_, j) => j === i);
    this.requestUpdate();
  }

  _resetAll() {
    // reset centralizzato gestito dall'editor
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: 'sensor' } },
      bubbles: true, composed: true,
    }));
  }

  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val }, bubbles: true, composed: true,
    }));
  }
}

customElements.define('sensors-panel', SensorsPanel);

const DEBUG$2 = !!window.__BUBBLE_DEBUG__;

class MushroomsPanel extends s {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedItems: { type: Array },
  };

  constructor() {
    super();
    
    if (!customElements.get('ha-entity-picker')) {
      customElements.whenDefined('ha-entity-picker').then(() => this.requestUpdate());
    }
this.hass = {};
    this.config = {};
    this._expanded = false;
    this._expandedItems = Array(7).fill(false); // entities1..5 + climate + camera
  }

  setConfig(config) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }

  static styles = i$1`
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
`;

  render() {
    const cfg = this.config;
    return x`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${(e) => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🍄 Mushroom Entities</div>

        <div class="glass-content">
          <div
            class="autodiscover-box"
            @click=${() => this._fire('auto_discovery_sections.mushroom', !cfg.auto_discovery_sections?.mushroom)}
          >
            <label>
              <input
                type="checkbox"
                .checked=${cfg.auto_discovery_sections?.mushroom || false}
                @change=${(e) => this._fire('auto_discovery_sections.mushroom', e.target.checked)}
                @click=${(e) => e.stopPropagation()}
              />
              <span>🪄 Auto-discovery</span>
            </label>
          </div>

          ${['entities1','entities2','entities3','entities4','entities5','climate','camera'].map(
            (key, i) => this._renderSingle(i, key)
          )}

          <button class="reset-button" @click=${this._resetAll}>🧹 Reset Mushroom Entities</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderSingle(index, key) {
    const item = this.config.entities?.[key] || {};
    const expanded = this._expandedItems[index];

    return x`
      <div class="mini-pill ${expanded ? 'expanded' : ''}" @click=${() => this._toggleOne(index)}>
        <div class="mini-pill-header">
          ${item.icon || '🔘'} ${item.label || 'Entity ' + (index + 1)}
          <span class="chevron">${expanded ? '▼' : '▶'}</span>
        </div>

        ${expanded ? x`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .includeEntities=${this._getMushroomCandidates()}
                .value=${item.entity || ''}
                allow-custom-entity
                @value-changed=${(e) => this._fire('entities.' + key + '.entity', e.detail.value)}
              ></ha-entity-picker>
            </div>

            <div class="input-group">
              <label>Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${item.icon || ''}
                allow-custom-icon
                @value-changed=${(e) => this._fire('entities.' + key + '.icon', e.detail.value)}
              ></ha-icon-picker>
            </div>

            ${this._renderActions('tap', key)}
            ${this._renderActions('hold', key)}
          </div>
        ` : ''}
      </div>
    `;
  }

  _toggleOne(idx) {
    this._expandedItems = this._expandedItems.map((_, i) => i === idx);
    this.requestUpdate();
  }

  _renderActions(actionType, key) {
    const cfg = this.config.entities?.[key] || {};
    const actCfg = cfg[actionType + '_action'] || {};
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];
    return x`
      <div class="input-group">
        <label>${actionType === 'tap' ? 'Tap Action' : 'Hold Action'}</label>
        <div class="pill-group">
          ${actions.map((a) => x`
            <paper-button
              class="pill-button ${actCfg.action === a ? 'active' : ''}"
              @click=${() => this._fire('entities.' + key + '.' + actionType + '_action.action', a)}
            >${a}</paper-button>
          `)}
        </div>

        ${actCfg.action === 'navigate' ? x`
          <input
            type="text"
            placeholder="Path"
            .value=${actCfg.navigation_path || ''}
            @input=${(e) => this._fire('entities.' + key + '.' + actionType + '_action.navigation_path', e.target.value)}
          />
        ` : ''}
      </div>
    `;
  }

  _fire(prop, value) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val: value },
      bubbles: true,
      composed: true,
    }));
  }

  _resetAll() {
  this.dispatchEvent(new CustomEvent('panel-changed', {
    detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: 'mushroom' } },
    bubbles: true, composed: true,
  }));
}
// --- Wrapper locale: calcola candidati + log ---
  _getMushroomCandidates() {
    // Usa la logica centralizzata, ma aggiunge log locale (Opzione A)
    const list = candidatesFor(this.hass, this.config, 'mushroom');
    if (DEBUG$2) {
      console.info('[MushroomsPanel][Candidates]', {
        area: this.config?.area || null,
        count: list.length,
        sample: list.slice(0, 8),
      });
    }
    return list;
  }
}

customElements.define('mushrooms-panel', MushroomsPanel);

const DEBUG$1 = !!window.__BUBBLE_DEBUG__;

class SubButtonsPanel extends s {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedItems: { type: Array },
  };
  
  constructor() {
    super();
    
    if (!customElements.get('ha-entity-picker')) {
      customElements.whenDefined('ha-entity-picker').then(() => this.requestUpdate());
    }
this.hass = {};
    this.config = {};
    this._expanded = false;
    this._expandedItems = Array(6).fill(false); // sub-button1..6
  }
  
  setConfig(config) {
    this.config = config;
  }
  
  getConfig() {
    return this.config;
  }
  
  static styles = i$1`
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
`;
  
  render() {
    const keys = ['sub-button1', 'sub-button2', 'sub-button3', 'sub-button4', 'sub-button5', 'sub-button6'];
    
    return x`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${(e) => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🔘 Sub Buttons</div>

        <div class="glass-content">
          ${keys.map((key, i) => this._renderSingle(i, key))}
          <button class="reset-button" @click=${this._resetAll}>🧹 Reset Sub Buttons</button>
        </div>
      </ha-expansion-panel>
    `;
  }
  
  _renderSingle(index, key) {
    const item = this.config.entities?.[key] || {};
    const expanded = this._expandedItems[index];
    
    return x`
      <div class="mini-pill ${expanded ? 'expanded' : ''}" @click=${() => this._toggleOne(index)}>
        <div class="mini-pill-header">
          ${item.icon || '🔘'} ${item.label || 'Sub Button ' + (index + 1)}
          <span class="chevron">${expanded ? '▼' : '▶'}</span>
        </div>

        ${expanded ? x`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .includeEntities=${this._getSubButtonCandidates()}
                .value=${item.entity || ''}
                allow-custom-entity
                @value-changed=${(e) => this._fire('entities.' + key + '.entity', e.detail.value)}
              ></ha-entity-picker>
            </div>

            <div class="input-group">
              <label>Label</label>
              <input
                type="text"
                .value=${item.label || ''}
                @input=${(e) => this._fire('entities.' + key + '.label', e.target.value)}
              />
            </div>

            <div class="input-group">
              <label>Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${item.icon || ''}
                allow-custom-icon
                @value-changed=${(e) => this._fire('entities.' + key + '.icon', e.detail.value)}
              ></ha-icon-picker>
            </div>

            ${this._renderActions('tap', key)}
            ${this._renderActions('hold', key)}
          </div>
        ` : ''}
      </div>
    `;
  }
  
  _renderActions(actionType, key) {
    const cfg = this.config.entities?.[key] || {};
    const actCfg = cfg[actionType + '_action'] || {};
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];
    return x`
      <div class="input-group">
        <label>${actionType === 'tap' ? 'Tap Action' : 'Hold Action'}</label>
        <div class="pill-group">
          ${actions.map((a) => x`
            <paper-button
              class="pill-button ${actCfg.action === a ? 'active' : ''}"
              @click=${() => this._fire('entities.' + key + '.' + actionType + '_action.action', a)}
            >${a}</paper-button>
          `)}
        </div>
        ${actCfg.action === 'navigate' ? x`
          <input
            type="text"
            placeholder="Path"
            .value=${actCfg.navigation_path || ''}
            @input=${(e) => this._fire('entities.' + key + '.' + actionType + '_action.navigation_path', e.target.value)}
          />
        ` : ''}
      </div>
    `;
  }
  
  _toggleOne(i) {
    this._expandedItems = this._expandedItems.map((_, j) => j === i);
    this.requestUpdate();
  }
  
  _resetAll() {
  this.dispatchEvent(new CustomEvent('panel-changed', {
    detail: { prop: '__panel_cmd__', val: { cmd: 'reset', section: 'subbutton' } },
    bubbles: true, composed: true,
  }));
}
_fire(prop, value) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val: value },
      bubbles: true,
      composed: true,
    }));
  }
  
  // --- Wrapper locale (Opzione A): usa logica centralizzata + log ---
  _getSubButtonCandidates() {
    // Preferisci la funzione centralizzata (applica domini, classi e filtro Area)
    let list = [];
    try {
      list = candidatesFor(this.hass, this.config, 'subbutton');
    } catch (e) {
      // Fallback locale se l'helper non fosse disponibile
      const hass = this.hass;
      if (!hass || !hass.states) return [];
      const allowed = new Set([
        'light', 'switch', 'media_player', 'fan', 'cover', 'humidifier', 'lock',
        'scene', 'input_boolean', 'script', 'button'
      ]);
      list = Object.keys(hass.states || {}).filter((id) => allowed.has(id.split('.')[0]));
      const area = this.config?.area;
      if (area) {
        const inArea = list.filter((id) => {
          const st = hass.states[id];
          const a1 = st?.attributes?.area_id;
          const a2 = st?.attributes?.area;
          return a1 === area || a2 === area;
        });
        if (inArea.length) list = inArea;
      }
    }
    
    if (DEBUG$1) {
      console.info('[SubButtonsPanel][Candidates]', {
        area: this.config?.area || null,
        count: list.length,
        sample: list.slice(0, 8),
      });
    }
    return list;
  }
}

customElements.define('subbuttons-panel', SubButtonsPanel);

class ColorsPanel extends s {
  static properties = {
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedColors: { type: Array },
  };
  
  constructor() {
    super();
    this.config = {};
    this._expanded = false;
    this._expandedColors = [false, false];
  }
  
  static styles = i$1`
    /* glass-panel, mini-pill/header, input-group, color-row etc. */
  `;
  
  render() {
    return x`
      <ha-expansion-panel
        class="glass-panel"
        .expanded="${this._expanded}"
        @expanded-changed="${e=>this._expanded=e.detail.expanded}"
      >
        <div slot="header" class="glass-header">🎨 Colors</div>
        <div class="glass-content">
          ${this._renderColorPill(0,'Room','#55afff',[
            {label:'Background Active','field':'background_active'},
            {label:'Background Inactive','field':'background_inactive'},
            {label:'Icon Active','field':'icon_active'},
            {label:'Icon Inactive','field':'icon_inactive'},
          ])}
          ${this._renderColorPill(1,'Subbutton','#b28fff',[
            {label:'Background On','field':'background_on'},
            {label:'Background Off','field':'background_off'},
            {label:'Icon On','field':'icon_on'},
            {label:'Icon Off','field':'icon_off'},
          ])}
        </div>
      </ha-expansion-panel>
    `;
  }
  
  _renderColorPill(idx, label, accent, fields) {
    return x`
      <div class="mini-pill ${this._expandedColors[idx]?'expanded':''}" @click="${()=>this._expandedColors[idx]=!this._expandedColors[idx]}">
        <div class="mini-pill-header" style="--section-accent:${accent}">${label}<span class="chevron">${this._expandedColors[idx]?'▼':'▶'}</span></div>
        ${this._expandedColors[idx]? x`
          <div class="mini-pill-content">
            ${fields.map(f=>x`
              <div class="input-group color-row">
                <label>${f.label}</label>
                <input type="color"
                       .value="${this._toHex(this.config.colors[label.toLowerCase()]?.[f.field]||'#000')}"
                       @input="${e=>this._updateColor(label.toLowerCase(),f.field,e.target.value)}">
                <input type="range" min="0" max="1" step="0.01"
                       .value="${parseFloat((this.config.colors[label.toLowerCase()]?.[f.field]||'1').split(',').pop())}"
                       @input="${e=>this._updateColor(label.toLowerCase(),f.field,e.target.value,true)}">
              </div>
            `)}
          </div>
        `:''}
      </div>
    `;
  }
  
  _toHex(color) {
    if (!color) return '#000000';
    if (color.startsWith('#')) return color.length===7 ? color.slice(0,7) : color;
    const m = /rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(color);
    if (!m) return '#000000';
    const [r,g,b] = m.slice(1).map(n => Math.max(0, Math.min(255, parseInt(n,10)||0)));
    return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
  }
  _updateColor(section, key, value, alpha = false) {
    const hex = this._toHex(value);
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop: `colors.${section}.${key}`, val: hex },
      bubbles: true, composed: true
    }));
  }
}

customElements.define('colors-panel', ColorsPanel);

// src/bubble-room-editor.js

const DEBUG = !!window.__BUBBLE_DEBUG__;

class BubbleRoomEditor extends s {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
  };
  
  constructor() {
    super();
    this.hass = {};
    this.config = {};
  }
  
  setConfig(config) {
    this.config = {
      ...config,
      sensors: Array.isArray(config.sensors) ? config.sensors : [],
      mushrooms: Array.isArray(config.mushrooms) ? config.mushrooms : [],
      subbuttons: Array.isArray(config.subbuttons) ? config.subbuttons : [],
      colors: config.colors ? config.colors : { room: {}, subbutton: {} },
    };
  }
  
  getConfig() {
    return { ...this.config };
  }
  
  render() {
    return x`
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
    `;
  }
  
  _onPanelChanged(e) {
    const { prop, val } = e.detail || {};
    if (!prop) return;
    const mapped = this._mapLegacyPath(prop);
    if (DEBUG) console.info('[Editor][panel-changed]', { prop, mapped, val });
    this._setByPath(this.config, mapped, val);
    
    // Auto-discovery per-sezione (incl. presence)
    this.config = maybeAutoDiscover(this.hass, this.config, prop, DEBUG);
    // Reset per-sezione delegato dai pannelli
    if (prop === '__panel_cmd__' && val && val.cmd === 'reset') {
      const section = val.section;
      if (section === 'sensor') this.config = resetSensors(this.config);
      if (section === 'mushroom') this.config = resetMushrooms(this.config);
      if (section === 'subbutton') this.config = resetSubButtons(this.config);
      if (section === 'room') this.config = resetRoom(this.config);
      if (DEBUG) console.info('[Reset]', section);
    }
    
    
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.getConfig() },
      bubbles: true,
      composed: true,
    }));
  }
  
  // Converte path legacy dei pannelli in path sugli array usati dalla card
  _mapLegacyPath(p) {
    if (p && p.startsWith('entities.')) {
      const key = p.slice('entities.'.length);
      
      // sensors: entities.sensor1 -> sensors[0]
      let m = key.match(/^sensor(\d+)$/);
      if (m) return 'sensors[' + (parseInt(m[1], 10) - 1) + ']';
      
      // sub-buttons: entities.sub-button2 -> subbuttons[1]
      m = key.match(/^sub-button(\d+)$/);
      if (m) return 'subbuttons[' + (parseInt(m[1], 10) - 1) + ']';
      
      // mushrooms: entities1..entities6 -> mushrooms[0..5]
      m = key.match(/^entities(\d+)$/);
      if (m) return 'mushrooms[' + (parseInt(m[1], 10) - 1) + ']';
      
      // tutti gli altri (es. presence.entity) restano sotto "entities"
      return 'entities.' + key;
    }
    return p;
  }
  _setByPath(obj, path, value) {
    const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      const nextIsIndex = /^\d+$/.test(parts[i + 1]);
      if (cur[k] == null) cur[k] = nextIsIndex ? [] : {};
      cur = cur[k];
    }
    cur[parts[parts.length - 1]] = value;
  }
  
  static styles = i$1`
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
  `;
}

customElements.define('bubble-room-editor', BubbleRoomEditor);

var bubbleRoomEditor = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BubbleRoomEditor: BubbleRoomEditor
});

/**
 * BubbleIcon.js
 * 
 * Icona principale stanza, gigante e posizionata assoluta in basso a sinistra.
 * Replica stile pixel-perfect dell’originale Bubble Room.
 */

class BubbleIcon extends s {
  static properties = {
    icon: { type: String },
    active: { type: Boolean },
    colorActive: { type: String },
    colorInactive: { type: String }
  };
  
  constructor() {
    super();
    this.icon = '';
    this.active = false;
    this.colorActive = '#21df73'; // verde acceso (default originale)
    this.colorInactive = '#173c16'; // verde scuro sbiadito (default originale)
  }
  
  static styles = i$1`
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
  `;
  
  render() {
    const iconColor = this.active ? this.colorActive : this.colorInactive;
    return x`
      <ha-icon
        class="main-icon ${this.active ? 'active' : ''}"
        .icon="${this.icon}"
        style="--icon-color: ${iconColor}"
        @click="${() => this.dispatchEvent(new CustomEvent('main-icon-click'))}"
      ></ha-icon>
    `;
  }
}

customElements.define('bubble-icon', BubbleIcon);

/**
 * BubbleMushroom.js
 * 
 * Mushroom entities disposte a raggera attorno all'icona principale.
 * Comportamento, overlay e stile come in Bubble Room originale.
 */

class BubbleMushroom extends s {
  static properties = {
    entities: { type: Array },
    containerSize: { type: Object }
  };

  constructor() {
    super();
    this.entities = [];
    this.containerSize = { width: 200, height: 200 };
  }

  static styles = i$1`
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
  `;

  /**
   * Posizioni a raggera (percentuali rispetto a containerSize)
   * - Puoi personalizzare queste per le tue 6 mushroom entity!
   */
  _entityRatios() {
    // max 6 posizioni, modifica se ne vuoi di più
    return [
      { x: 0.20, y: 0.09 },
      { x: 0.54, y: 0.05 },
      { x: 0.81, y: 0.33 },
      { x: 0.82, y: 0.67 },
      { x: 0.54, y: 0.92 },
      { x: 0.20, y: 0.87 },
    ];
  }

  render() {
    const { width, height } = this.containerSize || { width: 200, height: 200 };
    const ratios = this._entityRatios();
    return x`
      <div class="mushroom-container" style="width:${width}px;height:${height}px;">
        ${this.entities.map((entity, idx) => {
          const r = ratios[idx] || { x: 0.5, y: 0.5 };
          const left = `${Math.round(r.x * width) - 26}px`;
          const top = `${Math.round(r.y * height) - 26}px`;
          return x`
            <ha-icon
              class="mushroom-entity ${entity.state === 'on' ? 'active' : ''}"
              .icon="${entity.icon}"
              style="left: ${left}; top: ${top}; color: ${entity.color || '#888'}"
              @click="${() => this.dispatchEvent(new CustomEvent('mushroom-entity-click', { detail: idx }))}"
            ></ha-icon>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('bubble-mushroom', BubbleMushroom);

/**
 * BubbleName.js
 * 
 * Visualizza il nome della stanza, uppercased, grande e bold, allineato a sinistra.
 */

class BubbleName extends s {
  static properties = {
    name: { type: String },
    area: { type: String }
  };
  
  constructor() {
    super();
    this.name = '';
    this.area = '';
  }
  
  static styles = i$1`
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
  `;
  
  render() {
    return x`
      <div class="bubble-name">
        ${this.name}
        ${this.area
          ? x`<span class="bubble-area">(${this.area})</span>`
          : ''}
      </div>
    `;
  }
}

customElements.define('bubble-name', BubbleName);

// src/components/BubbleSensors.js

class BubbleSensors extends s {
  static properties = {
    sensors: { type: Array }, // [{icon, label, value, unit, color}]
  };
  
  static styles = i$1`
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
  `;
  
  render() {
    // Divide in due righe (3+3 sensori)
    const row1 = this.sensors?.slice(0, 3) || [];
    const row2 = this.sensors?.slice(3, 6) || [];
    return x`
      <div class="sensor-row">
        ${row1.map(sensor => x`
          <div class="sensor-pill" style="color: ${sensor.color || '#e3f6ff'}">
            <ha-icon class="sensor-icon" .icon="${sensor.icon}"></ha-icon>
            <span class="sensor-label">${sensor.label || ''}</span>
            <span class="sensor-value">${sensor.value ?? '--'}</span>
            <span class="sensor-unit">${sensor.unit || ''}</span>
          </div>
        `)}
      </div>
      ${row2.length ? x`
        <div class="sensor-row">
          ${row2.map(sensor => x`
            <div class="sensor-pill" style="color: ${sensor.color || '#e3f6ff'}">
              <ha-icon class="sensor-icon" .icon="${sensor.icon}"></ha-icon>
              <span class="sensor-label">${sensor.label || ''}</span>
              <span class="sensor-value">${sensor.value ?? '--'}</span>
              <span class="sensor-unit">${sensor.unit || ''}</span>
            </div>
          `)}
        </div>
      ` : ''}
    `;
  }
}

customElements.define('bubble-sensors', BubbleSensors);

/**
 * BubbleSubButton.js
 * 
 * Visualizza i subbutton verticali a destra, quadrati e con label sotto (come nell’originale Bubble Room).
 */

class BubbleSubButton extends s {
  static properties = {
    subbuttons: { type: Array }
  };
  
  constructor() {
    super();
    this.subbuttons = [];
  }
  
  static styles = i$1`
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
  `;
  
  render() {
    return x`
      <div class="subbutton-column">
        ${this.subbuttons.map(
          (sub, idx) => x`
            <div
              class="subbutton ${sub.active ? 'active' : ''}"
              @click="${() => this.dispatchEvent(new CustomEvent('subbutton-click', { detail: idx }))}"
              title="${sub.label || ''}"
              style="background:${sub.active ? (sub.colorOn || '#21df73') : (sub.colorOff || '#455a64')};"
            >
              <ha-icon class="subbutton-icon" .icon="${sub.icon}"></ha-icon>
              ${sub.label
                ? x`<span class="subbutton-label">${sub.label}</span>`
                : ''}
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('bubble-subbutton', BubbleSubButton);

/**
 * icon-mapping.js
 * 
 * Mappa centralizzata delle icone predefinite per device_class, sensori e fallback vari.
 * Usare così com'è.
 */

const SENSOR_TYPE_ICON_MAP = {
  temperature: { icon: 'mdi:thermometer', unit: '°C' },
  humidity:    { icon: 'mdi:water-percent', unit: '%' },
  co2:         { icon: 'mdi:molecule-co2', unit: 'ppm' },
  lux:         { icon: 'mdi:brightness-5', unit: 'lx' },
  uv:          { icon: 'mdi:weather-sunny-alert', unit: 'UV' },
  pressure:    { icon: 'mdi:gauge', unit: 'hPa' },
  noise:       { icon: 'mdi:volume-high', unit: 'dB' },
  pm25:        { icon: 'mdi:blur', unit: 'µg/m³' },
  pm10:        { icon: 'mdi:blur-linear', unit: 'µg/m³' }
};

const DEFAULT_ICON = 'mdi:sofa';

/**
 * utils.js
 * 
 * Funzioni comuni e utility per la card Bubble Room.
 * File chiuso, non lasciare placeholder!
 */

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ==== src/bubble-room.js  (ver. 29-lug-22:13 patched) ==== */

class BubbleRoom extends s {
  static properties = {
    config: { type: Object },
    hass: { type: Object }
  };
  
  constructor() {
    super();
    this.config = {};
    this.hass = {};
  }

  static getStubConfig() {
    return {
      type: 'custom:bubble-room',
      name: 'Salotto',
      area: 'Zona Giorno',
      icon: 'mdi:sofa',
      sensors: [
        { entity_id: 'sensor.some_sensor1', type: 'temperature', label: 'Temperatura', color: '#e3f6ff' }
      ],
      mushrooms: [
        { entity_id: 'switch.lampada', icon: 'mdi:lightbulb', color: '#ffeb3b' }
      ],
      subbuttons: [
        { entity_id: 'light.luce_tavolo', icon: 'mdi:lamp', label: 'Tavolo', colorOn: '#00d46d', colorOff: '#999' }
      ],
      colors: {
        room: {
          background_active: 'rgba(var(--color-green),1)',
          background_inactive: 'rgba(var(--color-green),0.3)',
          icon_active: 'orange',
          icon_inactive: '#80808055',
          mushroom_active: 'rgba(var(--color-green),1)',
          mushroom_inactive: '#80808055'
        },
        subbutton: {
          background_on: 'rgba(var(--color-blue),1)',
          background_off: 'rgba(var(--color-blue),0.3)',
          icon_on: 'yellow',
          icon_off: '#666'
        }
      }
    };
  }

  /* ------- HA editor hook ------- */
  static async getConfigElement() {
    await Promise.resolve().then(function () { return bubbleRoomEditor; });
    return document.createElement('bubble-room-editor');
  }
  setConfig(config) {
    this.config = config;
  }

  /* ------- CSS ------- */
  static styles = i$1`
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
  `;

  render() {
    const mainIcon = this.config.icon || DEFAULT_ICON;

    const iconActive =
      this.config.colors?.room?.icon_active ??
      this.config.icon_active ?? '#21df73';

    const iconInactive =
      this.config.colors?.room?.icon_inactive ??
      this.config.icon_inactive ?? '#173c16';

    const name  = this.config.name  || 'Room';
    const area  = this.config.area  || '';
    const sensors           = this._getSensors();
    const mushroomEntities  = this._getMushroomEntities();
    const subbuttons        = this._getSubButtons();
    const mushroomSize      = { width: 240, height: 190 };

    return x`
      <div class="bubble-room-grid">
        <div class="main-area">
          <bubble-sensors .sensors="${sensors}"></bubble-sensors>
          <bubble-name .name="${name}" .area="${area}"></bubble-name>
          <div class="icon-mushroom-area">
            <bubble-icon
              .icon="${mainIcon}"
              .active="${this._isMainIconActive()}"
              .colorActive="${iconActive}"
              .colorInactive="${iconInactive}"
              @main-icon-click="${this._onMainIconClick}"
            ></bubble-icon>
            <bubble-mushroom
              .entities="${mushroomEntities}"
              .containerSize="${mushroomSize}"
              @mushroom-entity-click="${this._onMushroomEntityClick}"
            ></bubble-mushroom>
          </div>
        </div>
        <div class="sidebar">
          <bubble-subbutton
            .subbuttons="${subbuttons}"
            @subbutton-click="${this._onSubButtonClick}"
          ></bubble-subbutton>
        </div>
      </div>
    `;
  }

  /* ------- helpers ------- */
  _getSensors() {
    return (this.config.sensors || []).map(s => ({
      icon: SENSOR_TYPE_ICON_MAP[s.type]?.icon || 'mdi:help-circle',
      label: s.label || capitalize(s.type || ''),
      value: this.hass.states?.[s.entity_id]?.state ?? '--',
      unit:  SENSOR_TYPE_ICON_MAP[s.type]?.unit || '',
      color: s.color || '#e3f6ff'
    }));
  }

  _getMushroomEntities() {
    const def = this.config.colors?.room?.mushroom_inactive ?? '#999';
    return (this.config.mushrooms || []).map(e => ({
      icon: e.icon || 'mdi:flash',
      state: this.hass.states?.[e.entity_id]?.state,
      color: e.color ?? def,
    }));
  }

  _getSubButtons() {
    const defOn  = this.config.colors?.subbutton?.background_on  ?? '#00d46d';
    const defOff = this.config.colors?.subbutton?.background_off ?? '#999';
    return (this.config.subbuttons || []).map(sub => ({
      icon: sub.icon || 'mdi:light-switch',
      active: this.hass.states?.[sub.entity_id]?.state === 'on',
      colorOn: sub.colorOn ?? defOn,
      colorOff: sub.colorOff ?? defOff,
      label: sub.label || '',
    }));
  }

  _isMainIconActive() {
    return !!this.config.active;
  }

  /* ------- event stub (da completare) ------- */
  _onMainIconClick() {/* ... */}
  _onMushroomEntityClick(e) {/* ... */}
  _onSubButtonClick(e)     {/* ... */}
}

customElements.define('bubble-room', BubbleRoom);
/* ==== fine bubble-room.js ==== */

export { BubbleRoom };
