import * as constants from '../constants';

interface CalculateDraw {
    type: constants.CALCULATE_DRAW;
}
interface CalculatePing {
    type: constants.CALCULATE_PING;
}

export type CalculateAction = CalculateDraw | CalculatePing;

export const calculatePing = (): CalculateAction => {
    return {
        type: constants.CALCULATE_PING
    };
};

export const calculateDraw = (): CalculateAction => {
    return {
        type: constants.CALCULATE_DRAW
    };
};
