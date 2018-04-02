import * as React from 'react';
import * as PropTypes from 'prop-types';
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

    static propTypes = {
        prefixCls: PropTypes.string,
        disabled: PropTypes.bool,
        index: PropTypes.string
    };

    static defaultProps = {
        prefixCls: 'wool-menu-item'
    };

    constructor(props: MenuItemProps) {
        super(props);
        this.instanceType = 'MenuItem';
    }

    componentDidMount() {
        this.rootMenu().state.menuItems[this.props.index] = this;
    }

    handleClick(): void {
        this.rootMenu().handleSelect(this.props.index, this.indexPath(), this);
    }

    active(): boolean {
        return this.props.index === this.rootMenu().state.activeIndex;
    }

    render() {
        const { prefixCls, disabled, children } = this.props;

        return (
            <li className={classNames(prefixCls, {
                'is-active': this.active(),
                'is-disabled': disabled
            })}
                onClick={this.handleClick.bind(this)}
            >
                {children}
            </li>
        )
    }
}