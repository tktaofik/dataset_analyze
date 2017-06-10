import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';

class LoginContainer extends React.Component {
    render() {
        return(
            <div className="login">
                <LoginForm />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user:state.user
    };
}

export default connect(mapStateToProps)(LoginContainer);