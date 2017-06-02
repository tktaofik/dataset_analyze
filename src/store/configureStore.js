import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../Reducers/index';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
    const createStoreWithMiddleware = applyMiddleware(thunkMiddleware);
    const store = createStore(rootReducer, initialState, createStoreWithMiddleware);

    return store;
}