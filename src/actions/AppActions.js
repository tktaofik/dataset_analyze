import * as types from '../constants/ActionTypes';

function action(type, payload) {
    return {type, payload}
}

export const showSpinner = (spinnerState) => action(types.SHOW_SPINNER, spinnerState);
export const collapseSideBar = (collapseSideBar) => action(types.COLLAPSE_SIDE_BAR, collapseSideBar);
export const showNotification = (notification) => action(types.SHOW_NOTIFICATION, notification);
export const hideNotification = (notification) => action(types.SHOW_NOTIFICATION, false);