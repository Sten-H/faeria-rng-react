import drawCards from './drawCards';
import drawSettings from './drawSettings';
import results from './calculate';
import { combineReducers, Reducer } from 'redux';
import { StoreState } from '../types/index';

const reducers: Reducer<StoreState> = combineReducers({drawSettings, drawCards, results});
export default reducers;
