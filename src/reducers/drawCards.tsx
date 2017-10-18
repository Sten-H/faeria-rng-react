import { DrawCardAction } from '../actions/draw';
import * as constants from '../constants/index';
import { DrawCardState } from '../types/index';

const updateDrawCard = (cards: DrawCardState[], action: DrawCardAction) => {
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
export default function drawCards(state: DrawCardState[] = [], action: DrawCardAction): DrawCardState[] {
    switch (action.type) {
        case constants.ADD_DRAW_CARD:
            return [
                ...state,
                {id: action.id, needed: 1, total: 3},
            ];
        case constants.REMOVE_DRAW_CARD:
            return state.filter((card) => card.id !== action.id);
        case constants.UPDATE_DRAW_CARD:
            return updateDrawCard(state, action);
        default:
            return state;
    }
}