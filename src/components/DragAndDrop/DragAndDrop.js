import React from 'react';
import Dropzone from 'react-dropzone';
import FileList from '../FileList/FileList';
import {Redirect} from 'react-router-dom'

class DragAndDrop extends React.Component {
    state = {
        redirectToReferrer: false
    };

    handleFileDrop = (uploadedFiles) => {
        this.props.onAdd(uploadedFiles);
    };

    handleClick = (index) => {
        this.setState({redirectToReferrer: true})
    }

    render() {
        const {redirectToReferrer} = this.state;
        //const {insights} = {insights: {pathname: '/insights'}};

        if (redirectToReferrer) {
            return (
                <Redirect to={ '/insights' }/>
            );
        }

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
