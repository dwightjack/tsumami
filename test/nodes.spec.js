import expect from 'expect';
// import expectElement from 'expect-element';
// import isElement from 'lodash/isElement';
import { rewire$qsa, restore } from '../src/dom';
import Nodes from '../src/nodes';
import { mount } from './utils';

// expect.extend(expectElement);

describe('`Nodes()`', () => {

    describe('`constructor`', () => {

        beforeEach(() => {
            mount('nodes.html');
        });

        it('should accept a selector', () => {
            const spy = expect.createSpy();

            rewire$qsa(spy);
            const inst = new Nodes('#root');


            expect(spy).toHaveBeenCalled();

        });

    });

});