import * as React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

export const withRouter = (component: any) => {
    return (
        <Router history={createBrowserHistory()}>
            {component}
        </Router>);
};
export const withStore = (component: any, state: {}) => {
    const mockStore = configureMockStore();
    const store = mockStore(state);
    return (
        <Provider store={store}>
            {component}
        </Provider>);
};


