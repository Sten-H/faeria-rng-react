import drawCards from './drawCards/index';
import settings from './settings/index';
import results from './calculate/index';
import creatureCards from './creatureCards/index';

import { combineReducers, Reducer } from 'redux';
import { StoreState } from '../types/index';

export const reducers: Reducer<StoreState> = combineReducers({settings, drawCards, creatureCards, results});
export default reducers;
