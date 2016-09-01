const CAMEL_CASE_REGEXP = /-([a-z])/ig;

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
export const toCamelCase = (str) => str.replace(CAMEL_CASE_REGEXP, (match) => match[1].toUpperCase());

/**
 * Determines whether its argument represents a JavaScript number
 *
 * @name isNumeric
 * @function
 * @param {number|string} obj - Value to check
 * @returns {boolean}
 * @see https://api.jquery.com/jQuery.isNumeric/
 */
export const isNumeric = (obj) => {
    return ( typeof obj === 'number' || typeof obj === 'string' ) && !isNaN( obj - parseFloat( obj ) );
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
export const parseString = (value) => {
    if (typeof value !== 'string') {
        return undefined;
    }

    const v = value.trim();

    if (v === 'true' || v === 'false') {
        return v === 'true';
    }
    if (isNumeric(v)) {
        return parseFloat(v);
    }
    return v;
};