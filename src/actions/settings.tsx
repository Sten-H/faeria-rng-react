import * as constants from '../constants';
import { EventProps } from './commonActions';

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

export const updateAmount = (evt: EventProps): SettingsAction => {
    return {
        value: parseInt(evt.currentTarget.value, 10),
        targetName: evt.currentTarget.name,
        type: constants.UPDATE_NUMERIC_SETTING,
    };
};

export const updateMulligan = (evt: EventProps): SettingsAction => {
    return {
        value: evt.currentTarget.checked!,
        targetName: evt.currentTarget.name,
        type: constants.UPDATE_DRAW_MULLIGAN
    };
};