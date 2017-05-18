import * as types from '../constants/ActionTypes';

export function convertExcelToJson() {
    return {
        type: types.CONVERT_EXCEL_JSON
    }
}

export function addFile(uploadedFiles) {
    return {
        type: types.ADD_FILE,
        uploadedFiles
    }
}
