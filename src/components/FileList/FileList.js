import React from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom'

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

class FileList extends React.Component {
    render() {
        return (
            <aside>
                <h2>Dropped files</h2>
                {/*{this.props.data.dataSets.map((dataSet, index) => (
                    <div key={index}>
                        <Link to={`/insights/${dataSet.fileName}`}>
                            {dataSet.fileName} - {dataSet.fileSize} bytes
                        </Link>
                    </div>
                ))}*/}
            </aside>
        );
    }
}

FileList.propTypes = propTypes;

export default FileList;