import React from 'react';
import {Layout, Button, Row, Col, Icon} from 'antd';
import {setSelectedDataset} from '../../actions/DataActions';
import {collapseSideBar} from '../../actions/AppActions';
import './InsightsHeader.css'

const {Header} = Layout;

class AddDataButton extends React.Component {
    navigateToAddData = () => {
        const {dispatch} = this.props;
        dispatch(setSelectedDataset(null));
        this.props.history.push('/')
    };

    render() {
        const {dataState} = this.props;

        if (dataState.selectedDataset){
            return (
                <Button className="icon" type="primary" icon="file-add" onClick={this.navigateToAddData}/>
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
                    <Col span={2}>
                        <Icon
                            style={{fontSize: 30}}
                            className="trigger"
                            type={appState.collapseSideBar ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle_sideBar}
                        />
                    </Col>
                    <Col span={20}>
                        <h2 style={{textAlign:"center"}}>{dataState.selectedDataset && dataState.selectedDataset.attributes ? dataState.selectedDataset.attributes.name : "Analyze Datasets"}</h2>
                    </Col>
                    <Col span={2} style={{textAlign: "center"}}>
                        <AddDataButton {...this.props}/>
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default InsightsHeader;