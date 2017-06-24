import React from 'react';
import {connect} from 'react-redux';
import {Layout, notification} from 'antd';
import './Insight.css';
import {InsightSideBar, InsightContent, Spinner} from '../../components';
import {getDataSets} from '../../actions/DataActions';
import {hideNotification} from '../../actions/AppActions';

const {Sider} = Layout;
const propTypes = {};
class InsightsContainer extends React.Component {
    state = {
        collapsed: false
    };

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getDataSets());
    }

    componentDidUpdate() {
        if (this.props.notification) {
            const {dispatch} = this.props;
            const args = {
                message: this.props.notification.message,
                description: this.props.notification.description,
                duration: 4.5,
            };
            notification.open(args);
            dispatch(hideNotification())
        }
    }

    toggleSidebar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onCollapse = () => {
       console.log("dfgds")
    };

    render() {
        return (
            <Layout>
                <Sider collapsedWidth="0"
                       defaultCollapsed="false"
                       collapsed={this.state.collapsed}
                       onCollapse={this.onCollapse}
                       width="250"
                       style={{ overflow: 'auto' }}>
                    <InsightSideBar {...this.props}/>
                </Sider>
                <InsightContent {...this.props} collapsed={this.state.collapsed} toggleSidebar={this.toggleSidebar}/>
                <Spinner {...this.props}/>
            </Layout>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {data, app} = state;
    const selectedDataSetId = ownProps.match.params.datasetId ? ownProps.match.params.datasetId : data.selectedDataSetId;

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
