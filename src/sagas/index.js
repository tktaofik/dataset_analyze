import {fork, all} from 'redux-saga/effects'
import {watchGetDatasets, getDatasets} from './dataSaga'

export default function* root() {
    yield all([
        fork(watchGetDatasets),
        fork(getDatasets)
    ])
}
