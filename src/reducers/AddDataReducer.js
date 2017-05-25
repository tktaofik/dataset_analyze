import * as types from '../constants/ActionTypes';
import initialStates from './initialStates';

export default function addDataReducer(state = initialStates, action) {
    switch (action.type) {
        case types.CONVERT_EXCEL_JSON:
            alert(action.message);
            return state;

        case types.ADD_FILE:
            return Object.assign({}, state, {
                uploadedFiles:  [...action.uploadedFiles, ...state.uploadedFiles],
            });

        default:
            return state;
    }
}
