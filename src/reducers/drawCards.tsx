import { CardAction } from '../actions';
// import {DrawCardState} from '../types/index';
import * as constants from '../constants/index';
import {DrawCardState} from '../types/index';
// import {DrawCardState} from '../types/index';


export default function cards(state: DrawCardState[], action: CardAction): DrawCardState[] {
    switch (action.type) {
        case constants.ADD_DRAW_CARD:
            return [
                ...state,
                { id: action.id, needed: 1, total: 3 }
            ];
        case constants.REMOVE_DRAW_CARD:
            return state.filter((card) => card.id !== action.id);
        case constants.UPDATE_DRAW_CARD:
            return state.map((card) => {
                if(card.id !== action.id) {
                    return card;
                } else {
                    const newCard = {
                        ...card,
                        [action.targetName]: action.value,
                    };
                    // Make certain needed never exceeds total in deck
                    newCard.needed = Math.min(newCard.needed, card.total);
                    return newCard;
                }
            });
        // case constants.ADD_CREATURE_CARD:
        //     return state;
        // case constants.REMOVE_CREATURE_CARD:
        //     return state;
        default:
            return [];
    }
}