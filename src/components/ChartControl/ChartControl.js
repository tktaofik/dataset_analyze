import React from 'react';
import {Row, Col, Select} from 'antd';
import {changexAxis, changeyAxis} from '../../actions/DataActions';
import './ChartControl.css';

const Option = Select.Option;

class ChartControl extends React.Component {
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
        const rows = selectedDataset.attributes.tables[selectedTableIndex].rows;
        const options = []

        Object.keys(rows[0]).forEach((key, index) => {
            if(key !== 'key') {
                options.push(
                    <Option key={index} value={key}>
                        {key}
                    </Option>
                );
            }
        });

        return (
            <Row type="flex" justify="center" gutter={16}>
                    <Col className="select-containter">
                        <div className="select-label">
                            <p>Dimension:</p>
                        </div>
                        <Select
                            showSearch
                            style={{width: 200}}
                            placeholder="Select a colume as your X axis"
                            optionFilterProp="children"
                            onChange={this.changeX}
                            value={xAxis}
                            allowClear={true}
                        >
                            {options}
                        </Select>
                    </Col>
                    <Col className="select-containter">
                        <div className="select-label">
                            <p>Measure:</p>
                        </div>
                        <Select
                            showSearch
                            style={{width: 200}}
                            placeholder="Select a colume as your Y axis"
                            optionFilterProp="children"
                            onChange={this.changeY}
                            value={yAxis}
                            allowClear={true}
                        >
                            {options}
                        </Select>
                    </Col>
            </Row>
        )
    }
}

export default ChartControl;