'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('./dom');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        _classCallCheck(this, Nodes);

        this.els = typeof elements === 'string' ? (0, _dom.qsa)(elements, ctx) : (0, _dom.toArray)(elements);
    }

    /**
     * The number of elements in the list
     *
     * @type {number}
     * @returns {number}
     */


    /**
     * Returns a shallow copy array of elements in the set
     *
     * @returns {Array}
     */
    Nodes.prototype.toArray = function toArray() {
        return [].concat(this.els);
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
        if (value !== undefined) {
            this.forEach(function (el, i) {
                return el.setAttribute(_attr, (0, _utils.result)(value, el, i));
            });
            return this;
        }
        var el = this.eq(0);
        if (!el) {
            return undefined;
        }
        return el.getAttribute(_attr);
    };

    /**
     * Adds a class to the elements
     *
     * @param {string|function} className - CSS class to add or function returning the class string (signature: `(element, index) => {} `)
     * @returns {Nodes}
     */


    Nodes.prototype.addClass = function addClass(className) {
        this.forEach(function (el, i) {
            return (0, _dom.addClass)(el, (0, _utils.result)(className, el, i));
        });
        return this;
    };

    /**
     * Removes a class from the elements
     *
     * @param {string|function} className - CSS class to remove or function returning the class string (signature: `(element, index) => {} `)
     * @returns {Nodes}
     */


    Nodes.prototype.removeClass = function removeClass(className) {
        this.forEach(function (el, i) {
            return (0, _dom.removeClass)(el, (0, _utils.result)(className, el, i));
        });
        return this;
    };

    /**
     * Toggles a class on the elements
     *
     * @param {string|function} className - CSS class to toggle or function returning the class string (signature: `(element, index) => {} `)
     * @param {boolean|function} [toggle] - Force add or removal of the class or function returning a boolean (signature: `(element, index) => {} `)
     * @returns {Nodes}
     */


    Nodes.prototype.toggleClass = function toggleClass(className, toggle) {
        this.forEach(function (el, i) {
            return (0, _dom.toggleClass)(el, (0, _utils.result)(className, el, i), (0, _utils.result)(toggle, el, i));
        });
        return this;
    };

    _createClass(Nodes, [{
        key: 'length',
        get: function get() {
            return this.els.length;
        }
    }]);

    return Nodes;
}();

exports.default = Nodes;
module.exports = exports['default'];