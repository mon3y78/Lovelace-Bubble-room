/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;class n$2{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b={attribute:!0,type:String,converter:u$1,reflect:!1,useDefault:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class y$1 extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}}y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$1="?"+h,n=`<${o$1}>`,r=document,l=()=>r.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$1)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t.litHtmlPolyfillSupport;j?.(N,R),(t.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}}i._$litElement$=!0,i["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.1");

const FILTERS = {
  presence: {
    includeDomains: ['person','device_tracker','binary_sensor','light','switch','media_player','fan','humidifier','lock','input_boolean','scene'],
    includeDeviceClasses: ['motion','occupancy','presence'],
    entityFilter: (state, hass) => {
      const id = typeof state === 'string' ? state : state?.entity_id;
      if (!id) return false;
      const [domain] = id.split('.');
      if (domain === 'binary_sensor') {
        const dc = hass?.states?.[id]?.attributes?.device_class;
        return ['motion','occupancy','presence'].includes(dc);
      }
      return true;
    },
  },

  sensorByType: (type) => ({
    includeDomains: ['sensor'],
    includeDeviceClasses: undefined,
    entityFilter: (state, hass) => {
      const id = typeof state === 'string' ? state : state?.entity_id;
      if (!id) return false;
      // In futuro si può filtrare per device_class a seconda del type
      return true;
    },
  }),

  subbutton: {
    includeDomains: ['light','switch','media_player','fan','cover','humidifier','lock','scene','input_boolean','script','button'],
    entityFilter: () => true,
  },

  mushroom: {
    includeDomains: ['light','switch','media_player','fan','cover','humidifier','lock','scene','input_boolean','script','button','sensor','binary_sensor','climate'],
    entityFilter: () => true,
  },
};


/**
 * Build a concrete list of entity_ids for a given section,
 * applying domain / device_class filters from FILTERS and
 * the Area filter from the current card config.
 *
 * Usage examples:
 *   candidatesFor(hass, config, 'presence')
 *   candidatesFor(hass, config, { section: 'sensor', type })
 */
function candidatesFor(hass, config, sectionOrOpts) {
  const opts = typeof sectionOrOpts === 'string'
    ? { section: sectionOrOpts }
    : (sectionOrOpts || {});
  const section = opts.section;
  if (!hass || !hass.states || !section) return [];

  // Select filter descriptor
  let desc;
  if (section === 'sensor') {
    const t = opts.type;
    desc = FILTERS.sensorByType ? FILTERS.sensorByType(t) : FILTERS.sensor;
  } else {
    desc = FILTERS[section];
  }
  if (!desc) return [];

  const includeDomains = desc.includeDomains || [];
  desc.includeDeviceClasses || [];
  const entityFilter = desc.entityFilter || (() => true);

  const allIds = Object.keys(hass.states);
  const byDomain = includeDomains.length
    ? allIds.filter((id) => includeDomains.includes(id.split('.')[0]))
    : allIds.slice();

  const byDesc = byDomain.filter((id) => entityFilter(id, hass));

  const area = config?.area;
  let res = byDesc;
  if (area) {
    const inArea = byDesc.filter((id) => {
      const st = hass.states[id];
      const a1 = st?.attributes?.area_id;
      const a2 = st?.attributes?.area;
      return a1 === area || a2 === area;
    });
    if (inArea.length) res = inArea;
  }

  return res;
}

