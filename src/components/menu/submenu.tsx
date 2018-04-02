import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import MixinComponent from './mixinComponent';
import './style/menu.less';

export interface SubMenuProps {
    prefixCls?: string;
    title?: any;
    index?: string
}

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

    static defaultProps = {
        prefixCls: 'wool-submenu'
    };

    static propTypes = {
        prefixCls: PropTypes.string,
        title: PropTypes.any,
        index: PropTypes.string
    };

    static childContextTypes = {
        component: PropTypes.object,
    };

    getChildContext(): { component: SubMenu } {
        return {
            component: this
        };
    }

    componentDidMount() {
        this.rootMenu().state.submenus[this.props.index] = this;
    }

    handleClick = () => {
        this.rootMenu().handleSubmenuClick(this.props.index, this.indexPath());
    }

    opened(): boolean {
        return this.rootMenu().state.openedMenus.indexOf(this.props.index) !== -1;
    }

    render() {
        const { prefixCls, title, children } = this.props;
        const { active } = this.state;
        return (
            <li className={classNames(prefixCls, {
                'is-active': active,
                'is-opened': this.opened()
            })}>
                <div onClick={this.handleClick} className={`${prefixCls}_title`}>
                    {title}
                    <i className={classNames(this.opened() ? 'up-arrow' : 'down-arrow')}>
                    </i>
                </div>
                <div style={{ display: this.opened() ? 'block' : 'none' }}>
                    <ul className="wool-menu">{children}</ul>
                </div>
            </li>
        );
    }
}