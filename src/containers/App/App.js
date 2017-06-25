import React from 'react';
import {Insight, Login} from '../';
import './App.css'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="app-component">
                    <Switch>
                        <Route exact path="/" component={Insight}/>
                        <Route exact path="/:datasetId" component={Insight}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default (App);