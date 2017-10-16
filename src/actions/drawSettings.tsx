import * as constants from '../constants';
import { SyntheticEvent } from 'react';

export interface UpdateDrawAmount {
    value: number;
    targetName: string;
    type: constants.UPDATE_DRAW_AMOUNT;
}

export interface UpdateMulligan {
    value: boolean;
    targetName: string;
    type: constants.UPDATE_DRAW_MULLIGAN;
}
export type DrawSettingsAction = UpdateDrawAmount | UpdateMulligan;

export const updateDrawAmount = (evt: SyntheticEvent<HTMLInputElement>): DrawSettingsAction => {
    return {
        value: parseInt(evt.currentTarget.value, 10),
        targetName: evt.currentTarget.name,
        type: constants.UPDATE_DRAW_AMOUNT,
    };
};

export const updateMulligan = (evt: SyntheticEvent<HTMLInputElement>): DrawSettingsAction => {
    return {
        value: evt.currentTarget.checked,
        targetName: evt.currentTarget.name,
        type: constants.UPDATE_DRAW_MULLIGAN
    };
};