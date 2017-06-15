// import {createStore, applyMiddleware} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from '../reducers/index';
import {loadState, saveState} from './localstorage';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import api from '../middleware/api'

const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);
const store = createStoreWithMiddleware(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(throttle(() => {
    saveState(store.getState());
}));

export default store;
