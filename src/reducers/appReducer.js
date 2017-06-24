import * as types from '../constants/ActionTypes';

let initialStates = {
    showSpinner: false,
    notification: null
};

export default function appReducer(state = initialStates, action) {
    switch (action.type) {
        case types.SHOW_SPINNER:
            return Object.assign({}, state, {
                showSpinner: action.state,
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
