import expect from 'expect';
import expectElement from 'expect-element';
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

});