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
 * If `obj` is a function it will execute it with passed in arguments, else returns `obj`
 *
 * @name result
 * @function
 * @param {string} obj - The object to evaluates
 * @param {...arguments} - Optional arguments
 * @return {*}
 */
export const result = (obj, ...args) => (typeof obj === 'function' ? obj(...args) : obj);


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
export const arrayFrom = Array.from || ((obj) => Array.prototype.slice.call(obj));