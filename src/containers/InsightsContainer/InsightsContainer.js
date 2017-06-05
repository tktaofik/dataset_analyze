import React from 'react';
import { Route } from 'react-router-dom'
import PropTypes from 'proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Layout, Button} from 'antd';
import './InsightsContainer.css';
import * as UsersActions from "../../actions/UsersActions.js"
import DataTable from '../../components/DataTable/DataTable';
import DataTableHeader from '../../components/DataTable/DataTableHeader';
import InsightSideBar from '../../components/InsightSideBar/InsightSideBar';

const {Content, Sider} = Layout;

class InsightsContainer extends React.Component {
    PropTypes = {
        user: PropTypes.object.isRequired,
        courses: PropTypes.array.isRequired
    };

    state = {};

    componentWillReceiveProps(nextProps) {

    }

    courseRow(course, i) {
        return <div key={i}>{course.title}</div>
    }

    // findDataSet = (index) => {
    //     return this.props.dataSets[index];
    // }

    onClickTest = () => {
        this.props.actions.alertMessage("Qlik Analyze");
    }

    render() {
        return (
            <Layout>
                <Sider breakpoint="lg" collapsedWidth="0" onCollapse={(collapsed, type) => { }}>
                    <InsightSideBar/>
                </Sider>
                <Layout>
                    <Content className="insights">
                        <div className="table-selection-drop-down">
                            <DataTableHeader/>
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
    const userId = ownProps.params && ownProps.params.id ? ownProps.params.id : '';
    console.log(userId);

    const {user, courses} = state.user;
    const {dataSets} = state.addData;

    return {
        user,
        courses,
        dataSets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UsersActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InsightsContainer);
