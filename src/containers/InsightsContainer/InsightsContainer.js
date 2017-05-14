import React from 'react';
import {Layout, Menu, Icon, Button} from 'antd';
import './InsightsContainer.css';

const {Content, Footer, Sider} = Layout;

class InsightsContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.onClickTest = this.onClickTest.bind(this);
    }

    onClickTest(){
        alert('qlik analyze');
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
                        <Menu.Item key="2">
                            <Icon type="video-camera"/>
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload"/>
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user"/>
                            <span className="nav-text">nav 4</span>
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

export default InsightsContainer;