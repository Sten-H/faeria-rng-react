import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LocationDescriptor } from 'history';

export const withRouter = (component: any, initalEntries?: LocationDescriptor[]) => {
    return (
        <MemoryRouter initialEntries={initalEntries}>
            {component}
        </MemoryRouter>);
};
export const withStore = (component: any, state: {}) => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    return (
        <Provider store={store}>
            {component}
        </Provider>);
};


