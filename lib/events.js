/*! DOM Utilities - v0.1.0 - 2016-09-01
* Copyright (c) 2016 aQuest; Licensed MIT */
'use strict';

exports.__esModule = true;

var _dom = require('./dom');

var forceCaptureEvents = ['focus', 'blur'];

var eventsRegistry = {};

/**
 * # DOM Event Handlers
 */

/**
 *
 * Event namespace
 *
 * @type {object}
 */
var events = {

    /**
     * Adds an event handler and returns the unbind function
     *
     * #### Example:
     *
     * ```
     * import { byId } from 'dom-utils';
     * import events from 'dom-utils/lib/events';
     *
     * const btn = byId('submit');
     *
     * const unbind = events.on(btn, 'click', (e) => { ... });
     *
     * //later on...
     *
     * unbind();
     * ```
     *
     * @method
     * @param {Element} element - Target element
     * @param {string} event - Event to listen for
     * @param {function} handler - Event handler
     * @param {boolean} [capture=false] - Whether to use event capturing
     * @returns {function}
     */
    on: function on(element, event, handler) {
        var _this = this;

        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];


        element.addEventListener(event, handler, capture);

        var offHandler = function offHandler() {
            return _this.off(element, event, handler, capture);
        };

        var registryEl = eventsRegistry[element] || (eventsRegistry[element] = {});
        if (Array.isArray(registryEl[event])) {
            registryEl[event].push(handler);
        } else {
            registryEl[event] = [handler];
        }

        return offHandler;
    },


    /**
     * Removes an event handler
     *
     * #### Example:
     *
     * ```
     * import { byId } from 'dom-utils';
     * import events from 'dom-utils/lib/events';
     *
     * const btn = byId('submit');
     * const handler = (e) => { ... }
     *
     * events.on(btn, 'click', handler);
     *
     * //later on...
     *
     * events.off(btn, 'click', handler);
     * ```
     *
     * @method
     * @param {Element} element - Target element
     * @param {string} event - Event to remove
     * @param {function} handler - Event handler
     * @param {boolean} [capture=false] - Whether to use event capturing
     */
    off: function off(element, event, handler) {
        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];


        var registryEl = eventsRegistry[element] || (eventsRegistry[element] = {});
        if (Array.isArray(registryEl[event])) {
            if (handler !== undefined) {
                var handlerIdx = registryEl[event].indexOf(handler);
                if (handlerIdx !== -1) {
                    registryEl.splice(handlerIdx, 1);
                }
                element.removeEventListener(event, handler, capture);
            } else {
                var handleFn = registryEl[event].pop();
                while (handleFn) {
                    element.removeEventListener(event, handleFn, capture);
                    handleFn = registryEl[event].pop();
                }
            }
        }
    },


    /**
     * Attaches an event handler for all elements that match the selector, now or in the future, based on a specific root element.
     * Returns an unbind function
     *
     * #### Example:
     *
     * ```
     * import { byId } from 'dom-utils';
     * import events from 'dom-utils/lib/events';
     *
     * const nav = byId('nav');
     * const handler = (e) => {
     *      //e.delegateTarget is the clicked element
     * }
     *
     * const undelegate = events.delegate(nav, 'a.nav-items' 'click', handler);
     *
     * //later on...
     *
     * undelegate();
     * ```
     *
     * @method
     * @param {Element} element - Target element
     * @param {string} selector - A selector to filter the elements that trigger the event
     * @param {string} event - Event to listen for
     * @param {function} handler - Event handler
     * @param {boolean} [capture=true] - Whether to use event capturing
     * @returns {function}
     */
    delegate: function delegate(element, selector, event, handler) {
        var capture = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

        if (forceCaptureEvents.indexOf(event) !== -1) {
            capture = true; // eslint-disable-line no-param-reassign
        }

        var delegateHandler = function delegateHandler(e) {
            var target = e.target || e.srcElement;
            e.delegateTarget = (0, _dom.closest)(target, selector, true);
            if (e.delegateTarget) {
                handler.call(element, e);
            }
        };
        delegateHandler.originalHandler = handler;
        delegateHandler.selector = selector;

        return this.on(element, event, delegateHandler, capture);
    },


    /**
     * Removes an event handler for all elements that match the selector, now or in the future, based on a specific root element.
     *
     * #### Example:
     *
     * ```
     * import { byId } from 'dom-utils';
     * import events from 'dom-utils/lib/events';
     *
     * const nav = byId('nav');
     * const handler = (e) => {
     *      //e.delegateTarget is the clicked element
     * }
     *
     * events.delegate(nav, 'a.nav-items' 'click', handler);
     *
     * //later on...
     *
     * events.undelegate(nav, 'a.nav-items' 'click', handler);
     * ```
     *
     * @method
     * @param {Element} element - Target element
     * @param {string} selector - A selector to filter the elements that trigger the event
     * @param {string} event - Event to listen for
     * @param {function} handler - Event handler
     * @param {boolean} [capture=true] - Whether to use event capturing
     * @returns {function}
     */
    undelegate: function undelegate(element, selector, event, handler) {
        var capture = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

        if (forceCaptureEvents.indexOf(event) !== -1) {
            capture = true; // eslint-disable-line no-param-reassign
        }

        var registryEl = eventsRegistry[element] || (eventsRegistry[element] = {});

        if (Array.isArray(registryEl[event])) {

            var delegateHandler = registryEl[event].find(function (h) {
                return h.originalHandler === handler && h.selector === selector;
            });

            if (typeof delegateHandler === 'function') {
                this.off(element, event, delegateHandler, capture);
            }
        }
    }
};

exports.default = events;