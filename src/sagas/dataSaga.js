import * as dataActions from '../actions/DataActions';
import {put, call, takeLatest} from 'redux-saga/effects'
import { datasetApi } from '../services/dataset'

export function* watchGetDatasets() {
    yield takeLatest(dataActions.GET_DATASETS, getDatasets)
}

export function* getDatasets() {
    const products = yield call(datasetApi.getDatasets);
    yield put(dataActions.appendToDatasets(products))
}