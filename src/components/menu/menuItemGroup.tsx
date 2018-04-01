import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import MixinComponent from './mixinComponent';
import './style/menu.less';

export interface MenuItemGroupProps {
    title: string;
    prefixCls: string;
}

export class MenuItemGroup extends MixinComponent<MenuItemGroupProps, any> {

    static defaultProps = {
        prefixCls: 'wool-menu-group'
    };

    static propTypes = {
        prefixCls: PropTypes.string
    };

    constructor(props: MenuItemGroupProps) {
        super(props);
        // this.instanceType = 'MenuItemGroup';
        this.state = {
            paddingLeft: 20
        }
    }

    componentDidMount() {
        this.initPadding();
    }

    initPadding(): void {
        let level = 0, parent = this.parent(), component = parent.instanceType;

        while (component !== 'Menu') {
            if (component === 'SubMenu') {
                level++;
            }

            parent = parent.parent();
            component = parent.instanceType;
        }

        this.setState({
            paddingLeft: this.state.paddingLeft + level * 10
        });
    }

    render() {
        const { paddingLeft } = this.state;
        const { title, children } = this.props;

        return (
            <li style={this.style()} className={this.className(`${prefixCls}`)}>
                <div className="el-menu-item-group__title" style={{
                    paddingLeft: paddingLeft
                }}>{title}</div>
                <ul>
                    {children}
                </ul>
            </li>
        )
    }
}