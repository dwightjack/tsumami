import classie from 'desandro-classie';

import { parseString, toArray as toArrayUtil, toCamelCase } from './utils';

const ElemProto = Element.prototype;

const matchesProto = Element.prototype.matches ||
        ElemProto.matchesSelector ||
        ElemProto.mozMatchesSelector ||
        ElemProto.msMatchesSelector ||
        ElemProto.oMatchesSelector ||
        ElemProto.webkitMatchesSelector ||
        function matchesSelector(s) {
            const matches = (this.document || this.ownerDocument).querySelectorAll(s);
            let i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) { } //eslint-disable-line
            return i > -1;
        };

/**
 * # DOM Utility Functions
 */


/**
 * Returns a reference to an element by its ID.
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
export const byId = (id) => document.getElementById(id);

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
export const byClassName = (className, ctx = document) => toArrayUtil(ctx.getElementsByClassName(className));

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
export const qs = (selector, ctx = document) => ctx.querySelector(selector);

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
export const qsa = (selector, ctx = document) => toArrayUtil(ctx.querySelectorAll(selector));

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
 * const name = data(content, 'name'); // "my-content"
 * const idx = data(content, 'idx'); // 1
 * const bool = data(content, 'bool'); // false
 * ```
 *
 * @name data
 * @function
 * @param {Element} element - DOM Element
 * @param {string} [attr] - Data attribute to retrieve (without the `data-`). If empty will return an object with every `data-` attribute as key.
 * @return {*}
 */
export const data = (element, attr) => {
    if (attr) {
        return element.hasAttribute('data-' + attr) ? parseString(element.getAttribute('data-' + attr)) : undefined;
    }
    const attributes = element.attributes;
    return element.hasAttributes() ? toArrayUtil(attributes).reduce((attrs, a, i) => {
        const { name = '', value } = attributes[i] || {};
        if (name.indexOf('data-') === 0) {
            const key = toCamelCase(name.replace(/^data-/, ''));
            attrs[key] = parseString(value); //eslint-disable-line no-param-reassign
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
export const toArray = (element) => {
    if (Array.isArray(element)) {
        return element;
    }
    return (element instanceof NodeList) ? toArrayUtil(element) : [element];
};

/**
 * Returns `true` if `element` would be selected by the specified `selector` string; otherwise, returns false.
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
 * @name matches
 * @param {Element} element
 * @param {string} selector
 * @return {boolean}
 */
export const matches = (element, selector) => matchesProto.call(element, selector);



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
export const parents = (element, selector) => {
    const elements = [];
    const hasSelector = selector !== undefined;
    let parent = element.parentElement;

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
 * Returns `null` if nothing matches.
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
const closestProto = ElemProto.closest;
export const closest = closestProto ? (element, selector) => closestProto.call(element, selector) : function closest(element, selector) {
    let parent = element;

    while (parent && parent !== document) {
        if (matches(parent, selector)) {
            return parent;
        }
        parent = parent.parentElement;
    }

    return null;
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
export const addClass = classie.add;

/**
 * Removes a class from the element
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
export const removeClass = classie.remove;

/**
 * Checks if an element has a given class
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
export const hasClass = classie.hasClass;

/**
 * Toggle a class on the element.
 *
 * If class exists then removes it, if not, then adds it.
 * When the second argument is present and is `true`, adds specified class value, if is `false` removes it.
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
export const toggleClass = (element, className, toggle) => {
    const fn = toggle === undefined ? 'toggle' : (toggle ? 'add' : 'remove'); //eslint-disable-line no-nested-ternary
    classie[fn](element, className);
};