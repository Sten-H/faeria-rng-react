import drawReducer from './';
import { InputAction, UpdateInputCard } from '../../actions/commonActions';
import * as constants from '../../constants';

describe('DrawCards reducer', () => {
    const state = [
        {
            id: 0,
            needed: 3,
            total: 3
        }
    ];
    it('Should add draw card', () => {
        const action: InputAction = {
            id: 1,
            cardType: constants.DRAW_CARD,
            type: constants.ADD_INPUT_CARD
        };
        const newState = drawReducer(state, action);
        expect(newState).toHaveLength(2);
        const addedCard = newState.find((c) => c.id == 1);
        expect(addedCard).toBeTruthy();  // Card exists in state
        expect(addedCard).toEqual({id: 1, needed: 1, total: 3});
    });
    it('Should remove draw card', () => {
        const action: InputAction = {
            id: 0,
            cardType: constants.DRAW_CARD,
            type: constants.REMOVE_INPUT_CARD
        };
        const newState = drawReducer(state, action);
        expect(newState).toHaveLength(0);
    });
    it('Should update card', () => {
        const action: UpdateInputCard = {
            id: 0,
            value: 1,
            cardType: constants.DRAW_CARD,
            targetName: 'needed',
            type: constants.UPDATE_INPUT_CARD
        };
        const expected = {
            id: 0,
            needed: 1,  // was 3 before update
            total: 3
        };
        const newState = drawReducer(state, action);
        const updatedCard = newState.find((c) => c.id === expected.id);
        expect(updatedCard).toEqual(expected);
    });
    it('Should clamp needed after total value on update', () => {
        const currentState = [
            {
                id: 0,
                needed: 1,
                total: 2
            },
            {
                id: 1,
                needed: 3,
                total: 3
            }
        ];
        const action1: UpdateInputCard = {
            id: 0,
            value: 3,
            cardType: constants.DRAW_CARD,
            targetName: 'needed',
            type: constants.UPDATE_INPUT_CARD
        };
        const action2: UpdateInputCard = {
            id: 1,
            value: 1,
            cardType: constants.DRAW_CARD,
            targetName: 'total',
            type: constants.UPDATE_INPUT_CARD
        };
        const expected1 = {
            id: 0,
            needed: 2,  // was 1, tried to be set to 3 but clamped to total value
            total: 2
        };
        const expected2 = {
            id: 1,
            needed: 1,  // was 3, but got clamped to 1 on total update
            total: 1  // was 3 got updated to 1
        };
        const newState = drawReducer(drawReducer(currentState, action1), action2);
        const updatedCard1 = newState.find((c) => c.id === expected1.id);
        const updatedCard2 = newState.find((c) => c.id === expected2.id);
        expect(updatedCard1).toEqual(expected1);
        expect(updatedCard2).toEqual(expected2);

    });
});