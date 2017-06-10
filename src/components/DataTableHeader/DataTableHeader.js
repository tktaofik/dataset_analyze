import React from 'react';
import { Row, Col, Select } from 'antd';
import PropTypes from 'proptypes';
import {addFiles} from '../../actions/DataActions';
import '../DataTable/DataTable.css';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

class TablesSelectDropDown extends React.Component {
    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.props.onSelect(value);
    };

    handleSelect = (tableName) => {
        console.log(tableName);
        // const selectedTable = Object.assign({}, this.props.tables.find(table => {
        //     return table.tableName === tableName;
        // }));
        // this.props.actions.selectTable(selectedTable)
    };

    render() {
        const Option = Select.Option;
        const Tables = this.props.data.selectedDataSet.tables.map((table, index) => {
            return <Option key={index} value={`${table.tableName}`}> {table.tableName}</Option>
        });

        return (
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a table"
                optionFilterProp="children"
                onChange={this.handleChange}
                defaultValue={this.props.data.selectedDataSet.tables[0].tableName}
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {Tables}
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
                        <TablesSelectDropDown {...this.props}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

DataTableHeader.proptypes = propTypes;
export default DataTableHeader;