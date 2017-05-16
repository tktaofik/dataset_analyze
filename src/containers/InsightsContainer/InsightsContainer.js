import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Layout, Menu, Icon, Button, Dropdown, Row, Col, Input} from 'antd';
import './InsightsContainer.css';
import * as UsersActions from "../../actions/UsersActions.js"
import DataTable from '../../components/DataTable/DataTable';

const {Content, Sider} = Layout;
const tables = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">Employees</Menu.Item>
        <Menu.Item key="2">Categories</Menu.Item>
        <Menu.Item key="3">Customers</Menu.Item>
    </Menu>
);

function handleMenuClick(e) {
    console.log('click', e);
}

class TablesSelectDropDown extends React.Component {

    render() {
        return (
            <div>
                <Dropdown.Button style={{ width: 200 }} overlay={tables}>Select Table</Dropdown.Button>
            </div>
        )
    }
}

class InsightsContainer extends React.Component {
    PropTypes = {
        user: PropTypes.object.isRequired,
        courses: PropTypes.array.isRequired
    };

    state = {};

    courseRow(course, i) {
        return <div key={i}>{course.title}</div>
    }

    onClickTest = () => {
        this.props.actions.alertMessage("Qlik Analyze");
    }

    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => {
                    }}>
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
                </Sider>
                <Layout>
                    <Content className="insights">
                        <div className="table-selection-drop-down">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box select-table-button">
                                            <TablesSelectDropDown/>
                                        </div>
                                    </Col>
                                    <Col className="gutter-row" span={16}>
                                        <div className="gutter-box">
                                            <Input placeholder="Table name"/>
                                        </div>
                                    </Col>
                                    <Col className="" span={2}>
                                        <div className="gutter-box"><Button type="primary" icon="save">Update</Button></div>
                                    </Col>
                                    <Col className="" span={2}>
                                        <div className="gutter-box"><Button type="danger" icon="delete">Delete</Button></div>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className="data-table">
                            <DataTable/>
                        </div>

                        <div className="insight-charts">
                            <h2>insight charts</h2>
                            <Button type="primary" onClick={this.onClickTest}>Primary</Button>
                            <h1>{this.props.courses.map(this.courseRow)}</h1>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {user, courses} = state.user;

    return {
        user,
        courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UsersActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InsightsContainer);