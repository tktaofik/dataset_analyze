import * as actionType from '../actions/AppActions';

let initialStates = {
    showSpinner: false,
    notification: null,
    collapseSideBar: false
};

export default function appState(state = initialStates, action) {
    switch (action.type) {
        case actionType.SHOW_SPINNER:
            return Object.assign({}, state, {
                showSpinner: action.payload,
            });

        case actionType.COLLAPSE_SIDE_BAR:
            return Object.assign({}, state, {
                collapseSideBar: action.payload,
            });

        case actionType.SHOW_NOTIFICATION:
            return Object.assign({}, state, {
                notification: action.payload,
            });

        default:
            return state;
    }
}
