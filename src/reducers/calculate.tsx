import { CalculateAction } from '../actions/calculate';
import * as constants from '../constants/index';
import {ResultState} from '../types/index';
import { store } from '../index';
const resultStateInitValue = {
    draw: {timeTaken: -1, desiredOutcomes: -1},
    ping: {timeTaken: -1, desiredOutcomes: -1}
};

export default function results(result: ResultState=resultStateInitValue, action: CalculateAction) {
    switch (action.type) {
        case constants.CALCULATE_DRAW:
            const newDraw = {...result.draw};
            const {drawCards, drawSettings}= store.getState();
            console.log(drawCards);
            console.log(drawSettings);
            return {
                ...result,
                draw: {...newDraw}
            };
        case constants.CALCULATE_PING: {
            const newPing = {...result.ping};
            return {
                ...result,
                draw: {...newPing}
            };
        }
        default:
            return {
                ...result
            };
    }
}