import { qsa, toArray, addClass, removeClass, toggleClass } from './dom';
import { result } from './utils';

/**
 * Chainable *jQuery-like* list of nodes
 *
 * #### Example:
 *
 * ```
 * import Nodes from 'tsumami/lib/nodes';
 *
 * const els = new Nodes('.my-class');
 * ```
 *
 * @name Nodes
 * @class
 * @param {string|array|NodeList|Element} elements - A CSS string, list or array of elements
 * @param {Element|Document} [ctx=document] - Root element. Defaults to `document`
 *
 */
export default class Nodes {

    static toNodes(...args) {
        return new Nodes(...args);
    }

    /**
     * Constructor
     */
    constructor(elements, ctx = document) {
        this.els = typeof elements === 'string' ? qsa(elements, ctx) : toArray(elements);
    }

    /**
     * The number of elements in the list
     *
     * #### Example
     * ```
     * import Nodes from 'tsumami/lib/nodes';
     *
     * const els = new Nodes('.my-class');
     *
     * console.log(els.length); // number...
     * ```
     *
     * @type {number}
     * @returns {number}
     */
    get length() {
        return this.els.length;
    }

    /**
     * Returns a shallow copy array of elements in the set
     *
     * #### Example
     * ```
     * import Nodes from 'tsumami/lib/nodes';
     *
     * const els = new Nodes('.my-class');
     *
     * const array = els.toArray();
     * ```
     *
     * @returns {Array}
     */
    toArray() {
        return [...this.els];
    }

    /**
     * Returns an element at the given index or `undefined`
     *
     * #### Example
     * ```
     * import Nodes from 'tsumami/lib/nodes';
     *
     * const els = new Nodes('.my-class');
     *
     * const firstElement = els.eq(0);
     * ```
     *
     * @param {number} index - Element index
     * @returns {Element|undefined}
     */
    eq(index) {
        return this.els[index];
    }

    /**
     * Iterates `iterator` function on every element in the set
     *
     * #### Example
     * ```
     * import Nodes from 'tsumami/lib/nodes';
     * import { addClass } from 'tsumami';
     *
     * const els = new Nodes('.my-class');
     *
     * els.forEach((el, index) => addClass(el, `element-${index}`));
     * ```
     *
     * @param {function} iterator - Iterator function
     * @returns {Element|undefined}
     */
    forEach(iterator) {
        this.els.forEach(iterator);
        return this;
    }

    /**
     * Returns the index of an element in the current list or `-1` if not found
     *
     * #### Example
     * ```
     * import Nodes from 'tsumami/lib/nodes';
     * import { qs } from 'tsumami';
     *
     * const els = new Nodes('.my-class');
     *
     * const firstElement = qs('.my-class');
     *
     * els.indexOf(firstElement) // === 0;
     * ```
     *
     * @param {Element} target - Target element
     * @returns {number}
     */
    indexOf(target) {
        return this.els.indexOf(target);
    }

    /**
     * Gets or sets and attribute on the set of elements
     *
     * #### Example
     * ```
     * import Nodes from 'tsumami/lib/nodes';
     *
     * const els = new Nodes('.my-class');
     *
     * //get the id of the first element in the set
     * const id = els.attr('id');
     *
     * //set as string
     * els.attr('data-str', 'a random string');
     *
     * //set as function
     * els.attr('data-str', (el, index) => `position-${index}`);
     * ```
     *
     * @param {string} attr - Attribute to set
     * @param {*} [value] - Value to set. If a function, it will receive every element and its index as arguments
     * @returns {*|Nodes}
     */
    attr(attr, value) {
        if (value !== undefined) {
            this.forEach((el, i) => el.setAttribute(attr, result(value, el, i)));
            return this;
        }
        const el = this.eq(0);
        if (!el) {
            return undefined;
        }
        return el.getAttribute(attr);
    }

    /**
     * Adds a class to the elements
     *
     * #### Example
     * ```
     * import Nodes from 'tsumami/lib/nodes';
     *
     * const els = new Nodes('.my-class');
     *
     * //set as string
     * els.addClass('another-class');
     *
     * //set as function
     * els.addClass((el, index) => (index === 0 ? 'is-first' : ''));
     * ```
     *
     * @param {string|function} className - CSS class to add or function returning the class string (signature: `(element, index) => {} `)
     * @returns {Nodes}
     */
    addClass(className) {
        this.forEach((el, i) => addClass(el, result(className, el, i)));
        return this;
    }

    /**
     * Removes a class from the elements
     *
     * #### Example
     * ```
     * import Nodes from 'tsumami/lib/nodes';
     *
     * const els = new Nodes('.my-class');
     *
     * //set as string
     * els.removeClass('another-class');
     *
     * //set as function
     * els.removeClass((el, index) => (index === 0 ? 'is-first' : ''));
     * ```
     *
     * @param {string|function} className - CSS class to remove or function returning the class string (signature: `(element, index) => {} `)
     * @returns {Nodes}
     */
    removeClass(className) {
        this.forEach((el, i) => removeClass(el, result(className, el, i)));
        return this;
    }

    /**
     * Toggles a class on the elements
     *
     * #### Example
     * ```
     * import Nodes from 'tsumami/lib/nodes';
     *
     * const els = new Nodes('.my-class');
     *
     * //set as string
     * els.toggleClass('is-active');
     *
     * // force add
     * els.toggleClass('is-active', true);
     *
     * // dynamic class name
     * els.toggleClass((el, index) => `element-${index}`);
     *
     * // dynamic toggle flag
     * els.toggleClass('is-active', (el, index) => index === 0); //added just to the first element
     * ```
     *
     * @param {string|function} className - CSS class to toggle or function returning the class string (signature: `(element, index) => {} `)
     * @param {boolean|function} [toggle] - Force add or removal of the class or function returning a boolean (signature: `(element, index) => {} `)
     * @returns {Nodes}
     */
    toggleClass(className, toggle) {
        this.forEach((el, i) => (
            toggleClass(
                el,
                result(className, el, i),
                result(toggle, el, i))
            )
        );
        return this;
    }

}