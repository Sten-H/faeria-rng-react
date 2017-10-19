import * as constants from '../constants';

type INPUT_CARD = constants.CREATURE_CARD | constants.DRAW_CARD;
export interface AddInputCard {
    id: number;
    type: constants.ADD_INPUT_CARD;
    cardType: INPUT_CARD;
    value?: number;
    targetName?: string;
}
export interface RemoveInputCard {
    id: number;
    type: constants.REMOVE_INPUT_CARD;
    cardType: INPUT_CARD;
    value?: number;
    targetName?: string;
}

export interface UpdateInputCard {
    id: number;
    value: number;
    cardType: INPUT_CARD;
    targetName: string;
    type: constants.UPDATE_INPUT_CARD;
}

export type InputAction = UpdateInputCard | AddInputCard | RemoveInputCard;