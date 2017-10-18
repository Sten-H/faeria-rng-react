import drawCards from './drawCards';
import settings from './settings';
import results from './calculate';
import { combineReducers, Reducer } from 'redux';
import { StoreState } from '../types/index';

const reducers: Reducer<StoreState> = combineReducers({settings, drawCards, results});
export default reducers;
