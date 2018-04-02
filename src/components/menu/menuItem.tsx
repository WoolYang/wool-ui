import * as React from 'react';
import * as classNames from 'classnames';
import MixinComponent from './mixinComponent';
import './style/menu.less';

export interface MenuItemProps {
    index: string;
    disabled: boolean;
}

export class MenuItem extends MixinComponent {

    [x: string]: any;
    instanceType: string;

    constructor(props: MenuItemProps) {
        super(props);
        this.instanceType = 'MenuItem';
    }

    componentDidMount() {
        this.rootMenu().state.menuItems[this.props.index] = this;
    }

    handleClick(): void {
        this.rootMenu().handleSelect(
            this.props.index,
            this.indexPath(),
            this
        );
    }

    active(): boolean {
        return this.props.index === this.rootMenu().state.activeIndex;
    }

    render() {
        return (
            <li className={classNames("el-menu-item", {
                'is-active': this.active(),
                'is-disabled': this.props.disabled
            })}
                onClick={this.handleClick.bind(this)}
            >
                {this.props.children}
            </li>
        )
    }
}