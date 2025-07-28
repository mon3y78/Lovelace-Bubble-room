import require$$0$1, { win32, posix, isAbsolute, resolve as resolve$2, dirname, normalize, sep, extname, relative, basename, join } from 'path';
import { builtinModules } from 'module';
import fs$2, { realpathSync, existsSync, readFileSync, statSync } from 'fs';
import { promisify } from 'util';
import { fileURLToPath, pathToFileURL } from 'url';
import require$$0 from 'os';

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;class n$3{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b={attribute:!0,type:String,converter:u$1,reflect:!1,useDefault:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class y$1 extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}}y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$1="?"+h,n$1=`<${o$1}>`,r=document,l=()=>r.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$1)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t.litHtmlPolyfillSupport;j?.(N,R),(t.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}}i._$litElement$=!0,i["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.1");

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
        <div slot="header" class="glass-header">🛋️ Room Settings</div>
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
                .hass="${this.hass}"
                .value="${this.config.entities?.presence?.entity||''}"
                @value-changed="${e=>this._updateEntity('presence',e.detail.value)}"
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

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var cjs;
var hasRequiredCjs;

function requireCjs () {
	if (hasRequiredCjs) return cjs;
	hasRequiredCjs = 1;

	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value)
			&& !isSpecial(value)
	};

	function isNonNullObject(value) {
		return !!value && typeof value === 'object'
	}

	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);

		return stringValue === '[object RegExp]'
			|| stringValue === '[object Date]'
			|| isReactElement(value)
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE
	}

	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {}
	}

	function cloneUnlessOtherwiseSpecified(value, options) {
		return (options.clone !== false && options.isMergeableObject(value))
			? deepmerge(emptyTarget(value), value, options)
			: value
	}

	function defaultArrayMerge(target, source, options) {
		return target.concat(source).map(function(element) {
			return cloneUnlessOtherwiseSpecified(element, options)
		})
	}

	function getMergeFunction(key, options) {
		if (!options.customMerge) {
			return deepmerge
		}
		var customMerge = options.customMerge(key);
		return typeof customMerge === 'function' ? customMerge : deepmerge
	}

	function getEnumerableOwnPropertySymbols(target) {
		return Object.getOwnPropertySymbols
			? Object.getOwnPropertySymbols(target).filter(function(symbol) {
				return Object.propertyIsEnumerable.call(target, symbol)
			})
			: []
	}

	function getKeys(target) {
		return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
	}

	function propertyIsOnObject(object, property) {
		try {
			return property in object
		} catch(_) {
			return false
		}
	}

	// Protects from prototype poisoning and unexpected merging up the prototype chain.
	function propertyIsUnsafe(target, key) {
		return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
			&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
				&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
	}

	function mergeObject(target, source, options) {
		var destination = {};
		if (options.isMergeableObject(target)) {
			getKeys(target).forEach(function(key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
			});
		}
		getKeys(source).forEach(function(key) {
			if (propertyIsUnsafe(target, key)) {
				return
			}

			if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
				destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
			} else {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
			}
		});
		return destination
	}

	function deepmerge(target, source, options) {
		options = options || {};
		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
		options.isMergeableObject = options.isMergeableObject || isMergeableObject;
		// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
		// implementations can use it. The caller may not replace it.
		options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, options)
		} else if (sourceIsArray) {
			return options.arrayMerge(target, source, options)
		} else {
			return mergeObject(target, source, options)
		}
	}

	deepmerge.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array')
		}

		return array.reduce(function(prev, next) {
			return deepmerge(prev, next, options)
		}, {})
	};

	var deepmerge_1 = deepmerge;

	cjs = deepmerge_1;
	return cjs;
}

var cjsExports = requireCjs();
var deepMerge = /*@__PURE__*/getDefaultExportFromCjs(cjsExports);

var isModule$1;
var hasRequiredIsModule;

function requireIsModule () {
	if (hasRequiredIsModule) return isModule$1;
	hasRequiredIsModule = 1;
	// no idea what these regular expressions do,
	// but i extracted it from https://github.com/yahoo/js-module-formats/blob/master/index.js#L18
	var ES6ImportExportRegExp = /(?:^\s*|[}{\(\);,\n]\s*)(import\s+['"]|(import|module)\s+[^"'\(\)\n;]+\s+from\s+['"]|export\s+(\*|\{|default|function|var|const|let|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*))/;

	var ES6AliasRegExp = /(?:^\s*|[}{\(\);,\n]\s*)(export\s*\*\s*from\s*(?:'([^']+)'|"([^"]+)"))/;

	isModule$1 = function (sauce) {
	  return ES6ImportExportRegExp.test(sauce)
	    || ES6AliasRegExp.test(sauce);
	};
	return isModule$1;
}

var isModuleExports = requireIsModule();
var isModule = /*@__PURE__*/getDefaultExportFromCjs(isModuleExports);

var homedir;
var hasRequiredHomedir;

function requireHomedir () {
	if (hasRequiredHomedir) return homedir;
	hasRequiredHomedir = 1;

	var os = require$$0;

	// adapted from https://github.com/sindresorhus/os-homedir/blob/11e089f4754db38bb535e5a8416320c4446e8cfd/index.js

	homedir = os.homedir || function homedir() {
	    var home = process.env.HOME;
	    var user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;

	    if (process.platform === 'win32') {
	        return process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
	    }

	    if (process.platform === 'darwin') {
	        return home || (user ? '/Users/' + user : null);
	    }

	    if (process.platform === 'linux') {
	        return home || (process.getuid() === 0 ? '/root' : (user ? '/home/' + user : null)); // eslint-disable-line no-extra-parens
	    }

	    return home || null;
	};
	return homedir;
}

var caller;
var hasRequiredCaller;

function requireCaller () {
	if (hasRequiredCaller) return caller;
	hasRequiredCaller = 1;
	caller = function () {
	    // see https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
	    var origPrepareStackTrace = Error.prepareStackTrace;
	    Error.prepareStackTrace = function (_, stack) { return stack; };
	    var stack = (new Error()).stack;
	    Error.prepareStackTrace = origPrepareStackTrace;
	    return stack[2].getFileName();
	};
	return caller;
}

var pathParse = {exports: {}};

var hasRequiredPathParse;

function requirePathParse () {
	if (hasRequiredPathParse) return pathParse.exports;
	hasRequiredPathParse = 1;

	var isWindows = process.platform === 'win32';

	// Regex to split a windows path into into [dir, root, basename, name, ext]
	var splitWindowsRe =
	    /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/;

	var win32 = {};

	function win32SplitPath(filename) {
	  return splitWindowsRe.exec(filename).slice(1);
	}

	win32.parse = function(pathString) {
	  if (typeof pathString !== 'string') {
	    throw new TypeError(
	        "Parameter 'pathString' must be a string, not " + typeof pathString
	    );
	  }
	  var allParts = win32SplitPath(pathString);
	  if (!allParts || allParts.length !== 5) {
	    throw new TypeError("Invalid path '" + pathString + "'");
	  }
	  return {
	    root: allParts[1],
	    dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
	    base: allParts[2],
	    ext: allParts[4],
	    name: allParts[3]
	  };
	};



	// Split a filename into [dir, root, basename, name, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/;
	var posix = {};


	function posixSplitPath(filename) {
	  return splitPathRe.exec(filename).slice(1);
	}


	posix.parse = function(pathString) {
	  if (typeof pathString !== 'string') {
	    throw new TypeError(
	        "Parameter 'pathString' must be a string, not " + typeof pathString
	    );
	  }
	  var allParts = posixSplitPath(pathString);
	  if (!allParts || allParts.length !== 5) {
	    throw new TypeError("Invalid path '" + pathString + "'");
	  }
	  
	  return {
	    root: allParts[1],
	    dir: allParts[0].slice(0, -1),
	    base: allParts[2],
	    ext: allParts[4],
	    name: allParts[3],
	  };
	};


	if (isWindows)
	  pathParse.exports = win32.parse;
	else /* posix */
	  pathParse.exports = posix.parse;

	pathParse.exports.posix = posix.parse;
	pathParse.exports.win32 = win32.parse;
	return pathParse.exports;
}

var nodeModulesPaths;
var hasRequiredNodeModulesPaths;

function requireNodeModulesPaths () {
	if (hasRequiredNodeModulesPaths) return nodeModulesPaths;
	hasRequiredNodeModulesPaths = 1;
	var path = require$$0$1;
	var parse = path.parse || requirePathParse(); // eslint-disable-line global-require

	var getNodeModulesDirs = function getNodeModulesDirs(absoluteStart, modules) {
	    var prefix = '/';
	    if ((/^([A-Za-z]:)/).test(absoluteStart)) {
	        prefix = '';
	    } else if ((/^\\\\/).test(absoluteStart)) {
	        prefix = '\\\\';
	    }

	    var paths = [absoluteStart];
	    var parsed = parse(absoluteStart);
	    while (parsed.dir !== paths[paths.length - 1]) {
	        paths.push(parsed.dir);
	        parsed = parse(parsed.dir);
	    }

	    return paths.reduce(function (dirs, aPath) {
	        return dirs.concat(modules.map(function (moduleDir) {
	            return path.resolve(prefix, aPath, moduleDir);
	        }));
	    }, []);
	};

	nodeModulesPaths = function nodeModulesPaths(start, opts, request) {
	    var modules = opts && opts.moduleDirectory
	        ? [].concat(opts.moduleDirectory)
	        : ['node_modules'];

	    if (opts && typeof opts.paths === 'function') {
	        return opts.paths(
	            request,
	            start,
	            function () { return getNodeModulesDirs(start, modules); },
	            opts
	        );
	    }

	    var dirs = getNodeModulesDirs(start, modules);
	    return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
	};
	return nodeModulesPaths;
}

var normalizeOptions;
var hasRequiredNormalizeOptions;

function requireNormalizeOptions () {
	if (hasRequiredNormalizeOptions) return normalizeOptions;
	hasRequiredNormalizeOptions = 1;
	normalizeOptions = function (x, opts) {
	    /**
	     * This file is purposefully a passthrough. It's expected that third-party
	     * environments will override it at runtime in order to inject special logic
	     * into `resolve` (by manipulating the options). One such example is the PnP
	     * code path in Yarn.
	     */

	    return opts || {};
	};
	return normalizeOptions;
}

var implementation;
var hasRequiredImplementation;

function requireImplementation () {
	if (hasRequiredImplementation) return implementation;
	hasRequiredImplementation = 1;

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var toStr = Object.prototype.toString;
	var max = Math.max;
	var funcType = '[object Function]';

	var concatty = function concatty(a, b) {
	    var arr = [];

	    for (var i = 0; i < a.length; i += 1) {
	        arr[i] = a[i];
	    }
	    for (var j = 0; j < b.length; j += 1) {
	        arr[j + a.length] = b[j];
	    }

	    return arr;
	};

	var slicy = function slicy(arrLike, offset) {
	    var arr = [];
	    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
	        arr[j] = arrLike[i];
	    }
	    return arr;
	};

	var joiny = function (arr, joiner) {
	    var str = '';
	    for (var i = 0; i < arr.length; i += 1) {
	        str += arr[i];
	        if (i + 1 < arr.length) {
	            str += joiner;
	        }
	    }
	    return str;
	};

	implementation = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slicy(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                concatty(args, arguments)
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        }
	        return target.apply(
	            that,
	            concatty(args, arguments)
	        );

	    };

	    var boundLength = max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs[i] = '$' + i;
	    }

	    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};
	return implementation;
}

var functionBind;
var hasRequiredFunctionBind;

function requireFunctionBind () {
	if (hasRequiredFunctionBind) return functionBind;
	hasRequiredFunctionBind = 1;

	var implementation = requireImplementation();

	functionBind = Function.prototype.bind || implementation;
	return functionBind;
}

var hasown;
var hasRequiredHasown;

function requireHasown () {
	if (hasRequiredHasown) return hasown;
	hasRequiredHasown = 1;

	var call = Function.prototype.call;
	var $hasOwn = Object.prototype.hasOwnProperty;
	var bind = requireFunctionBind();

	/** @type {import('.')} */
	hasown = bind.call(call, $hasOwn);
	return hasown;
}

var assert$1 = true;
var async_hooks$1 = ">= 8";
var buffer_ieee754$1 = ">= 0.5 && < 0.9.7";
var buffer$1 = true;
var child_process$1 = true;
var cluster$1 = ">= 0.5";
var console$2 = true;
var constants$2 = true;
var crypto$1 = true;
var _debug_agent$1 = ">= 1 && < 8";
var _debugger$1 = "< 8";
var dgram$1 = true;
var diagnostics_channel$1 = [
	">= 14.17 && < 15",
	">= 15.1"
];
var dns$1 = true;
var domain$1 = ">= 0.7.12";
var events$1 = true;
var freelist$1 = "< 6";
var fs$1 = true;
var _http_agent$1 = ">= 0.11.1";
var _http_client$1 = ">= 0.11.1";
var _http_common$1 = ">= 0.11.1";
var _http_incoming$1 = ">= 0.11.1";
var _http_outgoing$1 = ">= 0.11.1";
var _http_server$1 = ">= 0.11.1";
var http$1 = true;
var http2$1 = ">= 8.8";
var https$1 = true;
var inspector$1 = ">= 8";
var _linklist$1 = "< 8";
var module$1 = true;
var net$1 = true;
var os$1 = true;
var path$1 = true;
var perf_hooks$1 = ">= 8.5";
var process$2 = ">= 1";
var punycode$1 = ">= 0.5";
var querystring$1 = true;
var readline$1 = true;
var repl$1 = true;
var smalloc$1 = ">= 0.11.5 && < 3";
var _stream_duplex$1 = ">= 0.9.4";
var _stream_transform$1 = ">= 0.9.4";
var _stream_wrap$1 = ">= 1.4.1";
var _stream_passthrough$1 = ">= 0.9.4";
var _stream_readable$1 = ">= 0.9.4";
var _stream_writable$1 = ">= 0.9.4";
var stream$1 = true;
var string_decoder$1 = true;
var sys$1 = [
	">= 0.4 && < 0.7",
	">= 0.8"
];
var timers$1 = true;
var _tls_common$1 = ">= 0.11.13";
var _tls_legacy$1 = ">= 0.11.3 && < 10";
var _tls_wrap$1 = ">= 0.11.3";
var tls$1 = true;
var trace_events$1 = ">= 10";
var tty$1 = true;
var url$1 = true;
var util$1 = true;
var v8$1 = ">= 1";
var vm$1 = true;
var wasi$1 = [
	">= 13.4 && < 13.5",
	">= 18.17 && < 19",
	">= 20"
];
var worker_threads$1 = ">= 11.7";
var zlib$1 = ">= 0.5";
var require$$1$1 = {
	assert: assert$1,
	"node:assert": [
	">= 14.18 && < 15",
	">= 16"
],
	"assert/strict": ">= 15",
	"node:assert/strict": ">= 16",
	async_hooks: async_hooks$1,
	"node:async_hooks": [
	">= 14.18 && < 15",
	">= 16"
],
	buffer_ieee754: buffer_ieee754$1,
	buffer: buffer$1,
	"node:buffer": [
	">= 14.18 && < 15",
	">= 16"
],
	child_process: child_process$1,
	"node:child_process": [
	">= 14.18 && < 15",
	">= 16"
],
	cluster: cluster$1,
	"node:cluster": [
	">= 14.18 && < 15",
	">= 16"
],
	console: console$2,
	"node:console": [
	">= 14.18 && < 15",
	">= 16"
],
	constants: constants$2,
	"node:constants": [
	">= 14.18 && < 15",
	">= 16"
],
	crypto: crypto$1,
	"node:crypto": [
	">= 14.18 && < 15",
	">= 16"
],
	_debug_agent: _debug_agent$1,
	_debugger: _debugger$1,
	dgram: dgram$1,
	"node:dgram": [
	">= 14.18 && < 15",
	">= 16"
],
	diagnostics_channel: diagnostics_channel$1,
	"node:diagnostics_channel": [
	">= 14.18 && < 15",
	">= 16"
],
	dns: dns$1,
	"node:dns": [
	">= 14.18 && < 15",
	">= 16"
],
	"dns/promises": ">= 15",
	"node:dns/promises": ">= 16",
	domain: domain$1,
	"node:domain": [
	">= 14.18 && < 15",
	">= 16"
],
	events: events$1,
	"node:events": [
	">= 14.18 && < 15",
	">= 16"
],
	freelist: freelist$1,
	fs: fs$1,
	"node:fs": [
	">= 14.18 && < 15",
	">= 16"
],
	"fs/promises": [
	">= 10 && < 10.1",
	">= 14"
],
	"node:fs/promises": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_agent: _http_agent$1,
	"node:_http_agent": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_client: _http_client$1,
	"node:_http_client": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_common: _http_common$1,
	"node:_http_common": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_incoming: _http_incoming$1,
	"node:_http_incoming": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_outgoing: _http_outgoing$1,
	"node:_http_outgoing": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_server: _http_server$1,
	"node:_http_server": [
	">= 14.18 && < 15",
	">= 16"
],
	http: http$1,
	"node:http": [
	">= 14.18 && < 15",
	">= 16"
],
	http2: http2$1,
	"node:http2": [
	">= 14.18 && < 15",
	">= 16"
],
	https: https$1,
	"node:https": [
	">= 14.18 && < 15",
	">= 16"
],
	inspector: inspector$1,
	"node:inspector": [
	">= 14.18 && < 15",
	">= 16"
],
	"inspector/promises": [
	">= 19"
],
	"node:inspector/promises": [
	">= 19"
],
	_linklist: _linklist$1,
	module: module$1,
	"node:module": [
	">= 14.18 && < 15",
	">= 16"
],
	net: net$1,
	"node:net": [
	">= 14.18 && < 15",
	">= 16"
],
	"node-inspect/lib/_inspect": ">= 7.6 && < 12",
	"node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
	"node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
	os: os$1,
	"node:os": [
	">= 14.18 && < 15",
	">= 16"
],
	path: path$1,
	"node:path": [
	">= 14.18 && < 15",
	">= 16"
],
	"path/posix": ">= 15.3",
	"node:path/posix": ">= 16",
	"path/win32": ">= 15.3",
	"node:path/win32": ">= 16",
	perf_hooks: perf_hooks$1,
	"node:perf_hooks": [
	">= 14.18 && < 15",
	">= 16"
],
	process: process$2,
	"node:process": [
	">= 14.18 && < 15",
	">= 16"
],
	punycode: punycode$1,
	"node:punycode": [
	">= 14.18 && < 15",
	">= 16"
],
	querystring: querystring$1,
	"node:querystring": [
	">= 14.18 && < 15",
	">= 16"
],
	readline: readline$1,
	"node:readline": [
	">= 14.18 && < 15",
	">= 16"
],
	"readline/promises": ">= 17",
	"node:readline/promises": ">= 17",
	repl: repl$1,
	"node:repl": [
	">= 14.18 && < 15",
	">= 16"
],
	"node:sea": [
	">= 20.12 && < 21",
	">= 21.7"
],
	smalloc: smalloc$1,
	"node:sqlite": [
	">= 22.13 && < 23",
	">= 23.4"
],
	_stream_duplex: _stream_duplex$1,
	"node:_stream_duplex": [
	">= 14.18 && < 15",
	">= 16"
],
	_stream_transform: _stream_transform$1,
	"node:_stream_transform": [
	">= 14.18 && < 15",
	">= 16"
],
	_stream_wrap: _stream_wrap$1,
	"node:_stream_wrap": [
	">= 14.18 && < 15",
	">= 16"
],
	_stream_passthrough: _stream_passthrough$1,
	"node:_stream_passthrough": [
	">= 14.18 && < 15",
	">= 16"
],
	_stream_readable: _stream_readable$1,
	"node:_stream_readable": [
	">= 14.18 && < 15",
	">= 16"
],
	_stream_writable: _stream_writable$1,
	"node:_stream_writable": [
	">= 14.18 && < 15",
	">= 16"
],
	stream: stream$1,
	"node:stream": [
	">= 14.18 && < 15",
	">= 16"
],
	"stream/consumers": ">= 16.7",
	"node:stream/consumers": ">= 16.7",
	"stream/promises": ">= 15",
	"node:stream/promises": ">= 16",
	"stream/web": ">= 16.5",
	"node:stream/web": ">= 16.5",
	string_decoder: string_decoder$1,
	"node:string_decoder": [
	">= 14.18 && < 15",
	">= 16"
],
	sys: sys$1,
	"node:sys": [
	">= 14.18 && < 15",
	">= 16"
],
	"test/reporters": ">= 19.9 && < 20.2",
	"node:test/reporters": [
	">= 18.17 && < 19",
	">= 19.9",
	">= 20"
],
	"test/mock_loader": ">= 22.3 && < 22.7",
	"node:test/mock_loader": ">= 22.3 && < 22.7",
	"node:test": [
	">= 16.17 && < 17",
	">= 18"
],
	timers: timers$1,
	"node:timers": [
	">= 14.18 && < 15",
	">= 16"
],
	"timers/promises": ">= 15",
	"node:timers/promises": ">= 16",
	_tls_common: _tls_common$1,
	"node:_tls_common": [
	">= 14.18 && < 15",
	">= 16"
],
	_tls_legacy: _tls_legacy$1,
	_tls_wrap: _tls_wrap$1,
	"node:_tls_wrap": [
	">= 14.18 && < 15",
	">= 16"
],
	tls: tls$1,
	"node:tls": [
	">= 14.18 && < 15",
	">= 16"
],
	trace_events: trace_events$1,
	"node:trace_events": [
	">= 14.18 && < 15",
	">= 16"
],
	tty: tty$1,
	"node:tty": [
	">= 14.18 && < 15",
	">= 16"
],
	url: url$1,
	"node:url": [
	">= 14.18 && < 15",
	">= 16"
],
	util: util$1,
	"node:util": [
	">= 14.18 && < 15",
	">= 16"
],
	"util/types": ">= 15.3",
	"node:util/types": ">= 16",
	"v8/tools/arguments": ">= 10 && < 12",
	"v8/tools/codemap": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	"v8/tools/consarray": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	"v8/tools/csvparser": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	"v8/tools/logreader": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	"v8/tools/profile_view": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	"v8/tools/splaytree": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	v8: v8$1,
	"node:v8": [
	">= 14.18 && < 15",
	">= 16"
],
	vm: vm$1,
	"node:vm": [
	">= 14.18 && < 15",
	">= 16"
],
	wasi: wasi$1,
	"node:wasi": [
	">= 18.17 && < 19",
	">= 20"
],
	worker_threads: worker_threads$1,
	"node:worker_threads": [
	">= 14.18 && < 15",
	">= 16"
],
	zlib: zlib$1,
	"node:zlib": [
	">= 14.18 && < 15",
	">= 16"
]
};

var isCoreModule;
var hasRequiredIsCoreModule;

function requireIsCoreModule () {
	if (hasRequiredIsCoreModule) return isCoreModule;
	hasRequiredIsCoreModule = 1;

	var hasOwn = /*@__PURE__*/ requireHasown();

	function specifierIncluded(current, specifier) {
		var nodeParts = current.split('.');
		var parts = specifier.split(' ');
		var op = parts.length > 1 ? parts[0] : '=';
		var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split('.');

		for (var i = 0; i < 3; ++i) {
			var cur = parseInt(nodeParts[i] || 0, 10);
			var ver = parseInt(versionParts[i] || 0, 10);
			if (cur === ver) {
				continue; // eslint-disable-line no-restricted-syntax, no-continue
			}
			if (op === '<') {
				return cur < ver;
			}
			if (op === '>=') {
				return cur >= ver;
			}
			return false;
		}
		return op === '>=';
	}

	function matchesRange(current, range) {
		var specifiers = range.split(/ ?&& ?/);
		if (specifiers.length === 0) {
			return false;
		}
		for (var i = 0; i < specifiers.length; ++i) {
			if (!specifierIncluded(current, specifiers[i])) {
				return false;
			}
		}
		return true;
	}

	function versionIncluded(nodeVersion, specifierValue) {
		if (typeof specifierValue === 'boolean') {
			return specifierValue;
		}

		var current = typeof nodeVersion === 'undefined'
			? process.versions && process.versions.node
			: nodeVersion;

		if (typeof current !== 'string') {
			throw new TypeError(typeof nodeVersion === 'undefined' ? 'Unable to determine current node version' : 'If provided, a valid node version is required');
		}

		if (specifierValue && typeof specifierValue === 'object') {
			for (var i = 0; i < specifierValue.length; ++i) {
				if (matchesRange(current, specifierValue[i])) {
					return true;
				}
			}
			return false;
		}
		return matchesRange(current, specifierValue);
	}

	var data = require$$1$1;

	isCoreModule = function isCore(x, nodeVersion) {
		return hasOwn(data, x) && versionIncluded(nodeVersion, data[x]);
	};
	return isCoreModule;
}

var async$1;
var hasRequiredAsync$1;

function requireAsync$1 () {
	if (hasRequiredAsync$1) return async$1;
	hasRequiredAsync$1 = 1;
	var fs = fs$2;
	var getHomedir = requireHomedir();
	var path = require$$0$1;
	var caller = requireCaller();
	var nodeModulesPaths = requireNodeModulesPaths();
	var normalizeOptions = requireNormalizeOptions();
	var isCore = /*@__PURE__*/ requireIsCoreModule();

	var realpathFS = process.platform !== 'win32' && fs.realpath && typeof fs.realpath.native === 'function' ? fs.realpath.native : fs.realpath;

	var homedir = getHomedir();
	var defaultPaths = function () {
	    return [
	        path.join(homedir, '.node_modules'),
	        path.join(homedir, '.node_libraries')
	    ];
	};

	var defaultIsFile = function isFile(file, cb) {
	    fs.stat(file, function (err, stat) {
	        if (!err) {
	            return cb(null, stat.isFile() || stat.isFIFO());
	        }
	        if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return cb(null, false);
	        return cb(err);
	    });
	};

	var defaultIsDir = function isDirectory(dir, cb) {
	    fs.stat(dir, function (err, stat) {
	        if (!err) {
	            return cb(null, stat.isDirectory());
	        }
	        if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return cb(null, false);
	        return cb(err);
	    });
	};

	var defaultRealpath = function realpath(x, cb) {
	    realpathFS(x, function (realpathErr, realPath) {
	        if (realpathErr && realpathErr.code !== 'ENOENT') cb(realpathErr);
	        else cb(null, realpathErr ? x : realPath);
	    });
	};

	var maybeRealpath = function maybeRealpath(realpath, x, opts, cb) {
	    if (opts && opts.preserveSymlinks === false) {
	        realpath(x, cb);
	    } else {
	        cb(null, x);
	    }
	};

	var defaultReadPackage = function defaultReadPackage(readFile, pkgfile, cb) {
	    readFile(pkgfile, function (readFileErr, body) {
	        if (readFileErr) cb(readFileErr);
	        else {
	            try {
	                var pkg = JSON.parse(body);
	                cb(null, pkg);
	            } catch (jsonErr) {
	                cb(null);
	            }
	        }
	    });
	};

	var getPackageCandidates = function getPackageCandidates(x, start, opts) {
	    var dirs = nodeModulesPaths(start, opts, x);
	    for (var i = 0; i < dirs.length; i++) {
	        dirs[i] = path.join(dirs[i], x);
	    }
	    return dirs;
	};

	async$1 = function resolve(x, options, callback) {
	    var cb = callback;
	    var opts = options;
	    if (typeof options === 'function') {
	        cb = opts;
	        opts = {};
	    }
	    if (typeof x !== 'string') {
	        var err = new TypeError('Path must be a string.');
	        return process.nextTick(function () {
	            cb(err);
	        });
	    }

	    opts = normalizeOptions(x, opts);

	    var isFile = opts.isFile || defaultIsFile;
	    var isDirectory = opts.isDirectory || defaultIsDir;
	    var readFile = opts.readFile || fs.readFile;
	    var realpath = opts.realpath || defaultRealpath;
	    var readPackage = opts.readPackage || defaultReadPackage;
	    if (opts.readFile && opts.readPackage) {
	        var conflictErr = new TypeError('`readFile` and `readPackage` are mutually exclusive.');
	        return process.nextTick(function () {
	            cb(conflictErr);
	        });
	    }
	    var packageIterator = opts.packageIterator;

	    var extensions = opts.extensions || ['.js'];
	    var includeCoreModules = opts.includeCoreModules !== false;
	    var basedir = opts.basedir || path.dirname(caller());
	    var parent = opts.filename || basedir;

	    opts.paths = opts.paths || defaultPaths();

	    // ensure that `basedir` is an absolute path at this point, resolving against the process' current working directory
	    var absoluteStart = path.resolve(basedir);

	    maybeRealpath(
	        realpath,
	        absoluteStart,
	        opts,
	        function (err, realStart) {
	            if (err) cb(err);
	            else init(realStart);
	        }
	    );

	    var res;
	    function init(basedir) {
	        if ((/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/).test(x)) {
	            res = path.resolve(basedir, x);
	            if (x === '.' || x === '..' || x.slice(-1) === '/') res += '/';
	            if ((/\/$/).test(x) && res === basedir) {
	                loadAsDirectory(res, opts.package, onfile);
	            } else loadAsFile(res, opts.package, onfile);
	        } else if (includeCoreModules && isCore(x)) {
	            return cb(null, x);
	        } else loadNodeModules(x, basedir, function (err, n, pkg) {
	            if (err) cb(err);
	            else if (n) {
	                return maybeRealpath(realpath, n, opts, function (err, realN) {
	                    if (err) {
	                        cb(err);
	                    } else {
	                        cb(null, realN, pkg);
	                    }
	                });
	            } else {
	                var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
	                moduleError.code = 'MODULE_NOT_FOUND';
	                cb(moduleError);
	            }
	        });
	    }

	    function onfile(err, m, pkg) {
	        if (err) cb(err);
	        else if (m) cb(null, m, pkg);
	        else loadAsDirectory(res, function (err, d, pkg) {
	            if (err) cb(err);
	            else if (d) {
	                maybeRealpath(realpath, d, opts, function (err, realD) {
	                    if (err) {
	                        cb(err);
	                    } else {
	                        cb(null, realD, pkg);
	                    }
	                });
	            } else {
	                var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
	                moduleError.code = 'MODULE_NOT_FOUND';
	                cb(moduleError);
	            }
	        });
	    }

	    function loadAsFile(x, thePackage, callback) {
	        var loadAsFilePackage = thePackage;
	        var cb = callback;
	        if (typeof loadAsFilePackage === 'function') {
	            cb = loadAsFilePackage;
	            loadAsFilePackage = undefined;
	        }

	        var exts = [''].concat(extensions);
	        load(exts, x, loadAsFilePackage);

	        function load(exts, x, loadPackage) {
	            if (exts.length === 0) return cb(null, undefined, loadPackage);
	            var file = x + exts[0];

	            var pkg = loadPackage;
	            if (pkg) onpkg(null, pkg);
	            else loadpkg(path.dirname(file), onpkg);

	            function onpkg(err, pkg_, dir) {
	                pkg = pkg_;
	                if (err) return cb(err);
	                if (dir && pkg && opts.pathFilter) {
	                    var rfile = path.relative(dir, file);
	                    var rel = rfile.slice(0, rfile.length - exts[0].length);
	                    var r = opts.pathFilter(pkg, x, rel);
	                    if (r) return load(
	                        [''].concat(extensions.slice()),
	                        path.resolve(dir, r),
	                        pkg
	                    );
	                }
	                isFile(file, onex);
	            }
	            function onex(err, ex) {
	                if (err) return cb(err);
	                if (ex) return cb(null, file, pkg);
	                load(exts.slice(1), x, pkg);
	            }
	        }
	    }

	    function loadpkg(dir, cb) {
	        if (dir === '' || dir === '/') return cb(null);
	        if (process.platform === 'win32' && (/^\w:[/\\]*$/).test(dir)) {
	            return cb(null);
	        }
	        if ((/[/\\]node_modules[/\\]*$/).test(dir)) return cb(null);

	        maybeRealpath(realpath, dir, opts, function (unwrapErr, pkgdir) {
	            if (unwrapErr) return loadpkg(path.dirname(dir), cb);
	            var pkgfile = path.join(pkgdir, 'package.json');
	            isFile(pkgfile, function (err, ex) {
	                // on err, ex is false
	                if (!ex) return loadpkg(path.dirname(dir), cb);

	                readPackage(readFile, pkgfile, function (err, pkgParam) {
	                    if (err) cb(err);

	                    var pkg = pkgParam;

	                    if (pkg && opts.packageFilter) {
	                        pkg = opts.packageFilter(pkg, pkgfile);
	                    }
	                    cb(null, pkg, dir);
	                });
	            });
	        });
	    }

	    function loadAsDirectory(x, loadAsDirectoryPackage, callback) {
	        var cb = callback;
	        var fpkg = loadAsDirectoryPackage;
	        if (typeof fpkg === 'function') {
	            cb = fpkg;
	            fpkg = opts.package;
	        }

	        maybeRealpath(realpath, x, opts, function (unwrapErr, pkgdir) {
	            if (unwrapErr) return cb(unwrapErr);
	            var pkgfile = path.join(pkgdir, 'package.json');
	            isFile(pkgfile, function (err, ex) {
	                if (err) return cb(err);
	                if (!ex) return loadAsFile(path.join(x, 'index'), fpkg, cb);

	                readPackage(readFile, pkgfile, function (err, pkgParam) {
	                    if (err) return cb(err);

	                    var pkg = pkgParam;

	                    if (pkg && opts.packageFilter) {
	                        pkg = opts.packageFilter(pkg, pkgfile);
	                    }

	                    if (pkg && pkg.main) {
	                        if (typeof pkg.main !== 'string') {
	                            var mainError = new TypeError('package “' + pkg.name + '” `main` must be a string');
	                            mainError.code = 'INVALID_PACKAGE_MAIN';
	                            return cb(mainError);
	                        }
	                        if (pkg.main === '.' || pkg.main === './') {
	                            pkg.main = 'index';
	                        }
	                        loadAsFile(path.resolve(x, pkg.main), pkg, function (err, m, pkg) {
	                            if (err) return cb(err);
	                            if (m) return cb(null, m, pkg);
	                            if (!pkg) return loadAsFile(path.join(x, 'index'), pkg, cb);

	                            var dir = path.resolve(x, pkg.main);
	                            loadAsDirectory(dir, pkg, function (err, n, pkg) {
	                                if (err) return cb(err);
	                                if (n) return cb(null, n, pkg);
	                                loadAsFile(path.join(x, 'index'), pkg, cb);
	                            });
	                        });
	                        return;
	                    }

	                    loadAsFile(path.join(x, '/index'), pkg, cb);
	                });
	            });
	        });
	    }

	    function processDirs(cb, dirs) {
	        if (dirs.length === 0) return cb(null, undefined);
	        var dir = dirs[0];

	        isDirectory(path.dirname(dir), isdir);

	        function isdir(err, isdir) {
	            if (err) return cb(err);
	            if (!isdir) return processDirs(cb, dirs.slice(1));
	            loadAsFile(dir, opts.package, onfile);
	        }

	        function onfile(err, m, pkg) {
	            if (err) return cb(err);
	            if (m) return cb(null, m, pkg);
	            loadAsDirectory(dir, opts.package, ondir);
	        }

	        function ondir(err, n, pkg) {
	            if (err) return cb(err);
	            if (n) return cb(null, n, pkg);
	            processDirs(cb, dirs.slice(1));
	        }
	    }
	    function loadNodeModules(x, start, cb) {
	        var thunk = function () { return getPackageCandidates(x, start, opts); };
	        processDirs(
	            cb,
	            packageIterator ? packageIterator(x, start, thunk, opts) : thunk()
	        );
	    }
	};
	return async$1;
}

