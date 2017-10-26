import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FAQ from './';
// Snapshot for Home React Component
describe('Home --- Snapshot',()=>{
    it('matches Snapshot of Home', () => {
        const component  = <FAQ />;
        const renderedValue =  renderer.create(component).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});