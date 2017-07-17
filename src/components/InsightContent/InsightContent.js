import React from 'react';
import {Layout, Row, Tabs} from 'antd';
import PropTypes from 'proptypes';
import {DataTable, DataTableHeader, DragAndDrop, InsightsHeader, ChartControl} from '../index';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {changexAxis, changeyAxis} from '../../actions/DataActions';
import './InsightContent.css'

const TabPane = Tabs.TabPane;
const {Content} = Layout;
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
};

const chartData = [
    {name: 'Sales Representative', uv: 0},
    {name: 'Page B', uv: 1},
    {name: 'Page C', uv: 2},
    {name: 'Page D', uv: 3},
    {name: 'Page E', uv: 4},
    {name: 'Page F', uv: 5},
    {name: 'Page G', uv: 6},
];

class InsightContent extends React.Component {
    changeX = (value) => {
        const {dispatch} = this.props;
        dispatch(changexAxis(value));
    };

    changeY = (value) => {
        const {dispatch} = this.props;
        dispatch(changeyAxis(value));
    };

    render() {
        const {selectedDataset, selectedTableIndex, xAxis, yAxis} = this.props.dataState;

        if (selectedDataset && selectedDataset.attributes.tables.length) {
            const rows = selectedDataset.attributes.tables[selectedTableIndex].rows;
            const lineChart = (xAxis || yAxis) ? <ResponsiveContainer width="80%" height="70%">
                <LineChart data={rows}
                    margin={{top: 30, right: 30, left: 20, bottom: 5}}
                >
                    <XAxis dataKey={xAxis}/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey={yAxis} stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer> : null;

            return (
                <Layout >
                    <InsightsHeader {...this.props}/>
                    <Content className="insights-container">
                        <DataTableHeader {...this.props}/>
                        <Row className="data-table">
                            <DataTable {...this.props}/>
                        </Row>
                        <Row className="insight-charts-container">
                            <Tabs tabPosition="top">
                                <TabPane tab="Line Chart" key="1" >
                                    <ChartControl {...this.props}/>
                                    <Row justify="center" type="flex" className="charts">
                                        {lineChart}
                                    </Row>
                                </TabPane>
                                <TabPane tab="Circle Chart" key="2" className="charts">
                                    <Row justify="center" type="flex" className="charts">
                                        <ResponsiveContainer width="80%" height="80%">
                                            <LineChart data={chartData}
                                                       margin={{top: 30, right: 30, left: 20, bottom: 5}}>
                                                <XAxis dataKey="name"/>
                                                <YAxis/>
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <Tooltip/>
                                                <Legend />
                                                <Line type="monotone" dataKey="pv" stroke="#8884d8"
                                                      activeDot={{r: 8}}/>
                                                <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </Row>
                    </Content>
                </Layout>
            );
        } else {
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