import * as constants from '../../constants/index';
import { DrawCardState } from '../../types/index';
import { InputAction } from '../../actions/commonActions';

const defaultState = [{needed: 1, total: 3, id: 0}];
const updateDrawCard = (cards: DrawCardState[], action: InputAction) => {
    return cards.map((card) => {
        if (card.id !== action.id) {
            return card;
        } else {
            const newCard = {
                ...card,
                [action.targetName!]: action.value,
            };
            newCard.needed = Math.min(newCard.needed, newCard.total);
            return newCard;
        }
    });
};
export default function drawCards(state: DrawCardState[] = defaultState, action: InputAction): DrawCardState[] {
    if (action.cardType !== constants.DRAW_CARD) {
        return state;
    }
    switch (action.type) {
        case constants.ADD_INPUT_CARD:
            return [
                ...state,
                {id: action.id, needed: 1, total: 3},
            ];
        case constants.REMOVE_INPUT_CARD:
            return state.filter((card) => card.id !== action.id);
        case constants.UPDATE_INPUT_CARD:
            return updateDrawCard(state, action);
        default:
            return state;
    }
}