import * as constants from '../constants';
import {SyntheticEvent} from 'react';
let nextDrawId = -1;

export interface AddDrawCard {
    id: number;
    type: constants.ADD_DRAW_CARD;
}
export interface RemoveDrawCard {
    id: number;
    type: constants.REMOVE_DRAW_CARD;
}

export interface UpdateCard {
    id: number;
    value: number;
    targetName: string;
    type: constants.UPDATE_DRAW_CARD;
}

export const addDrawCard = (): AddDrawCard => {
    nextDrawId += 1;
    return {
        id: nextDrawId,
        type: constants.ADD_DRAW_CARD
    };
};
export type DrawCardAction = AddDrawCard | RemoveDrawCard | UpdateCard;

export const removeDrawCard = (id: number): RemoveDrawCard =>  {
    return {
        id: id,
        type: constants.REMOVE_DRAW_CARD,
    };
};

export const updateCard = (id: number, evt: SyntheticEvent<HTMLInputElement>): UpdateCard => {
    return {
        id: id,
        value: parseInt(evt.currentTarget.value, 10),
        targetName: evt.currentTarget.name,
        type: constants.UPDATE_DRAW_CARD
    };
};