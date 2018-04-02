import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import MixinComponent from './mixinComponent';
import './style/menu.less';

export interface MenuItemGroupProps {
    title: string;
    prefixCls: string;
}

export class MenuItemGroup extends MixinComponent {

    [x: string]: any;
    instanceType: string;

    static defaultProps = {
        prefixCls: 'wool-menu-group'
    };

    static propTypes = {
        prefixCls: PropTypes.string
    };

    constructor(props: MenuItemGroupProps) {
        super(props);
        this.instanceType = 'MenuItemGroup';
        this.state = {
            paddingLeft: 20
        }
    }

    componentDidMount() {
        this.initPadding();
    }

    initPadding(): void {
        let level = 0, parent: any = this.parent(), component = parent.instanceType;

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
        const { prefixCls, title, children } = this.props;

        return (
            <li className={prefixCls}>
                <div className={`${prefixCls}_title`} style={{ paddingLeft }}>{title}</div>
                <ul>
                    {children}
                </ul>
            </li>
        )
    }
}