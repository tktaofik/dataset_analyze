import * as types from '../constants/ActionTypes';

export function showSpinner(state) {
    return {
        type: types.SHOW_SPINNER,
        state
    }
}