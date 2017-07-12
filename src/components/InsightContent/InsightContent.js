import React from 'react';
import {Layout, Row, Tabs} from 'antd';
import PropTypes from 'proptypes';
import {DataTable, DataTableHeader, DragAndDrop, InsightsHeader} from '../index';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
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
    render() {
        if (this.props.dataState.selectedDataset && this.props.dataState.selectedDataset.attributes) {
            const data = this.props.dataState.selectedDataset .attributes.tables[this.props.dataState.selectedTableIndex].rows;
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
                                    <Row justify="center" type="flex" className="charts">
                                        <ResponsiveContainer width="80%" height="70%">
                                            <LineChart data={data}
                                                       margin={{top: 30, right: 30, left: 20, bottom: 5}}>
                                                <XAxis dataKey="EmployeeName"/>
                                                <YAxis/>
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <Tooltip/>
                                                <Legend />
                                                <Line type="monotone" dataKey="Year Salary" stroke="#8884d8"/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Circle Chart" key="2" className="">
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
                                <TabPane tab="Donut Chart" key="3" className="">
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
