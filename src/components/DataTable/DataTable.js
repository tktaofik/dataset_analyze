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
        size: 'middle',
        showHeader: true,
        scroll: {y: 900},
    };

    render() {

        const selectedDataset = this.props.dataState.datasets.find( data => {
            return data.id ===  this.props.selectedDataSetId;
        });
        const tableIndex = this.props.selectedTableIndex;
        const selectedDataSetTable = selectedDataset.attributes.tables[tableIndex];

        if (selectedDataset.attributes.tables.length) {
            const {rows} = selectedDataSetTable;
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
                    {selectedDataSetTable.tableName}
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