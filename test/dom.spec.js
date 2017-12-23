import expect from 'expect';
import expectElement from 'expect-element';
import classie from 'desandro-classie';
import isElement from 'lodash/isElement';

import * as dom from '../src/dom';

import { mount } from './utils';

expect.extend(expectElement);

describe('dom.js', () => {

    describe('`byId()`', () => {

        beforeEach(() => {
            mount('dom.html');
        });

        it('should query a single element by ID', () => {
            expect(isElement(dom.byId('app'))).toBe(true);
        });

        it('should return undefined if element is not found', () => {
            expect(dom.byId('not-found')).toBe(null);
        });

    });

    describe('`byClassName()`', () => {

        beforeEach(() => {
            mount('dom.html');
        });

        it('should return an array of items by class attribute', () => {
            const results = dom.byClassName('list__item');

            expect(results).toBeA(Array);
            expect(results.length).toBe(6);
        });

        it('should take a node as context', () => {
            const results = dom.byClassName('list__item', document.getElementById('inner'));

            expect(results).toBeA(Array);
            expect(results.length).toBe(3);
        });

        it('should return an empty array if nothing matches', () => {
            const results = dom.byClassName('not-found');

            expect(results).toBeA(Array);
            expect(results.length).toBe(0);
        });

    });


    describe('`qs()`', () => {

        beforeEach(() => {
            mount('dom.html');
        });

        it('should query an element by CSS selector', () => {
            const result = dom.qs('#inner .list');

            expect(isElement(result)).toBe(true);
            expect(result.id).toBe('myInnerList');
        });

        it('should query an element by CSS selector', () => {
            const result = dom.qs('.list', document.getElementById('inner'));

            expect(isElement(result)).toBe(true);
            expect(result.id).toBe('myInnerList');
        });

    });

    describe('`qsa()`', () => {

        beforeEach(() => {
            mount('dom.html');
        });

        it('should query elements by CSS selector and return an array', () => {
            const results = dom.qsa('#inner .list .list__item');

            expect(results).toBeA(Array);
            expect(results.length).toBe(3);
        });

        it('should query an element by CSS selector', () => {
            const results = dom.qsa('.list .list__item', document.getElementById('inner'));

            expect(results).toBeA(Array);
            expect(results.length).toBe(3);
        });

        it('should return an empty array if nothing matches', () => {
            const results = dom.qsa('not-found');

            expect(results).toBeA(Array);
            expect(results.length).toBe(0);
        });

    });

    describe('`data()`', () => {

        beforeEach(() => {
            mount('dom.html');
        });

        it('should return a `data-` attribute value as a string (default)', () => {
            const el = dom.qs('[data-string]');
            const result = dom.data(el, 'string');

            expect(result).toBeA('string');
        });

        it('should return undefined if searched `data-` attribute is not defined', () => {
            const el = dom.qs('[data-string]');
            const result = dom.data(el, 'random');

            expect(result).toBe(undefined);
        });

        it('should cast boolean-like `data-` attribute values', () => {
            const el = dom.qs('[data-bool]');
            const result = dom.data(el, 'bool');

            expect(result).toBeA('boolean');
        });

        it('should cast numeric `data-` attribute values', () => {
            const el = dom.qs('[data-num]');
            const result = dom.data(el, 'num');

            expect(result).toBe(10.10);
        });

        it('should return an object if `attr` parameter is omitted', () => {
            const el = dom.byId('data-multi');
            const results = dom.data(el);
            const expected = {
                dashedName: 'dashed-name',
                first: 1,
                second: true
            };
            expect(results).toMatch(expected);
        });
    });


    describe('`toArray()`', () => {

        beforeEach(() => {
            mount('dom.html');
        });

        it('should return the same object if passed-in element is an array', () => {
            const input = [0, 1];
            const result = dom.toArray(input);

            expect(result).toBe(input);
        });

        it('should wrap a single DOM element', () => {
            const input = document.createElement('div');
            const result = dom.toArray(input);

            expect(result).toBeA(Array);
            expect(result[0]).toBe(input);
        });

        it('should convert NodeList into an array', () => {
            const input = document.querySelectorAll('li');
            const result = dom.toArray(input);

            expect(result).toBeA(Array);
            expect(result.length).toBe(input.length);
        });
    });

    describe('`parents()`', () => {

        beforeEach(() => {
            mount('dom.html');
        });

        it('should return an array', () => {
            const el = dom.byId('inner-title');
            const results = dom.parents(el);

            expect(results).toBeA(Array);
        });

        it('should return an array of parent elements', () => {
            const el = dom.byId('inner-title');
            const results = dom.parents(el);
            const expected = ['#nested', '#root', 'body', 'html'].map((s) => document.querySelector(s));

            expect(results).toMatch(expected);
        });

        it('should match until a selector is encountered', () => {
            const el = dom.byId('inner-title');
            const results = dom.parents(el, '#root');
            const expected = [document.querySelector('#root')];

            expect(results).toMatch(expected);
        });
    });


    describe('`closest()`', () => {

        beforeEach(() => {
            mount('dom.html');
        });

        it('should return a matched element', () => {
            const el = dom.byId('inner-title');
            const result = dom.closest(el, '#nested');

            expect(result).toBe(dom.byId('nested'));
        });

        it('should return `null` when nothing matches', () => {
            const el = dom.byId('inner-title');
            const result = dom.closest(el, '#error');

            expect(result).toBe(null);
        });

        it('should start matching from the element itself', () => {
            const el = dom.byId('inner-title');
            const result = dom.closest(el, '#inner-title');

            expect(result).toBe(el);
        });

        it('should match the first closest element in a matching selectors list', () => {
            const el = dom.byId('inner-title');
            const result = dom.closest(el, '#root, #nested');

            expect(result).toBe(dom.byId('nested'));
        });
    });

    describe('`addClass()`', () => {

        it('should proxy `classie.addClass`', () => {
            expect(dom.addClass).toBe(classie.addClass);
        });

    });

    describe('`removeClass()`', () => {

        it('should proxy `classie.removeClass`', () => {
            expect(dom.removeClass).toBe(classie.removeClass);
        });

    });

    describe('`hasClass()`', () => {

        it('should proxy `classie.hasClass`', () => {
            expect(dom.hasClass).toBe(classie.hasClass);
        });

    });

    describe('`toggleClass()`', () => {

        let el;

        beforeEach(() => {
            el = document.createElement('div');
        });

        it('should call `classie.toggle` when a force toggle paramenter is not passed-in', () => {

            const classieSpy = expect.spyOn(classie, 'toggle');
            const classToAdd = 'test';

            dom.toggleClass(el, classToAdd);
            expect(classieSpy).toHaveBeenCalledWith(el, classToAdd);

            classieSpy.restore();

        });

        it('should call `classie.add` when a force toggle paramenter is set to `true`', () => {

            const classieSpy = expect.spyOn(classie, 'add');
            const classToAdd = 'test';

            dom.toggleClass(el, classToAdd, true);
            expect(classieSpy).toHaveBeenCalledWith(el, classToAdd);

            classieSpy.restore();

        });

        it('should call `classie.remove` when a force toggle paramenter is set to `false`', () => {

            const classieSpy = expect.spyOn(classie, 'remove');
            const classToAdd = 'test';

            dom.toggleClass(el, classToAdd, false);
            expect(classieSpy).toHaveBeenCalledWith(el, classToAdd);

            classieSpy.restore();

        });

    });

});