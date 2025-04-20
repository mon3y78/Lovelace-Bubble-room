/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}}const s=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new o(n,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:r,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,g=p.trustedTypes,m=g?g.emptyScript:"",v=p.reactiveElementPolyfillSupport,_=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!r(t,e),y={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const s=n?.call(this);o.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of n){const n=document.createElement("style"),o=t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=n,this[n]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??b)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,v?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S=globalThis,A=S.trustedTypes,w=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+x,k=`<${C}>`,P=document,T=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,N="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,U=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),W=new WeakMap,q=P.createTreeWalker(P,129);function J(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const V=(t,e)=>{const i=t.length-1,n=[];let o,s=2===e?"<svg>":3===e?"<math>":"",a=H;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,d=0;for(;d<i.length&&(a.lastIndex=d,c=a.exec(i),null!==c);)d=a.lastIndex,a===H?"!--"===c[1]?a=M:void 0!==c[1]?a=U:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=z):void 0!==c[3]&&(a=z):a===z?">"===c[0]?(a=o??H,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?z:'"'===c[3]?j:R):a===j||a===R?a=z:a===M||a===U?a=H:(a=z,o=void 0);const h=a===z&&t[e+1].startsWith("/>")?" ":"";s+=a===H?i+k:l>=0?(n.push(r),i.slice(0,l)+E+i.slice(l)+x+h):i+x+(-2===l?e:h)}return[J(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class K{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,s=0;const a=t.length-1,r=this.parts,[c,l]=V(t,e);if(this.el=K.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=q.nextNode())&&r.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(E)){const e=l[s++],i=n.getAttribute(t).split(x),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?X:"?"===a[1]?tt:"@"===a[1]?et:Q}),n.removeAttribute(t)}else t.startsWith(x)&&(r.push({type:6,index:o}),n.removeAttribute(t));if(B.test(n.tagName)){const t=n.textContent.split(x),e=t.length-1;if(e>0){n.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],T()),q.nextNode(),r.push({type:2,index:++o});n.append(t[e],T())}}}else if(8===n.nodeType)if(n.data===C)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(x,t+1));)r.push({type:7,index:o}),t+=x.length-1}o++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,n){if(e===D)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const s=O(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,n)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??P).importNode(e,!0);q.currentNode=n;let o=q.nextNode(),s=0,a=0,r=i[0];for(;void 0!==r;){if(s===r.index){let e;2===r.type?e=new Y(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new it(o,this,t)),this._$AV.push(e),r=i[++a]}s!==r?.index&&(o=q.nextNode(),s++)}return q.currentNode=P,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),O(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==L&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new G(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new K(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new Y(this.O(T()),this.O(T()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}_$AI(t,e=this,i,n){const o=this.strings;let s=!1;if(void 0===o)t=Z(this,t,e,0),s=!O(t)||t!==this._$AH&&t!==D,s&&(this._$AH=t);else{const n=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=Z(this,n[i+a],e,a),r===D&&(r=this._$AH[a]),s||=!O(r)||r!==this._$AH[a],r===L?t=L:t!==L&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}s&&!n&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==L)}}class et extends Q{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??L)===D)return;const i=this._$AH,n=t===L&&i!==L||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==L&&(i===L||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=S.litHtmlPolyfillSupport;nt?.(K,Y),(S.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new Y(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}ot._$litElement$=!0,ot.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ot});const st=globalThis.litElementPolyfillSupport;st?.({LitElement:ot}),(globalThis.litElementVersions??=[]).push("4.1.1");var at=function(t){if(t){var e=function(t){return[].slice.call(t)},i=3,n=[],o=null,s="requestAnimationFrame"in t?function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{sync:!1};t.cancelAnimationFrame(o);var i=function(){return r(n.filter((function(t){return t.dirty&&t.active})))};if(e.sync)return i();o=t.requestAnimationFrame(i)}:function(){},a=function(t){return function(e){n.forEach((function(e){return e.dirty=t})),s(e)}},r=function(t){t.filter((function(t){return!t.styleComputed})).forEach((function(t){t.styleComputed=h(t)})),t.filter(u).forEach(p);var e=t.filter(d);e.forEach(l),e.forEach((function(t){p(t),c(t)})),e.forEach(g)},c=function(t){return t.dirty=0},l=function(t){t.availableWidth=t.element.parentNode.clientWidth,t.currentWidth=t.element.scrollWidth,t.previousFontSize=t.currentFontSize,t.currentFontSize=Math.min(Math.max(t.minSize,t.availableWidth/t.currentWidth*t.previousFontSize),t.maxSize),t.whiteSpace=t.multiLine&&t.currentFontSize===t.minSize?"normal":"nowrap"},d=function(t){return 2!==t.dirty||2===t.dirty&&t.element.parentNode.clientWidth!==t.availableWidth},h=function(e){var i=t.getComputedStyle(e.element,null);return e.currentFontSize=parseFloat(i.getPropertyValue("font-size")),e.display=i.getPropertyValue("display"),e.whiteSpace=i.getPropertyValue("white-space"),!0},u=function(t){var e=!1;return!t.preStyleTestCompleted&&(/inline-/.test(t.display)||(e=!0,t.display="inline-block"),"nowrap"!==t.whiteSpace&&(e=!0,t.whiteSpace="nowrap"),t.preStyleTestCompleted=!0,e)},p=function(t){t.element.style.whiteSpace=t.whiteSpace,t.element.style.display=t.display,t.element.style.fontSize=t.currentFontSize+"px"},g=function(t){t.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:t.previousFontSize,newValue:t.currentFontSize,scaleFactor:t.currentFontSize/t.previousFontSize}}))},m=function(t,e){return function(i){t.dirty=e,t.active&&s(i)}},v=function(t){return function(){n=n.filter((function(e){return e.element!==t.element})),t.observeMutations&&t.observer.disconnect(),t.element.style.whiteSpace=t.originalStyle.whiteSpace,t.element.style.display=t.originalStyle.display,t.element.style.fontSize=t.originalStyle.fontSize}},_=function(t){return function(){t.active||(t.active=!0,s())}},f=function(t){return function(){return t.active=!1}},b=function(t){t.observeMutations&&(t.observer=new MutationObserver(m(t,1)),t.observer.observe(t.element,t.observeMutations))},y={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in t&&{subtree:!0,childList:!0,characterData:!0}},$=null,S=function(){t.clearTimeout($),$=t.setTimeout(a(2),E.observeWindowDelay)},A=["resize","orientationchange"];return Object.defineProperty(E,"observeWindow",{set:function(e){var i="".concat(e?"add":"remove","EventListener");A.forEach((function(e){t[i](e,S)}))}}),E.observeWindow=!0,E.observeWindowDelay=100,E.fitAll=a(i),E}function w(t,e){var o=Object.assign({},y,e),a=t.map((function(t){var e=Object.assign({},o,{element:t,active:!0});return function(t){t.originalStyle={whiteSpace:t.element.style.whiteSpace,display:t.element.style.display,fontSize:t.element.style.fontSize},b(t),t.newbie=!0,t.dirty=!0,n.push(t)}(e),{element:t,fit:m(e,i),unfreeze:_(e),freeze:f(e),unsubscribe:v(e)}}));return s(),a}function E(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof t?w(e(document.querySelectorAll(t)),i):w([t],i)[0]}}("undefined"==typeof window?null:window);customElements.define("bubble-room",class extends ot{static get properties(){return{config:{type:Object},hass:{type:Object}}}firstUpdated(){const t=this.shadowRoot.querySelectorAll(".mushroom-primary");if(!t.length)return;at(t,{maxSize:20,multiLine:!1}).forEach((t=>t.unsubscribe()))}static async getConfigElement(){return await Promise.resolve().then((function(){return rt})),document.createElement("bubble-room-editor")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"",tap_action:{action:"more-info"}},camera:{entity:"camera.front_door",icon:"",tap_action:{action:"more-info"},preview_url:""},entities1:{entity:"sensor.some_sensor1",icon:""},entities2:{entity:"sensor.some_sensor2",icon:""},entities3:{entity:"sensor.some_sensor3",icon:""},entities4:{entity:"sensor.some_sensor4",icon:""},entities5:{entity:"sensor.some_sensor5",icon:""},temperature:{temperature_sensor:"sensor.vindstyrka_salotto_temperature",humidity_sensor:"sensor.vindstyrka_salotto_humidity",tap_action:{action:"more-info"}}},colors:{active:"var(--primary-color)",inactive:"var(--secondary-text-color)",backgroundActive:"color-mix(in srgb, var(--primary-color) 85%, transparent)",backgroundInactive:"var(--card-background-color)"},icon:"",name:"Salotto",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"}}}_getFallbackIcon(t,e){if((e="string"==typeof e?e:"").trim())return e;if(this.hass?.entities?.[t]?.icon)return this.hass.entities[t].icon;const i=this.hass?.states?.[t];if(i?.attributes?.icon)return i.attributes.icon;if(i?.attributes?.device_class)return this._getDeviceClassIcon(i.attributes.device_class,i.state);const n=t?.split?.(".")?.[0]||"";return this._getDomainDefaultIcon(n,i?.state)}_getDeviceClassIcon(t,e){switch(t){case"door":return"on"===e?"mdi:door-open":"mdi:door-closed";case"window":return"on"===e?"mdi:window-open":"mdi:window-closed";case"motion":return"on"===e?"mdi:motion-sensor":"mdi:motion-sensor-off";case"moisture":return"on"===e?"mdi:water-alert":"mdi:water-off";case"smoke":return"on"===e?"mdi:smoke":"mdi:smoke-detector-off";case"gas":return"on"===e?"mdi:gas-cylinder":"mdi:gas-off";case"problem":return"mdi:alert";case"connectivity":return"mdi:connection";case"occupancy":case"presence":return"on"===e?"mdi:account-voice":"mdi:account-voice-off";case"tamper":return"mdi:lock-open-alert";case"vibration":return"on"===e?"mdi:vibrate":"mdi:vibrate-off";case"running":return"on"===e?"mdi:server-network":"mdi:server-network-off";case"shutter":return"on"===e?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return"on"===e?"mdi:blinds-horizontal":"mdi:blinds-horizontal-closed";default:return""}}_getDomainDefaultIcon(t,e){switch(t){case"light":return"mdi:lightbulb";case"switch":case"input_boolean":return"mdi:toggle-switch";case"fan":return"mdi:fan";case"climate":return"mdi:thermostat";case"media_player":return"mdi:speaker";case"vacuum":return"mdi:robot-vacuum";case"binary_sensor":return"on"===e?"mdi:motion-sensor":"mdi:motion-sensor-off";case"sensor":return"mdi:information-outline";case"cover":return"open"===e?"mdi:blinds-open":"mdi:blinds-closed";case"lock":return"locked"===e?"mdi:lock":"mdi:lock-open";case"door":return"open"===e?"mdi:door-open":"mdi:door-closed";case"window":return"open"===e?"mdi:window-open":"mdi:window-closed";default:return""}}_renderMushroom(t,e,i){const n=this._defaultMushroomStyle(e);if(t.temperature_sensor||t.humidity_sensor){const e=this._buildTemperatureText(t);return F`
        <div class="mushroom-item" style="${n}">
          <span class="fit-text" style="color: ${i};">${e}</span>
        </div>
      `}const o=this._getFallbackIcon(t.entity,t.icon||"");return F`
      <div class="mushroom-item" style="${n}"
           @pointerdown=${e=>this._startHold(e,t)}
           @pointerup=${e=>this._endHold(e,t,(()=>this._handleMushroomTap(t)))}
           @pointerleave=${()=>this._cancelHold()}>
        <ha-icon icon="${o}" style="color: ${i};"></ha-icon>
      </div>
    `}_buildTemperatureText(t){const e=this.hass,i=t.temperature_sensor?e.states[t.temperature_sensor]?.state:null,n=t.humidity_sensor?e.states[t.humidity_sensor]?.state:null;let o="";return null!=i&&""!==i&&(o+=`🌡️${i}°C`),null!=n&&""!==n&&(o+=(o?" ":"")+`💦${n}%`),o}setConfig(t){if(!(t=JSON.parse(JSON.stringify(t)))||"object"!=typeof t||Array.isArray(t))throw new Error("La configurazione deve essere un oggetto valido.");if(!t.entities||"object"!=typeof t.entities)throw new Error("Devi definire almeno la proprietà 'entities' nella configurazione.");const e=["presence","sub-button1","sub-button2","sub-button3","sub-button4","entities1","entities2","entities3","entities4","entities5","climate","camera","temperature"],i={tap_action:{action:"toggle"},hold_action:{action:"more-info"}},n={};for(const o in t.entities){let s=t.entities[o];if(["entities1","entities2","entities3","entities4","entities5"].includes(o)&&"object"==typeof s){const t={},e=Object.keys(s).filter((t=>/^\d+$/.test(t)));Object.entries(s).forEach((([e,i])=>{/^\d+$/.test(e)||(t[e]=i)})),e.length&&(t.entity=e.sort(((t,e)=>t-e)).map((t=>s[t])).join("")),s=t}if("climate"===o&&"string"==typeof s&&(s={entity:s,...i}),"string"==typeof s)n[o]=e.includes(o)?"presence"===o?{entity:s}:{entity:s,...i}:s;else if("object"==typeof s)if(e.includes(o)){if(!s.style&&o.startsWith("entities")){const t=Number(o.replace("entities",""))-1;s.style=this._defaultMushroomStyle(t)}n[o]="presence"===o?{...s}:{...i,...s}}else n[o]=s}const o=t.colors||{};this.config={entities:n,colors:{active:o.active??"var(--primary-color)",inactive:o.inactive??"var(--secondary-text-color)",backgroundActive:o.backgroundActive??"color-mix(in srgb, var(--primary-color) 85%, transparent)",backgroundInactive:o.backgroundInactive??"var(--card-background-color)"},icon:t.icon||"",name:t.name||"Salotto",tap_action:t.tap_action||{action:"navigate",navigation_path:""}},!this.config.entity&&this.config.entities.presence&&(this.config.entity=this.config.entities.presence.entity)}getConfig(){const t=JSON.parse(JSON.stringify(this._config)),e={};return Object.entries(t.entities).forEach((([t,i])=>{(t.startsWith("sub-button")||i.entity&&i.entity.trim())&&(e[t]=i)})),t.entities=e,this._config=t,t}static get styles(){return s`
      *, *::before, *::after { box-sizing: border-box; }
      :host { display: block; --card-height: 190px; font-family: sans-serif; }
      ha-card {
        display: block;
        margin: 0;
        padding: 0 !important;
        background: var(--bubble-room-background, var(--card-background-color, var(--ha-card-background, white))) !important;
        border-radius: var(--bubble-room-border-radius, var(--ha-card-border-radius, 8px)) !important;
      }
      .card {
        position: relative;
        width: 100%;
        height: var(--card-height);
        overflow: hidden;
        border-radius: inherit;
      }
      .grid-container {
        display: grid;
        width:100%;
        height:100%;
        grid-template-areas:
          ". . . b"
          "n n n b"
          "i i . b"
          "i i . b";
        grid-template-columns: 35% 35% 10% 20%;
        grid-template-rows: 25% 25% 25% 25%;
      }
      .name-area {
        grid-area: n;
        display: flex;
        align-items: center;
        padding-left: 2px;
        margin-top: -67px;
        font-size: 30px;
        font-weight: bold;
        color: var(--bubble-room-name-color);
      }
      .icon-area {
        grid-area: i;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .bubble-icon-container {
        position: absolute;
        cursor: pointer;
        border-radius: 50%;
        width: 170px;
        height: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -39px;
        left: -40px;
        background-color: var(--bubble-room-icon-bg);
      }
      .bubble-icon {
        position: absolute;
        top: 20%;
        left: 30%;
        --mdc-icon-size: 75px;
        opacity: 0.5;
        color: var(--bubble-room-icon-color);
      }
      .bubble-sub-button-container {
        grid-area: b;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .bubble-sub-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        margin: 3px;
        cursor: pointer;
        background-color: var(--bubble-room-sub-bg, var(--card-background-color));
        color: var(--bubble-room-sub-icon-color, var(--primary-color));
      }
      .bubble-sub-button ha-icon {
        color: inherit;
      }
      .mushroom-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        pointer-events: none;
      }
      .mushroom-item {
        position: absolute;
        pointer-events: auto;
      }
      .mushroom-item ha-icon {
        --mdc-icon-size: 33px;
      }
      .fit-text {
        white-space: nowrap;
        overflow: hidden;
      }
    `}_defaultMushroomStyle(t){switch(t){case 0:return"top: -77px; left: 0px;";case 1:return"top: -85px; left: 38px;";case 2:return"top: -64px; left: 77px;";case 3:return"bottom: 39px; left: 96px;";case 4:return"bottom: -1px; left: 85px;";case 5:return"bottom: -2px; left: -2px;";case 6:return"top: -140px; left: 5px;";case 7:return"top: -95px; right: 5px;";default:return""}}_startHold(t,e){t.stopPropagation(),this._holdTriggered=!1,this._holdTimeout=setTimeout((()=>{this._holdTriggered=!0,this._handleHoldAction(e)}),500)}_endHold(t,e,i){t.stopPropagation(),clearTimeout(this._holdTimeout),this._holdTriggered||i(),this._holdTriggered=!1}_cancelHold(){clearTimeout(this._holdTimeout),this._holdTriggered=!1}_handleHoldAction(t){if(!t.hold_action)return void this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));const{action:e,service:i,service_data:n,navigation_path:o}=t.hold_action;switch(e){case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"toggle":this._toggleEntity(t.entity);break;case"call-service":if(i){const[e,o]=i.split("."),s={...n,entity_id:n?.entity_id||t.entity};this.hass.callService(e,o,s)}break;case"navigate":o&&(window.history.pushState({},"",o),window.dispatchEvent(new Event("location-changed")))}}_handleMainIconTap(){const{action:t,service:e,service_data:i,navigation_path:n}=this.config.tap_action||{};switch(t){case"toggle":this._toggleEntity(this.config.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this.config.entity},bubbles:!0,composed:!0}));break;case"call-service":if(e){const[t,n]=e.split("."),o={...i,entity_id:i?.entity_id||this.config.entity};this.hass.callService(t,n,o)}break;case"navigate":n&&(window.history.pushState({},"",n),window.dispatchEvent(new Event("location-changed")))}}_toggleEntity(t){this.hass&&this.hass.callService("homeassistant","toggle",{entity_id:t})}_handleSubButtonTap(t){const{action:e,service:i,service_data:n,navigation_path:o}=t.tap_action||{};switch(e){case"toggle":this._toggleEntity(t.entity);break;case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t.entity},bubbles:!0,composed:!0}));break;case"call-service":if(i){const[e,o]=i.split("."),s={...n,entity_id:n?.entity_id||t.entity};this.hass.callService(e,o,s)}break;case"navigate":o&&(window.history.pushState({},"",o),window.dispatchEvent(new Event("location-changed")))}}_handleMushroomTap(t){this._handleSubButtonTap(t)}render(){if(!this.config||!this.hass)return F`<div>Loading…</div>`;console.log(">>> CONFIG COLORS"),console.log("active:",this.config.colors.active),console.log("inactive:",this.config.colors.inactive),console.log("backgroundActive:",this.config.colors.backgroundActive),console.log("backgroundInactive:",this.config.colors.backgroundInactive);const{entities:t,name:e,icon:i,background:n,border_radius:o}=this.config,s=this.config.colors,a=this.hass,r="on"===a.states[t.presence.entity]?.state,c=s.active,l=s.inactive,d=s.backgroundActive,h=s.backgroundInactive,u=r?c:l,p=[n?`--bubble-room-background: ${n}`:"",o?`--bubble-room-border-radius: ${o}`:"",`--bubble-room-icon-bg: ${r?d:h}`,`--bubble-room-icon-color: ${u}`,`--bubble-room-name-color: ${u}`].filter((t=>t)).join(";");console.log(">>> CSS cardVars",p);const g=i?.trim()?i:this._getFallbackIcon(t.presence.entity),m=[t["sub-button1"],t["sub-button2"],t["sub-button3"],t["sub-button4"]].filter((t=>t&&t.entity)),v=["entities1","entities2","entities3","entities4","entities5","climate","temperature","camera"].map(((e,i)=>{const n=t[e];if(!n)return{item:null,idx:i,color:null};if(n.temperature_sensor||n.humidity_sensor)return{item:n,idx:i,color:u};return{item:n,idx:i,color:"on"===a.states[n.entity]?.state?c:l}}));return F`
      <ha-card style="${p}">
        <div class="card">
          <div class="grid-container">
            <div class="name-area" style="color: ${u};">${e}</div>
            <div class="icon-area">
              <div class="bubble-icon-container"
                   @pointerdown=${t=>this._startHold(t,this.config)}
                   @pointerup=${t=>this._endHold(t,this.config,(()=>this._handleMainIconTap()))}
                   @pointerleave=${()=>this._cancelHold()}>
                ${g?F`<ha-icon class="bubble-icon" icon="${g}" style="color: ${u};"></ha-icon>`:L}
              </div>
              <div class="mushroom-container">
                ${v.map((({item:t,idx:e,color:i})=>t?this._renderMushroom(t,e,i):F`<div class="mushroom-item" style="${this._defaultMushroomStyle(e)}"></div>`))}
              </div>
            </div>
            <div class="bubble-sub-button-container">
              ${m.map((t=>{const e="on"===a.states[t.entity]?.state,i=e?this.config.colors.backgroundActive??"color-mix(in srgb, var(--primary-color) 20%, transparent)":this.config.colors.backgroundInactive??"var(--card-background-color)",n=e?this.config.colors.active??"var(--primary-color)":this.config.colors.inactive??"var(--secondary-text-color)",o=this._getFallbackIcon(t.entity);return F`
                    <div class="bubble-sub-button ${e?"active":"inactive"}"
                         style="background-color: ${i}; color: ${n};"
                         @pointerdown=${e=>this._startHold(e,t)}
                         @pointerup=${e=>this._endHold(e,t,(()=>this._handleSubButtonTap(t)))}
                         @pointerleave=${()=>this._cancelHold()}>
                      <ha-icon icon="${o}" style="color: inherit;"></ha-icon>
                    </div>
                  `}))}
            </div>
          </div>
        </div>
      </ha-card>
    `}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}}),window.customCards=window.customCards||[],window.customCards.push({type:"bubble-room",name:"Bubble Room",description:"Bubble Room",preview:!0,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});customElements.define("bubble-room-editor",class extends ot{static get properties(){return{_config:{type:Object},hass:{type:Object},_iconList:{type:Array}}}static async getConfigElement(){return await Promise.resolve().then((function(){return rt})),document.createElement("bubble-room-editor")}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"mdi:lightbulb",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"mdi:fan",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"mdi:speaker",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"mdi:robot-vacuum",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"mdi:thermostat",tap_action:{action:"more-info"}},entities1:{entity:"sensor.some_sensor1",icon:"mdi:information-outline"},entities2:{entity:"sensor.some_sensor2",icon:"mdi:information-outline"},entities3:{entity:"sensor.some_sensor3",icon:"mdi:information-outline"},entities4:{entity:"sensor.some_sensor4",icon:"mdi:information-outline"},entities5:{entity:"sensor.some_sensor5",icon:"mdi:information-outline"},temperature:{temperature_sensor:"sensor.vindstyrka_salotto_temperature",humidity_sensor:"sensor.vindstyrka_salotto_humidity",tap_action:{action:"more-info"}}},colors:{active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"},name:"Salotto",icon:"mdi:sofa",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"},hold_action:{action:"more-info",navigation_path:""}}}constructor(){super(),this._iconList=["mdi:lightbulb","mdi:fan","mdi:play-circle","mdi:robot-vacuum","mdi:information-outline","mdi:sofa","mdi:account","mdi:bed","mdi:home","mdi:weather-sunny","mdi:weather-cloudy","mdi:weather-rainy"]}connectedCallback(){super.connectedCallback()}setConfig(t){t||(t={}),t.entities||(t.entities={}),t.colors||(t.colors={active:"rgba(var(--color-green), 1)",inactive:"rgba(var(--color-green), 0.3)",backgroundActive:"rgba(var(--color-green), 0.4)",backgroundInactive:"rgba(var(--color-green), 0.1)"}),t.hold_action||(t.hold_action={action:"more-info",navigation_path:""}),this._config=t}getConfig(){const t=JSON.parse(JSON.stringify(this._config)),e={};return Object.keys(t.entities).forEach((i=>{const n=t.entities[i];n.entity&&""!==n.entity.trim()&&(e[i]=n)})),t.entities=e,this._config=t,t}_defaultIconList(){return this._iconList}static get styles(){return s`
      :host {
        display: block;
        margin: 0;
        padding: 0;
      }
      .editor-header {
        text-align: center;
        margin: 1rem 0;
      }
      /* Stile comune per tutti gli header dei pannelli */
      ha-expansion-panel div[slot="header"] {
        background-color: var(--slider-bar-color);
        color: var(--text-primary-color);
        padding: 8px;
        font-weight: bold;
      }
      .section-content {
        padding: 16px;
      }
      .input-group {
        margin-bottom: 16px;
      }
      label {
        display: inline-block;
        margin-bottom: 4px;
        font-weight: 600;
      }
      input, textarea, select {
        width: 100%;
        box-sizing: border-box;
      }
      .note {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: var(--secondary-text-color);
      }
    `}_togglePanel(t){const e=this.shadowRoot.getElementById(t);e&&(e.open=!e.open)}_renderSubButtonPanel(t){let e;switch(this._config.entities,t){case"sub-button1":e="Sub-button1";break;case"sub-button2":e="Sub-button2";break;case"sub-button3":e="Sub-button3";break;case"sub-button4":e="Sub-button4";break;default:e=t}const i=`${t}Panel`;return F`
      <ha-expansion-panel id="${i}">
        <div slot="header" @click="${()=>this._togglePanel(i)}">
          ${e}
        </div>
        <div class="section-content">
          ${this._renderEntityInput("Entities (ID)",t)}
          ${this._renderIconInput("Icon",t)}
          ${this._renderSubButtonAction(t)}
        </div>
      </ha-expansion-panel>
    `}render(){return this._config?F`
      <div class="editor-header">
        <h3>Visual Editor Bubble Room</h3>
      </div>

      <ha-expansion-panel id="roomPanel">
        <div slot="header" @click="${()=>this._togglePanel("roomPanel")}">
          Room Settings
        </div>
        <div class="section-content">
          <div class="input-group">
            <label>Room name:</label>
            <input
              type="text"
              .value="${this._config.name||""}"
              @input="${this._updateName}"
            />
          </div>
          <div class="input-group">
            <label>Main icon:</label>
            <input
              type="text"
              .value="${this._config.icon||""}"
              list="icon-list"
              @input="${this._updateIcon}"
            />
          </div>
          ${this._renderRoomAction()}
          <div class="input-group">
            ${this._renderEntityInput("Presence (ID)","presence")}
          </div>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="subButtonMainPanel">
        <div slot="header" @click="${()=>this._togglePanel("subButtonMainPanel")}">
          SUB-BUTTON
        </div>
        <div class="section-content">
          ${this._renderSubButtonPanel("sub-button1")}
          ${this._renderSubButtonPanel("sub-button2")}
          ${this._renderSubButtonPanel("sub-button3")}
          ${this._renderSubButtonPanel("sub-button4")}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="mushroomEntitiesPanel">
        <div slot="header" @click="${()=>this._togglePanel("mushroomEntitiesPanel")}">
          Mushroom Entities
        </div>
        <div class="section-content">
          ${this._renderMushroomEntityPanel("entities1","Entity 1")}
          ${this._renderMushroomEntityPanel("entities2","Entity 2")}
          ${this._renderMushroomEntityPanel("entities3","Entity 3")}
          ${this._renderMushroomEntityPanel("entities4","Entity 4")}
          ${this._renderMushroomEntityPanel("entities5","Entity 5")}
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="cameraPanel">
        <div slot="header" @click="${()=>this._togglePanel("cameraPanel")}">
          Camera
        </div>
        <div class="section-content">
          <div class="input-group">
            ${this._renderEntityInput("Camera (ID)","camera")}
          </div>
          <div class="input-group">
            ${this._renderIconInput("Camera Icon","camera")}
          </div>
        </div>
      </ha-expansion-panel>



      <ha-expansion-panel id="climatePanel">
        <div slot="header" @click="${()=>this._togglePanel("climatePanel")}">
          Climate
        </div>
        <div class="section-content">
          <div class="input-group">
            ${this._renderEntityInput("Climate (ID)","climate")}
          </div>
          <div class="input-group">
            <label>Temperature Sensor:</label>
            <input
              type="text"
              .value="${this._config.entities?.temperature?.temperature_sensor||""}"
              list="entity-list"
              @input="${this._updateTemperature("temperature_sensor")}"
            />
          </div>
          <div class="input-group">
            <label>Humidity Sensor:</label>
            <input
              type="text"
              .value="${this._config.entities?.temperature?.humidity_sensor||""}"
              list="entity-list"
              @input="${this._updateTemperature("humidity_sensor")}"
            />
          </div>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel id="colorsPanel">
        <div slot="header" @click="${()=>this._togglePanel("colorsPanel")}">
          Colors
        </div>
        <div class="section-content">
          <div class="input-group">
            <label>Active:</label>
            <input
              type="text"
              .value="${this._config.colors&&this._config.colors.active||""}"
              @input="${this._updateColor("active")}"
            />
          </div>
          <div class="input-group">
            <label>Inactive:</label>
            <input
              type="text"
              .value="${this._config.colors&&this._config.colors.inactive||""}"
              @input="${this._updateColor("inactive")}"
            />
          </div>
          <div class="input-group">
            <label>Background Active:</label>
            <input
              type="text"
              .value="${this._config.colors&&this._config.colors.backgroundActive||""}"
              @input="${this._updateColor("backgroundActive")}"
            />
          </div>
          <div class="input-group">
            <label>Background Inactive:</label>
            <input
              type="text"
              .value="${this._config.colors&&this._config.colors.backgroundInactive||""}"
              @input="${this._updateColor("backgroundInactive")}"
            />
          </div>
        </div>
      </ha-expansion-panel>

      <datalist id="entity-list">
        ${this.hass?Object.keys(this.hass.entities).map((t=>F`<option value="${t}"></option>`)):""}
      </datalist>
      <datalist id="icon-list">
        ${this._defaultIconList().map((t=>F`<option value="${t}"></option>`))}
      </datalist>

      <p class="note">
        For advanced configurations, modify the YAML directly.
      </p>
    `:F`<div>Caricamento configurazione...</div>`}_renderMushroomEntityPanel(t,e){const i=`${t}Panel`;return F`
      <ha-expansion-panel id="${i}">
        <div slot="header" @click="${()=>this._togglePanel(i)}">
          ${e}
        </div>
        <div class="section-content">
          ${this._renderEntityInput(`${e} (ID)`,t)}
          ${this._renderIconInput(`${e} Icon`,t)}
        </div>
      </ha-expansion-panel>
    `}_renderEntityInput(t,e,i="entity"){const n=this._config.entities&&this._config.entities[e]&&this._config.entities[e][i]||"";return F`
      <label>${t}:</label>
      <input
        type="text"
        .value="${n}"
        list="entity-list"
        @input="${this._updateEntity(e,i)}"
      />
    `}_renderIconInput(t,e,i="icon"){let n=this._config.entities&&this._config.entities[e]&&this._config.entities[e][i]||"";if(!n&&this.hass&&this._config.entities&&this._config.entities[e]?.entity){const t=this._config.entities[e].entity;n=this.hass.states[t]?.attributes?.icon||""}return F`
      <label>${t}:</label>
      <input
        type="text"
        .value="${n}"
        list="icon-list"
        @input="${this._updateEntity(e,i)}"
      />
    `}_renderRoomAction(){const t=this._config.tap_action||{action:"navigate",navigation_path:""},e=this._config.hold_action||{action:"more-info",navigation_path:""};return F`
      <div class="input-group">
        <label>Tap:</label>
        <select @change="${this._updateTapActionField("action")}" .value="${t.action}">
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===t.action?F`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${t.navigation_path||""}"
                @input="${this._updateTapActionField("navigation_path")}"
              />
            `:""}
        ${"call-service"===t.action?F`
              <label>Service:</label>
              <input
                type="text"
                .value="${t.service||""}"
                @input="${this._updateTapActionField("service")}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${t.service_data?JSON.stringify(t.service_data):""}"
                @input="${this._updateTapActionField("service_data")}"
              ></textarea>
            `:""}
      </div>
      <div class="input-group">
        <label>Hold:</label>
        <select @change="${this._updateHoldActionField("action")}" .value="${e.action}">
          <option value="more-info">More Info</option>
          <option value="toggle">Toggle</option>
          <option value="call-service">Call Service</option>
          <option value="navigate">Navigate</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===e.action?F`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${e.navigation_path||""}"
                @input="${this._updateHoldActionField("navigation_path")}"
              />
            `:""}
        ${"call-service"===e.action?F`
              <label>Service:</label>
              <input
                type="text"
                .value="${e.service||""}"
                @input="${this._updateHoldActionField("service")}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${e.service_data?JSON.stringify(e.service_data):""}"
                @input="${this._updateHoldActionField("service_data")}"
              ></textarea>
            `:""}
      </div>
    `}_renderSubButtonAction(t){const e=this._config.entities[t]?.tap_action||{action:"toggle",navigation_path:""},i=this._config.entities[t]?.hold_action||{action:"more-info",navigation_path:""};return F`
      <div class="input-group">
        <label>Tap:</label>
        <select @change="${this._updateEntityTapAction(t,"action")}" .value="${e.action}">
          <option value="toggle">Toggle</option>
          <option value="more-info">More Info</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===e.action?F`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${e.navigation_path||""}"
                @input="${this._updateEntityTapAction(t,"navigation_path")}"
              />
            `:""}
        ${"call-service"===e.action?F`
              <label>Service:</label>
              <input
                type="text"
                .value="${e.service||""}"
                @input="${this._updateEntityTapAction(t,"service")}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${e.service_data?JSON.stringify(e.service_data):""}"
                @input="${this._updateEntityTapAction(t,"service_data")}"
              ></textarea>
            `:""}
      </div>
      <div class="input-group">
        <label>Hold:</label>
        <select @change="${this._updateEntityHoldAction(t,"action")}" .value="${i.action}">
          <option value="more-info">More Info</option>
          <option value="toggle">Toggle</option>
          <option value="navigate">Navigate</option>
          <option value="call-service">Call Service</option>
          <option value="none">None</option>
        </select>
        ${"navigate"===i.action?F`
              <label>Navigation Path:</label>
              <input
                type="text"
                .value="${i.navigation_path||""}"
                @input="${this._updateEntityHoldAction(t,"navigation_path")}"
              />
            `:""}
        ${"call-service"===i.action?F`
              <label>Service:</label>
              <input
                type="text"
                .value="${i.service||""}"
                @input="${this._updateEntityHoldAction(t,"service")}"
              />
              <label>Service Data (JSON):</label>
              <textarea
                .value="${i.service_data?JSON.stringify(i.service_data):""}"
                @input="${this._updateEntityHoldAction(t,"service_data")}"
              ></textarea>
            `:""}
      </div>
    `}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}_fireConfigChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_updateName(t){const e=t.target.value;this._config={...this._config,name:e},this.requestUpdate(),this._fireConfigChanged()}_updateIcon(t){const e=t.target.value;this._config={...this._config,icon:e},this.requestUpdate(),this._fireConfigChanged()}_updateEntity(t,e="entity"){return i=>{const n=i.target.value;let o=this._config.entities[t]||{};o={...o,[e]:n};const s={...this._config.entities,[t]:o};this._config={...this._config,entities:s},this.requestUpdate(),this._fireConfigChanged()}}_updateColor(t){return e=>{const i=e.target.value,n={...this._config.colors||{},[t]:i};this._config={...this._config,colors:n},this.requestUpdate(),this._fireConfigChanged()}}_updateTemperature(t){return e=>{const i=e.target.value,n={...this._config.entities?.temperature,[t]:i};n.temperature_sensor&&n.humidity_sensor&&(n.primary=`🌡️{{ states("${n.temperature_sensor}") }}°C 💦{{ states("${n.humidity_sensor}") }}%`);const o={...this._config.entities,temperature:n};this._config={...this._config,entities:o},this.requestUpdate(),this._fireConfigChanged()}}_updateTapActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const n={...this._config.tap_action||{action:"navigate",navigation_path:""},[t]:i};this._config={...this._config,tap_action:n},this.requestUpdate(),this._fireConfigChanged()}}_updateHoldActionField(t){return e=>{let i=e.target.value;if("service_data"===t)try{i=JSON.parse(i)}catch(t){}const n={...this._config.hold_action||{action:"more-info",navigation_path:""},[t]:i};this._config={...this._config,hold_action:n},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityTapAction(t,e){return i=>{let n=i.target.value;if("service_data"===e)try{n=JSON.parse(n)}catch(t){}let o=this._config.entities[t]||{},s=o.tap_action||{action:"toggle",navigation_path:""};s={...s,[e]:n},o={...o,tap_action:s};const a={...this._config.entities,[t]:o};this._config={...this._config,entities:a},this.requestUpdate(),this._fireConfigChanged()}}_updateEntityHoldAction(t,e){return i=>{let n=i.target.value;if("service_data"===e)try{n=JSON.parse(n)}catch(t){}let o=this._config.entities[t]||{},s=o.hold_action||{action:"more-info",navigation_path:""};s={...s,[e]:n},o={...o,hold_action:s};const a={...this._config.entities,[t]:o};this._config={...this._config,entities:a},this.requestUpdate(),this._fireConfigChanged()}}});var rt=Object.freeze({__proto__:null});
