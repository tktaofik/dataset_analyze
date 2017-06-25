import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './utils/configureStore';
import LoginContainer from './containers/Login/Login';
import InsightsContainer from './containers/Insight/Insight';
import './index.css'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="app-component">
                        <Switch>
                            <Route exact path="/" component={InsightsContainer}/>
                            <Route exact path="/:datasetId" component={InsightsContainer}/>
                            <Route exact path="/login" component={LoginContainer}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));