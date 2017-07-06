import {fork, all} from 'redux-saga/effects'
import {watchGetDatasets, getDatasets, watchAddFile} from './dataSaga'

export default function* root() {
    yield all([
        fork(watchGetDatasets),
        fork(watchAddFile),
        fork(getDatasets)
    ])
}
