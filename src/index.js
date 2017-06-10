import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './utils/configureStore';
import LoginContainer from './containers/Login/Login';
import AddDataContainer from './containers/AddData/AddData';
import InsightsContainer from './containers/Insight/Insight';
import './index.css'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="app-component">
                <Switch>
                    <Route exact path="/" component={AddDataContainer}/>
                    <Route exact path="/login" component={LoginContainer}/>
                    <Route exact path="/add-data" component={AddDataContainer}/>
                    <Route exact path="/insights/:fileName" component={InsightsContainer}/>
                </Switch>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(<App/>, document.getElementById('root'));