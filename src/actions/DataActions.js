import * as types from '../constants/ActionTypes';
import {xlsx_to_json}from '../utils/xlsx_to_json'
import Q from 'q';

export function updateDataSets(dataSets) {
    return {
        type: types.SAVE_DATA_SETS,
        dataSets
    }
}

export function addFiles(uploadedFiles) {
    return function (dispatch) {
        Q.all(uploadedFiles.map(file => {
            return xlsx_to_json(file)
        })).then(dataSets => {
            dispatch(updateDataSets(dataSets));
            dispatch(saveDataSets(dataSets));
        }).catch(error => {
            throw(error);
        })
    };
}

export function saveDataSets(dataSets) {
    return function (dispatch) {
        //todo: save the datasets to the database and
    };
}
