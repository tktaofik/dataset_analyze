import * as types from '../constants/ActionTypes';
import {xlsx_to_json}from '../utils/xlsx_to_json'

export function convertExcelToJson(message) {
    return {
        type: types.CONVERT_EXCEL_JSON,
        message
    }
}

export function addFile(uploadedFiles) {
    //TODO: create better logic to separate the tables and use promise properly

    return function (dispatch) {
        return xlsx_to_json(uploadedFiles).then(files => {
            console.log(files);
            // dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw(error);
        })
    };

    // return {
    //     type: types.ADD_FILE,
    //     uploadedFiles
    // }
}
