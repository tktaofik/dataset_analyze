import {combineReducers} from 'redux';
import data from './dataReducer';
import app from './appReducer';

export const rootReducer = combineReducers({
    app,
    data
});

