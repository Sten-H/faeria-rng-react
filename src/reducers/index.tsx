import cards from './cards';
import {combineReducers, Reducer} from 'redux';
import {StoreState} from '../types/index';

const reducers: Reducer<StoreState> = combineReducers({cards});
export default reducers;
