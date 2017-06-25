import React from 'react';
import {Layout, Button, Row, Col, Icon} from 'antd';
import {setSelectedDatasetId} from '../../actions/DataActions';
import {collapseSideBar} from '../../actions/AppActions';

const {Header} = Layout;

class AddDataButton extends React.Component {
    navigateToAddData = () => {
        const {dispatch} = this.props;
        dispatch(setSelectedDatasetId(null));
        this.props.history.push('/')
    };

    render() {
        const {dataState} = this.props;

        if (dataState.selectedDataset){
            return (
                <Button className="" type="primary" icon="file-add" size="large" onClick={this.navigateToAddData}>
                    Add Data
                </Button>
            );
        }
        else {
            return null;
        }
    }
}

class InsightsHeader extends React.Component {
    toggle_sideBar = () => {
        const {dispatch, appState} = this.props;
        dispatch(collapseSideBar(!appState.collapseSideBar));
    };

    render() {
        const {appState, dataState} = this.props;
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <Row type="flex" justify="center">
                    <Col span={4}>
                        <Icon
                            style={{fontSize: 30}}
                            className="trigger"
                            type={appState.collapseSideBar ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle_sideBar}
                        />
                    </Col>
                    <Col span={16}>
                        <h2 style={{textAlign:"center"}}>{dataState.selectedDataset ? dataState.selectedDataset.attributes.name : "Analyze Datasets"}</h2>
                    </Col>
                    <Col span={4}>
                        <AddDataButton {...this.props}/>
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default InsightsHeader;