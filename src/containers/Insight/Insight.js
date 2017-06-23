import React from 'react';
import {connect} from 'react-redux';
import {Layout, Button, Row, Col} from 'antd';
import './Insight.css';
import {DataTable, DataTableHeader, InsightSideBar, DragAndDrop} from '../../components';
import {getDataSets} from '../../actions/DataActions';
import {Spin} from 'antd';
const {Content, Sider} = Layout;
const propTypes = {};
class InsightsContainer extends React.Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getDataSets());
    }

    render() {
        const spinner = this.props.showSpinner ? (
            <div className="spinner-container">
                <div className="spinner">
                    <Spin tip="We are working some magic for you ..."
                          spinning={this.props.showSpinner}
                          size="large"/>
                </div>
            </div>
        ) : null;


        if (this.props.selectedDataset) {
            return (
                <Layout>
                    <Sider breakpoint="lg" collapsedWidth="0"
                           onCollapse={(collapsed, type) => {}}>
                        <InsightSideBar {...this.props}/>
                    </Sider>
                    <Content className="insights">
                        <div className="table-selection-drop-down">
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={12}><DataTableHeader {...this.props}/></Col>
                                <Col span={6}><Button className="" type="primary" icon="file-add"
                                                      onClick={() => {
                                                          this.props.history.push('/')
                                                      }}>Add Data</Button></Col>
                            </Row>
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
                    <Sider breakpoint="lg" collapsedWidth="0"
                           onCollapse={(collapsed, type) => {}}>
                        <InsightSideBar {...this.props}/>
                    </Sider>
                    <Content className="insights">
                        <DragAndDrop {...this.props}/>
                        {spinner}
                    </Content>
                </Layout>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    const {data, app} = state;
    const selectedDataSetId = ownProps.match.params.datasetId ? ownProps.match.params.datasetId : null;

    let selectedDataset;
    if (selectedDataSetId) {
        selectedDataset = data.datasets.find(data => {
            return data.id === selectedDataSetId;
        });
    }

    return {
        dataState: data,
        selectedDataset,
        showSpinner: app.showSpinner
    };
}

InsightsContainer.propTypes = propTypes;

export default connect(mapStateToProps)(InsightsContainer);
