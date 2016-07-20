import classie from 'desandro-classie';

const camelCaseRegExp = /-([a-z])/ig;
const toCamelCase = (str) => str.replace(camelCaseRegExp, (match) => match[1].toUpperCase());

export const byId = (id) => document.getElementById(id);

export const byClassName = (selector, ctx = document) => Array.toArray(ctx.getElementsByClassName(selector));

export const qs = (selector, ctx = document) => ctx.querySelector(selector);

export const qsa = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));

export class NodeList {

    constructor(elements) {
        this.els = typeof elements === 'string' ? qsa(elements) : Array.from(elements);
    }

    toArray() {
        return this.els;
    }

    attr(attr, value) {
        const {els} = this;
        const attrStr = toCamelCase(attr);
        if (value) {
            this.els.forEach((el) => (el[attrStr] = value));
            return this;
        }
        const el = els.length > 0 ? els[0] : undefined;
        const hook = NodeList.attrHooks[attrStr];
        if (!el) {
            return undefined;
        }
        return hook ? hook(el) : el[attrStr];
    }

    addClass(className) {
        this.els.forEach((el) => (classie.add(el, className)));
        return this;
    }

    removeClass(className) {
        this.els.forEach((el) => (classie.remove(el, className)));
        return this;
    }

    toggleClass(className, toggle) {
        const fn = toggle === undefined ? 'toggle' : (toggle ? 'add' : 'remove'); //eslint-disable-line no-nested-ternary
        this.els.forEach((el) => (classie[fn](el, className)));
        return this;
    }
}

NodeList.attrHooks = {
    'for': (el) => el.htmlFor,
    'class': (el) => el.className
};

export const toNodeList = (elements) => new NodeList(elements);


