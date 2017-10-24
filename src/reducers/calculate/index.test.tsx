import calculateReducer from './';
import * as constants from '../../constants';
import { CreatureCardState, DrawCardState, ResultState } from '../../types/index';
import { CalculateAction } from '../../actions/calculate';
describe('Calculate reducer', ()=> {
    const state: ResultState = {
        ping: {
            desiredOutcomes: -1,
            timeTaken: -1
        },
        draw: {
            desiredOutcomes: -1,
            timeTaken: -1
        },
    };
    it('Should calculate draw probability', () => {
        const action: CalculateAction = {
            drawAmount: 20,
            drawCards: [{needed: 1, total: 3}] as DrawCardState[],
            mulligan: false,
            type: constants.CALCULATE_DRAW
        };
        const expected = {
            desiredOutcomes: 970.4,  // Value known to be true
            timeTaken: -1
        };
        const result = calculateReducer(state, action);
        expect(result.draw.desiredOutcomes).toEqual(expected.desiredOutcomes);
    });
    it('Should calculate ping probability', () => {
        const action: CalculateAction = {
            pingAmount: 4,
            creatureCards: [
                {hp: 20, id: 0, toDie: false, isGod: true},
                {hp: 2, id: 1, toDie: true, isGod: false}
                ] as CreatureCardState[],
            type: constants.CALCULATE_PING
        };
        const expected = {
            desiredOutcomes: 687.5,  // Value known to be true
            timeTaken: -1
        };
        const result = calculateReducer(state, action);
        expect(result.ping.desiredOutcomes).toEqual(expected.desiredOutcomes);
    });
});