import expect from 'expect';
import expectElement from 'expect-element';
// import isElement from 'lodash/isElement';
import {
    reset_qsa, stub_qsa,
    reset_addClass, stub_addClass,
    reset_removeClass, stub_removeClass,
    reset_toggleClass, stub_toggleClass,
    stub_toArray, reset_toArray
} from '../src/dom';
import Nodes from '../src/nodes';
import { mount } from './utils';

expect.extend(expectElement);

/* eslint no-new: 0 */

describe('`Nodes()`', () => {

    describe('`constructor`', () => {

        beforeEach(() => {
            mount('nodes.html');
        });

        it('should accept a selector string and call `querySelectorAll`', () => {
            const selector = '#root';
            const spy = expect.createSpy().andReturn([]);
            stub_qsa(spy);
            new Nodes(selector);

            expect(spy).toHaveBeenCalledWith(selector, document);
            reset_qsa();
        });

        it('should accept an optional context for the selector string', () => {
            const selector = '#root';
            const spy = expect.createSpy().andReturn([]);
            stub_qsa(spy);
            const root = document.createElement('div');
            new Nodes(selector, root);

            expect(spy).toHaveBeenCalledWith(selector, root);
            reset_qsa();
        });

        it('should assign the result of `querySelectorAll` to an `.els` property', () => {
            const arr = [];
            stub_qsa(() => arr);
            const inst = new Nodes('#root');

            expect(inst.els).toBe(arr);
            reset_qsa();
        });

        it('should convert non-string arguments to an array', () => {
            const arr = [];
            const spy = expect.createSpy().andReturn(arr);
            const nodelist = document.querySelectorAll('div');
            stub_toArray(spy);

            new Nodes(arr);
            expect(spy).toHaveBeenCalledWith(arr);
            spy.reset();

            new Nodes(nodelist);
            expect(spy).toHaveBeenCalledWith(nodelist);

            reset_toArray();
        });

        it('should assign the result of `toArray` to an `.els` property', () => {
            const arr = [];
            stub_toArray(() => arr);
            const inst = new Nodes([]);

            expect(inst.els).toBe(arr);
            reset_toArray();
        });

    });

    describe('`get length()`', () => {

        beforeEach(() => {
            mount('nodes.html');
        });

        it('should expose a `length` property computed from `this.els.length`', () => {
            const inst = new Nodes('#root');

            expect(inst.length).toBe(inst.els.length);
        });

    });

    describe('`.toArray()`', () => {

        let inst;

        beforeEach(() => {
            mount('nodes.html');
            inst = new Nodes('#root');
        });

        it('should return an array', () => {
            expect(inst.toArray()).toBeA(Array);
        });

        it('should return shallow copy of `this.els`', () => {
            expect(inst.toArray()).toMatch(inst.els);
            expect(inst.toArray()).toNotBe(inst.els);
        });

    });

    describe('`.eq()`', () => {

        let inst;

        beforeEach(() => {
            mount('nodes.html');
            inst = new Nodes('#root');
        });

        it('should return the element at the given index', () => {
            const expected = document.getElementById('root');
            expect(inst.eq(0)).toBe(expected);
        });

        it('should return `undefined` if the index is out of range', () => {
            expect(inst.eq(10)).toBe(undefined);
        });
    });

    describe('`.forEach()`', () => {

        let inst;
        let els;

        beforeEach(() => {
            mount('nodes.html');
            els = document.querySelectorAll('#list > li');
            inst = new Nodes(els);
        });

        it('should proxy to native `this.els.forEach` array iterator', () => {
            const spy = expect.spyOn(inst.els, 'forEach');
            const iterator = () => {};

            inst.forEach(iterator);

            expect(spy).toHaveBeenCalledWith(iterator);
            inst.els.forEach.restore();
        });

        it('should return the instance itself for chainability', () => {
            const ret = inst.forEach(() => {});
            expect(ret).toBe(inst);
        });
    });

    describe('`.indexOf()`', () => {

        let inst;
        let els;

        beforeEach(() => {
            mount('nodes.html');
            els = document.querySelectorAll('#list > li');
            inst = new Nodes(els);
        });

        it('should proxy to native `this.els.indexOf` array iterator', () => {
            const spy = expect.spyOn(inst.els, 'indexOf');

            inst.indexOf(els[0]);

            expect(spy).toHaveBeenCalledWith(els[0]);
            inst.els.indexOf.restore();
        });
    });

    describe('`.attr()`', () => {

        let inst;
        let els;

        beforeEach(() => {
            mount('nodes.html');
            els = document.querySelectorAll('#list > li');
            inst = new Nodes(els);
        });

        it('should set an attribute on every element in the set', () => {

            inst.attr('id', 'myId');

            [].slice.call(els, 0).forEach((el) => {
                expect(el).toHaveAttribute('id', 'myId');
            });
        });

        it('should accept a function as attribute value', () => {
            const fn = () => 'stub';

            inst.attr('id', fn);

            expect(els[0]).toHaveAttribute('id', 'stub');
        });

        it('passed in function receives current iteration `el` and `index` as parameters', () => {

            const spy = expect.createSpy().andReturn('');

            inst.attr('id', spy);

            expect(spy.calls.length).toBe(els.length);
            expect(spy.calls[0].arguments[0]).toBe(els[0]);
            expect(spy.calls[0].arguments[1]).toBe(0);
        });

        it('should return the instance itself for chainability', () => {
            const ret = inst.attr('id', 'stub');
            expect(ret).toBe(inst);
        });

        it('should return the requested attribute from the first element in the set', () => {
            const expected = els[0].id;
            expect(inst.attr('id')).toBe(expected);
        });

        it('should return undefined on empty set', () => {
            const emptyInst = new Nodes([]);
            expect(emptyInst.attr('id')).toBe(undefined);
        });

    });


    describe('`.addClass()`', () => {
        let inst;
        let els;
        let spy;

        beforeEach(() => {
            mount('nodes.html');
            spy = expect.createSpy();
            els = document.querySelectorAll('#list > li');
            inst = new Nodes(els);
        });

        it('should iterate on elements and call `addClass` on every element', () => {
            stub_addClass(spy);
            inst.addClass('stub');

            [].slice.call(els, 0).forEach((el, i) => {
                expect(spy.calls[i].arguments).toMatch([el, 'stub']);
            });

            reset_addClass();

        });

        it('should accept a function as parameter and execute it passing current iterator `el` and `index`', () => {

            const iterator = expect.createSpy().andReturn('stub');
            stub_addClass(spy);
            inst.addClass(iterator);

            [].slice.call(els, 0).forEach((el, i) => {
                expect(iterator.calls[i].arguments).toMatch([el, i]);
                expect(spy.calls[i].arguments).toMatch([el, 'stub']);
            });

            reset_addClass();

        });

        it('should return the instance itself for chainability', () => {
            const ret = inst.addClass('stub');
            expect(ret).toBe(inst);
        });
    });

    describe('`.removeClass()`', () => {
        let inst;
        let els;
        let spy;

        beforeEach(() => {
            mount('nodes.html');
            spy = expect.createSpy();
            els = document.querySelectorAll('#list > li');
            inst = new Nodes(els);
        });

        it('should iterate on elements and call `removeClass` on every element', () => {
            stub_removeClass(spy);
            inst.removeClass('stub');

            [].slice.call(els, 0).forEach((el, i) => {
                expect(spy.calls[i].arguments).toMatch([el, 'stub']);
            });

            reset_removeClass();

        });

        it('should accept a function as parameter and execute it passing current iterator `el` and `index`', () => {

            const iterator = expect.createSpy().andReturn('stub');
            stub_removeClass(spy);
            inst.removeClass(iterator);

            [].slice.call(els, 0).forEach((el, i) => {
                expect(iterator.calls[i].arguments).toMatch([el, i]);
                expect(spy.calls[i].arguments).toMatch([el, 'stub']);
            });

            reset_removeClass();

        });

        it('should return the instance itself for chainability', () => {
            const ret = inst.addClass('stub');
            expect(ret).toBe(inst);
        });
    });



    describe('`.toggleClass()`', () => {
        let inst;
        let els;
        let spy;

        beforeEach(() => {
            mount('nodes.html');
            spy = expect.createSpy();
            els = document.querySelectorAll('#list > li');
            inst = new Nodes(els);
        });

        it('should iterate on elements and call `toggleClass` on every element', () => {
            stub_toggleClass(spy);
            inst.toggleClass('stub', true);

            [].slice.call(els, 0).forEach((el, i) => {
                expect(spy.calls[i].arguments).toMatch([el, 'stub', true]);
            });

            reset_toggleClass();

        });

        it('should accept a function as class argument and execute it passing current iterator `el` and `index`', () => {

            const iterator = expect.createSpy().andReturn('stub');
            stub_toggleClass(spy);
            inst.toggleClass(iterator, true);

            [].slice.call(els, 0).forEach((el, i) => {
                expect(iterator.calls[i].arguments).toMatch([el, i]);
                expect(spy.calls[i].arguments).toMatch([el, 'stub', true]);
            });

            reset_toggleClass();

        });

        it('should accept a function as toggle argument and execute it passing current iterator `el` and `index`', () => {

            const iterator = expect.createSpy().andReturn(true);
            stub_toggleClass(spy);
            inst.toggleClass('stub', iterator);

            [].slice.call(els, 0).forEach((el, i) => {
                expect(iterator.calls[i].arguments).toMatch([el, i]);
                expect(spy.calls[i].arguments).toMatch([el, 'stub', true]);
            });

            reset_toggleClass();

        });

        it('should return the instance itself for chainability', () => {
            const ret = inst.addClass('stub');
            expect(ret).toBe(inst);
        });
    });


    describe('`#toNodes()`', () => {

        beforeEach(() => {
            mount('nodes.html');
        });

        it('should return a `Nodes`', () => {
            const inst = Nodes.toNodes();
            expect(inst).toBeA(Nodes);
        });

        it('should pass provided arguments to `Nodes` constructor', () => {
            const inst = Nodes.toNodes('#root');
            expect(inst.els[0]).toBe(document.getElementById('root'));
        });

    });

});