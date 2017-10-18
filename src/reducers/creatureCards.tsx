import { CreatureCardState } from '../types/index';
import { InputAction } from '../actions/commonActions';
import { CREATURE_CARD, ADD_INPUT_CARD } from '../constants/index';

export default function creatureCards(state: CreatureCardState[] = [], action: InputAction): CreatureCardState[] {
    if (action.cardType !== CREATURE_CARD) {
        return state;
    }
    switch (action.type) {
        case ADD_INPUT_CARD:
            return [
                ...state,
                {id: action.id, hp: 2, toDie: false}
            ];
        default:
            return state;
    }
}