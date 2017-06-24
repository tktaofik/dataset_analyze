import React from 'react';
import {Spin} from 'antd';


class Spinner extends React.Component {
    render() {
        if (this.props.showSpinner) {
            return (
                <div className="spinner-container">
                    <div className="spinner">
                        <Spin tip="We are working some magic for you ..."
                              spinning={this.props.showSpinner}
                              size="large"/>
                    </div>
                </div>
            )
        }
        else {
            return null
        }
    }
}

export default Spinner;