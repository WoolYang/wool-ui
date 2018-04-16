import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { SubMenu } from './subMenu';
import { MenuItem } from './menuItem';
import { MenuItemGroup } from './menuItemGroup';
import './style/menu.less';

export interface MenuProps {
    className?: string; //样式
    style?: object;
    defaultActive?: number | string; //当前激活菜单的 index
    defaultOpeneds?: Array<any>; //当前打开的submenu的 key 数组
    uniqueOpened?: boolean; //是否只保持一个子菜单的展开
    onSelect?: any; //菜单激活回调
    onOpen?: any;//SubMenu 展开的回调
    onClose?: any;//SubMenu 收起的回调
    prefixCls?: string;
    children?: any;
}

export class Menu extends React.Component<MenuProps, any> {

    [x: string]: any;
    instanceType: string;

    static Item = MenuItem;
    static SubMenu = SubMenu;
    static ItemGroup = MenuItemGroup;

    static childContextTypes = {
        component: PropTypes.object,
    };

    static defaultProps = {
        menuTrigger: 'hover',
        prefixCls: 'wool-menu'
    };

    static propTypes = {
        defaultActive: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        defaultOpeneds: PropTypes.arrayOf(PropTypes.any),
        uniqueOpened: PropTypes.bool,
        menuTrigger: PropTypes.string,
        onSelect: PropTypes.func,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object
    };

    constructor(props: MenuProps) {
        super(props);
        this.instanceType = 'Menu';
        this.state = {
            activeIndex: props.defaultActive,
            openedMenus: props.defaultOpeneds ? props.defaultOpeneds.slice() : [],
            menuItems: {},
            submenus: {}
        }
    }

    getChildContext(): { component: Menu } {
        return { component: this };
    }

    componentDidMount() {
        this.openActiveItemMenus();
    }

    //跟默认菜单比对，激活点击菜单
    componentWillReceiveProps(nextProps: MenuProps) {
        const { defaultActive, defaultOpeneds } = this.props;
        const { activeIndex } = this.state;
        if (nextProps.defaultActive != defaultActive || nextProps.defaultActive != activeIndex) {
            this.defaultActiveChanged(defaultActive);
        }

        if (nextProps.defaultOpeneds != defaultOpeneds) {
            this.defaultOpenedsChanged(nextProps.defaultOpeneds);
        }
    }

    //设置默认展开菜单
    defaultActiveChanged(value: number | string): void {
        const { menuItems } = this.state;

        this.setState({ activeIndex: value }, () => {
            if (!menuItems[value]) return;

            let menuItem = menuItems[value];
            let indexPath = menuItem.indexPath();

            this.handleSelect(value, indexPath, menuItem);
        });
    }

    //修改默认展开菜单
    defaultOpenedsChanged(value: Array<any>): void {
        this.setState({ openedMenus: value });
    }

    //打开激活菜单
    openActiveItemMenus(): void {
        let { activeIndex, menuItems, submenus } = this.state;

        if (!menuItems[activeIndex]) return;
        let indexPath = menuItems[activeIndex].indexPath();
        // 展开该菜单项的路径上所有子菜单
        indexPath.forEach((index: number) => {
            const submenu = submenus[index];
            submenu && this.openMenu(index, submenu.indexPath());
        });
    }

    //菜单选择
    handleSelect(index: number | string, indexPath: Array<number>, instance: React.Component): void {
        const { activeIndex, openedMenus, submenus } = this.state;
        const { onSelect } = this.props;
        onSelect && onSelect(index, indexPath, instance);

        this.setState({ activeIndex: index, openedMenus }, () => {
            this.openActiveItemMenus();
        });
    }

    //具体打开菜单
    openMenu(index: number, indexPath: Array<number>): void {
        const { openedMenus } = this.state;
        let openedMenusFilter = openedMenus.slice();
        if (openedMenus.indexOf(index) !== -1) return;
        // 将不在该菜单路径下的其余菜单收起
        if (this.props.uniqueOpened) {
            openedMenusFilter = openedMenus.filter((index: number) => {
                return indexPath.indexOf(index) !== -1;
            });
        }
        openedMenusFilter.push(index);
        this.setState({ openedMenus: openedMenusFilter });
    }

    //点击子菜单
    handleSubmenuClick(index: number, indexPath: Array<number>): void {
        const { onOpen, onClose } = this.props;
        const { openedMenus } = this.state;
        let isOpened = openedMenus.indexOf(index) !== -1;

        if (isOpened) {
            this.closeMenu(index);
            onClose && onClose(index, indexPath);
        } else {
            this.openMenu(index, indexPath);
            onOpen && onOpen(index, indexPath);
        }
    }

    //关闭菜单
    closeMenu(index: number): void {
        const { openedMenus } = this.state;
        openedMenus.splice(openedMenus.indexOf(index), 1);
        this.setState({ openedMenus });
    }

    render() {
        const { prefixCls, children, className, style } = this.props;
        return (
            <ul
                style={style}
                className={classNames(prefixCls, className)}
            >
                {children}
            </ul>
        )
    }
}