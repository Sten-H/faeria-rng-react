import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Home from './';
import { withRouter } from '../testHelpers';

// Snapshot for Home React Component
describe('Home --- Snapshot',()=>{
    it('matches Snapshot of Home', () => {
        const component  = withRouter(<Home />);
        const renderedValue =  renderer.create(component).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});