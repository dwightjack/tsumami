import expect from 'expect';

import * as utils from '../src/utils';

describe('utils.js', () => {

    describe('`toCamelCase()`', () => {

        it('should convert a dashed string to camelCase', () => {
            const str = 'this-is-a-string';
            const expected = 'thisIsAString';
            expect(utils.toCamelCase(str)).toBe(expected);
        });

        it('should preserve spaces and chars case', () => {
            const str = 'this-is a-stRing';
            const expected = 'thisIs aStRing';
            expect(utils.toCamelCase(str)).toBe(expected);
        });

    });

    describe('`result()`', () => {

        it('should return any non-function value', () => {
            const arr = [];
            const obj = {};
            expect(utils.result(1)).toBe(1);
            expect(utils.result('str')).toBe('str');
            expect(utils.result(arr)).toBe(arr);
            expect(utils.result(obj)).toBe(obj);
        });

        it('should execute a passed in function using other arguments as function parameters', () => {
            const spy = expect.createSpy().andReturn('stub');

            const result = utils.result(spy, 1, 'test');

            expect(result).toBe('stub');
            expect(spy).toHaveBeenCalledWith(1, 'test');
        });

    });

    describe('`isNumeric()`', () => {

        //https://github.com/jquery/jquery/blob/master/test/unit/core.js
        it('should return `true` on negative integer string', () => {
            expect(utils.isNumeric('-10')).toBe(true);
        });

        it('should return `true` on zero string', () => {
            expect(utils.isNumeric('0')).toBe(true);
        });

        it('should return `true` on positive integer string', () => {
            expect(utils.isNumeric('5')).toBe(true);
        });

        it('should return `true` on negative integer number', () => {
            expect(utils.isNumeric(-16)).toBe(true);
        });

        it('should return `true` on zero integer number', () => {
            expect(utils.isNumeric(0)).toBe(true);
        });

        it('should return `true` on positive integer number', () => {
            expect(utils.isNumeric(32)).toBe(true);
        });

        it('should return `true` on negative floating point string', () => {
            expect(utils.isNumeric('-1.6')).toBe(true);
        });

        it('should return `true` on positive floating point string', () => {
            expect(utils.isNumeric('4.536')).toBe(true);
        });

        it('should return `true` on negative floating point number', () => {
            expect(utils.isNumeric(-2.6)).toBe(true);
        });

        it('should return `true` on positive floating point number', () => {
            expect(utils.isNumeric(3.1415)).toBe(true);
        });

        it('should return `true` on very precise floating point number', () => {
            expect(utils.isNumeric(1.5999999999999999)).toBe(true);
        });

        it('should return `true` on exponential notation', () => {
            expect(utils.isNumeric(8e5)).toBe(true);
        });

        it('should return `true` on exponential notation string', () => {
            expect(utils.isNumeric('123e-2')).toBe(true);
        });

        it('should return `true` on legacy octal integer literal string', () => {
            expect(utils.isNumeric('040')).toBe(true);
        });

        it('should return `true` on hexadecimal integer literal string (0x...)', () => {
            expect(utils.isNumeric('0xFF')).toBe(true);
        });

        it('should return `true` on hexadecimal integer literal string (0X...)', () => {
            expect(utils.isNumeric('0Xba')).toBe(true);
        });

        it('should return `true` on hexadecimal integer literal', () => {
            expect(utils.isNumeric(0xFFF)).toBe(true);
        });

        it('Empty string', () => {
            expect(utils.isNumeric('')).toBe(false);
        });

        it('Whitespace characters string', () => {
            expect(utils.isNumeric('        ')).toBe(false);
        });

        it('Tab characters string', () => {
            expect(utils.isNumeric('\t\t')).toBe(false);
        });

        it('Alphanumeric character string', () => {
            expect(utils.isNumeric('abcdefghijklm1234567890')).toBe(false);
        });

        it('Non-numeric character string', () => {
            expect(utils.isNumeric('xabcdefx')).toBe(false);
        });

        it('Boolean true literal', () => {
            expect(utils.isNumeric(true)).toBe(false);
        });

        it('Boolean false literal', () => {
            expect(utils.isNumeric(false)).toBe(false);
        });

        it('Number with preceding non-numeric characters', () => {
            expect(utils.isNumeric('bcfed5.2')).toBe(false);
        });

        it('Number with trailing non-numeric characters', () => {
            expect(utils.isNumeric('7.2acdgs')).toBe(false);
        });

        it('Undefined value', () => {
            expect(utils.isNumeric(undefined)).toBe(false);
        });

        it('Null value', () => {
            expect(utils.isNumeric(null)).toBe(false);
        });

        it('NaN value', () => {
            expect(utils.isNumeric(NaN)).toBe(false);
        });

        it('Infinity primitive', () => {
            expect(utils.isNumeric(Infinity)).toBe(false);
        });

        it('Positive Infinity', () => {
            expect(utils.isNumeric(Number.POSITIVE_INFINITY)).toBe(false);
        });

        it('Negative Infinity', () => {
            expect(utils.isNumeric(Number.NEGATIVE_INFINITY)).toBe(false);
        });

        it('Empty object', () => {
            expect(utils.isNumeric({})).toBe(false);
        });

        it('Empty array', () => {
            expect(utils.isNumeric([])).toBe(false);
        });

        it('Array with one number', () => {
            expect(utils.isNumeric([42])).toBe(false);
        });

        it('Instance of a function', () => {
            expect(utils.isNumeric(() => {})).toBe(false);
        });

        it('Instance of a Date', () => {
            expect(utils.isNumeric(new Date())).toBe(false);
        });
    });


    describe('`parseString()`', () => {

        it('should accept just string values', () => {

            const ps = utils.parseString;

            expect(ps([])).toBe(undefined);
            expect(ps({})).toBe(undefined);
            expect(ps(10)).toBe(undefined);
            expect(ps(true)).toBe(undefined);
            expect(ps(null)).toBe(undefined);
            expect(ps(undefined)).toBe(undefined);
            expect(ps('string')).toBeA('string');
        });

        it('should return string value', () => {
            expect(utils.parseString('test')).toBe('test');
        });

        it('should return trimmed string value', () => {
            expect(utils.parseString('   trim   ')).toBe('trim');
        });

        it('should parse a numeric value into a float', () => {
            expect(utils.parseString('10')).toBe(10);
            expect(utils.parseString('10.20')).toBe(10.2);
            expect(utils.parseString('8e5')).toBe(8e5);
        });

        it('should parse string booleans in "real" booleans', () => {
            expect(utils.parseString('true')).toBe(true);
            expect(utils.parseString('false')).toBe(false);
        });

        it('should parse JSON strings', () => {

            const obj = { test: 'stub', prop: 10 };
            const str = JSON.stringify(obj);

            expect(utils.parseString(str)).toMatch(obj);
        });
    });


    describe('`toArray()`', () => {

        it('should convert array-like objects to real arrays', () => {
            const obj = {
                0: 'a',
                1: 'b',
                length: 2
            };

            const expected = ['a', 'b'];

            expect(utils.toArray(obj)).toMatch(expected);
        });

        it('should clone an array', () => {
            const arr = [0, 1];
            const result = utils.toArray(arr);

            expect(result).toNotBe(arr);
            expect(result).toMatch(arr);
        });

        it('should split a string', () => {
            const str = 'test';
            const expected = str.split('');

            expect(utils.toArray(str)).toMatch(expected);
        });

        it('should throw on primitive numbers', () => {
            const num = 10;

            expect(() => {
                utils.toArray(num);
            }).toThrow();
        });

        it('should throw on functions', () => {
            function aFunction() {}

            expect(() => {
                utils.toArray(aFunction);
            }).toThrow();
        });

        it('should throw on objects', () => {
            const obj = {
                length: 'invalid'
            };

            expect(() => {
                utils.toArray(obj);
            }).toThrow();
        });

    });
});