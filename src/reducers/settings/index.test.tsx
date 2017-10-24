import settingsReducer from './';
import * as constants from '../../constants';
import { SettingsAction } from '../../actions/settings';

describe('Settings reducer', () => {
    it('Should update drawAmount', () => {
        const state = {
            mulligan: false,
            drawAmount: 20,
            pingAmount: 4
        };
        const action: SettingsAction = {
            value: 15,
            targetName: 'drawAmount',
            type: constants.UPDATE_NUMERIC_SETTING,
        };
        const newState = settingsReducer(state, action);
        expect(newState.drawAmount).toEqual(15);
        expect(newState.pingAmount).toEqual(4);  // should be unchanged
    });
    it('Should update pingAmount', () => {
        const state = {
            mulligan: false,
            drawAmount: 20,
            pingAmount: 9
        };
        const action: SettingsAction = {
            value: 2,
            targetName: 'pingAmount',
            type: constants.UPDATE_NUMERIC_SETTING,
        };
        const newState = settingsReducer(state, action);
        expect(newState.pingAmount).toEqual(2);
        expect(newState.drawAmount).toEqual(20);  // Should be unchanged
    });
    it('Should update mulligan', () => {
        const state = {
            mulligan: false,
            drawAmount: 20,
            pingAmount: 9
        };
        const action: SettingsAction = {
            value: true,
            targetName: 'pingAmount',
            type: constants.UPDATE_DRAW_MULLIGAN,
        };
        const newState = settingsReducer(state, action);
        expect(newState.mulligan).toBe(true);
    });
});