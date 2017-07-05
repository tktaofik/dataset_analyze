export const SHOW_SPINNER = 'SHOW_SPINNER';
export const COLLAPSE_SIDE_BAR = 'COLLAPSE_SIDE_BAR';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

function action(type, payload) {
    return {type, payload}
}

export const showSpinner = (spinnerState) => action(SHOW_SPINNER, spinnerState);
export const collapseSideBar = (collapseSideBar) => action(COLLAPSE_SIDE_BAR, collapseSideBar);
export const showNotification = (notification) => action(SHOW_NOTIFICATION, notification);
export const hideNotification = (notification) => action(SHOW_NOTIFICATION, false);