import drawCards from './drawCards';
import { combineReducers, Reducer } from 'redux';
import { StoreState } from '../types/index';

const reducers: Reducer<StoreState> = combineReducers({drawCards});
export default reducers;
