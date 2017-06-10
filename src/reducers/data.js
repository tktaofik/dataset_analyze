import * as types from '../constants/ActionTypes';

let initialStates = {
    dataSets: []
};

export default function addDataReducer(state = initialStates, action) {
    switch (action.type) {
        case types.SAVE_DATA_SETS:
            return Object.assign({}, state, {
                dataSets: [...state.dataSets, ...action.dataSets],
            });

        default:
            return state;
    }
}
