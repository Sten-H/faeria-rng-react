import * as constants from '../constants';
import { AddInputCard, EventProps, RemoveInputCard, UpdateInputCard } from './commonActions';

let nextDrawId = 0;

export const resetDrawId = () => nextDrawId = 0;  // Only used for testing, feel like I'm doing something weird here.
export const addDrawCard = (): AddInputCard => {
    nextDrawId += 1;
    return {
        id: nextDrawId,
        cardType: constants.DRAW_CARD,
        type: constants.ADD_INPUT_CARD
    };
};

export const removeDrawCard = (id: number): RemoveInputCard =>  {
    return {
        id: id,
        cardType: constants.DRAW_CARD,
        type: constants.REMOVE_INPUT_CARD,
    };
};

export const updateDrawCard = (id: number, evt: EventProps): UpdateInputCard => {
    return {
        id: id,
        value: parseInt(evt.currentTarget.value, 10),
        cardType: constants.DRAW_CARD,
        targetName: evt.currentTarget.name,
        type: constants.UPDATE_INPUT_CARD
    };
};