var assert = true;
var async_hooks = ">= 8";
var buffer_ieee754 = ">= 0.5 && < 0.9.7";
var buffer = true;
var child_process = true;
var cluster = ">= 0.5";
var console$1 = true;
var constants$1 = true;
var crypto = true;
var _debug_agent = ">= 1 && < 8";
var _debugger = "< 8";
var dgram = true;
var diagnostics_channel = [
	">= 14.17 && < 15",
	">= 15.1"
];
var dns = true;
var domain = ">= 0.7.12";
var events = true;
var freelist = "< 6";
var fs = true;
var _http_agent = ">= 0.11.1";
var _http_client = ">= 0.11.1";
var _http_common = ">= 0.11.1";
var _http_incoming = ">= 0.11.1";
var _http_outgoing = ">= 0.11.1";
var _http_server = ">= 0.11.1";
var http = true;
var http2 = ">= 8.8";
var https = true;
var inspector = ">= 8";
var _linklist = "< 8";
var module = true;
var net = true;
var os = true;
var path = true;
var perf_hooks = ">= 8.5";
var process$1 = ">= 1";
var punycode = ">= 0.5";
var querystring = true;
var readline = true;
var repl = true;
var smalloc = ">= 0.11.5 && < 3";
var _stream_duplex = ">= 0.9.4";
var _stream_transform = ">= 0.9.4";
var _stream_wrap = ">= 1.4.1";
var _stream_passthrough = ">= 0.9.4";
var _stream_readable = ">= 0.9.4";
var _stream_writable = ">= 0.9.4";
var stream = true;
var string_decoder = true;
var sys = [
	">= 0.4 && < 0.7",
	">= 0.8"
];
var timers = true;
var _tls_common = ">= 0.11.13";
var _tls_legacy = ">= 0.11.3 && < 10";
var _tls_wrap = ">= 0.11.3";
var tls = true;
var trace_events = ">= 10";
var tty = true;
var url = true;
var util = true;
var v8 = ">= 1";
var vm = true;
var wasi = [
	">= 13.4 && < 13.5",
	">= 18.17 && < 19",
	">= 20"
];
var worker_threads = ">= 11.7";
var zlib = ">= 0.5";
var require$$1 = {
	assert: assert,
	"node:assert": [
	">= 14.18 && < 15",
	">= 16"
],
	"assert/strict": ">= 15",
	"node:assert/strict": ">= 16",
	async_hooks: async_hooks,
	"node:async_hooks": [
	">= 14.18 && < 15",
	">= 16"
],
	buffer_ieee754: buffer_ieee754,
	buffer: buffer,
	"node:buffer": [
	">= 14.18 && < 15",
	">= 16"
],
	child_process: child_process,
	"node:child_process": [
	">= 14.18 && < 15",
	">= 16"
],
	cluster: cluster,
	"node:cluster": [
	">= 14.18 && < 15",
	">= 16"
],
	console: console$1,
	"node:console": [
	">= 14.18 && < 15",
	">= 16"
],
	constants: constants$1,
	"node:constants": [
	">= 14.18 && < 15",
	">= 16"
],
	crypto: crypto,
	"node:crypto": [
	">= 14.18 && < 15",
	">= 16"
],
	_debug_agent: _debug_agent,
	_debugger: _debugger,
	dgram: dgram,
	"node:dgram": [
	">= 14.18 && < 15",
	">= 16"
],
	diagnostics_channel: diagnostics_channel,
	"node:diagnostics_channel": [
	">= 14.18 && < 15",
	">= 16"
],
	dns: dns,
	"node:dns": [
	">= 14.18 && < 15",
	">= 16"
],
	"dns/promises": ">= 15",
	"node:dns/promises": ">= 16",
	domain: domain,
	"node:domain": [
	">= 14.18 && < 15",
	">= 16"
],
	events: events,
	"node:events": [
	">= 14.18 && < 15",
	">= 16"
],
	freelist: freelist,
	fs: fs,
	"node:fs": [
	">= 14.18 && < 15",
	">= 16"
],
	"fs/promises": [
	">= 10 && < 10.1",
	">= 14"
],
	"node:fs/promises": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_agent: _http_agent,
	"node:_http_agent": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_client: _http_client,
	"node:_http_client": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_common: _http_common,
	"node:_http_common": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_incoming: _http_incoming,
	"node:_http_incoming": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_outgoing: _http_outgoing,
	"node:_http_outgoing": [
	">= 14.18 && < 15",
	">= 16"
],
	_http_server: _http_server,
	"node:_http_server": [
	">= 14.18 && < 15",
	">= 16"
],
	http: http,
	"node:http": [
	">= 14.18 && < 15",
	">= 16"
],
	http2: http2,
	"node:http2": [
	">= 14.18 && < 15",
	">= 16"
],
	https: https,
	"node:https": [
	">= 14.18 && < 15",
	">= 16"
],
	inspector: inspector,
	"node:inspector": [
	">= 14.18 && < 15",
	">= 16"
],
	"inspector/promises": [
	">= 19"
],
	"node:inspector/promises": [
	">= 19"
],
	_linklist: _linklist,
	module: module,
	"node:module": [
	">= 14.18 && < 15",
	">= 16"
],
	net: net,
	"node:net": [
	">= 14.18 && < 15",
	">= 16"
],
	"node-inspect/lib/_inspect": ">= 7.6 && < 12",
	"node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
	"node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
	os: os,
	"node:os": [
	">= 14.18 && < 15",
	">= 16"
],
	path: path,
	"node:path": [
	">= 14.18 && < 15",
	">= 16"
],
	"path/posix": ">= 15.3",
	"node:path/posix": ">= 16",
	"path/win32": ">= 15.3",
	"node:path/win32": ">= 16",
	perf_hooks: perf_hooks,
	"node:perf_hooks": [
	">= 14.18 && < 15",
	">= 16"
],
	process: process$1,
	"node:process": [
	">= 14.18 && < 15",
	">= 16"
],
	punycode: punycode,
	"node:punycode": [
	">= 14.18 && < 15",
	">= 16"
],
	querystring: querystring,
	"node:querystring": [
	">= 14.18 && < 15",
	">= 16"
],
	readline: readline,
	"node:readline": [
	">= 14.18 && < 15",
	">= 16"
],
	"readline/promises": ">= 17",
	"node:readline/promises": ">= 17",
	repl: repl,
	"node:repl": [
	">= 14.18 && < 15",
	">= 16"
],
	"node:sea": [
	">= 20.12 && < 21",
	">= 21.7"
],
	smalloc: smalloc,
	"node:sqlite": ">= 23.4",
	_stream_duplex: _stream_duplex,
	"node:_stream_duplex": [
	">= 14.18 && < 15",
	">= 16"
],
	_stream_transform: _stream_transform,
	"node:_stream_transform": [
	">= 14.18 && < 15",
	">= 16"
],
	_stream_wrap: _stream_wrap,
	"node:_stream_wrap": [
	">= 14.18 && < 15",
	">= 16"
],
	_stream_passthrough: _stream_passthrough,
	"node:_stream_passthrough": [
	">= 14.18 && < 15",
	">= 16"
],
	_stream_readable: _stream_readable,
	"node:_stream_readable": [
	">= 14.18 && < 15",
	">= 16"
],
	_stream_writable: _stream_writable,
	"node:_stream_writable": [
	">= 14.18 && < 15",
	">= 16"
],
	stream: stream,
	"node:stream": [
	">= 14.18 && < 15",
	">= 16"
],
	"stream/consumers": ">= 16.7",
	"node:stream/consumers": ">= 16.7",
	"stream/promises": ">= 15",
	"node:stream/promises": ">= 16",
	"stream/web": ">= 16.5",
	"node:stream/web": ">= 16.5",
	string_decoder: string_decoder,
	"node:string_decoder": [
	">= 14.18 && < 15",
	">= 16"
],
	sys: sys,
	"node:sys": [
	">= 14.18 && < 15",
	">= 16"
],
	"test/reporters": ">= 19.9 && < 20.2",
	"node:test/reporters": [
	">= 18.17 && < 19",
	">= 19.9",
	">= 20"
],
	"test/mock_loader": ">= 22.3 && < 22.7",
	"node:test/mock_loader": ">= 22.3 && < 22.7",
	"node:test": [
	">= 16.17 && < 17",
	">= 18"
],
	timers: timers,
	"node:timers": [
	">= 14.18 && < 15",
	">= 16"
],
	"timers/promises": ">= 15",
	"node:timers/promises": ">= 16",
	_tls_common: _tls_common,
	"node:_tls_common": [
	">= 14.18 && < 15",
	">= 16"
],
	_tls_legacy: _tls_legacy,
	_tls_wrap: _tls_wrap,
	"node:_tls_wrap": [
	">= 14.18 && < 15",
	">= 16"
],
	tls: tls,
	"node:tls": [
	">= 14.18 && < 15",
	">= 16"
],
	trace_events: trace_events,
	"node:trace_events": [
	">= 14.18 && < 15",
	">= 16"
],
	tty: tty,
	"node:tty": [
	">= 14.18 && < 15",
	">= 16"
],
	url: url,
	"node:url": [
	">= 14.18 && < 15",
	">= 16"
],
	util: util,
	"node:util": [
	">= 14.18 && < 15",
	">= 16"
],
	"util/types": ">= 15.3",
	"node:util/types": ">= 16",
	"v8/tools/arguments": ">= 10 && < 12",
	"v8/tools/codemap": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	"v8/tools/consarray": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	"v8/tools/csvparser": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	"v8/tools/logreader": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	"v8/tools/profile_view": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	"v8/tools/splaytree": [
	">= 4.4 && < 5",
	">= 5.2 && < 12"
],
	v8: v8,
	"node:v8": [
	">= 14.18 && < 15",
	">= 16"
],
	vm: vm,
	"node:vm": [
	">= 14.18 && < 15",
	">= 16"
],
	wasi: wasi,
	"node:wasi": [
	">= 18.17 && < 19",
	">= 20"
],
	worker_threads: worker_threads,
	"node:worker_threads": [
	">= 14.18 && < 15",
	">= 16"
],
	zlib: zlib,
	"node:zlib": [
	">= 14.18 && < 15",
	">= 16"
]
};

var core_1;
var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return core_1;
	hasRequiredCore = 1;

	var isCoreModule = /*@__PURE__*/ requireIsCoreModule();
	var data = require$$1;

	var core = {};
	for (var mod in data) { // eslint-disable-line no-restricted-syntax
	    if (Object.prototype.hasOwnProperty.call(data, mod)) {
	        core[mod] = isCoreModule(mod);
	    }
	}
	core_1 = core;
	return core_1;
}

var isCore;
var hasRequiredIsCore;

function requireIsCore () {
	if (hasRequiredIsCore) return isCore;
	hasRequiredIsCore = 1;
	var isCoreModule = /*@__PURE__*/ requireIsCoreModule();

	isCore = function isCore(x) {
	    return isCoreModule(x);
	};
	return isCore;
}

var sync$1;
var hasRequiredSync$1;

function requireSync$1 () {
	if (hasRequiredSync$1) return sync$1;
	hasRequiredSync$1 = 1;
	var isCore = /*@__PURE__*/ requireIsCoreModule();
	var fs = fs$2;
	var path = require$$0$1;
	var getHomedir = requireHomedir();
	var caller = requireCaller();
	var nodeModulesPaths = requireNodeModulesPaths();
	var normalizeOptions = requireNormalizeOptions();

	var realpathFS = process.platform !== 'win32' && fs.realpathSync && typeof fs.realpathSync.native === 'function' ? fs.realpathSync.native : fs.realpathSync;

	var homedir = getHomedir();
	var defaultPaths = function () {
	    return [
	        path.join(homedir, '.node_modules'),
	        path.join(homedir, '.node_libraries')
	    ];
	};

	var defaultIsFile = function isFile(file) {
	    try {
	        var stat = fs.statSync(file, { throwIfNoEntry: false });
	    } catch (e) {
	        if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false;
	        throw e;
	    }
	    return !!stat && (stat.isFile() || stat.isFIFO());
	};

	var defaultIsDir = function isDirectory(dir) {
	    try {
	        var stat = fs.statSync(dir, { throwIfNoEntry: false });
	    } catch (e) {
	        if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false;
	        throw e;
	    }
	    return !!stat && stat.isDirectory();
	};

	var defaultRealpathSync = function realpathSync(x) {
	    try {
	        return realpathFS(x);
	    } catch (realpathErr) {
	        if (realpathErr.code !== 'ENOENT') {
	            throw realpathErr;
	        }
	    }
	    return x;
	};

	var maybeRealpathSync = function maybeRealpathSync(realpathSync, x, opts) {
	    if (opts && opts.preserveSymlinks === false) {
	        return realpathSync(x);
	    }
	    return x;
	};

	var defaultReadPackageSync = function defaultReadPackageSync(readFileSync, pkgfile) {
	    var body = readFileSync(pkgfile);
	    try {
	        var pkg = JSON.parse(body);
	        return pkg;
	    } catch (jsonErr) {}
	};

	var getPackageCandidates = function getPackageCandidates(x, start, opts) {
	    var dirs = nodeModulesPaths(start, opts, x);
	    for (var i = 0; i < dirs.length; i++) {
	        dirs[i] = path.join(dirs[i], x);
	    }
	    return dirs;
	};

	sync$1 = function resolveSync(x, options) {
	    if (typeof x !== 'string') {
	        throw new TypeError('Path must be a string.');
	    }
	    var opts = normalizeOptions(x, options);

	    var isFile = opts.isFile || defaultIsFile;
	    var readFileSync = opts.readFileSync || fs.readFileSync;
	    var isDirectory = opts.isDirectory || defaultIsDir;
	    var realpathSync = opts.realpathSync || defaultRealpathSync;
	    var readPackageSync = opts.readPackageSync || defaultReadPackageSync;
	    if (opts.readFileSync && opts.readPackageSync) {
	        throw new TypeError('`readFileSync` and `readPackageSync` are mutually exclusive.');
	    }
	    var packageIterator = opts.packageIterator;

	    var extensions = opts.extensions || ['.js'];
	    var includeCoreModules = opts.includeCoreModules !== false;
	    var basedir = opts.basedir || path.dirname(caller());
	    var parent = opts.filename || basedir;

	    opts.paths = opts.paths || defaultPaths();

	    // ensure that `basedir` is an absolute path at this point, resolving against the process' current working directory
	    var absoluteStart = maybeRealpathSync(realpathSync, path.resolve(basedir), opts);

	    if ((/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/).test(x)) {
	        var res = path.resolve(absoluteStart, x);
	        if (x === '.' || x === '..' || x.slice(-1) === '/') res += '/';
	        var m = loadAsFileSync(res) || loadAsDirectorySync(res);
	        if (m) return maybeRealpathSync(realpathSync, m, opts);
	    } else if (includeCoreModules && isCore(x)) {
	        return x;
	    } else {
	        var n = loadNodeModulesSync(x, absoluteStart);
	        if (n) return maybeRealpathSync(realpathSync, n, opts);
	    }

	    var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
	    err.code = 'MODULE_NOT_FOUND';
	    throw err;

	    function loadAsFileSync(x) {
	        var pkg = loadpkg(path.dirname(x));

	        if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
	            var rfile = path.relative(pkg.dir, x);
	            var r = opts.pathFilter(pkg.pkg, x, rfile);
	            if (r) {
	                x = path.resolve(pkg.dir, r); // eslint-disable-line no-param-reassign
	            }
	        }

	        if (isFile(x)) {
	            return x;
	        }

	        for (var i = 0; i < extensions.length; i++) {
	            var file = x + extensions[i];
	            if (isFile(file)) {
	                return file;
	            }
	        }
	    }

	    function loadpkg(dir) {
	        if (dir === '' || dir === '/') return;
	        if (process.platform === 'win32' && (/^\w:[/\\]*$/).test(dir)) {
	            return;
	        }
	        if ((/[/\\]node_modules[/\\]*$/).test(dir)) return;

	        var pkgfile = path.join(maybeRealpathSync(realpathSync, dir, opts), 'package.json');

	        if (!isFile(pkgfile)) {
	            return loadpkg(path.dirname(dir));
	        }

	        var pkg = readPackageSync(readFileSync, pkgfile);

	        if (pkg && opts.packageFilter) {
	            // v2 will pass pkgfile
	            pkg = opts.packageFilter(pkg, /*pkgfile,*/ dir); // eslint-disable-line spaced-comment
	        }

	        return { pkg: pkg, dir: dir };
	    }

	    function loadAsDirectorySync(x) {
	        var pkgfile = path.join(maybeRealpathSync(realpathSync, x, opts), '/package.json');
	        if (isFile(pkgfile)) {
	            try {
	                var pkg = readPackageSync(readFileSync, pkgfile);
	            } catch (e) {}

	            if (pkg && opts.packageFilter) {
	                // v2 will pass pkgfile
	                pkg = opts.packageFilter(pkg, /*pkgfile,*/ x); // eslint-disable-line spaced-comment
	            }

	            if (pkg && pkg.main) {
	                if (typeof pkg.main !== 'string') {
	                    var mainError = new TypeError('package “' + pkg.name + '” `main` must be a string');
	                    mainError.code = 'INVALID_PACKAGE_MAIN';
	                    throw mainError;
	                }
	                if (pkg.main === '.' || pkg.main === './') {
	                    pkg.main = 'index';
	                }
	                try {
	                    var m = loadAsFileSync(path.resolve(x, pkg.main));
	                    if (m) return m;
	                    var n = loadAsDirectorySync(path.resolve(x, pkg.main));
	                    if (n) return n;
	                } catch (e) {}
	            }
	        }

	        return loadAsFileSync(path.join(x, '/index'));
	    }

	    function loadNodeModulesSync(x, start) {
	        var thunk = function () { return getPackageCandidates(x, start, opts); };
	        var dirs = packageIterator ? packageIterator(x, start, thunk, opts) : thunk();

	        for (var i = 0; i < dirs.length; i++) {
	            var dir = dirs[i];
	            if (isDirectory(path.dirname(dir))) {
	                var m = loadAsFileSync(dir);
	                if (m) return m;
	                var n = loadAsDirectorySync(dir);
	                if (n) return n;
	            }
	        }
	    }
	};
	return sync$1;
}

var resolve;
var hasRequiredResolve;

function requireResolve () {
	if (hasRequiredResolve) return resolve;
	hasRequiredResolve = 1;
	var async = requireAsync$1();
	async.core = requireCore();
	async.isCore = requireIsCore();
	async.sync = requireSync$1();

	resolve = async;
	return resolve;
}

var resolveExports = requireResolve();
var resolve$1 = /*@__PURE__*/getDefaultExportFromCjs(resolveExports);

// @ts-check
/** @typedef { import('estree').BaseNode} BaseNode */

/** @typedef {{
	skip: () => void;
	remove: () => void;
	replace: (node: BaseNode) => void;
}} WalkerContext */

class WalkerBase {
	constructor() {
		/** @type {boolean} */
		this.should_skip = false;

		/** @type {boolean} */
		this.should_remove = false;

		/** @type {BaseNode | null} */
		this.replacement = null;

		/** @type {WalkerContext} */
		this.context = {
			skip: () => (this.should_skip = true),
			remove: () => (this.should_remove = true),
			replace: (node) => (this.replacement = node)
		};
	}

	/**
	 *
	 * @param {any} parent
	 * @param {string} prop
	 * @param {number} index
	 * @param {BaseNode} node
	 */
	replace(parent, prop, index, node) {
		if (parent) {
			if (index !== null) {
				parent[prop][index] = node;
			} else {
				parent[prop] = node;
			}
		}
	}

	/**
	 *
	 * @param {any} parent
	 * @param {string} prop
	 * @param {number} index
	 */
	remove(parent, prop, index) {
		if (parent) {
			if (index !== null) {
				parent[prop].splice(index, 1);
			} else {
				delete parent[prop];
			}
		}
	}
}

// @ts-check

/** @typedef { import('estree').BaseNode} BaseNode */
/** @typedef { import('./walker.js').WalkerContext} WalkerContext */

/** @typedef {(
 *    this: WalkerContext,
 *    node: BaseNode,
 *    parent: BaseNode,
 *    key: string,
 *    index: number
 * ) => void} SyncHandler */

class SyncWalker extends WalkerBase {
	/**
	 *
	 * @param {SyncHandler} enter
	 * @param {SyncHandler} leave
	 */
	constructor(enter, leave) {
		super();

		/** @type {SyncHandler} */
		this.enter = enter;

		/** @type {SyncHandler} */
		this.leave = leave;
	}

	/**
	 *
	 * @param {BaseNode} node
	 * @param {BaseNode} parent
	 * @param {string} [prop]
	 * @param {number} [index]
	 * @returns {BaseNode}
	 */
	visit(node, parent, prop, index) {
		if (node) {
			if (this.enter) {
				const _should_skip = this.should_skip;
				const _should_remove = this.should_remove;
				const _replacement = this.replacement;
				this.should_skip = false;
				this.should_remove = false;
				this.replacement = null;

				this.enter.call(this.context, node, parent, prop, index);

				if (this.replacement) {
					node = this.replacement;
					this.replace(parent, prop, index, node);
				}

				if (this.should_remove) {
					this.remove(parent, prop, index);
				}

				const skipped = this.should_skip;
				const removed = this.should_remove;

				this.should_skip = _should_skip;
				this.should_remove = _should_remove;
				this.replacement = _replacement;

				if (skipped) return node;
				if (removed) return null;
			}

			for (const key in node) {
				const value = node[key];

				if (typeof value !== "object") {
					continue;
				} else if (Array.isArray(value)) {
					for (let i = 0; i < value.length; i += 1) {
						if (value[i] !== null && typeof value[i].type === 'string') {
							if (!this.visit(value[i], node, key, i)) {
								// removed
								i--;
							}
						}
					}
				} else if (value !== null && typeof value.type === "string") {
					this.visit(value, node, key, null);
				}
			}

			if (this.leave) {
				const _replacement = this.replacement;
				const _should_remove = this.should_remove;
				this.replacement = null;
				this.should_remove = false;

				this.leave.call(this.context, node, parent, prop, index);

				if (this.replacement) {
					node = this.replacement;
					this.replace(parent, prop, index, node);
				}

				if (this.should_remove) {
					this.remove(parent, prop, index);
				}

				const removed = this.should_remove;

				this.replacement = _replacement;
				this.should_remove = _should_remove;

				if (removed) return null;
			}
		}

		return node;
	}
}

// @ts-check

/** @typedef { import('estree').BaseNode} BaseNode */
/** @typedef { import('./sync.js').SyncHandler} SyncHandler */
/** @typedef { import('./async.js').AsyncHandler} AsyncHandler */

/**
 *
 * @param {BaseNode} ast
 * @param {{
 *   enter?: SyncHandler
 *   leave?: SyncHandler
 * }} walker
 * @returns {BaseNode}
 */
function walk(ast, { enter, leave }) {
	const instance = new SyncWalker(enter, leave);
	return instance.visit(ast, null);
}

var utils$1 = {};

var constants;
var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;

	const WIN_SLASH = '\\\\/';
	const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

	/**
	 * Posix glob regex
	 */

	const DOT_LITERAL = '\\.';
	const PLUS_LITERAL = '\\+';
	const QMARK_LITERAL = '\\?';
	const SLASH_LITERAL = '\\/';
	const ONE_CHAR = '(?=.)';
	const QMARK = '[^/]';
	const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
	const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
	const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
	const NO_DOT = `(?!${DOT_LITERAL})`;
	const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
	const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
	const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
	const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
	const STAR = `${QMARK}*?`;
	const SEP = '/';

	const POSIX_CHARS = {
	  DOT_LITERAL,
	  PLUS_LITERAL,
	  QMARK_LITERAL,
	  SLASH_LITERAL,
	  ONE_CHAR,
	  QMARK,
	  END_ANCHOR,
	  DOTS_SLASH,
	  NO_DOT,
	  NO_DOTS,
	  NO_DOT_SLASH,
	  NO_DOTS_SLASH,
	  QMARK_NO_DOT,
	  STAR,
	  START_ANCHOR,
	  SEP
	};

	/**
	 * Windows glob regex
	 */

	const WINDOWS_CHARS = {
	  ...POSIX_CHARS,

	  SLASH_LITERAL: `[${WIN_SLASH}]`,
	  QMARK: WIN_NO_SLASH,
	  STAR: `${WIN_NO_SLASH}*?`,
	  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
	  NO_DOT: `(?!${DOT_LITERAL})`,
	  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
	  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
	  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
	  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
	  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
	  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
	  SEP: '\\'
	};

	/**
	 * POSIX Bracket Regex
	 */

	const POSIX_REGEX_SOURCE = {
	  alnum: 'a-zA-Z0-9',
	  alpha: 'a-zA-Z',
	  ascii: '\\x00-\\x7F',
	  blank: ' \\t',
	  cntrl: '\\x00-\\x1F\\x7F',
	  digit: '0-9',
	  graph: '\\x21-\\x7E',
	  lower: 'a-z',
	  print: '\\x20-\\x7E ',
	  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
	  space: ' \\t\\r\\n\\v\\f',
	  upper: 'A-Z',
	  word: 'A-Za-z0-9_',
	  xdigit: 'A-Fa-f0-9'
	};

	constants = {
	  MAX_LENGTH: 1024 * 64,
	  POSIX_REGEX_SOURCE,

	  // regular expressions
	  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
	  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
	  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
	  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
	  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
	  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

	  // Replace globs with equivalent patterns to reduce parsing time.
	  REPLACEMENTS: {
	    __proto__: null,
	    '***': '*',
	    '**/**': '**',
	    '**/**/**': '**'
	  },

	  // Digits
	  CHAR_0: 48, /* 0 */
	  CHAR_9: 57, /* 9 */

	  // Alphabet chars.
	  CHAR_UPPERCASE_A: 65, /* A */
	  CHAR_LOWERCASE_A: 97, /* a */
	  CHAR_UPPERCASE_Z: 90, /* Z */
	  CHAR_LOWERCASE_Z: 122, /* z */

	  CHAR_LEFT_PARENTHESES: 40, /* ( */
	  CHAR_RIGHT_PARENTHESES: 41, /* ) */

	  CHAR_ASTERISK: 42, /* * */

	  // Non-alphabetic chars.
	  CHAR_AMPERSAND: 38, /* & */
	  CHAR_AT: 64, /* @ */
	  CHAR_BACKWARD_SLASH: 92, /* \ */
	  CHAR_CARRIAGE_RETURN: 13, /* \r */
	  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
	  CHAR_COLON: 58, /* : */
	  CHAR_COMMA: 44, /* , */
	  CHAR_DOT: 46, /* . */
	  CHAR_DOUBLE_QUOTE: 34, /* " */
	  CHAR_EQUAL: 61, /* = */
	  CHAR_EXCLAMATION_MARK: 33, /* ! */
	  CHAR_FORM_FEED: 12, /* \f */
	  CHAR_FORWARD_SLASH: 47, /* / */
	  CHAR_GRAVE_ACCENT: 96, /* ` */
	  CHAR_HASH: 35, /* # */
	  CHAR_HYPHEN_MINUS: 45, /* - */
	  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
	  CHAR_LEFT_CURLY_BRACE: 123, /* { */
	  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
	  CHAR_LINE_FEED: 10, /* \n */
	  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
	  CHAR_PERCENT: 37, /* % */
	  CHAR_PLUS: 43, /* + */
	  CHAR_QUESTION_MARK: 63, /* ? */
	  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
	  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
	  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
	  CHAR_SEMICOLON: 59, /* ; */
	  CHAR_SINGLE_QUOTE: 39, /* ' */
	  CHAR_SPACE: 32, /*   */
	  CHAR_TAB: 9, /* \t */
	  CHAR_UNDERSCORE: 95, /* _ */
	  CHAR_VERTICAL_LINE: 124, /* | */
	  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

	  /**
	   * Create EXTGLOB_CHARS
	   */

	  extglobChars(chars) {
	    return {
	      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
	      '?': { type: 'qmark', open: '(?:', close: ')?' },
	      '+': { type: 'plus', open: '(?:', close: ')+' },
	      '*': { type: 'star', open: '(?:', close: ')*' },
	      '@': { type: 'at', open: '(?:', close: ')' }
	    };
	  },

	  /**
	   * Create GLOB_CHARS
	   */

	  globChars(win32) {
	    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
	  }
	};
	return constants;
}

/*global navigator*/

var hasRequiredUtils$1;

function requireUtils$1 () {
	if (hasRequiredUtils$1) return utils$1;
	hasRequiredUtils$1 = 1;
	(function (exports) {

		const {
		  REGEX_BACKSLASH,
		  REGEX_REMOVE_BACKSLASH,
		  REGEX_SPECIAL_CHARS,
		  REGEX_SPECIAL_CHARS_GLOBAL
		} = /*@__PURE__*/ requireConstants();

		exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
		exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
		exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
		exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
		exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

		exports.isWindows = () => {
		  if (typeof navigator !== 'undefined' && navigator.platform) {
		    const platform = navigator.platform.toLowerCase();
		    return platform === 'win32' || platform === 'windows';
		  }

		  if (typeof process !== 'undefined' && process.platform) {
		    return process.platform === 'win32';
		  }

		  return false;
		};

		exports.removeBackslashes = str => {
		  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
		    return match === '\\' ? '' : match;
		  });
		};

		exports.escapeLast = (input, char, lastIdx) => {
		  const idx = input.lastIndexOf(char, lastIdx);
		  if (idx === -1) return input;
		  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
		  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
		};

		exports.removePrefix = (input, state = {}) => {
		  let output = input;
		  if (output.startsWith('./')) {
		    output = output.slice(2);
		    state.prefix = './';
		  }
		  return output;
		};

		exports.wrapOutput = (input, state = {}, options = {}) => {
		  const prepend = options.contains ? '' : '^';
		  const append = options.contains ? '' : '$';

		  let output = `${prepend}(?:${input})${append}`;
		  if (state.negated === true) {
		    output = `(?:^(?!${output}).*$)`;
		  }
		  return output;
		};

		exports.basename = (path, { windows } = {}) => {
		  const segs = path.split(windows ? /[\\/]/ : '/');
		  const last = segs[segs.length - 1];

		  if (last === '') {
		    return segs[segs.length - 2];
		  }

		  return last;
		}; 
	} (utils$1));
	return utils$1;
}

var scan_1;
var hasRequiredScan;

