import * as types from '../constants/ActionTypes';

export function showSpinner(spinnerState) {
    return {
        type: types.SHOW_SPINNER,
        spinnerState
    }
}

export function collapseSideBar(collapseSideBar) {
    return {
        type: types.COLLAPSE_SIDE_BAR,
        collapseSideBar
    }
}

export function showNotification(notification) {
    return {
        type: types.SHOW_NOTIFICATION,
        notification
    }
}
export function hideNotification() {
    return {
        type: types.HIDE_NOTIFICATION
    }
}