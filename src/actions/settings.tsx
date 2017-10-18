import * as constants from '../constants';
import { SyntheticEvent } from 'react';

export interface UpdateNumericSetting {
    value: number;
    targetName: string;
    type: constants.UPDATE_NUMERIC_SETTING;
}

export interface UpdateMulligan {
    value: boolean;
    targetName: string;
    type: constants.UPDATE_DRAW_MULLIGAN;
}
export type SettingsAction = UpdateNumericSetting | UpdateMulligan;

export const updateAmount = (evt: SyntheticEvent<HTMLInputElement>): SettingsAction => {
    return {
        value: parseInt(evt.currentTarget.value, 10),
        targetName: evt.currentTarget.name,
        type: constants.UPDATE_NUMERIC_SETTING,
    };
};

export const updateMulligan = (evt: SyntheticEvent<HTMLInputElement>): SettingsAction => {
    return {
        value: evt.currentTarget.checked,
        targetName: evt.currentTarget.name,
        type: constants.UPDATE_DRAW_MULLIGAN
    };
};