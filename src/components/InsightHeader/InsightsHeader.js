import React from 'react';
import {Layout, Button, Row, Col, Icon, Modal} from 'antd';
import {setSelectedDataset, deleteDataset} from '../../actions/DataActions';
import {collapseSideBar} from '../../actions/AppActions';
import './InsightsHeader.css'

const {Header} = Layout;
const confirm = Modal.confirm;

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

    showConfirm = () => {
        const {dispatch, dataState} = this.props;
        const id = dataState.selectedDataset.id;
        const name = dataState.selectedDataset.attributes.name;
        confirm({
            title: `Do you want to delete ${name}?`,
            onOk() {
                dispatch(deleteDataset(id));
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        const {appState, dataState} = this.props;
        const deleteButton = dataState.selectedDataset ? 
            <Button type="primary" className="del-dataset-btn" icon="delete" size="small" onClick={this.showConfirm}/> : 
            null
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
                        <div className="title-control">
                            <h2>
                                {dataState.selectedDataset && dataState.selectedDataset.attributes ? 
                                    dataState.selectedDataset.attributes.name : "Analyze Datasets"}
                            </h2>
                            {deleteButton}
                        </div>
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