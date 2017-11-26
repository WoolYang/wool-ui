import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/button.less';

export type ButtonSize = 'normal' | 'medium' | 'small' | 'mini';
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
export type ButtonNativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
    size?: ButtonSize;
    type?: ButtonType;
    plain?: boolean;
    round?: boolean;
    loading?: boolean; //暂未实现
    disabled?: boolean;
    icon?: string;
    autofocus?: boolean;
    nativeType?: ButtonNativeType;
    onClick?: React.FormEventHandler<any>;
    style?: React.CSSProperties;
    className?: string;
    prefixCls?: string;
}

class Button extends React.Component<ButtonProps, any> {

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
        icon: PropTypes.string,
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

        const classes = classNames(
            prefixCls,
            className,
            `${prefixCls}-${size}`,
            `${prefixCls}-${type}`,
            plain && `${prefixCls}-plain-${type}`,
            round && `${prefixCls}-round`,
        );

        return <button
            type={nativeType}
            className={classes}
            disabled={disabled}
            autoFocus={autofocus}
            style={style}
            onClick={this.handleClick}
        >
            {children}
        </button>;
    }
}

export { Button };