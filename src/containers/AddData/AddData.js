import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AddDataActions from "../../actions/AddDataActions"
import {DragAndDrop} from '../../components';

class AddDataContainer extends React.Component {
    render() {
        return (
            <div>
                <DragAndDrop dataSets={this.props.dataSets} onAdd={this.props.actions.addFile}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state.addData)
    const {dataSets} = state.addData;

    return {
        dataSets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AddDataActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDataContainer);
