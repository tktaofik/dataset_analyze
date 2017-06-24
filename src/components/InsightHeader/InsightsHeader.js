import React from 'react';
import {Layout, Button, Row, Col, Icon} from 'antd';
import {setSelectedDataSetId} from '../../actions/DataActions';
import {collapseSideBar} from '../../actions/AppActions';

const {Header} = Layout;

class AddDataButton extends React.Component {
    navigateToAddData = () => {
        const {dispatch} = this.props;
        dispatch(setSelectedDataSetId(null));
        this.props.history.push('/')
    };

    render() {
        if (this.props.selectedDataset){
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
        const {dispatch} = this.props;
        dispatch(collapseSideBar(!this.props.collapseSideBar));
    };

    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <Row type="flex">
                    <Col span={20}>
                        <Icon
                            style={{fontSize: 30, marginTop: 20}}
                            className="trigger"
                            type={this.props.collapseSideBar ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle_sideBar}
                        />
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