import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginContainer.css';

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