function requireScan () {
	if (hasRequiredScan) return scan_1;
	hasRequiredScan = 1;

	const utils = /*@__PURE__*/ requireUtils$1();
	const {
	  CHAR_ASTERISK,             /* * */
	  CHAR_AT,                   /* @ */
	  CHAR_BACKWARD_SLASH,       /* \ */
	  CHAR_COMMA,                /* , */
	  CHAR_DOT,                  /* . */
	  CHAR_EXCLAMATION_MARK,     /* ! */
	  CHAR_FORWARD_SLASH,        /* / */
	  CHAR_LEFT_CURLY_BRACE,     /* { */
	  CHAR_LEFT_PARENTHESES,     /* ( */
	  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
	  CHAR_PLUS,                 /* + */
	  CHAR_QUESTION_MARK,        /* ? */
	  CHAR_RIGHT_CURLY_BRACE,    /* } */
	  CHAR_RIGHT_PARENTHESES,    /* ) */
	  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
	} = /*@__PURE__*/ requireConstants();

	const isPathSeparator = code => {
	  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
	};

	const depth = token => {
	  if (token.isPrefix !== true) {
	    token.depth = token.isGlobstar ? Infinity : 1;
	  }
	};

	/**
	 * Quickly scans a glob pattern and returns an object with a handful of
	 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
	 * `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
	 * with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
	 *
	 * ```js
	 * const pm = require('picomatch');
	 * console.log(pm.scan('foo/bar/*.js'));
	 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
	 * ```
	 * @param {String} `str`
	 * @param {Object} `options`
	 * @return {Object} Returns an object with tokens and regex source string.
	 * @api public
	 */

	const scan = (input, options) => {
	  const opts = options || {};

	  const length = input.length - 1;
	  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
	  const slashes = [];
	  const tokens = [];
	  const parts = [];

	  let str = input;
	  let index = -1;
	  let start = 0;
	  let lastIndex = 0;
	  let isBrace = false;
	  let isBracket = false;
	  let isGlob = false;
	  let isExtglob = false;
	  let isGlobstar = false;
	  let braceEscaped = false;
	  let backslashes = false;
	  let negated = false;
	  let negatedExtglob = false;
	  let finished = false;
	  let braces = 0;
	  let prev;
	  let code;
	  let token = { value: '', depth: 0, isGlob: false };

	  const eos = () => index >= length;
	  const peek = () => str.charCodeAt(index + 1);
	  const advance = () => {
	    prev = code;
	    return str.charCodeAt(++index);
	  };

	  while (index < length) {
	    code = advance();
	    let next;

	    if (code === CHAR_BACKWARD_SLASH) {
	      backslashes = token.backslashes = true;
	      code = advance();

	      if (code === CHAR_LEFT_CURLY_BRACE) {
	        braceEscaped = true;
	      }
	      continue;
	    }

	    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
	      braces++;

	      while (eos() !== true && (code = advance())) {
	        if (code === CHAR_BACKWARD_SLASH) {
	          backslashes = token.backslashes = true;
	          advance();
	          continue;
	        }

	        if (code === CHAR_LEFT_CURLY_BRACE) {
	          braces++;
	          continue;
	        }

	        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
	          isBrace = token.isBrace = true;
	          isGlob = token.isGlob = true;
	          finished = true;

	          if (scanToEnd === true) {
	            continue;
	          }

	          break;
	        }

	        if (braceEscaped !== true && code === CHAR_COMMA) {
	          isBrace = token.isBrace = true;
	          isGlob = token.isGlob = true;
	          finished = true;

	          if (scanToEnd === true) {
	            continue;
	          }

	          break;
	        }

	        if (code === CHAR_RIGHT_CURLY_BRACE) {
	          braces--;

	          if (braces === 0) {
	            braceEscaped = false;
	            isBrace = token.isBrace = true;
	            finished = true;
	            break;
	          }
	        }
	      }

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }

	    if (code === CHAR_FORWARD_SLASH) {
	      slashes.push(index);
	      tokens.push(token);
	      token = { value: '', depth: 0, isGlob: false };

	      if (finished === true) continue;
	      if (prev === CHAR_DOT && index === (start + 1)) {
	        start += 2;
	        continue;
	      }

	      lastIndex = index + 1;
	      continue;
	    }

	    if (opts.noext !== true) {
	      const isExtglobChar = code === CHAR_PLUS
	        || code === CHAR_AT
	        || code === CHAR_ASTERISK
	        || code === CHAR_QUESTION_MARK
	        || code === CHAR_EXCLAMATION_MARK;

	      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
	        isGlob = token.isGlob = true;
	        isExtglob = token.isExtglob = true;
	        finished = true;
	        if (code === CHAR_EXCLAMATION_MARK && index === start) {
	          negatedExtglob = true;
	        }

	        if (scanToEnd === true) {
	          while (eos() !== true && (code = advance())) {
	            if (code === CHAR_BACKWARD_SLASH) {
	              backslashes = token.backslashes = true;
	              code = advance();
	              continue;
	            }

	            if (code === CHAR_RIGHT_PARENTHESES) {
	              isGlob = token.isGlob = true;
	              finished = true;
	              break;
	            }
	          }
	          continue;
	        }
	        break;
	      }
	    }

	    if (code === CHAR_ASTERISK) {
	      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
	      isGlob = token.isGlob = true;
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }
	      break;
	    }

	    if (code === CHAR_QUESTION_MARK) {
	      isGlob = token.isGlob = true;
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }
	      break;
	    }

	    if (code === CHAR_LEFT_SQUARE_BRACKET) {
	      while (eos() !== true && (next = advance())) {
	        if (next === CHAR_BACKWARD_SLASH) {
	          backslashes = token.backslashes = true;
	          advance();
	          continue;
	        }

	        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
	          isBracket = token.isBracket = true;
	          isGlob = token.isGlob = true;
	          finished = true;
	          break;
	        }
	      }

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }

	    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
	      negated = token.negated = true;
	      start++;
	      continue;
	    }

	    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
	      isGlob = token.isGlob = true;

	      if (scanToEnd === true) {
	        while (eos() !== true && (code = advance())) {
	          if (code === CHAR_LEFT_PARENTHESES) {
	            backslashes = token.backslashes = true;
	            code = advance();
	            continue;
	          }

	          if (code === CHAR_RIGHT_PARENTHESES) {
	            finished = true;
	            break;
	          }
	        }
	        continue;
	      }
	      break;
	    }

	    if (isGlob === true) {
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }
	  }

	  if (opts.noext === true) {
	    isExtglob = false;
	    isGlob = false;
	  }

	  let base = str;
	  let prefix = '';
	  let glob = '';

	  if (start > 0) {
	    prefix = str.slice(0, start);
	    str = str.slice(start);
	    lastIndex -= start;
	  }

	  if (base && isGlob === true && lastIndex > 0) {
	    base = str.slice(0, lastIndex);
	    glob = str.slice(lastIndex);
	  } else if (isGlob === true) {
	    base = '';
	    glob = str;
	  } else {
	    base = str;
	  }

	  if (base && base !== '' && base !== '/' && base !== str) {
	    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
	      base = base.slice(0, -1);
	    }
	  }

	  if (opts.unescape === true) {
	    if (glob) glob = utils.removeBackslashes(glob);

	    if (base && backslashes === true) {
	      base = utils.removeBackslashes(base);
	    }
	  }

	  const state = {
	    prefix,
	    input,
	    start,
	    base,
	    glob,
	    isBrace,
	    isBracket,
	    isGlob,
	    isExtglob,
	    isGlobstar,
	    negated,
	    negatedExtglob
	  };

	  if (opts.tokens === true) {
	    state.maxDepth = 0;
	    if (!isPathSeparator(code)) {
	      tokens.push(token);
	    }
	    state.tokens = tokens;
	  }

	  if (opts.parts === true || opts.tokens === true) {
	    let prevIndex;

	    for (let idx = 0; idx < slashes.length; idx++) {
	      const n = prevIndex ? prevIndex + 1 : start;
	      const i = slashes[idx];
	      const value = input.slice(n, i);
	      if (opts.tokens) {
	        if (idx === 0 && start !== 0) {
	          tokens[idx].isPrefix = true;
	          tokens[idx].value = prefix;
	        } else {
	          tokens[idx].value = value;
	        }
	        depth(tokens[idx]);
	        state.maxDepth += tokens[idx].depth;
	      }
	      if (idx !== 0 || value !== '') {
	        parts.push(value);
	      }
	      prevIndex = i;
	    }

	    if (prevIndex && prevIndex + 1 < input.length) {
	      const value = input.slice(prevIndex + 1);
	      parts.push(value);

	      if (opts.tokens) {
	        tokens[tokens.length - 1].value = value;
	        depth(tokens[tokens.length - 1]);
	        state.maxDepth += tokens[tokens.length - 1].depth;
	      }
	    }

	    state.slashes = slashes;
	    state.parts = parts;
	  }

	  return state;
	};

	scan_1 = scan;
	return scan_1;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;

	const constants = /*@__PURE__*/ requireConstants();
	const utils = /*@__PURE__*/ requireUtils$1();

	/**
	 * Constants
	 */

	const {
	  MAX_LENGTH,
	  POSIX_REGEX_SOURCE,
	  REGEX_NON_SPECIAL_CHARS,
	  REGEX_SPECIAL_CHARS_BACKREF,
	  REPLACEMENTS
	} = constants;

	/**
	 * Helpers
	 */

	const expandRange = (args, options) => {
	  if (typeof options.expandRange === 'function') {
	    return options.expandRange(...args, options);
	  }

	  args.sort();
	  const value = `[${args.join('-')}]`;

	  try {
	    /* eslint-disable-next-line no-new */
	    new RegExp(value);
	  } catch (ex) {
	    return args.map(v => utils.escapeRegex(v)).join('..');
	  }

	  return value;
	};

	/**
	 * Create the message for a syntax error
	 */

	const syntaxError = (type, char) => {
	  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
	};

	/**
	 * Parse the given input string.
	 * @param {String} input
	 * @param {Object} options
	 * @return {Object}
	 */

	const parse = (input, options) => {
	  if (typeof input !== 'string') {
	    throw new TypeError('Expected a string');
	  }

	  input = REPLACEMENTS[input] || input;

	  const opts = { ...options };
	  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

	  let len = input.length;
	  if (len > max) {
	    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
	  }

	  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
	  const tokens = [bos];

	  const capture = opts.capture ? '' : '?:';

	  // create constants based on platform, for windows or posix
	  const PLATFORM_CHARS = constants.globChars(opts.windows);
	  const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);

	  const {
	    DOT_LITERAL,
	    PLUS_LITERAL,
	    SLASH_LITERAL,
	    ONE_CHAR,
	    DOTS_SLASH,
	    NO_DOT,
	    NO_DOT_SLASH,
	    NO_DOTS_SLASH,
	    QMARK,
	    QMARK_NO_DOT,
	    STAR,
	    START_ANCHOR
	  } = PLATFORM_CHARS;

	  const globstar = opts => {
	    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
	  };

	  const nodot = opts.dot ? '' : NO_DOT;
	  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
	  let star = opts.bash === true ? globstar(opts) : STAR;

	  if (opts.capture) {
	    star = `(${star})`;
	  }

	  // minimatch options support
	  if (typeof opts.noext === 'boolean') {
	    opts.noextglob = opts.noext;
	  }

	  const state = {
	    input,
	    index: -1,
	    start: 0,
	    dot: opts.dot === true,
	    consumed: '',
	    output: '',
	    prefix: '',
	    backtrack: false,
	    negated: false,
	    brackets: 0,
	    braces: 0,
	    parens: 0,
	    quotes: 0,
	    globstar: false,
	    tokens
	  };

	  input = utils.removePrefix(input, state);
	  len = input.length;

	  const extglobs = [];
	  const braces = [];
	  const stack = [];
	  let prev = bos;
	  let value;

	  /**
	   * Tokenizing helpers
	   */

	  const eos = () => state.index === len - 1;
	  const peek = state.peek = (n = 1) => input[state.index + n];
	  const advance = state.advance = () => input[++state.index] || '';
	  const remaining = () => input.slice(state.index + 1);
	  const consume = (value = '', num = 0) => {
	    state.consumed += value;
	    state.index += num;
	  };

	  const append = token => {
	    state.output += token.output != null ? token.output : token.value;
	    consume(token.value);
	  };

	  const negate = () => {
	    let count = 1;

	    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
	      advance();
	      state.start++;
	      count++;
	    }

	    if (count % 2 === 0) {
	      return false;
	    }

	    state.negated = true;
	    state.start++;
	    return true;
	  };

	  const increment = type => {
	    state[type]++;
	    stack.push(type);
	  };

	  const decrement = type => {
	    state[type]--;
	    stack.pop();
	  };

	  /**
	   * Push tokens onto the tokens array. This helper speeds up
	   * tokenizing by 1) helping us avoid backtracking as much as possible,
	   * and 2) helping us avoid creating extra tokens when consecutive
	   * characters are plain text. This improves performance and simplifies
	   * lookbehinds.
	   */

	  const push = tok => {
	    if (prev.type === 'globstar') {
	      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
	      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

	      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
	        state.output = state.output.slice(0, -prev.output.length);
	        prev.type = 'star';
	        prev.value = '*';
	        prev.output = star;
	        state.output += prev.output;
	      }
	    }

	    if (extglobs.length && tok.type !== 'paren') {
	      extglobs[extglobs.length - 1].inner += tok.value;
	    }

	    if (tok.value || tok.output) append(tok);
	    if (prev && prev.type === 'text' && tok.type === 'text') {
	      prev.output = (prev.output || prev.value) + tok.value;
	      prev.value += tok.value;
	      return;
	    }

	    tok.prev = prev;
	    tokens.push(tok);
	    prev = tok;
	  };

	  const extglobOpen = (type, value) => {
	    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

	    token.prev = prev;
	    token.parens = state.parens;
	    token.output = state.output;
	    const output = (opts.capture ? '(' : '') + token.open;

	    increment('parens');
	    push({ type, value, output: state.output ? '' : ONE_CHAR });
	    push({ type: 'paren', extglob: true, value: advance(), output });
	    extglobs.push(token);
	  };

	  const extglobClose = token => {
	    let output = token.close + (opts.capture ? ')' : '');
	    let rest;

	    if (token.type === 'negate') {
	      let extglobStar = star;

	      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
	        extglobStar = globstar(opts);
	      }

	      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
	        output = token.close = `)$))${extglobStar}`;
	      }

	      if (token.inner.includes('*') && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
	        // Any non-magical string (`.ts`) or even nested expression (`.{ts,tsx}`) can follow after the closing parenthesis.
	        // In this case, we need to parse the string and use it in the output of the original pattern.
	        // Suitable patterns: `/!(*.d).ts`, `/!(*.d).{ts,tsx}`, `**/!(*-dbg).@(js)`.
	        //
	        // Disabling the `fastpaths` option due to a problem with parsing strings as `.ts` in the pattern like `**/!(*.d).ts`.
	        const expression = parse(rest, { ...options, fastpaths: false }).output;

	        output = token.close = `)${expression})${extglobStar})`;
	      }

	      if (token.prev.type === 'bos') {
	        state.negatedExtglob = true;
	      }
	    }

	    push({ type: 'paren', extglob: true, value, output });
	    decrement('parens');
	  };

	  /**
	   * Fast paths
	   */

	  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
	    let backslashes = false;

	    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
	      if (first === '\\') {
	        backslashes = true;
	        return m;
	      }

	      if (first === '?') {
	        if (esc) {
	          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
	        }
	        if (index === 0) {
	          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
	        }
	        return QMARK.repeat(chars.length);
	      }

	      if (first === '.') {
	        return DOT_LITERAL.repeat(chars.length);
	      }

	      if (first === '*') {
	        if (esc) {
	          return esc + first + (rest ? star : '');
	        }
	        return star;
	      }
	      return esc ? m : `\\${m}`;
	    });

	    if (backslashes === true) {
	      if (opts.unescape === true) {
	        output = output.replace(/\\/g, '');
	      } else {
	        output = output.replace(/\\+/g, m => {
	          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
	        });
	      }
	    }

	    if (output === input && opts.contains === true) {
	      state.output = input;
	      return state;
	    }

	    state.output = utils.wrapOutput(output, state, options);
	    return state;
	  }

	  /**
	   * Tokenize input until we reach end-of-string
	   */

	  while (!eos()) {
	    value = advance();

	    if (value === '\u0000') {
	      continue;
	    }

	    /**
	     * Escaped characters
	     */

	    if (value === '\\') {
	      const next = peek();

	      if (next === '/' && opts.bash !== true) {
	        continue;
	      }

	      if (next === '.' || next === ';') {
	        continue;
	      }

	      if (!next) {
	        value += '\\';
	        push({ type: 'text', value });
	        continue;
	      }

	      // collapse slashes to reduce potential for exploits
	      const match = /^\\+/.exec(remaining());
	      let slashes = 0;

	      if (match && match[0].length > 2) {
	        slashes = match[0].length;
	        state.index += slashes;
	        if (slashes % 2 !== 0) {
	          value += '\\';
	        }
	      }

	      if (opts.unescape === true) {
	        value = advance();
	      } else {
	        value += advance();
	      }

	      if (state.brackets === 0) {
	        push({ type: 'text', value });
	        continue;
	      }
	    }

	    /**
	     * If we're inside a regex character class, continue
	     * until we reach the closing bracket.
	     */

	    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
	      if (opts.posix !== false && value === ':') {
	        const inner = prev.value.slice(1);
	        if (inner.includes('[')) {
	          prev.posix = true;

	          if (inner.includes(':')) {
	            const idx = prev.value.lastIndexOf('[');
	            const pre = prev.value.slice(0, idx);
	            const rest = prev.value.slice(idx + 2);
	            const posix = POSIX_REGEX_SOURCE[rest];
	            if (posix) {
	              prev.value = pre + posix;
	              state.backtrack = true;
	              advance();

	              if (!bos.output && tokens.indexOf(prev) === 1) {
	                bos.output = ONE_CHAR;
	              }
	              continue;
	            }
	          }
	        }
	      }

	      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
	        value = `\\${value}`;
	      }

	      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
	        value = `\\${value}`;
	      }

	      if (opts.posix === true && value === '!' && prev.value === '[') {
	        value = '^';
	      }

	      prev.value += value;
	      append({ value });
	      continue;
	    }

	    /**
	     * If we're inside a quoted string, continue
	     * until we reach the closing double quote.
	     */

	    if (state.quotes === 1 && value !== '"') {
	      value = utils.escapeRegex(value);
	      prev.value += value;
	      append({ value });
	      continue;
	    }

	    /**
	     * Double quotes
	     */

	    if (value === '"') {
	      state.quotes = state.quotes === 1 ? 0 : 1;
	      if (opts.keepQuotes === true) {
	        push({ type: 'text', value });
	      }
	      continue;
	    }

	    /**
	     * Parentheses
	     */

	    if (value === '(') {
	      increment('parens');
	      push({ type: 'paren', value });
	      continue;
	    }

	    if (value === ')') {
	      if (state.parens === 0 && opts.strictBrackets === true) {
	        throw new SyntaxError(syntaxError('opening', '('));
	      }

	      const extglob = extglobs[extglobs.length - 1];
	      if (extglob && state.parens === extglob.parens + 1) {
	        extglobClose(extglobs.pop());
	        continue;
	      }

	      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
	      decrement('parens');
	      continue;
	    }

	    /**
	     * Square brackets
	     */

	    if (value === '[') {
	      if (opts.nobracket === true || !remaining().includes(']')) {
	        if (opts.nobracket !== true && opts.strictBrackets === true) {
	          throw new SyntaxError(syntaxError('closing', ']'));
	        }

	        value = `\\${value}`;
	      } else {
	        increment('brackets');
	      }

	      push({ type: 'bracket', value });
	      continue;
	    }

	    if (value === ']') {
	      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
	        push({ type: 'text', value, output: `\\${value}` });
	        continue;
	      }

	      if (state.brackets === 0) {
	        if (opts.strictBrackets === true) {
	          throw new SyntaxError(syntaxError('opening', '['));
	        }

	        push({ type: 'text', value, output: `\\${value}` });
	        continue;
	      }

	      decrement('brackets');

	      const prevValue = prev.value.slice(1);
	      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
	        value = `/${value}`;
	      }

	      prev.value += value;
	      append({ value });

	      // when literal brackets are explicitly disabled
	      // assume we should match with a regex character class
	      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
	        continue;
	      }

	      const escaped = utils.escapeRegex(prev.value);
	      state.output = state.output.slice(0, -prev.value.length);

	      // when literal brackets are explicitly enabled
	      // assume we should escape the brackets to match literal characters
	      if (opts.literalBrackets === true) {
	        state.output += escaped;
	        prev.value = escaped;
	        continue;
	      }

	      // when the user specifies nothing, try to match both
	      prev.value = `(${capture}${escaped}|${prev.value})`;
	      state.output += prev.value;
	      continue;
	    }

	    /**
	     * Braces
	     */

	    if (value === '{' && opts.nobrace !== true) {
	      increment('braces');

	      const open = {
	        type: 'brace',
	        value,
	        output: '(',
	        outputIndex: state.output.length,
	        tokensIndex: state.tokens.length
	      };

	      braces.push(open);
	      push(open);
	      continue;
	    }

	    if (value === '}') {
	      const brace = braces[braces.length - 1];

	      if (opts.nobrace === true || !brace) {
	        push({ type: 'text', value, output: value });
	        continue;
	      }

	      let output = ')';

	      if (brace.dots === true) {
	        const arr = tokens.slice();
	        const range = [];

	        for (let i = arr.length - 1; i >= 0; i--) {
	          tokens.pop();
	          if (arr[i].type === 'brace') {
	            break;
	          }
	          if (arr[i].type !== 'dots') {
	            range.unshift(arr[i].value);
	          }
	        }

	        output = expandRange(range, opts);
	        state.backtrack = true;
	      }

	      if (brace.comma !== true && brace.dots !== true) {
	        const out = state.output.slice(0, brace.outputIndex);
	        const toks = state.tokens.slice(brace.tokensIndex);
	        brace.value = brace.output = '\\{';
	        value = output = '\\}';
	        state.output = out;
	        for (const t of toks) {
	          state.output += (t.output || t.value);
	        }
	      }

	      push({ type: 'brace', value, output });
	      decrement('braces');
	      braces.pop();
	      continue;
	    }

	    /**
	     * Pipes
	     */

	    if (value === '|') {
	      if (extglobs.length > 0) {
	        extglobs[extglobs.length - 1].conditions++;
	      }
	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Commas
	     */

	    if (value === ',') {
	      let output = value;

	      const brace = braces[braces.length - 1];
	      if (brace && stack[stack.length - 1] === 'braces') {
	        brace.comma = true;
	        output = '|';
	      }

	      push({ type: 'comma', value, output });
	      continue;
	    }

	    /**
	     * Slashes
	     */

	    if (value === '/') {
	      // if the beginning of the glob is "./", advance the start
	      // to the current index, and don't add the "./" characters
	      // to the state. This greatly simplifies lookbehinds when
	      // checking for BOS characters like "!" and "." (not "./")
	      if (prev.type === 'dot' && state.index === state.start + 1) {
	        state.start = state.index + 1;
	        state.consumed = '';
	        state.output = '';
	        tokens.pop();
	        prev = bos; // reset "prev" to the first token
	        continue;
	      }

	      push({ type: 'slash', value, output: SLASH_LITERAL });
	      continue;
	    }

	    /**
	     * Dots
	     */

	    if (value === '.') {
	      if (state.braces > 0 && prev.type === 'dot') {
	        if (prev.value === '.') prev.output = DOT_LITERAL;
	        const brace = braces[braces.length - 1];
	        prev.type = 'dots';
	        prev.output += value;
	        prev.value += value;
	        brace.dots = true;
	        continue;
	      }

	      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
	        push({ type: 'text', value, output: DOT_LITERAL });
	        continue;
	      }

	      push({ type: 'dot', value, output: DOT_LITERAL });
	      continue;
	    }

	    /**
	     * Question marks
	     */

	    if (value === '?') {
	      const isGroup = prev && prev.value === '(';
	      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        extglobOpen('qmark', value);
	        continue;
	      }

	      if (prev && prev.type === 'paren') {
	        const next = peek();
	        let output = value;

	        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
	          output = `\\${value}`;
	        }

	        push({ type: 'text', value, output });
	        continue;
	      }

	      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
	        push({ type: 'qmark', value, output: QMARK_NO_DOT });
	        continue;
	      }

	      push({ type: 'qmark', value, output: QMARK });
	      continue;
	    }

	    /**
	     * Exclamation
	     */

	    if (value === '!') {
	      if (opts.noextglob !== true && peek() === '(') {
	        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
	          extglobOpen('negate', value);
	          continue;
	        }
	      }

	      if (opts.nonegate !== true && state.index === 0) {
	        negate();
	        continue;
	      }
	    }

	    /**
	     * Plus
	     */

	    if (value === '+') {
	      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        extglobOpen('plus', value);
	        continue;
	      }

	      if ((prev && prev.value === '(') || opts.regex === false) {
	        push({ type: 'plus', value, output: PLUS_LITERAL });
	        continue;
	      }

	      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
	        push({ type: 'plus', value });
	        continue;
	      }

	      push({ type: 'plus', value: PLUS_LITERAL });
	      continue;
	    }

	    /**
	     * Plain text
	     */

	    if (value === '@') {
	      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        push({ type: 'at', extglob: true, value, output: '' });
	        continue;
	      }

	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Plain text
	     */

	    if (value !== '*') {
	      if (value === '$' || value === '^') {
	        value = `\\${value}`;
	      }

	      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
	      if (match) {
	        value += match[0];
	        state.index += match[0].length;
	      }

	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Stars
	     */

	    if (prev && (prev.type === 'globstar' || prev.star === true)) {
	      prev.type = 'star';
	      prev.star = true;
	      prev.value += value;
	      prev.output = star;
	      state.backtrack = true;
	      state.globstar = true;
	      consume(value);
	      continue;
	    }

	    let rest = remaining();
	    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
	      extglobOpen('star', value);
	      continue;
	    }

	    if (prev.type === 'star') {
	      if (opts.noglobstar === true) {
	        consume(value);
	        continue;
	      }

	      const prior = prev.prev;
	      const before = prior.prev;
	      const isStart = prior.type === 'slash' || prior.type === 'bos';
	      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

	      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
	        push({ type: 'star', value, output: '' });
	        continue;
	      }

	      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
	      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
	      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
	        push({ type: 'star', value, output: '' });
	        continue;
	      }

	      // strip consecutive `/**/`
	      while (rest.slice(0, 3) === '/**') {
	        const after = input[state.index + 4];
	        if (after && after !== '/') {
	          break;
	        }
	        rest = rest.slice(3);
	        consume('/**', 3);
	      }

	      if (prior.type === 'bos' && eos()) {
	        prev.type = 'globstar';
	        prev.value += value;
	        prev.output = globstar(opts);
	        state.output = prev.output;
	        state.globstar = true;
	        consume(value);
	        continue;
	      }

	      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
	        state.output = state.output.slice(0, -(prior.output + prev.output).length);
	        prior.output = `(?:${prior.output}`;

	        prev.type = 'globstar';
	        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
	        prev.value += value;
	        state.globstar = true;
	        state.output += prior.output + prev.output;
	        consume(value);
	        continue;
	      }

	      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
	        const end = rest[1] !== void 0 ? '|$' : '';

	        state.output = state.output.slice(0, -(prior.output + prev.output).length);
	        prior.output = `(?:${prior.output}`;

	        prev.type = 'globstar';
	        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
	        prev.value += value;

	        state.output += prior.output + prev.output;
	        state.globstar = true;

	        consume(value + advance());

	        push({ type: 'slash', value: '/', output: '' });
	        continue;
	      }

	      if (prior.type === 'bos' && rest[0] === '/') {
	        prev.type = 'globstar';
	        prev.value += value;
	        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
	        state.output = prev.output;
	        state.globstar = true;
	        consume(value + advance());
	        push({ type: 'slash', value: '/', output: '' });
	        continue;
	      }

	      // remove single star from output
	      state.output = state.output.slice(0, -prev.output.length);

	      // reset previous token to globstar
	      prev.type = 'globstar';
	      prev.output = globstar(opts);
	      prev.value += value;

	      // reset output with globstar
	      state.output += prev.output;
	      state.globstar = true;
	      consume(value);
	      continue;
	    }

	    const token = { type: 'star', value, output: star };

	    if (opts.bash === true) {
	      token.output = '.*?';
	      if (prev.type === 'bos' || prev.type === 'slash') {
	        token.output = nodot + token.output;
	      }
	      push(token);
	      continue;
	    }

	    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
	      token.output = value;
	      push(token);
	      continue;
	    }

	    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
	      if (prev.type === 'dot') {
	        state.output += NO_DOT_SLASH;
	        prev.output += NO_DOT_SLASH;

	      } else if (opts.dot === true) {
	        state.output += NO_DOTS_SLASH;
	        prev.output += NO_DOTS_SLASH;

	      } else {
	        state.output += nodot;
	        prev.output += nodot;
	      }

	      if (peek() !== '*') {
	        state.output += ONE_CHAR;
	        prev.output += ONE_CHAR;
	      }
	    }

	    push(token);
	  }

	  while (state.brackets > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
	    state.output = utils.escapeLast(state.output, '[');
	    decrement('brackets');
	  }

	  while (state.parens > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
	    state.output = utils.escapeLast(state.output, '(');
	    decrement('parens');
	  }

	  while (state.braces > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
	    state.output = utils.escapeLast(state.output, '{');
	    decrement('braces');
	  }

	  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
	    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
	  }

	  // rebuild the output if we had to backtrack at any point
	  if (state.backtrack === true) {
	    state.output = '';

	    for (const token of state.tokens) {
	      state.output += token.output != null ? token.output : token.value;

	      if (token.suffix) {
	        state.output += token.suffix;
	      }
	    }
	  }

	  return state;
	};

	/**
	 * Fast paths for creating regular expressions for common glob patterns.
	 * This can significantly speed up processing and has very little downside
	 * impact when none of the fast paths match.
	 */

	parse.fastpaths = (input, options) => {
	  const opts = { ...options };
	  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
	  const len = input.length;
	  if (len > max) {
	    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
	  }

	  input = REPLACEMENTS[input] || input;

	  // create constants based on platform, for windows or posix
	  const {
	    DOT_LITERAL,
	    SLASH_LITERAL,
	    ONE_CHAR,
	    DOTS_SLASH,
	    NO_DOT,
	    NO_DOTS,
	    NO_DOTS_SLASH,
	    STAR,
	    START_ANCHOR
	  } = constants.globChars(opts.windows);

	  const nodot = opts.dot ? NO_DOTS : NO_DOT;
	  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
	  const capture = opts.capture ? '' : '?:';
	  const state = { negated: false, prefix: '' };
	  let star = opts.bash === true ? '.*?' : STAR;

	  if (opts.capture) {
	    star = `(${star})`;
	  }

	  const globstar = opts => {
	    if (opts.noglobstar === true) return star;
	    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
	  };

	  const create = str => {
	    switch (str) {
	      case '*':
	        return `${nodot}${ONE_CHAR}${star}`;

	      case '.*':
	        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '*.*':
	        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '*/*':
	        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

	      case '**':
	        return nodot + globstar(opts);

	      case '**/*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

	      case '**/*.*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '**/.*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

	      default: {
	        const match = /^(.*?)\.(\w+)$/.exec(str);
	        if (!match) return;

	        const source = create(match[1]);
	        if (!source) return;

	        return source + DOT_LITERAL + match[2];
	      }
	    }
	  };

	  const output = utils.removePrefix(input, state);
	  let source = create(output);

	  if (source && opts.strictSlashes !== true) {
	    source += `${SLASH_LITERAL}?`;
	  }

	  return source;
	};

	parse_1 = parse;
	return parse_1;
}

var picomatch_1$1;
var hasRequiredPicomatch$1;

function requirePicomatch$1 () {
	if (hasRequiredPicomatch$1) return picomatch_1$1;
	hasRequiredPicomatch$1 = 1;

	const scan = /*@__PURE__*/ requireScan();
	const parse = /*@__PURE__*/ requireParse();
	const utils = /*@__PURE__*/ requireUtils$1();
	const constants = /*@__PURE__*/ requireConstants();
	const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

	/**
	 * Creates a matcher function from one or more glob patterns. The
	 * returned function takes a string to match as its first argument,
	 * and returns true if the string is a match. The returned matcher
	 * function also takes a boolean as the second argument that, when true,
	 * returns an object with additional information.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch(glob[, options]);
	 *
	 * const isMatch = picomatch('*.!(*a)');
	 * console.log(isMatch('a.a')); //=> false
	 * console.log(isMatch('a.b')); //=> true
	 * ```
	 * @name picomatch
	 * @param {String|Array} `globs` One or more glob patterns.
	 * @param {Object=} `options`
	 * @return {Function=} Returns a matcher function.
	 * @api public
	 */

	const picomatch = (glob, options, returnState = false) => {
	  if (Array.isArray(glob)) {
	    const fns = glob.map(input => picomatch(input, options, returnState));
	    const arrayMatcher = str => {
	      for (const isMatch of fns) {
	        const state = isMatch(str);
	        if (state) return state;
	      }
	      return false;
	    };
	    return arrayMatcher;
	  }

	  const isState = isObject(glob) && glob.tokens && glob.input;

	  if (glob === '' || (typeof glob !== 'string' && !isState)) {
	    throw new TypeError('Expected pattern to be a non-empty string');
	  }

	  const opts = options || {};
	  const posix = opts.windows;
	  const regex = isState
	    ? picomatch.compileRe(glob, options)
	    : picomatch.makeRe(glob, options, false, true);

	  const state = regex.state;
	  delete regex.state;

	  let isIgnored = () => false;
	  if (opts.ignore) {
	    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
	    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
	  }

	  const matcher = (input, returnObject = false) => {
	    const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
	    const result = { glob, state, regex, posix, input, output, match, isMatch };

	    if (typeof opts.onResult === 'function') {
	      opts.onResult(result);
	    }

	    if (isMatch === false) {
	      result.isMatch = false;
	      return returnObject ? result : false;
	    }

	    if (isIgnored(input)) {
	      if (typeof opts.onIgnore === 'function') {
	        opts.onIgnore(result);
	      }
	      result.isMatch = false;
	      return returnObject ? result : false;
	    }

	    if (typeof opts.onMatch === 'function') {
	      opts.onMatch(result);
	    }
	    return returnObject ? result : true;
	  };

	  if (returnState) {
	    matcher.state = state;
	  }

	  return matcher;
	};

	/**
	 * Test `input` with the given `regex`. This is used by the main
	 * `picomatch()` function to test the input string.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.test(input, regex[, options]);
	 *
	 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
	 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
	 * ```
	 * @param {String} `input` String to test.
	 * @param {RegExp} `regex`
	 * @return {Object} Returns an object with matching info.
	 * @api public
	 */

	picomatch.test = (input, regex, options, { glob, posix } = {}) => {
	  if (typeof input !== 'string') {
	    throw new TypeError('Expected input to be a string');
	  }

	  if (input === '') {
	    return { isMatch: false, output: '' };
	  }

	  const opts = options || {};
	  const format = opts.format || (posix ? utils.toPosixSlashes : null);
	  let match = input === glob;
	  let output = (match && format) ? format(input) : input;

	  if (match === false) {
	    output = format ? format(input) : input;
	    match = output === glob;
	  }

	  if (match === false || opts.capture === true) {
	    if (opts.matchBase === true || opts.basename === true) {
	      match = picomatch.matchBase(input, regex, options, posix);
	    } else {
	      match = regex.exec(output);
	    }
	  }

	  return { isMatch: Boolean(match), match, output };
	};

	/**
	 * Match the basename of a filepath.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.matchBase(input, glob[, options]);
	 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
	 * ```
	 * @param {String} `input` String to test.
	 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
	 * @return {Boolean}
	 * @api public
	 */

	picomatch.matchBase = (input, glob, options) => {
	  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
	  return regex.test(utils.basename(input));
	};

	/**
	 * Returns true if **any** of the given glob `patterns` match the specified `string`.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.isMatch(string, patterns[, options]);
	 *
	 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
	 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
	 * ```
	 * @param {String|Array} str The string to test.
	 * @param {String|Array} patterns One or more glob patterns to use for matching.
	 * @param {Object} [options] See available [options](#options).
	 * @return {Boolean} Returns true if any patterns match `str`
	 * @api public
	 */

	picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

	/**
	 * Parse a glob pattern to create the source string for a regular
	 * expression.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * const result = picomatch.parse(pattern[, options]);
	 * ```
	 * @param {String} `pattern`
	 * @param {Object} `options`
	 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
	 * @api public
	 */

	picomatch.parse = (pattern, options) => {
	  if (Array.isArray(pattern)) return pattern.map(p => picomatch.parse(p, options));
	  return parse(pattern, { ...options, fastpaths: false });
	};

	/**
	 * Scan a glob pattern to separate the pattern into segments.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.scan(input[, options]);
	 *
	 * const result = picomatch.scan('!./foo/*.js');
	 * console.log(result);
	 * { prefix: '!./',
	 *   input: '!./foo/*.js',
	 *   start: 3,
	 *   base: 'foo',
	 *   glob: '*.js',
	 *   isBrace: false,
	 *   isBracket: false,
	 *   isGlob: true,
	 *   isExtglob: false,
	 *   isGlobstar: false,
	 *   negated: true }
	 * ```
	 * @param {String} `input` Glob pattern to scan.
	 * @param {Object} `options`
	 * @return {Object} Returns an object with
	 * @api public
	 */

	picomatch.scan = (input, options) => scan(input, options);

	/**
	 * Compile a regular expression from the `state` object returned by the
	 * [parse()](#parse) method.
	 *
	 * @param {Object} `state`
	 * @param {Object} `options`
	 * @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
	 * @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
	 * @return {RegExp}
	 * @api public
	 */

	picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
	  if (returnOutput === true) {
	    return state.output;
	  }

	  const opts = options || {};
	  const prepend = opts.contains ? '' : '^';
	  const append = opts.contains ? '' : '$';

	  let source = `${prepend}(?:${state.output})${append}`;
	  if (state && state.negated === true) {
	    source = `^(?!${source}).*$`;
	  }

	  const regex = picomatch.toRegex(source, options);
	  if (returnState === true) {
	    regex.state = state;
	  }

	  return regex;
	};

	/**
	 * Create a regular expression from a parsed glob pattern.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * const state = picomatch.parse('*.js');
	 * // picomatch.compileRe(state[, options]);
	 *
	 * console.log(picomatch.compileRe(state));
	 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	 * ```
	 * @param {String} `state` The object returned from the `.parse` method.
	 * @param {Object} `options`
	 * @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
	 * @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
	 * @return {RegExp} Returns a regex created from the given pattern.
	 * @api public
	 */

	picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
	  if (!input || typeof input !== 'string') {
	    throw new TypeError('Expected a non-empty string');
	  }

	  let parsed = { negated: false, fastpaths: true };

	  if (options.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
	    parsed.output = parse.fastpaths(input, options);
	  }

	  if (!parsed.output) {
	    parsed = parse(input, options);
	  }

	  return picomatch.compileRe(parsed, options, returnOutput, returnState);
	};

	/**
	 * Create a regular expression from the given regex source string.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.toRegex(source[, options]);
	 *
	 * const { output } = picomatch.parse('*.js');
	 * console.log(picomatch.toRegex(output));
	 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	 * ```
	 * @param {String} `source` Regular expression source string.
	 * @param {Object} `options`
	 * @return {RegExp}
	 * @api public
	 */

	picomatch.toRegex = (source, options) => {
	  try {
	    const opts = options || {};
	    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
	  } catch (err) {
	    if (options && options.debug === true) throw err;
	    return /$^/;
	  }
	};

	/**
	 * Picomatch constants.
	 * @return {Object}
	 */

	picomatch.constants = constants;

	/**
	 * Expose "picomatch"
	 */

	picomatch_1$1 = picomatch;
	return picomatch_1$1;
}

var picomatch_1;
var hasRequiredPicomatch;

function requirePicomatch () {
	if (hasRequiredPicomatch) return picomatch_1;
	hasRequiredPicomatch = 1;

	const pico = /*@__PURE__*/ requirePicomatch$1();
	const utils = /*@__PURE__*/ requireUtils$1();

	function picomatch(glob, options, returnState = false) {
	  // default to os.platform()
	  if (options && (options.windows === null || options.windows === undefined)) {
	    // don't mutate the original options object
	    options = { ...options, windows: utils.isWindows() };
	  }

	  return pico(glob, options, returnState);
	}

	Object.assign(picomatch, pico);
	picomatch_1 = picomatch;
	return picomatch_1;
}

var picomatchExports = /*@__PURE__*/ requirePicomatch();
var pm = /*@__PURE__*/getDefaultExportFromCjs(picomatchExports);

const extractors = {
    ArrayPattern(names, param) {
        for (const element of param.elements) {
            if (element)
                extractors[element.type](names, element);
        }
    },
    AssignmentPattern(names, param) {
        extractors[param.left.type](names, param.left);
    },
    Identifier(names, param) {
        names.push(param.name);
    },
    MemberExpression() { },
    ObjectPattern(names, param) {
        for (const prop of param.properties) {
            // @ts-ignore Typescript reports that this is not a valid type
            if (prop.type === 'RestElement') {
                extractors.RestElement(names, prop);
            }
            else {
                extractors[prop.value.type](names, prop.value);
            }
        }
    },
    RestElement(names, param) {
        extractors[param.argument.type](names, param.argument);
    }
};
const extractAssignedNames = function extractAssignedNames(param) {
    const names = [];
    extractors[param.type](names, param);
    return names;
};

const blockDeclarations = {
    const: true,
    let: true
};
class Scope {
    constructor(options = {}) {
        this.parent = options.parent;
        this.isBlockScope = !!options.block;
        this.declarations = Object.create(null);
        if (options.params) {
            options.params.forEach((param) => {
                extractAssignedNames(param).forEach((name) => {
                    this.declarations[name] = true;
                });
            });
        }
    }
    addDeclaration(node, isBlockDeclaration, isVar) {
        if (!isBlockDeclaration && this.isBlockScope) {
            // it's a `var` or function node, and this
            // is a block scope, so we need to go up
            this.parent.addDeclaration(node, isBlockDeclaration, isVar);
        }
        else if (node.id) {
            extractAssignedNames(node.id).forEach((name) => {
                this.declarations[name] = true;
            });
        }
    }
    contains(name) {
        return this.declarations[name] || (this.parent ? this.parent.contains(name) : false);
    }
}
const attachScopes = function attachScopes(ast, propertyName = 'scope') {
    let scope = new Scope();
    walk(ast, {
        enter(n, parent) {
            const node = n;
            // function foo () {...}
            // class Foo {...}
            if (/(?:Function|Class)Declaration/.test(node.type)) {
                scope.addDeclaration(node, false, false);
            }
            // var foo = 1
            if (node.type === 'VariableDeclaration') {
                const { kind } = node;
                const isBlockDeclaration = blockDeclarations[kind];
                node.declarations.forEach((declaration) => {
                    scope.addDeclaration(declaration, isBlockDeclaration, true);
                });
            }
            let newScope;
            // create new function scope
            if (node.type.includes('Function')) {
                const func = node;
                newScope = new Scope({
                    parent: scope,
                    block: false,
                    params: func.params
                });
                // named function expressions - the name is considered
                // part of the function's scope
                if (func.type === 'FunctionExpression' && func.id) {
                    newScope.addDeclaration(func, false, false);
                }
            }
            // create new for scope
            if (/For(?:In|Of)?Statement/.test(node.type)) {
                newScope = new Scope({
                    parent: scope,
                    block: true
                });
            }
            // create new block scope
            if (node.type === 'BlockStatement' && !parent.type.includes('Function')) {
                newScope = new Scope({
                    parent: scope,
                    block: true
                });
            }
            // catch clause has its own block scope
            if (node.type === 'CatchClause') {
                newScope = new Scope({
                    parent: scope,
                    params: node.param ? [node.param] : [],
                    block: true
                });
            }
            if (newScope) {
                Object.defineProperty(node, propertyName, {
                    value: newScope,
                    configurable: true
                });
                scope = newScope;
            }
        },
        leave(n) {
            const node = n;
            if (node[propertyName])
                scope = scope.parent;
        }
    });
    return scope;
};

// Helper since Typescript can't detect readonly arrays with Array.isArray
function isArray(arg) {
    return Array.isArray(arg);
}
function ensureArray(thing) {
    if (isArray(thing))
        return thing;
    if (thing == null)
        return [];
    return [thing];
}

const normalizePathRegExp = new RegExp(`\\${win32.sep}`, 'g');
const normalizePath = function normalizePath(filename) {
    return filename.replace(normalizePathRegExp, posix.sep);
};

function getMatcherString(id, resolutionBase) {
    if (resolutionBase === false || isAbsolute(id) || id.startsWith('**')) {
        return normalizePath(id);
    }
    // resolve('') is valid and will default to process.cwd()
    const basePath = normalizePath(resolve$2(resolutionBase || ''))
        // escape all possible (posix + win) path characters that might interfere with regex
        .replace(/[-^$*+?.()|[\]{}]/g, '\\$&');
    // Note that we use posix.join because:
    // 1. the basePath has been normalized to use /
    // 2. the incoming glob (id) matcher, also uses /
    // otherwise Node will force backslash (\) on windows
    return posix.join(basePath, normalizePath(id));
}
const createFilter = function createFilter(include, exclude, options) {
    const resolutionBase = options && options.resolve;
    const getMatcher = (id) => id instanceof RegExp
        ? id
        : {
            test: (what) => {
                // this refactor is a tad overly verbose but makes for easy debugging
                const pattern = getMatcherString(id, resolutionBase);
                const fn = pm(pattern, { dot: true });
                const result = fn(what);
                return result;
            }
        };
    const includeMatchers = ensureArray(include).map(getMatcher);
    const excludeMatchers = ensureArray(exclude).map(getMatcher);
    if (!includeMatchers.length && !excludeMatchers.length)
        return (id) => typeof id === 'string' && !id.includes('\0');
    return function result(id) {
        if (typeof id !== 'string')
            return false;
        if (id.includes('\0'))
            return false;
        const pathId = normalizePath(id);
        for (let i = 0; i < excludeMatchers.length; ++i) {
            const matcher = excludeMatchers[i];
            if (matcher instanceof RegExp) {
                matcher.lastIndex = 0;
            }
            if (matcher.test(pathId))
                return false;
        }
        for (let i = 0; i < includeMatchers.length; ++i) {
            const matcher = includeMatchers[i];
            if (matcher instanceof RegExp) {
                matcher.lastIndex = 0;
            }
            if (matcher.test(pathId))
                return true;
        }
        return !includeMatchers.length;
    };
};

const reservedWords = 'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public';
const builtins = 'arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl';
const forbiddenIdentifiers = new Set(`${reservedWords} ${builtins}`.split(' '));
forbiddenIdentifiers.add('');
const makeLegalIdentifier = function makeLegalIdentifier(str) {
    let identifier = str
        .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
        .replace(/[^$_a-zA-Z0-9]/g, '_');
    if (/\d/.test(identifier[0]) || forbiddenIdentifiers.has(identifier)) {
        identifier = `_${identifier}`;
    }
    return identifier || '_';
};

