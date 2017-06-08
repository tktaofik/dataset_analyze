import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import LoginContainer from './containers/LoginContainer/LoginContainer';
import AddDataContainer from './containers/AddDataContainer/AddDataContainer';
import InsightsContainer from './containers/InsightsContainer/InsightsContainer';
import {loadCourses} from './actions/UsersActions';
import './index.css'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

const store = configureStore();
store.dispatch(loadCourses());

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="app-component">
                <Switch>
                    <Route exact path="/" component={InsightsContainer}/>
                    <Route exact path="/login" component={LoginContainer}/>
                    <Route exact path="/add-data" component={AddDataContainer}/>
                    <Route exact path="/insights/:fileName" component={InsightsContainer}/>
                </Switch>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(<App/>, document.getElementById('root'));