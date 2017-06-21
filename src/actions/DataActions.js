import * as types from '../constants/ActionTypes';
import {xlsx_to_json}from '../utils/xlsx_to_json'
import Q from 'q';
import {saveDataSetAPI, getDataSetsAPI} from '../api/dataset';

export function updateDataSets(arrayRes) {
    let dataSets = [];

    if(arrayRes.length) {
        dataSets = arrayRes.map(dataset => {
            return dataset.data_source;
        });
    }
    return {
        type: types.UPDATE_DATA_SETS,
        dataSets
    }
}

export function switchDataSet(dataSet) {
    return {
        type: types.SWITCH_DATASET,
        dataSet
    }
}

export function addFiles(uploadedFiles) {
    return (dispatch) => {
        Q.all(uploadedFiles.map(file => {
            return xlsx_to_json(file)
        })).then(dataSets => {
            dispatch(saveDataSets(dataSets))
        }).catch(error => {
            throw(error);
        })
    };
}

export function saveDataSets(dataSets) {
    return (dispatch) => {
        Q.all(dataSets.map(data => {
            return saveDataSetAPI(data)
        })).then(dataSetsRes => {
            dispatch(updateDataSets(dataSetsRes));
        }).catch(error => {
            throw(error);
        });
    };
}

export function getDataSets() {
    return (dispatch) => {
        getDataSetsAPI().then(dataSetsRes => {
            dispatch(updateDataSets(dataSetsRes));
        }).catch(error => {
            throw(error);
        });
    };
}

export function switchTable(table) {
    return {
        type: types.SELECT_TABLE,
        table
    }
}

export function selectTable(tableName) {
    return (dispatch, getState) => {
        const {data} = getState();
        const selectedTableName = data.selectedDataSet.tables.find(table => {
            return table.tableName === tableName;
        });
        dispatch(switchTable(selectedTableName));
    };
}
