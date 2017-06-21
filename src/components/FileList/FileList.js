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
        console.log(this.props.data.dataSets);
        return (
            <aside>
                <h2>Dropped files</h2>
                {this.props.data.dataSets.map((dataSet, index) => (
                    <div key={index}>
                        <Link to={`/insights/${dataSet.attributes.name}`}>
                            {dataSet.attributes.name} - {dataSet.attributes.size} bytes
                        </Link>
                    </div>
                ))}
            </aside>
        );
    }
}

FileList.propTypes = propTypes;

export default FileList;