class RoomPanel extends i {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this._expanded = false;
  }

  static styles = i$3`
    :host { display: block; }
    .glass-panel {
      margin: 0 !important;
      width: 100%;
      box-sizing: border-box;
      border-radius: 40px;
      position: relative;
      border: none;
      z-index: 0;
      --glass-bg: rgba(73,164,255,0.38);
      --glass-shadow: 0 2px 24px 0 rgba(50,180,255,0.25);
      --glass-sheen: linear-gradient(120deg,rgba(255,255,255,0.26),rgba(255,255,255,0.11) 70%,transparent 100%);
      background: var(--glass-bg);
      box-shadow: var(--glass-shadow);
    }
    .glass-panel::after {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      background: var(--glass-sheen); pointer-events: none; z-index:0;
    }
    .glass-header {
      position: relative; z-index: 1; background: none!important; box-shadow:none!important;
      padding: 22px 0 18px; margin:0; text-align:center;
      font-size:1.2rem; font-weight:700; color:#fff;
    }
    .mini-pill {
      background: rgba(44,70,100,0.23);
      border: 1.5px solid rgba(255,255,255,0.12);
      box-shadow: 0 3px 22px 0 rgba(70,120,220,0.13);
      backdrop-filter: blur(10px) saturate(1.2);
      border-radius: 24px;
      margin-bottom:18px;
      overflow:hidden;
    }
    .mini-pill-header {
      display:flex; align-items:center; padding:15px 22px;
      font-size:1.09em; font-family:'Inter',sans-serif; font-weight:800;
      color:#55afff; cursor:pointer; user-select:none; position:relative; z-index:1;
    }
    .mini-pill-header .chevron { margin-left:auto; font-size:1.22em; opacity:0.64; transition:transform 0.18s; }
    .mini-pill.expanded .mini-pill-header .chevron { transform: rotate(90deg); }
    .mini-pill-content {
      padding:15px 22px; background:transparent; position:relative; z-index:1;
    }
    .autodiscover-box {
      margin:0 auto 18px; padding:18px 0; display:flex; align-items:center; justify-content:center;
      font-size:1.17rem; color:#fff; font-weight:700; letter-spacing:0.02em; cursor:pointer;
      border:2.5px solid #FFD600; box-shadow:0 2px 24px 0 #FFD60033;
      border-radius:24px; backdrop-filter: blur(7px) saturate(1.2);
    }
    .input-group {
      background: rgba(44,70,100,0.23);
      border:1.5px solid rgba(255,255,255,0.13);
      box-shadow:0 2px 14px 0 rgba(70,120,220,0.10);
      border-radius:18px; margin-bottom:13px; padding:14px 18px 10px;
    }
    label { display:block; font-size:1.13rem; font-weight:700; color:#55afff; margin-bottom:6px; }
    input[type="text"] {
      width:100%; border:1px solid #444; border-radius:6px; padding:8px;
      background:#202020; color:#f1f1f1; font-size:0.97rem;
    }
  `;

  render() {
    return x`
      <ha-expansion-panel
        class="glass-panel"
        .expanded="${this._expanded}"
        @expanded-changed="${e => this._expanded = e.detail.expanded}"
      >
        <div slot="header" class="glass-header">🛋️ Room Settings 2</div>
        <div class="mini-pill expanded">
          <div class="mini-pill-header">Room</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room name:</label>
              <input type="text" .value="${this.config.name||''}" @input="${this._updateName}">
            </div>
            <div class="input-group">
              <label>Area:</label>
              <ha-area-picker
                .hass="${this.hass}"
                .value="${this.config.area||''}"
                @value-changed="${this._updateArea}"
              ></ha-area-picker>
            </div>
          </div>
        </div>

        <div class="mini-pill expanded">
          <div class="mini-pill-header">Icon</div>
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Room Icon:</label>
              <ha-icon-picker
                .hass="${this.hass}"
                .value="${this.config.icon||''}"
                allow-custom-icon
                @value-changed="${this._updateIcon}"
              ></ha-icon-picker>
            </div>
            <div class="input-group">
              <label>Presence (ID):</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${this.config.entities?.presence?.entity || this.config.presence_entity || ''}
                .includeEntities=${candidatesFor(this.hass, this.config, 'presence')}
                allow-custom-entity
                @value-changed=${e=>this._emit('entities.presence.entity', e.detail.value)}
              ></ha-entity-picker>
            </div>
            <!-- tap/hold actions -->
            ${this._renderActions('tap')}
            ${this._renderActions('hold')}
          </div>
        </div>

        <div style="text-align:center; margin-top:1.2em;">
          <button class="reset-button" @click="${this._reset}">🧹 Reset Room</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _updateName(e) {
    this._fire('name', e.target.value);
  }
  _updateArea(e) {
    this._fire('area', e.detail.value);
  }
  _updateIcon(e) {
    this._fire('icon', e.detail.value);
  }
  _updateEntity(key, val) {
    this._fire(`entities.${key}.entity`, val);
  }
  _renderActions(type) {
    this.config[`${type}_action`] || {};
    const labels = { tap: 'Tap', hold: 'Hold' };
    return x`
      <div class="input-group">
        <label>${labels[type]} Action:</label>
        <!-- replica esattamente il _renderTapHoldAction del sorgente -->
        ...qui copi esattamente il blocco di codice di ${type} come in originale...
      </div>
    `;
  }
  _reset() {
    this._fire('resetRoom', true);
  }
  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val }, bubbles: true, composed: true
    }));
  }
}

customElements.define('room-panel', RoomPanel);

/**
 * sensor-mapping.js
 * 
 * Mappa centralizzata dei tipi di sensori, unità e relative proprietà visuali.
 * File completo e chiuso.
 */

const SENSOR_TYPES = [
  { type: 'temperature', label: 'Temperature', emoji: '🌡️', icon: 'mdi:thermometer', unit: '°C' },
  { type: 'humidity',    label: 'Humidity',    emoji: '💧',  icon: 'mdi:water-percent', unit: '%' },
  { type: 'co2',         label: 'CO2',         emoji: '🟩',  icon: 'mdi:molecule-co2',  unit: 'ppm' },
  { type: 'lux',         label: 'Luminosity',  emoji: '🔆',  icon: 'mdi:brightness-5',  unit: 'lx' },
  { type: 'uv',          label: 'UV Index',    emoji: '🌞',  icon: 'mdi:weather-sunny-alert', unit: 'UV' },
  { type: 'pressure',    label: 'Pressure',    emoji: '⏲️',  icon: 'mdi:gauge', unit: 'hPa' },
  { type: 'noise',       label: 'Noise',       emoji: '🔊',  icon: 'mdi:volume-high', unit: 'dB' },
  { type: 'pm25',        label: 'PM2.5',       emoji: '🌫️',  icon: 'mdi:blur', unit: 'µg/m³' },
  { type: 'pm10',        label: 'PM10',        emoji: '🌫️',  icon: 'mdi:blur-linear', unit: 'µg/m³' }
];

const DEBUG$3 = !!window.__BUBBLE_DEBUG__;

const SENSOR_TYPE_MAP = SENSOR_TYPES.reduce((map, { type, label, emoji, unit }) => {
  map[type] = { label, emoji, units: [unit] };
  return map;
}, {});

class SensorsPanel extends i {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedSensors: { type: Array },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this._expanded = false;
    this._expandedSensors = Array(6).fill(false);
  }

  static styles = i$3`
    /* inserisci qui i CSS di .glass-panel, .glass-header, .mini-pill, .input-group ecc */
  `;

  render() {
    return x`
      <ha-expansion-panel
        class="glass-panel"
        .expanded=${this._expanded}
        @expanded-changed=${(e) => (this._expanded = e.detail.expanded)}
      >
        <div slot="header" class="glass-header">🧭 Sensors</div>

        <div class="glass-content">
          <div class="autodiscover-box" @click=${() => this._toggleAuto('sensor')}>
            <label>
              <input
                type="checkbox"
                .checked=${this.config.auto_discovery_sections?.sensor || false}
                @change=${(e) => this._toggleAuto('sensor', e.target.checked)}
                @click=${(e) => e.stopPropagation()}
              />
              <span>🪄 Auto-discovery enabled</span>
            </label>
          </div>

          ${['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6']
            .map((key, i) => this._renderSingle(i, key))}

          <div style="text-align:center; margin-top:1.2em;">
            <button class="reset-button" @click=${this._resetAll}>🧹 Reset Sensors</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderSingle(index, key) {
    const sensor = this.config.entities?.[key] || {};
    const expanded = this._expandedSensors[index];

    return x`
      <div class="mini-pill ${expanded ? 'expanded' : ''}" @click=${() => this._toggleOne(index)}>
        <div class="mini-pill-header">
          ${SENSOR_TYPE_MAP[sensor.type]?.emoji || '❔'} ${sensor.type || `Sensor ${index + 1}`}
          <span class="chevron">${expanded ? '▼' : '▶'}</span>
        </div>

        ${expanded ? x`
          <div class="mini-pill-content">
            <div class="input-group">
              <label>Sensor Type</label>
              <select
                .value=${sensor.type || ''}
                @change=${(e) => this._update(index, 'type', e.target.value)}
              >
                <option value="">-- none --</option>
                ${Object.entries(SENSOR_TYPE_MAP).map(([type, { emoji, label }]) => x`
                  <option value=${type}>${emoji} ${label}</option>
                `)}
              </select>
            </div>

            <div class="input-group">
              <label>Entity ID</label>
              <ha-entity-picker
                .hass=${this.hass}
                .includeEntities=${this._getSensorCandidates(sensor.type)}
                .value=${sensor.entity_id || ''}
                allow-custom-entity
                @value-changed=${(e) =>
                  this._fire('entities.sensor' + (index + 1) + '.entity_id', e.detail.value)}
              ></ha-entity-picker>
            </div>

            <div class="input-group">
              <label>Unit</label>
              <select
                .value=${sensor.unit || (SENSOR_TYPE_MAP[sensor.type]?.units[0] || '')}
                @change=${(e) => this._update(index, 'unit', e.target.value)}
              >
                ${(SENSOR_TYPE_MAP[sensor.type]?.units || []).map(
                  (u) => x`<option>${u}</option>`
                )}
              </select>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  _toggleAuto(section, val) {
    const current = this.config.auto_discovery_sections?.[section] || false;
    const next = typeof val === 'boolean' ? val : !current;
    this._fire(`auto_discovery_sections.${section}`, next);
  }

  _toggleOne(i) {
    this._expandedSensors = this._expandedSensors.map((_, j) => j === i);
  }

  _update(i, field, value) {
    this._fire(`entities.sensor${i + 1}.${field}`, value);
  }

  _resetAll() {
    ['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6'].forEach((k) =>
      this._fire(`entities.${k}`, undefined)
    );
  }

  _fire(prop, val) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val },
      bubbles: true,
      composed: true,
    }));
  }

  // Wrapper locale (Opzione A): usa la logica centralizzata e logga per debug
  _getSensorCandidates(type) {
    const list = candidatesFor(this.hass, this.config, { section: 'sensor', type });
    if (DEBUG$3) {
      console.info('[SensorsPanel][Candidates]', {
        type,
        area: this.config?.area || null,
        count: list.length,
        sample: list.slice(0, 8),
      });
    }
    return list;
  }
}

