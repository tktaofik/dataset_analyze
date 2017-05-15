import * as types from '../constants/ActionTypes';
import courseApi from '../api/mockCourseApi'
export function loginUser({email, password}) {
    return {
        type: types.LOGIN_USER,
        userCredentials: {email, password},
    };
}

export function alertMessage(message) {
    return {
        type: types.ALERT_MESSAGE,
        message
    };
}

export function loadCoursesSuccess(courses) {
    return {
        type: types.LOAD_COURSES_SUCCESS,
        courses
    };
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            throw(error);
        })
    }
}