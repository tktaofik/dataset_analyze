import React from 'react';
import { Redirect } from 'react-router'
import {Menu, Icon} from 'antd';
import {switchDataSet} from '../../actions/DataActions';
const SubMenu = Menu.SubMenu;


class InsightSideBar extends React.Component {
    state = {
        current: this.props.data.selectedDataSet.fileName,
        redirectRef: false
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
        const {dispatch} = this.props;
        dispatch(switchDataSet(e.key));
    }

    render() {
        const {dataSets} = this.props.data;
        const items = dataSets.map((dataSet) => {
            const fileName = dataSet.fileName
            return (
                <Menu.Item key={`${fileName}`}>{fileName}</Menu.Item>
            );
        })

        return (
            <div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    onClick={this.handleClick}
                >
                    <SubMenu key="sub1" title={<span><Icon type="file" /><span>Uploaded Files</span></span>}>
                        {items}
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default InsightSideBar;