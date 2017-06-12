import React from 'react';
import {connect} from 'react-redux';
import {DragAndDrop} from '../../components';

class AddDataContainer extends React.Component {
    render() {
        return (
            <div><DragAndDrop {...this.props}/></div>
        );
    }
}

function mapStateToProps(state) {
    const {data} = state;

    return {
        data
    };
}

export default connect(mapStateToProps)(AddDataContainer);
