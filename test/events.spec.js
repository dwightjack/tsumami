import expect from 'expect';
import isPlainObject from 'lodash/isPlainObject';

import { events, EventManager } from '../src/events';
import { simulate, mount } from './utils';

describe('`EventManager`', () => {

    describe('constructor', () => {

        let eventInst;

        beforeEach(() => {
            eventInst = new EventManager();
        });

        it('should expose a handler registry object', () => {
            expect(isPlainObject(eventInst.eventsRegistry)).toBe(true);
        });

    });

    describe('`.on()`', () => {

        let eventInst;
        let el;

        beforeEach(() => {
            el = document.createElement('div');
            eventInst = new EventManager();
        });

        it('should proxy to `Element.prototype.addEventListener`', () => {
            const handler = () => {};
            const elSpy = expect.spyOn(el, 'addEventListener');

            eventInst.on(el, 'click', handler);

            expect(elSpy).toHaveBeenCalledWith('click', handler, false);
        });

        it('accepts a third `capture` flag', () => {
            const handler = () => { };
            const elSpy = expect.spyOn(el, 'addEventListener');

            eventInst.on(el, 'click', handler, true);

            expect(elSpy).toHaveBeenCalledWith('click', handler, true);
        });

        it('should add the handler to the registry', () => {
            const handler = () => { };

            const off = eventInst.on(el, 'click', handler);

            expect(eventInst.eventsRegistry.click).toBeA(Array);
            expect(eventInst.eventsRegistry.click[0]).toMatch({ element: el, handler, off });
        });


        it('should attach a callable handler on element click', () => {
            const handler = expect.createSpy();

            eventInst.on(el, 'click', handler);

            const e = simulate(el, 'click');

            expect(handler).toHaveBeenCalledWith(e);

        });

        it('should return a function to remove the handler', () => {
            const handler = expect.createSpy();

            const off = eventInst.on(el, 'click', handler);

            simulate(el, 'click');

            // called
            expect(handler).toHaveBeenCalled();

            // remove handler
            off();

            //call it again
            simulate(el, 'click');

            expect(handler.calls.length).toBe(1);

        });
    });

    describe('`.off()`', () => {

        let eventInst;
        let el;
        let handler;

        beforeEach(() => {
            el = document.createElement('div');
            eventInst = new EventManager();
            handler = () => {};
        });

        it('should call `Element.prototype.removeEventListener`', () => {
            const spy = expect.spyOn(el, 'removeEventListener');

            eventInst.on(el, 'click', handler);

            eventInst.off(el, 'click', handler);

            expect(spy).toHaveBeenCalledWith('click', handler, false);
        });

        it('should accept a `capture` flag', () => {
            const spy = expect.spyOn(el, 'removeEventListener');

            eventInst.on(el, 'click', handler, true);

            eventInst.off(el, 'click', handler, true);

            expect(spy).toHaveBeenCalledWith('click', handler, true);
        });

        it('should remove the handler from the registry', () => {

            eventInst.on(el, 'click', handler);

            eventInst.off(el, 'click', handler);

            expect(eventInst.eventsRegistry.click.length).toBe(0);
        });

        it('should remove just the passed-in handler', () => {
            const handler2 = () => {};

            eventInst.on(el, 'click', handler);
            eventInst.on(el, 'click', handler2);

            eventInst.off(el, 'click', handler);

            expect(eventInst.eventsRegistry.click.length).toBe(1);
            expect(eventInst.eventsRegistry.click[0].handler).toBe(handler2);
        });

        it('should filter the passed-in element', () => {
            const el2 = document.createElement('div');

            eventInst.on(el, 'click', handler);
            eventInst.on(el2, 'click', handler);

            eventInst.off(el, 'click', handler);

            expect(eventInst.eventsRegistry.click.length).toBe(1);
            expect(eventInst.eventsRegistry.click[0].element).toBe(el2);
        });

        it('should remove all handlers when `handler` argument is falsy ', () => {
            const handler2 = () => {};

            eventInst.on(el, 'click', handler);
            eventInst.on(el, 'click', handler2);

            eventInst.off(el, 'click');

            expect(eventInst.eventsRegistry.click.length).toBe(0);
        });

        it('should remove all handlers for every event when `event` AND `handler` arguments are falsy ', () => {
            const handler2 = () => {};

            eventInst.on(el, 'click', handler);
            eventInst.on(el, 'click', handler2);
            eventInst.on(el, 'focus', handler);

            eventInst.off(el);

            expect(eventInst.eventsRegistry).toIncludeKeys(['click', 'focus']);
            ['click', 'focus'].forEach((e) => (
                expect(eventInst.eventsRegistry[e].length).toBe(0)
            ));
        });

        it('should remove all handlers for every event when `event` AND `handler` arguments are falsy ', () => {
            const handler2 = () => {};

            eventInst.on(el, 'click', handler);
            eventInst.on(el, 'click', handler2);
            eventInst.on(el, 'focus', handler);

            eventInst.off(el);

            expect(eventInst.eventsRegistry).toIncludeKeys(['click', 'focus']);
            ['click', 'focus'].forEach((e) => (
                expect(eventInst.eventsRegistry[e].length).toBe(0)
            ));
        });

        it('should remove all handlers without any arguments', () => {
            const handler2 = () => {};
            const el2 = document.createElement('div');

            eventInst.on(el, 'click', handler);
            eventInst.on(el, 'click', handler2);
            eventInst.on(el, 'focus', handler);

            eventInst.on(el2, 'click', handler);
            eventInst.on(el2, 'click', handler2);
            eventInst.on(el2, 'focus', handler);

            eventInst.off();

            expect(Object.keys(eventInst.eventsRegistry).length).toBe(0);
        });

    });


    describe('`.delegate()`', () => {

        let eventInst;
        let list;
        let handler;

        beforeEach(() => {
            mount('events.html');
            list = document.getElementById('list');
            eventInst = new EventManager();
            handler = () => {};
        });

        it('should proxy to `.on()`', () => {
            const spy = expect.spyOn(eventInst, 'on');

            eventInst.delegate(list, '.test', 'click', handler, true);

            const args = spy.calls[0].arguments;
            expect(args[0]).toBe(list);
            expect(args[1]).toBe('click');
            expect(args[2]).toBeA('function');
            expect(args[3]).toBe(true);

            eventInst.on.restore();

        });

        it('should return the return value of `.on`', () => {
            expect.spyOn(eventInst, 'on').andReturn(true);

            const off = eventInst.delegate(list, '.test', 'click', handler);

            expect(off).toBe(true);

            eventInst.on.restore();

        });

        it('should attach a `.selector` property to the delegate event handler', () => {

            eventInst.delegate(list, '.test', 'click', handler);

            const h = eventInst.eventsRegistry.click[0].handler;

            expect(h.selector).toBe('.test');

        });

        it('should attach a `.originalHandler` property to the delegate event handler', () => {

            eventInst.delegate(list, '.test', 'click', handler);

            const h = eventInst.eventsRegistry.click[0].handler;

            expect(h.originalHandler).toBe(handler);

        });

        it('should listen for events onto the delegated target', () => {

            const spy = expect.createSpy();
            const anchor = list.querySelector('li:first-child > a');

            eventInst.delegate(list, 'li > a', 'click', spy);

            simulate(anchor, 'click');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls[0].arguments[0].target).toBe(anchor);


        });

        it('should NOT trigger handlers when selector is identical but deletegated element is not', () => {

            const spy = expect.createSpy();
            const list2 = document.getElementById('list2');
            const anchor = list.querySelector('li:first-child > a');

            eventInst.delegate(list, 'li > a', 'click', spy);
            eventInst.delegate(list2, 'li > a', 'click', spy);

            simulate(anchor, 'click');

            expect(spy.calls.length).toBe(1);


        });

        it('should force handlers context (`this`) to the passed-in element', () => {

            const spy = expect.createSpy();
            const anchor = list.querySelector('li:first-child > a');

            eventInst.delegate(list, 'li > a', 'click', spy);

            simulate(anchor, 'click');

            expect(spy.calls[0].context).toBe(anchor);

        });

        it('should pass event to the handler', () => {

            const spy = expect.createSpy();
            const target = list.querySelector('li:first-child > a');

            eventInst.delegate(list, 'li > a', 'click', spy);

            const event = simulate(target, 'click');

            expect(event).toBe(event);

        });

        it('should augment handler event with a `.delegateTarget` property', () => {

            const spy = expect.createSpy();
            const target = list.querySelector('li:first-child > a');

            eventInst.delegate(list, 'li > a', 'click', spy);
            simulate(target, 'click');

            const arg = spy.calls[0].arguments[0];

            expect(arg.delegateTarget).toBe(list);

        });

    });


    describe('`.undelegate()`', () => {

        let eventInst;
        let list;
        let handler;

        beforeEach(() => {
            mount('events.html');
            list = document.getElementById('list');
            eventInst = new EventManager();
            handler = expect.createSpy();
        });

        it('should proxy to `.off()`', () => {
            const spy = expect.spyOn(eventInst, 'off').andCallThrough();

            eventInst.delegate(list, 'li > a', 'click', handler);
            eventInst.delegate(list, 'li', 'click', handler);
            eventInst.delegate(list, 'li > a', 'focus', handler);

            eventInst.undelegate(list, 'li > a');

            const args0 = spy.calls[0].arguments;
            const args1 = spy.calls[1].arguments;

            expect(spy.calls.length).toBe(2);
            expect(args0[0]).toBe(list);
            expect(args0[1]).toBe('click');
            expect(args0[2]).toBeA('function');
            expect(args0[3]).toBe(true);

            expect(args1[0]).toBe(list);
            expect(args1[1]).toBe('focus');
            expect(args1[2]).toBeA('function');
            expect(args1[3]).toBe(true);

            eventInst.off.restore();

        });

        it('should remove all event handlers matching by `selector`', () => {
            eventInst.delegate(list, 'li > a', 'click', handler);
            eventInst.delegate(list, 'li', 'click', handler);
            eventInst.delegate(list, 'li > a', 'focus', handler);

            eventInst.undelegate(list, 'li > a');

            //not called
            simulate(list.querySelector('li > a'), 'click');
            expect(handler.calls.length).toBe(0);
            handler.reset();

            //not called either
            simulate(list.querySelector('li > a'), 'focus');
            expect(handler.calls.length).toBe(0);
            handler.reset();

            // called!
            simulate(list.querySelector('li'), 'click');
            expect(handler.calls.length).toBe(1);
            handler.reset();

        });

        it('should remove all event handlers matching by `event`', () => {
            eventInst.delegate(list, 'li > a', 'click', handler);
            eventInst.delegate(list, 'li', 'click', handler);
            eventInst.delegate(list, 'li > a', 'focus', handler);

            eventInst.undelegate(list, null, 'click');

            //not called
            simulate(list.querySelector('li > a'), 'click');
            expect(handler.calls.length).toBe(0);
            handler.reset();

            //called!
            simulate(list.querySelector('li > a'), 'focus');
            expect(handler.calls.length).toBe(1);
            handler.reset();

            //not called
            simulate(list.querySelector('li'), 'click');
            expect(handler.calls.length).toBe(0);
            handler.reset();

        });

        it('should remove all event handlers matching by `event` and `selector`', () => {
            eventInst.delegate(list, 'li > a', 'click', handler);
            eventInst.delegate(list, 'li', 'click', handler);
            eventInst.delegate(list, 'li > a', 'focus', handler);

            eventInst.undelegate(list, 'li > a', 'click');

            //not called
            simulate(list.querySelector('li > a'), 'click');
            expect(handler.calls.length).toBe(0);
            handler.reset();

            //called!
            simulate(list.querySelector('li > a'), 'focus');
            expect(handler.calls.length).toBe(1);
            handler.reset();

            //called!
            simulate(list.querySelector('li'), 'click');
            expect(handler.calls.length).toBe(1);
            handler.reset();

        });

        it('should remove all event handlers matching by `event`, `selector` and `handler`', () => {
            const handler2 = expect.createSpy();

            eventInst.delegate(list, 'li > a', 'click', handler);
            eventInst.delegate(list, 'li > a', 'click', handler2);
            eventInst.delegate(list, 'li', 'click', handler);
            eventInst.delegate(list, 'li > a', 'focus', handler);

            eventInst.undelegate(list, 'li > a', 'click', handler);

            //called once
            simulate(list.querySelector('li > a'), 'click');
            expect(handler.calls.length).toBe(0);
            expect(handler2.calls.length).toBe(1);
            handler.reset();

            //called!
            simulate(list.querySelector('li > a'), 'focus');
            expect(handler.calls.length).toBe(1);
            handler.reset();

            //called!
            simulate(list.querySelector('li'), 'click');
            expect(handler.calls.length).toBe(1);
            handler.reset();

        });

    });

    describe('`.destroy()`', () => {

        it('should proxy to `.off()` without any argument', () => {

            const eventInst = new EventManager();
            const offSpy = expect.spyOn(eventInst, 'off');

            eventInst.destroy();
            expect(offSpy).toHaveBeenCalled();
            expect(offSpy.calls[0].arguments.length).toBe(0);

        });
    });


    describe('`events`', () => {

        it('should be an instance of `EventManager`', () => {
            expect(events).toBeA(EventManager);
        });
    });
});