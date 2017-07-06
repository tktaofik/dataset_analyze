import * as dataActions from '../actions/DataActions';
import * as appActions from '../actions/AppActions';
import {put, call, takeLatest, fork} from 'redux-saga/effects'
import {datasetApi} from '../services/dataset'
import {xlsx_to_json}from '../utils/xlsx_to_json'
import _ from 'lodash';

/******************************************************************************/
/******************************* EFFECTS *************************************/
/******************************************************************************/

export function* getDatasets() {
    try {
        yield put(appActions.collapseSideBar(true));
        yield put(appActions.showSpinner(true));

        const datasets = yield call(datasetApi.getDatasets);

        yield put(dataActions.appendToDatasets(datasets))
    } catch (error) {
        yield fork(errorOccurred, error);
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
        yield fork(errorOccurred, error);
    } finally {
        yield put(appActions.collapseSideBar(false));
        yield put(appActions.showSpinner(false));
    }
}

export function* updateDataset(action) {
    const {dataset} = action.payload;

    try {
        yield put(appActions.collapseSideBar(true));
        yield put(appActions.showSpinner(true));

        const result = yield call(datasetApi.updateDataset, dataset);

        yield put(dataActions.switchTable('0'));
        yield put(dataActions.setSelectedDataset(result));
        yield put(appActions.showNotification({
            message: dataset.attributes.name,
            description: `${dataset.attributes.name} has been uploaded`,
            duration: 4.5,
            type: "success"
        }))
    } catch (error) {
        yield fork(errorOccurred, error);
    } finally {
        yield put(appActions.collapseSideBar(false));
        yield put(appActions.showSpinner(false));
    }
}

export function* addFile(action) {
    const {uploadedFile} = action.payload;

    try {
        yield put(appActions.collapseSideBar(true));
        yield put(appActions.showSpinner(true));
        const dataset = yield call(xlsx_to_json, uploadedFile);
        yield fork(saveDataset, dataset)
    } catch (error) {
        yield fork(errorOccurred, error);
    } finally {
        yield put(appActions.collapseSideBar(false));
        yield put(appActions.showSpinner(false));
    }
}

export function* getDatasetById(action) {
    const {id} = action.payload;

    try {
        yield put(appActions.collapseSideBar(true));
        yield put(appActions.showSpinner(true));
        const dataset = yield call(datasetApi.getDatasetById, id);
        if (!_.isEmpty(dataset.attributes)){
            yield put(dataActions.setSelectedDataset(dataset))
        }
    } catch (error) {
        yield fork(errorOccurred, error);
    } finally {
        yield put(appActions.collapseSideBar(false));
        yield put(appActions.showSpinner(false));
    }
}

export function* errorOccurred(error) {
    yield put(appActions.showNotification({
        message: error,
        description: "",
        duration: 0,
        type: "error"
    }))
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
export function* watchGetDatasetById() {
    yield takeLatest(dataActions.GET_DATASET_BY_ID, getDatasetById)
}
export function* watchUpdateDataset() {
    yield takeLatest(dataActions.UPDATE_DATA_SET, updateDataset)
}