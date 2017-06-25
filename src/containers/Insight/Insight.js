import React from 'react';
import {connect} from 'react-redux';
import {Layout, notification} from 'antd';
import {InsightSideBar, InsightContent, Spinner} from '../../components';
import {getDataSets} from '../../actions/DataActions';
import {hideNotification} from '../../actions/AppActions';
import './Insight.css';

const {Sider} = Layout;
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
                description: this.props.notification.description,
                duration: 4.5,
                placement: 'topLeft',
            };
            notification.open(args);
            dispatch(hideNotification())
        }
    }

    render() {
        const {appState} = this.props;
        return (
            <Layout>
                <Sider collapsedWidth="0"
                       defaultCollapsed="false"
                       collapsed={appState.collapseSideBar}
                       width="225"
                       style={{overflow: 'auto'}}>
                    <InsightSideBar {...this.props}/>
                </Sider>
                <InsightContent {...this.props}/>
                <Spinner {...this.props}/>
            </Layout>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {dataState, appState} = state;
    const selectedDatasetId = ownProps.match.params.datasetId ? ownProps.match.params.datasetId : dataState.selectedDatasetId;

    if (selectedDatasetId && dataState) {
        dataState.selectedDataset = dataState.datasets.find(data => {
            return data.id === selectedDatasetId;
        });
    }
    else {
        dataState.selectedDataset = null;
    }

    return {
        dataState,
        appState
    };
}

InsightsContainer.propTypes = propTypes;

export default connect(mapStateToProps)(InsightsContainer);
