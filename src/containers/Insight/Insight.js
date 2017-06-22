import React from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
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
        if (this.props.dataState.datasets.length) {
            return (
                <Layout>
                    <Sider breakpoint="lg" collapsedWidth="0" onCollapse={(collapsed, type) => {
                    }}>
                        <InsightSideBar {...this.props}/>
                    </Sider>
                    <Content className="insights">
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
                    <Sider breakpoint="lg" collapsedWidth="0" onCollapse={(collapsed, type) => {
                    }}>
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
    const defaultDatasetId = data.datasets.length ? data.datasets[0].id : "";
    const selectedDataSetId = ownProps.match.params.datasetId ? ownProps.match.params.datasetId : defaultDatasetId;
    const selectedTableIndex = ownProps.match.params.tableIndex ? ownProps.match.params.tableIndex : 0;

    return {
        dataState: data,
        selectedDataSetId,
        selectedTableIndex
    };
}

InsightsContainer.propTypes = propTypes;

export default connect(mapStateToProps)(InsightsContainer);
