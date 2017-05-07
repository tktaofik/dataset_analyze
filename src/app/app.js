import React, {Component} from 'react';
import { Button, Menu, Dropdown, Icon } from 'antd';
import './app.css';

function handleMenuClick(e) {
    console.log('click', e);
}

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
);

class App extends Component {
    render() {
        return (
            <div>
                <Button type="primary">primary</Button>
                <Button>secondary</Button>
                <Dropdown overlay={menu}>
                    <Button>
                        more <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        );
    }
}

export default App;