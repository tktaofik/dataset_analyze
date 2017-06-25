import React from 'react';
import {Layout, Row, Col} from 'antd';
import PropTypes from 'proptypes';
import {DataTable, DataTableHeader, DragAndDrop, InsightsHeader} from '../index';

const {Content} = Layout;
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
};

class InsightContent extends React.Component {
    render() {
        if (this.props.dataState.selectedDataset) {
            return (
                <Layout >
                    <InsightsHeader {...this.props}/>
                    <Content className="insights-container" >
                        <DataTableHeader {...this.props}/>
                        <Row className="data-table">
                            <DataTable {...this.props}/>
                        </Row>
                        <Row className="insight-charts">
                            <h2>Show insight charts here</h2>
                        </Row>
                    </Content>
                </Layout>
            );
        }
        else {
            return (
                <Layout>
                    <InsightsHeader {...this.props}/>
                    <Content className="insights-drag-drop">
                        <DragAndDrop  {...this.props}/>
                    </Content>
                </Layout>
            );
        }
    }
}

InsightContent.proptypes = propTypes;
export default InsightContent;

// <Row className="table-selection-drop-down-container">
//     <Col style={{marginLeft:6, marginTop:2, textAlign:"center"}} span={2}><h4>Tables / Sheets:</h4></Col>
//     <Col className="table-selection-drop-down" span={4}><DataTableHeader {...this.props}/></Col>
// </Row>