import { DrawSettingsState } from '../types/index';
import { DrawSettingsAction } from '../actions/drawSettings';
import * as constants from '../constants';

const clampDrawAmount = (drawAmount: number): number =>
    Math.max(Math.min(drawAmount, constants.MAX_DRAW_AMOUNT), constants.MIN_DRAW_AMOUNT);

export default function drawSettings(state: DrawSettingsState = {draws: 10, mulligan: false},
                                     action: DrawSettingsAction): DrawSettingsState {
    switch (action.type) {
        case constants.UPDATE_DRAW_AMOUNT:
            return {
                ...state,
                [action.targetName]: clampDrawAmount(action.value)
            };
        case constants.UPDATE_DRAW_MULLIGAN:
            return {
                ...state,
                [action.targetName]: action.value
            };
        default:
            return state;
    }
}