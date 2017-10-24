import * as constants from '../constants';
import { CreatureCardState, DrawCardState, StoreState } from '../types/index';

interface CalculateDraw {
    drawCards: DrawCardState[];
    drawAmount: number;
    mulligan: boolean;
    type: constants.CALCULATE_DRAW;
}
interface CalculatePing {
    creatureCards: CreatureCardState[];
    pingAmount: number;
    type: constants.CALCULATE_PING;
}

export type CalculateAction = CalculateDraw | CalculatePing;

export const calculatePing = (state: StoreState): CalculateAction => {
    const {settings: { pingAmount }, creatureCards} = state;
    return {
        creatureCards,
        pingAmount,
        type: constants.CALCULATE_PING
    };
};

export const calculateDraw = (state: StoreState): CalculateAction => {
    const {settings: { drawAmount, mulligan}, drawCards} = state;
    return {
        drawAmount,
        drawCards,
        mulligan,
        type: constants.CALCULATE_DRAW
    };
};
