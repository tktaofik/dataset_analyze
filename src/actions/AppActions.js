export const SHOW_SPINNER = 'SHOW_SPINNER';
export const COLLAPSE_SIDE_BAR = 'COLLAPSE_SIDE_BAR';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

function action(type, payload) {
    return {type, payload}
}

function notification(arg) {
    if (arg.message) {
        return {
            message: arg.message,
            description: arg.description ? arg.description : "",
            duration: arg.duration ? arg.duration : 4,
            placement: arg.placement ? arg.placement : 'topRight',
            type: arg.type ? arg.type : null,
        }
    } else {
        return null
    }
}

export const showSpinner = (spinnerState) => action(SHOW_SPINNER, spinnerState);
export const collapseSideBar = (collapseSideBar) => action(COLLAPSE_SIDE_BAR, collapseSideBar);
export const showNotification = (arg) => action(SHOW_NOTIFICATION, notification(arg));
export const hideNotification = (notification) => action(SHOW_NOTIFICATION, false);