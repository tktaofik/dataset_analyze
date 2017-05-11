import React from 'react';
import ReactDOM from 'react-dom';
import LoginContainer from './containers/LoginContainer';
import AddDataContainer from './containers/AddDataContainer';
import InsightsContainer from './containers/InsightsContainer';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

const App = () => (
    <Router>
        <div className="app-component">
            <Route exact path="/" component={LoginContainer}/>
            <Route exact path="/insights" component={InsightsContainer}/>
            <Route path="/login" component={LoginContainer}/>
            <Route path="/add-data" component={AddDataContainer}/>
        </div>
    </Router>
);

ReactDOM.render(<App/>, document.getElementById('root'));