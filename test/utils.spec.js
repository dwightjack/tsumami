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
});