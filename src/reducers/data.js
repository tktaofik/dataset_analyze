import * as types from '../constants/ActionTypes';

let initialStates = {
    dataSets: [],
    selectedDataSet: null,
    selectedDataSetTable: null
};

export default function addDataReducer(state = initialStates, action) {
    switch (action.type) {
        case types.SAVE_DATA_SETS:
            return Object.assign({}, state, {
                dataSets: [...state.dataSets, ...action.dataSets],
            });

        case types.SWITCH_DATASET:
            return Object.assign({}, state, {
                selectedDataSet: action.dataSet
            });

        case types.SELECT_TABLE:
            return Object.assign({}, state, {
                selectedDataSetTable: action.table
            });

        default:
            return state;
    }
}
