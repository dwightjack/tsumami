import { matches } from './dom';

const forceCaptureEvents = ['focus', 'blur'];

/**
 * ## DOM events handler
 *
 * Available as a constructor (`EventManager`) and as a singleton hub (`events`)
 */

/**
 * @name EventManager
 * @class
 */
class EventManager {

    constructor() {

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
    on(element, event, handler, capture = false) {

        element.addEventListener(event, handler, capture);

        const offHandler = () => this.off(element, event, handler, capture);

        const registryEl = this.eventsRegistry[event] || (this.eventsRegistry[event] = []);
        registryEl.push({ handler, element, off: offHandler });

        return offHandler;
    }

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
    off(element, event, handler, capture = false) {

        if (arguments.length === 0) {
            //remove evenry handler
            Object.keys(this.eventsRegistry).forEach((ev) => {
                const registryEl = this.eventsRegistry[ev];
                let h = registryEl.pop();

                while (h) {
                    h.off();
                    h = registryEl.pop();
                }
            });
            this.eventsRegistry = {};
            return;
        }

        if (!event && !handler) {
            Object.keys(this.eventsRegistry).forEach((ev) => {
                this.off(element, ev, undefined, capture);
            });
            return;
        }

        const registryEl = this.eventsRegistry[event];

        if (!event || !this.eventsRegistry[event]) {
            return;
        }

        if (handler) {
            this.eventsRegistry[event] = registryEl.filter((e) => (
                e.element !== element || e.handler !== handler
            ));
            element.removeEventListener(event, handler, capture);
        } else {
            this.eventsRegistry[event] = registryEl.filter((e) => {
                if (e.element !== element) {
                    return true;
                }
                e.element.removeEventListener(event, e.handler, capture);
                return false;
            });
        }
    }

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
    delegate(element, selector, event, handler, capture = true) {
        if (forceCaptureEvents.indexOf(event) !== -1) {
            capture = true; // eslint-disable-line no-param-reassign
        }

        const delegateHandler = (e) => {
            const target = e.target || e.srcElement;
            e.delegateTarget = element;
            if (matches(target, selector)) {
                handler.call(target, e);
            }
        };
        delegateHandler.originalHandler = handler;
        delegateHandler.selector = selector;

        return this.on(element, event, delegateHandler, capture);
    }

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
    undelegate(element, selector, event, handler, capture = true) {
        if (forceCaptureEvents.indexOf(event) !== -1) {
            capture = true; // eslint-disable-line no-param-reassign
        }

        if (!event && !handler) {
            Object.keys(this.eventsRegistry).forEach((ev) => {
                this.eventsRegistry[ev].forEach((h) => {
                    if (h.element === element && h.handler.selector === selector) {
                        this.off(element, ev, h.handler, capture);
                    }
                });
            });
            return;
        }

        const registryEl = this.eventsRegistry[event] || (this.eventsRegistry[event] = {});

        const filterFn = (h) => (!handler || h.handler.originalHandler === handler) && (selector ? h.handler.selector === selector : h.handler.selector) && h.element === element;

        registryEl.forEach((h) => {
            if (filterFn(h) === true) {
                this.off(h.element, event, h.handler, capture);
            }
        });

    }

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
    destroy() {
        this.off();
    }

}

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
const events = new EventManager();
export {
    events,
    EventManager
};