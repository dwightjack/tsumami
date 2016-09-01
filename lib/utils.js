/*! DOM Utilities - v0.2.0 - 2016-09-01
* Copyright (c) 2016 AQuest; Licensed MIT */
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
 * Parses a string and tries to convert it in a boolean or a number
 *
 * @name parseString
 * @function
 * @private
 * @param {string} value - Value o parse
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
    return v;
};