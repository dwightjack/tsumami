const CAMEL_CASE_REGEXP = /-([a-z])/ig;
const MAX_SAFE_INTEGER = 9007199254740991;

// borrowed from lodash
function isLength(value) {
    return typeof value === 'number' &&
      value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}

// borrowed from lodash
function isArrayLike(value) {
    return value != null && typeof value !== 'function' && isLength(value.length);
}

const arrayFrom = Array.from || ((obj) => Array.prototype.slice.call(obj));

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
 * Converts array-like objects into an array
 *
 * @name toArray
 * @function
 * @private
 * @param {*} - obj Object to convert to an array
 * @returns {array}
 */
export const toArray = (obj) => {
    if (isArrayLike(obj)) {
        return arrayFrom(obj);
    }
    throw new TypeError('Object is not array-like');
};