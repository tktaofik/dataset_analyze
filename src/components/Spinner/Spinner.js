import React from 'react';
import {Spin} from 'antd';
import './Spinner.css';


class Spinner extends React.Component {
    render() {
        return (
            <div className="spinner-container">
                <div className="spinner">
                    <Spin tip="We are working some magic for you ..."
                          size="large"/>
                </div>
            </div>
        )
    }
}

export default Spinner;