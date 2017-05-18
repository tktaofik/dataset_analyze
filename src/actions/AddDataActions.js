import * as types from '../constants/ActionTypes';

export function convertExcelToJson(message) {
    return {
        type: types.CONVERT_EXCEL_JSON,
        message
    }
}

export function addFile(uploadedFiles) {
    return {
        type: types.ADD_FILE,
        uploadedFiles
    }
}
