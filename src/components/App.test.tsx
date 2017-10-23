import * as React from 'react';
import * as enzyme from 'enzyme';
import { App }from './App';

describe('App component', () => {
    it('Is rendered correctly', () => {
        const component = enzyme.shallow(<App />);
        // contains header main footer divs
        expect(component.dive().children()).toHaveLength(3);
    });
    it('Test routes', () => {
        // FIXME test routes, but how?
    });
});

