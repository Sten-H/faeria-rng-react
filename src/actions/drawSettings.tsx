import * as constants from '../constants';

export interface UpdateDrawSettings {
    value: string;
    name: string;
    type: constants.UPDATE_DRAW_SETTINGS;
}

export type UpdateDrawSettingsAction = UpdateDrawSettings;

export const updateCard = (): UpdateDrawSettings => {
    return {
        value: "1",
        name: "draws",
        type: constants.UPDATE_DRAW_SETTINGS,
    };
};