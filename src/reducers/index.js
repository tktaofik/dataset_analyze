import {combineReducers} from 'redux';
import user from './UserReducer';
import addData from './AddDataReducer';

const rootReducer = combineReducers({
    user,
    addData
});

export default rootReducer;
