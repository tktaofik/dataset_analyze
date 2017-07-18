import React from 'react';
import {Layout, Row, Tabs} from 'antd';
import PropTypes from 'proptypes';
import {DataTable, DataTableHeader, DragAndDrop, InsightsHeader, ChartControl} from '../index';
import {
    LineChart,
    PieChart,
    BarChart,
    ComposedChart,
    ScatterChart,
    Scatter,
    Area,
    Bar,
    Pie,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
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

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data01 = [
    {name: 'Group A', value: 400}, {name: 'Group B', value: 300},
    {name: 'Group C', value: 300}, {name: 'Group D', value: 200}
];


const data02 = [
    {name: 'A1', value: 100},
    {name: 'A2', value: 300},
    {name: 'B1', value: 100},
    {name: 'B2', value: 80},
    {name: 'B3', value: 40},
    {name: 'B4', value: 30},
    {name: 'B5', value: 50},
    {name: 'C1', value: 100},
    {name: 'C2', value: 200},
    {name: 'D1', value: 150},
    {name: 'D2', value: 50}
];

const data03 = [
    {x: 100, y: 200, z: 200}, {x: 120, y: 100, z: 260},
    {x: 170, y: 300, z: 400}, {x: 140, y: 250, z: 280},
    {x: 150, y: 400, z: 500}, {x: 110, y: 280, z: 200}
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
                                <TabPane tab="Bar Chart" key="2">
                                    <Row justify="center" type="flex" className="charts">
                                        <ResponsiveContainer width="80%" height="80%">
                                            <BarChart width={600} height={300} data={data}
                                                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                                <XAxis dataKey="name"/>
                                                <YAxis/>
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <Tooltip/>
                                                <Legend />
                                                <Bar dataKey="pv" fill="#8884d8"/>
                                                <Bar dataKey="uv" fill="#82ca9d"/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Composed Chart" key="3">
                                    <Row justify="center" type="flex" className="charts">
                                        <ResponsiveContainer width="80%" height="80%">
                                            <ComposedChart width={600} height={400} data={data}
                                                           margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                                                <XAxis dataKey="name"/>
                                                <YAxis />
                                                <Tooltip/>
                                                <Legend/>
                                                <CartesianGrid stroke='#f5f5f5'/>
                                                <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
                                                <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
                                                <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Scatter Chart" key="4">
                                    <Row justify="center" type="flex" className="charts">
                                        <ResponsiveContainer width="80%" height="80%">
                                            <ScatterChart width={400} height={400}
                                                          margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                                                <XAxis dataKey={'x'} name='stature' unit='cm'/>
                                                <YAxis dataKey={'y'} name='weight' unit='kg'/>
                                                <Scatter name='A school' data={data03} fill='#8884d8'/>
                                                <CartesianGrid />
                                                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                                            </ScatterChart>
                                        </ResponsiveContainer>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Pie Chart" key="1">
                                    <Row justify="center" type="flex" className="charts">
                                        <ResponsiveContainer width="80%" height="80%">
                                            <PieChart width={800} height={400}>
                                                <Pie dataKey="value" data={data01} cx="50%" cy="50%" outerRadius={50} fill="#8884d8"/>
                                                <Pie dataKey="value" data={data02} cx="50%" cy="50%" innerRadius={60} outerRadius={80}
                                                     fill="#82ca9d" label/>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Line Chart" key="5">
                                    <ChartControl {...this.props}/>
                                    <Row justify="center" type="flex" className="charts">
                                        {lineChart}
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