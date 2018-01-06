import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/select.less';

export interface OptionProps {
    prefixCls?: string;
    children?: React.ReactNode;
    onChange?: any;
    value?: any;
}

export class Option extends React.Component<OptionProps, any> {

    static defaultProps = {
        prefixCls: 'wool-select',
    };

    static propTypes = {
        value: PropTypes.any,
    }

    handleClick = (e: any) => {
        const { onChange, value, children } = this.props;
        if (onChange) {
            onChange({ label: children, value: value });
        }
    }

    render() {

        const { prefixCls, children } = this.props;

        const classes = classNames(
            `${prefixCls}-dropdown-item`
        );

        return (
            <li className={classes} onClick={this.handleClick} >
                {children}
            </li>
        )
    }
}