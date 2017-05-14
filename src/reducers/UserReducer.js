import * as types from '../constants/ActionTypes';

const initialState = {
    user: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_USER:
            return Object.assign({}, state, {
                user: action.user,
            });

        case types.ALERT_MESSAGE:
            alert(action.message);
            return state;

        default:
            return state;
    }
}