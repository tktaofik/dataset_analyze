import React from 'react';
import {Row, Col, Select} from 'antd';
import PropTypes from 'proptypes';
import {selectTable} from '../../actions/DataActions';
import '../DataTable/DataTable.css';
import { Link} from 'react-router-dom'


const Option = Select.Option;
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

class TablesSelectDropDown extends React.Component {
    state = {
        changeTable: false,
        link: ''
    };

    changeTable = (tableIndex) => {
        // const link = this.props.selectedDataSetId + '/' + tableIndex;
        // this.setState({
        //     "link": link,
        //     "changeTable": true
        // });
        //
        // BrowserRouter.push(link)
    };

    render() {
        const selectedDataset = this.props.dataState.datasets.find(data => {
            return data.id === this.props.selectedDataSetId;
        });
        const tables = selectedDataset.attributes.tables.map((table, index) => {
            return (
                <Option
                    key={index} value={`${index}`}>
                    {table.tableName}
                    <Link to={this.props.selectedDataSetId + this.props.selectedTableIndex}></Link>
                </Option>
            )
        });
        const defaultTable = selectedDataset.attributes.tables[0].tableName;

        if (this.state.changeTable) {
            // return <Link to={this.state.link}/>
            // <Redirect to={this.state.link}/>
        }
        return (
            <Select
                showSearch
                style={{width: 200}}
                placeholder="Select a table"
                optionFilterProp="children"
                onChange={this.changeTable}
                defaultValue={defaultTable}
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {tables}
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

// <Link to={"/" + this.props.selectedDataSetId + this.props.selectedTableIndex}></Link>