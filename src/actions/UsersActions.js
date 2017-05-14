import * as types from '../constants/ActionTypes';

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