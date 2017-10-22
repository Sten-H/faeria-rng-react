import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MenuCard from './';
import { withRouter } from '../testHelpers';

describe('MenuCard --- Snapshot',()=>{
    it('matches Snapshot of MenuCard', () => {
        const component = withRouter(<MenuCard />);
        const renderedValue =  renderer.create(component).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});