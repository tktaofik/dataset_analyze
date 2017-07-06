import React from 'react';
import {Select, Button} from 'antd';
import PropTypes from 'proptypes';
import {switchTable, updateDataset} from '../../actions/DataActions';
import './TablesSelectControl.css';

const Option = Select.Option;
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

class TablesSelectControl extends React.Component {
    changeTable = (tableIndex) => {
        const {dispatch} = this.props;
        dispatch(switchTable(tableIndex));
    };

    deleteTable = () => {
        const {dispatch} = this.props;
        const {selectedDataset, selectedTableIndex} = this.props.dataState;

        const oldAttributes = selectedDataset.attributes;
        const oldTables = selectedDataset.attributes.tables;

        const newTables = [
                ...oldTables.slice(0, selectedTableIndex),
                ...oldTables.slice(parseInt(selectedTableIndex, 10) + 1, oldTables.length)
            ];
        const newAttributes = Object.assign({}, oldAttributes, {
            tables: newTables
        });

        const updatedDataset = Object.assign({}, selectedDataset, {
            attributes: newAttributes
        });

        dispatch(updateDataset(updatedDataset));
    };

    render() {
        const {selectedDataset, selectedTableIndex} = this.props.dataState;
        const tables = selectedDataset.attributes.tables;
        const tablesOptions = tables.map((table, index) => {
            return (
                <Option key={index} value={`${index}`}>
                    {table.tableName}
                </Option>
            );
        });
        const selectedTableName = tables.length ? tables[selectedTableIndex].tableName : null;
        const deleteButton = tables.length ? <Button type="primary" className="delete-button" icon="delete" size="small" onClick={this.deleteTable}/> : null
        return (
            <div className="table-select-control">
                <div className="description"><p>Tables/Sheets:</p></div>
                <Select
                    showSearch
                    style={{width: 200}}
                    placeholder="Select a table"
                    optionFilterProp="children"
                    onChange={this.changeTable}
                    value={selectedTableName}>
                    {tablesOptions}
                </Select>
                {deleteButton}
            </div>
        );
    }
}
TablesSelectControl.proptypes = propTypes;
export default TablesSelectControl;