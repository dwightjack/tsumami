/*! DOM Utilities - v0.2.0 - 2016-09-01
* Copyright (c) 2016 AQuest; Licensed MIT */
'use strict';

exports.__esModule = true;
exports.toNodes = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dom = require('./dom');

var _utils = require('./utils');

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