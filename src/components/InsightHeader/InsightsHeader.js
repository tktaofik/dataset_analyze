import React from 'react';
import {Layout, Button, Row, Col,Icon } from 'antd';
import {setSelectedDataSetId} from '../../actions/DataActions';

const {Header} = Layout;

class InsightsHeader extends React.Component {

    navigateToAddData = () => {
        const {dispatch} = this.props;
        dispatch(setSelectedDataSetId(null));
        this.props.history.push('/')
    };


    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <Row type="flex">
                    <Col span={20}>
                        <Icon
                            style={{fontSize: 30, marginTop: 20}}
                            className="trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggleSidebar}
                        />
                    </Col>
                    <Col span={4}>
                        <Button className="" type="primary" icon="file-add" size="large" onClick={this.navigateToAddData}>
                            Add Data
                        </Button>
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default InsightsHeader;