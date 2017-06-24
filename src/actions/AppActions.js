import * as types from '../constants/ActionTypes';

export function showSpinner(state) {
    return {
        type: types.SHOW_SPINNER,
        state
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