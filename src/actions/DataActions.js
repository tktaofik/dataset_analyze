import _ from 'lodash';
import {datasetApi} from '../services/dataset';
import {showSpinner, showNotification, collapseSideBar} from './AppActions';

export const SWITCH_TABLE = 'SWITCH_TABLE';
export const UPDATE_DATA_SETS = 'UPDATE_DATA_SETS';
export const SET_SELECTED_DATASET = 'SET_SELECTED_DATASET';
export const GET_DATASETS = 'GET_DATASETS';
export const ADD_FILE = 'ADD_FILE';

function action(type, payload) {
    return {type, payload}
}

export const getDatasets = () => action(GET_DATASETS);
export const appendToDatasets = (dataset) => action(UPDATE_DATA_SETS, [...dataset]);
export const setSelectedDataset = (dataset) => action(SET_SELECTED_DATASET, dataset);
export const switchTable = (tableIndex) => action(SWITCH_TABLE, tableIndex);
export const addFile = (uploadedFile) => action(ADD_FILE, uploadedFile);

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

