import React from 'react';
import {Table} from 'antd';
import PropTypes from 'proptypes';
import './DataTable.css';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    dataState: PropTypes.object.isRequired,
};

class DataTable extends React.Component {
    state = {
        bordered: true,
        loading: false,
        pagination: true,
        size: 'small',
        showHeader: true,
        scroll:{ x: '130%', y: 240 }
    };

    render() {
        const selectedDataset = this.props.selectedDataset
        const tableIndex = this.props.dataState.selectedTableIndex;
        const selectedDataSetTable = selectedDataset.attributes.tables[tableIndex];

        if (selectedDataset.attributes.tables.length) {
            const {rows} = selectedDataSetTable;
            const columns = [];
            if (rows[0]) {
                Object.keys(rows[0]).forEach(key => {
                    if (key !== "key") {
                        const column = {
                            title: key,
                            dataIndex: key,
                            key: key,
                            width: 100
                        };
                        columns.push(column);
                    }
                });
            }

            return (
                <div className="data-table-container">
                    <Table  {...this.state} columns={columns} dataSource={rows}/>
                </div>
            );
        } else {
            return (<div className="data-table-container">Please load table</div>);
        }
    }
}

DataTable.propTypes = propTypes;

export default DataTable;