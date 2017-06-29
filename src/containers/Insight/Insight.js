import React from 'react';
import {connect} from 'react-redux';
import {Layout, notification} from 'antd';
import {InsightSideBar, InsightContent, Spinner} from '../../components';
import {getDataSets, getDataSetById} from '../../actions/DataActions';
import {hideNotification} from '../../actions/AppActions';
import './Insight.css';

const {Sider} = Layout;
const propTypes = {};
class InsightsContainer extends React.Component {
    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(getDataSets());

        const id = match.params.datasetId ? match.params.datasetId : null;
        if(id) {
            dispatch(getDataSetById(id));
        }
    }

    componentDidUpdate() {
        const {appState, dispatch} = this.props;
        if (appState.notification) {
            const args = {
                message: appState.notification.message,
                description: appState.notification.description,
                duration: 4.5,
                placement: 'topRight',
            };

            if(appState.notification.type){
                notification[appState.notification.type](args);
            }
            else{
                notification.open(args);
            }
            dispatch(hideNotification())
        }
    }

    render() {
        const {appState} = this.props;
        let spinner = appState.showSpinner ? <Spinner/> : null;

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
                {spinner}
            </Layout>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {dataState, appState} = state;

    return {
        dataState,
        appState
    };
}

InsightsContainer.propTypes = propTypes;

export default connect(mapStateToProps)(InsightsContainer);
