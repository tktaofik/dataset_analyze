import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
    const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, reduxImmutableStateInvariant());
    const store = createStore(rootReducer, initialState, createStoreWithMiddleware);

    return store;
}