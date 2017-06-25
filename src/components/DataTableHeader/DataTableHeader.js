import React from 'react';
import {Row, Col} from 'antd';
import {TablesSelectControl} from '../index';
import PropTypes from 'proptypes';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

class DataTableHeader extends React.Component {
    render() {
        return (
            <Row>
                <Col style={{marginLeft:6, marginTop:2, textAlign:"center"}} span={2}><h4>Tables / Sheets:</h4></Col>
                <Col span={6}>
                    <TablesSelectControl {...this.props}/>
                </Col>
            </Row>
        );
    }
}

DataTableHeader.proptypes = propTypes;
export default DataTableHeader;