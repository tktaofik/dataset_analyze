import * as types from '../constants/ActionTypes';

const initialState = {
    user: {},
    courses:[],
    files: []
};

export default function userReducer(state = initialState, action) {
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
                files: state.files.concat(action.files),
            });

        default:
            return state;
    }
}
