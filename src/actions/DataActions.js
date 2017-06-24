import * as types from '../constants/ActionTypes';
import {xlsx_to_json}from '../utils/xlsx_to_json'
import {saveDataSetAPI, getDataSetsAPI,} from '../api/dataset';
import {showSpinner, showNotification} from './AppActions';

export function appendToDatasets(dataset) {
    return {
        type: types.UPDATE_DATA_SETS,
        datasets: [...dataset]
    }
}

export function setSelectedDataSetId(datasetId) {
    return {
        type: types.SET_SELECTED_DATASET_ID,
        datasetId
    }
}

export function addFile(uploadedFile) {
    return (dispatch) => {
        dispatch(showSpinner(true));
        return xlsx_to_json(uploadedFile)
            .then(dataSet => {
                dispatch(saveDataSet(dataSet));
                dispatch(showSpinner(false));
            })
            .catch(error => {
                dispatch(showSpinner(false));
                throw(error);
            })
    };
}

export function saveDataSet(dataSet) {
    return (dispatch) => {
        return saveDataSetAPI(dataSet).then(dataset => {
            dispatch(appendToDatasets([dataset]));
            dispatch(setSelectedDataSetId(dataset.id));
            dispatch(showNotification({
                message: dataset.attributes.name,
                description: `${dataset.attributes.name} has been uploaded`,
                duration: 4.5
            }));

        }).catch(error => {
            dispatch(showNotification({message: error}));
            throw(error);
        });
    };
}

export function getDataSets() {
    return (dispatch) => {
        dispatch(showSpinner(true));
        getDataSetsAPI().then(dataSetsRes => {
            dispatch(showSpinner(false));
            dispatch(appendToDatasets(dataSetsRes));
        }).catch(error => {
            dispatch(showSpinner(false));
            throw(error);
        });
    };
}

export function switchTable(tableIndex) {
    return {
        type: types.SWITCH_TABLE,
        tableIndex
    }
}
