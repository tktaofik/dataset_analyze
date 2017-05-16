import React from 'react';

import Dropzone from 'react-dropzone'

class DragAndDrop extends React.Component {
    handleFileDrop = (files) => {
        this.props.onAdd(files);
    }

    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.handleFileDrop}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>
                    {this.props.files.map((f, i) => <li key={i}>{f.name} - {f.size} bytes</li>)}
                    </ul>
                </aside>
            </section>
          );
    }
}

export default DragAndDrop;
