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

        case types.NOTIFICATION:
            return Object.assign({}, state, {
                notification: action.notification,
            });

        default:
            return state;
    }
}
