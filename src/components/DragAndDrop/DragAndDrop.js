import React from 'react';
import { Upload, Icon } from 'antd';
import {addFile} from '../../actions/DataActions';
import {showNotification} from '../../actions/AppActions';
import './DragAndDrop.css';

const Dragger = Upload.Dragger;

class DragAndDrop extends React.Component {
    onCustomRequest = (params) => {
        const {dispatch} = this.props;
        if (params.file.size <= 10954202){
            dispatch(addFile(params.file));
        }
        else {
            dispatch(showNotification({
                message:  `${params.file.name} is to large`,
                description:  "File upload limit is 10MB",
                duration: 0
            }))
        }
    };

    render () {
        const props = {
            name: 'file',
            multiple: true,
            showUploadList: false,
        };
        return (
            <div className="drag-drop-container">
                <Dragger {...props} customRequest={this.onCustomRequest}>
                    <p className="ant-upload-drag-icon"><Icon type="file-add" /></p>
                    <h3 className="ant-upload-text">Click or drag file to this area to upload</h3>
                </Dragger>
            </div>
        );
    }
}

export default DragAndDrop;