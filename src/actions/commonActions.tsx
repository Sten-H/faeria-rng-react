import * as constants from '../constants';

/**
 * These types are used by actions/draw and actions/ping
 */
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

// This interface takes out the interesting parts from SyntheticEvent<HTMLInputElement> click event
// I use this to be able to easily create mock events in tests without type errors
export interface EventProps {
    currentTarget: {
        name: string,
        value: string,
        checked?: boolean
    }
}