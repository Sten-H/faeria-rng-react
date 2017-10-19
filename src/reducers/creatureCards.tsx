import * as constants from '../constants/index';
import { CreatureCardState } from '../types/index';
import { InputAction } from '../actions/commonActions';

const god: CreatureCardState = {
    id: 0,
    isGod: true,
    hp: 12,
    toDie: 0,
};
const defaultState: CreatureCardState[] = [
    god
];
const updateCreatureCard = (cards: CreatureCardState[], action: InputAction) => {
    return cards.map((card) => {
        if (card.id !== action.id) {
            return card;
        } else {
            return {
                ...card,
                [action.targetName!]: action.value,
            };
        }
    });
};
export default function creatureCards(state: CreatureCardState[] = defaultState,
                                      action: InputAction): CreatureCardState[] {
    if (action.cardType !== constants.CREATURE_CARD) {
        return state;
    }
    switch (action.type) {
        case constants.ADD_INPUT_CARD:
            return [
                ...state,
                {id: action.id, hp: 2, toDie: 1, isGod: false}
            ];
        case constants.REMOVE_INPUT_CARD:
            return state.filter((card) => card.id !== action.id);
        case constants.UPDATE_INPUT_CARD:
            return updateCreatureCard(state, action);
        default:
            return state;
    }
}