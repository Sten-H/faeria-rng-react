import { AddInputCard } from './commonActions';
import * as constants from '../constants';

let nextCreatureId = -1;

export const addCreatureCard = (): AddInputCard => {
    nextCreatureId += 1;
    return {
        id: nextCreatureId,
        cardType: constants.CREATURE_CARD,
        type: constants.ADD_INPUT_CARD
    };
};
