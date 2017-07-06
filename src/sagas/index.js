import {fork, all} from 'redux-saga/effects'
import {getDatasets, watchGetDatasets, watchAddFile, watchGetDatasetById, watchUpdateDataset} from './dataSaga'

export default function* root() {
    yield all([
        fork(watchGetDatasets),
        fork(watchAddFile),
        fork(watchGetDatasetById),
        fork(getDatasets),
        fork(watchUpdateDataset)
    ])
}
