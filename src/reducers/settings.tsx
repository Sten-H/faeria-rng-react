import { SettingsState } from '../types/index';
import { SettingsAction } from '../actions/settings';
import * as constants from '../constants';

/**
 * clamping to actual min value (3) does not work very well because then you can't write 11 for example because
 * when 1 is written it will be clamped to 3. Not sure how to solve this effectively.
 */
// const clampDrawAmount = (drawAmount: number): number=>
//     Math.max(Math.min(drawAmount, constants.MAX_DRAW_AMOUNT), 1);
const isNaN = (value: {}) => {
    return Number.isNaN(Number(value));
};
export default function settings(state: SettingsState = {drawAmount: 10, mulligan: false, pingAmount: 4},
                                 action: SettingsAction): SettingsState {
    switch (action.type) {
        case constants.UPDATE_NUMERIC_SETTING:
            if (isNaN(action.value)) {
                return state;
            }
            return {
                ...state,
                [action.targetName]: action.value
            };
        case constants.UPDATE_DRAW_MULLIGAN:
            return {
                ...state,
                mulligan: action.value
            };
        default:
            return state;
    }
}