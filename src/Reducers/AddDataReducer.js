import * as types from '../constants/ActionTypes';
import initialStates from './initialStates';

export default function addDataReducer(state = initialStates, action) {

    switch (action.type) {
        case types.SAVE_DATA_SETS:
            const dataSets = action.dataSets;
            return Object.assign({}, state, {
                dataSets: [...state.dataSets, ...dataSets]
            });

        default:
            return state;
    }
}
