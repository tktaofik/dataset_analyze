import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {FileList} from '../index';
import {addFiles} from '../../actions/DataActions';


const propTypes = {
    dispatch: PropTypes.func.isRequired
};

class DragAndDrop extends React.Component {
    handleFileDrop = (uploadedFiles) => {
        console.log(uploadedFiles);

        const {dispatch} = this.props;
        dispatch(addFiles(uploadedFiles));
    };

    render() {
        console.log(this.props);

        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.handleFileDrop}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <FileList dataSets={this.props.data.dataSets}  onClick={this.handleClick} />
            </section>
          );
    }
}

DragAndDrop.propTypes = propTypes;

export default DragAndDrop;