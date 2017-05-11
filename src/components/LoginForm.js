import React from 'react';
import {Redirect} from 'react-router-dom'
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import '../styles/index.css';

const FormItem = Form.Item;

class LoginForm extends React.Component {
    state = {
        redirectToReferrer: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        this.setState({redirectToReferrer: true})
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {redirectToReferrer} = this.state;
        const {insights} = {insights: {pathname: '/insights'}};

        if (redirectToReferrer) {
            return (
                <Redirect to={ insights }/>
            );
        }
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(LoginForm);