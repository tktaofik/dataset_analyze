import React from 'react';
import {Table} from 'antd';
import PropTypes from 'proptypes';
import './DataTable.css';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const styles = {
  text: {
      color: "red"
  }
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
        if (this.props.data.selectedDataSet && this.props.data.selectedDataSet.tables && this.props.data.selectedDataSet.tables.length > 0) {
            const table = this.props.data.selectedDataSetTable ? this.props.data.selectedDataSetTable : this.props.data.selectedDataSet.tables[0];
            const {rows, columns} = table;

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