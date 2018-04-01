import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { Transition, View } from '../libs';
import MixinComponent from './mixinComponent';
import './style/menu.less';

export interface SubMenuProps { compiler: string; framework: string; }

export class SubMenu extends MixinComponent {

    [x: string]: any;
    instanceType: string;

    constructor(props: SubMenuProps) {
        super(props);

        this.instanceType = 'SubMenu';

        this.state = {
            active: false
        };
    }

    getChildContext(): { component: SubMenu } {
        return {
            component: this
        };
    }

    componentDidMount() {
        this.rootMenu().state.submenus[this.props.index] = this;
        this.initEvents();
    }

    onItemSelect(index: number, indexPath: Array<number>): void {
        this.setState({
            active: indexPath.indexOf(this.props.index) !== -1
        });
    }

    handleClick(): void {
        this.rootMenu().handleSubmenuClick(this.props.index, this.indexPath());
    }

    handleMouseenter(): void {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.rootMenu().openMenu(this.props.index, this.indexPath());
        }, 300);
    }

    handleMouseleave(): void {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.rootMenu().closeMenu(this.props.index, this.indexPath());
        }, 300);
    }

    initEvents(): void {
        const triggerElm = this.refs['submenu-title'];
        triggerElm.addEventListener('click', this.handleClick.bind(this));
    }

    opened(): boolean {
        return this.rootMenu().state.openedMenus.indexOf(this.props.index) !== -1;
    }

    render() {
        return (
            <li style={this.style()} className={this.className('el-submenu', {
                'is-active': this.state.active,
                'is-opened': this.opened()
            })}>
                <div ref="submenu-title" className="el-submenu__title">
                    {this.props.title}
                    <i className={this.classNames('el-submenu__icon-arrow el-icon-arrow-down')}>
                    </i>
                </div>
                <div style={{ display: this.opened() ? 'block' : 'none' }}>
                    <ul className="el-menu">{this.props.children}</ul>
                </div>
            </li>
        );
    }
}