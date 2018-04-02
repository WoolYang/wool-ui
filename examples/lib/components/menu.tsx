import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Menu } from '../../../src/components/index';

export class MenuDemo extends React.Component {
    render() {
        return (
            <div style={{ width: '200px', margin: '0 auto' }}>
                <Menu defaultActive="2">
                    <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>导航一</span>}>
                        <Menu.ItemGroup title="分组一">
                            <Menu.Item index="1-1">选项1</Menu.Item>
                            <Menu.Item index="1-2">选项2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="分组2">
                            <Menu.Item index="1-3">选项3</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                    <Menu.Item index="2"><i className="el-icon-menu"></i>导航二</Menu.Item>
                    <Menu.Item index="3"><i className="el-icon-setting"></i>导航三</Menu.Item>
                </Menu>
            </div>
        )
    }
}