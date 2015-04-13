!function t(e,i,n){function s(a,o){if(!i[a]){if(!e[a]){var u="function"==typeof require&&require;if(!o&&u)return u(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var h=i[a]={exports:{}};e[a][0].call(h.exports,function(t){var i=e[a][1][t];return s(i?i:t)},h,h.exports,t,e,i,n)}return i[a].exports}for(var r="function"==typeof require&&require,a=0;a<n.length;a++)s(n[a]);return s}({1:[function(t,e,i){"use strict";var n,s=t("./element"),r=t("./image-element"),a=0,o={};e.exports=function(){var t=function(t){this.initialize(t)};return t.prototype={initialize:function(){var t=this;n||document.body.kit||(n=Object.defineProperty(window.Element.prototype,"kit",{get:function(){return t.setup(this)}}))},setup:function(t){var e;return o[t._kitId]||(e=t instanceof window.HTMLImageElement?r:s,a++,t._kitId=a,o[t._kitId]=new e(t)),o[t._kitId]},destroy:function(){}},new t}()},{"./element":2,"./image-element":3}],2:[function(t,e,i){"use strict";var n=t("./utils"),s=(t("./element-kit"),function(t){this.initialize(t)});s.prototype={initialize:function(t){this.el=t,this.classList=this._getClassList(),this._eventListenerMap=this._eventListenerMap||[],Object.defineProperty(this,"dataset",{get:function(){return this.getData()}.bind(this)})},_traverseEachParent:function(t,e){for(var i,n=e||this.el;n&&"string"==typeof n.className&&(i=t(n),void 0===i||i);)n=n.parentNode},appendOuterHtml:function(t){var e=this.el.parentNode,i=n.createHtmlElement(t);return e?e.replaceChild(i,this.el):(e=document.createDocumentFragment(),e.appendChild(i)),i.appendChild(this.el),i},getUniqueId:function(){return this.el._kitId},getClosestAncestorElementByClassName:function(t){var e;return this._traverseEachParent(function(i){return i.kit._hasClass(t)?(e=i,!1):void 0},this.el.parentNode),e},addEventListener:function(t,e,i,n){var s=e;n=n||{},"function"!=typeof s&&(s=this._createEventListener(i[e],i)),this.el.addEventListener(t,s,n.useCapture),this._eventListenerMap.push({event:t,listener:s,listenerId:e,context:i})},_createEventListener:function(t,e){return function(i){e=e||this,t.apply(e,arguments)}},removeEventListener:function(t,e,i){var n,s,r=this._eventListenerMap||[];if(r.length)for(n=0;n<r.length;n++)if(s=r[n],s&&s.event===t&&s.listenerId===e&&s.context===i){this.el.removeEventListener(t,s.listener),this._eventListenerMap[n]=null;break}},waitForTransition:function(t){var e=this.getTransitionDuration();t&&(e>0?setTimeout(t.bind(this,this.el),e):t(this.el))},getTransitionDuration:function(){var t,e=this.getCssComputedProperty("transition-delay")||"0ms",i=this.getCssComputedProperty("transition-duration")||"0ms",n=Array.isArray(i)?i:[i],s=Array.isArray(e)?e:[e],r=0;return n.push.apply(n,s),n.forEach(function(e){e.split(",").forEach(function(e){e=this._convertCssTimeValueToMilliseconds(e),t=this._getCssPropUnitMap(e),t.num>r&&(r=t.num)}.bind(this))}.bind(this)),r},getCssComputedProperty:function(t){var e=window.getComputedStyle(this.el);return e.getPropertyValue(t)||this.el.style[this._getJsPropName(t)]},_getCssPropUnitMap:function(t){t.trim();var e=t.match("[0-9.]+"),i="ms";return e=e?e[0]:"",e&&(i=t.split(e)[1],e=Number(e)),{num:e,unit:i}},_convertCssTimeValueToMilliseconds:function(t){var e=this._getCssPropUnitMap(t).num,i=t.replace(e,"");return t="s"===i?1e3*e:e,t+"ms"},_getClassList:function(){return{add:this._addClass.bind(this),remove:this._removeClass.bind(this),contains:this._hasClass.bind(this),toggle:this._toggleClass.bind(this)}},_getCssClasses:function(){return this.el.className.split(" ")},_toggleClass:function(t){this._hasClass(t)?this._removeClass(t):this._addClass(t)},_addClass:function(){"classList"in document.createElement("_")?this._each(arguments,function(t){this.el.classList.add(t)}.bind(this)):this._each(arguments,function(t){this._hasClass(t)||(this.el.className=this.el.className?this.el.className+" "+t:t)}.bind(this))},_each:function(t,e){var i,n=t.length;for(i=0;n>i;i++)e(t[i])},_removeClass:function(){var t;"classList"in document.createElement("_")?this._each(arguments,function(t){this.el.classList.remove(t)}.bind(this)):this._each(arguments,function(e){this.el.className===e?this.el.className="":(t="[\\s]*"+e,t=new RegExp(t,"i"),this.el.className=this.el.className.replace(t,""))}.bind(this))},_hasClass:function(t){var e=this._getCssClasses();return-1!==e.indexOf(t)},_getJsPropName:function(t){return t=t.replace(/-([a-z])/g,function(t){return t[1].toUpperCase()})},getAttributes:function(){var t=this.el.attributes,e={};if(t.length)for(var i=0;i<t.length;i++)e[t[i].name]=t[i].value;return e},_getDomData:function(){var t,e,i=this.getAttributes(),n={};for(t in i)i.hasOwnProperty(t)&&(e=i[t],0===t.indexOf("data-")&&(t=t.substr(5),n[t]=e));return n},getData:function(){var t;this._data=n.extend({},this._data,this._getDomData());for(t in this._data)if(this._data.hasOwnProperty(t)){var e=this._data[t];Object.defineProperty(this._data,t,{writeable:!0,get:function(){return e}.bind(this),set:function(e){this.setData.bind(this,t,e)}.bind(this)})}return this._data},setData:function(t,e){this.el.setAttribute("data-"+t,e),this._data[t]=e},destroy:function(){}},e.exports=s},{"./element-kit":1,"./utils":4}],3:[function(t,e,i){"use strict";var n=t("./utils"),s=t("./element"),r=function(t){s.prototype.initialize.call(this,t)};r.prototype=n.extend({},s.prototype,{load:function(t,e){var i=this.el,n=i.getAttribute(t)||t;return n||console.warn('ElementKit error: ImageElement has no "'+t+'" attribute to load'),-1!==n.indexOf(",")&&(n=this._getImageSourceSetPath(n)),this._loadImage(n,e),this},_loadImage:function(t,e){var i=this.el;i.onload=function(){e?e(i):null},i.src=t},_getImageSourceSetPath:function(t){var e,i,n,s,r,a=window.innerWidth,o=window.innerHeight;return t.split(",").forEach(function(t){i=this._buildSourceMapWidthHeight(t),n=i.width||0,s=i.height||0,!r&&a>=n&&o>=s&&(e=t.split(" ")[0],r=!0)}.bind(this)),e},_buildSourceMapWidthHeight:function(t,e){var i,n=t.split(" "),s=function(t){return Number(t.substr(0,t.length-1))};return e=e||{},n.shift(),n.forEach(function(t){i=t.charAt(t.length-1),"w"===i?e.width=s(t):"h"===i&&(e.height=s(t))}),e}}),e.exports=r},{"./element":2,"./utils":4}],4:[function(t,e,i){e.exports={createHtmlElement:function(t){var e,i;return t?(t=t.trim(t),e=document.createElement("div"),e.innerHTML=t,i=e.childNodes[0],e.removeChild(i)):void 0},extend:function(t){var e,i,n=t;for(i=1;i<arguments.length;i++){e=arguments[i];for(var s in e)e.hasOwnProperty(s)&&(n[s]=e[s])}return n},triggerHtmlCollectionMethod:function(t,e,i){var n,s,r=t.length;for(n=0;r>n;n++)s=t[n],s.kit[e].apply(s.kit,i)}}},{}]},{},[1,2,3,4]);