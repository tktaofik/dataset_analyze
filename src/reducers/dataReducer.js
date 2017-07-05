import * as types from '../constants/ActionTypes';

let initialStates = {
    datasets: [],
    selectedTableIndex: 0,
    selectedDataset: null
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

        case types.SWITCH_TABLE:
            return Object.assign({}, state, {
                selectedTableIndex: action.tableIndex
            });

        case types.SET_SELECTED_DATASET:
            return Object.assign({}, state, {
                selectedDataset: action.dataset
            });

        default:
            return state;
    }
}
