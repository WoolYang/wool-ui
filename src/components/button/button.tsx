import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { Icon } from '../icon/index';
import './style/button.less';

export type ButtonSize = 'normal' | 'medium' | 'small' | 'mini';
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
export type ButtonNativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
    size?: ButtonSize; //大小
    type?: ButtonType; //风格类型
    plain?: boolean; //是否朴素风格
    round?: boolean;  //是否圆形风格
    loading?: boolean;  //是否加载中
    disabled?: boolean;  //是否不可用
    icon?: string;  //图标
    autofocus?: boolean;  //是否自动焦点
    nativeType?: ButtonNativeType;  //按钮类型
    onClick?: React.FormEventHandler<any>;  //点击事件
    style?: React.CSSProperties;  //style
    className?: string;  //class
    prefixCls?: string;  //前缀
    children?: React.ReactNode;
}

export class Button extends React.Component<ButtonProps, any> {
    static defaultProps = {
        size: 'normal',
        type: 'default',
        plain: false,
        round: false,
        loading: false,
        disabled: false,
        icon: '',
        autofocus: false,
        nativeType: 'button',
        onClick: () => { },
        className: '',
        style: {},
        prefixCls: 'wool-btn',
    };

    static propTypes = {
        size: PropTypes.oneOf(['normal', 'medium', 'small', 'mini']),
        type: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info', 'text']),
        plain: PropTypes.bool,
        round: PropTypes.bool,
        loading: PropTypes.bool,
        disabled: PropTypes.bool,
        icon: PropTypes.node,
        autofocus: PropTypes.bool,
        nativeType: PropTypes.oneOf(['button', 'submit', 'reset']),
        onClick: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
        prefixCls: PropTypes.string
    };

    handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onClick(e);
    }

    render() {

        const {
            size,
            type,
            plain,
            round,
            loading,
            disabled,
            icon,
            autofocus,
            nativeType,
            onClick,
            prefixCls,
            className,
            style,
            children
        } = this.props;

        const iconNode = icon && !loading ? <Icon name={icon} className={children ? "mgr5" : ""} /> : null;
        const loadNode = loading ? <Icon name="spinner6" spin={true} className={children ? "mgr5" : ""} /> : null;
        const isDisabled = loading || disabled;
        const classes = classNames(
            prefixCls,
            className,
            `${prefixCls}-${size}`,
            `${prefixCls}-${type}`,
            plain && `${prefixCls}-plain-${type}`,
            round && `${prefixCls}-round`,
            isDisabled && `${prefixCls}-disabled`
        );

        return <button
            type={nativeType}
            className={classes}
            disabled={isDisabled}
            autoFocus={autofocus}
            style={style}
            onClick={this.handleClick}
        >
            {loadNode}{iconNode}{children}
        </button>;
    }
}