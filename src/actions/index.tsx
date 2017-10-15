import * as constants from '../constants';

let nextDrawId = -1;
// let nextCreatureId = 0;

export interface AddDrawCard {
    id: number;
    type: constants.ADD_DRAW_CARD;
}

export interface AddCreatureCard {
    id: number;
    type: constants.ADD_CREATURE_CARD;
}

export interface RemoveDrawCard {
    id: number;
    type: constants.REMOVE_DRAW_CARD;
}

export interface RemoveCreatureCard {
    type: constants.REMOVE_CREATURE_CARD;
}

export interface UpdateCard {
    id: number;
    value: number;
    targetName: string;
    type: constants.UPDATE_CARD;
}
export type AddCardAction = AddDrawCard | AddCreatureCard;
export type RemoveCardAction = RemoveDrawCard | RemoveCreatureCard;
export type CardAction = AddCardAction | RemoveCardAction | UpdateCard;

export const addDrawCard = (): AddDrawCard => {
    nextDrawId += 1;
    return {
        id: nextDrawId,
        type: constants.ADD_DRAW_CARD
    };
};

export const removeDrawCard = (id: number): RemoveDrawCard =>  {
    return {
        id: id,
        type: constants.REMOVE_DRAW_CARD,
    };
};

export const updateCard = (id: number, evt: any): UpdateCard => {
    return {
        id: id,
        value: evt.target.value,
        targetName: evt.target.name,
        type: constants.UPDATE_CARD
    };
};