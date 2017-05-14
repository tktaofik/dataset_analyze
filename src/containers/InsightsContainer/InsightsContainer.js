import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Layout, Menu, Icon, Button} from 'antd';
import './InsightsContainer.css';
import * as UsersActions from "../../actions/UsersActions.js"

const {Content, Footer, Sider} = Layout;

class InsightsContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.onClickTest = this.onClickTest.bind(this);
    }

    onClickTest() {
        this.props.actions.alertMessage("Qlik Analyze");
    }

    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="user"/>
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{margin: '5px 35px 0'}}>
                        <div>
                            <Button type="primary" onClick={this.onClickTest}>Primary</Button>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Qlik Analyze ©2017 Created by TK
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UsersActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InsightsContainer);