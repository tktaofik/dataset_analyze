import * as types from '../constants/ActionTypes';

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return Object.assign({}, state, {
                courses: action.courses,
            });

        case types.LOGIN_USER:
            return Object.assign({}, state, {
                user: action.user,
            });

        case types.ALERT_MESSAGE:
            alert(action.message);
            return state;

        case types.SELECT_TABLE:
            return Object.assign({}, state, {
                selectedTable: action.table
            });

        default:
            return state;
    }
}