customElements.define('sensors-panel', SensorsPanel);

const DEBUG$2 = !!window.__BUBBLE_DEBUG__;

class MushroomsPanel extends i {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedItems: { type: Array },
  };

  constructor() {
    super();
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

  static styles = i$3`
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
    ['entities1','entities2','entities3','entities4','entities5','climate','camera']
      .forEach((k) => this._fire('entities.' + k, undefined));
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

class SubButtonsPanel extends i {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedItems: { type: Array },
  };
  
  constructor() {
    super();
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
  
  static styles = i$3`
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
    ['sub-button1', 'sub-button2', 'sub-button3', 'sub-button4', 'sub-button5', 'sub-button6']
    .forEach((k) => this._fire('entities.' + k, undefined));
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

class ColorsPanel extends i {
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
  
  static styles = i$3`
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

class BubbleRoomEditor extends i {
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
  
  static styles = i$3`
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

class BubbleIcon extends i {
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
  
  static styles = i$3`
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

class BubbleMushroom extends i {
  static properties = {
    entities: { type: Array },
    containerSize: { type: Object }
  };

  constructor() {
    super();
    this.entities = [];
    this.containerSize = { width: 200, height: 200 };
  }

  static styles = i$3`
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

class BubbleName extends i {
  static properties = {
    name: { type: String },
    area: { type: String }
  };
  
  constructor() {
    super();
    this.name = '';
    this.area = '';
  }
  
  static styles = i$3`
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

class BubbleSensors extends i {
  static properties = {
    sensors: { type: Array }, // [{icon, label, value, unit, color}]
  };
  
  static styles = i$3`
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

class BubbleSubButton extends i {
  static properties = {
    subbuttons: { type: Array }
  };
  
  constructor() {
    super();
    this.subbuttons = [];
  }
  
  static styles = i$3`
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

class BubbleRoom extends i {
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
  static styles = i$3`
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
