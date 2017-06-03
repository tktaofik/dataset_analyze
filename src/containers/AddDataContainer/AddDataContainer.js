import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'antd';
import * as AddDataActions from "../../Actions/AddDataActions"
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';

class AddDataContainer extends React.Component {

    onClickTest = () => {
        this.props.actions.convertExcelToJson("In the add data ");
    };

    render() {
        return (
            <div>
                <DragAndDrop uploadedFiles={this.props.uploadedFiles} onAdd={this.props.actions.addFile}/>
                <Button type="primary" onClick={this.onClickTest}>Primary</Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state.addData)
    const {uploadedFiles} = state.addData;

    return {
        uploadedFiles
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AddDataActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDataContainer);
