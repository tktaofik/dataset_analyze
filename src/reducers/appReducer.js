import * as types from '../constants/ActionTypes';

let initialStates;

initialStates = {
    showSpinner: false,
    notification: null,
    collapseSideBar: false
};

export default function appReducer(state = initialStates, action) {
    switch (action.type) {
        case types.SHOW_SPINNER:
            return Object.assign({}, state, {
                showSpinner: action.spinnerState,
            });

        case types.COLLAPSE_SIDE_BAR:
            return Object.assign({}, state, {
                collapseSideBar: action.collapseSideBar,
            });

        case types.SHOW_NOTIFICATION:
            return Object.assign({}, state, {
                notification: action.notification,
            });

        case types.HIDE_NOTIFICATION:
            return Object.assign({}, state, {
                notification: false,
            });

        default:
            return state;
    }
}
