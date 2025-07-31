/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,e$6=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$5=new WeakMap;class n$3{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$6&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}}const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$6)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$3.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$6?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$5,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$4,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b={attribute:!0,type:String,converter:u$1,reflect:!1,useDefault:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class y$1 extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$5(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}}y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,i$2=t$2.trustedTypes,s$1=i$2?i$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$4="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$3="?"+h,n$1=`<${o$3}>`,r$2=document,l=()=>r$2.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$2.createTreeWalker(r$2,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e$4+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$4)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$2?i$2.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$3)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$2).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$2,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$2.litHtmlPolyfillSupport;j?.(N,R),(t$2.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i$1 extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}}i$1._$litElement$=!0,i$1["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i$1});const o$2=s.litElementPolyfillSupport;o$2?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.1");

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

class RoomPanel extends i$1 {
  static properties = {
    hass:           { type: Object },
    config:         { type: Object },
    _expanded:      { type: Boolean },
    activeFilters:  { type: Array, state: true },
  };

  static styles = i$4`
    :host {
      display: block;
    }
    /* Shape chip Material Web */
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
      --glass-shadow: 0 2px 24px 0 rgba(50,180,255,0.25);
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
      position: relative;
      z-index: 1;
      padding: 22px 0 18px;
      margin: 0;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
    }

    /* Mini-pill */
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px 0 rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin-bottom: 18px;
      overflow: hidden;
    }
    .mini-pill-header {
      display: flex;
      align-items: center;
      padding: 15px 22px;
      font-size: 1.09em;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      color: #55afff;
      user-select: none;
    }
    .mini-pill-content {
      padding: 15px 22px;
    }

    /* Input group */
    .input-group {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius: 18px;
      margin-bottom: 13px;
      padding: 14px 18px 10px;
    }
    .ad-top {
      margin: 0 16px 14px;
    }
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

    // Import dinamico di Material Web: eseguito solo una volta
    if (!customElements.get('md-focus-ring')) {
      Promise.resolve().then(function () { return chipSet; });
      Promise.resolve().then(function () { return filterChip; });
    }
  }

  updated(changed) {
    if (changed.has('config') || changed.has('hass')) {
      maybeAutoDiscover(this.hass, this.config, 'area');
      maybeAutoDiscover(this.hass, this.config, 'auto_discovery_sections.presence');

      // Sincronizzo activeFilters con la config al primo caricamento
      if (changed.has('config') && Array.isArray(this.config.presence_filters)) {
        this.activeFilters = [...this.config.presence_filters];
      }
    }
  }

  addFilter(filter) {
    if (!this.activeFilters.includes(filter)) {
      this.activeFilters = [...this.activeFilters, filter];
    }
  }

  removeFilter(filter) {
    this.activeFilters = this.activeFilters.filter(f => f !== filter);
  }

  toggleFilter(filter) {
    if (this.activeFilters.includes(filter)) {
      this.removeFilter(filter);
    } else {
      this.addFilter(filter);
    }
    this._fire('presence_filters', this.activeFilters);
  }

  render() {
    const cfg            = this.config;
    const presFilters    = cfg.presence_filters ?? [...PRESENCE_CATS];
    const presValue      = cfg.entities?.presence?.entity ?? cfg.presence_entity ?? '';
    const presCandidates = candidatesFor(this.hass, this.config, 'presence', presFilters);

    return x`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${e => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🛋️ Room Settings</div>

        <!-- Auto-discover -->
        <div class="input-group ad-top">
          <label style="display:flex;align-items:center;gap:8px;margin:0;">
            <input
              type="checkbox"
              .checked=${cfg.auto_discovery_sections?.presence ?? false}
              @change=${e =>
                this._fire('auto_discovery_sections.presence', e.target.checked)}
            />
            <span>🔍 Auto-discover Presence</span>
          </label>
        </div>

        <!-- Room name & Area -->
        <div class="mini-pill">
          <div class="mini-pill-header">Room</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room name:</label>
              <input
                type="text"
                .value=${cfg.name ?? ''}
                @input=${e => this._fire('name', e.target.value)}
              />
            </div>
            <div class="input-group">
              <label>Area:</label>
              <ha-selector
                .hass=${this.hass}
                .value=${cfg.area ?? ''}
                .selector=${{ area: {} }}
                @value-changed=${this._onAreaChanged}
              ></ha-selector>
            </div>
          </div>
        </div>

        <!-- Icon & Presence + Chips -->
        <div class="mini-pill">
          <div class="mini-pill-header">Icon & Presence</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room Icon:</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${cfg.icon ?? ''}
                allow-custom-icon
                @value-changed=${e => this._fire('icon', e.detail.value)}
              ></ha-icon-picker>
            </div>

            <div class="input-group">
              <label>Filtra per categoria:</label>
              <md-chip-set aria-label="Categorie di Presence" selectable>
                ${PRESENCE_CATS.map(cat => x`
                  <md-filter-chip
                    .label=${cat}
                    ?selected=${this.activeFilters.includes(cat)}
                    ?removable=${this.activeFilters.includes(cat)}
                    @click=${() => this.toggleFilter(cat)}
                  ></md-filter-chip>
                `)}
              </md-chip-set>
            </div>

            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-selector
                .hass=${this.hass}
                .value=${presValue}
                .selector=${{
                  entity: {
                    multiple: false,
                    include_entities: presCandidates
                  }
                }}
                allow-custom-entity
                @value-changed=${e =>
                  this._emit('entities.presence.entity', e.detail.value)}
              ></ha-selector>
            </div>

            ${this._renderActions('tap')}
            ${this._renderActions('hold')}
          </div>
        </div>

        <!-- Reset -->
        <div style="text-align:center;margin-top:1.2em;">
          <button class="reset-button" @click=${this._resetRoom}>🧹 Reset Room</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _onAreaChanged = (e) => {
    const v = e.detail.value;
    this._fire('area', v);
    if (v) this._fire('auto_discovery_sections.presence', true);
  };

  _renderActions(type) {
    const cfg     = this.config?.[`${type}_action`] || {};
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];
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
            @input=${e => this._fire(`${type}_action.service`, e.target.value)}
          />
          <input
            type="text"
            placeholder='service_data (JSON)'
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

  _resetRoom() {
    this._fire('__panel_cmd__', { cmd: 'reset', section: 'room' });
  }

  _emit(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val }, bubbles: true, composed: true,
    }));
  }
  _fire(prop, val) { this._emit(prop, val); }
}

customElements.define('room-panel', RoomPanel);

// src/panels/SensorsPanel.js
// Se hai un mapping tipi/etichette, puoi importarlo. Qui rendo opzionale.
// import { SENSOR_TYPES } from '../helpers/sensor-mapping.js';

class SensorsPanel extends i$1 {
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

  static styles = i$4`
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

class MushroomsPanel extends i$1 {
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

  static styles = i$4`
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

class SubButtonsPanel extends i$1 {
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
  
  static styles = i$4`
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

class ColorsPanel extends i$1 {
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
  
  static styles = i$4`
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

class BubbleRoomEditor extends i$1 {
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
  
  static styles = i$4`
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

class BubbleIcon extends i$1 {
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
  
  static styles = i$4`
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

class BubbleMushroom extends i$1 {
  static properties = {
    entities: { type: Array },
    containerSize: { type: Object }
  };

  constructor() {
    super();
    this.entities = [];
    this.containerSize = { width: 200, height: 200 };
  }

  static styles = i$4`
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

class BubbleName extends i$1 {
  static properties = {
    name: { type: String },
    area: { type: String }
  };
  
  constructor() {
    super();
    this.name = '';
    this.area = '';
  }
  
  static styles = i$4`
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

class BubbleSensors extends i$1 {
  static properties = {
    sensors: { type: Array }, // [{icon, label, value, unit, color}]
  };
  
