import React from 'react';
import {connect} from 'react-redux';
import {Layout, Button, Row, Col, notification, Icon, Spin} from 'antd';
import './Insight.css';
import {DataTable, DataTableHeader, InsightSideBar, DragAndDrop} from '../../components';
import {getDataSets} from '../../actions/DataActions';
import {hideNotification} from '../../actions/AppActions';

const {Content, Sider, Header} = Layout;
const propTypes = {};
class InsightsContainer extends React.Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getDataSets());
    }

    componentDidUpdate() {
        if (this.props.notification) {
            const {dispatch} = this.props;
            const args = {
                message: this.props.notification.message,
                description: 'Data has been uploaded',
                duration: 4.5,
            };
            notification.open(args);
            dispatch(hideNotification())
        }
    }

    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggleSidebar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

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

        const header = (
            <Header style={{background: '#fff', padding: 0}}>
                <Row type="flex">
                    <Col span={20}>
                        <Icon
                            style={{fontSize: 30, marginTop: 20}}
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggleSidebar}
                        />
                    </Col>
                    <Col span={4}>
                        <Button className="" type="primary" icon="file-add"
                                size="large"
                                onClick={() => {
                                    this.props.history.push('/')
                                }}>Add Data
                        </Button>
                    </Col>
                </Row>
            </Header>
        );

        const insightContent = () => {
            if (this.props.selectedDataset) {
                return (
                    <Layout >
                        {header}
                        <Content className="insights-container" >
                            <Row className="table-selection-drop-down-container">
                                <Col className="table-selection-drop-down" span={6}><DataTableHeader {...this.props}/></Col>
                            </Row>
                            <Row className="data-table">
                                <DataTable {...this.props}/>
                            </Row>
                            <Row className="insight-charts">
                                <h2>Show insight charts here</h2>
                            </Row>
                        </Content>
                    </Layout>
                )
            }
            else {
                return (
                    <Layout>
                        {header}
                        <Content className="insights-drag-drop">
                            <DragAndDrop  {...this.props}/>
                        </Content>
                    </Layout>
                )
            }
        };

        return (
            <Layout>
                <Sider collapsedWidth="0"
                       collapsed={this.state.collapsed}
                       onCollapse={this.onCollapse}
                       width="250">
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
