import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { InputArea } from './';
import { withRouter, withStore } from '../testHelpers';


describe('InputArea --- Snapshot',() => {
    it('matches Snapshot of empty InputArea', () => {
        // I wonder if using snapshot here is a bit overkill because it goes very deep and uses containers
        // Many errors from other components/containers will propagate to this test.
        const onAdd = () => null;
        const component  = <InputArea onAdd={onAdd} context="creature"/>;
        const wrapped = withRouter(component);
        const withState = withStore(wrapped, {settings: {pingAmount: 2}});
        const renderedValue =  renderer.create(withState).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});