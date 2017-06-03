import * as types from '../constants/ActionTypes';
import initialStates from './initialStates';

export default function addDataReducer(state = initialStates, action) {

    switch (action.type) {
        case types.SAVE_DATA_SETS:
            return Object.assign({}, state, {
                uploadedFiles:  [...action.uploadedFiles, ...state.uploadedFiles],
            });

        default:
            return state;
    }
}
