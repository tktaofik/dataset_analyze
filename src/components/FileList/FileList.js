import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom'
import InsightsContainer from '../../containers/InsightsContainer/InsightsContainer';

class FileList extends React.Component {
    render () {
        return (
            <aside>
                <h2>Dropped files</h2>
                {this.props.dataSets.map((dataSet, index) => (
                    <Link key={index} to={`/insights/${dataSet.fileName}`}>{dataSet.fileName} - {dataSet.fileSize} bytes</Link>
                ))}

                <Route path="/insights/:fileName" component={InsightsContainer}/>
            </aside>
        );
    }
}

export default FileList;