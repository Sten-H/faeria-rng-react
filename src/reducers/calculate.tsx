import { CalculateAction } from '../actions/calculate';
import * as constants from '../constants/index';
import { ResultState } from '../types/index';
// import { store } from '../index';
interface Result {
    timeTaken: number;
    desiredOutcomes: number;
}
const resultStateInitValue = {
    draw: {timeTaken: -1, desiredOutcomes: -1},
    ping: {timeTaken: -1, desiredOutcomes: -1}
};
const doSomethingDraw = ({timeTaken, desiredOutcomes}: Result) => {
    return {
        timeTaken: timeTaken + 10,
        desiredOutcomes: desiredOutcomes + 10
    };
};
const doSomethingPing = ({timeTaken, desiredOutcomes}: Result) => {
    return {
        timeTaken: timeTaken + 100,
        desiredOutcomes: desiredOutcomes + 100
    };
};
/**
 * I might need to pass this reducer the entire state so it can clamp numbers such as ping and draw amount.
 * Not just clamp them for calculation but so user can see that they were clamped before calculation.
 */
export default function results(result: ResultState = resultStateInitValue, action: CalculateAction) {
    switch (action.type) {
        case constants.CALCULATE_DRAW:
            // const newDraw = {...result.draw};
            // const {drawCards, settings}= store.getState();
            return {
                ...result,
                draw: doSomethingDraw(result.draw)
            };
        case constants.CALCULATE_PING: {
            return {
                ...result,
                ping: doSomethingPing(result.ping)
            };
        }
        default:
            return {
                ...result
            };
    }
}