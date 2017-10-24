import { InputAction, UpdateInputCard } from '../../actions/commonActions';
import * as constants from '../../constants';
import creatureReducer from './';
describe('CreatureCards reducer', () => {
    const state = [
        {
            id: 0,
            hp: 20,
            toDie: false,
            isGod: true
        },
        {
            id: 1,
            hp: 2,
            toDie: true,
            isGod: false
        }
    ];
    it('Should add creature card', () => {
        const action: InputAction = {
            id: 2,
            cardType: constants.CREATURE_CARD,
            type: constants.ADD_INPUT_CARD
        };
        const expected = {id: 2, hp: 2, toDie: true, isGod: false};
        const newState = creatureReducer(state, action);
        expect(newState).toHaveLength(3);
        const addedCreature = newState.find((c) => c.id == 2);
        expect(addedCreature).toBeTruthy();  // Card exists in state
        expect(addedCreature).toEqual(expected);
    });
    it('Should remove creature card', () => {
        const action: InputAction = {
            id: 1,
            cardType: constants.CREATURE_CARD,
            type: constants.REMOVE_INPUT_CARD
        };
        const newState = creatureReducer(state, action);
        expect(newState).toHaveLength(1);
        expect(newState[0].isGod).toBe(true);  // Remaining creature should be god
    });
    it('Should update creature card', () => {
        const action: UpdateInputCard = {
            id: 1,
            value: 5,
            cardType: constants.CREATURE_CARD,
            targetName: 'hp',
            type: constants.UPDATE_INPUT_CARD
        };
        const expected = {
            id: 1,
            hp: 5,  // was 2 before update
            toDie: true,
            isGod: false
        };
        const newState = creatureReducer(state, action);
        const updatedCreature = newState.find((c) => c.id === expected.id);
        expect(updatedCreature).toEqual(expected);
    });
});