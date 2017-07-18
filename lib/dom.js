'use strict';

exports.__esModule = true;
exports.toggleClass = exports.hasClass = exports.removeClass = exports.addClass = exports.closest = exports.parents = exports.matches = exports.toArray = exports.data = exports.qsa = exports.qs = exports.byClassName = exports.byId = undefined;

var _desandroClassie = require('desandro-classie');

var _desandroClassie2 = _interopRequireDefault(_desandroClassie);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchesProto = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function matchesSelector(s) {
  var matches = (this.document || this.ownerDocument).querySelectorAll(s);
  var i = matches.length;
  while (--i >= 0 && matches.item(i) !== this) {} //eslint-disable-line
  return i > -1;
};

/**
 * # DOM Utility Functions
 */

/**
 * Returns a reference to the element by its ID.
 *
 * #### Example:
 *
 * ```
 * import { byId } from 'tsumami';
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
 * import { byClassName } from 'tsumami';
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
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return (0, _utils.arrayFrom)(ctx.getElementsByClassName(className));
};

/**
 * Returns the first element within the document that matches the specified group of selectors
 *
 * #### Example:
 *
 * ```
 * import { qs } from 'tsumami';
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
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return ctx.querySelector(selector);
};

/**
 * Returns a list of the elements within the document that match the specified group of selectors
 *
 * #### Example:
 *
 * ```
 * import { qsa } from 'tsumami';
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
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return (0, _utils.arrayFrom)(ctx.querySelectorAll(selector));
};

/**
 * Returns a parsed data attribute from the passed-in node. If not found returns `null`
 *
 * #### Example:
 *
 * ```
 * import { byId, data } from 'tsumami';
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
 * @param {string} [attr] - Data attribute to retrieve (without the `data-`). If empty will return an object with every `data-` attribute as key.
 * @return {*|null}
 */
var data = exports.data = function data(element, attr) {
  if (attr) {
    return element.hasAttribute('data-' + attr) ? (0, _utils.parseString)(element.getAttribute('data-' + attr)) : undefined;
  }
  var attributes = element.attributes;
  return element.hasAttributes() ? (0, _utils.arrayFrom)(attributes).reduce(function (attrs, a, i) {
    var _ref = attributes[i] || {},
        _ref$name = _ref.name,
        name = _ref$name === undefined ? '' : _ref$name,
        value = _ref.value;

    if (name.indexOf('data-') === 0) {
      var key = (0, _utils.toCamelCase)(name.replace(/^data-/, ''));
      attrs[key] = (0, _utils.parseString)(value); //eslint-disable-line no-param-reassign
    }
    return attrs;
  }, {}) : {};
};

/**
 * Converts passed-in Element or NodeList to an array.
 *
 * #### Example:
 *
 * ```
 * import { toArray } from 'tsumami';
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
  return element instanceof NodeList ? (0, _utils.arrayFrom)(element) : [element];
};

/**
 * Returns `true` if the `element` would be selected by the specified `selector` string; otherwise, returns false.
 *
 * #### Example:
 *
 * ```
 * import { matches, qs } from 'tsumami';
 *
 * const el = qs('.parent .child');
 *
 * if (matches(el, '.parent')) {
 *   // false
 * }
 *
 * if (matches(el, '.parent .child')) {
 *   // true
 * }
 * ```
 *
 * @param {Element} element
 * @param {string} selector
 * @return {boolean}
 */
var matches = exports.matches = function matches(element, selector) {
  return matchesProto.call(element, selector);
};

/**
 * Gets the ancestors of an element, optionally filtered by a selector.
 *
 * #### Example:
 *
 * ```
 * import { parents, qs } from 'tsumami';
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
    if (!hasSelector || matches(parent, selector)) {
      elements.push(parent);
    }
    parent = parent.parentElement;
  }

  return elements;
};

/**
 * Gets the first element that matches `selector` by testing the element itself and traversing up through its ancestors in the DOM tree.
 *
 * Will use native [`Element.prototype.closest`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) if available.
 *
 * #### Example:
 *
 * ```
 * import { closest, qs } from 'tsumami';
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
 * @returns {*}
 */
var closest = exports.closest = Element.prototype.closest || function closest(element, selector) {
  var parent = element;

  while (parent && parent !== document) {
    if (matches(parent, selector)) {
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
 * import { addClass, byId } from 'tsumami';
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
var addClass = exports.addClass = _desandroClassie2.default.add;

/**
 * Removes a new class to the element
 *
 * #### Example
 *
 * ```
 * import { removeClass, byId } from 'tsumami';
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
var removeClass = exports.removeClass = _desandroClassie2.default.remove;

/**
 * Checks if an element as a given class
 *
 * #### Example
 *
 * ```
 * import { hasClass, byId } from 'tsumami';
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
var hasClass = exports.hasClass = _desandroClassie2.default.hasClass;

/**
 * If class exists then removes it, if not, then adds it.
 * When the second argument is present and is true, add specified class value, if is false removes it.
 *
 * #### Example
 *
 * ```
 * import { toggleClass, byId } from 'tsumami';
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
var toggleClass = exports.toggleClass = function toggleClass(element, className, toggle) {
  var fn = toggle === undefined ? 'toggle' : toggle ? 'add' : 'remove'; //eslint-disable-line no-nested-ternary
  _desandroClassie2.default[fn](element, className);
};