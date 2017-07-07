
/**! dom-utils - v1.0.0
 * https://github.com/dwightjack/dom-utils
 * Copyright (c) 2017 - Marco Solazzi;
 * Licensed MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('desandro-classie')) :
	typeof define === 'function' && define.amd ? define(['desandro-classie'], factory) :
	(global.domUtils = factory(global.classie));
}(this, (function (classie) { 'use strict';

classie = classie && 'default' in classie ? classie['default'] : classie;

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
var toCamelCase = function toCamelCase(str) {
  return str.replace(CAMEL_CASE_REGEXP, function (match) {
    return match[1].toUpperCase();
  });
};

/**
 * If `obj` is a function it will execute it with passed in arguments, else returns `obj`
 *
 * @name result
 * @function
 * @param {string} obj - The object to evaluates
 * @param {...arguments} - Optional arguments
 * @return {*}
 */
var result = function result(obj) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return typeof obj === 'function' ? obj.apply(undefined, args) : obj;
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
var isNumeric = function isNumeric(obj) {
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
var parseString = function parseString(value) {
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

/**
 * Cross-browser `Array.from` implementation
 *
 * @name arrayFrom
 * @function
 * @private
 * @param {*} - obj Object to convert to an array
 * @returns {srray}
 */
var arrayFrom = Array.from || function (obj) {
  return Array.prototype.slice.call(obj);
};

var utils = Object.freeze({
	toCamelCase: toCamelCase,
	result: result,
	isNumeric: isNumeric,
	parseString: parseString,
	arrayFrom: arrayFrom
});

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
var byId = function byId(id) {
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
var byClassName = function byClassName(className) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return arrayFrom(ctx.getElementsByClassName(className));
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
var qs = function qs(selector) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
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
var qsa = function qsa(selector) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return arrayFrom(ctx.querySelectorAll(selector));
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
var data = function data(element, attr) {
  return element.hasAttribute('data-' + attr) ? parseString(element.getAttribute('data-' + attr)) : undefined;
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
var toArray = function toArray(element) {
  if (Array.isArray(element)) {
    return element;
  }
  return element instanceof NodeList ? arrayFrom(element) : [element];
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
var parents = function parents(element, selector) {
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
var closest = function closest(element, selector) {
  var checkSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

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
var addClass = classie.addClass;
var removeClass = classie.removeClass;
var hasClass = classie.hasClass;

var toggleClass = function toggleClass(element, className, toggle) {
  var fn = toggle === undefined ? 'toggle' : toggle ? 'add' : 'remove'; //eslint-disable-line no-nested-ternary
  classie[fn](element, className);
};

var dom = Object.freeze({
	byId: byId,
	byClassName: byClassName,
	qs: qs,
	qsa: qsa,
	data: data,
	toArray: toArray,
	parents: parents,
	closest: closest,
	addClass: addClass,
	removeClass: removeClass,
	hasClass: hasClass,
	toggleClass: toggleClass
});

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

        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


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
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


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
        var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        if (forceCaptureEvents.indexOf(event) !== -1) {
            capture = true; // eslint-disable-line no-param-reassign
        }

        var delegateHandler = function delegateHandler(e) {
            var target = e.target || e.srcElement;
            e.delegateTarget = closest(target, selector, true);
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
        var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        if (forceCaptureEvents.indexOf(event) !== -1) {
            capture = true; // eslint-disable-line no-param-reassign
        }

        var registryEl = eventsRegistry[element] || (eventsRegistry[element] = {});

        if (Array.isArray(registryEl[event])) {

            var delegateHandler = registryEl[event].filter(function (h) {
                return h.originalHandler === handler && h.selector === selector;
            })[0];

            if (typeof delegateHandler === 'function') {
                this.off(element, event, delegateHandler, capture);
            }
        }
    }
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * Chainable *jQuery-like* list of nodes
 *
 * @name Nodes
 * @class
 * @param {string|array|Nodes} elements - A CSS string, list or array of elements
 * @param {Element|Node} [ctx=document] - Root element. Defaults to `document`
 */

var Nodes = function () {
    Nodes.toNodes = function toNodes() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new (Function.prototype.bind.apply(Nodes, [null].concat(args)))();
    };

    /**
     * Constructor
     */


    function Nodes(elements) {
        var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
        classCallCheck(this, Nodes);

        this.els = typeof elements === 'string' ? qsa(elements, ctx) : toArray(elements);
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
    Nodes.prototype.toArray = function toArray$$1() {
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
     * Iterates `iterator` function on every element in the set
     *
     * @param {function} iterator - Iterator function
     * @returns {Element|undefined}
     */


    Nodes.prototype.forEach = function forEach(iterator) {
        this.els.forEach(iterator);
        return this;
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

        if (value !== undefined) {
            this.forEach(function (el) {
                return el.setAttribute(_attr, result(value, el));
            });
            return this;
        }
        var el = els.length > 0 ? els[0] : undefined;
        if (!el) {
            return undefined;
        }
        return el.getAttribute(_attr);
    };

    /**
     * Adds a class to the elements
     *
     * @param {string} className - CSS class to add
     * @returns {Nodes}
     */


    Nodes.prototype.addClass = function addClass$$1(className) {
        this.forEach(function (el) {
            return addClass(el, className);
        });
        return this;
    };

    /**
     * Removes a class from the elements
     *
     * @param {string} className - CSS class to add
     * @returns {Nodes}
     */


    Nodes.prototype.removeClass = function removeClass$$1(className) {
        this.forEach(function (el) {
            return removeClass(el, className);
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


    Nodes.prototype.toggleClass = function toggleClass$$1(className, toggle) {
        this.forEach(function (el) {
            return toggleClass(el, className, toggle);
        });
        return this;
    };

    createClass(Nodes, [{
        key: 'length',
        get: function get$$1() {
            return this.els.length;
        }
    }]);
    return Nodes;
}();

var umd = {
    dom: dom, events: events, utils: utils, Nodes: Nodes
};

return umd;

})));
//# sourceMappingURL=index.js.map
