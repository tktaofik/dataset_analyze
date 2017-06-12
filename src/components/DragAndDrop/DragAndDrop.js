import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {FileList} from '../index';
import {addFiles} from '../../actions/DataActions';


const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

class DragAndDrop extends React.Component {
    handleFileDrop = (uploadedFiles) => {
        const {dispatch} = this.props;
        dispatch(addFiles(uploadedFiles));
    };

    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.handleFileDrop}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <FileList {...this.props} />
            </section>
          );
    }
}

DragAndDrop.propTypes = propTypes;

export default DragAndDrop;