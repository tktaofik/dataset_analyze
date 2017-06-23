import * as types from '../constants/ActionTypes';
import {xlsx_to_json}from '../utils/xlsx_to_json'
import {saveDataSetAPI, getDataSetsAPI} from '../api/dataset';
import {showSpinner} from './AppActions';

export function updateDataSets(res) {
    let datasets = res.length ? res : [];
    return {
        type: types.UPDATE_DATA_SETS,
        datasets
    }
}

export function switchDataSet(datasetId) {
    return {
        type: types.SWITCH_DATASET,
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
        return saveDataSetAPI(dataSet).then(dataSetRes => {
            dispatch(updateDataSets([dataSetRes]));
        }).catch(error => {
            throw(error);
        });
    };
}

export function getDataSets() {
    return (dispatch) => {
        dispatch(showSpinner(true));
        getDataSetsAPI().then(dataSetsRes => {
            dispatch(showSpinner(false));
            dispatch(updateDataSets(dataSetsRes));
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
