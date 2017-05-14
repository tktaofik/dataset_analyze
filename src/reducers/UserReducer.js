export default function userReducer(state = [], action) {
    switch (action.type){
        case 'LOGIN_USER':
            state.push(action.userCredentials);
            return state;

        default:
            return state;
    }
}