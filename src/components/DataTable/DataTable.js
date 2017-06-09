import React from 'react';
import {Table} from 'antd';
import './DataTable.css';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    className: '',
    filters: [
        { text: 'Select Column', value: 'male' },
    ],
    onCellClick: () => {
        console.log('Name')
    },
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 200,
    onCellClick: () => {
        console.log('Age')
    },
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 200,
    onCellClick: () => {
        console.log('Address')
    },
}];

const data = [];
for (let i = 1; i <= 10; i++) {
    data.push({
        key: i,
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
}

class DataTable extends React.Component {
    state = {
        bordered: true,
        loading: false,
        pagination: false,
        size: 'middle',
        showHeader: true,
        scroll: {y: 250},
    };

    render() {
        console.log("selected table: ", this.props.table);
        const text = this.props.table.tableName ?
            <div>It's time to display {this.props.table.tableName} table!</div> :
            <div>No table is selected</div>

        return (
            <div className="data-table-container">
                {text}
                <Table {...this.state} columns={columns} dataSource={data}/>
            </div>
        );
    }
}

export default DataTable;