var version$1 = "16.0.1";
var peerDependencies$1 = {
	rollup: "^2.78.0||^3.0.0||^4.0.0"
};

promisify(fs$2.access);
const readFile$1 = promisify(fs$2.readFile);
const realpath = promisify(fs$2.realpath);
const stat = promisify(fs$2.stat);
async function fileExists(filePath) {
    try {
        const res = await stat(filePath);
        return res.isFile();
    }
    catch {
        return false;
    }
}
async function resolveSymlink$1(path) {
    return (await fileExists(path)) ? realpath(path) : path;
}

const onError = (error) => {
  if (error.code === 'ENOENT') {
    return false;
  }
  throw error;
};

const makeCache = (fn) => {
  const cache = new Map();
  const wrapped = async (param, done) => {
    if (cache.has(param) === false) {
      cache.set(
        param,
        fn(param).catch((err) => {
          cache.delete(param);
          throw err;
        })
      );
    }

    try {
      const result = cache.get(param);
      const value = await result;
      return done(null, value);
    } catch (error) {
      return done(error);
    }
  };

  wrapped.clear = () => cache.clear();

  return wrapped;
};

const isDirCached = makeCache(async (file) => {
  try {
    const stats = await stat(file);
    return stats.isDirectory();
  } catch (error) {
    return onError(error);
  }
});

const isFileCached = makeCache(async (file) => {
  try {
    const stats = await stat(file);
    return stats.isFile();
  } catch (error) {
    return onError(error);
  }
});

const readCachedFile = makeCache(readFile$1);

function handleDeprecatedOptions(opts) {
  const warnings = [];

  if (opts.customResolveOptions) {
    const { customResolveOptions } = opts;
    if (customResolveOptions.moduleDirectory) {
      // eslint-disable-next-line no-param-reassign
      opts.moduleDirectories = Array.isArray(customResolveOptions.moduleDirectory)
        ? customResolveOptions.moduleDirectory
        : [customResolveOptions.moduleDirectory];

      warnings.push(
        'node-resolve: The `customResolveOptions.moduleDirectory` option has been deprecated. Use `moduleDirectories`, which must be an array.'
      );
    }

    if (customResolveOptions.preserveSymlinks) {
      throw new Error(
        'node-resolve: `customResolveOptions.preserveSymlinks` is no longer an option. We now always use the rollup `preserveSymlinks` option.'
      );
    }

    [
      'basedir',
      'package',
      'extensions',
      'includeCoreModules',
      'readFile',
      'isFile',
      'isDirectory',
      'realpath',
      'packageFilter',
      'pathFilter',
      'paths',
      'packageIterator'
    ].forEach((resolveOption) => {
      if (customResolveOptions[resolveOption]) {
        throw new Error(
          `node-resolve: \`customResolveOptions.${resolveOption}\` is no longer an option. If you need this, please open an issue.`
        );
      }
    });
  }

  return { warnings };
}

// returns the imported package name for bare module imports
function getPackageName(id) {
  if (id.startsWith('.') || id.startsWith('/')) {
    return null;
  }

  const split = id.split('/');

  // @my-scope/my-package/foo.js -> @my-scope/my-package
  // @my-scope/my-package -> @my-scope/my-package
  if (split[0][0] === '@') {
    return `${split[0]}/${split[1]}`;
  }

  // my-package/foo.js -> my-package
  // my-package -> my-package
  return split[0];
}

function getMainFields(options) {
  let mainFields;
  if (options.mainFields) {
    ({ mainFields } = options);
  } else {
    mainFields = ['module', 'main'];
  }
  if (options.browser && mainFields.indexOf('browser') === -1) {
    return ['browser'].concat(mainFields);
  }
  if (!mainFields.length) {
    throw new Error('Please ensure at least one `mainFields` value is specified');
  }
  return mainFields;
}

function getPackageInfo(options) {
  const {
    cache,
    extensions,
    pkg,
    mainFields,
    preserveSymlinks,
    useBrowserOverrides,
    rootDir,
    ignoreSideEffectsForRoot
  } = options;
  let { pkgPath } = options;

  if (cache.has(pkgPath)) {
    return cache.get(pkgPath);
  }

  // browserify/resolve doesn't realpath paths returned in its packageFilter callback
  if (!preserveSymlinks) {
    pkgPath = realpathSync(pkgPath);
  }

  const pkgRoot = dirname(pkgPath);

  const packageInfo = {
    // copy as we are about to munge the `main` field of `pkg`.
    packageJson: { ...pkg },

    // path to package.json file
    packageJsonPath: pkgPath,

    // directory containing the package.json
    root: pkgRoot,

    // which main field was used during resolution of this module (main, module, or browser)
    resolvedMainField: 'main',

    // whether the browser map was used to resolve the entry point to this module
    browserMappedMain: false,

    // the entry point of the module with respect to the selected main field and any
    // relevant browser mappings.
    resolvedEntryPoint: ''
  };

  let overriddenMain = false;
  for (let i = 0; i < mainFields.length; i++) {
    const field = mainFields[i];
    if (typeof pkg[field] === 'string') {
      pkg.main = pkg[field];
      packageInfo.resolvedMainField = field;
      overriddenMain = true;
      break;
    }
  }

  const internalPackageInfo = {
    cachedPkg: pkg,
    hasModuleSideEffects: () => null,
    hasPackageEntry: overriddenMain !== false || mainFields.indexOf('main') !== -1,
    packageBrowserField:
      useBrowserOverrides &&
      typeof pkg.browser === 'object' &&
      Object.keys(pkg.browser).reduce((browser, key) => {
        let resolved = pkg.browser[key];
        if (resolved && resolved[0] === '.') {
          resolved = resolve$2(pkgRoot, resolved);
        }
        /* eslint-disable no-param-reassign */
        browser[key] = resolved;
        if (key[0] === '.') {
          const absoluteKey = resolve$2(pkgRoot, key);
          browser[absoluteKey] = resolved;
          if (!extname(key)) {
            extensions.reduce((subBrowser, ext) => {
              subBrowser[absoluteKey + ext] = subBrowser[key];
              return subBrowser;
            }, browser);
          }
        }
        return browser;
      }, {}),
    packageInfo
  };

  const browserMap = internalPackageInfo.packageBrowserField;
  if (
    useBrowserOverrides &&
    typeof pkg.browser === 'object' &&
    // eslint-disable-next-line no-prototype-builtins
    browserMap.hasOwnProperty(pkg.main)
  ) {
    packageInfo.resolvedEntryPoint = browserMap[pkg.main];
    packageInfo.browserMappedMain = true;
  } else {
    // index.node is technically a valid default entrypoint as well...
    packageInfo.resolvedEntryPoint = resolve$2(pkgRoot, pkg.main || 'index.js');
    packageInfo.browserMappedMain = false;
  }

  if (!ignoreSideEffectsForRoot || rootDir !== pkgRoot) {
    const packageSideEffects = pkg.sideEffects;
    if (typeof packageSideEffects === 'boolean') {
      internalPackageInfo.hasModuleSideEffects = () => packageSideEffects;
    } else if (Array.isArray(packageSideEffects)) {
      const finalPackageSideEffects = packageSideEffects.map((sideEffect) => {
        /*
         * The array accepts simple glob patterns to the relevant files... Patterns like .css, which do not include a /, will be treated like **\/.css.
         * https://webpack.js.org/guides/tree-shaking/
         */
        if (sideEffect.includes('/')) {
          return sideEffect;
        }
        return `**/${sideEffect}`;
      });
      internalPackageInfo.hasModuleSideEffects = createFilter(finalPackageSideEffects, null, {
        resolve: pkgRoot
      });
    }
  }

  cache.set(pkgPath, internalPackageInfo);
  return internalPackageInfo;
}

function normalizeInput(input) {
  if (Array.isArray(input)) {
    return input;
  } else if (typeof input === 'object') {
    return Object.values(input);
  }

  // otherwise it's a string
  return [input];
}

/* eslint-disable no-await-in-loop */
function isModuleDir(current, moduleDirs) {
    return moduleDirs.some((dir) => current.endsWith(dir));
}
async function findPackageJson(base, moduleDirs) {
    const { root } = require$$0$1.parse(base);
    let current = base;
    while (current !== root && !isModuleDir(current, moduleDirs)) {
        const pkgJsonPath = require$$0$1.join(current, 'package.json');
        if (await fileExists(pkgJsonPath)) {
            const pkgJsonString = fs$2.readFileSync(pkgJsonPath, 'utf-8');
            return { pkgJson: JSON.parse(pkgJsonString), pkgPath: current, pkgJsonPath };
        }
        current = require$$0$1.resolve(current, '..');
    }
    return null;
}
function isUrl(str) {
    try {
        return !!new URL(str);
    }
    catch (_) {
        return false;
    }
}
/**
 * Conditions is an export object where all keys are conditions like 'node' (aka do not with '.')
 */
function isConditions(exports) {
    return typeof exports === 'object' && Object.keys(exports).every((k) => !k.startsWith('.'));
}
/**
 * Mappings is an export object where all keys start with '.
 */
function isMappings(exports) {
    return typeof exports === 'object' && !isConditions(exports);
}
/**
 * Check for mixed exports, which are exports where some keys start with '.' and some do not
 */
function isMixedExports(exports) {
    const keys = Object.keys(exports);
    return keys.some((k) => k.startsWith('.')) && keys.some((k) => !k.startsWith('.'));
}
function createBaseErrorMsg(importSpecifier, importer) {
    return `Could not resolve import "${importSpecifier}" in ${importer}`;
}
function createErrorMsg(context, reason, isImports) {
    const { importSpecifier, importer, pkgJsonPath } = context;
    const base = createBaseErrorMsg(importSpecifier, importer);
    const field = isImports ? 'imports' : 'exports';
    return `${base} using ${field} defined in ${pkgJsonPath}.${reason ? ` ${reason}` : ''}`;
}
class ResolveError extends Error {
}
class InvalidConfigurationError extends ResolveError {
    constructor(context, reason) {
        super(createErrorMsg(context, `Invalid "exports" field. ${reason}`));
    }
}
class InvalidModuleSpecifierError extends ResolveError {
    constructor(context, isImports, reason) {
        super(createErrorMsg(context, reason, isImports));
    }
}
class InvalidPackageTargetError extends ResolveError {
    constructor(context, reason) {
        super(createErrorMsg(context, reason));
    }
}

/* eslint-disable no-await-in-loop, no-undefined */
/**
 * Check for invalid path segments
 */
function includesInvalidSegments(pathSegments, moduleDirs) {
    const invalidSegments = ['', '.', '..', ...moduleDirs];
    // contains any "", ".", "..", or "node_modules" segments, including percent encoded variants
    return pathSegments.some((v) => invalidSegments.includes(v) || invalidSegments.includes(decodeURI(v)));
}
async function resolvePackageTarget(context, { target, patternMatch, isImports }) {
    // If target is a String, then
    if (typeof target === 'string') {
        // If target does not start with "./", then
        if (!target.startsWith('./')) {
            // If isImports is false, or if target starts with "../" or "/", or if target is a valid URL, then
            if (!isImports || ['/', '../'].some((p) => target.startsWith(p)) || isUrl(target)) {
                // Throw an Invalid Package Target error.
                throw new InvalidPackageTargetError(context, `Invalid mapping: "${target}".`);
            }
            // If patternMatch is a String, then
            if (typeof patternMatch === 'string') {
                // Return PACKAGE_RESOLVE(target with every instance of "*" replaced by patternMatch, packageURL + "/")
                const result = await context.resolveId(target.replace(/\*/g, patternMatch), context.pkgURL.href);
                return result ? pathToFileURL(result.location).href : null;
            }
            // Return PACKAGE_RESOLVE(target, packageURL + "/").
            const result = await context.resolveId(target, context.pkgURL.href);
            return result ? pathToFileURL(result.location).href : null;
        }
        // TODO: Drop if we do not support Node <= 16 anymore
        // This behavior was removed in Node 17 (deprecated in Node 14), see DEP0148
        if (context.allowExportsFolderMapping) {
            target = target.replace(/\/$/, '/*');
        }
        // If target split on "/" or "\"
        {
            const pathSegments = target.split(/\/|\\/);
            // after the first "." segment
            const firstDot = pathSegments.indexOf('.');
            firstDot !== -1 && pathSegments.slice(firstDot);
            if (firstDot !== -1 &&
                firstDot < pathSegments.length - 1 &&
                includesInvalidSegments(pathSegments.slice(firstDot + 1), context.moduleDirs)) {
                throw new InvalidPackageTargetError(context, `Invalid mapping: "${target}".`);
            }
        }
        // Let resolvedTarget be the URL resolution of the concatenation of packageURL and target.
        const resolvedTarget = new URL(target, context.pkgURL);
        // Assert: resolvedTarget is contained in packageURL.
        if (!resolvedTarget.href.startsWith(context.pkgURL.href)) {
            throw new InvalidPackageTargetError(context, `Resolved to ${resolvedTarget.href} which is outside package ${context.pkgURL.href}`);
        }
        // If patternMatch is null, then
        if (!patternMatch) {
            // Return resolvedTarget.
            return resolvedTarget;
        }
        // If patternMatch split on "/" or "\" contains invalid segments
        if (includesInvalidSegments(patternMatch.split(/\/|\\/), context.moduleDirs)) {
            // throw an Invalid Module Specifier error.
            throw new InvalidModuleSpecifierError(context);
        }
        // Return the URL resolution of resolvedTarget with every instance of "*" replaced with patternMatch.
        return resolvedTarget.href.replace(/\*/g, patternMatch);
    }
    // Otherwise, if target is an Array, then
    if (Array.isArray(target)) {
        // If _target.length is zero, return null.
        if (target.length === 0) {
            return null;
        }
        let lastError = null;
        // For each item in target, do
        for (const item of target) {
            // Let resolved be the result of PACKAGE_TARGET_RESOLVE of the item
            // continuing the loop on any Invalid Package Target error.
            try {
                const resolved = await resolvePackageTarget(context, {
                    target: item,
                    patternMatch,
                    isImports
                });
                // If resolved is undefined, continue the loop.
                // Else Return resolved.
                if (resolved !== undefined) {
                    return resolved;
                }
            }
            catch (error) {
                if (!(error instanceof InvalidPackageTargetError)) {
                    throw error;
                }
                else {
                    lastError = error;
                }
            }
        }
        // Return or throw the last fallback resolution null return or error
        if (lastError) {
            throw lastError;
        }
        return null;
    }
    // Otherwise, if target is a non-null Object, then
    if (target && typeof target === 'object') {
        // For each property of target
        for (const [key, value] of Object.entries(target)) {
            // If exports contains any index property keys, as defined in ECMA-262 6.1.7 Array Index, throw an Invalid Package Configuration error.
            // TODO: We do not check if the key is a number here...
            // If key equals "default" or conditions contains an entry for the key, then
            if (key === 'default' || context.conditions.includes(key)) {
                // Let targetValue be the value of the property in target.
                // Let resolved be the result of PACKAGE_TARGET_RESOLVE of the targetValue
                const resolved = await resolvePackageTarget(context, {
                    target: value,
                    patternMatch,
                    isImports
                });
                // If resolved is equal to undefined, continue the loop.
                // Return resolved.
                if (resolved !== undefined) {
                    return resolved;
                }
            }
        }
        // Return undefined.
        return undefined;
    }
    // Otherwise, if target is null, return null.
    if (target === null) {
        return null;
    }
    // Otherwise throw an Invalid Package Target error.
    throw new InvalidPackageTargetError(context, `Invalid exports field.`);
}

/* eslint-disable no-await-in-loop */
/**
 * Implementation of Node's `PATTERN_KEY_COMPARE` function
 */
function nodePatternKeyCompare(keyA, keyB) {
    // Let baseLengthA be the index of "*" in keyA plus one, if keyA contains "*", or the length of keyA otherwise.
    const baseLengthA = keyA.includes('*') ? keyA.indexOf('*') + 1 : keyA.length;
    // Let baseLengthB be the index of "*" in keyB plus one, if keyB contains "*", or the length of keyB otherwise.
    const baseLengthB = keyB.includes('*') ? keyB.indexOf('*') + 1 : keyB.length;
    // if baseLengthA is greater, return -1, if lower 1
    const rval = baseLengthB - baseLengthA;
    if (rval !== 0)
        return rval;
    // If keyA does not contain "*", return 1.
    if (!keyA.includes('*'))
        return 1;
    // If keyB does not contain "*", return -1.
    if (!keyB.includes('*'))
        return -1;
    // If the length of keyA is greater than the length of keyB, return -1.
    // If the length of keyB is greater than the length of keyA, return 1.
    // Else Return 0.
    return keyB.length - keyA.length;
}
async function resolvePackageImportsExports(context, { matchKey, matchObj, isImports }) {
    // If matchKey is a key of matchObj and does not contain "*", then
    if (!matchKey.includes('*') && matchKey in matchObj) {
        // Let target be the value of matchObj[matchKey].
        const target = matchObj[matchKey];
        // Return the result of PACKAGE_TARGET_RESOLVE(packageURL, target, null, isImports, conditions).
        const resolved = await resolvePackageTarget(context, { target, patternMatch: '', isImports });
        return resolved;
    }
    // Let expansionKeys be the list of keys of matchObj containing only a single "*"
    const expansionKeys = Object.keys(matchObj)
        // Assert: ends with "/" or contains only a single "*".
        .filter((k) => k.endsWith('/') || k.includes('*'))
        // sorted by the sorting function PATTERN_KEY_COMPARE which orders in descending order of specificity.
        .sort(nodePatternKeyCompare);
    // For each key expansionKey in expansionKeys, do
    for (const expansionKey of expansionKeys) {
        const indexOfAsterisk = expansionKey.indexOf('*');
        // Let patternBase be the substring of expansionKey up to but excluding the first "*" character.
        const patternBase = indexOfAsterisk === -1 ? expansionKey : expansionKey.substring(0, indexOfAsterisk);
        // If matchKey starts with but is not equal to patternBase, then
        if (matchKey.startsWith(patternBase) && matchKey !== patternBase) {
            // Let patternTrailer be the substring of expansionKey from the index after the first "*" character.
            const patternTrailer = indexOfAsterisk !== -1 ? expansionKey.substring(indexOfAsterisk + 1) : '';
            // If patternTrailer has zero length,
            if (patternTrailer.length === 0 ||
                // or if matchKey ends with patternTrailer and the length of matchKey is greater than or equal to the length of expansionKey, then
                (matchKey.endsWith(patternTrailer) && matchKey.length >= expansionKey.length)) {
                // Let target be the value of matchObj[expansionKey].
                const target = matchObj[expansionKey];
                // Let patternMatch be the substring of matchKey starting at the index of the length of patternBase up to the length
                // of matchKey minus the length of patternTrailer.
                const patternMatch = matchKey.substring(patternBase.length, matchKey.length - patternTrailer.length);
                // Return the result of PACKAGE_TARGET_RESOLVE
                const resolved = await resolvePackageTarget(context, {
                    target,
                    patternMatch,
                    isImports
                });
                return resolved;
            }
        }
    }
    throw new InvalidModuleSpecifierError(context, isImports);
}

/**
 * Implementation of PACKAGE_EXPORTS_RESOLVE
 */
async function resolvePackageExports(context, subpath, exports) {
    // If exports is an Object with both a key starting with "." and a key not starting with "."
    if (isMixedExports(exports)) {
        // throw an Invalid Package Configuration error.
        throw new InvalidConfigurationError(context, 'All keys must either start with ./, or without one.');
    }
    // If subpath is equal to ".", then
    if (subpath === '.') {
        // Let mainExport be undefined.
        let mainExport;
        // If exports is a String or Array, or an Object containing no keys starting with ".", then
        if (typeof exports === 'string' || Array.isArray(exports) || isConditions(exports)) {
            // Set mainExport to exports
            mainExport = exports;
            // Otherwise if exports is an Object containing a "." property, then
        }
        else if (isMappings(exports)) {
            // Set mainExport to exports["."]
            mainExport = exports['.'];
        }
        // If mainExport is not undefined, then
        if (mainExport) {
            // Let resolved be the result of PACKAGE_TARGET_RESOLVE with target = mainExport
            const resolved = await resolvePackageTarget(context, {
                target: mainExport,
                patternMatch: '',
                isImports: false
            });
            // If resolved is not null or undefined, return resolved.
            if (resolved) {
                return resolved;
            }
        }
        // Otherwise, if exports is an Object and all keys of exports start with ".", then
    }
    else if (isMappings(exports)) {
        // Let resolved be the result of PACKAGE_IMPORTS_EXPORTS_RESOLVE
        const resolvedMatch = await resolvePackageImportsExports(context, {
            matchKey: subpath,
            matchObj: exports,
            isImports: false
        });
        // If resolved is not null or undefined, return resolved.
        if (resolvedMatch) {
            return resolvedMatch;
        }
    }
    // Throw a Package Path Not Exported error.
    throw new InvalidModuleSpecifierError(context);
}

async function resolvePackageImports({ importSpecifier, importer, moduleDirs, conditions, resolveId }) {
    const result = await findPackageJson(importer, moduleDirs);
    if (!result) {
        throw new Error(`${createBaseErrorMsg(importSpecifier, importer)}. Could not find a parent package.json.`);
    }
    const { pkgPath, pkgJsonPath, pkgJson } = result;
    const pkgURL = pathToFileURL(`${pkgPath}/`);
    const context = {
        importer,
        importSpecifier,
        moduleDirs,
        pkgURL,
        pkgJsonPath,
        conditions,
        resolveId
    };
    // Assert: specifier begins with "#".
    if (!importSpecifier.startsWith('#')) {
        throw new InvalidModuleSpecifierError(context, true, 'Invalid import specifier.');
    }
    // If specifier is exactly equal to "#" or starts with "#/", then
    if (importSpecifier === '#' || importSpecifier.startsWith('#/')) {
        // Throw an Invalid Module Specifier error.
        throw new InvalidModuleSpecifierError(context, true, 'Invalid import specifier.');
    }
    const { imports } = pkgJson;
    if (!imports) {
        throw new InvalidModuleSpecifierError(context, true);
    }
    // Let packageURL be the result of LOOKUP_PACKAGE_SCOPE(parentURL).
    // If packageURL is not null, then
    return resolvePackageImportsExports(context, {
        matchKey: importSpecifier,
        matchObj: imports,
        isImports: true
    });
}

const resolveImportPath = promisify(resolve$1);
const readFile = promisify(fs$2.readFile);

async function getPackageJson(importer, pkgName, resolveOptions, moduleDirectories) {
  if (importer) {
    const selfPackageJsonResult = await findPackageJson(importer, moduleDirectories);
    if (selfPackageJsonResult && selfPackageJsonResult.pkgJson.name === pkgName) {
      // the referenced package name is the current package
      return selfPackageJsonResult;
    }
  }

  try {
    const pkgJsonPath = await resolveImportPath(`${pkgName}/package.json`, resolveOptions);
    const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf-8'));
    return { pkgJsonPath, pkgJson, pkgPath: dirname(pkgJsonPath) };
  } catch (_) {
    return null;
  }
}

async function resolveIdClassic({
  importSpecifier,
  packageInfoCache,
  extensions,
  mainFields,
  preserveSymlinks,
  useBrowserOverrides,
  baseDir,
  moduleDirectories,
  modulePaths,
  rootDir,
  ignoreSideEffectsForRoot
}) {
  let hasModuleSideEffects = () => null;
  let hasPackageEntry = true;
  let packageBrowserField = false;
  let packageInfo;

  const filter = (pkg, pkgPath) => {
    const info = getPackageInfo({
      cache: packageInfoCache,
      extensions,
      pkg,
      pkgPath,
      mainFields,
      preserveSymlinks,
      useBrowserOverrides,
      rootDir,
      ignoreSideEffectsForRoot
    });

    ({ packageInfo, hasModuleSideEffects, hasPackageEntry, packageBrowserField } = info);

    return info.cachedPkg;
  };

  const resolveOptions = {
    basedir: baseDir,
    readFile: readCachedFile,
    isFile: isFileCached,
    isDirectory: isDirCached,
    extensions,
    includeCoreModules: false,
    moduleDirectory: moduleDirectories,
    paths: modulePaths,
    preserveSymlinks,
    packageFilter: filter
  };

  let location;
  try {
    location = await resolveImportPath(importSpecifier, resolveOptions);
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      throw error;
    }
    return null;
  }

  return {
    location: preserveSymlinks ? location : await resolveSymlink$1(location),
    hasModuleSideEffects,
    hasPackageEntry,
    packageBrowserField,
    packageInfo
  };
}

async function resolveWithExportMap({
  importer,
  importSpecifier,
  exportConditions,
  packageInfoCache,
  extensions,
  mainFields,
  preserveSymlinks,
  useBrowserOverrides,
  baseDir,
  moduleDirectories,
  modulePaths,
  rootDir,
  ignoreSideEffectsForRoot,
  allowExportsFolderMapping
}) {
  if (importSpecifier.startsWith('#')) {
    // this is a package internal import, resolve using package imports field
    const resolveResult = await resolvePackageImports({
      importSpecifier,
      importer,
      moduleDirs: moduleDirectories,
      conditions: exportConditions,
      resolveId(id /* , parent*/) {
        return resolveIdClassic({
          importSpecifier: id,
          packageInfoCache,
          extensions,
          mainFields,
          preserveSymlinks,
          useBrowserOverrides,
          baseDir,
          moduleDirectories,
          modulePaths
        });
      }
    });

    const location = fileURLToPath(resolveResult);
    return {
      location: preserveSymlinks ? location : await resolveSymlink$1(location),
      hasModuleSideEffects: () => null,
      hasPackageEntry: true,
      packageBrowserField: false,
      // eslint-disable-next-line no-undefined
      packageInfo: undefined
    };
  }

  const pkgName = getPackageName(importSpecifier);
  if (pkgName) {
    // it's a bare import, find the package.json and resolve using package exports if available
    let hasModuleSideEffects = () => null;
    let hasPackageEntry = true;
    let packageBrowserField = false;
    let packageInfo;

    const filter = (pkg, pkgPath) => {
      const info = getPackageInfo({
        cache: packageInfoCache,
        extensions,
        pkg,
        pkgPath,
        mainFields,
        preserveSymlinks,
        useBrowserOverrides,
        rootDir,
        ignoreSideEffectsForRoot
      });

      ({ packageInfo, hasModuleSideEffects, hasPackageEntry, packageBrowserField } = info);

      return info.cachedPkg;
    };

    const resolveOptions = {
      basedir: baseDir,
      readFile: readCachedFile,
      isFile: isFileCached,
      isDirectory: isDirCached,
      extensions,
      includeCoreModules: false,
      moduleDirectory: moduleDirectories,
      paths: modulePaths,
      preserveSymlinks,
      packageFilter: filter
    };

    const result = await getPackageJson(importer, pkgName, resolveOptions, moduleDirectories);

    if (result && result.pkgJson.exports) {
      const { pkgJson, pkgJsonPath } = result;
      const subpath =
        pkgName === importSpecifier ? '.' : `.${importSpecifier.substring(pkgName.length)}`;
      const pkgDr = pkgJsonPath.replace('package.json', '');
      const pkgURL = pathToFileURL(pkgDr);

      const context = {
        importer,
        importSpecifier,
        moduleDirs: moduleDirectories,
        pkgURL,
        pkgJsonPath,
        allowExportsFolderMapping,
        conditions: exportConditions
      };
      const resolvedPackageExport = await resolvePackageExports(context, subpath, pkgJson.exports);
      const location = fileURLToPath(resolvedPackageExport);
      if (location) {
        return {
          location: preserveSymlinks ? location : await resolveSymlink$1(location),
          hasModuleSideEffects,
          hasPackageEntry,
          packageBrowserField,
          packageInfo
        };
      }
    }
  }

  return null;
}

async function resolveWithClassic({
  importer,
  importSpecifierList,
  exportConditions,
  warn,
  packageInfoCache,
  extensions,
  mainFields,
  preserveSymlinks,
  useBrowserOverrides,
  baseDir,
  moduleDirectories,
  modulePaths,
  rootDir,
  ignoreSideEffectsForRoot
}) {
  for (let i = 0; i < importSpecifierList.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const result = await resolveIdClassic({
      importer,
      importSpecifier: importSpecifierList[i],
      exportConditions,
      warn,
      packageInfoCache,
      extensions,
      mainFields,
      preserveSymlinks,
      useBrowserOverrides,
      baseDir,
      moduleDirectories,
      modulePaths,
      rootDir,
      ignoreSideEffectsForRoot
    });

    if (result) {
      return result;
    }
  }

  return null;
}

// Resolves to the module if found or `null`.
// The first import specifier will first be attempted with the exports algorithm.
// If this is unsuccessful because export maps are not being used, then all of `importSpecifierList`
// will be tried with the classic resolution algorithm
async function resolveImportSpecifiers({
  importer,
  importSpecifierList,
  exportConditions,
  warn,
  packageInfoCache,
  extensions,
  mainFields,
  preserveSymlinks,
  useBrowserOverrides,
  baseDir,
  moduleDirectories,
  modulePaths,
  rootDir,
  ignoreSideEffectsForRoot,
  allowExportsFolderMapping
}) {
  try {
    const exportMapRes = await resolveWithExportMap({
      importer,
      importSpecifier: importSpecifierList[0],
      exportConditions,
      packageInfoCache,
      extensions,
      mainFields,
      preserveSymlinks,
      useBrowserOverrides,
      baseDir,
      moduleDirectories,
      modulePaths,
      rootDir,
      ignoreSideEffectsForRoot,
      allowExportsFolderMapping
    });
    if (exportMapRes) return exportMapRes;
  } catch (error) {
    if (error instanceof ResolveError) {
      warn(error);
      return null;
    }
    throw error;
  }

  // package has no imports or exports, use classic node resolve
  return resolveWithClassic({
    importer,
    importSpecifierList,
    exportConditions,
    warn,
    packageInfoCache,
    extensions,
    mainFields,
    preserveSymlinks,
    useBrowserOverrides,
    baseDir,
    moduleDirectories,
    modulePaths,
    rootDir,
    ignoreSideEffectsForRoot
  });
}

const versionRegexp = /\^(\d+\.\d+\.\d+)/g;

function validateVersion$1(actualVersion, peerDependencyVersion) {
  let minMajor = Infinity;
  let minMinor = Infinity;
  let minPatch = Infinity;
  let foundVersion;
  // eslint-disable-next-line no-cond-assign
  while ((foundVersion = versionRegexp.exec(peerDependencyVersion))) {
    const [foundMajor, foundMinor, foundPatch] = foundVersion[1].split('.').map(Number);
    if (foundMajor < minMajor) {
      minMajor = foundMajor;
      minMinor = foundMinor;
      minPatch = foundPatch;
    }
  }
  if (!actualVersion) {
    throw new Error(
      `Insufficient Rollup version: "@rollup/plugin-node-resolve" requires at least rollup@${minMajor}.${minMinor}.${minPatch}.`
    );
  }
  const [major, minor, patch] = actualVersion.split('.').map(Number);
  if (
    major < minMajor ||
    (major === minMajor && (minor < minMinor || (minor === minMinor && patch < minPatch)))
  ) {
    throw new Error(
      `Insufficient rollup version: "@rollup/plugin-node-resolve" requires at least rollup@${minMajor}.${minMinor}.${minPatch} but found rollup@${actualVersion}.`
    );
  }
}

/* eslint-disable no-param-reassign, no-shadow, no-undefined */

