'use strict';

exports.__esModule = true;
exports.EventManager = exports.events = undefined;

var _dom = require('./dom');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var forceCaptureEvents = ['focus', 'blur'];

/**
 * ## DOM events handler
 *
 * Available as a constructor (`EventManager`) and as a singleton hub (`events`)
 */

/**
 * @name EventManager
 * @class
 */

var EventManager = function () {
    function EventManager() {
        _classCallCheck(this, EventManager);

        /**
         * Event Handler Registry
         *
         * @property
         * @public
         * @type {object}
         */
        this.eventsRegistry = {};
    }

    /**
     * Adds an event handler and returns the unbind function
     *
     * #### Example:
     *
     * ```
     * import { byId } from 'tsumami';
     * import { EventManager } from 'tsumami/lib/events';
     *
     * const events = new EventManager();
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


    EventManager.prototype.on = function on(element, event, handler) {
        var _this = this;

        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


        element.addEventListener(event, handler, capture);

        var offHandler = function offHandler() {
            return _this.off(element, event, handler, capture);
        };

        var registryEl = this.eventsRegistry[event] || (this.eventsRegistry[event] = []);
        registryEl.push({ handler: handler, element: element, off: offHandler });

        return offHandler;
    };

    /**
     * Removes an event handler
     *
     * #### Example:
     *
     * ```
     * import { byId } from 'tsumami';
     * import { EventManager } from 'tsumami/lib/events';
     *
     * const events = new EventManager();
     *
     * const btn = byId('submit');
     * const handler = (e) => { ... }
     *
     * events.on(btn, 'click', handler);
     *
     * //later on...
     *
     * events.off(btn, 'click', handler);
     *
     * //remove all handler for a given event
     * events.off(btn, 'click');
     *
     * //remove all handler from an element
     * events.off(btn);
     * ```
     *
     * @method
     * @param {Element} [element] - Target element
     * @param {string} [event] - Event to remove
     * @param {function} [handler] - Event handler
     * @param {boolean} [capture=false] - Whether to use event capturing
     */


    EventManager.prototype.off = function off(element, event, handler) {
        var _this2 = this;

        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


        if (arguments.length === 0) {
            //remove evenry handler
            Object.keys(this.eventsRegistry).forEach(function (ev) {
                var registryEl = _this2.eventsRegistry[ev];
                var h = registryEl.pop();

                while (h) {
                    h.off();
                    h = registryEl.pop();
                }
            });
            this.eventsRegistry = {};
            return;
        }

        if (!event && !handler) {
            Object.keys(this.eventsRegistry).forEach(function (ev) {
                _this2.off(element, ev, undefined, capture);
            });
            return;
        }

        var registryEl = this.eventsRegistry[event];

        if (!event || !this.eventsRegistry[event]) {
            return;
        }

        if (handler) {
            this.eventsRegistry[event] = registryEl.filter(function (e) {
                return e.element !== element || e.handler !== handler;
            });
            element.removeEventListener(event, handler, capture);
        } else {
            this.eventsRegistry[event] = registryEl.filter(function (e) {
                if (e.element !== element) {
                    return true;
                }
                e.element.removeEventListener(event, e.handler, capture);
                return false;
            });
        }
    };

    /**
     * Attaches an event handler for all elements that match the selector, now or in the future, based on a specific root element.
     * Returns an unbind function
     *
     * #### Example:
     *
     * ```
     * import { byId } from 'tsumami';
     * import { EventManager } from 'tsumami/lib/events';
     *
     * const events = new EventManager();
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


    EventManager.prototype.delegate = function delegate(element, selector, event, handler) {
        var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        if (forceCaptureEvents.indexOf(event) !== -1) {
            capture = true; // eslint-disable-line no-param-reassign
        }

        var delegateHandler = function delegateHandler(e) {
            var target = e.target || e.srcElement;
            e.delegateTarget = element;
            if ((0, _dom.matches)(target, selector)) {
                handler.call(target, e);
            }
        };
        delegateHandler.originalHandler = handler;
        delegateHandler.selector = selector;

        return this.on(element, event, delegateHandler, capture);
    };

    /**
     * Removes an event handler for all elements that match the selector, now or in the future, based on a specific root element.
     *
     * #### Example:
     *
     * ```
     * import { byId } from 'tsumami';
     * import { EventManager } from 'tsumami/lib/events';
     *
     * const events = new EventManager();
     *
     * const nav = byId('nav');
     * const handler = (e) => {
     *      //e.delegateTarget is the `nav` element
     *      //`this` is the clicked element
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
     * @param {string} [selector] - A selector to filter the elements that trigger the event
     * @param {string} [event] - Event to listen for
     * @param {function} [handler] - Event handler
     * @param {boolean} [capture=true] - Whether to use event capturing
     * @returns {function}
     */


    EventManager.prototype.undelegate = function undelegate(element, selector, event, handler) {
        var _this3 = this;

        var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

        if (forceCaptureEvents.indexOf(event) !== -1) {
            capture = true; // eslint-disable-line no-param-reassign
        }

        if (!event && !handler) {
            Object.keys(this.eventsRegistry).forEach(function (ev) {
                _this3.eventsRegistry[ev].forEach(function (h) {
                    if (h.element === element && h.handler.selector === selector) {
                        _this3.off(element, ev, h.handler, capture);
                    }
                });
            });
            return;
        }

        var registryEl = this.eventsRegistry[event] || (this.eventsRegistry[event] = {});

        var filterFn = function filterFn(h) {
            return (!handler || h.handler.originalHandler === handler) && (selector ? h.handler.selector === selector : h.handler.selector) && h.element === element;
        };

        registryEl.forEach(function (h) {
            if (filterFn(h) === true) {
                _this3.off(h.element, event, h.handler, capture);
            }
        });
    };

    /**
     * Removes all registered event handlers.
     *
     * #### Example:
     *
     * ```
     * import { EventManager } from 'tsumami/lib/events';
     *
     * const events = new EventManager();
     *
     * //...
     *
     * events.off();
     * ```
     *
     * @method
     */


    EventManager.prototype.destroy = function destroy() {
        this.off();
    };

    return EventManager;
}();

/**
 *
 * # DOM events handler singleton
 *
 * #### Example:
 *
 * ```
 * import { events } from 'tsumami/lib/events';
 *
 * events.on(...)
 * ```
 *
 * @name events
 * @type {object}
 */


var events = new EventManager();
exports.events = events;
exports.EventManager = EventManager;