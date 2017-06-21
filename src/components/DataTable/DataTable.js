import React from 'react';
import {Table} from 'antd';
import PropTypes from 'proptypes';
import './DataTable.css';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

class DataTable extends React.Component {
    state = {
        bordered: true,
        loading: false,
        pagination: true,
        size: 'middle',
        showHeader: true,
        scroll: {y: 900},
    };

    render() {
        const selectedDataSet = this.props.data.selectedDataSet;
        const tables = selectedDataSet.attributes.tables;
        const selectedDataSetTable = this.props.data.selectedDataSetTable;

        if (selectedDataSet && tables && tables.length > 0) {
            const table = selectedDataSetTable ? selectedDataSetTable : tables[0];
            const {rows} = table;
            const columns = [];
            Object.keys( rows[0] ).forEach( key => {
                if(key !== "key") {
                    const column = {
                        title: key,
                        dataIndex: key,
                        key: key,
                        width: 300
                    };
                    columns.push(column);
                }
            });

            return (
                <div className="data-table-container">
                    {table.tableName}
                    <Table {...this.state} columns={columns} dataSource={rows}/>
                </div>
            );
        }
        else {
            return (<div className="data-table-container">Please load table</div>);
        }
    }
}

DataTable.propTypes = propTypes;

export default DataTable;