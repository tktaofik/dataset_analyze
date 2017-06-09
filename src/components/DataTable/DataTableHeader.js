import React from 'react';
import { Row, Col, Select } from 'antd';

import './DataTable.css';

class TablesSelectDropDown extends React.Component {
    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.props.onSelect(value);
    };

    render() {
        const Option = Select.Option;

        const options = this.props.tables.map((table, index) => {
            return <Option key={index} value={`${table.tableName}`}> {table.tableName}</Option>
        })

        return (
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a table"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {options}
            </Select>
        )
    }
}

class DataTableHeader extends React.Component {
    render() {
        return (
            <div className="gutter-example">
                <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <TablesSelectDropDown tables={this.props.tables} onSelect={this.props.onSelect}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DataTableHeader;