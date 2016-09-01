/*! DOM Utilities - v0.2.0 - 2016-09-01
* Copyright (c) 2016 AQuest; Licensed MIT */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("desandro-classie"));
	else if(typeof define === 'function' && define.amd)
		define(["classie"], factory);
	else if(typeof exports === 'object')
		exports["domUtils"] = factory(require("desandro-classie"));
	else
		root["domUtils"] = factory(root["classie"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    dom: __webpack_require__(1),
	    events: __webpack_require__(4),
	    utils: __webpack_require__(3),
	    Nodes: __webpack_require__(5).default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.toggleClass = exports.hasClass = exports.removeClass = exports.addClass = exports.closest = exports.parents = exports.toArray = exports.data = exports.qsa = exports.qs = exports.byClassName = exports.byId = undefined;

	var _desandroClassie = __webpack_require__(2);

	var _desandroClassie2 = _interopRequireDefault(_desandroClassie);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * # DOM Utility Functions
	 */

	/**
	 * Returns a reference to the element by its ID.
	 *
	 * #### Example:
	 *
	 * ```
	 * import { byId } from 'dom-utils';
	 *
	 * const content = byId('main-content');
	 * ```
	 *
	 * @name byId
	 * @function
	 * @param {string} id - ID string
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
	 * @return {Element|null}
	 *
	 */
	var byId = exports.byId = function byId(id) {
	  return document.getElementById(id);
	};

	/**
	 * Returns an array of all child elements which have all of the given class names
	 *
	 * #### Example:
	 *
	 * ```
	 * import { byClassName } from 'dom-utils';
	 *
	 * const listItems = byClassName('list__items');
	 * ```
	 * @name byClassName
	 * @function
	 * @param {string} className - class string to search for
	 * @param {Element|Document} [ctx=document] - Root element. `document` by default
	 * @return {Array}
	 */
	var byClassName = exports.byClassName = function byClassName(className) {
	  var ctx = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	  return Array.toArray(ctx.getElementsByClassName(className));
	};

	/**
	 * Returns the first element within the document that matches the specified group of selectors
	 *
	 * #### Example:
	 *
	 * ```
	 * import { qs } from 'dom-utils';
	 *
	 * const content = qs('#main-content');
	 * ```
	 *
	 * @name qs
	 * @function
	 * @param {string} selector - CSS selector
	 * @param {Element|Document} [ctx=document] - Root element. `document` by default
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
	 * @return {Element|null}
	 */
	var qs = exports.qs = function qs(selector) {
	  var ctx = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	  return ctx.querySelector(selector);
	};

	/**
	 * Returns a list of the elements within the document that match the specified group of selectors
	 *
	 * #### Example:
	 *
	 * ```
	 * import { qsa } from 'dom-utils';
	 *
	 * const listItems = qsa('.list .list-items');
	 * ```
	 *
	 * @name qsa
	 * @function
	 * @param {string} selector - One or more CSS selectors separated by commas.
	 * @param {Element|Document} [ctx=document] - Root element. `document` by default
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
	 * @return {Array}
	 */
	var qsa = exports.qsa = function qsa(selector) {
	  var ctx = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	  return Array.from(ctx.querySelectorAll(selector));
	};

	/**
	 * Returns a parsed data attribute from the passed-in node. If not found returns `null`
	 *
	 * #### Example:
	 *
	 * ```
	 * import { byId, data } from 'dom-utils';
	 *
	 * //html: <div id="content" data-name="my-content" data-idx="1" data-bool="false"></div>
	 *
	 * const content = byId('content');
	 *
	 * const name = attr(content, 'name'); // "my-content"
	 * const idx = attr(content, 'idx'); // 1
	 * const bool = attr(content, 'bool'); // false
	 * ```
	 *
	 * @name data
	 * @function
	 * @param {Element} element - DOM Element
	 * @param {string} attr - Data attribute to retrieve (without the `data-`)
	 * @return {*|null}
	 */
	var data = exports.data = function data(element, attr) {
	  return element.hasAttribute('data-' + attr) ? (0, _utils.parseString)(element.getAttribute('data-' + attr)) : undefined;
	};

	/**
	 * Converts passed-in Element or NodeList to an array.
	 *
	 * #### Example:
	 *
	 * ```
	 * import { toArray } from 'dom-utils';
	 *
	 * const content = document.getElementById('content');
	 * const arrayLike = document.querySelectorAll('.elements');
	 *
	 * const elements = toArray(arrayLike);
	 * // Array.isArray(elements) === true
	 *
	 * const contentArray = toArray(content);
	 * // Array.isArray(contentArray) === true
	 * ```
	 *
	 * @name toArray
	 * @function
	 * @param {array|Element|NodeList} element - Value to convert
	 * @return {array}
	 */
	var toArray = exports.toArray = function toArray(element) {
	  if (Array.isArray(element)) {
	    return element;
	  }
	  return element instanceof NodeList ? Array.from(element) : [element];
	};

	/**
	 * Gets the ancestors of an element, optionally filtered by a selector.
	 *
	 * #### Example:
	 *
	 * ```
	 * import { parents, qs } from 'dom-utils';
	 *
	 * const listItem = qs('li.list-item');
	 *
	 * const parentsEls = parents(listItem);
	 *
	 * const parentLists = parents(listItem, 'ul');
	 * ```
	 *
	 * @name parents
	 * @function
	 * @param {Element} element - Source element
	 * @param {string} [selector] - A string containing a selector expression to match elements against.
	 * @returns {Array}
	 */
	var parents = exports.parents = function parents(element, selector) {
	  var elements = [];
	  var hasSelector = selector !== undefined;
	  var parent = element.parentElement;

	  while (parent !== null && parent !== document) {
	    if (!hasSelector || parent.matches(selector)) {
	      elements.push(parent);
	    }

	    parent = parent.parentElement;
	  }

	  return elements;
	};

	/**
	 * Gets the first element that matches `selector` by testing the element itself and traversing up through its ancestors in the DOM tree.
	 *
	 * #### Example:
	 *
	 * ```
	 * import { closest, qs } from 'dom-utils';
	 *
	 * const listItem = qs('li.list-item');
	 *
	 * const list = closest(listItem, 'ul');
	 * ```
	 *
	 * @name closest
	 * @function
	 * @param {Element} element - Source element
	 * @param {string} selector - A string containing a CSS selector expression to match
	 * @param {boolean} [checkSelf=true] - try to match the selector on `element` too.
	 * @returns {*}
	 */
	var closest = exports.closest = function closest(element, selector) {
	  var checkSelf = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	  var parent = checkSelf ? element : element.parentElement;

	  while (parent && parent !== document) {
	    if (parent.matches(selector)) {
	      return parent;
	    }
	    parent = parent.parentElement;
	  }

	  return undefined;
	};

	/**
	 * Adds a new class to the element
	 *
	 * #### Example
	 *
	 * ```
	 * import { addClass, byId } from 'dom-utils';
	 *
	 * const content = byId('content');
	 *
	 * addClass(content, 'new-class');
	 * ```
	 *
	 * @name addClass
	 * @function
	 * @param {Element} element - Target element
	 * @param {string} className - Class to add
	 */

	/**
	 * Removes a new class to the element
	 *
	 * #### Example
	 *
	 * ```
	 * import { removeClass, byId } from 'dom-utils';
	 *
	 * const content = byId('content');
	 *
	 * removeClass(content, 'remove-me');
	 * ```
	 *
	 * @name removeClass
	 * @function
	 * @param {Element} element - Target element
	 * @param {string} className - Class to remove
	 */

	/**
	 * Checks if an element as a given class
	 *
	 * #### Example
	 *
	 * ```
	 * import { hasClass, byId } from 'dom-utils';
	 *
	 * const content = byId('content');
	 *
	 * if (hasClass(content, 'remove-me')) {
	 *     //...
	 * }
	 * ```
	 *
	 * @name hasClass
	 * @function
	 * @param {Element} element - Target element
	 * @param {string} className - Class to check
	 */
	var addClass = _desandroClassie2.default.addClass;
	var removeClass = _desandroClassie2.default.removeClass;
	var hasClass = _desandroClassie2.default.hasClass;

	/**
	 * If class exists then removes it, if not, then adds it.
	 * When the second argument is present and is true, add specified class value, if is false removes it.
	 *
	 * #### Example
	 *
	 * ```
	 * import { toggleClass, byId } from 'dom-utils';
	 *
	 * // html: <div id="content"></div>
	 * const content = byId('content');
	 *
	 * toggleClass(content, 'random-class')
	 * // html: <div id="content" class="random-class"></div>
	 *
	 * toggleClass(content, 'random-class')
	 * // html: <div id="content"></div>
	 *
	 * toggleClass(content, 'random-class')
	 * // html: <div id="content" class="random-class"></div>
	 *
	 * toggleClass(content, 'random-class', true)
	 * // html: <div id="content" class="random-class"></div>
	 * ```
	 *
	 * @name toggleClass
	 * @function
	 * @param {Element} element - Target element
	 * @param {string} className - Class to toggle
	 * @param {boolean} [toggle] - Force add or removal of the class
	 */

	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.hasClass = hasClass;
	var toggleClass = exports.toggleClass = function toggleClass(element, className, toggle) {
	  var fn = toggle === undefined ? 'toggle' : toggle ? 'add' : 'remove'; //eslint-disable-line no-nested-ternary
	  _desandroClassie2.default[fn](element, className);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var CAMEL_CASE_REGEXP = /-([a-z])/ig;

	/**
	 * # Utility Functions
	 */

	/**
	 * Converts a string from *dash-case* to *camelCase*
	 *
	 * @name toCamelCase
	 * @function
	 * @param {string} str - String to convert
	 */
	var toCamelCase = exports.toCamelCase = function toCamelCase(str) {
	    return str.replace(CAMEL_CASE_REGEXP, function (match) {
	        return match[1].toUpperCase();
	    });
	};

	/**
	 * Determines whether its argument represents a JavaScript number
	 *
	 * @name isNumeric
	 * @function
	 * @param {number|string} obj - Value to check
	 * @returns {boolean}
	 * @see https://api.jquery.com/jQuery.isNumeric/
	 */
	var isNumeric = exports.isNumeric = function isNumeric(obj) {
	    return (typeof obj === 'number' || typeof obj === 'string') && !isNaN(obj - parseFloat(obj));
	};

	/**
	 * Parses a string and tries to convert it in a boolean or a number
	 *
	 * @name parseString
	 * @function
	 * @private
	 * @param {string} value - Value o parse
	 * @returns {*}
	 */
	var parseString = exports.parseString = function parseString(value) {
	    if (typeof value !== 'string') {
	        return undefined;
	    }

	    var v = value.trim();

	    if (v === 'true' || v === 'false') {
	        return v === 'true';
	    }
	    if (isNumeric(v)) {
	        return parseFloat(v);
	    }
	    return v;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _dom = __webpack_require__(1);

	var forceCaptureEvents = ['focus', 'blur'];

	var eventsRegistry = {};

	/**
	 * # DOM Event Handlers
	 */

	/**
	 *
	 * Event namespace
	 *
	 * @type {object}
	 */
	var events = {

	    /**
	     * Adds an event handler and returns the unbind function
	     *
	     * #### Example:
	     *
	     * ```
	     * import { byId } from 'dom-utils';
	     * import events from 'dom-utils/lib/events';
	     *
	     * const btn = byId('submit');
	     *
	     * const unbind = events.on(btn, 'click', (e) => { ... });
	     *
	     * //later on...
	     *
	     * unbind();
	     * ```
	     *
	     * @method
	     * @param {Element} element - Target element
	     * @param {string} event - Event to listen for
	     * @param {function} handler - Event handler
	     * @param {boolean} [capture=false] - Whether to use event capturing
	     * @returns {function}
	     */
	    on: function on(element, event, handler) {
	        var _this = this;

	        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];


	        element.addEventListener(event, handler, capture);

	        var offHandler = function offHandler() {
	            return _this.off(element, event, handler, capture);
	        };

	        var registryEl = eventsRegistry[element] || (eventsRegistry[element] = {});
	        if (Array.isArray(registryEl[event])) {
	            registryEl[event].push(handler);
	        } else {
	            registryEl[event] = [handler];
	        }

	        return offHandler;
	    },


	    /**
	     * Removes an event handler
	     *
	     * #### Example:
	     *
	     * ```
	     * import { byId } from 'dom-utils';
	     * import events from 'dom-utils/lib/events';
	     *
	     * const btn = byId('submit');
	     * const handler = (e) => { ... }
	     *
	     * events.on(btn, 'click', handler);
	     *
	     * //later on...
	     *
	     * events.off(btn, 'click', handler);
	     * ```
	     *
	     * @method
	     * @param {Element} element - Target element
	     * @param {string} event - Event to remove
	     * @param {function} handler - Event handler
	     * @param {boolean} [capture=false] - Whether to use event capturing
	     */
	    off: function off(element, event, handler) {
	        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];


	        var registryEl = eventsRegistry[element] || (eventsRegistry[element] = {});
	        if (Array.isArray(registryEl[event])) {
	            if (handler !== undefined) {
	                var handlerIdx = registryEl[event].indexOf(handler);
	                if (handlerIdx !== -1) {
	                    registryEl.splice(handlerIdx, 1);
	                }
	                element.removeEventListener(event, handler, capture);
	            } else {
	                var handleFn = registryEl[event].pop();
	                while (handleFn) {
	                    element.removeEventListener(event, handleFn, capture);
	                    handleFn = registryEl[event].pop();
	                }
	            }
	        }
	    },


	    /**
	     * Attaches an event handler for all elements that match the selector, now or in the future, based on a specific root element.
	     * Returns an unbind function
	     *
	     * #### Example:
	     *
	     * ```
	     * import { byId } from 'dom-utils';
	     * import events from 'dom-utils/lib/events';
	     *
	     * const nav = byId('nav');
	     * const handler = (e) => {
	     *      //e.delegateTarget is the clicked element
	     * }
	     *
	     * const undelegate = events.delegate(nav, 'a.nav-items' 'click', handler);
	     *
	     * //later on...
	     *
	     * undelegate();
	     * ```
	     *
	     * @method
	     * @param {Element} element - Target element
	     * @param {string} selector - A selector to filter the elements that trigger the event
	     * @param {string} event - Event to listen for
	     * @param {function} handler - Event handler
	     * @param {boolean} [capture=true] - Whether to use event capturing
	     * @returns {function}
	     */
	    delegate: function delegate(element, selector, event, handler) {
	        var capture = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

	        if (forceCaptureEvents.indexOf(event) !== -1) {
	            capture = true; // eslint-disable-line no-param-reassign
	        }

	        var delegateHandler = function delegateHandler(e) {
	            var target = e.target || e.srcElement;
	            e.delegateTarget = (0, _dom.closest)(target, selector, true);
	            if (e.delegateTarget) {
	                handler.call(element, e);
	            }
	        };
	        delegateHandler.originalHandler = handler;
	        delegateHandler.selector = selector;

	        return this.on(element, event, delegateHandler, capture);
	    },


	    /**
	     * Removes an event handler for all elements that match the selector, now or in the future, based on a specific root element.
	     *
	     * #### Example:
	     *
	     * ```
	     * import { byId } from 'dom-utils';
	     * import events from 'dom-utils/lib/events';
	     *
	     * const nav = byId('nav');
	     * const handler = (e) => {
	     *      //e.delegateTarget is the clicked element
	     * }
	     *
	     * events.delegate(nav, 'a.nav-items' 'click', handler);
	     *
	     * //later on...
	     *
	     * events.undelegate(nav, 'a.nav-items' 'click', handler);
	     * ```
	     *
	     * @method
	     * @param {Element} element - Target element
	     * @param {string} selector - A selector to filter the elements that trigger the event
	     * @param {string} event - Event to listen for
	     * @param {function} handler - Event handler
	     * @param {boolean} [capture=true] - Whether to use event capturing
	     * @returns {function}
	     */
	    undelegate: function undelegate(element, selector, event, handler) {
	        var capture = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

	        if (forceCaptureEvents.indexOf(event) !== -1) {
	            capture = true; // eslint-disable-line no-param-reassign
	        }

	        var registryEl = eventsRegistry[element] || (eventsRegistry[element] = {});

	        if (Array.isArray(registryEl[event])) {

	            var delegateHandler = registryEl[event].find(function (h) {
	                return h.originalHandler === handler && h.selector === selector;
	            });

	            if (typeof delegateHandler === 'function') {
	                this.off(element, event, delegateHandler, capture);
	            }
	        }
	    }
	};

	exports.default = events;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.toNodes = undefined;

	var _classCallCheck2 = __webpack_require__(6);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(7);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _dom = __webpack_require__(1);

	var _utils = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Chainable *jQuery-like* list of nodes
	 *
	 * @name Nodes
	 * @class
	 * @param {string|array|Nodes} elements - A CSS string, list or array of elements
	 * @param {Element|Node} [ctx=document] - Root element. Defaults to `document`
	 */
	var Nodes = function () {

	    /**
	     * Constructor
	     */
	    function Nodes(elements) {
	        var ctx = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
	        (0, _classCallCheck3.default)(this, Nodes);

	        this.els = typeof elements === 'string' ? (0, _dom.qsa)(elements, ctx) : (0, _dom.toArray)(elements);
	    }

	    /**
	     * The number of elements in the list
	     *
	     * @type {number}
	     * @returns {number}
	     */


	    /**
	     * Returns an array of elements
	     *
	     * @returns {Array}
	     */
	    Nodes.prototype.toArray = function toArray() {
	        return this.els;
	    };

	    /**
	     * Returns an element at the given index or `undefined`
	     *
	     * @param {number} index - Element index
	     * @returns {Element|undefined}
	     */


	    Nodes.prototype.eq = function eq(index) {
	        return this.els[index];
	    };

	    /**
	     * Returns the index of an element in the current list or `-1` if not found
	     *
	     * @param {Element} target - Target element
	     * @returns {number}
	     */


	    Nodes.prototype.indexOf = function indexOf(target) {
	        return this.els.indexOf(target);
	    };

	    /**
	     * Gets or sets and attribute on the set of elements
	     *
	     * @param {string} attr - Attribute to set
	     * @param {*} [value] - Value to set. If a function, it will receive every element and its index as arguments
	     * @returns {*|Nodes}
	     */


	    Nodes.prototype.attr = function attr(_attr, value) {
	        var els = this.els;

	        var attrStr = (0, _utils.toCamelCase)(_attr);
	        if (value !== undefined) {
	            var iteratorFn = typeof value === 'function' ? value : function (el) {
	                return el[attrStr] = value;
	            };
	            this.els.forEach(iteratorFn);
	            return this;
	        }
	        var el = els.length > 0 ? els[0] : undefined;
	        var hook = NodeList.attrHooks[attrStr];
	        if (!el) {
	            return undefined;
	        }
	        return hook ? hook(el) : el[attrStr];
	    };

	    /**
	     * Adds a class to the elements
	     *
	     * @param {string} className - CSS class to add
	     * @returns {Nodes}
	     */


	    Nodes.prototype.addClass = function addClass(className) {
	        this.els.forEach(function (el) {
	            return (0, _dom.addClass)(el, className);
	        });
	        return this;
	    };

	    /**
	     * Removes a class from the elements
	     *
	     * @param {string} className - CSS class to add
	     * @returns {Nodes}
	     */


	    Nodes.prototype.removeClass = function removeClass(className) {
	        this.els.forEach(function (el) {
	            return (0, _dom.removeClass)(el, className);
	        });
	        return this;
	    };

	    /**
	     * Toggles a class on the elements
	     *
	     * @param {string} className - CSS class to add
	     * @param {boolean} [toggle] - Force add or removal of the class
	     * @returns {Nodes}
	     */


	    Nodes.prototype.toggleClass = function toggleClass(className, toggle) {
	        this.els.forEach(function (el) {
	            return (0, _dom.toggleClass)(el, className, toggle);
	        });
	        return this;
	    };

	    (0, _createClass3.default)(Nodes, [{
	        key: 'length',
	        get: function get() {
	            return this.els.length;
	        }
	    }]);
	    return Nodes;
	}();

	/**
	 * HTML to DOM attrubute translation hooks
	 *
	 * @static
	 * @type {object}
	 */


	exports.default = Nodes;
	Nodes.attrHooks = {
	    'for': function _for(el) {
	        return el.htmlFor;
	    },
	    'class': function _class(el) {
	        return el.className;
	    }
	};

	/**
	 * Returns a new `Nodes` instance
	 *
	 * @param elements
	 * @param ctx
	 */
	var toNodes = exports.toNodes = function toNodes(elements, ctx) {
	    return new Nodes(elements, ctx);
	};

	Nodes.toNodes = toNodes;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(8);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(9), __esModule: true };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	var $Object = __webpack_require__(13).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(11);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(21), 'Object', {defineProperty: __webpack_require__(17).f});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(12)
	  , core      = __webpack_require__(13)
	  , ctx       = __webpack_require__(14)
	  , hide      = __webpack_require__(16)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 12 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(15);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(17)
	  , createDesc = __webpack_require__(25);
	module.exports = __webpack_require__(21) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(18)
	  , IE8_DOM_DEFINE = __webpack_require__(20)
	  , toPrimitive    = __webpack_require__(24)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(21) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(21) && !__webpack_require__(22)(function(){
	  return Object.defineProperty(__webpack_require__(23)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(22)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(19)
	  , document = __webpack_require__(12).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(19);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }
/******/ ])
});
;