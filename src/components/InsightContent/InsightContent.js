import React from 'react';
import {Layout, Row, Tabs} from 'antd';
import PropTypes from 'proptypes';
import {DataTable, DataTableHeader, DragAndDrop, InsightsHeader} from '../index';
import {LineChart, PieChart} from 'react-d3-basic';

const TabPane = Tabs.TabPane;
const {Content} = Layout;
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
};

const chartData = [
    {
        name: "Lavon Hilll I",
        BMI: 20.57,
        age: 12,
        birthday: "1994-10-26T00:00:00.000Z",
        city: "Annatown",
        married: true,
        index: 1
    },
    {
        name: "Clovis Pagac",
        BMI: 24.28,
        age: 26,
        birthday: "1995-11-10T00:00:00.000Z",
        city: "South Eldredtown",
        married: false,
        index: 3
    },
    {
        name: "Gaylord Paucek",
        BMI: 24.41,
        age: 30,
        birthday: "1975-06-12T00:00:00.000Z",
        city: "Koeppchester",
        married: true,
        index: 5
    },
    {
        name: "Ashlynn Kuhn MD",
        BMI: 23.77,
        age: 32,
        birthday: "1985-08-09T00:00:00.000Z",
        city: "West Josiemouth",
        married: false,
        index: 6
    },
];
const width = 800,
    height = 400,
    chartSeries = [
        {
            field: 'age',
            name: 'Age',
            color: '#ff7f0e',
            style: {
                "strokeWidth": 2,
                "strokeOpacity": 1,
                "fillOpacity": 1
            }
        }
    ],
    x = function (d) {
        return d.index;
    };

class InsightContent extends React.Component {
    render() {
        if (this.props.dataState.selectedDataset && this.props.dataState.selectedDataset.attributes) {
            return (
                <Layout >
                    <InsightsHeader {...this.props}/>
                    <Content className="insights-container">
                        <DataTableHeader {...this.props}/>
                        <Row className="data-table">
                            <DataTable {...this.props}/>
                        </Row>
                        <Row className="insight-charts-container">
                            {/*<Row align="middle" justify="center" type="flex">*/}
                                {/*<p className="insight-charts-title">Suggested Charts</p>*/}
                            {/*</Row>*/}
                            <Row >
                                <Tabs tabPosition="top" className="insight-charts">
                                    <TabPane tab="Line Chart" key="1" className="charts">
                                        <Row justify="center" type="flex">
                                            <LineChart
                                                showLegend={false}
                                                width={width}
                                                height={height}
                                                data={chartData}
                                                chartSeries={chartSeries}
                                                x={x}
                                            />
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="Circle Chart" key="2">
                                        <Row justify="center" type="flex">
                                            <PieChart
                                                data= {generalChartData}
                                                width= {width}
                                                height= {height}
                                                chartSeries= {chartSeries}
                                                value = {value}
                                                name = {name}
                                            />
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="Donut Chart" key="3">
                                        <Row justify="center" type="flex">
                                            <LineChart
                                                showLegend={false}
                                                width={width}
                                                height={height}
                                                data={chartData}
                                                chartSeries={chartSeries}
                                                x={x}
                                            />
                                        </Row>
                                    </TabPane>
                                </Tabs>
                            </Row>
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