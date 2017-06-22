import React from 'react';
import {connect} from 'react-redux';
import {Layout, Spin} from 'antd';
import './Insight.css';
import {DataTable, DataTableHeader, InsightSideBar, DragAndDrop} from '../../components';
import {getDataSets} from '../../actions/DataActions';

const {Content, Sider} = Layout;
const propTypes = {};
class InsightsContainer extends React.Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getDataSets());
    }

    render() {
        if(this.props.data.dataSets.length) {
            return (
                <Layout>
                    <Sider breakpoint="lg" collapsedWidth="0" onCollapse={(collapsed, type) => { }}>
                        <InsightSideBar {...this.props}/>
                    </Sider>
                    <Content className="insights">
                        <div>{this.props.data.selectedDataSet.fileName}</div>
                        <div className="table-selection-drop-down">
                            <DataTableHeader {...this.props}/>
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
        } else {
            return (
                <Layout>
                    <Sider breakpoint="lg" collapsedWidth="0" onCollapse={(collapsed, type) => { }}>
                        <InsightSideBar {...this.props}/>
                    </Sider>
                    <Content className="insights">
                        <DragAndDrop {...this.props}/>
                    </Content>
                </Layout>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    const {data} = state;
    const fileName = ownProps.match.params.fileName;

    if(data.dataSets.length) {
        data.selectedDataSet = data.dataSets.find(dataSet => {
            return dataSet.attributes.name === fileName;
        });

        if(data.selectedDataSetTable) {
            const tables = data.selectedDataSet.attributes.tables;
            const selectedTableName = data.selectedDataSetTable.tableName;

            data.selectedDataSetTable = tables.find(table => {
                return table.tableName === selectedTableName;
            });
        }

        if (!data.selectedDataSet) {
            data.selectedDataSet = data.dataSets[0];
            data.selectedDataSetTable = data.dataSets[0].attributes.tables[0];
        }
    }

    return {
        data
    };
}

InsightsContainer.propTypes = propTypes;

export default connect(mapStateToProps)(InsightsContainer);
