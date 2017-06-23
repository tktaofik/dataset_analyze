import * as types from '../constants/ActionTypes';

let initialStates = {
    showSpinner: false
};

export default function appReducer(state = initialStates, action) {
    switch (action.type) {
        case types.SHOW_SPINNER:
            return Object.assign({}, state, {
                showSpinner: action.state,
            });

        default:
            return state;
    }
}
