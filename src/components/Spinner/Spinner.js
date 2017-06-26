import React from 'react';
import {Spin} from 'antd';


class Spinner extends React.Component {
    render() {
        const {appState} = this.props;
        if (appState.showSpinner) {
            return (
                <div className="spinner-container">
                    <div className="spinner">
                        <Spin tip="We are working some magic for you ..."
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