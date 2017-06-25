import {combineReducers} from 'redux';
import appState from './appReducer';
import dataState from './dataReducer';

export const rootReducer = combineReducers({
    appState,
    dataState
});

