import React from 'react';
import {connect} from 'react-redux';
import {Layout, Button, Row, Col, notification} from 'antd';
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
        if (this.props.notification){
            const args = {
                message: 'Notification Title',
                description: 'I will never close automatically. I will be close automatically. I will never close automatically.',
                duration: 3,
            };
            notification.open(args);
        }

        const spinner = this.props.showSpinner ? (
            <div className="spinner-container">
                <div className="spinner">
                    <Spin tip="We are working some magic for you ..."
                          spinning={this.props.showSpinner}
                          size="large"/>
                </div>
            </div>
        ) : null;

        const insightContent = () => {
            if (this.props.selectedDataset) {
                return (
                    <Content className="insights-table">
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
                )
            }
            else {
                return (
                    <Content className="insights-drag-drop">
                        <DragAndDrop  {...this.props}/>
                    </Content>
                )
            }
        };

        return (
            <Layout>
                <Sider breakpoint="lg" collapsedWidth="0"
                       onCollapse={(collapsed, type) => {
                       }}>
                    <InsightSideBar {...this.props}/>
                </Sider>
                {insightContent()}
                {spinner}
            </Layout>
        );
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
        showSpinner: app.showSpinner,
        notification: app.notification
    };
}

InsightsContainer.propTypes = propTypes;

export default connect(mapStateToProps)(InsightsContainer);
