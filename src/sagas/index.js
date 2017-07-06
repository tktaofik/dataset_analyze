import {all} from 'redux-saga/effects'
import { dataSagas } from './dataSaga'

export default function* root() {
    yield all([
        ...dataSagas
    ])
}
