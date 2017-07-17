import React from 'react';
import {Menu, Icon} from 'antd';
import {
    Link,
} from 'react-router-dom'
import {getDatasetById, changexAxis, changeyAxis} from '../../actions/DataActions';

const SubMenu = Menu.SubMenu;

class InsightSideBar extends React.Component {
    selectDataset = (e) => {
        const {dispatch} = this.props;
        const datasetId = e.key;

        this.setState({
            selectedItemId: e.key,
        });

        dispatch(getDatasetById(datasetId));
        dispatch(changexAxis(undefined));
        dispatch(changeyAxis(undefined));
    };

    render() {
        const {datasets, selectedDataset} = this.props.dataState;
        const datasetList = datasets.length ? datasets.map((dataset) => {
            return (
                <Menu.Item key={dataset.id}>
                    {dataset.attributes.name}
                    <Link to={"/" + dataset.id}/>
                </Menu.Item>
            );
        }) : null;

        return (
            <div>
                <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1']} selectedKeys={[selectedDataset ? selectedDataset.id : null]}
                      onClick={this.selectDataset}>
                    <SubMenu key="sub1" title={<span><Icon type="file"/><span>Uploaded Files</span></span>}>
                        {datasetList}
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default InsightSideBar;