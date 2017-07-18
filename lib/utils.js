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
 * If `obj` is a function it will execute it with passed in arguments, else returns `obj`
 *
 * @name result
 * @function
 * @param {string} obj - The object to evaluates
 * @param {...arguments} - Optional arguments
 * @return {*}
 */
var result = exports.result = function result(obj) {
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
var isNumeric = exports.isNumeric = function isNumeric(obj) {
    return (typeof obj === 'number' || typeof obj === 'string') && !isNaN(obj - parseFloat(obj));
};

/**
 * Accepts a string and tries to parse it as boolean, number or JSON
 *
 * @name parseString
 * @function
 * @private
 * @param {string} value - Value to parse
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
    try {
        return JSON.parse(v);
    } catch (e) {
        return v;
    }
};

/**
 * Cross-browser `Array.from` implementation
 *
 * @name arrayFrom
 * @function
 * @private
 * @param {*} - obj Object to convert to an array
 * @returns {array}
 */
var arrayFrom = exports.arrayFrom = Array.from || function (obj) {
    return Array.prototype.slice.call(obj);
};