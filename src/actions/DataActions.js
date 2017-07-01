import * as types from '../constants/ActionTypes';
import {xlsx_to_json}from '../utils/xlsx_to_json'
import {saveDataSetAPI, getDataSetsAPI, getDataSetByIdAPI} from '../api/dataset';
import {showSpinner, showNotification, collapseSideBar} from './AppActions';

export function appendToDatasets(dataset) {
    return {
        type: types.UPDATE_DATA_SETS,
        datasets: [...dataset]
    }
}

export function setSelectedDataset(dataset) {
    return {
        type: types.SET_SELECTED_DATASET,
        dataset
    }
}

export function addFile(uploadedFile) {
    return (dispatch) => {
        dispatch(showSpinner(true));
        dispatch(collapseSideBar(true));
        setTimeout(() => {
            return xlsx_to_json(uploadedFile)
                .then(dataSet => {
                    dispatch(collapseSideBar(true));
                    dispatch(saveDataSet(dataSet));
                    dispatch(showSpinner(false));
                })
                .catch(error => {
                    dispatch(showSpinner(false));
                    throw(error);
                })
        }, 300);

    };
}

export function saveDataSet(dataSet) {
    return (dispatch) => {
        dispatch(showSpinner(true));
        dispatch(collapseSideBar(true));
        return saveDataSetAPI(dataSet).then(dataset => {
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
            dispatch(showNotification({message: error}));
            throw(error);
        });
    };
}

export function getDataSets() {
    return (dispatch) => {
        dispatch(showSpinner(true));
        dispatch(collapseSideBar(true));
        getDataSetsAPI().then(dataSetsRes => {
            dispatch(collapseSideBar(false));
            dispatch(showSpinner(false));
            dispatch(appendToDatasets(dataSetsRes));
        }).catch(error => {
            dispatch(showSpinner(false));
            throw(error);
        });
    };
}

export function getDataSetById(id) {
    return (dispatch) => {
        dispatch(showSpinner(true));
        dispatch(collapseSideBar(true));
        getDataSetByIdAPI(id).then(dataSetRes => {
            dispatch(collapseSideBar(false));
            dispatch(showSpinner(false));
            dispatch(setSelectedDataset(dataSetRes))
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
