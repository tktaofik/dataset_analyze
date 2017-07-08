import * as dataAction from '../actions/DataActions';
import _ from 'lodash';

let initialStates = {
    datasets: [],
    selectedTableIndex: 0,
    selectedDataset: null
};

export default function dataState(state = initialStates, action) {
    switch (action.type) {
        case dataAction.ADD_TO_DATA_SETS:
            return Object.assign({}, state, {
                datasets: _.uniqBy([...state.datasets, ...action.payload.dataset], 'id'),
            });

        case dataAction.SWITCH_TABLE:
            return Object.assign({}, state, {
                selectedTableIndex: action.payload.tableIndex
            });

        case dataAction.SET_SELECTED_DATASET:
            return Object.assign({}, state, {
                selectedDataset: action.payload.dataset
            });

        case dataAction.UPDATE_DATA_SETS:
            if (!action.payload.dataset.attributes) {
                return Object.assign({}, state, {
                    datasets: state.datasets.filter(dataset => {
                        return dataset.id !== action.payload.dataset.id;
                    })
                });
            } else {
                return Object.assign({}, state, {
                    datasets: state.datasets.map(dataset => {
                        if(dataset.id === action.payload.dataset.id) {
                            return action.payload.dataset;
                        } else {
                            return dataset;
                        }
                    })
                });
            }

        default:
            return state;
    }
}
