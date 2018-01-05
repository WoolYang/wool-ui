import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/select.less';

export interface OptionProps {
    prefixCls?: string;
    children?: React.ReactNode;
}

export class Option extends React.Component<OptionProps, any> {

    static defaultProps = {
        prefixCls: 'wool-select'
    };

    static propTypes = {
    }

    render() {

        const { prefixCls, children } = this.props;

        const classes = classNames(
            `${prefixCls}-dropdown-item`
        );

        return (
            <li className={classes} >
                {children}
            </li>
        )
    }
}