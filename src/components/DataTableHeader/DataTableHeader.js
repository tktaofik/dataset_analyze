import React from 'react';
import {Row, Col} from 'antd';
import {TablesSelectDropDown} from '../index';
import PropTypes from 'proptypes';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

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