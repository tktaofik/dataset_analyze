import * as types from '../constants/ActionTypes';
import {xlsx_to_json}from '../utils/xlsx_to_json'
import Q from 'q';

export function saveDataSets(dataSets) {
    console.log(dataSets);
    return {
        type: types.SAVE_DATA_SETS,
        dataSets
    }
}

export function addFile(uploadedFiles) {
    return function (dispatch) {
        Q.all(uploadedFiles.map(file => {
            return xlsx_to_json(file)
        })).then(dataSets => {
            debugger
            dispatch(saveDataSets(dataSets));
        }).catch(error => {
            throw(error);
        })
    };
}
