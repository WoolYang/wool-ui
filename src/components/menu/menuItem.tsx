import * as React from 'react';
import './style/hello.less';

export interface MenuItemProps {
    index: string;
    disabled: boolean;
}

export class MenuItem extends React.Component<MenuItemProps, any> {

    constructor(props: Object) {
        super(props);

    //    this.instanceType = 'MenuItem';
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

    render(){
        return (
            <li
                style={this.style()}
                className={this.className("el-menu-item", {
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