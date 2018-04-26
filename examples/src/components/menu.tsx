import * as React from 'react';
import { Menu } from '../../../src/components/index';

export class MenuDemo extends React.Component {
    render() {
        const style = {
            width: '200px',
            minHeight: '400px',
            display: 'inlineBlock',
            textAlign: 'left'
        }

        return (
            <div style={{ width: '200px', margin: '0 auto' }}>
                <Menu defaultActive="2" style={style}>
                    <Menu.SubMenu index="1" title={<span>导航一</span>}>
                        <Menu.ItemGroup title="分组一">
                            <Menu.Item index="1-1">选项1</Menu.Item>
                            <Menu.Item index="1-2">选项2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="分组2">
                            <Menu.Item index="1-3">选项3</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                    <Menu.Item index="2">导航二</Menu.Item>
                    <Menu.Item index="3">导航三</Menu.Item>
                </Menu>
            </div>
        )
    }
}