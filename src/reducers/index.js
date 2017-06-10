import {combineReducers} from 'redux';
import user from './user';
import addData from './data';

const rootReducer = combineReducers({
    user,
    addData
});

export default rootReducer;
