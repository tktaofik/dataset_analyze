import React from 'react';
import {Row, Col, Select} from 'antd';
import PropTypes from 'proptypes';
import {switchTable} from '../../actions/DataActions';
import '../DataTable/DataTable.css';

const Option = Select.Option;
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

class TablesSelectDropDown extends React.Component {
    changeTable = (tableIndex) => {
        const {dispatch} = this.props;
        dispatch(switchTable(tableIndex));
    };

    render() {
        const {selectedDataset, selectedTableIndex} = this.props.dataState;
        if(selectedDataset){
            const tables = selectedDataset.attributes.tables.map((table, index) => {
                return (
                    <Option key={index} value={`${index}`}>
                        {table.tableName}
                    </Option>
                )
            });
            const selectedTableName = selectedDataset.attributes.tables[selectedTableIndex].tableName;
            return (
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a table"
                    optionFilterProp="children"
                    onChange={this.changeTable}
                    value={selectedTableName}>
                    {tables}
                </Select>
            )
        }
        else{
            return null
        }

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