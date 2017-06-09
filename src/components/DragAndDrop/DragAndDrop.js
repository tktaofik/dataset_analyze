import React from 'react';
import Dropzone from 'react-dropzone';
import FileList from '../FileList/FileList';

class DragAndDrop extends React.Component {
    handleFileDrop = (uploadedFiles) => {
        this.props.onAdd(uploadedFiles);
    };

    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.handleFileDrop}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <FileList 
                    dataSets={this.props.dataSets}
                    onClick={this.handleClick}
                />
            </section>
          );
    }
}

export default DragAndDrop;