const ES6_BROWSER_EMPTY = '\0node-resolve:empty.js';
const deepFreeze = (object) => {
  Object.freeze(object);

  for (const value of Object.values(object)) {
    if (typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }

  return object;
};

const baseConditions = ['default', 'module'];
const baseConditionsEsm = [...baseConditions, 'import'];
const baseConditionsCjs = [...baseConditions, 'require'];
const defaults = {
  dedupe: [],
  // It's important that .mjs is listed before .js so that Rollup will interpret npm modules
  // which deploy both ESM .mjs and CommonJS .js files as ESM.
  extensions: ['.mjs', '.js', '.json', '.node'],
  resolveOnly: [],
  moduleDirectories: ['node_modules'],
  modulePaths: [],
  ignoreSideEffectsForRoot: false,
  // TODO: set to false in next major release or remove
  allowExportsFolderMapping: true
};
const nodeImportPrefix = /^node:/;

deepFreeze(deepMerge({}, defaults));

function nodeResolve(opts = {}) {
  const { warnings } = handleDeprecatedOptions(opts);

  const options = { ...defaults, ...opts };
  const { extensions, jail, moduleDirectories, modulePaths, ignoreSideEffectsForRoot } = options;
  const exportConditions = options.exportConditions || [];
  const devProdCondition =
    exportConditions.includes('development') || exportConditions.includes('production')
      ? []
      : [
          process.env.NODE_ENV && process.env.NODE_ENV !== 'production'
            ? 'development'
            : 'production'
        ];
  const conditionsEsm = [...baseConditionsEsm, ...exportConditions, ...devProdCondition];
  const conditionsCjs = [...baseConditionsCjs, ...exportConditions, ...devProdCondition];
  const packageInfoCache = new Map();
  const idToPackageInfo = new Map();
  const mainFields = getMainFields(options);
  const useBrowserOverrides = mainFields.indexOf('browser') !== -1;
  const isPreferBuiltinsSet = Object.prototype.hasOwnProperty.call(options, 'preferBuiltins');
  const preferBuiltins = isPreferBuiltinsSet ? options.preferBuiltins : true;
  const rootDir = resolve$2(options.rootDir || process.cwd());
  let { dedupe } = options;
  let rollupOptions;

  if (moduleDirectories.some((name) => name.includes('/'))) {
    throw new Error(
      '`moduleDirectories` option must only contain directory names. If you want to load modules from somewhere not supported by the default module resolution algorithm, see `modulePaths`.'
    );
  }

  if (typeof dedupe !== 'function') {
    dedupe = (importee) =>
      options.dedupe.includes(importee) || options.dedupe.includes(getPackageName(importee));
  }

  // creates a function from the patterns to test if a particular module should be bundled.
  const allowPatterns = (patterns) => {
    const regexPatterns = patterns.map((pattern) => {
      if (pattern instanceof RegExp) {
        return pattern;
      }
      const normalized = pattern.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
      return new RegExp(`^${normalized}$`);
    });
    return (id) => !regexPatterns.length || regexPatterns.some((pattern) => pattern.test(id));
  };

  const resolveOnly =
    typeof options.resolveOnly === 'function'
      ? options.resolveOnly
      : allowPatterns(options.resolveOnly);

  const browserMapCache = new Map();
  let preserveSymlinks;

  const resolveLikeNode = async (context, importee, importer, custom) => {
    // strip query params from import
    const [importPath, params] = importee.split('?');
    const importSuffix = `${params ? `?${params}` : ''}`;
    importee = importPath;

    const baseDir = !importer || dedupe(importee) ? rootDir : dirname(importer);

    // https://github.com/defunctzombie/package-browser-field-spec
    const browser = browserMapCache.get(importer);
    if (useBrowserOverrides && browser) {
      const resolvedImportee = resolve$2(baseDir, importee);
      if (browser[importee] === false || browser[resolvedImportee] === false) {
        return { id: ES6_BROWSER_EMPTY };
      }
      const browserImportee =
        (importee[0] !== '.' && browser[importee]) ||
        browser[resolvedImportee] ||
        browser[`${resolvedImportee}.js`] ||
        browser[`${resolvedImportee}.json`];
      if (browserImportee) {
        importee = browserImportee;
      }
    }

    const parts = importee.split(/[/\\]/);
    let id = parts.shift();
    let isRelativeImport = false;

    if (id[0] === '@' && parts.length > 0) {
      // scoped packages
      id += `/${parts.shift()}`;
    } else if (id[0] === '.') {
      // an import relative to the parent dir of the importer
      id = resolve$2(baseDir, importee);
      isRelativeImport = true;
    }

    // if it's not a relative import, and it's not requested, reject it.
    if (!isRelativeImport && !resolveOnly(id)) {
      if (normalizeInput(rollupOptions.input).includes(importee)) {
        return null;
      }
      return false;
    }

    const importSpecifierList = [importee];

    if (importer === undefined && !importee[0].match(/^\.?\.?\//)) {
      // For module graph roots (i.e. when importer is undefined), we
      // need to handle 'path fragments` like `foo/bar` that are commonly
      // found in rollup config files. If importee doesn't look like a
      // relative or absolute path, we make it relative and attempt to
      // resolve it.
      importSpecifierList.push(`./${importee}`);
    }

    // TypeScript files may import '.mjs' or '.cjs' to refer to either '.mts' or '.cts'.
    // They may also import .js to refer to either .ts or .tsx, and .jsx to refer to .tsx.
    if (importer && /\.(ts|mts|cts|tsx)$/.test(importer)) {
      for (const [importeeExt, resolvedExt] of [
        ['.js', '.ts'],
        ['.js', '.tsx'],
        ['.jsx', '.tsx'],
        ['.mjs', '.mts'],
        ['.cjs', '.cts']
      ]) {
        if (importee.endsWith(importeeExt) && extensions.includes(resolvedExt)) {
          importSpecifierList.push(importee.slice(0, -importeeExt.length) + resolvedExt);
        }
      }
    }

    const warn = (...args) => context.warn(...args);
    const isRequire = custom && custom['node-resolve'] && custom['node-resolve'].isRequire;
    const exportConditions = isRequire ? conditionsCjs : conditionsEsm;
    if (useBrowserOverrides && !exportConditions.includes('browser'))
      exportConditions.push('browser');

    const resolvedWithoutBuiltins = await resolveImportSpecifiers({
      importer,
      importSpecifierList,
      exportConditions,
      warn,
      packageInfoCache,
      extensions,
      mainFields,
      preserveSymlinks,
      useBrowserOverrides,
      baseDir,
      moduleDirectories,
      modulePaths,
      rootDir,
      ignoreSideEffectsForRoot,
      allowExportsFolderMapping: options.allowExportsFolderMapping
    });

    const importeeIsBuiltin = builtinModules.includes(importee.replace(nodeImportPrefix, ''));
    const preferImporteeIsBuiltin =
      typeof preferBuiltins === 'function' ? preferBuiltins(importee) : preferBuiltins;
    const resolved =
      importeeIsBuiltin && preferImporteeIsBuiltin
        ? {
            packageInfo: undefined,
            hasModuleSideEffects: () => null,
            hasPackageEntry: true,
            packageBrowserField: false
          }
        : resolvedWithoutBuiltins;
    if (!resolved) {
      return null;
    }

    const { packageInfo, hasModuleSideEffects, hasPackageEntry, packageBrowserField } = resolved;
    let { location } = resolved;
    if (packageBrowserField) {
      if (Object.prototype.hasOwnProperty.call(packageBrowserField, location)) {
        if (!packageBrowserField[location]) {
          browserMapCache.set(location, packageBrowserField);
          return { id: ES6_BROWSER_EMPTY };
        }
        location = packageBrowserField[location];
      }
      browserMapCache.set(location, packageBrowserField);
    }

    if (hasPackageEntry && !preserveSymlinks) {
      const exists = await fileExists(location);
      if (exists) {
        location = await realpath(location);
      }
    }

    idToPackageInfo.set(location, packageInfo);

    if (hasPackageEntry) {
      if (importeeIsBuiltin && preferImporteeIsBuiltin) {
        if (!isPreferBuiltinsSet && resolvedWithoutBuiltins && resolved !== importee) {
          context.warn({
            message:
              `preferring built-in module '${importee}' over local alternative at '${resolvedWithoutBuiltins.location}', pass 'preferBuiltins: false' to disable this behavior or 'preferBuiltins: true' to disable this warning.` +
              `or passing a function to 'preferBuiltins' to provide more fine-grained control over which built-in modules to prefer.`,
            pluginCode: 'PREFER_BUILTINS'
          });
        }
        return false;
      } else if (jail && location.indexOf(normalize(jail.trim(sep))) !== 0) {
        return null;
      }
    }

    if (options.modulesOnly && (await fileExists(location))) {
      const code = await readFile$1(location, 'utf-8');
      if (isModule(code)) {
        return {
          id: `${location}${importSuffix}`,
          moduleSideEffects: hasModuleSideEffects(location)
        };
      }
      return null;
    }
    return {
      id: `${location}${importSuffix}`,
      moduleSideEffects: hasModuleSideEffects(location)
    };
  };

  return {
    name: 'node-resolve',

    version: version$1,

    buildStart(buildOptions) {
      validateVersion$1(this.meta.rollupVersion, peerDependencies$1.rollup);
      rollupOptions = buildOptions;

      for (const warning of warnings) {
        this.warn(warning);
      }

      ({ preserveSymlinks } = buildOptions);
    },

    generateBundle() {
      readCachedFile.clear();
      isFileCached.clear();
      isDirCached.clear();
    },

    resolveId: {
      order: 'post',
      async handler(importee, importer, resolveOptions) {
        if (importee === ES6_BROWSER_EMPTY) {
          return importee;
        }
        // ignore IDs with null character, these belong to other plugins
        if (importee && importee.includes('\0')) return null;

        const { custom = {} } = resolveOptions;
        const { 'node-resolve': { resolved: alreadyResolved } = {} } = custom;
        if (alreadyResolved) {
          return alreadyResolved;
        }

        if (importer && importer.includes('\0')) {
          importer = undefined;
        }

        const resolved = await resolveLikeNode(this, importee, importer, custom);
        if (resolved) {
          // This way, plugins may attach additional meta information to the
          // resolved id or make it external. We do not skip node-resolve here
          // because another plugin might again use `this.resolve` in its
          // `resolveId` hook, in which case we want to add the correct
          // `moduleSideEffects` information.
          const resolvedResolved = await this.resolve(resolved.id, importer, {
            ...resolveOptions,
            skipSelf: false,
            custom: { ...custom, 'node-resolve': { ...custom['node-resolve'], resolved, importee } }
          });
          if (resolvedResolved) {
            // Handle plugins that manually make the result external
            if (resolvedResolved.external) {
              return false;
            }
            // Allow other plugins to take over resolution. Rollup core will not
            // change the id if it corresponds to an existing file
            if (resolvedResolved.id !== resolved.id) {
              return resolvedResolved;
            }
            // Pass on meta information added by other plugins
            return { ...resolved, meta: resolvedResolved.meta };
          }
        }
        return resolved;
      }
    },

    load(importee) {
      if (importee === ES6_BROWSER_EMPTY) {
        return 'export default {};';
      }
      return null;
    },

    getPackageInfoForId(id) {
      return idToPackageInfo.get(id);
    }
  };
}

var commondir;
var hasRequiredCommondir;

function requireCommondir () {
	if (hasRequiredCommondir) return commondir;
	hasRequiredCommondir = 1;
	var path = require$$0$1;

	commondir = function (basedir, relfiles) {
	    if (relfiles) {
	        var files = relfiles.map(function (r) {
	            return path.resolve(basedir, r);
	        });
	    }
	    else {
	        var files = basedir;
	    }
	    
	    var res = files.slice(1).reduce(function (ps, file) {
	        if (!file.match(/^([A-Za-z]:)?\/|\\/)) {
	            throw new Error('relative path without a basedir');
	        }
	        
	        var xs = file.split(/\/+|\\+/);
	        for (
	            var i = 0;
	            ps[i] === xs[i] && i < Math.min(ps.length, xs.length);
	            i++
	        );
	        return ps.slice(0, i);
	    }, files[0].split(/\/+|\\+/));
	    
	    // Windows correctly handles paths with forward-slashes
	    return res.length > 1 ? res.join('/') : '/'
	};
	return commondir;
}

var commondirExports = requireCommondir();
var getCommonDir = /*@__PURE__*/getDefaultExportFromCjs(commondirExports);

var dist = {};

var builder = {};

var apiBuilder = {};

var async = {};

var walker = {};

var utils = {};

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	Object.defineProperty(utils, "__esModule", { value: true });
	utils.normalizePath = utils.isRootDirectory = utils.convertSlashes = utils.cleanPath = void 0;
	const path_1 = require$$0$1;
	function cleanPath(path) {
	    let normalized = (0, path_1.normalize)(path);
	    // we have to remove the last path separator
	    // to account for / root path
	    if (normalized.length > 1 && normalized[normalized.length - 1] === path_1.sep)
	        normalized = normalized.substring(0, normalized.length - 1);
	    return normalized;
	}
	utils.cleanPath = cleanPath;
	const SLASHES_REGEX = /[\\/]/g;
	function convertSlashes(path, separator) {
	    return path.replace(SLASHES_REGEX, separator);
	}
	utils.convertSlashes = convertSlashes;
	const WINDOWS_ROOT_DIR_REGEX = /^[a-z]:[\\/]$/i;
	function isRootDirectory(path) {
	    return path === "/" || WINDOWS_ROOT_DIR_REGEX.test(path);
	}
	utils.isRootDirectory = isRootDirectory;
	function normalizePath(path, options) {
	    const { resolvePaths, normalizePath, pathSeparator } = options;
	    const pathNeedsCleaning = (process.platform === "win32" && path.includes("/")) ||
	        path.startsWith(".");
	    if (resolvePaths)
	        path = (0, path_1.resolve)(path);
	    if (normalizePath || pathNeedsCleaning)
	        path = cleanPath(path);
	    if (path === ".")
	        return "";
	    const needsSeperator = path[path.length - 1] !== pathSeparator;
	    return convertSlashes(needsSeperator ? path + pathSeparator : path, pathSeparator);
	}
	utils.normalizePath = normalizePath;
	return utils;
}

var joinPath = {};

var hasRequiredJoinPath;

function requireJoinPath () {
	if (hasRequiredJoinPath) return joinPath;
	hasRequiredJoinPath = 1;
	Object.defineProperty(joinPath, "__esModule", { value: true });
	joinPath.build = joinPath.joinDirectoryPath = joinPath.joinPathWithBasePath = void 0;
	const path_1 = require$$0$1;
	const utils_1 = requireUtils();
	function joinPathWithBasePath(filename, directoryPath) {
	    return directoryPath + filename;
	}
	joinPath.joinPathWithBasePath = joinPathWithBasePath;
	function joinPathWithRelativePath(root, options) {
	    return function (filename, directoryPath) {
	        const sameRoot = directoryPath.startsWith(root);
	        if (sameRoot)
	            return directoryPath.replace(root, "") + filename;
	        else
	            return ((0, utils_1.convertSlashes)((0, path_1.relative)(root, directoryPath), options.pathSeparator) +
	                options.pathSeparator +
	                filename);
	    };
	}
	function joinPath$1(filename) {
	    return filename;
	}
	function joinDirectoryPath(filename, directoryPath, separator) {
	    return directoryPath + filename + separator;
	}
	joinPath.joinDirectoryPath = joinDirectoryPath;
	function build(root, options) {
	    const { relativePaths, includeBasePath } = options;
	    return relativePaths && root
	        ? joinPathWithRelativePath(root, options)
	        : includeBasePath
	            ? joinPathWithBasePath
	            : joinPath$1;
	}
	joinPath.build = build;
	return joinPath;
}

var pushDirectory = {};

var hasRequiredPushDirectory;

function requirePushDirectory () {
	if (hasRequiredPushDirectory) return pushDirectory;
	hasRequiredPushDirectory = 1;
	Object.defineProperty(pushDirectory, "__esModule", { value: true });
	pushDirectory.build = void 0;
	function pushDirectoryWithRelativePath(root) {
	    return function (directoryPath, paths) {
	        paths.push(directoryPath.substring(root.length) || ".");
	    };
	}
	function pushDirectoryFilterWithRelativePath(root) {
	    return function (directoryPath, paths, filters) {
	        const relativePath = directoryPath.substring(root.length) || ".";
	        if (filters.every((filter) => filter(relativePath, true))) {
	            paths.push(relativePath);
	        }
	    };
	}
	const pushDirectory$1 = (directoryPath, paths) => {
	    paths.push(directoryPath || ".");
	};
	const pushDirectoryFilter = (directoryPath, paths, filters) => {
	    const path = directoryPath || ".";
	    if (filters.every((filter) => filter(path, true))) {
	        paths.push(path);
	    }
	};
	const empty = () => { };
	function build(root, options) {
	    const { includeDirs, filters, relativePaths } = options;
	    if (!includeDirs)
	        return empty;
	    if (relativePaths)
	        return filters && filters.length
	            ? pushDirectoryFilterWithRelativePath(root)
	            : pushDirectoryWithRelativePath(root);
	    return filters && filters.length ? pushDirectoryFilter : pushDirectory$1;
	}
	pushDirectory.build = build;
	return pushDirectory;
}

var pushFile = {};

var hasRequiredPushFile;

function requirePushFile () {
	if (hasRequiredPushFile) return pushFile;
	hasRequiredPushFile = 1;
	Object.defineProperty(pushFile, "__esModule", { value: true });
	pushFile.build = void 0;
	const pushFileFilterAndCount = (filename, _paths, counts, filters) => {
	    if (filters.every((filter) => filter(filename, false)))
	        counts.files++;
	};
	const pushFileFilter = (filename, paths, _counts, filters) => {
	    if (filters.every((filter) => filter(filename, false)))
	        paths.push(filename);
	};
	const pushFileCount = (_filename, _paths, counts, _filters) => {
	    counts.files++;
	};
	const pushFile$1 = (filename, paths) => {
	    paths.push(filename);
	};
	const empty = () => { };
	function build(options) {
	    const { excludeFiles, filters, onlyCounts } = options;
	    if (excludeFiles)
	        return empty;
	    if (filters && filters.length) {
	        return onlyCounts ? pushFileFilterAndCount : pushFileFilter;
	    }
	    else if (onlyCounts) {
	        return pushFileCount;
	    }
	    else {
	        return pushFile$1;
	    }
	}
	pushFile.build = build;
	return pushFile;
}

var getArray = {};

var hasRequiredGetArray;

function requireGetArray () {
	if (hasRequiredGetArray) return getArray;
	hasRequiredGetArray = 1;
	Object.defineProperty(getArray, "__esModule", { value: true });
	getArray.build = void 0;
	const getArray$1 = (paths) => {
	    return paths;
	};
	const getArrayGroup = () => {
	    return [""].slice(0, 0);
	};
	function build(options) {
	    return options.group ? getArrayGroup : getArray$1;
	}
	getArray.build = build;
	return getArray;
}

var groupFiles = {};

var hasRequiredGroupFiles;

function requireGroupFiles () {
	if (hasRequiredGroupFiles) return groupFiles;
	hasRequiredGroupFiles = 1;
	Object.defineProperty(groupFiles, "__esModule", { value: true });
	groupFiles.build = void 0;
	const groupFiles$1 = (groups, directory, files) => {
	    groups.push({ directory, files, dir: directory });
	};
	const empty = () => { };
	function build(options) {
	    return options.group ? groupFiles$1 : empty;
	}
	groupFiles.build = build;
	return groupFiles;
}

var resolveSymlink = {};

var hasRequiredResolveSymlink;

function requireResolveSymlink () {
	if (hasRequiredResolveSymlink) return resolveSymlink;
	hasRequiredResolveSymlink = 1;
	var __importDefault = (resolveSymlink && resolveSymlink.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(resolveSymlink, "__esModule", { value: true });
	resolveSymlink.build = void 0;
	const fs_1 = __importDefault(fs$2);
	const path_1 = require$$0$1;
	const resolveSymlinksAsync = function (path, state, callback) {
	    const { queue, options: { suppressErrors }, } = state;
	    queue.enqueue();
	    fs_1.default.realpath(path, (error, resolvedPath) => {
	        if (error)
	            return queue.dequeue(suppressErrors ? null : error, state);
	        fs_1.default.stat(resolvedPath, (error, stat) => {
	            if (error)
	                return queue.dequeue(suppressErrors ? null : error, state);
	            if (stat.isDirectory() && isRecursive(path, resolvedPath, state))
	                return queue.dequeue(null, state);
	            callback(stat, resolvedPath);
	            queue.dequeue(null, state);
	        });
	    });
	};
	const resolveSymlinks = function (path, state, callback) {
	    const { queue, options: { suppressErrors }, } = state;
	    queue.enqueue();
	    try {
	        const resolvedPath = fs_1.default.realpathSync(path);
	        const stat = fs_1.default.statSync(resolvedPath);
	        if (stat.isDirectory() && isRecursive(path, resolvedPath, state))
	            return;
	        callback(stat, resolvedPath);
	    }
	    catch (e) {
	        if (!suppressErrors)
	            throw e;
	    }
	};
	function build(options, isSynchronous) {
	    if (!options.resolveSymlinks || options.excludeSymlinks)
	        return null;
	    return isSynchronous ? resolveSymlinks : resolveSymlinksAsync;
	}
	resolveSymlink.build = build;
	function isRecursive(path, resolved, state) {
	    if (state.options.useRealPaths)
	        return isRecursiveUsingRealPaths(resolved, state);
	    let parent = (0, path_1.dirname)(path);
	    let depth = 1;
	    while (parent !== state.root && depth < 2) {
	        const resolvedPath = state.symlinks.get(parent);
	        const isSameRoot = !!resolvedPath &&
	            (resolvedPath === resolved ||
	                resolvedPath.startsWith(resolved) ||
	                resolved.startsWith(resolvedPath));
	        if (isSameRoot)
	            depth++;
	        else
	            parent = (0, path_1.dirname)(parent);
	    }
	    state.symlinks.set(path, resolved);
	    return depth > 1;
	}
	function isRecursiveUsingRealPaths(resolved, state) {
	    return state.visited.includes(resolved + state.options.pathSeparator);
	}
	return resolveSymlink;
}

var invokeCallback = {};

var hasRequiredInvokeCallback;

function requireInvokeCallback () {
	if (hasRequiredInvokeCallback) return invokeCallback;
	hasRequiredInvokeCallback = 1;
	Object.defineProperty(invokeCallback, "__esModule", { value: true });
	invokeCallback.build = void 0;
	const onlyCountsSync = (state) => {
	    return state.counts;
	};
	const groupsSync = (state) => {
	    return state.groups;
	};
	const defaultSync = (state) => {
	    return state.paths;
	};
	const limitFilesSync = (state) => {
	    return state.paths.slice(0, state.options.maxFiles);
	};
	const onlyCountsAsync = (state, error, callback) => {
	    report(error, callback, state.counts, state.options.suppressErrors);
	    return null;
	};
	const defaultAsync = (state, error, callback) => {
	    report(error, callback, state.paths, state.options.suppressErrors);
	    return null;
	};
	const limitFilesAsync = (state, error, callback) => {
	    report(error, callback, state.paths.slice(0, state.options.maxFiles), state.options.suppressErrors);
	    return null;
	};
	const groupsAsync = (state, error, callback) => {
	    report(error, callback, state.groups, state.options.suppressErrors);
	    return null;
	};
	function report(error, callback, output, suppressErrors) {
	    if (error && !suppressErrors)
	        callback(error, output);
	    else
	        callback(null, output);
	}
	function build(options, isSynchronous) {
	    const { onlyCounts, group, maxFiles } = options;
	    if (onlyCounts)
	        return isSynchronous
	            ? onlyCountsSync
	            : onlyCountsAsync;
	    else if (group)
	        return isSynchronous
	            ? groupsSync
	            : groupsAsync;
	    else if (maxFiles)
	        return isSynchronous
	            ? limitFilesSync
	            : limitFilesAsync;
	    else
	        return isSynchronous
	            ? defaultSync
	            : defaultAsync;
	}
	invokeCallback.build = build;
	return invokeCallback;
}

var walkDirectory = {};

var hasRequiredWalkDirectory;

function requireWalkDirectory () {
	if (hasRequiredWalkDirectory) return walkDirectory;
	hasRequiredWalkDirectory = 1;
	var __importDefault = (walkDirectory && walkDirectory.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(walkDirectory, "__esModule", { value: true });
	walkDirectory.build = void 0;
	const fs_1 = __importDefault(fs$2);
	const readdirOpts = { withFileTypes: true };
	const walkAsync = (state, crawlPath, directoryPath, currentDepth, callback) => {
	    state.queue.enqueue();
	    if (currentDepth < 0)
	        return state.queue.dequeue(null, state);
	    state.visited.push(crawlPath);
	    state.counts.directories++;
	    // Perf: Node >= 10 introduced withFileTypes that helps us
	    // skip an extra fs.stat call.
	    fs_1.default.readdir(crawlPath || ".", readdirOpts, (error, entries = []) => {
	        callback(entries, directoryPath, currentDepth);
	        state.queue.dequeue(state.options.suppressErrors ? null : error, state);
	    });
	};
	const walkSync = (state, crawlPath, directoryPath, currentDepth, callback) => {
	    if (currentDepth < 0)
	        return;
	    state.visited.push(crawlPath);
	    state.counts.directories++;
	    let entries = [];
	    try {
	        entries = fs_1.default.readdirSync(crawlPath || ".", readdirOpts);
	    }
	    catch (e) {
	        if (!state.options.suppressErrors)
	            throw e;
	    }
	    callback(entries, directoryPath, currentDepth);
	};
	function build(isSynchronous) {
	    return isSynchronous ? walkSync : walkAsync;
	}
	walkDirectory.build = build;
	return walkDirectory;
}

var queue = {};

var hasRequiredQueue;

function requireQueue () {
	if (hasRequiredQueue) return queue;
	hasRequiredQueue = 1;
	Object.defineProperty(queue, "__esModule", { value: true });
	queue.Queue = void 0;
	/**
	 * This is a custom stateless queue to track concurrent async fs calls.
	 * It increments a counter whenever a call is queued and decrements it
	 * as soon as it completes. When the counter hits 0, it calls onQueueEmpty.
	 */
	class Queue {
	    onQueueEmpty;
	    count = 0;
	    constructor(onQueueEmpty) {
	        this.onQueueEmpty = onQueueEmpty;
	    }
	    enqueue() {
	        this.count++;
	        return this.count;
	    }
	    dequeue(error, output) {
	        if (this.onQueueEmpty && (--this.count <= 0 || error)) {
	            this.onQueueEmpty(error, output);
	            if (error) {
	                output.controller.abort();
	                this.onQueueEmpty = undefined;
	            }
	        }
	    }
	}
	queue.Queue = Queue;
	return queue;
}

var counter = {};

var hasRequiredCounter;

function requireCounter () {
	if (hasRequiredCounter) return counter;
	hasRequiredCounter = 1;
	Object.defineProperty(counter, "__esModule", { value: true });
	counter.Counter = void 0;
	class Counter {
	    _files = 0;
	    _directories = 0;
	    set files(num) {
	        this._files = num;
	    }
	    get files() {
	        return this._files;
	    }
	    set directories(num) {
	        this._directories = num;
	    }
	    get directories() {
	        return this._directories;
	    }
	    /**
	     * @deprecated use `directories` instead
	     */
	    /* c8 ignore next 3 */
	    get dirs() {
	        return this._directories;
	    }
	}
	counter.Counter = Counter;
	return counter;
}

var hasRequiredWalker;

function requireWalker () {
	if (hasRequiredWalker) return walker;
	hasRequiredWalker = 1;
	var __createBinding = (walker && walker.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (walker && walker.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (walker && walker.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(walker, "__esModule", { value: true });
	walker.Walker = void 0;
	const path_1 = require$$0$1;
	const utils_1 = requireUtils();
	const joinPath = __importStar(requireJoinPath());
	const pushDirectory = __importStar(requirePushDirectory());
	const pushFile = __importStar(requirePushFile());
	const getArray = __importStar(requireGetArray());
	const groupFiles = __importStar(requireGroupFiles());
	const resolveSymlink = __importStar(requireResolveSymlink());
	const invokeCallback = __importStar(requireInvokeCallback());
	const walkDirectory = __importStar(requireWalkDirectory());
	const queue_1 = requireQueue();
	const counter_1 = requireCounter();
	class Walker {
	    root;
	    isSynchronous;
	    state;
	    joinPath;
	    pushDirectory;
	    pushFile;
	    getArray;
	    groupFiles;
	    resolveSymlink;
	    walkDirectory;
	    callbackInvoker;
	    constructor(root, options, callback) {
	        this.isSynchronous = !callback;
	        this.callbackInvoker = invokeCallback.build(options, this.isSynchronous);
	        this.root = (0, utils_1.normalizePath)(root, options);
	        this.state = {
	            root: (0, utils_1.isRootDirectory)(this.root) ? this.root : this.root.slice(0, -1),
	            // Perf: we explicitly tell the compiler to optimize for String arrays
	            paths: [""].slice(0, 0),
	            groups: [],
	            counts: new counter_1.Counter(),
	            options,
	            queue: new queue_1.Queue((error, state) => this.callbackInvoker(state, error, callback)),
	            symlinks: new Map(),
	            visited: [""].slice(0, 0),
	            controller: new AbortController(),
	        };
	        /*
	         * Perf: We conditionally change functions according to options. This gives a slight
	         * performance boost. Since these functions are so small, they are automatically inlined
	         * by the javascript engine so there's no function call overhead (in most cases).
	         */
	        this.joinPath = joinPath.build(this.root, options);
	        this.pushDirectory = pushDirectory.build(this.root, options);
	        this.pushFile = pushFile.build(options);
	        this.getArray = getArray.build(options);
	        this.groupFiles = groupFiles.build(options);
	        this.resolveSymlink = resolveSymlink.build(options, this.isSynchronous);
	        this.walkDirectory = walkDirectory.build(this.isSynchronous);
	    }
	    start() {
	        this.pushDirectory(this.root, this.state.paths, this.state.options.filters);
	        this.walkDirectory(this.state, this.root, this.root, this.state.options.maxDepth, this.walk);
	        return this.isSynchronous ? this.callbackInvoker(this.state, null) : null;
	    }
	    walk = (entries, directoryPath, depth) => {
	        const { paths, options: { filters, resolveSymlinks, excludeSymlinks, exclude, maxFiles, signal, useRealPaths, pathSeparator, }, controller, } = this.state;
	        if (controller.signal.aborted ||
	            (signal && signal.aborted) ||
	            (maxFiles && paths.length > maxFiles))
	            return;
	        const files = this.getArray(this.state.paths);
	        for (let i = 0; i < entries.length; ++i) {
	            const entry = entries[i];
	            if (entry.isFile() ||
	                (entry.isSymbolicLink() && !resolveSymlinks && !excludeSymlinks)) {
	                const filename = this.joinPath(entry.name, directoryPath);
	                this.pushFile(filename, files, this.state.counts, filters);
	            }
	            else if (entry.isDirectory()) {
	                let path = joinPath.joinDirectoryPath(entry.name, directoryPath, this.state.options.pathSeparator);
	                if (exclude && exclude(entry.name, path))
	                    continue;
	                this.pushDirectory(path, paths, filters);
	                this.walkDirectory(this.state, path, path, depth - 1, this.walk);
	            }
	            else if (this.resolveSymlink && entry.isSymbolicLink()) {
	                let path = joinPath.joinPathWithBasePath(entry.name, directoryPath);
	                this.resolveSymlink(path, this.state, (stat, resolvedPath) => {
	                    if (stat.isDirectory()) {
	                        resolvedPath = (0, utils_1.normalizePath)(resolvedPath, this.state.options);
	                        if (exclude &&
	                            exclude(entry.name, useRealPaths ? resolvedPath : path + pathSeparator))
	                            return;
	                        this.walkDirectory(this.state, resolvedPath, useRealPaths ? resolvedPath : path + pathSeparator, depth - 1, this.walk);
	                    }
	                    else {
	                        resolvedPath = useRealPaths ? resolvedPath : path;
	                        const filename = (0, path_1.basename)(resolvedPath);
	                        const directoryPath = (0, utils_1.normalizePath)((0, path_1.dirname)(resolvedPath), this.state.options);
	                        resolvedPath = this.joinPath(filename, directoryPath);
	                        this.pushFile(resolvedPath, files, this.state.counts, filters);
	                    }
	                });
	            }
	        }
	        this.groupFiles(this.state.groups, directoryPath, files);
	    };
	}
	walker.Walker = Walker;
	return walker;
}

var hasRequiredAsync;

function requireAsync () {
	if (hasRequiredAsync) return async;
	hasRequiredAsync = 1;
	Object.defineProperty(async, "__esModule", { value: true });
	async.callback = async.promise = void 0;
	const walker_1 = requireWalker();
	function promise(root, options) {
	    return new Promise((resolve, reject) => {
	        callback(root, options, (err, output) => {
	            if (err)
	                return reject(err);
	            resolve(output);
	        });
	    });
	}
	async.promise = promise;
	function callback(root, options, callback) {
	    let walker = new walker_1.Walker(root, options, callback);
	    walker.start();
	}
	async.callback = callback;
	return async;
}

var sync = {};

var hasRequiredSync;

function requireSync () {
	if (hasRequiredSync) return sync;
	hasRequiredSync = 1;
	Object.defineProperty(sync, "__esModule", { value: true });
	sync.sync = void 0;
	const walker_1 = requireWalker();
	function sync$1(root, options) {
	    const walker = new walker_1.Walker(root, options);
	    return walker.start();
	}
	sync.sync = sync$1;
	return sync;
}

var hasRequiredApiBuilder;

function requireApiBuilder () {
	if (hasRequiredApiBuilder) return apiBuilder;
	hasRequiredApiBuilder = 1;
	Object.defineProperty(apiBuilder, "__esModule", { value: true });
	apiBuilder.APIBuilder = void 0;
	const async_1 = requireAsync();
	const sync_1 = requireSync();
	class APIBuilder {
	    root;
	    options;
	    constructor(root, options) {
	        this.root = root;
	        this.options = options;
	    }
	    withPromise() {
	        return (0, async_1.promise)(this.root, this.options);
	    }
	    withCallback(cb) {
	        (0, async_1.callback)(this.root, this.options, cb);
	    }
	    sync() {
	        return (0, sync_1.sync)(this.root, this.options);
	    }
	}
	apiBuilder.APIBuilder = APIBuilder;
	return apiBuilder;
}

var hasRequiredBuilder;

function requireBuilder () {
	if (hasRequiredBuilder) return builder;
	hasRequiredBuilder = 1;
	Object.defineProperty(builder, "__esModule", { value: true });
	builder.Builder = void 0;
	const path_1 = require$$0$1;
	const api_builder_1 = requireApiBuilder();
	var pm = null;
	/* c8 ignore next 6 */
	try {
	    require.resolve("picomatch");
	    pm = /*@__PURE__*/ requirePicomatch();
	}
	catch (_e) {
	    // do nothing
	}
	class Builder {
	    globCache = {};
	    options = {
	        maxDepth: Infinity,
	        suppressErrors: true,
	        pathSeparator: path_1.sep,
	        filters: [],
	    };
	    globFunction;
	    constructor(options) {
	        this.options = { ...this.options, ...options };
	        this.globFunction = this.options.globFunction;
	    }
	    group() {
	        this.options.group = true;
	        return this;
	    }
	    withPathSeparator(separator) {
	        this.options.pathSeparator = separator;
	        return this;
	    }
	    withBasePath() {
	        this.options.includeBasePath = true;
	        return this;
	    }
	    withRelativePaths() {
	        this.options.relativePaths = true;
	        return this;
	    }
	    withDirs() {
	        this.options.includeDirs = true;
	        return this;
	    }
	    withMaxDepth(depth) {
	        this.options.maxDepth = depth;
	        return this;
	    }
	    withMaxFiles(limit) {
	        this.options.maxFiles = limit;
	        return this;
	    }
	    withFullPaths() {
	        this.options.resolvePaths = true;
	        this.options.includeBasePath = true;
	        return this;
	    }
	    withErrors() {
	        this.options.suppressErrors = false;
	        return this;
	    }
	    withSymlinks({ resolvePaths = true } = {}) {
	        this.options.resolveSymlinks = true;
	        this.options.useRealPaths = resolvePaths;
	        return this.withFullPaths();
	    }
	    withAbortSignal(signal) {
	        this.options.signal = signal;
	        return this;
	    }
	    normalize() {
	        this.options.normalizePath = true;
	        return this;
	    }
	    filter(predicate) {
	        this.options.filters.push(predicate);
	        return this;
	    }
	    onlyDirs() {
	        this.options.excludeFiles = true;
	        this.options.includeDirs = true;
	        return this;
	    }
	    exclude(predicate) {
	        this.options.exclude = predicate;
	        return this;
	    }
	    onlyCounts() {
	        this.options.onlyCounts = true;
	        return this;
	    }
	    crawl(root) {
	        return new api_builder_1.APIBuilder(root || ".", this.options);
	    }
	    withGlobFunction(fn) {
	        // cast this since we don't have the new type params yet
	        this.globFunction = fn;
	        return this;
	    }
	    /**
	     * @deprecated Pass options using the constructor instead:
	     * ```ts
	     * new fdir(options).crawl("/path/to/root");
	     * ```
	     * This method will be removed in v7.0
	     */
	    /* c8 ignore next 4 */
	    crawlWithOptions(root, options) {
	        this.options = { ...this.options, ...options };
	        return new api_builder_1.APIBuilder(root || ".", this.options);
	    }
	    glob(...patterns) {
	        if (this.globFunction) {
	            return this.globWithOptions(patterns);
	        }
	        return this.globWithOptions(patterns, ...[{ dot: true }]);
	    }
	    globWithOptions(patterns, ...options) {
	        const globFn = (this.globFunction || pm);
	        /* c8 ignore next 5 */
	        if (!globFn) {
	            throw new Error("Please specify a glob function to use glob matching.");
	        }
	        var isMatch = this.globCache[patterns.join("\0")];
	        if (!isMatch) {
	            isMatch = globFn(patterns, ...options);
	            this.globCache[patterns.join("\0")] = isMatch;
	        }
	        this.options.filters.push((path) => isMatch(path));
	        return this;
	    }
	}
	builder.Builder = Builder;
	return builder;
}

var types = {};

var hasRequiredTypes;

function requireTypes () {
	if (hasRequiredTypes) return types;
	hasRequiredTypes = 1;
	Object.defineProperty(types, "__esModule", { value: true });
	return types;
}

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	(function (exports) {
		var __createBinding = (dist && dist.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (dist && dist.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.fdir = void 0;
		const builder_1 = requireBuilder();
		Object.defineProperty(exports, "fdir", { enumerable: true, get: function () { return builder_1.Builder; } });
		__exportStar(requireTypes(), exports); 
	} (dist));
	return dist;
}

var distExports = requireDist();

// src/vlq.ts
var comma = ",".charCodeAt(0);
var semicolon = ";".charCodeAt(0);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
  const c = chars.charCodeAt(i);
  intToChar[i] = c;
  charToInt[c] = i;
}
function encodeInteger(builder, num, relative) {
  let delta = num - relative;
  delta = delta < 0 ? -delta << 1 | 1 : delta << 1;
  do {
    let clamped = delta & 31;
    delta >>>= 5;
    if (delta > 0) clamped |= 32;
    builder.write(intToChar[clamped]);
  } while (delta > 0);
  return num;
}

// src/strings.ts
var bufLength = 1024 * 16;
var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
  decode(buf) {
    const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
    return out.toString();
  }
} : {
  decode(buf) {
    let out = "";
    for (let i = 0; i < buf.length; i++) {
      out += String.fromCharCode(buf[i]);
    }
    return out;
  }
};
var StringWriter = class {
  constructor() {
    this.pos = 0;
    this.out = "";
    this.buffer = new Uint8Array(bufLength);
  }
  write(v) {
    const { buffer } = this;
    buffer[this.pos++] = v;
    if (this.pos === bufLength) {
      this.out += td.decode(buffer);
      this.pos = 0;
    }
  }
  flush() {
    const { buffer, out, pos } = this;
    return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
  }
};
function encode(decoded) {
  const writer = new StringWriter();
  let sourcesIndex = 0;
  let sourceLine = 0;
  let sourceColumn = 0;
  let namesIndex = 0;
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    if (i > 0) writer.write(semicolon);
    if (line.length === 0) continue;
    let genColumn = 0;
    for (let j = 0; j < line.length; j++) {
      const segment = line[j];
      if (j > 0) writer.write(comma);
      genColumn = encodeInteger(writer, segment[0], genColumn);
      if (segment.length === 1) continue;
      sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex);
      sourceLine = encodeInteger(writer, segment[2], sourceLine);
      sourceColumn = encodeInteger(writer, segment[3], sourceColumn);
      if (segment.length === 4) continue;
      namesIndex = encodeInteger(writer, segment[4], namesIndex);
    }
  }
  return writer.flush();
}

class BitSet {
	constructor(arg) {
		this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
	}

	add(n) {
		this.bits[n >> 5] |= 1 << (n & 31);
	}

	has(n) {
		return !!(this.bits[n >> 5] & (1 << (n & 31)));
	}
}

class Chunk {
	constructor(start, end, content) {
		this.start = start;
		this.end = end;
		this.original = content;

		this.intro = '';
		this.outro = '';

		this.content = content;
		this.storeName = false;
		this.edited = false;

		{
			this.previous = null;
			this.next = null;
		}
	}

	appendLeft(content) {
		this.outro += content;
	}

	appendRight(content) {
		this.intro = this.intro + content;
	}

	clone() {
		const chunk = new Chunk(this.start, this.end, this.original);

		chunk.intro = this.intro;
		chunk.outro = this.outro;
		chunk.content = this.content;
		chunk.storeName = this.storeName;
		chunk.edited = this.edited;

		return chunk;
	}

	contains(index) {
		return this.start < index && index < this.end;
	}

	eachNext(fn) {
		let chunk = this;
		while (chunk) {
			fn(chunk);
			chunk = chunk.next;
		}
	}

	eachPrevious(fn) {
		let chunk = this;
		while (chunk) {
			fn(chunk);
			chunk = chunk.previous;
		}
	}

	edit(content, storeName, contentOnly) {
		this.content = content;
		if (!contentOnly) {
			this.intro = '';
			this.outro = '';
		}
		this.storeName = storeName;

		this.edited = true;

		return this;
	}

	prependLeft(content) {
		this.outro = content + this.outro;
	}

	prependRight(content) {
		this.intro = content + this.intro;
	}

	reset() {
		this.intro = '';
		this.outro = '';
		if (this.edited) {
			this.content = this.original;
			this.storeName = false;
			this.edited = false;
		}
	}

	split(index) {
		const sliceIndex = index - this.start;

		const originalBefore = this.original.slice(0, sliceIndex);
		const originalAfter = this.original.slice(sliceIndex);

		this.original = originalBefore;

		const newChunk = new Chunk(index, this.end, originalAfter);
		newChunk.outro = this.outro;
		this.outro = '';

		this.end = index;

		if (this.edited) {
			// after split we should save the edit content record into the correct chunk
			// to make sure sourcemap correct
			// For example:
			// '  test'.trim()
			//     split   -> '  ' + 'test'
			//   ✔️ edit    -> '' + 'test'
			//   ✖️ edit    -> 'test' + ''
			// TODO is this block necessary?...
			newChunk.edit('', false);
			this.content = '';
		} else {
			this.content = originalBefore;
		}

		newChunk.next = this.next;
		if (newChunk.next) newChunk.next.previous = newChunk;
		newChunk.previous = this;
		this.next = newChunk;

		return newChunk;
	}

	toString() {
		return this.intro + this.content + this.outro;
	}

	trimEnd(rx) {
		this.outro = this.outro.replace(rx, '');
		if (this.outro.length) return true;

		const trimmed = this.content.replace(rx, '');

		if (trimmed.length) {
			if (trimmed !== this.content) {
				this.split(this.start + trimmed.length).edit('', undefined, true);
				if (this.edited) {
					// save the change, if it has been edited
					this.edit(trimmed, this.storeName, true);
				}
			}
			return true;
		} else {
			this.edit('', undefined, true);

			this.intro = this.intro.replace(rx, '');
			if (this.intro.length) return true;
		}
	}

	trimStart(rx) {
		this.intro = this.intro.replace(rx, '');
		if (this.intro.length) return true;

		const trimmed = this.content.replace(rx, '');

		if (trimmed.length) {
			if (trimmed !== this.content) {
				const newChunk = this.split(this.end - trimmed.length);
				if (this.edited) {
					// save the change, if it has been edited
					newChunk.edit(trimmed, this.storeName, true);
				}
				this.edit('', undefined, true);
			}
			return true;
		} else {
			this.edit('', undefined, true);

			this.outro = this.outro.replace(rx, '');
			if (this.outro.length) return true;
		}
	}
}

function getBtoa() {
	if (typeof globalThis !== 'undefined' && typeof globalThis.btoa === 'function') {
		return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
	} else if (typeof Buffer === 'function') {
		return (str) => Buffer.from(str, 'utf-8').toString('base64');
	} else {
		return () => {
			throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
		};
	}
}

const btoa = /*#__PURE__*/ getBtoa();

class SourceMap {
	constructor(properties) {
		this.version = 3;
		this.file = properties.file;
		this.sources = properties.sources;
		this.sourcesContent = properties.sourcesContent;
		this.names = properties.names;
		this.mappings = encode(properties.mappings);
		if (typeof properties.x_google_ignoreList !== 'undefined') {
			this.x_google_ignoreList = properties.x_google_ignoreList;
		}
		if (typeof properties.debugId !== 'undefined') {
			this.debugId = properties.debugId;
		}
	}

	toString() {
		return JSON.stringify(this);
	}

	toUrl() {
		return 'data:application/json;charset=utf-8;base64,' + btoa(this.toString());
	}
}

function guessIndent(code) {
	const lines = code.split('\n');

	const tabbed = lines.filter((line) => /^\t+/.test(line));
	const spaced = lines.filter((line) => /^ {2,}/.test(line));

	if (tabbed.length === 0 && spaced.length === 0) {
		return null;
	}

	// More lines tabbed than spaced? Assume tabs, and
	// default to tabs in the case of a tie (or nothing
	// to go on)
	if (tabbed.length >= spaced.length) {
		return '\t';
	}

	// Otherwise, we need to guess the multiple
	const min = spaced.reduce((previous, current) => {
		const numSpaces = /^ +/.exec(current)[0].length;
		return Math.min(numSpaces, previous);
	}, Infinity);

	return new Array(min + 1).join(' ');
}

function getRelativePath(from, to) {
	const fromParts = from.split(/[/\\]/);
	const toParts = to.split(/[/\\]/);

	fromParts.pop(); // get dirname

	while (fromParts[0] === toParts[0]) {
		fromParts.shift();
		toParts.shift();
	}

	if (fromParts.length) {
		let i = fromParts.length;
		while (i--) fromParts[i] = '..';
	}

	return fromParts.concat(toParts).join('/');
}

const toString = Object.prototype.toString;

function isObject(thing) {
	return toString.call(thing) === '[object Object]';
}

function getLocator(source) {
	const originalLines = source.split('\n');
	const lineOffsets = [];

	for (let i = 0, pos = 0; i < originalLines.length; i++) {
		lineOffsets.push(pos);
		pos += originalLines[i].length + 1;
	}

	return function locate(index) {
		let i = 0;
		let j = lineOffsets.length;
		while (i < j) {
			const m = (i + j) >> 1;
			if (index < lineOffsets[m]) {
				j = m;
			} else {
				i = m + 1;
			}
		}
		const line = i - 1;
		const column = index - lineOffsets[line];
		return { line, column };
	};
}

const wordRegex = /\w/;

class Mappings {
	constructor(hires) {
		this.hires = hires;
		this.generatedCodeLine = 0;
		this.generatedCodeColumn = 0;
		this.raw = [];
		this.rawSegments = this.raw[this.generatedCodeLine] = [];
		this.pending = null;
	}

	addEdit(sourceIndex, content, loc, nameIndex) {
		if (content.length) {
			const contentLengthMinusOne = content.length - 1;
			let contentLineEnd = content.indexOf('\n', 0);
			let previousContentLineEnd = -1;
			// Loop through each line in the content and add a segment, but stop if the last line is empty,
			// else code afterwards would fill one line too many
			while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
				const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
				if (nameIndex >= 0) {
					segment.push(nameIndex);
				}
				this.rawSegments.push(segment);

				this.generatedCodeLine += 1;
				this.raw[this.generatedCodeLine] = this.rawSegments = [];
				this.generatedCodeColumn = 0;

				previousContentLineEnd = contentLineEnd;
				contentLineEnd = content.indexOf('\n', contentLineEnd + 1);
			}

			const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
			if (nameIndex >= 0) {
				segment.push(nameIndex);
			}
			this.rawSegments.push(segment);

			this.advance(content.slice(previousContentLineEnd + 1));
		} else if (this.pending) {
			this.rawSegments.push(this.pending);
			this.advance(content);
		}

		this.pending = null;
	}

	addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
		let originalCharIndex = chunk.start;
		let first = true;
		// when iterating each char, check if it's in a word boundary
		let charInHiresBoundary = false;

		while (originalCharIndex < chunk.end) {
			if (original[originalCharIndex] === '\n') {
				loc.line += 1;
				loc.column = 0;
				this.generatedCodeLine += 1;
				this.raw[this.generatedCodeLine] = this.rawSegments = [];
				this.generatedCodeColumn = 0;
				first = true;
				charInHiresBoundary = false;
			} else {
				if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
					const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];

					if (this.hires === 'boundary') {
						// in hires "boundary", group segments per word boundary than per char
						if (wordRegex.test(original[originalCharIndex])) {
							// for first char in the boundary found, start the boundary by pushing a segment
							if (!charInHiresBoundary) {
								this.rawSegments.push(segment);
								charInHiresBoundary = true;
							}
						} else {
							// for non-word char, end the boundary by pushing a segment
							this.rawSegments.push(segment);
							charInHiresBoundary = false;
						}
					} else {
						this.rawSegments.push(segment);
					}
				}

				loc.column += 1;
				this.generatedCodeColumn += 1;
				first = false;
			}

			originalCharIndex += 1;
		}

		this.pending = null;
	}

	advance(str) {
		if (!str) return;

		const lines = str.split('\n');

		if (lines.length > 1) {
			for (let i = 0; i < lines.length - 1; i++) {
				this.generatedCodeLine++;
				this.raw[this.generatedCodeLine] = this.rawSegments = [];
			}
			this.generatedCodeColumn = 0;
		}

		this.generatedCodeColumn += lines[lines.length - 1].length;
	}
}

