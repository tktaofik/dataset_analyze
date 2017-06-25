import * as types from '../constants/ActionTypes';

let initialStates = {
    datasets: [],
    selectedTableIndex: 0,
    selectedDatasetId: null
};

export default function dataState(state = initialStates, action) {
    switch (action.type) {
        case types.SHOW_SPINNER:
            return Object.assign({}, state, {
                showSpinner: action.state,
            });
        case types.UPDATE_DATA_SETS:
            return Object.assign({}, state, {
                datasets: [...state.datasets, ...action.datasets],
            });

        case types.SET_SELECTED_DATASET_ID:
            return Object.assign({}, state, {
                selectedDatasetId: action.datasetId,
                selectedTableIndex: 0
            });

        case types.SWITCH_TABLE:
            return Object.assign({}, state, {
                selectedTableIndex: action.tableIndex
            });

        default:
            return state;
    }
}
