import React from 'react';
import {connect} from 'react-redux';
import {DragAndDrop} from '../../components';
import {getDataSets} from '../../actions/DataActions';

class AddDataContainer extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getDataSets())
    }

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