const n = '\n';

const warned = {
	insertLeft: false,
	insertRight: false,
	storeName: false,
};

class MagicString {
	constructor(string, options = {}) {
		const chunk = new Chunk(0, string.length, string);

		Object.defineProperties(this, {
			original: { writable: true, value: string },
			outro: { writable: true, value: '' },
			intro: { writable: true, value: '' },
			firstChunk: { writable: true, value: chunk },
			lastChunk: { writable: true, value: chunk },
			lastSearchedChunk: { writable: true, value: chunk },
			byStart: { writable: true, value: {} },
			byEnd: { writable: true, value: {} },
			filename: { writable: true, value: options.filename },
			indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
			sourcemapLocations: { writable: true, value: new BitSet() },
			storedNames: { writable: true, value: {} },
			indentStr: { writable: true, value: undefined },
			ignoreList: { writable: true, value: options.ignoreList },
			offset: { writable: true, value: options.offset || 0 },
		});

		this.byStart[0] = chunk;
		this.byEnd[string.length] = chunk;
	}

	addSourcemapLocation(char) {
		this.sourcemapLocations.add(char);
	}

	append(content) {
		if (typeof content !== 'string') throw new TypeError('outro content must be a string');

		this.outro += content;
		return this;
	}

	appendLeft(index, content) {
		index = index + this.offset;

		if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

		this._split(index);

		const chunk = this.byEnd[index];

		if (chunk) {
			chunk.appendLeft(content);
		} else {
			this.intro += content;
		}
		return this;
	}

	appendRight(index, content) {
		index = index + this.offset;

		if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

		this._split(index);

		const chunk = this.byStart[index];

		if (chunk) {
			chunk.appendRight(content);
		} else {
			this.outro += content;
		}
		return this;
	}

	clone() {
		const cloned = new MagicString(this.original, { filename: this.filename, offset: this.offset });

		let originalChunk = this.firstChunk;
		let clonedChunk = (cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone());

		while (originalChunk) {
			cloned.byStart[clonedChunk.start] = clonedChunk;
			cloned.byEnd[clonedChunk.end] = clonedChunk;

			const nextOriginalChunk = originalChunk.next;
			const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();

			if (nextClonedChunk) {
				clonedChunk.next = nextClonedChunk;
				nextClonedChunk.previous = clonedChunk;

				clonedChunk = nextClonedChunk;
			}

			originalChunk = nextOriginalChunk;
		}

		cloned.lastChunk = clonedChunk;

		if (this.indentExclusionRanges) {
			cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
		}

		cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);

		cloned.intro = this.intro;
		cloned.outro = this.outro;

		return cloned;
	}

	generateDecodedMap(options) {
		options = options || {};

		const sourceIndex = 0;
		const names = Object.keys(this.storedNames);
		const mappings = new Mappings(options.hires);

		const locate = getLocator(this.original);

		if (this.intro) {
			mappings.advance(this.intro);
		}

		this.firstChunk.eachNext((chunk) => {
			const loc = locate(chunk.start);

			if (chunk.intro.length) mappings.advance(chunk.intro);

			if (chunk.edited) {
				mappings.addEdit(
					sourceIndex,
					chunk.content,
					loc,
					chunk.storeName ? names.indexOf(chunk.original) : -1,
				);
			} else {
				mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
			}

			if (chunk.outro.length) mappings.advance(chunk.outro);
		});

		return {
			file: options.file ? options.file.split(/[/\\]/).pop() : undefined,
			sources: [
				options.source ? getRelativePath(options.file || '', options.source) : options.file || '',
			],
			sourcesContent: options.includeContent ? [this.original] : undefined,
			names,
			mappings: mappings.raw,
			x_google_ignoreList: this.ignoreList ? [sourceIndex] : undefined,
		};
	}

	generateMap(options) {
		return new SourceMap(this.generateDecodedMap(options));
	}

	_ensureindentStr() {
		if (this.indentStr === undefined) {
			this.indentStr = guessIndent(this.original);
		}
	}

	_getRawIndentString() {
		this._ensureindentStr();
		return this.indentStr;
	}

	getIndentString() {
		this._ensureindentStr();
		return this.indentStr === null ? '\t' : this.indentStr;
	}

	indent(indentStr, options) {
		const pattern = /^[^\r\n]/gm;

		if (isObject(indentStr)) {
			options = indentStr;
			indentStr = undefined;
		}

		if (indentStr === undefined) {
			this._ensureindentStr();
			indentStr = this.indentStr || '\t';
		}

		if (indentStr === '') return this; // noop

		options = options || {};

		// Process exclusion ranges
		const isExcluded = {};

		if (options.exclude) {
			const exclusions =
				typeof options.exclude[0] === 'number' ? [options.exclude] : options.exclude;
			exclusions.forEach((exclusion) => {
				for (let i = exclusion[0]; i < exclusion[1]; i += 1) {
					isExcluded[i] = true;
				}
			});
		}

		let shouldIndentNextCharacter = options.indentStart !== false;
		const replacer = (match) => {
			if (shouldIndentNextCharacter) return `${indentStr}${match}`;
			shouldIndentNextCharacter = true;
			return match;
		};

		this.intro = this.intro.replace(pattern, replacer);

		let charIndex = 0;
		let chunk = this.firstChunk;

		while (chunk) {
			const end = chunk.end;

			if (chunk.edited) {
				if (!isExcluded[charIndex]) {
					chunk.content = chunk.content.replace(pattern, replacer);

					if (chunk.content.length) {
						shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === '\n';
					}
				}
			} else {
				charIndex = chunk.start;

				while (charIndex < end) {
					if (!isExcluded[charIndex]) {
						const char = this.original[charIndex];

						if (char === '\n') {
							shouldIndentNextCharacter = true;
						} else if (char !== '\r' && shouldIndentNextCharacter) {
							shouldIndentNextCharacter = false;

							if (charIndex === chunk.start) {
								chunk.prependRight(indentStr);
							} else {
								this._splitChunk(chunk, charIndex);
								chunk = chunk.next;
								chunk.prependRight(indentStr);
							}
						}
					}

					charIndex += 1;
				}
			}

			charIndex = chunk.end;
			chunk = chunk.next;
		}

		this.outro = this.outro.replace(pattern, replacer);

		return this;
	}

	insert() {
		throw new Error(
			'magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)',
		);
	}

	insertLeft(index, content) {
		if (!warned.insertLeft) {
			console.warn(
				'magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead',
			);
			warned.insertLeft = true;
		}

		return this.appendLeft(index, content);
	}

	insertRight(index, content) {
		if (!warned.insertRight) {
			console.warn(
				'magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead',
			);
			warned.insertRight = true;
		}

		return this.prependRight(index, content);
	}

	move(start, end, index) {
		start = start + this.offset;
		end = end + this.offset;
		index = index + this.offset;

		if (index >= start && index <= end) throw new Error('Cannot move a selection inside itself');

		this._split(start);
		this._split(end);
		this._split(index);

		const first = this.byStart[start];
		const last = this.byEnd[end];

		const oldLeft = first.previous;
		const oldRight = last.next;

		const newRight = this.byStart[index];
		if (!newRight && last === this.lastChunk) return this;
		const newLeft = newRight ? newRight.previous : this.lastChunk;

		if (oldLeft) oldLeft.next = oldRight;
		if (oldRight) oldRight.previous = oldLeft;

		if (newLeft) newLeft.next = first;
		if (newRight) newRight.previous = last;

		if (!first.previous) this.firstChunk = last.next;
		if (!last.next) {
			this.lastChunk = first.previous;
			this.lastChunk.next = null;
		}

		first.previous = newLeft;
		last.next = newRight || null;

		if (!newLeft) this.firstChunk = first;
		if (!newRight) this.lastChunk = last;
		return this;
	}

	overwrite(start, end, content, options) {
		options = options || {};
		return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
	}

	update(start, end, content, options) {
		start = start + this.offset;
		end = end + this.offset;

		if (typeof content !== 'string') throw new TypeError('replacement content must be a string');

		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}

		if (end > this.original.length) throw new Error('end is out of bounds');
		if (start === end)
			throw new Error(
				'Cannot overwrite a zero-length range – use appendLeft or prependRight instead',
			);

		this._split(start);
		this._split(end);

		if (options === true) {
			if (!warned.storeName) {
				console.warn(
					'The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string',
				);
				warned.storeName = true;
			}

			options = { storeName: true };
		}
		const storeName = options !== undefined ? options.storeName : false;
		const overwrite = options !== undefined ? options.overwrite : false;

		if (storeName) {
			const original = this.original.slice(start, end);
			Object.defineProperty(this.storedNames, original, {
				writable: true,
				value: true,
				enumerable: true,
			});
		}

		const first = this.byStart[start];
		const last = this.byEnd[end];

		if (first) {
			let chunk = first;
			while (chunk !== last) {
				if (chunk.next !== this.byStart[chunk.end]) {
					throw new Error('Cannot overwrite across a split point');
				}
				chunk = chunk.next;
				chunk.edit('', false);
			}

			first.edit(content, storeName, !overwrite);
		} else {
			// must be inserting at the end
			const newChunk = new Chunk(start, end, '').edit(content, storeName);

			// TODO last chunk in the array may not be the last chunk, if it's moved...
			last.next = newChunk;
			newChunk.previous = last;
		}
		return this;
	}

	prepend(content) {
		if (typeof content !== 'string') throw new TypeError('outro content must be a string');

		this.intro = content + this.intro;
		return this;
	}

	prependLeft(index, content) {
		index = index + this.offset;

		if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

		this._split(index);

		const chunk = this.byEnd[index];

		if (chunk) {
			chunk.prependLeft(content);
		} else {
			this.intro = content + this.intro;
		}
		return this;
	}

	prependRight(index, content) {
		index = index + this.offset;

		if (typeof content !== 'string') throw new TypeError('inserted content must be a string');

		this._split(index);

		const chunk = this.byStart[index];

		if (chunk) {
			chunk.prependRight(content);
		} else {
			this.outro = content + this.outro;
		}
		return this;
	}

	remove(start, end) {
		start = start + this.offset;
		end = end + this.offset;

		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}

		if (start === end) return this;

		if (start < 0 || end > this.original.length) throw new Error('Character is out of bounds');
		if (start > end) throw new Error('end must be greater than start');

		this._split(start);
		this._split(end);

		let chunk = this.byStart[start];

		while (chunk) {
			chunk.intro = '';
			chunk.outro = '';
			chunk.edit('');

			chunk = end > chunk.end ? this.byStart[chunk.end] : null;
		}
		return this;
	}

	reset(start, end) {
		start = start + this.offset;
		end = end + this.offset;

		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}

		if (start === end) return this;

		if (start < 0 || end > this.original.length) throw new Error('Character is out of bounds');
		if (start > end) throw new Error('end must be greater than start');

		this._split(start);
		this._split(end);

		let chunk = this.byStart[start];

		while (chunk) {
			chunk.reset();

			chunk = end > chunk.end ? this.byStart[chunk.end] : null;
		}
		return this;
	}

	lastChar() {
		if (this.outro.length) return this.outro[this.outro.length - 1];
		let chunk = this.lastChunk;
		do {
			if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
			if (chunk.content.length) return chunk.content[chunk.content.length - 1];
			if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
		} while ((chunk = chunk.previous));
		if (this.intro.length) return this.intro[this.intro.length - 1];
		return '';
	}

	lastLine() {
		let lineIndex = this.outro.lastIndexOf(n);
		if (lineIndex !== -1) return this.outro.substr(lineIndex + 1);
		let lineStr = this.outro;
		let chunk = this.lastChunk;
		do {
			if (chunk.outro.length > 0) {
				lineIndex = chunk.outro.lastIndexOf(n);
				if (lineIndex !== -1) return chunk.outro.substr(lineIndex + 1) + lineStr;
				lineStr = chunk.outro + lineStr;
			}

			if (chunk.content.length > 0) {
				lineIndex = chunk.content.lastIndexOf(n);
				if (lineIndex !== -1) return chunk.content.substr(lineIndex + 1) + lineStr;
				lineStr = chunk.content + lineStr;
			}

			if (chunk.intro.length > 0) {
				lineIndex = chunk.intro.lastIndexOf(n);
				if (lineIndex !== -1) return chunk.intro.substr(lineIndex + 1) + lineStr;
				lineStr = chunk.intro + lineStr;
			}
		} while ((chunk = chunk.previous));
		lineIndex = this.intro.lastIndexOf(n);
		if (lineIndex !== -1) return this.intro.substr(lineIndex + 1) + lineStr;
		return this.intro + lineStr;
	}

	slice(start = 0, end = this.original.length - this.offset) {
		start = start + this.offset;
		end = end + this.offset;

		if (this.original.length !== 0) {
			while (start < 0) start += this.original.length;
			while (end < 0) end += this.original.length;
		}

		let result = '';

		// find start chunk
		let chunk = this.firstChunk;
		while (chunk && (chunk.start > start || chunk.end <= start)) {
			// found end chunk before start
			if (chunk.start < end && chunk.end >= end) {
				return result;
			}

			chunk = chunk.next;
		}

		if (chunk && chunk.edited && chunk.start !== start)
			throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);

		const startChunk = chunk;
		while (chunk) {
			if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
				result += chunk.intro;
			}

			const containsEnd = chunk.start < end && chunk.end >= end;
			if (containsEnd && chunk.edited && chunk.end !== end)
				throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);

			const sliceStart = startChunk === chunk ? start - chunk.start : 0;
			const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;

			result += chunk.content.slice(sliceStart, sliceEnd);

			if (chunk.outro && (!containsEnd || chunk.end === end)) {
				result += chunk.outro;
			}

			if (containsEnd) {
				break;
			}

			chunk = chunk.next;
		}

		return result;
	}

	// TODO deprecate this? not really very useful
	snip(start, end) {
		const clone = this.clone();
		clone.remove(0, start);
		clone.remove(end, clone.original.length);

		return clone;
	}

	_split(index) {
		if (this.byStart[index] || this.byEnd[index]) return;

		let chunk = this.lastSearchedChunk;
		const searchForward = index > chunk.end;

		while (chunk) {
			if (chunk.contains(index)) return this._splitChunk(chunk, index);

			chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
		}
	}

	_splitChunk(chunk, index) {
		if (chunk.edited && chunk.content.length) {
			// zero-length edited chunks are a special case (overlapping replacements)
			const loc = getLocator(this.original)(index);
			throw new Error(
				`Cannot split a chunk that has already been edited (${loc.line}:${loc.column} – "${chunk.original}")`,
			);
		}

		const newChunk = chunk.split(index);

		this.byEnd[index] = chunk;
		this.byStart[index] = newChunk;
		this.byEnd[newChunk.end] = newChunk;

		if (chunk === this.lastChunk) this.lastChunk = newChunk;

		this.lastSearchedChunk = chunk;
		return true;
	}

	toString() {
		let str = this.intro;

		let chunk = this.firstChunk;
		while (chunk) {
			str += chunk.toString();
			chunk = chunk.next;
		}

		return str + this.outro;
	}

	isEmpty() {
		let chunk = this.firstChunk;
		do {
			if (
				(chunk.intro.length && chunk.intro.trim()) ||
				(chunk.content.length && chunk.content.trim()) ||
				(chunk.outro.length && chunk.outro.trim())
			)
				return false;
		} while ((chunk = chunk.next));
		return true;
	}

	length() {
		let chunk = this.firstChunk;
		let length = 0;
		do {
			length += chunk.intro.length + chunk.content.length + chunk.outro.length;
		} while ((chunk = chunk.next));
		return length;
	}

	trimLines() {
		return this.trim('[\\r\\n]');
	}

	trim(charType) {
		return this.trimStart(charType).trimEnd(charType);
	}

	trimEndAborted(charType) {
		const rx = new RegExp((charType || '\\s') + '+$');

		this.outro = this.outro.replace(rx, '');
		if (this.outro.length) return true;

		let chunk = this.lastChunk;

		do {
			const end = chunk.end;
			const aborted = chunk.trimEnd(rx);

			// if chunk was trimmed, we have a new lastChunk
			if (chunk.end !== end) {
				if (this.lastChunk === chunk) {
					this.lastChunk = chunk.next;
				}

				this.byEnd[chunk.end] = chunk;
				this.byStart[chunk.next.start] = chunk.next;
				this.byEnd[chunk.next.end] = chunk.next;
			}

			if (aborted) return true;
			chunk = chunk.previous;
		} while (chunk);

		return false;
	}

	trimEnd(charType) {
		this.trimEndAborted(charType);
		return this;
	}
	trimStartAborted(charType) {
		const rx = new RegExp('^' + (charType || '\\s') + '+');

		this.intro = this.intro.replace(rx, '');
		if (this.intro.length) return true;

		let chunk = this.firstChunk;

		do {
			const end = chunk.end;
			const aborted = chunk.trimStart(rx);

			if (chunk.end !== end) {
				// special case...
				if (chunk === this.lastChunk) this.lastChunk = chunk.next;

				this.byEnd[chunk.end] = chunk;
				this.byStart[chunk.next.start] = chunk.next;
				this.byEnd[chunk.next.end] = chunk.next;
			}

			if (aborted) return true;
			chunk = chunk.next;
		} while (chunk);

		return false;
	}

	trimStart(charType) {
		this.trimStartAborted(charType);
		return this;
	}

	hasChanged() {
		return this.original !== this.toString();
	}

	_replaceRegexp(searchValue, replacement) {
		function getReplacement(match, str) {
			if (typeof replacement === 'string') {
				return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
					// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
					if (i === '$') return '$';
					if (i === '&') return match[0];
					const num = +i;
					if (num < match.length) return match[+i];
					return `$${i}`;
				});
			} else {
				return replacement(...match, match.index, str, match.groups);
			}
		}
		function matchAll(re, str) {
			let match;
			const matches = [];
			while ((match = re.exec(str))) {
				matches.push(match);
			}
			return matches;
		}
		if (searchValue.global) {
			const matches = matchAll(searchValue, this.original);
			matches.forEach((match) => {
				if (match.index != null) {
					const replacement = getReplacement(match, this.original);
					if (replacement !== match[0]) {
						this.overwrite(match.index, match.index + match[0].length, replacement);
					}
				}
			});
		} else {
			const match = this.original.match(searchValue);
			if (match && match.index != null) {
				const replacement = getReplacement(match, this.original);
				if (replacement !== match[0]) {
					this.overwrite(match.index, match.index + match[0].length, replacement);
				}
			}
		}
		return this;
	}

	_replaceString(string, replacement) {
		const { original } = this;
		const index = original.indexOf(string);

		if (index !== -1) {
			this.overwrite(index, index + string.length, replacement);
		}

		return this;
	}

	replace(searchValue, replacement) {
		if (typeof searchValue === 'string') {
			return this._replaceString(searchValue, replacement);
		}

		return this._replaceRegexp(searchValue, replacement);
	}

	_replaceAllString(string, replacement) {
		const { original } = this;
		const stringLength = string.length;
		for (
			let index = original.indexOf(string);
			index !== -1;
			index = original.indexOf(string, index + stringLength)
		) {
			const previous = original.slice(index, index + stringLength);
			if (previous !== replacement) this.overwrite(index, index + stringLength, replacement);
		}

		return this;
	}

	replaceAll(searchValue, replacement) {
		if (typeof searchValue === 'string') {
			return this._replaceAllString(searchValue, replacement);
		}

		if (!searchValue.global) {
			throw new TypeError(
				'MagicString.prototype.replaceAll called with a non-global RegExp argument',
			);
		}

		return this._replaceRegexp(searchValue, replacement);
	}
}

function isReference(node, parent) {
    if (node.type === 'MemberExpression') {
        return !node.computed && isReference(node.object, node);
    }
    if (node.type === 'Identifier') {
        if (!parent)
            return true;
        switch (parent.type) {
            // disregard `bar` in `foo.bar`
            case 'MemberExpression': return parent.computed || node === parent.object;
            // disregard the `foo` in `class {foo(){}}` but keep it in `class {[foo](){}}`
            case 'MethodDefinition': return parent.computed;
            // disregard the `foo` in `class {foo=bar}` but keep it in `class {[foo]=bar}` and `class {bar=foo}`
            case 'FieldDefinition': return parent.computed || node === parent.value;
            // disregard the `bar` in `{ bar: foo }`, but keep it in `{ [bar]: foo }`
            case 'Property': return parent.computed || node === parent.value;
            // disregard the `bar` in `export { foo as bar }` or
            // the foo in `import { foo as bar }`
            case 'ExportSpecifier':
            case 'ImportSpecifier': return node === parent.local;
            // disregard the `foo` in `foo: while (...) { ... break foo; ... continue foo;}`
            case 'LabeledStatement':
            case 'BreakStatement':
            case 'ContinueStatement': return false;
            default: return true;
        }
    }
    return false;
}

var version = "28.0.6";
var peerDependencies = {
	rollup: "^2.68.0||^3.0.0||^4.0.0"
};

function tryParse(parse, code, id) {
  try {
    return parse(code, { allowReturnOutsideFunction: true });
  } catch (err) {
    err.message += ` in ${id}`;
    throw err;
  }
}

const firstpassGlobal = /\b(?:require|module|exports|global)\b/;

const firstpassNoGlobal = /\b(?:require|module|exports)\b/;

function hasCjsKeywords(code, ignoreGlobal) {
  const firstpass = ignoreGlobal ? firstpassNoGlobal : firstpassGlobal;
  return firstpass.test(code);
}

/* eslint-disable no-underscore-dangle */


function analyzeTopLevelStatements(parse, code, id) {
  const ast = tryParse(parse, code, id);

  let isEsModule = false;
  let hasDefaultExport = false;
  let hasNamedExports = false;

  for (const node of ast.body) {
    switch (node.type) {
      case 'ExportDefaultDeclaration':
        isEsModule = true;
        hasDefaultExport = true;
        break;
      case 'ExportNamedDeclaration':
        isEsModule = true;
        if (node.declaration) {
          hasNamedExports = true;
        } else {
          for (const specifier of node.specifiers) {
            if (specifier.exported.name === 'default') {
              hasDefaultExport = true;
            } else {
              hasNamedExports = true;
            }
          }
        }
        break;
      case 'ExportAllDeclaration':
        isEsModule = true;
        if (node.exported && node.exported.name === 'default') {
          hasDefaultExport = true;
        } else {
          hasNamedExports = true;
        }
        break;
      case 'ImportDeclaration':
        isEsModule = true;
        break;
    }
  }

  return { isEsModule, hasDefaultExport, hasNamedExports, ast };
}

/* eslint-disable import/prefer-default-export */


function deconflict(scopes, globals, identifier) {
  let i = 1;
  let deconflicted = makeLegalIdentifier(identifier);
  const hasConflicts = () =>
    scopes.some((scope) => scope.contains(deconflicted)) || globals.has(deconflicted);

  while (hasConflicts()) {
    deconflicted = makeLegalIdentifier(`${identifier}_${i}`);
    i += 1;
  }

  for (const scope of scopes) {
    scope.declarations[deconflicted] = true;
  }

  return deconflicted;
}

function getName(id) {
  const name = makeLegalIdentifier(basename(id, extname(id)));
  if (name !== 'index') {
    return name;
  }
  return makeLegalIdentifier(basename(dirname(id)));
}

function normalizePathSlashes(path) {
  return path.replace(/\\/g, '/');
}

const getVirtualPathForDynamicRequirePath = (path, commonDir) =>
  `/${normalizePathSlashes(relative(commonDir, path))}`;

function capitalize$1(name) {
  return name[0].toUpperCase() + name.slice(1);
}

function getStrictRequiresFilter({ strictRequires }) {
  switch (strictRequires) {
    // eslint-disable-next-line no-undefined
    case undefined:
    case true:
      return { strictRequiresFilter: () => true, detectCyclesAndConditional: false };
    case 'auto':
    case 'debug':
    case null:
      return { strictRequiresFilter: () => false, detectCyclesAndConditional: true };
    case false:
      return { strictRequiresFilter: () => false, detectCyclesAndConditional: false };
    default:
      if (typeof strictRequires === 'string' || Array.isArray(strictRequires)) {
        return {
          strictRequiresFilter: createFilter(strictRequires),
          detectCyclesAndConditional: false
        };
      }
      throw new Error('Unexpected value for "strictRequires" option.');
  }
}

function getPackageEntryPoint(dirPath) {
  let entryPoint = 'index.js';

  try {
    if (existsSync(join(dirPath, 'package.json'))) {
      entryPoint =
        JSON.parse(readFileSync(join(dirPath, 'package.json'), { encoding: 'utf8' })).main ||
        entryPoint;
    }
  } catch (ignored) {
    // ignored
  }

  return entryPoint;
}

function isDirectory(path) {
  try {
    if (statSync(path).isDirectory()) return true;
  } catch (ignored) {
    // Nothing to do here
  }
  return false;
}

function getDynamicRequireModules(patterns, dynamicRequireRoot) {
  const dynamicRequireModules = new Map();
  const dirNames = new Set();
  for (const pattern of !patterns || Array.isArray(patterns) ? patterns || [] : [patterns]) {
    const isNegated = pattern.startsWith('!');
    const modifyMap = (targetPath, resolvedPath) =>
      isNegated
        ? dynamicRequireModules.delete(targetPath)
        : dynamicRequireModules.set(targetPath, resolvedPath);
    // eslint-disable-next-line new-cap
    for (const path of new distExports.fdir()
      .withBasePath()
      .withDirs()
      .glob(isNegated ? pattern.substr(1) : pattern)
      .crawl(relative('.', dynamicRequireRoot))
      .sync()
      .sort((a, b) => a.localeCompare(b, 'en'))) {
      const resolvedPath = resolve$2(path);
      const requirePath = normalizePathSlashes(resolvedPath);
      if (isDirectory(resolvedPath)) {
        dirNames.add(resolvedPath);
        const modulePath = resolve$2(join(resolvedPath, getPackageEntryPoint(path)));
        modifyMap(requirePath, modulePath);
        modifyMap(normalizePathSlashes(modulePath), modulePath);
      } else {
        dirNames.add(dirname(resolvedPath));
        modifyMap(requirePath, resolvedPath);
      }
    }
  }
  return {
    commonDir: dirNames.size ? getCommonDir([...dirNames, dynamicRequireRoot]) : null,
    dynamicRequireModules
  };
}

const FAILED_REQUIRE_ERROR = `throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');`;

const COMMONJS_REQUIRE_EXPORT = 'commonjsRequire';
const CREATE_COMMONJS_REQUIRE_EXPORT = 'createCommonjsRequire';

function getDynamicModuleRegistry(
  isDynamicRequireModulesEnabled,
  dynamicRequireModules,
  commonDir,
  ignoreDynamicRequires
) {
  if (!isDynamicRequireModulesEnabled) {
    return `export function ${COMMONJS_REQUIRE_EXPORT}(path) {
	${FAILED_REQUIRE_ERROR}
}`;
  }
  const dynamicModuleImports = [...dynamicRequireModules.values()]
    .map(
      (id, index) =>
        `import ${
          id.endsWith('.json') ? `json${index}` : `{ __require as require${index} }`
        } from ${JSON.stringify(id)};`
    )
    .join('\n');
  const dynamicModuleProps = [...dynamicRequireModules.keys()]
    .map(
      (id, index) =>
        `\t\t${JSON.stringify(getVirtualPathForDynamicRequirePath(id, commonDir))}: ${
          id.endsWith('.json') ? `function () { return json${index}; }` : `require${index}`
        }`
    )
    .join(',\n');
  return `${dynamicModuleImports}

var dynamicModules;

function getDynamicModules() {
	return dynamicModules || (dynamicModules = {
${dynamicModuleProps}
	});
}

export function ${CREATE_COMMONJS_REQUIRE_EXPORT}(originalModuleDir) {
	function handleRequire(path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return getDynamicModules()[resolvedPath]();
		}
		${ignoreDynamicRequires ? 'return require(path);' : FAILED_REQUIRE_ERROR}
	}
	handleRequire.resolve = function (path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return resolvedPath;
		}
		return require.resolve(path);
	}
	return handleRequire;
}

function commonjsResolve (path, originalModuleDir) {
	var shouldTryNodeModules = isPossibleNodeModulesPath(path);
	path = normalize(path);
	var relPath;
	if (path[0] === '/') {
		originalModuleDir = '';
	}
	var modules = getDynamicModules();
	var checkedExtensions = ['', '.js', '.json'];
	while (true) {
		if (!shouldTryNodeModules) {
			relPath = normalize(originalModuleDir + '/' + path);
		} else {
			relPath = normalize(originalModuleDir + '/node_modules/' + path);
		}

		if (relPath.endsWith('/..')) {
			break; // Travelled too far up, avoid infinite loop
		}

		for (var extensionIndex = 0; extensionIndex < checkedExtensions.length; extensionIndex++) {
			var resolvedPath = relPath + checkedExtensions[extensionIndex];
			if (modules[resolvedPath]) {
				return resolvedPath;
			}
		}
		if (!shouldTryNodeModules) break;
		var nextDir = normalize(originalModuleDir + '/..');
		if (nextDir === originalModuleDir) break;
		originalModuleDir = nextDir;
	}
	return null;
}

function isPossibleNodeModulesPath (modulePath) {
	var c0 = modulePath[0];
	if (c0 === '/' || c0 === '\\\\') return false;
	var c1 = modulePath[1], c2 = modulePath[2];
	if ((c0 === '.' && (!c1 || c1 === '/' || c1 === '\\\\')) ||
		(c0 === '.' && c1 === '.' && (!c2 || c2 === '/' || c2 === '\\\\'))) return false;
	if (c1 === ':' && (c2 === '/' || c2 === '\\\\')) return false;
	return true;
}

function normalize (path) {
	path = path.replace(/\\\\/g, '/');
	var parts = path.split('/');
	var slashed = parts[0] === '';
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] === '.' || parts[i] === '') {
			parts.splice(i--, 1);
		}
	}
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] !== '..') continue;
		if (i > 0 && parts[i - 1] !== '..' && parts[i - 1] !== '.') {
			parts.splice(--i, 2);
			i--;
		}
	}
	path = parts.join('/');
	if (slashed && path[0] !== '/') path = '/' + path;
	else if (path.length === 0) path = '.';
	return path;
}`;
}

const isWrappedId = (id, suffix) => id.endsWith(suffix);
const wrapId = (id, suffix) => `\0${id}${suffix}`;
const unwrapId = (wrappedId, suffix) => wrappedId.slice(1, -suffix.length);

// A proxy module when a module is required from non-wrapped CommonJS. Is different for ESM and CommonJS requires.
const PROXY_SUFFIX = '?commonjs-proxy';
// Indicates that a required module is wrapped commonjs and needs special handling.
const WRAPPED_SUFFIX = '?commonjs-wrapped';
// Indicates that a required module is external
const EXTERNAL_SUFFIX = '?commonjs-external';
// A helper module that contains the exports object of a module
const EXPORTS_SUFFIX = '?commonjs-exports';
// A helper module that contains the module object of a module, e.g. when module.exports is reassigned
const MODULE_SUFFIX = '?commonjs-module';
// A special proxy for CommonJS entry points
const ENTRY_SUFFIX = '?commonjs-entry';
// A proxy when wrapped ESM is required from CommonJS
const ES_IMPORT_SUFFIX = '?commonjs-es-import';

