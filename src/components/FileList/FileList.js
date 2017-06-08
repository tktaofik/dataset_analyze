import React from 'react';
import {
    Link
} from 'react-router-dom'

class FileList extends React.Component {
    render () {
        return (
            <aside>
                <h2>Dropped files</h2>
                {this.props.dataSets.map((dataSet, index) => (
                    <div key={index}>
                        <Link to={`/insights/${dataSet.fileName}`}>
                            {dataSet.fileName} - {dataSet.fileSize} bytes
                        </Link>
                    </div>
                ))}
            </aside>
        );
    }
}

export default FileList;