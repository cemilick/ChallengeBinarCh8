import {combineReducers} from 'redux';
import {globalReducer} from './globalReducer';

export const allReducers = combineReducers({
  global: globalReducer,
});
