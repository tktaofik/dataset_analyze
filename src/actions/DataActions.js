import * as types from '../constants/ActionTypes';
import {xlsx_to_json}from '../utils/xlsx_to_json'
import {saveDataSetAPI, getDataSetsAPI} from '../api/dataset';

export function updateDataSets(res) {
    let dataSets = res.length ? res : [];
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

export function addFile(uploadedFile) {
    return (dispatch) => {
        return xlsx_to_json(uploadedFile).then(dataSet => {
            dispatch(saveDataSet(dataSet))
        }).catch(error => {
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
        const tables = data.selectedDataSet.attributes.tables;
        const selectedTableName = tables.find(table => {
            return table.tableName === tableName;
        });
        dispatch(switchTable(selectedTableName));
    };
}
