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
        if (this.props.selectedDataset) {
            return (
                <Layout >
                    <InsightsHeader {...this.props}/>
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
                    <InsightsHeader {...this.props}/>
                    <Content className="insights-drag-drop">
                        <DragAndDrop  {...this.props}/>
                    </Content>
                </Layout>
            )
        }
    }
}

InsightContent.proptypes = propTypes;
export default InsightContent;