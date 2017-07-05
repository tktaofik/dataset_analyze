import _ from 'lodash';
import {xlsx_to_json}from '../utils/xlsx_to_json'
import {datasetApi} from '../services/dataset';
import {showSpinner, showNotification, collapseSideBar} from './AppActions';

export const SWITCH_TABLE = 'SWITCH_TABLE';
export const UPDATE_DATA_SETS = 'UPDATE_DATA_SETS';
export const SET_SELECTED_DATASET = 'SET_SELECTED_DATASET';
export const GET_DATASETS = 'GET_DATASETS';

function action(type, payload) {
    return {type, payload}
}

export const getDatasets = () => action(GET_DATASETS);
export const appendToDatasets = (dataset) => action(UPDATE_DATA_SETS, [...dataset]);
export const setSelectedDataset = (dataset) => action(SET_SELECTED_DATASET, dataset);
export const switchTable = (tableIndex) => action(SWITCH_TABLE, tableIndex);

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
        return datasetApi.saveDataset(dataset).then(dataset => {
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

export function getDatasetById(id) {
    return (dispatch) => {
        dispatch(showSpinner(true));
        dispatch(collapseSideBar(true));
        datasetApi.getDatasetById(id).then(dataset => {
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

export function updateDataset(newDataset) {
    return (dispatch) => {
        datasetApi.updateDataset(newDataset.id, newDataset).then(dataset => {
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

