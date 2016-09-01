/*! DOM Utilities - v0.1.0 - 2016-09-01
* Copyright (c) 2016 aQuest; Licensed MIT */
'use strict';

exports.__esModule = true;
exports.toggleClass = exports.hasClass = exports.removeClass = exports.addClass = exports.closest = exports.parents = exports.toArray = exports.data = exports.qsa = exports.qs = exports.byClassName = exports.byId = undefined;

var _desandroClassie = require('desandro-classie');

var _desandroClassie2 = _interopRequireDefault(_desandroClassie);

var _utils = require('./utils');

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