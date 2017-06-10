import React from 'react';
import PropTypes from 'proptypes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Layout, Button} from 'antd';
import './Insight.css';
import * as UsersActions from "../../actions/UsersActions.js"
import {DataTable, DataTableHeader, InsightSideBar} from '../../components';

const {Content, Sider} = Layout;
const propTypes = {
    user: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    dataSets: PropTypes.array.isRequired,
    currentDataSet: PropTypes.object.isRequired,
    tables: PropTypes.array.isRequired,
    selectedTable: PropTypes.object.isRequired
};
class InsightsContainer extends React.Component {

    componentWillReceiveProps(nextProps) {}

    courseRow(course, i) {
        return <div key={i}>{course.title}</div>
    }

    onClickTest = () => {
        this.props.actions.alertMessage("Qlik Analyze");
    };

    handleSelect = (tableName) => {
        const selectedTable = Object.assign({}, this.props.tables.find(table => {
            return table.tableName === tableName;
        }));
        this.props.actions.selectTable(selectedTable)
    };

    render() {
        return (
            <Layout>
                <Sider breakpoint="lg" collapsedWidth="0" onCollapse={(collapsed, type) => { }}>
                    <InsightSideBar/>
                </Sider>
                <Content className="insights">
                    <div>{this.props.match.params.fileName}</div>
                    <div className="table-selection-drop-down">
                        <DataTableHeader onSelect={this.handleSelect} tables={this.props.tables}/>
                    </div>
                    <div className="data-table">
                        <DataTable table={this.props.selectedTable}/>
                    </div>
                    <div className="insight-charts">
                        <h2>insight charts</h2>
                        <Button type="primary" onClick={this.onClickTest}>Primary</Button>
                        <h1>{this.props.courses.map(this.courseRow)}</h1>
                    </div>
                </Content>
            </Layout>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const userId = ownProps.params && ownProps.params.id ? ownProps.params.id : '';
    console.log(userId);

    const {user, courses, selectedTable} = state.user;

    const fileName = ownProps.match.params.fileName;
    const {dataSets} = state.addData;
    const currentDataSet = dataSets.find(dataSet => {
         return dataSet.fileName === fileName;
    })
    const {tables} = currentDataSet;

    return {
        user,
        courses,
        dataSets,
        currentDataSet,
        tables,
        selectedTable
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UsersActions, dispatch)
    };
}

InsightsContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(InsightsContainer);
