import * as React from 'react';
import App from './App';
import { withStore } from './testHelpers';
import { StoreState } from '../types/index';

const state: StoreState = {
    settings: {
        pingAmount: 3,
        drawAmount: 20,
        mulligan: true
    },
    creatureCards: [
    ],
    drawCards: [
        {
            id: 0,
            needed: 1,
            total: 3,
        }
    ],
    results: {
        ping: {
            desiredOutcomes: 999,
            timeTaken: 999,
        },
        draw: {
            desiredOutcomes: -1,
            timeTaken: -1,
        },
    }
};
describe('App component', () => {
    it('Is renders without crashing', () => {
        withStore(<App />, state);
    });
});