  static styles = i$4`
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

class BubbleSubButton extends i$1 {
  static properties = {
    subbuttons: { type: Array }
  };
  
  constructor() {
    super();
    this.subbuttons = [];
  }
  
  static styles = i$4`
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

class BubbleRoom extends i$1 {
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
  static styles = i$4`
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

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1},r$1=(t=o$1,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:!0,attribute:!1})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$3=(e,t,c)=>(c.configurable=!0,c.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,c),c);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e$2(e,r){return (n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;if(r){const{get:e,set:r}="object"==typeof s?n:i??(()=>{const t=Symbol();return {get(){return this[t]},set(e){this[t]=e;}}})();return e$3(n,s,{get(){let t=e.call(this);return void 0===t&&(t=o(this),(null!==t||this.hasUpdated)&&r.call(this,t)),t}})}return e$3(n,s,{get(){return o(this)}})}}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function o(o){return (e,n)=>{const{slot:r,selector:s}=o??{},c="slot"+(r?`[name=${r}]`:":not([name])");return e$3(e,n,{get(){const t=this.renderRoot?.querySelector(c),e=t?.assignedElements(o)??[];return void 0===s?e:e.filter((t=>t.matches(s)))}})}}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A key to retrieve an `Attachable` element's `AttachableController` from a
 * global `MutationObserver`.
 */
const ATTACHABLE_CONTROLLER = Symbol('attachableController');
let FOR_ATTRIBUTE_OBSERVER;
{
    /**
     * A global `MutationObserver` that reacts to `for` attribute changes on
     * `Attachable` elements. If the `for` attribute changes, the controller will
     * re-attach to the new referenced element.
     */
    FOR_ATTRIBUTE_OBSERVER = new MutationObserver((records) => {
        for (const record of records) {
            // When a control's `for` attribute changes, inform its
            // `AttachableController` to update to a new control.
            record.target[ATTACHABLE_CONTROLLER]?.hostConnected();
        }
    });
}
/**
 * A controller that provides an implementation for `Attachable` elements.
 *
 * @example
 * ```ts
 * class MyElement extends LitElement implements Attachable {
 *   get control() { return this.attachableController.control; }
 *
 *   private readonly attachableController = new AttachableController(
 *     this,
 *     (previousControl, newControl) => {
 *       previousControl?.removeEventListener('click', this.handleClick);
 *       newControl?.addEventListener('click', this.handleClick);
 *     }
 *   );
 *
 *   // Implement remaining `Attachable` properties/methods that call the
 *   // controller's properties/methods.
 * }
 * ```
 */
class AttachableController {
    get htmlFor() {
        return this.host.getAttribute('for');
    }
    set htmlFor(htmlFor) {
        if (htmlFor === null) {
            this.host.removeAttribute('for');
        }
        else {
            this.host.setAttribute('for', htmlFor);
        }
    }
    get control() {
        if (this.host.hasAttribute('for')) {
            if (!this.htmlFor || !this.host.isConnected) {
                return null;
            }
            return this.host.getRootNode().querySelector(`#${this.htmlFor}`);
        }
        return this.currentControl || this.host.parentElement;
    }
    set control(control) {
        if (control) {
            this.attach(control);
        }
        else {
            this.detach();
        }
    }
    /**
     * Creates a new controller for an `Attachable` element.
     *
     * @param host The `Attachable` element.
     * @param onControlChange A callback with two parameters for the previous and
     *     next control. An `Attachable` element may perform setup or teardown
     *     logic whenever the control changes.
     */
    constructor(host, onControlChange) {
        this.host = host;
        this.onControlChange = onControlChange;
        this.currentControl = null;
        host.addController(this);
        host[ATTACHABLE_CONTROLLER] = this;
        FOR_ATTRIBUTE_OBSERVER?.observe(host, { attributeFilter: ['for'] });
    }
    attach(control) {
        if (control === this.currentControl) {
            return;
        }
        this.setCurrentControl(control);
        // When imperatively attaching, remove the `for` attribute so
        // that the attached control is used instead of a referenced one.
        this.host.removeAttribute('for');
    }
    detach() {
        this.setCurrentControl(null);
        // When imperatively detaching, add an empty `for=""` attribute. This will
        // ensure the control is `null` rather than the `parentElement`.
        this.host.setAttribute('for', '');
    }
    /** @private */
    hostConnected() {
        this.setCurrentControl(this.control);
    }
    /** @private */
    hostDisconnected() {
        this.setCurrentControl(null);
    }
    setCurrentControl(control) {
        this.onControlChange(this.currentControl, control);
        this.currentControl = control;
    }
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Events that the focus ring listens to.
 */
const EVENTS$1 = ['focusin', 'focusout', 'pointerdown'];
/**
 * A focus ring component.
 *
 * @fires visibility-changed {Event} Fired whenever `visible` changes.
 */
class FocusRing extends i$1 {
    constructor() {
        super(...arguments);
        /**
         * Makes the focus ring visible.
         */
        this.visible = false;
        /**
         * Makes the focus ring animate inwards instead of outwards.
         */
        this.inward = false;
        this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
    }
    get htmlFor() {
        return this.attachableController.htmlFor;
    }
    set htmlFor(htmlFor) {
        this.attachableController.htmlFor = htmlFor;
    }
    get control() {
        return this.attachableController.control;
    }
    set control(control) {
        this.attachableController.control = control;
    }
    attach(control) {
        this.attachableController.attach(control);
    }
    detach() {
        this.attachableController.detach();
    }
    connectedCallback() {
        super.connectedCallback();
        // Needed for VoiceOver, which will create a "group" if the element is a
        // sibling to other content.
        this.setAttribute('aria-hidden', 'true');
    }
    /** @private */
    handleEvent(event) {
        if (event[HANDLED_BY_FOCUS_RING]) {
            // This ensures the focus ring does not activate when multiple focus rings
            // are used within a single component.
            return;
        }
        switch (event.type) {
            default:
                return;
            case 'focusin':
                this.visible = this.control?.matches(':focus-visible') ?? false;
                break;
            case 'focusout':
            case 'pointerdown':
                this.visible = false;
                break;
        }
        event[HANDLED_BY_FOCUS_RING] = true;
    }
    onControlChange(prev, next) {
        for (const event of EVENTS$1) {
            prev?.removeEventListener(event, this);
            next?.addEventListener(event, this);
        }
    }
    update(changed) {
        if (changed.has('visible')) {
            // This logic can be removed once the `:has` selector has been introduced
            // to Firefox. This is necessary to allow correct submenu styles.
            this.dispatchEvent(new Event('visibility-changed'));
        }
        super.update(changed);
    }
}
__decorate([
    n({ type: Boolean, reflect: true })
], FocusRing.prototype, "visible", void 0);
__decorate([
    n({ type: Boolean, reflect: true })
], FocusRing.prototype, "inward", void 0);
const HANDLED_BY_FOCUS_RING = Symbol('handledByFocusRing');

/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$8 = i$4 `:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * TODO(b/267336424): add docs
 *
 * @final
 * @suppress {visibility}
 */
let MdFocusRing = class MdFocusRing extends FocusRing {
};
MdFocusRing.styles = [styles$8];
MdFocusRing = __decorate([
    t$1('md-focus-ring')
], MdFocusRing);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=e$1(class extends i{constructor(t$1){if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||t$1.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((s=>t[s])).join(" ")+" "}update(s,[i]){if(void 0===this.st){this.st=new Set,void 0!==s.strings&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}const r=s.element.classList;for(const t of this.st)t in i||(r.remove(t),this.st.delete(t));for(const t in i){const s=!!i[t];s===this.st.has(t)||this.nt?.has(t)||(s?(r.add(t),this.st.add(t)):(r.remove(t),this.st.delete(t)));}return T}});

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Easing functions to use for web animations.
 *
 * **NOTE:** `EASING.EMPHASIZED` is approximated with unknown accuracy.
 *
 * TODO(b/241113345): replace with tokens
 */
const EASING = {
    STANDARD: 'cubic-bezier(0.2, 0, 0, 1)',
    STANDARD_ACCELERATE: 'cubic-bezier(.3,0,1,1)',
    STANDARD_DECELERATE: 'cubic-bezier(0,0,0,1)',
    EMPHASIZED: 'cubic-bezier(.3,0,0,1)',
    EMPHASIZED_ACCELERATE: 'cubic-bezier(.3,0,.8,.15)',
    EMPHASIZED_DECELERATE: 'cubic-bezier(.05,.7,.1,1)',
};

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const PRESS_PSEUDO = '::after';
const ANIMATION_FILL = 'forwards';
/**
 * Interaction states for the ripple.
 *
 * On Touch:
 *  - `INACTIVE -> TOUCH_DELAY -> WAITING_FOR_CLICK -> INACTIVE`
 *  - `INACTIVE -> TOUCH_DELAY -> HOLDING -> WAITING_FOR_CLICK -> INACTIVE`
 *
 * On Mouse or Pen:
 *   - `INACTIVE -> WAITING_FOR_CLICK -> INACTIVE`
 */
var State;
(function (State) {
    /**
     * Initial state of the control, no touch in progress.
     *
     * Transitions:
     *   - on touch down: transition to `TOUCH_DELAY`.
     *   - on mouse down: transition to `WAITING_FOR_CLICK`.
     */
    State[State["INACTIVE"] = 0] = "INACTIVE";
    /**
     * Touch down has been received, waiting to determine if it's a swipe or
     * scroll.
     *
     * Transitions:
     *   - on touch up: begin press; transition to `WAITING_FOR_CLICK`.
     *   - on cancel: transition to `INACTIVE`.
     *   - after `TOUCH_DELAY_MS`: begin press; transition to `HOLDING`.
     */
    State[State["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
    /**
     * A touch has been deemed to be a press
     *
     * Transitions:
     *  - on up: transition to `WAITING_FOR_CLICK`.
     */
    State[State["HOLDING"] = 2] = "HOLDING";
    /**
     * The user touch has finished, transition into rest state.
     *
     * Transitions:
     *   - on click end press; transition to `INACTIVE`.
     */
    State[State["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
})(State || (State = {}));
/**
 * Events that the ripple listens to.
 */
const EVENTS = [
    'click',
    'contextmenu',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerup',
];
/**
 * Delay reacting to touch so that we do not show the ripple for a swipe or
 * scroll interaction.
 */
const TOUCH_DELAY_MS = 150;
/**
 * Used to detect if HCM is active. Events do not process during HCM when the
 * ripple is not displayed.
 */
const FORCED_COLORS = window.matchMedia('(forced-colors: active)');
/**
 * A ripple component.
 */
class Ripple extends i$1 {
    constructor() {
        super(...arguments);
        /**
         * Disables the ripple.
         */
        this.disabled = false;
        this.hovered = false;
        this.pressed = false;
        this.rippleSize = '';
        this.rippleScale = '';
        this.initialSize = 0;
        this.state = State.INACTIVE;
        this.checkBoundsAfterContextMenu = false;
        this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
    }
    get htmlFor() {
        return this.attachableController.htmlFor;
    }
    set htmlFor(htmlFor) {
        this.attachableController.htmlFor = htmlFor;
    }
    get control() {
        return this.attachableController.control;
    }
    set control(control) {
        this.attachableController.control = control;
    }
    attach(control) {
        this.attachableController.attach(control);
    }
    detach() {
        this.attachableController.detach();
    }
    connectedCallback() {
        super.connectedCallback();
        // Needed for VoiceOver, which will create a "group" if the element is a
        // sibling to other content.
        this.setAttribute('aria-hidden', 'true');
    }
    render() {
        const classes = {
            'hovered': this.hovered,
            'pressed': this.pressed,
        };
        return x `<div class="surface ${e(classes)}"></div>`;
    }
    update(changedProps) {
        if (changedProps.has('disabled') && this.disabled) {
            this.hovered = false;
            this.pressed = false;
        }
        super.update(changedProps);
    }
    /**
     * TODO(b/269799771): make private
     * @private only public for slider
     */
    handlePointerenter(event) {
        if (!this.shouldReactToEvent(event)) {
            return;
        }
        this.hovered = true;
    }
    /**
     * TODO(b/269799771): make private
     * @private only public for slider
     */
    handlePointerleave(event) {
        if (!this.shouldReactToEvent(event)) {
            return;
        }
        this.hovered = false;
        // release a held mouse or pen press that moves outside the element
        if (this.state !== State.INACTIVE) {
            this.endPressAnimation();
        }
    }
    handlePointerup(event) {
        if (!this.shouldReactToEvent(event)) {
            return;
        }
        if (this.state === State.HOLDING) {
            this.state = State.WAITING_FOR_CLICK;
            return;
        }
        if (this.state === State.TOUCH_DELAY) {
            this.state = State.WAITING_FOR_CLICK;
            this.startPressAnimation(this.rippleStartEvent);
            return;
        }
    }
    async handlePointerdown(event) {
        if (!this.shouldReactToEvent(event)) {
            return;
        }
        this.rippleStartEvent = event;
        if (!this.isTouch(event)) {
            this.state = State.WAITING_FOR_CLICK;
            this.startPressAnimation(event);
            return;
        }
        // after a longpress contextmenu event, an extra `pointerdown` can be
        // dispatched to the pressed element. Check that the down is within
        // bounds of the element in this case.
        if (this.checkBoundsAfterContextMenu && !this.inBounds(event)) {
            return;
        }
        this.checkBoundsAfterContextMenu = false;
        // Wait for a hold after touch delay
        this.state = State.TOUCH_DELAY;
        await new Promise((resolve) => {
            setTimeout(resolve, TOUCH_DELAY_MS);
        });
        if (this.state !== State.TOUCH_DELAY) {
            return;
        }
        this.state = State.HOLDING;
        this.startPressAnimation(event);
    }
    handleClick() {
        // Click is a MouseEvent in Firefox and Safari, so we cannot use
        // `shouldReactToEvent`
        if (this.disabled) {
            return;
        }
        if (this.state === State.WAITING_FOR_CLICK) {
            this.endPressAnimation();
            return;
        }
        if (this.state === State.INACTIVE) {
            // keyboard synthesized click event
            this.startPressAnimation();
            this.endPressAnimation();
        }
    }
    handlePointercancel(event) {
        if (!this.shouldReactToEvent(event)) {
            return;
        }
        this.endPressAnimation();
    }
    handleContextmenu() {
        if (this.disabled) {
            return;
        }
        this.checkBoundsAfterContextMenu = true;
        this.endPressAnimation();
    }
    determineRippleSize() {
        const { height, width } = this.getBoundingClientRect();
        const maxDim = Math.max(height, width);
        const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
        const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
        const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
        const maxRadius = hypotenuse + PADDING;
        this.initialSize = initialSize;
        this.rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
        this.rippleSize = `${initialSize}px`;
    }
    getNormalizedPointerEventCoords(pointerEvent) {
        const { scrollX, scrollY } = window;
        const { left, top } = this.getBoundingClientRect();
        const documentX = scrollX + left;
        const documentY = scrollY + top;
        const { pageX, pageY } = pointerEvent;
        return { x: pageX - documentX, y: pageY - documentY };
    }
    getTranslationCoordinates(positionEvent) {
        const { height, width } = this.getBoundingClientRect();
        // end in the center
        const endPoint = {
            x: (width - this.initialSize) / 2,
            y: (height - this.initialSize) / 2,
        };
        let startPoint;
        if (positionEvent instanceof PointerEvent) {
            startPoint = this.getNormalizedPointerEventCoords(positionEvent);
        }
        else {
            startPoint = {
                x: width / 2,
                y: height / 2,
            };
        }
        // center around start point
        startPoint = {
            x: startPoint.x - this.initialSize / 2,
            y: startPoint.y - this.initialSize / 2,
        };
        return { startPoint, endPoint };
    }
    startPressAnimation(positionEvent) {
        if (!this.mdRoot) {
            return;
        }
        this.pressed = true;
        this.growAnimation?.cancel();
        this.determineRippleSize();
        const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
        const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
        const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
        this.growAnimation = this.mdRoot.animate({
            top: [0, 0],
            left: [0, 0],
            height: [this.rippleSize, this.rippleSize],
            width: [this.rippleSize, this.rippleSize],
            transform: [
                `translate(${translateStart}) scale(1)`,
                `translate(${translateEnd}) scale(${this.rippleScale})`,
            ],
        }, {
            pseudoElement: PRESS_PSEUDO,
            duration: PRESS_GROW_MS,
            easing: EASING.STANDARD,
            fill: ANIMATION_FILL,
        });
    }
    async endPressAnimation() {
        this.rippleStartEvent = undefined;
        this.state = State.INACTIVE;
        const animation = this.growAnimation;
        let pressAnimationPlayState = Infinity;
        if (typeof animation?.currentTime === 'number') {
            pressAnimationPlayState = animation.currentTime;
        }
        else if (animation?.currentTime) {
            pressAnimationPlayState = animation.currentTime.to('ms').value;
        }
        if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
            this.pressed = false;
            return;
        }
        await new Promise((resolve) => {
            setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
        });
        if (this.growAnimation !== animation) {
            // A new press animation was started. The old animation was canceled and
            // should not finish the pressed state.
            return;
        }
        this.pressed = false;
    }
    /**
     * Returns `true` if
     *  - the ripple element is enabled
     *  - the pointer is primary for the input type
     *  - the pointer is the pointer that started the interaction, or will start
     * the interaction
     *  - the pointer is a touch, or the pointer state has the primary button
     * held, or the pointer is hovering
     */
    shouldReactToEvent(event) {
        if (this.disabled || !event.isPrimary) {
            return false;
        }
        if (this.rippleStartEvent &&
            this.rippleStartEvent.pointerId !== event.pointerId) {
            return false;
        }
        if (event.type === 'pointerenter' || event.type === 'pointerleave') {
            return !this.isTouch(event);
        }
        const isPrimaryButton = event.buttons === 1;
        return this.isTouch(event) || isPrimaryButton;
    }
    /**
     * Check if the event is within the bounds of the element.
     *
     * This is only needed for the "stuck" contextmenu longpress on Chrome.
     */
    inBounds({ x, y }) {
        const { top, left, bottom, right } = this.getBoundingClientRect();
        return x >= left && x <= right && y >= top && y <= bottom;
    }
    isTouch({ pointerType }) {
        return pointerType === 'touch';
    }
    /** @private */
    async handleEvent(event) {
        if (FORCED_COLORS?.matches) {
            // Skip event logic since the ripple is `display: none`.
            return;
        }
        switch (event.type) {
            case 'click':
                this.handleClick();
                break;
            case 'contextmenu':
                this.handleContextmenu();
                break;
            case 'pointercancel':
                this.handlePointercancel(event);
                break;
            case 'pointerdown':
                await this.handlePointerdown(event);
                break;
            case 'pointerenter':
                this.handlePointerenter(event);
                break;
            case 'pointerleave':
                this.handlePointerleave(event);
                break;
            case 'pointerup':
                this.handlePointerup(event);
                break;
        }
    }
    onControlChange(prev, next) {
        for (const event of EVENTS) {
            prev?.removeEventListener(event, this);
            next?.addEventListener(event, this);
        }
    }
}
__decorate([
    n({ type: Boolean, reflect: true })
], Ripple.prototype, "disabled", void 0);
__decorate([
    r()
], Ripple.prototype, "hovered", void 0);
__decorate([
    r()
], Ripple.prototype, "pressed", void 0);
__decorate([
    e$2('.surface')
], Ripple.prototype, "mdRoot", void 0);

/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$7 = i$4 `:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary Ripples, also known as state layers, are visual indicators used to
 * communicate the status of a component or interactive element.
 *
 * @description A state layer is a semi-transparent covering on an element that
 * indicates its state. State layers provide a systematic approach to
 * visualizing states by using opacity. A layer can be applied to an entire
 * element or in a circular shape and only one state layer can be applied at a
 * given time.
 *
 * @final
 * @suppress {visibility}
 */
let MdRipple = class MdRipple extends Ripple {
};
MdRipple.styles = [styles$7];
MdRipple = __decorate([
    t$1('md-ripple')
], MdRipple);

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Accessibility Object Model reflective aria properties.
 */
const ARIA_PROPERTIES = [
    'role',
    'ariaAtomic',
    'ariaAutoComplete',
    'ariaBusy',
    'ariaChecked',
    'ariaColCount',
    'ariaColIndex',
    'ariaColSpan',
    'ariaCurrent',
    'ariaDisabled',
    'ariaExpanded',
    'ariaHasPopup',
    'ariaHidden',
    'ariaInvalid',
    'ariaKeyShortcuts',
    'ariaLabel',
    'ariaLevel',
    'ariaLive',
    'ariaModal',
    'ariaMultiLine',
    'ariaMultiSelectable',
    'ariaOrientation',
    'ariaPlaceholder',
    'ariaPosInSet',
    'ariaPressed',
    'ariaReadOnly',
    'ariaRequired',
    'ariaRoleDescription',
    'ariaRowCount',
    'ariaRowIndex',
    'ariaRowSpan',
    'ariaSelected',
    'ariaSetSize',
    'ariaSort',
    'ariaValueMax',
    'ariaValueMin',
    'ariaValueNow',
    'ariaValueText',
];
/**
 * Accessibility Object Model aria attributes.
 */
const ARIA_ATTRIBUTES = ARIA_PROPERTIES.map(ariaPropertyToAttribute);
/**
 * Checks if an attribute is one of the AOM aria attributes.
 *
 * @example
 * isAriaAttribute('aria-label'); // true
 *
 * @param attribute The attribute to check.
 * @return True if the attribute is an aria attribute, or false if not.
 */
function isAriaAttribute(attribute) {
    return ARIA_ATTRIBUTES.includes(attribute);
}
/**
 * Converts an AOM aria property into its corresponding attribute.
 *
 * @example
 * ariaPropertyToAttribute('ariaLabel'); // 'aria-label'
 *
 * @param property The aria property.
 * @return The aria attribute.
 */
function ariaPropertyToAttribute(property) {
    return property
        .replace('aria', 'aria-')
        // IDREF attributes also include an "Element" or "Elements" suffix
        .replace(/Elements?/g, '')
        .toLowerCase();
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// Private symbols
const privateIgnoreAttributeChangesFor = Symbol('privateIgnoreAttributeChangesFor');
/**
 * Mixes in aria delegation for elements that delegate focus and aria to inner
 * shadow root elements.
 *
 * This mixin fixes invalid aria announcements with shadow roots, caused by
 * duplicate aria attributes on both the host and the inner shadow root element.
 *
 * Note: this mixin **does not yet support** ID reference attributes, such as
 * `aria-labelledby` or `aria-controls`.
 *
 * @example
 * ```ts
 * class MyButton extends mixinDelegatesAria(LitElement) {
 *   static shadowRootOptions = {mode: 'open', delegatesFocus: true};
 *
 *   render() {
 *     return html`
 *       <button aria-label=${this.ariaLabel || nothing}>
 *         <slot></slot>
 *       </button>
 *     `;
 *   }
 * }
 * ```
 * ```html
 * <my-button aria-label="Plus one">+1</my-button>
 * ```
 *
 * Use `ARIAMixinStrict` for lit analyzer strict types, such as the "role"
 * attribute.
 *
 * @example
 * ```ts
 * return html`
 *   <button role=${(this as ARIAMixinStrict).role || nothing}>
 *     <slot></slot>
 *   </button>
 * `;
 * ```
 *
 * In the future, updates to the Accessibility Object Model (AOM) will provide
 * built-in aria delegation features that will replace this mixin.
 *
 * @param base The class to mix functionality into.
 * @return The provided class with aria delegation mixed in.
 */
function mixinDelegatesAria(base) {
    var _a;
    class WithDelegatesAriaElement extends base {
        constructor() {
            super(...arguments);
            this[_a] = new Set();
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (!isAriaAttribute(name)) {
                super.attributeChangedCallback(name, oldValue, newValue);
                return;
            }
            if (this[privateIgnoreAttributeChangesFor].has(name)) {
                return;
            }
            // Don't trigger another `attributeChangedCallback` once we remove the
            // aria attribute from the host. We check the explicit name of the
            // attribute to ignore since `attributeChangedCallback` can be called
            // multiple times out of an expected order when hydrating an element with
            // multiple attributes.
            this[privateIgnoreAttributeChangesFor].add(name);
            this.removeAttribute(name);
            this[privateIgnoreAttributeChangesFor].delete(name);
            const dataProperty = ariaAttributeToDataProperty(name);
            if (newValue === null) {
                delete this.dataset[dataProperty];
            }
            else {
                this.dataset[dataProperty] = newValue;
            }
            this.requestUpdate(ariaAttributeToDataProperty(name), oldValue);
        }
        getAttribute(name) {
            if (isAriaAttribute(name)) {
                return super.getAttribute(ariaAttributeToDataAttribute(name));
            }
            return super.getAttribute(name);
        }
        removeAttribute(name) {
            super.removeAttribute(name);
            if (isAriaAttribute(name)) {
                super.removeAttribute(ariaAttributeToDataAttribute(name));
                // Since `aria-*` attributes are already removed`, we need to request
                // an update because `attributeChangedCallback` will not be called.
                this.requestUpdate();
            }
        }
    }
    _a = privateIgnoreAttributeChangesFor;
    setupDelegatesAriaProperties(WithDelegatesAriaElement);
    return WithDelegatesAriaElement;
}
/**
 * Overrides the constructor's native `ARIAMixin` properties to ensure that
 * aria properties reflect the values that were shifted to a data attribute.
 *
 * @param ctor The `ReactiveElement` constructor to patch.
 */
function setupDelegatesAriaProperties(ctor) {
    for (const ariaProperty of ARIA_PROPERTIES) {
        // The casing between ariaProperty and the dataProperty may be different.
        // ex: aria-haspopup -> ariaHasPopup
        const ariaAttribute = ariaPropertyToAttribute(ariaProperty);
        // ex: aria-haspopup -> data-aria-haspopup
        const dataAttribute = ariaAttributeToDataAttribute(ariaAttribute);
        // ex: aria-haspopup -> dataset.ariaHaspopup
        const dataProperty = ariaAttributeToDataProperty(ariaAttribute);
        // Call `ReactiveElement.createProperty()` so that the `aria-*` and `data-*`
        // attributes are added to the `static observedAttributes` array. This
        // triggers `attributeChangedCallback` for the delegates aria mixin to
        // handle.
        ctor.createProperty(ariaProperty, {
            attribute: ariaAttribute,
            noAccessor: true,
        });
        ctor.createProperty(Symbol(dataAttribute), {
            attribute: dataAttribute,
            noAccessor: true,
        });
        // Re-define the `ARIAMixin` properties to handle data attribute shifting.
        // It is safe to use `Object.defineProperty` here because the properties
        // are native and not renamed.
        // tslint:disable-next-line:ban-unsafe-reflection
        Object.defineProperty(ctor.prototype, ariaProperty, {
            configurable: true,
            enumerable: true,
            get() {
                return this.dataset[dataProperty] ?? null;
            },
            set(value) {
                const prevValue = this.dataset[dataProperty] ?? null;
                if (value === prevValue) {
                    return;
                }
                if (value === null) {
                    delete this.dataset[dataProperty];
                }
                else {
                    this.dataset[dataProperty] = value;
                }
                this.requestUpdate(ariaProperty, prevValue);
            },
        });
    }
}
function ariaAttributeToDataAttribute(ariaAttribute) {
    // aria-haspopup -> data-aria-haspopup
    return `data-${ariaAttribute}`;
}
function ariaAttributeToDataProperty(ariaAttribute) {
    // aria-haspopup -> dataset.ariaHaspopup
    return ariaAttribute.replace(/-\w/, (dashLetter) => dashLetter[1].toUpperCase());
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// Separate variable needed for closure.
const chipBaseClass = mixinDelegatesAria(i$1);
/**
 * A chip component.
 *
 * @fires update-focus {Event} Dispatched when `disabled` is toggled. --bubbles
 */
class Chip extends chipBaseClass {
    /**
     * Whether or not the primary ripple is disabled (defaults to `disabled`).
     * Some chip actions such as links cannot be disabled.
     */
    get rippleDisabled() {
        return this.disabled || this.softDisabled;
    }
    constructor() {
        super();
        /**
         * Whether or not the chip is disabled.
         *
         * Disabled chips are not focusable, unless `always-focusable` is set.
         */
        this.disabled = false;
        /**
         * Whether or not the chip is "soft-disabled" (disabled but still
         * focusable).
         *
         * Use this when a chip needs increased visibility when disabled. See
         * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls
         * for more guidance on when this is needed.
         */
        this.softDisabled = false;
        /**
         * When true, allow disabled chips to be focused with arrow keys.
         *
         * Add this when a chip needs increased visibility when disabled. See
         * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls
         * for more guidance on when this is needed.
         *
         * @deprecated Use `softDisabled` instead of `alwaysFocusable` + `disabled`.
         */
        this.alwaysFocusable = false;
        // TODO(b/350810013): remove the label property.
        /**
         * The label of the chip.
         *
         * @deprecated Set text as content of the chip instead.
         */
        this.label = '';
        /**
         * Only needed for SSR.
         *
         * Add this attribute when a chip has a `slot="icon"` to avoid a Flash Of
         * Unstyled Content.
         */
        this.hasIcon = false;
        {
            this.addEventListener('click', this.handleClick.bind(this));
        }
    }
    focus(options) {
        if (this.disabled && !this.alwaysFocusable) {
            return;
        }
        super.focus(options);
    }
    render() {
        return x `
      <div class="container ${e(this.getContainerClasses())}">
        ${this.renderContainerContent()}
      </div>
    `;
    }
    updated(changed) {
        if (changed.has('disabled') && changed.get('disabled') !== undefined) {
            this.dispatchEvent(new Event('update-focus', { bubbles: true }));
        }
    }
    getContainerClasses() {
        return {
            'disabled': this.disabled || this.softDisabled,
            'has-icon': this.hasIcon,
        };
    }
    renderContainerContent() {
        return x `
      ${this.renderOutline()}
      <md-focus-ring part="focus-ring" for=${this.primaryId}></md-focus-ring>
      <md-ripple
        for=${this.primaryId}
        ?disabled=${this.rippleDisabled}></md-ripple>
      ${this.renderPrimaryAction(this.renderPrimaryContent())}
    `;
    }
    renderOutline() {
        return x `<span class="outline"></span>`;
    }
    renderLeadingIcon() {
        return x `<slot name="icon" @slotchange=${this.handleIconChange}></slot>`;
    }
    renderPrimaryContent() {
        return x `
      <span class="leading icon" aria-hidden="true">
        ${this.renderLeadingIcon()}
      </span>
      <span class="label">
        <span class="label-text" id="label">
          ${this.label ? this.label : x `<slot></slot>`}
        </span>
      </span>
      <span class="touch"></span>
    `;
    }
    handleIconChange(event) {
        const slot = event.target;
        this.hasIcon = slot.assignedElements({ flatten: true }).length > 0;
    }
    handleClick(event) {
        // If the chip is soft-disabled or disabled + always-focusable, we need to
        // explicitly prevent the click from propagating to other event listeners
        // as well as prevent the default action.
        if (this.softDisabled || (this.disabled && this.alwaysFocusable)) {
            event.stopImmediatePropagation();
            event.preventDefault();
            return;
        }
    }
}
/** @nocollapse */
Chip.shadowRootOptions = {
    ...i$1.shadowRootOptions,
    delegatesFocus: true,
};
__decorate([
    n({ type: Boolean, reflect: true })
], Chip.prototype, "disabled", void 0);
__decorate([
    n({ type: Boolean, attribute: 'soft-disabled', reflect: true })
], Chip.prototype, "softDisabled", void 0);
__decorate([
    n({ type: Boolean, attribute: 'always-focusable' })
], Chip.prototype, "alwaysFocusable", void 0);
__decorate([
    n()
], Chip.prototype, "label", void 0);
__decorate([
    n({ type: Boolean, reflect: true, attribute: 'has-icon' })
], Chip.prototype, "hasIcon", void 0);

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A chip set component.
 */
class ChipSet extends i$1 {
    get chips() {
        return this.childElements.filter((child) => child instanceof Chip);
    }
    constructor() {
        super();
        this.internals = 
        // Cast needed for closure
        this.attachInternals();
        {
            this.addEventListener('focusin', this.updateTabIndices.bind(this));
            this.addEventListener('update-focus', this.updateTabIndices.bind(this));
            this.addEventListener('keydown', this.handleKeyDown.bind(this));
            this.internals.role = 'toolbar';
        }
    }
    render() {
        return x `<slot @slotchange=${this.updateTabIndices}></slot>`;
    }
    handleKeyDown(event) {
        const isLeft = event.key === 'ArrowLeft';
        const isRight = event.key === 'ArrowRight';
        const isHome = event.key === 'Home';
        const isEnd = event.key === 'End';
        // Ignore non-navigation keys
        if (!isLeft && !isRight && !isHome && !isEnd) {
            return;
        }
        const { chips } = this;
        // Don't try to select another chip if there aren't any.
        if (chips.length < 2) {
            return;
        }
        // Prevent default interactions, such as scrolling.
        event.preventDefault();
        if (isHome || isEnd) {
            const index = isHome ? 0 : chips.length - 1;
            chips[index].focus({ trailing: isEnd });
            this.updateTabIndices();
            return;
        }
        // Check if moving forwards or backwards
        const isRtl = getComputedStyle(this).direction === 'rtl';
        const forwards = isRtl ? isLeft : isRight;
        const focusedChip = chips.find((chip) => chip.matches(':focus-within'));
        if (!focusedChip) {
            // If there is not already a chip focused, select the first or last chip
            // based on the direction we're traveling.
            const nextChip = forwards ? chips[0] : chips[chips.length - 1];
            nextChip.focus({ trailing: !forwards });
            this.updateTabIndices();
            return;
        }
        const currentIndex = chips.indexOf(focusedChip);
        let nextIndex = forwards ? currentIndex + 1 : currentIndex - 1;
        // Search for the next sibling that is not disabled to select.
        // If we return to the host index, there is nothing to select.
        while (nextIndex !== currentIndex) {
            if (nextIndex >= chips.length) {
                // Return to start if moving past the last item.
                nextIndex = 0;
            }
            else if (nextIndex < 0) {
                // Go to end if moving before the first item.
                nextIndex = chips.length - 1;
            }
            // Check if the next sibling is disabled. If so,
            // move the index and continue searching.
            //
            // Some toolbar items may be focusable when disabled for increased
            // visibility.
            const nextChip = chips[nextIndex];
            if (nextChip.disabled && !nextChip.alwaysFocusable) {
                if (forwards) {
                    nextIndex++;
                }
                else {
                    nextIndex--;
                }
                continue;
            }
            nextChip.focus({ trailing: !forwards });
            this.updateTabIndices();
            break;
        }
    }
    updateTabIndices() {
        // The chip that should be focusable is either the chip that currently has
        // focus or the first chip that can be focused.
        const { chips } = this;
        let chipToFocus;
        for (const chip of chips) {
            const isChipFocusable = chip.alwaysFocusable || !chip.disabled;
            const chipIsFocused = chip.matches(':focus-within');
            if (chipIsFocused && isChipFocusable) {
                // Found the first chip that is actively focused. This overrides the
                // first focusable chip found.
                chipToFocus = chip;
                continue;
            }
            if (isChipFocusable && !chipToFocus) {
                chipToFocus = chip;
            }
            // Disable non-focused chips. If we disable all of them, we'll grant focus
            // to the first focusable child that was found.
            chip.tabIndex = -1;
        }
        if (chipToFocus) {
            chipToFocus.tabIndex = 0;
        }
    }
}
__decorate([
    o()
], ChipSet.prototype, "childElements", void 0);

/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$6 = i$4 `:host{display:flex;flex-wrap:wrap;gap:8px}
`;

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * TODO(b/243982145): add docs
 *
 * @final
 * @suppress {visibility}
 */
let MdChipSet = class MdChipSet extends ChipSet {
};
MdChipSet.styles = [styles$6];
MdChipSet = __decorate([
    t$1('md-chip-set')
], MdChipSet);

var chipSet = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get MdChipSet () { return MdChipSet; }
});

/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$5 = i$4 `.elevated{--md-elevation-level: var(--_elevated-container-elevation);--md-elevation-shadow-color: var(--_elevated-container-shadow-color)}.elevated::before{background:var(--_elevated-container-color)}.elevated:hover{--md-elevation-level: var(--_elevated-hover-container-elevation)}.elevated:focus-within{--md-elevation-level: var(--_elevated-focus-container-elevation)}.elevated:active{--md-elevation-level: var(--_elevated-pressed-container-elevation)}.elevated.disabled{--md-elevation-level: var(--_elevated-disabled-container-elevation)}.elevated.disabled::before{background:var(--_elevated-disabled-container-color);opacity:var(--_elevated-disabled-container-opacity)}@media(forced-colors: active){.elevated md-elevation{border:1px solid CanvasText}.elevated.disabled md-elevation{border-color:GrayText}}
`;

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A component for elevation.
 */
class Elevation extends i$1 {
    connectedCallback() {
        super.connectedCallback();
        // Needed for VoiceOver, which will create a "group" if the element is a
        // sibling to other content.
        this.setAttribute('aria-hidden', 'true');
    }
    render() {
        return x `<span class="shadow"></span>`;
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$4 = i$4 `:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The `<md-elevation>` custom element with default styles.
 *
 * Elevation is the relative distance between two surfaces along the z-axis.
 *
 * @final
 * @suppress {visibility}
 */
let MdElevation = class MdElevation extends Elevation {
};
MdElevation.styles = [styles$4];
MdElevation = __decorate([
    t$1('md-elevation')
], MdElevation);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Re-dispatches an event from the provided element.
 *
 * This function is useful for forwarding non-composed events, such as `change`
 * events.
 *
 * @example
 * class MyInput extends LitElement {
 *   render() {
 *     return html`<input @change=${this.redispatchEvent}>`;
 *   }
 *
 *   protected redispatchEvent(event: Event) {
 *     redispatchEvent(this, event);
 *   }
 * }
 *
 * @param element The element to dispatch the event from.
 * @param event The event to re-dispatch.
 * @return Whether or not the event was dispatched (if cancelable).
 */
function redispatchEvent(element, event) {
    // For bubbling events in SSR light DOM (or composed), stop their propagation
    // and dispatch the copy.
    if (event.bubbles && (!element.shadowRoot || event.composed)) {
        event.stopPropagation();
    }
    const copy = Reflect.construct(event.constructor, [event.type, event]);
    const dispatched = element.dispatchEvent(copy);
    if (!dispatched) {
        event.preventDefault();
    }
    return dispatched;
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const ARIA_LABEL_REMOVE = 'aria-label-remove';
/**
 * A chip component with multiple actions.
 */
class MultiActionChip extends Chip {
    get ariaLabelRemove() {
        if (this.hasAttribute(ARIA_LABEL_REMOVE)) {
            return this.getAttribute(ARIA_LABEL_REMOVE);
        }
        const { ariaLabel } = this;
        // TODO(b/350810013): remove `this.label` when label property is removed.
        if (ariaLabel || this.label) {
            return `Remove ${ariaLabel || this.label}`;
        }
        return null;
    }
    set ariaLabelRemove(ariaLabel) {
        const prev = this.ariaLabelRemove;
        if (ariaLabel === prev) {
            return;
        }
        if (ariaLabel === null) {
            this.removeAttribute(ARIA_LABEL_REMOVE);
        }
        else {
            this.setAttribute(ARIA_LABEL_REMOVE, ariaLabel);
        }
        this.requestUpdate();
    }
    constructor() {
        super();
        this.handleTrailingActionFocus = this.handleTrailingActionFocus.bind(this);
        {
            this.addEventListener('keydown', this.handleKeyDown.bind(this));
        }
    }
    focus(options) {
        const isFocusable = this.alwaysFocusable || !this.disabled;
        if (isFocusable && options?.trailing && this.trailingAction) {
            this.trailingAction.focus(options);
            return;
        }
        super.focus(options);
    }
    renderContainerContent() {
        return x `
      ${super.renderContainerContent()}
      ${this.renderTrailingAction(this.handleTrailingActionFocus)}
    `;
    }
    handleKeyDown(event) {
        const isLeft = event.key === 'ArrowLeft';
        const isRight = event.key === 'ArrowRight';
        // Ignore non-navigation keys.
        if (!isLeft && !isRight) {
            return;
        }
        if (!this.primaryAction || !this.trailingAction) {
            // Does not have multiple actions.
            return;
        }
        // Check if moving forwards or backwards
        const isRtl = getComputedStyle(this).direction === 'rtl';
        const forwards = isRtl ? isLeft : isRight;
        const isPrimaryFocused = this.primaryAction?.matches(':focus-within');
        const isTrailingFocused = this.trailingAction?.matches(':focus-within');
        if ((forwards && isTrailingFocused) || (!forwards && isPrimaryFocused)) {
            // Moving outside of the chip, it will be handled by the chip set.
            return;
        }
        // Prevent default interactions, such as scrolling.
        event.preventDefault();
        // Don't let the chip set handle this navigation event.
        event.stopPropagation();
        const actionToFocus = forwards ? this.trailingAction : this.primaryAction;
        actionToFocus.focus();
    }
    handleTrailingActionFocus() {
        const { primaryAction, trailingAction } = this;
        if (!primaryAction || !trailingAction) {
            return;
        }
        // Temporarily turn off the primary action's focusability. This allows
        // shift+tab from the trailing action to move to the previous chip rather
        // than the primary action in the same chip.
        primaryAction.tabIndex = -1;
        trailingAction.addEventListener('focusout', () => {
            primaryAction.tabIndex = 0;
        }, { once: true });
    }
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @protected */
function renderRemoveButton({ ariaLabel, disabled, focusListener, tabbable = false, }) {
    // When an aria-label is not provided, we use two spans with aria-labelledby
    // to create the "Remove <textContent>" label for the remove button. The first
    // is this #remove-label span, the second is the chip's #label slot span.
    return x `
    <span id="remove-label" hidden aria-hidden="true">Remove</span>
    <button
      class="trailing action"
      aria-label=${ariaLabel || E}
      aria-labelledby=${!ariaLabel ? 'remove-label label' : E}
      tabindex=${!tabbable ? -1 : E}
      @click=${handleRemoveClick}
      @focus=${focusListener}>
      <md-focus-ring part="trailing-focus-ring"></md-focus-ring>
      <md-ripple ?disabled=${disabled}></md-ripple>
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
  `;
}
function handleRemoveClick(event) {
    if (this.disabled || this.softDisabled) {
        return;
    }
    event.stopPropagation();
    const preventDefault = !this.dispatchEvent(new Event('remove', { cancelable: true }));
    if (preventDefault) {
        return;
    }
    this.remove();
}

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A filter chip component.
 *
 * @fires remove {Event} Dispatched when the remove button is clicked.
 */
class FilterChip extends MultiActionChip {
    constructor() {
        super(...arguments);
        this.elevated = false;
        this.removable = false;
        this.selected = false;
        /**
         * Only needed for SSR.
         *
         * Add this attribute when a filter chip has a `slot="selected-icon"` to avoid
         * a Flash Of Unstyled Content.
         */
        this.hasSelectedIcon = false;
    }
    get primaryId() {
        return 'button';
    }
    getContainerClasses() {
        return {
            ...super.getContainerClasses(),
            elevated: this.elevated,
            selected: this.selected,
            'has-trailing': this.removable,
            'has-icon': this.hasIcon || this.selected,
        };
    }
    renderPrimaryAction(content) {
        const { ariaLabel } = this;
        return x `
      <button
        class="primary action"
        id="button"
        aria-label=${ariaLabel || E}
        aria-pressed=${this.selected}
        aria-disabled=${this.softDisabled || E}
        ?disabled=${this.disabled && !this.alwaysFocusable}
        @click=${this.handleClickOnChild}
        >${content}</button
      >
    `;
    }
    renderLeadingIcon() {
        if (!this.selected) {
            return super.renderLeadingIcon();
        }
        return x `
      <slot name="selected-icon">
        <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
        </svg>
      </slot>
    `;
    }
    renderTrailingAction(focusListener) {
        if (this.removable) {
            return renderRemoveButton({
                focusListener,
                ariaLabel: this.ariaLabelRemove,
                disabled: this.disabled || this.softDisabled,
            });
        }
        return E;
    }
    renderOutline() {
        if (this.elevated) {
            return x `<md-elevation part="elevation"></md-elevation>`;
        }
        return super.renderOutline();
    }
    handleClickOnChild(event) {
        if (this.disabled || this.softDisabled) {
            return;
        }
        // Store prevValue to revert in case `chip.selected` is changed during an
        // event listener.
        const prevValue = this.selected;
        this.selected = !this.selected;
        const preventDefault = !redispatchEvent(this, event);
        if (preventDefault) {
            // We should not do `this.selected = !this.selected`, since a client
            // click listener could change its value. Instead, always revert to the
            // original value.
            this.selected = prevValue;
            return;
        }
    }
}
__decorate([
    n({ type: Boolean })
], FilterChip.prototype, "elevated", void 0);
__decorate([
    n({ type: Boolean })
], FilterChip.prototype, "removable", void 0);
__decorate([
    n({ type: Boolean, reflect: true })
], FilterChip.prototype, "selected", void 0);
__decorate([
    n({ type: Boolean, reflect: true, attribute: 'has-selected-icon' })
], FilterChip.prototype, "hasSelectedIcon", void 0);
__decorate([
    e$2('.primary.action')
], FilterChip.prototype, "primaryAction", void 0);
__decorate([
    e$2('.trailing.action')
], FilterChip.prototype, "trailingAction", void 0);

/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$3 = i$4 `:host{--_container-height: var(--md-filter-chip-container-height, 32px);--_disabled-label-text-color: var(--md-filter-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filter-chip-disabled-label-text-opacity, 0.38);--_elevated-container-elevation: var(--md-filter-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-filter-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-filter-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-filter-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-filter-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-filter-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-filter-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-filter-chip-elevated-pressed-container-elevation, 1);--_elevated-selected-container-color: var(--md-filter-chip-elevated-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_label-text-font: var(--md-filter-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filter-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filter-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filter-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_selected-focus-label-text-color: var(--md-filter-chip-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-filter-chip-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-filter-chip-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-opacity: var(--md-filter-chip-selected-hover-state-layer-opacity, 0.08);--_selected-label-text-color: var(--md-filter-chip-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-filter-chip-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-filter-chip-selected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_selected-pressed-state-layer-opacity: var(--md-filter-chip-selected-pressed-state-layer-opacity, 0.12);--_elevated-container-color: var(--md-filter-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_disabled-outline-color: var(--md-filter-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-filter-chip-disabled-outline-opacity, 0.12);--_disabled-selected-container-color: var(--md-filter-chip-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-filter-chip-disabled-selected-container-opacity, 0.12);--_focus-outline-color: var(--md-filter-chip-focus-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-filter-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-filter-chip-outline-width, 1px);--_selected-container-color: var(--md-filter-chip-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-outline-width: var(--md-filter-chip-selected-outline-width, 0px);--_focus-label-text-color: var(--md-filter-chip-focus-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-filter-chip-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filter-chip-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-filter-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filter-chip-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-filter-chip-pressed-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-filter-chip-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filter-chip-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-filter-chip-icon-size, 18px);--_disabled-leading-icon-color: var(--md-filter-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filter-chip-disabled-leading-icon-opacity, 0.38);--_selected-focus-leading-icon-color: var(--md-filter-chip-selected-focus-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-leading-icon-color: var(--md-filter-chip-selected-hover-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-leading-icon-color: var(--md-filter-chip-selected-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-leading-icon-color: var(--md-filter-chip-selected-pressed-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-leading-icon-color: var(--md-filter-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-filter-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-filter-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-leading-icon-color: var(--md-filter-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_disabled-trailing-icon-color: var(--md-filter-chip-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filter-chip-disabled-trailing-icon-opacity, 0.38);--_selected-focus-trailing-icon-color: var(--md-filter-chip-selected-focus-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-trailing-icon-color: var(--md-filter-chip-selected-hover-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-trailing-icon-color: var(--md-filter-chip-selected-pressed-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-trailing-icon-color: var(--md-filter-chip-selected-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-trailing-icon-color: var(--md-filter-chip-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filter-chip-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-trailing-icon-color: var(--md-filter-chip-pressed-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-color: var(--md-filter-chip-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-filter-chip-container-shape-start-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-filter-chip-container-shape-start-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-filter-chip-container-shape-end-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-filter-chip-container-shape-end-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-filter-chip-leading-space, 16px);--_trailing-space: var(--md-filter-chip-trailing-space, 16px);--_icon-label-space: var(--md-filter-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-filter-chip-with-leading-icon-leading-space, 8px);--_with-trailing-icon-trailing-space: var(--md-filter-chip-with-trailing-icon-trailing-space, 8px)}.selected.elevated::before{background:var(--_elevated-selected-container-color)}.checkmark{height:var(--_icon-size);width:var(--_icon-size)}.disabled .checkmark{opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){.disabled .checkmark{opacity:1}}
`;

/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$2 = i$4 `.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}:where(.selected)::before{background:var(--_selected-container-color)}:where(.selected) .outline{border-width:var(--_selected-outline-width)}:where(.selected.disabled)::before{background:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}:where(.selected) .label{color:var(--_selected-label-text-color)}:where(.selected:hover) .label{color:var(--_selected-hover-label-text-color)}:where(.selected:focus) .label{color:var(--_selected-focus-label-text-color)}:where(.selected:active) .label{color:var(--_selected-pressed-label-text-color)}:where(.selected) .leading.icon{color:var(--_selected-leading-icon-color)}:where(.selected:hover) .leading.icon{color:var(--_selected-hover-leading-icon-color)}:where(.selected:focus) .leading.icon{color:var(--_selected-focus-leading-icon-color)}:where(.selected:active) .leading.icon{color:var(--_selected-pressed-leading-icon-color)}@media(forced-colors: active){:where(.selected:not(.elevated))::before{border:1px solid CanvasText}:where(.selected) .outline{border-width:1px}}
`;

/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles$1 = i$4 `:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);display:inline-flex;height:var(--_container-height);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host(:is([disabled],[soft-disabled])){pointer-events:none}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.container{border-radius:inherit;box-sizing:border-box;display:flex;height:100%;position:relative;width:100%}.container::before{border-radius:inherit;content:"";inset:0;pointer-events:none;position:absolute}.container:not(.disabled){cursor:pointer}.container.disabled{pointer-events:none}.cell{display:flex}.action{align-items:baseline;appearance:none;background:none;border:none;border-radius:inherit;display:flex;outline:none;padding:0;position:relative;text-decoration:none}.primary.action{min-width:0;padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space)}.has-icon .primary.action{padding-inline-start:var(--_with-leading-icon-leading-space)}.touch{height:48px;inset:50% 0 0;position:absolute;transform:translateY(-50%);width:100%}:host([touch-target=none]) .touch{display:none}.outline{border:var(--_outline-width) solid var(--_outline-color);border-radius:inherit;inset:0;pointer-events:none;position:absolute}:where(:focus) .outline{border-color:var(--_focus-outline-color)}:where(.disabled) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}md-ripple{border-radius:inherit}.label,.icon,.touch{z-index:1}.label{align-items:center;color:var(--_label-text-color);display:flex;font-family:var(--_label-text-font);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);height:100%;line-height:var(--_label-text-line-height);overflow:hidden;user-select:none}.label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:where(:hover) .label{color:var(--_hover-label-text-color)}:where(:focus) .label{color:var(--_focus-label-text-color)}:where(:active) .label{color:var(--_pressed-label-text-color)}:where(.disabled) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.icon{align-self:center;display:flex;fill:currentColor;position:relative}.icon ::slotted(:first-child){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.leading.icon{color:var(--_leading-icon-color)}.leading.icon ::slotted(*),.leading.icon svg{margin-inline-end:var(--_icon-label-space)}:where(:hover) .leading.icon{color:var(--_hover-leading-icon-color)}:where(:focus) .leading.icon{color:var(--_focus-leading-icon-color)}:where(:active) .leading.icon{color:var(--_pressed-leading-icon-color)}:where(.disabled) .leading.icon{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){:where(.disabled) :is(.label,.outline,.leading.icon){color:GrayText;opacity:1}}a,button{text-transform:inherit}a,button:not(:disabled,[aria-disabled=true]){cursor:inherit}
`;

/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const styles = i$4 `.trailing.action{align-items:center;justify-content:center;padding-inline-start:var(--_icon-label-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}.trailing.action :is(md-ripple,md-focus-ring){border-radius:50%;height:calc(1.3333333333*var(--_icon-size));width:calc(1.3333333333*var(--_icon-size))}.trailing.action md-focus-ring{inset:unset}.has-trailing .primary.action{padding-inline-end:0}.trailing.icon{color:var(--_trailing-icon-color);height:var(--_icon-size);width:var(--_icon-size)}:where(:hover) .trailing.icon{color:var(--_hover-trailing-icon-color)}:where(:focus) .trailing.icon{color:var(--_focus-trailing-icon-color)}:where(:active) .trailing.icon{color:var(--_pressed-trailing-icon-color)}:where(.disabled) .trailing.icon{color:var(--_disabled-trailing-icon-color);opacity:var(--_disabled-trailing-icon-opacity)}:where(.selected) .trailing.icon{color:var(--_selected-trailing-icon-color)}:where(.selected:hover) .trailing.icon{color:var(--_selected-hover-trailing-icon-color)}:where(.selected:focus) .trailing.icon{color:var(--_selected-focus-trailing-icon-color)}:where(.selected:active) .trailing.icon{color:var(--_selected-pressed-trailing-icon-color)}@media(forced-colors: active){.trailing.icon{color:ButtonText}:where(.disabled) .trailing.icon{color:GrayText;opacity:1}}
`;

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * TODO(b/243982145): add docs
 *
 * @final
 * @suppress {visibility}
 */
let MdFilterChip = class MdFilterChip extends FilterChip {
};
MdFilterChip.styles = [
    styles$1,
    styles$5,
    styles,
    styles$2,
    styles$3,
];
MdFilterChip = __decorate([
    t$1('md-filter-chip')
], MdFilterChip);

var filterChip = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get MdFilterChip () { return MdFilterChip; }
});

export { BubbleRoom };
