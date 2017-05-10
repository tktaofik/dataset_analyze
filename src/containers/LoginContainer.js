import React from 'react';

import LoginForm from '../components/LoginForm';

import '../styles/index.css';

class LoginContainer extends React.Component {
    render() {
        return(
            <div className="login">
                <LoginForm />
            </div>
        );
    }
}

export default LoginContainer;