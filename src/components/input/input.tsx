import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/input.less';

export type InputSize = 'default' | 'medium' | 'small' | 'mini';
export type InputAutoComplete = 'off' | 'on';

export interface AbstractInputProps {
    prefixCls?: string;
    className?: string;
    value?: any;
    style?: React.CSSProperties;
}

export interface InputProps extends AbstractInputProps {
    type?: string;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    disabled?: boolean;
    size?: InputSize;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    rows?: number;
    autoSize?: boolean | object;
    autoComplete?: InputAutoComplete;
    name?: string;
    readOnly?: boolean;
    max?: any;
    min?: any;
    step?: any;
    resize?: string;
    autoFocus?: boolean;
    form?: string;
    label?: string;
    onPressEnter?: React.FormEventHandler<any>;
    onKeyDown?: React.FormEventHandler<any>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FormEventHandler<any>;
    onBlur?: React.FormEventHandler<any>;
    onClick?: React.FormEventHandler<any>;
    onMouseEnter?: React.FormEventHandler<any>;
    onMouseLeave?: React.FormEventHandler<any>;
}

export class Input extends React.Component<InputProps, any> {

    [x: string]: any;  //标签索引，否则el会未定义

    static defaultProps = {
        type: 'text',
        disabled: false,
        size: 'default',
        rows: 2,
        autoSize: false,
        autoComplete: "off",
        readOnly: false,
        autoFocus: false,
        prefixCls: 'wool-input',
    }

    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        maxLength: PropTypes.number,
        minLength: PropTypes.number,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        size: PropTypes.oneOf(['default', 'medium', 'small', 'mini']),
        addonBefore: PropTypes.node,
        addonAfter: PropTypes.node,
        prefix: PropTypes.node,
        suffix: PropTypes.node,
        rows: PropTypes.number,
        autoSize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        autoComplete: PropTypes.oneOf(['off', 'on']),
        name: PropTypes.string,
        readOnly: PropTypes.bool,
        resize: PropTypes.string,
        autoFocus: PropTypes.bool,
        form: PropTypes.string,
        label: PropTypes.string,
        onPressEnter: PropTypes.func,
        onKeyDown: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func
    };

    saveInput = (node: HTMLInputElement) => {
        this.input = node;
    }

    handleKeyDown = (e: any) => {
        const { onPressEnter, onKeyDown } = this.props;
        if (e.keyCode === 13 && onPressEnter) {
            onPressEnter(e);
        }

        onKeyDown && onKeyDown(e);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange } = this.props;
        onChange && onChange(e);
    }

    handleFocus = (e: any) => {
        const { onFocus } = this.props;
        onFocus && onFocus(e);
    }

    handleBlur = (e: any) => {
        const { onBlur } = this.props;
        onBlur && onBlur(e);
    }

    handleClick = (e: any) => {
        const { onClick } = this.props;
        onClick && onClick(e);
    }

    handleMouseEnter = (e: any) => {
        const { onMouseEnter } = this.props;
        onMouseEnter && onMouseEnter(e);
    }

    handleMouseLeave = (e: any) => {
        const { onMouseLeave } = this.props;
        onMouseLeave && onMouseLeave(e);
    }

    renderLabeledInput(children: React.ReactElement<any>) {
        const props = this.props;
        if ((!props.addonBefore && !props.addonAfter)) {
            return children;
        }

        const addonBefore = props.addonBefore ? (
            <span className={`${props.prefixCls}-before`}>
                {props.addonBefore}
            </span>
        ) : null;

        const addonAfter = props.addonAfter ? (
            <span className={`${props.prefixCls}-after`}>
                {props.addonAfter}
            </span>
        ) : null;

        return (
            <div className={`${props.prefixCls}-label-wrapper`} >
                {addonBefore}
                {children}
                {addonAfter}
            </div>
        )

    }

    renderLabeledIcon(children: React.ReactElement<any>) {
        const props = this.props;
        if ((!props.prefix && !props.suffix)) {
            return children;
        }

        const prefix = props.prefix ? (
            <span className={`${props.prefixCls}-prefix`}>
                {props.prefix}
            </span>
        ) : null;

        const suffix = props.suffix ? (
            <span className={`${props.prefixCls}-suffix`}>
                {props.suffix}
            </span>
        ) : null;

        return (
            <div className={`${props.prefixCls}-wrapper`} >
                {prefix}
                {children}
                {suffix}
            </div>
        )
    }

    renderInput() {
        const {
            onChange,
            onFocus,
            onBlur,
            type,
            value,
            maxLength,
            minLength,
            placeholder,
            disabled,
            autoComplete,
            name,
            readOnly,
            autoFocus,
            form,
            className,
            prefixCls,
            size,
        } = this.props;

        const classes = classNames(
            prefixCls,
            `${prefixCls}-${size}`,
            disabled && `${prefixCls}-disabled`,
            className
        );

        return this.renderLabeledIcon(
            <input
                ref={this.saveInput}
                className={classes}
                type={type}
                value={value}
                maxLength={maxLength}
                minLength={minLength}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autoComplete}
                name={name}
                readOnly={readOnly}
                autoFocus={autoFocus}
                form={form}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            />
        )
    }

    render() {
        return this.renderLabeledInput(this.renderInput());
    }
}