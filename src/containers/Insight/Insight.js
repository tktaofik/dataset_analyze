import React from 'react';
import {connect} from 'react-redux';
import {Layout, Button} from 'antd';
import './Insight.css';
import {DataTable, DataTableHeader, InsightSideBar} from '../../components';

const {Content, Sider} = Layout;
const propTypes = {};
class InsightsContainer extends React.Component {

    handleSelect = (tableName) => {
        console.log(tableName);
        // const selectedTable = Object.assign({}, this.props.tables.find(table => {
        //     return table.tableName === tableName;
        // }));
        // this.props.actions.selectTable(selectedTable)
    };

    render() {
        return (
            <Layout>
                <Sider breakpoint="lg" collapsedWidth="0" onCollapse={(collapsed, type) => { }}>
                    <InsightSideBar/>
                </Sider>
                <Content className="insights">
                    <div>{this.props.data.selectedDataset.fileName}</div>
                    <div className="table-selection-drop-down">
                        <DataTableHeader onSelect={this.handleSelect} tables={this.props.data.selectedDataset.tables}/>
                    </div>
                    <div className="data-table">
                        <DataTable {...this.props}/>
                    </div>
                    <div className="insight-charts">
                        <h2>Show insight charts here</h2>
                    </div>
                </Content>
            </Layout>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {user, data} = state;
    const fileName = ownProps.match.params.fileName;

    data.selectedDataset = data.dataSets.find(dataSet => {
         return dataSet.fileName === fileName;
    });

    return {
        user,
        data
    };
}

InsightsContainer.propTypes = propTypes;

export default connect(mapStateToProps)(InsightsContainer);
