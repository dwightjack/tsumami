import { qsa, toArray, addClass, removeClass, toggleClass } from './dom';
import { result } from './utils';

/**
 * Chainable *jQuery-like* list of nodes
 *
 * @name Nodes
 * @class
 * @param {string|array|Nodes} elements - A CSS string, list or array of elements
 * @param {Element|Node} [ctx=document] - Root element. Defaults to `document`
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
     * @type {number}
     * @returns {number}
     */
    get length() {
        return this.els.length;
    }

    /**
     * Returns a shallow copy array of elements in the set
     *
     * @returns {Array}
     */
    toArray() {
        return [...this.els];
    }

    /**
     * Returns an element at the given index or `undefined`
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
     * @param {Element} target - Target element
     * @returns {number}
     */
    indexOf(target) {
        return this.els.indexOf(target);
    }

    /**
     * Gets or sets and attribute on the set of elements
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