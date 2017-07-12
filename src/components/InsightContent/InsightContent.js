import React from 'react';
import {Layout, Row, Tabs, Select} from 'antd';
import PropTypes from 'proptypes';
import {DataTable, DataTableHeader, DragAndDrop, InsightsHeader} from '../index';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {changexAxis, changeyAxis} from '../../actions/DataActions';
import './InsightContent.css'

const TabPane = Tabs.TabPane;
const {Content} = Layout;
const Option = Select.Option;
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
    }

    changeY = (value) => {
        console.log("value: " + value);
        const {dispatch} = this.props;
        dispatch(changeyAxis(value));
    }

    render() {
        const {selectedDataset, selectedTableIndex} = this.props.dataState;

        if (selectedDataset && selectedDataset.attributes) {
            const rows = selectedDataset.attributes.tables[selectedTableIndex].rows;
            const options = Object.keys(rows[0]).map((key, index)=> {
                return (
                    <Option key={index} value={key}>
                        {key}
                    </Option>
                );
            })
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
                                    <Select
                                        showSearch
                                        style={{width: 200}}
                                        placeholder="Select a table"
                                        optionFilterProp="children"
                                        onChange={this.changeX}
                                        value={this.props.dataState.xAxis}>
                                        {options}
                                    </Select>
                                    <Select
                                        showSearch
                                        style={{width: 200}}
                                        placeholder="Select a table"
                                        optionFilterProp="children"
                                        onChange={this.changeY}
                                        value={this.props.dataState.yAxis}>
                                        {options}
                                    </Select>
                                    <Row justify="center" type="flex" className="charts">
                                        <ResponsiveContainer width="80%" height="70%">
                                            <LineChart data={rows}
                                                       margin={{top: 30, right: 30, left: 20, bottom: 5}}>
                                                <XAxis dataKey={this.props.dataState.xAxis}/>
                                                <YAxis/>
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <Tooltip/>
                                                <Legend />
                                                <Line type="monotone" dataKey={this.props.dataState.yAxis} stroke="#8884d8"/>
                                            </LineChart>
                                        </ResponsiveContainer>
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