// import React from 'react';
// import PropTypes from 'prop-types';
// import Dropzone from 'react-dropzone';
// import {FileList} from '../index';
// import {addFiles} from '../../actions/DataActions';


// const propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     data: PropTypes.object.isRequired,
// };

// class DragAndDrop extends React.Component {
//     handleFileDrop = (uploadedFiles) => {
//         debugger
//         const {dispatch} = this.props;
//         dispatch(addFiles(uploadedFiles));
//     };

//     render() {
//         return (
//             <section>
//                 <div className="dropzone">
//                     <Dropzone onDrop={this.handleFileDrop}>
//                         <p>Try dropping some files here, or click to select files to upload.</p>
//                     </Dropzone>
//                 </div>
//                 <FileList {...this.props} />
//             </section>
//           );
//     }
// }

// DragAndDrop.propTypes = propTypes;

// export default DragAndDrop;

import React from 'react';
import { Upload, Icon, message } from 'antd';
import {addFile} from '../../actions/DataActions';
const Dragger = Upload.Dragger;

class DragAndDrop extends React.Component {
    onCustomRequest = (params) => {
        const {dispatch} = this.props;
        dispatch(addFile(params.file));
    }

    render () {
        const props = {
            name: 'file',
            multiple: true,
            showUploadList: false,
        };
        return (
            <div style={{ marginTop: 16, height: 180 }}>
                <Dragger 
                    {...props}
                    onChange={this.onFileChange}
                    customRequest={this.onCustomRequest}
                >
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>
            </div>
        );
    }
}

export default DragAndDrop;


