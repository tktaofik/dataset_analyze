import * as types from '../constants/ActionTypes';

let initialStates = {
    datasets: [],
};

export default function addDataReducer(state = initialStates, action) {
    switch (action.type) {
        // case types.SAVE_DATA_SETS:
        //     return Object.assign({}, state, {
        //         dataSets: [...state.dataSets, ...action.dataSets],
        //     });
        case types.UPDATE_DATA_SETS:
            return Object.assign({}, state, {
                datasets: [...state.datasets, ...action.datasets],
            });

        case types.SWITCH_DATASET:
            return Object.assign({}, state, {
                selectedDataSet: action.datasetId
            });

        case types.SELECT_TABLE:
            return Object.assign({}, state, {
                selectedDataSetTable: action.table
            });

        default:
            return state;
    }
}
