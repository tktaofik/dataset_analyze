import * as types from '../constants/ActionTypes';
import initialStates from './initialStates';

export default function userReducer(state = initialStates, action) {
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

        case types.ADD_FILE:
            return Object.assign({}, state, {
                files:  [...action.files, ...state.files],
            });

        default:
            return state;
    }
}
