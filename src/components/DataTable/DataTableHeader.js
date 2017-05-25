import React from 'react';
import {Row, Col, Input, Button, Dropdown, Menu} from 'antd';
import './DataTable.css';

function handleMenuClick(e) {
    console.log('click', e);
}

const tables = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">Employees</Menu.Item>
        <Menu.Item key="2">Categories</Menu.Item>
        <Menu.Item key="3">Customers</Menu.Item>
    </Menu>
);

class TablesSelectDropDown extends React.Component {
    render() {
        return (
            <div>
                <Dropdown.Button style={{width: 200}} overlay={tables}>Select Table</Dropdown.Button>
            </div>
        )
    }
}

class DataTableHeader extends React.Component {
    render() {
        return (
            <div className="gutter-example">
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box select-table-button">
                            <TablesSelectDropDown/>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Input placeholder="Table name"/>
                        </div>
                    </Col>
                    <Col className="" span={4}>
                        <div className="gutter-box"><Button type="primary" icon="save">Update</Button></div>
                    </Col>
                    <Col className="" span={4}>
                        <div className="gutter-box"><Button type="danger" icon="delete">Delete</Button></div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DataTableHeader;