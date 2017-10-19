import { AddInputCard, RemoveInputCard, UpdateInputCard } from './commonActions';
import * as constants from '../constants';
import { SyntheticEvent } from 'react';

// Creature cards begins with 1 card already (god card) so index is 0
let nextCreatureId = 0;

export const addCreatureCard = (): AddInputCard => {
    nextCreatureId += 1;
    return {
        id: nextCreatureId,
        cardType: constants.CREATURE_CARD,
        type: constants.ADD_INPUT_CARD
    };
};

export const removeCreatureCard = (id: number): RemoveInputCard =>  {
    return {
        id: id,
        cardType: constants.CREATURE_CARD,
        type: constants.REMOVE_INPUT_CARD,
    };
};
//
export const updateCreatureCard = (id: number, evt: SyntheticEvent<HTMLInputElement>): UpdateInputCard => {
    return {
        id: id,
        value: parseInt(evt.currentTarget.value, 10),
        cardType: constants.CREATURE_CARD,
        targetName: evt.currentTarget.name,
        type: constants.UPDATE_INPUT_CARD
    };
};