import * as dataActions from '../actions/DataActions';
import * as appActions from '../actions/AppActions';
import {put, call, takeLatest, fork} from 'redux-saga/effects'
import {datasetApi} from '../services/dataset'
import {xlsx_to_json}from '../utils/xlsx_to_json'

/******************************************************************************/
/******************************* EFFECTS *************************************/
/******************************************************************************/

export function* getDatasets() {
    try {
        const datasets = yield call(datasetApi.getDatasets);
        yield put(appActions.collapseSideBar(true));
        yield put(appActions.showSpinner(true));
        yield put(dataActions.appendToDatasets(datasets))
    } catch (error) {
        console.log(error)

    } finally {
        yield put(appActions.collapseSideBar(false));
        yield put(appActions.showSpinner(false));
    }
}

export function* saveDataset(data) {
    try {
        const dataset = yield call(datasetApi.saveDataset, data);

        yield put(appActions.collapseSideBar(true));
        yield put(appActions.showSpinner(true));
        yield put(dataActions.appendToDatasets([dataset]));
        yield put(dataActions.setSelectedDataset(dataset));
        yield put(appActions.showNotification({
            message: dataset.attributes.name,
            description: `${dataset.attributes.name} has been uploaded`,
            duration: 4.5,
            type: "success"
        }))
    } catch (error) {
        yield put(appActions.showNotification({
            message: data.fileName,
            description: `${data.fileName} has failed to uploaded`,
            duration: 0,
            type: "error"
        }))
    } finally {
        yield put(appActions.collapseSideBar(false));
        yield put(appActions.showSpinner(false));
    }
}

export function* addFile(action) {
    try {
        const dataset = yield call(xlsx_to_json, action.payload);
        yield fork(saveDataset, dataset)
    } catch (error) {
        console.log(error)
    }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchGetDatasets() {
    yield takeLatest(dataActions.GET_DATASETS, getDatasets)
}
export function* watchAddFile() {
    yield takeLatest(dataActions.ADD_FILE, addFile)
}