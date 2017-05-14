import React from 'react';

import Dropzone from 'react-dropzone'

class DragAndDrop extends React.Component {
    state = {
        files: []
    }

    onDrop = (files) => {
        const newFiles = this.state.files.concat(files);

        this.setState({
          files: newFiles
      });
    }

    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>
                    {this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)}
                    </ul>
                </aside>
            </section>
          );
    }
}

export default DragAndDrop;