import * as enzyme from 'enzyme';
import * as React from 'react';
import configureMockStore, { MockStore } from 'redux-mock-store';
import * as constants from '../constants';
import { StoreState } from '../types/index';
import DrawSettings from './DrawSettings';
import PingSettings from './PingSettings';
import Calculate from './Calculate';
import DrawCard from './DrawCard';
import CreatureCard from './CreatureCard';
/**
 * mockStore isn't able to change state if I understand correctly, but I should still be able to
 * send in a different value onChange on actions but for some odd reason it default to input fields value.
 */
const mountWithStore = (component: React.ReactElement<any>, store: MockStore<{}>) => {
    const context = {
        store
    };
    return enzyme.mount(component, { context });
};

const state: StoreState = {
    settings: {
        pingAmount: 3,
        drawAmount: 20,
        mulligan: true
    },
    creatureCards: [
        {
            id: 0,
            hp: 20,
            toDie: false,
            isGod: true,
        }
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
            desiredOutcomes: 555,
            timeTaken: 555,
        },
        draw: {
            desiredOutcomes: -1,
            timeTaken: -1,
        },
    }
};
describe('Containers' , () => {
    const mockStore = configureMockStore();
    const store: MockStore<{}> = mockStore(state);
    beforeEach(store.clearActions);  // Clear all actions between tests
    describe('PingSettings container', () => {
        const container = mountWithStore(<PingSettings/>, store);
        const pingAmountInput = container.find('input');
        it('Initializes with state values', () => {
            expect(pingAmountInput.prop('value')).toEqual(state.settings.pingAmount);
        });
        it('Dispatches updateAmount action on change', () => {
            pingAmountInput.simulate('change', {currentTarget: {name: 'pingAmount', value: '3'}});
            const dispatchedAction = store.getActions();
            const expected = {
                value: 3,
                targetName: 'pingAmount',
                type: constants.UPDATE_NUMERIC_SETTING,
            };
            expect(dispatchedAction).toContainEqual(expected);
        })
    });
    describe('DrawSettings container', () => {
        const container = mountWithStore(<DrawSettings />, store);
        const drawAmountInput = container.find('input[type=\'number\']');
        const mulliganInput = container.find('input[type=\'checkbox\']');
        it('Initializes with state values', ()  => {
            expect(drawAmountInput.prop('value')).toEqual(state.settings.drawAmount);
            expect(mulliganInput.prop('checked')).toBe(true);
        });
        it('Dispatches actions on drawAmount change', () => {
            drawAmountInput.simulate('change', {currentTarget: {name: 'drawAmount', value: '20'}});
            const expected1 = {
                value: 20,
                targetName: 'drawAmount',
                type: constants.UPDATE_NUMERIC_SETTING,
            };

            const dispatchedAction = store.getActions();
            expect(dispatchedAction).toContainEqual(expected1);
        });
        it('Dispatches actions on mulligan change', () => {
            mulliganInput.simulate('change', {currentTarget: {name: 'mulligan', value: true}});
            const expected2 = {
                value: true,
                targetName: 'mulligan',
                type: constants.UPDATE_DRAW_MULLIGAN
            };
            const dispatchedAction = store.getActions();
            expect(dispatchedAction).toContainEqual(expected2);
        });
    });
    describe('Calculate container', () => {
        it('Should represents uncalculated values with "---"', () => {
            const container = mountWithStore(<Calculate type={constants.CALCULATE_DRAW}/>, store);
            const expectedOutcome = '--- out of 1000 games would have desired outcome';
            const actualOutcome = container.find('.results h3').text();
            expect(actualOutcome).toEqual(expectedOutcome);
            const expectedTimeTaken = 'Completed in --- seconds';
            const actualTimeTaken = container.find('.results p').text();
            expect(actualTimeTaken).toEqual(expectedTimeTaken);
        });
        it('Should represents calculated values normally', () => {
            const container = mountWithStore(<Calculate type={constants.CALCULATE_PING}/>, store);
            const expectedOutcome = `${state.results.ping.desiredOutcomes} out of 1000 games would have desired outcome`;
            const actualOutcome = container.find('.results h3').text();
            expect(actualOutcome).toEqual(expectedOutcome);
            const expectedTimeTaken = `Completed in ${state.results.ping.timeTaken} seconds`;
            const actualTimeTaken = container.find('.results p').text();
            expect(actualTimeTaken).toEqual(expectedTimeTaken);
        })
    });
    describe('DrawCard container', () => {
        it('Should initialize with state values', () => {
            const id = 0;
            const container = mountWithStore(<DrawCard key={id} id={id} />, store);
            const expected = state.drawCards[id];
            expect(container.find('select')).toHaveLength(2);
            expect(container.find('select[name=\'needed\']').prop('value')).toEqual(expected.needed);
            expect(container.find('select[name=\'total\']').prop('value')).toEqual(expected.total);
        })
    });
    describe('CreatureCard container', () => {
        it('Should initialize with state values', () => {
            const id = 0;
            const container = mountWithStore(<CreatureCard key={id} id={id} />, store);
            const expected = state.creatureCards[id];
            expect(container.find('input[name=\'hp\']').prop('value')).toEqual(expected.hp);
            expect(container.find('select[name=\'toDie\']').prop('value')).toEqual(Number(expected.toDie));
        });
    });
    // FIXME both Ping and Draw throw errors on enzyme.mount, it seems to have to do with Link in InputArea
    // But mounting wrapped in router doesn't fix it like it does in InputArea
    describe('Draw container', () => {
        it('Should initialize with state values', () => {
        });
    });
    describe('Ping container', () => {
        it('Should initialize with state values', () => {
        });
    });
});