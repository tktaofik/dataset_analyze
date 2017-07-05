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
                <Col span={18}>
                    <TablesSelectControl {...this.props}/>
                </Col>
            </Row>
        );
    }
}

DataTableHeader.proptypes = propTypes;
export default DataTableHeader;