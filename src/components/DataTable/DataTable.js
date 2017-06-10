import React from 'react';
import {Table} from 'antd';
import './DataTable.css';

// const columnss= [{
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     className: '',
//     onCellClick: () => {
//         console.log('Name')
//     },
// }, {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//     onCellClick: () => {
//         console.log('Age')
//     },
// }, {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//     onCellClick: () => {
//         console.log('Address')
//     },
// }];

// const data = [];
// for (let i = 1; i <= 10; i++) {
//     data.push({
//         key: i,
//         name: 'John Brown',
//         age: `${i}2`,
//         address: `New York No. ${i} Lake Park`,
//         description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
//     });
// }

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
        const table = this.props.table;
        const {rows, columns} = table;

        console.log("selected table: ", this.props.table);
        const text = this.props.table.tableName ?
            <div>It's time to display {this.props.table.tableName} table!</div> :
            <div>No table is selected</div>

        return (
            <div className="data-table-container">
                {text}
                <Table {...this.state} columns={columns} dataSource={rows}/>
            </div>
        );
    }
}

export default DataTable;