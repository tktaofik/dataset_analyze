import React from 'react';
import {Menu, Icon} from 'antd';
import {
    Link,
} from 'react-router-dom'
import {switchDataSet} from '../../actions/DataActions';

const SubMenu = Menu.SubMenu;

class InsightSideBar extends React.Component {
    state = {
        selectedItemId: this.props.selectedDataSetId,
        redirectRef: false
    };

    selectDataset = (e) => {
        const {dispatch} = this.props;
        const datasetId = e.key;

        this.setState({
            selectedItemId: e.key,
        });

        dispatch(switchDataSet(datasetId));
    };

    render() {
        const {datasets} = this.props.dataState;
        const datasetList = datasets.length ? datasets.map((dataset) => {
            return (
                <Menu.Item key={dataset.id}>{dataset.attributes.name}
                    <Link to={"/" + dataset.id}>Public Page</Link>
                </Menu.Item>
            );
        }) : null;

        return (
            <div>
                <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1']} selectedKeys={[this.state.selectedItemId]}
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