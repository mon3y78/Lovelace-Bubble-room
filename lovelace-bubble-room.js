/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}}const s=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new o(n,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,m=p.trustedTypes,f=m?m.emptyScript:"",g=p.reactiveElementPolyfillSupport,b=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const s=n?.call(this);o.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of n){const n=document.createElement("style"),o=t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=n,this[n]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??v)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[b("elementProperties")]=new Map,$[b("finalized")]=new Map,g?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,S=A.trustedTypes,w=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+E,C=`<${k}>`,T=document,P=()=>T.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,I=/>/g,N=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,D=/"/g,F=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),W=new WeakMap,V=T.createTreeWalker(T,129);function q(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,n=[];let o,s=2===e?"<svg>":3===e?"<math>":"",r=z;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===z?"!--"===c[1]?r=O:void 0!==c[1]?r=I:void 0!==c[2]?(F.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=N):void 0!==c[3]&&(r=N):r===N?">"===c[0]?(r=o??z,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?N:'"'===c[3]?D:R):r===D||r===R?r=N:r===O||r===I?r=z:(r=N,o=void 0);const d=r===N&&t[e+1].startsWith("/>")?" ":"";s+=r===z?i+C:l>=0?(n.push(a),i.slice(0,l)+x+i.slice(l)+E+d):i+E+(-2===l?e:d)}return[q(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class K{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,s=0;const r=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=V.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(x)){const e=l[s++],i=n.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?Y:"?"===r[1]?tt:"@"===r[1]?et:X}),n.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:o}),n.removeAttribute(t));if(F.test(n.tagName)){const t=n.textContent.split(E),e=t.length-1;if(e>0){n.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],P()),V.nextNode(),a.push({type:2,index:++o});n.append(t[e],P())}}}else if(8===n.nodeType)if(n.data===k)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(E,t+1));)a.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,n){if(e===j)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const s=H(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,n)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??T).importNode(e,!0);V.currentNode=n;let o=V.nextNode(),s=0,r=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new it(o,this,t)),this._$AV.push(e),a=i[++r]}s!==a?.index&&(o=V.nextNode(),s++)}return V.currentNode=T,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),H(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new G(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,n){const o=this.strings;let s=!1;if(void 0===o)t=Z(this,t,e,0),s=!H(t)||t!==this._$AH&&t!==j,s&&(this._$AH=t);else{const n=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Z(this,n[i+r],e,r),a===j&&(a=this._$AH[r]),s||=!H(a)||a!==this._$AH[r],a===B?t=B:t!==B&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}s&&!n&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Y extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class tt extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class et extends X{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??B)===j)return;const i=this._$AH,n=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==B&&(i===B||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(K,Q),(A.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}ot._$litElement$=!0,ot.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ot});const st=globalThis.litElementPolyfillSupport;st?.({LitElement:ot}),(globalThis.litElementVersions??=[]).push("4.1.1");var rt=function(t){if(t){var e=function(t){return[].slice.call(t)},i=3,n=[],o=null,s="requestAnimationFrame"in t?function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{sync:!1};t.cancelAnimationFrame(o);var i=function(){return a(n.filter((function(t){return t.dirty&&t.active})))};if(e.sync)return i();o=t.requestAnimationFrame(i)}:function(){},r=function(t){return function(e){n.forEach((function(e){return e.dirty=t})),s(e)}},a=function(t){t.filter((function(t){return!t.styleComputed})).forEach((function(t){t.styleComputed=d(t)})),t.filter(u).forEach(p);var e=t.filter(h);e.forEach(l),e.forEach((function(t){p(t),c(t)})),e.forEach(m)},c=function(t){return t.dirty=0},l=function(t){t.availableWidth=t.element.parentNode.clientWidth,t.currentWidth=t.element.scrollWidth,t.previousFontSize=t.currentFontSize,t.currentFontSize=Math.min(Math.max(t.minSize,t.availableWidth/t.currentWidth*t.previousFontSize),t.maxSize),t.whiteSpace=t.multiLine&&t.currentFontSize===t.minSize?"normal":"nowrap"},h=function(t){return 2!==t.dirty||2===t.dirty&&t.element.parentNode.clientWidth!==t.availableWidth},d=function(e){var i=t.getComputedStyle(e.element,null);return e.currentFontSize=parseFloat(i.getPropertyValue("font-size")),e.display=i.getPropertyValue("display"),e.whiteSpace=i.getPropertyValue("white-space"),!0},u=function(t){var e=!1;return!t.preStyleTestCompleted&&(/inline-/.test(t.display)||(e=!0,t.display="inline-block"),"nowrap"!==t.whiteSpace&&(e=!0,t.whiteSpace="nowrap"),t.preStyleTestCompleted=!0,e)},p=function(t){t.element.style.whiteSpace=t.whiteSpace,t.element.style.display=t.display,t.element.style.fontSize=t.currentFontSize+"px"},m=function(t){t.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:t.previousFontSize,newValue:t.currentFontSize,scaleFactor:t.currentFontSize/t.previousFontSize}}))},f=function(t,e){return function(i){t.dirty=e,t.active&&s(i)}},g=function(t){return function(){n=n.filter((function(e){return e.element!==t.element})),t.observeMutations&&t.observer.disconnect(),t.element.style.whiteSpace=t.originalStyle.whiteSpace,t.element.style.display=t.originalStyle.display,t.element.style.fontSize=t.originalStyle.fontSize}},b=function(t){return function(){t.active||(t.active=!0,s())}},_=function(t){return function(){return t.active=!1}},v=function(t){t.observeMutations&&(t.observer=new MutationObserver(f(t,1)),t.observer.observe(t.element,t.observeMutations))},y={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in t&&{subtree:!0,childList:!0,characterData:!0}},$=null,A=function(){t.clearTimeout($),$=t.setTimeout(r(2),x.observeWindowDelay)},S=["resize","orientationchange"];return Object.defineProperty(x,"observeWindow",{set:function(e){var i="".concat(e?"add":"remove","EventListener");S.forEach((function(e){t[i](e,A)}))}}),x.observeWindow=!0,x.observeWindowDelay=100,x.fitAll=r(i),x}function w(t,e){var o=Object.assign({},y,e),r=t.map((function(t){var e=Object.assign({},o,{element:t,active:!0});return function(t){t.originalStyle={whiteSpace:t.element.style.whiteSpace,display:t.element.style.display,fontSize:t.element.style.fontSize},v(t),t.newbie=!0,t.dirty=!0,n.push(t)}(e),{element:t,fit:f(e,i),unfreeze:b(e),freeze:_(e),unsubscribe:g(e)}}));return s(),r}function x(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof t?w(e(document.querySelectorAll(t)),i):w([t],i)[0]}}("undefined"==typeof window?null:window);customElements.define("bubble-room",class extends ot{static get properties(){return{config:{type:Object},hass:{type:Object}}}static getStubConfig(){return{entities:{presence:{entity:"binary_sensor.aqara_fp1_presence"},"sub-button1":{entity:"light.luce_ventola",icon:"mdi:lightbulb",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button2":{entity:"fan.sonoff_1000f6e5c7",icon:"mdi:fan",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button3":{entity:"media_player.google_nest_1",icon:"mdi:speaker",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},"sub-button4":{entity:"vacuum.slider",icon:"mdi:robot-vacuum",tap_action:{action:"toggle"},hold_action:{action:"more-info"}},climate:{entity:"climate.termostato_salotto",icon:"mdi:thermostat",tap_action:{action:"more-info"}},camera:{entity:"camera.front_door",icon:"mdi:camera",tap_action:{action:"more-info"}},sensors:[{type:"temperature",entity:"sensor.vindstyrka_salotto_temperature",unit:"°C"},{type:"humidity",entity:"sensor.vindstyrka_salotto_humidity"}]},colors:{active:"var(--primary-color)",inactive:"var(--secondary-text-color)",backgroundActive:"color-mix(in srgb, var(--primary-color) 85%, transparent)",backgroundInactive:"var(--card-background-color)"},name:"Salotto",icon:"mdi:sofa",tap_action:{action:"navigate",navigation_path:"/lovelace/sala"}}}firstUpdated(){const t=this.shadowRoot.querySelectorAll(".fit-text");t.length&&rt(t,{maxSize:20,minSize:10,multiLine:!1})}setConfig(t){if(!t)throw new Error("Invalid configuration");const e=JSON.parse(JSON.stringify(t));e.entities?.temperature&&!e.entities?.sensors&&(e.entities.sensors=[],e.entities.temperature.temperature_sensor&&e.entities.sensors.push({type:"temperature",entity:e.entities.temperature.temperature_sensor,unit:e.entities.temperature.unit||"°C"}),e.entities.temperature.humidity_sensor&&e.entities.sensors.push({type:"humidity",entity:e.entities.temperature.humidity_sensor}),delete e.entities.temperature),this.config={entities:e.entities||{},colors:{active:e.colors?.active||"var(--primary-color)",inactive:e.colors?.inactive||"var(--secondary-text-color)",backgroundActive:e.colors?.backgroundActive||"color-mix(in srgb, var(--primary-color) 20%, transparent)",backgroundInactive:e.colors?.backgroundInactive||"color-mix(in srgb, var(--primary-color) 10%, transparent)",...e.colors},icon:e.icon||"",name:e.name||"Room",tap_action:e.tap_action||{action:"navigate",navigation_path:""}}}_getFallbackIcon(t,e){if("string"==typeof e&&e.trim())return e;if(!t)return"";const i=this.hass?.states?.[t];if(i?.attributes?.icon)return i.attributes.icon;if(i?.attributes?.device_class)return this._getDeviceClassIcon(i.attributes.device_class,i.state);const n=t.split(".")[0];return this._getDomainDefaultIcon(n,i?.state)}_getDeviceClassIcon(t,e){return{door:"on"===e?"mdi:door-open":"mdi:door-closed",window:"on"===e?"mdi:window-open":"mdi:window-closed",motion:"on"===e?"mdi:motion-sensor":"mdi:motion-sensor-off",moisture:"on"===e?"mdi:water-alert":"mdi:water-off",smoke:"on"===e?"mdi:smoke":"mdi:smoke-detector-off",gas:"on"===e?"mdi:gas-cylinder":"mdi:gas-off",problem:"mdi:alert",connectivity:"mdi:connection",presence:"on"===e?"mdi:account-voice":"mdi:account-voice-off",tamper:"mdi:lock-open-alert",vibration:"on"===e?"mdi:vibrate":"mdi:vibrate-off"}[t]||""}_getDomainDefaultIcon(t,e){return{light:"mdi:lightbulb",switch:"mdi:toggle-switch",fan:"mdi:fan",climate:"mdi:thermostat",media_player:"mdi:speaker",vacuum:"mdi:robot-vacuum",binary_sensor:"on"===e?"mdi:motion-sensor":"mdi:motion-sensor-off",sensor:"mdi:information-outline",cover:"open"===e?"mdi:blinds-open":"mdi:blinds-closed",lock:"locked"===e?"mdi:lock":"mdi:lock-open"}[t]||""}_renderMushroom(t,e,i){const n=this._defaultMushroomStyle(e);if(t.type){const e=this._buildSensorText(t);return e?L`
        <div class="mushroom-item" style="${n}">
          <span class="fit-text" style="color: ${i}; font-size: ${this._getFontSize(e)};">
            ${e}
          </span>
        </div>
      `:B}const o=this._getFallbackIcon(t.entity,t.icon||"");return L`
      <div class="mushroom-item" style="${n}"
           @pointerdown=${e=>this._startHold(e,t)}
           @pointerup=${e=>this._endHold(e,t,(()=>this._handleMushroomTap(t)))}
           @pointerleave=${()=>this._cancelHold()}>
        <ha-icon icon="${o}" style="color: ${i};"></ha-icon>
      </div>
    `}_buildSensorText(t){if(!this.hass||!t.entity)return"";const e=this.hass.states[t.entity]?.state;if(null==e||""===e)return"";return`${t.customIcon||this._getSensorIcon(t.type)}${e}${t.unit||this._getDefaultUnit(t.type)}`}_getSensorIcon(t){return{temperature:"🌡️",humidity:"💦",light:"💡",co2:"🌫️",pressure:"⏲️",uv:"☀️",noise:"🔊",pm25:"💨",pm10:"💨",voc:"🌡️"}[t]||""}_getDefaultUnit(t){return{temperature:"°C",humidity:"%",light:"lx",co2:"ppm",pressure:"hPa",uv:"",noise:"dB",pm25:"µg/m³",pm10:"µg/m³",voc:"ppb"}[t]||""}_getFontSize(t){const e=t.length;return e>30?"12px":e>20?"14px":e>15?"16px":"18px"}_defaultMushroomStyle(t){return["top: -77px; left: 0px;","top: -85px; left: 38px;","top: -64px; left: 77px;","bottom: 39px; left: 96px;","bottom: -1px; left: 85px;","bottom: -2px; left: -2px;","top: -140px; left: 5px;","top: -95px; right: 5px;"][t]||""}_startHold(t,e){t.stopPropagation(),this._holdTriggered=!1,this._holdTimeout=setTimeout((()=>{this._holdTriggered=!0,this._handleHoldAction(e)}),500)}_endHold(t,e,i){t.stopPropagation(),clearTimeout(this._holdTimeout),this._holdTriggered||i(),this._holdTriggered=!1}_cancelHold(){clearTimeout(this._holdTimeout),this._holdTriggered=!1}_handleHoldAction(t){if(!t?.hold_action)return void this._showMoreInfo(t.entity);const{action:e,service:i,service_data:n,navigation_path:o}=t.hold_action;switch(e){case"more-info":this._showMoreInfo(t.entity);break;case"toggle":this._toggleEntity(t.entity);break;case"call-service":this._callService(i,n,t.entity);break;case"navigate":this._navigate(o)}}_handleMainIconTap(){if(!this.config?.tap_action)return;const{action:t,service:e,service_data:i,navigation_path:n}=this.config.tap_action;switch(t){case"toggle":this.config.entity&&this._toggleEntity(this.config.entity);break;case"more-info":this.config.entity&&this._showMoreInfo(this.config.entity);break;case"call-service":this._callService(e,i,this.config.entity);break;case"navigate":this._navigate(n)}}_handleSubButtonTap(t){if(!t?.tap_action)return;const{action:e,service:i,service_data:n,navigation_path:o}=t.tap_action;switch(e){case"toggle":this._toggleEntity(t.entity);break;case"more-info":this._showMoreInfo(t.entity);break;case"call-service":this._callService(i,n,t.entity);break;case"navigate":this._navigate(o)}}_handleMushroomTap(t){this._handleSubButtonTap(t)}_toggleEntity(t){this.hass&&t&&this.hass.callService("homeassistant","toggle",{entity_id:t})}_showMoreInfo(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_callService(t,e,i){if(!t||!this.hass)return;const[n,o]=t.split("."),s={...e,entity_id:e?.entity_id||i};this.hass.callService(n,o,s)}_navigate(t){t&&(window.history.pushState({},"",t),window.dispatchEvent(new Event("location-changed")))}static get styles(){return s`
      :host {
        display: block;
        --card-height: 190px;
        font-family: sans-serif;
      }
      ha-card {
        display: block;
        margin: 0;
        padding: 0 !important;
        background: var(--bubble-room-background, var(--card-background-color)) !important;
        border-radius: var(--bubble-room-border-radius, 8px) !important;
        overflow: hidden;
      }
      .card {
        position: relative;
        width: 100%;
        height: var(--card-height);
      }
      .grid-container {
        display: grid;
        width: 100%;
        height: 100%;
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
        padding: 8px;
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
        transition: all 0.3s ease;
      }
      .bubble-sub-button:hover {
        filter: brightness(0.9);
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
        text-align: center;
        display: block;
        width: 100%;
      }
    `}render(){if(!this.config||!this.hass)return L`<div>Loading...</div>`;const{entities:t,name:e,icon:i,background:n,border_radius:o}=this.config,s=t.presence?.entity&&"on"===this.hass.states[t.presence.entity]?.state,r={active:this.config.colors.active,inactive:this.config.colors.inactive,backgroundActive:this.config.colors.backgroundActive,backgroundInactive:this.config.colors.backgroundInactive},a=s?r.active:r.inactive,c=[n?`--bubble-room-background: ${n}`:"",o?`--bubble-room-border-radius: ${o}`:"",`--bubble-room-icon-bg: ${s?r.backgroundActive:r.backgroundInactive}`,`--bubble-room-icon-color: ${a}`,`--bubble-room-name-color: ${a}`].filter((t=>t)).join(";"),l=i?.trim()?i:t.presence?.entity?this._getFallbackIcon(t.presence.entity):"",h=[t["sub-button1"],t["sub-button2"],t["sub-button3"],t["sub-button4"]].filter((t=>t?.entity)),d=[...(t.sensors||[]).slice(0,4),t.climate,t.camera].filter(Boolean).map(((t,e)=>{if(t.type)return{item:t,idx:e,color:a};const i=t.entity;if(!i)return null;const n=this.hass.states[i]?.state;return{item:t,idx:e,color:"on"===n||"open"===n||"playing"===n?r.active:r.inactive}})).filter(Boolean);return L`
      <ha-card style="${c}">
        <div class="card">
          <div class="grid-container">
            <div class="name-area">${e}</div>
            
            <div class="icon-area">
              <div class="bubble-icon-container"
                  @pointerdown=${t=>this._startHold(t,this.config)}
                  @pointerup=${t=>this._endHold(t,this.config,(()=>this._handleMainIconTap()))}
                  @pointerleave=${this._cancelHold}>
                ${l?L`<ha-icon class="bubble-icon" icon="${l}"></ha-icon>`:B}
              </div>
              
              <div class="mushroom-container">
                ${d.map((({item:t,idx:e,color:i})=>this._renderMushroom(t,e,i)))}
              </div>
            </div>
            
            <div class="bubble-sub-button-container">
              ${h.map((t=>{const e=this.hass.states[t.entity]?.state,i="on"===e||"open"===e||"playing"===e,n=i?r.backgroundActive:r.backgroundInactive,o=i?r.active:r.inactive,s=this._getFallbackIcon(t.entity,t.icon);return L`
                  <div class="bubble-sub-button"
                      style="background-color: ${n}; color: ${o};"
                      @pointerdown=${e=>this._startHold(e,t)}
                      @pointerup=${e=>this._endHold(e,t,(()=>this._handleSubButtonTap(t)))}
                      @pointerleave=${this._cancelHold}>
                    <ha-icon icon="${s}"></ha-icon>
                  </div>
                `}))}
            </div>
          </div>
        </div>
      </ha-card>
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"bubble-room",name:"Bubble Room",description:"A stylish room control card with environmental sensors",preview:!0,documentationURL:"https://github.com/mon3y78/Lovelace-Bubble-room"});
