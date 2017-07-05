import * as dataAction from '../actions/DataActions';

let initialStates = {
    datasets: [],
    selectedTableIndex: 0,
    selectedDataset: null
};

export default function dataState(state = initialStates, action) {
    switch (action.type) {
        case dataAction.UPDATE_DATA_SETS:
            return Object.assign({}, state, {
                datasets: [...state.datasets, ...action.payload],
            });

        case dataAction.SWITCH_TABLE:
            return Object.assign({}, state, {
                selectedTableIndex: action.tableIndex
            });

        case dataAction.SET_SELECTED_DATASET:
            return Object.assign({}, state, {
                selectedDataset: action.payload
            });

        default:
            return state;
    }
}
