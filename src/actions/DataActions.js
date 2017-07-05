import * as types from '../constants/ActionTypes';
import _ from 'lodash';
import {xlsx_to_json}from '../utils/xlsx_to_json'
import {saveDatasetAPI, getDatasetsAPI, getDatasetByIdAPI, updateDatasetAPI} from '../api/dataset';
import {showSpinner, showNotification, collapseSideBar} from './AppActions';

// export function updateDataset(dataset) {
//     return {
//         type: types.UPDATE_DATA_SETS,
//         dataset
//     }
// }

// export function addDataset(dataset) {
//     return {
//         type: types.ADD_DATA_SET,
//         dataset
//     }
// }

// export function deleteDataset() {
//     return {
//         type: types.ADD_DATA_SET,
//         dataset
//     }
// }

function action(type, payload) {
    return {type, payload}
}

export const appendToDatasets = (dataset) => action(types.UPDATE_DATA_SETS, [...dataset]);
export const setSelectedDataset = (dataset) => action(types.SET_SELECTED_DATASET, dataset);

export function addFile(uploadedFile) {
    return (dispatch) => {
        dispatch(showSpinner(true));
        dispatch(collapseSideBar(true));
        setTimeout(() => {
            return xlsx_to_json(uploadedFile)
                .then(dataset => {
                    dispatch(collapseSideBar(true));
                    dispatch(saveDataset(dataset));
                    dispatch(showSpinner(false));
                })
                .catch(error => {
                    dispatch(showSpinner(false));
                    throw(error);
                })
        }, 300);

    };
}

export function saveDataset(dataset) {
    return (dispatch) => {
        dispatch(showSpinner(true));
        dispatch(collapseSideBar(true));
        return saveDatasetAPI(dataset).then(dataset => {
            dispatch(collapseSideBar(false));
            dispatch(showSpinner(false));
            dispatch(appendToDatasets([dataset]));
            dispatch(setSelectedDataset(dataset));
            dispatch(showNotification({
                message: dataset.attributes.name,
                description: `${dataset.attributes.name} has been uploaded`,
                duration: 4.5,
                type: "success"
            }));

        }).catch(error => {
            dispatch(showNotification({
                message: error,
                description: `${dataset.fileName} upload failed with error ${error}`,
                duration: 0,
                type: "error"
            }));
            throw(error);
        });
    };
}

export function getDatasets() {
    return (dispatch) => {
        dispatch(showSpinner(true));
        dispatch(collapseSideBar(true));
        getDatasetsAPI().then(datasets => {
            dispatch(collapseSideBar(false));
            dispatch(showSpinner(false));
            dispatch(appendToDatasets(datasets));
        }).catch(error => {
            dispatch(showSpinner(false));
            throw(error);
        });
    };
}

export function getDatasetById(id) {
    return (dispatch) => {
        dispatch(showSpinner(true));
        dispatch(collapseSideBar(true));
        getDatasetByIdAPI(id).then(dataset => {
            dispatch(collapseSideBar(false));
            dispatch(showSpinner(false));
            // We should not have a dataset with  empty attributes
            if (!_.isEmpty(dataset.attributes)){
                dispatch(setSelectedDataset(dataset))
            }
        }).catch(error => {
            dispatch(showSpinner(false));
            console.log(error)
        });
    };
}

export function switchTable(tableIndex) {
    return {
        type: types.SWITCH_TABLE,
        tableIndex
    }
}

export function updateDataset(newDataset) {
    return (dispatch) => {
        updateDatasetAPI(newDataset.id, newDataset).then(dataset => {
            dispatch(switchTable('0'));
            dispatch(setSelectedDataset(dataset));
            dispatch(showNotification({
                message: dataset.attributes.name,
                description: "table has been deleted",
                duration: 4.5,
                type: "success"
            }));
        }).catch(error => {
            dispatch(showNotification({
                message: error,
                description: `delete table failed with error ${error}`,
                duration: 0,
                type: "error"
            }));
            throw(error);
        })
    };
}

