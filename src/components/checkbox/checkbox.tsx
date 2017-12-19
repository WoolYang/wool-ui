import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/checkbox.less';

export interface CheckboxProps {
    prefixCls?: string;
    checked?: boolean;
    value?: any;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: any;
    children?: React.ReactNode;
}

export class Checkbox extends React.Component<CheckboxProps, any> {

    static propTypes = {
        checked: PropTypes.bool,
        value: PropTypes.any,
        disabled: PropTypes.bool,
        indeterminate: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        checked: false,
        disabled: false,
        indeterminate: false,
        prefixCls: 'wool-checkbox'
    };

    constructor(props: CheckboxProps) {
        super(props);

        this.state = {
            checked: this.props.checked,
        };
    }


    componentWillReceiveProps(nextProps: CheckboxProps) {
        this.setState({
            checked: nextProps.checked
        })
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;

        const { onChange, value, children } = this.props;
        if (onChange) {
            onChange({ label: children, value: value });
        }
        this.setState({ checked });
    }


    render() {

        const {
            prefixCls,
            disabled,
            indeterminate,
            children
        } = this.props;

        const { checked } = this.state;

        const classes = classNames(
            `${prefixCls}-wrapper`,
            checked && `${prefixCls}-checked`,
            disabled && `${prefixCls}-disabled`,
            indeterminate && `${prefixCls}-indeterminate`,
        )

        return (
            <label className={`${prefixCls}`} >
                <span className={classes}>
                    <input
                        type="checkbox"
                        className={`${prefixCls}-input`}
                        checked={checked}
                        disabled={disabled}
                        onChange={this.handleChange}
                    />
                    <span className={`${prefixCls}-inner`} ></span>
                </span>
                <span>{children}</span>
            </label>
        )
    }
}