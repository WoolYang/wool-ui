import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/select.less';

export interface OptionProps {
    prefixCls?: string;
    children?: React.ReactNode;
    onChange?: any;
    value?: any;
    disabled?: boolean;
    selectedValue?: any;
}

export class Option extends React.Component<OptionProps, any> {

    static defaultProps = {
        prefixCls: 'wool-select',
        disabled: false
    };

    static propTypes = {
        value: PropTypes.any,
        disabled: PropTypes.bool,
        selectedValue: PropTypes.any
    }

    handleClick = (e: any) => {
        const { onChange, value, children, disabled } = this.props;
        if (!disabled && onChange) {
            onChange({ label: children, value: value });
        }
    }

    itemSelected() {
        const { selectedValue, value } = this.props;
        return selectedValue === value
    }

    render() {

        const { prefixCls, children, disabled } = this.props;

        const classes = classNames(
            `${prefixCls}-dropdown-item`,
            disabled && `${prefixCls}-disabled`,
            this.itemSelected() && `${prefixCls}-selected`
        );

        return (
            <li className={classes} onClick={this.handleClick} >
                {children}
            </li>
        )
    }
}