const DYNAMIC_MODULES_ID = '\0commonjs-dynamic-modules';
const HELPERS_ID = '\0commonjsHelpers.js';

const IS_WRAPPED_COMMONJS = 'withRequireFunction';

// `x['default']` is used instead of `x.default` for backward compatibility with ES3 browsers.
// Minifiers like uglify will usually transpile it back if compatibility with ES3 is not enabled.
// This could be improved by inspecting Rollup's "generatedCode" option

const HELPERS = `
export var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

export function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

export function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

export function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

export function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			var isInstance = false;
      try {
        isInstance = this instanceof a;
      } catch {}
			if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}
`;

function getHelpersModule() {
  return HELPERS;
}

function getUnknownRequireProxy(id, requireReturnsDefault) {
  if (requireReturnsDefault === true || id.endsWith('.json')) {
    return `export { default } from ${JSON.stringify(id)};`;
  }
  const name = getName(id);
  const exported =
    requireReturnsDefault === 'auto'
      ? `import { getDefaultExportFromNamespaceIfNotNamed } from "${HELPERS_ID}"; export default /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(${name});`
      : requireReturnsDefault === 'preferred'
      ? `import { getDefaultExportFromNamespaceIfPresent } from "${HELPERS_ID}"; export default /*@__PURE__*/getDefaultExportFromNamespaceIfPresent(${name});`
      : !requireReturnsDefault
      ? `import { getAugmentedNamespace } from "${HELPERS_ID}"; export default /*@__PURE__*/getAugmentedNamespace(${name});`
      : `export default ${name};`;
  return `import * as ${name} from ${JSON.stringify(id)}; ${exported}`;
}

async function getStaticRequireProxy(id, requireReturnsDefault, loadModule) {
  const name = getName(id);
  const {
    meta: { commonjs: commonjsMeta }
  } = await loadModule({ id });
  if (!commonjsMeta) {
    return getUnknownRequireProxy(id, requireReturnsDefault);
  }
  if (commonjsMeta.isCommonJS) {
    return `export { __moduleExports as default } from ${JSON.stringify(id)};`;
  }
  if (!requireReturnsDefault) {
    return `import { getAugmentedNamespace } from "${HELPERS_ID}"; import * as ${name} from ${JSON.stringify(
      id
    )}; export default /*@__PURE__*/getAugmentedNamespace(${name});`;
  }
  if (
    requireReturnsDefault !== true &&
    (requireReturnsDefault === 'namespace' ||
      !commonjsMeta.hasDefaultExport ||
      (requireReturnsDefault === 'auto' && commonjsMeta.hasNamedExports))
  ) {
    return `import * as ${name} from ${JSON.stringify(id)}; export default ${name};`;
  }
  return `export { default } from ${JSON.stringify(id)};`;
}

function getEntryProxy(id, defaultIsModuleExports, getModuleInfo, shebang) {
  const {
    meta: { commonjs: commonjsMeta },
    hasDefaultExport
  } = getModuleInfo(id);
  if (!commonjsMeta || commonjsMeta.isCommonJS !== IS_WRAPPED_COMMONJS) {
    const stringifiedId = JSON.stringify(id);
    let code = `export * from ${stringifiedId};`;
    if (hasDefaultExport) {
      code += `export { default } from ${stringifiedId};`;
    }
    return shebang + code;
  }
  const result = getEsImportProxy(id, defaultIsModuleExports, true);
  return {
    ...result,
    code: shebang + result.code
  };
}

function getEsImportProxy(id, defaultIsModuleExports, moduleSideEffects) {
  const name = getName(id);
  const exportsName = `${name}Exports`;
  const requireModule = `require${capitalize$1(name)}`;
  let code =
    `import { getDefaultExportFromCjs } from "${HELPERS_ID}";\n` +
    `import { __require as ${requireModule} } from ${JSON.stringify(id)};\n` +
    `var ${exportsName} = ${moduleSideEffects ? '' : '/*@__PURE__*/ '}${requireModule}();\n` +
    `export { ${exportsName} as __moduleExports };`;
  if (defaultIsModuleExports === true) {
    code += `\nexport { ${exportsName} as default };`;
  } else if (defaultIsModuleExports === false) {
    code += `\nexport default ${exportsName}.default;`;
  } else {
    code += `\nexport default /*@__PURE__*/getDefaultExportFromCjs(${exportsName});`;
  }
  return {
    code,
    syntheticNamedExports: '__moduleExports'
  };
}

/* eslint-disable no-param-reassign, no-undefined */


function getCandidatesForExtension(resolved, extension) {
  return [resolved + extension, `${resolved}${sep}index${extension}`];
}

function getCandidates(resolved, extensions) {
  return extensions.reduce(
    (paths, extension) => paths.concat(getCandidatesForExtension(resolved, extension)),
    [resolved]
  );
}

function resolveExtensions(importee, importer, extensions) {
  // not our problem
  if (importee[0] !== '.' || !importer) return undefined;

  const resolved = resolve$2(dirname(importer), importee);
  const candidates = getCandidates(resolved, extensions);

  for (let i = 0; i < candidates.length; i += 1) {
    try {
      const stats = statSync(candidates[i]);
      if (stats.isFile()) return { id: candidates[i] };
    } catch (err) {
      /* noop */
    }
  }

  return undefined;
}

function getResolveId(extensions, isPossibleCjsId) {
  const currentlyResolving = new Map();

  return {
    /**
     * This is a Maps of importers to Sets of require sources being resolved at
     * the moment by resolveRequireSourcesAndUpdateMeta
     */
    currentlyResolving,
    async resolveId(importee, importer, resolveOptions) {
      const customOptions = resolveOptions.custom;
      // All logic below is specific to ES imports.
      // Also, if we do not skip this logic for requires that are resolved while
      // transforming a commonjs file, it can easily lead to deadlocks.
      if (customOptions?.['node-resolve']?.isRequire) {
        return null;
      }
      const currentlyResolvingForParent = currentlyResolving.get(importer);
      if (currentlyResolvingForParent && currentlyResolvingForParent.has(importee)) {
        this.warn({
          code: 'THIS_RESOLVE_WITHOUT_OPTIONS',
          message:
            'It appears a plugin has implemented a "resolveId" hook that uses "this.resolve" without forwarding the third "options" parameter of "resolveId". This is problematic as it can lead to wrong module resolutions especially for the node-resolve plugin and in certain cases cause early exit errors for the commonjs plugin.\nIn rare cases, this warning can appear if the same file is both imported and required from the same mixed ES/CommonJS module, in which case it can be ignored.',
          url: 'https://rollupjs.org/guide/en/#resolveid'
        });
        return null;
      }

      if (isWrappedId(importee, WRAPPED_SUFFIX)) {
        return unwrapId(importee, WRAPPED_SUFFIX);
      }

      if (
        importee.endsWith(ENTRY_SUFFIX) ||
        isWrappedId(importee, MODULE_SUFFIX) ||
        isWrappedId(importee, EXPORTS_SUFFIX) ||
        isWrappedId(importee, PROXY_SUFFIX) ||
        isWrappedId(importee, ES_IMPORT_SUFFIX) ||
        isWrappedId(importee, EXTERNAL_SUFFIX) ||
        importee.startsWith(HELPERS_ID) ||
        importee === DYNAMIC_MODULES_ID
      ) {
        return importee;
      }

      if (importer) {
        if (
          importer === DYNAMIC_MODULES_ID ||
          // Proxies are only importing resolved ids, no need to resolve again
          isWrappedId(importer, PROXY_SUFFIX) ||
          isWrappedId(importer, ES_IMPORT_SUFFIX) ||
          importer.endsWith(ENTRY_SUFFIX)
        ) {
          return importee;
        }
        if (isWrappedId(importer, EXTERNAL_SUFFIX)) {
          // We need to return null for unresolved imports so that the proper warning is shown
          if (
            !(await this.resolve(
              importee,
              importer,
              Object.assign({ skipSelf: true }, resolveOptions)
            ))
          ) {
            return null;
          }
          // For other external imports, we need to make sure they are handled as external
          return { id: importee, external: true };
        }
      }

      if (importee.startsWith('\0')) {
        return null;
      }

      // If this is an entry point or ESM import, we need to figure out if the importee is wrapped and
      // if that is the case, we need to add a proxy.
      const resolved =
        (await this.resolve(
          importee,
          importer,
          Object.assign({ skipSelf: true }, resolveOptions)
        )) || resolveExtensions(importee, importer, extensions);
      // Make sure that even if other plugins resolve again, we ignore our own proxies
      if (
        !resolved ||
        resolved.external ||
        resolved.id.endsWith(ENTRY_SUFFIX) ||
        isWrappedId(resolved.id, ES_IMPORT_SUFFIX) ||
        !isPossibleCjsId(resolved.id)
      ) {
        return resolved;
      }
      const moduleInfo = await this.load(resolved);
      const {
        meta: { commonjs: commonjsMeta }
      } = moduleInfo;
      if (commonjsMeta) {
        const { isCommonJS } = commonjsMeta;
        if (isCommonJS) {
          if (resolveOptions.isEntry) {
            moduleInfo.moduleSideEffects = true;
            // We must not precede entry proxies with a `\0` as that will mess up relative external resolution
            return resolved.id + ENTRY_SUFFIX;
          }
          if (isCommonJS === IS_WRAPPED_COMMONJS) {
            return { id: wrapId(resolved.id, ES_IMPORT_SUFFIX), meta: { commonjs: { resolved } } };
          }
        }
      }
      return resolved;
    }
  };
}

function getRequireResolver(extensions, detectCyclesAndConditional, currentlyResolving) {
  const knownCjsModuleTypes = Object.create(null);
  const requiredIds = Object.create(null);
  const unconditionallyRequiredIds = Object.create(null);
  const dependencies = Object.create(null);
  const getDependencies = (id) => dependencies[id] || (dependencies[id] = new Set());

  const isCyclic = (id) => {
    const dependenciesToCheck = new Set(getDependencies(id));
    for (const dependency of dependenciesToCheck) {
      if (dependency === id) {
        return true;
      }
      for (const childDependency of getDependencies(dependency)) {
        dependenciesToCheck.add(childDependency);
      }
    }
    return false;
  };

  // Once a module is listed here, its type (wrapped or not) is fixed and may
  // not change for the rest of the current build, to not break already
  // transformed modules.
  const fullyAnalyzedModules = Object.create(null);

  const getTypeForFullyAnalyzedModule = (id) => {
    const knownType = knownCjsModuleTypes[id];
    if (knownType !== true || !detectCyclesAndConditional || fullyAnalyzedModules[id]) {
      return knownType;
    }
    if (isCyclic(id)) {
      return (knownCjsModuleTypes[id] = IS_WRAPPED_COMMONJS);
    }
    return knownType;
  };

  const setInitialParentType = (id, initialCommonJSType) => {
    // Fully analyzed modules may never change type
    if (fullyAnalyzedModules[id]) {
      return;
    }
    knownCjsModuleTypes[id] = initialCommonJSType;
    if (
      detectCyclesAndConditional &&
      knownCjsModuleTypes[id] === true &&
      requiredIds[id] &&
      !unconditionallyRequiredIds[id]
    ) {
      knownCjsModuleTypes[id] = IS_WRAPPED_COMMONJS;
    }
  };

  const analyzeRequiredModule = async (parentId, resolved, isConditional, loadModule) => {
    const childId = resolved.id;
    requiredIds[childId] = true;
    if (!(isConditional || knownCjsModuleTypes[parentId] === IS_WRAPPED_COMMONJS)) {
      unconditionallyRequiredIds[childId] = true;
    }

    getDependencies(parentId).add(childId);
    if (!isCyclic(childId)) {
      // This makes sure the current transform handler waits for all direct
      // dependencies to be loaded and transformed and therefore for all
      // transitive CommonJS dependencies to be loaded as well so that all
      // cycles have been found and knownCjsModuleTypes is reliable.
      await loadModule(resolved);
    }
  };

  const getTypeForImportedModule = async (resolved, loadModule) => {
    if (resolved.id in knownCjsModuleTypes) {
      // This handles cyclic ES dependencies
      return knownCjsModuleTypes[resolved.id];
    }
    const {
      meta: { commonjs }
    } = await loadModule(resolved);
    return (commonjs && commonjs.isCommonJS) || false;
  };

  return {
    getWrappedIds: () =>
      Object.keys(knownCjsModuleTypes).filter(
        (id) => knownCjsModuleTypes[id] === IS_WRAPPED_COMMONJS
      ),
    isRequiredId: (id) => requiredIds[id],
    async shouldTransformCachedModule({
      id: parentId,
      resolvedSources,
      meta: { commonjs: parentMeta }
    }) {
      // We explicitly track ES modules to handle circular imports
      if (!(parentMeta && parentMeta.isCommonJS)) knownCjsModuleTypes[parentId] = false;
      if (isWrappedId(parentId, ES_IMPORT_SUFFIX)) return false;
      const parentRequires = parentMeta && parentMeta.requires;
      if (parentRequires) {
        setInitialParentType(parentId, parentMeta.initialCommonJSType);
        await Promise.all(
          parentRequires.map(({ resolved, isConditional }) =>
            analyzeRequiredModule(parentId, resolved, isConditional, this.load)
          )
        );
        if (getTypeForFullyAnalyzedModule(parentId) !== parentMeta.isCommonJS) {
          return true;
        }
        for (const {
          resolved: { id }
        } of parentRequires) {
          if (getTypeForFullyAnalyzedModule(id) !== parentMeta.isRequiredCommonJS[id]) {
            return true;
          }
        }
        // Now that we decided to go with the cached copy, neither the parent
        // module nor any of its children may change types anymore
        fullyAnalyzedModules[parentId] = true;
        for (const {
          resolved: { id }
        } of parentRequires) {
          fullyAnalyzedModules[id] = true;
        }
      }
      const parentRequireSet = new Set((parentRequires || []).map(({ resolved: { id } }) => id));
      return (
        await Promise.all(
          Object.keys(resolvedSources)
            .map((source) => resolvedSources[source])
            .filter(({ id, external }) => !(external || parentRequireSet.has(id)))
            .map(async (resolved) => {
              if (isWrappedId(resolved.id, ES_IMPORT_SUFFIX)) {
                return (
                  (await getTypeForImportedModule(
                    (
                      await this.load(resolved)
                    ).meta.commonjs.resolved,
                    this.load
                  )) !== IS_WRAPPED_COMMONJS
                );
              }
              return (await getTypeForImportedModule(resolved, this.load)) === IS_WRAPPED_COMMONJS;
            })
        )
      ).some((shouldTransform) => shouldTransform);
    },
    /* eslint-disable no-param-reassign */
    resolveRequireSourcesAndUpdateMeta:
      (rollupContext) => async (parentId, isParentCommonJS, parentMeta, sources) => {
        parentMeta.initialCommonJSType = isParentCommonJS;
        parentMeta.requires = [];
        parentMeta.isRequiredCommonJS = Object.create(null);
        setInitialParentType(parentId, isParentCommonJS);
        const currentlyResolvingForParent = currentlyResolving.get(parentId) || new Set();
        currentlyResolving.set(parentId, currentlyResolvingForParent);
        const requireTargets = await Promise.all(
          sources.map(async ({ source, isConditional }) => {
            // Never analyze or proxy internal modules
            if (source.startsWith('\0')) {
              return { id: source, allowProxy: false };
            }
            currentlyResolvingForParent.add(source);
            const resolved =
              (await rollupContext.resolve(source, parentId, {
                skipSelf: false,
                custom: { 'node-resolve': { isRequire: true } }
              })) || resolveExtensions(source, parentId, extensions);
            currentlyResolvingForParent.delete(source);
            if (!resolved) {
              return { id: wrapId(source, EXTERNAL_SUFFIX), allowProxy: false };
            }
            const childId = resolved.id;
            if (resolved.external) {
              return { id: wrapId(childId, EXTERNAL_SUFFIX), allowProxy: false };
            }
            parentMeta.requires.push({ resolved, isConditional });
            await analyzeRequiredModule(parentId, resolved, isConditional, rollupContext.load);
            return { id: childId, allowProxy: true };
          })
        );
        parentMeta.isCommonJS = getTypeForFullyAnalyzedModule(parentId);
        fullyAnalyzedModules[parentId] = true;
        return requireTargets.map(({ id: dependencyId, allowProxy }, index) => {
          // eslint-disable-next-line no-multi-assign
          const isCommonJS = (parentMeta.isRequiredCommonJS[dependencyId] =
            getTypeForFullyAnalyzedModule(dependencyId));
          const isWrappedCommonJS = isCommonJS === IS_WRAPPED_COMMONJS;
          fullyAnalyzedModules[dependencyId] = true;
          return {
            wrappedModuleSideEffects:
              isWrappedCommonJS && rollupContext.getModuleInfo(dependencyId).moduleSideEffects,
            source: sources[index].source,
            id: allowProxy
              ? wrapId(dependencyId, isWrappedCommonJS ? WRAPPED_SUFFIX : PROXY_SUFFIX)
              : dependencyId,
            isCommonJS
          };
        });
      },
    isCurrentlyResolving(source, parentId) {
      const currentlyResolvingForParent = currentlyResolving.get(parentId);
      return currentlyResolvingForParent && currentlyResolvingForParent.has(source);
    }
  };
}

function validateVersion(actualVersion, peerDependencyVersion, name) {
  const versionRegexp = /\^(\d+\.\d+\.\d+)/g;
  let minMajor = Infinity;
  let minMinor = Infinity;
  let minPatch = Infinity;
  let foundVersion;
  // eslint-disable-next-line no-cond-assign
  while ((foundVersion = versionRegexp.exec(peerDependencyVersion))) {
    const [foundMajor, foundMinor, foundPatch] = foundVersion[1].split('.').map(Number);
    if (foundMajor < minMajor) {
      minMajor = foundMajor;
      minMinor = foundMinor;
      minPatch = foundPatch;
    }
  }
  if (!actualVersion) {
    throw new Error(
      `Insufficient ${name} version: "@rollup/plugin-commonjs" requires at least ${name}@${minMajor}.${minMinor}.${minPatch}.`
    );
  }
  const [major, minor, patch] = actualVersion.split('.').map(Number);
  if (
    major < minMajor ||
    (major === minMajor && (minor < minMinor || (minor === minMinor && patch < minPatch)))
  ) {
    throw new Error(
      `Insufficient ${name} version: "@rollup/plugin-commonjs" requires at least ${name}@${minMajor}.${minMinor}.${minPatch} but found ${name}@${actualVersion}.`
    );
  }
}

const operators = {
  '==': (x) => equals(x.left, x.right, false),

  '!=': (x) => not(operators['=='](x)),

  '===': (x) => equals(x.left, x.right, true),

  '!==': (x) => not(operators['==='](x)),

  '!': (x) => isFalsy(x.argument),

  '&&': (x) => isTruthy(x.left) && isTruthy(x.right),

  '||': (x) => isTruthy(x.left) || isTruthy(x.right)
};

function not(value) {
  return value === null ? value : !value;
}

function equals(a, b, strict) {
  if (a.type !== b.type) return null;
  // eslint-disable-next-line eqeqeq
  if (a.type === 'Literal') return strict ? a.value === b.value : a.value == b.value;
  return null;
}

function isTruthy(node) {
  if (!node) return false;
  if (node.type === 'Literal') return !!node.value;
  if (node.type === 'ParenthesizedExpression') return isTruthy(node.expression);
  if (node.operator in operators) return operators[node.operator](node);
  return null;
}

function isFalsy(node) {
  return not(isTruthy(node));
}

function getKeypath(node) {
  const parts = [];

  while (node.type === 'MemberExpression') {
    if (node.computed) return null;

    parts.unshift(node.property.name);
    // eslint-disable-next-line no-param-reassign
    node = node.object;
  }

  if (node.type !== 'Identifier') return null;

  const { name } = node;
  parts.unshift(name);

  return { name, keypath: parts.join('.') };
}

const KEY_COMPILED_ESM = '__esModule';

function getDefineCompiledEsmType(node) {
  const definedPropertyWithExports = getDefinePropertyCallName(node, 'exports');
  const definedProperty =
    definedPropertyWithExports || getDefinePropertyCallName(node, 'module.exports');
  if (definedProperty && definedProperty.key === KEY_COMPILED_ESM) {
    return isTruthy(definedProperty.value)
      ? definedPropertyWithExports
        ? 'exports'
        : 'module'
      : false;
  }
  return false;
}

function getDefinePropertyCallName(node, targetName) {
  const {
    callee: { object, property }
  } = node;
  if (!object || object.type !== 'Identifier' || object.name !== 'Object') return;
  if (!property || property.type !== 'Identifier' || property.name !== 'defineProperty') return;
  if (node.arguments.length !== 3) return;

  const targetNames = targetName.split('.');
  const [target, key, value] = node.arguments;
  if (targetNames.length === 1) {
    if (target.type !== 'Identifier' || target.name !== targetNames[0]) {
      return;
    }
  }

  if (targetNames.length === 2) {
    if (
      target.type !== 'MemberExpression' ||
      target.object.name !== targetNames[0] ||
      target.property.name !== targetNames[1]
    ) {
      return;
    }
  }

  if (value.type !== 'ObjectExpression' || !value.properties) return;

  const valueProperty = value.properties.find((p) => p.key && p.key.name === 'value');
  if (!valueProperty || !valueProperty.value) return;

  // eslint-disable-next-line consistent-return
  return { key: key.value, value: valueProperty.value };
}

function isShorthandProperty(parent) {
  return parent && parent.type === 'Property' && parent.shorthand;
}

function wrapCode(magicString, uses, moduleName, exportsName, indentExclusionRanges) {
  const args = [];
  const passedArgs = [];
  if (uses.module) {
    args.push('module');
    passedArgs.push(moduleName);
  }
  if (uses.exports) {
    args.push('exports');
    passedArgs.push(uses.module ? `${moduleName}.exports` : exportsName);
  }
  magicString
    .trim()
    .indent('\t', { exclude: indentExclusionRanges })
    .prepend(`(function (${args.join(', ')}) {\n`)
    // For some reason, this line is only indented correctly when using a
    // require-wrapper if we have this leading space
    .append(` \n} (${passedArgs.join(', ')}));`);
}

function rewriteExportsAndGetExportsBlock(
  magicString,
  moduleName,
  exportsName,
  exportedExportsName,
  wrapped,
  moduleExportsAssignments,
  firstTopLevelModuleExportsAssignment,
  exportsAssignmentsByName,
  topLevelAssignments,
  defineCompiledEsmExpressions,
  deconflictedExportNames,
  code,
  HELPERS_NAME,
  exportMode,
  defaultIsModuleExports,
  usesRequireWrapper,
  requireName
) {
  const exports = [];
  const exportDeclarations = [];

  if (usesRequireWrapper) {
    getExportsWhenUsingRequireWrapper(
      magicString,
      wrapped,
      exportMode,
      exports,
      moduleExportsAssignments,
      exportsAssignmentsByName,
      moduleName,
      exportsName,
      requireName,
      defineCompiledEsmExpressions
    );
  } else if (exportMode === 'replace') {
    getExportsForReplacedModuleExports(
      magicString,
      exports,
      exportDeclarations,
      moduleExportsAssignments,
      firstTopLevelModuleExportsAssignment,
      exportsName,
      defaultIsModuleExports,
      HELPERS_NAME
    );
  } else {
    if (exportMode === 'module') {
      exportDeclarations.push(`var ${exportedExportsName} = ${moduleName}.exports`);
      exports.push(`${exportedExportsName} as __moduleExports`);
    } else {
      exports.push(`${exportsName} as __moduleExports`);
    }
    if (wrapped) {
      exportDeclarations.push(
        getDefaultExportDeclaration(exportedExportsName, defaultIsModuleExports, HELPERS_NAME)
      );
    } else {
      getExports(
        magicString,
        exports,
        exportDeclarations,
        moduleExportsAssignments,
        exportsAssignmentsByName,
        deconflictedExportNames,
        topLevelAssignments,
        moduleName,
        exportsName,
        exportedExportsName,
        defineCompiledEsmExpressions,
        HELPERS_NAME,
        defaultIsModuleExports,
        exportMode
      );
    }
  }
  if (exports.length) {
    exportDeclarations.push(`export { ${exports.join(', ')} }`);
  }

  return `\n\n${exportDeclarations.join(';\n')};`;
}

function getExportsWhenUsingRequireWrapper(
  magicString,
  wrapped,
  exportMode,
  exports,
  moduleExportsAssignments,
  exportsAssignmentsByName,
  moduleName,
  exportsName,
  requireName,
  defineCompiledEsmExpressions
) {
  exports.push(`${requireName} as __require`);
  if (wrapped) return;
  if (exportMode === 'replace') {
    rewriteModuleExportsAssignments(magicString, moduleExportsAssignments, exportsName);
  } else {
    rewriteModuleExportsAssignments(magicString, moduleExportsAssignments, `${moduleName}.exports`);
    // Collect and rewrite named exports
    for (const [exportName, { nodes }] of exportsAssignmentsByName) {
      for (const { node, type } of nodes) {
        magicString.overwrite(
          node.start,
          node.left.end,
          `${
            exportMode === 'module' && type === 'module' ? `${moduleName}.exports` : exportsName
          }.${exportName}`
        );
      }
    }
    replaceDefineCompiledEsmExpressionsAndGetIfRestorable(
      defineCompiledEsmExpressions,
      magicString,
      exportMode,
      moduleName,
      exportsName
    );
  }
}

function getExportsForReplacedModuleExports(
  magicString,
  exports,
  exportDeclarations,
  moduleExportsAssignments,
  firstTopLevelModuleExportsAssignment,
  exportsName,
  defaultIsModuleExports,
  HELPERS_NAME
) {
  for (const { left } of moduleExportsAssignments) {
    magicString.overwrite(left.start, left.end, exportsName);
  }
  magicString.prependRight(firstTopLevelModuleExportsAssignment.left.start, 'var ');
  exports.push(`${exportsName} as __moduleExports`);
  exportDeclarations.push(
    getDefaultExportDeclaration(exportsName, defaultIsModuleExports, HELPERS_NAME)
  );
}

function getDefaultExportDeclaration(exportedExportsName, defaultIsModuleExports, HELPERS_NAME) {
  return `export default ${
    defaultIsModuleExports === true
      ? exportedExportsName
      : defaultIsModuleExports === false
      ? `${exportedExportsName}.default`
      : `/*@__PURE__*/${HELPERS_NAME}.getDefaultExportFromCjs(${exportedExportsName})`
  }`;
}

function getExports(
  magicString,
  exports,
  exportDeclarations,
  moduleExportsAssignments,
  exportsAssignmentsByName,
  deconflictedExportNames,
  topLevelAssignments,
  moduleName,
  exportsName,
  exportedExportsName,
  defineCompiledEsmExpressions,
  HELPERS_NAME,
  defaultIsModuleExports,
  exportMode
) {
  let deconflictedDefaultExportName;
  // Collect and rewrite module.exports assignments
  for (const { left } of moduleExportsAssignments) {
    magicString.overwrite(left.start, left.end, `${moduleName}.exports`);
  }

  // Collect and rewrite named exports
  for (const [exportName, { nodes }] of exportsAssignmentsByName) {
    const deconflicted = deconflictedExportNames[exportName];
    let needsDeclaration = true;
    for (const { node, type } of nodes) {
      let replacement = `${deconflicted} = ${
        exportMode === 'module' && type === 'module' ? `${moduleName}.exports` : exportsName
      }.${exportName}`;
      if (needsDeclaration && topLevelAssignments.has(node)) {
        replacement = `var ${replacement}`;
        needsDeclaration = false;
      }
      magicString.overwrite(node.start, node.left.end, replacement);
    }
    if (needsDeclaration) {
      magicString.prepend(`var ${deconflicted};\n`);
    }

    if (exportName === 'default') {
      deconflictedDefaultExportName = deconflicted;
    } else {
      exports.push(exportName === deconflicted ? exportName : `${deconflicted} as ${exportName}`);
    }
  }

  const isRestorableCompiledEsm = replaceDefineCompiledEsmExpressionsAndGetIfRestorable(
    defineCompiledEsmExpressions,
    magicString,
    exportMode,
    moduleName,
    exportsName
  );

  if (
    defaultIsModuleExports === false ||
    (defaultIsModuleExports === 'auto' &&
      isRestorableCompiledEsm &&
      moduleExportsAssignments.length === 0)
  ) {
    // If there is no deconflictedDefaultExportName, then we use the namespace as
    // fallback because there can be no "default" property on the namespace
    exports.push(`${deconflictedDefaultExportName || exportedExportsName} as default`);
  } else if (
    defaultIsModuleExports === true ||
    (!isRestorableCompiledEsm && moduleExportsAssignments.length === 0)
  ) {
    exports.push(`${exportedExportsName} as default`);
  } else {
    exportDeclarations.push(
      getDefaultExportDeclaration(exportedExportsName, defaultIsModuleExports, HELPERS_NAME)
    );
  }
}

function rewriteModuleExportsAssignments(magicString, moduleExportsAssignments, exportsName) {
  for (const { left } of moduleExportsAssignments) {
    magicString.overwrite(left.start, left.end, exportsName);
  }
}

function replaceDefineCompiledEsmExpressionsAndGetIfRestorable(
  defineCompiledEsmExpressions,
  magicString,
  exportMode,
  moduleName,
  exportsName
) {
  let isRestorableCompiledEsm = false;
  for (const { node, type } of defineCompiledEsmExpressions) {
    isRestorableCompiledEsm = true;
    const moduleExportsExpression =
      node.type === 'CallExpression' ? node.arguments[0] : node.left.object;
    magicString.overwrite(
      moduleExportsExpression.start,
      moduleExportsExpression.end,
      exportMode === 'module' && type === 'module' ? `${moduleName}.exports` : exportsName
    );
  }
  return isRestorableCompiledEsm;
}

function isRequireExpression(node, scope) {
  if (!node) return false;
  if (node.type !== 'CallExpression') return false;

  // Weird case of `require()` or `module.require()` without arguments
  if (node.arguments.length === 0) return false;

  return isRequire(node.callee, scope);
}

function isRequire(node, scope) {
  return (
    (node.type === 'Identifier' && node.name === 'require' && !scope.contains('require')) ||
    (node.type === 'MemberExpression' && isModuleRequire(node, scope))
  );
}

function isModuleRequire({ object, property }, scope) {
  return (
    object.type === 'Identifier' &&
    object.name === 'module' &&
    property.type === 'Identifier' &&
    property.name === 'require' &&
    !scope.contains('module')
  );
}

function hasDynamicArguments(node) {
  return (
    node.arguments.length > 1 ||
    (node.arguments[0].type !== 'Literal' &&
      (node.arguments[0].type !== 'TemplateLiteral' || node.arguments[0].expressions.length > 0))
  );
}

const reservedMethod = { resolve: true, cache: true, main: true };

function isNodeRequirePropertyAccess(parent) {
  return parent && parent.property && reservedMethod[parent.property.name];
}

function getRequireStringArg(node) {
  return node.arguments[0].type === 'Literal'
    ? node.arguments[0].value
    : node.arguments[0].quasis[0].value.cooked;
}

function getRequireHandlers() {
  const requireExpressions = [];

  function addRequireExpression(
    sourceId,
    node,
    scope,
    usesReturnValue,
    isInsideTryBlock,
    isInsideConditional,
    toBeRemoved
  ) {
    requireExpressions.push({
      sourceId,
      node,
      scope,
      usesReturnValue,
      isInsideTryBlock,
      isInsideConditional,
      toBeRemoved
    });
  }

  async function rewriteRequireExpressionsAndGetImportBlock(
    magicString,
    topLevelDeclarations,
    reassignedNames,
    helpersName,
    dynamicRequireName,
    moduleName,
    exportsName,
    id,
    exportMode,
    resolveRequireSourcesAndUpdateMeta,
    needsRequireWrapper,
    isEsModule,
    isDynamicRequireModulesEnabled,
    getIgnoreTryCatchRequireStatementMode,
    commonjsMeta
  ) {
    const imports = [];
    imports.push(`import * as ${helpersName} from "${HELPERS_ID}"`);
    if (dynamicRequireName) {
      imports.push(
        `import { ${
          isDynamicRequireModulesEnabled ? CREATE_COMMONJS_REQUIRE_EXPORT : COMMONJS_REQUIRE_EXPORT
        } as ${dynamicRequireName} } from "${DYNAMIC_MODULES_ID}"`
      );
    }
    if (exportMode === 'module') {
      imports.push(
        `import { __module as ${moduleName} } from ${JSON.stringify(wrapId(id, MODULE_SUFFIX))}`,
        `var ${exportsName} = ${moduleName}.exports`
      );
    } else if (exportMode === 'exports') {
      imports.push(
        `import { __exports as ${exportsName} } from ${JSON.stringify(wrapId(id, EXPORTS_SUFFIX))}`
      );
    }
    const requiresBySource = collectSources(requireExpressions);
    const requireTargets = await resolveRequireSourcesAndUpdateMeta(
      id,
      needsRequireWrapper ? IS_WRAPPED_COMMONJS : !isEsModule,
      commonjsMeta,
      Object.keys(requiresBySource).map((source) => {
        return {
          source,
          isConditional: requiresBySource[source].every((require) => require.isInsideConditional)
        };
      })
    );
    processRequireExpressions(
      imports,
      requireTargets,
      requiresBySource,
      getIgnoreTryCatchRequireStatementMode,
      magicString
    );
    return imports.length ? `${imports.join(';\n')};\n\n` : '';
  }

  return {
    addRequireExpression,
    rewriteRequireExpressionsAndGetImportBlock
  };
}

function collectSources(requireExpressions) {
  const requiresBySource = Object.create(null);
  for (const requireExpression of requireExpressions) {
    const { sourceId } = requireExpression;
    if (!requiresBySource[sourceId]) {
      requiresBySource[sourceId] = [];
    }
    const requires = requiresBySource[sourceId];
    requires.push(requireExpression);
  }
  return requiresBySource;
}

function processRequireExpressions(
  imports,
  requireTargets,
  requiresBySource,
  getIgnoreTryCatchRequireStatementMode,
  magicString
) {
  const generateRequireName = getGenerateRequireName();
  for (const { source, id: resolvedId, isCommonJS, wrappedModuleSideEffects } of requireTargets) {
    const requires = requiresBySource[source];
    const name = generateRequireName(requires);
    let usesRequired = false;
    let needsImport = false;
    for (const { node, usesReturnValue, toBeRemoved, isInsideTryBlock } of requires) {
      const { canConvertRequire, shouldRemoveRequire } =
        isInsideTryBlock && isWrappedId(resolvedId, EXTERNAL_SUFFIX)
          ? getIgnoreTryCatchRequireStatementMode(source)
          : { canConvertRequire: true, shouldRemoveRequire: false };
      if (shouldRemoveRequire) {
        if (usesReturnValue) {
          magicString.overwrite(node.start, node.end, 'undefined');
        } else {
          magicString.remove(toBeRemoved.start, toBeRemoved.end);
        }
      } else if (canConvertRequire) {
        needsImport = true;
        if (isCommonJS === IS_WRAPPED_COMMONJS) {
          magicString.overwrite(
            node.start,
            node.end,
            `${wrappedModuleSideEffects ? '' : '/*@__PURE__*/ '}${name}()`
          );
        } else if (usesReturnValue) {
          usesRequired = true;
          magicString.overwrite(node.start, node.end, name);
        } else {
          magicString.remove(toBeRemoved.start, toBeRemoved.end);
        }
      }
    }
    if (needsImport) {
      if (isCommonJS === IS_WRAPPED_COMMONJS) {
        imports.push(`import { __require as ${name} } from ${JSON.stringify(resolvedId)}`);
      } else {
        imports.push(`import ${usesRequired ? `${name} from ` : ''}${JSON.stringify(resolvedId)}`);
      }
    }
  }
}

function getGenerateRequireName() {
  let uid = 0;
  return (requires) => {
    let name;
    const hasNameConflict = ({ scope }) => scope.contains(name);
    do {
      name = `require$$${uid}`;
      uid += 1;
    } while (requires.some(hasNameConflict));
    return name;
  };
}

/* eslint-disable no-param-reassign, no-shadow, no-underscore-dangle, no-continue */


const exportsPattern = /^(?:module\.)?exports(?:\.([a-zA-Z_$][a-zA-Z_$0-9]*))?$/;

