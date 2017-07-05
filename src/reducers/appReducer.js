import * as types from '../constants/ActionTypes';

let initialStates = {
    showSpinner: false,
    notification: null,
    collapseSideBar: false
};

export default function appState(state = initialStates, action) {
    switch (action.type) {
        case types.SHOW_SPINNER:
            return Object.assign({}, state, {
                showSpinner: action.payload,
            });

        case types.COLLAPSE_SIDE_BAR:
            return Object.assign({}, state, {
                collapseSideBar: action.payload,
            });

        case types.SHOW_NOTIFICATION:
            return Object.assign({}, state, {
                notification: action.payload,
            });

        default:
            return state;
    }
}
