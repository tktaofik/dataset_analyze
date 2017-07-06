export const SWITCH_TABLE = 'SWITCH_TABLE';
export const UPDATE_DATA_SETS = 'UPDATE_DATA_SETS';
export const UPDATE_DATA_SET = 'UPDATE_DATA_SET';
export const SET_SELECTED_DATASET = 'SET_SELECTED_DATASET';
export const GET_DATASETS = 'GET_DATASETS';
export const ADD_FILE = 'ADD_FILE';
export const GET_DATASET_BY_ID = 'GET_DATASET_BY_ID';

function action(type, payload) {
    return {type, payload}
}

export const getDatasets = () => action(GET_DATASETS);
export const appendToDatasets = (dataset) => action(UPDATE_DATA_SETS, {dataset:[...dataset]});
export const setSelectedDataset = (dataset) => action(SET_SELECTED_DATASET, {dataset});
export const switchTable = (tableIndex) => action(SWITCH_TABLE, {tableIndex});
export const addFile = (uploadedFile) => action(ADD_FILE, {uploadedFile});
export const getDatasetById = (id) => action(GET_DATASET_BY_ID, {id});
export const updateDataset = (dataset) => action(UPDATE_DATA_SET, {dataset});
