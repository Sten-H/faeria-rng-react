import { CalculateAction } from '../../actions/calculate';
import * as constants from '../../constants/index';
import { ResultState } from '../../types/index';
import calculatePing from './probability_logic/ping-calculation';
import calculateDraw from './probability_logic/draw-calculation';
import * as helpers from './probability_logic/helpers';
import { store } from '../../index';

const resultStateInitValue = {
    draw: {timeTaken: -1, desiredOutcomes: -1},
    ping: {timeTaken: -1, desiredOutcomes: -1}
};
/**
 * Returns a promise which resolves to an object with needed information
 * @param  {Function}    func function to time
 * @param  {Array} args  func arguments
 * @return {Promise}     Returns a promise that resolves to an object with t and results values
 */
export function timeFunction (func: Function, ...args: Array<{}>): Promise<{t: number, results: {}}> {
    return new Promise((resolve, reject) => {
        const t0: number = performance.now(),
            returnValue: {} = func(...args),
            deltaTime: number = performance.now() - t0;
        resolve({t: deltaTime, results: returnValue});
    });
}
/**
 * I might need to pass this reducer the entire state so it can clamp numbers such as ping and draw amount.
 * Not just clamp them for calculation but so user can see that they were clamped before calculation.
 */
export default function results (result: ResultState = resultStateInitValue, action: CalculateAction) {
    switch (action.type) {
        case constants.CALCULATE_DRAW:
            const {settings: { drawAmount }, drawCards} = store.getState();
            const drawProbability = calculateDraw(drawCards, drawAmount);
            return {
                ...result,
                draw: {timeTaken: 111, desiredOutcomes: helpers.roundToDecimal(1, drawProbability * 1000)}
            };
        case constants.CALCULATE_PING: {
            const {settings: { pingAmount }, creatureCards} = store.getState();
            const creatureInfo = creatureCards.map((c) => ({id: c.id, hp: c.hp, toDie: Boolean(c.toDie)}));
            const pingProbability = calculatePing(creatureInfo, pingAmount);
            return {
                ...result,
                ping: {timeTaken: 999, desiredOutcomes: helpers.roundToDecimal(1, pingProbability * 1000)}
            };
        }
        default:
            return {
                ...result
            };
    }
}