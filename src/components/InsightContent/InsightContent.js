import React from 'react';
import {Layout, Row, Col} from 'antd';
import {DataTable, DataTableHeader, DragAndDrop, InsightsHeader} from '../index';

const {Content} = Layout;

class Spinner extends React.Component {
    render() {
        if (this.props.selectedDataset) {
            return (
                <Layout >
                    <InsightsHeader {...this.props} collapsed={this.props.collapsed} toggleSidebar={this.props.toggleSidebar}/>
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
                    <InsightsHeader {...this.props} collapsed={this.props.collapsed} toggleSidebar={this.props.toggleSidebar}/>
                    <Content className="insights-drag-drop">
                        <DragAndDrop  {...this.props}/>
                    </Content>
                </Layout>
            )
        }
    }
}

export default Spinner;