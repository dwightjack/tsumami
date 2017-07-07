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
     * Returns an array of elements
     *
     * @returns {Array}
     */
    toArray() {
        return this.els;
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
        const {els} = this;
        if (value !== undefined) {
            this.forEach((el) => el.setAttribute(attr, result(value, el)));
            return this;
        }
        const el = els.length > 0 ? els[0] : undefined;
        if (!el) {
            return undefined;
        }
        return el.getAttribute(attr);
    }

    /**
     * Adds a class to the elements
     *
     * @param {string} className - CSS class to add
     * @returns {Nodes}
     */
    addClass(className) {
        this.forEach((el) => (addClass(el, className)));
        return this;
    }

    /**
     * Removes a class from the elements
     *
     * @param {string} className - CSS class to add
     * @returns {Nodes}
     */
    removeClass(className) {
        this.forEach((el) => (removeClass(el, className)));
        return this;
    }

    /**
     * Toggles a class on the elements
     *
     * @param {string} className - CSS class to add
     * @param {boolean} [toggle] - Force add or removal of the class
     * @returns {Nodes}
     */
    toggleClass(className, toggle) {
        this.forEach((el) => (toggleClass(el, className, toggle)));
        return this;
    }
}

/**
 * Returns a new `Nodes` instance
 *
 * @param elements
 * @param ctx
 */
export const toNodes = (elements, ctx) => new Nodes(elements, ctx);

Nodes.toNodes = toNodes;