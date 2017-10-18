import drawCards from './drawCards';
import settings from './settings';
import results from './calculate';
import creatureCards from './creatureCards';

import { combineReducers, Reducer } from 'redux';
import { StoreState } from '../types/index';

const reducers: Reducer<StoreState> = combineReducers({settings, drawCards, creatureCards, results});
export default reducers;
