import * as React from 'react';
import * as enzyme from 'enzyme';
import { App }from './App';
import { withRouter } from './testHelpers';

describe('App component', () => {
    it('Is renders without crashing', () => {
        const component = enzyme.mount(withRouter(<App />));
        expect(component.find('.card-title')).toHaveLength(2);
    });
});

