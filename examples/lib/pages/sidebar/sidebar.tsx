import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style/sidebar.less';
import { Menu } from '../../../../src/components/index';
export class Sidebar extends React.Component {
    render() {
        const style = {
            width: '200px',
            minHeight: '400px',
            display: 'inlineBlock',
            textAlign: 'left'
        }
        return (
            <div className='side-nav'>
                <Menu defaultOpeneds={['1', '2']} style={style}>
                    <Menu.SubMenu index="1" title="开发指南">
                        <Menu.Item index="1-1">快速上手</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu index="2" title="基础组件">
                        <Menu.ItemGroup title="基础">
                            <Menu.Item index="2-1">Grid布局</Menu.Item>
                            <Menu.Item index="2-2">Color色彩</Menu.Item>
                            <Menu.Item index="2-3">Icon图标</Menu.Item>
                            <Menu.Item index="2-4">Button按钮</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="表单">
                            <Menu.Item index="2-5">Radio单选框</Menu.Item>
                            <Menu.Item index="2-6">Checkbox多选框</Menu.Item>
                            <Menu.Item index="2-7">Input输入框</Menu.Item>
                            <Menu.Item index="2-8">Select选择器</Menu.Item>
                            <Menu.Item index="2-9">Switch开关</Menu.Item>
                            <Menu.Item index="2-10">Datepicker日期选择器</Menu.Item>
                            <Menu.Item index="2-11">Transfer穿梭框</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="导航">
                            <Menu.Item index="2-12">meun菜单</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                </Menu>
            </div>
        )
    }
}