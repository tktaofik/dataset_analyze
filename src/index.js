import React from 'react';
import ReactDOM from 'react-dom';
import LoginContainer from './containers/LoginContainer/LoginContainer';
import AddDataContainer from './containers/AddDataContainer/AddDataContainer';
import InsightsContainer from './containers/InsightsContainer/InsightsContainer';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

const App = () => (
    <Router>
        <div className="app-component">
            <Switch>
                <Route exact path="/" component={LoginContainer}/>
                <Route exact path="/insights" component={InsightsContainer}/>
                <Route exact path="/login" component={LoginContainer}/>
                <Route exact path="/add-data" component={AddDataContainer}/>
                <Route component={LoginContainer}/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(<App/>, document.getElementById('root'));