import { closest } from './dom';

const forceCaptureEvents = ['focus', 'blur'];

/**
 * DOM events handler
 *
 * @name EventManager
 * @class
 */
class EventManager {

    constructor() {
        this.eventsRegistry = {};
    }

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
    on(element, event, handler, capture = false) {

        element.addEventListener(event, handler, capture);

        const offHandler = () => this.off(element, event, handler, capture);

        const registryEl = this.eventsRegistry[element] || (this.eventsRegistry[element] = {});
        if (Array.isArray(registryEl[event])) {
            registryEl[event].push(handler);
        } else {
            registryEl[event] = [handler];
        }

        return offHandler;
    }

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
    off(element, event, handler, capture = false) {

        const registryEl = this.eventsRegistry[element] || (this.eventsRegistry[element] = {});
        if (Array.isArray(registryEl[event])) {
            if (handler !== undefined) {
                const handlerIdx = registryEl[event].indexOf(handler);
                if (handlerIdx !== -1) {
                    registryEl.splice(handlerIdx, 1);
                }
                element.removeEventListener(event, handler, capture);
            } else {
                let handleFn = registryEl[event].pop();
                while (handleFn) {
                    element.removeEventListener(event, handleFn, capture);
                    handleFn = registryEl[event].pop();
                }
            }
        }
    }

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
    delegate(element, selector, event, handler, capture = true) {
        if (forceCaptureEvents.indexOf(event) !== -1) {
            capture = true; // eslint-disable-line no-param-reassign
        }

        const delegateHandler = (e) => {
            const target = e.target || e.srcElement;
            e.delegateTarget = closest(target, selector);
            if (e.delegateTarget) {
                handler.call(element, e);
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
    undelegate(element, selector, event, handler, capture = true) {
        if (forceCaptureEvents.indexOf(event) !== -1) {
            capture = true; // eslint-disable-line no-param-reassign
        }

        const registryEl = this.eventsRegistry[element] || (this.eventsRegistry[element] = {});

        if (Array.isArray(registryEl[event])) {

            const delegateHandler = registryEl[event].filter((h) => (
                h.originalHandler === handler && h.selector === selector)
            )[0];

            if (typeof delegateHandler === 'function') {
                this.off(element, event, delegateHandler, capture);
            }

        }


    }

    destroy() {
        this.off();
    }

}

/**
 *
 * # DOM events handler
 *
 * @name events
 * @type {object}
 */
const events = new EventManager();
export {
    events,
    EventManager
};