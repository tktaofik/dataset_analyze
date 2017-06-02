import * as types from '../constants/ActionTypes';
import {xlsx_to_json}from '../utils/xlsx_to_json'
import Q from 'q';

export function convertExcelToJson(message) {
    return {
        type: types.CONVERT_EXCEL_JSON,
        message
    }
}

export function addFile(uploadedFiles) {
    //TODO: create better logic to separate the tables and use promise properly

    return function (dispatch) {
        let filesToJsonRequests = uploadedFiles.map( file => { return xlsx_to_json(file) });

        console.log( filesToJsonRequests );

        Q.all(filesToJsonRequests).then( dataSets => {
          console.log(dataSets);
        })


        // return xlsx_to_json(uploadedFiles).then(files => {
        //     console.log(files);
        //     // dispatch(loadCoursesSuccess(courses));
        // }).catch(error => {
        //     throw(error);
        // })
    };

    // return {
    //     type: types.ADD_FILE,
    //     uploadedFiles
    // }
}
