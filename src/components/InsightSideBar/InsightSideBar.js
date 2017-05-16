import React from 'react';
import {Menu, Icon} from 'antd';
class InsightSideBar extends React.Component {
    render() {
        return (
            <div>
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                        <Icon type="user"/>
                        <span className="nav-text">Data - set 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="user"/>
                        <span className="nav-text">Data - set 2</span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default InsightSideBar;