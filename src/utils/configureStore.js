import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, sagaMiddleware)(createStore);
const store = createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

sagaMiddleware.run(rootSaga);

export default store;