const functionType = /^(?:FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/;

// There are three different types of CommonJS modules, described by their
// "exportMode":
// - exports: Only assignments to (module.)exports properties
// - replace: A single assignment to module.exports itself
// - module: Anything else
// Special cases:
// - usesRequireWrapper
// - isWrapped
async function transformCommonjs(
  parse,
  code,
  id,
  isEsModule,
  ignoreGlobal,
  ignoreRequire,
  ignoreDynamicRequires,
  getIgnoreTryCatchRequireStatementMode,
  sourceMap,
  isDynamicRequireModulesEnabled,
  dynamicRequireModules,
  commonDir,
  astCache,
  defaultIsModuleExports,
  needsRequireWrapper,
  resolveRequireSourcesAndUpdateMeta,
  isRequired,
  checkDynamicRequire,
  commonjsMeta
) {
  const ast = astCache || tryParse(parse, code, id);
  const magicString = new MagicString(code);
  const uses = {
    module: false,
    exports: false,
    global: false,
    require: false
  };
  const virtualDynamicRequirePath =
    isDynamicRequireModulesEnabled && getVirtualPathForDynamicRequirePath(dirname(id), commonDir);
  let scope = attachScopes(ast, 'scope');
  let lexicalDepth = 0;
  let programDepth = 0;
  let classBodyDepth = 0;
  let currentTryBlockEnd = null;
  let shouldWrap = false;

  const globals = new Set();
  // A conditionalNode is a node for which execution is not guaranteed. If such a node is a require
  // or contains nested requires, those should be handled as function calls unless there is an
  // unconditional require elsewhere.
  let currentConditionalNodeEnd = null;
  const conditionalNodes = new Set();
  const { addRequireExpression, rewriteRequireExpressionsAndGetImportBlock } = getRequireHandlers();

  // See which names are assigned to. This is necessary to prevent
  // illegally replacing `var foo = require('foo')` with `import foo from 'foo'`,
  // where `foo` is later reassigned. (This happens in the wild. CommonJS, sigh)
  const reassignedNames = new Set();
  const topLevelDeclarations = [];
  const skippedNodes = new Set();
  const moduleAccessScopes = new Set([scope]);
  const exportsAccessScopes = new Set([scope]);
  const moduleExportsAssignments = [];
  let firstTopLevelModuleExportsAssignment = null;
  const exportsAssignmentsByName = new Map();
  const topLevelAssignments = new Set();
  const topLevelDefineCompiledEsmExpressions = [];
  const replacedGlobal = [];
  const replacedThis = [];
  const replacedDynamicRequires = [];
  const importedVariables = new Set();
  const indentExclusionRanges = [];

  walk(ast, {
    enter(node, parent) {
      if (skippedNodes.has(node)) {
        this.skip();
        return;
      }

      if (currentTryBlockEnd !== null && node.start > currentTryBlockEnd) {
        currentTryBlockEnd = null;
      }
      if (currentConditionalNodeEnd !== null && node.start > currentConditionalNodeEnd) {
        currentConditionalNodeEnd = null;
      }
      if (currentConditionalNodeEnd === null && conditionalNodes.has(node)) {
        currentConditionalNodeEnd = node.end;
      }

      programDepth += 1;
      if (node.scope) ({ scope } = node);
      if (functionType.test(node.type)) lexicalDepth += 1;
      if (sourceMap) {
        magicString.addSourcemapLocation(node.start);
        magicString.addSourcemapLocation(node.end);
      }

      // eslint-disable-next-line default-case
      switch (node.type) {
        case 'AssignmentExpression':
          if (node.left.type === 'MemberExpression') {
            const flattened = getKeypath(node.left);
            if (!flattened || scope.contains(flattened.name)) return;

            const exportsPatternMatch = exportsPattern.exec(flattened.keypath);
            if (!exportsPatternMatch || flattened.keypath === 'exports') return;

            const [, exportName] = exportsPatternMatch;
            uses[flattened.name] = true;

            // we're dealing with `module.exports = ...` or `[module.]exports.foo = ...` –
            if (flattened.keypath === 'module.exports') {
              moduleExportsAssignments.push(node);
              if (programDepth > 3) {
                moduleAccessScopes.add(scope);
              } else if (!firstTopLevelModuleExportsAssignment) {
                firstTopLevelModuleExportsAssignment = node;
              }
            } else if (exportName === KEY_COMPILED_ESM) {
              if (programDepth > 3) {
                shouldWrap = true;
              } else {
                // The "type" is either "module" or "exports" to discern
                // assignments to module.exports vs exports if needed
                topLevelDefineCompiledEsmExpressions.push({ node, type: flattened.name });
              }
            } else {
              const exportsAssignments = exportsAssignmentsByName.get(exportName) || {
                nodes: [],
                scopes: new Set()
              };
              exportsAssignments.nodes.push({ node, type: flattened.name });
              exportsAssignments.scopes.add(scope);
              exportsAccessScopes.add(scope);
              exportsAssignmentsByName.set(exportName, exportsAssignments);
              if (programDepth <= 3) {
                topLevelAssignments.add(node);
              }
            }

            skippedNodes.add(node.left);
          } else {
            for (const name of extractAssignedNames(node.left)) {
              reassignedNames.add(name);
            }
          }
          return;
        case 'CallExpression': {
          const defineCompiledEsmType = getDefineCompiledEsmType(node);
          if (defineCompiledEsmType) {
            if (programDepth === 3 && parent.type === 'ExpressionStatement') {
              // skip special handling for [module.]exports until we know we render this
              skippedNodes.add(node.arguments[0]);
              topLevelDefineCompiledEsmExpressions.push({ node, type: defineCompiledEsmType });
            } else {
              shouldWrap = true;
            }
            return;
          }

          // Transform require.resolve
          if (
            isDynamicRequireModulesEnabled &&
            node.callee.object &&
            isRequire(node.callee.object, scope) &&
            node.callee.property.name === 'resolve'
          ) {
            checkDynamicRequire(node.start);
            uses.require = true;
            const requireNode = node.callee.object;
            replacedDynamicRequires.push(requireNode);
            skippedNodes.add(node.callee);
            return;
          }

          if (!isRequireExpression(node, scope)) {
            const keypath = getKeypath(node.callee);
            if (keypath && importedVariables.has(keypath.name)) {
              // Heuristic to deoptimize requires after a required function has been called
              currentConditionalNodeEnd = Infinity;
            }
            return;
          }

          skippedNodes.add(node.callee);
          uses.require = true;

          if (hasDynamicArguments(node)) {
            if (isDynamicRequireModulesEnabled) {
              checkDynamicRequire(node.start);
            }
            if (!ignoreDynamicRequires) {
              replacedDynamicRequires.push(node.callee);
            }
            return;
          }

          const requireStringArg = getRequireStringArg(node);
          if (!ignoreRequire(requireStringArg)) {
            const usesReturnValue = parent.type !== 'ExpressionStatement';
            const toBeRemoved =
              parent.type === 'ExpressionStatement' &&
              (!currentConditionalNodeEnd ||
                // We should completely remove requires directly in a try-catch
                // so that Rollup can remove up the try-catch
                (currentTryBlockEnd !== null && currentTryBlockEnd < currentConditionalNodeEnd))
                ? parent
                : node;
            addRequireExpression(
              requireStringArg,
              node,
              scope,
              usesReturnValue,
              currentTryBlockEnd !== null,
              currentConditionalNodeEnd !== null,
              toBeRemoved
            );
            if (parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier') {
              for (const name of extractAssignedNames(parent.id)) {
                importedVariables.add(name);
              }
            }
          }
          return;
        }
        case 'ClassBody':
          classBodyDepth += 1;
          return;
        case 'ConditionalExpression':
        case 'IfStatement':
          // skip dead branches
          if (isFalsy(node.test)) {
            skippedNodes.add(node.consequent);
          } else if (isTruthy(node.test)) {
            if (node.alternate) {
              skippedNodes.add(node.alternate);
            }
          } else {
            conditionalNodes.add(node.consequent);
            if (node.alternate) {
              conditionalNodes.add(node.alternate);
            }
          }
          return;
        case 'ArrowFunctionExpression':
        case 'FunctionDeclaration':
        case 'FunctionExpression':
          // requires in functions should be conditional unless it is an IIFE
          if (
            currentConditionalNodeEnd === null &&
            !(parent.type === 'CallExpression' && parent.callee === node)
          ) {
            currentConditionalNodeEnd = node.end;
          }
          return;
        case 'Identifier': {
          const { name } = node;
          if (
            !isReference(node, parent) ||
            scope.contains(name) ||
            (parent.type === 'PropertyDefinition' && parent.key === node)
          )
            return;
          switch (name) {
            case 'require':
              uses.require = true;
              if (isNodeRequirePropertyAccess(parent)) {
                return;
              }
              if (!ignoreDynamicRequires) {
                if (isShorthandProperty(parent)) {
                  // as key and value are the same object, isReference regards
                  // both as references, so we need to skip now
                  skippedNodes.add(parent.value);
                  magicString.prependRight(node.start, 'require: ');
                }
                replacedDynamicRequires.push(node);
              }
              return;
            case 'module':
            case 'exports':
              shouldWrap = true;
              uses[name] = true;
              return;
            case 'global':
              uses.global = true;
              if (!ignoreGlobal) {
                replacedGlobal.push(node);
              }
              return;
            case 'define':
              magicString.overwrite(node.start, node.end, 'undefined', {
                storeName: true
              });
              return;
            default:
              globals.add(name);
              return;
          }
        }
        case 'LogicalExpression':
          // skip dead branches
          if (node.operator === '&&') {
            if (isFalsy(node.left)) {
              skippedNodes.add(node.right);
            } else if (!isTruthy(node.left)) {
              conditionalNodes.add(node.right);
            }
          } else if (node.operator === '||') {
            if (isTruthy(node.left)) {
              skippedNodes.add(node.right);
            } else if (!isFalsy(node.left)) {
              conditionalNodes.add(node.right);
            }
          }
          return;
        case 'MemberExpression':
          if (!isDynamicRequireModulesEnabled && isModuleRequire(node, scope)) {
            uses.require = true;
            replacedDynamicRequires.push(node);
            skippedNodes.add(node.object);
            skippedNodes.add(node.property);
          }
          return;
        case 'ReturnStatement':
          // if top-level return, we need to wrap it
          if (lexicalDepth === 0) {
            shouldWrap = true;
          }
          return;
        case 'ThisExpression':
          // rewrite top-level `this` as `commonjsHelpers.commonjsGlobal`
          if (lexicalDepth === 0 && !classBodyDepth) {
            uses.global = true;
            if (!ignoreGlobal) {
              replacedThis.push(node);
            }
          }
          return;
        case 'TryStatement':
          if (currentTryBlockEnd === null) {
            currentTryBlockEnd = node.block.end;
          }
          if (currentConditionalNodeEnd === null) {
            currentConditionalNodeEnd = node.end;
          }
          return;
        case 'UnaryExpression':
          // rewrite `typeof module`, `typeof module.exports` and `typeof exports` (https://github.com/rollup/rollup-plugin-commonjs/issues/151)
          if (node.operator === 'typeof') {
            const flattened = getKeypath(node.argument);
            if (!flattened) return;

            if (scope.contains(flattened.name)) return;

            if (
              !isEsModule &&
              (flattened.keypath === 'module.exports' ||
                flattened.keypath === 'module' ||
                flattened.keypath === 'exports')
            ) {
              magicString.overwrite(node.start, node.end, `'object'`, {
                storeName: false
              });
            }
          }
          return;
        case 'VariableDeclaration':
          if (!scope.parent) {
            topLevelDeclarations.push(node);
          }
          return;
        case 'TemplateElement':
          if (node.value.raw.includes('\n')) {
            indentExclusionRanges.push([node.start, node.end]);
          }
      }
    },

    leave(node) {
      programDepth -= 1;
      if (node.scope) scope = scope.parent;
      if (functionType.test(node.type)) lexicalDepth -= 1;
      if (node.type === 'ClassBody') classBodyDepth -= 1;
    }
  });

  const nameBase = getName(id);
  const exportsName = deconflict([...exportsAccessScopes], globals, nameBase);
  const moduleName = deconflict([...moduleAccessScopes], globals, `${nameBase}Module`);
  const requireName = deconflict([scope], globals, `require${capitalize$1(nameBase)}`);
  const isRequiredName = deconflict([scope], globals, `hasRequired${capitalize$1(nameBase)}`);
  const helpersName = deconflict([scope], globals, 'commonjsHelpers');
  const dynamicRequireName =
    replacedDynamicRequires.length > 0 &&
    deconflict(
      [scope],
      globals,
      isDynamicRequireModulesEnabled ? CREATE_COMMONJS_REQUIRE_EXPORT : COMMONJS_REQUIRE_EXPORT
    );
  const deconflictedExportNames = Object.create(null);
  for (const [exportName, { scopes }] of exportsAssignmentsByName) {
    deconflictedExportNames[exportName] = deconflict([...scopes], globals, exportName);
  }

  for (const node of replacedGlobal) {
    magicString.overwrite(node.start, node.end, `${helpersName}.commonjsGlobal`, {
      storeName: true
    });
  }
  for (const node of replacedThis) {
    magicString.overwrite(node.start, node.end, exportsName, {
      storeName: true
    });
  }
  for (const node of replacedDynamicRequires) {
    magicString.overwrite(
      node.start,
      node.end,
      isDynamicRequireModulesEnabled
        ? `${dynamicRequireName}(${JSON.stringify(virtualDynamicRequirePath)})`
        : dynamicRequireName,
      {
        contentOnly: true,
        storeName: true
      }
    );
  }

  // We cannot wrap ES/mixed modules
  shouldWrap = !isEsModule && (shouldWrap || (uses.exports && moduleExportsAssignments.length > 0));

  if (
    !(
      shouldWrap ||
      isRequired ||
      needsRequireWrapper ||
      uses.module ||
      uses.exports ||
      uses.require ||
      topLevelDefineCompiledEsmExpressions.length > 0
    ) &&
    (ignoreGlobal || !uses.global)
  ) {
    return { meta: { commonjs: { isCommonJS: false } } };
  }

  let leadingComment = '';
  if (code.startsWith('/*')) {
    const commentEnd = code.indexOf('*/', 2) + 2;
    leadingComment = `${code.slice(0, commentEnd)}\n`;
    magicString.remove(0, commentEnd).trim();
  }

  let shebang = '';
  if (code.startsWith('#!')) {
    const shebangEndPosition = code.indexOf('\n') + 1;
    shebang = code.slice(0, shebangEndPosition);
    magicString.remove(0, shebangEndPosition).trim();
  }

  const exportMode = isEsModule
    ? 'none'
    : shouldWrap
    ? uses.module
      ? 'module'
      : 'exports'
    : firstTopLevelModuleExportsAssignment
    ? exportsAssignmentsByName.size === 0 && topLevelDefineCompiledEsmExpressions.length === 0
      ? 'replace'
      : 'module'
    : moduleExportsAssignments.length === 0
    ? 'exports'
    : 'module';

  const exportedExportsName =
    exportMode === 'module' ? deconflict([], globals, `${nameBase}Exports`) : exportsName;

  const importBlock = await rewriteRequireExpressionsAndGetImportBlock(
    magicString,
    topLevelDeclarations,
    reassignedNames,
    helpersName,
    dynamicRequireName,
    moduleName,
    exportsName,
    id,
    exportMode,
    resolveRequireSourcesAndUpdateMeta,
    needsRequireWrapper,
    isEsModule,
    isDynamicRequireModulesEnabled,
    getIgnoreTryCatchRequireStatementMode,
    commonjsMeta
  );
  const usesRequireWrapper = commonjsMeta.isCommonJS === IS_WRAPPED_COMMONJS;
  const exportBlock = isEsModule
    ? ''
    : rewriteExportsAndGetExportsBlock(
        magicString,
        moduleName,
        exportsName,
        exportedExportsName,
        shouldWrap,
        moduleExportsAssignments,
        firstTopLevelModuleExportsAssignment,
        exportsAssignmentsByName,
        topLevelAssignments,
        topLevelDefineCompiledEsmExpressions,
        deconflictedExportNames,
        code,
        helpersName,
        exportMode,
        defaultIsModuleExports,
        usesRequireWrapper,
        requireName
      );

  if (shouldWrap) {
    wrapCode(magicString, uses, moduleName, exportsName, indentExclusionRanges);
  }

  if (usesRequireWrapper) {
    magicString.trim().indent('\t', {
      exclude: indentExclusionRanges
    });
    const exported = exportMode === 'module' ? `${moduleName}.exports` : exportsName;
    magicString.prepend(
      `var ${isRequiredName};

function ${requireName} () {
\tif (${isRequiredName}) return ${exported};
\t${isRequiredName} = 1;
`
    ).append(`
\treturn ${exported};
}`);
    if (exportMode === 'replace') {
      magicString.prepend(`var ${exportsName};\n`);
    }
  }

  magicString
    .trim()
    .prepend(shebang + leadingComment + importBlock)
    .append(exportBlock);

  return {
    code: magicString.toString(),
    map: sourceMap ? magicString.generateMap() : null,
    syntheticNamedExports: isEsModule || usesRequireWrapper ? false : '__moduleExports',
    meta: { commonjs: { ...commonjsMeta, shebang } }
  };
}

const PLUGIN_NAME = 'commonjs';

function commonjs(options = {}) {
  const {
    ignoreGlobal,
    ignoreDynamicRequires,
    requireReturnsDefault: requireReturnsDefaultOption,
    defaultIsModuleExports: defaultIsModuleExportsOption,
    esmExternals
  } = options;
  const extensions = options.extensions || ['.js'];
  const filter = createFilter(options.include, options.exclude);
  const isPossibleCjsId = (id) => {
    const extName = extname(id);
    return extName === '.cjs' || (extensions.includes(extName) && filter(id));
  };

  const { strictRequiresFilter, detectCyclesAndConditional } = getStrictRequiresFilter(options);

  const getRequireReturnsDefault =
    typeof requireReturnsDefaultOption === 'function'
      ? requireReturnsDefaultOption
      : () => requireReturnsDefaultOption;

  let esmExternalIds;
  const isEsmExternal =
    typeof esmExternals === 'function'
      ? esmExternals
      : Array.isArray(esmExternals)
      ? ((esmExternalIds = new Set(esmExternals)), (id) => esmExternalIds.has(id))
      : () => esmExternals;

  const getDefaultIsModuleExports =
    typeof defaultIsModuleExportsOption === 'function'
      ? defaultIsModuleExportsOption
      : () =>
          typeof defaultIsModuleExportsOption === 'boolean' ? defaultIsModuleExportsOption : 'auto';

  const dynamicRequireRoot =
    typeof options.dynamicRequireRoot === 'string'
      ? resolve$2(options.dynamicRequireRoot)
      : process.cwd();
  const { commonDir, dynamicRequireModules } = getDynamicRequireModules(
    options.dynamicRequireTargets,
    dynamicRequireRoot
  );
  const isDynamicRequireModulesEnabled = dynamicRequireModules.size > 0;

  const ignoreRequire =
    typeof options.ignore === 'function'
      ? options.ignore
      : Array.isArray(options.ignore)
      ? (id) => options.ignore.includes(id)
      : () => false;

  const getIgnoreTryCatchRequireStatementMode = (id) => {
    const mode =
      typeof options.ignoreTryCatch === 'function'
        ? options.ignoreTryCatch(id)
        : Array.isArray(options.ignoreTryCatch)
        ? options.ignoreTryCatch.includes(id)
        : typeof options.ignoreTryCatch !== 'undefined'
        ? options.ignoreTryCatch
        : true;

    return {
      canConvertRequire: mode !== 'remove' && mode !== true,
      shouldRemoveRequire: mode === 'remove'
    };
  };

  const { currentlyResolving, resolveId } = getResolveId(extensions, isPossibleCjsId);

  const sourceMap = options.sourceMap !== false;

  // Initialized in buildStart
  let requireResolver;

  function transformAndCheckExports(code, id) {
    const normalizedId = normalizePathSlashes(id);
    const { isEsModule, hasDefaultExport, hasNamedExports, ast } = analyzeTopLevelStatements(
      this.parse,
      code,
      id
    );

    const commonjsMeta = this.getModuleInfo(id).meta.commonjs || {};
    if (hasDefaultExport) {
      commonjsMeta.hasDefaultExport = true;
    }
    if (hasNamedExports) {
      commonjsMeta.hasNamedExports = true;
    }

    if (
      !dynamicRequireModules.has(normalizedId) &&
      (!(hasCjsKeywords(code, ignoreGlobal) || requireResolver.isRequiredId(id)) ||
        (isEsModule && !options.transformMixedEsModules))
    ) {
      commonjsMeta.isCommonJS = false;
      return { meta: { commonjs: commonjsMeta } };
    }

    const needsRequireWrapper =
      !isEsModule && (dynamicRequireModules.has(normalizedId) || strictRequiresFilter(id));

    const checkDynamicRequire = (position) => {
      const normalizedDynamicRequireRoot = normalizePathSlashes(dynamicRequireRoot);

      if (normalizedId.indexOf(normalizedDynamicRequireRoot) !== 0) {
        this.error(
          {
            code: 'DYNAMIC_REQUIRE_OUTSIDE_ROOT',
            normalizedId,
            normalizedDynamicRequireRoot,
            message: `"${normalizedId}" contains dynamic require statements but it is not within the current dynamicRequireRoot "${normalizedDynamicRequireRoot}". You should set dynamicRequireRoot to "${dirname(
              normalizedId
            )}" or one of its parent directories.`
          },
          position
        );
      }
    };

    return transformCommonjs(
      this.parse,
      code,
      id,
      isEsModule,
      ignoreGlobal || isEsModule,
      ignoreRequire,
      ignoreDynamicRequires && !isDynamicRequireModulesEnabled,
      getIgnoreTryCatchRequireStatementMode,
      sourceMap,
      isDynamicRequireModulesEnabled,
      dynamicRequireModules,
      commonDir,
      ast,
      getDefaultIsModuleExports(id),
      needsRequireWrapper,
      requireResolver.resolveRequireSourcesAndUpdateMeta(this),
      requireResolver.isRequiredId(id),
      checkDynamicRequire,
      commonjsMeta
    );
  }

  return {
    name: PLUGIN_NAME,

    version,

    options(rawOptions) {
      // We inject the resolver in the beginning so that "catch-all-resolver" like node-resolver
      // do not prevent our plugin from resolving entry points ot proxies.
      const plugins = Array.isArray(rawOptions.plugins)
        ? [...rawOptions.plugins]
        : rawOptions.plugins
        ? [rawOptions.plugins]
        : [];
      plugins.unshift({
        name: 'commonjs--resolver',
        resolveId
      });
      return { ...rawOptions, plugins };
    },

    buildStart({ plugins }) {
      validateVersion(this.meta.rollupVersion, peerDependencies.rollup, 'rollup');
      const nodeResolve = plugins.find(({ name }) => name === 'node-resolve');
      if (nodeResolve) {
        validateVersion(nodeResolve.version, '^13.0.6', '@rollup/plugin-node-resolve');
      }
      if (options.namedExports != null) {
        this.warn(
          'The namedExports option from "@rollup/plugin-commonjs" is deprecated. Named exports are now handled automatically.'
        );
      }
      requireResolver = getRequireResolver(
        extensions,
        detectCyclesAndConditional,
        currentlyResolving
      );
    },

    buildEnd() {
      if (options.strictRequires === 'debug') {
        const wrappedIds = requireResolver.getWrappedIds();
        if (wrappedIds.length) {
          this.warn({
            code: 'WRAPPED_IDS',
            ids: wrappedIds,
            message: `The commonjs plugin automatically wrapped the following files:\n[\n${wrappedIds
              .map((id) => `\t${JSON.stringify(relative(process.cwd(), id))}`)
              .join(',\n')}\n]`
          });
        } else {
          this.warn({
            code: 'WRAPPED_IDS',
            ids: wrappedIds,
            message: 'The commonjs plugin did not wrap any files.'
          });
        }
      }
    },

    async load(id) {
      if (id === HELPERS_ID) {
        return getHelpersModule();
      }

      if (isWrappedId(id, MODULE_SUFFIX)) {
        const name = getName(unwrapId(id, MODULE_SUFFIX));
        return {
          code: `var ${name} = {exports: {}}; export {${name} as __module}`,
          meta: { commonjs: { isCommonJS: false } }
        };
      }

      if (isWrappedId(id, EXPORTS_SUFFIX)) {
        const name = getName(unwrapId(id, EXPORTS_SUFFIX));
        return {
          code: `var ${name} = {}; export {${name} as __exports}`,
          meta: { commonjs: { isCommonJS: false } }
        };
      }

      if (isWrappedId(id, EXTERNAL_SUFFIX)) {
        const actualId = unwrapId(id, EXTERNAL_SUFFIX);
        return getUnknownRequireProxy(
          actualId,
          isEsmExternal(actualId) ? getRequireReturnsDefault(actualId) : true
        );
      }

      // entry suffix is just appended to not mess up relative external resolution
      if (id.endsWith(ENTRY_SUFFIX)) {
        const acutalId = id.slice(0, -ENTRY_SUFFIX.length);
        const {
          meta: { commonjs: commonjsMeta }
        } = this.getModuleInfo(acutalId);
        const shebang = commonjsMeta?.shebang ?? '';
        return getEntryProxy(
          acutalId,
          getDefaultIsModuleExports(acutalId),
          this.getModuleInfo,
          shebang
        );
      }

      if (isWrappedId(id, ES_IMPORT_SUFFIX)) {
        const actualId = unwrapId(id, ES_IMPORT_SUFFIX);
        return getEsImportProxy(
          actualId,
          getDefaultIsModuleExports(actualId),
          (await this.load({ id: actualId })).moduleSideEffects
        );
      }

      if (id === DYNAMIC_MODULES_ID) {
        return getDynamicModuleRegistry(
          isDynamicRequireModulesEnabled,
          dynamicRequireModules,
          commonDir,
          ignoreDynamicRequires
        );
      }

      if (isWrappedId(id, PROXY_SUFFIX)) {
        const actualId = unwrapId(id, PROXY_SUFFIX);
        return getStaticRequireProxy(actualId, getRequireReturnsDefault(actualId), this.load);
      }

      return null;
    },

    shouldTransformCachedModule(...args) {
      return requireResolver.shouldTransformCachedModule.call(this, ...args);
    },

    transform(code, id) {
      if (!isPossibleCjsId(id)) return null;

      try {
        return transformAndCheckExports.call(this, code, id);
      } catch (err) {
        return this.error(err, err.pos);
      }
    }
  };
}

// rollup.config.mjs

({
  input: 'src/bubble-room.js',
  output: {
    file: 'lovelace-bubble-room.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  external: id => (
    id.startsWith('home-assistant-frontend/src/components/') ||
    id === '@material/mwc-icon'
  ),
  plugins: [
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
  ],
});

class MushroomsPanel extends i {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedItems: { type: Array },
  };

  constructor() {
    super();
    this.hass = undefined;
    this.config = {};
    this._expanded = false;
    this._expandedItems = Array(7).fill(false);
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
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      color: #36e6a0;
      letter-spacing: 0.03em;
      cursor: pointer;
      user-select: none;
      position: relative;
      z-index: 1;
      text-shadow: 0 2px 7px #0004;
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
      z-index: 2!important;
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
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      color: #36e6a0;
      letter-spacing: 0.03em;
    }
    input, select {
      width: 100%;
      border: 1px solid #444;
      border-radius: 6px;
      padding: 8px;
      background: #202020;
      color: #f1f1f1;
      font-size: 0.97rem;
    }
    ha-entity-picker, ha-icon-picker {
      width: 100%;
      margin-bottom: 12px;
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
        .expanded="${this._expanded}"
        @expanded-changed="${e => this._expanded = e.detail.expanded}"
      >
        <div slot="header" class="glass-header">🍄 Mushroom Entities</div>
        <div class="glass-content">
          <div class="autodiscover-box" @click="${() => this._fire('auto_discovery_sections.mushroom', !cfg.auto_discovery_sections?.mushroom)}">
            <label>
              <input type="checkbox"
                     .checked="${cfg.auto_discovery_sections?.mushroom || false}"
                     @change="${e => this._fire('auto_discovery_sections.mushroom', e.target.checked)}"
                     @click="${e => e.stopPropagation()}">
              <span>🪄 Auto-discovery</span>
            </label>
          </div>
          ${['entities1','entities2','entities3','entities4','entities5','climate','camera'].map((key, i) => x`
            <div class="mini-pill ${this._expandedItems[i] ? 'expanded' : ''}" @click="${() => this._toggleOne(i)}">
              <div class="mini-pill-header">Entity ${i+1}
                <span class="chevron">${this._expandedItems[i] ? '▼' : '▶'}</span>
              </div>
              ${this._expandedItems[i] ? x`
                <div class="mini-pill-content">
                  <div class="input-group">
                    <label>Entity</label>
                    <ha-entity-picker
                      .hass="${this.hass}"
                      .value="${cfg.entities?.[key]?.entity || ''}"
                      @value-changed="${e => this._fire(`entities.${key}.entity`, e.detail.value)}"
                    ></ha-entity-picker>
                  </div>
                  <div class="input-group">
                    <label>Icon</label>
                    <ha-icon-picker
                      .hass="${this.hass}"
                      .value="${cfg.entities?.[key]?.icon || ''}"
                      allow-custom-icon
                      @value-changed="${e => this._fire(`entities.${key}.icon`, e.detail.value)}"
                    ></ha-icon-picker>
                  </div>
                  ${this._renderActions('tap', key)}
                  ${this._renderActions('hold', key)}
                </div>
              ` : ''}
            </div>`)}
          <button class="reset-button" @click="${() => this._resetAll()}">🧹 Reset Mushroom Entities</button>
        </div>
      </ha-expansion-panel>
    `;
  }

  _toggleOne(idx) {
    this._expandedItems = this._expandedItems.map((_, i) => i === idx);
    this.requestUpdate();
  }

  _renderActions(actionType, key) {
    const cfg = this.config.entities?.[key] || {};
    const actCfg = cfg[`${actionType}_action`] || {};
    const actions = ['toggle', 'more-info', 'navigate', 'call-service', 'none'];
    return x`
      <div class="input-group">
        <label>${actionType === 'tap' ? 'Tap Action' : 'Hold Action'}</label>
        <div class="pill-group">
          ${actions.map(a => x`
            <paper-button
              class="pill-button ${actCfg.action === a ? 'active' : ''}"
              @click="${() => this._fire(`entities.${key}.${actionType}_action.action`, a)}"
            >${a}</paper-button>
          `)}
        </div>
        ${actCfg.action === 'navigate' ? x`
          <input type="text" placeholder="Path" .value="${actCfg.navigation_path || ''}" @input="${e => this._fire(`entities.${key}.${actionType}_action.navigation_path`, e.target.value)}">
        ` : ''}
      </div>
    `;
  }

  _fire(prop, value) {
    this.dispatchEvent(new CustomEvent('panel-changed', {
      detail: { prop, val: value }, bubbles: true, composed: true
    }));
  }

  _resetAll() {
    ['entities1','entities2','entities3','entities4','entities5','climate','camera'].forEach(k => this._fire(`entities.${k}`, undefined));
  }
}

customElements.define('mushrooms-panel', MushroomsPanel);

class SubButtonsPanel extends i {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _expanded: { type: Boolean },
    _expandedBtns: { type: Array },
  };

  constructor() {
    super();
    this.hass = {};
    this.config = {};
    this._expanded = false;
    this._expandedBtns = Array(4).fill(false);
  }

  static styles = i$3`
    /* stili glass-panel, mini-pill, input-group ecc */
  `;

  render() {
    return x`
      <ha-expansion-panel
        class="glass-panel"
        .expanded="${this._expanded}"
        @expanded-changed="${e=>this._expanded=e.detail.expanded}"
      >
        <div slot="header" class="glass-header">🎛️ Subbuttons</div>
        <div class="glass-content">
          <div class="autodiscover-box" @click="${()=>this._toggleAuto('subbutton')}">
            <label>
              <input type="checkbox"
                     .checked="${this.config.auto_discovery_sections?.subbutton||false}"
                     @change="${e=>this._toggleAuto('subbutton', e.target.checked)}"
                     @click="${e=>e.stopPropagation()}">
              <span>🪄 Auto-discovery</span>
            </label>
          </div>
          ${['sub-button1','sub-button2','sub-button3','sub-button4'].map((key,i)=>x`
            <div class="mini-pill ${this._expandedBtns[i]?'expanded':''}" @click="${()=>this._toggleOne(i)}">
              <div class="mini-pill-header">Sub-button ${i+1}<span class="chevron">${this._expandedBtns[i]?'▼':'▶'}</span></div>
              ${this._expandedBtns[i]? x`
                <div class="mini-pill-content">
                  <div class="input-group">
                    <label>Entity ID</label>
                    <ha-entity-picker
                      .hass="${this.hass}"
                      .value="${this.config.entities?.[key]?.entity||''}"
                      @value-changed="${e=>this._fire(`entities.${key}.entity`,e.detail.value)}"
                    ></ha-entity-picker>
                  </div>
                  <div class="input-group">
                    <label>Icon</label>
                    <ha-icon-picker
                      .hass="${this.hass}"
                      .value="${this.config.entities?.[key]?.icon||''}"
                      @value-changed="${e=>this._fire(`entities.${key}.icon`,e.detail.value)}"
                    ></ha-icon-picker>
                  </div>
                  ${this._renderActions('tap', key)}
                  ${this._renderActions('hold', key)}
                </div>
              `:''}
            </div>
          `)}
          <div style="text-align:center; margin-top:1.2em;">
            <button class="reset-button" @click="${this._resetAll}">🧹 Reset Sub-buttons</button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  _toggleAuto(section,val){this._fire(`auto_discovery_sections.${section}`,!this.config.auto_discovery_sections?.[section]);}
  _toggleOne(i){this._expandedBtns=this._expandedBtns.map((_,j)=>j===i);}
  _renderActions(type, key) { /* come sopra */ }
  _resetAll(){['sub-button1','sub-button2','sub-button3','sub-button4'].forEach(k=>this._fire(`entities.${k}`,undefined));}
  _fire(prop,val){this.dispatchEvent(new CustomEvent('panel-changed',{detail:{prop,val},bubbles:true,composed:true}));}
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
  
  _toHex(color) { /* estrai dal fonte originale */ }
  _updateColor(section, key, hex, alpha = false) {
    /* copia _updateColorField dal sorgente */
  }
}

customElements.define('colors-panel', ColorsPanel);

// src/components/bubble-room-editor.js

class BubbleRoomEditor extends i {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
  };
  
  constructor() {
    super();
    this.hass = null;
    this.config = {};
  }
  
  /**
   * Inizializza la configurazione dell'editor, garantendo array e oggetti di default.
   */
  setConfig(config) {
    this.config = {
      ...config,
      sensors: Array.isArray(config.sensors) ? config.sensors : [],
      mushrooms: Array.isArray(config.mushrooms) ? config.mushrooms : [],
      subbuttons: Array.isArray(config.subbuttons) ? config.subbuttons : [],
      colors: config.colors ? config.colors : { room: {}, subbutton: {} },
    };
  }
  
  /**
   * Restituisce la configurazione corrente.
   */
  getConfig() {
    return { ...this.config };
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
  
  render() {
    return x`
      <div class="editor-container">
        <room-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @config-changed="${this._onConfigChanged}"
        ></room-panel>

        <sensors-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @config-changed="${this._onConfigChanged}"
        ></sensors-panel>

        <mushrooms-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @config-changed="${this._onConfigChanged}"
        ></mushrooms-panel>

        <subbuttons-panel
          .hass="${this.hass}"
          .config="${this.config}"
          @config-changed="${this._onConfigChanged}"
        ></subbuttons-panel>

        <colors-panel
          .config="${this.config}"
          @config-changed="${this._onConfigChanged}"
        ></colors-panel>
      </div>
    `;
  }
  
  /**
   * Propaga l'evento di cambio configurazione ai listener esterni.
   */
  _onConfigChanged(e) {
    this.config = e.detail.config;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.getConfig() },
      bubbles: true,
      composed: true,
    }));
  }
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
              style="background:${sub.active ? '#21df73' : '#455a64'};"
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
          background_active:   'rgba(var(--color-green),1)',
          background_inactive: 'rgba(var(--color-green),0.3)',
          icon_active:         'orange',
          icon_inactive:       '#80808055',
          mushroom_active:     'rgba(var(--color-green),1)',
          mushroom_inactive:   '#80808055'
        },
        subbutton: {
          background_on:  'rgba(var(--color-blue),1)',
          background_off: 'rgba(var(--color-blue),0.3)',
          icon_on:        'yellow',
          icon_off:       '#666'
        }
      }
    };
  }

/**
 * Home Assistant chiamerà questo per montare l'editor visuale
 */
  static async getConfigElement() {
    // Carica dinamicamente il file
    await Promise.resolve().then(function () { return bubbleRoomEditor; });
    // Ritorna un'istanza del custom element
    return document.createElement('bubble-room-editor');
  }
  setConfig(config) {
    this.config = config;
  }
  
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
    console.log('BubbleRoom config:', this.config);
    const mainIcon = this.config.icon || DEFAULT_ICON;
    const iconActive = this.config.icon_active || '#21df73';
    const iconInactive = this.config.icon_inactive || '#173c16';
    const name = this.config.name || 'Room';
    const area = this.config.area || '';
    const sensors = this._getSensors();
    const mushroomEntities = this._getMushroomEntities();
    const subbuttons = this._getSubButtons();
    
    // Per BubbleMushroom: la size dell'area
    const mushroomContainerSize = { width: 240, height: 190 };
    
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
              .containerSize="${mushroomContainerSize}"
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
  
  _getSensors() {
    // Mappa sensori con label visibile!
    return (this.config.sensors || []).map(s => ({
      icon: SENSOR_TYPE_ICON_MAP[s.type]?.icon || 'mdi:help-circle',
      label: s.label || capitalize(s.type || ''),
      value: this.hass.states?.[s.entity_id]?.state ?? '--',
      unit: SENSOR_TYPE_ICON_MAP[s.type]?.unit || '',
      color: s.color || '#e3f6ff'
    }));
  }
  
  _getMushroomEntities() {
    return (this.config.mushrooms || []).map(e => ({
      icon: e.icon || 'mdi:flash',
      state: this.hass.states?.[e.entity_id]?.state,
      color: e.color || '#999'
    }));
  }
  
  _getSubButtons() {
    return (this.config.subbuttons || []).map((sub, idx) => ({
      icon: sub.icon || 'mdi:light-switch',
      active: this.hass.states?.[sub.entity_id]?.state === 'on',
      colorOn: sub.colorOn || '#00d46d',
      colorOff: sub.colorOff || '#999',
      label: sub.label || '',
    }));
  }
  
  _isMainIconActive() {
    return !!this.config.active;
  }
  
  _onMainIconClick() {
    // Gestione click icona principale
  }
  
  _onMushroomEntityClick(e) {
    e.detail;
    // Gestione click su mushroom entity
  }
  
  _onSubButtonClick(e) {
    e.detail;
    // Gestione click su subbutton
  }
}

customElements.define('bubble-room', BubbleRoom);

export { BubbleRoom };
