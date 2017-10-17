import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import { StoreState } from './types/index';
import reducers from './reducers/index';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// const store = createStore<StoreState>(reducers, {
//     // creatureCards: [
//     // ],
//     drawCards: [
//     ],
// });
export const store = createStore<StoreState>(reducers);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();