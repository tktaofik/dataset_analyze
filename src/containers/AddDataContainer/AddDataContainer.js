import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UsersActions from "../../actions/UsersActions.js"
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';

class AddDataContainer extends React.Component {
    render () {
        return (
            <div>
                <DragAndDrop
                  files={this.props.files}
                  onAdd={this.props.actions.addFile}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {files} = state.user;

    return {
        files
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UsersActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDataContainer);
