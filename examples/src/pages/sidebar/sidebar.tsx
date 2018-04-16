import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
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
                <Menu className='menu' defaultOpeneds={['1', '2']} style={style}>
                    <Menu.SubMenu index="1" title="开发指南">
                        <Menu.Item index="1-1"> <NavLink to=''>快速上手</NavLink></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu index="2" title="基础组件">
                        <Menu.ItemGroup title="基础">
                            <Menu.Item index="2-1"><NavLink to='/component/grid'>Grid布局</NavLink></Menu.Item>
                            <Menu.Item index="2-2"><NavLink to=''>Color色彩</NavLink></Menu.Item>
                            <Menu.Item index="2-3"><NavLink to=''>Icon图标</NavLink></Menu.Item>
                            <Menu.Item index="2-4"><NavLink to='/component/button'>Button按钮</NavLink></Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="表单">
                            <Menu.Item index="2-5"><NavLink to='/component/radio'>Radio单选框</NavLink></Menu.Item>
                            <Menu.Item index="2-6"><NavLink to='/component/checkbox'>Checkbox多选框</NavLink></Menu.Item>
                            <Menu.Item index="2-7"><NavLink to='/component/input'>Input输入框</NavLink></Menu.Item>
                            <Menu.Item index="2-8"><NavLink to='/component/select'>Select选择器</NavLink></Menu.Item>
                            <Menu.Item index="2-9"><NavLink to='/component/switch'>Switch开关</NavLink></Menu.Item>
                            <Menu.Item index="2-10"><NavLink to='/component/datePicker'>Datepicker日期选择器</NavLink></Menu.Item>
                            <Menu.Item index="2-11"><NavLink to='/component/transfer'>Transfer穿梭框</NavLink></Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="数据">
                            <Menu.Item index="2-12"><NavLink to='/component/table'>Table表格</NavLink></Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="导航">
                            <Menu.Item index="2-13"><NavLink to='/component/menu'>meun菜单</NavLink></Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                </Menu>
            </div>
        )
    }
}