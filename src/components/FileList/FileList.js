import React from 'react';
import {Button} from 'antd';

class FileList extends React.Component {
    render () {
        return (
            <aside>
                <h2>Dropped files</h2>
                    {this.props.dataSets.map((dataSet, index) => (
                        <Button
                            key={index}
                            onClick={() => this.props.onClick(index)}
                        >
                            {dataSet.fileName} - {dataSet.fileSize} bytes
                        </Button>
                    ))}
            </aside>
        );
    }
}

export default FileList;