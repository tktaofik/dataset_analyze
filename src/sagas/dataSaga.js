import * as dataActions from '../actions/DataActions';
import * as appActions from '../actions/AppActions';
import {put, call, takeLatest, fork} from 'redux-saga/effects'
import {datasetApi} from '../services/dataset'
import {xlsx_to_json}from '../utils/xlsx_to_json'
import _ from 'lodash';

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/
export const  dataSagas = [
    takeLatest(dataActions.GET_DATASETS, getDatasets),
    takeLatest(dataActions.ADD_FILE, addFile),
    takeLatest(dataActions.GET_DATASET_BY_ID, getDatasetById),
    takeLatest(dataActions.UPDATE_DATA_SET, updateDataset)
];

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
        //TODO: catch error type and throw error 
        yield fork(errorOccurred, error);
    } finally {
        yield put(appActions.collapseSideBar(false));
        yield put(appActions.showSpinner(false));
    }
}

export function* saveDataset(dataset) {
    try {
        const result = yield call(datasetApi.saveDataset, dataset);

        yield put(appActions.collapseSideBar(true));
        yield put(appActions.showSpinner(true));
        yield put(dataActions.appendToDatasets([result]));
        yield put(dataActions.setSelectedDataset(result));
        yield put(appActions.showNotification({
            message: result.attributes.name,
            description: `${result.attributes.name} has been uploaded`,
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
        const result = yield call(datasetApi.updateDataset, dataset.id, dataset);

        yield put(dataActions.switchTable('0'));
        yield put(dataActions.updateDatasets(result));
        yield put(dataActions.setSelectedDataset(result));
        yield put(appActions.showNotification({
            message: dataset.attributes.name,
            description: `${dataset.attributes.name} updated`,
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
    console.log(error)
    yield put(appActions.showNotification({
        message: error.message,
        description: "",
        duration: 0,
        type: "error"
    }))
}