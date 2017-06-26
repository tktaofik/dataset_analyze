import React from 'react';
import {Layout, Row} from 'antd';
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
        console.log(this.props.dataState);
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